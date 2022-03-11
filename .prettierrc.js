//此处的规则供参考，其中多半其实都是默认值，可以根据个人习惯改写
module.exports = {
	printWidth: 120, //单行长度
	tabWidth: 4, //缩进长度
	useTabs: true, //是否使用tab缩进代替空格
	semi: true, //句末使用分号
	singleQuote: false, //使用单引号
	quoteProps: "as-needed", //仅在必需时为对象的key添加引号
	jsxSingleQuote: true, // jsx中使用单引号
	trailingComma: "es5", //多行时尽可能打印尾随逗号
	bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
	jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
	arrowParens: "always", //单参数箭头函数参数周围使用圆括号-eg: (x) => x
	insertPragma: false, //在已被preitter格式化的文件顶部加上标注
	proseWrap: "never", // 某些文本的折行（perserve按照原文，never不折，always按照printWidth折行）
	htmlWhitespaceSensitivity: "ignore", //对HTML全局空白不敏感
	vueIndentScriptAndStyle: true, //是否对vue中的script及style标签缩进
	endOfLine: "lf", //结束行形式
	embeddedLanguageFormatting: "auto", //对引用代码进行格式化
};
