# CSS 实现节流

> 核心： [animation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)、[pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)、[:active](https://developer.mozilla.org/en-US/docs/Web/CSS/:active)

防抖和节流是非常常用的一些优化手段，如提交按钮、滚动距离检测等等，大部分情况我们能够想到的实现方式是通过 `JS` 来实现。使用 `CSS` 来实现相较于 `JS` 实现有如下几个好处：

- 实现起来更加精简

  只需要给需要节流的按钮加个 `class` 类名即可

- 对代码的入侵性更小

  `JS` 是我们逻辑的核心，如果是前人的代码，我们需要优化加一些节流或防抖的处理，使用 `JS` 实现就势必会动到原来的代码，一不小心就可能会引发一些其他的问题。

- 没有框架限制

  不需要引入像`lodash`之类的库。

- 性能可能更佳

  不需要 `JS` 去实现一些计算。

缺点也有如下：

- 需考虑兼容性

  虽然大部分的浏览器都支持`pointer-events`，但我们国内仍有大部分套壳`webview`在这些场景时需要注意是否可用。

## 实现思路

通过动画的形式，在节流时间内，将`pointer-events`设置为 `null`（点击事件失效），节流时间结束之后，恢复可点击状态（`pointer-events: all`）

我们就可以根据这个写下这段简单的代码：

```css
.throttleAnimate {
	form {
		pointer-events: none; /**屏蔽点击事件 */
	}
	to {
		pointer-events: all; /**恢复点击事件 */
	}
}

.throttle {
	animation-name: throttleAnimate;
	animation-duration: 2s; /**节流时间为2s */
	animation-timing-function: step-end;
	animation-fill-mode: forwards; /**动画结束之后定格在动画的最后一帧 */
}

div:active {
	animation: none; /**div在点击时，清空动画 */
}
```

**解析**

在这个案例中 2s 结束之后 动画停留在最后一帧是 `pointer-events: all` 这样就能够点击了（和节流思想保持一致，一段时间结束后，又能恢复点击。）

以上例子最为关键的是设置了 `div:active` 当激活时设置了`animation: none`，我们可以脑补这个流程：

- 当用户按钮按钮时，按钮就处于激活状态，这时动画清空。

- 当用户松手时，激活状态失效，又恢复了我们之前设置的动画 css，这时动画重新执行，2s 内都是处于不可点击的一个状态。

根据这个机制，我们就实现了一个 css 节流处理。

## Demo

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=q, initial-scale=1.0" />
		<title>CSS -> 实现throttle</title>
		<link rel="stylesheet" href="style.css" />
	</head>
	<body>
		<div class="throttle" onclick="console.log('click!!')">click me !</div>
	</body>
</html>
```

## 后续优化

可以引入 CSS 变量。或者内置一些固定时间的 接口类，方便今后业务开发。
