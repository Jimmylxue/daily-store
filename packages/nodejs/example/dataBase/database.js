import { createReadStream, createWriteStream } from 'fs'
import { EventEmitter } from 'events'

/**
 * in this example, we use some useful technology:
 *  - use stream to realize read file and write file
 *  - use event to realize event system
 */

export class Database extends EventEmitter {
	constructor(path) {
		super()
		this.path = path
		this._records = Object.create(null)
		this._writeStream = createWriteStream(this.path, {
			encoding: 'utf-8',
			flags: 'a',
		})
		this._load()
	}

	_load() {
		const stream = createReadStream(this.path, { encoding: 'utf-8' })

		let data = ''
		stream.on('readable', () => {
			data += stream.read()
			const records = data.split('\n')
			data = records.pop() //  last data is null, we don't need it
			for (let i = 0; i < records.length; i++) {
				try {
					const record = JSON.parse(records[i])
					if (record.value === null) {
						delete this._records[record.key]
					} else {
						this._records[record.key] = record.value
					}
				} catch (error) {
					this.emit('error', 'has some error', records[i])
				}
			}
		})

		stream.on('end', () => {
			console.log('data has load')
			this.emit('load') // emit event  database can accept this event to do something
		})
	}

	get(key) {
		return this._records[key] || null
	}

	set(key, value, callback) {
		const writeValue = JSON.stringify({ key, value }) + '\n'
		if (value === null) {
			delete this._records[key]
		} else {
			this._records[key] = value
		}

		this._writeStream.write(writeValue, callback)
	}

	del(key, callback) {
		this.set(key, null, callback)
	}
}
