import { Button, Input, message } from 'antd'
import {
	FC,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

const AwesomeInput: FC<any> = forwardRef((props, ref) => {
	const [text, setText] = useState<string>('')

	const showText = () => {
		message.success(text)
	}

	useImperativeHandle(ref, () => {
		return { showText }
	})

	return (
		<>
			<Input
				value={text}
				onChange={val => {
					setText(val.target.value)
					// console.log(val)
				}}
			/>
			<Button onClick={showText}>输出内容</Button>
		</>
	)
})

/**
 * forwardRef can create component level ref, which can use by parent component
 *
 * like this demo:
 *
 *  parent component can get children component inside function by ref
 *  this is useful in some case! so learn it!
 */

export const ForwardRefDemo: FC = () => {
	const awesomeInput = useRef<{
		showText: () => void
	}>(null)

	useEffect(() => {
		if (awesomeInput) {
			// @ts-ignore
			console.log(awesomeInput.current.showText)
		}
	}, [awesomeInput])

	return (
		<>
			<Button
				onClick={() => {
					console.log(awesomeInput.current?.showText)
					awesomeInput.current?.showText()
				}}
			>
				父组件展示
			</Button>
			<AwesomeInput ref={awesomeInput} />
		</>
	)
}
