import { Database } from './database.js'

const client = new Database('./test.db')

client.on('load', () => {
	const foo = client.get('foo')
	console.log('foo', foo)
	client.set('tony', 'love jack', err => {
		if (err) {
			console.error(err)
		}
		console.log('write successfully')
	})
	client.set('jimmy', 'love snow', err => {
		if (err) {
			console.error(err)
		}
		console.log('write successfully')
	})

	client.set('xuexue', 'love jimmy', err => {
		if (err) {
			console.error(err)
		}
		console.log('write successfully')
	})

	client.del('tony')
})
