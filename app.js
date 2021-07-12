const express = require('express')
const app = express()
const products = require('./model/product');

//using middleware
app.use(express.json());


//Read all product records
app.get('/', (req, res, next) => {
  res.json(products)
  next();
})


//Create a new product
app.post('/', (req, res, next) => {
  products.push({
    id: products.length + 1,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price
  });
  res.json({ message: "New Product created." });
  next();
});


//update a product record
app.put('/:id', (req, res, next) => {
  if (!req.body.name || !req.body.description || !req.body.image || !req.body.price) {
    res.status(400).json({ message: "Bad Request" });
  } else {
    let updateIndex = products.map(function (product) {
      return product.id;
    }).indexOf(parseInt(req.params.id));
    products[updateIndex] = {
      id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price
    }
    res.json({ message: "product id " + req.params.id + " updated." });
  }
  next()
});


//Delete a Product  
app.delete('/:id',(req, res)=>{
  let removeIndex = products.map((product)=>{
       return product.id; 
       })
       products.indexOf(req.params.id);
       if(removeIndex === -1){ 
       res.json({message: "Not found"}); 
       } else { 
       products.splice(removeIndex, 1); 
       res.json({message: "product id " + req.params.id + " removed."});
       }
    });

app.listen(3000, () => console.log('Server Running at http://localhost:3000'))