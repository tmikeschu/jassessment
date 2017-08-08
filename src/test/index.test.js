import { expect } from "chai"
import sinon from "sinon"
import * as fns from "../index"

describe("Word watch functions", () => {
  const {
    handleTextSubmit,
    processWordCount,
    clearChildren
  } = fns

  const text = { value: "hello you me me you you" }
  const event = {}
  const wordCountArea = document.querySelector(".word-count")

  afterEach(() => {
    text.value = "hello you me me you you"
  })

  describe("#handleTextSubmit", () => {
    const spy = sinon.spy()
    handleTextSubmit(text, spy)(event)

    it("invokes a callback", () => {
      expect(spy.calledOnce).to.be.true
    })

    describe("and the callback", () => {
      it("receives three arguments", () => {
        expect(spy.args[0].length).to.equal(3)
      })
    })
  })

  describe("#processWordCount", () => {
    const wordCount = {}
    const spy1 = sinon.spy()
    const spy2 = sinon.spy()

    processWordCount(wordCount, spy1, spy2)
    it("invokes two callbacks", () => {
      expect(spy1.calledOnce).to.be.true
      expect(spy2.calledOnce).to.be.true
    })

    describe("the first callback", () => {
      it("receives one argument", () => {
        expect(spy1.args[0].length).to.equal(1)
      })
    })

    describe("the second callback", () => {
      it("receives two arguments", () => {
        expect(spy2.args[0].length).to.equal(2)
      })
    })
  })

  describe.only("#clearChildren", () => {
    it("removes existing child nodes from a parent node", () => {
      const container = document.querySelector(".word-count")
      for (let i = 0; i < 3; i++) {
        const para = document.createElement("p")
        container.appendChild(para)
      }

      expect(container.children.length).to.equal(3)
      clearChildren(container)
      expect(container.children.length).to.equal(0)
    })
  })

  describe("", () => {
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

