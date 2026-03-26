<template>
	<view class="page">
		<view class="top-bar">
			<view class="back-btn" @click="handleBack">
				<text class="back-icon">‹</text>
				<text class="back-text">返回</text>
			</view>

			<view class="title-wrap">
				<text class="sub-title">今日关键词</text>
				<text class="main-title">{{ moodLabel || '今日能量' }}</text>
			</view>
		</view>

		<view class="content" :style="{ paddingBottom: (bottomPadding + 140) + 'px' }">
			<view class="card">
				<view class="card-section">
					<text class="section-title">今日建议</text>
					<text class="section-text">{{ adviceText }}</text>
				</view>

				<view class="card-divider" />

				<view class="card-section">
					<text class="section-title" style="text-align: center;">能量卡片</text>
					<text class="quote">“{{ energyText }}”</text>
				</view>
			</view>
		</view>

		<view class="action-bar" :style="{ paddingBottom: bottomPadding + 'px' }">
			<view class="action-item" @click="handleShare">
				<text class="action-icon">⤴</text>
				<text class="action-text">分享</text>
			</view>
			<view class="action-item" @click="handleRemeasure">
				<text class="action-icon">↻</text>
				<text class="action-text">再测一次</text>
			</view>
			<view class="action-item" @click="handleGoProfile">
				<text class="action-icon">👤</text>
				<text class="action-text">我的</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mood: '',
				moodLabel: '',
				seed: 0,
				adviceText: '',
				energyText: '',
				bottomPadding: 0
			}
		},
		onLoad(options) {
			const mood = options && options.mood ? String(options.mood) : ''
			const moodLabel = options && options.moodLabel ? String(options.moodLabel) : ''
			this.mood = mood
			this.moodLabel = moodLabel

			// 兼容各端 safe-area，减少底部按钮遮挡
			// #ifdef H5
			this.bottomPadding = 0
			// #endif
			// #ifndef H5
			this.bottomPadding = this.getSystemBottomInset()
			// #endif

			this.regenerate()
		},
		methods: {
			handleBack() {
				uni.navigateBack()
			},

			getSystemBottomInset() {
				try {
					// #ifdef MP-WEIXIN
					// 微信小程序可读取微信基础库安全区域
					// uni.getSystemInfoSync 在部分机型可能没有 safeAreaInsets，做兜底
					const sys = uni.getSystemInfoSync()
					if (sys && sys.safeAreaInsets && typeof sys.safeAreaInsets.bottom === 'number') {
						return sys.safeAreaInsets.bottom
					}
					// #endif
				} catch (e) {}
				return 0
			},

			getMoodMeta(mood) {
				const map = {
					sparkles: {
						advice: [
							'把今天的好心情先留给自己，慢慢来也没关系。',
							'和自己好好说一句“你已经很努力了”。',
							'今天适合从小事开始：先做 10 分钟，再决定要不要继续。'
						],
						energy: [
							'“开心不是偶然，是你选择了照亮自己。”',
							'“你会越来越接近更好的状态。”',
							'“把能量留在当下，你就会更强大。”'
						]
					},
					circle: {
						advice: [
							'慢下来，给情绪一个呼吸的空间。',
							'把注意力放在可控的部分：一步一步就会稳定下来。',
							'今天保持节奏：少一点比较，多一点坚持。'
						],
						energy: [
							'“平静不是无感，而是稳稳地选择。”',
							'“你正在把生活调回正轨。”',
							'“稳住当下，未来会回报你。”'
						]
					},
					'cloud-alert': {
						advice: [
							'焦虑来时，先把任务拆小，再做第一步。',
							'给自己一个“允许不完美”的理由，然后继续前进。',
							'写下担心与可行动的部分，你会更有掌控感。'
						],
						energy: [
							'“焦虑是提醒，不是判决。”',
							'“先把呼吸找回来，答案会慢慢出现。”',
							'“你比你想的更能扛住。”'
						]
					},
					'moon-star': {
						advice: [
							'允许休息，你的能量需要被照顾。',
							'今天就做最重要的一件事，其他都先放一放。',
							'给自己一个温柔的收尾：早一点结束、早一点充电。'
						],
						energy: [
							'“疲惫时，别硬撑，换一种节奏。”',
							'“把今天放进休息里，明天会更亮。”',
							'“你值得被好好对待。”'
						]
					}
				}
				return map[mood] || map.sparkles
			},

			pickBySeed(arr, offset) {
				if (!Array.isArray(arr) || arr.length === 0) return ''
				const idx = (this.seed + offset) % arr.length
				return arr[idx]
			},

			regenerate() {
				this.seed += 1
				const meta = this.getMoodMeta(this.mood)
				this.adviceText = meta.advice ? this.pickBySeed(meta.advice, 1) : ''
				this.energyText = meta.energy ? this.pickBySeed(meta.energy, 2) : ''
			},

			handleShare() {
				uni.showToast({
					title: '分享已加入队列',
					icon: 'none'
				})
			},

			handleRemeasure() {
				this.regenerate()
				uni.showToast({
					title: '已再测一次',
					icon: 'none'
				})
			},

			handleGoProfile() {
				uni.navigateTo({
					url: '/pages/profile/index'
				})
			}
		}
	}
</script>

<style>
	.page {
		min-height: 100vh;
		background: #0a1222;
		color: #dbe7ff;
		box-sizing: border-box;
		padding: 0 44rpx 0;
		position: relative;
	}

	.top-bar {
		padding-top: 32rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 22rpx;
	}

	.back-btn {
		display: flex;
		align-items: center;
		gap: 12rpx;
		color: #9fb2d9;
		font-size: 28rpx;
	}

	.back-icon {
		font-size: 40rpx;
		line-height: 1;
	}

	.title-wrap {
		display: flex;
		flex-direction: column;
		gap: 14rpx;
		margin: auto;
		margin-top: 300rpx;
	}

	.sub-title {
		font-size: 20rpx;
		color: #7a8bd1;
		letter-spacing: 4rpx; 
	}

	.main-title {
		font-size: 80rpx;
		font-weight: 700;
		color: #edf3ff;
		line-height: 1.5;
		margin-left: -20rpx;
	}

	.content {
		margin-top: 110rpx;
	}

	.card {
		border-radius: 30rpx;
		background: rgba(47, 67, 108, 0.35);
		border: 1rpx solid rgba(120, 148, 204, 0.2);
		padding: 48rpx 36rpx;
	}

	.card-section {
		display: flex;
		flex-direction: column;
		gap: 18rpx;
	}

	.section-title {
		font-size: 20rpx;
		color: #7a8bd1;
	}

	.section-text {
		font-size: 28rpx;
		color: #dbe7ff;
		opacity: 0.9;
		line-height: 1.6;
	}

	.card-divider {
		height: 1rpx;
		background: rgba(150, 172, 214, 0.18);
		margin: 34rpx 0;
	}

	.quote {
		font-size: 30rpx;
		color: #dbe7ff;
		opacity: 0.92;
		line-height: 1.7;
	}

	.action-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 24rpx;
		background: rgba(10, 18, 34, 0.98);
		border-top: 1rpx solid rgba(118, 145, 196, 0.22);
	}

	.action-item {
		flex: 1;
		height: 72rpx;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12rpx;
		background: rgba(47, 67, 108, 0.2);
		color: #b9cfff;
		margin: 0 8rpx 0 8rpx;
	}

	.action-item:active {
		background: rgba(47, 67, 108, 0.32);
	}

	.action-icon {
		font-size: 28rpx;
		line-height: 1;
	}

	.action-text {
		font-size: 26rpx;
		line-height: 1;
	}
</style>
