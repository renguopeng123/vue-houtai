<template>
<div>
	<Row>
		<Form :label-width="80" ref="searchForm" :model="searchParam">
			<Row>
				<Col span="6" v-for="field in dialog.conditionFields" v-if="field.valueSource=='param'">
		        	<FormItem :label="field.showName" :prop="field.searchName">
		        		<Input type="text" v-model="searchParam[field.searchName]" :placeholder="'请输入'+field.showName"></Input>
		        	</FormItem>
	        	</Col>
	        	<Col style="float: right;" span="6" v-for="(field,index) in dialog.conditionFields" v-if="field.valueSource=='param'&&index==0">
            		<Button icon="ios-search" type="primary" @click="postPageData">搜索</Button>
            		<Button icon="md-refresh"  style="margin-left: 10px" @click="reset">重置</Button>
	        	</Col>
        	</Row>
       	</Form>
	</Row>
	
	<Row>
		<Col :span="dialog.multiple?18:24">
			<Table border :height="height" ref="selection" :loading="loading" :columns="columns" :data="pageData.rows" 
				@on-row-click="rowClick" @on-sort-change="sortChange" @on-select="select" @on-select-cancel="selectCancel" 
				@on-select-all="selectAll" @on-select-all-cancel="selectAllCancel">
			</Table>
		</Col>
		<Col span="6" v-if="dialog.multiple">
			<!-- 已选列表 -->
			<Table border :height="height" style="margin-left:5px;" :columns="scolumns" :data="sdata">
				<template slot-scope="{row,index}" slot="action">
	            	<Button shape="circle" icon="ios-trash" @click="sdata.splice(index,1)"></Button>
		        </template>
			</Table>
		</Col>
	</Row>
	<Row>
		<Col span="24">
			<div style="margin-left: 1%; margin-top: 10px;">
				<Page :total="pageData.total" :current="page" :page-size="pageSize" show-sizer show-elevator show-total @on-change="pageChange" @on-page-size-change="pageSizeChange" />
			</div>
		</Col>
	</Row>
</div>
</template>

<script>
/**
 * 
 */
import Vue from 'vue';
export default {
	props: ["dialog","initData","param"],
  	data :function () {
	    return {
	    	loading : true,
	    	page : 1,
	    	pageSize : 10,
	    	sort : "",
	    	order : "",
	    	columns : [{
    		 	type: 'selection',
    		 	width: 60,
    		 	align: 'center'
	    	}],
	    	pageData : {
	    		rows : [],
	    		total : 10
	    	},
	    	height : "",
	    	scolumns : [],
	    	sdata : [],
	    	searchParam : {},
	    }
	},
 	mounted : function(){
 		this.sdata = this.initData;
 		this.height = this.dialog.height - (this.dialog.conditionFields.length/3 + 2) * 55 - 95;
 		
 		this.dialog.displayFields.forEach(field => {
 			let column = {
 				title : field.showName,
 				key : field.columnName,
 				sortable : "custom"
 			};
 			if(field.formatter){
 				column.render = function(h, params){
 					let row = params.row;
 					let value = row[field.columnName];
 					let index = params.index;
 					eval("field.func = function(value, row, index){"+ field.formatter +"}");
 					let html = field.func(value, row, index);
 					let rlt = h("div", {
 						domProps : {
 							innerHTML : html
 						}
 					});
				  	return rlt;
 				}
 			}
 			this.columns.push(column);
 		});
 		
 		this.dialog.conditionFields.forEach(field => {
 			var searchName = field.columnName + "$";
 			if (field.dbType === "varchar") {
 				searchName += "V";
 			}
 			if (field.dbType === "number") {
 				searchName += "N";
 			}
 			if (field.dbType === "date") {
 				searchName += "D";
 			}
 			searchName += field.condition;
 			field.searchName = searchName;
 		});
 		
 		this.scolumns.push({
 			title:this.dialog.displayFields[0].showName,
 			key : this.dialog.displayFields[0].columnName
 		});
 		
 		this.scolumns.push({
 			title:"操作",
 			slot: 'action',
 		});
 		
 		this.postPageData();
 	},
	methods: {
		rowClick : function(item,index){
			if(!this.dialog.multiple){//单选
				for(let i in this.$refs.selection.objData){
					this.$refs.selection.objData[i]._isChecked = false;
				}
				this.$refs.selection.objData[index]._isChecked = true;
				this.sdata = [item];
				return;
			}
			
			//多选
			this.$refs.selection.objData[index]._isChecked = !this.$refs.selection.objData[index]._isChecked;
			this.handleSdata(item,this.$refs.selection.objData[index]._isChecked);
		},
		sortChange : function(data){
			this.order = data.order;
		  	this.sort = data.column.key;
		  	this.postPageData();
		},
		// 选择分页
		pageChange : function(page) {
			this.page = page;
			this.postPageData();
		},
		// 选择页面大小
		pageSizeChange : function(pageSize) {
			this.page = 1;
			this.pageSize = pageSize;
			this.postPageData();
		},
		//获取页面数据
	  	postPageData : function(){
	  		let param = {
  				"offset" : (this.page - 1) * this.pageSize,
  				"limit" : this.pageSize,
  				"sort" : this.sort,
  				"order" : this.order
  			};
	  		if(this.searchParam){
	  			this.abTools.extend(this.param,param);//赋值页面来的参数
		  		this.abTools.extend(this.searchParam,param);
		  	}
  			let url = "/form/formCustDialog/listData_" + this.dialog.key;
  			this.loading = true;
  			let post = Vue.abHttpUtil.postForm(url, param);
	  		post.then(result => {
	  			this.loading = false;
	  			this.pageData = result;
	  		}, function (status) {
		  		if (status == !0) {
			  		Vue.prototype.$Message.error('加载失败！' + status);
  			  	}
  			});
	  	},
	  	select : function(list,row){
	  		if(!this.dialog.multiple){//单选
				for(let i in this.$refs.selection.objData){
					if(!this.dialogEqual(row,this.$refs.selection.objData[i])){
						this.$refs.selection.objData[i]._isChecked = false;
					}
				}
				this.sdata = [row];
				return;
			}	  		
	  		//多选
	  		this.handleSdata(row,true);
	  	},
	  	selectCancel : function(list,row){
	  		if(!this.dialog.multiple){//单选
				this.sdata = [];
				return;
			}  		
	  		//多选
	  		this.handleSdata(row,false);
	  	},
	  	handleSdata : function(item,add){
	  		let sindex = -1;
			this.sdata.forEach((ite,idx) => {
				if(this.dialogEqual(ite,item)){
					sindex = idx;
				}
			});
			
			if(add && sindex == -1){//新增
				this.sdata.push(item);
			}
			if (!add && sindex != -1){//删除
				this.sdata.splice(sindex,1);
			}
	  	},
	  	selectAll : function(list){
	  		this.pageData.rows.forEach(item =>{
	  			this.handleSdata(item,true);
	  		});
	  	},
	  	selectAllCancel : function(list){
	  		this.pageData.rows.forEach(item =>{
	  			this.handleSdata(item,false);
	  		});
	  	},
	  	reset : function(){
	  		this.searchParam = {};
	  		this.postPageData();
	  	},
	  	getData : function(){
  			return this.sdata;
	  	},
	  	// 仅以a中存在的字段跟b作相等比较（可以理解为a字段少，b字段多）
	  	dialogEqual : function(a,b){
			for(let key in a){
				if(a[key] != b[key]){
					return false;
				}
			}
			return true;
	  	}
  	},
 	watch : {
 	}
}
</script>
