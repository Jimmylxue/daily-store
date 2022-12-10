export function dark() {
	const style = document.createElement('style')
	style.innerHTML = `
    html{
      background-color: '#fff';
      filter: invert(1);
    }
    img{
      filter: invert(1)
    }
  `
	document.head.appendChild(style)
}
