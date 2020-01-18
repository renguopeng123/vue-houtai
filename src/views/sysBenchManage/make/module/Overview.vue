<template>
  <!--工作统计-->
  <div class="Overview">
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
  name: 'Overview',
  data() {
    return {
      data: {
        bpmDefNum: {
          label: '总流程数',
          icon: 'bpm-flow',
          iconColor: '#e99c66',
          count: 0
       },
        formNum: {
          label: '总表单数',
          icon: 'bpm-input',
          iconColor: '#ed7b71',
          count: 0
        },
        userTotal: {
          label: '总人员数',
          icon: 'bpm-meeting1',
          iconColor: '#a552d0',
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
          this.data.userTotal.count = res.data.userTotal
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
          this.data.bpmDefNum.count = res.data.bpmDefNum
          this.data.formNum.count = res.data.formNum

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
  .Overview{
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
