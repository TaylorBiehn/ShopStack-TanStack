// Helper function to safely get string errors from field meta
export default function getFieldErrors(errors: unknown): string[] {
  if (!Array.isArray(errors)) return [];
  return errors.filter((error): error is string => typeof error === "string");
}
