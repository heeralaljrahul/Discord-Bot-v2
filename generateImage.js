const Canvas = require("canvas");
const { AttachmentBuilder } = require('discord.js');

const backgrounds = [
  "https://i.imgur.com/rEALKYC.png",
  "https://i.imgur.com/AKNNakc.png",
];

const av = {
  size: 256,
  x: 480,
  y: 170,
};

const dim = {
  height: 675,
  width: 1200,
  margin: 50,
};

const generateImage = async (member) => {
  try {
    let username = member.user.username;
    let discrum = member.user.discriminator;
    const avatarURL = member.user.displayAvatarURL({
      extension: "png",
      forceStatic: true,
      size: av.size,
    });

    const canvas = Canvas.createCanvas(dim.width, dim.height);
    const ctx = canvas.getContext("2d");

    const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    const backimg = await Canvas.loadImage(background);
    ctx.drawImage(backimg, 0, 0);

    // Draw black tinted box
    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(
      dim.margin,
      dim.margin,
      dim.width - 2 * dim.margin,
      dim.height - 2 * dim.margin
    );

    // Load avatar image
    const avatarimage = await Canvas.loadImage(avatarURL);
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      av.x + av.size / 2,
      av.y + av.size / 2,
      av.size / 2,
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatarimage, av.x, av.y);
    ctx.restore();

    // Write text
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.font = "50px sans-serif";
    ctx.fillText("Welcome", dim.width / 2, dim.margin + 70);

    ctx.font = "60px sans-serif";
    ctx.fillText(username + "#" + discrum, dim.width / 2, dim.height - dim.margin);

    // Use AttachmentBuilder instead of MessageAttachment
    return new AttachmentBuilder(canvas.toBuffer(), { name: "welcome.png" });

  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

module.exports = generateImage;
