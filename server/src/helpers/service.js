import Jwt  from 'jsonwebtoken';
import moment from "moment-timezone"
 export const  createToken= (user) =>{

    const payload = {
        username:user.name,
        email:user.email,
        id:user._id
    }
    return  Jwt.sign(payload,process.env.KEY_JWT,{expiresIn:"1d"})
  
}

export const  randomString =(len, charSet)=> {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

export const durationHourUpdate = (date)=>{
    const now = moment(date); //todays date
    const end = moment(new Date); // another date
    const duration = moment.duration(end.diff(now));
    return duration.asHours()
}