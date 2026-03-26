<template>
	<view class="page">
		<view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="nav-left" @click="handleBack">
				<text class="nav-back-icon">‹</text>
				<text class="nav-back-text">返回</text>
			</view>
			<text class="nav-title">测字结果</text>
		</view>

		<scroll-view class="scroll" scroll-y>
			<view class="hero">
				<text class="hero-label">你输入的文字</text>
				<text class="hero-char">{{ heroChar }}</text>
				<text v-if="showFullHint" class="hero-full">{{ rawText }}</text>
				<view class="hero-line" />
			</view>

			<text class="section-label">拆字解析</text>
			<view class="parse-list">
				<view v-for="(line, idx) in parseLines" :key="idx" class="parse-card">
					<view class="parse-dot" />
					<text class="parse-text">{{ line }}</text>
				</view>
			</view>

			<text class="section-label">运势建议</text>
			<view class="fortune-card">
				<text class="fortune-text">{{ fortuneText }}</text>
			</view>

			<text class="section-label">灵魂总结</text>
			<view class="soul-card">
				<text class="soul-text">“{{ soulText }}”</text>
			</view>

			<view class="scroll-bottom-spacer" />
		</scroll-view>

		<view class="footer" :style="{ paddingBottom: bottomSafe + 'px' }">
			<view class="btn-share" @click="handleShare">
				<svg viewBox="0 0 64 64" class="btn-icon share-icon">
					<circle cx="24" cy="40" r="6" fill="none" stroke="currentColor" stroke-width="3" />
					<circle cx="44" cy="24" r="6" fill="none" stroke="currentColor" stroke-width="3" />
					<path
						d="M28 36l14-8M36 28l14 8"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
					/>
				</svg>
				<text class="btn-share-text">分享</text>
			</view>
			<view class="btn-again" @click="handleAgain">
				<svg viewBox="0 0 64 64" class="btn-icon again-icon">
					<path
						d="M48 28a20 20 0 1 0-4 18"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
					/>
					<path
						d="M48 16v12H36"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<text class="btn-again-text">再测一次</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0,
				bottomSafe: 0,
				rawText: '',
				heroChar: '',
				parseLines: [],
				fortuneText: '今天适合先做出第一步，不必一次把所有答案找齐。',
				soulText: '你正在靠近那个更清晰的自己，慢一点也没关系。',
				showFullHint: false
			}
		},
		onLoad(options) {
			try {
				const sys = uni.getSystemInfoSync()
				this.statusBarHeight = sys.statusBarHeight || 20
				this.bottomSafe = sys.safeAreaInsets && sys.safeAreaInsets.bottom ? sys.safeAreaInsets.bottom : 0
			} catch (e) {
				this.statusBarHeight = 20
				this.bottomSafe = 0
			}

			let text = ''
			if (options && options.text) {
				try {
					text = decodeURIComponent(String(options.text))
				} catch (err) {
					text = String(options.text)
				}
			}
			text = (text || '').trim()
			if (!text) {
				text = '光'
			}
			this.rawText = text

			const first = this.getFirstChar(text)
			this.heroChar = first || text.charAt(0) || '光'
			this.showFullHint = text.length > 1

			this.parseLines = [
				`${this.heroChar}：有被看见的意味。`,
				'单字属阳，代表向外发散的意愿。',
				'当前处于一个适合开始的阶段。'
			]
		},
		methods: {
			getFirstChar(str) {
				if (!str) return ''
				const arr = Array.from(str)
				return arr.length ? arr[0] : ''
			},
			handleBack() {
				this.goBack()
			},
			handleClose() {
				this.goBack()
			},
			goBack() {
				uni.navigateBack({
					fail: () => {
						uni.reLaunch({ url: '/pages/analyze/index' })
					}
				})
			},
			handleShare() {
				uni.showToast({ title: '分享功能敬请期待', icon: 'none' })
			},
			handleAgain() {
				this.goBack()
			}
		}
	}
</script>

<style>
	.page {
		min-height: 100vh;
		box-sizing: border-box;
		background: linear-gradient(180deg, rgba(24, 28, 36, 0.98) 0%, #12141a 45%, #0d1016 100%);
		display: flex;
		flex-direction: column;
	}

	.nav-bar {
		position: relative;
		flex-shrink: 0;
		padding: 12rpx 24rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.nav-left {
		display: flex;
		align-items: center;
		gap: 4rpx;
		min-width: 140rpx;
	}

	.nav-back-icon {
		font-size: 44rpx;
		color: #a0a4ae;
		line-height: 1;
	}

	.nav-back-text {
		font-size: 28rpx;
		color: #a0a4ae;
	}

	.nav-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #e8eaef;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.nav-right {
		min-width: 140rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.nav-close {
		font-size: 48rpx;
		color: #a0a4ae;
		line-height: 1;
		font-weight: 300;
	}

	.scroll {
		flex: 1;
		height: 0;
		padding: 0 40rpx;
		box-sizing: border-box;
	}

	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 24rpx 0 32rpx;
	}

	.hero-label {
		font-size: 24rpx;
		color: #8e929e;
		margin-bottom: 20rpx;
	}

	.hero-char {
		font-size: 120rpx;
		font-weight: 700;
		color: #5ba4f7;
		line-height: 1.1;
	}

	.hero-full {
		margin-top: 16rpx;
		font-size: 24rpx;
		color: #8e929e;
		text-align: center;
		line-height: 1.5;
		max-width: 100%;
	}

	.hero-line {
		margin-top: 32rpx;
		width: 100%;
		height: 1rpx;
		background: rgba(255, 255, 255, 0.08);
	}

	.section-label {
		display: block;
		text-align: center;
		font-size: 24rpx;
		color: #8e929e;
		margin: 40rpx 0 24rpx;
	}

	.parse-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.parse-card {
		display: flex;
		align-items: flex-start;
		gap: 16rpx;
		padding: 28rpx 24rpx;
		border-radius: 20rpx;
		background: #1c1f26;
		border: 1rpx solid rgba(255, 255, 255, 0.06);
		box-sizing: border-box;
	}

	.parse-dot {
		width: 12rpx;
		height: 12rpx;
		border-radius: 50%;
		background: #5ba4f7;
		margin-top: 10rpx;
		flex-shrink: 0;
	}

	.parse-text {
		flex: 1;
		font-size: 24rpx;
		color: #c8ccd4;
		line-height: 1.65;
	}

	.fortune-card {
		padding: 32rpx 28rpx;
		border-radius: 20rpx;
		background: #1c1f26;
		border: 1rpx solid rgba(255, 255, 255, 0.06);
		box-sizing: border-box;
	}

	.fortune-text {
		font-size: 24rpx;
		color: #c8ccd4;
		line-height: 1.65;
		text-align: center;
		display: block;
	}

	.soul-card {
		padding: 32rpx 28rpx;
		border-radius: 20rpx;
		background: #1c1f26;
		border: 1rpx solid rgba(255, 255, 255, 0.06);
		box-sizing: border-box;
	}

	.soul-text {
		font-size: 24rpx;
		color: #c8ccd4;
		line-height: 1.75;
		text-align: center;
		display: block;
		font-style: italic;
	}

	.scroll-bottom-spacer {
		height: 200rpx;
	}

	.footer {
		flex-shrink: 0;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 20rpx 40rpx 24rpx;
		display: flex;
		gap: 24rpx;
		align-items: center;
		background: rgba(18, 20, 26, 0.96);
		border-top: 1rpx solid rgba(255, 255, 255, 0.06);
		box-sizing: border-box;
		margin-bottom: 30rpx;
	}

	.btn-share {
		flex: 1;
		height: 88rpx;
		border-radius: 999rpx;
		border: 2rpx solid #3d5a8a;
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12rpx;
		box-sizing: border-box;
	}

	.btn-icon {
		width: 32rpx;
		height: 32rpx;
		display: block;
	}

	.share-icon {
		color: #7a9fd4;
	}

	.btn-share-text {
		font-size: 24rpx;
		font-weight: 600;
		color: #a8c4f0;
	}

	.btn-again {
		flex: 1;
		height: 88rpx;
		border-radius: 999rpx;
		background: linear-gradient(180deg, #6eb0ff 0%, #5ba4f7 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12rpx;
		box-sizing: border-box;
	}

	.again-icon {
		color: #ffffff;
	}

	.btn-again-text {
		font-size: 28rpx;
		font-weight: 700;
		color: #ffffff;
	}
</style>
