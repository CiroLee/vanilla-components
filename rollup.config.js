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
// plugin - 删除style的注释
function removeStyleComments() {
  return {
    name: 'remove-style-comments',
    generateBundle(_, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type === 'chunk') {
          file.code = file.code.replace(/<style[^>]*>[\s\S]*?<\/style>/g, (styleBlock) => styleBlock.replace(/\/\*[\s\S]*?\*\//g, ''));
        }
      }
    },
  };
}
// plugin - 移除无用的空白字符，包括换行符、空格等
function removeEmpties() {
  return {
    name: 'remove-empties',
    renderChunk(code) {
      // 只进行最安全的空白字符移除操作
      let optimizedCode = code
        // 移除行尾的空白字符
        .replace(/[ \t]+$/gm, '')
        // 移除行首的多个空格（保持缩进一致）
        .replace(/^\s+/gm, (match) => match.length >= 2 ? ' ' : match)
        // 将多个连续的换行符减少为两个
        .replace(/\n{3,}/g, '\n\n')
        // 将多个连续的空格（不在字符串或注释内）替换为单个空格
        .replace(/ {2,}/g, ' ');

      return {
        code: optimizedCode,
      };
    },
  };
}
const commonPlugins = [
  removeStyleComments(),
  removeEmpties(), // 移除空格和换行符
  resolve(),
  terser({
    format: {
      comments: false, // 删除注释
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
