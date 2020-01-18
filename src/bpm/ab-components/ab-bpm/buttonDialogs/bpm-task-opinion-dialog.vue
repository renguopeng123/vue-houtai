<template>
	<div>
		<Modal v-model="show" scrollable title="备注意见" @on-ok="ok()" @on-cancel="cancel()">
			<Spin fix v-if="spinShow">
				<Icon type="ios-loading" size=18></Icon>
				<div>加载中...</div>
			</Spin>
			<Form label-position="top">
				<FormItem label="下步任务配置" v-if="freeData.freeSelectNode||(freeData.type&&freeData.type!='no')">
					<Row>
						<Col span="8">
						<Select v-model="flowParam.destination" placeholder="请选择节点" :clearable="true"
							@on-change="destChange">
							<Option v-for="(val,key) in freeData.nodeNameMap" :value="key" :key="key">{{val}}</Option>
						</Select>
						</Col>
						<Col span="8" style="margin-left: 10px;" v-if="flowParam.destination">
						<Select ref="newUser" v-model="newUser" placeholder="请选择节点候选人" @on-change="newUserChange"
							:clearable="true">
							<Option v-for="item in freeData.nodeIdentitysMap[flowParam.destination]" :value="item.id"
								:key="item.id">{{item.name}}</Option>
						</Select>
						</Col>
						<Col span="6" style="margin-left: 10px;" v-if="flowParam.destination&&freeData.type=='allUser'">
						<ab-cust-dialog dialogKey="userSelector" v-model="newUsers">
							<Button size="small" type="primary" icon="ios-search">自由选择</Button>
						</ab-cust-dialog>
						</Col>
					</Row>
					<Row style="margin-top: 10px;" v-if="flowParam.nodeUsers&&flowParam.destination">
						<Col span="24">
						<Button style="margin-left: 5px;" shape="circle" v-for="(item,index) in users" :key="item.id"
							@click="removeUser(index)">
							<Icon type="ios-contact" />
							{{item.name}}
							<Icon type="ios-close" />
						</Button>
						</Col>
					</Row>

				</FormItem>
				<!-- <FormItem :required="true" label="意见"> -->
				<FormItem class="opinion" label="意见">
					<p>{{flowParam.opinion}}</p>
					<!-- <Input v-model="flowParam.opinion" type="textarea" :rows="2" disabled placeholder="请输入意见" /> -->
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
		props: ['passConf', 'showDialog'],
		data: function () {
			return {
				flowParam: this.passConf,
				show: false,
				freeData: {},
				newUser: "",
				newUsers: [],
				users: [],
				spinShow: false
			}
		},
		methods: {
			ok: function () {
				if (!this.flowParam.opinion) {
					this.$Message.error({
						content: '请输入意见'
					})
					this.cancel();
					return
				}
				//置空自由跳转
				if (!this.freeData.freeSelectNode) {
					this.flowParam.destination = "";
				}
				this.show = false
				this.$emit('callback', this.flowParam)
			},
			setOpinion(opinion) {
				this.flowParam.opinion = opinion;
			},
			cancel: function () {
				this.show = false
				this.$emit('cancel', false)
			},
			newUserChange: function (val) {
				if (!val) {
					return;
				}
				let user;
				this.freeData.nodeIdentitysMap[this.flowParam.destination].forEach(item => {
					if (item.id == val) {
						user = item;
					}
				});
				this.addUser(user);
				this.$refs.newUser.clearSingleSelect();
			},
			addUser: function (user) {
				let exist = false;
				this.users.forEach(item => {
					if (item.id == user.id) {
						exist = true;
					}
				});
				if (!exist) {
					this.users.push(user);
				}
			},
			removeUser: function (index) {
				this.users = this.flowParam.nodeUsers[this.flowParam.destination];
				this.users.splice(index, 1);
				console.info(this.users);
			},
			destChange: function (val) {
				if (!val) {
					return;
				}
				if (!this.flowParam.nodeUsers) {
					this.flowParam.nodeUsers = {};
				}
				this.users = this.flowParam.nodeUsers[this.flowParam.destination];
				if (!this.users) {
					this.users = this.flowParam.nodeUsers[this.flowParam.destination] = [];
				}
			}
		},
		watch: {
			showDialog: function (value) {
				this.show = value
			},
			newUsers: function (newVal, oldVal) {
				if (newVal.length == 0) {
					return;
				}
				this.newUsers.forEach(item => {
					let user = {
						id: item.id,
						name: item.name,
						type: "user" //用户
					};
					this.addUser(user);
				});
				this.newUsers = [];
			}
		},
		created: function () {
			this.show = this.showDialog;
			this.spinShow = true;

			let url = "/bpm/task/handleNodeFreeSelectUser";
			let post = Vue.abHttpUtil.post(url, this.flowParam);
			Vue.abTools.getResultData(post, data => {
				this.spinShow = false;
				this.freeData = data;
				//开启了自由选择候选人同时只有一个节点，则默认选中
				if (data.type && data.type != "no" && JSON.stringify(data.nodeNameMap).indexOf(",") == -1) {
					for (let key in data.nodeNameMap) {
						this.flowParam.destination = key;
						this.destChange(key);
					}
				} else {
					console.log("自动提交");
					this.cancel();
					this.$emit('callback', this.flowParam)
				}
			}, "alert", () => {
				this.spinShow = false;
			});
		}
	}
</script>


<style lang="scss" scoped>
	.ivu-form-item {
		margin-bottom: 15px;
	}

	.opinion {
		margin-bottom: 0px;
	}
</style>