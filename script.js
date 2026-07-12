/* ==========================================================
   GIFTEVER - Luxury Surprise
   Script Part 1
========================================================== */

const scenes = document.querySelectorAll(".scene");

const beginButton = document.getElementById("beginExperience");

const bgMusic = document.getElementById("bgMusic");

const narrator = document.getElementById("narrator");

const touchSound = document.getElementById("touchSound");

const transition = document.querySelector(".transition-overlay");

let currentScene = 0;

let started = false;

/* ==========================================================
   START EXPERIENCE
========================================================== */

beginButton.addEventListener("click", startExperience);

function startExperience(){

    if(started) return;

    started = true;

    touchSound.currentTime = 0;
    touchSound.play();

    setTimeout(()=>{

        bgMusic.volume = 0.25;
        bgMusic.play().catch(()=>{});

    },300);

    setTimeout(()=>{

        narrator.play().catch(()=>{});

    },700);

    setTimeout(()=>{

        nextScene();

    },2200);

}

/* ==========================================================
   NEXT SCENE
========================================================== */

function nextScene(){

    if(currentScene >= scenes.length-1) return;

    transition.style.opacity = "1";

    setTimeout(()=>{

        scenes[currentScene].classList.remove("active");

        currentScene++;

        scenes[currentScene].classList.add("active");

    },700);

    setTimeout(()=>{

        transition.style.opacity = "0";

    },1200);

}

/* ==========================================================
   OPTIONAL AUTO NEXT
========================================================== */

function autoNext(delay){

    setTimeout(()=>{

        nextScene();

    },delay);

}

/* ==========================================================
   KEYBOARD (Developer Only)
========================================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        nextScene();

    }

});
/* ==========================================================
   SCRIPT PART 2
   Scene Controller
========================================================== */

const sceneDuration = [
    0,      // Scene 1 (manual)
    5000,   // Scene 2
    6000,   // Scene 3
    6000,   // Scene 4
    7000,   // Scene 5
    7000,   // Scene 6
    12000,  // Scene 7 (video)
    7000,   // Scene 8
    7000,   // Scene 9
    8000,   // Scene 10
    7000,   // Scene 11
    7000,   // Scene 12
    0       // Scene 13
];

let autoTimer = null;

/* ==========================================================
   GO TO SCENE
========================================================== */

function goToScene(index){

    if(index < 0 || index >= scenes.length) return;

    scenes[currentScene].classList.remove("active");

    currentScene = index;

    scenes[currentScene].classList.add("active");

    scheduleNext();

}

/* ==========================================================
   NEXT
========================================================== */

function nextScene(){

    if(currentScene >= scenes.length - 1){

        clearTimeout(autoTimer);

        return;

    }

    transition.style.opacity = "1";

    setTimeout(()=>{

        goToScene(currentScene + 1);

        transition.style.opacity = "0";

    },700);

}

/* ==========================================================
   AUTO NEXT
========================================================== */

function scheduleNext(){

    clearTimeout(autoTimer);

    const duration = sceneDuration[currentScene];

    if(duration <= 0) return;

    autoTimer = setTimeout(()=>{

        nextScene();

    },duration);

}

/* ==========================================================
   KEYBOARD SHORTCUTS
========================================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        nextScene();

    }

    if(e.key==="ArrowLeft"){

        if(currentScene>0){

            goToScene(currentScene-1);

        }

    }

});

/* ==========================================================
   MUSIC FADE
========================================================== */

function fadeMusic(targetVolume,duration){

    const start = bgMusic.volume;

    const step = 50;

    const totalSteps = duration/step;

    let currentStep = 0;

    const fade = setInterval(()=>{

        currentStep++;

        bgMusic.volume = start +

        ((targetVolume-start)/totalSteps)*currentStep;

        if(currentStep>=totalSteps){

            clearInterval(fade);

        }

    },step);

}
/* ==========================================================
   Scene 01 Entrance
========================================================== */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});
/* ==========================================================
   Luxury Button Ripple
========================================================== */

beginButton.addEventListener("pointerdown", () => {

    beginButton.animate(

        [

            {

                transform:"scale(1)"

            },

            {

                transform:"scale(.94)"

            },

            {

                transform:"scale(1)"

            }

        ],

        {

            duration:280,

            easing:"ease-out"

        }

    );

});
