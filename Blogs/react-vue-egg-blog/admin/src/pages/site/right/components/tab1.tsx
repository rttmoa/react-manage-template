import React, { useState, useEffect } from 'react';
import {
  Form,
  Grid,
  Message,
  Select
} from '@arco-design/web-react';
import Save from '../../../../components/Save';
import UploadImage from '../../../../components/UploadImage';
import { queryAd, addAd, updateAd } from '../../../../api/site/right';
import { showPositions } from '../../../../const';


const Row = Grid.Row;
const Col = Grid.Col;









const Tab1 = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState();
 
  const loadData = async (isRefresh?: boolean) => {
    const res: any = await queryAd();
    if (isRefresh) {
      Message.success('刷新成功');
    }
    const data = res.data;
    // console.log(data);
    form.setFieldsValue(data);
    setTime(data.updateTime);
  }

  useEffect(() => {
    loadData();
  }, [])


  const onRefresh = () => {
    loadData(true);
  }

  const onSave = async () => {
    await form.validate(); /***--- 表单校验：上传的图片不能为空、链接不能为空、展示位置不能为空 ---**/
    const values = await form.getFields();
    // console.log("values", values);
    /***
      * values下的imgs属性：原属性为
          imgUrl: "http://image.nevergiveupt.top/02c72a844ab55e681e96f94803946ba6.jpg"
          link: "https://baike.baidu.com/pic/IMG%E9%9B%86%E5%9B%A2/3171228/1/5ab5c9ea15ce36d3e090a33a35f33a87e950b127?fr=lemma&ct=single#aid=1&pic=5ab5c9ea15ce36d3e090a33a35f33a87e950b127"
          showAdd: true
          showReduce: false
          _id: "62fc558232d3b10d64e082b8"
        
        map遍历后返回的新数组属性为 imgUrl、link     ---->  替换了属性值
     */
    const postData = values;
    postData.imgs = postData.imgs.map(item => {
      return {
        imgUrl: item.imgUrl,
        link: item.link,
        // _id: item._id
      }
    })

    // console.log("postData", postData);
    const func = values._id ? updateAd : addAd;
    const res: any = await func(postData);
    if (res.data) {
      loadData();
      Message.success(res.msg);
    } else {
      Message.error('修改失败，请重试');

    }

  }




  return <><Save time={time} onRefresh={onRefresh} onSave={onSave} />
    <Form form={form} >
      
      <Row> 
        <Col span={12}>
          <Form.Item label="广告图片(1-3张)" field="imgs" rules={[{ required: true, message: '请添加广告图片' }]}>
            <UploadImage max={3} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="展示位置" field="showPosition" rules={[{ required: true, message: '请选择展示位置' }]}>
            <Select mode='multiple' placeholder="请选择展示位置">
              {showPositions.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </>
}

export default Tab1;