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
