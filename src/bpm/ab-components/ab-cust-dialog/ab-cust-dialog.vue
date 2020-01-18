<template>
	<div>
		<span @click="modal=true">
			<slot><Button type="primary" size="small">打开{{dialog.name}}</Button></slot>
		</span>
		<Modal :scrollable="true" :width="dialog.width" v-model="modal" :styles="{'top':'30px'}" :transfer="true" :mask-closable="false"
			:title="dialog.name" @on-ok="ok" @on-cancel="cancel">
			<ab-cust-dialog-list ref="listDialog" v-if="dialog.style=='list'" :dialog="dialog" :initData="initData"
				:param="param"></ab-cust-dialog-list>
			<ab-cust-dialog-tree ref="treeDialog" v-if="dialog.style=='tree'" :dialog="dialog" :initData="initData"
				:param="param"></ab-cust-dialog-tree>
		</Modal>
	</div>
</template>

<script>
	/**
	 * <ab-cust-dialog dialogKey="ywblb" value-key="key" value-comment="comment" v-model="data" :dialogSetting="dialogSetting" :param="{}">
	 * </ab-cust-dialog>
	 * 参数说明:
	 * dialogKey（必填）:对话框别名
	 * v-model（必填）:对话框内容的赋值对象
	 * value-xxx（选填）:定义对话框返回字段对v-model的属性的映射关系，例如配置了value-key="key2",value-name="name2"，那么data的值会被赋值为{key2:xxxx,name2:xxxx}
	 * dialogSetting （选填）:强行修改对话框的配置内容
	 * param （选填）:查询参数
	 * v-on:ok 点击确定事件
	 */
	import Vue from 'vue';
	import abCustDialogList from './ab-cust-dialog-list.vue';
	import abCustDialogTree from './ab-cust-dialog-tree.vue';
	export default {
		components: {
			abCustDialogList,
			abCustDialogTree
		},
		props: ["dialogKey", "dialogSetting", "value", "param"],
		data: function () {
			return {
				dialog: {},
				modal: false,
				valueMap: {},
				initData: []
			}
		},
		mounted: function () {
			//映射关系
			for (let key in this.$attrs) {
				let val = this.$attrs[key];
				// 找到value开头的赋值配置
				if (key.indexOf("value-") !== 0) {
					continue;
				}
				let name = key.replace("value-", "");
				this.valueMap[name] = val;
			}

			let url = "/form/formCustDialog/getObject";
			let post = Vue.abHttpUtil.postForm(url, {
				key: this.dialogKey
			});
			Vue.abTools.getResultData(post, data => {
				this.dialog = this.abTools.extend(this.dialogSetting || {}, data);
				this.handleInitData();
			});
		},
		methods: {
			ok: function () {
				let data = this.getData();
				this.$emit("ok", data);
				if (!this.value) {
					console.info("未设置 ng-model，请监听 ok事件获取返回值，并自动赋值");
					return;
				}

				if (Array.isArray(this.value)) { //赋值对象是数组
					var list = this.value;

					data.forEach(item => {
						if (JSON.stringify(this.valueMap) === "{}") { //无映射关系则把数据全返回
							list.push(item);
							return;
						}

						var json = {};
						//处理映射关系
						for (var key in this.valueMap) {
							var val = this.valueMap[key];
							//如果val是a.b这样的，则需要对json.a初始化，不然直接操作json.a.b会报错
							var strs = val.split(".");
							var exp = "json";
							for (var i = 0; i < strs.length - 1; i++) {
								exp = exp + "." + strs[i];
								if (eval("!" + exp)) { //为空则初始化
									eval(exp + " = {};");
								}
							}
							eval("json." + val + " = item[key];");
						}
						list.push(json);
					});
				} else { //赋值对象是对象
					for (let key in this.valueMap) {
						let val = this.valueMap[key];
						let list = [];
						data.forEach(function (item) {
							list.push(item[key]);
						});
						this.$set(this.value, val, list.join(','));
					}
				}
			},
			cancel: function () {

			},
			//获取根据返回字段映射好的数据
			getData: function () {
				let list = [];
				let data = [];
				if (this.dialog.style == "list") {
					data = this.$refs.listDialog.getData();
				}
				if (this.dialog.style == "tree") {
					data = this.$refs.treeDialog.getData();
				}

				data.forEach(item => {
					let d = {};
					this.dialog.returnFields.forEach(field => {
						d[field.returnName] = item[field.columnName];
					});
					list.push(d);
				});

				return list;
			},
			handleInitData: function () {
				if (Array.isArray(this.value)) { //数组不需要初始化值
					return;
				}

				let json;
				for (let key in this.valueMap) {
					if (!this.value) {
						continue
					}
					let data = this.value[key];
					if (!data) {
						continue;
					}
					if (!json) {
						json = {};
					}
					eval("json[key] = data");
				}

				if (!json) {
					return;
				}

				//切割json中的,当作多选
				for (let key in json) {
					let val = json[key];
					let list = val.split(",");

					list.forEach((item, index) => {
						if (!this.initData[index]) {
							this.initData[index] = {};
						}
						this.dialog.returnFields.forEach(field => {
							if (field.returnName == key) {
								this.initData[index][field.columnName] = item;
							}
						});
					});
				}
			}
		},
		watch: {}
	}
</script>