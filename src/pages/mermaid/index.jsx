import React from 'react'
import { Space, Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

import MermaidHooks from '@stateful/mermaidHooks'
import MarkmapHooks from '@stateful/markmap'

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

// const gitChart = `gitGraph
//   commit
//   commit
//   branch develop
//   commit
//   commit
//   commit
//   checkout main
//   commit
//   commit
// `

// const gitChart = `---
// title: Example Git diagram
// ---
// gitGraph
//   commit
//   commit
//   branch develop
//   commit
//   commit
//   commit
//   checkout main
//   commit
//   commit
//   merge develop
//   commit
//   commit
// `

// const gitChart = `sequenceDiagram
//   Alice ->> Bob: Hello Bob, how are you?
//   Bob-->>John: How about you John?
//   Bob--x Alice: I am good thanks!
//   Bob-x John: I am good thanks!
//   Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

//   Bob-->Alice: Checking with John...
//   Alice->John: Yes... John, how are you?
// `

const gitChart = `graph LR
  A[Square Rect] -- Link text --> B((Circle))
  A --> C(Round Rect)
  B --> D{Rhombus}
  C --> D
`

const initMarkup = `# 登录注册模块功能页面结构图

- 登录页面
  - 输入用户名
    - 1
  - 输入密码
  - 登录按钮
  - 忘记密码链接
  - 注册链接

- 注册页面
  - 输入用户名
  - 输入密码
  - 确认密码
  - 注册按钮
  - 返回登录链接

- 忘记密码页面
  - 输入注册邮箱
  - 发送重置密码链接按钮
  - 返回登录链接

- 重置密码页面
  - 输入新密码
  - 确认新密码
  - 重置密码按钮
  - 返回登录链接

`

// ? Git图表 和 登陆模块 流程图
const Mermaid = () => (
  <>
    <FixTabPanel>
      <h2>Meraid: https://mermaid.js.org/</h2>

      <h3 style={{ marginBottom: 30 }}>演示1:Git Diagram </h3>
      <TransformWrapper centerOnInit centerZoomedOut>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <React.Fragment>
            <Space>
              <Button onClick={() => zoomIn()}>放大</Button>
              <Button onClick={() => zoomOut()}>缩小</Button>
              <Button onClick={() => resetTransform()}>还原</Button>
            </Space>
            {/* <MermaidHooks chart={gitChart} /> */}
            <TransformComponent>
              <MermaidHooks chart={gitChart} />
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>

      <h3> 演示2: Markmap</h3>
      <section>
        <MarkmapHooks markmap={initMarkup} />
      </section>
    </FixTabPanel>
  </>
)

export default Mermaid
