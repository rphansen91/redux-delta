export interface Store {
  getState(): any
  dispatch(action: any): void
}

export interface MapPayload<T> {
  (v: T): T
}
