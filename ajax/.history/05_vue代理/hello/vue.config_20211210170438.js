// 用于开启一台服务器

module.exports = {
  // 方式一
  // 缺点：只能配置一个代理，使用不灵活
  // devServer: {
  //   // 发送请求的服务器
  //   proxy: 'http://localhost:5000'
  // }

  // 方式二
  devServer: {
    proxy: {
      // 请求前缀
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: {
          '^/api': ''
        },
        // 用于支持websocket
        ws: true,
        // 用于告诉服务器请求是否来自于代理服务器，默认true
        // true表示说谎，请求端口为5000， 则代理也为5000
        changeOrigin: true
      },
     
    }
  }


}