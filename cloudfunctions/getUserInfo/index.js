// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

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
      const nickName = event && event.nickName ? String(event.nickName).trim() : ''
      const avatarUrl = event && event.avatarUrl ? String(event.avatarUrl).trim() : ''

      if (!nickName) {
        return {
          code: -1,
          msg: 'nickName required',
          data: null
        }
      }

      const current = await users.where({ _openid: openId }).limit(1).get()
      const payload = {
        nickName,
        avatarUrl,
        updatedAt: now
      }

      if (current.data && current.data.length > 0) {
        await users.doc(current.data[0]._id).update({
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
    console.error(err)
    return {
      code: -1,
      msg: err.message || 'cloud function error',
      data: null
    }
  }
}