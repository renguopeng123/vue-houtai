<template>
	<div v-if="false" class="gw-text"></div>
</template>
<script>
	import Vue from 'vue';

	/**
	 * gw-text
	 * 主要用于编辑器展示，具体页面中隐藏。
	 */
	export default {
		name: 'gw-text',
		props: [],
		data() {
			return {
				data: []
			}
		},
		mounted: function () {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.gw-text {
		display: none
	}
</style>