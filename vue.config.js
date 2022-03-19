const { defineConfig } = require("@vue/cli-service");

const path = require("path");
function resolve(dir) {
	return path.join(__dirname, dir);
}
const webpack = require("webpack");

module.exports = defineConfig({
	transpileDependencies: true,
	chainWebpack(config) {
		// 设置 svg-sprite-loader
		// config 为 webpack 配置对象
		// config.module 表示创建一个具名规则，以后用来修改规则
		config.module
			// 规则
			.rule("svg")
			// 忽略
			.exclude.add(resolve("src/assets/icons"))
			// 结束
			.end();
		// config.module 表示创建一个具名规则，以后用来修改规则
		config.module
			// 规则
			.rule("icons")
			// 正则，解析 .svg 格式文件
			.test(/\.svg$/)
			// 解析的文件
			.include.add(resolve("src/assets/icons"))
			// 结束
			.end()
			// 新增了一个解析的loader
			.use("svg-sprite-loader")
			// 具体的loader
			.loader("svg-sprite-loader")
			// loader 的配置
			/* 对应方法二（方法一不需要配置这些）
			.options({
				symbolId: "icon-[name]",
			}) */
			// 结束
			.end();
		config.plugin("ignore").use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/));
		// config.module
		// 	.rule("icons")
		// 	.test(/\.svg$/)
		// 	.include.add(resolve("src/icons"))
		// 	.end()
		// 	.use("svg-sprite-loader")
		// 	.loader("svg-sprite-loader")
		// 	.options({
		// 		symbolId: "icon-[name]",
		// 	})
		// 	.end();
	},
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
			  @import "@/styles/variables.scss";  // scss文件地址
			  @import "@/styles/mixin.scss";     // scss文件地址
			`,
			},
		},
	},
	devServer: {
		https: false,
		// hotOnly: false,
		proxy: {
			"/api": {
				target: "http://106.52.192.138:8111/",
				ws: true, //代理websocked
				changeOrigin: true,
				pathRewrite: {
					"^/api": "",
				},
			},
		},
		headers: {
			"Access-Contorl-Allow-Origin": "*",
		},
	},
});
