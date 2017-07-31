import  { checkEnter, wordCountFor } from "./functions"

document.addEventListener("DOMContentLoaded", () => {
  const textSubmitButton = document.querySelector(".text-submission button")
  const text = document.querySelector(".text-submission textarea")

  textSubmitButton.addEventListener("click", handleTextSubmit(text))
  text.addEventListener("keyup", textEnter(text))
})

function textEnter (text) {
  return event => {
    if (event.keyCode === 13) {
      handleTextSubmit(text)(event)
      return false
    }
  }
}

function handleTextSubmit (text) {
  return event => {
    const wordCount = wordCountFor(text.value)
    text.value = ""
    const words = Object.keys(wordCount)
    const presenter = document.querySelector(".word-count")
    words.forEach(word => {
      const para = document.createElement("p")
      para.innerHTML = `${word}<span>${wordCount[word]} times</span>`
      para.style.fontSize = `${wordCount[word]}em`
      para.tabIndex = 0
      presenter.append(para)
    })
  }
}

function wordCountFor (text) {
  const nonAlpha = /[^a-z]/
  return text.split(nonAlpha).filter(x => x)
    .reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1
      return acc
    }, {})
}
