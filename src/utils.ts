export const isFn = (fn: any): boolean => typeof fn === "function"

export const toActionName = (str: string): string =>
  str
  .replace(/\ |\-|([A-Z])/g, '_$1')
  .toUpperCase()
