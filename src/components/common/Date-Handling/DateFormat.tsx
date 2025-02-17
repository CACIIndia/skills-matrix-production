export const getFormattedDate = (dateString: string): string => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

// format YYYY-MM-DD
export const convertToLocalDate = (dateString: string) => {
  if (!dateString) return "N/A"; 
  const utcDate = new Date(dateString); 
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: userTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(utcDate)
    .split("/")
    .join("-"); 
};