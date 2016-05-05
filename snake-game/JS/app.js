(function () {
    var xmlns = "http://www.w3.org/2000/svg";
    var width = 10;
    var height = 10;
    var snakeArray = [];
    var direction = "right";
    var foodLocation = {};
    var count = 0;

    var snakeContainer = document.getElementById("snake-container");
    var gameInit = {
        start : function () {
            createSnake();
            drawSnake();
            drawFood();
            this.interval = setInterval(updateGame, 50);
        },
        stopGame : function () {
            clearInterval(this.interval);
        }
    }


    gameInit.start();


    function createSnake() {
        var length = 5;
        for (var i = length - 1; i >= 0; i--) {
            //This will create a horizontal snake starting from the top left
            snakeArray.push({x: i, y: 0});
        }
    }

    function drawSnake() {
        for (var i = 0; i < snakeArray.length; i++) {
            //This will create a horizontal snake starting from the top left
            drawSnakeSvg(snakeArray[i]);
        }
    }
    
    


    function drawSnakeSvg(coordinateObject) {

        var elem = document.createElementNS(xmlns, "rect");
        var x = coordinateObject.x * width;
        var y = coordinateObject.y * height;
        elem.setAttributeNS(null, "x", x);
        elem.setAttributeNS(null, "y", y);
        elem.setAttributeNS(null, "width", width);
        elem.setAttributeNS(null, "height", height);
        elem.setAttributeNS(null, "fill", "red");
        elem.setAttributeNS(null, "stroke", "white");
        document.getElementById("snake-container").appendChild(elem);
    }
    
    
    function drawFoodSvg(foodLocation) {
        var elem = document.createElementNS(xmlns, "rect");
        var x = foodLocation.x ;
        var y = foodLocation.y;
        elem.setAttributeNS(null, "x", x);
        elem.setAttributeNS(null, "y", y);
        elem.setAttributeNS(null, "width", width);
        elem.setAttributeNS(null, "height", height);
        elem.setAttributeNS(null, "fill", "blue");
        elem.setAttributeNS(null, "stroke", "white");
        elem.setAttributeNS(null, "id", "snake-food");
        document.getElementById("game-container").appendChild(elem);
    }
    
    function drawFood() {
        var randomX = Math.abs(Math.floor(Math.random() * (600 + 50) - 50));
        var randomY = Math.abs(Math.floor(Math.random() * (400 + 50) - 50));
        foodLocation = {"x": randomX, "y" : randomY};
        drawFoodSvg(foodLocation);
    }

    function crashWithBorder(xPoint, yPoint) {
        if((xPoint === -1) || (xPoint === 80) || (yPoint === -1) || (yPoint === 50)){
            alert("crash");
            gameInit.stopGame();
        }
    }

    function crashWithBody(xPoint, yPoint) {
        for(var i = 0; i < snakeArray.length; i++){
            if(snakeArray[i].x == xPoint && snakeArray[i].y == yPoint){
                gameInit.stopGame();
            }
        }
    }

    function snakeGrow(xPoint, yPoint) {
        var head = {x: xPoint, y : yPoint};
        snakeArray.unshift(head);
    }

    function foodCollect(xPoint,yPoint) {
        var foodXLocation = Math.round(foodLocation.x / 10);
        var foodRightLocation = foodXLocation + width;
        var foodYLocation = Math.round(foodLocation.y / 10);
        var foodBottomLocation = foodYLocation + height;

        if(( (foodXLocation === xPoint) && (foodYLocation === yPoint) )||((foodRightLocation === xPoint) && (foodBottomLocation === yPoint))){

            var element = document.getElementById("snake-food");
            element.parentNode.removeChild(element);
            snakeGrow(xPoint, yPoint);  
            drawFood();
            console.log(count++);
            document.getElementById("score-card").innerHTML = " " + count;

        }
    }

    function updateGame() {

        //remove all child element in snake container
        while (snakeContainer.firstChild) snakeContainer.removeChild(snakeContainer.firstChild);


        // snake head co-ordinates
        var xPoint = snakeArray[0].x;
        var yPoint = snakeArray[0].y;

        // snake direction
        if (direction === "left") xPoint--;
        else if (direction === "up") yPoint--;
        else if (direction === "right") xPoint++;
        else if (direction === "down") yPoint++;

        crashWithBorder(xPoint, yPoint);
        crashWithBody(xPoint, yPoint);
        foodCollect(xPoint,yPoint);

        snakeArray.pop();
        // head object gives header position to snake
        var head = {};
        head.x = xPoint;
        head.y = yPoint;
        snakeArray.unshift(head);
        drawSnake();
    }

    document.addEventListener("keydown", function (e) {
        var keyStrokeCode = e.keyCode;
        if (keyStrokeCode === 37 && direction !== "right") direction = "left";
        else if (keyStrokeCode === 38 && direction !== "down") direction = "up";
        else if (keyStrokeCode === 39 && direction !== "left") direction = "right";
        else if (keyStrokeCode === 40 && direction !== "up") direction = "down";
    })

})();