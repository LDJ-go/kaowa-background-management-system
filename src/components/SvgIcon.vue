<template>
	<svg class="svg-icon" aria-hidden="true">
		<!-- 对应方法1 -->
		<use :xlink:href="`#${iconName}`"></use>
		<!-- 对应方法2
		<use :xlink:href="iconName"></use> -->
	</svg>
</template>

<script setup>
	import { computed, defineProps } from "vue";

	const props = defineProps({
		icon: {
			type: String,
			required: true,
		},
	});
	// 对应方法1
	const iconName = computed(() => {
		return props.icon;
	});

	// 对应方法2
	// const iconName = computed(() => {
	// 	return `#icon-${props.icon}`;
	// });
</script>

<style lang="scss" scpoed>
	.svg-icon {
		/*将icon大小设置和字体大小一致 */
		width: 1em;
		height: 1em;
		/* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
		vertical-align: -0.15em;
		/* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
		fill: currentColor;
		overflow: hidden;
	}
</style>
