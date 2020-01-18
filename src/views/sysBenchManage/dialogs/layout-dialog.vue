<template>
    <!--对话框-布局组件-->
    <el-dialog :title="title" append-to-body :visible.sync="dialogVisible" fullscreen>
        <div class="operateArea">
            <el-button size="mini" type="primary" @click="save">保存布局</el-button>
            <el-button size="mini" type="danger" @click="clear()">清空布局区域</el-button>
            <el-button size="mini" @click="getAllComponent()">恢复默认</el-button>
        </div>
       <container @change="getJson" :layoutAreaObject="orgLayout" :componentsConfig="componentsConfig" :layoutFields="layoutFields"></container>
    </el-dialog>
</template>

<script>
  import container from '../make/components/Container'
  import {getSysBenchManageListData,saveLayout,getLayout} from "@/api/sysBenchManage/api_sysBenchManage.js";
export default {
  name: "layout-dialog",
  props: {
    //对话框标题
    title: {
      type: String,
      default: "设置默认布局"
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  components:{container},
  data() {
    return {
      json: null,
      componentsConfig:[],
      //可选组件dataType的可选值，其他值会被过滤掉
      layoutFields: ['gw-Examination', 'gw-Meeting', 'gw-Notice', 'gw-Schedule', 'gw-Shortcut', 'gw-Statistics','gw-Overview', 'gw-Supervision', 'gw-Todo'],
      orgLayout:{
        list: [],
        config: {
          gutter: 10,
          isCard: false
        }
      }

    };
  },

  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  methods: {
    getJson(val) {
      this.json = val
    },
    clear(){
      this.componentsConfig=this.componentsConfig.concat(this.orgLayout.list);
      this.orgLayout= {
        list: [],
        config: {
          gutter: 10,
          isCard: false
        }
      }
    },
    save(){
      const param={
        code:'default_layout',
        panels:this.json.list.map(({id,width,height})=>{
          return {id,width,height}
        })
      }
      saveLayout(param).then(res=>{
        if(res.success){
          this.$message.success("保存默认布局成功")
        }else{
          this.$message.error(res.message)
        }
      }).catch(error=>{
        console.error(error)
      })
    },
    //获取所有可用组件
    getAllComponent(){
      const param = {
        offset: 0,
        limit: 99999,
      };
      getSysBenchManageListData(param).then(res=>{
        if(res.success && res.data.records){
          //获取布局区域的数据
          this.getLayoutList(res.data.records);
        }else{
          this.$message.error(res.message)
        }
      }).catch(error=>{
        console.error(error)
      })

    },
    getLayoutList(allComponents){
      if(allComponents.length===0){
        this.componentsConfig=[];
        this.orgLayout={
          config: {
            gutter: 10,
            isCard: false
          },
          list:[]
        }
        return;
      }

      getLayout({layoutKey:'default_layout'}).then(res=>{
        if(res.success){
          if(res && res.data){
            const list = res.data.filter(item=>['iframe','component'].includes(item.dataType));
            const allList = allComponents.filter(item=>['iframe','component'].includes(item.dataType));

            this.componentsConfig = allList.filter(item=>{
              return !list.some(itemInner=>itemInner.id===item.id)
            });
            this.orgLayout= {
              config: {
                gutter: 10,
                isCard: false
              },
              list
            };
          }
        }
      }).catch(error=>{
        console.error(error)
      })
    }


  },
  mounted: function() {
    this.getAllComponent();

  }
};
</script>

<style scoped lang="scss">
.operateArea{
    margin-bottom: 10px;
}

</style>
