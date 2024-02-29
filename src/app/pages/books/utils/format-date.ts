export function formatDate(inputDate: string): string {
  const fullDate = new Date(Date.parse(inputDate));
  const year = fullDate.getFullYear();
  const monthNumber = fullDate.getMonth() + 1;
  const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber;
  const date = fullDate.getDate();

  return `${year}-${month}-${date}`;
}
