const products = [
  { id: 1,  name: "T-shirts with multiple colors, for men", price: "$10.30", img: "images/Bitmap.png" },
  { id: 2,  name: "Jeans shorts for men blue color",        price: "$10.30", img: "images/2 1.png" },
  { id: 3,  name: "Brown winter coat medium size",          price: "$12.50", img: "images/image 24.png" },
  { id: 4,  name: "Jeans bag for travel for men",           price: "$34.00", img: "images/image 26.png" },
  { id: 5,  name: "Leather wallet",                         price: "$99.00", img: "images/image 30.png" },
  { id: 6,  name: "Canon camera black, 100x zoom",          price: "$9.99",  img: "images/image 23.png" },
  { id: 7,  name: "Headset for gaming with mic",            price: "$8.99",  img: "images/image 85.png" },
  { id: 8,  name: "Smartwatch silver color modern",         price: "$10.30", img: "images/image 32.png" },
  { id: 9,  name: "Smartphone latest model",                price: "$10.30", img: "images/image 33.png" },
  { id: 10, name: "Laptop ultrabook slim",                  price: "$80.95", img: "images/image 34.png" },
];

function createProductCard(product) {
  return `
    <div class="product-card" onclick="window.location='product-detail.html'">
      <img src="${product.img}" alt="${product.name}" />
      <div class="card-body" >
        <div class="price">${product.price}</div>
        <div class="name">${product.name}</div>
       
      </div>
    </div>
  `;
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
