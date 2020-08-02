const socket = io(`http://localhost:3000`)
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')


socket.on('chat-message', data=>{
    appendMessage(`${data.name}:${data.message}`)
})

//prompt box to enter and display name
const name= prompt('Enter Your Name')
appendMessage('You Joined')
socket.emit('new-user',name);

//  to display to give notification someone entered chat 
socket.on('user-coonected', name=>{
    appendMessage(`${name} joined the chat`)
})

// to displaying notification about someone left the chat
socket.on('user-disconnected', name=>{
    appendMessage(`${name} left the chat`)
})

// code to display message in same window as soon as entered
// used DOM Manipulation to do that
messageForm.addEventListener('submit', e=>{
    e.preventDefault();
    const message= messageInput.value
    appendMessage(`You:${message}`)
    socket.emit('send-chat-message',message)
    messageInput.value=''
})

// to get the message and by using inner text and broadcast it to others
function appendMessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageContainer.append(messageElement)

}