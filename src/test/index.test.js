import { expect } from "chai"
import sinon from "sinon"
import * as functions from "../index"
import axios from "axios"

describe("Word watch functions", () => {
  const {
    handleTextSubmit,
    processWordCount,
    clearChildren,
    addWords,
    addWord,
    getTopWord,
    addTopWord,
    checkEnter,
    wordCountFor,
    postWord
  } = functions

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
        expect(spy2.args[0].length).to.equal(3)
      })
    })
  })

  describe("#clearChildren", () => {
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

  const wordCount = { hello: 1, you: 2 }
  const words = Object.keys(wordCount)

  describe("#addWords", () => {
    it("calls an interator for each element in the word count", () => {
      const stub = sinon.stub()
      const spy = sinon.spy()
      stub.withArgs(wordCountArea, wordCount).returns(spy)
      addWords(wordCountArea, wordCount, stub)

      words.forEach(word => expect(spy.calledWith(word)).to.be.true)
      expect(spy.callCount).to.equal(words.length)
    })
  })

  describe("#addWord", () => {
    const result = addWord(wordCountArea, wordCount)    

    afterEach(() => clearChildren(wordCountArea))

    it("returns a function that takes one argument", () => {
      expect(typeof(result)).to.equal("function")
      expect(result.length).to.equal(1)
    })

    it("and the return function appends a word and its count to the DOM", () => {
      expect(wordCountArea.children.length).to.equal(0)
      result("hello")
      expect(wordCountArea.children.length).to.equal(1)
    })
    
    it("as a paragraph element", () => {
      result("hello")
      const tags = Array.from(wordCountArea.children).map(x => x.nodeName)
      expect(wordCountArea.firstChild.nodeName).to.equal("P")
      expect(wordCountArea.firstChild.innerHTML).to
        .equal("hello<span>1 time</span>")
    })

    it("Adds font size em relative to count", () => {
      words.forEach(word => result(word))
      const sizes = Array.from(wordCountArea.children)
        .reduce((acc, el) => {
          acc[el.name] = el.style.fontSize
          return acc
        }, {})
      expect(sizes["hello"]).to.equal("1em")
      expect(sizes["you"]).to.equal("2em")
    })
  })

  describe("#getTopWord", async () => {
    const fakeAxios = {
      get: sinon.stub().returns({ data: { word: { hello: 1 } } })
    }
    const result = await getTopWord(fakeAxios)

    it("calls a GET request to a URL for a service object", () => {
      const url = "https://wordwatch-api.herokuapp.com/api/v1/top_word"
      expect(fakeAxios.get.withArgs(url).calledOnce).to.be.true
    })

    it("returns an object with a word pointing to its count", () => {
      expect(result).to.eql({ hello: 1 })
    })
  })

  describe("#postWord", async () => {
    const fakeAxios = {
      post: sinon.stub().returns({ data: { word: { hello: 1 } } })
    }
    const result = await postWord(fakeAxios, "hello")

    it("calls a POST request to a URL for a service object", () => {
      const url = "https://wordwatch-api.herokuapp.com/api/v1/words"
      const body = { word: { value: "hello" } }
      expect(fakeAxios.post.withArgs(url, body).calledOnce).to.be.true
    })
  })

  describe("#addTopWord", () => {
    it("appends a word and its count to the top word section", () => {
      const word = { me: 3 }
      const topWordHeader = document.querySelector(".top-word h3")
      expect(topWordHeader.innerHTML).to.equal("Top word from Word Watch API: ")
      addTopWord(word)
      expect(topWordHeader.innerHTML).to.equal("Top word from Word Watch API: me (3)")
    })
  })

  describe("#checkEnter", () => {
    const stub = sinon.stub()
    const spy = sinon.spy()
    stub.withArgs(text, spy).returns(spy)
    const result = checkEnter(stub, text, spy)    

    it("returns a function that takes one argument", () => {
      expect(typeof(result)).to.equal("function")
      expect(result.length).to.equal(1)
    })

    it("and the return function calls another function if the keycode is 13", () => {
      const fakeEnterEvent = { keyCode: 13 }
      result(fakeEnterEvent)
      expect(stub.called).to.be.true
      stub.reset()
    })

    it("and the return function calls nothing if the keycode is not 13", () => {
      const fakeEnterEvent = { keyCode: 10 }
      result(fakeEnterEvent)
      expect(stub.called).to.be.false
    })
  })

  describe("#wordCountFor", () => {
    it("returns an word count object for a string of text", () => {
      const result = wordCountFor(text.value, () => {}) 
      expect(result).to.eql({ hello: 1, you: 3, me: 2})
    })

    it("is case insensitive", () => {
      const caseCrazyText = { value: "me Me YoU yOU HELLO" }
      const result = wordCountFor(caseCrazyText.value, () => {}) 
      expect(result).to.eql({ hello: 1, you: 2, me: 2})
    })

    it("invokes a callback for each word", () => {
      const spy = sinon.spy()
      wordCountFor(text.value, spy)
      expect(spy.withArgs(axios, "hello").callCount).to.equal(1)
      expect(spy.withArgs(axios, "me").callCount).to.equal(2)
      expect(spy.withArgs(axios, "you").callCount).to.equal(3)
    })
  })
})

