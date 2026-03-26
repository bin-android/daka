<template>
	<view class="page">
		<view class="header">
			<text class="page-title">我的记录</text>
			<view class="sub-row">
				<text class="sub-text">共 </text>
				<text class="sub-num">{{ totalCount }}</text>
				<text class="sub-text"> 条记录</text>
			</view>
		</view>

		<scroll-view class="filter-scroll" scroll-x show-scrollbar="false">
			<view class="filter-inner">
				<view
					v-for="f in filters"
					:key="f.key"
					class="filter-pill"
					:class="{ 'is-active': activeFilter === f.key }"
					@click="selectFilter(f.key)"
				>
					<text class="filter-text">{{ f.label }}</text>
				</view>
			</view>
		</scroll-view>

		<view class="list-wrap">
			<view class="timeline-rail" />
			<view
				v-for="item in filteredRecords"
				:key="item.id"
				class="record-row"
			>
				<view class="timeline-cell">
					<view class="glow-dot" />
				</view>
				<view class="record-card">
					<view class="card-top">
						<text class="card-date">{{ item.dateLabel }}</text>
						<view class="card-tag">
							<text class="card-tag-text">{{ item.moodLabel }}</text>
						</view>
					</view>
					<text class="card-mood">{{ item.moodLabel }}</text>
					<text class="card-detail">连续打卡 {{ item.streak }} 天 · 获得 {{ item.energy }} 能量</text>
				</view>
			</view>
		</view>

		<custom-tabbar current="records" />
	</view>
</template>

<script>
	import CustomTabbar from '@/components/custom-tabbar/custom-tabbar.vue'

	export default {
		components: {
			CustomTabbar
		},
		data() {
			return {
				activeFilter: 'all',
				filters: [
					{ key: 'all', label: '全部' },
					{ key: 'happy', label: '开心' },
					{ key: 'calm', label: '平静' },
					{ key: 'anxious', label: '焦虑' },
					{ key: 'tired', label: '疲惫' }
				],
				records: [
					{ id: 1, dateLabel: '03/25', moodKey: 'happy', moodLabel: '开心', streak: 5, energy: 30 },
					{ id: 2, dateLabel: '03/25', moodKey: 'calm', moodLabel: '平静', streak: 2, energy: 18 },
					{ id: 3, dateLabel: '03/25', moodKey: 'happy', moodLabel: '开心', streak: 12, energy: 42 },
					{ id: 4, dateLabel: '03/25', moodKey: 'anxious', moodLabel: '焦虑', streak: 1, energy: 6 },
					{ id: 5, dateLabel: '03/24', moodKey: 'calm', moodLabel: '平静', streak: 3, energy: 20 },
					{ id: 6, dateLabel: '03/24', moodKey: 'tired', moodLabel: '疲惫', streak: 4, energy: 15 },
					{ id: 7, dateLabel: '03/23', moodKey: 'happy', moodLabel: '开心', streak: 8, energy: 36 },
					{ id: 8, dateLabel: '03/23', moodKey: 'calm', moodLabel: '平静', streak: 1, energy: 12 },
					{ id: 9, dateLabel: '03/22', moodKey: 'anxious', moodLabel: '焦虑', streak: 2, energy: 10 },
					{ id: 10, dateLabel: '03/22', moodKey: 'tired', moodLabel: '疲惫', streak: 6, energy: 24 },
					{ id: 11, dateLabel: '03/21', moodKey: 'happy', moodLabel: '开心', streak: 10, energy: 48 },
					{ id: 12, dateLabel: '03/21', moodKey: 'calm', moodLabel: '平静', streak: 5, energy: 22 }
				]
			}
		},
		computed: {
			totalCount() {
				return this.records.length
			},
			filteredRecords() {
				if (this.activeFilter === 'all') {
					return this.records
				}
				return this.records.filter(r => r.moodKey === this.activeFilter)
			}
		},
		methods: {
			selectFilter(key) {
				this.activeFilter = key
			}
		}
	}
</script>

<style>
	.page {
		min-height: 100vh;
		box-sizing: border-box;
		background: #1a1c24;
		padding: 72rpx 32rpx 220rpx;
	}

	.header {
		margin-bottom: 28rpx;
	}

	.page-title {
		display: block;
		font-size: 52rpx;
		font-weight: 700;
		color: #ffffff;
		line-height: 1.2;
	}

	.sub-row {
		margin-top: 12rpx;
		display: flex;
		flex-direction: row;
		align-items: baseline;
	}

	.sub-text {
		font-size: 26rpx;
		color: #8e8e93;
	}

	.sub-num {
		font-size: 26rpx;
		color: #5ca9ff;
		font-weight: 600;
	}

	.filter-scroll {
		width: 100%;
		white-space: nowrap;
		margin-bottom: 32rpx;
	}

	.filter-inner {
		display: inline-flex;
		flex-direction: row;
		gap: 16rpx;
		padding-right: 8rpx;
	}

	.filter-pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 14rpx 28rpx;
		border-radius: 999rpx;
		background: rgba(255, 255, 255, 0.06);
		border: 1rpx solid transparent;
		box-sizing: border-box;
	}

	.filter-pill.is-active {
		background: rgba(74, 144, 226, 0.22);
		border-color: #5ca9ff;
	}

	.filter-text {
		font-size: 26rpx;
		color: #9a9da8;
		white-space: nowrap;
	}

	.filter-pill.is-active .filter-text {
		color: #ffffff;
		font-weight: 600;
	}

	.list-wrap {
		position: relative;
		padding-left: 8rpx;
	}

	.timeline-rail {
		position: absolute;
		left: 22rpx;
		top: 24rpx;
		bottom: 24rpx;
		width: 2rpx;
		background: rgba(255, 255, 255, 0.12);
		border-radius: 1rpx;
	}

	.record-row {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		margin-bottom: 24rpx;
	}

	.record-row:last-child {
		margin-bottom: 0;
	}

	.timeline-cell {
		width: 48rpx;
		flex-shrink: 0;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: 28rpx;
		position: relative;
		z-index: 1;
	}

	.glow-dot {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(92, 169, 255, 0.95) 0%, rgba(92, 169, 255, 0.35) 45%, rgba(92, 169, 255, 0) 72%);
		box-shadow: 0 0 16rpx 6rpx rgba(92, 169, 255, 0.45);
	}

	.record-card {
		flex: 1;
		min-width: 0;
		margin-left: 16rpx;
		padding: 24rpx 24rpx 26rpx;
		border-radius: 20rpx;
		background: #252833;
		border: 1rpx solid rgba(255, 255, 255, 0.06);
		box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.04);
		box-sizing: border-box;
	}

	.card-top {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12rpx;
	}

	.card-date {
		font-size: 24rpx;
		color: #8e8e93;
	}

	.card-tag {
		padding: 6rpx 16rpx;
		border-radius: 999rpx;
		background: rgba(0, 0, 0, 0.25);
	}

	.card-tag-text {
		font-size: 22rpx;
		color: #9a9da8;
	}

	.card-mood {
		display: block;
		font-size: 34rpx;
		font-weight: 700;
		color: #ffffff;
		line-height: 1.2;
		margin-bottom: 10rpx;
	}

	.card-detail {
		display: block;
		font-size: 24rpx;
		color: #8e8e93;
		line-height: 1.5;
	}
</style>
