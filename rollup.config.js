import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import pkg from './package.json' with { type: 'json' };

const repository = pkg.repository.url.replace(/(.+)(:\/\/.+)\.git$/, 'https$2');
const now = new Date();
const date = `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`;
const banner = `/**
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 *
 * Copyright (c) 2025-present ${pkg.author.name}
 * @license ${pkg.license}
 * @repository ${repository}
 * @date ${date}
 */`;

// plugin - 压缩模板字符串中的 HTML/CSS 内容
function minifyTemplates() {
  return {
    name: 'minify-templates',
    renderChunk(code) {
      // 匹配模板字符串（处理嵌套和转义）
      const templateRegex = /`([^`\\]|\\.)*`/g;

      const optimizedCode = code.replace(templateRegex, (template) => {
        // 保留模板字符串的反引号
        const content = template.slice(1, -1);

        const minified = content
          // 移除 HTML 注释
          .replace(/<!--[\s\S]*?-->/g, '')
          // 移除 CSS 注释（但保留 /*html*/ 这类标记前的内容已经处理）
          .replace(/\/\*(?!html|css)[\s\S]*?\*\//g, '')
          // 压缩标签之间的空白（> 和 < 之间）
          .replace(/>\s+</g, '><')
          // 移除行首空白
          .replace(/^\s+/gm, '')
          // 移除行尾空白
          .replace(/\s+$/gm, '')
          // 将多个空白字符压缩为单个空格（但保留单个换行以维持可读性）
          .replace(/[ \t]+/g, ' ')
          // 移除多余换行
          .replace(/\n+/g, '')
          // CSS: 移除 { 前后的空格
          .replace(/\s*{\s*/g, '{')
          // CSS: 移除 } 前后的空格
          .replace(/\s*}\s*/g, '}')
          // CSS: 移除 : 后的空格
          .replace(/:\s+/g, ':')
          // CSS: 移除 ; 后的空格
          .replace(/;\s*/g, ';')
          // CSS: 移除 , 后的空格
          .replace(/,\s+/g, ',')
          // 清理可能产生的多余空格
          .replace(/ +/g, ' ')
          .trim();

        return '`' + minified + '`';
      });

      return { code: optimizedCode };
    },
  };
}
const commonPlugins = [
  minifyTemplates(), // 压缩模板字符串中的 HTML/CSS
  resolve(),
  terser({
    format: {
      // 保留包含 @license 的 banner 注释
      comments: (_, comment) => /@license/i.test(comment.value),
    },
  }),
];
export default [
  // ES模块格式
  {
    input: 'src/ui/index.js',
    output: {
      file: 'dist/vanilla-components.esm.js',
      format: 'es',
      banner,
    },
    plugins: [
      // 构建前删除 dist 目录（只在第一个配置中执行）
      del({ targets: 'dist/*' }),
      ...commonPlugins,
    ],
  },
  // UMD格式
  {
    input: 'src/ui/index.js',
    output: {
      file: 'dist/vanilla-components.umd.js',
      format: 'umd',
      banner,
    },
    plugins: commonPlugins,
  },
];
