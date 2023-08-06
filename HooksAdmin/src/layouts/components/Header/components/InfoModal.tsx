import { useState, useImperativeHandle, Ref } from "react";
import { Modal, message } from "antd";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void } | undefined>;
}

const InfoModal = (props: Props) => {
	const [modalVisible, setModalVisible] = useState(false);

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = (params: { name: number }) => {
		console.log("useImperativeHandle + 参数", params);
		setModalVisible(true);
	};

	const handleOk = () => {
		setModalVisible(false);
		message.success("修改用户信息成功 🎉🎉🎉");
	};

	const handleCancel = () => {
		setModalVisible(false);
	};
	return (
		<Modal title="个人信息" visible={modalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<p>
				<a href="https://gitee.com/laramie/Hooks-Admin" target="_blank" rel="noreferrer">
					Gitee 🍒🍉🍊
				</a>
			</p>
			<p>
				<a href="https://github.com/HalseySpicy/Hooks-Admin" target="_blank" rel="noreferrer">
					Github 🍒🍉🍊
				</a>{" "}
			</p>
			<p>
				<a href="https://juejin.cn/user/3263814531551816/posts" target="_blank" rel="noreferrer">
					掘金 🍒🍉🍊
				</a>
			</p>
		</Modal>
	);
};
export default InfoModal;
