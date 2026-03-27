<template>
	<view class="page">
		<view class="user">
			<image class="avatar" :src="displayAvatar" mode="aspectFill" />
			<text class="user-name">{{ displayName }}</text>
			<text class="user-join">{{ joinText }}</text>
			<view class="guest-switch-btn" @click="handleSwitchGuestView">
				<text class="guest-switch-text">切换访客视角</text>
			</view>
		</view>

		<view class="stats-row">
			<view class="stat-card">
				<view class="stat-icon">
					<svg viewBox="0 0 64 64" class="svg-icon">
						<path
							d="M32 6c5 0 10 4 10 10v10l9 7c3 2 3 7-1 9L32 62 3 42c-4-2-4-7-1-9l9-7V16C11 10 16 6 21 6h11z"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M21 19h22"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
						/>
						<path
							d="M26 44l5 5 12-15"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</view>
				<text class="stat-value">{{ streakDays }}</text>
				<text class="stat-label">连续打卡</text>
			</view>

			<view class="stat-card">
				<view class="stat-icon">
					<svg viewBox="0 0 64 64" class="svg-icon">
						<circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" stroke-width="3" />
						<path
							d="M32 16v16l10 6"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</view>
				<text class="stat-value">{{ totalChecks }}</text>
				<text class="stat-label">总打卡数</text>
			</view>

			<view class="stat-card">
				<view class="stat-icon">
					<svg viewBox="0 0 64 64" class="svg-icon">
						<path
							d="M38 4L18 34h14l-4 26 24-34H38l0-22z"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</view>
				<text class="stat-value">{{ energyValue }}</text>
				<text class="stat-label">能量值</text>
			</view>
		</view>

		<view class="action-row">
			<view class="outline-card" @click="handleRecords">
				<view class="outline-icon">
					<svg viewBox="0 0 64 64" class="svg-icon">
						<path
							d="M20 18c5-6 14-8 22-4 8 3 12 12 10 20-2 9-11 15-20 13-6-1-11-5-13-10"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M20 18v10h10"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</view>
				<text class="outline-text">我的记录</text>
			</view>

			<view class="outline-card" @click="handleBackHome">
				<view class="outline-icon">
					<svg viewBox="0 0 64 64" class="svg-icon">
						<path
							d="M10 28l22-18 22 18v28H10V28z"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M32 34h10v22H32V34z"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</view>
				<text class="outline-text">返回首页</text>
			</view>
		</view>

		<view class="section-title-row">
			<text class="section-title">AI人格偏好</text>
			<text class="section-right">{{ persona }}</text>
		</view>
		<text class="section-subdesc">更像轻轻捏住情绪的陪伴者。</text>

		<view class="member-card">
			<view class="member-title-row">
				<view class="member-icon">
					<svg viewBox="0 0 64 64" class="svg-icon">
						<path
							d="M18 22h28l-4 30H22l-4-30z"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M18 22l14-14 14 14"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</view>
				<text class="member-title">基础版</text>
			</view>
			<button class="member-btn" @click="handleUpgrade">升级会员</button>
		</view>

		<view class="notice-card">
			<view class="notice-left">
				<view class="notice-icon">
					<svg viewBox="0 0 64 64" class="svg-icon">
						<path
							d="M22 44c2 4 6 6 10 6s8-2 10-6"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M22 44V28c0-6 4-12 10-12s10 6 10 12v16l6 6H16l6-6z"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</view>
				<view class="notice-texts">
					<text class="notice-title">消息通知</text>
					<text class="notice-desc">按每天打卡提醒</text>
				</view>
			</view>
			<switch :checked="noticeEnabled" @change="handleNoticeToggle" />
		</view>

		<view class="list">
			<view class="list-item" @click="handleAbout">
				<view class="list-icon">
					<svg viewBox="0 0 64 64" class="svg-icon">
						<path
							d="M18 34l16-22 12 16-8 26-20 0 0-20z"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M46 12l6 3"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
						/>
					</svg>
				</view>
				<text class="list-text">关于打卡有光</text>
				<text class="list-arrow">›</text>
			</view>

			<view class="list-item" @click="handleFeedback">
				<view class="list-icon">
					<svg viewBox="0 0 64 64" class="svg-icon">
						<circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" stroke-width="3" />
						<path
							d="M28 26c0-3 2-6 6-6s6 3 6 6c0 5-6 6-6 11"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
						/>
						<circle cx="34" cy="44" r="2.5" fill="currentColor" />
					</svg>
				</view>
				<text class="list-text">帮助与反馈</text>
				<text class="list-arrow">›</text>
			</view>
		</view>

		<custom-tabbar current="profile" />
	</view>
</template>

<script>
	import CustomTabbar from '@/components/custom-tabbar/custom-tabbar.vue'
	import { callCloud } from '@/utils/cloud.js'
	export default {
		components: {
			CustomTabbar
		},
		data() {
			return {
				isGuest: true,
				displayName: '游客',
				joinText: '未登录',
				defaultAvatarUrl: '/static/profile/head.png',
				displayAvatar: '/static/profile/head.png',
				persona: '温柔',
				streakDays: 5,
				totalChecks: 18,
				energyValue: 1280,
				noticeEnabled: false
			}
		},
		onShow() {
			this.loadUserProfile()
		},
		methods: {
			async loadUserProfile() {
				// #ifndef MP-WEIXIN
				this.isGuest = true
				this.displayName = '游客'
				this.joinText = '未登录'
				this.displayAvatar = this.defaultAvatarUrl
				// #endif

				// #ifdef MP-WEIXIN
				try {
					const res = await callCloud('getUserInfo', { action: 'get' })
					const userInfo = (res && res.data && res.data.userInfo) || (res && res.userInfo) || null
					if (userInfo && userInfo.nickName) {
						this.isGuest = false
						this.displayName = userInfo.nickName
						this.joinText = '已授权登录'
						this.displayAvatar = userInfo.avatarUrl || this.defaultAvatarUrl
					} else {
						this.isGuest = true
						this.displayName = '游客'
						this.joinText = '未登录'
						this.displayAvatar = this.defaultAvatarUrl
					}
				} catch (e) {
					this.isGuest = true
					this.displayName = '游客'
					this.joinText = '未登录'
					this.displayAvatar = this.defaultAvatarUrl
				}
				// #endif
			},
			handleSwitchGuestView() {
				// #ifndef MP-WEIXIN
				uni.showToast({ title: '请在微信小程序中授权登录', icon: 'none' })
				// #endif

				// #ifdef MP-WEIXIN
				if (typeof uni.getUserProfile !== 'function') {
					uni.showToast({ title: '当前微信版本不支持授权接口', icon: 'none' })
					return
				}
				uni.getUserProfile({
					desc: '用于完善会员资料',
					success: async (res) => {
						console.log('[profile] getUserProfile success', res)
						try {
							const info = res && res.userInfo ? res.userInfo : {}
							const rawNickName = info.nickName ? String(info.nickName).trim() : ''
							const rawAvatarUrl = info.avatarUrl ? String(info.avatarUrl).trim() : ''
							if (!rawNickName) {
								uni.showToast({ title: '未获取到昵称，请重试', icon: 'none' })
								return
							}
							const saveRes = await callCloud('getUserInfo', {
								action: 'upsert',
								nickName: rawNickName,
								avatarUrl: rawAvatarUrl
							})
							console.log('[profile] upsert user result', saveRes)
							const isUpsertSuccess = !!(saveRes && saveRes.code === 0)
							const savedUser = saveRes && saveRes.data ? saveRes.data.userInfo : null
							if (isUpsertSuccess) {
								uni.showToast({ title: '登录成功', icon: 'none' })
								this.isGuest = false
								this.displayName = (savedUser && savedUser.nickName) || rawNickName
								this.joinText = '已授权登录'
								this.displayAvatar = (savedUser && savedUser.avatarUrl) || rawAvatarUrl || this.defaultAvatarUrl
								this.loadUserProfile()
							} else {
								const errMsg = saveRes && saveRes.msg ? saveRes.msg : '登录失败，请稍后重试'
								uni.showToast({ title: errMsg.slice(0, 20), icon: 'none' })
							}
						} catch (e) {
							console.error('[profile] upsert user failed', e)
							uni.showToast({ title: '登录失败，请稍后重试', icon: 'none' })
						}
					},
					fail: (err) => {
						console.error('[profile] getUserProfile failed', err)
						const msg = err && err.errMsg ? err.errMsg : '授权失败'
						if (msg.indexOf('auth deny') > -1 || msg.indexOf('auth denied') > -1) {
							uni.showToast({ title: '你已取消授权', icon: 'none' })
							return
						}
						uni.showToast({ title: msg.slice(0, 20), icon: 'none' })
					}
				})
				// #endif
			},
			handleRecords() {
				uni.showToast({ title: '我的记录占位', icon: 'none' })
			},
			handleBackHome() {
				uni.reLaunch({ url: '/pages/index/index' })
			},
			handleUpgrade() {
				uni.showToast({ title: '升级会员占位', icon: 'none' })
			},
			handleNoticeToggle(e) {
				this.noticeEnabled = !!(e && e.detail && e.detail.value)
			},
			handleAbout() {
				uni.showToast({ title: '关于打卡有光占位', icon: 'none' })
			},
			handleFeedback() {
				uni.showToast({ title: '帮助与反馈占位', icon: 'none' })
			}
		}
	}
</script>

<style>
	.page {
		min-height: 100vh;
		box-sizing: border-box;
		background: radial-gradient(circle at 50% 0%, rgba(85, 134, 220, 0.18) 0%, rgba(10, 18, 34, 1) 55%);
		color: #dbe7ff;
		padding: 78rpx 44rpx 80rpx;
	}

	.user {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 18rpx;
	}

	.avatar {
		width: 112rpx;
		height: 112rpx;
		border-radius: 50%;
		border: 3rpx solid rgba(255, 255, 255, 0.9);
		background-color: #1f2635;
	}

	.user-name {
		font-size: 44rpx;
		font-weight: 700;
		color: #edf3ff;
		line-height: 1;
	}

	.user-join {
		font-size: 24rpx;
		color: rgba(217, 228, 255, 0.7);
		line-height: 1;
	}

	.guest-switch-btn {
		margin-top: 4rpx;
		padding: 10rpx 20rpx;
		border-radius: 999rpx;
		border: 1rpx solid rgba(120, 148, 204, 0.4);
		background: rgba(47, 67, 108, 0.18);
	}

	.guest-switch-text {
		font-size: 22rpx;
		line-height: 1;
		color: #9fb2d9;
	}

	.stats-row {
		margin-top: 46rpx;
		display: flex;
		gap: 24rpx;
	}

	.stat-card {
		flex: 1;
		height: 152rpx;
		border-radius: 22rpx;
		background: rgba(47, 67, 108, 0.28);
		border: 1rpx solid rgba(120, 148, 204, 0.12);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		padding: 30rpx 10rpx;
	}

	.stat-icon {
		width: 56rpx;
		height: 56rpx;
		border-radius: 18rpx;
		background: rgba(30, 72, 150, 0.28);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #80aef6;
	}

	.svg-icon {
		width: 38rpx;
		height: 38rpx;
		display: block;
	}

	.stat-value {
		font-size: 44rpx;
		font-weight: 700;
		color: #edf3ff;
		line-height: 1;
	}

	.stat-label {
		font-size: 24rpx;
		color: rgba(217, 228, 255, 0.75);
		line-height: 1;
		margin-top: 6rpx;
	}

	.action-row {
		margin-top: 24rpx;
		display: flex;
		gap: 22rpx;
	}

	.outline-card {
		flex: 1;
		height: 96rpx;
		border-radius: 24rpx;
		border: 1rpx solid rgba(120, 148, 204, 0.22);
		background: rgba(47, 67, 108, 0.12);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 14rpx;
		color: rgba(217, 228, 255, 0.9);
		padding: 20rpx 8rpx;
	}

	.outline-icon {
		width: 44rpx;
		height: 44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #9fb2d9;
	}

	.outline-text {
		font-size: 28rpx;
		font-weight: 600;
		color: #dbe7ff;
	}

	.section-title-row {
		margin-top: 56rpx;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
	}

	.section-title {
		font-size: 34rpx;
		font-weight: 700;
		color: #edf3ff;
	}

	.section-right {
		font-size: 24rpx;
		color: #7a8bd1;
	}

	.section-subdesc {
		margin-top: 28rpx;
		display: block;
		font-size: 18rpx;
		color: rgba(217, 228, 255, 0.6);
		line-height: 1.6;
	}

	.member-card {
		margin-top: 26rpx;
		border-radius: 24rpx;
		background: rgba(47, 67, 108, 0.25);
		border: 1rpx solid rgba(120, 148, 204, 0.18);
		padding: 34rpx 30rpx;
	}

	.member-title-row {
		display: flex;
		align-items: center;
		gap: 18rpx;
	}

	.member-icon {
		width: 56rpx;
		height: 56rpx;
		border-radius: 18rpx;
		background: rgba(30, 72, 150, 0.28);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #80aef6;
	}

	.member-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #edf3ff;
	}

	.member-btn {
		margin-top: 22rpx;
		height: 74rpx;
		line-height: 74rpx;
		border-radius: 999rpx;
		background: #6ea3ff;
		color: #0d1a32;
		border: none;
		font-size: 30rpx;
		font-weight: 700;
	}

	.notice-card {
		margin-top: 24rpx;
		border-radius: 24rpx;
		background: rgba(47, 67, 108, 0.18);
		border: 1rpx solid rgba(120, 148, 204, 0.14);
		padding: 28rpx 28rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 18rpx;
	}

	.notice-left {
		display: flex;
		align-items: center;
		gap: 18rpx;
	}

	.notice-icon {
		width: 56rpx;
		height: 56rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #9fb2d9;
	}

	.notice-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #edf3ff;
		line-height: 1;
	}

	.notice-desc {
		margin-top: 12rpx;
		display: block;
		font-size: 24rpx;
		color: rgba(217, 228, 255, 0.6);
		line-height: 1.2;
	}

	.list {
		margin-top: 34rpx;
	}

	.list-item {
		height: 84rpx;
		display: flex;
		align-items: center;
		gap: 18rpx;
		border-bottom: 1rpx solid rgba(120, 148, 204, 0.2);
	}

	.list-item:last-child {
		border-bottom: none;
	}

	.list-icon {
		width: 40rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #8ea3cf;
	}

	.list-text {
		font-size: 26rpx;
		color: rgba(217, 228, 255, 0.9);
		flex: 1;
	}

	.list-arrow {
		font-size: 40rpx;
		color: rgba(217, 228, 255, 0.35);
		margin-right: 4rpx;
	}
</style>
