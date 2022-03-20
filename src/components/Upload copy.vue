<template>
	<el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="1">
		<template #default>
			<el-icon><Plus /></el-icon>
		</template>
		<template #file="{ file }">
			<div>
				<img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
				<span class="el-upload-list__item-actions">
					<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
						<el-icon><zoom-in /></el-icon>
					</span>
					<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
						<el-icon><Download /></el-icon>
					</span>
					<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
						<el-icon><Delete /></el-icon>
					</span>
				</span>
			</div>
		</template>
	</el-upload>
	<el-dialog v-model="dialogVisible">
		<img width="100%" :src="dialogImageUrl" alt="" />
	</el-dialog>
</template>

<script setup>
	import { ref } from "vue";
	import { Plus, ZoomIn, Download, Delete } from "@element-plus/icons-vue";

	import { UploadFile } from "element-plus";

	const dialogImageUrl = ref("");
	const dialogVisible = ref(false);
	const disabled = ref(false);

	const handleRemove = (file) => {
		console.log(file);
	};
	const handlePictureCardPreview = (file) => {
		dialogImageUrl.value = file.url;
		dialogVisible.value = true;
	};
	const handleDownload = (file) => {
		console.log(file);
	};
</script>
