const API = (() => {
	const BASE_URL = 'https://study.duyiedu.com'
	const TOKEN_NAME = 'token'

	const userInfo = {
		loginId: 'account',
		loginPwd: '12345',
		nickname: 'niganma',
	}

	const existToken = () => {
		const token = localStorage.getItem(TOKEN_NAME)
		if (token) return `Bearer ${token}`
	}

	const get = async url => {
		const headers = {
			'content-type': 'application/json',
		}
		headers.authorization = existToken()
		const resp = await fetch(`${BASE_URL}${url}`, {
			headers,
		})
		return await resp.json()
	}

	const post = async (url, requestBody) => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: existToken(),
		}
		return await fetch(`${BASE_URL}${url}`, {
			headers,
			method: 'post',
			body: JSON.stringify(requestBody),
		})
	}

	//注册
	const register = async userInfo => {
		const resp = await post('/api/user/reg', userInfo)
		return await resp.json()
	}

	// 登录
	const login = async userInfo => {
		const resp = await post('/api/user/login', userInfo)
		const result = await resp.json()

		if (result.code === 0) {
			const token = resp.headers.get('authorization')
			localStorage.setItem(TOKEN_NAME, token)
		}
		return result
	}

	// 登出
	const logout = () => {
		localStorage.removeItem(TOKEN_NAME)
	}

	//是否存在账号
	const isExistAccount = async loginId => {
		return await get(`/api/user/exists?loginId=${loginId}`)
	}

	//获取用户信息
	const getProfile = async () => {
		return await get('/api/user/profile')
	}

	// 发送聊天内容
	const sendMessage = async content => {
		const resp = await post('/api/chat', { content })
		return await resp.json()
	}

	// 获取聊天记录
	const getHistoryMessage = async () => {
		return await get('/api/chat/history')
	}

	// const resp = await login(userInfo)
	// const resp = await sendMessage({ content: '蔡徐坤是谁' }, authorization)
	// const resp = getHistoryMessage(authorization)
	return {
		register,
		login,
		logout,
		getProfile,
		isExistAccount,
		sendMessage,
		getHistoryMessage,
	}
})()
