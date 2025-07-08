
const formatToHHMM = (input: string): string => {
  const date = new Date(input)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}
export default formatToHHMM;