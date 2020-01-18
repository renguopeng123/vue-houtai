<template>
<CheckboxGroup v-model="data">
	<slot></slot>
</CheckboxGroup>
</template>

<script>
/**
 * ab逗号分隔模式的CheckboxGroup
 */
import Vue from 'vue'

export default {
  components: {
  },
  props: ['value'],
  data () {
    return {
    	  data: []
    }
  },
  created: function () {
	  // this.data = (this.value || '').split(',')
	  if(this.value){
		  this.data = this.value.split(",");
	  }
  },
  methods: {
  },
  watch: {
	  value: function () {
		  this.data = (this.value || '').split(',')
	  },
	  data: function () {
		  this.$emit('input', this.data.join(','))
	  }
  }
}
</script>
