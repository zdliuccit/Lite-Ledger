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

### 复查结论

- 追加扫描 `src/features/ledger`、`src/theme` 与 `src/app` 后，未再发现中文变量名、中文类型名、中文对象属性访问或中文 JSX prop 名残留。
- 当前 `ledger` 目录中剩余的中文内容为页面展示文案、导航标题、可访问性文本和设计稿资源路径，不属于 TypeScript 标识符错误范围。
- `pnpm lint`：通过

## 2026-04-26 ledger pages 命名修复阶段

- 执行者：Codex
- 任务：修复 `src/features/ledger/pages` 中因变量和接口命名从中文迁移到英文后遗留的页面错误

### 上下文收集

- 对照 `ledger-basic.tsx`、`ledger-lists.tsx`、`ledger-charts.tsx`、`ledger-keypad.tsx`，确认页面组件 props 已统一为英文命名。
- 对照 `ledger-mock-data.ts` 与 `ledger-theme.ts`，确认 mock data 导出名、数据字段和主题 key 已统一为英文命名。
- 检查 `home-page.tsx` 与 `bills-page.tsx`，确认它们已经是英文接口写法，可作为同目录参考实现。

### 实施过程

- 将 `assets-page.tsx`、`add-record-page.tsx`、`budget-page.tsx`、`statistics-page.tsx`、`report-page.tsx`、`accounts-page.tsx`、`mine-page.tsx` 的中文旧接口全部替换为英文接口。
- 同步修复中文 mock data 导入名、中文数据字段、中文主题 key 和中文图表 items 字段。
- 将上述页面中的局部状态名、类型别名和样式 key 统一改为英文，降低后续继续混用两套命名体系的风险。

### 验证结果

- `pnpm exec tsc --noEmit`：通过
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

## 2026-04-26 启动页实现阶段

- 执行者：Codex
- 任务：基于 `ledger_design/lite_ledger_splash_screen_3x/` 设计稿实现可复用启动页组件

### 上下文收集

- 检查设计素材目录，确认完整启动页、仅图标版和图标源图均已提供。
- 对照效果图，确认核心元素包括：浅绿到浅青的背景渐变、顶部与底部光晕、四个描边圆、底部波浪线、应用图标、双语标题和底部英文标语。
- 检查现有依赖后补充 `expo-linear-gradient`，用于还原设计中的渐变和柔光层。

### 实施过程

- 新增 `src/components/splash-screen.tsx`，封装启动页为独立组件。
- 使用当前应用图标 `src/assets/app/icon/icon.png` 作为页面主视觉图标。
- 通过 `LinearGradient`、装饰圆环、波浪线段和阴影组合还原设计稿氛围。
- 重写 `src/app/index.tsx`，让首页直接挂载启动页组件。

### 验证结果

- `pnpm exec tsc --noEmit`：通过
- `pnpm lint`：通过
