let a = 1;
var getData = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      a++;
      resolve(a);
    }, 1000);
  });
};

getData().then((res) => {
  console.log(a);
});
