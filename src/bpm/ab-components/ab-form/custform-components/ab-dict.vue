<template>
	<Poptip placement="bottom-start" trigger="focus" style="width:100%">
		<Input v-model="data" v-ab-permission="abPermission" :style="style" :placeholder="placeholder" />
		<div slot="content">
			<Tree v-if="checkbox!='true'" :data="treeData" @on-select-change="treeChange"></Tree>
			<Tree v-else :data="treeData" show-checkbox :check-strictly="true" @on-check-change="treeChange"></Tree>
		</div>
	</Poptip>
</template>

<script>
	/**
	 * 数据字典控件，eg
	 * <ab-dict v-model="data.kjcs.sjzd" width="300" placeholder="Enter something..." dict-key="jds" checkbox="true">​</ab-dict>
	 * checkbox:多选模式
	 */
	import Vue from 'vue'

	export default {
		components: {},
		props: ["value", "placeholder", "width", "dictKey", "checkbox", "abPermission"],
		data() {
			return {
				data: "",
				style: {},
				treeData: [],
				treeMap: {}
			}
		},
		mounted: function () {


			let url = "/sys/dataDict/getDictData";
			let post = Vue.abHttpUtil.postForm(url, {
				dictKey: this.dictKey
			});
			Vue.abTools.getResultData(post, data => {
				this.treeData = this.buildTree(data);
				this.valueChange();
			});
		},
		methods: {
			//构建tree
			buildTree: function (data, parentId) {
				if (!parentId) { //找到根节点
					data.forEach(item => {
						var root = true;
						this.treeMap[item.key] = item;
						data.forEach(ite => {
							if (item.parentId == ite.id) {
								root = false;
							}
						});
						if (root) {
							parentId = item.parentId;
						}
					});
				}

				let tree = [];
				let temp;
				for (let i = 0; i < data.length; i++) {
					if (data[i].parentId == parentId) {
						let obj = data[i];
						temp = this.buildTree(data, data[i].id);
						if (temp.length > 0) {
							obj.children = temp;
						}
						obj.title = obj.name;
						obj.expand = true;
						tree.push(obj);
					}
				}
				return tree;
			},
			//树选择变化
			treeChange: function (nodes, node) {
				let keys = [];
				nodes.forEach(item => {
					keys.push(item.key);
				});
				this.$emit("input", keys.join(","));
			},
			valueChange: function () {

				let formContext = this.$vnode.context;

				//判断是否是gw标签 如果是gw标签 则上一级才是form
				if (formContext && formContext.$vnode && formContext.$vnode.data.staticClass && formContext.$vnode.data
					.staticClass.indexOf("gw-components") > -1) {
					formContext = formContext.$vnode.context
				}

				if (this.abPermission == "b") {
					if (!this.value) {
						formContext.$validity[this.$attrs.desc] = "必填";
						this.style.border = "1px solid red";
					} else {
						delete formContext.$validity[this.$attrs.desc];
						delete this.style.border;
					}
				}

				if (!this.value) {
					this.data = "";
					return;
				}

				let names = [];
				this.value.split(",").forEach(item => {
					names.push(this.treeMap[item].name);
					if (this.checkbox == "true") {
						this.treeMap[item].checked = true;
					} else {
						this.treeMap[item].selected = true;
					}
				});
				this.data = names.join(",");
			}
		},
		watch: {
			value: function () {
				this.valueChange();
			}
		}
	}
</script>