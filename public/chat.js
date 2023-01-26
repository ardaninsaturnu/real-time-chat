const socket =  io.connect( 'http://localhost:3000' );

const sender = document.querySelector('#sender');
const message = document.querySelector('#message');
const submitButton = document.querySelector('#submitButton');
const feedback = document.querySelector('#feedback');
const output = document.querySelector('#output');

submitButton.addEventListener( 'click', () => {
  socket.emit( 'chat', {
   message: message.value,
   sender: sender.value
  })
});

socket.on( 'chat', data => {
 feedback.innerHTML = '';
 output.innerHTML += `<p><strong>${ data.sender }:</strong> ${ data.message }</p>`;
 message.value = '';
})

message.addEventListener( 'keypress', () => {
  socket.emit( 'typing', sender.value )
})

socket.on( 'typing', data => {
  feedback.innerHTML = `${data} typing...`
})
