## AST分享

### JS引擎执行流程

JavaScirpt引擎可以将JS代码编译为不同CPU(Intel, ARM以及MIPS等)对应的汇编代码，这样我们才不要去翻阅每个CPU的指令集手册。js引擎有

- V8 （Chrome）
- SpiderMonkey (Mozilla)
- JavaScriptCore (Apple)
- Chakra (Microsoft)

### v8主要流程

<img src="https://i.loli.net/2021/07/30/Wsu9pTglvjrPXOH.png" width="600" height="300">

- 生成抽象语法树
  - 词法分析
  - 语法分析
- 生成字节码
- 执行代码
  - 即时编译
  - 内联缓存

<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--pHrmQNaA--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/q0vxo5pcm6qjo14k0ami.png" width="600" height="300">
#### 生成抽象语法树

HTML解析器遇到了一个带有源的脚本标签。这个源的代码会从网络、缓存或已安装的服务工作者那里加载。响应是请求的脚本作为字节流，由字节流解码器来处理。字节流解码器对正在下载的字节流进行解码。

<img src="https://filescdn.proginn.com/f019f3024d0d49ca8b0ebb6694591d7a/bfea2be1dbc293141438a15eb490d5b7.webp" width="600" height="300">

##### 词法分析

生成抽象语法树的 `第一个阶段是分词（tokenize），又叫词法分析`。

字节流解码器会先从代码字节流中创建 `令牌 （token）`。

> 注：令牌可以理解为语法上不可能再分的，最小的单个字符或字符串)。

例如，0066解码为f，0075解码为u，006e解码为n，0063解码为c，0074解码为t，0069解码为i，006f解码为o，006e解码为n，接着后面是一个空格。然后你会发现，他们组合起来就是 function。

> 这是JavaScript中的一个保留关键字。

一个令牌被创建，并被发送到`解析器（parser）`。其余的字节流也是如此,具体如下图:

<img src="https://filescdn.proginn.com/cd21cd7ea535cfdc93eaa830088f769c/02bf47abc7b1a53d5e47c220ad1ab4a0.webp" width="600" height="300">

##### 语法分析

`第二个阶段是解析（parse），也叫语法分析`。

该引擎使用两个解析器：`预解析器和解析器。为了减少加载网站的时间，该引擎试图避免解析那些不需要立即使用的代码。

> 预解析器处理以后可能会用到的代码，而解析器则处理立即需要的代码!

如果某个函数只有在用户点击某个按钮后才会被调用，那么就没有必要为了加载网站而立即编译这段代码了。

如果用户最终点击了按钮，需要那段代码，它就会被送到解析器中。

解析器根据它从字节流解码器收到的标记创建节点。通过这些节点，它创建了一个`抽象语法树或AST`，如图:

<img src="https://filescdn.proginn.com/2f42179ef2237c39ab8749070f3403a1/013c129147035c9e70d6b1a56d033462.webp" width="600" height="300">

值得思考的是，AST到底是什么呢？(到底是怎么样的一个数据结构呢,babel里面是不是也有这些概念呢)

接下来，是解释器的时间了，根据AST包含的信息生成字节代码 ...

### AST是什么

抽象语法树（Abstract Syntax Tree）简称 AST，是源代码的抽象语法结构的树状表现形式。webpack、eslint 等很多工具库的核心都是通过抽象语法书这个概念来实现对代码的检查、分析等操作

变量声明语句 ====> AST 如下图
<img src="https://filescdn.proginn.com/3035d70edb538dee5d5aa1ed715382c8/4ffa93c20e3c0b021012e194f5c714e2.webp" width="600" height="300">

<img src="https://i.loli.net/2021/07/30/7AVOWbaFXCSPREw.png" width="600" height="300">

JavaScript 是解释型语言，一般通过 词法分析 -> 语法分析 -> 语法树，就可以开始解释执行了

词法分析：也叫`扫描`，是将字符流转换为记号流(tokens)，它会读取我们的代码然后按照一定的规则合成一个个的标识

比如说：var a = 2 ，这段代码通常会被分解成 var、a、=、2

<img src="https://i.loli.net/2021/07/30/4GzZo8qitB2dhKI.png" width="600" height="300">

语法分析：也称解析器，将词法分析出来的数组转换成树的形式，同时验证语法。语法如果有错的话，抛出语法错误。

<img src="https://i.loli.net/2021/07/30/YqB5azGXVsUR6wZ.png" width="600" height="300">

### AST能做什么

- 语法检查、代码风格检查、格式化代码、语法高亮、错误提示、自动补全等
- 代码混淆压缩
- vue 模板编译、react 模板编译

比如
在 webpack 中代码编译完成后 require('a') --> __webapck__require__("*/**/a.js")

比如

```
  <div className="NB">
    MM
  </div>
  =>
   React.createElement('div', {className: "NB"},
    "MM"
  )
```

### AST 解析流程

- code => ast
- traverse ast
- ast => code

推荐一个常用的 AST 在线转换网站：<https://astexplorer.net/>

```js
const esprima = require('esprima')
const estraverse = require('estraverse')
const code = `function MMNB() {}`
// 生成 AST
const ast = esprima.parseScript(code)
// 转换 AST，只会遍历 type 属性
// traverse 方法中有进入和离开两个钩子函数
estraverse.traverse(ast, {
  enter(node) {
    console.log('enter -> node.type', node.type)
  },
  leave(node) {
    console.log('leave -> node.type', node.type)
  },
})
```

输出结果如下：

<img src="https://filescdn.proginn.com/298ebe3cf132b5c1108fef2bf10473bf/9d1c97ec7b23640e7e8e638c4f17fb1d.webp" width="600" height="300">

上图可以看出 采取`深度优先`遍历

<img src="https://i.loli.net/2021/07/30/PUEp78v6t1OMkfY.png" width="600" height="300">

#### babel

- code => ast 解析 @babel/parser
- traverse ast 转换 @babel/traverse
- ast => code 生成 @babel/generator

api参考 <https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md>

### jscodeshift

jscodeshift 是什么？

jscodeshift是一个重构代码的工具集，facebook 出品，对recast（一个通过分析AST做代码修改的库）做了封装，通过jscodeshift编写codemod, 然后对指定文件运行就可以批量重构代码，大大减少了体力劳动，并可复用

jscodeshift相比于 babel的好处：

babel的目的是对代码向下兼容的，会进行代码转换，而且即使不做任何修改，输出的代码和原本的也有区别，比如空格，空行，注释位置会变化，所以不使用，而jscodeshift会保留没发生修改的代码的原有格式。且它封装并暴露出对 js 开发者来说更为友好的 api，让我们在操作修改 AST 的时候更加方便

缺点：
文档太少了，需要结合源码看一些用法，也可以看看一些例子

- [jscodeshift](https://github.com/facebook/jscodeshift)
- [recast](https://github.com/benjamn/recast)
- [js-codemod](https://github.com/cpojer/js-codemod)
- [react-codemod](https://github.com/reactjs/react-codemod)

作为codemod使用： npx jscodeshift -t codemod.js file
也可以代码require操作等等

## 参考链接

- <https://zh.wikipedia.org/wiki/%E8%AF%8D%E6%B3%95%E5%88%86%E6%9E%90>
- <https://github.com/benjamn/recast>
- <https://github.com/cpojer/js-codemo>
- <https://github.com/reactjs/react-codemod>
- <https://github.com/facebook/jscodeshift>
- <https://zhuanlan.zhihu.com/p/353940140>
- <https://dev.to/lydiahallie/javascript-visualized-the-javascript-engine-4cdf>
- <https://jishuin.proginn.com/p/763bfbd3dda4>
- <https://jishuin.proginn.com/p/763bfbd56ccc>
- <https://esprima.org/demo/parse.html>#
- <https://github.com/sl1673495/babel-ast-practise/blob/master/i18n.js>
