<template>
	<div class="gw-hidden">
		<input type="hidden" v-model="$parent.data[boKey][columnKey]" :desc="columnComment" />
	</div>
</template>
<script>
	import Vue from 'vue';

	import {
		getValidate,
		methods,
		props
	} from '../formUtils';

	/**
	 * gw-hidden
	 * 主要用于隐藏域
	 */
	export default {
		name: 'gw-hidden',
		props: props,

		data() {
			return {
				data: []
			}
		},
		mounted: function () {},
		methods: {
			abGetNumber: function (data) {
				return this.$parent.abGetNumber(data);
			},
			abSubAvg: function (subDataList, key) {
				return this.$parent.abSubAvg(subDataList, key);
			},
			abSubSum: function (subDataList, key) {
				return this.$parent.abSubSum(subDataList, key);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.gw-hidden {
		display: none
	}
</style>