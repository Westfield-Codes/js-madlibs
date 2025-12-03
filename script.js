/* main controls the program. 
 * create a global array: "story" (to store the words of the story as an array of strings),
 * then create an empty global for storyWithSpaces, which will hold the final madlibbed story as a single string with spaces, reconstructed from the modified story array. Run the program. 
 * @param none
 * @return none
 */

var story = [];
var storyString;
var numberedStory = "";
var string;
var board = document.getElementById("buildBoard");
var storyBox;
var save;
var changeCount;
var replacements;
var inputData;
var message; 
var words;
var word = 1;
/* main 
 * opens an input box and asks for the story 
 * chains to text processing functions
 */

function main() {
    let start = document.getElementById("start")
    start.remove();
    getInput("Paste your story below:","My dog has fleas!",encodeStory);
}

 /* encodeStory(storyString)
 * create a copy of storyString as a new variable, story array is equal to storyString being split by spaces
 * story = spaceMarks(story)
 * return string
 * @param storyString
 * @return story, string
 */
function encodeStory() {
    storyString = inputData; // creates a copy of the original, not used below
    story = inputData.split(" ");
    spaceMarks();
} 

/* spaceMarks(story)
 * Splits words in the story array that contain punctuation marks, ensuring punctuation is separated from words.
 * Iterates through each word, checks for punctuation, and splits accordingly.
 * @param story
 * @return story
 */
function spaceMarks() {
    const marks = ['.','?','!',':',';',',','...'];
    let text = "";
    let split = [];
    let mark = "";
       for (let i = 0; i < story.length; i++) {
        text = story[i];
        mark = text.charAt(text.length - 1);
        if (marks.includes(mark)) {
            split = story[i].slice(0, -1);
            story.splice(i, 1, split, mark);
            i++;
        }
    }
    subSpeech();
}

 /* numberedStory = subSpeech(story)
 * declare numberedStory as an empty string
 * for index being set to 0 and being less than story.length count up
 * for each word, append story[i] followed by "[" + i + "]" and a space to numberedStory
 * after the loop, trim any trailing space and return numberedStory, which is a string where each word is followed by its index in square brackets and separated by spaces
 * @param story
 * @return numberedStory
 */
function subSpeech() {
    for (let i = 0; i < story.length; i++) {
        numberedStory += story[i] + "[" + i + "] ";
    }
    showSpeechList()
}


/* showSpeechList(numberedStory)
* Expects numberedStory as a string where each word from the story is followed by its index in square brackets
* set replacements as an empty array, word change as an empty variable
* prompt numberedStory and ask how many words the user wants to change
* store their input as changeCount
* declare originalWord and speechPart
* for index being set to 0 going to changeCount, counting up:
* prompt what word to change, save input as wordChange
* originalWord = story[wordChange]
* prompt what part of speech the originalWord was, this is what speechPart will be defined as
* replacements.push(wordChange), story[wordChange] = speechPart
* when for loop ends alert the number of words that are to be replaced in the next step.
* @param numberedStory
* @return replacements
*/
/* let the "Word Wizard" know that its the player's turn. */
function showSpeechList() {
    replacements = [];
    message = "How many words would you like to change?"
    word = 1;
    getInput(message,"",wordsToChange);    
}

function wordsToChange(){
    words = parseInt(inputData);
    console.log(words + " words to change.");
    chooseWords();
}

function chooseWords(){
    message = numberedStory + "<br><br><hr><br>Word " + word + " of " + words + ": which word would you like to change?";
    getInput(message,"",nextWord);
}

/* nextWord 
 * obtains the next word choice (word) up to the number of words (words)
 */
function nextWord(){
    replacements.push(inputData);
    word++;
    if (word <= words) chooseWords();
    else{
        message = "Now we will get the parts of speech for these " + words + " words ";
        getInput(message,0,wordsToReplace);
    }
}

/* Configures variables for event-driven loop */
function wordsToReplace(){
    words = replacements.length;
    word = 0 ;
    replaceWords();
}
/* User interaction for loop */
function replaceWords(){
    message = "What part of speech is <strong>" + story[replacements[word]] + "</strong>?";
    getInput(message,"noun,plural noun,Proper Noun,verb,adjective,adverb,preposition,",nextReplacement)
}

/* extReplacement
 * replaces chosen story words based on indices in replacements array
 * with parts of speech for those words in story
 */
function nextReplacement(){
    console.log("Replacing "+ story[replacements[word]] + " with " + inputData);
    story[replacements[word]] = inputData;
    word++;
    if (word < replacements.length) replaceWords();
    else{
        message = words + " words will be replaced by your player(s). Go get them!";
        getInput(message,"Click the button when the player is here.",rebuildStory);
    }
}

/* nextPOSWord 
 * obtains the next Part of Speech (POS) for the next word choice (word) up to the number of words (words)
 */
function nextPOSWord(){
    story[word] = inputData;
    word++;
    getPartsOfSpeech()
}

/* rebuildStory(replacements)
* alert user for words that correspond with the parts of speech, declare newWord
* prompt the user for a new word to replace story[replacements[i]], assign the input to story[replacements[i]]
* terminate and return replacements when for loop finishes counting.
* @param replacements
* @return replacements
*/
function rebuildStory() {
    let newWord = makePopUp("Give me some words that correspond with the parts of speech. Are you ready?");
    let i = 1;
    if (i < replacements.length) {
        getReplacement(i, newWord);
        i++;
    }
    rebuildStory();
}

function getReplacement(i, newWord) {
    newWord = prompt(story[replacements[i]]);
    story[replacements[i]] = newWord;
}
/* storyWithSpaces: join the madlibbed story array into a single string with spaces */


/* showStory(string)
* Displays the original and modified story to the user
* @param string
* @return none
*/
function showStory(string) {
    // alert("This was your original story:\n\n" + string + "\n\nAnd here is your madlibbed story:\n\n" + storyWithSpaces);
}

function getInput(instruct, message, target) {

    let popUp = document.createElement("div")
    popUp.id = "popUp";
    let instructions = document.createElement("p");
    instructions.innerHTML = instruct;
    popUp.appendChild(instructions); 
    if (message != "0"){
        let inputBox = document.createElement("input");
        inputBox.value = message;
        inputBox.id = "inputBox";
        popUp.appendChild(inputBox); 
    }
    let inputButton = document.createElement("button");
    inputButton.id = "inputButton";
    inputButton.innerHTML = "Done";
    inputButton.addEventListener("click", function(){
        closePopUp(target);
    }, false);
    popUp.appendChild(inputButton);
    if (!document.getElementById("popUp")){
        document.body.appendChild(popUp);
    }
}

function closePopUp(target){
    if (document.getElementById("inputBox")){
        inputBox = document.getElementById("inputBox");
        inputData = inputBox.value;
        console.log(inputData);
    }
    document.getElementById("popUp").remove();
    target();
}
/* thank user and process finished. */