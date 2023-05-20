const express = require('express')
const app = express()
const port = 8000
let levels = [] // Change to mongo later

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Backend')
})

app.route('/levelsapi')
    .get((req, res) => {
        res.send({ levels })
    })
    .post((req, res) => {
        const { buttons, initialLevelSettings } = req.body
        let levelId = parseInt(Math.random() * 1000)
        levels.push({ levelId, buttons, initialLevelSettings })  // Change to mongo later
        res.send({ levelId: levelId })
    })

app.get('/levelsapi/:levelId', (req, res) => {
    let { levelId } = req.params
    let level = levels.find(level => level.levelId == levelId)
    console.log(`level: ${levelId}`)
    console.log(req.body)
    res.json(level)
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})