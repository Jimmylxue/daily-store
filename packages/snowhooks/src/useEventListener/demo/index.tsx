import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import useEventListener from '..'
export default function UseEventListenerDemo() {
	const ref = useRef(null)

	// useEventListener(
	// 	'click',
	// 	() => {
	// 		console.log('document say hello world')
	// 	},
	// 	{
	// 		target: document,
	// 	}
	// )

	// const [] = useState<any>(null)

	// useEffect(()=>{

	// },[])

	useEventListener(
		'click',
		() => {
			console.log('DOM say hello world')
		},
		{
			target: document.getElementById('eventListenerDOM'),
			// target: ref,
		}
	)

	// useEffect(() => {
	// 	console.log('demo', document.getElementById('eventListenerDOM'))
	// }, [])

	return (
		<div>
			<div id="eventListenerDOM">DOM TEST</div>
			<div ref={ref}>DOMRef TEST</div>
		</div>
	)
}
