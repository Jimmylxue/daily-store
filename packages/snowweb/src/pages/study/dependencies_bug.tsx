import { Button, message, Switch } from 'antd'
import { FC, useEffect, useState } from 'react'

interface TProps {
	theme: 'Light' | 'Dark'
}

const BugForm: FC<TProps> = ({ theme }) => {
	const [isSubmit, setIsSubmit] = useState<boolean>(false)

	/**
	 * 典型的一个错误用法：我们虽然依照了，useEffect中用了什么变量，就往 dependencies 中加入该变量，以规避一些闭包陷阱。
	 *  但是这个功能实现的方式是个错误的方式，因为这样写的话，如果dependencies 中的其他变量变化也会触发hook的执行，（这点与我们正确业务流程不同，正确的流程只有在按钮点击的时候才会执行）
	 *
	 *  所以这种事件类型的业务实现就不应该依赖于 react 的useEffect钩子来实现。应该直接在事件中执行才是正确的实现流程
	 */

	useEffect(() => {
		if (isSubmit) {
			FetchData()
			showNotification('已经触发网络请求了', theme)
		}
	}, [isSubmit, theme])

	const handleSubmit = () => {
		// setIsSubmit(true)
		FetchData()
		showNotification('已经触发网络请求了', theme)
	}

	const FetchData = () => {
		console.log('发起网络请求了')
	}

	const showNotification = (text: string, theme: 'Light' | 'Dark') => {
		if (theme === 'Light') {
			message.success(text)
		} else {
			message.info(text)
		}
	}

	return (
		<div>
			<Button onClick={handleSubmit}>提交</Button>
		</div>
	)
}

export const DependenciesBug: FC = () => {
	const [theme, setTheme] = useState<'Light' | 'Dark'>('Light')
	return (
		<div>
			<p>当前主题：{theme}</p>
			<Switch
				checked={theme === 'Light'}
				onClick={() =>
					setTheme(theme => (theme === 'Light' ? 'Dark' : 'Light'))
				}
			/>
			<BugForm theme={theme}></BugForm>
		</div>
	)
}
