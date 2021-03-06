var s;
var scl = 20;
var food;
var direction;
var img;
var scoreElem;


function preload() {
    img = loadImage(jahiaLogo);
    image(img, windowWidth, windowHeight);
}
  

function setup() {
    scoreElem = createDiv('Score = 0');
    scoreElem.parent('snakeScore');
    scoreElem.style('color', 'black');
    canvas = createCanvas(600, 600);
    canvas.parent('snakeContainer');
    s = new Snake();
    frameRate(10);
    pickLocation();
}

function pickLocation() {
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function draw() {
    background(51);
    image(img, 1, 1, 598, 598);
    s.death();
    s.update();	
    s.show();
    scoreElem.show();

    if (s.eat(food)) {
        pickLocation();
    }
  
    if (s.total < 5) {
        fill(0, 0, 255);
    } else if (s.total >= 5 && s.total < 10) {
        fill(255, 0, 0);		
    } else {
        fill(0, 255, 0);				
    }

    rect(food.x, food.y, scl, scl);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (direction != 'down') {
            direction = 'up';
            s.dir(0, -1);
        }
    } else if (keyCode === DOWN_ARROW) {
        if (direction != 'up') {
            direction = 'down';
            s.dir(0, 1);
        }	
 	} else if (keyCode === RIGHT_ARROW) {
        if (direction != 'left') {
            direction = 'right';
            s.dir(1, 0);
        }
    } else if (keyCode === LEFT_ARROW) {
        if (direction != 'right') {
            direction = 'left';
            s.dir(-1, 0);
        }
    }
}
      
function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            scoreElem.html('Score = ' + this.total);
            return true;
        }   else {
            return false;
        }
    }

    this.death = function() {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist (this.x, this.y, pos.x, pos.y);
            if (d < 1){
                var scoreVal = parseInt(scoreElem.html().substring(8));
                scoreElem.html('Game ended! Your score was : ' + this.total);
                this.total = 0;
                this.tail = [];
            }
        }
    }
	
    this.update = function() {
        if (this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length-1; i++) {
                this.tail[i] = this.tail [i+1];
            }
        }	

        this.tail[this.total-1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed*scl;
        this.y = this.y + this.yspeed*scl;

        this.x = constrain(this.x, 0, width-scl);
        this.y = constrain(this.y, 0, height-scl);
    }	

    this.show = function() {
        fill(0,0,0);
      
        for ( var i = 0; i < this.total; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl, 20);
        }
      
        fill(102, 255, 255);
        rect(this.x, this.y, scl, scl, 50); 		
    }
    
}