const API_URL = 'http://localhost:3000/api/products';

// Fetch and display products
const fetchProducts = async () => {
    const response = await fetch(API_URL);
    const products = await response.json();
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        productList.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.sku}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td>
                    <button onclick="deleteProduct('${product._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
};

// Add a new product
document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const sku = document.getElementById('sku').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, sku, price, quantity })
    });

    fetchProducts();
    document.getElementById('productForm').reset();
});

// Delete a product
const deleteProduct = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchProducts();
};

// Initial fetch
fetchProducts();
