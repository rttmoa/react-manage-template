import React, { useEffect, useState } from 'react';
import {  Table,  Button,  Input,  Breadcrumb,  Card,  Message,  Popconfirm,  Select,  Modal,  Form,  Radio,} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import {  UPDATE_FORM_PARAMS,  UPDATE_LIST,  UPDATE_LOADING,  UPDATE_PAGINATION, } from './redux/actionTypes';
import useLocale from '../../utils/useLocale';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getList, remove, updateCommentStatus } from '../../api/comment';
import { auditStatusOptions } from '../../const';
import dayjs from 'dayjs';




/***
 * TODO: 评论管理
 * dispatch：操作是：列表数据、分页页码、加载状态、表单数据  
 */
function Categories() {
  const locale = useLocale();
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ articleTitle: '', auditStatus: 0 });
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);/***--- 控制弹窗的显示与隐藏 ---**/
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [id, setId] = useState('');

  // 一键审核
  const handleAudit = (record) => {
    setVisible(true);
    setId(record._id);
  };

  const commentState = useSelector((state: ReducerState) => state.comment);
  const { data, pagination, loading, formParams } = commentState;
  useEffect(() => {
    // console.log('useEffect参数变化', query);
    fetchData(1, pagination.pageSize, query);
  }, [query]);

  async function fetchData(current = 1, pageSize = 20, params = {}) {
    dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
    try {
      const postData = {
        page: current,
        pageSize,
        ...params,
      }; 
      const res2: any = await getList(postData);
      const res = {data: {list: [{_id: "996", articleTitle: "今日话题", nickName: "zhangsan", currentReplayContent: "它好吃吗？", targetReplayId: "007", targetReplayContent: "确实好吃！",auditStatus: 1, commentTime: "2023-07-31 10:31", auditTime: "2023-07-31 10:31", }], totalCount: 20}}
      if (res) {
        dispatch({ type: UPDATE_LIST, payload: { data: res.data.list } });
        dispatch({
          type: UPDATE_PAGINATION,
          payload: { pagination: { ...pagination, current, pageSize, total: res.data.totalCount } },
        });
        dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
        dispatch({ type: UPDATE_FORM_PARAMS, payload: { params } });
      }
    } catch (error) {}
  }

  function onChangeTable(pagination) { // 分页
    const { current, pageSize } = pagination;
    fetchData(current, pageSize, formParams);
  }

  function onSearch(articleTitle) { // TODO: 当query变化时，useEffect监听query，持续请求
    setQuery({
      ...query,
      articleTitle,
    });
  }

  function onSelectSearch(auditStatus) { // TODO: 当query变化时，useEffect监听query，持续请求
    setQuery({
      ...query,
      auditStatus,
    });
  }

  const onDelete = async (row) => { // 删除单条数据
    const res: any = await remove(row);
    if (res.code === 0) {
      Message.success(res.msg);
      fetchData();
    } else Message.error('删除失败，请重试！');
  };

  const onCancel = () => { // 审核弹窗关闭：重置表单，重置iD
    setVisible(false);
    form.resetFields();
    setId('');
    setConfirmLoading(false);
  }; 
  
  const onOk = async () => { // 一键审核的通过/驳回的
    await form.validate();
    setConfirmLoading(true);
    const values = await form.getFields();
    const postData = { id, ...values }; 
    const res: any = await updateCommentStatus(postData);
    if (res.code === 0) {
      Message.success(res.msg);
      fetchData();
      onCancel();
    } else Message.error('审核失败，请重试！');
  };
 
  const columns: any = [
    {
      title: '文章标题',
      dataIndex: 'articleTitle',
      fixed: 'left',
      width: 160,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '当前回复内容',
      dataIndex: 'currentReplayContent',
    },
    {
      title: '目标回复ID',
      dataIndex: 'targetReplayId',
    },

    {
      title: '目标回复内容',
      dataIndex: 'targetReplayContent',
    },

    {
      title: '审核状态',
      dataIndex: 'auditStatus',
      // render: (text) => {
      //   // const current = auditStatusOptions.filter((item) => item.value === +text);
      //   // const obj = current[0];
      //   // const enums = {
      //   //   1: 'success',
      //   //   2: 'error',
      //   //   3: 'warning',
      //   // };
      //   // return <Badge status={enums[obj.value]} text={obj.label} />;
      // },
    },
    {
      title: '评论时间',
      dataIndex: 'commentTime',
      render: (text) => {
        return dayjs(text * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '审核时间',
      dataIndex: 'auditTime',
      render: (text) => {
        return dayjs(text * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    }, 
    {
      title: locale['searchTable.columns.operations'],
      dataIndex: 'operations',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <div className={styles.operations}>
          <Popconfirm title="Are you sure you want to delete?" onOk={() => onDelete(record)}>
            <Button type="text" status="danger" size="small">
              {locale['searchTable.columns.operations.delete']}
            </Button>
          </Popconfirm> 
          <Button onClick={() => handleAudit(record)} type="text" status="success" size="small">
            审核
          </Button>
        </div>
      ),
    },
  ];




  
  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>评论管理</Breadcrumb.Item>
      </Breadcrumb>

      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Input.Search style={{ width: 300 }} searchButton placeholder="请输入文章标题" onSearch={onSearch}/>
            <Select style={{ width: 160, marginLeft: 20, marginRight: 20 }}
              defaultValue={0} placeholder="请选择审核状态" onChange={onSelectSearch} 
            >
              {auditStatusOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
            <Button type="primary" onClick={() => handleAudit({ _id: 0 })}>一键审核</Button>
          </div>
        </div>

        <Table
          rowKey="_id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
          scroll={{ x: 1600 }} 
        />

        <Modal title="审核" visible={visible} onOk={onOk} confirmLoading={confirmLoading} onCancel={onCancel}>
          <Form form={form}>
            <Form.Item label="审核状态" field="auditStatus" rules={[{ required: true, message: '请选择审核状态' }]}>
              <Radio.Group>
                <Radio value={1}>通过</Radio>
                <Radio value={2}>驳回</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}

export default Categories;
