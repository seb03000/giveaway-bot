// Load up delay library
const delay = require('delay');

// Load up the discord.js library
const Discord = require("discord.js");

// This is the client
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.
// config.address contains the TRTLAddress

const maxAddressSendDelay = 20000; //Milliseconds
const maxReactDelay = 5000; //Milliseconds
const minDelay = 5000; //Milliseconds

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
});


client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.
    
    //Ignore if author isn't a bot
    if(!message.author.bot) return;

    //Got a message from bot named TurtleBotRain
    if((message.author.username == "TurtleBotRain")){
    
	if((message.channel.type == "dm")){

	    console.log("Got DM from TurtleBotRain: "+message.content);	    

	    //Get the message contents
	    let msgContent = message.content
	    
	    //pull out the first custom emoji
	    var emojiStartPos = msgContent.indexOf(':')+1;
	    var emojiEndPos = msgContent.indexOf(':',emojiStartPos)
	    var emojiString = msgContent.substring(emojiStartPos,emojiEndPos)

	    // If this message has an emoji
	    if(emojiString){

		// Get the channel we want
		let testGuild = client.guilds.find("name","TurtleCoin");
		let testChannel = testGuild.channels.find("name", "raindance");

		// Get the last message in that channel
		testChannel.fetchMessage(testChannel.lastMessageID)
		    .then(delay((Math.random()*maxReactDelay)+minDelay))
		    .then(fetchedMsg => {

			// If we got a message
			if(fetchedMsg){

			    // Send the reaction
			    fetchedMsg.react(testGuild.emojis.find("name",emojiString));
			    console.log("Reacted to latest message in raindance");
			}
		    });
	    }
	}
	return;
    }
});

// This event will run on every single message received, from any channel or DM.
client.on("messageUpdate", (oldMessage, newMessage) => {

    var message = newMessage;

    //TODO change to bot
    //Got a message from bot named TurtleRainDance
    console.log("message from "+message.author.username+" updated");

    // If this is a message from TurtleBotRain and it contains an embed and is in the raindance channel
    if((message.author.username == "TurtleBotRain") && (message.author.bot) && (message.embeds) && (message.channel.name == "raindance")){

	console.log(message.embeds[0].title);
	console.log(message.embeds[0].description);
    
	// Its a rain announcement
	// TODO check message contents

	var content = message.embeds[0].title;

	if(content.indexOf("QUICK") !== -1){
	    
	    // send him our trtl key after delay
	    console.log("sending key after delay");
	    
	    delay((Math.random()*maxAddressSendDelay)+minDelay)
		.then(() => {
		    message.author.send(config.address);
	    	    console.log("Sent address to TurtleBotRain");
		});
	}	
	return;
    }
});


client.login(config.token);
