// Mock Data
const books = [
    {
        id: 1,
        title: "The Silent Ocean",
        author: "Elena Fisher",
        price: 24.99,
        category: "fiction",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Modern Architecture",
        author: "David Chen",
        price: 45.00,
        category: "design",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "The Mind's Eye",
        author: "Sarah Jenkins",
        price: 18.50,
        category: "non-fiction",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "Abstract Forms",
        author: "Marcus Roth",
        price: 32.00,
        category: "design",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 5,
        title: "Lost in Time",
        author: "James Wilson",
        price: 21.99,
        category: "fiction",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 6,
        title: "Culinary Arts",
        author: "Maria Garcia",
        price: 29.99,
        category: "non-fiction",
        image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&q=80&w=800"
    }
];

// State
let cart = [];

// DOM Elements
const featuredGrid = document.getElementById('featured-grid');
const bookGrid = document.getElementById('book-grid');
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartDrawer = document.querySelector('.cart-drawer'); // Fixed selector
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total-price');
const cartCountEl = document.querySelector('.cart-count');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderFeatured();
    renderCatalog(books);
    setupEventListeners();
});

// Render Functions
function renderFeatured() {
    const featuredBooks = books.slice(0, 3);
    featuredGrid.innerHTML = featuredBooks.map(book => createBookCard(book)).join('');
}

function renderCatalog(booksToRender) {
    bookGrid.innerHTML = booksToRender.map(book => createBookCard(book)).join('');
}

function createBookCard(book) {
    return `
        <div class="book-card">
            <div class="card-image">
                <img src="${book.image}" alt="${book.title}" loading="lazy">
            </div>
            <div class="card-content">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="card-footer">
                    <span class="book-price">$${book.price.toFixed(2)}</span>
                    <button class="add-btn" onclick="addToCart(${book.id})" aria-label="Add to cart">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your bag is empty.</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                    <div class="cart-item-actions">
                        <button onclick="removeFromCart(${item.id})" style="color: var(--text-secondary); font-size: 0.8rem; margin-top: 5px;">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalEl.textContent = `$${total.toFixed(2)}`;
    cartCountEl.textContent = cart.length;
}

// Event Listeners
function setupEventListeners() {
    // Cart Toggle
    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // Filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            if (filter === 'all') {
                renderCatalog(books);
            } else {
                const filteredBooks = books.filter(book => book.category === filter);
                renderCatalog(filteredBooks);
            }
        });
    });
}

// Cart Logic
function toggleCart() {
    document.body.classList.toggle('cart-open');
}

// Expose to global scope for onclick handlers
window.addToCart = function (id) {
    const book = books.find(b => b.id === id);
    if (book) {
        cart.push(book);
        renderCart();
        // Open cart to show feedback
        if (!document.body.classList.contains('cart-open')) {
            toggleCart();
        }
    }
};

window.removeFromCart = function (id) {
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
        cart.splice(index, 1);
        renderCart();
    }
};
