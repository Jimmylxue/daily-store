import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import useEventListener from '..'
export default function UseEventListenerDemo() {
	const ref = useRef(null)
	const [dom, setDom] = useState<any>()

	useEventListener(
		'click',
		() => {
			console.log('DOM say hello world')
		},
		{
			target: dom,
			// target: ref,
		}
	)

	useEventListener(
		'click',
		() => {
			console.log('Ref say hello world')
		},
		{
			target: ref,
		}
	)

	useEventListener(
		'click',
		() => {
			console.log('Window say hello world')
		},
		{
			once: true,
		}
	)

	useEffect(() => {
		setDom(document.getElementById('eventListenerDOM'))
	}, [])

	return (
		<div>
			<div id="eventListenerDOM">DOM TEST</div>
			<div ref={ref}>DOMRef TEST</div>
		</div>
	)
}
