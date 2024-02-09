const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://ShoeSavy:motsil1989@cluster0.ipxckcn.mongodb.net/e-commerce")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


// API Creation

app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
  destination: path.resolve('./upload/images'),
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Creating the endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});

// Schema for creating Products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,  // Ensure this is set as Boolean
    default: true,  // Set a default value if needed
  }
});

app.post('/addproduct', async (req, res) => {
  let products = await Product.find({});
  let id;
  if(products.length>0)
  {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id+1;
  }else
  {
    id=1;
  }
  try {
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    console.log(product);

    await product.save();

    console.log("Saved");
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({
      success: false,
      error: 'Error saving product',
    });
  }
});

// creating API for deleting products

app.post('/removeproduct',async(req,res)=>{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("Product Removed");
  res.json({
    success:true,
    name:req.body.name
  })
})

//creating API to GET ALLPRODUCTS

app.get('/allproducts',async (req,res)=>{
  let products = await Product.find({});
  console.log("All Products have been Fetched");
  res.send(products);
})

//Schema creation for user model
const Users = mongoose.model('Users', {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phonenumber: {
    type: String,
  },  
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});


// Creating Endpoint for registering the user
app.post('/signup',async (req, res)=>{
  let check = await Users.findOne({email:req.body.email});
  if (check) {
    return res.status(400).json({sucess:false,errors:"Existing user FOUND with same Email-Address!"})
  }
  let cart = {};
  for (let i = 0; i < 300;i++ ){
    cart[i]=0;
  }
  console.log(req.body);
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    phonenumber: req.body.phoneNumber,  // Update the field name here
    password: req.body.password,
    cartData: cart,
  });
  
  

  await user.save();

  const data = {
    user:{
      id:user.id
    }
  }

  const token = jwt.sign(data,'secret_ecom');
  res.json({success:true,token});

})

// Creating Endpoint for user login
app.post('/login',async (req, res)=>{
  let user = await Users.findOne({email:req.body.email});
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data,'secret_ecom');
      res.json({success:true,token});
    }
    else {
      res.json({success:false,errors:"Incorrect Password Try Again."});
    }
  }
  else {
    res.json({success:false,errors:"Incorrect E-Mail Id."});
  }
})

// Creating Endpoint for  new-collection data
app.get('/newcollections', async (req,res)=>{
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollection Fetched");
  res.send(newcollection);
})

// Creating Endpoint for  Popular in women section data
app.get('/popularinwomen', async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("Popular In Women Fetched");
  res.send(popular_in_women);
});

// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ errors: "Please Authenticate using Valid token" });
  } else {
    try {
      const data = jwt.verify(token, 'secret_ecom');
      req.user = data.user;
      next(); // Call next to pass control to the next middleware or route handler
    } catch (error) {
      res.status(401).send({ errors: "Please Authenticate using Valid token" }); // Pass the error to the next middleware or route handler
    }
  }
};

// Creating endpoint for adding products in cartdata 
app.post('/addtocart', fetchUser, async (req, res) => {
  console.log("added",req.body.itemId);
  let userData = await Users.findOne({_id:req.user.id});
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
  res.send("Added")

});

// Creating endpoint for adding products in cartdata 
app.post('/removefromcart', fetchUser, async (req, res) => {
  console.log("removed",req.body.itemId);
  let userData = await Users.findOne({_id:req.user.id});
  if(userData.cartData[req.body.itemId]>0)
  userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
  res.send("Removed")

});

// Creating endpoint for adding products in cartdata 
app.post('/getcart', fetchUser, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);
});

// endpoint to get user data in the profile page
app.get('/profile', fetchUser, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching user profile',
    });
  }
});

// Example server code to handle profile updates
app.put('/updateprofile', async (req, res) => {
  const userId = req.user.id; // Assuming you have a middleware that extracts the user ID from the token
  const updatedData = req.body;

  try {
    // Update user profile in the database using the userId and updatedData
    await Users.findByIdAndUpdate(userId, updatedData);
    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, error: 'Error updating profile' });
  }
});


// PORT CONNECTION
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running at port: " + port);
  } else {
    console.log("Error: " + error);
  }
});
