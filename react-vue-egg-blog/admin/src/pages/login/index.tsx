import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import LoginForm from './form';
import LoginBanner from './banner';
import Logo from '../../assets/logo.svg';
import styles from './style/index.module.less';

/** *
 * 登录页 -- 页面设计
 * 设置主题属性
 */
export default () => {
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'light');
  }, []);
  return (
    <div className={styles.container}>
      {/* 登录页面-左上角 */}
      <div className={styles.logo}>
        <Logo />
        <div className={styles['logo-text']}>博客后台管理系统</div>
      </div>
      {/* 登录页面-左侧轮播图 */}
      <div className={styles.banner}>
        <div className={styles['banner-inner']}>
          <LoginBanner />
        </div>
      </div>
      {/* 登录页面-表单部分 */}
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          <LoginForm />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};
