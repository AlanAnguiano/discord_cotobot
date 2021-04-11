require("dotenv").config();

const { SSL_OP_ALL } = require("constants");
var Discord = require("discord.js");
//var auth = require('./auth.json');
var bot = new Discord.Client();
var http = require("http");
var responses = ["op", "webos","wz","warzone","no se","no le se", "ni idea","no le sabe","ahorita entro",
                 "mimir","viernes de wz","sabado de wz","antoja","f",
                ];
var rbjobs = ["no le sabes?","si no le sabes no le muevas","si we?","ni pedo",
              "no te tocaba","Dios aprieta pero no ahorca","pongan al komander",
             ];

function isNotBot(user) {
  return !user.bot;
}

function customResp(user, str, msg) {
  if(str === responses[13] && msg.content.length < 2){
    return "* Usted presionó (F) para mostrar respeto *" 
  }
  if(str === responses[12]){
    return "en terminos de antojar, ya antojaron";
  }
//   if(str === responses[10] || str === responses[11]){ /* CHECAR EL METODO CARNAL*/
//     let today = new Date();
//     console.log(today.getDay());
//     if(today.getDay() == 5 ){
//       return "arreeee, ya es viernes que se arma?, noche de warzone? :yum:  o que hacemos? :thinking: "
//     }else{
//       if(today.getDay() == 6 ){
//         return "arreeee, ya es sabado que se arma?, noche de warzone? :yum:  o que hacemos? :thinking: "
//       }else{
//         return "ni es fin de semana perro, checale bien"
//       }
//     }
//   }

  if(str === responses[9]){
    return "khomoooooooo, si es bien temprano :tired_face: "+"<@"+user.id+">"
  }

  if(str === responses[8]){
    return "si no es cuando tu quieras hdptm "+"<@"+user.id+">"
  }

  if(str === responses[7] && msg.content.includes('<@!')){
    return "simon, no le sabe ese we "+ msg.content.split(" ").pop();
  }

  if(str === responses[4] || str === responses[5] || str === responses[6]){
    return "no le sabeeeee (con voz cantadita) el "+ "<@" + user.id + ">";
  }

  if (str === responses[2] || str === responses[3]) {
    return "alguien dijo wz? :hedgehog:";
  }

  if (str === responses[1]) {
    return str.toUpperCase() + " :fist: <@" + user.id + ">";
  }
  return str + ", " + "<@" + user.id + ">, un warzone o que?";
}

function itNeedResponse(msg) {
  if (responses.some((v) => msg.toLowerCase().includes(v))) {
    return true;
  }
}

function selectMsgType(msg) {
  var resp = responses.map(function (substr) {
    if (msg.content.toLowerCase().indexOf(substr) > -1) {
      return customResp(msg.author, substr, msg);
    }
  });

  var filtered = resp.filter(function (el) {
    return el != null;
  });

  return filtered[0];
}

http
  .createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
  })
  .listen(8080);

bot.on("ready", () => {
  console.log("Your Bot is now Online.");
  bot.user.setActivity("YouTube", {
    type: "STREAMING",
    url: "https://www.youtube.com/watch?v=rRPQs_kM_nw",
  });
});

bot.on("message", function (msg) {
  if (isNotBot(msg.author) && itNeedResponse(msg.content)) {
    msg.channel.send(selectMsgType(msg));
  }
});

bot.login(process.env.BOT_TOKEN);
