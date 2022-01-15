"use strict";
class Skin{
    constructor(name = ""){
        //0 -> head.x position, 1 -> body.x position, 2 -> foot.x position
        this.xpos = [40,46,56];
        this.name = name;
        this.head = `img/skins/${name}_head.svg`;
        this.body = `img/skins/${name}_body.svg`;
        this.foot = `img/skins/${name}_foot.svg`;
    }
    drawAvatar(){
        let x = this.xpos;
        const obj_parts = [this.head,this.body,this.foot];
        const avatar = document.querySelectorAll(".avatar");
        avatar.forEach((part,index)=>{
            const canvas = part;
            const ctx = canvas.getContext('2d');
            let img = new Image();
            img.onload = function(){
                canvas.height = img.height;
                ctx.drawImage(img,x[index],0);
            }
            img.src = obj_parts[index];
        })
    }
}
class Cloth{
    constructor(x = 0,y = 0,type = "",name = ""){
        this.x = x;
        this.y = y;
        this.type = type;
        this.name = name;
        this.src = `img/${type}/${name}.svg`;
    }
    drawAvatarPart(){
        let type = this.type;
        let x = this.x;
        let y = this.y;
        const canvas = document.getElementById(this.type);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width,canvas.height)
        let img = new Image();
        img.onload = function(){
            if (type === "eyes") canvas.height = 100;
            else if (type === "hats") canvas.height = 350;
            else canvas.height = img.height;
            ctx.drawImage(img,x,y);
        }
        img.src = this.src;
    }
}

//!important, array keys must be the same as every obj.name
const skins = {
    black: new Skin("black"),
    bw: new Skin("bw"),
    cream: new Skin("cream"),
    gray: new Skin("gray"),
    stained: new Skin("stained"),
    stripped: new Skin("stripped"),
    white: new Skin("white")
}
const eyes = {
    angry: new Cloth(74,18,"eyes","angry"),
    cute: new Cloth(63,0,"eyes","cute"),
    female: new Cloth(72,10,"eyes","female"),
    glasses: new Cloth(45,5,"eyes","glasses"),
    normal: new Cloth(72,10,"eyes","normal"),
}
const hats = {
    // band: new Cloth(44,100,"hats","band"),
    crown: new Cloth(85,20,"hats","crown"),
    flowers: new Cloth(38,50,"hats","flowers"),
    frog: new Cloth(31,35,"hats","frog"),
    helicopter: new Cloth(85,20,"hats","helicopter"),
    icecream: new Cloth(80,7,"hats","icecream"),
    tinfoil: new Cloth(45,25,"hats","tinfoil"),
    top: new Cloth(85,20,"hats","top")
}
const suits = {
    beach: new Cloth(45,-10,"suits","beach"),
    dress: new Cloth(45,3,"suits","dress"),
    suit: new Cloth(45,-20,"suits","suit")
}
const shoes = {
    flipflop: new Cloth(55,0,"shoes","flipflop"),
    shoes: new Cloth(52,0,"shoes","shoes"),
    sneakers: new Cloth(55,0,"shoes","sneakers")
}

//This array is used to indicate wich items page is displayed (except download section)
const option = [skins,eyes,hats,suits,shoes];

function removeAvatarPart(id){
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

//Background is displayed
const display = document.querySelector(".avatar_display");
const bkgd = document.getElementById("background");
const bkgd_ctx = bkgd.getContext("2d");
bkgd.height = display.offsetHeight;
bkgd.width = display.offsetWidth;
window.addEventListener('resize',()=>{
    bkgd.height = display.offsetHeight;
    bkgd.width = display.offsetWidth;
    bkgd_ctx.fillStyle = "#ccc";
    bkgd_ctx.fillRect(0,bkgd.height / 2,bkgd.width,bkgd.height / 2);
})
bkgd_ctx.fillStyle = "#ccc";
bkgd_ctx.fillRect(0,bkgd.height / 2,bkgd.width,bkgd.height / 2);

//Avatar initialization
skins['black'].drawAvatar();
eyes['normal'].drawAvatarPart();