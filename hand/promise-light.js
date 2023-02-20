// 红灯3s亮一次，绿灯1s亮一次，黄灯2s亮一次
// 3个灯交替亮
const timer = (color, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(color)
      resolve();
    }, delay)
  })
}

// async/await版
const light1 = async () => {
  await timer('red', 3000);
  await timer('green', 1000);
  await timer('yellow', 2000);
  await light();
}

// promise版
const light2 = () => {
  timer('red', 3000)
    .then(() => timer('green', 1000))
    .then(() => timer('yellow', 2000))
    .then(light2)
}

light1();
light2();

