import { Component } from 'react'
import { Editor, Page } from '../../components'
import { Row, Col, Card } from 'antd'

// TODO: 获取内容转化为 Html MarkDown格式
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import draftToMarkdown from 'draftjs-to-markdown'





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
              <textarea {...textAreaProps} value={ editorContent ? draftToHtml(convertToRaw(editorContent.getCurrentContent())) : '' }/>
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="Markdown">
              <textarea {...textAreaProps} value={ editorContent ? draftToMarkdown(convertToRaw(editorContent.getCurrentContent())) : '' }/>
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="JSON">
              <textarea {...textAreaProps} value={ editorContent ? JSON.stringify(convertToRaw(editorContent.getCurrentContent())) : '' }/>
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}
