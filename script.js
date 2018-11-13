document.body.addEventListener('keydown', function(event){
 const direction = event.key;
 moveSnake(direction)
})

var snakeHead = "box8_8"
var currentDir = ''
var length = 1
var allTimeouts = []
var snakeSpeed = 250
// var food = (min, max) => {Math.floor(Math.random()*(max-min+1)+min)}

var snakesBoxes = ["box8_8"]
injectFood()

function injectFood(){
  foodCol = Math.floor(Math.random()*(15-1+1)+1)
  foodRow = Math.floor(Math.random()*(15-1+1)+1)
  let id = 'box' + foodRow + '_' + foodCol
  document.getElementById(id).classList.add('food')
}

function moveSnake(dir){
	if(currentDir === dir){
		return
	}
	else if(currentDir === 'ArrowLeft' && dir === "ArrowRight"){
		return
	}
	else if(currentDir === 'ArrowRight' && dir === "ArrowLeft"){
		return
	}
	else if(currentDir === 'ArrowDown' && dir === "ArrowUp"){
		return
	}
	else if(currentDir === 'ArrowUp' && dir === "ArrowDown"){
		return
	}
	else{
		clearAllTimeouts()
    queryNextBox(snakeHead, dir)
	}
}

function eatingFood(id){
  document.getElementById(id).classList.contains('food')
}
function queryNextBox(head, dir){
  let row = head.split('_')[1]
	let col = head.split('_')[0]
	col = col.split('x')[1]


		// /	ArrowLeft  / //
		if (dir === 'ArrowLeft') {
		if (col == 1) {
			col = 15
		}
		else{
			col--
		}
		snakeHead = 'box'+ col + '_' + row
		snakesBoxes.push(snakeHead)
		var carryOn = gameOver(snakeHead)
		if(carryOn){
			let increaseSnakeLength = eatingFood(snakeHead)
      if(increaseSnakeLength){
        document.getElementById(snakeHead).classList.add('snake')
      }
      else{
        let snakesTailEnd = snakesBoxes.splice(0,1)
        document.getElementById(snakesTailEnd).classList.remove('snake')
      }
			currentDir = dir
			allTimeouts.push(setTimeout(function () {
					queryNextBox(snakeHead, dir)
				}, snakeSpeed))
		}
	}

		// /	ArrowRight  / //
		if (dir === 'ArrowRight') {
		if (col == 15) {
			col = 1
		}
		else{
			col++
		}
		snakeHead = 'box'+ col + '_' + row
		snakesBoxes.push(snakeHead)
		var carryOn = gameOver(snakeHead)
		if(carryOn){
			let snakesTailEnd = snakesBoxes.splice(0,1)
			document.getElementById(snakesTailEnd).classList.remove('snake')
			document.getElementById(snakeHead).classList.add('snake')
			currentDir = dir
			allTimeouts.push(setTimeout(function () {
					queryNextBox(snakeHead, dir)
				}, snakeSpeed))
		}
	}

		// /	ArrowUp  / //
		if (dir === 'ArrowUp') {
		if (row == 1) {
			row = 15
		}
		else{
			row--
		}
		snakeHead = 'box'+ col + '_' + row
		snakesBoxes.push(snakeHead)
		var carryOn = gameOver(snakeHead)
		if(carryOn){
			let snakesTailEnd = snakesBoxes.splice(0,1)
			document.getElementById(snakesTailEnd).classList.remove('snake')
			document.getElementById(snakeHead).classList.add('snake')
			currentDir = dir
			allTimeouts.push(setTimeout(function () {
					queryNextBox(snakeHead, dir)
				}, snakeSpeed))
		}
	}

		// /	ArrowDown  / //
		if (dir === 'ArrowDown') {
		if (row == 15) {
			row = 1
		}
		else{
			row++
		}
		snakeHead = 'box'+ col + '_' + row
		snakesBoxes.push(snakeHead)
		var carryOn = gameOver(snakeHead)
		if(carryOn){
			let snakesTailEnd = snakesBoxes.splice(0,1)
			document.getElementById(snakesTailEnd).classList.remove('snake')
			document.getElementById(snakeHead).classList.add('snake')
			currentDir = dir
			allTimeouts.push(setTimeout(function () {
					queryNextBox(snakeHead, dir)
				}, snakeSpeed))
		}
	}
}

function gameOver(head){
	if (document.getElementById(head).classList.contains('snake')){
	alert('game over')
	console.log(snakesBoxes);
	return false
	}
	else{
		return true
	}
}

function clearAllTimeouts(){
	for (var i = 0; i < allTimeouts.length; i++) {
		clearTimeout(allTimeouts[i])
	}
}

// function keepRunning(){
// 	for (var i = 0; i < allTimeouts.length; i++) {
// 		allTimeouts[i]()
// 	}
// }
