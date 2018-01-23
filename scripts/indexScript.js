$(document).ready(function () {
    //use event propigation to get the clicked item
    var theParent = document.querySelector(".button-container");
    theParent.addEventListener("click", getClick, false);
    //global counter variable
    var counter = 0;
    var timeLeft = 60;

    function getClick(e) {
        if (e.target !== e.currentTarget) {
            //event target always goes to root element so we are going back to parent button as well as getting the target
            // += doesn't work in this cas and we use parseInt on the element to get it to increment by one
            var btnClicked = e.target;
            var btnParent = e.target.parentNode;
            var btnId = e.target.id;
            var btnValue = e.target.value;
            if(btnParent.className === 'break-min' && btnClicked.className ==='fa fa-minus') {
                document.getElementById("break-length").innerHTML -= 1;
            }else if (btnParent.className === 'break-plus' && btnClicked.className === 'fa fa-plus') {
                document.getElementById("break-length").innerHTML =  parseInt(document.getElementById("break-length").innerHTML) + 1;

            } else if (btnParent.className === 'session-min' && btnClicked.className === 'fa fa-minus') {
                document.getElementById("session-length").innerHTML -= 1;
            }else if (btnParent.className = 'session-plus' && btnClicked.className === 'fa fa-plus') {
                document.getElementById("session-length").innerHTML =  parseInt(document.getElementById("session-length").innerHTML) + 1;
            }

            if(e.target.id === 'start-btn') {
                //countdown called every 1 second indefinetly
                setInterval(countDown, 1000);
            }
             
        }
    }

    function countDown() {
        counter++;
        //var breakTimer =;
        var sessionTimer = document.getElementById("show-timer").innerHTML;
        //console.log(sessionTimer.split(":"));
        var holdTime = sessionTimer.split(":");
        var minutes = holdTime[0];
        var seconds = holdTime[1];
        //convert minutes to seconds
        minutes = minutes * 60;
        minutes = Math.floor(minutes/60);
        seconds = seconds % 60;
        document.getElementById("show-timer").innerHTML = (minutes + ":" + seconds);
        timeLeft = timeLeft - counter;

        //convertTime(seconds, minutes);
        //document.getElementById("show-timer").innerHTML = convertTime(holdTime);
        //document.getElementById("show-timer").innerHTML = convertSeconds(timeleft - counter);
    }

    function convertTime(seconds, minutes) {
        /*
        if(minutes < 10)
        minutes = "0" + minutes;
        if(seconds < 10)
        seconds = seconds;
        */

      document.getElementById("show-timer").innerHTML = (minutes + ":" + seconds)

    }

});