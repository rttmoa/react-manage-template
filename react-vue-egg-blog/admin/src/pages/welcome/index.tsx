import { Alert, Card, Link, Typography, Tag, Image } from '@arco-design/web-react';
import { IconDoubleRight } from '@arco-design/web-react/icon';
import React from 'react';
import { useSelector } from 'react-redux';
import { ReducerState } from '../../redux';
import useLocale from '../../utils/useLocale';
import imgWorkplace from '../../assets/workplace.png';  /**--- declare module '*.png' {} ---**/
import CodeBlock from './code-block';
import styles from './style/index.module.less';




/***
 * TODO: 欢迎页面
 * 中/英文切换 locale
 * 欢迎首页结构：卡片组件、排版标题、排版文本、警告提示、Tag标签、Link路由组件、CodeBlock组件复制粘贴文本内容、Tooltip提示动作、Image
 */
export default function Welcome() {
  const locale = useLocale();
  
  // 存储方式state.userInfo=userInfo={...action.payload, avatar, name}
  const userInfo = useSelector((state: ReducerState) => state.global.userInfo) || {};
  // console.log('userInfo', userInfo)

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          {locale['welcome.title.welcome']}
        </Typography.Title>
        <Typography.Text type="secondary">
          {userInfo.name}, {userInfo.email || "908240440@qq.com"}
        </Typography.Text>
      </div>
      <hr />
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          使用国际化中英文 + 复制文本功能 + 图片组件可预览
        </Typography.Title> 
      </div>

      <div className={styles.content}>

        {/* 绿色成功条 */}
        <Alert type="success" content={locale['welcome.invite']} />

        <Card style={{ marginTop: 20 }} bordered={false} title={locale['welcome.usage']}>
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            1. {locale['welcome.step.title.pickup']}
          </Typography.Title>
          <Typography.Text>
            {locale['welcome.step.content.pickup']}
            <Tag style={{ marginLeft: 8 }}>@arco-design/pro-pages-workplace</Tag>   {/* 标签：Tag  卡片组件上的灰色背景 */} 
          </Typography.Text>

          <Typography.Title heading={6}>
            2. {locale['welcome.step.title.install']}
          </Typography.Title>
          <Typography.Text>{locale['welcome.step.content.install']}</Typography.Text> 

          {/* TODO: 封装组件复制文本组件： CodeBlock */}
          <CodeBlock code="arco block use @arco-design/pro-pages-workplace" />

          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            3. {locale['welcome.step.title.result']}
          </Typography.Title>
          <Typography.Text>{locale['welcome.step.content.result']}</Typography.Text>
          <div style={{ marginTop: '1em' }}>
            <Image preview={true} width={600} src={imgWorkplace} />
          </div>
        </Card>


        <Card style={{ marginTop: 20 }}>
          <Typography.Text>{locale['welcome.title.material']}</Typography.Text>
          <div style={{ marginTop: 8 }}>
            <Link target="_blank" href="https://arco.design/material?category=arco-design-pro">
              {locale['welcome.link.material-pro']} <IconDoubleRight />  
            </Link>
          </div>
          <div style={{ marginTop: 8 }}>
            <Link target="_blank" href="https://arco.design/material">
              {locale['welcome.link.material-all']} <IconDoubleRight />
            </Link>
          </div>
        </Card>

      </div>
    </div>
  );
}
