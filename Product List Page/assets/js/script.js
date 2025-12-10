// Sample Product Data (JSON format)
let products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1999,
        category: "Electronics",
        img: "./assets/images/Wireless headphone.jpg"
    },
    {
        id: 2,
        name: "Running Shoes",
        price: 2999,
        category: "Fashion",
        img: "./assets/images/shoes.jpg"
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 3999,
        category: "Electronics",
        img: "./assets/images/watch.jpg"
    },
    {
        id: 4,
        name: "Office Chair",
        price: 4999,
        category: "Furniture",
        img: "./assets/images/chair.jpg"
    },
    {
        id: 5,
        name: "Casual T-Shirt",
        price: 799,
        category: "Fashion",
        img: "./assets/images/tshirt.jpg"
    },
    {
        id: 6,
        name: "USB-C Cable",
        price: 299,
        category: "Electronics",
        img: "./assets/images/usb c-cable.jpg"
    },
    {
        id: 7,
        name: "Laptop Stand",
        price: 1499,
        category: "Furniture",
        img: "./assets/images/laptop-stand.jpg"
    },
    {
        id: 8,
        name: "Denim Jeans",
        price: 1899,
        category: "Fashion",
        img: "./assets/images/denim-jeans.jpg"
    },
    {
        id: 9,
        name: "Mechanical Keyboard",
        price: 2499,
        category: "Electronics",
        img: "./assets/images/mechanical-keyboard.jpg"
    },
    {
        id: 10,
        name: "Mouse Pad",
        price: 349,
        category: "Electronics",
        img: "./assets/images/mouse-pad.jpg"
    },
    {
        id: 11,
        name: "Winter Jacket",
        price: 3499,
        category: "Fashion",
        img: "./assets/images/winter-jacket.jpg"
    },
    {
        id: 12,
        name: "Desk Lamp",
        price: 899,
        category: "Furniture",
        img: "./assets/images/lamp.jpg"
    },
    {
        id: 13,
        name: "Wireless Mouse",
        price: 599,
        category: "Electronics",
        img: "./assets/images/wireless-mouse.jpg"
    },
    {
        id: 14,
        name: "Sports Cap",
        price: 449,
        category: "Fashion",
        img: "./assets/images/sports-cap.jpg"
    },
    {
        id: 15,
        name: "Bookshelf",
        price: 5999,
        category: "Furniture",
        img: "./assets/images/book-shelf.jpg"
    },
    {
        id: 16,
        name: "Phone Charger",
        price: 399,
        category: "Electronics",
        img: "./assets/images/phone-charger.jpg"
    },
    {
        id: 17,
        name: "Sunglasses",
        price: 1299,
        category: "Fashion",
        img: "./assets/images/sunglasses.jpg"
    },
    {
        id: 18,
        name: "Coffee Table",
        price: 3599,
        category: "Furniture",
        img: "./assets/images/coffee-table.jpg"
    },
    {
        id: 19,
        name: "Portable Speaker",
        price: 1799,
        category: "Electronics",
        img: "./assets/images/speaker.jpg"
    },
    {
        id: 20,
        name: "Canvas Backpack",
        price: 999,
        category: "Fashion",
        img: "./assets/images/Canvas Backpack.jpg"
    }
];

let cart = [];

// =====================================================
// LOAD CATEGORIES DYNAMICALLY
// =====================================================
function loadCategories() {
    const filter = document.getElementById("categoryFilter");
    filter.innerHTML = '<option value="all">All Categories</option>';
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        filter.appendChild(option);
    });
}

// =====================================================
// RENDER PRODUCTS
// =====================================================
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

// =====================================================
// ADD TO CART
// =====================================================
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) {
        console.warn('Product not found:', id);
        return;
    }
    cart.push(product);
    alert(`${product.name} added to cart!`);
}

// =====================================================
// INITIALIZE
// =====================================================
loadCategories();
renderProducts();
