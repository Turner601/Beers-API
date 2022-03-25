const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

router.use(express.static('public'))

const beerRoutes = require('./routes/beerRoutes')

router.use('/beers', beerRoutes)

// Home Route
// localhost:3000
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/beers/ale'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/home', {
                title: 'My Page Of Beers',
                name: 'Lets Find A Beer For You',
                data
            })
        })
})

router.get('*', (req, res) => {
    if (req.url == '/favicon.ico/') {
        res.end()
    } else {
        res.render('pages/404', {
            title: '404 Error - The Beer Has Stopped Flowing, Check Again Later...',
            name: '404 Error - The Beer Has Stopped Flowing, Check Again Later...'
        })
    }
})

module.exports = router