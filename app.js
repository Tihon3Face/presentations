const express = require('express');
const config = require('config');
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000;

async function start () {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`за работу! ${PORT}`))
    }catch (e) {
        console.log('ашыбка',e.message)
        process.exit(1)
    }
}

start()