import React from 'react'
import {Row, Col, Card} from 'antd'
import { syntax } from '../../../assets/md/knowledge'




/**--- 常用语法 ---**/
export default () => (
    <Row className="gutter-row fmt">
        <h3 style={{fontWeight: 'bold'}}>{"此处渲染Markdown格式，使用dangerouslySetInnerHTML渲染 "}</h3>
        <Col md={22} className="gutter-col">
            <Card title="html转义">
                <div dangerouslySetInnerHTML={{__html: syntax.html1}}></div>
            </Card>
        </Col>

        <Col md={22} className="gutter-col">
            <Card title="扩张运算符传递属性">
                <div dangerouslySetInnerHTML={{__html: syntax.html2}}></div>
            </Card>
        </Col>
    </Row>
)
