import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Парсер JSON-запросов
app.use(express.json());

// Путь к текущей директории
const __dirname = path.resolve();

// Сервируем статические файлы из папки "public"
app.use(express.static(path.join(__dirname, 'public')));

// Массив для хранения данных (имитация базы данных)
let products = [
    { id: 1, name: 'Laptop', price: 1500 },
    { id: 2, name: 'Phone', price: 700 }
];

// Получение списка продуктов
app.get('/api/products', (req, res) => {
    res.status(200).json(products);
});

// Получение продукта по ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === Number(req.params.id));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
});

// Добавление нового продукта
app.post('/api/products', (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Удаление продукта
app.delete('/api/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === Number(req.params.id));

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const [deletedProduct] = products.splice(productIndex, 1);
    res.status(200).json(deletedProduct);
});

// Обновление продукта
app.put('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === Number(req.params.id));

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const { name, price } = req.body;
    if (name) product.name = name;
    if (price) product.price = price;

    res.status(200).json(product);
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Mock server running at http://localhost:${port}`);
});
