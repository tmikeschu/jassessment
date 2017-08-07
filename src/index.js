import axios from "axios"

document.addEventListener("DOMContentLoaded", async () => {
  const textSubmitButton = document.querySelector(".text-submission button")
  const textArea = document.querySelector(".text-submission textarea")

  textSubmitButton.addEventListener("click", handleTextSubmit(textArea, processWordCount))
  textArea.addEventListener("keyup", checkEnter(handleTextSubmit, textArea, processWordCount))
  const word = await getTopWord(axios)
  addTopWord(word)
})

export function handleTextSubmit (textArea, callback) {
  return event => {
    const wordCount = wordCountFor(textArea.value)
    textArea.value = ""
    callback(wordCount)
  }
}

export function processWordCount (wordCount) {
  const container = document.querySelector(".word-count")
  clearWords(container)
  addWords(container, wordCount)
}

export function clearWords(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild)
  }
}

export function addWords(container, wordCount) {
  const words = Object.keys(wordCount)
  words.forEach(addWord(container, wordCount))
}

export function addWord(container, wordCount) {
  return word => {
    const para = document.createElement("p")
    para.innerHTML = `${word}<span>${wordCount[word]} times</span>`
    para.style.fontSize = `${wordCount[word]}em`
    para.tabIndex = 0
    para.name = word
    container.appendChild(para)
  }
}

export async function getTopWord (axios) {
  const url = "https://wordwatch-api.herokuapp.com/api/v1/top_word"
  try {
    const response = await axios.get(url)
    return response.data.word
  } catch(error) {
    console.error(error)
    return {}
  }
}

export function addTopWord (wordAndCount) {
  const heading = document.querySelector(".top-word h3")
  const word = Object.keys(wordAndCount)[0]
  const formattedWordCount = `${word} (${wordAndCount[word]})`
  heading.innerHTML = `Top Word: ${formattedWordCount}`
}

export function checkEnter (handleTextSubmit, text, callback) {
  return event => {
    if (event.keyCode === 13) {
      handleTextSubmit(text, callback)(event)
      return false
    }
  }
}

export function wordCountFor (text) {
  const markers = /[^a-z']/i
  return text.split(markers).filter(x => x)
    .reduce((acc, el) => {
      acc[el.toLowerCase()] = (acc[el.toLowerCase()] || 0) + 1
      return acc
    }, {})
}

