百度阿里网易大疆等大小厂前端校招面筋
https://www.nowcoder.com/discuss/123161?channel=-1&source_id=profile_follow_post_nctrack

css3 常用新特性总结(有例子超详细)
https://juejin.cn/post/6844903988647690247#heading-10

1.  什么是<!DOCTYPE>

    是 html5 标准网页声明，且必须声明在 HTML 文档的第一行。
    来告知浏览器的解析器用什么文档标准解析这个文档

    1. 严格模式(标准模式)
       指浏览器按照 W3C 标准解析代码
       标准模式又可以分为准标准模式 、 标准模式

       1. HTML 4.01 严格型

          ```html
          <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.3c.org/TR/html4/strict.dtd">
          ```

       1. XHTML 1.0 严格型

          ```html
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.3c.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
          ```

       1. HTML5

          ```html
          <!DOCTYPE html>
          ```

    2. 混杂模式(怪异模式或兼容模式)
       指浏览器用自己的方式解析代码

2.  meta 标签 - 提供给页面的一些元信息

    https://juejin.cn/post/6987919006468407309

    用来描述一个 HTML 网页文档的属性，例如作者、日期和时间、网页描述、关键词、页面刷新等.提供 SEO
    meta 里的数据是供机器解读的，告诉机器该如何解析这个页面

    1. charset 声明文档使用的字符编码，解决乱码问题

    ```html
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    ```

    2. name - author keywords robots viewport description

    ```html
    <!-- 页面标题<title>标签(head 头部必须) -->
    <title>your title</title>
    <!-- 页面关键词 keywords -->
    <meta name="keywords" content="your keywords" />
    <!-- 页面描述内容 description -->
    <meta name="description" content="your description" />
    <!-- 定义网页作者 author -->
    <meta name="author" content="author,email address" />
    <!-- viewport主要是影响移动端页面布局的 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- 告诉搜索引擎机器人抓取哪些页面，all / none / index / noindex / follow / nofollow。 -->
    <meta name="robots" content="all" />
    ```

    3. http-equiv 属性
       http-equiv 一般设置的都是与 http 请求头相关的信息，设置的值会关联到 http 头部。也就是说浏览器在请求服务器获取 html 的时候，服务器会将 html 中设置的 meta 放在响应头中返回给浏览器。
       常见的类型比如 content-type, expires, refresh, set-cookie, window-target, charset， pragma 等等。

    ```html
    <!-- 用来声明文档类型、设置字符集 -->
    <meta http-equiv="content-type" content="text/html charset=utf8">
    <!-- 用于设置浏览器的过期时间，就是响应头中的expires属性 -->
    <meta http-equiv="expires" content="31 Dec 2021">
    <!-- 该种设定表示5秒自动刷新并且跳转到指定的网页。如果不设置url的值那么浏览器则刷新本网页。 -->
    <meta http-equiv="refresh" content="5 url=http://www.zhiqianduan.com">
    <!-- 强制页面在当前窗口以独立页面显示, 可以防止别人在框架中调用自己的页面。 -->
    <meta http-equiv="window-target" content="_top'>
    ```

    4. content 和 name 或者 http-equiv 一起使用

3.  语义化标签作用

    1. 代码结构:  使页面没有 css 的情况下，也能够呈现出很好的内容结构
    2. 有利于 SEO: 爬虫依赖标签来确定关键字的权重，因此可以和搜索引擎建立良好的沟通，帮助爬虫抓取更多的有效信息
    3. 提升用户体验: 例如 title、alt 可以用于解释名称或者解释图片信息，以及 label 标签的灵活运用。
    4. 便于团队开发和维护: 语义化使得代码更具有可读性，让其他开发人员更加理解你的 html 结构，减少差异化。
    5. 方便其他设备解析: 如屏幕阅读器、盲人阅读器、移动设备等，以有意义的方式来渲染网页。

4.  html5 新属性

    1. Canvas 画布
       <canvas>标签只是图形容器，必须使用脚本来绘制图形

    2. Video(视频)

    3. Audio(音频)

    4. 新的 Input 类型 <input type="input类型">
       color 用于在 input 字段选取颜色 `<input type="color" name="favcolor">`
       date 允许从日期选择器中选择一个日期
       datetime 允许选择一个日期
       email 用于应该包含 e-mail 地址的输入域
       month 允许选择一个月份
       number 用于应该包含数值的输入域
       range 用于应该包含一定范围内数字值的输入域
       search 用于搜索域
       tel 定义输入电话号码字段
       time 允许选择一个时间
       url 用于应该包含 URL 地址的输入域
       week 允许选择周和年

    5. 表单元素

       1. <datalist> 类似于下拉框
       2. <output> 定义不同类型的输出

    6. 表单属性

    7. 语义化标签 - 基本都有利于 SEO
       <header> <nav> <section> <article> <aside> 
       <figcaption> 定义<figure>元素的标题
       <figure> 规定独立的流内容
       <footer>

    8. Web 存储
       客户端存储数据的两个对象为
       localStorage - 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去除
       sessionStorage - 用于临时保存同一窗口或标签页的数据，在关闭窗口或标签页之后将会删除这些数据

       保存数据：localStorage.setItem(key,value);
       读取数据：localStorage.getItem(key);
       删除单个数据：localStorage.removeItem(key);
       删除所有数据：localStorage.clear();
       得到某个索引的 key：localStorage.key(index);

    9. web worker

       WebWorker 允许在主线程之外再创建一个 worker 线程，在主线程执行任务的同时，worker 线程也可以在后台执行它自己的任务，互不干扰。

       ```html
       <!DOCTYPE html>
       <html>
         <head>
            
           <meta charset="utf-8" />
           <title>菜鸟教程(runoob.com)</title>
            
         </head>

         <body>
           <p>计数： <output id="result"></output></p>
           <button onclick="startWorker()">开始工作</button>
           <button onclick="stopWorker()">停止工作</button>

           <script>
             var w;
             function startWorker() {
               if (typeof Worker !== "undefined") {
                 if (typeof w == "undefined") {
                   w = new Worker("demo_workers.js");
                 }
                 w.onmessage = function (event) {
                   document.getElementById("result").innerHTML = event.data;
                 };
               } else {
                 document.getElementById("result").innerHTML =
                   "抱歉，你的浏览器不支持 Web Workers...";
               }
             }
             function stopWorker() {
               w.terminate();
               w = undefined;
             }
           </script>
         </body>
       </html>
       ```

    10. web socket

        WebSocket 的出现，让服务器端可以主动向客户端发送信息，使得浏览器具备了实时双向通信的能力

        - 应用
          体育赛事、聊天室、实时位置等场景

5.  css3 新属性

    1. 边框 border-radius box-shadow border-image

       1. 边框阴影
          box-shadow: h-shadow v-shadow blur spread color inset;
          box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色

       2. 圆角
          border-radius: 用于创建圆角
          四个 border-top-left-radius | border-top-right-radius | border-bottom-right-radius | border-bottom-left-radius 属性的缩写

       四个值： 左上 右上 右下 左下
       三个值： 左上 右上和左下 右下
       两个值： 左上与右下 右上与左下
       一个值： 四个圆角值相同

       3. border-image

    2. 背景 background-image background-size

       border-image: 使用图像创建一个边框

       border-image: source slice width outset repeat|initial|inherit;

    3. 渐变 `background-image: linear-gradient`
       CSS3 定义了两种类型的渐变：线性渐变 和 径向渐变（由它的中心定义）

       线性渐变

       ```css
       background-image: linear-gradient(
         direction,
         color-stop1,
         color-stop2,
         ...
       );
       ```

       径向渐变

       ```css
       background-image: radial-gradient(
         shape size at position,
         start-color,
         ...,
         last-color
       );
       ```

    4. 文本效果 text-overflow text-overflow text-wrap

       hanging-punctuation 规定标点字符是否位于线框之外。
       punctuation-trim 规定是否对标点字符进行修剪。
       text-align-last 设置如何对齐最后一行或紧挨着强制换行符之前的行。
       text-emphasis 向元素的文本应用重点标记以及重点标记的前景色。
       text-justify 规定当 text-align 设置为 "justify" 时所使用的对齐方法。
       text-outline 规定文本的轮廓。
       text-overflow 规定当文本溢出包含元素时发生的事情。
       text-shadow 向文本添加阴影。
       text-wrap 规定文本的换行规则。
       word-break 规定非中日韩文本的换行规则。
       word-wrap 允许对长的不可分割的单词进行分割并换行到下一行。

    5. 字体 - 引用字体文件

       - @font-face

       ```css
       @font-face {
         font-family: myFirstFont; //规定字体的名称
         src: url(sansation_light.woff); //定义字体文件的URL
       }
       div {
         font-family: myFirstFont;
       }
       ```

    6. 2D 转换 - transform

       1. translate()：元素从其当前位置移动，根据给定的 left（x 坐标） 和 top（y 坐标） 位置参数。 transform: translate(50px,100px);
       2. rotate()：元素顺时针旋转给定的角度。允许负值，元素将逆时针旋转。transform: rotate(30deg);
       3. scale()：元素的尺寸会增加或减少，根据给定的宽度（X 轴）和高度（Y 轴）参数。transform: scale(2,4);
       4. skew()：元素翻转给定的角度，根据给定的水平线（X 轴）和垂直线（Y 轴）参数。transform: skew(30deg,20deg);
       5. matrix()： 把所有 2D 转换方法组合在一起，需要六个参数，包含数学函数，允许您：旋转、缩放、移动以及倾斜元素。transform:matrix(0.866,0.5,-0.5,0.866,0,0);

    7. 3D 转换 - transform

       - rotateX()：元素围绕其 X 轴以给定的度数进行旋转。transform: rotateX(120deg);
       - rotateY()：元素围绕其 Y 轴以给定的度数进行旋转。transform: rotateY(130deg);

    8. transition 过渡效果
       指定要添加效果的 CSS 属性和指定效果的持续时间
       `transition: width 2s`

       ```css
       div {
         width: 100px;
         height: 100px;
         background: red;
         transition: width 2s, height 2s, transform 2s;
       }

       div:hover {
         width: 200px;
         height: 200px;
         transform: rotate(180deg);
       }
       ```

       ```html
       <div>鼠标移动到 div 元素上，查看过渡效果。</div>
       ```

    9. 动画 animation @keyframes

       ```css
       div {
         width: 100px;
         height: 100px;
         background: red;
         /* 关键帧的名称  指定多少时间内完成 播放次数 */
         animation: myfirst 5s infinite;
       }

       /* 定义动画的名称 */
       @keyframes myfirst {
         from {
           background: red;
         }
         to {
           background: yellow;
         }
       }
       ```

       1. animation-name 关键帧的名称
       2. animation-duration 指定多少毫秒完成
       3. animation-delay 设置动画在启动前的延迟间隔
       4. animation-iteration-count 设置动画的播放次数

    10. 多媒体查询

    11. flex 布局

# 点击盒子 100ms 向右移动 100px

```css
* {
  margin: 0;
  padding: 0;
}
.main {
  position: relative;
  top: 0;
  left: 0;
  height: 900px;
  width: 900px;
  background-color: rgb(199, 199, 236);
}
#box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background-color: pink;
}
```

```html
<div class="main">
  <div id="box"></div>
  <button id="btn">点击向右移动100px</button>
</div>
```

```js
//element.style只能获取style设置的属性值
var box = document.getElementById("box");
let btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  var left = parseInt(getComputedStyle(box).left);
  var left = left + 200;
  var interval = setTimeout(function () {
    box.style.left = left + "px";
  }, 100);
});
```

# 实现动画，元素先向右移动 200px,再返回原点，一共移动 n 次

```css
div {
  width: 100px;
  height: 100px;
  background: red;
  position: relative;
  animation: mymove 2s 2;
  /*Safari、Chrome 和 Opera*/
  -webkit-animation: mymove 2s 2;
}
@keyframes mymove {
  from {
    left: 0px;
  }
  to {
    left: 200px;
  }
}
/*Safari、Chrome 和 Opera*/
@-webkit-keyframes mymove {
  from {
    left: 0px;
  }
  to {
    left: 200px;
  }
}
```

# iframe

# 移动端 300ms 点击延迟和点击穿透

https://juejin.cn/post/6844903633528553485

由于移动端会有双击缩放的这个操作，因此浏览器在 click 之后要等待 300ms,看用户有没有下一次点击，也就是这次操作是不是双击

# 常见的 HTML5 标签有：

- <section> - 章节
- <nav> - 导航
- <article> - 完整独立内容块
- <aside> - 和页面内容关联度较低的内容：例如广告（剩余的）
- <header> - 页面或者文章头部
- <footer> - 页面或者文字尾部
- <main> - 文档主要内容
- <figure> - 一个和文档有关的图例
- <figcaption> - 图例说明
- <mark> - 需要被高亮的引用文字
- <video> - 视频
- <audio> - 音频
- <source> - 为 video 和 audio 指定 媒体源
- <track> - 为 video 和 audio 指定 文本轨道（字幕）
- <canvas> - 位图区域
- <svg> - 矢量图
- <progress> - 进度条
- <meter> - 滑动条

# document、window、html、body 的层级关系：

window > document > html > body

- window 是 BOM 的核心对象，它一方面用来获取和设置浏览器的属性和行为，另一方面作为一个全局对象。
- document 对象是一个跟文档相关的对象，拥有一些操作文档内容的功能，但是地位没有 window 高。
- html 元素对象跟 document 元素对象是属于 html 文档的 DOM 对象，可以认为就是 html 源代码中那些标签 化成的对象，它们跟 div、select 这些对象没有什么根本区别。
