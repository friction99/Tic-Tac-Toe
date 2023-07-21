const gameCells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restartbtn");
const alertBox = document.querySelector(".alertBox");
//making variables
let currentPlayer = 'X';
let nextPlayer = '0';
let playerTurn = currentPlayer;
//function to start the game
const startGame = ()=>{
    for(let i=0;i<gameCells.length;i++){
        document.querySelectorAll(".cell")[i].addEventListener('click',handleClick);
    };
};
//changing player turn
const changePlayerTurn = () =>{
    if(playerTurn===currentPlayer){
        playerTurn = nextPlayer;
    }
    else playerTurn=currentPlayer;
};
//function to checkWin
const checkWin = ()=>{
    const winningCondition = 
    [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for(let i=0;i<winningCondition.length;i++){
        const[pos1,pos2,pos3]=winningCondition[i];
        if(gameCells[pos1].textContent != '' && 
            gameCells[pos1].textContent===gameCells[pos2].textContent &&
            gameCells[pos2].textContent===gameCells[pos3].textContent){
            return true;
        }
    }
    return false;
};
const checkTie=()=>{
    let emptycells = 0;
    gameCells.forEach(cell=>{
        if(cell.textContent==='') emptycells++;
    });
    return emptycells===0 && !checkWin();
};
const handleClick = (e)=>{
    if(e.target.textContent===''){
        document.querySelector(".restartbtn").addEventListener('click',restartGame);
        e.target.textContent = playerTurn;
        if(checkWin()){
            alertBox.classList.add("enable");
            alertBox.innerHTML=`${playerTurn} is the winner`;
            setTimeout(()=>{
                alertBox.classList.remove("enable");
            },2000);
            cellDisable();
        }
        else if(checkTie()){
            alertBox.classList.add("enable");
            alertBox.innerHTML=`Its a tie`;
            setTimeout(()=>{
                alertBox.classList.remove("enable");
            },2000);
            cellDisable();
        }
        else changePlayerTurn();
    }
}
//function to disable board after a win or tie
const cellDisable = ()=>{
    gameCells.forEach(cell=>{
        cell.removeEventListener('click',handleClick);
        cell.classList.add('disabled');
    });
};
const restartGame = ()=>{
    gameCells.forEach(cell=>{
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    startGame();
}
//calling startGame function
startGame();

