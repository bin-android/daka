---
name: 首页打卡与自定义Tabbar
overview: 在现有 uni-app 脚手架基础上，实现与设计图一致的首页视觉，并加入本地交互（心情选择、点亮今天按钮状态），同时落地自定义底部导航。
todos:
  - id: update-routes
    content: 更新 pages.json，新增测字/记录/我的路由并保持非原生 tabbar 方案
    status: completed
  - id: create-tabbar-component
    content: 创建 custom-tabbar 组件并实现高亮与页面跳转
    status: completed
  - id: build-home-ui
    content: 重构首页为设计稿样式并加入心情选择与按钮本地状态
    status: completed
  - id: add-placeholder-pages
    content: 创建 analyze/records/profile 占位页并接入导航
    status: completed
  - id: verify-and-lint
    content: 完成基本交互自测并检查本次改动的 lints
    status: completed
isProject: false
---

# 首页打卡+本地交互实现计划

## 目标

基于 uni-app（Vue3 模板，Options API 风格）实现首页高保真界面，包含深色背景氛围、连续打卡信息、心情选项交互、主按钮，以及自定义底部导航栏（打卡/测字/记录/我的）。

## 现状与约束

- 当前项目仅有一个页面：`[/Library/WebServer/web_www/yake/pages/index/index.vue](/Library/WebServer/web_www/yake/pages/index/index.vue)`
- 页面配置在 `[/Library/WebServer/web_www/yake/pages.json](/Library/WebServer/web_www/yake/pages.json)`，尚无 tabbar 与其他分页面
- 全局样式变量文件为 `[/Library/WebServer/web_www/yake/uni.scss](/Library/WebServer/web_www/yake/uni.scss)`
- 现有代码风格是 `Options API` + `kebab-case` 类名 + `rpx` 尺寸单位

## 实施步骤

1. **扩展页面路由结构**
  - 在 `[/Library/WebServer/web_www/yake/pages.json](/Library/WebServer/web_www/yake/pages.json)` 中新增 `测字/记录/我的` 页面路由（先放占位页），保留首页 `pages/index/index`
  - 不启用原生 `tabBar`，为自定义 tabbar 留出页面底部安全区
2. **创建基础占位页（保证导航可跳转）**
  - 新增：
    - `[/Library/WebServer/web_www/yake/pages/analyze/index.vue](/Library/WebServer/web_www/yake/pages/analyze/index.vue)`
    - `[/Library/WebServer/web_www/yake/pages/records/index.vue](/Library/WebServer/web_www/yake/pages/records/index.vue)`
    - `[/Library/WebServer/web_www/yake/pages/profile/index.vue](/Library/WebServer/web_www/yake/pages/profile/index.vue)`
  - 页面采用与首页一致的深色底风格简版占位文案
3. **实现自定义底部导航组件**
  - 新增组件：`[/Library/WebServer/web_www/yake/components/custom-tabbar/custom-tabbar.vue](/Library/WebServer/web_www/yake/components/custom-tabbar/custom-tabbar.vue)`
  - 功能点：
    - 四个导航项（打卡/测字/记录/我的）
    - 当前项高亮
    - 点击后使用 `uni.switchTab` 或 `uni.reLaunch/uni.navigateTo`（按非原生 tabbar 场景选用可回退方案）进行页面切换
    - 处理 `safe-area-inset-bottom` 适配
4. **重构首页视觉与本地交互**
  - 改造 `[/Library/WebServer/web_www/yake/pages/index/index.vue](/Library/WebServer/web_www/yake/pages/index/index.vue)`
  - 实现内容：
    - 顶部日期+标题“今日能量”
    - 中部“连续打卡 5 天”与光晕背景
    - “今日心情”四个胶囊选项（`开心/平静/焦虑/疲惫`）
    - 点击心情后更新选中态（边框、底色、文字、圆点）
    - “点亮今天”按钮点击后本地状态反馈（例如按钮文案切换、短提示）
    - 页面底部挂载 `custom-tabbar`
5. **样式规范与可维护性对齐**
  - 统一使用 `rpx` 与 `kebab-case` 类名
  - 抽取页面内关键色值到局部变量，避免魔法数字分散
  - 保持 `template/script/style` 分层清晰，交互状态集中在 `data` 与 `methods`
6. **自测与规范检查**
  - 检查页面在常见机型宽度下布局不溢出
  - 校验导航切换、心情选中、按钮状态变化
  - 对本次改动文件执行 lints 诊断并修复可快速处理的问题

## 预期产出

- 一个与设计图高度一致、可交互的首页
- 一个可复用的自定义 tabbar 组件
- 三个可导航占位页，为后续业务开发留好结构

