const socket = io()

socket.emit("message", "Listo para operar")

const messageContainer = document.getElementById("messageContainer")
socket.on("message", data => {
    messageContainer.innerHTML = `<p>${data}</p>`
})

const productContainer = document.getElementById("productContainer")
socket.on("productContainer", data => {
productContainer.innerHTML=""
    data.forEach(e => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.innerHTML=`
        <h2>${e.title}</h2>
        <p>${e.price}</p>
        `
        productContainer.appendChild(tarjetaProducto)
    })
})