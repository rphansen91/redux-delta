import { MapPayload } from "./redux"
import { isFn } from "./utils"

export interface Action {
  type: string,
  payload?: any
}

export interface IsType {
  (t: string): boolean
}

export interface Exec {
  (state: any, payload: any): any
}

export interface Case {
  exec(state: any, payload: any): any
  isType(type: string): boolean
}

export interface ActionCreator {
  (payload: any): Action
  type: string
  isType(type: string): boolean
  case: (mapToUpdate: (state: any, payload: any) => any) => Case
}

export function createAction<T> (
  type: string,
  mapToPayload: MapPayload<T> = (v => v)
): ActionCreator {

  const isType: IsType = (t: string) => t === type

  const builder: any = (payload: T) => ({
    type,
    payload: mapToPayload(payload)
  })

  builder.case = (mapToUpdate: Exec): Case => {
    // if (!isFn(mapToUpdate)) throw new Error(`No callback supplied for case: "${type}"`)

    if (!isFn(mapToUpdate)) return {
      exec: (s, p) => p,
      isType: () => false
    }

    return {
      exec: (s, p) => mapToUpdate(s, p),
      isType
    }
  }
  builder.type = type
  builder.isType = isType

  return builder
}
