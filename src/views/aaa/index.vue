<template>
  <div class="views-container">
    <tableComment v-bind:table_getdata.sync="table" @handleSizeChange="handleSizeChange"  @handleCurrentChange="handleCurrentChange">
      <!-- 头部左侧添加内容示例 -->
      <template  v-slot:top_left>
        <el-input
          placeholder="请输入需要检索的人员名称"
          suffix-icon="el-icon-search"
          size="small"
          style="width:300px"
          v-model="search_value"
        ></el-input>
        <el-button size="small" type="primary" @click="fn_search_click">查询</el-button>
      </template>

      <!-- 头部列表控制按钮右侧添加内容是咧 -->
      <template  v-slot:top_button_left>
        <el-button size="small" type="success">添加</el-button>
        <el-button size="small" type="primary">导入</el-button>
        <el-button size="small" type="primary">导出</el-button>
      </template>

      <!-- 列表操作示例-操作性别sex列 -->
      <template  v-slot:sex="slotProps">
        {{slotProps.row.sex==='男'?'这个是男生':'这个是女生'}}
      </template>

      <!-- 列表操作示例-操作列添加删除按钮 -->
      <template  v-slot:doed="slotProps">
        <el-button type="text" style="color:#f56c6c" @click="fn_deleted(slotProps.row)">删除</el-button>
      </template>
    </tableComment>
  </div>
</template>

<script>
import tableComment from "@/components/gy_table/table_comment"; // 新增数据源弹列表
export default {
  components: {
    tableComment
  },
  name: "aaa",
  data() {
    return {
      table: {
        // 表格数据
        data: [
          {
            name: "b张三",
            sex: "男",
            age: "15",
            phone: "11111111111",
            date: "2016-05-02",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            name: "a李梅梅",
            sex: "女",
            age: "27",
            phone: "11111111111",
            date: "2016-05-04",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            name: "c张三",
            sex: "男",
            age: "14",
            phone: "11111111111",
            date: "2016-05-01",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            name: "d张三",
            sex: "男",
            age: "16",
            phone: "11111111111",
            date: "2016-05-03",
            address: "上海市普陀区金沙江路 1516 弄"
          }
        ],
        // 列表复选框选中
        multipleSelection: [],
        // 列的属性操作
        header: [
          {
            key: "name", //列的属性
            label: "姓名", //列的表头名字
            width: "", //列的宽度
            minWidth: "100", //列的最小宽度
            disabled: true, //列是否能控制显示隐藏
            sortable:true,//列是否排序
          },
          {
            key: "sex",
            label: "性别",
            width: "",
            minWidth: "100",
            disabled: false
          },
          {
            key: "age",
            label: "年龄",
            width: "",
            minWidth: "100",
            disabled: false,
            sortable:true,//列是否排序
          },
          {
            key: "phone",
            label: "电话",
            width: "",
            minWidth: "100",
            disabled: false
          },
          {
            key: "date",
            label: "入职日期",
            width: "",
            minWidth: "200",
            disabled: false
          },
          {
            key: "address",
            label: "居住地址",
            width: "",
            minWidth: "200",
            disabled: true
          },
          {
            key: "doed",
            label: "操作",
            width: "",
            minWidth: "200",
            disabled: true
          }
        ],
        // 默认显示的列
        table_if: ["name", "sex", "age", "phone", "date", "address","doed"],
        // 表格下面页码控制
        page: {
          currentPage: 1,
          pageSizes: [100, 200, 300, 400],
          pageSize: 100,
          total: 400
        }
      },

      search_value:''
    };
  },
  computed: {},
  mounted() {},
  methods: {
    fn_deleted(row){
      alert('删除'+row.name);
    },
    fn_search_click(){
      alert(this.search_value)
    },
    handleSizeChange(data){
      this.table.page.pageSize=data;
      alert('现在是每页'+data+'条');
    },
    handleCurrentChange(data){
      this.table.page.currentPage=data;
      alert('现在是第'+data+'页');
    },
  }
};
</script>

<style lang="scss" scoped>
.views-container {
  padding: 10px;
  overflow: hidden;
  height: 100%;
}
</style>