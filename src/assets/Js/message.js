const sendMessage = ()=>{
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('msg').value;
    if(name!="" && email !="" && message!=""){
        var data = {
            name,
            email,
            message
        }
        emailjs.send('service_lmqt8nr','template_g7x7rj7',data);
        Swal.fire({
            title: "Sent",
            text: "Your message sent to KUN KIMLONG",
            icon: "success",
            footer: 'Thanks you...!',
            confirmButtonText: `
            Done
          `,
          });
    }
    else{
        Swal.fire({
            title: "Something Error",
            text: "Please fill name, email and message",
            icon: "error",
            footer: 'Thanks you...!',
            confirmButtonText: `
            Back
          `,
          });
    }
    
}
const clearData = ()=>{
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('msg').value = "";
}
$(document).ready(function(){
    $('#btnSend').click(function(e){
        
        // alert(123)
        e.preventDefault();
        sendMessage();
        clearData();
    })
})