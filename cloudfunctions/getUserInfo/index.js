// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

function isGenericNick(nickName) {
  if (!nickName) return true
  const n = String(nickName).trim().toLowerCase()
  return n === '微信用户' || n === 'wechat user' || n === 'wx user' || n === '用户'
}

// 云函数入口函数
exports.main = async (event) => {
  const action = event && event.action ? event.action : 'get'
  const wxContext = cloud.getWXContext()
  const openId = wxContext.OPENID
  const db = cloud.database()
  const users = db.collection('users')
  const now = Date.now()

  try {
    if (action === 'upsert') {
      let nickName = event && event.nickName ? String(event.nickName).trim() : ''
      const avatarUrl = event && event.avatarUrl ? String(event.avatarUrl).trim() : ''

      const current = await users.where({ _openid: openId }).limit(1).get()
      const currentUser = current.data && current.data.length > 0 ? current.data[0] : null

      // 昵称保护：当本次拿到的是通用/降级昵称时，不覆盖已有更优昵称
      if ((!nickName || isGenericNick(nickName)) && currentUser && currentUser.nickName && !isGenericNick(currentUser.nickName)) {
        nickName = currentUser.nickName
      }

      if (!nickName) {
        return {
          code: -1,
          msg: 'nickName required',
          data: null
        }
      }

      const payload = {
        nickName,
        avatarUrl: avatarUrl || (currentUser && currentUser.avatarUrl) || '',
        updatedAt: now
      }

      if (currentUser) {
        await users.doc(currentUser._id).update({
          data: payload
        })
      } else {
        await users.add({
          data: {
            ...payload,
            createdAt: now
          }
        })
      }
    }

    const latest = await users.where({ _openid: openId }).limit(1).get()
    return {
      code: 0,
      msg: 'success',
      data: {
        openId,
        userInfo: latest.data && latest.data.length > 0 ? latest.data[0] : null
      }
    }
  } catch (err) {
    return {
      code: -1,
      msg: err.message || 'cloud function error',
      data: null
    }
  }
}