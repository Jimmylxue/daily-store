import prod from './dist/markdown.js'
import dev from './dist/markdown.min.js'

export default process.env.NODE_ENV === 'production' ? prod : dev
