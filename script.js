/* ==========================================================
   THE JOURNEY TO JULY 19 🌻
   FINAL VERSION 5.0
   MAIN JAVASCRIPT ENGINE
========================================================== */


document.addEventListener("DOMContentLoaded",()=>{



/* ==========================================================
   JOURNEY SYSTEM
========================================================== */


const Journey = {


    scene:0,

    locked:false,

    musicStarted:false


};







/* ==========================================================
   HELPER
========================================================== */


const $ = (id)=>document.getElementById(id);








/* ==========================================================
   AUDIO SYSTEM
========================================================== */


const music=$("backgroundMusic");



function startMusic(){


    if(music && !Journey.musicStarted){


        music.volume=.25;


        music.play()

        .catch(()=>{});


        Journey.musicStarted=true;


    }


}







/* ==========================================================
   LOADING SCREEN
========================================================== */


const loader=$("loader");

const progress=$("loadingProgress");



let load=0;



const loaderTimer=setInterval(()=>{


load+=4;



if(progress){

progress.style.width=

load+"%";

}




if(load>=100){


clearInterval(loaderTimer);



setTimeout(()=>{


if(loader){

loader.classList.add("hide");


}



},700);



}



},80);









/* ==========================================================
   SCENE MANAGEMENT
========================================================== */


const scenes=document.querySelectorAll(".scene");



function changeScene(number){



if(Journey.locked)return;



Journey.locked=true;



scenes.forEach(scene=>{


scene.classList.remove("active");


});



setTimeout(()=>{


if(scenes[number]){


scenes[number].classList.add("active");


Journey.scene=number;


initializeScene(number);



}



Journey.locked=false;



},700);



}








/* ==========================================================
   INTRO
========================================================== */


const start=$("startJourney");



if(start){


start.onclick=()=>{


startMusic();


changeScene(1);


};


}









/* ==========================================================
   CHAPTER 1 — PUZZLE
========================================================== */


const year=$("yearAnswer");

const check=$("checkYear");

const result=$("puzzleResult");





function checkMemory(){



if(!year)return;



if(year.value==="2018"){



if(result){

result.innerHTML=

"Memory unlocked ✨";

}



goldBurst();



setTimeout(()=>{


changeScene(2);


},1200);



}


else{


year.classList.remove("shake");


void year.offsetWidth;


year.classList.add("shake");



if(result){


result.innerHTML=

"Think a little harder 🤍";


}



}



}




if(check){


check.onclick=checkMemory;


}



if(year){


year.onkeydown=(e)=>{


if(e.key==="Enter"){


checkMemory();


}



};



}









/* ==========================================================
   CHAPTER 2 — HEART
========================================================== */


const heart=$("heart");

const continueHeart=$("continueHeart");



if(heart){


heart.onclick=()=>{


heart.classList.add("heart-break");



setTimeout(()=>{


heart.innerHTML="✨";


heart.classList.remove("heart-break");


},1500);




const text=$("heartText");



setTimeout(()=>{


if(text){


text.innerHTML=

"Some moments quietly change everything.";


}



},1600);



};



}







if(continueHeart){


continueHeart.onclick=()=>{


changeScene(3);


};


}








/* ==========================================================
   CHAPTER 3 — TIMELINE
========================================================== */


const timeline=[


{


image:"assets/images/timeline1.webp",


title:"The Beginning",


text:"Before there was us, there was a beautiful story waiting to be told."


},



{


image:"assets/images/timeline2.webp",


title:"Growing Dreams",


text:"Every experience shaped the person she became."


},



{


image:"assets/images/timeline3.webp",


title:"Beautiful Memories",


text:"The little moments that made her smile."


},



{


image:"assets/images/timeline4.webp",


title:"A Beautiful Soul",


text:"Someone whose kindness makes everything brighter."


},



{


image:"assets/images/timeline5.webp",


title:"The Person I Admire",


text:"The journey that created the person I love."


}



];



let timelineIndex=0;





function updateTimeline(){



const img=$("timelinePhoto");

const title=$("timelineHeading");

const text=$("timelineDescription");



if(img)

img.src=

timeline[timelineIndex].image;



if(title)

title.innerHTML=

timeline[timelineIndex].title;



if(text)

text.innerHTML=

timeline[timelineIndex].text;



}







const next=$("next");

const previous=$("previous");



if(next){


next.onclick=()=>{


timelineIndex++;


if(timelineIndex>=timeline.length)

timelineIndex=0;


updateTimeline();


};



}



if(previous){


previous.onclick=()=>{


timelineIndex--;


if(timelineIndex<0)

timelineIndex=timeline.length-1;


updateTimeline();


};



}



const continueTimeline=$("continueTimeline");



if(continueTimeline){


continueTimeline.onclick=()=>{


changeScene(4);


};



}
/* ==========================================================
   CHAPTER 4 — CONSTELLATION
========================================================== */


const starsContainer=$("starField");

const memoryBox=$("memoryBox");

const memoryTitle=$("memoryTitle");

const memoryText=$("memoryText");

const counter=$("starCounter");

const closeMemory=$("closeMemory");

const continueStars=$("continueStars");



let collectedStars=0;



const constellationMemories=[


{
title:"The First Chapter",
text:"Every beautiful story begins with a moment worth remembering."
},


{
title:"The Little Things",
text:"Small conversations often become the biggest memories."
},


{
title:"The Smiles",
text:"The moments that brought happiness and warmth."
},


{
title:"The Journey",
text:"Every step created something meaningful."
},


{
title:"The Distance",
text:"Some bonds become stronger with time."
},


{
title:"The Promise",
text:"A story still being written."
},


{
title:"The Present",
text:"The beautiful memories we hold today."
},


{
title:"Forever",
text:"The memories waiting to be created."
}


];






function createStars(){



if(!starsContainer)return;



starsContainer.innerHTML="";



for(let i=0;i<8;i++){



const star=document.createElement("span");



star.style.left=

Math.random()*85+"%";



star.style.top=

Math.random()*75+"%";





star.onclick=()=>{



if(star.classList.contains("collected"))

return;



star.classList.add("collected");



collectedStars++;



if(memoryTitle)

memoryTitle.innerHTML=

constellationMemories[i].title;



if(memoryText)

memoryText.innerHTML=

constellationMemories[i].text;



if(memoryBox)

memoryBox.classList.add("show");





if(counter)

counter.innerHTML=

collectedStars+" / 8 Memories";





if(collectedStars===8){



if(continueStars)

continueStars.style.opacity="1";


}



};




starsContainer.appendChild(star);



}



}







if(closeMemory){



closeMemory.onclick=()=>{


if(memoryBox)

memoryBox.classList.remove("show");


};



}





if(continueStars){



continueStars.onclick=()=>{


if(collectedStars>=8){


changeScene(5);


}



};



}










/* ==========================================================
   CHAPTER 5 — BIRTHDAY VIDEO
========================================================== */


const video=$("birthdayVideo");

const playVideo=$("playVideo");

const continueVideo=$("continueVideo");





if(playVideo && video){



playVideo.onclick=()=>{


video.play()

.catch(()=>{});



playVideo.style.opacity="0";


setTimeout(()=>{


playVideo.style.display="none";


},500);



};



}




if(video){



video.onended=()=>{


if(continueVideo)

continueVideo.style.opacity="1";


};



}




if(continueVideo){



continueVideo.onclick=()=>{


changeScene(6);


};



}









/* ==========================================================
   CHAPTER 6 — FINAL REVEAL
========================================================== */



function finalReveal(){



createFireflies();

createPetals();



const first=$("finalFirst");

const second=$("finalSecond");

const love=$("loveText");





if(first){


setTimeout(()=>{


first.style.opacity="1";

first.style.transform="translateY(0)";


},1200);


}






if(second){


setTimeout(()=>{


second.style.opacity="1";

second.style.transform="translateY(0)";


},3500);



}






if(love){


setTimeout(()=>{


love.style.opacity="1";


},6000);



}



}









/* ==========================================================
   GOLD PARTICLE BURST
========================================================== */


function goldBurst(){



for(let i=0;i<35;i++){



const particle=document.createElement("span");



particle.style.position="fixed";


particle.style.left="50%";

particle.style.top="50%";


particle.style.width="7px";

particle.style.height="7px";


particle.style.borderRadius="50%";


particle.style.background="#d8a43a";



document.body.appendChild(particle);




const x=(Math.random()-0.5)*500;

const y=(Math.random()-0.5)*500;



particle.animate([


{
transform:"translate(0,0)",
opacity:1
},


{
transform:`translate(${x}px,${y}px)`,
opacity:0
}


],{


duration:1500,

easing:"ease-out"


});



setTimeout(()=>{


particle.remove();


},1600);



}



}










/* ==========================================================
   FIREFLIES
========================================================== */


function createFireflies(){



for(let i=0;i<35;i++){



const fire=document.createElement("div");



fire.className="firefly";



fire.style.left=

Math.random()*100+"%";



fire.style.top=

Math.random()*100+"%";



fire.style.animationDelay=

Math.random()*5+"s";



document.body.appendChild(fire);



}



}









/* ==========================================================
   PETALS
========================================================== */


function createPetals(){



for(let i=0;i<25;i++){



const petal=document.createElement("div");



petal.className="petal";



petal.style.left=

Math.random()*100+"%";



petal.style.animationDelay=

Math.random()*5+"s";



document.body.appendChild(petal);



}



}









/* ==========================================================
   RESTART
========================================================== */


const restart=$("restart");



if(restart){


restart.onclick=()=>{


location.reload();


};



}









/* ==========================================================
   SCENE INITIALIZATION
========================================================== */


function initializeScene(scene){



switch(scene){



case 3:

updateTimeline();

break;



case 4:

createStars();

break;



case 6:

finalReveal();

break;



}



}



});   
