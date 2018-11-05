
重新开张angular学习了，这次不看书了，前端的书总是落后当前版本，这也导致了我中断学习7个月。

这次学习的依据是angular中文网 https://www.angular.cn/guide/quickstart

学习笔记中重要的领悟或经验会用加粗字体标记。


# 快速上手

如果不求精通，那么学习完《快速上手》应该可以应付简单正常的前端开发了。当然，专业的前端工程师肯定还需要深入学习下去。

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

在这节课中，你将借助 Angular 的 HttpClient 来添加一些数据持久化特性。

* HeroService 通过 HTTP 请求获取英雄数据。

* 用户可以添加、编辑和删除英雄，并通过 HTTP 来保存这些更改。

* 用户可以根据名字搜索英雄。

### 6.1.启用 HTTP 服务

HttpClient 是 Angular 通过 HTTP 与远程服务器通讯的机制。

要让 HttpClient 在应用中随处可用，请

* 打开根模块 AppModule，

* 从 @angular/common/http 中导入 HttpClientModule 符号,

src/app/app.module.ts (Http Client import)
```typescript
import { HttpClientModule } from '@angular/common/http';
```
* 把它加入 @NgModule.imports 数组。

### 6.2.模拟数据服务器
不了，作为java程序员，我应该用真正的服务器。与本课程配套的java服务器项目地址是：
https://github.com/YuxingXie/aes-base64.git
 ，其实这个项目不是专为本课程准备的，不过不想新建一个java web项目了，能用就好。
 
 服务器端口是8888.
 
 如果您不幸不是java程序员，那么还是看angular中文网教程吧。
 
 ### 6.3.英雄与 HTTP
导入一些所需的 HTTP 符号：

hero.service.ts (import HTTP symbols)
```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
```
把 HttpClient 注入到构造函数中一个名叫 http 的私有属性中。

```typescript
constructor(
  private http: HttpClient,
  private messageService: MessageService) { }
```

保留对 MessageService 的注入。你将会频繁调用它，因此请把它包裹进一个私有的 log 方法中。
```typescript
/** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}
```

定义服务器上英雄数据资源的访问地址heroesURL：
```typescript
private heroesUrl = 'http://localhost:8888/api/heroes';
```
#### 6.3.1.通过 HttpClient 获取英雄
当前的 HeroService.getHeroes() 使用 RxJS 的 of() 函数来把模拟英雄数据返回为 Observable<Hero[]> 格式。

hero.service.ts (getHeroes with RxJs 'of()')
```typescript
getHeroes(): Observable<Hero[]> {
  return of(HEROES);
}
```

把该方法转换成使用 HttpClient 的

```typescript
getHeroes (): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
}
```
/** GET heroes from the server */

刷新浏览器后，英雄数据就会从模拟服务器被成功读取。

#### 6.3.2.Http 方法返回单个值
所有的 HttpClient 方法都会返回某个值的 RxJS Observable。

HTTP 是一个请求/响应式协议。你发起请求，它返回单个的响应。

通常，Observable 可以在一段时间内返回多个值。 但来自 HttpClient 的 Observable 总是发出一个值，然后结束，再也不会发出其它值。

具体到这次 HttpClient.get 调用，它返回一个 Observable<Hero[]>，顾名思义就是“一个英雄数组的可观察对象”。在实践中，它也只会返回一个英雄数组。

#### 6.3.3.HttpClient.get 返回响应数据
HttpClient.get 默认情况下把响应体当做无类型的 JSON 对象进行返回。 如果指定了可选的模板类型 <Hero[]>，就会给返回你一个类型化的对象。

JSON 数据的具体形态是由服务器的数据 API 决定的。 英雄指南的数据 API 会把英雄数据作为一个数组进行返回。

#### 6.3.4.错误处理
凡事皆会出错，特别是当你从远端服务器获取数据的时候。 HeroService.getHeroes() 方法应该捕获错误，并做适当的处理。

要捕获错误，你就要使用 RxJS 的 catchError() 操作符来建立对 Observable 结果的处理管道（pipe）。

从 rxjs/operators 中导入 catchError 符号，以及你稍后将会用到的其它操作符。

```typescript
import { catchError, map, tap } from 'rxjs/operators';
```
现在，使用 .pipe() 方法来扩展 Observable 的结果，并给它一个 catchError() 操作符。

```typescript
getHeroes (): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      catchError(this.handleError('getHeroes', []))
    );
}
```
catchError() 操作符会拦截失败的 Observable。 它把错误对象传给错误处理器，错误处理器会处理这个错误。

下面的 handleError() 方法会报告这个错误，并返回一个无害的结果（安全值），以便应用能正常工作。
##### handleError
下面这个 handleError() 将会在很多 HeroService 的方法之间共享，所以要把它通用化，以支持这些彼此不同的需求。

它不再直接处理这些错误，而是返回给 catchError 返回一个错误处理函数。还要用操作名和出错时要返回的安全值来对这个错误处理函数进行配置。

**注：catchError方法参数是一个函数，及handlerError的返回值。简单理解就是，抓住错误让这个函数去处理。**
```typescript
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
```
在控制台中汇报了这个错误之后，这个处理器会汇报一个用户友好的消息，并给应用返回一个安全值，让它继续工作。

因为每个服务方法都会返回不同类型的 Observable 结果，因此 handleError() 也需要一个类型参数，以便它返回一个此类型的安全值，正如应用所期望的那样。
#### 6.3.5.窥探 Observable
HeroService 的方法将会窥探 Observable 的数据流，并通过 log() 函数往页面底部发送一条消息。

它们可以使用 RxJS 的 tap 操作符来实现，该操作符会查看 Observable 中的值，使用那些值做一些事情，并且把它们传出来。 这种 tap 回调不会改变这些值本身。

下面是 getHeroes 的最终版本，它使用 tap 来记录各种操作。
```typescript
/** GET heroes from the server */
getHeroes (): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
}
```
#### 6.3.6.通过 id 获取英雄
大多数的 Web API 都支持以 :baseURL/:id 的形式根据 id 进行获取。

这里的 baseURL 就是在 英雄列表与 HTTP 部分定义过的 heroesURL（api/heroes）。而 id 则是你要获取的英雄的编号，比如，api/heroes/11。 添加一个 HeroService.getHero() 方法，以发起该请求：

hero.service.ts
```typescript
/** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}
```
这里和 getHeroes() 相比有三个显著的差异。

* 它使用想获取的英雄的 id 构建了一个请求 URL。

* 服务器应该使用单个英雄作为回应，而不是一个英雄数组。

* 所以，getHero 会返回 Observable<Hero>（“一个可观察的单个英雄对象”），而不是一个可观察的英雄对象数组。

### 6.4.修改英雄
在英雄详情视图中编辑英雄的名字。 随着输入，英雄的名字也跟着在页面顶部的标题区更新了。 但是当你点击“后退”按钮时，这些修改都丢失了。

如果你希望保留这些修改，就要把它们写回到服务器。

在英雄详情模板的底部添加一个保存按钮，它绑定了一个 click 事件，事件绑定会调用组件中一个名叫 save() 的新方法：

hero-detail.component.html (save)
```typescript
<button (click)="save()">save</button>
```
添加如下的 save() 方法，它使用英雄服务中的 updateHero() 方法来保存对英雄名字的修改，然后导航回前一个视图。

hero-detail.component.ts (save)
```typescript
save(): void {
   this.heroService.updateHero(this.hero)
     .subscribe(() => this.goBack());
 }
```
#### 6.4.1.添加 HeroService.updateHero()
updateHero() 的总体结构和 getHeroes() 很相似，但它会使用 http.put() 来把修改后的英雄保存到服务器上。

hero.service.ts (update)
```typescript
/** PUT: update the hero on the server */
updateHero (hero: Hero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}
```
HttpClient.put() 方法接受三个参数

* URL 地址

* 要修改的数据（这里就是修改后的英雄）

* 选项

URL 没变。英雄 Web API 通过英雄对象的 id 就可以知道要修改哪个英雄。

英雄 Web API 期待在保存时的请求中有一个特殊的头。 这个头是在 HeroService 的 httpOptions 常量中定义的。

hero.service.ts
```typescript
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
```

刷新浏览器，修改英雄名，保存这些修改，然后点击“后退”按钮。 现在，改名后的英雄已经显示在列表中了。
### 6.5.添加新英雄
要添加英雄，本应用中只需要英雄的名字。你可以使用一个和添加按钮成对的 input 元素。

把下列代码插入到 HeroesComponent 模板中标题的紧后面：

heroes.component.html (add)
```html
<div>
  <label>Hero name:
    <input #heroName />
  </label>
  <!-- (click) passes input value to add() and then clears the input -->
  <button (click)="add(heroName.value); heroName.value=''">
    add
  </button>
</div>
```
当点击事件触发时，调用组件的点击处理器，然后清空这个输入框，以便用来输入另一个名字。

heroes.component.ts (add)
```typescript
add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.addHero({ name } as Hero)//这一句怎么理解？as是断言关键字，那{ name }呢？难道是实例化了一个Hero吗？
    .subscribe(hero => {
      this.heroes.push(hero);
    });
}
```
当指定的名字非空时，这个处理器会用这个名字创建一个类似于 Hero 的对象（只缺少 id 属性），并把它传给服务的 addHero() 方法。

当 addHero 保存成功时，subscribe 的回调函数会收到这个新英雄，并把它追加到 heroes 列表中以供显示。

#### 6.5.1.你将在下一节编写 HeroService.addHero。

往 HeroService 类中添加 addHero() 方法。
往 HeroService 类中添加 addHero() 方法。

hero.service.ts (addHero)
```typescript
/** POST: add a new hero to the server */
addHero (hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
    tap((_hero: Hero) => this.log(`added hero w/ id=${_hero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}
```
HeroService.addHero() 和 updateHero 有两点不同。

* 它调用 HttpClient.post() 而不是 put()。

* 它期待服务器为这个新的英雄生成一个 id，然后把它通过 Observable<Hero> 返回给调用者。

刷新浏览器，并添加一些英雄。

### 6.6.删除某个英雄

无重要知识点，略。

### 6.7.根据名字搜索
在最后一次练习中，你要学到把 Observable 的操作符串在一起，让你能将相似 HTTP 请求的数量最小化，并节省网络带宽。

你将往仪表盘中加入英雄搜索特性。 当用户在搜索框中输入名字时，你会不断发送根据名字过滤英雄的 HTTP 请求。 
你的目标是仅仅发出尽可能少的必要请求。

#### 6.7.1.HeroService.searchHeroes
先把 searchHeroes 方法添加到 HeroService 中。

hero.service.ts
```typescript
/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}
```

如果没有搜索词，该方法立即返回一个空数组。 剩下的部分和 getHeroes() 很像。 唯一的不同点是 URL，它包含了一个由搜索词组成的查询字符串。
#### 6.7.2.为仪表盘添加搜索功能
打开 DashboardComponent 的模板并且把用于搜索英雄的元素 <app-hero-search> 添加到 DashboardComponent 模板的底部。

dashboard.component.html
```html
<div class="grid grid-pad">
  <a *ngFor="let hero of heroes" class="col-1-4"
      routerLink="/detail/{{hero.id}}">
    <div class="module hero">
      <h4>{{hero.name}}</h4>
    </div>
  </a>
</div>

<app-hero-search></app-hero-search>
```
<h3>Top Heroes</h3>

这个模板看起来很像 HeroesComponent 模板中的 *ngFor 复写器。

很不幸，添加这个元素让本应用挂了。 Angular 找不到哪个组件的选择器能匹配上 <app-hero-search>。

HeroSearchComponent 还不存在，这就解决。
#### 6.7.3.创建 HeroSearchComponent

使用 CLI 创建一个 HeroSearchComponent。

```text
ng generate component components/hero-search

```
CLI 生成了 HeroSearchComponent 的三个文件，并把该组件添加到了 AppModule 的声明中。

把生成的 HeroSearchComponent 的模板改成一个输入框和一个匹配到的搜索结果的列表。代码如下：

hero-search.component.html
```html
<div id="search-component">
  <h4>Hero Search</h4>
 
  <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
 
  <ul class="search-result">
    <li *ngFor="let hero of heroes$ | async" >
      <a routerLink="/detail/{{hero.id}}">
        {{hero.name}}
      </a>
    </li>
  </ul>
</div>
```

从下面的 最终代码 中把私有 CSS 样式添加到 hero-search.component.css 中。

当用户在搜索框中输入时，一个 keyup 事件绑定会调用该组件的 search() 方法，并传入新的搜索框的值。

现在代码是报错的，除非在HeroSearchComponent中加个search方法：
```typescript
  search(term: string): void {
    this.heroService.searchHeroes(term).subscribe(heroes => {this.heroes$=heroes});
  }
```
#### 6.7.4.AsyncPipe

还是从最终代码拷贝src/app/components/hero-search/hero-search.component.ts吧。

如你所愿，*ngFor 重复渲染出了这些英雄。

仔细看，你会发现 *ngFor 是在一个名叫 heroes$ 的列表上迭代，而不是 heroes。

```html
<li *ngFor="let hero of heroes$ | async" >
```
$ 是一个命名惯例，用来表明 heroes$ 是一个 Observable，而不是数组。

*ngFor 不能直接使用 Observable。 不过，它后面还有一个管道字符（|），后面紧跟着一个 async，它表示 Angular 的 AsyncPipe。

AsyncPipe 会自动订阅到 Observable，这样你就不用再在组件类中订阅了。

#### 6.7.5.修正 HeroSearchComponent 类

修正你妹啊，老的代码你根本都没贴出来。

注意，heroes$ 声明为一个 Observable

```typescript
heroes$: Observable<Hero[]>;
```
你将会在 ngOnInit() 中设置它，在此之前，先仔细看看 searchTerms 的定义。

#### 6.7.6.RxJS Subject 类型的 searchTerms
searchTerms 属性声明成了 RxJS 的 Subject 类型。

```typescript
private searchTerms = new Subject<string>();
// Push a search term into the observable stream.
search(term: string): void {
  this.searchTerms.next(term);
}
```

Subject 既是可观察对象的数据源，本身也是 Observable。 你可以像订阅任何 Observable 一样订阅 Subject。

你还可以通过调用它的 next(value) 方法往 Observable 中推送一些值，就像 search() 方法中一样。

search() 是通过对文本框的 keystroke 事件的事件绑定来调用的。

```html
<input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
```
每当用户在文本框中输入时，这个事件绑定就会使用文本框的值（搜索词）调用 search() 函数。 
searchTerms 变成了一个能发出搜索词的稳定的流。

#### 6.7.7.串联 RxJS 操作符
如果每当用户击键后就直接调用 searchHeroes() 将导致创建海量的 HTTP 请求，浪费服务器资源并消耗大量网络流量。

应该怎么做呢？ngOnInit() 往 searchTerms 这个可观察对象的处理管道中加入了一系列 RxJS 操作符，用以缩减对 searchHeroes() 的调用次数，并最终返回一个可及时给出英雄搜索结果的可观察对象（每次都是 Hero[] ）。

代码如下：

```typescript
this.heroes$ = this.searchTerms.pipe(
  // wait 300ms after each keystroke before considering the term
  debounceTime(300),

  // ignore new term if same as previous term
  distinctUntilChanged(),

  // switch to new search observable each time the term changes
  switchMap((term: string) => this.heroService.searchHeroes(term)),
);
```

在传出最终字符串之前，debounceTime(300) 将会等待，直到新增字符串的事件暂停了 300 毫秒。 你实际发起请求的间隔永远不会小于 300ms。

distinctUntilChanged() 会确保只在过滤条件变化时才发送请求。

switchMap() 会为每个从 debounce 和 distinctUntilChanged 中通过的搜索词调用搜索服务。 它会取消并丢弃以前的搜索可观察对象，只保留最近的。
```text
借助 switchMap 操作符， 每个有效的击键事件都会触发一次 HttpClient.get() 方法调用。 即使在每个请求之间都有至少 300ms 的间隔，仍然可能会同时存在多个尚未返回的 HTTP 请求。

switchMap() 会记住原始的请求顺序，只会返回最近一次 HTTP 方法调用的结果。 以前的那些请求都会被取消和舍弃。

注意，取消前一个 searchHeroes() 可观察对象并不会中止尚未完成的 HTTP 请求。 那些不想要的结果只会在它们抵达应用代码之前被舍弃。
```
记住，组件类中并没有订阅 heroes$ 这个可观察对象，而是由模板中的 AsyncPipe 完成的。

# 选修内容

## Angular Universal：服务端渲染

研究了半天，发现只能运行在node.js服务器上。虽然我曾经用node.js开发过web serer app,然而那是一段黑暗的历史。我尝试找angular java serer rending项目，google到了
一个：https://github.com/swaechter/angularj-universal ，但是我突然觉得这个主题不是那么吸引人了，先跳过等有时间再来研究。

## 核心知识

### 1.表单

这一节（1.1）建议学习了下两节再回来看。

#### 1.1.简介

##### 1.1.1.Angular 表单检测
用表单处理用户输入是许多常见应用的基础功能。 应用通过表单来让用户登录、修改个人档案、输入敏感信息以及执行各种数据输入任务。

Angular 提供了两种不同的方法来通过表单处理用户输入：响应式表单和模板驱动表单。 两者都从视图中捕获用户输入事件、验证用户输入、创建表单模型、修改数据模型，并提供跟踪这些更改的途径。

不过，响应式表单和模板驱动表单在如何处理和管理表单和表单数据方面有所不同。各有优势。

一般来说：

* 响应式表单更健壮：它们的**可扩展性、可复用性和可测试性更强**。 如果表单是应用中的关键部分，或者你已经准备使用响应式编程模式来构建应用，请使用响应式表单。

* **模板驱动表单在往应用中添加简单的表单时非常有用**，比如邮件列表的登记表单。它们很容易添加到应用中，但是不像响应式表单那么容易扩展。如果你有非常基本的表单需求和简单到能用模板管理的逻辑，请使用模板驱动表单。

本指南提供的信息可以帮你确定哪种方式最适合你的情况。它介绍了这两种方法所用的公共构造块，还总结了两种方式之间的关键区别，并在建立、数据流和测试等不同的情境下展示了这些差异。

##### 1.1.2.关键差异


下表总结了响应式表单和模板驱动表单之间的一些关键差异。

<table>
<thead>
<tr>
<th></th>
<th><t translation-result="">响应式</t><t translation-origin="off">Reactive</t></th>
<th><t translation-result="">模板驱动</t><t translation-origin="off">Template-driven</t></th>
</tr>
</thead>
<tbody>
<tr>
<td><t translation-result="">建立（表单模式）</t><t translation-origin="off">Setup (form model)</t></td>
<td><t translation-result="">显式，在组件类中创建。</t><t translation-origin="on">More explicit, created in the component class.</t></td>
<td><t translation-result="">隐式，由组件创建。</t><t translation-origin="off">Less explicit, created by the directives.</t></td>
</tr>
<tr>
<td><t translation-result="">数据模式</t><t translation-origin="off">Data model</t></td>
<td><t translation-result="">结构化</t><t translation-origin="off">Structured</t></td>
<td><t translation-result="">非结构化</t><t translation-origin="off">Unstructured</t></td>
</tr>
<tr>
<td><t translation-result="">可预测性</t><t translation-origin="off">Predictability</t></td>
<td><t translation-result="">同步</t><t translation-origin="off">Synchronous</t></td>
<td><t translation-result="">异步</t><t translation-origin="off">Asynchronous</t></td>
</tr>
<tr>
<td><t translation-result="">表单验证</t><t translation-origin="off">Form validation</t></td>
<td><t translation-result="">函数</t><t translation-origin="off">Functions</t></td>
<td><t translation-result="">指令</t><t translation-origin="off">Directives</t></td>
</tr>
<tr>
<td><t translation-result="">可变性</t><t translation-origin="off">Mutability</t></td>
<td><t translation-result="">不可变</t><t translation-origin="off">Immutable</t></td>
<td><t translation-result="">可变</t><t translation-origin="off">Mutable</t></td>
</tr>
<tr>
<td><t translation-result="">可伸缩性</t><t translation-origin="off">Scalability</t></td>
<td><t translation-result="">访问底层 API</t><t translation-origin="off">Low-level API access</t></td>
<td><t translation-result="">在 API 之上的抽象</t><t translation-origin="off">Abstraction on top of APIs</t></td>
</tr>
</tbody>
</table>

#### 1.2.响应式表单

响应式表单提供了一种模型驱动的方式来处理表单输入，其中的值会随时间而变化。本文会向你展示如何创建和更新单个表单控件，然后在一个分组中使用多个控件，
验证表单的值，以及如何实现更高级的表单。

##### 1.2.1.响应式表单简介

响应式表单使用显式的、不可变的方式，管理表单在特定的时间点上的状态。对表单状态的每一次变更都会返回一个新的状态，这样可以在变化时维护模型的整体性。
响应式表单是围绕 Observable 的流构建的，表单的输入和值都是通过这些输入值组成的流来提供的，它可以同步访问。

响应式表单还提供了一种更直白的测试路径，因为在请求时你可以确信这些数据是一致的、可预料的。这个流的任何一个消费者都可以安全地操纵这些数据。

响应式表单与模板驱动的表单有着显著的不同点。响应式表单通过对数据模型的同步访问提供了更多的可预测性，使用 Observable 的操作符提供了不可变性，
并且通过 Observable 流提供了变化追踪功能。 如果你更喜欢在模板中直接访问数据，那么模板驱动的表单会显得更明确，因为它们依赖嵌入到模板中的指令，
并借助可变数据来异步跟踪变化。参见表单概览来了解这两种范式之间的详细比较。


##### 1.2.2.快速起步

本节描述了如何添加单个表单控件。这里的例子允许用户在输入框中输入自己的名字，捕获输入的值，并把表单控件元素的当前值显示出来。

###### 1.2.2.1.步骤 1 - 注册 ReactiveFormsModule

要使用响应式表单，就要从 @angular/forms 包中导入 ReactiveFormsModule 并把它添加到你的 NgModule 的 imports 数组中。

src/app/app.module.ts (excerpt)
```typescript
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // other imports ...
    ReactiveFormsModule
  ],
})
export class AppModule { }
```


###### 1.2.2.2.步骤 2 - 生成并导入一个新的表单控件

为该控件生成一个组件。

```text
ng generate component components/NameEditor
```

当使用响应式表单时，FormControl 类是最基本的构造块。要注册单个的表单控件，请在组件中导入 FormControl 类，并创建一个 FormControl 的新实例，把它保存在类的某个属性中。

src/app/components/name-editor/name-editor.component.ts
```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {
  name = new FormControl('');
}
```
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {
  name = new FormControl('');//参数表示初始值
}

可以用 FormControl 的构造函数设置初始值，这个例子中它是空字符串。通过在你的组件类中创建这些控件，你可以直接对表单控件的状态进行监听、修改和校验。

###### 1.2.2.3.步骤 3 - 在模板中注册该控件

在组件类中创建了控件之后，你还要把它和模板中的一个表单控件关联起来。修改模板，为表单控件添加 formControl 绑定，formControl 是由 ReactiveFormsModule 中的 FormControlDirective 提供的。

src/app/components/name-editor/name-editor.component.html
```html
<label>
  Name:
  <input type="text" [formControl]="name">
</label>
```

使用这种模板绑定语法，把该表单控件注册给了模板中名为 name 的输入元素。这样，表单控件和 DOM 元素就可以互相通讯了：视图会反映模型的变化，模型也会反映视图中的变化。

####### 显示组件

把该组件添加到模板时，将显示指派给 name 的表单控件。

(注：可以注释掉英雄列表相应的模板)

src/app/components/app.component.html (name editor)
```html
<!--<h1>{{title}}</h1>-->
<!--<nav>-->
  <!--<a routerLink="/heroes">Heroes</a>-->
  <!--<a routerLink="/dashboard">Dashboard</a>-->
<!--</nav>-->
<!--<router-outlet></router-outlet>-->
<!--<app-messages></app-messages>-->
<app-name-editor></app-name-editor>
```

##### 1.2.3.管理控件的值

响应式表单让你可以访问表单控件此刻的状态和值。你可以通过组件类或组件模板来操纵其当前状态和值。下面的例子会显示及修改 FormControl 实例的值。

###### 1.2.3.1.显示表单控件的值

你可以用两种方式显示它的值：

* 通过可观察对象 valueChanges，你可以在模板中使用 AsyncPipe 或在组件类中使用 subscribe() 方法来监听表单值的变化。
* 使用 value 属性。它能让你获得当前值的一份快照。

下面的例子展示了如何在模板中使用插值表达式显示当前值。

src/app/components/name-editor/name-editor.component.html (control value)
```html
<p>
  Value: {{ name.value }}
</p>
```

一旦你修改了表单控件所关联的元素，这里显示的值也跟着变化了。


以上是第二种方式。我还要研究一下第一种方式。

模板中显示控件值：

src/app/components/name-editor/name-editor.component.html
```html
<p>
  Value: {{ name.valueChanges | async }}
</p>
```
正确。

组件中订阅控件值(编程方式，可能放在ngOnInit方法中更好)：

src/app/components/name-editor/name-editor.component.ts
```typescript
  constructor() {
    this.name.valueChanges.subscribe(value => console.log(value));
  }
```
仍然正确。

响应式表单还能通过每个实例的属性和方法提供关于特定控件的更多信息。AbstractControl 的这些属性和方法用于控制表单状态，并在处理表单校验时决定何时显示信息。 欲知详情，参见稍后的简单表单验证一节。

要了解 FormControl 的其它属性和方法，参见响应式表单 API一节。


###### 1.2.3.2.替换表单控件的值

响应式表单还有一些方法可以用编程的方式修改控件的值，它让你可以灵活的修改控件的值而不需要借助用户交互。FormControl 提供了一个 setValue() 方法，它会修改这个表单控件的值，并且验证与控件结构相对应的值的结构。比如，当从后端 API 或服务接收到了表单数据时，可以通过 setValue() 方法来把原来的值替换为新的值。

下列的例子往组件类中添加了一个方法，它使用 setValue() 方法来修改 Nancy 控件的值。

name-editor.component.ts (update value)
```typescript
updateName() {
  this.name.setValue('Nancy');
}
```

修改模板，添加一个按钮，用于模拟改名操作。在点 Update Name 按钮之前表单控件元素中输入的任何值都会回显为它的当前值。

name-editor.component.html (update value)
```html
<p>
  <button (click)="updateName()">Update Name</button>
</p>
```

由于表单模型中才是该控件真正的源头，因此当你单击该按钮时，组件中该输入框的值也变化了，覆盖掉它的当前值。

**注意：在这个例子中，你只使用单个控件，但是当调用 FormGroup 或 FormArray 的 setValue() 方法时，传入的值就必须匹配控件组或控件数组的结构才行。**

##### 1.2.4.把表单控件分组

就像 FormControl 的实例能让你控制单个输入框所对应的控件一样，FormGroup 的实例也能跟踪一组 FormControl 实例（比如一个表单）的表单状态。当创建 FormGroup 时，其中的每个控件都会根据其名字进行跟踪。下列例子展示了如何管理单个控件组中的多个 FormControl 实例。

生成一个 ProfileEditor 组件并从 @angular/forms 包中导入 FormGroup 和 FormControl 类。

```text
ng generate component components/ProfileEditor
```

profile-editor.component.ts (imports)
```typescript
import { FormGroup, FormControl } from '@angular/forms';
```

##### 1.2.4.1.步骤 1 - 创建 FormGroup 实例

在组件类中创建一个名叫 profileForm 的属性，并设置为 FormGroup 的一个新实例。要初始化这个 FormGroup，请为构造函数提供一个由控件组成的对象，
对象中的每个名字都要和表单控件的名字一一对应。

对此个人档案表单，要添加两个 FormControl 实例，名字分别为 firstName 和 lastName。

profile-editor.component.ts (form group)
```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
 
@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
}
```

现在，这些独立的表单控件被收集到了一个控件组中。这个 FormGroup 用对象的形式提供了它的模型值，这个值来自组中每个控件的值。 FormGroup 实例拥有和 FormControl 实例相同的属性（比如 value、untouched）和方法（比如 setValue()）。

##### 1.2.4.2.步骤 2 - 关联 FormGroup 的模型和视图

这个表单组还能跟踪其中每个控件的状态及其变化，所以如果其中的某个控件的状态或值变化了，父控件也会发出一次新的状态变更或值变更事件。该控件组的模型来自它的所有成员。在定义了这个模型之后，你必须更新模板，来把该模型反映到视图中。

profile-editor.component.html (template form group)
```html
<form [formGroup]="profileForm">
  
  <label>
    First Name:
    <input type="text" formControlName="firstName">
  </label>

  <label>
    Last Name:
    <input type="text" formControlName="lastName">
  </label>

</form>
```

注意，就像 FormGroup 所包含的那控件一样，profileForm 这个 FormGroup 也通过 FormGroup 指令绑定到了 form 元素，在该模型和表单中的输入框之间创建了一个通讯层。 由 **FormControlName** 指令提供的 **formControlName** 属性把每个输入框和 FormGroup 中定义的表单控件绑定起来。
这些表单控件会和相应的元素通讯，它们还把更改传递给 FormGroup，这个 FormGroup 是模型值的真正源头。

##### 1.2.4.3.保存表单数据

ProfileEditor 组件从用户那里获得输入，但在真实的场景中，你可能想要先捕获表单的值，等将来在组件外部进行处理。 FormGroup 指令会监听 form 元素发出的 submit 事件，并发出一个 ngSubmit 事件，让你可以绑定一个回调函数。

把 onSubmit() 回调方法添加为 form 标签上的 ngSubmit 事件监听器。

profile-editor.component.html (submit event)
```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">

```
ProfileEditor 组件上的 onSubmit() 方法会捕获 profileForm 的当前值。要保持该表单的封装性，就要使用 EventEmitter 向组件外部提供该表单的值。下面的例子会使用 console.warn 把这个值记录到浏览器的控制台中。

profile-editor.component.ts (submit method)
```typescript
onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.profileForm.value);
}
```

form 标签所发出的 submit 事件是原生 DOM 事件，通过点击类型为 submit 的按钮可以触发本事件。这还让用户可以用回车键来提交填完的表单。

往表单的底部添加一个 button，用于触发表单提交。


profile-editor.component.html (submit button)
```html
<button type="submit" [disabled]="!profileForm.valid">Submit</button>
```
**注意：上面这个代码片段中的按钮还附加了一个 disabled 绑定，用于在 profileForm 无效时禁用该按钮。目前你还没有执行任何表单验证逻辑，因此该按钮始终是可用的。稍后的表单验证一节会讲解简单的表单验证。**

##### 1.2.4.4.显示组件
略

##### 1.2.4.5.增强FormGroup
上面例子我们看到表单提交时控制台打印：
```js
{firstName: "James", lastName: "Bond"}
```
但我希望是：
```js
{name:{firstName: "James", lastName: "Bond"}}
```
对不起，多次尝试都报错，继续学习。

#### 1.2.5.嵌套的表单组

如果要构建复杂的表单，如果能在更小的分区中管理不同类别的信息就会更容易一些，而有些信息分组可能会自然的汇入另一个更大的组中。使用嵌套的 FormGroup 可以让你把大型表单组织成一些稍小的、易管理的分组。

##### 1.2.5.1.步骤 1 - 创建嵌套的分组

“地址”就是可以把信息进行分组的绝佳范例。FormGroup 可以同时接纳 FormControl 和 FormGroup 作为子控件。这使得那些比较复杂的表单模型可以更易于维护、更有逻辑性。要想在 profileForm 中创建一个嵌套的分组，请添加一个内嵌的名叫 address 的元素指向这个 FormGroup 实例。

在这个例子中，address group 把现有的 firstName、lastName 控件和新的 street、city、state 和 zip 控件组合在一起。虽然 address 这个 FormGroup 是 profileForm 这个整体 FormGroup 的一个子控件，但是仍然适用同样的值和状态的变更规则。
来自内嵌控件组的状态和值的变更将会冒泡到它的父控件组，以维护整体模型的一致性。

##### 1.2.5.2.步骤 2 - 在模板中分组内嵌的表单

profile-editor.component.html (template nested form group)
```html
<div formGroupName="address">
  <h3>Address</h3>

  <label>
    Street:
    <input type="text" formControlName="street">
  </label>

  <label>
    City:
    <input type="text" formControlName="city">
  </label>
  
  <label>
    State:
    <input type="text" formControlName="state">
  </label>

  <label>
    Zip Code:
    <input type="text" formControlName="zip">
  </label>
</div>

```

看到这里，我明白了我上一步的研究在模板中少了关键的一步：
```html
<div formGroupName="name">
  <!--firstName和lastName放这里-->
</div>

```
ProfileEditor 表单显示为一个组，但是将来这个模型会被进一步细分，以表示逻辑分组区域。


**注意：这里使用了 value 属性和 JsonPipe 管道在组件模板中显示了这个 FormGroup 的值。**

#### 1.2.6.部分模型更新

当修改包含多个 FormGroup 实例的值时，你可能只希望更新模型中的一部分，而不是完全替换掉。这一节会讲解该如何更新 AbstractControl 模型中的一部分。

##### 1.2.6.1.修补（Patching）模型值

有两种更新模型值的方式：

* 使用 setValue() 方法来为**单个控件**设置新值。 setValue() 方法会严格遵循表单组的结构，并整体性替换控件的值。
* 使用 patchValue() 方法可以用对象中所定义的**任何属性**为表单模型进行替换。

setValue() 方法的严格检查可以帮助你捕获复杂表单嵌套中的错误，而 patchValue() 在遇到那些错误时可能会默默的失败。

在 ProfileEditorComponent 中，使用 updateProfile 方法传入下列数据可以更新用户的名字与街道住址。

profile-editor.component.ts (patch value)
```javascript
  updateProfile() {
    this.profileForm.patchValue({
      name:{
        firstName: 'Nancy',

      }, address: {
        street: '123 Drew Street'
      }
    });
  }
```

通过往模板中添加一个按钮来模拟一次更新操作，以修改用户档案。

profile-editor.component.html (update value)
```html
<p>
  <button (click)="updateProfile()">Update Profile</button>
</p>
```

当点击按钮时，profileForm 模型中只有 firstName 和 street 被修改了。注意，street 是在 address 属性的对象中被修改的。这种结构是必须的，因为 patchValue() 方法要针对模型的结构进行更新。patchValue() 只会更新表单模型中所定义的那些属性。

#### 1.2.7.使用 FormBuilder 来生成表单控件

当需要与多个表单打交道时，手动创建多个表单控件实例会非常繁琐。FormBuilder 服务提供了一些便捷方法来生成表单控件。FormBuilder 在幕后也使用同样的方式来创建和返回这些实例，只是用起来更简单。

下面的小节中会重构 ProfileEditor 组件，用 FormBuilder 来代替手工创建这些 FormControl 和 FormGroup 实例。

##### 1.2.7.1.步骤 1 - 导入 FormBuilder 类
profile-editor.component.ts (import)
```typescript
import { FormBuilder } from '@angular/forms';
```
##### 1.2.7.2.步骤 2 - 注入 FormBuilder 服务

FormBuilder 是一个可注入的服务提供商，它是由 ReactiveFormModule 提供的。只要把它添加到组件的构造函数中就可以注入这个依赖。

profile-editor.component.ts (constructor)
```typescript
constructor(private fb: FormBuilder) { }
```

##### 1.2.7.3.步骤 3 - 生成表单控件

FormBuilder 服务有三个方法：control()、group() 和 array()。这些方法都是工厂方法，用于在组件类中分别生成 FormControl、FormGroup 和 FormArray。

用 group 方法来创建 profileForm 控件。

profile-editor.component.ts (form builder)
```typescript
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
 
@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  profileForm = this.fb.group({
    name: this.fb.group({
      firstName: this.fb.control(''),
      lastName: [''],
    }),
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });
 
  constructor(private fb: FormBuilder) { }
}
```
在上面的例子中，你可以使用 group() 方法，用和前面一样的名字来定义这些属性。这里，每个控件名对应的值都是一个数组，这个数组中的第一项是其初始值。

注意：你可以只使用初始值来定义控件，但是如果你的控件还需要同步或异步验证器，那就在这个数组中的第二项和第三项提供同步和异步验证器。

比较一下用表单构建器和手动创建实例这两种方式(当然是FormBuild方式更简洁)。

要记住一个细节，使用FormBuild创建表单空间，FormController可以用lastName: ['']也可以使用 this.fb.control('')或new FormControl(''),这三者等价。但是第一种方式为何使用一个字符串数组？

##### 1.2.8.简单表单验证

表单验证用于验证用户的输入，以确保其完整和正确。本节讲解了如何把单个验证器添加到表单控件中，以及如何显示表单的整体状态。表单验证的更多知识在表单验证一章中有详细的讲解。

###### 1.2.8.1.步骤 1 - 导入验证器函数

响应式表单包含了一组开箱即用的常用验证器函数。这些函数接收一个控件，用以验证并根据验证结果返回一个错误对象或空值。

从 @angular/forms 包中导入 Validators 类。

profile-editor.component.ts (import)
```typescript
import { Validators } from '@angular/forms';
```

###### 1.2.8.2.步骤 2 - 把字段设为必填（required）
最常见的校验项是把一个字段设为必填项。本节描述如何为 firstName 控件添加“必填项”验证器。

在 ProfileEditor 组件中，把静态方法 Validators.required 设置为 firstName 控件值数组中的第二项。

profile-editor.component.ts (required validator)
```typescript
profileForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: [''],
  address: this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    zip: ['']
  }),
});
```
现在知道firstName: ['', Validators.required]为什么是一个字符串数组了。

HTML5 有一组内置的属性，用来进行原生验证，包括 required、minlength、maxlength 等。虽然是可选的，不过你也可以在表单的输入元素上把它们添加为附加属性来使用它们。这里我们把 required 属性添加到 firstName 输入元素上。

profile-editor.component.html (required attribute)
```html
<!--required不是必须的，但加上会更好-->
<input type="text" formControlName="firstName" required>
```

注意：这些 HTML5 验证器属性可以和 Angular 响应式表单提供的内置验证器组合使用。组合使用这两种验证器实践，可以防止在模板检查完之后表达式再次被修改导致的错误。

###### 1.2.8.3.显示表单状态

当你往表单控件上添加了一个必填字段时，它的初始值是无效的（invalid）。这种无效状态会传播到其父 FormGroup 元素中，也让这个 FormGroup 的状态变为无效的。你可以通过该 FormGroup 实例的 status 属性来访问其当前状态。

使用插值表达式显示 profileForm 的当前状态。

profile-editor.component.html (display status)
```html
<p>
  Form value: {{ profileForm.valueChanges | async | json }}
</p>
<p>
  Form Status: {{ profileForm.status }}
</p>
```
提交按钮被禁用了，因为 firstName 控件的必填项规则导致了 profileForm 也是无效的。在你填写了 firstName 输入框之后，该表单就变成了有效的，并且提交按钮也启用了。

要了解表单验证的更多知识，参见表单验证一章。

##### 1.2.9.使用表单数组管理动态控件

FormArray 是 FormGroup 之外的另一个选择，用于管理任意数量的匿名控件。像 FormGroup 实例一样，你也可以往 FormArray 中动态插入和移除控件，并且 FormArray 实例的值和验证状态也是根据它的子控件计算得来的。 
不过，你不需要为每个控件定义一个名字作为 key，因此，如果你事先不知道子控件的数量，这就是一个很好的选择。下面的例子展示了如何在 ProfileEditor 中管理一组绰号（aliases）。

###### 1.2.9.1.步骤 1 - 导入 FormArray

从 @angular/form 中导入 FormArray，以使用它的类型信息。FormBuilder 服务用于创建 FormArray 实例。

profile-editor.component.ts (import)
```typescript
import { FormArray } from '@angular/forms';
```

###### 1.2.9.2.步骤 2 - 定义 FormArray

你可以通过把一组（从零项到多项）控件定义在一个数组中来初始化一个 FormArray。为 profileForm 添加一个 aliases 属性，把它定义为 FormArray 类型。

使用 FormBuilder.array() 方法来定义该数组，并用 FormBuilder.control() 方法来往该数组中添加一个初始控件。

profile-editor.component.ts (aliases form array)
```typescript
profileForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: [''],
  address: this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    zip: ['']
  }),
  aliases: this.fb.array([
    this.fb.control('')
  ])
});
```

FormGroup 中的这个 aliases 控件现在管理着一个控件，将来还可以动态添加多个。

###### 1.2.9.3.步骤 3 - 访问 FormArray 控件

相对于重复使用 profileForm.get() 方法获取每个实例的方式，getter 可以让你轻松访问表单数组各个实例中的别名。 表单数组实例用一个数组来代表未定数量的控件。通过 getter 来访问控件很方便，这种方法还能很容易地重复处理更多控件。

使用 getter 语法创建类属性 aliases，以从父表单组中接收表示绰号的表单数组控件。

profile-editor.component.ts (aliases getter)
```typescript
get aliases() {
  return this.profileForm.get('aliases') as FormArray;
}
```

**注意：因为返回的控件的类型是 AbstractControl，所以你要为该方法提供一个显式的类型声明来访问 FormArray 特有的语法。**

定义一个方法来把一个绰号控件动态插入到绰号 FormArray 中。用 FormArray.push() 方法把该控件添加为数组中的新条目。

profile-editor.component.ts (add alias)
```typescript
addAlias() {
  this.aliases.push(this.fb.control(''));
}
```

在这个模板中，这些控件会被迭代，把每个控件都显示为一个独立的输入框。

###### 1.2.9.4.步骤 4 - 在模板中显示表单数组

要想为表单模型添加 aliases ，你必须把它加入到模板中供用户输入。和 FormGroupNameDirective 提供的 formGroupName 一样，FormArrayNameDirective 也使用 formArrayName 在这个 FormArray 实例和模板之间建立绑定。

在 formGroupName &lt;div&gt; 元素的结束标签下方，添加一段模板 HTML。

profile-editor.component.html (aliases form array template)
```html
<div formArrayName="aliases">
  <h3>Aliases</h3> <button (click)="addAlias()">Add Alias</button>

  <div *ngFor="let address of aliases.controls; let i=index">
    <!-- The repeated alias template -->
    <label>
      Alias:
      <input type="text" [formControlName]="i">
    </label>
  </div>
</div>
```

*ngFor 指令对 aliases FormArray 提供的每个 FormControl 进行迭代。因为 FormArray 中的元素是匿名的，所以你要把索引号赋值给 i 变量，并且把它传给每个控件的 formControlName 输入属性。

注：从打印的值看："aliases": [ "a", "b", "c", "d", "e", "f", "g" ] 是否表示aliases是一个匿名控件数组？
