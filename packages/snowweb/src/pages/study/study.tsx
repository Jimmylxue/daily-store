import { FC } from 'react'
import { DependenciesBug } from './dependencies_bug'
import { EffectEventDemo } from './useEffectEvent'

export const Study: FC = () => {
	return (
		<div>
			<EffectEventDemo></EffectEventDemo>
			<DependenciesBug></DependenciesBug>
		</div>
	)
}
