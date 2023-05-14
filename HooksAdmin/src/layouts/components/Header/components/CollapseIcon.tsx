/* eslint-disable no-multiple-empty-lines */
/* eslint-disable prettier/prettier */
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { updateCollapse } from "@/redux/modules/menu/action";








// 是否折叠图标
const CollapseIcon = (props: any) => {
	// console.log(props) // {isCollapse: false, menuList: Array(10), updateCollapse: ƒ}
	const { isCollapse, updateCollapse } = props;
	return (
		<div className="collapsed" onClick={() => { updateCollapse(!isCollapse) }}>
			{isCollapse ? <MenuUnfoldOutlined id="isCollapse" /> : <MenuFoldOutlined id="isCollapse" />}
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(CollapseIcon);
