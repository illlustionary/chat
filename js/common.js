const $ = selector => document.querySelector(selector)

const $$ = selector => document.querySelectorAll(selector)

const $$$ = tagName => document.createElement(tagName)

//时间戳 => 日期
const timestampToDate = timestamp => {
	const date = new Date(timestamp)
	const year = date.getFullYear()
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const day = date.getDay().toString().padStart(2, '0')
	const hour = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	const seconds = date.getSeconds().toString().padStart(2, '0')
	return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}
