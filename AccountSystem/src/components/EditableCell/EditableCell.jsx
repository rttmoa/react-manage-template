import React, {Component, PropTypes} from 'react';
import {Input, Icon} from 'antd';
import {editCell, editLine, inputWrapper, textWrapper, checkIcon, editIcon, hiddenIcon} from './index.css';




// table单元格：备注
// table单元格：单价
// table单元格：数量
class EditableCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            editable: false
        };
        this.check = this.check.bind(this);
        this.edit = this.edit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
    	this.setState({
			value: nextProps.value
		});
	}

    // 文本域Change事件
    handleChange(e) {
        let value = e.target.value;
        this.setState({value});
    }

    check() {
        this.setState({
            editable: false
        });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    // 让显示为可编辑格式
    edit() {
        if (this.props.disabled) {
            return false;
        }
        this.setState({
            editable: true
        });
    }

    render() {
        let {value, editable} = this.state;
        let {editType, disabled, fieldType} = this.props;
        return (
            <div className={editType == 'editCell' ? editCell : editLine}>
                {/* FIXME: 是否可编辑 */}
                {editable ? (
                    <div className={inputWrapper}>
                        <Input
                            type={fieldType}   // 类型为传递过来的：text / number
                            value={value}
                            onChange={this.handleChange}
                            onPressEnter={this.check}
                            onBlur={this.check}
                            disabled={disabled || false}
                        />
                        <Icon type="check" className={checkIcon} onClick={this.check}/>
                    </div>
                ) : (
                    <div className={textWrapper} onDoubleClick={this.edit}>
                        {value}
                        <Icon type="edit" className={!disabled ? editIcon:hiddenIcon} onClick={this.edit}/>
                    </div>
                )}
            </div>
        );
    }
}

EditableCell.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
};

export default EditableCell;
