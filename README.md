
重新开张angular学习了，这次不看书了，前端的书总是落后当前版本，这也导致了我中断学习7个月。

这次学习的依据是angular中文网 https://www.angular.cn/guide/quickstart

学习笔记中重要的领悟或经验会用加粗字体标记。


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

## 1.英雄编辑器

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
可以看到和app.component.ts比，类实现了OnInit接口，多了构造方法。

再看看@Component部分，这是一个类级别的注解(java程序员这样理解的)，参数是一个js对象，包含selector、templateUrl、styleUrls。

1. selector— 组件的选择器（CSS 元素选择器）
2. templateUrl— 组件模板文件的位置。
3. styleUrls— 组件私有 CSS 样式表文件的位置。

由selector: 'app-heroes'可以看出，选择器命名由项目名前缀加组建名用""-"串起来组成。

CSS 元素选择器 app-heroes 用来在父组件的模板中匹配 HTML 元素的名称，以识别出该组件。

ngOnInit 是一个生命周期钩子，Angular 在创建完组件后很快就会调用 ngOnInit。这里是放置初始化逻辑的好地方。

始终要 export 这个组件类，以便在其它地方（比如 AppModule）导入它。



### 显示 HeroesComponent 视图

要显示 HeroesComponent 你必须把它加到壳组件 AppComponent 的模板中。

别忘了，app-heroes 就是 HeroesComponent 的 元素选择器。 所以，只要把 <app-heroes> 元素添加到 AppComponent 的模板文件中就可以了，就放在标题下方。

### 创建 Hero 类

java程序员认为，component在程序中充当控制器角色，而要创建的Hero类可以比作JavaBean。它充当模型的角色，用来承载数据。

所以我不像学习网上的直接建在app目录下，而是建在app/entities目录下。
```typescript
export class Hero {
  id: number;
  name: string;
}

```
记住，Hero是一个类，而不是一个js对象或是json，还要export。

疑问，组件可以建在app/components目录下吗？试试：
```text
 ng generate component  components/test-component

```

创建成功！所以**可以把组件放到指定的文件夹内**。现在把heros组件移到components文件夹内，然而报错,一个是import hero时报错，这个改完还有一个错：
```text
ng:component 'HeroComponent' is not included in a module and will not be available inside a template.Consider adding it to a ngModule declaration.
```

意思是组件没有被包含到module(模块)中，不可在一个模板中使用。

原来组件要加到模板中才能被使用。src/app/app.module.ts就是包含组件的地方，我们进去看看，果然老的组件引用报错了，把这个改一改。

```typescript
import { HeroesComponent } from './components/heroes/heroes.component';
```
好了(如果你使用webStorm那么把文件关闭一下再打开报错消失)！

现在我甚至要尝试吧组件app也移到src/app/components/app目录内(先不要破坏angular的目录命名和组件命名规则)，修改app.module.ts，成功！

现在src/app目录内包含components和entities文件夹和app.module.ts文件，清爽了很多。

### 使用 UppercasePipe 进行格式化

把 hero.name 的绑定修改成这样：

```html
<h2>{{hero.name | uppercase}} Details</h2>
```

浏览器刷新了。现在，英雄的名字显示成了大写字母。

绑定表达式中的 uppercase 位于管道操作符（ | ）的右边，用来调用内置管道 UppercasePipe。

管道 是格式化字符串、金额、日期和其它显示数据的好办法。 Angular 发布了一些内置管道，而且你还可以创建自己的管道。

可以认为管道是我们为某个对象扩展了一个方法。

### 编辑英雄名字

用户应该能在一个 <input> 输入框中编辑英雄的名字。

当用户输入时，这个输入框应该能同时显示和修改英雄的 name 属性。 也就是说，数据流从组件类流出到屏幕，并且从屏幕流回到组件类。

要想让这种数据流动自动化，就要在表单元素 <input> 和组件的 hero.name 属性之间建立双向数据绑定。

#### 双向绑定
     
 把模板中的英雄名字重构成这样：
     
 src/app/components/heroes/heroes.component.html (HeroesComponent's template)
 ```html
    <div>
       <label>name:
         <input [(ngModel)]="hero.name" placeholder="name">
       </label>
     </div>
```
 
[(ngModel)] 是 Angular 的双向数据绑定语法。
     
这里把 hero.name 属性绑定到了 HTML 的 textbox 元素上，以便数据流可以双向流动：从 hero.name 属性流动到 textbox，并且从 textbox 流回到 hero.name 。

#### 缺少 FormsModule

注意，当你加上 [(ngModel)] 之后这个应用无法工作了。

打开浏览器的开发工具，就会在控制台中看到如下信息：

```text
Template parse errors:
Can't bind to 'ngModel' since it isn't a known property of 'input'.
```

虽然 ngModel 是一个有效的 Angular 指令，不过它在默认情况下是不可用的。

它属于一个可选模块 FormsModule，你必须自行添加此模块才能使用该指令。

### AppModule

Angular 需要知道如何把应用程序的各个部分组合到一起，以及该应用需要哪些其它文件和库。 这些信息被称为元数据（metadata）。

有些元数据位于 @Component 装饰器中，你会把它加到组件类上。 另一些关键性的元数据位于 @NgModule 装饰器中(见src/app/app.module.ts,它定义了AppModule类)。

最重要的 @NgModule 装饰器位于顶级类 AppModule 上。

Angular CLI 在创建项目的时候就在 src/app/app.module.ts 中生成了一个 AppModule 类。 这里也就是你要添加 FormsModule 的地方。

#### 导入 FormsModule
     
打开 AppModule (app.module.ts) 并从 @angular/forms 库中导入 FormsModule 符号。

app.module.ts (FormsModule symbol import)
```typescript
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
```
然后把 FormsModule 添加到 @NgModule 元数据的 imports 数组中，这里是该应用所需外部模块的列表。

app.module.ts ( @NgModule imports)
content_copy
imports: [
 BrowserModule,
 FormsModule
],
刷新浏览器，应用又能正常工作了。你可以编辑英雄的名字，并且会看到这个改动立刻体现在这个输入框上方的 &lt;h2&gt;中。

注意：

1. **并不需要把FormsModule加入AppModule的@declaration中 ,@declaration应该时自己声明的组件，而FormsModule是内置组件，并不需要声明。**

2. **记住双向绑定[{ngModel}]='property'和插值表达式{{property}}的语法。**

#### 声明 HeroesComponent

每个组件都必须声明在（且只能声明在）一个 NgModule 中。

你没有声明过 HeroesComponent，可为什么本应用却正常呢？

这是因为 Angular CLI 在生成 HeroesComponent 组件的时候就自动把它加到了 AppModule 中。

打开 src/app/app.module.ts 你就会发现 HeroesComponent 已经在顶部导入过了。

```typescript
import { HeroesComponent } from './heroes/heroes.component';
```
HeroesComponent 也已经声明在了 @NgModule.declarations 数组中。

```typescript
declarations: [
  AppComponent,
  HeroesComponent
],
```

注意 AppModule 声明了应用中的所有组件，AppComponent 和 HeroesComponent。

## 2.显示英雄列表
本页中，你将扩展《英雄指南》应用，让它显示一个英雄列表， 并允许用户选择一个英雄，查看该英雄的详细信息。

### 创建模拟（mock）的英雄数据

你需要一些英雄数据以供显示。

最终，你会从远端的数据服务器获取它。 不过目前，你要先创建一些模拟的英雄数据，并假装它们是从服务器上取到的。

在 **src/app/mock/** 文件夹中创建一个名叫 mock-heroes.ts 的文件。 定义一个包含十个英雄的常量数组 HEROES，并导出它。
该文件是这样的。

src/app/mock/mock-heroes.ts:
```typescript
import { Hero } from '../entities/hero';

export const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
```
注意，它不是一个类，而是一个Hero数组常量。

显示这些英雄
你要在 HeroesComponent 的顶部显示这个英雄列表。

打开 HeroesComponent 类文件，并导入模拟的 HEROES。

src/app/components/heroes/heroes.component.ts：
```typescript
import { HEROES } from 'app/mock/mock-heroes';
```
注意，这里我没有像书中一样使用相对路径，而是使用从app目录开始的相对项目根路径的路径表示法。我建议采用这种方式，因为文件层次结构
显得清晰可见。

往类中添加一个 heroes 属性，这样可以暴露出这些英雄，以供绑定。

```typescript
export class HeroesComponent implements OnInit {

  heroes = HEROES;
  //other codes
}
```

### 使用 *ngFor 列出这些英雄
打开 HeroesComponent 的模板文件，并做如下修改：

在顶部添加 &lt;h2&gt;，

然后添加表示无序列表的 HTML 元素（&lt;ul&gt;）


在 &lt;ul&gt; 中插入一个 &lt;li&gt; 元素，以显示单个 hero 的属性。

点缀上一些 CSS 类（稍后你还会添加更多 CSS 样式）。

做完之后应该是这样的：

heroes.component.html (heroes template)
```html
<h2>My Heroes</h2>
<ul class="heroes">
  <li>
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>
```
现在，把 <li> 修改成这样：
```html
<li *ngFor="let hero of heroes">
```
*ngFor 是一个 Angular 的复写器（repeater）指令。 它会为列表中的每项数据复写它的宿主元素。

在这个例子中

&lt;li&gt; 就是 *ngFor 的宿主元素

heroes 就是来自 HeroesComponent 类的列表。

当依次遍历这个列表时，hero 会为每个迭代保存当前的英雄对象。
```text
不要忘了 ngFor 前面的星号（*），它是该语法中的关键部分。
```
### 给英雄们“美容”
```text
@Component 元数据中指定的样式和样式表都是局限于该组件的。 heroes.component.css 中的样式只会作用于 HeroesComponent，
既不会影响到组件外的 HTML，也不会影响到其它组件中的 HTML。
```
而位于src目录中的styles.css则影响全局（猜测，未验证，虽然验证很容易，但我就是这么懒）。

其它略

### 主从结构

当用户在主列表中点击一个英雄时，该组件应该在页面底部显示所选英雄的详情。

在本节，你将监听英雄条目的点击事件，并更新英雄的详情。

#### 添加 click 事件绑定
再往  &lt;li&gt; 元素上插入一句点击事件的绑定代码：

heroes.component.html (template excerpt)
```text
  <li *ngFor="let hero of heroes" (click)="onSelect(hero)">
```
这是 Angular 事件绑定 语法的例子。

click 外面的圆括号会让 Angular 监听这个 &lt;li&gt;元素的 click 事件。 当用户点击 &lt;li&gt; 时，Angular 就会执行表达式 onSelect(hero)。

onSelect() 是 HeroesComponent 上的一个方法，你很快就要写它。 Angular 会把所点击的 &lt;li&gt;上的 hero 对象传给它，这个 hero 也就是前面在 *ngFor 表达式中定义的那个。
#### 添加 click 事件处理器
把该组件的 hero 属性改名为 selectedHero，但不要为它赋值。 因为应用刚刚启动时并没有所选英雄。

添加如下 onSelect() 方法，它会把模板中被点击的英雄赋值给组件的 selectedHero 属性。

src/app/heroes/heroes.component.ts (onSelect)
```typescript
selectedHero: Hero;
onSelect(hero: Hero): void {
  this.selectedHero = hero;
}
```
#### 修改详情模板
该模板引用的仍然是老的 hero 属性，但它已经不存在了。 把 hero 改名为 selectedHero。

heroes.component.html (selected hero details)
```html
<h2>{{selectedHero.name | uppercase}} Details</h2>
<div><span>id: </span>{{selectedHero.id}}</div>
<div>
  <label>name:
    <input [(ngModel)]="selectedHero.name" placeholder="name">
  </label>
</div>
```
使用 *ngIf 隐藏空白的详情
刷新浏览器，应用挂了。

打开浏览器的开发者工具，它的控制台中显示出如下错误信息：

```text
HeroesComponent.html:3 ERROR TypeError: Cannot read property 'name' of undefined
```
现在，从列表中随便点击一个条目。 应用又正常了。 英雄们显示在列表中，并且所点英雄的详情也显示在了页面的下方。

##### 怎么回事？

当应用启动时，selectedHero 是 undefined，设计如此。

但模板中的绑定表达式引用了 selectedHero 的属性（表达式为 {{selectedHero.name}}），这必然会失败，因为你还没选过英雄呢。

##### 修复
该组件应该只有当 selectedHero 存在时才显示所选英雄的详情。

把显示英雄详情的 HTML 包裹在一个 $lt;div$gt; 中。 并且为这个 div 添加 Angular 的 *ngIf 指令，
把它的值设置为 selectedHero。
```text
不要忘了 ngIf 前面的星号（*），它是该语法中的关键部分。
```

src/app/heroes/heroes.component.html (*ngIf)
```html
<div *ngIf="selectedHero">

  <h2>{{selectedHero.name | uppercase}} Details</h2>
  <div><span>id: </span>{{selectedHero.id}}</div>
  <div>
    <label>name:
      <input [(ngModel)]="selectedHero.name" placeholder="name">
    </label>
  </div>

</div>
```

浏览器刷新之后，英雄名字的列表又出现了。 详情部分仍然是空。 点击一个英雄，它的详情就出现了。

##### 为什么改好了？
当 selectedHero 为 undefined 时，ngIf 从 DOM 中移除了英雄详情。因此也就不用担心 selectedHero 的绑定了。

当用户选择一个英雄时，selectedHero 也就有了值，并且 ngIf 把英雄的详情放回到 DOM 中。

#### 给所选英雄添加样式
所有的 &lt;li&gt; 元素看起来都是一样的，因此很难从列表中识别出所选英雄。

如果用户点击了“Magneta”，这个英雄应该用一个略有不同的背景色显示出来。

所选英雄的颜色来自于你前面添加的样式中的 CSS 类 .selected。 所以你只要在用户点击一个&lt;li&gt; 时把 .selected 类应用到该元素上就可以了。

Angular 的 CSS 类绑定机制让根据条件添加或移除一个 CSS 类变得很容易。 只要把 [class.some-css-class]="some-condition"
添加到你要施加样式的元素上就可以了。

在 HeroesComponent 模板中的 &lt;li&gt; 元素上添加 [class.selected] 绑定，代码如下：

heroes.component.html (toggle the 'selected' CSS class)
```text
[class.selected]="hero === selectedHero"
```
如果当前行的英雄和 selectedHero 相同，Angular 就会添加 CSS 类 selected，否则就会移除它。

最终的 &lt;li&gt; 是这样的：

heroes.component.html (list item hero)
```html
<li *ngFor="let hero of heroes"
  [class.selected]="hero === selectedHero"
  (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```
ngIf当然可以解决问题，但如果英雄详情放在顶部，点击列表时会出现屏幕晃动，给selectedHero一个初始值是比较好的方案。

到现在为止,出现了：
* 三种绑定：双向绑定、事件绑定和类绑定，双向绑定和类绑定都是放在方括号中，事件绑定放在圆括号中；

* 两个指令：ngIf和ngFor，都是以“*”开头.

## 3.主从组件

上一章节中出现了“主从结构”这个概念。其实“主从结构”就是列表到详情的这种结构。这里的主从组件就是列表组件到详情组件。

把英雄详情移入一个独立的、可复用的 HeroDetailComponent。

HeroesComponent 将仅仅用来表示英雄列表。 HeroDetailComponent 将用来表示所选英雄的详情。

### 3.1.制作 HeroDetailComponent
```text
ng generate component components/hero-detail
```
hero-detail.component.spec.ts是HeroDetailComponent 类的测试文件。HeroDetailComponent也自动加入了
AppModule（src/app/app.module.ts）的import和@declaration中了。

src/app/components/hero-detail/hero-detail.component.html
```html
<div *ngIf="hero">

  <h2>{{hero.name | uppercase}} Details</h2>
  <div><span>id: </span>{{hero.id}}</div>
  <div>
    <label>name:
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </label>
  </div>

</div>
```

### 3.2.添加 @Input() hero 属性
HeroDetailComponent 模板中绑定了组件中的 hero 属性，它的类型是 Hero。

打开 HeroDetailComponent 类文件，并导入 Hero 符号。

src/app/components/hero-detail/hero-detail.component.ts (import Hero)
```typescript
import { Hero } from 'app/entities/hero';
```
hero 属性必须是一个带有 @Input() 装饰器的输入属性，因为外部的 HeroesComponent 组件将会绑定到它。就像这样：
```html
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```
修改 @angular/core 的导入语句，导入 Input 符号。

src/app/components/hero-detail/hero-detail.component.ts (import Input)
```typescript
import { Component, OnInit, Input } from '@angular/core';

```
添加一个带有 @Input() 装饰器的 hero 属性。

content_copy
@Input() hero: Hero;
这就是你要对 HeroDetailComponent 类做的唯一一项修改。 没有其它属性，也没有展示逻辑。这个组件所做的只是通过 hero 属性接收一个英雄对象，并显示它。

### 3.3.显示 HeroDetailComponent
略，你应该知道怎么做了。

### 3.4.修改 HeroesComponent 的模板

[hero]="selectedHero" 是 Angular 的属性绑定语法。

这是一种单向数据绑定（还记得双向绑定[{ngModel}]='property'吧）。从 HeroesComponent 的 selectedHero 属性绑定到目标元素的 hero 属性，并映射到了
HeroDetailComponent 的 hero 属性。

我们在HeroDetail的模板的输入框中修改英雄名字的时候，我们看到列表中英雄的名字也跟着改变了。

难道我们是被“单项数据绑定”字面上的意思迷惑了？难道不仅能从 HeroesComponent 的 selectedHero 属性绑定到目标元素的 hero 属性，
还能反过来从HeroDetail的hero绑定到HeroesComponent的selectedHero属性吗？

这是否表示[hero]="selectedHero" 本质上是双向绑定呢？

HeroDetail的input中使用了[{ngModel}]=hero.name表示双向绑定。到底是谁导致了主从组件的数据双向绑定呢？

我们假设单项数据绑定是主组件传递一个副本或克隆到从组件，当从组件使用传递进来的值，并把该值双向绑定到模板input元素，当我们在input上输入值，那么无论如何
也不会改写主组件的值。所以我们可以认为，主组件传递的是一个引用。那么问题是，如果是引用传递，那么从组件改变传入的值，主组件的值也必然跟着改变，为何要称为
单项数据绑定呢？难道从组件会根据自身是否使用双向绑定来决定是否改写主组件的值？

我们不妨做个实验，用事件绑定的方式改写传入的值，看看主组件是否也跟着改变。根据结果我们可以判断主从组件间的所谓"单向数据绑定"是否真的是单向。

src/app/components/hero-detail/hero-detail.component.html
```html
<button (click)="changeHeroNameToAlice()">change {{hero.name}}'s name to Alice</button>
```
src/app/components/hero-detail/hero-detail.component.ts
```typescript
  changeHeroNameToAlice(): void {
    this.hero.name = 'Alice';
  }
```
点击按钮，神奇的事情发生了，主组件英雄列表中英雄的名字跟着改成了Alice。现在我们可以得出一个结论，所谓的"单向数据绑定"其实是主从组件双向改变的，字面的表述迷惑
了我们。我想，这里所说的"单向"，是指[mainComponentProperty]="slaveComponentProperty"这个表达式表示数据是从主组件向从组件主动传递。实际上，从组件可以改写
slaveComponentProperty的值从而改写主组件mainComponentProperty的值。

## 4.服务

英雄指南的 HeroesComponent 目前获取和显示的都是模拟数据。

本节课的重构完成之后，HeroesComponent 变得更精简，并且聚焦于为它的视图提供支持。这也让它更容易使用模拟服务进行单元测试。

### 4.1.为什么需要服务

java程序员都知道，我们需要一个类提供服务时，我们不是实例化一个类，而是注入一个类，这叫做依赖注入。在angular框架中，有一个强大的理由使用依赖注入，即数据获取
的服务类的使用。

服务是在多个“互相不知道”的类之间共享信息的好办法。 你将创建一个 MessageService，并且把它注入到两个地方：

* HeroService 中，它会使用该服务发送消息。
* MessagesComponent 中，它会显示其中的消息。

### 4.2.Create the HeroService

使用 Angular CLI 创建一个名叫 hero 的服务。
```text
ng generate service services/hero

```
该命令会在 src/app/servies/hero.service.ts 中生成 HeroService 类的骨架。 HeroService 类的代码如下：

src/app/services/hero.service.ts (new service)
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',//注：我使用的angular版本并没有生成这一句，实际上我也不会使用这一句，除非必要
})
export class HeroService {

  constructor() { }

}
```
#### 4.2.1.@Injectable() 服务

用我们java程序员的话说，它表示这个类是一个ioc bean，可以用来注入。

#### 4.2.2.获取英雄数据
           
HeroService 可以从任何地方获取数据：Web 服务、本地存储（LocalStorage）或一个模拟的数据源。

从组件中移除数据访问逻辑，意味着将来任何时候你都可以改变目前的实现方式，而不用改动任何组件。 这些组件不需要了解该服务的内部实现。

这节课中的实现仍然会提供模拟的英雄列表。

导入 Hero 和 HEROES。
```typescript
import { Hero } from 'app/entities/hero';
import { HEROES } from 'app/mock/mock-heroes';
```
注：导入后编译器报错，但我认为是编译器错了，继续往下。

添加一个 getHeroes 方法，让它返回模拟的英雄列表。

```typescript
getHeroes(): Hero[] {
  return HEROES;
}
```
### 4.3.提供（provide） HeroService

在要求 Angular 把 HeroService 注入到 HeroesComponent 之前，你必须先把这个服务提供给依赖注入系统。稍后你就要这么做。 你可以通过注册提供商来做到这一点。
提供商用来创建和交付服务，在这个例子中，它会对 HeroService 类进行实例化，以提供该服务。

作为Java程序员，这一步我想应该类似于让IOC框架检测到HeroService，并实例化它。

现在，你需要确保 HeroService 已经作为该服务的提供商进行过注册。 你要用一个注入器注册它。注入器就是一个对象，负责在需要时选取和注入该提供商。

默认情况下，Angular CLI 命令 ng generate service 会通过给 @Injectable 装饰器添加元数据的形式，为该服务把提供商注册到根注入器上。

如果你看看 HeroService 紧前面的 @Injectable() 语句定义，就会发现 providedIn 元数据的值是 'root'：

```typescript
@Injectable({
  providedIn: 'root',//到https://www.angular.cn/guide/providers看了一下提供商的含义，我认为，这句不写表示默认提供商是root,所以我决定还是不加上这句
})
```

提前说一句,这里的providedIn和后面要出现的providers字面意思分别是"被提供到"和"提供者"，根据字面的理解，providedIn的值表示一个提供商，这里是'root'提供商，
可以理解为大众提供商，为广大组件服务。providers表示是服务的接受者，接受了哪些提供商的服务，一般组件都可以接受服务，当然服务也可以接受别的服务。

当你在顶层提供该服务时，Angular 就会为 HeroService 创建一个单一的、共享的实例，并把它注入到任何想要它的类上。 在 @Injectable 元数据中注册该提供商，
还能让 Angular 可以通过移除那些完全没有用过的服务，来进行优化。

现在 HeroService 已经准备好插入到 HeroesComponent 中了。

### 4.3.修改 HeroesComponent

打开 HeroesComponent 类文件。

删除 HEROES 的导入语句，因为你以后不会再用它了。 转而导入 HeroService。

src/app/heroes/heroes.component.ts (import HeroService)
```typescript
import { HeroService } from 'app/services/hero.service';

```
把 heroes 属性的定义改为一句简单的声明。

```typescript
heroes: Hero[];
```

#### 4.3.1.注入 HeroService

往构造函数中添加一个私有的 heroService，其类型为 HeroService。

```typescript
constructor(private heroService: HeroService) { }
```
java程序员再熟悉不过的构造器注入，不过有点奇怪，构造器方法参数中出现了private修饰符，少了声明一个私有属性heroService以及赋值语句
this.heroService=heroService。这是typeScript语句的独特之处，接下来马上就有说明。

这个参数同时做了两件事：1. 声明了一个私有 heroService 属性，2. 把它标记为一个 HeroService 的注入点。

当 Angular 创建 HeroesComponent 时，依赖注入系统就会把这个 heroService 参数设置为 HeroService 的单例对象。

#### 4.3.2.添加 getHeroes()

创建一个函数，以从服务中获取这些英雄数据。

```typescript
getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
}
```
#### 4.3.3.在 ngOnInit 中调用它
你固然可以在构造函数中调用 getHeroes()，但那不是最佳实践。

让构造函数保持简单，只做初始化操作，比如把构造函数的参数赋值给属性。 构造函数不应该做任何事。 它肯定不能调用某个函数来向远端服务（比如真实的数据服务）发起 HTTP 请求。

而是选择在 ngOnInit 生命周期钩子中调用 getHeroes()，之后交由 Angular 处理，它会在构造出 HeroesComponent 的实例之后的某个合适的时机调用 ngOnInit。

```typescript
ngOnInit() {
  this.getHeroes();
}
```

#### 4.3.4.查看运行效果
           
刷新浏览器，没有如书中所说的正常运行，程序报错：

```text
ERROR Error: StaticInjectorError(AppModule)[HeroesComponent -> HeroService]: 
  StaticInjectorError(Platform: core)[HeroesComponent -> HeroService]: 
    NullInjectorError: No provider for HeroService!
```
HeroesComponent所依赖的HeroService不能注入，没有提供者！看来省略的那句providedIn不能省略。加上,情况有点糟糕：
```text
ERROR in src/app/services/hero.service.ts(4,2): error TS2554: Expected 0 arguments, but got 1.
```
现在@Injectable不接受任何元数据参数！！！

网上找了一下，原来要在被注入的组件元数据中加入providers: [XXXService],go now!
src/app/components/heroes/heroes.component.ts
```typescript
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})
```
仍然报错，不过原因很简单：
```typescript
selectedHero: Hero = this.heroes[0];
```
把这个赋值的逻辑放到ngOnInit()中应该可以解决。

src/app/components/heroes/heroes.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { Hero } from 'app/entities/hero';
// import { HEROES } from 'app/mock/mock-heroes';
import { HeroService } from 'app/services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero ;
  constructor(private heroService: HeroService) { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

  ngOnInit() {
    this.getHeroes();
    this.selectedHero = this.heroes[0];
  }

}
```
果然，程序又活蹦乱跳了。不过我没想到的是，官方维护的中文网也会落后版本。

### 4.4.可观察（Observable）的数据
HeroService.getHeroes() 的函数签名是同步的，它所隐含的假设是 HeroService 总是能同步获取英雄列表数据。 而 HeroesComponent 也同样假设能同步取到 getHeroes() 的结果。

```typescript
this.heroes = this.heroService.getHeroes();
```
这在真实的应用中几乎是不可能的。 现在能这么做，只是因为目前该服务返回的是模拟数据。 不过很快，该应用就要从远端服务器获取英雄数据了，而那天生就是异步操作。

HeroService 必须等服务器给出响应， 而 getHeroes() 不能立即返回英雄数据， 浏览器也不会在该服务等待期间停止响应。

HeroService.getHeroes() 必须具有某种形式的异步函数签名。

它可以使用回调函数，可以返回 Promise（承诺），也可以返回 Observable（可观察对象）。

这节课，HeroService.getHeroes() 将会返回 Observable，因为它最终会使用 Angular 的 HttpClient.get 方法来获取英雄数据，而 HttpClient.get() 会返回 Observable。

#### 4.4.1.可观察对象版本的 HeroService

Observable 是 RxJS 库中的一个关键类。

看了一下，RxJS是Reactive的扩展库，但不知道Reactive是干什么的，查了一下，它是一种响应式编程方式。

在稍后的 HTTP 教程中，你就会知道 Angular HttpClient 的方法会返回 RxJS 的 Observable。 这节课，你将使用 RxJS 的 of() 函数来模拟从服务器返回数据。

打开 HeroService 文件，并从 RxJS 中导入 Observable 和 of 符号。

src/app/services/hero.service.ts (Observable imports)
```typescript
import { Observable, of } from 'rxjs';

```
**rxjs已经被加入引入黑名单了，要改成这样**：
```typescript
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
```
把 getHeroes 方法改成这样：

```typescript
getHeroes(): Observable<Hero[]> {
  return of(HEROES);
}
```

of(HEROES) 会返回一个 Observable<Hero[]>，它会发出单个值，这个值就是这些模拟英雄的数组。

```text
在 HTTP 教程中，你将会调用 HttpClient.get<Hero[]>() 它也同样返回一个 Observable<Hero[]>，它也会发出单个值，这个值就是来自 HTTP 响应体中的英雄数组。
```
#### 4.4.2.在 HeroesComponent 中订阅
HeroService.getHeroes 方法之前返回一个 Hero[]， 现在它返回的是 Observable<Hero[]>。

你必须在 HeroesComponent 中也向本服务中的这种形式看齐。

找到 getHeroes 方法，并且把它替换为如下代码（和前一个版本对比显示）：

src/app/components/heroes/heroes.component.ts
```typescript
getHeroes(): void {
  
  // this.heroes = this.heroService.getHeroes();//Original
  
  this.heroes = this.heroService.getHeroes();//Observable
}
```
Observable.subscribe() 是关键的差异点。

上一个版本把英雄的数组赋值给了该组件的 heroes 属性。 这种赋值是同步的，这里包含的假设是服务器能立即返回英雄数组或者浏览器能在等待服务器响应时冻结界面。

当 HeroService 真的向远端服务器发起请求时，这种方式就行不通了。

新的版本等待 Observable 发出这个英雄数组，这可能立即发生，也可能会在几分钟之后。 然后，subscribe 函数把这个英雄数组传给这个回调函数，该函数把英雄数组赋值给组件的 heroes 属性。

使用这种异步方式，当 HeroService 从远端服务器获取英雄数据时，就可以工作了。

### 4.5.显示消息

在这一节，你将

* 添加一个 MessagesComponent，它在屏幕的底部显示应用中的消息。
* 创建一个可注入的、全应用级别的 MessageService，用于发送要显示的消息。
* 把 MessageService 注入到 HeroService 中。
* 当 HeroService 成功获取了英雄数据时显示一条消息。

#### 4.5.1.创建 MessagesComponent

使用 CLI 创建 MessagesComponent。

```text
ng generate component components/messages
```
CLI 在 src/app/components/messages 中创建了组件文件，并且把 MessagesComponent 声明在了 AppModule 中。

修改 AppComponent 的模板来显示所生成的 MessagesComponent：
src/app/components/app/app.component.html
```html
<h1>{{title}}</h1>
<app-heroes></app-heroes>
<app-messages></app-messages>
```
你可以在页面的底部看到来自的 MessagesComponent 的默认内容。

#### 4.5.2.创建 MessageService

使用 CLI 在 src/app/services 中创建 MessageService。

```text
ng generate service services/message

```

注意：这里停一停，自己思考一下如何实现MessageService。

说实话，我绞尽脑汁，抽了两根烟，还在黑板上推演，还是无法实现这么个简单的业务。如果不是我太蠢(我自信没那么蠢)，那这个必定使用了某种黑魔法。我们继续研究。

打开 MessageService，并把它的内容改成这样：

src/app/services/message.service.ts
```typescript
import { Injectable } from '@angular/core';
 
@Injectable()
export class MessageService {
  messages: string[] = [];
 
  add(message: string) {
    this.messages.push(message);
  }
 
  clear() {
    this.messages = [];
  }
}
```
该服务对外暴露了它的 messages 缓存，以及两个方法：add() 方法往缓存中添加一条消息，clear() 方法用于清空缓存。

#### 4.5.3.把它注入到 HeroService 中

重新打开 HeroService，并且导入 MessageService。

/src/app/hero.service.ts (import MessageService)
```typescript
import { MessageService } from './message.service';

```
修改这个构造函数，添加一个私有的 messageService 属性参数。 Angular 将会在创建 HeroService 时把 MessageService 的单例注入到这个属性中。

```typescript
constructor(private messageService: MessageService) { }

```

说实话，这一步我思考的时候就认为行不通，因为我认为服务中不能注入服务，因为要在@Component中提供providers，服务不是组件，应该没有这个注解。现在看来，
服务中是可以注入服务的。但是这个providers该写在哪里？或者根本不需要providers?先不管这个细节，顺着服务可以注入服务这个思路再自己思考思考。

现在思路是：heroService在getHeroes方法中调用messageService.add方法，messageService注入MessageComponent中，让MessageComponent在ngOnInit方法中
调用messageService.message属性。然而似乎仍是行不通，因为heroService.getHeroes方法是HeroesComponents在ngOnInit中调用的，执行这个方法的时候，
说不定MessageComponent早就完成了初始化，那个时候MessageComponent从messageService中获得的messages属性说不定是空的。除非反过来，让MessageComponent
注入到MessageService中，这样MessageService就可以把值传给MessageComponent。那么服务中真的可以注入组件吗？继续看吧。

不过前面的一个小细节把我拦住了，就是Service中不能使用providers的问题。也是病急乱投医，误打误撞解决了问题。我把**AppModule中的providers: []改为
providers: [MessageService]**,居然神奇的解决了问题。我的理解是：不在AppModule中声明的服务只能用在组件中，而在其中声明的服务则可以用在所有类中。

中文网中说这是一个典型的"服务中的服务"，但是贵站的更新稍有点落后时代啊！为了确认我不是打开了假的angular中文网，特意翻墙Google了一下，确认这是
真正的angular中文网。并且我还到angular英文网 https://angular.io/tutorial/toh-pt4 看了一下，那里的手册依然落后于版本。不得不吐槽一下，学习前端
很多的坑都来自官方文档误导，我们不得不含泪自己填坑。


#### 4.5.3.从 HeroService 中发送一条消息

修改 getHeroes 方法，在获取到英雄数组时发送一条消息。

```typescript
getHeroes(): Observable<Hero[]> {
  // TODO: send the message _after_ fetching the heroes
  this.messageService.add('HeroService: fetched heroes');
  return of(HEROES);
}
```

#### 4.5.4.从 HeroService 中显示消息

MessagesComponent 可以显示所有消息， 包括当 HeroService 获取到英雄数据时发送的那条。

打开 MessagesComponent，并且导入 MessageService。

src/app/components/messages/messages.component.ts (import MessageService)
```typescript
import {MessageService} from 'app/services/message.service';
```

修改构造函数，添加一个 public 的 messageService 属性。 Angular 将会在创建 MessagesComponent 的实例时 把 MessageService 的实例注入到这个属性中。

```typescript
constructor(public messageService: MessageService) {}
```
这个 messageService 属性必须是公共属性，因为你将会在模板中绑定到它。
```text
Angular 只会绑定到组件的公共属性。
```
#### 4.5.4.绑定到 MessageService
把 CLI 生成的 MessagesComponent 的模板改成这样：

src/app/components/messages/messages.component.html
```html
<div *ngIf="messageService.messages.length">

  <h2>Messages</h2>
  <button class="clear"
          (click)="messageService.clear()">clear</button>
  <div *ngFor='let message of messageService.messages'> {{message}} </div>

</div>
```
看到这里，我还是感叹我高估了自己的智商，原来可以使用插值表达式展示注入的服务类的属性。我的思路是一定要调用服务的方法，然后赋值给组件的属性，才能在模板中
显示。这也是Java程序员的思路限制了我，没想到可以把messageService公有，直接使用它的公用属性，用插值表达式来展示。

运行，程序没有错误，但没看到消息。原因是我在MessageComponent中加入了providers，把这个去掉就正常了。

## 5.路由
有一些《英雄指南》的新需求：

* 添加一个仪表盘视图。
* 在英雄列表和仪表盘视图之间导航。
* 无论在哪个视图中点击一个英雄，都会导航到该英雄的详情页。
* 在邮件中点击一个深链接，会直接打开一个特定英雄的详情视图。
* 完成时，用户就能像这样在应用中导航：

图略

### 5.1.添加 AppRoutingModule

Angular 的最佳实践之一就是在一个独立的顶级模块中加载和配置路由器，它专注于路由功能，然后由根模块 AppModule 导入它。

按照惯例，这个模块类的名字叫做 APPRoutingModule，并且位于 src/app 下的 app-routing.module.ts 文件中。

使用 CLI 生成它。
```text
ng generate module app-routing --flat --module=app
```

* --flat 把这个文件放进了 src/app 中，而不是单独的目录中。
* --module=app 告诉 CLI 把它注册到 AppModule 的 imports 数组中。

这样它和app.module.ts位于同一层级。

生成的文件是这样的：

src/app/app-routing.module.ts (generated)
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
```
你通常不会在路由模块中声明组件，所以可以删除 @NgModule.declarations 并删除对 CommonModule 的引用。

你将会使用 RouterModule 中的 Routes 类来配置路由器，所以还要从 @angular/router 库中导入这两个符号。

添加一个 @NgModule.exports 数组，其中放上 RouterModule 。 导出 RouterModule 让路由器的相关指令可以在 AppModule 中的组件中使用。

此刻的 AppRoutingModule 是这样的：

src/app/app-routing.module.ts (v1)
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
```

到这里，我们其实对NgModule有什么用还是一无所知的，可以看看这里： https://www.angular.cn/guide/ngmodules，
简单说，模块就是把组件、指令和管道打包成内聚的功能块，每个模块聚焦于一个特性区域、业务领域、工作流或通用工具。它相当于可独立运行的一组功能块。

#### 5.1.1.添加路由定义

路由定义 会告诉路由器，当用户点击某个链接或者在浏览器地址栏中输入某个 URL 时，要显示哪个视图。

典型的 Angular 路由（Route）有两个属性：

* path：一个用于匹配浏览器地址栏中 URL 的字符串。
* component：当导航到此路由时，路由器应该创建哪个组件。

如果你希望当 URL 为 localhost:4200/heroes 时，就导航到 HeroesComponent。

首先（AppRoutingModule）要导入 HeroesComponent，以便能在 Route 中引用它。 然后定义一个路由数组，其中的某个路由是指向这个组件的。
```typescript
import { HeroesComponent }      from './heroes/heroes.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];
```

#### 5.1.1.RouterModule.forRoot()
你必须首先初始化路由器，并让它开始监听浏览器中的地址变化。

把 RouterModule 添加到 @NgModule.imports 数组中，并用 routes 来配置它。你只要调用 imports 数组中的 RouterModule.forRoot() 函数就行了。

```typescript
imports: [ RouterModule.forRoot(routes) ],

```
```text
这个方法之所以叫 forRoot()，是因为你要在应用的顶级配置这个路由器。 forRoot() 方法会提供路由所需的服务提供商和指令，还会基于浏览器的当前 URL 执行首次导航。
```
#### 5.1.2.添加路由出口 （RouterOutlet）
打开 AppComponent 的模板，把 <app-heroes> 元素替换为 <router-outlet> 元素。

src/app/app.component.html (router-outlet)
```html
<h1>{{title}}</h1>
<router-outlet></router-outlet>
<app-messages></app-messages>
```

之所以移除 <app-heroes>，是因为只有当用户导航到这里时，才需要显示 HeroesComponent。

<router-outlet> 会告诉路由器要在哪里显示路由到的视图。

```text
能在 AppComponent 中使用 RouterOutlet，是因为 AppModule 导入了 AppRoutingModule，而 AppRoutingModule 中导出了 RouterModule。
```
浏览器应该刷新，并显示着应用的标题，但是没有显示英雄列表。

看看浏览器的地址栏。 URL 是以 / 结尾的。 而到 HeroesComponent 的路由路径是 /heroes。

在地址栏中把 /heroes 追加到 URL 后面。你应该能看到熟悉的主从结构的英雄显示界面。

### 5.2.添加路由链接 (routerLink)

不应该让用户只能把路由的 URL 粘贴到地址栏中。他们还应该能通过点击链接进行导航。

添加一个 &lt;nav&gt; 元素，并在其中放一个链接 &lt;a&gt; 元素，当点击它时，就会触发一个到 HeroesComponent 的导航。 修改过的 AppComponent 模板如下：

src/app/components/app/app.component.html (heroes RouterLink)
```html
<h1>{{title}}</h1>
<nav>
  <a routerLink="/heroes">Heroes</a>
</nav>
<router-outlet></router-outlet>
<app-messages></app-messages>
```
routerLink 属性的值为 "/heroes"，路由器会用它来匹配出指向 HeroesComponent 的路由。 routerLink 是 RouterLink 指令的选择器，它会把用户的点击转换为路由器的导航操作。 它是 RouterModule 中公开的另一个指令。

刷新浏览器，显示出了应用的标题和指向英雄列表的链接，但并没有显示英雄列表。

点击这个链接。地址栏变成了 /heroes，并且显示出了英雄列表。

### 5.3.添加仪表盘视图
当有多个视图时，路由会更有价值。不过目前还只有一个英雄列表视图。

使用 CLI 添加一个 DashboardComponent：

```text
ng generate component components/dashboard

```
CLI 生成了 DashboardComponent 的相关文件，并把它声明到 AppModule 中。

把这三个文件中的内容改成这样，并回来做一个随堂讨论：

src/app/components/dashboard/dashboard.component.html
```html
<h3>Top Heroes</h3>
<div class="grid grid-pad">
  <a *ngFor="let hero of heroes" class="col-1-4">
    <div class="module hero">
      <h4>{{hero.name}}</h4>
    </div>
  </a>
</div>
```

src/app/components/dashboard/dashboard.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { Hero } from 'app/entities/hero';
import { HeroService } from 'app/services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
  providers: [HeroService] //这句帮你排个坑
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}


```

src/app/components/dashboard/dashboard.component.css
```css
/* DashboardComponent's private CSS styles */
[class*='col-'] {
  float: left;
  padding-right: 20px;
  padding-bottom: 20px;
}
[class*='col-']:last-of-type {
  padding-right: 0;
}
a {
  text-decoration: none;
}
*, *:after, *:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
h3 {
  text-align: center; margin-bottom: 0;
}
h4 {
  position: relative;
}
.grid {
  margin: 0;
}
.col-1-4 {
  width: 25%;
}
.module {
  padding: 20px;
  text-align: center;
  color: #eee;
  max-height: 120px;
  min-width: 120px;
  background-color: #607d8b;
  border-radius: 2px;
}
.module:hover {
  background-color: #eee;
  cursor: pointer;
  color: #607d8b;
}
.grid-pad {
  padding: 10px 0;
}
.grid-pad > [class*='col-']:last-of-type {
  padding-right: 20px;
}
@media (max-width: 600px) {
  .module {
    font-size: 10px;
    max-height: 75px; }
}
@media (max-width: 1024px) {
  .grid {
    margin: 0;
  }
  .module {
    min-width: 60px;
  }
}
```
这个模板用来表示由英雄名字链接组成的一个阵列。

* *ngFor 复写器为组件的 heroes 数组中的每个条目创建了一个链接。
* 这些链接被 dashboard.component.css 中的样式格式化成了一些色块。
* 这些链接还没有指向任何地方，但很快就会了。


这个类和 HeroesComponent 类很像。

* 它定义了一个 heroes 数组属性。
* 它的构造函数希望 Angular 把 HeroService 注入到私有的 heroService 属性中。
* 在 ngOnInit() 生命周期钩子中调用 getHeroes。

这个 getHeroes 函数会截取第 2 到 第 5 位英雄，也就是说只返回四个顶级英雄（第二，第三，第四和第五）。

```typescript
getHeroes(): void {
  this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes.slice(1, 5));
}

```
#### 5.3.1.添加仪表盘路由

要导航到仪表盘，路由器中就需要一个相应的路由。

把 DashboardComponent 导入到 AppRoutingModule 中。

src/app/app-routing.module.ts (import DashboardComponent)
```typescript
import { DashboardComponent }   from './dashboard/dashboard.component';
```
把一个指向 DashboardComponent 的路由添加到 AppRoutingModule.routes 数组中。

content_copy
{ path: 'dashboard', component: DashboardComponent },

#### 5.3.2.添加默认路由

当应用启动时，浏览器的地址栏指向了网站的根路径。 它没有匹配到任何现存路由，因此路由器也不会导航到任何地方。 <router-outlet> 下方是空白的。

要让应用自动导航到这个仪表盘，请把下列路由添加到 AppRoutingModule.Routes 数组中。

```typescript
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
```
这个路由会把一个与空路径“完全匹配”的 URL 重定向到路径为 '/dashboard' 的路由。

浏览器刷新之后，路由器加载了 DashboardComponent，并且浏览器的地址栏会显示出 /dashboard 这个 URL。

#### 5.3.3.把仪表盘链接添加到壳组件中

应该允许用户通过点击页面顶部导航区的各个链接在 DashboardComponent 和 HeroesComponent 之间来回导航。

把仪表盘的导航链接添加到壳组件 AppComponent 的模板中，就放在 Heroes 链接的前面。

src/app/components/app/app.component.html
```html
<h1>{{title}}</h1>
<nav>
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/heroes">Heroes</a>
</nav>
<router-outlet></router-outlet>
<app-messages></app-messages>
```

刷新浏览器，你就能通过点击这些链接在这两个视图之间自由导航了。

### 5.4.导航到英雄详情

HeroDetailComponent 可以显示所选英雄的详情。 此刻，HeroDetailsComponent 只能在 HeroesComponent 的底部看到。

用户应该能通过三种途径看到这些详情。

1. 通过在仪表盘中点击某个英雄。
2. 通过在英雄列表中点击某个英雄。
3. 通过把一个“深链接” URL 粘贴到浏览器的地址栏中来指定要显示的英雄。

在这一节，你将能导航到 HeroDetailComponent，并把它从 HeroesComponent 中解放出来。

#### 5.4.1.从 HeroesComponent 中删除英雄详情

当用户在 HeroesComponent 中点击某个英雄条目时，应用应该能导航到 HeroDetailComponent，从英雄列表视图切换到英雄详情视图。 英雄列表视图将不再显示，而英雄详情视图要显示出来。

打开 HeroesComponent 的模板文件（src/app/components/heroes/heroes.component.html），并从底部删除 <app-hero-detail> 元素。

目前，点击某个英雄条目还没有反应。不过当你启用了到 HeroDetailComponent 的路由之后，很快就能修复它。

#### 5.4.2.添加英雄详情视图

要导航到 id 为 11 的英雄的详情视图，类似于 ~/detail/11 的 URL 将是一个不错的 URL。

打开 AppRoutingModule 并导入 HeroDetailComponent。
```typescript
import { HeroDetailComponent } from 'app/components/hero-detail/hero-detail.component';
```
然后把一个参数化路由添加到 AppRoutingModule.routes 数组中，它要匹配指向英雄详情视图的路径。

```typescript
{ path: 'detail/:id', component: HeroDetailComponent },
```
path 中的冒号（:）表示 :id 是一个占位符，它表示某个特定英雄的 id。

此刻，应用中的所有路由都就绪了。

#### 5.4.3.DashboardComponent 中的英雄链接

此刻，DashboardComponent 中的英雄连接还没有反应。

路由器已经有一个指向 HeroDetailComponent 的路由了， 修改仪表盘中的英雄连接，让它们通过参数化的英雄详情路由进行导航。

src/app/components/dashboard/dashboard.component.html (hero links)
```html
<a *ngFor="let hero of heroes" class="col-1-4"
    routerLink="/detail/{{hero.id}}">
  <div class="module hero">
    <h4>{{hero.name}}</h4>
  </div>
</a>
```

你正在 *ngFor 复写器中使用 Angular 的插值表达式来把当前迭代的 hero.id 插入到每个 routerLink 中。

#### 5.4.4.HeroesComponent 中的英雄链接

HeroesComponent 中的这些英雄条目都是 &lt;li&gt; 元素，它们的点击事件都绑定到了组件的 onSelect() 方法中。

src/app/components/heroes/heroes.component.html (list with onSelect)
```html
<ul class="heroes">
  <li *ngFor="let hero of heroes"
    [class.selected]="hero === selectedHero"
    (click)="onSelect(hero)">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>
```

清理 <li>，只保留它的 *ngFor，把徽章（<badge>）和名字包裹进一个 <a> 元素中， 并且像仪表盘的模板中那样为这个 <a> 元素添加一个 routerLink 属性。

src/app/components/heroes/heroes.component.html  (list with links)
```html
<ul class="heroes">
  <li *ngFor="let hero of heroes">
    <a routerLink="/detail/{{hero.id}}">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </a>
  </li>
</ul>
```
修改私有样式表（heroes.component.css）
```css
/* HeroesComponent's private CSS styles */
.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 15em;
}
.heroes li {
  position: relative;
  cursor: pointer;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0;
  height: 1.6em;
  border-radius: 4px;
}
 
.heroes li:hover {
  color: #607D8B;
  background-color: #DDD;
  left: .1em;
}
 
.heroes a {
  color: #888;
  text-decoration: none;
  position: relative;
  display: block;
  width: 250px;
}
 
.heroes a:hover {
  color:#607D8B;
}
 
.heroes .badge {
  display: inline-block;
  font-size: small;
  color: white;
  padding: 0.8em 0.7em 0 0.7em;
  background-color: #607D8B;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  min-width: 16px;
  text-align: right;
  margin-right: .8em;
  border-radius: 4px 0 0 4px;
}
```

移除 HeroesComponent中的 onSelect() 方法和 selectedHero 属性。


### 5.5.支持路由的 HeroDetailComponent

以前，父组件 HeroesComponent 会设置 HeroDetailComponent.hero 属性，然后 HeroDetailComponent 就会显示这个英雄。

HeroesComponent 已经不会再那么做了。 现在，当路由器会在响应形如 ~/detail/11 的 URL 时创建 HeroDetailComponent。

HeroDetailComponent 需要从一种新的途径获取要显示的英雄。

* 获取创建本组件的路由，
* 从这个路由中提取出 id
* 通过 HeroService 从服务器上获取具有这个 id 的英雄数据。

先添加下列导入语句：
```typescript
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from 'app/services/hero.service';
//还要记得providers哦！
```

然后把 ActivatedRoute、HeroService 和 Location 服务注入到构造函数中，将它们的值保存到私有变量里：

```typescript
constructor(
  private route: ActivatedRoute,
  private heroService: HeroService,
  private location: Location
) {}
```
* ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息。 这个组件对从 URL 中提取的路由参数感兴趣。 其中的 id 参数就是要显示的英雄的 id。

* HeroService 从远端服务器获取英雄数据，本组件将使用它来获取要显示的英雄。

* location 是一个 Angular 的服务，用来与浏览器打交道。 稍后，你就会使用它来导航回上一个视图。

#### 5.5.1.从路由参数中提取 id

在 ngOnInit() 生命周期钩子 中调用 getHero()，代码如下：

```typescript
ngOnInit(): void {
  this.getHero();
}
```


getHero(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
}
route.snapshot 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后。

paramMap 是一个从 URL 中提取的路由参数值的字典。 "id" 对应的值就是要获取的英雄的 id。

路由参数总会是字符串。 JavaScript 的 (+) 操作符会把字符串转换成数字，英雄的 id 就是数字类型。

刷新浏览器，应用挂了。出现一个编译错误，因为 HeroService 没有一个名叫 getHero() 的方法。 这就添加它。

#### 5.5.2.添加 HeroService.getHero()

添加 HeroService，并添加如下的 getHero() 方法

src/app/services/hero.service.ts (getHero)
```typescript
getHero(id: number): Observable<Hero> {
  // TODO: send the message _after_ fetching the hero
  this.messageService.add(`HeroService: fetched hero id=${id}`);
  return of(HEROES.find(hero => hero.id === id));
}
```
```text
注意，反引号 ( ` ) 用于定义 JavaScript 的 模板字符串字面量，以便嵌入 id。

还有HEROES.find是一个JavaScript数组方法。
```

像 getHeroes() 一样，getHero() 也有一个异步函数签名。 它用 RxJS 的 of() 函数返回一个 Observable 形式的模拟英雄数据。

你将来可以用一个真实的 Http 请求来重新实现 getHero()，而不用修改调用了它的 HeroDetailComponent。

试试看

刷新浏览器，应用又恢复正常了。 你可以在仪表盘或英雄列表中点击一个英雄来导航到该英雄的详情视图。

如果你在浏览器的地址栏中粘贴了 localhost:4200/detail/11，路由器也会导航到 id: 11 的英雄（"Mr. Nice"）的详情视图。

#### 5.5.3.回到原路

通过点击浏览器的后退按钮，你可以回到英雄列表或仪表盘视图，这取决于你从哪里进入的详情视图。

如果能在 HeroDetail 视图中也有这么一个按钮就更好了。

把一个后退按钮添加到组件模板的底部，并且把它绑定到组件的 goBack() 方法。

hero-detail.component.html (back button)
```html
<button (click)="goBack()">go back</button>
```
在组件类中添加一个 goBack() 方法，利用你以前注入的 Location 服务在浏览器的历史栈中后退一步。

hero-detail.component.ts (goBack)
```typescript
goBack(): void {
  this.location.back();
}
```

刷新浏览器，并开始点击。 用户能在应用中导航：从仪表盘到英雄详情再回来，从英雄列表到 mini 版英雄详情到英雄详情，再回到英雄列表。

你已经满足了在本章开头设定的所有导航需求。

## 6.HTTP
