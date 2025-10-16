# vanilla-components

简体中文 | [English](READM-EN.md)

vanilla-components 是一个使用原生 javascript 构建的基于 Web 组件的轻量级 UI 组件库。因此，你可以不依赖任何构建工具和框架，直接下载使用。

🚧 当前项目正在开发中。

你的浏览器需要支持 ES2022 和一些新的 css 属性(如`color-mix`函数，css 原生嵌套等，项目中有广泛使用)，以下是支持它们的浏览器列表

| Chrome | Firefox | Safari | Edge |
| ------ | ------- | ------ | ---- |
| 120+   | 120+    | +17.2  | 120+ |

## 使用

使用 CND 引入最新版本:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@cirolee/vanilla-components@latest/dist/vanilla-components.esm.js"></script>
```

你应该将`va-theme-provider` 组件作为根组件，它仅提供主题颜色，其他组件应该放在里面。

```html
<body>
  <va-theme-provider>
    <va-button>Button</va-button>
  </va-theme-provider>
</body>
```

## 文档

[vanilla-components](https://vanilla-components.pages.dev)
