import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import pkg from './package.json';

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
      resolve(),
      terser(),
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
    plugins: [resolve(), terser()],
  },
];
