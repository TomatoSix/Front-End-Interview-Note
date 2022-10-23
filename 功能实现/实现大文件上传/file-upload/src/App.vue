<template>
  <div id="app">
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">上传</el-button>
  </div>
</template>

<script>
// const SIZE = 10 * 1024 * 1024; // 默认切片大小 10M,单位是b 1M = 1024KB 1KB = 1024B
const SIZE = 1024 * 1024; // 默认切片大小 10M,单位是b 1M = 1024KB 1KB = 1024B

export default {
  name: "App",
  components: {},
  data: () => ({
    container: {
      file: null,
    },
    fileData: [],
  }),
  methods: {
    /**
     * @desc 选择上传文件
     * @date 2022-04-16
     * @param {any} e
     * @returns {any}
     */
    handleFileChange(e) {
      const [file] = e.target.files;
      console.log(file, "file");
      if (!file) return;
      Object.assign(this.$data, this.$options.data());
      this.container.file = file;
    },
    /**
     * @desc 生成文件切片
     * @date 2022-04-16
     * @param {any} file
     * @param {any} size=SIZE
     * @returns {any}
     */
    createFileChunk(file, size = SIZE) {
      // 使用 while 循环和 slice 方法将切片放入 fileChunkList 数组中返回
      const fileChunkList = [];
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + size) });
        cur += size;
      }
      return fileChunkList;
    },
    /**
     * @desc 给切片数组加表示并且上传切片
     * @date 2022-04-16
     * @returns {any}
     */
    async handleUpload() {
      if (!this.container.file) return;
      // 获取到文件切片
      const fileChunkList = this.createFileChunk(this.container.file);
      // 给文件切片加标识
      this.fileData = fileChunkList.map(({ file }, index) => {
        return {
          chunk: file,
          hash: this.container.file.name + "-" + index,
        };
      });
      // 发送post请求
      await this.uploadChunks();
    },
    /**
     * @desc 发送请求
     * @date 2022-04-16
     * @returns {any}
     */
    async uploadChunks() {
      const requestList = this.fileData
        .map(({ chunk, hash }) => {
          console.log(chunk, "chunk");
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", hash);
          formData.append("filename", this.container.file.name);
          return { formData };
        })
        .map(async ({ formData }) => {
          this.request({
            ulr: "http://localhost:3000",
            data: formData,
          });
        });
      console.log(requestList, "requestList");
      // 并发上传所有的切片
      await Promise.all(requestList);
    },

    /**
     * @desc 封装xhr发送请求post
     * @date 2022-04-16
     * @param {any} {url
     * @param {any} method="post"
     * @param {any} data
     * @param {any} headers={}
     * @param {any} requestList}
     * @returns {any}
     */
    request({ url, method = "post", data, headers = {}, requestList }) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        Object.keys(headers).forEach((key) =>
          xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = (e) => {
          resolve({
            data: e.target.response,
          });
        };
      });
    },
  },
};
</script>

<style></style>
