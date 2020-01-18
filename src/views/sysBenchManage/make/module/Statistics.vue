<template>
  <!--工作统计-->
  <div class="Statistics">
    <div v-for="item in data" :key="item.label" class="container">
      <i :class="[item.icon]" class="icon" :style="{color:item.iconColor}"/>
      <div class="data">
        <div class="num">
          {{ item.count }}
        </div>
        <div class="text">
          {{ item.label }}
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {getMeetingAndMemberCount, getOthersCount} from '@/api/home/api_statistics'
export default {
  name: 'Statistics',
  data() {
    return {
      data: {
        toDoNum: {
          label: '待办事项',
          icon: 'bpm-abeyance',
          iconColor: '#5cb9a4',

          count: 0
        },
        meetingTotal: {
          label: '待开会议',
          icon: 'bpm-meeting2',
          iconColor: '#52c3d0',
          count: 0
        },
        appInstNum: {
          label: '我的申请',
          icon: 'bpm-application',
          iconColor: '#5f98d4',
          count: 0
        }
      }

    }
  },
  mounted() {
    //告诉父组件，不需要阴影
    this.$emit("getSelfConfig", {showShadow: false})
    this.getMeetingAndMemberCount()
    this.getOthersCount()
  },
  methods: {
    getMeetingAndMemberCount() {
      getMeetingAndMemberCount().then(res => {
        if (res.success && res.data) {
          this.data.meetingTotal.count = res.data.meetingTotal
        } else {
          console.error('获取会议和成员数量错误')
        }
      }).catch(errors => {
        console.error(errors)
      })
    },
    getOthersCount() {
      getOthersCount().then(res => {
        if (res && res.isOk) {
          this.data.appInstNum.count = res.data.appInstNum
          this.data.toDoNum.count = res.data.toDoNum

        } else {
          console.error('获取申请、表单、待办、流程等数量错误')
        }
      }).catch(errors => {
        console.error(errors)
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .Statistics{
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  .container{
    flex-grow: 1;
    margin: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    border-radius: 1px;
    box-shadow: 0px 0px 5px 0 #a0a0a0;

    &:first-child{
      margin-left: 0;
    }
    &:last-child{
      margin-right: 0;
    }
  }
  .icon{
    font-size: 64px;
    color:#5bbba3;
  }
  .data{
    margin-left: 10px;
  }
  .num{
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 5px;
    margin-top: -5px;
    color: #40a0ff;
  }
  .text{
    font-size: 16px;
    color: #999;
  }

</style>
