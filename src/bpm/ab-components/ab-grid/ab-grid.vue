<template>
<div>
	<Table border :height="heightTemp" ref="selection" :loading="loading" :columns="columns" :data="pageData.rows" @on-row-click="rowClick" @on-sort-change="sortChange">
	</Table>
	<div style="margin-left: 1%;margin-top: 10px;">
		<Page :total="pageData.total" :current="page" :page-size="pageSize" show-sizer show-elevator show-total @on-change="pageChange" @on-page-size-change="pageSizeChange"/>
	</div>
	
</div>
</template>


<script>
/**
 * ab通用列表页，使用参考userList.vue
 */
import Vue from 'vue'
export default {
  name: 'abGrid',
  components: {
  },
  props: ["url","height",'searchParam'],
  data () {
      return {
    	  loading: true,
    	  heightTemp:"",
    	  page:1,
    	  pageSize:10,
    	  sort:"",
    	  order:"",
          columns: [],
          pageData:{
        	  rows:[],
        	  total:10
          },
          dialog : {}
      }
  },
  created: function () {
	  this.heightTemp = this.height || window.innerHeight * 0.65 // TODO 计算排除掉 搜索框的高度
	  //解析solt中的column
	  this.$slots.default.forEach(item => {
		  if(item.tag!="column"){
			  return;
		  }
		  if(item.data.key){
			  item.data.attrs["key"] = item.data.key;
		  }
		  if(item.data.attrs["sort"]){
			  item.data.attrs["sortable"] = "custom";
		  }
		  if(item.data.attrs["temp"]){
			  this.handleColumnTemp(item);
		  }
		  if(item.data.attrs["val-text"]||item.data.attrs["val-style"]){
			  this.handleColumnValTextStyle(item);
		  }
		  if(item.data.attrs["date-format"]!=null){
			  this.handleColumnDateFormat(item);
		  }
		  
		  this.columns.push(item.data.attrs);
	  });
	  this.postPageData();
  },
  methods: {
	  //单击行修改选中状态
	  rowClick : function(item,index){
		  this.$refs.selection.objData[index]._isChecked = !this.$refs.selection.objData[index]._isChecked;
	  },
	  //选择分页
	  pageChange : function(page){
		  this.page = page;
		  this.postPageData();
	  },
	  //选择页面大小
	  pageSizeChange : function(pageSize){
		  this.page = 1;
		  this.pageSize = pageSize;
		  this.postPageData();
	  },
	  //排序
	  sortChange : function(data){
		  this.order = data.order;
		  this.sort = data.column.sort||data.key;
		  this.postPageData();
	  },
	  //获取页面数据
	  postPageData : function(){
		  let param = {
			  "offset":(this.page-1)*this.pageSize,
			  "limit":this.pageSize,
			  "sort":this.sort,
			  "order":this.order
		  };
		  if(this.searchParam){
			  this.abTools.extend(this.searchParam,param);
		  }
		  this.loading = true;
		  let post = Vue.abHttpUtil.postForm(this.url, param);
		  post.then(result => {
			  this.loading = false;
			  this.pageData = result;
		  }, function (status) {
			  if (status == !0) {
				  Vue.prototype.$Message.error('加载失败！' + status);
			  }
		  });
	  },
	  //点击发送行为
	  sendAction : function(title,url,params){
		  this.$Modal.confirm({
              title: '注意',
              content: "确认"+title+"吗？",
              onOk: () => {
            	let post = Vue.abHttpUtil.postForm(url.format(params), {});
            	Vue.abTools.getResultMsg(post,()=>{
            		this.postPageData();
            	});
              }
          });
	  },
	  //处理字段temp属性
	  handleColumnTemp(item){
		  item.data.attrs["render"] = (h, params) => {
			  let temp = this.$scopedSlots[item.data.attrs["temp"]](params);
			  temp.forEach(ite => {
		          if (!ite || !ite.data || !ite.data.attrs) return
				  
				  if(ite.data.attrs["send-action"]){
					  ite.data.on = {
						  click : () => {
							  this.sendAction(ite.data.attrs["send-action"],ite.data.attrs.url,params);
						  }
					  }
				  }
				  if(ite.data.attrs["open-dialog"]){
					  var openDialog = ite.data.attrs["open-dialog"];//要打开内容的指令名字
					  var dialogTitle = ite.data.attrs["dialog-title"] || "对话框";
					  if(!this.dialog[params.index]){
						  this.$set(this.dialog,params.index,{});
					  }
					  if(!this.dialog[params.index][openDialog]){
						  this.$set(this.dialog[params.index],openDialog,false);
					  }
					  var modal = h("Modal",{
						  props:{
							  title:dialogTitle,
							  footerHide:true,
							  value : this.dialog[params.index][openDialog]
						  },
						  on: {
							  input: (event) => {
								  this.dialog[params.index][openDialog] = false;
							  }
						  }
					  },[
						  h(openDialog,{
							  props:params
						  })
					  ]);
					  temp.push(modal);
					  ite.data.on = {
						  click : () => {
							  this.dialog[params.index][openDialog] = true;
						  }
					  }
				  }
			  });
			  
			  return temp;
		  }
	  },
	  //处理字段ValText和ValStyle属性
	  // showStyle="Badge/Tag"
	  handleColumnValTextStyle(item){
		  let valText = JSON.parse((item.data.attrs["val-text"]||"{}").replaceAll("'",'"')) // todo
		  let valStyle = JSON.parse((item.data.attrs["val-style"]||"{}").replaceAll("'",'"'))
		  item.data.attrs["render"] = (h, params) => {
			  let text = valText[params.row[item.data.attrs["key"]]]||params.row[item.data.attrs["key"]];
			  let style = valStyle[params.row[item.data.attrs["key"]]]||"success";
			  let rlt;
			  if('Badge'===item.data.attrs["show-style"]){
				  rlt = h("Badge",{
					  props:{
						  status : style,
						  text:text
					  }
				  });
			  }else{
				  rlt = h("Tag",{
					  props:{
						  color:style
					  }
				  },text);
			  }
			  return rlt;
		  };
	  },
	  //处理字段DateFormat属性
	  handleColumnDateFormat(item){
		  item.data.attrs["render"] = (h, params) => {
			  let value = params.row[item.data.attrs["key"]]||"";
			  if (!value){
				  return "";
			  }
			  if((""+value).indexOf("-")!=-1){
				  value = value.replaceAll("-",'/');
			  }
			  let format = item.data.attrs["date-format"]||"yyyy-MM-dd HH:mm:ss";
			  let text = new Date(value).format(format);
			  
			  let rlt = h("span",{
				  domProps: {
					  innerHTML: text
				  }
			  });
			  return rlt;
		  };
	  }
  }
}
</script>
