const express = require('express')
const router = express.Router()


// middleware 
const {authCheck, adminCheck } = require("../middleware/auth")


// controllers 

const { create, listAll, read, remove, update, list, productCount, startRating, relatedItems, searchFilters} = require('../controller/product')

router.post('/product', authCheck, adminCheck, create)

router.get('/products/:count', listAll)
router.delete('/product/:slug', authCheck, adminCheck, remove)
router.get('/product/:slug', read)
router.put('/product/:slug', authCheck, adminCheck, update)

router.post('/products', list)
router.get('/totalproducts', productCount)

// rating route 
router.put("/product/star/:productId", authCheck, startRating);

// related
router.get('/product/related/:productId', relatedItems)

// search or filters
// router.post('/search/filters', SearchFilters)
router.post("/search/filters", searchFilters);



module.exports = router