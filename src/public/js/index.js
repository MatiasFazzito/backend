const socket = io()

socket.emit("message", "Hola aca estoy")
const messageContainer = document.getElementById("messageContainer")
socket.on("message", data => {
    messageContainer.innerHTML = `<p>${data}</p>`
})

