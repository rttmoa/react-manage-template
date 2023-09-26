import React, { useState, useEffect } from 'react';
import { Input, Form, Grid, Message, Select } from '@arco-design/web-react';
import Save from '../../../../components/Save';
import UploadImage from '../../../../components/UploadImage';
import { queryIntroduction, addIntroduction, updateIntroduction } from '../../../../api/site/right';
import { getList } from '../../../../api/tags';
import { showPositions } from '../../../../const';

const Row = Grid.Row;
const Col = Grid.Col;






/***
 * 通过Form表单中的field字段：受控组件的唯一标示  获取到组件里面包裹的值
 * 组件：<Save> <Row> <Col span={12}> <Form.Item field rules> <Select mode> <Select.Option key value> <UploadImage max={4} showImg={false} showIcon>
 * 
 */
const Tab0 = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState();
  const [tagsArr, setTagsArr] = useState([]);

  const loadData = async (isRefresh?: boolean) => {
    const res: any = await queryIntroduction();
    if (isRefresh) {
      Message.success('刷新成功');
    }
    const data = res.data;
    // console.log(data);
    form.setFieldsValue(data);
    setTime(data.updateTime);
  };

  const getTags = async () => {
    const res: any = await getList({
      page: 1,
      pageSize: 9999,
    });
    // console.log(res)
    setTagsArr(res.data.list?.map((item) => item.name) || []);
  };
  useEffect(() => {
    loadData();
    getTags();
  }, []);

  const onRefresh = () => {
    loadData(true);
  };

  const onSave = async () => {
     
    /***
     * 获取的Values的值是：
          icon: "https://tiebapic.baidu.com/forum/w%3D580%3B/sign=c951c1c9cf82b9013dadc33b43b6ab77/562c11dfa9ec8a13658abd0eb203918fa1ecc048.jpg?tbpicau=2022-08-19-05_b32287b31013d9a8405ebc04b9baba56"
          link: "https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&tn=baidu&wd=c%E7%BD%97&oq=%25E4%25BF%25BA%25E6%2598%25AF%25E4%25B8%25AA&rsv_pq=b831472900778f52&rsv_t=72e1HP9OGsgapFPWCnpToVXo%2BbmkEu0j7KUP%2FVTV2xjuAz7Y1O3Z%2BgjcO0E&rqlang=cn&rsv_dl=ts_0&rsv_enter=1&rsv_sug3=5&rsv_sug1=4&rsv_sug7=100&rsv_sug2=0&rsv_btype=t&prefixsug=c&rsp=0&inputT=5828&rsv_sug4=6780"
          showAdd: false
          showReduce: true
          _id: "62fc4c9332d3b10d64e0827a"
    */

    await form.validate();
    const values = await form.getFields();
    // console.log('values', values);

    const postData = values;

    /***--- 原属性是icon、link、showAdd、showReduce、_id ---**/
    /***--- 返回是属性名对应的属性值 ---**/
    postData.friendLink = postData.friendLink.map((item) => {
      return {
        icon: item.icon,
        link: item.link,
        // _id: item._id,  /***--- 注释掉就不返回 _id 属性 ---**/
      };
    });

    // console.log('postData', postData);
    const func = values._id ? updateIntroduction : addIntroduction;
    const res: any = await func(postData);
    if (res.data) {
      loadData();
      Message.success(res.msg);
    } else {
      Message.error('修改失败，请重试');
    }
  };

  



  return (
    <>
      <Save time={time} onRefresh={onRefresh} onSave={onSave} />

      <Form form={form}>

        {/* 纵向排列 */}
        <Row>
          <Col span={12}>
            <Form.Item
              label="昵称"
              field="nickName"
              rules={[
                { required: true, message: '请输入昵称' },
                {
                  minLength: 2,
                  message: '至少2个字符',
                },
                {
                  maxLength: 20,
                  message: '最多20个字符',
                },
              ]}
            >
              <Input placeholder="请输入昵称" />
            </Form.Item>

            <Form.Item
              label="简介"
              field="desc"
              rules={[{ required: true, message: '请输入简介' }]}
            >
              <Input placeholder="请输入简介" />
            </Form.Item>
            <Form.Item
              label="标签"
              field="tags"
              rules={[{ required: true, message: '请选择标签' }]}
            >
              <Select mode="multiple" placeholder="请选择标签">
                {tagsArr.map((option) => (
                  
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="展示位置"
              field="showPosition"
              rules={[{ required: true, message: '请选择展示位置' }]}
            >
              <Select mode="multiple" placeholder="请选择展示位置">
                {
                  showPositions.map((option) => 
                  {
                    return (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="友情链接(1-4个)"
              field="friendLink"
              rules={[{ required: true, message: '请添加友情链接' }]}
            >
              <UploadImage max={4} showImg={false} showIcon />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Tab0;
