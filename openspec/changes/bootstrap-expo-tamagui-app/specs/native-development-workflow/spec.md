## ADDED Requirements

### Requirement: 工程必须提供 Android 与 iOS 的本地开发入口

系统 MUST 为 Android 和 iOS 提供明确的本地开发命令入口，并与 Expo 官方工作流保持一致。

#### Scenario: 触发 Android 本地运行

- **WHEN** 开发者在具备 Android 工具链的机器上执行 Android 运行命令
- **THEN** 工程必须能够进入 Expo 的 Android 原生运行流程，并在需要时自动触发预构建

#### Scenario: 触发 iOS 本地运行

- **WHEN** 开发者在具备 Xcode 与 CocoaPods 的 macOS 机器上执行 iOS 运行命令
- **THEN** 工程必须能够进入 Expo 的 iOS 原生运行流程，并在需要时自动触发预构建

### Requirement: 工程必须说明预构建与环境前置条件

系统 MUST 在仓库文档中说明 Android / iOS 本地开发所依赖的前置环境，以及何时需要使用 Expo Prebuild。

#### Scenario: 阅读开发说明

- **WHEN** 新开发者查看仓库说明文档
- **THEN** 文档必须明确列出 Android / iOS 的主要前置工具、常用启动命令，以及 `expo prebuild` 在本项目中的使用时机
