import SvgIcon from "@/components/SvgIcon";

const svgRequired = require.context("./svg", false, /\.svg$/);

// svgRequired.keys().forEach((item) => {
// 	svgRequired(item);
// });
svgRequired.keys().map(svgRequired);

export default (app) => {
	app.component("svg-icon", SvgIcon);
};
