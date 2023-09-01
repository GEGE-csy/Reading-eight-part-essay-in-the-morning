function get(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(xhr.statusText)
        }
      }
    }
    xhr.send()
  })
}