# NineLattice 九宫格抽奖

## useLuckDraw

九宫格抽奖 hook

## API

```tsx
const { prizeIndex, draw, isDrawing } = useLuckDraw()
```

## 参数

| 参数       | 说明           | 类型                 | 默认值 |
| ---------- | -------------- | -------------------- | ------ |
| prizeIndex | 中奖的奖品索引 | number               | 0      |
| draw       | 抽奖函数       | (index:number)=>void | -      |
| idDrawing  | 抽奖状态       | boolean              | false  |

## 实现原理

| 1   | 2        | 3   |
| --- | -------- | --- |
| 4   | 抽奖按钮 | 5   |
| 6   | 7        | 8   |

---

| 0   | 1        | 2   |
| --- | -------- | --- |
| 7   | 抽奖按钮 | 3   |
| 6   | 5        | 4   |
