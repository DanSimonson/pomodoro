$(document).ready(function () {

    var audio = new Audio('img/welldone.wav');
    
    //use event propigation to get the clicked item
    let theParent = document.querySelector(".inner-control");
    theParent.addEventListener("click", getClick, false);
    //let breakTime = parseInt($("#break-length").html);
    //get reset and start events
    let reset = document.getElementById('reset-btn').addEventListener("click", resetListener, false);
    let start = document.getElementById('start-btn').addEventListener("click", startListener, false);
    // display time variable
    const displayTime = document.getElementById('show-timer');
    //global counter variables
    let counter;
    let isRunning = false;
    let loopedOnce = false;
    let startBreak;
    let breakTime;
    
    
    function resetListener() {
        clearInterval(counter);
        clearInterval(startBreak);
        isRunning = false;
        document.getElementById("clock-header").innerHTML = "SESSION";
        document.getElementById('show-timer').innerHTML = document.getElementById("session-length").innerHTML + ":00";
        $("#start-btn").text("Start");
        //$( "#reset-btn" ).addClass("hidden");
        $('.hide-awesome').css('display', 'none');       
    }
    function startListener() {
        let sessionTimer = document.getElementById("show-timer").innerHTML;
        let holdTime = sessionTimer.split(":");
        let minSeconds = holdTime[0] * 60;
        //$( "#reset-btn" ).removeClass("hidden");
        $('.hide-awesome').css('display', 'inline-block');
        if (isRunning === false){
            timer(minSeconds);
            isRunning = true;
        }               
    }

    function getClick(e) {
        if (e.target !== e.currentTarget) {
            //event target always goes to root element so we are going back to parent button as well as getting the target
            // += doesn't work in this case and we use parseInt on the element to get it to increment by one
            let btnClicked = e.target;
            let btnParent = e.target.parentNode;
            let btnId = e.target.id;
            let btnValue = e.target.value;
            let tempVal;
    
             
                if(btnParent.className === 'break-min' && btnClicked.className ==='fa fa-minus') {
                    tempVal = parseInt(document.getElementById("break-length").innerHTML);
                    if(tempVal > 1){
                        document.getElementById("break-length").innerHTML -= 1;
                    }                    
                    
                }else if (btnParent.className === 'break-plus' && btnClicked.className === 'fa fa-plus') {
                    document.getElementById("break-length").innerHTML =  parseInt(document.getElementById("break-length").innerHTML) + 1;
                } else if (btnParent.className === 'session-min' && btnClicked.className === 'fa fa-minus') {
                    tempVal = parseInt(document.getElementById("session-length").innerHTML);
                    if(tempVal > 1){
                        document.getElementById("session-length").innerHTML -= 1;
                        document.getElementById('show-timer').innerHTML = document.getElementById("session-length").innerHTML + ":00";
                    }                    
                }else if (btnParent.className = 'session-plus' && btnClicked.className === 'fa fa-plus') {
                    document.getElementById("session-length").innerHTML =  parseInt(document.getElementById("session-length").innerHTML) + 1;
                    document.getElementById('show-timer').innerHTML = document.getElementById("session-length").innerHTML + ":00";
                }
        }
    }

    function timer(seconds) {
        const now = Date.now();
        const then = now + seconds * 1000;
        showCount(seconds);

        function breakTimer() { 
            isRunning = true;       
            
            if(loopedOnce === false){
                $('.hide-awesome').css('display', 'inline-block');                
                document.getElementById("clock-header").innerHTML = "BREAK TIME";
                let tempval = parseInt()
                document.getElementById('show-timer').innerHTML = document.getElementById("break-length").innerHTML + ":00";
                let breaking = document.getElementById("show-timer").innerHTML;
                let breakArray = breaking.split(":");
                let breakSeconds = (breakArray[0] * 60);
                breakTime = parseInt(breakSeconds);
                showCount(breakTime);         
                breakTime -= 1;
                loopedOnce = true;
            }else {
                showCount(breakTime);
                breakTime -= 1;             

            }
            if(breakTime < 0) {
                clearInterval(startBreak);
                isRunning = false;
                document.getElementById('show-timer').innerHTML = document.getElementById("session-length").innerHTML + ":00";
                document.getElementById("clock-header").innerHTML = "Session";
                $('.hide-awesome').css('display', 'none');
            } 
                 

        }
        counter = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            // show count down
            showCount(secondsLeft);
            // check if we should stop it!
            if(secondsLeft === 0) {
              clearInterval(counter);
              isRunning = false;
              $('.hide-awesome').css('display', 'none');
              document.getElementById('show-timer').innerHTML =  document.getElementById("session-length").innerHTML + ":00";
              audio.play();
              startBreak = setInterval(breakTimer, 1000);
            }            
        }, 1000);
    } 
    
    function showCount(seconds) {
        //calculate minutes and seconds
        const minutes = Math.floor(seconds /60);
        const secondsRemaining = seconds % 60;
        const display = `${minutes}:${secondsRemaining < 10 ? '0' : '' }${secondsRemaining}`;
        displayTime.textContent = display;
    }
   
 });   
   
   
   /*----------------------------------------------------------------------------------------------------------------------------------------
   ------------------------------------------------------------------------------------------------------------------------------------------
   --------------------------- old code not used --------------------------------------------------------------------------------------------
    function countDown() {
        counter++;
        //var breakTimer =;
        var sessionTimer = document.getElementById("show-timer").innerHTML;
        //console.log(sessionTimer.split(":"));
        var holdTime = sessionTimer.split(":");
        var minutes = holdTime[0];
        var seconds = holdTime[1];
        //convert minutes to seconds
        //minutes = minutes * 60;
        //minutes = Math.floor(minutes/60);
        //seconds = seconds % 60;
        if(minutes.length < 2) {
           // minutes = "0" + minutes;
        }            
        if(seconds.length < 2) {
            //seconds = "0" + seconds;
        }            

        var temp = seconds;
        if (counter === 1) {
            document.getElementById("show-timer").innerHTML = (minutes + ":" + seconds);
        }
        if(counter === 2) {
            seconds = 59;
            document.getElementById('show-timer').innerHTML = (minutes + ":" + seconds);    
            
        }
        if (seconds >= 1 && seconds  <= 59) {
            console.log(counter);
            seconds -= 1;
            
            if(seconds < 10) {
                document.getElementById('show-timer').innerHTML = (minutes + ":0" + seconds);
            }else {
                document.getElementById('show-timer').innerHTML = (minutes + ":" + seconds);
            } 
        }
        if (seconds === 0) {
            console.log(counter);
            minutes -= 1;           

            if(minutes === 1){
                //setInterval(myFunction, 1000);
                //function myFunction (seconds) {
                    //const now = Date.now();
                //const then = now + 60(ie, seconds) * 1000;
                //const secondsLeft = (then -Date.now()) / 1000;
                //console.log(secondsLeft);
                //}
                
                document.getElementById('show-timer').innerHTML = ("00:" + seconds);
                //if (minutes === 1 && seconds < 10) {
               // document.getElementById('show-timer').innerHTML = ("00:0" + seconds);
            } 
            //else {
               // document.getElementById('show-timer').innerHTML = (minutes + ":" + seconds);
            //}
            //document.getElementById('show-timer').innerHTML = (minutes + ":0" + seconds);
            //reset counter and seconds
            counter = 0;
            seconds = 60;
            //stop countdown when no time left
            if (minutes === 0) {
                console.log(minutes);
                clearInterval(interval);
            }
        }

    }
        //if (seconds === 0) {
            //seconds = 0;
           // minutes -= 1;
            //document.getElementById('show-timer').innerHTML = (minutes + ":" + seconds);
           // clearInterval(interval);
       // }  

        //timeLeft = timeLeft - counter;

        //convertTime(seconds, minutes);
        //document.getElementById("show-timer").innerHTML = convertTime(holdTime);
        //document.getElementById("show-timer").innerHTML = convertSeconds(timeleft - counter);
    

    function convertTime(seconds, minutes) {
        /*
        if(minutes < 10)
        minutes = "0" + minutes;
        if(seconds < 10)
        seconds = seconds;
        */

      //document.getElementById("show-timer").innerHTML = (minutes + ":" + seconds)

//}

