<template>
  <div class="views-container">
    <div class="main">
      <tableComment v-bind:table_getdata.sync="table" @handleSizeChange="handleSizeChange"  @handleCurrentChange="handleCurrentChange">
        <!-- 头部左侧添加内容示例 -->
        <template  v-slot:top_left>
          <el-input
            placeholder="请输入需要检索的人员名称"
            suffix-icon="el-icon-search"
            size="small"
            style="width:300px"
            v-model="table.search_value"
          ></el-input>
          <el-button size="small" type="primary" @click="fn_search_click">查询</el-button>
        </template>

        <!-- 头部列表控制按钮右侧添加内容是咧 -->
        <template  v-slot:top_button_left>
          <el-button size="small" type="success" @click="fn_openDialog('新增')">添加</el-button>
          <el-button size="small" type="primary">导入</el-button>
          <el-button size="small" type="primary">导出</el-button>
        </template>

        <!-- 列表操作示例-操作性别sex列 -->
        <template  v-slot:status="slotProps">
          <el-switch
            v-model="slotProps.row.status"
            active-text="禁用"
            inactive-text="启用"
            active-color="#ff4949"
            inactive-color="#13ce66"
            :active-value="0"
            :inactive-value="1"
          ></el-switch>
        </template>

        <!-- 列表操作示例-操作列添加删除按钮 -->
        <template  v-slot:doed="slotProps">
          <el-button type="text" style="color:#409eff" @click="fn_openDialog('编辑',slotProps.row)">编辑</el-button>
          <span>|</span>
          <!-- <el-button type="text" style="color:#67c23a">分配角色</el-button> -->
          <!-- <span>|</span> -->
          <!-- <el-button type="text" style="color:#e6a23c">查看</el-button> -->
          <!-- <span>|</span> -->
          <el-button type="text" style="color:#f56c6c" @click="fn_duties_remove(slotProps.row)">删除</el-button>
        </template>
      </tableComment>
    </div>
    
    <!-- 新增编辑角色 -->
    <el-dialog
      :title="add_duties.title+'岗位'"
      :visible.sync="add_duties.dialogVisible"
      :before-close="resetForm_add"
    >
      
      <div class="diaologMain">
        <el-form
          :model="add_duties.form"
          :rules="add_duties.rules"
          ref="add_duties"
          label-width="100px"
          class="add_duties"
        >
          <el-form-item label="名称：" prop="name">
            <el-input v-model="add_duties.form.name"></el-input>
          </el-form-item>
          <el-form-item label="编码：" prop="code">
            <el-input v-model="add_duties.form.code"></el-input>
          </el-form-item>
          <el-form-item label="创建时间：" prop="createTime" v-if="add_duties.title==='编辑'">
            <el-input v-model="add_duties.form.createTime" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="描述：" prop="description">
            <el-input type="textarea" v-model="add_duties.form.description" :rows="4"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm_add()">确 定</el-button>
        <el-button @click="resetForm_add()">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  duties_listJson, //查询所有岗位，支持分页
  duties_save, //岗位新增/修改
  duties_remove, //岗位删除
} from "@/api/api.js";
import tableComment from "@/components/gy_table/table_comment"; // 新增数据源弹列表
export default {
  name: "duties",
  components: {
    tableComment
  },
  data() {
    return {
      // 表格
      table: {
        // 表格数据
        data: [
          // {
          //   name: "出纳",
          //   code: "cl",
          //   description: "财务出纳",
          //   createTime:'2019-08-27 15:34:34'
          // },
        ],
        // 列表复选框选中
        multipleSelection: [],
        // 列的属性操作
        header: [
          {
            key: "name",
            label: "名称",
            width: "",
            minWidth: "150",
            disabled: true
          },
          {
            key: "code",
            label: "编码",
            width: "",
            minWidth: "150",
            disabled: false,
            sortable:true,//列是否排序
          },
          {
            key: "description",
            label: "描述",
            width: "",
            minWidth: "250",
            disabled: false,
            sortable:true,//列是否排序
          },
          {
            key: "createTime",
            label: "创建时间",
            width: "",
            minWidth: "250",
            disabled: false,
            sortable:true,//列是否排序
          },
          {
            key: "doed",
            label: "操作",
            width: "",
            minWidth: "250",
            disabled: true
          }
        ],
        // 默认显示的列
        table_if: [ "name","code", "description","createTime","doed"],
        // 表格下面页码控制
        page: {
          currentPage: 1,
          pageSizes: [100, 200, 300, 400],
          pageSize: 100,
          total: 0
        },
        search_value:'',
      },
      // 新增编辑用户
      add_duties: {
        dialogVisible: false,
        title: "",
        form: {
          name: "",
          code: "",
          description: "",
          createTime:''
        },
        rules: {
          name: [
            {
              required: true,
              message: "请输入名称",
              trigger: ["blur", "change"]
            }
          ],
          code: [
            {
              required: true,
              message: "请输入编码",
              trigger: ["blur", "change"]
            }
          ],
          description: [
            {
              required: false,
              message: "请填写描述",
              trigger: ["blur", "change"]
            }
          ]
        }
      }
    };
  },
  computed: {
  },
  mounted(){
    this.fn_duties_listJson();
  },
  methods: {
    /* 表格操作-start */
      fn_search_click(){
        // console.log(this.table.search_value);
        //筛选时，重置页码为1
        this.table.page.currentPage=1;
        this.fn_duties_listJson();
      },
      handleSizeChange(data){
        // console.log('现在是每页'+data+'条');
        //改变每页条数时，重新展现列表，重置页码为1
        this.table.page.pageSize=data;
        this.table.page.currentPage=1;
        this.fn_duties_listJson();
      },
      handleCurrentChange(data){
        this.table.page.currentPage=data;
        this.fn_duties_listJson();
        // console.log('现在是第'+data+'页');
      },
      //获取岗位列表
      fn_duties_listJson(){
        let param={
          orderBy:'',//排序，可以为空
          pageNo:this.table.page.currentPage,//页码
          pageSize:this.table.page.pageSize,//每页条数
          sort:'',//排序字段，不用理会
          name:this.table.search_value,//筛选输入框的值
        };
        duties_listJson(param).then(response=>{
          this.table.data=[];
          this.table.data=response.data.records;
          this.table.page.total=parseInt(response.data.total);
        }).catch(errors=>{
          console.log(errors);
        })
      },
      //岗位删除
      fn_duties_remove(row){
        let param={
          id:row.id
        }
        duties_remove(param).then(response=>{
          // console.log(response);
          this.$message({
            message:'删除成功',
            type:'success'
          })
          this.fn_duties_listJson();
        }).catch(errors=>{
          console.log(errors);
        })
      },
    /* 表格操作-end */

    
    /* 新增编辑角色-start */
      // 打开dialog
      fn_openDialog(title,row) {
        // console.log(row);
        this.add_duties.title = title;
        this.add_duties.dialogVisible = true;
        if(this.add_duties.title==='编辑'){
          this.add_duties.form=JSON.parse(JSON.stringify(row));
          // this.fn_roleGet(row.roleId);
        }
      },
      // 确定提交
      submitForm_add() {
        this.$refs.add_duties.validate(valid => {
          if (valid) {
            this.fn_duties_save();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      // 关闭弹窗
      resetForm_add() {
        this.$refs.add_duties.resetFields();
        this.add_duties.dialogVisible = false;
      },
      //添加角色
      fn_duties_save(){
        let param={
            code:this.add_duties.form.code,
            description:this.add_duties.form.description,
            id:this.add_duties.form.id,
            name:this.add_duties.form.name,
            posLevelId:'',
        }
        if (this.add_duties.title==='新增') {
          param.id=''
        }
        // console.log(param);
        duties_save(param).then(response=>{
          this.$message({
            message:'添加岗位成功',
            type:'success'
          })
          this.fn_duties_listJson();
          this.resetForm_add();
        }).catch(errors=>{
          console.log(errors);
        })
      },
      //查看角色
      fn_roleGet(id){
        let param={
          roleId:id
        };
        roleGet(param).then(response=>{
          // console.log(response);
          this.add_user.form=response.data;
        }).catch(errors=>{
          console.log(errros);
        })
      }
    /* 新增编辑角色-end */
  }
};
</script>

<style lang="scss" scoped>
.views-container {
  margin-top: 10px;
  padding: 10px;
  overflow: hidden;
  height: 100%;
}
.main{
  margin: 0 20px;
  .right_top {
    overflow: hidden;
    .search_user {
      float: left;
      .el-input {
        width: 300px;
      }
    }
    .button_user {
      float: right;
    }
  }
  .main_table{
    .user_table {
      margin-top: 20px;
      border: 1px solid #dfe6ec;
      border-bottom: 0;
    }
    /deep/ .el-pagination{
      text-align: right;
      margin: 10px 0;
    }
  }
}
/deep/ .el-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
  // max-height:calc(100% - 30px);
  // max-width:calc(100% - 30px);
  max-height: 80%;
  max-width: 70%;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  overflow: hidden;
  > .el-dialog__header {
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
    > .el-dialog__title {
      color: #303133 !important;
    }
  }
  > .el-dialog__body {
    overflow: auto;
    color: #666666;
    padding: 20px;
    .diaologMain {
      padding: 20px 50px;
    }
  }
  > .el-dialog__footer {
    padding: 10px 20px 10px;
    border-top: 1px solid #dcdfe6 !important;
  }
}
</style>