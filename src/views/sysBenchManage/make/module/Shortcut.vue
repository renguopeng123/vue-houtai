<template>
  <!--常用功能（快捷入口）-->
  <div class="Shortcut">
    <div class="Shortcutit"><i class="el-icon-copy-document" />快捷入口</div>
    <div class="Shortcutcon">
      <ul>
        <li v-for="item in list" :key="item.value" @click="handleClick(item.value)">
          <a href="#">
            <span :class="[item.iconbg]"><i :class="[item.icon]" class="icon" /></span>
            <h2>{{ item.name }}</h2>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shortcut',
  components: {
    
  },
  data() {
    return {
        list: [
          {
            value: "/myOffice/myTodo",
            iconbg: "icona",
            icon: "bpm-abeyance",
            name: "我的待办"
          },
          {
            value: "/myOffice/myDrafts",
            iconbg: "iconb",
            icon: "bpm-draft",
            name: "我的草稿"
          },
          {
            value: "/mySchedule/index",
            iconbg: "iconc",
            icon: "el-icon-date",
            name: "我的日程"
          },
          {
            value: "/myMeeting/index",
            iconbg: "icond",
            icon: "bpm-meeting2",
            name: "我的会议"
          },
          {
            value: "/meetingQuery/index",
            iconbg: "icone",
            icon: "bpm-drafting",
            name: "会议查询"
          },
          {
            value: "/myOffice/myApplication",
            iconbg: "iconf",
            icon: "bpm-my-application",
            name: "我的申请"
          },
          {
            value: "/myOffice/TransactionHistory",
            iconbg: "icong",
            icon: "bpm-transaction",
            name: "办理历史"
          },
          {
            value: "/myOffice/entrust",
            iconbg: "iconh",
            icon: "bpm-trust",
            name: "我的委托"
          }
        ]
      }
  },
  mounted() {
    
  },
  methods: {
    handleClick(path) {
      this.$router.push(path)
    }
    
  }
}
</script>
<style lang="scss" scoped>
    .Shortcut{
      width: 100%;
    }
    .Shortcutit{
      width: auto;
      height: 48px;
      line-height: 48px;
      padding-left: 10px;
      border-bottom: 1px solid #dcdfe6;
    }
    .Shortcutit i{
      padding: 5px 8px;
      float: left;
      margin-top: 6px;
      color: #3291fb;
      font-size: 24px;
    }
    .Shortcutcon{
      width: auto;
    }
    .Shortcutcon ul{
      padding: 0px;
      margin: 0px;
      padding: 10px 15px;
      list-style-type: none;
      width: 100%;
      clear: both;
    }
    .Shortcutcon ul li{
      height: 87px;
      padding-top: 3px;
      width: 12.5%;
      float: left;
    }
    .Shortcutcon ul li a{
      
    }
    .Shortcutcon ul li span{
      display: block;
      width: 50px;
      height: 50px;
      line-height: 74px;
      border-radius: 30px;
      margin: 0 auto;
      text-align: center;
    }
    .Shortcutcon ul li .icona{
      background: #6098d5;
    }
    .Shortcutcon ul li .icona i{
      font-size: 28px!important;
      display: block;
      padding-top: 12px;
      padding-left: 2px;
    }
    .Shortcutcon ul li .iconb{
      background: #e99c66;
    }
    .Shortcutcon ul li .iconb i{
      display: block;
      padding-top: 1px;
      padding-left: 2px;
    }
    .Shortcutcon ul li .iconc{
      background: #ed7b71;
    }
    .Shortcutcon ul li .iconc i{
      font-size: 32px!important;
      display: block;
      padding-top: 8px;
    }
    .Shortcutcon ul li .icond{
      background: #53c3d1;
    }
    .Shortcutcon ul li .icond i{
      font-size: 32px!important;
      display: block;
      padding-top: 8px;
    }
    .Shortcutcon ul li .icone{
      background: #a651d0;
    }
    .Shortcutcon ul li .icone i{
      font-size: 32px!important;
      display: block;
      padding-top: 9px;
      padding-left: 2px;
    }
    .Shortcutcon ul li .iconf{
      background: #ed7b71;
    }
    .Shortcutcon ul li .iconf i{
      font-size: 30px!important;
      display: block;
      padding-top: 10px;
      padding-left: 2px;
    }
    .Shortcutcon ul li .icong{
      background: #52c2ce;
    }
    .Shortcutcon ul li .icong i{
      font-size: 36px!important;
      display: block;
      padding-left: 6px;
      padding-top: 6px;
    }
    .Shortcutcon ul li .iconh{
      background: #a753cf;
    }
    .Shortcutcon ul li .iconh i{
      font-size: 32px!important;
      display: block;
      padding-top: 10px;
    }
    .Shortcutcon ul li span .icon{
      font-size: 48px;
      color:#fff;
      font-weight: normal;
    }
    .Shortcutcon ul li h2{
      margin: 0px;
      padding: 0px;
      height: 38px;
      line-height: 38px;
      font-size: 16px;
      font-weight: normal;
      text-align: center;
    }
    .clearfix{
      clear: both;
    }
</style>
