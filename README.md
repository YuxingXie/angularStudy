
重新开张angular学习了，这次不看书了，前端的书总是落后当前版本，这也导致了我中断学习7个月。这次学习的依据是angular中文网 https://www.angular.cn/guide/quickstart


# 快速上手

## 第一步：安装 Angular CLI

略

## 第二部：创建工作空间和初始应用

工作空间：包含package.json,e2e等文件夹的目录，是你开发应用的上下文环境。

官方解释：Angular 工作空间就是你开发应用的上下文环境。 每个工作空间包含一些供一个或多个项目使用的文件。 每个项目都是一组由应用、库或端到端（e2e）测试构成的文件。

这里所说的"项目"倒是一个需要解释的概念。

```text
ng new app
```
 
 还将创建下列工作空间和初始项目文件：
 
 * 一个新的工作空间，根目录名叫 my-app
 * 一个初始的骨架应用项目，也叫 my-app（但位于 src 子目录下）
 * 一个端到端测试项目（位于 e2e 子目录下）
 * 相关的配置文件
 
 根据第二点，我们大概了解了什么是项目。是在src目录下的一个目录。创建工作空间同时创建了一个同名的项目。
 
 不能再在工作目录里建一个新的工作目录：
 
 ```text
 ng new another-app
 ```
 则：
 
 ```text
  You cannot use the new command inside an Angular CLI project.
 ```
 
除非删除package.json。
 
## 步骤 3：启动开发服务器

```text
ng serve
 
ng serve --open

ng serve -o
```
## 步骤 4：编辑你的第一个Angular组件

组件 是 Angular 应用中的基本构造块。 它们在屏幕上显示数据、监听用户输入，并根据这些输入采取行动。

app.component.ts:
```typeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}

```

app.component.html:
```html

<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>

</div>

```
可以看到，app.component.html可以使用app.component.ts中定义的类AppComponent中的类属性。

# 教程

## 英雄指南

https://www.angular.cn/tutorial


主要是了解插值表达式，不详解，略。

## 英雄编辑器

### 创建英雄列表组件
```text
ng generate component heroes
```

heroes.component.ts:
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```
可以看到和app.component.ts比，多了构造方法和ngOnInit方法。
