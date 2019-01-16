# egg-server

blog

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
# 笔记
## Service：在复杂业务场景下用于做业务逻辑封装的抽象层
- 优点：
1. 保持controller逻辑简洁
2. 保持业务逻辑独立性，抽象出的Service可被多个Controller重复调用
3. 将逻辑和展现分离，更容易编写测试用例
- 案例
1. 复杂数据的处理，比如要展示的信息需要从数据库获取，还需要经过一定的规则计算，才能返回用户显示
2. 第三方服务调用，比如获取GitHub信息
3. 短信支付
4. 微信支付，微信信息