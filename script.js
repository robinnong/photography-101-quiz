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
        prompt: "___________ will gradually increase the grain on your photos",
        options: ["Increasing the shutter speed", 
                "Decreasing the ISO", 
                "Slowing down the shutter speed", 
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
app.$questionPrompt = $('h2 span') //Question prompt holder
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
    const arrayLength = array.length  
    for (let i = 0; i < arrayLength ; i++) {
        const randomIndex = Math.floor(Math.random() * arrayLength)
        const tempIndex = array[i]
        array[i] = array[randomIndex]
        array[randomIndex] = tempIndex
      } 
      return array
} 

// ASSIGN NEW QUESTION SET
app.loadNewQuestion = () => {
    const randomQuestions = app.returnRandomArray(app.questionArray) 
    questSet = randomQuestions[counter] 
    app.$questionPrompt.text(counter+1 + ". " + questSet.prompt)
    const randomOptions = app.returnRandomArray(questSet.options)
    for (let i=0; i<=3; i++) { //load question set
        app.$options[i].text(randomOptions[i]) 
        app.$radioVal[i].val(randomOptions[i]) 
    } 
}

// END QUIZ
app.endQuiz = () => {
    app.$overlay.show() 
    app.$pContainer.show().html(`You got <b>${score}</b> out of <b>${totalQuestions}</b> questions right!`)
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
    if ($('input:checked').val() === questSet.answer) { 
        score = score + 1; //go to the next question  
    }  
    if (counter === (totalQuestions - 1)) { 
        app.endQuiz(); //if we reach the end of the question set, end quiz
    } else { //else continue to the next question
        counter = counter + 1;
        app.loadNewQuestion(); 
        app.loadProgressBar();
    } 
    $('input').prop( "checked", false); //reset user selection
}

// INITIALIZE EVENT LISTENERS
app.init = () => {   
    // ON START AND RESTART BUTTONS
    app.$button.on('click', function () {
        app.toggleVisibility()
        app.loadNewQuestion() 
    })  
    //ON SUBMIT BUTTON
    $('form').on('submit', app.checkAnswer) 
};

// DOCUMENT READY
$(() => {  
    app.init();
})  



