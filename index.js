const Discord = require("discord.js");
const bot = new Discord.Client();
require('dotenv').config();

const { prefix, token } = require("./config.json");
var counter;
var s;
var msg

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
      message.channel.send("Nem parancs lett megadva!")
    return;
    } 
    else {
        const args = message.content.slice(prefix.length).split(" ");
        const command = args.shift().toLowerCase();

    if (command === "server") {
      message.channel.send(`Bot is online in server : ${message.guild.name}`);
    }

    else if (command === "ping") {
      message.channel.send("Pong");
    }

    else if (command === "számolj") {
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
    else if (command === "stop") {
        counter = -1;
        message.channel.send("Stopper leállítva " + counter + " másodperc volt vissza");
    }
    else {
      message.channel.send("Hibás parancs lett megadva");
    }
  }
});

function sub() {
  counter--;
  if (counter > 0) {
    if(counter % 30 == 0){
        sendTimeLeft();
    }
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
