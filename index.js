const { Client, GatewayIntentBits, Partials, AttachmentBuilder } = require('discord.js');
const justreddit = require('justreddit');
const generateImage = require('./generateImage');
require('dotenv').config();


const EUW_OP_GG_LINK = 'https://euw.op.gg/summoners/euw/';
const OP_GG_CHAMP_LINK = 'https://euw.op.gg/champions/';


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const _7Responses = [
  'Yes, 7 is indeed the best 😉',
  'SEVEEEEEEEEEEN',
  '7777777777',
];

const bhe_list = [
  'bheeeeeeeeeeee',
  'Please go to bheeeeeeeeeeee!!!!!!',
  'Aheeeeeeeeeeee',
  'I need help at bheeeeeeeeeeee!!',
  'Lets go bheeeeeeeeeeee!!!!',
  'bheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
];

const leagueChampionList = [
  'Aatrox',
  'Ekko',
  'Jinx',
  'Miss Fortune',
  'Shen',
  'Varus',
  'Ahri',
  'Elise',
  'Kalista',
  'Mordekaiser',
  'Shyvana',
  'Vayne',
  'Akali',
  'Evelynn',
  'Karma',
  'Morgana',
  'Singed',
  'Veigar',
  'Alistar',
  'Ezreal',
  'Karthus',
  'Nami',
  'Sion',
  'Vel’Koz',
  'Amumu',
  'Fiddlesticks',
  'Kassadin',
  'Nasus',
  'Sivir',
  'Vi',
  'Anivia',
  'Fiora',
  'Katarina',
  'Nautilus',
  'Skarner',
  'Viktor',
  'Annie',
  'Fizz',
  'Kayle',
  'Nidalee',
  'Sona',
  'Vladimir',
  'Ashe',
  'Galio',
  'Kennen',
  'Nocturne',
  'Soraka',
  'Volibear',
  'Aurelion Sol',
  'Gangplank',
  'Kha’Zix',
  'Nunu',
  'Swain',
  'Warwick',
  'Azir',
  'Garen',
  'Kindred',
  'Olaf',
  'Syndra',
  'Wukong',
  'Bard',
  'Gnar',
  'Kled',
  'Orianna',
  'Tahm Kench',
  'Xerath',
  'Blitzcrank',
  'Gragas',
  'Kog’Maw',
  'Pantheon',
  'Taliyah',
  'Xin Zhao',
  'Brand',
  'Graves',
  'LeBlanc',
  'Poppy',
  'Talon',
  'Yasuo',
  'Braum',
  'Hecarim',
  'Lee Sin',
  'Quinn',
  'Taric',
  'Yorick',
  'Caitlyn',
  'Heimerdinger',
  'Leona',
  'Rammus',
  'Teemo',
  'Zac',
  'Camille',
  'Illaoi',
  'Lissandra',
  'Rek’Sai',
  'Thresh',
  'Zed',
  'Cassiopeia',
  'Irelia',
  'Lucian',
  'Renekton',
  'Tristana',
  'Ziggs',
  'Cho’Gath',
  'Ivern',
  'Lulu',
  'Rengar',
  'Trundle',
  'Zilean',
  'Corki',
  'Janna',
  'Lux',
  'Riven',
  'Tryndamere',
  'Zyra',
  'Darius',
  'Jarvan IV',
  'Malphite',
  'Rumble',
  'Twisted Fate',
  'Diana',
  'Jax',
  'Malzahar',
  'Ryze',
  'Twitch',
  'Dr. Mundo',
  'Jayce',
  'Maokai',
  'Sejuani',
  'Udyr',
  'Draven',
  'Jhin',
  'Master Yi',
  'Shaco',
  'Urgot',
];

client.once('ready', () => {
  console.log('Bot is online');
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
//generate welcome
if (message.author.bot) return;

if (message.content.startsWith('-generate')) {
  const mentionedUser = message.mentions.members.first();

  if (!mentionedUser) {
    return message.reply('Please mention a user to generate a welcome message.');
  }

  try {
    const welcomeImage = await generateImage(mentionedUser);
    message.channel.send({
      content: `Welcome, ${mentionedUser.user.username}! 🎉`,
      files: [welcomeImage],
    });
  } catch (error) {
    console.error('Error generating welcome image:', error);
    message.reply('There was an error generating the welcome message.');
  }
}

//ping
  if (message.content === 'ping') {
    const start = Date.now();
    await message.reply('Pong!');
    const duration = Date.now() - start;
    message.channel.send(`Responded in: ${duration}ms!`);
  }

  if (message.content === '-7hi') {
    message.reply('Hello there!');
  }

  if (message.content === '7') {
    const _7Response = _7Responses[Math.floor(Math.random() * _7Responses.length)];
    message.reply(_7Response);
  }

  if (message.content === 'b') {
    const bhe_response = bhe_list[Math.floor(Math.random() * bhe_list.length)];
    message.reply(bhe_response);
  }

  if (message.content === 'ff14meme') {
    try {
      const post = await justreddit.randomPostFromSub({
        subReddit: 'ShitpostXIV',
        sortType: 'hot',
        postGetLimit: 50,
      });
      message.channel.send(post.url);
    } catch (error) {
      console.error(error);
      message.channel.send('Failed to fetch a meme.');
    }
  }

  if (message.content === 'league') {
    try {
      const post = await justreddit.randomPostFromSub({
        subReddit: 'LeagueOfMemes',
        sortType: 'hot',
        postGetLimit: 50,
      });
      message.channel.send(post.url);
    } catch (error) {
      console.error(error);
      message.channel.send('Failed to fetch a meme.');
    }
  }

  if (message.content === 'val') {
    try {
      const post = await justreddit.randomPostFromSub({
        subReddit: 'ValorantMemes',
        sortType: 'hot',
        postGetLimit: 50,
      });
      message.channel.send(post.url);
    } catch (error) {
      console.error(error);
      message.channel.send('Failed to fetch a meme.');
    }
  }

    if (message.content === 'champlist') {
        message.channel.send(`
----------------------------------------------------------------------------------------
Champion Name                         Class               Release     Patch   B.E.  R.P.
----------------------------------------------------------------------------------------
Aatrox the Darkin Blade               Juggernaut          2013-06-13  V12.10  4800  880
Ahri the Nine-Tailed Fox              Mage Burst          2011-12-14  V12.10  3150  790
Akali the Rogue Assassin              Slayer Assassin     2010-05-11  V12.10  3150  790
Akshan the Rogue Sentinel             Marksman Assassin   2021-07-22  V12.11  6300  975
Alistar the Minotaur                  Tank Vanguard       2009-02-21  V12.10  1350  585
Amumu the Sad Mummy                   Tank Vanguard       2009-06-26  V12.12  450   260
Anivia the Cryophoenix                Mage Battlemage     2009-07-10  V12.10  3150  790
Annie the Dark Child                  Mage Burst          2009-02-21  V12.12  450   260
Aphelios the Weapon of the Faithful   Marksman            2019-12-11  V12.11  6300  975
Ashe the Frost Archer                 Marksman            2009-02-21  V12.10  450   260
----------------------------------------------------------------------------------------
        `);
    }

    if (message.content === 'random') {
        const randomChampion = leagueChampionList[Math.floor(Math.random() * leagueChampionList.length)];
        message.channel.send(`Try out > ${randomChampion}!`);
    }

    if (message.content === 'ff') {
        const ff_yes = Math.floor(Math.random() * 6);
        if (ff_yes >= 4) {
            message.channel.send(`${ff_yes} have agreed to surrender. DEFEAT`);
            message.channel.send('https://i.pinimg.com/originals/7b/14/31/7b143177dcbfd2631190889050cf7349.jpg');
            message.react('🥳');
        } else if (ff_yes === 0) {
            message.channel.send('You have agreed to surrender. You have to play on :(');
            message.react('👀');
        } else {
            message.channel.send(`${ff_yes} have agreed to surrender. You have to play on :(`);
            message.react('👀');
        }
    }

    if (message.content.startsWith('EUGG')) {
        const args = message.content.split(' ');
        if (args[1]) {
            message.channel.send(`${EUW_OP_GG_LINK}${args[1]}`);
        } else {
            message.channel.send('Error');
        }
    }

    if (message.content.startsWith('cinfo')) {
        const args = message.content.split(' ');
        if (args[1]) {
            if (args[1].toLowerCase() === 'ahri') {
                const imageDisplay = Ahri.imagesList[Math.floor(Math.random() * Ahri.imagesList.length)];
                message.channel.send(`${Ahri.name} ${Ahri.role}`);
                message.channel.send(imageDisplay);
                message.channel.send(`${OP_GG_CHAMP_LINK}${Ahri.name}`);
                message.react('❤️');
            } else {
                message.channel.send('Not supported yet!');
                message.react('😭');
                message.channel.send('https://assets.teenvogue.com/photos/57d1791c7ed1926e3263a119/master/w_1600,c_limit/giphy%20(1).gif');
            }
        } else {
            message.channel.send('Error');
        }
    }

    if (message.content.startsWith('-vote')) {
        message.react('✅');
        message.react('❌');
    }

    if (message.content.startsWith('report')) {
        const args = message.content.split(' ');
        if (args[1]) {
            message.channel.send(`A file has been sent to the system. We will notify once the decision has been made. Please contact ${message.author.toString()}`);
        } else {
            message.channel.send('Error, user cannot be reported');
        }
    }

    
});

const welcomeChannelId = '996402014093328516';

client.on('guildMemberAdd', async (member) => {
    const img = await generateImage(member);
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to the server!`,
        files: [img],
    });
});


client.login(process.env.TOKEN);
