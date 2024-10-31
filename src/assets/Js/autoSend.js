var setHour = 20;
const date = new Date();
var systemHour = date.getHours();
if(systemHour == setHour){
    var data = {
        name:"Auto Send",
        email:"kimlongkun2412@gmail.com",
        message:`
            <b>Now is ${setHour} </b>
        `,
    }
    emailjs.send('service_lmqt8nr','template_g7x7rj7',data);
    console.log("Success");
    
}
console.log("couting");
