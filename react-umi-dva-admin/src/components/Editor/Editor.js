/* eslint-disable valid-jsdoc */
import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styles from './Editor.less'

/** #### TODO: 文本域编辑器组件  */
const DraftEditor = (props) => {
  return (
    <Editor
      toolbarClassName={styles.toolbar}
      wrapperClassName={styles.wrapper}
      editorClassName={styles.editor}
      {...props}
    />
  )
}

export default DraftEditor
