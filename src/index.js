const express = require('express')
const mongoose = require('mongoose');

const app = express()
app.use(express.static('public'))
app.use(express.json({limit: '100kb'}))

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const port = 3000

const Message = mongoose.model('UserMessage', { 
    name: String,
    feedback: String,
});

app.get('/', async (req, res) => {
    const messages = await Message.find()
    return res.send(messages)
})

app.post('/', async (req, res) => {    
    const message = new Message({
        name: req.body.name,
        feedback: req.body.feedback,
    })
    await message.save()
    return res.send(message)
})

app.put('/:id', async (req, res) => {
    const message = await Message.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        feedback: req.body.feedback,
    }, {
        new: true
    })

    return res.send(message)
})

app.delete('/:id', async (req, res) => {
    const message = await Message.findByIdAndDelete(req.params.id)
    return res.send(message)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://K1Melo:O79Rczal9ioDggLA@cluster0.cvfz8on.mongodb.net/?retryWrites=true&w=majority');
    console.log(`Example app listening on port ${port}`)
})