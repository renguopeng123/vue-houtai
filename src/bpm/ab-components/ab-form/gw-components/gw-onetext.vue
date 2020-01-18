<template>
	<div class="gw-onetext">
		<i-input v-model="$parent.data[boKey][columnKey]" :placeholder="columnPlaceholder"
			v-ab-permission="$parent.permission[boKey][tableKey][columnKey]" :desc="columnComment"
			v-ab-validate="v_validate">
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
	 * gw-onetext
	 * 单行文本
	 */
	export default {
		name: 'gw-onetext',
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
	.gw-onetext {}
</style>