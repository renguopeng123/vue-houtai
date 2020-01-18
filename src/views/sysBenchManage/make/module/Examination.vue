<template>
  <!--快速审批-->
  <div class="Examination">
    <div class="Examinationtit"><i class="el-icon-copy-document" />常用流程</div>
    <div class="Examinatcon">
      <ul>
        <li v-for="item in commonProcess" :key="item.value" @click="handleClick(item.value)">
          <a href="#">
            <i :class="[item.icon]" class="icon" />
            <span>{{ item.name }}</span>
          </a>
        </li>
        <div class="clearfix" />
      </ul>
    </div>
    <flow-dialog  :src="src" ref="flowDialog"></flow-dialog>
  </div>
</template>

<script>
  import flowDialog from '@/bpm/views/myFlow/flowDialog' //流转表单
export default {
  name: 'Examination',
  components: {
    flowDialog
  },
  data() {
    return {
      src: "",
        commonProcess: [
          {
            value: "/start.html?id=411249754901577729",
            icon: "bpm-work-broker",
            name: "公司收文"
          }

        ]
      }
  },
  mounted() {
    
  },
  methods: {
    handleClick(src) {
      this.src = src
      this.$refs.flowDialog.visible = true
    }
    
  }
}
</script>
<style lang="scss" scoped>
    .Examination{
      width: 100%;
      height: 100%;
    }
    .Examinationtit{
      width: auto;
      height: 48px;
      line-height: 48px;
      padding-left: 10px;
      border-bottom: 1px solid #dcdfe6;
    }
    .Examinationtit i{
      padding: 5px 8px;
      float: left;
      margin-top: 6px;
      color: #3291fb;
      font-size: 24px;
    }
    .Examinatcon{
      width: auto;
    }
    .Examinatcon ul{
      padding: 0px;
      margin: 0px;
      padding: 25px 15px;
      list-style-type: none;
    }
    .Examinatcon ul li{
      width: 170px;
      float: left;
    }
    .Examinatcon ul li a{
      display: block;
      width: 90%;
      height: 60px;
      line-height: 60px;
      margin: 0 auto;
      background: #5390d1;
      border-radius: 5px;
    }
    .Examinatcon ul li a i{
      display: block;
      width: 50px;
      height: 50px;
      margin-top: 9px;
      margin-left: 15px;
      float: left;
      margin-right: 5px;
    }
    .Examinatcon ul li a .icon{
      font-size: 40px;
      color:#fff;
      font-weight: normal;
    }
    .Examinatcon ul li a .icon:before{
      color: #fff!important;
    }
    .Examinatcon ul li a span{
      font-size: 16px;
      color: #fff;
    }
    .Examinatcon ul li a:hover span{
      text-decoration: underline;
    }
    .clearfix{
      clear: both;
    }
</style>
