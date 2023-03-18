# compose

compose chinese mean is 组合, it's an depend on function can be an argument and return value in function, which is functional programming(函数式编程)

we can ease to understand it as follow:

```ts
compose(f, g)(x) = f(g(x))
```

compose return value is still an function!

there is an easy demo, how can we do can make an elephant(大象) into refrigerator(冰箱)? we should do three step:

- open refrigerator door
- put refrigerator into refrigerator
- close door of refrigerator

so we can write some code in simple thinking：

```ts
function openDoor() {}

function putAnimal(animal) {}

function closeDoor() {}
```

we can write this to realize it:

```ts
openDoor()
putAnimal('elephant')
closeDoor()
```

above(以上) is an normal thinking, but if we think from functional programming, we can use compose to realize it!

```ts
function compose(a, b, c) {
	return function (d) {
		a(b(c(d)))
	}
}

compose(closeDoor, putAnimal, openDoor)('elephant')
```

it an abstract(抽象) realize!
