//通用验证器

class ValidateField {
	constructor(selector, validateFn) {
		this.input = $(selector)
		this.p = $(selector).nextElementSibling
		this.input.onblur = () => this.validate()
		this.validateFn = validateFn
	}

	//表单项验证
	async validate() {
		const err = await this.validateFn(this.input.value)
		if (err) {
			this.p.innerText = err
			return false
		}
		this.p.innerText = ''
		return true
	}

	//验证所有表单项
	static async validate(...validators) {
		return Promise.all(validators.map(r => r.validate()))
	}
}
