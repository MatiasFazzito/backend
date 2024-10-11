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

  fetchProducts()