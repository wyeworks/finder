// takes date from back (for example '2023-09-13T00:00:00.000Z') and
// returns on input format (2023-09-13)
export function formatDate(sDate: string) {
  return sDate.split('T')[0];
}
