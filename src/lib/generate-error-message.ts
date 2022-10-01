//a  library to generate error messages
export function generateErrorMessage(error: any): string {
  const errorMessage = Object.values(error)
    .filter(Boolean)
    .join(", ")
    .replace(/,(?=[^,]*$)/, " and")
  return errorMessage
}
