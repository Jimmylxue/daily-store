# CSS-variable

variable is very useful function in coding word, including css, we can complete some difficult demo and has better performance depend on it!

## how to use

css-variable is easily to use, we can use `--name` to define an variable and use `var(--name)` to consumption(消费) it.

### demo

```css
:root {
	--bg-primary: #3498db;
	--text-primary: #34495e;

	--bg-success: #2ecc71;
	--text-success: white;
}

.dz-btn {
	width: 100px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--bg-primary);
	color: var(--text-primary);
}

.dz-btn:hover {
	background: var(--bg-success);
	color: var(--text-success);
}
```

we can easily to realize an theme change demo depend on css-variable and a little javascript
