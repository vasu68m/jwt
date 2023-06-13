const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = 'rasengan';

app.get('/', (req, resp)=>{
    resp.json({
        message: 'hi ballu'
    })
});

app.post('/login', (req, resp)=>{
    const user={
id:1,
name:'Minato Namikaze',
email:'theyelloflash@konoha.com'
    }
    // now we will try to obtain token
 jwt.sign({user}, secretKey, { expiresIn: '300s'}, (err, token)=>{
    resp.json({
        token
    })
 })  
});

// trying to access profile by token verification
app.post('/profile', verifytoken, (req, resp)=>{
jwt.verify(req.token, secretKey, (err, authData)=>{
    if(err){
resp.send('token not verified, profile access granted')
    }else{
resp.json({
    message: 'profile access granted',
    authData 
})
    }
})
})

// function for verifying token
function verifytoken(req, resp, next){
const bearerHeader = req.headers['authorization'];

if(typeof bearerHeader !== 'undefined'){
const bearer = bearerHeader.split(' ');
const token = bearer[1];
req.token = token;
next();
} else {
resp.send({
   result: 'invalid token' 
})
}
}

app.listen(6000, ()=>{
    console.log('app is working fine')
});