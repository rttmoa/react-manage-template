import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Progress } from '@arco-design/web-react';

/***
 * TODO: 进度条：https://arco.design/react/components/Progress
 * forwardRef：引用传递、是一种通过组件向子组件自动传递引用ref的技术、对于重复使用的组件很有用、例如某些input组件 需要控制其focus
 * 使用ref定时器控制进度条的动画效果、 使用Hooks控制进度条的显示与隐藏
 * forwardRef、 useImperativeHandle
 */
function LoadingBar(_, ref) {
  const loadingTimer = useRef(null);

  const [percent, setPercent] = useState<number>(30);
  const [hide, setHide] = useState<boolean>(true);
  function loading() {
    setHide(false);//hide为false 显示进度条
    setPercent(30);
    loadingTimer.current = setInterval(() => {
      if (percent <= 98) {
        setPercent(percent > 80 ? percent + 1 : percent + 10);
      }
    }, 1000);
  }

  function success() {
    clearInterval(loadingTimer.current);
    setPercent(100);
    setTimeout(() => {
      setHide(true);
    }, 300);
  }
  // Hooks：正常情况下 ref 是不能挂在到函数组件上的，因为函数组件没有实例，但是 useImperativeHandle 为我们提供了一个类似实例的东西。
    // 它帮助我们通过 useImperativeHandle 的第 2 个参数，所返回的对象的内容挂载到 父组件的 ref.current 上
  useImperativeHandle(ref, () => ({
    loading,
    success,
  }));

  return !hide ? (
    // 进度条
    <Progress
      percent={percent}
      showText={false}
      animation
      style={{ position: 'absolute', height: 2, top: -1, zIndex: 9999 }}
    />
  ) : null;
}

export default forwardRef(LoadingBar);
