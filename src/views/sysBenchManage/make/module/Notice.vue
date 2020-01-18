<template>
  <!--通知公告-->
  <div class="Notice">
      <div class="Noticetit"><i class="el-icon-film"></i>通知公告<a href="#">更多</a></div>
      <div class="Noticecon">
          <ul>
              <li v-for="item in listDatas">
                  <span class="Noticeconlr"><a href="#">{{item.title}}</a></span>
                  <span class="Noticeconmid">{{item.createUser}}</span>
                  <span class="Noticeconrl">{{item.createTime}}</span>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
import {
  fetchNoticelist,  //通知公告列表
} from "@/api/home/api_notification.js";
export default {
  name: 'Notice',
  components: {
    
  },
  data() {
    return {
        listDatas: [],
      }
  },
  mounted() {
    this.Todolist();
  },
  methods: {
    Todolist() {
      fetchNoticelist({
        pageNo: 0,
        pageSize: 100,
        sort: "",
        orderBy: ""
      }).then(response => {
        this.listDatas = response.data.records;
      }).catch(error => {
        this.$message({
          message: '加载列表错误' + error,
          type: 'error'
        })
        console.error(error);
      })
    },
  }
}
</script>
<style lang="scss" scoped>
    .Notice{
      width: 100%;
      height: 100%;
    }
    .Noticetit{
      width: auto;
      height: 48px;
      line-height: 48px;
      padding: 0px 15px;
      border-bottom: 1px solid #dcdfe6;
    }
    .Noticetit i{
      padding: 5px 8px;
      float: left;
      margin-top: 6px;
      color: #3291fb;
      font-size: 24px;
    }
    .Noticetit a{
      float: right;
      margin-right: 10px;
      color: #555;
    }
    .Noticetit a:hover{
      text-decoration: underline;
    }
    .Noticecon{
      width: auto;
      height: calc(100% - 48px);
      overflow-y:auto;
    }
    .Noticecon ul{
      padding: 0px;
      margin: 0px;
      padding: 10px 25px;
      list-style-type: none;
    }
    .Noticecon ul li{
      height: 36px;
      line-height: 36px;
    }
    .Noticecon ul li span{
      display: block;
      float: left;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .Noticecon ul li .Noticeconlr{
      width: 59%;
      color: #666;
    }
    .Noticecon ul li .Noticeconlr a{
      color: #666;
    }
    .Noticecon ul li .Noticeconlr a:hover{
      text-decoration: underline;
    }
    .Noticecon ul li .Noticeconmid{
      width: 20%;
      color: #333;
    }
    .Noticecon ul li .Noticeconrl{
      width: 21%;
      text-align: right;
      color: #c1c4c9;
    }
</style>