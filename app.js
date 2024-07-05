const yogyaSelectorBtn = document.querySelector('#yogya-selector')
const kashishSelectorBtn = document.querySelector('#kashish-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat--button')

const messages= JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
 <div class="message ${message.sender === 'Yogya' ? 'blue-bg' : 'gray-bg'}">
 <div class="message-sender">${message.sender}</div>
 <div class="message-text">${message.text}</div>
 <div classs="message-timestamp">${message.timestamp}</div>
 </div>
`

window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message)
    })
}

let messageSender = 'Yogya'
const updateMessageSender = (name) => {
   messageSender = name
   chatHeader.innerText = `${messageSender} chatting...`
   chatInput.placeholder = `Type here, ${messageSender}...`

   if(name === 'Yogya') {
     yogyaSelectorBtn.classList.add('active-person')
     kashishSelectorBtn.classList.remove('active-person')
   }
   if(name === 'Kashish') {
    kashishSelectorBtn.classList.add('active-person')
    yogyaSelectorBtn.classList.remove('active-person')
  }

  chatInput.focus()
}

yogyaSelectorBtn.onclick = () => updateMessageSender('Yogya')
kashishSelectorBtn.onclick = () => updateMessageSender('Kashish')

const sendMessage = (e) => {
    e.preventDefault()

    const timestamp = new Date().toLocaleString('en-US', {hour:'numeric', minute: 'numeric', hour12: true})
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,

    }
    /* Save message to local storage */
    messages.push(message)
    localStorage.setItem('message', JSON.stringify(message))
    /* Create message element and add to DOM */
    chatMessages.innerHTML += createChatMessageElement(message)
    /* Clear input field */
    chatInputForm.reset()
    /* Scroll to bottom of chat messages */
    chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
    localStorage.clear()
    chatMessages.innerHTML = ''
})