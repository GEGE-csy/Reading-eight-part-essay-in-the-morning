function format(num) {
  const parts = num.toString().split('.')
  const intPart = parts[0]
  const decimalPart = parts[1] ? '.'+parts[1] : ''

  let formatInt = ''
  for(let i = 0; i < intPart.length; i++) {
    if(i !== 0 && (intPart.length - i) % 3 === 0) {
      formatInt += ''
    }
    formatInt += intPart[i]
  }
  return formatInt + decimalPart
}

const num = 123456.89
console.log(format(num))

