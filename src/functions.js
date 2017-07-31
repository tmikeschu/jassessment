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
