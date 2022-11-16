import useImage from '..'

export default function UseImageDemo() {
	let imgUrl = 'https://place.dog/300/200'
	const { isLoading, isError, isSuccess, info } = useImage({
		source: 'https://place.dog/300/200',
	})

	return (
		<div>
			<p>{isLoading ? '加载中' : isError ? '加载失败' : '加载成功'}</p>

			{isSuccess && (
				<>
					<img src={imgUrl} alt="loadImage" />
					<p>图片信息：</p>
					<p>
						宽：{info?.width} 高：{info?.height}
					</p>
				</>
			)}
		</div>
	)
}
