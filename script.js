document.body.addEventListener('keydown', function(event){
 const direction = event.key;
 moveSnake(direction)
})

var snakeHead = "box8_8"
var currentDir = ''
var totalScore = 0
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

function startAgain(){
	totalScore = 0
	var h = Array.from(document.getElementsByClassName('box'))
	h.forEach(function(item){
		item.classList.remove('snake')
		item.classList.remove('food')
		item.classList.remove('snakeHead')
	})
	document.getElementById('box8_8').classList.add('snakeHead')
	currentDir = ""
	snakesBoxes = ["box8_8"]
	snakeHead = "box8_8"
	snakeSpeed = 250
	clearAllTimeouts()
	injectFood()
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


function queryNextBox(head, dir){
  let row = head.split('_')[1]
	let col = head.split('_')[0]
	let oldHeadRow = row
	col = col.split('x')[1]
	let oldHeadCol = col


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
			let biggerSnake = eatingFood(snakeHead)
			if (!biggerSnake) {
				let snakesTailEnd = snakesBoxes.splice(0,1)
				document.getElementById(snakesTailEnd).classList.remove('snake')
			}
			document.getElementById(snakeHead).classList.add('snake')
			document.getElementById(snakeHead).classList.add('snakeHead')
			document.getElementById('box'+ oldHeadCol + '_' + oldHeadRow).classList.remove('snakeHead')
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
			let biggerSnake = eatingFood(snakeHead)
			if (!biggerSnake) {
				let snakesTailEnd = snakesBoxes.splice(0,1)
				document.getElementById(snakesTailEnd).classList.remove('snake')
			}
			document.getElementById(snakeHead).classList.add('snake')
			document.getElementById(snakeHead).classList.add('snakeHead')
			document.getElementById('box'+ oldHeadCol + '_' + oldHeadRow).classList.remove('snakeHead')
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
			let biggerSnake = eatingFood(snakeHead)
			if (!biggerSnake) {
				let snakesTailEnd = snakesBoxes.splice(0,1)
				document.getElementById(snakesTailEnd).classList.remove('snake')
			}
			document.getElementById(snakeHead).classList.add('snake')
			document.getElementById(snakeHead).classList.add('snakeHead')
			document.getElementById('box'+ oldHeadCol + '_' + oldHeadRow).classList.remove('snakeHead')
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
			let biggerSnake = eatingFood(snakeHead)
			if (!biggerSnake) {
				let snakesTailEnd = snakesBoxes.splice(0,1)
				document.getElementById(snakesTailEnd).classList.remove('snake')
			}
			document.getElementById(snakeHead).classList.add('snake')
			document.getElementById(snakeHead).classList.add('snakeHead')
			document.getElementById('box'+ oldHeadCol + '_' + oldHeadRow).classList.remove('snakeHead')
			currentDir = dir
			allTimeouts.push(setTimeout(function () {
					queryNextBox(snakeHead, dir)
				}, snakeSpeed))
		}
	}
}

function eatingFood(head){
	if(document.getElementById(head).classList.contains('food')){
		score()
		document.getElementById(head).classList.remove('food')
		injectFood()
		snakeSpeed = snakeSpeed - 7.5
		return true
	}
	else{
		return false
	}
}

function score(){
totalScore++
let html = `<h1> Score: ${totalScore} </h1>`
document.getElementById('scores').innerHTML = html
}

function gameOver(head){
	if (document.getElementById(head).classList.contains('snake')){
	alert('Game Over, your score is ' + totalScore)
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


function detectswipe(el,func) {
      swipe_det = new Object();
      swipe_det.sX = 0;
      swipe_det.sY = 0;
      swipe_det.eX = 0;
      swipe_det.eY = 0;
      var min_x = 20;  //min x swipe for horizontal swipe
      var max_x = 40;  //max x difference for vertical swipe
      var min_y = 40;  //min y swipe for vertical swipe
      var max_y = 50;  //max y difference for horizontal swipe
      var direc = "";
      ele = document.getElementById(el);
      ele.addEventListener('touchstart',function(e){
        var t = e.touches[0];
        swipe_det.sX = t.screenX;
        swipe_det.sY = t.screenY;
      },false);
      ele.addEventListener('touchmove',function(e){
        e.preventDefault();
        var t = e.touches[0];
        swipe_det.eX = t.screenX;
        swipe_det.eY = t.screenY;
      },false);
      ele.addEventListener('touchend',function(e){
        //horizontal detection
        if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
          if(swipe_det.eX > swipe_det.sX) direc = "r";
          else direc = "l";
        }
        //vertical detection
        if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
          if(swipe_det.eY > swipe_det.sY) direc = "d";
          else direc = "u";
        }

        if (direc != "") {
          if(typeof func == 'function') func(el,direc);
        }
        direc = "";
      },false);
    }

    function myfunction(el,d) {
			let direction = (d === 'u' ? 'ArrowUp' : (d === 'd' ? 'ArrowDown' : (d === 'l' ? 'ArrowLeft' : (d === 'r' ? 'ArrowRight'))))
      moveSnake(direction)
    }



    detectswipe('body',myfunction);
