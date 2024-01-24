import React from "react";
import Utils from "../../utils/utils";
import { Table } from "antd";
import "./index.less";


/** #### TODO: 封装 <Table /> 表格  */
export default class ETable extends React.Component {

  state = {};
 

  onRowClick = (record, index) => { // ! 处理行点击事件
    console.log("处理行点击事件 onRowClick")
    let rowSelection = this.props.rowSelection;
    if (rowSelection === "checkbox") {
      let selectedRowKeys = this.props.selectedRowKeys;
      let selectedIds = this.props.selectedIds;
      let selectedItem = this.props.selectedItem || [];
      if (selectedIds) {
        const i = selectedIds.indexOf(record.id);
        if (i === -1) {
          //避免重复添加
          selectedIds.push(record.id);
          selectedRowKeys.push(index);
          selectedItem.push(record);
        } else {
          selectedIds.splice(i, 1);
          selectedRowKeys.splice(i, 1);
          selectedItem.splice(i, 1);
        }
      } else {
        selectedIds = [record.id];
        selectedRowKeys = [index];
        selectedItem = [record];
      }
      this.props.updateSelectedItem(
        selectedRowKeys,
        selectedItem || {},
        selectedIds
      );
    } else {
      let selectKey = [index];
      const selectedRowKeys = this.props.selectedRowKeys;
      if (selectedRowKeys && selectedRowKeys[0] === index) {
        return;
      }
      this.props.updateSelectedItem(selectKey, record || {});
    }
  };

  
  onSelectChange = (selectedRowKeys, selectedRows) => { // ! 选择框变更
    console.log("选择框变更事件 onSelectChange")
    // console.log("selectedRowKeys", selectedRowKeys) //  (4) [1, 2, 3, 4]
    // console.log('selectedRows', selectedRows) // (4) [{…}, {…}, {…}, {…}] 
    let rowSelection = this.props.rowSelection;
    const selectedIds = [];
    if (rowSelection === "checkbox") { 
      selectedRows.forEach(item => {
        selectedIds.push(item.id);
      })
      this.setState({
        selectedRowKeys,
        selectedIds: selectedIds,
        selectedItem: selectedRows[0],
      });
    }
    this.props.updateSelectedItem(
      selectedRowKeys,
      selectedRows[0],
      selectedIds
    );
  };

  onSelectAll = (selected, selectedRows, changeRows) => { // ! 左上角 复选框选择所有
    console.log("复选框选择所有 onSelectAll")
    let selectedIds = [];
    let selectKey = [];
    selectedRows.forEach((item, i) => {
      selectedIds.push(item.id);
      selectKey.push(i);
    });
    // console.log('selectedIds[]', selectedIds) // id: (10) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    // console.log('selectKey[]', selectKey) // index: (10) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    // console.log('selectedRows', selectedRows) // (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // console.log('selected', selected) // boolean
    // console.log('changeRows', changeRows) // (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    this.props.updateSelectedItem(
      selectKey,
      selectedRows[0] || {},
      selectedIds
    );
  };

  getOptions = () => {

    // 设置表格 列宽 
    if (this.props.columns && this.props.columns.length > 0) {
      const name_list = {
        订单编号: 170,
        车辆编号: 80,
        手机号码: 96,
        用户姓名: 70,
        密码: 70,
        运维区域: 300,
        车型: 42,
        故障编号: 76,
        代理商编码: 97,
        角色ID: 64,
      };
      this.props.columns.forEach((item) => {
        //开始/结束 时间
        if (!item.title) {
          return;
        }
        if (!item.width) {
          if (item.title.indexOf("时间") > -1 && item.title.indexOf("持续时间") < 0) {
            item.width = 132;
          } else if (item.title.indexOf("图片") > -1) {
            item.width = 86;
          } else if (item.title.indexOf("权限") > -1 || item.title.indexOf("负责城市") > -1) {
            item.width = "40%";
            item.className = "text-left";
          } else {
            if (name_list[item.title]) {
              item.width = name_list[item.title];
            }
          }
        }
        item.bordered = false;
      });
    }

    // 设置类型：单选框 or 复选框
    const { selectedRowKeys } = this.props;
    const rowSelection = {
      type: "radio",
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelect: (record, selected, selectedRows) => {
        console.log("...");
      },
      onSelectAll: this.onSelectAll,
    };
    let row_selection = this.props.rowSelection;
    // 当属性未false或者null时，说明没有单选或者复选列
    if (row_selection === false || row_selection === null) {
      row_selection = false;
    } else if (row_selection === "checkbox") {
      //设置类型未复选框
      rowSelection.type = "checkbox";
    } else {
      //默认未单选
      row_selection = "radio";
    }

    // 返回　<Table />
    return (
      <Table
        filterIcon
        // size="small"
        className="card-wrap page-table"
        bordered
        {...this.props}
        rowSelection={row_selection ? rowSelection : null} 
        scroll={{
          x: 2000, 
          // y: 700 
        }}
        onRow={(record, index) => ({
          onClick: () => {
            if (!row_selection) {
              return;
            }
            this.onRowClick(record, index);
          },
        })}
      />
    );
  };

  render = () => {
    return <div>{this.getOptions()}</div>;
  };
}
