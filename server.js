const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 63600;
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', port);
const app = next({ dev })
const handle = app.getRequestHandler()
app.prepare().then(() => {
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        try {
            const parsedUrl = parse(req.url, true)
            const { pathname, query } = parsedUrl
            if (pathname === '/a') {
                app.render(req, res, '/a', query)
            } else if (pathname === '/b') {
                app.render(req, res, '/b', query)
            } else {
                handle(req, res, parsedUrl)
            }
        } catch (error) {
            console.error('Error in server:', error);
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
        
    }).listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})