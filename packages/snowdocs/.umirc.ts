import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  title: 'snowdocs',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  chainWebpack: (memo, {}) => {
    const packagePath = path.resolve(__dirname, '../snowhooks');
    memo.module.rule('js').include.add(packagePath);
    // memo.module.rule('tsx').include.add(path.join(__dirname, '../snowhooks/'));
    // memo.module.rule('ts').include.add(path.join(__dirname, '../snowhooks/'));
    // memo.module.rule('@daily-store/snowhooks').include.add(path.join(__dirname, '../snowhooks/'));
  },
  // more config: https://d.umijs.org/config
});
