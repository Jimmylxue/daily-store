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

	useEventListener(
		'click',
		() => {
			console.log('DOM_FN say hello world')
		},
		{
			target: () => document.getElementById('eventListenerDOM_FN'),
		}
	)

	useEffect(() => {
		setDom(document.getElementById('eventListenerDOM'))
	}, [])

	return (
		<div>
			<div id="eventListenerDOM">DOM TEST</div>
			<div id="eventListenerDOM_FN">FNDOM TEST</div>
			<div ref={ref}>DOMRef TEST</div>
		</div>
	)
}
