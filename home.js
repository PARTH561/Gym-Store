const products = [
    { id: 1, name: 'Gym T-Shirt', category: 'clothing', price: 999, img: 'https://via.placeholder.com/200x200?text=Shirt' },
    { id: 2, name: 'Protein Shaker', category: 'accessories', price: 499, img: 'https://via.placeholder.com/200x200?text=Shaker' },
    { id: 3, name: 'Whey Protein', category: 'supplements', price: 2499, img: 'https://via.placeholder.com/200x200?text=Protein' },
    { id: 4, name: 'Joggers', category: 'clothing', price: 1199, img: 'https://via.placeholder.com/200x200?text=Joggers' },
  ];
  
  let cart = [];
  
  function renderProducts(productList) {
    const container = document.getElementById('product-list');
    container.innerHTML = '';
    productList.forEach(p => {
      container.innerHTML += `
        <div class="product">
          <img src="${p.img}" alt="${p.name}">
          <h4>${p.name}</h4>
          <p>₹${p.price}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
  }
  
  function filterProducts(category) {
    if (category === 'all') {
      renderProducts(products);
    } else {
      renderProducts(products.filter(p => p.category === category));
    }
  }
  
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    document.getElementById('cart-count').innerText = cart.length;
  }
  
  document.getElementById('cart-btn').addEventListener('click', () => {
    const modal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    modal.style.display = 'block';
    cartItems.innerHTML = '';
    cart.forEach(item => {
      cartItems.innerHTML += `<li>${item.name} - ₹${item.price}</li>`;
    });
  });
  
  function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
  }
  
  window.onload = () => {
    renderProducts(products);
  };
  