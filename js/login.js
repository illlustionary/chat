const loginIdValidator = new ValidateField('#txtLoginId', val => {
	if (!val) return '请输入账号'
})

const loginPwdValidator = new ValidateField('#txtLoginPwd', val => {
	if (!val) return '请输入密码'
})

const form = document.querySelector('.user-form')

form.onsubmit = async e => {
	e.preventDefault()
	const res = await ValidateField.validate(loginIdValidator, loginPwdValidator)
	if (res.every(r => r)) {
		const formData = Object.fromEntries(new FormData(form).entries())
		const data = await API.login(formData)
		if (data.code === 0) {
			alert('登录成功,点击确定跳转到主页')
			location.href = './index.html'
		}
	}
}
