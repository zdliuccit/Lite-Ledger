## 1. Expo 工程初始化

- [x] 1.1 在仓库根目录使用官方 `create-expo-app` 创建基于 SDK 55 的默认 Expo Router + TypeScript 工程
- [x] 1.2 安装并校准 Expo 依赖，确认 `package.json`、锁文件和基础脚本符合当前 SDK 约束
- [x] 1.3 清理默认示例内容中与本次基线无关的部分，保留最小可运行应用骨架

## 2. Tamagui 集成

- [x] 2.1 安装 `tamagui`、`@tamagui/config` 及所需配套依赖，并新增 Tamagui 配置文件
- [x] 2.2 在应用根布局中接入 `TamaguiProvider`、主题入口和必要的 Babel / 字体配置
- [x] 2.3 将默认首页替换为使用 Tamagui 组件构建的基础演示界面，验证组件可正常渲染

## 3. Android / iOS 开发链路

- [x] 3.1 配置并检查 Android / iOS 本地开发命令，确保 `expo start`、`expo run:android`、`expo run:ios` 的入口明确
- [x] 3.2 根据 Expo CNG 工作流补充预构建约定和必要文档，说明何时使用 `expo prebuild`
- [x] 3.3 检查 `.gitignore` 与相关配置，确保生成目录与本地临时文件处理符合 Expo 默认实践

## 4. 验证与交付

- [x] 4.1 运行依赖健康检查工具（如 `expo-doctor`）并修复发现的问题
- [x] 4.2 在当前机器条件允许时执行基础启动与至少一个平台的原生运行验证；若工具链缺失则输出明确诊断
- [x] 4.3 更新仓库说明文档，记录环境要求、启动方式和 Android / iOS 开发步骤
