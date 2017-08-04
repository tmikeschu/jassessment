import axios from "axios"

document.addEventListener("DOMContentLoaded", async () => {
  const textSubmitButton = document.querySelector(".text-submission button")
  const textArea = document.querySelector(".text-submission textarea")

  textSubmitButton.addEventListener("click", handleTextSubmit(textArea))
  textArea.addEventListener("keyup", checkEnter(handleTextSubmit, textArea, 10))
  const word = await getTopWord(axios)
  addTopWord(word)
})

export function handleTextSubmit (textArea) {
  return event => {
    const wordCount = wordCountFor(textArea.value)
    textArea.value = ""
    const presenter = document.querySelector(".word-count")
    clearChildren(presenter)
    const words = Object.keys(wordCount)
    words.forEach(word => {
      const para = document.createElement("p")
      para.innerHTML = `${word}<span>${wordCount[word]} times</span>`
      para.style.fontSize = `${wordCount[word]}em`
      para.tabIndex = 0
      presenter.appendChild(para)
    })
  }
}

function clearChildren(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild)
  }
}

export async function getTopWord (axios) {
  const url = "https://wordwatch-api.herokuapp.com/api/v1/top_word"
  try {
    const response = await axios.get(url)
    return response.data.word
  } catch(error) {
    console.error(error)
  }
}

export function addTopWord (wordAndCount) {
  const heading = document.querySelector(".top-word h3")
  const word = Object.keys(wordAndCount)[0]
  const formattedWordCount = `${word} (${wordAndCount[word]})`
  heading.innerHTML = `Top Word: ${formattedWordCount}`
}

export function checkEnter (handleTextSubmit, text) {
  return event => {
    if (event.keyCode === 13) {
      handleTextSubmit(text)(event)
      return false
    }
  }
}

export function wordCountFor (text) {
  const markers = /[^a-z']/i
  return text.split(markers).filter(x => x)
    .reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1
      return acc
    }, {})
}

