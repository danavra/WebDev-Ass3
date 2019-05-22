const express = require("express");
const app = express();
const secret = 'ILikeToMoveItMoveIt';
var jwt = require('jsonwebtoken');
var DButilsAzure = require('./DButils');
var tokenID=0;
app.use(express.json());


async function login(userName,password){
  DButilsAzure.execQuery(`SELECT  UserPassword FROM Users WHERE UserName = '${userName}'`)
  .then((response,err) =>{
    if(err){
      return { "code":401, "msg":"An unexpected error occurred"};
    }
    if(response.length===0){
      return { "code":400, "msg":"account does not exist"};
    }
    realPass=response[0].UserPassword;
    if(!realPass){
      return { "code":400, "msg":"invalid password"};
    }
    if(realPass==password){
        //password is correct
        console.log("yeyyeyeyeyeyeyeyeyeyey");
        //create and send tolke
        payload = {id: tokenID++, username: req.body['UserName'], admin: false};
        options = {expiresIn: "1d"};
        const token = jwt.sign(payload, secret, options);
        // jToken = JSON.parse(token);\
        console.log("dsgsdfhgdhgstdhstdhshsfjhfhfhd");
        return { "code":201, "msg":"token"};
    }


  })

  // x={ "code":401, "msg":"yey"};
  // console.log(x);
  //     return x;
  //   }

  //
  //   realPass=response[0].UserPassword;
  //
  //   if(!realPass){
  //   UserNotFound(res);
  //   }
  //
  //
  //
  //
  //
  // }).catch(err => {
  //   res.status(401).send("An unexpected error acured");
  // })



}
module.exports.login = login;


//
//
//   }
// }).catch(err => {
//   console.log("ENTERED CATCH\n"+err);
//   res.status(401).send("An unexpected error acured");
// });
//
//
//
// function UserNotFound(res){
//
//
// }
// function invalidPassword(res){
//   res.status(401).send("");
// }
