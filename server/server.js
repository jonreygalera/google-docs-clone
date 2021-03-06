const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        method: [ 'GET', 'POST' ]
    }
});

io.on("connection", socket => {
    socket.on("get-document", documentId => {
        const data = "";
        socket.join(documentId);
        socket.emit("load-document", data);
        socket.on("send-changes", delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta);
        });
    });

    socket.on("save-document", data => {
        console.log(data);
    });
});