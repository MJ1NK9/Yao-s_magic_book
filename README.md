# Yao-s_magic_book 点餐小程序

基于 **uni-app + Vue 2 + JavaScript + uView UI** 的微信小程序骨架工程。

## 环境要求

- Node.js 18 ~ 20（本机 Node 20.10 实测可用）
- 微信开发者工具（预览 / 上传小程序用）

> **关于版本锁定**：`vue` 锁在 `~2.6.14`，**不能用 Vue 2.7**——uni-app 依赖的
> `@vue/composition-api` 要求 `vue >= 2.5 < 2.7`，装成 2.7 会起不来。
> `@dcloudio/*` 全线锁在 `2.0.2-5020420260813001`。
>
> 构建器用的是 `@vue/cli-service` 5 + webpack 5。**不要降到 webpack 4**
> （也就是不要用 `@vue/cli-service` 4）：Node 17 以上 webpack 4 会因为 OpenSSL
> 报 `ERR_OSSL_EVP_UNSUPPORTED`，必须加 `--openssl-legacy-provider` 才能跑。

## 安装依赖

```bash
npm install
```

## 开发微信小程序

```bash
npm run dev:mp-weixin
```

这是 watch 模式，改代码会自动重新编译。日常按下面的流程来即可。

## 日常开发流程（重点：只改 src）

**`src/` 是源码，`dist/` 是编译产物。永远只改 `src/`，改 `dist/` 会被下一次编译覆盖。**

日常就两个窗口，改完保存自动生效，不用重启：

1. 项目根目录开个终端跑 `npm run dev:mp-weixin`（等价简写 `npm run dev`），**让它一直挂着**。
2. 微信开发者工具「导入项目」，目录选 `dist/dev/mp-weixin`；之后只管写代码，编译完它会自动刷新，不用手动点编译。

调样式想更快的话，另开一个终端跑 `npm run dev:h5`，浏览器开 http://localhost:8080/ 。最终效果以微信开发者工具为准。

注意：

- **一次只跑一个 watch 进程。** 同时跑两个会往同一个 `dist` 目录写，产物会错乱（页面能打开但列表是空的），已经踩过一次。
- 改 `.vue` / `.js` / `.json` / `.scss` 会自动重编译；改 `package.json`、`vue.config.js`、`babel.config.js` 要 Ctrl+C 重启。
- 微信开发者工具「本地设置」里勾上「不校验合法域名」，方便后面调接口。

### 想改东西，改哪个文件

| 想改什么 | 改哪里 |
| --- | --- |
| 首页布局、分类栏 | `src/pages/index/index.vue` |
| 菜品卡片长相（图片 / 名称 / 价格 / 加号） | `src/components/DishCard.vue` |
| 购物车页 | `src/pages/cart/cart.vue` |
| 订单页 | `src/pages/order/order.vue` |
| 菜单数据（菜名 / 价格 / 分类 / 图片路径） | `src/mock/dishes.js` |
| 菜品图片 | `src/static/dishes/`（文件名与 `dishes.js` 里的 `image` 字段对应） |
| 页面标题、底部 tabBar | `src/pages.json` |
| 主题色、全局样式变量 | `src/uni.scss` |
| 应用启动逻辑、全局样式 | `src/App.vue` |

### 底部固定栏的写法（重要）

底部悬浮按钮 / 结算栏这种 `position: fixed` 的元素，`bottom` 不要写死：

```css
bottom: var(--window-bottom, 0px);                /* 通栏款，例如购物车页的提交栏 */
bottom: calc(24rpx + var(--window-bottom, 0px));  /* 悬浮款，例如点餐页的结算胶囊，24rpx 是想离底部的距离 */
```

原因：H5 端的 tabBar 是浮在页面之上的，写死 `bottom: 0` / `bottom: 24rpx` 会被它压住、点不到。
`--window-bottom` 在 H5 下等于 tabBar 的高度（含 iPhone 底部安全区）；
小程序端的页面区域本来就避开了原生 tabBar，且没有这个变量，uni-app 编译时会把它化简成兜底值，位置正好也对。

所以以后再加底部固定栏，照上面这两行抄就行。

### 新增一个页面

1. 在 `src/pages/` 下建目录和 `.vue` 文件，例如 `src/pages/mine/mine.vue`。
2. 在 `src/pages.json` 的 `pages` 数组里登记：
   `{ "path": "pages/mine/mine", "style": { "navigationBarTitleText": "我的" } }`
3. 要放进底部 tabBar，再在 `pages.json` 的 `tabBar.list` 里加一项。

> pages.json 里没登记的页面编译不进去、也打不开，这是小程序本身的规矩。

### 图片、图标放哪

本地图片一律放 `src/static/`，模板里用 `/static/xxx.png` 这种**绝对路径**引用。
不要放在组件旁边用相对路径引，小程序端容易找不到。

## 打包并上传

```bash
npm run build:mp-weixin
```

产物在 `dist/build/mp-weixin`，用微信开发者工具打开后点击「上传」即可提交审核。

## 浏览器预览（可选，调样式比开发者工具快）

```bash
npm run dev:h5
```

默认地址 http://localhost:8080/ 。

## 目录结构

```
Yao-s_magic_book
├─ babel.config.js         babel 配置（uni-app 官方模板）
├─ postcss.config.js       postcss 配置（uni-app 官方模板）
├─ vue.config.js           vue-cli 配置（目前只加了 transpileDependencies）
├─ public/
│  └─ index.html           H5 入口模板
└─ src
   ├─ main.js              应用入口，注册 uView
   ├─ App.vue              应用根组件，引入 uView 全局样式
   ├─ pages.json           页面路由 + tabBar + easycom 配置
   ├─ manifest.json        小程序 appid、编译选项等
   ├─ uni.scss             全局样式变量（末尾引入 uView 主题）
   ├─ uni.promisify.adaptor.js  uni API 的 Promise 适配
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
   └─ static/
      └─ dishes/           菜品图片
```

## 关于 uView UI

已经配置好了，直接用即可，**不需要在每个页面 import**：

- `src/pages.json` 里配了 easycom：
  `"^u-(.*)": "uview-ui/components/u-$1/u-$1.vue"`。
  所以模板里直接写 `<u-button>`，就会自动引入
  `uview-ui/components/u-button/u-button.vue`。
- `src/uni.scss` 末尾引入了 uView 的主题变量（`$u-*`），
  所以在任意组件的 `<style lang="scss">` 里都能直接用这些变量。
- `src/App.vue` 引入了 uView 的全局样式（`uview-ui/index.scss`）。
- `src/main.js` 里 `Vue.use(uView)`。

目前用到的组件：`u-empty`（购物车 / 订单的空状态）、`u-number-box`（购物车数量步进器）。
组件文档：https://uviewui.com/components/intro.html

## 这套代码的写法约定

- 组件一律用 **Options API**（`data()` / `computed` / `methods`），
  不用 Composition API，方便直接对照 Vue 2 官方文档。
- 全局状态放在 `src/store/`：用 `Vue.observable()` 做一个轻量 store，
  页面里用 `computed` 读、用导入的函数改。状态变复杂后可以换成 Vuex。

## 下一步 TODO

- [x] 小程序 AppID 已填（`wx49441cff40c6d8f4`）；换小程序改 `src/manifest.json` 的 `mp-weixin.appid`
- [ ] 用真实菜品照片替换 `src/static/dishes/` 里的占位图（文件名与 `src/mock/dishes.js` 的 `image` 字段一一对应）
- [ ] 把 `src/mock/dishes.js` 换成后端接口
- [ ] 接入微信支付、桌号/取餐号、订单状态流转
- [ ] 状态变复杂后，把 `src/store` 换成 Vuex
- [x] 已修：底部固定栏改成 `var(--window-bottom, 0px)` 定位，H5 端不再被 tabBar 盖住（点餐页悬浮结算栏 + 购物车页提交栏）
