const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require('nodemailer');
const moment = require('moment');

// Middlewares
app.use(express.json());
app.use(cors());

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
app.post('/addproduct', async (req, res) => {
    try {
        const product = new Product(req.body);
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
app.delete('/removeproduct/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);
        console.log("Product removed:", product);
        res.json({
            success: true,
            name: product.name,
        });
    } catch (error) {
        console.error("Error removing product:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Ruta para obtener todos los productos
app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("All Products Fetched");
        res.send(products);
    } catch (error) {
        console.error("Error fetching all products:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Modelo de usuario
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    cartData: Object,
    lastLoggedIn: Date
});

const User = mongoose.model('User', UserSchema);

// Middleware para obtener el usuario
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = await User.findById(data.user.id);
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

// Endpoint para limpiar a los usuarios inactivos
app.delete('/inactiveusers', async (req, res) => {
    try {
        const cutoffDate = moment().subtract(2, 'days');
        const inactiveUsers = await User.find({ lastLoggedIn: { $lt: cutoffDate } });
        await User.deleteMany({ lastLoggedIn: { $lt: cutoffDate } });
        inactiveUsers.forEach(async (user) => {
            await sendEmail(user.email);
        });
        res.json({ success: true, message: 'Inactive users deleted and emails sent.' });
    } catch (error) {
        console.error('Error deleting inactive users:', error);
        res.status(500).json({ success: false, error: 'Error deleting inactive users.' });
    }
});

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

// Puerto de escucha
const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
