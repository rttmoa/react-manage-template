/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { FormValueType } from '@/pages/Table/components/UpdateForm';
import { request } from '@umijs/max';



/** 此处后端没有提供注释 GET /api/v1/queryUserList */
export async function queryUserList(params: { keyword?: string;  current?: number; pageSize?: number; }, options?: { [key: string]: any },) {
  const onlyUrl = request<API.Result_PageInfo_UserInfo__>('/api/v1/queryUserList')
  return request<API.Result_PageInfo_UserInfo__>('/api/v1/queryUserList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
let params = {current: 1, pageSize: 20, name: 'sd ', nickName: 'fsg ', gender: '0'}
let sorter: any, filter: any;
const { data, success, errorMessage } = await queryUserList({
  ...params,
  // @ts-ignore
  sorter,
  filter,
});




/** 此处后端没有提供注释 POST /api/v1/user */
export async function addUser(body?: API.UserInfoVO, options?: { [key: string]: any },) {
  return request<API.Result_UserInfo_>('/api/v1/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
const handleAdd = async (fields: API.UserInfo) => {
  await addUser({ ...fields });
};



/** 此处后端没有提供注释 GET /api/v1/user/${param0} */
export async function getUserDetail(params: { userId?: string; },  options?: { [key: string]: any },) {
  const { userId: param0 } = params;
  return request<API.Result_UserInfo_>(`/api/v1/user/${param0}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}




/** 此处后端没有提供注释 PUT /api/v1/user/${param0} */
export async function modifyUser(params: { userId?: string; }, body?: API.UserInfoVO, options?: { [key: string]: any },) {
  const { userId: param0 } = params;
  return request<API.Result_UserInfo_>(`/api/v1/user/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
const handleUpdate = async (fields: FormValueType) => {
  await modifyUser(
    {
      userId: fields.id || '',
    },
    {
      name: fields.name || '',
      nickName: fields.nickName || '',
      email: fields.email || '',
    },
  );
};



/** 此处后端没有提供注释 DELETE /api/v1/user/${param0} */
export async function deleteUser(params: {  userId?: string; }, options?: { [key: string]: any },) {
  const { userId: param0 } = params;
  return request<API.Result_string_>(`/api/v1/user/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
const handleRemove = async (selectedRows: API.UserInfo[]) => {
  await deleteUser({
    userId: selectedRows.find((row) => row.id)?.id || '',
  });
};