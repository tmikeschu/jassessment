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

    it("Adds font size em relative to count", () => {
      handleTextSubmit(text)(event)
      const sizes = Array.from(wordCountArea.children)
        .reduce((acc, el) => {
          acc[el.name] = el.style.fontSize
          return acc
        }, {})
      expect(sizes["hello"]).to.equal("1em")
      expect(sizes["me"]).to.equal("2em")
      expect(sizes["you"]).to.equal("3em")
    })

    it("Only adds one paragraph element per word", () => {
      handleTextSubmit(text)(event)
      const counts = Array.from(wordCountArea.children)
        .reduce((acc, el) => {
          acc[el.name] = (acc[el.name] || 0) + 1
          return acc
        }, {})
      expect(counts["hello"]).to.equal(1)
      expect(counts["me"]).to.equal(1)
      expect(counts["you"]).to.equal(1)
    })

    it("Only adds one paragraph element per word, case insensitive", () => {
      const caseCrazyText = { value: "me Me YoU yOU HELLO" }
      handleTextSubmit(caseCrazyText)(event)
      const counts = Array.from(wordCountArea.children)
        .reduce((acc, el) => {
          acc[el.name] = (acc[el.name] || 0) + 1
          return acc
        }, {})
      expect(counts["hello"]).to.equal(1)
      expect(counts["me"]).to.equal(1)
      expect(counts["you"]).to.equal(1)
    })
  })
})

