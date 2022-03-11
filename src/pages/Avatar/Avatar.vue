<template>
	<div class="avatar-container">
		<div class="system-container">
			<img src="@/assets/avatar/systemIcon.jpg" alt="" />
			<span>考蛙管理系统</span>
		</div>
		<div class="user-container">
			<img src="@/assets/avatar/avatar.jpg" alt="" />
			<div class="user">
				<span>管理员</span>
				<span class="change">[切换账号]</span>
			</div>
		</div>
	</div>
</template>
<script setup></script>
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
				color: skyblue;
				cursor: pointer;
				&:hover {
					color: rgb(55, 167, 211);
				}
			}
		}
	}
</style>
