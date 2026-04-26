## ADDED Requirements

### Requirement: 工程必须集成 Tamagui 基础配置

系统 MUST 在 Expo 工程中安装并配置 Tamagui，使应用根节点能够通过统一配置加载 Tamagui Provider 和默认主题。

#### Scenario: 应用根节点加载 Tamagui

- **WHEN** 应用根布局初始化
- **THEN** 根布局必须注入 `TamaguiProvider` 并加载仓库内定义的 Tamagui 配置

#### Scenario: 主题可作为全局默认值生效

- **WHEN** Tamagui Provider 完成初始化
- **THEN** 应用内的 Tamagui 组件必须能够读取默认主题和设计令牌，而不出现缺少配置的运行时错误

### Requirement: 默认界面必须使用 Tamagui 组件渲染

系统 MUST 提供一个开箱即用的示例界面，至少使用 Tamagui 的布局或基础控件组件，以证明组件库接入完成且可正常渲染。

#### Scenario: 打开默认首页

- **WHEN** 开发者启动应用并进入默认首页
- **THEN** 页面必须显示由 Tamagui 组件构建的可见内容，而不是仅保留 Expo 模板的原始默认示例
