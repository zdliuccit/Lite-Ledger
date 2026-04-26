## Why

当前仓库是空仓库，尚未建立任何 React Native 工程骨架、UI 组件体系或原生开发链路。现在需要一次性确定一个可持续升级的官方基线，在仓库根目录落地最新稳定版 Expo 工程，并集成 Tamagui，确保后续可以直接面向 Android 和 iOS 开发。

## What Changes

- 在仓库根目录使用官方 `create-expo-app` 创建最新稳定版 Expo 工程，并显式选择当前稳定 SDK 对应模板，避免过渡期拉取到旧 SDK。
- 采用 Expo Router + TypeScript 作为默认应用结构，保留 Expo 官方推荐的 Continuous Native Generation 工作流。
- 集成 Tamagui 作为组件库，补齐基础配置、Provider 注入、主题入口与示例界面，确保工程启动后即可使用 Tamagui 组件。
- 补齐 Android / iOS 本地开发脚本与说明，约定通过 Expo `run:android`、`run:ios` 和 `prebuild` 完成本地原生调试链路。
- 增加环境验证步骤，覆盖依赖安装、Expo Doctor、基础启动和平台构建可达性检查。

## Capabilities

### New Capabilities

- `expo-project-bootstrap`: 在仓库根目录初始化基于最新稳定 Expo SDK 的 React Native 应用骨架，并提供可启动的默认工程结构。
- `tamagui-ui-foundation`: 在 Expo 工程中集成 Tamagui 配置、Provider 和基础演示页面，使组件库开箱可用。
- `native-development-workflow`: 建立 Android 与 iOS 的本地开发、预构建和验证工作流，并在仓库中提供明确的执行入口。

### Modified Capabilities

- 无

## Impact

- 受影响目录主要包括仓库根目录下的 Expo 应用文件、`package.json`、TypeScript 配置、Expo Router 目录结构、Tamagui 配置文件以及开发文档。
- 新增依赖将包含 Expo SDK 相关包、Tamagui 组件与配置包，以及与字体、Babel 配置和本地运行相关的开发依赖。
- 本变更将确定仓库的跨平台应用基线，并把 Android / iOS 原生目录的生成方式统一到 Expo CNG / Prebuild 流程。
