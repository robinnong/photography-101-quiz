//PESUDOCODE 

// landing page which allows the user to click to start the quiz
// Store all of the questions in an array (10 questions)
// Each question has a set of answers 
// Assign the question and set of answers to the html form's radio buttons
// Create an event listener for when user clicks submit button to go to the next queston
// Cycle through each array index in the question set and re-assign the radio buttons when user goes to next question
// Show the user their score out of the total questions (like 3 out of 10 correct)
// Create an event listener for when user wants to restart the quiz
// Bonus: add a progress bar
// Bonus: Show "Question 1, Question 2, etc. at the top"

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
app.$questionNumber = $('h2 span') //Question number holder
app.$questionPrompt = $('h3') //Question prommpt holder
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
app.$pContainer = $('.overlay p') 
app.$button = $('button')
app.$overlay = $('#overlay')
app.$progress = $('.progress')
app.$form = $('.container') 

// ADD POINTER TO CLICKABLE ELEMENTS AND LINKS
$('label, button, input[type="submit"]').addClass('pointer')

// GLOBALLY DECLARED VARIABLES
const totalQuestions = app.questionArray.length
let score = 0;
let counter = 0;
let progressWidth = 20; //20px
let currentProgress; 
let questSet;    

//FUNCTIONS

// TOGGLE FORM VISIBILITY 
app.toggleVisibility = () => {
    $('#overlay, .score, button').hide()
}

// RANDOMIZE ARRAY
app.returnRandomArray = (array) => { 
    for (let i = array.length - 1; i > 0 ; i--) {
        const randomIndex = Math.floor(Math.random() * i)
        const tempIndex = array[i]
        array[i] = array[randomIndex]
        array[randomIndex] = tempIndex
      }  
      return array
} 

// GENERATE RANDOM QUESTION SET
app.randomizeQuestArray = () => {
    questSet = app.returnRandomArray(app.questionArray) 
}

// LOAD NEW QUESTION
app.loadNewQuestion = () => {
    app.$questionNumber.text(counter+1)
    app.$questionPrompt.text(questSet[counter].prompt)
    const randomOptions = app.returnRandomArray(questSet[counter].options)
    for (let i=0; i<=3; i++) { //load question set
        app.$options[i].text(randomOptions[i]) 
        app.$radioVal[i].val(randomOptions[i]) 
    } 
}

// END QUIZ
app.endQuiz = () => { 
    app.$overlay.show() 
    app.$pContainer.show().html(`You got <b>${score}</b> of <b>${totalQuestions}</b> questions right!`)
    app.$button.show().html("Restart Quiz")
    app.$progress.width(0) 
    counter = 0; //reset array index counter
    score = 0; //reset score 
}

// LOAD PROGRESS BAR
app.loadProgressBar = () => {
    currentProgress = progressWidth*counter  
    app.$progress.width(currentProgress)
}

// VALIDATE ANSWER
app.checkAnswer = (event) => {
    event.preventDefault() 
    if (counter === (totalQuestions - 1)) { //if we reach the end of the question set, end quiz 
        app.validateAnswer()
        setTimeout(function(){
            app.endQuiz(); 
            $('input').prop( "checked", false);  //reset user selection
        }, 800) //end quiz after 1s
    } else { //else continue to the next question 
        app.validateAnswer()
        setTimeout(function(){
            app.loadNextQuestion()
            $('input').prop( "checked", false);  //reset user selection
        }, 800) //load next question after 1s
    }
}

// VALIDATE ANSWER
app.validateAnswer = () => {
    if ($('input:checked').val() === questSet[counter].answer) { 
        $('input:checked+label').append(` <i class="fas fa-check green"></i>`) //correct
        score = score + 1; // increase score  
    } else {
        $('input:checked+label').append(` <i class="fas fa-times red"></i>`) //incorrect
    }
}

// LOAD NEXT QUESTION
app.loadNextQuestion = () => { 
    counter = counter + 1; 
    app.loadNewQuestion(); 
    app.loadProgressBar();   
}
 
// INITIALIZE EVENT LISTENERS
app.init = () => {   
    $('section, h2, h3').hide()
    // ON START AND RESTART BUTTONS
    app.$button.on('click', function () {
        $('section, h2, h3').show()
        $('.overlay').css('background-color', 'white')
        app.toggleVisibility()
        app.randomizeQuestArray()
        app.loadNewQuestion() 
    })  
    //ON SUBMIT BUTTON  
    $('form').on('submit', app.checkAnswer)  
};

// DOCUMENT READY
$(() => {  
    app.init();
})  



