# Yao-s_magic_book 点餐小程序

基于 **uni-app + Vue 2 + JavaScript** Codex开发的微信小程序工程。

## 环境要求

- Node.js 18+（本机 Node 20.10 实测可用）
- 微信开发者工具（预览 / 上传小程序用）

> **关于版本锁定**：本工程把 `vite` 锁在 `5.2.8`、`sass` 锁在 `~1.77.8`、
> uni-app 锁在 `3.0.0-alpha-5020520260829001`。这套组合兼容 Node < 20.19 的环境。
> 如果以后把 Node 升到 20.19+ 或 22.12+，可以换成最新版 uni-app
> （安装时用 `@vue2` 标签，例如 `npm i @dcloudio/uni-app@vue2`）。

## 安装依赖

```bash
npm install
```

## 开发微信小程序

```bash
npm run dev:mp-weixin
```

然后打开微信开发者工具 → 导入项目 → 目录选择 `dist/dev/mp-weixin`。

## 打包并上传

```bash
npm run build:mp-weixin
```

产物在 `dist/build/mp-weixin`，用微信开发者工具打开后点击「上传」即可提交审核。

## 浏览器预览（可选，调样式比开发者工具快）

```bash
npm run dev:h5
```

## 目录结构

```
Yao-s_magic_book
├─ index.html              H5 入口模板
├─ vite.config.js          Vite + uni-app 插件配置
└─ src
   ├─ main.js              应用入口，创建 Vue 实例
   ├─ App.vue              应用根组件，全局样式
   ├─ pages.json           页面路由 + tabBar 配置
   ├─ manifest.json        小程序 appid、编译选项等
   ├─ uni.scss             全局样式变量
   ├─ components/
   │  └─ DishCard.vue      菜品卡片组件
   ├─ mock/
   │  └─ dishes.js         菜单假数据（后续换成接口）
   ├─ store/
   │  ├─ cart.js           购物车状态
   │  └─ orders.js         订单状态（内存态，刷新即清空）
   ├─ pages/
   │  ├─ index/index.vue   点餐页（分类 + 菜单）
   │  ├─ cart/cart.vue     购物车页
   │  └─ order/order.vue   订单页
   └─ static/              本地静态资源（图片等）
```

## 下一步 TODO

- [ ] 把 `src/mock/dishes.js` 换成后端接口
- [ ] 接入微信支付、桌号/取餐号、订单状态流转
- [ ] 状态变复杂后，把 `src/store` 换成 pinia
