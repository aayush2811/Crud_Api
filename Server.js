const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/productModel')

mongoose.connect('<Your MonoAtlas Database Id>').then(() => {
    console.log('Database Connected');
}).catch(() => {
    console.log("Unable to connect Database");
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs')

app.get('/api/product', async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json({ product })
    } catch (error) {
        res.status(404).send(error);
    }
});

app.get('/api/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).send('Product Not Found')
        res.status(200).json({ product })
    } catch (error) {
        res.status(404).send(error);
    }
});
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json({ product })
    } catch (error) {
        console.log(error);
    }
})


// Update product   
app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json('Product Not Found')
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(404).send(error);
    }
})


// Delete product
app.delete('/api/product/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return res.status(404).json('Product Not Found')
        }
        res.status(200).json('Product deleted successfully')
    }
    catch (error) {
        res.status(404).send(error);    
    }
})
app.get('/', (req, res) => {
    res.render('index')
})
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})
