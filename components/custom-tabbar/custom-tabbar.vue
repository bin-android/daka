<template>
	<view class="tabbar-wrap">
		<view class="tabbar">
			<view
				v-for="item in tabs"
				:key="item.key"
				class="tabbar-item"
				:class="{ 'is-active': current === item.key }"
				@click="handleSwitch(item)"
			>
				<view class="tabbar-icon">
					<svg v-if="item.key === 'checkin'" viewBox="0 0 64 64" class="tabbar-svg">
						<path
							d="M32 6l6 14 14 6-14 6-6 14-6-14-14-6 14-6 6-14z"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linejoin="round"
						/>
						<path
							d="M18 44l-4 14 14-4"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
							opacity="0.9"
						/>
					</svg>

					<svg v-else-if="item.key === 'analyze'" viewBox="0 0 64 64" class="tabbar-svg">
						<path
							d="M18 46l-4 12 12-4 24-24-8-8-24 24z"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M38 18l8 8"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
						/>
					</svg>

					<svg v-else-if="item.key === 'records'" viewBox="0 0 64 64" class="tabbar-svg">
						<path
							d="M18 24a18 18 0 1 1 0 16"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M18 24v-10h10"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M32 22v12l8 4"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					<svg v-else viewBox="0 0 64 64" class="tabbar-svg">
						<circle cx="32" cy="24" r="10" fill="none" stroke="currentColor" stroke-width="3" />
						<path
							d="M14 54c3-10 11-16 18-16s15 6 18 16"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</view>

				<text class="tabbar-text">{{ item.label }}</text>
				<view class="tabbar-indicator" :class="{ 'is-active': current === item.key }" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CustomTabbar',
		props: {
			current: {
				type: String,
				default: 'checkin'
			}
		},
		data() {
			return {
				tabs: [
					{ key: 'checkin', label: '打卡', path: '/pages/index/index' },
					{ key: 'analyze', label: '测字', path: '/pages/analyze/index' },
					{ key: 'records', label: '记录', path: '/pages/records/index' },
					{ key: 'profile', label: '我的', path: '/pages/profile/index' }
				]
			}
		},
		methods: {
			handleSwitch(item) {
				if (!item || item.key === this.current) {
					return
				}
				uni.reLaunch({
					url: item.path
				})
			}
		}
	}
</script>

<style>
	.tabbar-wrap {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		padding-bottom: env(safe-area-inset-bottom);
		background: rgba(15, 22, 36, 0.96);
		border-top: 1rpx solid rgba(118, 145, 196, 0.24);
	}

	.tabbar {
		height: 104rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.tabbar-item {
		min-width: 120rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6rpx;
		opacity: 0.72;
	}

	.tabbar-item.is-active {
		opacity: 1;
	}

	.tabbar-icon {
		width: 44rpx;
		height: 44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(159, 178, 217, 0.8);
	}

	.tabbar-svg {
		width: 34rpx;
		height: 34rpx;
		display: block;
	}

	.tabbar-text {
		font-size: 22rpx;
		line-height: 1;
		color: rgba(159, 178, 217, 0.8);
	}

	.tabbar-item.is-active .tabbar-icon,
	.tabbar-item.is-active .tabbar-text {
		color: #6ea3ff;
		font-weight: 600;
	}

	.tabbar-indicator {
		width: 28rpx;
		height: 6rpx;
		border-radius: 3rpx;
		margin-top: 4rpx;
		background: transparent;
	}

	.tabbar-indicator.is-active {
		background: #6ea3ff;
	}
</style>
