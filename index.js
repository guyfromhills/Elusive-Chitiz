




//grab score
const scoreBoard = document.querySelector(".score");

//grab mole
const moles = document.querySelectorAll(".mole");

//grab holes
const holes = document.querySelectorAll(".hole");

let lastHole;

let timeUp = false ;

let score =0;

//func for random time of moles coming up
function randomTime(min, max)
{
    return Math.round(Math.random()*(max - min) + min);
}

//func for choosing a random hole
function randomHole(holes)
{
    //defining index
    const index =  Math.floor(Math.random()*holes.length);

    //grab list item
    const hole = holes[index];

    //if list item matches the previous list item
    if( hole === lastHole)
    {
        console.log("Ah na bud, it's the same hole");
        return randomHole(holes);
    }

    //storing value of hole to lastHole
    lastHole = hole;

    return hole;
}

//func for making the mole come up
function peep()
{
    //setting time
    const time = randomTime(200,1000);

    //setting random hole
    const hole = randomHole(holes);

    //adding class to hole
    hole.classList.add("up");

    //when timer expires, call func
    setTimeout(function (){

        //remove class up
        hole.classList.remove("up");

        //if isDown is true
        if(!timeUp)
        {
            peep();
        }


    }, time)

}

//func for start GAME, control the beginning and end of game 
function startGame()
{

    //set score = 0
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;

    peep();

    //after 10 secs set isDown to false
    setTimeout(function(){

        timeUp = true;
    },10000)


}

function bonks(e){
    //if click is faked terminate click functionality

    if( !e.isTrusted)
    {
        return;
    }


    //increment score on click
    score++;

    //remove class on click
    this.classList.remove("up");

    //display score
    scoreBoard.textContent = score;
}

//if mole is clicked, call bonks
moles.forEach(function (mole){
    mole.addEventListener("click", bonks);
})