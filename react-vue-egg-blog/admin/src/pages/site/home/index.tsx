import React, { useEffect, useState } from 'react';
import { Input, Breadcrumb, Card, Form, Grid, Link, Switch, Message } from '@arco-design/web-react';
import styles from './style/index.module.less';
import Save from '../../../components/Save';
import UploadImage from '../../../components/UploadImage';
import { queryHome, addHome, updateHome } from '../../../api/site/home';

const Row = Grid.Row;
const Col = Grid.Col;





/***
 * 设置-> 首页配置
 * 封装了UploadImage组件(公共组件)
 * Form.useForm：   Form表单的field字段的名称要和后台接口中的字段对应上  返回的数据根据field字段  取值
 * 格式化时间-> 将时间戳格式化成标准时间
 * 组件属性：<Form> <Form.Item> <Input.TextArea> <Link> <Switch>
 */
const About = () => {
  const [form] = Form.useForm();
  const [resetLength, setResetLength] = useState(800);
  const [showTip, setShowTip] = useState(false);/***--- 控制输入框显示与隐藏 ---**/
  const [time, setTime] = useState();/***--- 在Save组件中格式化时间 ---**/


  /***
   * 接口的数据是：Form表单的field字段的名称就是 属性名
      aboutBgImg: "http://image.nevergiveupt.top/bf5f920a6ceeaa641a190823a5d73779.jpg"
      archiveBgImg: "http://image.nevergiveupt.top/bf5f920a6ceeaa641a190823a5d73779.jpg"
      categoriesBgImg: "http://image.nevergiveupt.top/bf5f920a6ceeaa641a190823a5d73779.jpg"
      categoriesDetailBgImg: "http://image.nevergiveupt.top/bf5f920a6ceeaa641a190823a5d73779.jpg"
      createTime: 1660292968
      effects: true
      introduction: "aaaa"
      tagsBgImg: "http://image.nevergiveupt.top/bf5f920a6ceeaa641a190823a5d73779.jpg"
      tagsDetailBgImg: "http://image.nevergiveupt.top/bf5f920a6ceeaa641a190823a5d73779.jpg"
      updateTime: 1660657686
      _id: "62f60f68a98d7c10accfc053"
   */


  const loadData = async (isRefresh?: boolean) => {
    const res: any = await queryHome();
    if (isRefresh) {
      Message.success('刷新成功');
    }
    const data = res.data;
    // console.log(data)
    if (!data) return;
    form.setFieldsValue({
      ...data,
      archiveBgImg: [{
        imgUrl: data.archiveBgImg
      }],
      categoriesBgImg: [{
        imgUrl: data.categoriesBgImg
      }],
      categoriesDetailBgImg: [{
        imgUrl: data.categoriesDetailBgImg
      }], 
      tagsBgImg: [{
        imgUrl: data.tagsBgImg
      }], 
      tagsDetailBgImg: [{
        imgUrl: data.tagsDetailBgImg
      }], 
      aboutBgImg: [{
        imgUrl: data.aboutBgImg
      }]
    });
    onChangeDesc(data.introduction)
    setTime(data.updateTime); /***--- 在Save组件中格式化时间 ---**/
  }

  useEffect(() => {
    loadData();
  }, [])

  const onRefresh = () => {
    loadData(true);
  }

  const onSave = async () => {
    await form.validate();
    const values = await form.getFields();
    // console.log(values);
    const postData = {
      ...values,
      archiveBgImg:  values.archiveBgImg[0].imgUrl,
      categoriesBgImg:  values.categoriesBgImg[0].imgUrl,
      categoriesDetailBgImg:  values.categoriesDetailBgImg[0].imgUrl,
      tagsBgImg:  values.tagsBgImg[0].imgUrl,
      tagsDetailBgImg:  values.tagsDetailBgImg[0].imgUrl,
      aboutBgImg:  values.aboutBgImg[0].imgUrl,
    }
    
    // console.log("postData", postData);
    const func = values._id ? updateHome : addHome;
    const res: any = await func(postData);
    if (res.data) {
      loadData();
      Message.success(res.msg);
    } else {
      Message.error('修改失败，请重试');
    } 
  }

  /***--- 显示建议的剩余长度 ---**/
  const onChangeDesc = (value) => {
    setResetLength(800 - value.length);
  }






  return <>
    {/* 底部固定的刷新和保存按钮 */}
    <Save time={time} onRefresh={onRefresh} onSave={onSave}/>

    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>首页配置</Breadcrumb.Item>
      </Breadcrumb>

      <Card hoverable>
        <Form layout="vertical" form={form} >
          <Row>
            <Col span={4}>
              <Form.Item label="归档背景图片" field="archiveBgImg" rules={[{ required: true, message: '请添加归档背景图片' }]}>
                <UploadImage showLink={false} showAction={false} />  {/* -------------------封装的组件UploadImage */} 
              </Form.Item>
            </Col>
            <Col span={4}> <Form.Item label="分类背景图片" field="categoriesBgImg" rules={[{ required: true, message: '请添加分类背景图片' }]}>
              <UploadImage showLink={false} showAction={false} />
            </Form.Item>
            </Col>
            <Col span={4}> <Form.Item label="分类详情背景图片" field="categoriesDetailBgImg" rules={[{ required: true, message: '请添加分类详情背景图片' }]}>
              <UploadImage showLink={false} showAction={false} />
            </Form.Item>
            </Col>
            <Col span={4}> <Form.Item label="标签背景图片" field="tagsBgImg" rules={[{ required: true, message: '请添加标签背景图片' }]}>
              <UploadImage showLink={false} showAction={false} />
            </Form.Item>
            </Col>
            <Col span={4}> <Form.Item label="标签详情背景图片" field="tagsDetailBgImg" rules={[{ required: true, message: '请添加标签详情背景图片' }]}>
              <UploadImage showLink={false} showAction={false} />
            </Form.Item>
            </Col>
            <Col span={4}> <Form.Item label="关于背景图片" field="aboutBgImg" rules={[{ required: true, message: '请添加关于背景图片' }]}>
              <UploadImage showLink={false} showAction={false} />
            </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item label="简介" field="introduction" rules={[{ required: true, message: '请输入简介' }, {
                  maxLength: 800, message: '不能超过800个字符'}]} 
              >
                  <Input.TextArea onFocus={() => setShowTip(true)} onBlur={() => setShowTip(false)} rows={2} onChange={onChangeDesc} />
              </Form.Item>
                {
                  showTip && <div className={styles['desc-tip']}>
                    还可以输入
                      <Link status='error'>
                        {resetLength}   {/* 剩余长度 */} 
                      </Link>
                    个字符
                  </div>
                }
            </Col>
          </Row>

          <Form.Item label="简介特效" field="effects" triggerPropName="checked">
            <Switch checkedText='开启' uncheckedText='关闭' />
          </Form.Item>

        </Form>
      </Card>
    </div>
  </>
}

export default About;