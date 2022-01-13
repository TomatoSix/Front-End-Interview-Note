const express = require('express')

const app = express()

app.get('/students', (request, response) => {
  // 设置响应头
  response.setHeader("Access-Control-Allow-Origin","*")
  const data = [
    {
      id: '1',
      name: 'six'
    },
    {
      id: '2',
      name: 'qq'
    },
    {
      id: '3',
      name: '560'
    }
  ]
  response.send(JSON.stringify(data))
})

app.all('/students2', (request, response) => {
  // 设置响应头
  // response.setHeader("Access-Control-Allow-Origin","*")
  const data = [
    {
      id: '1',
      name: 'six'
    },
    {
      id: '2',
      name: 'qq'
    },
    {
      id: '3',
      name: '560'
    }
  ]
  const res = JSON.stringify(data)
  response.send(`handle(${res})`)
})

app.listen('5000', () => {
  console.log('5555端口已经开启');
})