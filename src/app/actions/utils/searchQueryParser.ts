interface Rule {
  id: string;
  field: string;
  operator: string;
  valueSource: string;
  value: string;
}

interface Query {
  combinator: string;
  rules: Rule[];
  id: string;
}

type Condition = Record<string, any>;

export const parseQueryRules = (query: Query) => {
  const parseRules = (
    rules: any[],
    combinator: string,
  ): Record<string, any> => {
    const conditions: Condition[] = [];

    rules.forEach((rule) => {
      if ("rules" in rule) {
        const nestedConditions = parseRules(rule.rules, rule.combinator);
        conditions.push(nestedConditions);
      } else {
        const { field, operator, value } = rule;

        if (!value) return;

        let condition;
        switch (operator) {
          case "=":
            condition = { [field]: value };
            break;

          case "!=":
            condition = { [field]: { not: value } };
            break;

          case "contains":
            condition = { [field]: { contains: value, mode: "insensitive" } };
            break;

          case "doesNotContain":
            condition = {
              [field]: { not: { contains: value, mode: "insensitive" } },
            };
            break;

          case "beginsWith":
            condition = { [field]: { startsWith: value, mode: "insensitive" } };
            break;

          case "endsWith":
            condition = { [field]: { endsWith: value, mode: "insensitive" } };
            break;

          case ">":
            condition = { [field]: { gt: value } };
            break;

          case ">=":
            condition = { [field]: { gte: value } };
            break;

          case "<":
            condition = { [field]: { lt: value } };
            break;

          case "<=":
            condition = { [field]: { lte: value } };
            break;

          case "in":
            condition = {
              [field]: { in: Array.isArray(value) ? value : [value] },
            };
            break;

          case "notIn":
            condition = {
              [field]: { notIn: Array.isArray(value) ? value : [value] },
            };
            break;

          default:
            console.warn(`Unsupported operator: ${operator}`);
            return;
        }

        conditions.push(condition);
      }
    });

    return combinator === "and" ? { AND: conditions } : { OR: conditions };
  };

  return parseRules(query.rules, query.combinator);
};
