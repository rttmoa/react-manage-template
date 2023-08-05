'use strict';

const Controller = require('egg').Controller;

class AboutController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      imgs: {
        type: 'array',
        itemType: 'object',
        min: 1,
        max: 3,
        rule: {
          imgUrl: 'url',
          link: {
            type: 'string',
            required: false,
          },
        },
      },
      desc: {
        type: 'string',
        min: 1,
        max: 800,
      },
      tags: {
        type: 'array',
        itemType: 'string',
        min: 1,
        max: 20,
      },
      showResume: {
        type: 'boolean',
        default: false,
      },
    };
  }

  // 查询一条数据
  async index() {
    const { ctx, service } = this; // service.about:  AboutService {}
    const res = await service.about.index();
    // console.log(res);
    // {
    //   msg: '关于信息获取成功',
    //   data: {
    //     tags: [ '标签1' ],
    //     createTime: 1660292733,
    //     updateTime: 1660655702,
    //     showResume: true,
    //     _id: 62f60e7da98d7c10accfc01b,
    //     imgs: [ [Object], [Object], [Object] ],
    //     desc: '测试aaaa'
    //   }
    // }
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 创建一条数据
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.about.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // TODO: 更新关于管理数据 （先校验数据，再调用service层的函数去处理，service层的函数去调用model层的数据处理，返回给这里）
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.about.update({ id, ...data });
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = AboutController;
