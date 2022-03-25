const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

// All Beers
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/beers/ale'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/beers', {
                title: 'All About Beers',
                name: 'Some Beers You Might Like',
                data
            })
        })
})

// Ale Beers
// localhost:3000/ale
router.get('/ale', (req, res) => {
    const URL = 'https://api.sampleapis.com/beers/ale'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/ale-beers', {
                title: 'Some Ale Beers',
                name: 'Some Ale Beers',
                data
            })
        })
})

// Stout Beers
// localhost:3000/stouts
router.get('/stouts', (req, res) => {
    const URL = 'https://api.sampleapis.com/beers/stouts'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/stouts-beers', {
                title: 'Some Stout Beers',
                name: 'Some Stout Beers',
                data
            })
        })
})

// Red-Ale Beers
// localhost:3000/red-ale
// router.get('/red-ale', (req, res) => {
//     const URL = 'https://api.sampleapis.com/beers/red-ale'
//     fetch(URL)
//         .then(res => res.json())
//         .then(data => {
//             res.render('pages/red-ale-beers', {
//                 title: 'Some Red-Ale Beers',
//                 name: 'Some Red-Ale Beers',
//                 data
//             })
//         })
// })

// router.get('/:id', (req, res) => {
//     const id = req.params.id
//     const URL = `https://api.sampleapis.com/beers/${id}`
//     fetch(URL)
//         .then(res => res.json())
//         .then(data => {
//             if (Object.keys(data).length >= 1) {
//                 res.render('pages/single-beers', {
//                     title: `${data.name}`,
//                     name: `${data.name}`,
//                     data
//                 })
//             }
//         })
// })

// Single Beers By Type
router.get('/:type/:id', (req, res) => {
    const type = req.params.type
    const id = req.params.id
    const URL = `https://api.sampleapis.com/beers/${type}/${id}`
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if (Object.keys(data).length >= 1) {
                res.render('pages/single-beers', {
                    title: `${data.name}`,
                    name: `${data.name}`,
                    data
                })
            } else {
                res.render('pages/404', {
                    title: '404 Error - Grounds in the coffee, try again',
                    name: '404 Error - Grounds in the coffee, try again'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})

module.exports = router