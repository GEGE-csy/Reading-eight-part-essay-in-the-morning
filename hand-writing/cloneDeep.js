function deepClone(obj) {
  let newObj = Array.isArray(obj) ? [] : {}
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }
}
