<template>
  <div class="views-container">
      <div>
        <span class="views-searchs">
          流程标题     
          <template>
            <el-input
              placeholder="请输入"
              style="width:300px"
              v-model="table.query0"
              @keyup.enter.native="onwodes()"
            ></el-input>
          </template> 
        </span>   
        <span class="views-searchs">
          任务名字     
          <template>
            <el-input
              placeholder="请输入"
              style="width:300px"
              v-model="table.query"
              @keyup.enter.native="onwodes()"
            ></el-input>
            <el-button  type="primary" @click="onwodes()">查询</el-button>
          </template> 
        </span>   
      </div>
    <tableComment v-bind:table_getdata.sync="table" @handleSizeChange="handleSizeChange"  @handleCurrentChange="handleCurrentChange">
     
    </tableComment>

    <!-- <span class="fa-user btn btn-outline btn-primary btn-sm" top="true" qtip="指派候选人" onclick="assignUser('411366636027379713')" data-hasqtip="1" aria-describedby="qtip-1"></span> -->
  </div>
</template>

<script>
import tableComment from "@/components/gy_table/table_comment"; // 新增数据源弹列表
import { savePanel } from "@/api/wordlist/Wordlist";
import qs from 'qs';
export default {
  name: "task",
  components: { tableComment },

  data() {
    return {
      // 表格
      table: {
        // 表格数据
        data: [],
        // 列表复选框选中
        multipleSelection: [],
        // 列的属性操作
        header: [
          {
            key: "subject",
            label: "流程标题",
            width: "",
            minWidth: "350",
            disabled: true,
            sortable: true //列是否排序
          },
          {
            key: "name",
            label: "任务名称",
            width: "",
            minWidth: "150",
            disabled: false,
            sortable: true //列是否排序
          },
          {
            key: "assigneeNames",
            label: "候选人",
            width: "",
            minWidth: "150",
            disabled: false,
            sortable: true //列是否排序
          },
            {
              key: "status",
              label: "状态",
              width: "",
              minWidth: "150",
              disabled: true
            },
          {
            key: "createTime",
            label: "创建时间",
            width: "",
            minWidth: "350",
            disabled: true
          },
        ],
        // 默认显示的列
        table_if: ["name", "code", "description", "createTime", "doed"],
        // 表格下面页码控制
        page: {
          currentPage: 1,
          pageSizes: [10, 20, 30, 40],
          pageSize: 100,
          total: 0,
        },
        offset: 0,
        limit: 10,
        query: '',
        query0: '',
        search_value: ""
      }
    };
  },
  // 拉数据
  created() {
    this.onwodes();
  },
  methods: {
    //获取岗位列表
    onwodes() {
      let param = {
        'order': "asc", //排序，可以为空
        'limit': this.table.limit,
        'offset': this.table.offset,
        "name_^VLK": this.table.query.replace(/\ +/g, ""),
        "subject_^VLK": this.table.query0,
      };
      savePanel(qs.stringify(param))
        .then(response => {
          this.table.data= response.rows
          this.table.page.total = response.total;
          // }
          console.log(param)
          // console.log(response.rows)
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    handleSizeChange(data){
          // console.log('现在是每页'+data+'条');
        //改变每页条数时，重新展现列表，重置页码为1
        this.table.limit=data;
        // this.table.page.currentPage=1;
        this.onwodes();
      },
      handleCurrentChange(data){
          this.table.offset=data*10-10;
        console.log('现在是第'+data+'页');
        this.onwodes();
      },
      // // 查询
     fn_search_click(){
        //筛选时，重置页码为1
        // this.table.page.currentPage=1;
        this.onwodes();
      },

    //   mounted: function () {
    //     this.fetchDecusdialogboxtemp();
    // }
    
  },
 
};
</script>

<style lang="scss" scoped>
.views-container {
  margin-top: 10px;
  margin: 10px 50px;
  padding: 10px;
  overflow: hidden;
  height: 100%;
  .views-searchs {
    padding: 6px 0;
    margin-right: 40px;
  }
  .views-cur {
    margin: 30px;
  }
}
</style>