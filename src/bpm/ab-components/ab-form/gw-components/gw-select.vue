<template>
	<div class="gw-select">
		<i-select v-model="$parent.data[boKey][columnKey]" :placeholder="columnPlaceholder"
			v-ab-permission="$parent.permission[boKey][tableKey][columnKey]" :desc="columnComment"
			v-ab-validate="v_validate" :disabled="'r'== $parent.permission[boKey][tableKey][columnKey]">
			<i-option v-for="item in options" :value="item.key" :key="item.key">{{ item.txt }}</i-option>
		</i-select>
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
	 * gw-select
	 * 下拉列表
	 */
	export default {
		name: 'gw-select',
		props: props,
		data() {
			return {
				v_validate: "",
				options: []
			}
		},
		computed: {},
		created() {
			componentsINIT(this);
			var columnOptions = JSON.parse(this.columnOptions);
			if (columnOptions) {
				this.options = JSON.parse(this.columnOptions);
			}
		},
		mounted() {},
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
	.gw-select {}
</style>