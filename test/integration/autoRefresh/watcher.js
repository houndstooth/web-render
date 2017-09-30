const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
	if (req.url === '/codeUpdates') {
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
		})

		fs.watchFile('test/integration/dist/bundle.js', { interval: 100 }, () => {
			res.write('data: reload\n\n')
		})
	}
}).listen(1234)