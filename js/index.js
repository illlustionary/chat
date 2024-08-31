class ChatPage {
	constructor() {
		this.doms = {
			nickname: $('#nickname'),
			loginId: $('#loginId'),
			chatContainer: $('.chat-container'),
			input: $('#txtMsg'),
			send: $('button'),
			MsgContainer: $('.msg-container'),
			close: $('.close'),
		}
	}

	// 获取用户信息
	initUserInfo = async () => {
		const res = await API.getProfile()
		if (res.code !== 0) {
			alert('账号未登录,请登录')
			location.href = './login.html'
			return
		}
		this.userInfo = res.data
		this.doms.nickname.innerText = res.data.nickname
		this.doms.loginId.innerText = res.data.loginId
	}

	// 退出登录
	logout = () => {
		if (window.confirm('是否退出登录')) {
			location.href = './login.html'
			API.logout()
		}
	}

	// 获取聊天历史记录
	getHistory = async () => {
		const res = await API.getHistoryMessage()
		return res.data
	}

	// 生成一条聊天记录
	generateMessage = message => {
		if (!message) return
		const div = $$$('div')
		const content = $$$('div')
		div.className = 'chat-content'
		content.innerText = message.content
		const img = $$$('img')
		img.className = 'chat-avatar'
		const date = $$$('div')
		date.className = 'chat-date'
		date.innerText = timestampToDate(message.createdAt)
		if (message.from) {
			div.className = 'chat-item me'
			img.src = './asset/avatar.png'
		} else {
			div.className = 'chat-item'
			img.src = './asset/robot-avatar.jpg'
		}
		div.appendChild(img)
		div.appendChild(content)
		div.appendChild(date)
		this.doms.chatContainer.appendChild(div)
		this.scrollBottom()
	}

	// 初始化聊天记录
	initHistoryMessage = async () => {
		this.doms.chatContainer.innerHTML = ''
		const messageArr = await this.getHistory()
		messageArr.forEach(message => this.generateMessage(message))
		this.scrollBottom()
	}

	// 滚动到底部
	scrollBottom = () => {
		this.doms.chatContainer.scrollTo({
			top: this.doms.chatContainer.scrollHeight,
			behavior: 'auto',
		})
	}

	//发送信息
	sendMessage = async e => {
		e.preventDefault()
		const content = this.doms.input.value
		if (!content) return
		const message = {
			createdAt: Date.now(),
			from: this.userInfo.loginId,
			content,
		}
		this.generateMessage(message)
		this.doms.input.value = ''
		const res = await API.sendMessage(content)
		this.generateMessage(res.data)
	}

	//初始化事件
	initEvent = () => {
		this.doms.MsgContainer.onsubmit = this.sendMessage
		this.doms.close.onclick = this.logout
	}

	// 初始化
	init = () => {
		this.initUserInfo()
		this.initHistoryMessage()
		this.initEvent()
	}
}

const chatPage = new ChatPage()
chatPage.init()
