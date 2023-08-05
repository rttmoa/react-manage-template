import React from 'react';
import { Layout } from '@arco-design/web-react';
import { FooterProps } from '@arco-design/web-react/es/Layout/interface';
import cs from '../../utils/classnames';
import styles from './style/index.module.less';

const Footer = Layout.Footer;



/** *
 * 底部布局组件：https://arco.design/react/components/Layout
 */
export default (props: FooterProps = {}) => {
  // console.log('props', props)
  const { className, ...restProps } = props;
  return (
    <Footer className={cs(styles.footer, className)} {...restProps}>
      BlogManagementSystem
    </Footer>
  );
};
