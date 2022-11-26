import { TSnowConfig } from 'src/types'

export let snowTinyConfig: TSnowConfig | null

export function setState(config: TSnowConfig) {
	snowTinyConfig = config
}
