const socket = io()
socket.emit("message", "Listo para operar")

const messageContainer = document.getElementById("messageContainer")
const productContainer = document.getElementById("productContainer")
const productForm = document.getElementById("productForm")

socket.on("message", data => {
    messageContainer.innerHTML = `<p>${data}</p>`
})

socket.on("productContainer", data => {
    productContainer.innerHTML = ""
    data.forEach(e => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "tarjetaProducto"
        tarjetaProducto.innerHTML = `
            <h2>${e.title}</h2>
            <p>${e.price}</p>
            <button id="erase${e.id}">X</button>
            `
        productContainer.appendChild(tarjetaProducto)
        let eraseProduct = document.getElementById(`erase${e.id}`)
        eraseProduct.addEventListener("click", (e) => {
            fetch(`/api/products/${e.id}`, { method: "DELETE" })
                .then(res => {
                    if (res.ok) {
                        tarjetaProducto.remove()
                        socket.emit("productContainer")
                    }
                })
                .catch(err => {
                    console.error(err)
                    messageContainer.innerHTML = `<p>Error: ${err.message}</p>`
                })
        })
    })
})

productForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(productForm)

    fetch("/api/products", { method: "POST", body: formData })
        .then(res => res.json())
        .then(data => {
            messageContainer.innerHTML = `<p>${data.message}</p>`
            if (data.message === "Producto agregado exitosamente") {
                socket.emit("productContainer")
            }
        }).catch((err) => {
            console.error(err)
            messageContainer.innerHTML = `<p>Error: ${err.message}`
        })
})