## Context

当前仓库为空，仅包含 Git 与 IDE 元数据，没有现成业务代码或移动端工程结构。`openspec/project.md` 与 `openspec/AGENTS.md` 当前不存在，因此本设计以仓库现状、OpenSpec 变更要求，以及截至 2026-04-26 查证的 Expo / Tamagui 官方文档为依据。

已确认的外部约束如下：

- Expo 最新稳定 SDK 为 SDK 55，发布时间为 2026-02-25。
- Expo 官方文档说明，在 SDK 55 过渡期内，`create-expo-app@latest` 不带模板参数时仍可能创建 SDK 54 工程，因此需要显式指定 `--template default@sdk-55`。
- Tamagui 官方提供独立模板，但该模板更依赖其自身脚手架和 Yarn 版本约束，不利于优先锁定最新 Expo 官方基线。

## Goals / Non-Goals

**Goals:**

- 在仓库根目录建立基于 Expo 最新稳定 SDK 的 React Native 工程。
- 使用 Tamagui 作为默认组件库，并完成最小可用的配置接入。
- 让项目具备 Android / iOS 的本地开发入口，包括启动、预构建和原生运行命令。
- 保持方案尽量贴近 Expo 与 Tamagui 官方推荐路径，降低后续升级成本。

**Non-Goals:**

- 不在本次变更中实现任何业务页面、状态管理、接口层或后端集成。
- 不在本次变更中引入额外设计系统、自定义脚手架或多包 monorepo 结构。
- 不承诺在缺失 Xcode、CocoaPods、Android SDK 或模拟器的机器上完成实际原生编译；缺失时以环境诊断和补充说明为准。

## Decisions

### 1. 使用官方 `create-expo-app` 显式创建 SDK 55 默认模板

决策：
采用 `create-expo-app@latest --template default@sdk-55` 在仓库根目录创建工程。

原因：

- 这是 Expo 官方截至 2026-04-26 对“创建最新稳定项目”的明确做法。
- `default` 模板自带 Expo Router 与 TypeScript，适合作为后续应用开发的标准基线。
- 显式指定 `sdk-55` 可以避开过渡期默认仍落到 SDK 54 的不确定性。

备选方案：

- `bare-minimum`：会直接生成 `android/` 和 `ios/`，但仓库初始复杂度更高，且不符合 Expo 当前更推荐的 CNG / Prebuild 工作流。
- `yarn create tamagui --template expo-router`：能更快带出 Tamagui，但脚手架不由 Expo 官方主导，Expo 版本同步节奏和依赖约束不如直接从 Expo 官方模板开始更可控。

### 2. 采用 Expo Router 默认结构，手工集成 Tamagui 最小可用能力

决策：
保留 Expo 默认的 Router 结构，在此基础上补充 `tamagui.config.ts`、Provider 注入、基础主题和演示页面。

原因：

- Expo 默认模板已经为路由、TypeScript、目录结构和启动流程提供稳定基线。
- Tamagui 官方文档表明，可以在 Expo 工程中以较小改动完成接入，不需要为了组件库而放弃 Expo 默认骨架。
- 手工集成更容易控制依赖版本、配置范围和最终工程结构。

备选方案：

- 直接替换为 Tamagui 官方完整 starter：集成更快，但模板包含更多预设，不利于空仓库场景下保持最小、可理解的初始结构。

### 3. 原生平台支持采用 Expo CNG / Prebuild，而不是预提交固定原生目录

决策：
默认不以手工维护的 `android/`、`ios/` 目录作为工程真源，而是依赖 Expo 的 `prebuild` / `run:android` / `run:ios` 工作流按需生成。

原因：

- Expo 官方将 CNG 视为推荐路径，能减少手工维护原生工程的升级负担。
- 对于全新仓库，这比一开始就固化原生目录更轻量，也更符合 Expo 管理式开发体验。
- 当需要本地原生调试时，`expo run:*` 会自动触发预构建，足以满足 Android / iOS 支持要求。

备选方案：

- 首次实现时直接提交 `android/` 与 `ios/`：可让目录直观可见，但后续同步配置、升级依赖和维护变更成本更高。

### 4. 验证策略覆盖依赖、工程健康和平台构建入口

决策：
实现阶段的验证至少包括依赖安装、`expo-doctor`、基础启动检查，以及在当前机器具备条件时执行 `expo run:ios` / `expo run:android` 或 `expo prebuild`。

原因：

- 仅创建文件不足以证明开发环境真的可用。
- Expo 工程经常在依赖版本、Babel 配置和原生工具链上出现启动期错误，需要通过官方工具做最小闭环验证。

## Risks / Trade-offs

- [最新 Expo 版本过渡期默认模板仍可能落到旧 SDK] -> 通过显式指定 `--template default@sdk-55` 消除歧义。
- [Tamagui 配置点分散在 Babel、Provider、字体和配置文件中，接入时容易漏项] -> 按官方 Expo 指南采用最小配置集，先保证启动和组件渲染，再考虑编译优化。
- [本机可能缺少 Xcode、CocoaPods、Android SDK 或模拟器] -> 在实施时先检测工具链，可运行则完成构建验证，不可运行则记录缺失项并保留工程基线。
- [空仓库直接引入整套移动端工程，初始改动量较大] -> 保持实现范围只覆盖脚手架、组件库接入和平台链路，不引入业务代码或额外基础设施。
