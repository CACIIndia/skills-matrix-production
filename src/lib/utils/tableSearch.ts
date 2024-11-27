export const tableSearch = (
    query: string,
    data: any[],
    fields: string[]
  ) => {
    const searchQuery = query.trim().toLowerCase();
    if (!searchQuery) {
      return data;
    }
    return data.filter((item) => {
      return fields.some((field) => {
        const value = item[field];

        if (value instanceof Date) {
            return value.toLocaleDateString().toLowerCase().includes(searchQuery);
        }
    
        if (typeof value === 'string' && !isNaN(Date.parse(value))) {
            const date = new Date(value);
            return date.toLocaleDateString().toLowerCase().includes(searchQuery);
        }

        return value && value.toString().toLowerCase().includes(searchQuery);
      });
    });
  };
  