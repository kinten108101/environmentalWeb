const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const decoder = new TextDecoder('utf8')
const YAML = require('yaml')
const weatherRoute = require('./src/weather/routes')

const spec = decoder.decode(fs.readFileSync('./swagger.yml'))
const swaggerDocument = YAML.parse(spec)

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/", (req, res)=>{ //<<----test 
    res.send("hello")
})

app.use('/api/weather', weatherRoute)

app.listen(port, () => console.log(`app listening on port ${port}`))
