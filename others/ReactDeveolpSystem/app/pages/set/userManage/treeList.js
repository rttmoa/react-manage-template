import React, { Component } from 'react'
import { Tree } from 'antd'
const { TreeNode } = Tree




export default class TreeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // expandedKeys: ['123'],
      // defaultExpandedKeys: ['123'],
      defaultExpandedKeys: ['370202230001'],
      deptCode: props.curDeptCode, // 当前onSelect后传递给父节点的 deptCode值
    }
    this.handleOnSelect = this.handleOnSelect.bind(this)
  } 

  /***--- 性能优化 ---**/
  componentWillReceiveProps(nextProps) {
    if (nextProps.curDeptCode !== this.props.curDeptCode) {
      // console.log("deptCode")
      this.setState({ deptCode: nextProps.curDeptCode })
    }
  }


  /***--- 展开事件 ---**/
  onExpand = (expandedKeys) => {
    // console.log("展开事件", expandedKeys) // ['370200000000', '370202000000', '370202230000']
    this.setState({ expandedKeys })
  }

  // 选中事件
  handleOnSelect(info, Nodes) { // 参数1：树节点的值(deptCode)    参数2：事件对象(event)
    // console.log(info, Nodes);
    // console.log("子节点标题", Nodes.selectedNodes[0].props) // {title: '古翠路', children: Array(2)}

    // if (Nodes && Nodes.selectedNodes[0] && Nodes.selectedNodes[0].props && Nodes.selectedNodes[0].props.title) {
    //   const { title } = Nodes.selectedNodes[0].props;
    //   this.props.onSelect(info, title)
    // } else {
    //   this.props.onSelect()
    // }

    // 优化
    const { selectedNodes = [] } = Nodes;
    const [{ props = {} } = []] = selectedNodes;
    const { title } = props;
    if(title){
      this.props.onSelect(info, title);
    }
    else{
      this.props.onSelect() 
    }
  }

  render() {
    /***--- 递归处理Tree ---**/
    const { trees } = this.props;
    const loop = (data = []) => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.deptCode} title={item.deptName}>{loop(item.children)}</TreeNode>
      }
      return <TreeNode key={item.deptCode} title={item.deptName + "NoChil"} />
    })
    const treeNodes = loop(trees);
    // console.log(trees)
    // console.log("deptCode", this.state.deptCode) // 选择的子结构中 deptCode的值：370202230001 && onSelect后this.props给父节点
    // console.log("defaultExpandedKeys", this.state.defaultExpandedKeys)

    return (
      <div>
        <Tree
          onSelect={this.handleOnSelect} // 点击树节点触发(点击而不是展开)
          onExpand={this.onExpand} // 展开/收起节点时触发
          defaultExpandedKeys={this.state.defaultExpandedKeys} // 默认展开指定的树节点
          selectedKeys={[this.state.deptCode]} // 选中复选框的树节点
        >
          {treeNodes}
        </Tree>
      </div>
    )
  }
}
