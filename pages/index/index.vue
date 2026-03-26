<template>
	<view class="page">
		<view class="header">
			<text class="date-text">{{ dateText }}</text>
			<text class="page-title">今日能量</text>
		</view>

		<view class="checkin-info">
			<text class="streak-label">连续打卡</text>
			<view class="streak-line">
				<text class="streak-days">{{ streakDays }}</text>
				<text class="streak-unit">天</text>
			</view>
		</view>

		<view class="energy-glow"></view>

		<view class="mood-section">
			<text class="mood-title">今日心情</text>
			<view class="mood-list">
				<view
					v-for="item in moodOptions"
					:key="item.key"
					class="mood-item"
					:class="{ 'is-active': selectedMood === item.key }"
					@click="selectMood(item.key)"
				>
					<text class="mood-icon">{{ item.icon }}</text>
					<text class="mood-label">{{ item.label }}</text>
					<text v-if="selectedMood === item.key" class="mood-dot">•</text>
				</view>
			</view>
		</view>

		<button class="light-btn" :class="{ 'is-done': hasCheckedIn }" @click="handleLightToday">
			{{ hasCheckedIn ? '今日已点亮' : '点亮今天' }}
		</button>

		<view v-if="isTransitioning" :key="transitionId" class="transition-overlay">
			<view class="transition-glow" />
		</view>

		<custom-tabbar current="checkin" />
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
				streakDays: 5,
				selectedMood: 'sparkles',
				hasCheckedIn: false,
				isTransitioning: false,
				transitionId: 0,
				moodOptions: [
					{ key: 'sparkles', icon: 'Sparkles', label: '开心' },
					{ key: 'circle', icon: 'Circle', label: '平静' },
					{ key: 'cloud-alert', icon: 'CloudAlert', label: '焦虑' },
					{ key: 'moon-star', icon: 'MoonStar', label: '疲惫' }
				]
			}
		},
		computed: {
			dateText() {
				const weekMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
				const now = new Date()
				const month = now.getMonth() + 1
				const day = now.getDate()
				return `${month}月${day}日 ${weekMap[now.getDay()]}`
			}
		},
		methods: {
			selectMood(key) {
				this.selectedMood = key
			},
			getMoodLabelByKey(key) {
				const hit = this.moodOptions.find(item => item && item.key === key)
				return hit ? hit.label : ''
			},
			handleLightToday() {
				if (this.hasCheckedIn) {
					uni.showToast({
						title: '今天已经点亮过啦',
						icon: 'none'
					})
					return
				}
				this.hasCheckedIn = true
				this.streakDays += 1
				uni.showToast({
					title: '今日打卡成功',
					icon: 'none'
				})

				const mood = this.selectedMood
				const moodLabel = this.getMoodLabelByKey(mood)

				// 首次点亮成功：播放首页同风格“径向光晕扩散”后跳转能量卡页
				this.transitionId += 1
				this.isTransitioning = true

				setTimeout(() => {
					this.isTransitioning = false
					uni.navigateTo({
						url: `/pages/energy-card/index?mood=${encodeURIComponent(mood)}&moodLabel=${encodeURIComponent(moodLabel)}`
					})
				}, 650)
			}
		}
	}
</script>

<style>
	.page {
		min-height: 100vh;
		padding: 116rpx 44rpx 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: radial-gradient(circle at 50% 48%, rgba(85, 134, 220, 0.2) 0%, rgba(13, 20, 36, 0.95) 20%, #0a1222 70%);
		color: #d9e4ff;
		box-sizing: border-box;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14rpx;
	}

	.date-text {
		font-size: 24rpx;
		color: #7787ab;
	}

	.page-title {
		font-size: 56rpx;
		font-weight: 600;
		line-height: 1.2;
		color: #eff4ff;
	}

	.checkin-info {
		margin-top: 142rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10rpx;
	}

	.streak-label {
		font-size: 28rpx;
		color: #9daecc;
	}

	.streak-line {
		display: flex;
		align-items: flex-end;
		gap: 10rpx;
		justify-content: center;
	}

	.streak-days {
		font-size: 84rpx;
		font-weight: 600;
		line-height: 1;
		color: #6ea3ff;
	}

	.streak-unit {
		font-size: 38rpx;
		line-height: 1.4;
		color: #9cb1d8;
	}

	.energy-glow {
		margin-top: 140rpx;
		width: 250rpx;
		height: 250rpx;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(110, 163, 255, 0.82) 0%, rgba(110, 163, 255, 0.28) 36%, rgba(110, 163, 255, 0.01) 72%);
		filter: blur(6rpx);
	}

	.mood-section {
		margin-top: 98rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.mood-title {
		font-size: 24rpx;
		color: #93a8cf;
	}

	.mood-list {
		margin-top: 34rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 18rpx;
	}

	.mood-item {
		min-width: 280rpx;
		height: 76rpx;
		padding: 0 22rpx;
		box-sizing: border-box;
		border-radius: 999rpx;
		border: 1rpx solid rgba(150, 172, 214, 0.18);
		background: rgba(34, 48, 76, 0.32);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10rpx;
	}

	.mood-item.is-active {
		border-color: rgba(126, 171, 255, 0.58);
		background: rgba(88, 139, 228, 0.24);
	}

	.mood-icon,
	.mood-label {
		font-size: 30rpx;
		line-height: 1;
		color: #8ea3cf;
	}

	.mood-item.is-active .mood-icon,
	.mood-item.is-active .mood-label {
		color: #dbe7ff;
	}

	.mood-dot {
		font-size: 30rpx;
		line-height: 1;
		color: #dbe7ff;
	}

	.light-btn {
		margin-top: 100rpx;
		width: 100%;
		height: 88rpx;
		border: none;
		border-radius: 999rpx;
		background: #6ea3ff;
		color: #0d1a32;
		font-size: 34rpx;
		font-weight: 600;
		line-height: 88rpx;
	}

	.light-btn.is-done {
		background: #8db7ff;
	}

	.transition-overlay {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 120;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(10, 18, 34, 0.88);
	}

	.transition-glow {
		width: 240rpx;
		height: 240rpx;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(110, 163, 255, 0.95) 0%, rgba(110, 163, 255, 0.25) 40%, rgba(110, 163, 255, 0.01) 72%);
		filter: blur(8rpx);
		animation: glow-expand 650ms ease-out forwards;
	}

	@keyframes glow-expand {
		0% {
			transform: scale(0.22);
			opacity: 0;
		}

		12% {
			opacity: 1;
		}

		100% {
			transform: scale(3.8);
			opacity: 0;
		}
	}
</style>
