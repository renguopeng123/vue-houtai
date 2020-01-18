<template>
  <!--待办（个人办公）-->
  <div class="Todo">
      <div class="Todotit"><i class="el-icon-film"></i>待办事宜<a href="#">更多</a></div>
      <div class="Todocon">
          <ul>
              <li v-for="item in listDatas">
                  <span class="Todoconlr"><a href="#">{{item.subject}}</a></span>
                  <span class="Todoconmid">{{item.creator}}</span>
                  <span class="Todoconrl">{{item.createTime}}</span>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
import {
  fetchNovellooker,  //获取待办列表
} from "@/api/home/api_todo.js";
export default {
  name: 'Todo',
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
      fetchNovellooker({
        offset: 0,
        limit: 100,
        sort: "",
        order: ""
      }).then(response => {
        this.listDatas = response.rows;
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
    .Todo{
      width: 100%;
      height: 100%;
    }
    .Todotit{
      width: auto;
      height: 48px;
      line-height: 48px;
      padding:0px 15px;
      border-bottom: 1px solid #dcdfe6;
    }
    .Todotit i{
      padding: 5px 8px;
      float: left;
      margin-top: 6px;
      color: #3291fb;
      font-size: 24px;
    }
    .Todotit a{
      float: right;
      margin-right: 10px;
      color: #555;
    }
    .Todotit a:hover{
      text-decoration: underline;
    }
    .Todocon{
      width: auto;
      height: calc(100% - 48px);
      overflow-y:auto;
    }
    .Todocon ul{
      padding: 0px;
      margin: 0px;
      padding: 10px 25px;
      list-style-type: none;

    }
    .Todocon ul li{
      height: 36px;
      line-height: 36px;
    }
    .Todocon ul li span{
      display: block;
      float: left;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .Todocon ul li .Todoconlr{
      width: 59%;
    }
    .Todocon ul li .Todoconlr a{
      color: #666;
    }
    .Todocon ul li .Todoconlr a:hover{
      text-decoration: underline;
    }
    .Todocon ul li .Todoconmid{
      width: 20%;
      color: #333;
    }
    .Todocon ul li .Todoconrl{
      width: 21%;
      text-align: right;
      color: #c1c4c9;
    }
</style>
