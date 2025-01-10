import { QueryBuilderDnD } from "@react-querybuilder/dnd";
import { useEffect, useMemo, useState } from "react";
import * as ReactDnD from "react-dnd";
import * as ReactDndHtml5Backend from "react-dnd-html5-backend";
import {
  QueryBuilder,
  RuleGroupType,
  RuleType,
  ValueEditorProps,
  OperatorSelectorProps,
} from "react-querybuilder";
import defaultImage from "../../../../public/assets/media/avatars/default-image.png";
import Image from "next/image";
import useGetUsers from "@/lib/hooks/useGetUsers";
import { useSearchUsers } from "@/lib/hooks/advance-search/useAdvanceSearch";
import { useRouter } from "next/navigation";
import { IoMailUnread } from "react-icons/io5";
import { BsMicrosoftTeams } from "react-icons/bs";
import { IoShareSocial } from "react-icons/io5";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

const fields = [
  { name: "name", label: "Name" },
  { name: "role", label: "Job Title" },
  { name: "location", label: "Location" },
];

const AdvanceSearchResult = () => {
  interface User {
    name: string;
    role: string;
    location: string;
    image?: string;
    id: string;
  }

  const [query, setQuery] = useState<RuleGroupType>({
    combinator: "and",
    rules: [],
  });
  const router = useRouter();
  const [savedQueries, setSavedQueries] = useState<
    Record<string, RuleGroupType>
  >({});
  const [queryName, setQueryName] = useState("");
  const { data, isLoading, isError } = useGetUsers();
  const users = data as User[];
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);

  const handleMailClick = () => {
    window.location.href = "mailto:";
  };

  const handleTeamsClick = () => {
    window.open("https://teams.microsoft.com/", "_blank");
  };
  const extractUniqueValues = (key: keyof (typeof users)[0]): string[] => {
    if (!users || users.length === 0) return [];
    return Array.from(new Set(users.map((item) => item[key]))) as string[];
  };
  const valueOptions: Record<string, string[]> = useMemo(
    () => ({
      location: extractUniqueValues("location"),
      name: extractUniqueValues("name"),
      role: extractUniqueValues("role"),
    }),
    [users],
  );
  const CustomValueEditor = (props: ValueEditorProps) => {
    const { field, value, handleOnChange } = props;

    if (!field)
      return (
        <input
          type='text'
          value={value}
          onChange={(e) => handleOnChange(e.target.value)}
        />
      );

    const options = valueOptions[field as keyof typeof valueOptions] || [];

    return (
      <select
        value={value || ""}
        onChange={(e) => handleOnChange(e.target.value)}
        className='mr-2 w-[250px] rounded border border-gray-300 p-1'
      >
        <option value=''>-- Select --</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };
  const CustomOperatorEditor = (props: OperatorSelectorProps) => {
    const { field, handleOnChange, options, value } = props;
    const fieldOperators: Record<string, string[]> = {
      location: ["=", "!="],
      name: ["=", "!=", "contains", "beginsWith", "endsWith"],
      role: ["=", "!="],
    };
    const operators = field ? fieldOperators[field] || [] : [];
    return (
      <select
        value={value}
        onChange={(e) => {
          handleOnChange(e.target.value);
          console.log(e.target.value);
        }}
        className='rule-operators'
      >
        <option value=''>-- Select Operator --</option>
        {operators.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    );
  };

  const handleShareSearch = () => {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 2000);
    });
  };

  const formatRules = (
    rules: (RuleType | RuleGroupType)[],
    combinator: string,
  ): string => {
    return rules
      .map((rule) => {
        if ("rules" in rule) {
          return `(${formatRules(rule.rules, combinator)})`;
        } else {
          return `<${rule.field} ${rule.operator} '${rule.value}'>`;
        }
      })
      .join(combinator);
  };

  const {
    data: searchUsers,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useSearchUsers(query);

  const initialData = useMemo(() => users || [], [users]);

  const paginatedData = useMemo(() => {
    if (!searchUsers || searchUsers.length === 0) return [];
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return searchUsers.slice(startIndex, endIndex);
  }, [searchUsers, currentPage, resultsPerPage]);

  const areAllRuleValuesEmpty = (
    rules: (RuleType | RuleGroupType)[],
  ): boolean => {
    return rules.every((rule) => {
      if ("rules" in rule) {
        return areAllRuleValuesEmpty(rule.rules);
      } else {
        return !rule.value || rule.value.trim() === "";
      }
    });
  };

  const displayData = useMemo(() => {
    if (areAllRuleValuesEmpty(query.rules)) {
      return initialData.slice(0, resultsPerPage);
    } else if (searchUsers && searchUsers.length > 0) {
      return paginatedData;
    } else {
      return [];
    }
  }, [query.rules, initialData, searchUsers, paginatedData, resultsPerPage]);

  const totalPages = searchUsers
    ? Math.ceil(searchUsers.length / resultsPerPage)
    : 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const storedQueries = localStorage.getItem("savedQueries");
    if (storedQueries) {
      setSavedQueries(JSON.parse(storedQueries));
    }
  }, []);

  const handleSaveQuery = () => {
    if (!queryName.trim()) {
      alert("Please enter a query name.");
      return;
    }

    const updatedQueries = { ...savedQueries, [queryName]: query };
    setSavedQueries(updatedQueries);
    localStorage.setItem("savedQueries", JSON.stringify(updatedQueries));
    setQueryName("");
  };

  const handleLoadQuery = (name: string) => {
    const savedQuery = savedQueries[name];
    if (savedQuery) {
      setQuery(savedQuery);
    } else {
      alert(`Query "${name}" not found.`);
    }
  };

  type Rules = (RuleType | RuleGroupType)[];

  const getHighlightedClass = (field: string): string => {
    const checkRules = (rules: Rules): boolean => {
      for (const rule of rules) {
        if ("rules" in rule) {
          if (checkRules(rule.rules)) return true;
        } else if (
          rule.field === field &&
          rule.value &&
          rule.value.trim() !== ""
        ) {
          return true;
        }
      }
      return false;
    };

    return checkRules(query.rules) ? "bg-[#198754] text-white" : "";
  };
 
  return (
    <div className='w-full px-6 pb-6'>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Profiles - Advanced Search</h1>
      </div>
      <div className='relative flex w-[100%] items-center justify-between'>
        <div className='relative'>
          <button
            onClick={handleShareSearch}
            className='relative mb-[4px] mr-[10px] rounded-[4px] bg-[#0d6efd] p-[6px] text-white transition duration-300 hover:bg-blue-700'
          >
            <div className='flex items-center justify-center space-x-1'>
              <div>Share Search</div>{" "}
              <div>
                <IoShareSocial />
              </div>
            </div>
          </button>
          {tooltipVisible && (
            <div className='absolute bottom-[50px] left-0 whitespace-nowrap rounded bg-gray-800/80 px-2 py-2 text-xs text-white shadow-lg'>
              Link copied to clipboard!
            </div>
          )}
        </div>
        <div className='mb-[4px] flex items-center'>
          <div className='flex items-center justify-center'>
            <input
              type='text'
              placeholder='Query Name'
              className='input mr-[-10px] h-[36px]'
              value={queryName}
              onChange={(e) => setQueryName(e.target.value)}
            />
            <button
              onClick={handleSaveQuery}
              className='mr-[10px] whitespace-nowrap rounded-r-[4px] bg-[#0d6efd] p-[6px] text-white transition duration-300 hover:bg-blue-700'
            >
              Save Query
            </button>
          </div>

          <select
            onChange={(e) => handleLoadQuery(e.target.value)}
            className='whitespace-nowrap rounded-[4px] border border-gray-300 bg-[#0d6efd] p-[6px] text-white transition duration-300 hover:bg-blue-700'
            defaultValue=''
          >
            <option value='' disabled>
              Load Query
            </option>
            {Object.keys(savedQueries).map((name) => (
              <option
                className='bg-gray-200 text-black'
                key={name}
                value={name}
              >
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
        <div>
          <QueryBuilder
            fields={fields}
            defaultQuery={query}
            onQueryChange={setQuery}
            controlElements={{
              operatorSelector: CustomOperatorEditor,
              valueEditor: CustomValueEditor,
            }}
          />
        </div>
      </QueryBuilderDnD>

      {query.rules.length > 0 && (
        <div className='mt-2 rounded border border-gray-300 bg-[#e9ecef] px-4'>
          <p className='py-1 text-[13px] font-semibold'>
            Generated Query:{" "}
            <span className='text-gray-700'>
              {formatRules(
                query.rules as (RuleType | RuleGroupType)[],
                query.combinator.toUpperCase(),
              )}
            </span>
          </p>
        </div>
      )}
      <div className='mb-3 mt-1'>
        <button
          onClick={handleMailClick}
          className='mr-[10px] rounded-[4px] bg-[#0d6efd] p-[6px] text-white transition duration-300 hover:bg-blue-700'
        >
          <div className='flex items-center justify-center space-x-1'>
            <div>Mail</div>{" "}
            <div>
              <IoMailUnread />
            </div>
          </div>
        </button>
        <button
          onClick={handleTeamsClick}
          className='rounded-[4px] bg-[#0d6efd] p-[6px] text-white transition duration-300 hover:bg-blue-700'
        >
          <div className='flex items-center justify-center space-x-1'>
            <div>Chat</div>{" "}
            <div>
              <BsMicrosoftTeams />
            </div>
          </div>
        </button>
      </div>
      <div className='h-[1px] bg-[#c7c8c9]'></div>
      <div className='mb-4 mt-2 flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>
          Search Results({searchUsers?.length || 0})
        </h1>
      </div>
      <div className='mb-4'>
        <label className='mr-2'>Results per page:</label>
        <select
          className='rounded-[8px] border px-2 py-1'
          value={resultsPerPage}
          onChange={(e) => {
            setResultsPerPage(parseInt(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
        </select>
      </div>
        {isLoading ? <TableSkeleton
        cols={4}
        rows={5}
        tableHeader={true}
        isSearchable={true}
        addNewData={true}
      /> :
      <table className='min-w-full'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='px-4 py-2 text-left'>Profile</th>
            <th className='px-4 py-2 text-left'>Job Title</th>
            <th className='px-4 py-2 text-left'>Location</th>
          </tr>
        </thead>
        <tbody>
          {displayData.length > 0 ? (
            displayData.map((profile, index) => (
              <tr
                key={index}
                className='border-b border-gray-300 hover:bg-gray-50'
              >
                <td
                  onClick={() => {
                    router.push(`/profile/overview/${profile.id}`);
                  }}
                  className={`flex w-[300px] items-center px-4 py-1 capitalize ${getHighlightedClass(
                    "name",
                  )}`}
                >
                  <Image
                    src={profile?.image || defaultImage}
                    alt={profile.name}
                    className='mr-4 cursor-pointer rounded-full'
                    width={40}
                    height={40}
                  />
                  {profile.name}
                </td>
                <td
                  className={`px-4 py-1 capitalize ${getHighlightedClass(
                    "role",
                  )}`}
                >
                  {profile.role}
                </td>
                <td
                  className={`px-4 py-1 capitalize ${getHighlightedClass(
                    "location",
                  )}`}
                >
                  {profile.location}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className='border border-gray-300 py-4 text-center'
              >
                No profiles found matching the search query.
              </td>
            </tr>
          )}
        </tbody>
      </table>
       }
      
      <div className='mt-4 flex items-center justify-between'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`rounded px-3 py-1 ${currentPage === 1 ? "bg-gray-300" : "bg-[#0d6efd] text-white hover:bg-blue-700"}`}
        >
          Previous
        </button>

        {displayData.length > 0 && (
          <span>
            Page {currentPage} of {totalPages}
          </span>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`rounded px-3 py-1 ${currentPage === totalPages ? "bg-gray-300" : "bg-[#0d6efd] text-white hover:bg-blue-700"} transition duration-300`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdvanceSearchResult;
