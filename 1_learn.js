let arr = [1, 2, 3, 4, 5];

arr.reduce((pre, cur) => {
  return pre.then(() => {
    // 实质上就是sleep函数
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(cur);
        resolve();
        // 或者
        // resolve(console.log(cur));
      }, 1000);
    });
  });
}, Promise.resolve());
