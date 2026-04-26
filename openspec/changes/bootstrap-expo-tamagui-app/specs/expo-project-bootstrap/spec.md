## ADDED Requirements

### Requirement: 仓库必须初始化为最新稳定 Expo 工程

系统 MUST 在仓库根目录创建一个基于 Expo 最新稳定 SDK 的 React Native 工程，并显式使用官方推荐模板，避免在 SDK 过渡期拉取到旧版本脚手架。

#### Scenario: 初始化空仓库

- **WHEN** 在空仓库中执行本变更的初始化流程
- **THEN** 仓库根目录必须生成 Expo 应用骨架，包括 `package.json`、TypeScript 配置、Expo Router 目录结构和 Expo 应用配置文件

#### Scenario: 锁定当前稳定 SDK

- **WHEN** 初始化流程选择 Expo 模板
- **THEN** 所选模板必须显式对应当前稳定 SDK，而不能依赖可能漂移的默认模板解析结果

### Requirement: 工程必须具备官方默认启动入口

系统 MUST 保留 Expo 官方默认的开发入口，使开发者能够直接通过标准命令启动项目，而不依赖额外自定义脚手架。

#### Scenario: 启动 JavaScript 开发服务

- **WHEN** 开发者在项目根目录执行标准 Expo 启动命令
- **THEN** 工程必须能够解析依赖、加载应用入口，并进入可用于后续 Android / iOS 调试的开发服务状态
