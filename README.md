## 简介
Sword 是 [SpringBlade](https://gitee.com/smallc/SpringBlade)前端UI项目，基于react 、ant design、dva，用于快速构建系统中后台业务。

## 官网
* 官网地址：[https://bladex.vip](https://bladex.vip)

## 在线演示
* Sword演示地址：[https://sword.bladex.vip](https://sword.bladex.vip)
* Saber演示地址：[https://saber.avue.top](https://saber.avue.top)

## 后端项目地址
* [Gitee地址](https://gitee.com/smallc/SpringBlade)
* [Github地址](https://github.com/chillzhuang/SpringBlade)

## 前端项目地址
* [Sword--基于React](https://gitee.com/smallc/Sword)
* [Saber--基于Vue](https://gitee.com/smallc/Saber)

## 特性

- :gem: **优雅美观**：基于 Ant Design 体系精心设计
- :triangular_ruler: **常见设计模式**：提炼自中后台应用的典型页面和场景
- :rocket: **最新技术栈**：使用 React/umi/dva/antd 等前端前沿技术开发
- :iphone: **响应式**：针对不同屏幕大小设计
- :art: **主题**：可配置的主题满足多样化的品牌诉求
- :globe_with_meridians: **国际化**：内建业界通用的国际化方案
- :zap: **最佳实践**：良好的工程实践助您持续产出高质量代码
- :1234: **Mock 数据**：实用的本地数据调试方案
- :white_check_mark: **UI 测试**：自动化测试保障前端产品质量

## 支持环境

现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions


## 用户权益
* 允许免费用于学习、毕设、公司项目、私活等。
* 代码文件需保留相关license信息。

## 禁止事项
* 直接将本项目挂淘宝等商业平台出售。
* 业务代码50%以上相似度的二次开源，二次开源需先联系作者。

注意：若禁止条款被发现有权追讨19999的授权费。

## 如何启动
```
$ git clone https://gitee.com/smallc/Sword.git
$ cd Sword
$ npm install
# mock模式
$ npm start  
# 服务模式
$ npm run start:no-mock 
# 访问 http://localhost:88       
```

# 界面
## Sword界面一览
<table>
    <tr>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/sword-main.png"/></td>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/sword-menu.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/sword-menu-edit.png"/></td>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/sword-menu-icon.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/sword-role.png"/></td>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/sword-user.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/sword-dict.png "/></td>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/sword-log.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/sword-locale-cn.png"/></td>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/sword-locale-us.png"/></td>
    </tr>
</table>

## 监控界面一览
<table>
    <tr>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/springblade-k8s1.png"/></td>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/springblade-k8s2.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/springblade-grafana.png"/></td>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/springblade-harbor.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/springblade-traefik.png"/></td>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/springblade-traefik-health.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/springblade-nacos.png"/></td>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/springblade-sentinel.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/springblade-admin1.png"/></td>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/springblade-admin2.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/springblade-swagger1.png"/></td>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/springblade-swagger2.png"/></td>
    </tr>
</table>

## Saber界面一览
<table>
    <tr>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/saber-user.png"/></td>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/saber-role.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/saber-dict.png"/></td>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/saber-dict-select.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/saber-log.png"/></td>
        <td><img src="https://gitee.com/smallc/SpringBlade/raw/master/pic/saber-code.png"/></td>
    </tr>
</table>
