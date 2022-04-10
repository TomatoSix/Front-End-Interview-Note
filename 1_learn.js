// for (let i=0; i<=5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 1000*i)
// }

for (var i=0; i<=5; i++) {
  (function(i) {
    setTimeout(() => {
      console.log(i);
    }, 1000*(i+1))
  })(i)
}

// var sleep = () => new Promise((resolve, reject) => {
//   setTimeout(resolve, 1000)
// })

// async function print() {
//   for (let i=0; i<=5; i++) {
//     await sleep()
//     console.log(i);
//   }
// }
// print()