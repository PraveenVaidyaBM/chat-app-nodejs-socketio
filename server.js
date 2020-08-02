const io = require('socket.io')(3000)

const user={}

io.on('connection', socket=>{
  // socket.emit('chat-message', 'Hello World')

// to establish user connection
  socket.on('new-user',name=>{
      user[socket.id]=name;
      socket.broadcast.emit('user-coonected',name)
  })

  // disconnecting user from chat
  socket.on('disconnect',()=>{
    socket.broadcast.emit('user-disconnected',user[socket.id])
    delete user[socket.id]
})

    // to send the chat to others by displaying name along with Id
    socket.on('send-chat-message',message=>{
        socket.broadcast.emit('chat-message', {message:message,name:user[socket.id]})
    })

})