// promise实现图片的异步加载(预加载)
const imgAsync = url => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    img.src = url;
    img.onload = () => {
      resolve(image);
    }
    img.onerror = (err) => {
      reject(err);
    }
  })
}

const preLoad = (urls) => {
  // 返回的promise对象 
  let ps = []
  urls.forEach(url => {
    const p = imgAsync(url);
    ps.push(p)
  })
}

Promise.all(pr).then(() => {
  console.log('图片全部加载完了');
})

