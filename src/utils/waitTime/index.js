const waitTime = (time = 100) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })

export default waitTime

// for (let index = 0; index < 5; index++) {
//   waitTime(1000)
// }
