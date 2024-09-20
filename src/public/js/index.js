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

    data.forEach(product => {
        const tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "tarjetaProducto"
        tarjetaProducto.dataset.id = product.id

        tarjetaProducto.innerHTML = `
            <h2>${product.title}</h2>
            <p>${product.price}</p>
            <button data-id="${product.id}">Eliminar</button>
        `

        productContainer.appendChild(tarjetaProducto)

        const deleteButton = tarjetaProducto.querySelector("button")
        deleteButton.addEventListener("click", () => {
            const productId = deleteButton.dataset.id

            fetch(`/api/products/${productId}`, {
                method: "DELETE"
            })
                .then(response => {
                    if (response.ok) {
                        console.log("Producto eliminado correctamente")
                        tarjetaProducto.remove()
                        socket.emit("productDeleted", productId)
                    } else {
                        console.error("Error al eliminar el producto")
                        messageContainer.innerHTML = `<p>Error: ${response.statusText}</p>`
                    }
                })
                .catch(error => {
                    console.error(error)
                    messageContainer.innerHTML = `<p>Error: ${error.message}</p>`
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