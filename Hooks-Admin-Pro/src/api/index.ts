/* eslint-disable prettier/prettier */
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/components/Loading/fullScreen";
import { LOGIN_URL } from "@/config";
import { ResultData } from "@/api/interface";
import { ResultEnum } from "@/enums/httpEnum";
import { message } from "@/hooks/useMessage";
import { setToken } from "@/redux/modules/user"; // 用户：Token
import { checkStatus } from "./helper/checkStatus"; // 状态码：checkStatus
import { store } from "@/redux"; // redux：Store

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean;
}

const config = {
  // The default address request address, which can be modified in the .env.** file
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: ResultEnum.TIMEOUT as number,
  // 允许跨域携带凭证
  withCredentials: false
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 实例化
    this.service = axios.create(config);

    /**
     * @description request interceptor
     * Client sends request -> [request interceptor] -> server
     * token verification (JWT): Accept the token returned by the server and store it in redux/local storage
     */
    this.service.interceptors.request.use((config: CustomAxiosRequestConfig) => {
        // 当前请求需要显示加载，这由 API 服务中指定的第三个参数控制： {loading: true}
        config.loading && showFullScreenLoading();
        if (config.headers && typeof config.headers.set === "function") {
          const configToken = store.getState().user.token;
          config.headers.set("x-access-token", configToken);
        }
        return config;
      }, (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description response interceptor
     *  The server returns the information -> [intercept unified processing] -> the client JS gets the information
     */
    this.service.interceptors.response.use((response: AxiosResponse) => {
        const { data } = response;
        tryHideFullScreenLoading();

        // login failure （401）
        if (+data.code === ResultEnum.OVERDUE) {
          store.dispatch(setToken(""));
          message.error(data.msg);
          window.$navigate(LOGIN_URL); 
          return Promise.reject(data);
        }

        // 全局错误信息拦截（防止下载文件时数据流返回，直接报错，无需代码）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          message.error(data.msg);
          return Promise.reject(data);
        }
        // 请求成功（除非有特殊情况，否则无需在页面上处理失败逻辑）
        // console.log("结果：", data);
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        tryHideFullScreenLoading();
        // 分别判断请求超时 && 网络错误，无响应
        if (error.message.indexOf("timeout") !== -1) message.error("请求超时！请您稍后重试");
        if (error.message.indexOf("Network Error") !== -1) message.error("网络错误！请您稍后重试");
        // 根据服务器响应的错误状态代码进行不同处理
        if (response) checkStatus(response.status);
        // 服务器不返回任何结果（可能是服务器出错或客户端断开了网络连接），断开连接处理：您可以跳转到断开连接页面
        if (!window.navigator.onLine) window.$navigate("/500");
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description Common request method encapsulation
   */
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: "blob" });
  }
}

export default new RequestHttp(config);
