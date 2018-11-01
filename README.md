
重新开张angular学习了，这次不看书了，前端的书总是落后当前版本，这也导致了我中断学习7个月。

这次学习的依据是angular中文网 https://www.angular.cn/guide/quickstart


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

创建成功！所以可以把组件放到指定的文件夹内。现在把heros组件移到components文件夹内，然而报错,一个是import hero时报错，这个改完还有一个错：
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

1. 并不需要把FormsModule加入AppModule的@declaration中 ,@declaration应该时自己声明的组件，而FormsModule是内置组件，并不需要声明。

2. 记住双向绑定[{ngModel}]='property'和插值表达式{{property}}的语法。

#### 声明 HeroesComponent

每个组件都必须声明在（且只能声明在）一个 NgModule 中。

你没有声明过 HeroesComponent，可为什么本应用却正常呢？

这是因为 Angular CLI 在生成 HeroesComponent 组件的时候就自动把它加到了 AppModule 中。

打开 src/app/app.module.ts 你就会发现 HeroesComponent 已经在顶部导入过了。

content_copy
import { HeroesComponent } from './heroes/heroes.component';
HeroesComponent 也已经声明在了 @NgModule.declarations 数组中。

content_copy
declarations: [
  AppComponent,
  HeroesComponent
],
注意 AppModule 声明了应用中的所有组件，AppComponent 和 HeroesComponent。

## 显示英雄列表
本页中，你将扩展《英雄指南》应用，让它显示一个英雄列表， 并允许用户选择一个英雄，查看该英雄的详细信息。

### 创建模拟（mock）的英雄数据

你需要一些英雄数据以供显示。

最终，你会从远端的数据服务器获取它。 不过目前，你要先创建一些模拟的英雄数据，并假装它们是从服务器上取到的。

在 src/app/mock/ 文件夹中创建一个名叫 mock-heroes.ts 的文件。 定义一个包含十个英雄的常量数组 HEROES，并导出它。
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
