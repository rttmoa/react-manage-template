import React from 'react';
import { Button, Tooltip, Message } from '@arco-design/web-react';
import { IconCopy } from '@arco-design/web-react/icon';
import clipboard from '../../utils/clipboard';
import styles from './style/code-block.module.less';

interface CodeBlockProps {
  code: string;
}



/** #### TODO: 复制文本内容功能  */
export default function CodeBlock(props: CodeBlockProps) {
  const { code } = props;
  return (
    // <pre /> 可定义预格式化的文本。被包围在 pre 元素中的文本通常会保留空格和换行符。而文本也会呈现为等宽字体
    <pre className={styles['code-block']}>
      <code className={styles['code-block-content']}>{code}</code>
      <Tooltip content="点击复制命令">
        <Button
          type="text"
          className={styles['code-block-copy-btn']}
          icon={<IconCopy />}
          onClick={() => {
            clipboard(code);
            Message.success(`复制 ${code} 成功`);
          }}
        />
      </Tooltip>
    </pre>
  );
}
