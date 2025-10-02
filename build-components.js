#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

/**
 * 扫描src目录下的所有组件目录
 * 每个目录包含index.js的都被视为一个组件
 */
function scanComponents() {
  const components = [];

  // 读取src目录
  const items = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const item of items) {
    // 只处理目录，排除文件和特殊目录
    if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
      const componentDir = path.join(srcDir, item.name);
      const indexFile = path.join(componentDir, 'index.js');

      // 检查是否存在index.js文件
      if (fs.existsSync(indexFile)) {
        components.push(item.name);
      }
    }
  }

  return components.sort(); // 按字母顺序排序
}

/**
 * 生成入口文件内容
 */
function generateIndexContent(components) {
  const imports = components.map((comp) => `import './${comp}/index.js';`).join('\n');

  return `// 自动注册所有Web Components
// 本文件由 build-components.js 自动生成，请勿手动编辑
${imports}
`;
}

/**
 * 主函数
 */
function main() {
  try {
    console.log('🔍 扫描组件目录...');
    const components = scanComponents();

    if (components.length === 0) {
      console.log('⚠️  未找到任何组件');
      return;
    }

    console.log(`📦 发现 ${components.length} 个组件:`, components.join(', '));

    const content = generateIndexContent(components);
    const indexPath = path.join(srcDir, 'index.js');

    // 检查内容是否发生变化
    const existingContent = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf-8') : '';

    if (content === existingContent) {
      console.log('✅ 组件列表未变化，无需更新');
      return;
    }

    // 写入新的入口文件
    fs.writeFileSync(indexPath, content, 'utf-8');
    console.log('✅ 已更新 src/index.js');
  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { scanComponents, generateIndexContent };
