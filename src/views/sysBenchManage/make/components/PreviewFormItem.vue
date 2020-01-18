<template>
  <div :style="getStyle(config)">
      <iframe v-if="config.dataType==='iframe'" :src="config.dataSource" width="100%" :height="config.height"></iframe>
      <component v-else :is="name" />
  </div>
</template>

<script>
  import Examination from '../module/Examination'
  import Meeting from '../module/Meeting'
  import Notice from '../module/Notice'
  import Schedule from '../module/Schedule'
  import Shortcut from '../module/Shortcut'
  import Statistics from '../module/Statistics'
  import Overview from '../module/Overview'
  import Supervision from '../module/Supervision'
  import Todo from '../module/Todo'
  import GenerateModule from "./GenerateModule"
export default {
  components: {
    GenerateModule,
    Examination, Meeting, Notice, Schedule, Shortcut, Statistics, Overview, Supervision, Todo
  },
  props: ["config"],
  data() {
    return {
      modules: ['Examination', 'Meeting', 'Notice', 'Schedule', 'Shortcut', 'Statistics', 'Overview', 'Supervision', 'Todo']
    }
  },
  computed: {
    name() {
      return this.modules.filter(item=>item === this.config.type.substring(3))[0];
    }
  },
  methods: {
    getStyle({width,height}) {
      return {
       width:width/24*100 + '%',
        height: height + 'px',
      }

    }
  }
}
</script>
