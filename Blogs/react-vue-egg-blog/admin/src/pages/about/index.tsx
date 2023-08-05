import React, { useEffect, useState } from 'react';
import {  Input,  Breadcrumb,  Card,  Form,  Grid,  Link,  Switch,  Message } from '@arco-design/web-react';
import styles from './style/index.module.less';
import BlogTags from './components/tags';
import Save from '../../components/Save';
import UploadImage from '../../components/UploadImage';
import { queryAbout, addAbout, updateAbout } from '../../api/about';
const Row = Grid.Row;
const Col = Grid.Col;



/***
 * 5.关于管理
 * 封装标签云组件： <BlogTags />
 * 使用公共组件： <Save />  <UploadImage />
 */
const About = () => {
  const [form] = Form.useForm();
  const [resetLength, setResetLength] = useState(800); // 文本域可输入内容的长度
  const [showTip, setShowTip] = useState(false);
  const [time, setTime] = useState(null);

  const loadData = async (isRefresh?: boolean) => {
    const res: any = await queryAbout();
    if (isRefresh) {
      Message.success('刷新成功');
    }
    const data = res.data;
    if (!data) return;
    form.setFieldsValue(data);
    onChangeDesc(data.desc)
    setTime(data.updateTime);
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
    // console.log(values); // {tags: Array(3), createTime: 1660292733, updateTime: 1690640865, showResume: false, _id: '62f60e7da98d7c10accfc01b', …}
    values.imgs = values.imgs?.map(item => {
      return {
        imgUrl: item.imgUrl,
        link: item.link
      }
    })
    const func = values._id ? updateAbout : addAbout;
    const res: any = await func(values);
    if (res.data) {
      loadData();
      Message.success(res.msg);
    } else Message.error('修改失败，请重试');
  }

  const onChangeDesc = (value: string) => {
    setResetLength(800 - value.length);
  }


  // TODO: 封装组件： <Save />  <BlogTags />  <UploadImage />
  let tagLabel = <span style={{color: 'red', fontWeight: 'bold'}}>标签云:（1-20个）</span>
  let imgLabel = <span style={{color: 'red', fontWeight: 'bold'}}>介绍图片:（1-3张）</span>
  return <>
    <Save time={time} onRefresh={onRefresh} onSave={onSave} />

    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>关于管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card hoverable>
        <Form layout="vertical" form={form}>
          <Row>
            <Col span={10}>
              <Form.Item label={tagLabel} field="tags" rules={[{ required: true, message: '请添加标签' }]}>
                <BlogTags max={20} />  
              </Form.Item>
              <Form.Item label="详细介绍" field="desc" rules={[{ required: true, message: '请输入详细介绍' }, {maxLength: 800, message: '不能超过800个字符'}]}>
                <Input.TextArea onFocus={() => setShowTip(true)} onBlur={() => setShowTip(false)} rows={6} onChange={onChangeDesc} />
              </Form.Item>
              {showTip && (
                <div className={styles['desc-tip']}>
                  还可以输入<Link status='error'>{resetLength}</Link>个字符
                </div>
              )}
              <Form.Item label="个人简历" field="showResume" triggerPropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12} offset={2}>
              <Form.Item label={imgLabel} field="imgs" rules={[{ required: true, message: '请添加介绍图片' }]}>
                <UploadImage max={3} />
              </Form.Item>
            </Col>
          </Row> 
        </Form>
      </Card>
    </div>

  </>
}

export default About;