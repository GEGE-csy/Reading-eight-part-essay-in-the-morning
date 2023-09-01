let xhr = new XMLHttpRequest()
xhr.open('POST', url, true)
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status === 200) {
      console.log(xhr.response)
    } else {
      console.log(xhr.statusText)
    }
  }
}
xhr.send()