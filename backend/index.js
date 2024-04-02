const port = 4001;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// Middlewares
app.use(express.json()); // Para analizar solicitudes JSON
app.use(cors()); // Para habilitar CORS

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb+srv://tanialuduenaok:1234567890@cluster0.s1ide49.mongodb.net/finalBackend", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Ruta principal
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Engine de almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Ruta para subir imágenes
app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Esquema para crear productos
const ProductSchema = new mongoose.Schema({
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
        type: Boolean,
        default: true,
    }
});

const Product = mongoose.model('Product', ProductSchema);

// Ruta para agregar un nuevo producto
app.post('/addproduct', async (req, res) => { // Corrección: cambiar '/addproducts' a '/addproduct'
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        await product.save();
        console.log("Product saved:", product);
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Ruta para eliminar un producto
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Product removed:", req.body.id);
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error removing product:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Ruta para obtener todos los productos
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All Products Fetched");
        res.send(products);
    } catch (error) {
        console.error("Error fetching all products:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Modelo de usuario
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
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


// Ruta para registrarse como usuario
app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "existing user found with same email address" });
        }
        let cart = {};
        for (let i = 0; i < 300; i++) { 
            cart[i] = 0;
        }
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, 'secret_ecom'); // Se genera un token JWT
        res.json({ success: true, token }); // Se devuelve el token como respuesta
    } catch (error) {
        console.error("Error signing up user:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

//creacion de endpoint para logeo de usuario
app.post('/login',async (req,res) => {
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
            res.json({success:true, token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"})
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"})
    }
})

// Middleware para obtener el usuario
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            return res.status(401).send({ errors: "Please authenticate using a valid token" });
        }
    }
}

// Endpoint para obtener el carrito de compras del usuario
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart")
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.carData);
})


// Endpoint para agregar un producto al carrito de compras
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        console.log("Added", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added");
    } catch (error) {
        console.error("Error adding to cart:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Endpoint para eliminar un producto del carrito de compras
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        console.log("Removed", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
            await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
            res.send("Removed");
        } else {
            res.status(400).json({ success: false, error: "Item not found in the cart" });
        }
    } catch (error) {
        console.error("Error removing from cart:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

//endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart")
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.carData);
})

const nodemailer = require('nodemailer');
const moment = require('moment'); // para trabajar con fechas

// Define una función para enviar correos electrónicos
const sendEmail = async (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tania@gmail.com',
            pass: '1234567890'
        }
    });

    const mailOptions = {
        from: 'tania@gmail.com',
        to: email,
        subject: 'Eliminación de cuenta por inactividad',
        text: 'Tu cuenta ha sido eliminada debido a la inactividad.'
    };

    await transporter.sendMail(mailOptions);
};

// Endpoint para limpiar a los usuarios inactivos
app.delete('/', async (req, res) => {
    try {
        // Calcula la fecha de hace 2 días (o 30 minutos para pruebas)
        const cutoffDate = moment().subtract(2, 'days'); // o .subtract(30, 'minutes') para pruebas

        // Encuentra los usuarios que no han iniciado sesión desde la fecha de corte
        const inactiveUsers = await Users.find({ lastLoggedIn: { $lt: cutoffDate } });

        // Elimina a los usuarios inactivos de la base de datos
        await Users.deleteMany({ lastLoggedIn: { $lt: cutoffDate } });

        // Envía correos electrónicos a los usuarios eliminados
        inactiveUsers.forEach(async (user) => {
            await sendEmail(user.email);
        });

        res.json({ success: true, message: 'Usuarios inactivos eliminados correctamente y se envió el correo electrónico.' });
    } catch (error) {
        console.error('Error al eliminar usuarios inactivos:', error);
        res.status(500).json({ success: false, error: 'Error al eliminar usuarios inactivos.' });
    }
});