const btn = document.querySelector('button')

let theme = localStorage.getItem('dz-theme') || 'light'
document.documentElement.dataset.theme = theme

btn.addEventListener('click', () => {
	const newTheme = theme === 'light' ? 'dark' : 'light'
	document.documentElement.dataset.theme = newTheme
	theme = newTheme
	localStorage.setItem('dz-theme', newTheme)
})
