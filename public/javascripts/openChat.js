var socket = io();
const chatList = document.querySelector('.chatList');
let textarea = document.querySelector('#chatMsg');
let chatBtn = document.querySelector('.chatBtn');
let username = document.querySelector('#username').innerHTML;

socket.emit('username', username);

chatBtn.addEventListener('click', ()=>{
    let messages = textarea.value.trim();
    if(messages.length > 0){
        sendMessages(messages);
        // console.log(messages)
        textarea.value = '';
    }
})


function sendMessages(msg) {
    let obj = {
        username: username,
        messages: msg
    }
    
    appendMessage(obj , "outgoingMsg");
    scrollToBottom();
    
    socket.emit('messages', obj)
}

socket.on('messages', data =>{
    appendMessage(data, 'incomingMsg');
    scrollToBottom();
})

function appendMessage(msg, type) {
    let messageDiv = document.createElement('li')
    let className = type;
    messageDiv.classList.add(className);

    let contents = `
        <h5>${msg.username}</h5>
        <h3>${msg.messages}</h3>
    `

    messageDiv.innerHTML = contents;
    // https://www.encodedna.com/javascript/append-or-add-text-to-div-using-javascript.htm#:~:text=Method%202%3A%20Add%20text%20to%20DIV%20using%20appendChild()%20Method&text=With%20innerHTML%2C%20you%20can%20directly,contents%20to%20the%20.
    // appendchild definetion in above linkn
    chatList.appendChild(messageDiv);
}


function scrollToBottom() {
    chatList.scrollTop = chatList.scrollHeight;
}