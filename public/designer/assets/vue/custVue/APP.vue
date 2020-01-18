<template>
	<div id="apps" v-on:click="onItemClick()">
		<h1>{{msg}}</h1>
		<h2> click me </h2>
	</div>
</template>

<script>
export default {
  methods: {
    onItemClick:function() {
    	$.Dialog.error("我是一個組建，位於 APP.vue");
      console.log('on item click')
    }
  },
  name: 'Home',
  data:function () {
    return {
      msg: 'Welcome to Your Vue.js'
    }
  }
}
</script>

<style lang="scss">

#apps {
	max-width: 400px;
	margin: 0 auto;
	line-height: 1.4;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

h1 {
	text-align: center;
}
</style>