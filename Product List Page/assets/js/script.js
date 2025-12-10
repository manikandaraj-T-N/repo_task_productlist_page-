// Sample Product Data (JSON format)
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1999,
        category: "Electronics",
        img: "https://via.placeholder.com/300x200"
    },
    {
        id: 2,
        name: "Running Shoes",
        price: 2999,
        category: "Fashion",
        img: "https://via.placeholder.com/300x200"
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 3999,
        category: "Electronics",
        img: "https://via.placeholder.com/300x200"
    },
    {
        id: 4,
        name: "Office Chair",
        price: 4999,
        category: "Furniture",
        img: "https://via.placeholder.com/300x200"
    },
    {
        id: 5,
        name: "Casual T-Shirt",
        price: 799,
        category: "Fashion",
        img: "https://via.placeholder.com/300x200"
    }
];

let cart = [];

// Load categories dynamically
function loadCategories() {
    const filter = document.getElementById("categoryFilter");
    // Reset filter options (keep the default 'all')
    filter.innerHTML = '<option value="all">All Categories</option>';
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        filter.appendChild(option);
    });
}

// Render Products
function renderProducts() {
    const grid = document.getElementById("productGrid");
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const filterCategory = document.getElementById("categoryFilter").value;

    grid.innerHTML = '';

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchText) &&
        (filterCategory === 'all' || p.category === filterCategory)
    );

    if (filteredProducts.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty';
        empty.textContent = 'No products found.';
        grid.appendChild(empty);
        return;
    }

    const fragment = document.createDocumentFragment();
    filteredProducts.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = p.img;
        img.alt = p.name;
        card.appendChild(img);

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = p.name;
        card.appendChild(title);

        const price = document.createElement('div');
        price.className = 'card-price';
        // Format price with locale separators
        price.textContent = '₹' + (typeof p.price === 'number' ? p.price.toLocaleString('en-IN') : p.price);
        card.appendChild(price);

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = 'Add to Cart';
        btn.setAttribute('aria-label', `Add ${p.name} to cart`);
        btn.addEventListener('click', () => addToCart(p.id));
        card.appendChild(btn);

        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}


function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) {
        console.warn('Product not found:', id);
        return;
    }
    cart.push(product);
    // Simple UX: show toast-like alert (keeps previous behaviour)
    alert(`${product.name} added to cart!`);
}

// Initialize
loadCategories();
renderProducts();
