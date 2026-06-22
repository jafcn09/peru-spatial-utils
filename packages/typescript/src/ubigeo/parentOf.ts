export function parentOf(code: string): string | null {
  if (code.length === 6) {
    return code.slice(0, 4);
  }
  if (code.length === 4) {
    return code.slice(0, 2);
  }
  return null;
}
