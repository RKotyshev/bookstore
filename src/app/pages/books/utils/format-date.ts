export function formatDate(inputDate: string | null): string {
  if (!inputDate) {
    return '';
  }
  
  const fullDate = new Date(Date.parse(inputDate));
  const year = fullDate.getFullYear();
  const monthNumber = fullDate.getMonth() + 1;
  const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber;
  const dateNumber = fullDate.getDate();
  const date = dateNumber < 10 ? `0${dateNumber}` : dateNumber;

  return `${year}-${month}-${date}`;
}
