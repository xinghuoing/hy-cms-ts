let BASE_URL = ''
const TIME_OUT = 10000

// 是否为开发环境
if (import.meta.env.DEV) {
  BASE_URL = 'http://localhost:8880'
} else if (import.meta.env.PROD) {
  // 是否为生成环境
  BASE_URL = 'http://47.97.57.214:80'
} else {
  BASE_URL = 'https://coderwhy.org.test'
}

export { BASE_URL, TIME_OUT }
