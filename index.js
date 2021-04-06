require('dotenv').config();

var Discord = require('discord.js');
//var auth = require('./auth.json');
var bot = new Discord.Client();
var http = require('http');
var responses = ['op', 'webos', 'wz' ,'warzone']

function isNotBot(user) {
    return !user.bot
}


function customResp(user, str) {
    if (str == responses[2] || str == responses[3]) {
        return "alguien dijo wz? :hedgehog:"
    }
    
    if (str == responses[1]) {
        return str.toUpperCase() + " :fist: <@"+ user.id + ">"
    }

    return str + ", " + "<@"+ user.id + ">, un warzone o que?"
}

function itNeedResponse(msg) {
    if (responses.some(v => msg.toLowerCase().includes(v))) {
        return true;
    }
}

function selectMsgType(msg) {
    var resp = responses.map(function (substr) {
        if (msg.content.toLowerCase().indexOf(substr) > -1) {
            return customResp(msg.author, substr)
        }  
    })
    
    var filtered = resp.filter(function (el) {
        return el != null;
    });

    return filtered[0];
}

http.createServer(function (req, res) {   
    res.write("I'm alive");   
    res.end(); 
  }).listen(8080);
  
bot.on('ready', () => {
    console.log('Your Bot is now Online.')
    bot.user.setActivity('YouTube', {type:"STREAMING", url:"https://www.youtube.com/watch?v=rRPQs_kM_nw"})
})

bot.on('message', function (msg) {
    if (isNotBot(msg.author) && itNeedResponse(msg.content)) {
        msg.channel.send(selectMsgType(msg))
    }
})

bot.login(process.env.BOT_TOKEN);

