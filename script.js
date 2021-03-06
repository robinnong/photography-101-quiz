const app = {}; //name space object

app.questionArray = [
    {
        prompt: "The 'A' or 'Av' on a camera dial indicates:",
        options: ["Automatic Setting mode",
                    "Aperture Dial mode",
                    "Aperture Priority mode",
                    "Automatic Shutter mode"],
        answer: "Aperture Priority mode" 
    },
    {
        prompt: "___________ will increase grain in photos",
        options: ["Increasing the shutter speed", 
                "Decreasing the ISO", 
                "Decreasing the shutter speed", 
                "Increasing the ISO"],
        answer: "Increasing the ISO"
    },
    {
        prompt: "Which of the following statements about shutter speeds is false?",
        options: ["Sport photography is best shot with a fast shutter speed", 
                "Decreasing the shutter speed with allow less light into the lens", 
                "Long exposure photography requires a slow shutter speed", 
                "Shutter speed and aperture are inversely proportional"],
        answer: "Decreasing the shutter speed with allow less light into the lens"
    },
    {
        prompt: "Which 3 settings directly influence exposure?",
        options: ["Shutter speed, aperture, ISO", 
                "Shutter speed, aperture, white balance", 
                "Focus points, shutter speed, aperture", 
                "Focus points, white balance, ISO"],
        answer: "Shutter speed, aperture, ISO"
    },
    {
        prompt: "The setting which controls light temperature:",
        options: ["Light Metering", 
                "Exposure", 
                "ISO", 
                "White Balance"],
        answer: "White Balance" 
    },
    {
        prompt: "The f-stop is a fractional measure of:",
        options: ["Focal length", 
                "Aperture", 
                "Shutter Speed", 
                "ISO"],
        answer: "Aperture"
    },
    {
        prompt: "The distance between objects furthest in the background and closest to the foreground that appear acceptably sharp is:",
        options: ["Aperture", 
                "Focal length", 
                "ISO", 
                "Depth of field"],
        answer: "Depth of field"
    },
    {
        prompt: "This type of uncompressed image file stores data captured from a camera's sensor:",
        options: [".JPEG", 
                ".TIFF", 
                ".RAW", 
                ".PNG"],
        answer: ".RAW"
    },
    {
        prompt: "The 'S' or 'Tv' on a camera dial indicates:",
        options: ["Single Focus Mode", 
                "Shutter Dial Mode", 
                "Shutter Priority Mode", 
                "Single Shooting Mode"],
        answer: "Shutter Priority Mode"
    },
    {
        prompt: "A _______ focal length (e.g. 80 mm) will produce a _______ angle of view",
        options: ["long, narrow", 
                "short, narrow", 
                "long, wide", 
                "short, wide"], 
        answer: "long, narrow"
    }
]; //quiz array where each index is an question object

// CACHED JQUERY SELECTORS
app.$questionNumber = $('h2 span'); //Question number holder
app.$questionPrompt = $('h3'); //Question prommpt holder
app.$options = [
                    $('#option-a + label'),
                    $('#option-b + label'),
                    $('#option-c + label'),
                    $('#option-d + label')
                ]
app.$radioVal = [
                    $('#option-a'),
                    $('#option-b'),
                    $('#option-c'),
                    $('#option-d')
                ]
app.$pContainer = $('.overlay p'); 
app.$button = $('button');
app.$overlay = $('#overlay');
app.$progress = $('.progress');
app.$form = $('.container'); 

// ADD POINTER TO CLICKABLE ELEMENTS AND LINKS
$('label, button, input[type="submit"]').addClass('pointer');

// GLOBALLY DECLARED VARIABLES
const totalQuestions = app.questionArray.length;
let score = 0;
let counter = 0;
let questSet;    
let interval; 

//FUNCTIONS
// TOGGLE FORM VISIBILITY 
app.toggleVisibility = () => {
    $('section, h2, h3').show();
    $('#overlay, .score, button').hide();
}

app.timer = (counter) => {
    interval = setInterval(function(){
        if (counter > 0) {
            counter--;
            $('.counter').text(counter);
        } else {
            app.checkAnswer();
            clearInterval(interval);
            counter = 10;
        }
    }, 1000);
}

// RANDOMIZE ARRAY
app.returnRandomArray = (array) => { 
    for (let i = array.length - 1; i > 0 ; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const tempIndex = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = tempIndex;
    }  
    return array;
} 

// LOAD NEW QUESTION
app.loadNewQuestion = () => {
    counter = counter + 1;
    $('.counter').text('10');
    $('input').prop("checked", false);  //reset user selection
    app.loadProgressBar(counter); //load progress bar 
    app.$questionNumber.text(counter);
    app.$questionPrompt.text(questSet[counter - 1].prompt);
    // Generate multiple choice options in random order
    const randomOptions = app.returnRandomArray(questSet[counter -1].options); 
    //load question set
    for (let i=0; i<=3; i++) { 
        app.$options[i].text(randomOptions[i]); 
        app.$radioVal[i].val(randomOptions[i]); 
    } 
    app.timer(10); // Start 10s timer
}

// GENERATE A RANDOMLY ORDERED SET OF QUESTIONS
app.loadNewQuestionSet = () => questSet = app.returnRandomArray(app.questionArray);

// END QUIZ
app.endQuiz = () => { 
    $('input').prop("checked", false);  //reset user selection
    app.$overlay.show(); 
    app.$pContainer.show().html(`You got <b>${score}</b> of <b>${totalQuestions}</b> questions right!`);
    app.$button.show().html("Restart Quiz");
    app.$progress.width(0); 
    counter = 0; //reset array index counter
    score = 0; //reset score 
}

// LOAD PROGRESS BAR
app.loadProgressBar = (count) => app.$progress.width(20 * count); //20px*counter

// DELAY
app.wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// VALIDATE ANSWER
app.checkAnswer = () => { 
    clearInterval(interval);
    app.validateAnswer(); 
    //if we reach the end of the question set, end quiz, else continue to the next question and load next question after 0.7s
    counter === totalQuestions ? app.wait(700).then(app.endQuiz) : app.wait(700).then(app.loadNewQuestion);  
}

// VALIDATE ANSWER
app.validateAnswer = () => {
    if ($('input:checked').val() === questSet[counter-1].answer) { 
        $('input:checked+label').append(` <i class="fas fa-check green"></i>`); //correct
        score = score + 1; // increase score  
    } else {
        $('input:checked+label').append(` <i class="fas fa-times red"></i>`); //incorrect
    }
}

// INITIALIZE EVENT LISTENERS
app.init = () => {
    $('.counterContainer').hide();
    $('section, h2, h3').hide();
    // ON START AND RESTART BUTTONS
    app.$button.on('click', function () {
        $('.counterContainer').show();
        $('.overlay').css('background-color', 'white');
        app.toggleVisibility(); 
        app.loadNewQuestionSet();
        app.loadNewQuestion(); 
    })  
    //ON SUBMIT BUTTON  
    $('form').on('submit', function(e) {
        e.preventDefault(); 
        if ($('input:checked').length > 0) {
            $('.warning').text("");
            app.checkAnswer();  
        } else {
            $('.warning').text("Please make a selection");
        }
    });
}

// DOCUMENT READY
$(() => {  
    app.init();
})  



