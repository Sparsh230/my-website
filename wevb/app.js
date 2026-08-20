/* ========================================
   ARTÉFACT — Souvenir Monuments & Kits
   Interactive JavaScript
   ======================================== */

// ==================== DATA ====================
const products = [
    {
        id: 1,
        name: "Taj Mahal — Marble Finish Model",
        brand: "Wonders of India",
        price: 1499,
        originalPrice: 1999,
        image: "images/taj-mahal.jpg",
        category: "monuments",
        badge: "hot",
        rating: 4.9,
        reviews: 2847
    },
    {
        id: 2,
        name: "Eiffel Tower — Bronze Replica",
        brand: "European Heritage",
        price: 1299,
        originalPrice: null,
        image: "images/eiffel-tower.jpg",
        category: "monuments",
        badge: "bestseller",
        rating: 4.8,
        reviews: 1523
    },
    {
        id: 3,
        name: "Roman Colosseum — Aged Stone Edition",
        brand: "Ancient Wonders",
        price: 1799,
        originalPrice: 2299,
        image: "images/colosseum.jpg",
        category: "monuments",
        badge: "sale",
        rating: 4.9,
        reviews: 892
    },
    {
        id: 4,
        name: "Pyramids of Giza — Desert Scene",
        brand: "Ancient Wonders",
        price: 1599,
        originalPrice: null,
        image: "images/pyramids.jpg",
        category: "monuments",
        badge: "new",
        rating: 4.8,
        reviews: 1241
    },
    {
        id: 5,
        name: "Architectural Wonders Learning Kit",
        brand: "EduCraft India",
        price: 2499,
        originalPrice: 3499,
        image: "images/learning-kit.jpg",
        category: "learning",
        badge: "hot",
        rating: 4.9,
        reviews: 3087
    },
    {
        id: 6,
        name: "Monument Painting Kit — Watercolors",
        brand: "ArtHeritage",
        price: 899,
        originalPrice: null,
        image: "images/bag.jpg",
        category: "painting",
        badge: "new",
        rating: 4.7,
        reviews: 1156
    },
    {
        id: 7,
        name: "Seven Wonders Collector's Set",
        brand: "Heritage Crafts",
        price: 4999,
        originalPrice: 6999,
        image: "images/colosseum.jpg",
        category: "monuments",
        badge: "sale",
        rating: 4.9,
        reviews: 764
    },
    {
        id: 8,
        name: "Young Explorer's World Kit",
        brand: "EduCraft India",
        price: 1299,
        originalPrice: null,
        image: "images/learning-kit.jpg",
        category: "learning",
        badge: "new",
        rating: 4.8,
        reviews: 1893
    }
];

// ==================== STATE ====================
let cart = [];
let wishlist = new Set();

// ==================== DOM ELEMENTS ====================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ==================== INIT ====================
document.addEventListener("DOMContentLoaded", () => {
    renderProducts("all");
    initStackedCarousel();
    initHeader();
    initAnnouncement();
    initSearch();
    initCart();
    initCountdown();
    initScrollReveal();
    initHeroStats();
    initFilters();
    initMobileMenu();
    initNewsletter();
});

// ==================== RENDER PRODUCTS ====================
function renderProducts(filter) {
    const grid = $("#products-grid");
    const filtered = filter === "all" ? products : products.filter(p => p.category === filter);
    
    grid.innerHTML = filtered.map((product, i) => `
        <div class="product-card reveal reveal-delay-${Math.min(i + 1, 5)}" 
             data-category="${product.category}" 
             data-id="${product.id}"
             id="product-${product.id}">
            <div class="product-image-wrap">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge badge-${product.badge}">${getBadgeLabel(product.badge)}</span>` : ''}
                <div class="product-actions">
                    <button class="product-action-btn wishlist-toggle ${wishlist.has(product.id) ? 'wishlisted' : ''}" 
                            data-id="${product.id}" 
                            aria-label="Toggle wishlist"
                            id="wishlist-${product.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="${wishlist.has(product.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                    <button class="product-action-btn quick-view-btn" data-id="${product.id}" aria-label="Quick view">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="product-stars">${getStars(product.rating)}</span>
                    <span class="product-rating-count">(${product.reviews.toLocaleString()})</span>
                </div>
                <div class="product-pricing">
                    <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                    ${product.originalPrice ? `<span class="product-original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                </div>
                <button class="product-add-btn" data-id="${product.id}" id="add-to-cart-${product.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Re-attach event listeners
    $$(".product-add-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            addToCart(parseInt(btn.dataset.id));
        });
    });

    $$(".wishlist-toggle").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleWishlist(parseInt(btn.dataset.id));
        });
    });

    // Re-init reveal for new elements
    setTimeout(() => {
        $$('.product-card.reveal').forEach(el => {
            observeElement(el);
        });
    }, 50);
}

function getBadgeLabel(badge) {
    const labels = {
        sale: 'Sale',
        new: 'New',
        hot: 'Popular',
        bestseller: 'Best Seller'
    };
    return labels[badge] || badge;
}

function getStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let stars = '★'.repeat(full);
    if (half) stars += '½';
    return stars;
}

// ==================== FILTERS ====================
function initFilters() {
    $$(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            $$(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderProducts(btn.dataset.filter);
        });
    });
}

// ==================== CART ====================
function initCart() {
    $("#cart-btn").addEventListener("click", openCart);
    $("#cart-close").addEventListener("click", closeCart);
    $("#cart-overlay").addEventListener("click", closeCart);
}

function openCart() {
    $("#cart-sidebar").classList.add("active");
    $("#cart-overlay").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeCart() {
    $("#cart-sidebar").classList.remove("active");
    $("#cart-overlay").classList.remove("active");
    document.body.style.overflow = "";
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    showToast(`${product.name} added to cart`);

    // Bump animation
    const countEl = $("#cart-count");
    countEl.classList.remove("bump");
    void countEl.offsetWidth;
    countEl.classList.add("bump");
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(productId);
        return;
    }
    updateCartUI();
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    $("#cart-count").textContent = count;
    
    if (cart.length === 0) {
        $("#cart-empty").style.display = "";
        $("#cart-footer").style.display = "none";
        $$(".cart-item").forEach(el => el.remove());
    } else {
        $("#cart-empty").style.display = "none";
        $("#cart-footer").style.display = "";
        
        const itemsContainer = $("#cart-items");
        $$(".cart-item").forEach(el => el.remove());
        
        cart.forEach(item => {
            const itemEl = document.createElement("div");
            itemEl.className = "cart-item";
            itemEl.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-brand">${item.brand}</div>
                    <div class="cart-item-bottom">
                        <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
                        <div class="cart-qty-controls">
                            <button class="cart-qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
                            <span class="cart-qty-value">${item.qty}</span>
                            <button class="cart-qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
                        </div>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove item">×</button>
            `;
            itemsContainer.appendChild(itemEl);
        });

        $("#cart-total").textContent = `₹${total.toLocaleString('en-IN')}`;
    }
}

// ==================== WISHLIST ====================
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (wishlist.has(productId)) {
        wishlist.delete(productId);
        showToast(`${product.name} removed from wishlist`);
    } else {
        wishlist.add(productId);
        showToast(`${product.name} added to wishlist`);
    }

    const btn = $(`#wishlist-${productId}`);
    if (btn) {
        btn.classList.toggle("wishlisted", wishlist.has(productId));
        const svg = btn.querySelector("svg path");
        if (svg) {
            svg.setAttribute("fill", wishlist.has(productId) ? "currentColor" : "none");
        }
    }
}

// ==================== HEADER ====================
function initHeader() {
    window.addEventListener("scroll", () => {
        const header = $("#header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }, { passive: true });
}

// ==================== ANNOUNCEMENT ====================
function initAnnouncement() {
    $("#announcement-close").addEventListener("click", () => {
        $("#announcement-bar").classList.add("hidden");
    });
}

// ==================== SEARCH ====================
function initSearch() {
    const overlay = $("#search-overlay");
    const input = $("#search-input");

    $("#search-btn").addEventListener("click", () => {
        overlay.classList.add("active");
        setTimeout(() => input.focus(), 100);
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.classList.remove("active");
            input.value = "";
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            overlay.classList.remove("active");
            input.value = "";
        }
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault();
            overlay.classList.add("active");
            setTimeout(() => input.focus(), 100);
        }
    });

    $$(".search-tag").forEach(tag => {
        tag.addEventListener("click", () => {
            input.value = tag.dataset.search;
            input.focus();
        });
    });

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();
        if (query.length > 0) {
            const matches = products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
            
            const suggestionsEl = $("#search-suggestions");
            if (matches.length > 0) {
                suggestionsEl.innerHTML = `
                    <div class="search-suggestion-title">Results</div>
                    <div class="search-tags">
                        ${matches.map(m => `<span class="search-tag" data-search="${m.name}">${m.name} — ₹${m.price.toLocaleString('en-IN')}</span>`).join('')}
                    </div>
                `;
            } else {
                suggestionsEl.innerHTML = `
                    <div class="search-suggestion-title">No results found</div>
                    <p style="color: var(--text-dim); font-size: 13px;">Try searching for "Taj Mahal" or "Learning Kit"</p>
                `;
            }
        }
    });
}

// ==================== COUNTDOWN ====================
function initCountdown() {
    const target = new Date();
    target.setDate(target.getDate() + 3);
    target.setHours(0, 0, 0, 0);

    function update() {
        const now = new Date();
        const diff = target - now;
        if (diff <= 0) return;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        $("#countdown-days").textContent = String(days).padStart(2, '0');
        $("#countdown-hours").textContent = String(hours).padStart(2, '0');
        $("#countdown-mins").textContent = String(mins).padStart(2, '0');
        $("#countdown-secs").textContent = String(secs).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

// ==================== HERO STATS COUNTER ====================
function initHeroStats() {
    const stats = $$(".hero-stat-value[data-count]");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);

        if (target >= 1000) {
            el.textContent = (value / 1000).toFixed(0) + 'K';
        } else {
            el.textContent = value;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (target >= 1000) {
                el.textContent = (target / 1000) + 'K';
            } else {
                el.textContent = target;
            }
        }
    }

    requestAnimationFrame(update);
}

// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
    const elements = $$('.category-card, .feature-card, .testimonial-card, .section-header, .deals-content, .newsletter-inner');
    
    elements.forEach((el, i) => {
        el.classList.add('reveal');
        if (i % 4 < 4) {
            el.classList.add(`reveal-delay-${(i % 4) + 1}`);
        }
    });

    $$('.reveal').forEach(el => observeElement(el));
}

function observeElement(el) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    observer.observe(el);
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const btn = $("#mobile-menu-btn");
    const nav = $("#nav");

    btn.addEventListener("click", () => {
        btn.classList.toggle("open");
        nav.classList.toggle("mobile-open");
        document.body.style.overflow = nav.classList.contains("mobile-open") ? "hidden" : "";
    });

    $$(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            btn.classList.remove("open");
            nav.classList.remove("mobile-open");
            document.body.style.overflow = "";
        });
    });
}

// ==================== NEWSLETTER ====================
function initNewsletter() {
    $("#newsletter-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = $("#newsletter-email").value;
        if (email) {
            showToast("Welcome to the Heritage Circle! Check your email.");
            $("#newsletter-form").reset();
        }
    });
}

// ==================== TOAST ====================
function showToast(message) {
    const toast = $("#toast");
    $("#toast-message").textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

// ==================== SMOOTH SCROLL ====================
$$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = $(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== 3D STACKED CAROUSEL (carousel-07) ====================
function initStackedCarousel() {
    const container = $("#stacked-carousel");
    const dragArea = $("#carousel-drag-area");
    const wrapper = $("#stacked-cards-wrapper");
    if (!container || !dragArea || !wrapper) return;

    const slides = [
        {
            image: "images/taj-mahal.jpg",
            title: "Taj Mahal Model",
            description: "Handcrafted marble-finish miniature 3D model replica.",
            badge: "India"
        },
        {
            image: "images/eiffel-tower.jpg",
            title: "Eiffel Tower Replica",
            description: "Antique bronze desk statue with intricate lattice detailing.",
            badge: "France"
        },
        {
            image: "images/colosseum.jpg",
            title: "Roman Colosseum",
            description: "Aged stone finish model capturing ancient Roman grandeur.",
            badge: "Italy"
        },
        {
            image: "images/pyramids.jpg",
            title: "Pyramids of Giza",
            description: "Desert terrain base with detailed golden limestone pyramids.",
            badge: "Egypt"
        },
        {
            image: "images/learning-kit.jpg",
            title: "Architecture Learning Kit",
            description: "Educational building set with flashcards & model monuments.",
            badge: "Learning Kit"
        }
    ];

    const total = slides.length;
    let progress = 0;
    let targetProgress = 0;
    let isDragging = false;
    let startX = 0;
    let startProgress = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let animationFrame = null;

    function getConfig(width) {
        if (width < 640) {
            return {
                distanceDivisor: 120,
                velocityDivisor: 500,
                sensitivity: 180,
                xMultiplier: 85,
                yMultiplier: 15,
                rotationMultiplier: 8,
                scaleReduction: 0.06
            };
        }
        if (width < 1024) {
            return {
                distanceDivisor: 160,
                velocityDivisor: 650,
                sensitivity: 220,
                xMultiplier: 125,
                yMultiplier: 25,
                rotationMultiplier: 10,
                scaleReduction: 0.09
            };
        }
        return {
            distanceDivisor: 200,
            velocityDivisor: 800,
            sensitivity: 250,
            xMultiplier: 170,
            yMultiplier: 35,
            rotationMultiplier: 12,
            scaleReduction: 0.12
        };
    }

    // Build DOM
    wrapper.innerHTML = slides.map((slide, i) => `
        <div class="stacked-card" id="stacked-card-${i}">
            <img src="${slide.image}" alt="${slide.title}" class="stacked-card-img">
            <div class="stacked-card-overlay"></div>
            <span class="stacked-card-badge">${slide.badge}</span>
            <div class="stacked-card-content">
                <h4 class="stacked-card-title">${slide.title}</h4>
                <p class="stacked-card-desc">${slide.description}</p>
            </div>
        </div>
    `).join('');

    const cards = $$(".stacked-card");

    function updateCards() {
        const config = getConfig(window.innerWidth);

        cards.forEach((card, index) => {
            let diff = (index - progress) % total;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const x = diff * config.xMultiplier;
            const absDiff = Math.abs(diff);
            const rotate = absDiff < 0.05 ? 0 : diff * config.rotationMultiplier;
            const y = absDiff < 0.05 ? 0 : absDiff * config.yMultiplier;
            const scale = Math.max(0.6, 1 - absDiff * config.scaleReduction);
            const zIndex = Math.round(100 - absDiff * 10);
            
            // Opacity calculation
            let opacity = 1;
            if (absDiff > total / 2 - 0.5) {
                opacity = Math.max(0, 1 - (absDiff - (total / 2 - 0.5)) * 2);
            }

            card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
            card.style.zIndex = zIndex;
            card.style.opacity = opacity;
        });
    }

    function animateSpring() {
        if (!isDragging) {
            // Spring interpolation
            const diff = targetProgress - progress;
            progress += diff * 0.12;

            if (Math.abs(diff) < 0.001) {
                progress = targetProgress;
            } else {
                animationFrame = requestAnimationFrame(animateSpring);
            }
        }
        updateCards();
    }

    function onPointerDown(e) {
        isDragging = true;
        startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        lastX = startX;
        lastTime = performance.now();
        startProgress = progress;
        velocity = 0;
        if (animationFrame) cancelAnimationFrame(animationFrame);
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const config = getConfig(window.innerWidth);
        const deltaX = currentX - lastX;
        const now = performance.now();
        const dt = Math.max(1, now - lastTime);
        velocity = (deltaX / dt) * 1000;

        lastX = currentX;
        lastTime = now;

        const delta = -(currentX - startX) / config.sensitivity;
        progress = startProgress + delta;
        updateCards();
    }

    function onPointerUp(e) {
        if (!isDragging) return;
        isDragging = false;
        const config = getConfig(window.innerWidth);
        const dragDistance = lastX - startX;

        const distanceShift = -dragDistance / config.distanceDivisor;
        const velocityShift = -velocity / config.velocityDivisor;

        let totalShift = Math.round(distanceShift + velocityShift);
        totalShift = Math.max(-3, Math.min(3, totalShift));

        targetProgress = Math.round(startProgress) + totalShift;
        animationFrame = requestAnimationFrame(animateSpring);
    }

    // Event listeners
    dragArea.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    dragArea.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    window.addEventListener("resize", () => {
        updateCards();
    });

    // Control buttons
    $("#prev-slide-btn")?.addEventListener("click", () => {
        targetProgress = Math.round(progress) - 1;
        if (animationFrame) cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(animateSpring);
    });

    $("#next-slide-btn")?.addEventListener("click", () => {
        targetProgress = Math.round(progress) + 1;
        if (animationFrame) cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(animateSpring);
    });

    updateCards();
}
