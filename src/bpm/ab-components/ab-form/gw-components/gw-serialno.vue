<template>
	<div class="gw-serialno">
		<ab-serial-no v-model="$parent.data[boKey][columnKey]" :placeholder="columnPlaceholder"
			v-bind:ab-permission="$parent.permission[boKey][tableKey][columnKey]" :desc="columnComment"
			v-ab-validate="v_validate" :serial-no="columnSerialnoAlias">
		</ab-serial-no>
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
	 * gw-serialno
	 * 流水号
	 */
	export default {
		name: 'gw-serialno',
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
	.gw-serialno {
	}
</style>