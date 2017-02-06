*Read this in other languages: [English](README.en.md), [简体中文](README.md).*

# Time Manager

An application used to record what you have done, what you are doing and what you plan to do. This is the front-end, which developed by Angular 2(TypeScript version). It can be worked only with [back-end](../../../TimeManage-Laravel)(developed by Laravel).

UI is achieved by using Bootstrap.

This part of the codes can not be run independently without modification. If wanted to run a local version, please look at [Running locally](#Running locally). It can be worked only with back-end.

## Running locally
Using `ng serve --host=0.0.0.0` to run a local test server, through http://localhost:4200/ to access.

**TIPS: Edit and save the source code automatically to recompile and refresh the page.**

If you don't to use the back-end code, only wanted to run locally without back-end, you need to modify `src/app/app.module.ts`. Replacing `useClass: ActionService` with `useClass: LocalActionService`.
 
**This is only a temporary solution. I believe we will come up better solutions to change the actual interaction between the local test data and the back-end server. Welcome to provide better advice**.

