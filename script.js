/* ==========================================================
   THE JOURNEY TO JULY 19 🌻
   script.js
   Version 5.0
   Core Journey Engine
========================================================== */


document.addEventListener("DOMContentLoaded",()=>{



/* ==========================================================
   GLOBAL JOURNEY OBJECT
========================================================== */


const Journey = {


    currentScene:0,

    totalScenes:6,

    locked:false,

    musicStarted:false


};







/* ==========================================================
   ELEMENT HELPER
========================================================== */


function get(id){

    return document.getElementById(id);

}







/* ==========================================================
   AUDIO MANAGER
========================================================== */


const AudioManager = {


    ambient:get("ambientAudio"),



    start(){


        if(this.ambient && !Journey.musicStarted){


            this.ambient.volume=.25;


            this.ambient.play()

            .catch(()=>{});


            Journey.musicStarted=true;


        }


    }



};








/* ==========================================================
   LOADER
========================================================== */


const loader=get("loader");

const loaderProgress=get("loaderProgress");



let progress=0;


const loading=setInterval(()=>{


progress+=5;



if(loaderProgress){

    loaderProgress.style.width=

    progress+"%";

}



if(progress>=100){


clearInterval(loading);



setTimeout(()=>{


if(loader){

loader.classList.add("hide");

}


},500);



}



},100);









/* ==========================================================
   SCENE MANAGER
========================================================== */


const scenes=document.querySelectorAll(".scene");



function goToScene(number){



if(Journey.locked)return;



Journey.locked=true;



scenes.forEach(scene=>{


scene.classList.remove("active");


});



const target=scenes[number];



if(target){


setTimeout(()=>{


target.classList.add("active");

Journey.currentScene=number;


Journey.locked=false;



initializeScene(number);



},500);



}



}








/* ==========================================================
   INTRO
========================================================== */


const begin=get("beginJourney");


if(begin){


begin.addEventListener("click",()=>{


AudioManager.start();


goToScene(1);


});


}









/* ==========================================================
   CHAPTER 1 — PUZZLE
========================================================== */


const input=get("yearInput");

const unlock=get("unlockPuzzle");

const puzzleMessage=get("puzzleMessage");




function checkPuzzle(){



if(!input)return;



if(input.value==="2018"){



if(puzzleMessage){

puzzleMessage.innerHTML=

"Memory unlocked ✨";

}



createParticles();



setTimeout(()=>{


goToScene(2);


},1200);



}



else{


input.classList.remove("shake");


void input.offsetWidth;


input.classList.add("shake");



if(puzzleMessage){


puzzleMessage.innerHTML=

"Think a little harder 🤍";


}



}



}






if(unlock){


unlock.addEventListener(

"click",

checkPuzzle

);


}



if(input){


input.addEventListener(

"keydown",

(e)=>{


if(e.key==="Enter"){

checkPuzzle();

}


}


);


}









/* ==========================================================
   CHAPTER 2 — HEART
========================================================== */


const heart=get("heart");

const continueHeart=get("continueHeart");



if(heart){



heart.addEventListener("click",()=>{



heart.style.transform=

"scale(.4)";



setTimeout(()=>{


heart.innerHTML="✨";


},700);



setTimeout(()=>{


const message=get("heartMessage");


if(message){


message.innerHTML=

"Every beautiful story begins with a single moment.";


}



if(continueHeart){

continueHeart.style.opacity=1;


}



},1200);



});



}






if(continueHeart){


continueHeart.addEventListener(

"click",

()=>goToScene(3)

);


}








/* ==========================================================
   CHAPTER 3 — TIMELINE
========================================================== */


const timelineData=[


{

image:"assets/images/timeline1.webp",

title:"A Beautiful Beginning",

text:"A moment that made her story special."

},


{

image:"assets/images/timeline2.webp",

title:"Growing Dreams",

text:"Every chapter shaped who she became."

},


{

image:"assets/images/timeline3.webp",

title:"Little Memories",

text:"The moments that made her smile."

},


{

image:"assets/images/timeline4.webp",

title:"A Stronger You",

text:"Every experience created something beautiful."

},


{

image:"assets/images/timeline5.webp",

title:"The Person I Admire",

text:"The journey that brought her here."

}


];



let timelineIndex=0;



function loadTimeline(){



const image=get("timelineImage");

const title=get("timelineTitle");

const text=get("timelineText");



if(image){

image.src=

timelineData[timelineIndex].image;

}



if(title){

title.innerHTML=

timelineData[timelineIndex].title;

}



if(text){

text.innerHTML=

timelineData[timelineIndex].text;

}


}




const next=get("nextMemory");

const previous=get("previousMemory");



if(next){


next.onclick=()=>{


timelineIndex++;


if(timelineIndex>=timelineData.length)

timelineIndex=0;



loadTimeline();


};


}



if(previous){


previous.onclick=()=>{


timelineIndex--;


if(timelineIndex<0)

timelineIndex=

timelineData.length-1;



loadTimeline();


};


}






const continueTimeline=get("continueTimeline");



if(continueTimeline){


continueTimeline.onclick=()=>goToScene(4);


}









/* ==========================================================
   CHAPTER 4 — CONSTELLATION
========================================================== */


const starsContainer=get("starsContainer");


let foundStars=0;



function createStars(){


if(!starsContainer)return;



for(let i=0;i<8;i++){



let star=document.createElement("span");



star.style.left=

Math.random()*90+"%";


star.style.top=

Math.random()*80+"%";



star.onclick=()=>{


foundStars++;


star.style.opacity=".3";


get("memoryCounter").innerHTML=

foundStars+" / 8 Memories";



if(foundStars>=8){


get("continueConstellation").style.opacity=1;


}


};



starsContainer.appendChild(star);



}



}



const continueConstellation=get("continueConstellation");


if(continueConstellation){


continueConstellation.onclick=

()=>goToScene(5);


}









/* ==========================================================
   CHAPTER 5 — VIDEO
========================================================== */


const video=get("birthdayVideo");

const play=get("playVideo");

const continueVideo=get("continueVideo");



if(play && video){


play.onclick=()=>{


video.play();


play.style.display="none";


};


}



if(video){


video.onended=()=>{


if(continueVideo)

continueVideo.style.opacity=1;


};


}




if(continueVideo){


continueVideo.onclick=

()=>goToScene(6);


}








/* ==========================================================
   FINAL
========================================================== */


const restart=get("restartJourney");


if(restart){


restart.onclick=()=>{


location.reload();


};


}








/* ==========================================================
   PARTICLES
========================================================== */


function createParticles(){



for(let i=0;i<30;i++){


let p=document.createElement("span");


p.style.position="fixed";

p.style.left="50%";

p.style.top="50%";


p.style.width="6px";

p.style.height="6px";


p.style.background="#d8a43a";


p.style.borderRadius="50%";



document.body.appendChild(p);



let x=(Math.random()-0.5)*500;

let y=(Math.random()-0.5)*500;



p.animate([

{

transform:"translate(0,0)",

opacity:1

},


{

transform:`translate(${x}px,${y}px)`,

opacity:0

}


],{

duration:1500

});



setTimeout(()=>p.remove(),1500);



}



}







/* ==========================================================
   SCENE INITIALIZATION
========================================================== */


function initializeScene(number){



switch(number){



case 3:

loadTimeline();

break;



case 4:

createStars();

break;



