const typeOf = (type: string) => (v: any): boolean => typeof v === type

export const isFn = typeOf("function")

export const isString = typeOf("string")

export const toActionName = (...str: string[]): string =>
  str
    .filter(isString)
    .join(" ")
    .replace(/\ |\-|([A-Z])/g, "_$1")
    .replace(/__/, "_")
    .replace(/^_/, "")
    .toUpperCase()
