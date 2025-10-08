# vanilla-components

vanilla-components is a lightweight UI component library built with native javascript and based on web components. Therefore, you don’t need any build tools and can download and use it directly.

🚧 The project is still under rapid development.

your browser should support ES2022 and some new css properties, blow list the browsers that support them

| Chrome | Firefox | Safari | Edge |
| ------ | ------- | ------ | ---- |
| 111+   | 120+    | +16.4  | 111+ |

## Usage

import it using a cdn url to use the latest version:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@cirolee/vanilla-components@latest/dist/vanilla-components.esm.js"></script>
```

the you must use `va-theme-provider` as the root element, it just provide theme color, and all other components should be placed inside it.

```html
<body>
  <va-theme-provider>
    <va-button>Button</va-button>
  </va-theme-provider>
</body>
```

## Documentation

[vanilla-components](https://vanilla-components.pages.dev)
