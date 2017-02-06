*其他语言版本: [English](README.en.md), [简体中文](README.md).*

# 时间管理

一款用来记录自己做过、正在做的事情和计划将要做的事情的应用。这是前端部分，使用 AngularJS 2（TypeScript版本）开发，还有一个[后端部分的代码库](../../../TimeManage-Laravel)（使用 Laravel 开发）。

UI 使用 Bootstrap 实现

此部分代码不经过修改无法独立运行，如想本地运行测试，请看下面[运行一个本地可测试版本](#运行一个本地可测试版本)，需要配合后端代码一起才能运行。

## 运行一个本地可测试版本
使用 `ng serve --host=0.0.0.0` 运行一个本地测试服务器，通过 `http://localhost:4200/`访问。

**TIPS: 编辑并保存源码会自动重编译并刷新页面。**

如果不使用我的后端代码，想要纯粹本地运行，需要修改`src/app/app.module.ts`将里面的`useClass: ActionService`替换为`useClass: LocalActionService`  **这只是一个临时方案，将来会有更好的切换本地测试数据和服务器实际交互的方式，有好的建议欢迎提供**

