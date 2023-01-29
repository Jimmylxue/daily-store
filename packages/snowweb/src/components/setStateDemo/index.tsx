import { Component, PureComponent, useEffect, useState } from 'react'

// export default function SetStateDemo() {
// 	const [number, setNumber] = useState(0)

// 	const addNumber = () => {
// 		const newValue = number + 1
// 		setNumber(newValue)
// 		console.log(number)
// 	}

// 	useEffect(() => {
// 		document
// 			.getElementById('outside_react')
// 			?.addEventListener('click', addNumber)
// 	}, [])

// 	useEffect(() => {
// 		console.log('变化了')
// 	}, [number])

// 	return (
// 		<div>
// 			<p>当前值：{number}</p>
// 			<button onClick={addNumber}>react控制</button>
// 			<br />
// 			<button id="outside_react">非react控制</button>
// 		</div>
// 	)
// }

export default class SetStateDemo extends Component {
	state = {
		number: 0,
	}

	onClick() {
		console.log(this)
		this.setState({
			number: this.state.number + 1,
		})
		alert(this.state.number)
		console.log('comming', this.state)
	}

	componentDidMount(): void {
		document
			.getElementById('outside_react')
			?.addEventListener('click', this.onClick.bind(this))
	}

	render() {
		const number = this.state.number
		const onClick = this.onClick
		return (
			<div>
				<p>当前值：{number}</p>
				<button onClick={onClick.bind(this)}>react控制</button>
				<br />
				<button id="outside_react">非react控制</button>
			</div>
		)
	}
}
