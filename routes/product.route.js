const express = require("express");
const { getProduct } = require("../controlers/product.controllers");
const router= express.Router()

router.get('/', getProduct )
module.exports = router;