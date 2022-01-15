"use strict";
//Save avatar's look using the obj.name of each item displayed, if there's no item then the index must be undefined
const avatar_render = [
    skins['black'].name, //skin
    eyes['normal'].name, //eyes
    undefined, //hat
    undefined, //suit
    undefined //shoes
];
//Selection is used for storing each item page and append to the container instead of generate the entire page again
const selection = [];
const random = document.getElementById("random");
const container = document.getElementById("custom_contents");
const buttons = document.querySelectorAll('.selection');
const download_section = container.querySelector('.download_section');
let button_index = 0;
let button_option;

function resizeContSection(){
    const section = document.getElementById('custom_contents');
    const select = document.getElementById('custom_select');
    section.style.height = select.parentElement.offsetHeight - select.offsetHeight + "px";
}
function generateOptionBtns(index = 0){
    container.innerHTML = "";
    if (index === 5){
        container.appendChild(download_section);
        const download_button = document.getElementById("download_button");
        download_button.addEventListener('click', () => downloadAvatar());
    } else {
        if (index > 1 && index < option.length){
            container.innerHTML = `<button type="button" class="option remove">
                                        <img src="img/misc/remove.svg" alt="remove" class="button_img">
                                </button>`;
        }
        if (selection[index] === undefined){
                    if(index < option.length){
                        let fragment = document.createDocumentFragment();
                        for(let obj in option[index]){
                            let img_src = (option[index][obj] instanceof Cloth)? option[index][obj].src : option[index][obj].head;
                            let button = document.createElement('BUTTON');
                            button.setAttribute("type","button")
                            button.classList.add('option');
                            button.innerHTML = `<img src="${img_src}" alt="${option[index][obj].name}" class="button_img"/>`;
                            fragment.appendChild(button);
                        }
                        container.appendChild(fragment);
                    }
        } else {
            container.appendChild(selection[index]);
        }
    }
    button_index = index;
    button_option = container.querySelectorAll('.option');
    addCustomizeAvatar();
}
function addCustomizeAvatar(){
    button_option.forEach(button =>{
        button.addEventListener('click',()=>{
            if (button.classList.contains('remove')){
                //Gets the type's object and use the returned data to use it as ID for
                //selecting the canvas and remove the item
                const getFirstObj = () => Object.keys(option[button_index])[0];
                let id = option[button_index][getFirstObj()].type;
                removeAvatarPart(id);
                avatar_render[button_index] = undefined;
            } else {
                //Gets the type's object for drawing items in canvas
                let name = button.firstElementChild.getAttribute('alt');
                if (button_index === 0) option[button_index][name].drawAvatar();
                else option[button_index][name].drawAvatarPart();
                avatar_render[button_index] = name;
            }
        })
    });
}
async function loadImage(url){
    const image = new Image();
    image.src = url;
    await image.decode();
    return image;
}

async function downloadAvatar(){
    //Merge all canvas in one and download the generated image
    // const res = 2;
    const avatar_img = document.createElement("CANVAS");
    const img_ctx = avatar_img.getContext('2d');
    avatar_img.height = 750;
    avatar_img.width = 600;
    img_ctx.fillStyle = '#f1f1f1'
    img_ctx.fillRect(0,0,avatar_img.width,avatar_img.height / 2);
    img_ctx.fillStyle = '#ccc'
    img_ctx.fillRect(0,avatar_img.height / 2,avatar_img.width,avatar_img.height / 2);

    await loadImage(skins[avatar_render[0]].foot).then(img => {
        img_ctx.drawImage(img,skins[avatar_render[0]].xpos[2] * 2,avatar_img.height - (img.height * 2),img.width * 2, img.height * 2);
    });

    if (avatar_render[4] !== undefined){
        await loadImage(shoes[avatar_render[4]].src).then(img => {
            img_ctx.drawImage(img,shoes[avatar_render[4]].x * 2,avatar_img.height - (img.height * 2),img.width * 2,img.height * 2);
        });
    }

    await loadImage(skins[avatar_render[0]].body).then(img => {
        img_ctx.drawImage(img,skins[avatar_render[0]].xpos[1] * 2,avatar_img.height - (img.height * 2) - 30,img.width * 2, img.height * 2);
    });

    if (avatar_render[3] !== undefined){
        await loadImage(suits[avatar_render[3]].src).then(img => {
            img_ctx.drawImage(img,suits[avatar_render[3]].x * 2,483 + suits[avatar_render[3]].y,img.width * 2,img.height * 2);
        });
    }

    await loadImage(skins[avatar_render[0]].head).then(img => {
        img_ctx.drawImage(img,skins[avatar_render[0]].xpos[0] * 2,120,img.width * 2, img.height * 2);
    });

    await loadImage(eyes[avatar_render[1]].src).then(img => {
        img_ctx.drawImage(img,eyes[avatar_render[1]].x * 2,249 + eyes[avatar_render[1]].y + 10,img.width * 2,img.height * 2);
    });

    if (avatar_render[2] !== undefined){
        await loadImage(hats[avatar_render[2]].src).then(img => {
            img_ctx.drawImage(img,hats[avatar_render[2]].x * 2,hats[avatar_render[2]].y + 35,img.width * 2,img.height * 2);
        });
    }
    
    const link = document.createElement('a');
    link.download = 'my-cat.jpg';
    link.href = avatar_img.toDataURL("image/jpg");
    link.click();
    link.remove();
    avatar_img.remove();
}

resizeContSection();
generateOptionBtns(button_index);

buttons.forEach((button,index) => {
    button.addEventListener('click',function(){
        if (!this.classList.contains('selected')){
            document.querySelector('.selected').classList.remove('selected');
            this.classList.add('selected');
            resizeContSection();
            generateOptionBtns(index);
        }
    });
});

window.addEventListener('resize',()=>resizeContSection());

random.addEventListener('click',()=>{
    option.forEach((items,index) => {
        let obj_keys = Object.keys(items);
        let random_index = Math.round(Math.random() * (obj_keys.length - 1))
        let remove = Math.round(Math.random() * 1);
        let avatar_item = items[obj_keys[random_index]];

        if (index === 0) {
            avatar_render[index] = avatar_item.name;
            avatar_item.drawAvatar();
        }
        else if (index === 1) {
            avatar_render[index] = avatar_item.name;
            avatar_item.drawAvatarPart();
        }
        else {
            if (remove === 0) avatar_item.drawAvatarPart();
            else removeAvatarPart(items[obj_keys[0]].type);
            avatar_render[index] = (remove === 0)? avatar_item.name : undefined;
        }
    })
})