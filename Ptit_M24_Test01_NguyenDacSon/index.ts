interface IPlayer {
    id: number
    name: string
    score: number
}

class Player {
    players: IPlayer
    constructor(players: IPlayer) {
        this.players = players
    }
}
let numberOfPlayers = (document.getElementById("numberOfPlayers") as HTMLElement)
let totalScore = (document.getElementById("totalScore") as HTMLElement)

let players: IPlayer[] = JSON.parse(localStorage.getItem("players") as string) || []
localStorage.setItem("players", JSON.stringify(players))
function renderPlayers(): void{
    (document.getElementById("numberOfPlayers") as HTMLElement).innerHTML = players.length.toString()
    let total: number = 0
    const playersContain = (document.getElementById('playersContain') as HTMLElement);
    let text: string = ""
    for(let i: number = 0; i < players.length; i++){
        text += `
        <div class="mini-player-container">
        <div class="left-body">
        <span><i class="fa-solid fa-xmark icon1" onclick="deletePlayer(${players[i].id})"></i></span>
        <span><i class="fa-solid fa-crown icon2"></i> <span id="namePlayer">${players[i].name}</span></span>
        </div>
        <div class="right-body">
        <span class="score-btn" onclick="decreaseScore(${players[i].id})">-</span>
        <span class="score">${players[i].score}</span>
        <span class="score-btn" onclick="increaseScore(${players[i].id})">+</span>
        </div>
        </div>
        `;
        total += players[i].score
    };
    totalScore.innerHTML = total.toString()
    playersContain.innerHTML = text
}
renderPlayers()

function createPlayers(){
    let getNamePlayers = (document.getElementById("getName") as HTMLInputElement)
    if(getNamePlayers.value == ""){
        alert("Vui lòng nhập tên")
        return
    }
    let newPlayer = new Player({ id: Math.floor(Math.random() * 99999999), name: getNamePlayers.value, score: 0 })
    players.push(newPlayer.players)
    localStorage.setItem("players", JSON.stringify(players))
    getNamePlayers.value = ""
    renderPlayers()
}

function decreaseScore(playerId: number) {
    let score = (document.getElementById("score") as HTMLElement);
    let player = players.find((item) => item.id === playerId);
    if (player.score > 0) {
        player.score--;
        localStorage.setItem("players", JSON.stringify(players));
    }
    renderPlayers()
}
  
function increaseScore(playerId: number) {
    let player = players.find((item) => item.id === playerId);
    player.score++;
    localStorage.setItem("players", JSON.stringify(players));
    renderPlayers()
}
  
function deletePlayer(playerId: number) {
    let checkDelete = confirm("Bạn có chắc là muốn xóa người chơi này không?")
    if(checkDelete){
        let index = players.findIndex((item) => item.id === playerId);
        players.splice(index, 1);
        localStorage.setItem("players", JSON.stringify(players));
        renderPlayers();
    }
}