import express from 'express';
import ProductManager from './productManager.js';
const manager = new ProductManager("./path/products.json")
const app = express();
const PORT = 8080;

app.get("/products", async(req,res) => {
    const {limit} = req.query
    const products = await manager.getProduct()
    if (limit) {
        const limitProducts = products.slice(0,limit)
        res.json({status:"Success", limitProducts})
    }else{
        res.json({status:"Success", products})
    }
}) 

app.get("/products/:pid", async(req,res) => {
    const {pid} = req.params
    const products = await manager.getProduct()

    const findId = products.find (element => element.id === parseInt(pid));
    console.log(findId)
    res.send({status:"Success",findId})

}) 

app.listen(PORT,() => {
    console.log("El servidor esta funcionando correctamente")
})
