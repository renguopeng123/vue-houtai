<template>
	<div class="gw-multitext">
		<i-input type="textarea" v-model="$parent.data[boKey][columnKey]"
			:placeholder="columnPlaceholder" v-ab-permission="$parent.permission[boKey][tableKey][columnKey]"
			:desc="columnComment" v-ab-validate="v_validate">
		</i-input>

	</div>
</template>
<script>
	import Vue from 'vue';

	import {
		methods,
		props,
		componentsINIT
	} from '../formUtils';

	/**
	 * gw-multitext
	 * 多行文本
	 */
	export default {
		name: 'gw-multitext',
		props: props,
		data() {
			return {
				v_validate: ""
			}
		},
		computed: {},
		created() {
			componentsINIT(this);
		},
		mounted() {},
		methods: {
			//宽高设置不管用
			getStyle: function () {
				return "width: " + this.columnEwidth + "px; height: " + this.columnEheight + "ps;"
			},
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
	.gw-multitext {}
</style>