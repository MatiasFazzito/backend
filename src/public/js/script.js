function fetchCarts() {
  fetch('/cart/allCarts')
    .then(response => response.json())
    .then(carts => {
      populateCartSelect(carts)
    })
    .catch(error => {
      console.error('Error fetching carts:', error)
    })
}

function populateCartSelect(carts) {
  const cartId = document.getElementById('cartId')
  if (cartId) {
    carts.forEach(cart => {
      const option = document.createElement('option')
      option.value = cart._id
      option.text = cart._id
      cartId.appendChild(option)
    })
    cartId.addEventListener('change', () => {
      selectedCartId = cartId.value
    })
  }
}

function fetchProducts() {
  fetch('product/allproducts')
  .then(response => response.json())
  .then(products =>{
    populateProductSelect(products)
  })
  .catch(error => {
    console.error('Error fetching products:', error)
  })
}

function populateProductSelect(products) {
  const productId = document.getElementById('productId')
  if (productId) {
    products.forEach(product => {
      const option = document.createElement('option')
      option.value = product._id
      option.text = product.title
      productId.appendChild(option)
    })
    productId.addEventListener('change', () => {
      selectedProductId = productId.value
    })
  }
}

fetchCarts()
fetchProducts()