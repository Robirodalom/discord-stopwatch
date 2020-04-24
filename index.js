const Discord = require("discord.js");
const bot = new Discord.Client();
require('dotenv').config();

const { prefix, token } = require("./config.json");
var counter;
var s;
var msg
var smartCount = true;

bot.on("ready", () => {
  console.log("Online");
});

bot.on("message", (message) => {
  if (message.content == "!greet") {
    message.reply("Üdv!");
  }
});

bot.on("message", (message) => {
    msg = message;
    if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
    } 
    else {
        const args = message.content.slice(prefix.length).split(" ");
        const command = args.shift().toLowerCase();

    if (command === "server") {
      message.channel.send(`Bot is online in server : ${message.guild.name}`);
    }

    if (command === "ping") {
      message.channel.send("Pong");
    }

    if (command === "számolj") {
      if (args.length > 0) {

        if (args[0].isNumber()) {
          counter = parseInt(args[0]);

          if (counter <= 1 || counter >= 86400) {
            message.channel.send("Csak 1 és 86400 közötti értéket adj meg.");
            return;
          } else {
            message.channel.send("Óra indul");
            timer();
          }
        } else {
          message.channel.send("Hibás az első paraméter");
          return;
        }
      }
    }
    if (command === "stop") {
        counter = -1;
        message.channel.send("Stopper leállítva");
      }
  }
});

function sub() {
  counter--;
  if (counter > 0) {
    if(counter % 30 == 0 && smartCount){
        sendTimeLeft();
    }
    console.log(counter);
    timer();
  }else{
    sendTimerOut()
  }
}
function timer() {
  s = setTimeout(sub, 1000);
}

function sendTimeLeft() {
    msg.channel.send(counter + " másodperc van vissza");    
}

function sendTimerOut(){
    msg.channel.send("LEJÁRT AZ IDŐ! :(")
}

String.prototype.isNumber = function () {
  return /^\d+$/.test(this);
};


bot.login(process.env.stopwatch_token);
