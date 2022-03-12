import MENU_LIST from "@/constant/menu";

function getMenuList() {
	return new Promise((resolve) => {
		resolve(MENU_LIST);
	});
}

export default getMenuList;
