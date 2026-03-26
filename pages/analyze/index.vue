<template>
	<view class="page">
		<view class="header">
			<text class="page-title">测字</text>
			<text class="page-subtitle">输入一个字或一句话，感受AI的灵性解读</text>
		</view>

		<view class="field">
			<text class="field-label">你的想法</text>
			<view class="input-wrap">
				<textarea
					class="input-area"
					v-model="inputText"
					:maxlength="maxLen"
					placeholder="输入一个字或一句话..."
					placeholder-class="input-placeholder"
					:auto-height="true"
				/>
				<text class="char-count">{{ inputLength }}/{{ maxLen }}</text>
			</view>
		</view>

		<button class="start-btn" @click="onStart">开始解读</button>
		<text class="hint-line">AI 会从字义、笔画、音韵等多个维度为你解读</text>

		<text class="section-title">快速开始</text>
		<view class="quick-list">
			<view
				v-for="item in quickStart"
				:key="item.key"
				class="quick-card"
				@click="applyQuickStart(item.example)"
			>
				<view class="quick-left">
					<view class="quick-icon">
						<svg viewBox="0 0 64 64" class="sparkle-svg">
							<path
								d="M32 8l4 12 12 4-12 4-4 12-4-12-12-4 12-4 4-12z"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linejoin="round"
							/>
						</svg>
					</view>
				</view>
				<view class="quick-body">
					<text class="quick-title">{{ item.title }}</text>
					<text class="quick-desc">{{ item.desc }}</text>
					<view class="quick-tag">
						<text class="quick-tag-text">{{ item.exampleLabel }}</text>
					</view>
				</view>
				<text class="quick-chevron">›</text>
			</view>
		</view>

		<view class="tip-box">
			<view class="tip-bulb">
				<svg viewBox="0 0 64 64" class="bulb-svg">
					<path
						d="M32 8c10 0 18 8 18 18 0 8-5 14-10 18v6H24v-6c-5-4-10-10-10-18 0-10 8-18 18-18z"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M24 52h16M28 58h8"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
					/>
				</svg>
			</view>
			<text class="tip-text">提示：一个字能看见深度，一句话能感受温度。选择最触动你的那个。</text>
		</view>

		<custom-tabbar current="analyze" />
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
				inputText: '',
				maxLen: 50,
				quickStart: [
					{
						key: 'single',
						title: '单字拆解',
						desc: '适合一个字的当下提问。',
						example: '光',
						exampleLabel: '示例：光'
					},
					{
						key: 'phrase',
						title: '短句感应',
						desc: '适合一句话或一个小念头。',
						example: '最近有点累',
						exampleLabel: '示例：最近有点累'
					},
					{
						key: 'relation',
						title: '关系观察',
						desc: '适合轻量情绪与关系状态。',
						example: '我该不该主动一点',
						exampleLabel: '示例：我该不该主动一点'
					}
				]
			}
		},
		computed: {
			inputLength() {
				return this.inputText ? this.inputText.length : 0
			}
		},
		methods: {
			onStart() {
				const t = (this.inputText || '').trim()
				if (!t) {
					uni.showToast({ title: '请先输入内容', icon: 'none' })
					return
				}
				uni.navigateTo({
					url: `/pages/analyze-result/index?text=${encodeURIComponent(t)}`
				})
			},
			applyQuickStart(example) {
				this.inputText = example.slice(0, this.maxLen)
				uni.showToast({ title: '已填入示例', icon: 'none' })
			}
		}
	}
</script>

<style>
	.page {
		min-height: 100vh;
		box-sizing: border-box;
		background: #1a1c22;
		padding: 72rpx 40rpx 220rpx;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 16rpx;
		margin-bottom: 40rpx;
	}

	.page-title {
		font-size: 48rpx;
		font-weight: 700;
		color: #ffffff;
		line-height: 1.2;
	}

	.page-subtitle {
		font-size: 24rpx;
		color: #8e929e;
		line-height: 1.5;
	}

	.field {
		margin-bottom: 32rpx;
	}

	.field-label {
		display: block;
		font-size: 30rpx;
		color: #ffffff;
		font-weight: 600;
		margin-bottom: 16rpx;
	}

	.input-wrap {
		position: relative;
		border-radius: 24rpx;
		background: #252830;
		border: 1rpx solid rgba(120, 148, 204, 0.12);
		padding: 24rpx 24rpx 48rpx;
		box-sizing: border-box;
	}

	.input-area {
		width: 100%;
		min-height: 160rpx;
		font-size: 28rpx;
		color: #ffffff;
		line-height: 1.55;
		box-sizing: border-box;
	}

	.input-placeholder {
		color: #8e929e;
	}

	.char-count {
		position: absolute;
		right: 24rpx;
		bottom: 16rpx;
		font-size: 22rpx;
		color: #8e929e;
		line-height: 1;
	}

	.start-btn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 999rpx;
		border: none;
		background: linear-gradient(180deg, #5a7899 0%, #4a6288 100%);
		color: #141820;
		font-size: 32rpx;
		font-weight: 700;
		margin-bottom: 20rpx;
	}

	.hint-line {
		display: block;
		text-align: center;
		font-size: 20rpx;
		color: #8e929e;
		line-height: 1.55;
		margin-bottom: 48rpx;
	}

	.section-title {
		display: block;
		font-size: 32rpx;
		font-weight: 700;
		color: #ffffff;
		margin-bottom: 20rpx;
	}

	.quick-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		margin-bottom: 32rpx;
	}

	.quick-card {
		display: flex;
		align-items: center;
		gap: 20rpx;
		padding: 28rpx 24rpx;
		border-radius: 24rpx;
		background: #252830;
		border: 1rpx solid rgba(74, 144, 226, 0.18);
		box-sizing: border-box;
	}

	.quick-left {
		flex-shrink: 0;
	}

	.quick-icon {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		background: rgba(74, 144, 226, 0.35);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #5a96e3;
	}

	.sparkle-svg {
		width: 32rpx;
		height: 32rpx;
		display: block;
	}

	.quick-body {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 10rpx;
	}

	.quick-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #ffffff;
		line-height: 1.2;
	}

	.quick-desc {
		font-size: 24rpx;
		color: #8e929e;
		line-height: 1.4;
	}

	.quick-tag {
		align-self: flex-start;
		padding: 8rpx 18rpx;
		border-radius: 999rpx;
		background: rgba(255, 255, 255, 0.08);
		margin-top: 4rpx;
	}

	.quick-tag-text {
		font-size: 22rpx;
		color: #c5c8d0;
		line-height: 1;
	}

	.quick-chevron {
		flex-shrink: 0;
		font-size: 40rpx;
		color: #6b7078;
		line-height: 1;
	}

	.tip-box {
		display: flex;
		align-items: flex-start;
		gap: 16rpx;
		padding: 24rpx 22rpx;
		border-radius: 24rpx;
		background: #252830;
		border: 1rpx solid rgba(120, 148, 204, 0.1);
	}

	.tip-bulb {
		flex-shrink: 0;
		width: 44rpx;
		height: 44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #e8c44c;
	}

	.bulb-svg {
		width: 40rpx;
		height: 40rpx;
		display: block;
	}

	.tip-text {
		flex: 1;
		font-size: 20rpx;
		color: #8e929e;
		line-height: 1.6;
	}
</style>
