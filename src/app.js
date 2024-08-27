import http from "http";

const port = 8080

const server = http.createServer(
    (request, response) => {
        response.end("mi primer hola mundo desde backend")
    }
)

server.listen(port, ()=>{
    console.log("Listening on port 8080");
})