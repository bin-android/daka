import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import fs from 'fs-extra' // fs-extra 为第三方依赖，需要安装
import path from 'path'

const plugins = [uni()]

// 仅微信小程序生效
if (process.env.UNI_PLATFORM === 'mp-weixin') {
  plugins.push({
    name: 'copy-cloudfunctions',
    buildStart() {
      fs.copySync(
        path.join(process.env.UNI_INPUT_DIR, 'cloudfunctions'),
        path.join(process.env.UNI_OUTPUT_DIR, 'cloudfunctions')
      )
    },
  })
}

export default defineConfig({
  plugins,
})
