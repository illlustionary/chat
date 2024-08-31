const loginIdValidator = new ValidateField('#txtLoginId', async val => {
	if (!val) return '请输入账号'
	const res = await API.isExistAccount(val)
	if (res.data) return '账号已存在'
})

const nicknameValidator = new ValidateField('#txtNickname', val => {
	if (!val) return '请输入昵称'
})

const loginPwdValidator = new ValidateField('#txtLoginPwd', val => {
	if (!val) return '请输入密码'
	if (val !== loginPwdConfirmValidator.input.value) return '两次密码不一致'
})

const loginPwdConfirmValidator = new ValidateField('#txtLoginPwdConfirm', val => {
	if (!val) return '请确认密码'
	if (val !== loginPwdValidator.input.value) return '两次密码不一致'
})

const form = document.querySelector('.user-form')

form.onsubmit = async e => {
	e.preventDefault()
	const res = await ValidateField.validate(
		loginIdValidator,
		nicknameValidator,
		loginPwdValidator,
		loginPwdConfirmValidator
	)
	if (res.every(r => r)) {
		const formData = Object.fromEntries(new FormData(form).entries())
		const data = await API.register(formData)
		if (data.code === 0) {
			alert('注册成功,点击确定前往登录页')
			location.href = './login.html'
		}
	}
}
