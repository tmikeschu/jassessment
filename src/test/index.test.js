import { expect } from "chai"
import sinon from "sinon"
import * as fns from "../index"

describe("Word watch functions", () => {
  describe("#handleTextSubmit", () => {
    const { handleTextSubmit } = fns
    const text = { value: "hello you me me you you" }
    const event = {}
    const wordCountArea = document.querySelector(".word-count")

    afterEach(() => {
      text.value = "hello you me me you you"
    })

    it("adds children to the .word-count parent", () => {
      expect(wordCountArea.children.length).to.equal(0)
      handleTextSubmit(text)(event)
      expect(wordCountArea.children.length).to.equal(3)
    })

    it("adds paragraph elements", () => {
      handleTextSubmit(text)(event)
      const tags = Array.from(wordCountArea.children).map(x => x.nodeName)
      const allPTags = tags.every(x => x === "P")
      expect(allPTags).to.be.true
    })
  })
})

