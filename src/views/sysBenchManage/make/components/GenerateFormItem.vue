<template>
  <el-col
    v-if="widget && widget.id"
    :span="widget.width"
    :style="getStyle(widget,config)"
  >
    <generate-module v-if="canGenerate()" :key="widget.id" :config="config" :widget="widget">
      <component :is="widget.type.substring(3)"  v-if="widget.dataType==='component'"/>
    </generate-module>


    <!--<template v-else-if="widget.type==='gw-Meeting'">-->
    <!--<Meeting />-->
    <!--</template>-->
    <!--<template v-else-if="widget.type==='gw-Notice'">-->
    <!--<Notice />-->
    <!--</template>-->
    <!--<template v-else-if="widget.type==='gw-Schedule'">-->
    <!--<Schedule />-->
    <!--</template>-->
    <!--<template v-else-if="widget.type==='gw-Shortcut'">-->
    <!--<Shortcut />-->
    <!--</template>-->
    <!--<template v-else-if="widget.type==='gw-Statistics'">-->
    <!--<Statistics />-->
    <!--</template>-->
    <!--<template v-else-if="widget.type==='gw-Supervision'">-->
    <!--<Supervision />-->
    <!--</template>-->
    <!--<template v-else-if="widget.type==='gw-Todo'">-->
    <!--<Todo />-->
    <!--</template>-->
  </el-col>
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
  props: ['widget', 'config'],
  data() {
    return {
      modules: ['Examination', 'Meeting', 'Notice', 'Schedule', 'Shortcut', 'Statistics', 'Overview', 'Supervision', 'Todo']
    }
  },
  
  created() {

  },
  methods: {
    canGenerate(){
      const moduleOK =this.modules.some(item=>this.widget.type==='gw-'+item)
      return moduleOK || this.widget.dataType==='iframe'
    },
    getStyle({ height}, {gutter}) {

      return {
        marginBottom: gutter + 'px',
        height: height + 'px',
      }

    }
  }
}
</script>
