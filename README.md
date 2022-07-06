# 说明

A simple tool for publishing vuepress projects.

# Installation

Prerequisites: [Node.js](https://nodejs.org/en/) (>=6.x, 8.x preferred), npm version 3+ and [Git](https://git-scm.com/).

``` bash
$ npm install -g gblog
// 或者
npm install -D gblog
```

## Example:

+ artadmire： github用户名

+ ./public vuepress项目打包后的文件目录

``` bash
$ gblog push -g artadmire -p ./public
```

上面命令将会将你的vuepress博客发布发到github.


