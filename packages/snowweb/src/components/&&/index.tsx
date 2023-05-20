import { activityId } from './const'

export function TestDemo() {
	return (
		<div className=" flex mt-5 ml-5">
			<p>hello world</p>
			<p className="ml-5">{!!activityId && <div>吉米</div>}</p>
			{/* {0} */}
			{null}
			{undefined}
			{false}
			{/* 当 activityId 存在的时候 渲染 这个 div 标签 */}
			<p className="ml-5">{activityId ? <div>吉米</div> : null}</p>
		</div>
	)
}
