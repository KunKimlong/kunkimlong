const sendMessage = ()=>{
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('msg').value;
    var data = {
        name,
        email,
        message
    }
    emailjs.send('service_lmqt8nr','template_g7x7rj7',data);
}
// alert(123)
$(document).ready(function(){
    $('#btnSend').click(function(e){
        // alert(123)
        e.preventDefault();
        sendMessage();
    })
})