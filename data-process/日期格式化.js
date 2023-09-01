const dateFormat = (input, format) => {
  const day = input.getDate()
  const month = input.getMonth() + 1
  const year = input.getFullYear()
  format = format.replace(/yyyy/, year)
  format = format.replace(/MM/, month)
  format = format.replace(/dd/, day)
  return format
}
