<template>
  <el-card v-if="config.isCard" class="box-card">
    <div slot="header">
      <el-row>
        <!--<i class="el-button&#45;&#45;text header-icon" :class="widget.iconClass"></i>-->
        <span class="header-title">{{ widget.title }}</span>
        <!--<span class="more" @click="toMore">更多>></span>-->
      </el-row>

    </div>
    <div>
      <iframe v-if="widget.dataType==='iframe'" :src="widget.dataSource" width="100%" :height="widget.height"></iframe>
      <slot v-else />
    </div>
  </el-card>
  <div v-else>
    <iframe v-if="widget.dataType==='iframe'" :src="widget.dataSource" width="100%" :height="widget.height"></iframe>
    <slot v-else />
  </div>


</template>

<script>
  export default {
    name: "GenerateModule",
    props: {
      config: {
        type: Object,
        required: true
      },
      widget: {
        type: Object,
        required: true
      }
    },
    methods: {
      toMore() {
        if(this.widget.dataType==='iframe'){
          window.open(this.widget.moreUrl)
        }else if(this.widget.dataType==='component'){
          this.$router.push(this.widget.moreUrl)
        }

      }
    },

  }
</script>

<style scoped>
  .box-card{
    height: 100%;
  }
  .header-icon{
    font-size: 24px;
    margin: 0 5px 0 -5px;
  }
  .header-title{
    font-size: 24px;
  }
  .more{
    float: right;
    margin-right: 10px;
    cursor: pointer;
    font-size: 20px;
  }

</style>