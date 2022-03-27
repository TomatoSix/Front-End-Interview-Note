// let number = 'acbccacbcca'
// let arr = number.split('')
// console.log(arr, 'arr');

// var getResult = function(arr) {
//   // let res = []
//   // 字符串重排
//   let res = 0
//   var getRes  = function(path) {
//     let count = 0
//     for (let i=0; i<path.length; i++) {
//       let substr = path.slice(i, i+6).join('')
//       if (substr === 'acbcca') {
//         count++
//       }
//     }
//     return count
//   }
//   var getPath = function(path, used) {
//     if (path.length === arr.length) {
//       // 重拍后的数据
//       let num = getRes(path)
//       res = Math.max(num, res)
//       // res.push([...path])
//       // return
//     }
//     let f = ''
//     for (let i=0; i<arr.length; i++) {
//       if (used[i] || f === arr[i]) continue
//       path.push(arr[i])
//       f = arr[i]
//       used[i] = true
//       getPath(path, used)
//       path.pop()
//       used[i] = false
//     }
//   }
//   getPath([], [])
//   return res
// }

// let res = getResult(arr)
// console.log(res, 'res');
// 求有几个acbcca  aa b ccc

// let n  = 4
// let arr = [-2,-6,15, 4, 5]

// let sum = arr.reduce((pre, cur) => pre+cur)
// var getResult = function(arr) {
//   let res = 0
//   var dfs = function(sum, path, j) {
//     if (sum % 7 === 0 && sum !== 0) {
//       res = Math.max(sum, res)
//       return
//     }
//     for (let i=j; i<arr.length; i++) {
//       path.push(arr[i])
//       sum += arr[i]
//       dfs(sum, path, i+1)
//       path.pop()
//       sum -= arr[i]
//     }
//   }
//   dfs(0, [], 0)
//   return res

// }
// let res = getResult(arr)
// console.log(res, 'res');

  // let dp = new Array(sum+1).fill(0)

  // for (let i=0; i<n; i++) {
  //   for (let j=arr[i]; j<sum; j++) {
  //     if (j % 7 === 0) {
  //       dp[j] = dp[i-arr[i]] + arr[i]
  //     }
  //   }
  // }
  // return dp[n-1]

//   let n  = 4
// let arr = [2,3 ,1, 4]

// // let sum = arr.reduce((pre, cur) => pre+cur)
// var getResult = function(arr) {
//   let res = 0
//   arr.sort()
//   var dfs = function(sum, path, j) {
//     if (path.length % 2 === 1) {
//       console.log(path);
//       res += path[(path.length-1)/2]
//     }
//     for (let i=j; i<arr.length; i++) {
//       path.push(arr[i])
//       sum += arr[i]
//       dfs(sum, path, i+1)
//       path.pop()
//       sum -= arr[i]
//     }
//   }
//   dfs(0, [], 0)
//   return res

// }

// let res = getResult(arr)
// console.log(res, 'res');

// let n  = 4
// let arr = [2,3 ,1, 4]

// var getResult = function(arr) {
//   arr.sort()
//   let res = 0
//   let left = 0, path = []
//   for (let right = 0; right < arr.length; right++) {
//     let num = arr[right]
//     path.push(num)
//     while (path.length % 2 === 0) {
//       path.shift()
//       left++
//     }
//     console.log(path);
//     res += path[(path.length-1)/2]
//   }
//   return res

// }

// let res = getResult(arr)
// console.log(res, 'res');

let n  = 4
let arr = [3,1,2,5,4]

// let sum = arr.reduce((pre, cur) => pre+cur)
var getResult = function(arr) {
  let res = 0
  arr.sort()

  var getCount = function(index) {
    let count = 0
    let left = index, right = index
    while (left >= 0 && right < arr.length) {
      count += arr[index]
      left--
      right++
    }
    return count
  }
  for (let i=0; i<arr.length; i++) {
    res += getCount(i)
  }
  return res
}



let res = getResult(arr)
console.log(res, 'res');