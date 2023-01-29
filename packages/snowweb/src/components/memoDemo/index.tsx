import { memo, useState } from 'react'

/**
 * 在这个 Demo 中， 虽然我们加了 memo 试图实现性能优化，减少重新渲染的次数， 但是实际上当 state 变化的时候  每个被 memo 的子组件都是会重新触发渲染。
 *  原因是因为，每次重新渲染时，会比较props的变化， 因为 handle 是每次重新创建的一个函数， 而重新创建的函数他们在内存中的地址都是不同的
 *  所以经过比对之后，还是会触发重新渲染。
 *
 * 所以 memo 并不是随意使用的，这个例子中我们用了memo, 导致的结果就是，他还是会重新渲染，相反还给整个组件增加了一个需要比对的负担。
 *
 * memo的概念：
 *  没有使用memo的时候，每次比较props采用的是全等比较，比较高效，但是不容易命中性能优化
 *  使用memo之后，采用的是浅比较，不搞笑，但是更加容易命中性能优化
 *    浅比较：需要比较props对象中的每一个key 所对应的 value 是否一样
 *    全等比较： 直接比较前后两个props是否是同一个props
 */

const Item = memo(
	({
		name,
		data,
		handle,
	}: {
		name: string
		data: number
		handle: () => void
	}) => {
		console.log('name:', name, 'data', data)
		return (
			<div>
				<p>{name}</p>
				<p>{data}</p>
			</div>
		)
	}
)

export default function () {
	const [num1, setNum1] = useState(0)
	const [num2, _] = useState(0)

	const handleAdd = () => {
		setNum1(num1 + 1)
	}

	return (
		<div>
			<button onClick={handleAdd}>add</button>
			<Item name="item1" data={num1} handle={handleAdd} />
			<Item name="item2" data={num2} handle={handleAdd} />
		</div>
	)
}
