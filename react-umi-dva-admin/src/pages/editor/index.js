import { Component } from 'react'
import { Editor, Page } from '../../components'
import { Row, Col, Card } from 'antd'

import { convertToRaw } from 'draft-js' // todo 获取内容转化为 Html MarkDown格式
import draftToHtml from 'draftjs-to-html'
import draftToMarkdown from 'draftjs-to-markdown'

const colProps = {
  lg: 12,
  md: 24,
  style: {
    marginBottom: 32,
  }
}
const textAreaProps = {
  disabled: true,  
  style: {
    minHeight: 496,
    width: '100%',
    background: '#f7f7f7',
    borderColor: '#F1F1F1',
    padding: '16px 8px'
  }
}
const editorProps = {
  wrapperStyle: { minHeight: 500 },
  editorStyle: { minHeight: 376 }
}


// TODO: 内容开始
  // 封装文本域编辑器 （react-draft-wysiwyg）
  // 编辑器值转换为 HTML （draftjs-to-html）
  // 编辑器值转换为 MarkDown （draftjs-to-markdown）
  // 编辑器值转换为 JSON （JSON.stringify）
export default class EditorPage extends Component {

  state = {
    editorContent: null,
  }

  onEditorStateChange = editorContent => {
    // console.log('编辑器内容：', editorContent) // 这是一段话，My name is 🍄zhangsan
    // let mapValue = editorContent._immutable._map;
    // for (const item of mapValue) {
    //   for (const subItem of item[1]) {
    //     console.log(subItem)
    //   }
    // }
    this.setState({ editorContent })
  }

  render() {
    const { editorContent } = this.state
    const conver_HTML = editorContent ? draftToHtml(convertToRaw(editorContent.getCurrentContent())) : '';
    const conver_MarkDown = editorContent ? draftToMarkdown(convertToRaw(editorContent.getCurrentContent())) : '';
    const conver_JSON = editorContent ? JSON.stringify(convertToRaw(editorContent.getCurrentContent())) : ''
    return (
      <Page inner>
        <Row gutter={32}>
          <Col {...colProps}>
            <Card title="Editor" style={{ overflow: 'visible' }}>
              <Editor {...editorProps} editorState={editorContent} onEditorStateChange={this.onEditorStateChange} />
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="HTML">
              <textarea {...textAreaProps} value={ conver_HTML }/>
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="Markdown">
              <textarea {...textAreaProps} value={ conver_MarkDown }/>
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="JSON">
              <textarea {...textAreaProps} value={ conver_JSON }/>
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}
