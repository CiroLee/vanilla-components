import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';

const isProduction = process.env.NODE_ENV === 'production';

export default [
  // ES模块格式
  {
    input: 'src/ui/index.js',
    output: {
      file: 'dist/vanilla-components.esm.js',
      format: 'es',
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
      name: 'VanillaComponents', // UMD全局变量名
    },
    plugins: [resolve(), terser()],
  },
];
