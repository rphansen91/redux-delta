import { isFn, toActionName } from "./utils"

describe("Redux Delta", () => {
  describe("Utility functions", () => {
    describe("isFn", () => {
      it("boolean - false", () => expect(isFn(true)).toBeFalsy())
      it("string - false", () => expect(isFn("")).toBeFalsy())
      it("number - false", () => expect(isFn(1)).toBeFalsy())
      it("object - false", () => expect(isFn({})).toBeFalsy())
      it("array - false", () => expect(isFn([])).toBeFalsy())
      it("function - true", () => expect(isFn(() => {})).toBeTruthy())
    })

    describe("toActionName", () => {
      it("Should convert to uppercase", () => expect(toActionName("inc")).toBe("INC"))
      it("Should convert space to _", () => expect(toActionName("inc count")).toBe("INC_COUNT"))
      it("Should convert spaces to _", () => expect(toActionName("inc the count")).toBe("INC_THE_COUNT"))
      it("Should convert - to _", () => expect(toActionName("inc-the-count")).toBe("INC_THE_COUNT"))
      it("Should convert camelCase to _", () => expect(toActionName("incCount")).toBe("INC_COUNT"))
      it("Should convert camelCase to _", () => expect(toActionName("incTheCount")).toBe("INC_THE_COUNT"))
    })
  })
})
