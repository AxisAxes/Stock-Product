const express = require('express');
const routes = express.Router();
const db = require('../db');

routes.get('/list',async(req, res)=> {
    const products = await db.selectAllProducts();
    return res.json(products);
});
routes.post('/insert', async(req, res)=>{
    const result = await db.insertProducts(req.body);
    return res.json({"message":"Sucesso!"});
});

module.exports = routes;
