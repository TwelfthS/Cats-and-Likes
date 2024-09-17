import { AppDataSource } from "./data-source"
import * as express from 'express'
import * as cors from 'cors'

import { addLike, deleteLike, getLikes } from "./app.controller"


const app = express()
const port = 3000

AppDataSource.initialize().then(() => {

    console.log('Connected to database')

}).catch(error => console.log(error))

app.use(express.json())
app.use(cors())

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.get('/likes', async (req, res) => {
    const likes = await getLikes()
    res.status(200).send(likes)
})

app.post('/likes', async (req, res) => {
    try {
        const like = await addLike(req.body.catId)
        res.status(200).send(like)
    } catch (err) {
        res.status(405).send()
    }
})

app.delete('/likes/:cat_id', async (req, res) => {
    try {
        await deleteLike(req.params.cat_id)
        res.status(200).send()
    } catch (err) {
        console.log(err)
        res.status(404).send()
    }
})
