let p = new Promise((resolve, reject) => {
  resolve();
});
console.log(p instanceof Promise);
