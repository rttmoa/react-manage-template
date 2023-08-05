import React, { useEffect } from 'react';
import {  Table,  Button,  Input,  Breadcrumb,  Card,  Message,  Popconfirm,  Image,  Tag,  Tooltip,} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import {  UPDATE_FORM_PARAMS,  UPDATE_LIST,  UPDATE_LOADING,  UPDATE_PAGINATION,} from './redux/actionTypes';
import useLocale from '../../utils/useLocale';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getList, remove } from '../../api/user';


 


/***
 * TODO: 用户管理：管理前台的注册的用户信息 
 */
function Categories() {
  const locale = useLocale();
  const dispatch = useDispatch();

  const userState = useSelector((state: ReducerState) => state.user);
  const { data, pagination, loading, formParams } = userState;

  async function fetchData(current = 1, pageSize = 20, params = {}) {
    dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
    try {
      const postData = {
        page: current,
        pageSize,
        ...params,
      }; 
      const res2: any = await getList(postData); 
      const res = {data: {list: [{nickName: "zhangsan", avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F3a2f9e13-ac28-467f-8ccc-e024f5e81c0a%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693356065&t=c0330b052df2ee9d7051ce570a19b4ba", provider: "假数据", email: "908240440@qq.com", articleIds: [], introduction: "暂无",registerTime: "2023-07-31", }], totalCount: 20}}
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

  useEffect(() => {
    fetchData();
  }, []);

 
  function onChangeTable(pagination) { // 切换页码
    const { current, pageSize } = pagination;
    fetchData(current, pageSize, formParams);
  }

  function onSearch(nickName) { // 表头、搜索数据
    fetchData(1, pagination.pageSize, { nickName });
  }

  const onDelete = async (row) => { // 删除行数据
    const res: any = await remove(row);
    if (res.code === 0) {
      Message.success(res.msg);
      fetchData();
    } else Message.error('删除失败，请重试！');
  };

  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickName',
      width: 160,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 60,
      render: (_, record) => {
        return <Image width={50} height={50} src={record.avatar}></Image>;
      },
    },
    {
      title: '来源',
      width: 80,
      dataIndex: 'provider',
    },
    {
      title: 'Email',
      dataIndex: 'email', 
    }, 
    {
      title: '收藏数量',
      dataIndex: 'articleIds',
      render: (_, record) => {
        return <Tag color="orange">{ 11 || record.articleIds?.length}</Tag>;
      },
    }, 
    {
      title: '简介',
      width: 400,
      dataIndex: 'introduction',
      render: (text) => {
        return <Tooltip position="tl" content={text}>{text}（文本可提示Tooltip）</Tooltip>
      },
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      width: 160,
    }, 
    {
      title: locale['searchTable.columns.operations'],
      dataIndex: 'operations',
      render: (_, record) => (
        <div className={styles.operations}>
          <Popconfirm title="Are you sure you want to delete?" onOk={() => onDelete(record)}>
            <Button type="text" status="danger" size="small">
              {locale['searchTable.columns.operations.delete']}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
 


  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Input.Search style={{ width: 300 }} searchButton placeholder="请输入昵称" onSearch={onSearch}/>
          </div>
        </div>
        <Table
          rowKey="_id"
          loading={loading}
          onChange={onChangeTable} // 选择页码：fetchData(current, pageSize, formParams)
          pagination={pagination} 
          columns={columns}
          data={data}
        />
      </Card>
    </div>
  );
}

export default Categories;
