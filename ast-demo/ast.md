链接 <https://zhuanlan.zhihu.com/p/353940140>

<https://github.com/reactjs/react-codemod>

<https://juejin.cn/post/6844904195624009736>

<https://esprima.org/demo/parse.html>#

jscodeshift相比于 babel的好处

babel的目的是对代码向下兼容的，会进行代码转换，而且即使不做任何修改，输出的代码和原本的也有区别，比如空格，空行，注释位置会变化，所以不使用，而jscodeshift会保留没发生修改的代码的原有格式。

npx jscodeshift -t codemod.js file
