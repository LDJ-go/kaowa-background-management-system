<template>
	<div class="avatar-container">
		<div class="system-container">
			<img src="@/assets/avatar/systemIcon.jpg" alt="" />
			<span>考蛙管理系统</span>
		</div>
		<div class="user-container">
			<img src="@/assets/avatar/avatar.jpg" alt="" />
			<div class="user">
				<span>管理员&nbsp;</span>
				<el-popconfirm title="确认退出登录？" @confirm="logout" placement="right">
					<template #reference>
						<span class="change">[退出登录]</span>
					</template>
				</el-popconfirm>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { useStore } from "vuex";
	const store = useStore();
	const logout = function () {
		store.dispatch("user/logout");
	};
</script>
<style lang="scss">
	.system-container {
		padding: 10px 0;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		background-color: $menuBg;
		img {
			width: 37px;
			height: 37px;
			margin-right: 10px;
		}
	}
	.user-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
		background-color: $avatarBg;
		padding: 10px 0;
		img {
			width: 77px;
			height: 77px;
			border-radius: 50%;
			margin: 0 0 10px 0;
		}
		.user {
			.change {
				text-decoration: underline;
				color: #3cb371;
				cursor: pointer;
				&:hover {
					color: rgb(55, 167, 211);
				}
			}
		}
	}
</style>
