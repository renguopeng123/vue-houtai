<template>
    <!--对话框-预览组件-->
    <el-dialog :title="title" append-to-body :visible.sync="dialogVisible">
        <preview-form-item :config="data" ></preview-form-item>
    </el-dialog>
</template>

<script>
  import PreviewFormItem from '../make/components/PreviewFormItem'
export default {
  name: "preview-component-dialog",
  props: {
    //对话框标题
    title: {
      type: String,
      default: "组件预览"
    },
    visible: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: function(){
        return {}
      }
    },
  },
  components:{PreviewFormItem},
  data() {
    return {


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


  },
  mounted: function() {
    
  }
};
</script>

<style scoped lang="scss">


</style>
