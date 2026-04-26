# lite-ledger

基于 Expo SDK 55、Expo Router、React Native 0.83 和 Tamagui 的移动端基线工程。项目使用 `pnpm` 管理依赖，默认支持 Android、iOS 和 Web，其中原生开发链路采用 Expo CNG / Prebuild。

## 技术栈

- Expo SDK 55
- React Native 0.83
- Expo Router
- Tamagui `2.0.0-rc.41`
- TypeScript
- pnpm

## 环境要求

### 通用

- Node.js 22+
- pnpm 10+

### iOS

- macOS
- Xcode 16+
- CocoaPods

### Android

- Android Studio
- Android SDK
- `adb` 可执行文件在 PATH 中

## 安装依赖

```bash
pnpm i
```

## 常用命令

```bash
pnpm start
pnpm start:clear
pnpm android
pnpm ios
pnpm prebuild
pnpm prebuild:clean
pnpm doctor
pnpm lint
```

命令说明：

- `pnpm start`：启动 Expo 开发服务
- `pnpm start:clear`：清空缓存后启动
- `pnpm android`：执行 `expo run:android`
- `pnpm ios`：执行 `expo run:ios`
- `pnpm prebuild`：按需生成原生工程
- `pnpm prebuild:clean`：删除后重新生成原生工程
- `pnpm doctor`：执行 Expo 依赖与环境健康检查
- `pnpm lint`：执行 Expo ESLint 检查

## 开发流程

### 启动开发服务

```bash
pnpm start
```

### 运行 iOS

```bash
pnpm ios
```

如果缺少 CocoaPods，可先安装：

```bash
sudo gem install cocoapods
```

或使用你自己的 Ruby / Homebrew 流程安装。

### 运行 Android

```bash
pnpm android
```

确保 Android 模拟器已启动，且 `adb devices` 能看到设备。

## Prebuild 约定

本项目默认不把 `ios/` 和 `android/` 目录作为长期维护的真源。只有在以下场景才建议执行 `pnpm prebuild`：

- 需要使用 `expo run:ios` 或 `expo run:android` 进行原生调试
- 新增需要原生配置的 Expo 插件
- 需要检查原生层配置是否与 `app.json` 对齐

生成出的 `ios/` 与 `android/` 目录属于可再生产物，`.gitignore` 已默认忽略。

## 当前实现说明

- `src/app/_layout.tsx` 中已经接入 `TamaguiProvider`
- `tamagui.config.ts` 提供全局 Tamagui 配置
- `src/app/index.tsx` 是基于 Tamagui 组件构建的首页示例
- `babel.config.js` 已启用 Tamagui Babel 插件和 Reanimated 插件

## 已验证内容

- `pnpm exec tsc --noEmit`
- `pnpm lint`
- `pnpm doctor`

本机当前已确认：

- Xcode 已安装
- `pod` 缺失
- `adb` 缺失

因此本次未完成真实的 iOS / Android 原生运行，只完成了命令入口、工程配置和工具链诊断。
