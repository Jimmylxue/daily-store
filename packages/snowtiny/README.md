<br>

<h1 align="center">Welcome to snow-tiny 👋</h1>

<br>

snow-tiny 是一个专为前端同学开发的基于 tiny 的简单、轻量级的图片压缩工具。

只需三步，就可实现图片自动化压缩，极大提高效率和压缩体验！

![image-20221127111339637](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20221127111339637.png)

开发文档: [传送门](http://www.jimmyxuexue.top:999/snowtiny/guide/introduce.html)

GitHub: [传送门](https://github.com/Jimmylxue/daily-store/tree/master/packages/snowtiny)

> issues 是第一生产力！😄

知识星球：[传送门](http://www.jimmyxuexue.top)

> 大兄弟们聚过来，这件事很重要 🎉🎉🎉

(如果觉得不错 👍，给个 star ⭐ 吧，你的认可是我最大的动力 ！)

## 使用：

1. 安装

```
yarn add snow-tiny
```

2. 配置

项目根目录下新建 `snowtiny.json` 并做如下配置：

> 具体配置信息见:[传送门](http://www.jimmyxuexue.top:999/snowtiny/usage/config.html)

```json
{
	"entry": "./images",
	"output": "./temp",
	"diffCompress": true,
	"tile": true,
	"saveOther": true
}
```

在`package.json` 中增加如下脚本：

```json
scripts: {
  "compress": "npx snow”
}
```

3. 运行

```
npm run compress
```
