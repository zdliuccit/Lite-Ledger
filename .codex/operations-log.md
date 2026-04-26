## 2026-04-26 提案阶段

- 执行者：Codex
- 任务：为当前空仓库提出“在根目录创建 Expo 最新稳定版 React Native 工程并集成 Tamagui，支持 Android 和 iOS”的 OpenSpec 变更提案

### 上下文收集

- 检查仓库现状：当前目录仅包含 `.git`、`.idea`，不存在业务代码和移动端工程。
- 初始化 OpenSpec：执行 `openspec init --tools codex` 创建 `openspec/` 目录结构。
- 检查规范现状：`openspec/project.md` 与 `openspec/AGENTS.md` 当前不存在，无既有 spec。
- 查证外部依据：
  - Expo 官方文档显示截至 2026-04-26 最新稳定 SDK 为 55。
  - Expo 官方文档说明在 SDK 55 过渡期内，`create-expo-app@latest` 默认仍可能生成 SDK 54，因此需显式指定 `--template default@sdk-55`。
  - Tamagui 官方文档提供 Expo 集成指南，并支持在 Expo Router 工程中手工接入。

### 关键决策

- 选择变更 ID：`bootstrap-expo-tamagui-app`
- 采用官方 Expo 默认模板作为工程基线，而非 Tamagui 官方 starter。
- 原生平台工作流采用 Expo CNG / Prebuild，而非预先固化 `android/`、`ios/` 目录。
- 将需求拆分为三个 capability：
  - `expo-project-bootstrap`
  - `tamagui-ui-foundation`
  - `native-development-workflow`

### 产物

- `openspec/changes/bootstrap-expo-tamagui-app/proposal.md`
- `openspec/changes/bootstrap-expo-tamagui-app/design.md`
- `openspec/changes/bootstrap-expo-tamagui-app/tasks.md`
- `openspec/changes/bootstrap-expo-tamagui-app/specs/expo-project-bootstrap/spec.md`
- `openspec/changes/bootstrap-expo-tamagui-app/specs/tamagui-ui-foundation/spec.md`
- `openspec/changes/bootstrap-expo-tamagui-app/specs/native-development-workflow/spec.md`

### 验证

- 执行 `openspec validate bootstrap-expo-tamagui-app --strict --no-interactive`
- 首次失败原因：Requirement 正文未包含显式 `MUST` 关键字
- 修正后复验通过

## 2026-04-26 实现阶段

- 执行者：Codex
- 任务：按 `bootstrap-expo-tamagui-app` 变更实现 Expo + Tamagui 基线工程

### 实施过程

- 使用 `npx create-expo-app@latest /tmp/lite-ledger-expo --template default@sdk-55 --yes` 生成 Expo SDK 55 官方模板。
- 将模板内容同步到仓库根目录，并保留现有 `.git`、`openspec/`、`.codex/`。
- 使用 `pnpm i` 统一依赖管理，生成 `pnpm-lock.yaml`。
- 安装 Tamagui 依赖：
  - `tamagui`
  - `@tamagui/config`
  - `@tamagui/babel-plugin`
  - `@tamagui/font-inter`
- 新增 `tamagui.config.ts` 与 `babel.config.js`。
- 重写 `src/app/_layout.tsx`，接入 `TamaguiProvider`、字体加载和 Splash Screen 控制。
- 重写 `src/app/index.tsx`，用 Tamagui 组件替换 Expo 默认欢迎页。
- 删除 Expo 默认 tabs 示例与不再使用的组件、hooks、脚本。
- 将 `package.json` 脚本切换为：
  - `pnpm start`
  - `pnpm android`
  - `pnpm ios`
  - `pnpm prebuild`
  - `pnpm doctor`
  - `pnpm lint`
- 手工补充 `eslint.config.js`，并将 `eslint` 固定回 Expo 55 兼容的 9.x。
- 重写 `README.md`，补齐中文环境说明、运行命令与 iOS / Android 开发指引。
- 更新 `.gitignore`，新增 `.tmp-home/` 临时验证目录忽略规则。

### 验证结果

- `pnpm exec tsc --noEmit`：通过
- `pnpm lint`：通过
- `pnpm doctor`：通过
- `pnpm exec expo start --offline --port 8099`：已进入项目启动流程，可手动中断

### 平台诊断

- `xcodebuild -version`：可用，Xcode 16.4
- `pod --version`：不可用，命令不存在
- `adb --version`：不可用，命令不存在

### 结论

- JavaScript / TypeScript / Expo / Tamagui 基线已完成
- Android / iOS 命令入口已配置完成
- 真实原生运行仍需补齐 CocoaPods 与 Android SDK / adb
