const express = require('express');
const cors = require('cors')
const axios = require('axios')

const connectDB = require('./src/config/db.js');
const model = require('./src/model/model.js')

const app = express()

connectDB()
app.use(cors());
app.use(express.json());


const router = express.Router();

// router.get('/:id', async (req, res) => {
//     console.log(req.params)
//     try {
//         const id = req.params.id
//         const item = await model.findOne({ id })
//         res.json({ item })
//     } catch (error) {
//         res.json({ message: error.message });
//     }
// });
router.get('/', async (req, res) => {
    try {
        if (req.query.data) {
            const id = req.query.data
            const item = await model.findOne({ id })
            res.json({ item })
        }
        else {
            const items = await model.find()
            res.json({ items })
        }

    } catch (error) {
        res.json({ message: error.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        const id = req.query.data
        if (id)
            await model.deleteOne({ id: id })
        else
            await model.remove({})
        res.json(true)
    } catch (error) {
        res.json({ message: error.message });
    }

})

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const txt = req.body.txt
        const item = await model.findOne({ txt })
        res.json({ item })
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.patch('/', async (req, res) => {
    try {
        console.log(req.body)
        const { txt, id } = req.body
        // const item = await model.findOne({ txt })
        const time = Date.now()
        console.log(time)
        let newItem = new model({
            txt,
            id,
            time
        })
        newItem.save().then(() => {
            res.json(true)
        }).catch((e) => {
            res.json({ message: e.message });
        })
    } catch (error) {
        res.json({ message: error.message });
    }
});


app.use('/', router);


const PORT = 7000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


const deleteItem = (id) => {
    // let body = { id }
    axios.delete('http://localhost:7000/', { params: { data: id } }).then((res) => {
        console.log('deleted')
    })
}

// setInterval(() => {
//     axios.get("http://localhost:7000/").then((res) => {
//         console.log(res.data.items)
//         res.data.items.forEach((it) => {
//             const now = Date.now()
//             if ((now - it.time) > 100000) {
//                 deleteItem(it.id)
//             }
//         })
//     })
// }, 10000);

