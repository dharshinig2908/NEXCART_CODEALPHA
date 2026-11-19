const products = [
    { id: 1, name: "Premium Wireless Headphones", price: 2499, category: "Electronics", image: "headphones.jpeg" },
    { id: 2, name: "Luxury Smart Watch", price: 3299, category: "Electronics", image: "watch.jpeg" },
    { id: 3, name: "Sport Running Shoes", price: 1999, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
    { id: 4, name: "Urban Travel Backpack", price: 1499, category: "Fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600" },
    { id: 5, name: "Professional Digital Camera", price: 8999, category: "Electronics", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600" },
    { id: 6, name: "Classic Sunglasses", price: 999, category: "Accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600" },
    { id: 7, name: "Modern Laptop", price: 45999, category: "Electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600" },
    { id: 8, name: "Premium Wrist Bag", price: 1899, category: "Fashion", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600" },
    { id: 9, name: "Wireless Earbuds", price: 1799, category: "Accessories", image: "ear buds.jpeg" }
];

// HTML Elements
const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const closeCart = document.getElementById("closeCart");
const cartBtn = document.getElementById("cartBtn");

const productDetails = document.getElementById("productDetails");
const closeDetails = document.getElementById("closeDetails");

// Wishlist Elements
const wishlistBtn = document.getElementById("wishlistBtn");
const wishlistPanel = document.getElementById("wishlistPanel");
const wishlistItems = document.getElementById("wishlistItems");
const closeWishlist = document.getElementById("closeWishlist");

// Cart and Wishlist
let cart = [];
let wishlist = [];
let selectedCategory = "All";

// Update Cart Count
function updateCartCount() {
    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    cartCount.textContent = totalQuantity;
}

// Display Products
function displayProducts(productList = products) {
    if (productList.length === 0) {
        productGrid.innerHTML = "<p>No products found!</p>";
        return;
    }

    productGrid.innerHTML = productList.map(product => `
        <div class="product-card"
             onclick="showProductDetails(${product.id})">

            <button class="wishlist-btn"
                onclick="event.stopPropagation(); addToWishlist(${product.id})">
                ${wishlist.includes(product.id) ? "♥" : "♡"}
            </button>

            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price.toLocaleString("en-IN")}</p>

            <button onclick="event.stopPropagation(); addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join("");
}

// Search and Category Filters
function applyFilters() {
    const searchValue = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}

// Add Product to Cart
function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    updateCartCount();

    const message = document.createElement("div");
    message.className = "cart-notification";
    message.textContent = "✓ Product added to your cart!";

    document.body.appendChild(message);
    setTimeout(() => message.remove(), 2500);
}

// Change Product Quantity
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    updateCartCount();
    showCart();
}

// Display Shopping Cart
function showCart() {
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
    } else {
        cartItems.innerHTML = cart.map(item => {
            const product = products.find(p => p.id === item.id);

            if (!product) return "";

            const itemTotal = product.price * item.quantity;
            total += itemTotal;

            return `
                <div class="cart-item">
                    <h3>${product.name}</h3>
                    <p>₹${product.price.toLocaleString("en-IN")}</p>

                    <div class="cart-quantity">
                        <button onclick="changeQuantity(${product.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, 1)">+</button>
                    </div>

                    <p>Subtotal: ₹${itemTotal.toLocaleString("en-IN")}</p>
                </div>
            `;
        }).join("");
    }

    cartTotal.textContent = total.toLocaleString("en-IN");
    cartPanel.classList.add("active");
}

// Close Shopping Cart
function closeShoppingCart() {
    cartPanel.classList.remove("active");
}

cartBtn.addEventListener("click", showCart);
closeCart.addEventListener("click", closeShoppingCart);

// ADD TO WISHLIST
function addToWishlist(productId) {
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
    } else {
        wishlist.push(productId);
    }

    displayProducts(getFilteredProducts());
    showWishlist();
}

// Get Currently Filtered Products
function getFilteredProducts() {
    const searchValue = searchInput.value.toLowerCase().trim();

    return products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });
}

// DISPLAY WISHLIST
function showWishlist() {
    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {
        wishlistItems.innerHTML = "<p>Your wishlist is empty!</p>";
    } else {
        wishlist.forEach(productId => {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            wishlistItems.innerHTML += `
                <div class="wishlist-item">
                    <img src="${product.image}" alt="${product.name}">

                    <div class="wishlist-info">
                        <h4>${product.name}</h4>
                        <p>₹${product.price.toLocaleString("en-IN")}</p>

                        <button onclick="removeFromWishlist(${product.id})">
                            Remove
                        </button>
                    </div>
                </div>
            `;
        });
    }

    wishlistPanel.classList.add("active");
}

// REMOVE FROM WISHLIST
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(id => id !== productId);

    showWishlist();
    displayProducts(getFilteredProducts());
}

// Wishlist Button
wishlistBtn.addEventListener("click", showWishlist);

closeWishlist.addEventListener("click", () => {
    wishlistPanel.classList.remove("active");
});

// Search
searchInput.addEventListener("input", applyFilters);

// Category Filters
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;

        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");
        applyFilters();
    });
});

// Product Details
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById("detailImage").src = product.image;
    document.getElementById("detailName").textContent = product.name;

    document.getElementById("detailPrice").textContent =
        "₹" + product.price.toLocaleString("en-IN");

    productDetails.classList.add("active");

    document.getElementById("detailAddCart").onclick = function() {
        addToCart(product.id);
    };
}

// Close Product Details
closeDetails.addEventListener("click", () => {
    productDetails.classList.remove("active");
});

// Initial Display
displayProducts();
updateCartCount();