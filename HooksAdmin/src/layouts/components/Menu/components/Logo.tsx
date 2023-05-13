import logo from "@/assets/images/logo.png";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const Logo = (props: any) => {
	const { t } = useTranslation();
	const { isCollapse } = props;
	return (
		<div className="logo-box">
			<img src={logo} alt="logo" className="logo-img" />
			{!isCollapse ? <h2 className="logo-text">{t("logo.name")}</h2> : null}
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps)(Logo);
