<template>
	<div>
		<Upload ref="upload" multiple :action="action" :with-credentials="true" :on-success="success"
			:on-remove="remove" :on-preview="preview" :show-upload-list="true">
			<Button v-if="abPermission=='b'||abPermission=='w'" :style="style" type="primary" shape="circle"
				icon="ios-cloud-upload-outline"></Button>
		</Upload>
	</div>
</template>

<script>
	import Vue from 'vue';

	import config from '@/bpm/ab-config'
	//定义前端ctx 路径
	const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

	export default {
		props: ['value', 'abPermission'],
		data: function () {
			return {
				action: "",
				style: {},
				uploadList: []
			}
		},
		mounted: function () {
			this.action = baseUrl + "sys/sysFile/upload";
			this.uploadList = this.$refs.upload.fileList;

			if (this.value && this.abPermission != 'n') { //初始化数据
				JSON.parse(this.value).forEach(json => {
					this.uploadList.push({
						name: json.name,
						status: "finished",
						response: {
							data: json.id
						}
					});
				});
			}

			this.handleStyle();
		},
		methods: {
			success: function (response, file, fileList) {
				let list = [];
				fileList.forEach(item => {
					let json = {
						name: item.name,
						id: item.response.data
					};
					list.push(JSON.stringify(json));
				});
				this.$emit('input', "[" + list.join(",") + "]");
			},
			remove: function (file, fileList) {
				this.success(null, file, fileList);
			},
			preview: function (file) {
				let url = baseUrl + "sys/sysFile/download?fileId=" + file.response.data;
				window.open(url, "_blank");
			},
			handleStyle: function () {

				let formContext = this.$vnode.context;

				//判断是否是gw标签 如果是gw标签 则上一级才是form
				if (formContext && formContext.$vnode && formContext.$vnode.data.staticClass && formContext.$vnode.data
					.staticClass.indexOf("gw-components") > -1) {
					formContext = formContext.$vnode.context
				}

				if (this.abPermission == "b") {
					if (!this.value || this.value == "[]") {
						formContext.$validity[this.$attrs.desc] = "必填";
						this.style.border = "2px solid red";
					} else {
						delete formContext.$validity[this.$attrs.desc];
						delete this.style.border;
					}
				}
			}
		},
		watch: {
			value: function (oldValue, newValue) {
				this.handleStyle();
			}
		}
	}
</script>