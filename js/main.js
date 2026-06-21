const products = [
  { id: 1,  name: "T-shirts with multiple colors, for men", price: 10.30, oldPrice: 18.00, rating: 4.5, reviews: 154, img: "images/Bitmap.png" },
  { id: 2,  name: "Jeans shorts for men blue color",        price: 10.30, oldPrice: null,  rating: 4.0, reviews: 89,  img: "images/jean.jfif" },
  { id: 3,  name: "Brown winter coat medium size",          price: 12.50, oldPrice: 24.00, rating: 4.8, reviews: 312, img: "images/2 1.png" },
  { id: 4,  name: "Jeans bag for travel for men",           price: 34.00, oldPrice: null,  rating: 4.2, reviews: 47,  img: "images/image 26.png" },
  { id: 5,  name: "Leather wallet",                         price: 99.00, oldPrice: 128.00,rating: 4.6, reviews: 203, img: "images/image 24.png" },
  { id: 6,  name: "Canon camera black, 100x zoom",          price: 9.99,  oldPrice: null,  rating: 3.9, reviews: 65,  img: "images/image 23.png" },
  { id: 7,  name: "Headset for gaming with mic",            price: 8.99,  oldPrice: 15.00, rating: 4.4, reviews: 178, img: "images/game.jfif" },
  { id: 8,  name: "Smartwatch silver color modern",         price: 10.30, oldPrice: null,  rating: 4.7, reviews: 256, img: "images/watch.jfif" },
  { id: 9,  name: "Smartphone latest model",                price: 10.30, oldPrice: 22.00, rating: 4.3, reviews: 91,  img: "images/8.png" },
  { id: 10, name: "Laptop ultrabook slim",                  price: 80.95, oldPrice: null,  rating: 4.1, reviews: 39,  img: "images/image 34.png" },
];

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
  if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
  for (let i = full + (half ? 1 : 0); i < 5; i++) html += '<i class="fa-regular fa-star"></i>';
  return html;
}

function createProductCard(product) {
  const discount = product.oldPrice ? Math.round(100 - (product.price / product.oldPrice) * 100) : null;
  return `
    <div class="product-card">
      <div class="product-card-media" onclick="window.location='product-detail.html'">
        <img src="${product.img}" alt="${product.name}" />
        ${discount ? `<span class="badge red card-badge">-${discount}%</span>` : ''}
        <button class="wishlist-btn" onclick="event.stopPropagation(); toggleWishlist(this)"><i class="fa-regular fa-heart"></i></button>
      </div>
      <div class="card-body" onclick="window.location='product-detail.html'">
        <div class="price-row">
          <span class="price">$${product.price.toFixed(2)}</span>
          ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
        </div>
        <div class="name">${product.name}</div>
        <div class="card-rating">
          <span class="stars-row">${renderStars(product.rating)}</span>
          <span class="rating-num">${product.rating}</span>
          <span class="review-count">(${product.reviews})</span>
          <span class="order-count">${product.reviews} orders</span>
        </div>
        <span class="free-shipping-tag">Free Shipping</span>
      </div>
    </div>
  `;
}

function toggleWishlist(btn) {
  btn.classList.toggle('active');
  const icon = btn.querySelector('i');
  icon.classList.toggle('fa-regular');
  icon.classList.toggle('fa-solid');
}

const productsGrid = document.getElementById('productsGrid');
if (productsGrid) productsGrid.innerHTML = products.map(createProductCard).join('');

const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const productsContainer = document.getElementById('productsContainer');
if (productsContainer) {
  productsContainer.innerHTML = products.map(createProductCard).join('');
  if (gridBtn) gridBtn.addEventListener('click', function () {
    productsContainer.classList.remove('list-view');
    productsContainer.classList.add('grid-view');
    gridBtn.classList.add('active'); listBtn.classList.remove('active');
  });
  if (listBtn) listBtn.addEventListener('click', function () {
    productsContainer.classList.remove('grid-view');
    productsContainer.classList.add('list-view');
    listBtn.classList.add('active'); gridBtn.classList.remove('active');
  });

  /* Mobile grid/list toggle */
  const mobileGridBtn = document.getElementById('mobileGridBtn');
  const mobileListBtn = document.getElementById('mobileListBtn');
  if (mobileGridBtn) mobileGridBtn.addEventListener('click', function () {
    productsContainer.classList.add('grid-view-mobile');
    mobileGridBtn.classList.add('active'); mobileListBtn.classList.remove('active');
  });
  if (mobileListBtn) mobileListBtn.addEventListener('click', function () {
    productsContainer.classList.remove('grid-view-mobile');
    mobileListBtn.classList.add('active'); mobileGridBtn.classList.remove('active');
  });

  /* You may also like (mobile) */
  const alsoLikeContainer = document.getElementById('alsoLikeContainer');
  if (alsoLikeContainer) alsoLikeContainer.innerHTML = products.slice(0, 4).map(createProductCard).join('');
}

const relatedGrid = document.getElementById('relatedGrid');
if (relatedGrid) relatedGrid.innerHTML = products.slice(0, 6).map(createProductCard).join('');

const searchInput = document.getElementById('searchInput');
if (searchInput) searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && searchInput.value.trim()) alert('Searching for: ' + searchInput.value.trim());
});

function openTab(event, tabId) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const tab = document.getElementById(tabId);
  if (tab) tab.classList.add('active');
  event.currentTarget.classList.add('active');
}

function changeImage(clickedThumb) {
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  clickedThumb.classList.add('active');
  const mainImg = document.getElementById('mainImage');
  if (mainImg) mainImg.src = clickedThumb.src;
}

const addToCartBtn = document.getElementById('addToCartBtn');
if (addToCartBtn) addToCartBtn.addEventListener('click', function () {
  const size = document.getElementById('sizeDropdown');
  if (size && size.value === '') { alert('Please select a size first!'); return; }
  alert('Inquiry sent successfully!');
});

const countBoxes = document.querySelectorAll('.count-box span');
if (countBoxes.length > 0) {
  let s = 56, m = 34, h = 13, d = 4;
  setInterval(function () {
    s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; d--; } if (d < 0) d = 0;
    countBoxes[0].textContent = String(d).padStart(2,'0');
    countBoxes[1].textContent = String(h).padStart(2,'0');
    countBoxes[2].textContent = String(m).padStart(2,'0');
    countBoxes[3].textContent = String(s).padStart(2,'0');
  }, 1000);
}

/* ===========================
   MOBILE MENU TOGGLE
=========================== */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', function () {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.toggle('mobile-open');
  });
}

/* ===========================
   CART PAGE LOGIC
=========================== */
const savedItems = [
  { name: "GoPro HER4K Action Camera - Black", price: "$99.50", img: "images/6.png" },
  { name: "GoPro Sumsung altra mobile- Black", price: "$99.50", img: "images/image 33.png" },
  { name: "pro HERO6 600 resol MObile- Black", price: "$99.50", img: "images/image 23.png" },
  { name: "GoPro HERO677 DEll  laptop- Black", price: "$99.50", img: "images/image 34.png" },
];

function createSavedCard(item) {
  return `
    <div class="saved-card">
      <img src="${item.img}" alt="${item.name}" />
      <div class="card-body">
        <div class="price">${item.price}</div>
        <div class="name">${item.name}</div>
        <button class="btn-move-cart"><i class="fa-solid fa-cart-plus"></i> Move to cart</button>
      </div>
    </div>
  `;
}

function createSavedCardMobile(item) {
  return `
    <div class="saved-card-mobile">
      <img src="${item.img}" alt="${item.name}" />
      <div class="saved-info">
        <div class="name">${item.name}</div>
        <div class="price">${item.price}</div>
        <div class="saved-actions">
          <button class="btn-move-cart-sm">Move to cart</button>
          <button class="btn-remove-sm">Remove</button>
        </div>
      </div>
    </div>
  `;
}

const savedGrid = document.getElementById('savedGrid');
const savedListMobile = document.getElementById('savedListMobile');

function renderSavedItems() {
  if (savedGrid) savedGrid.innerHTML = savedItems.map(createSavedCard).join('');
  if (savedListMobile) savedListMobile.innerHTML = savedItems.map(createSavedCardMobile).join('');
}
renderSavedItems();

function recalcCartTotals() {
  const cartItems = document.querySelectorAll('#cartItemsCol .cart-item');
  let subtotal = 0;
  cartItems.forEach(item => subtotal += parseFloat(item.dataset.price || 0));

  const discount = 60.00;
  const tax = 14.00;
  const total = subtotal - discount + tax;

  const subtotalVal = document.getElementById('subtotalVal');
  const totalVal = document.getElementById('totalVal');
  const cartItemCount = document.getElementById('cartItemCount');
  const mobileCartCount = document.querySelectorAll('.cart-count');

  if (subtotalVal) subtotalVal.textContent = '$' + subtotal.toFixed(2);
  if (totalVal) totalVal.textContent = '$' + total.toFixed(2);
  if (cartItemCount) cartItemCount.textContent = cartItems.length;
  mobileCartCount.forEach(el => el.textContent = cartItems.length);

  const mobileSubtotalVal = document.getElementById('mobileSubtotalVal');
  const mobileTotalVal = document.getElementById('mobileTotalVal');
  const mobileItemCount = document.getElementById('mobileItemCount');
  const mobileCheckoutCount = document.getElementById('mobileCheckoutCount');
  const mobileShipping = 10.00, mobileTax = 7.00;
  if (mobileSubtotalVal) mobileSubtotalVal.textContent = '$' + subtotal.toFixed(2);
  if (mobileTotalVal) mobileTotalVal.textContent = '$' + (subtotal + mobileShipping + mobileTax).toFixed(2);
  if (mobileItemCount) mobileItemCount.textContent = cartItems.length;
  if (mobileCheckoutCount) mobileCheckoutCount.textContent = cartItems.length;

  const cartItemsCol = document.getElementById('cartItemsCol');
  if (cartItemsCol && cartItems.length === 0) {
    const emptyMsg = cartItemsCol.querySelector('.empty-cart');
    if (!emptyMsg) {
      const div = document.createElement('div');
      div.className = 'empty-cart';
      div.innerHTML = '<i class="fa-solid fa-cart-shopping"></i><p>Your cart is empty</p><a href="products.html" class="btn-back-shop">Start shopping</a>';
      cartItemsCol.prepend(div);
    }
  }
}

function updateItemPrice(cartItem) {
  const unit = parseFloat(cartItem.dataset.unitPrice || 0);
  const qtyInput = cartItem.querySelector('.qty-input');
  const qty = qtyInput ? parseInt(qtyInput.value, 10) : 1;
  const newPrice = unit * qty;
  cartItem.dataset.price = newPrice.toFixed(2);
  const priceEl = cartItem.querySelector('.cart-item-price');
  if (priceEl) priceEl.textContent = '$' + newPrice.toFixed(2);
}

document.querySelectorAll('.cart-item .qty-select').forEach(select => {
  select.addEventListener('change', recalcCartTotals);
});

document.querySelectorAll('.cart-item .qty-minus').forEach(btn => {
  btn.addEventListener('click', function () {
    const cartItem = this.closest('.cart-item');
    const input = cartItem.querySelector('.qty-input');
    let val = parseInt(input.value, 10);
    if (val > 1) { val--; input.value = val; updateItemPrice(cartItem); recalcCartTotals(); }
  });
});
document.querySelectorAll('.cart-item .qty-plus').forEach(btn => {
  btn.addEventListener('click', function () {
    const cartItem = this.closest('.cart-item');
    const input = cartItem.querySelector('.qty-input');
    let val = parseInt(input.value, 10);
    val++; input.value = val; updateItemPrice(cartItem); recalcCartTotals();
  });
});

document.querySelectorAll('.cart-item .link-remove').forEach(btn => {
  btn.addEventListener('click', function () {
    const item = this.closest('.cart-item');
    if (item) { item.remove(); recalcCartTotals(); }
  });
});

document.querySelectorAll('.cart-item .link-save').forEach(btn => {
  btn.addEventListener('click', function () {
    const item = this.closest('.cart-item');
    if (item) {
      const img = item.querySelector('img').src;
      const name = item.querySelector('h4').textContent;
      const price = item.querySelector('.cart-item-price').textContent;
      savedItems.push({ name: name, price: price, img: img });
      renderSavedItems();
      item.remove();
      recalcCartTotals();
    }
  });
});

document.querySelectorAll('.cart-item .cart-item-menu').forEach(btn => {
  btn.addEventListener('click', function () {
    const item = this.closest('.cart-item');
    if (item && confirm('Remove this item from cart?')) {
      item.remove();
      recalcCartTotals();
    }
  });
});

const removeAllBtn = document.getElementById('removeAllBtn');
if (removeAllBtn) {
  removeAllBtn.addEventListener('click', function () {
    document.querySelectorAll('#cartItemsCol .cart-item').forEach(item => item.remove());
    recalcCartTotals();
  });
}

if (document.getElementById('cartItemsCol')) recalcCartTotals();

if (savedGrid) {
  savedGrid.addEventListener('click', function (e) {
    if (e.target.closest('.btn-move-cart')) {
      alert('Item moved to cart!');
    }
  });
}
if (savedListMobile) {
  savedListMobile.addEventListener('click', function (e) {
    if (e.target.closest('.btn-move-cart-sm')) {
      alert('Item moved to cart!');
    }
    if (e.target.closest('.btn-remove-sm')) {
      e.target.closest('.saved-card-mobile').remove();
    }
  });
}
