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
  (payload?: any): Action
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

  builder.case = (mapToUpdate: Exec): Case => ({
    isType,
    exec: !isFn(mapToUpdate)
      ? (s, p) => p
      : (s, p) => mapToUpdate(s, p),
  })

  builder.type = type
  builder.isType = isType

  return builder
}
