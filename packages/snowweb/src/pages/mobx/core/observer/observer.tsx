import { FC, useEffect, useRef, useState } from 'react'
import { autoRun } from '../reactive/reactive'

export function Observer(fnComponent: FC): any {
	return () => {
		const ref = useRef()
		const [_, setData] = useState(0)
		useEffect(() => {
			autoRun(() => {
				// @ts-ignore
				ref.current = fnComponent()
				setData(data => data + 1)
			})
		}, [])
		return ref.current
	}
}
