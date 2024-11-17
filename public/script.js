// Check for proper script loading
console.log("Script is working!");

// Element references
const productList = document.getElementById('product-list');
const showNamesBtn = document.getElementById('show-names');
const showPricesBtn = document.getElementById('show-prices');

// Fetch products from the server
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Show product names
async function showNames() {
    const products = await fetchProducts();
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product.name;
        productList.appendChild(li);
    });
}

// Show product prices
async function showPrices() {
    const products = await fetchProducts();
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `$${product.price}`;
        productList.appendChild(li);
    });
}

// Button event listeners
showNamesBtn.addEventListener('click', showNames);
showPricesBtn.addEventListener('click', showPrices);
