import Https from 'https'
import Url from 'url'
import { DataUploadType } from '../types'
import { randomHeader } from '../utils/upload'

export function upload(file: Buffer): Promise<DataUploadType> {
	const header = randomHeader()
	return new Promise((resolve, reject) => {
		const req = Https.request(header, res => {
			res.on('data', data => {
				try {
					const resp = JSON.parse(data.toString()) as DataUploadType
					if (resp.error) {
						reject(resp)
					} else {
						resolve(resp)
					}
				} catch (err) {
					reject(err)
				}
			})
		})
		req.write(file)
		req.on('error', err => reject(err))
		req.end()
	})
}

export function download(path: string): Promise<string> {
	const header = new Url.URL(path)
	return new Promise((resolve, reject) => {
		const req = Https.request(header, res => {
			let content = ''
			res.setEncoding('binary')
			res.on('data', data => (content += data))
			res.on('end', () => resolve(content))
		})
		req.on('error', err => reject(err))
		req.end()
	})
}
