// 解决el-button按钮点击后仍然处于focus状态的问题

export default function (event) {
	const target = event.target;
	if (target.nodeName == "BUTTON" || target.nodeName == "SPAN") {
		target.parentNode.blur();
	}
	target.blur();
}
