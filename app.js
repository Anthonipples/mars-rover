/*
Author: Anthony Lombard
Date: 5/8/2012
Description: Basic Rover controller for predefind movement instructions.
Technology: JQUERY and Vanilla JS (Simple enough to not require any kind of framework)

Refactored twice to convert as much conditional logic to polymorphism as possible. Still room for improvement.

Assuming Cartesian co-ordinate system where y is vertical and x is horizontal

Split the commands of both rovers into an array, ready to loop over, To add a form field with its own set of 
instructions could easily be adapted into at .val() call
*/

var commandsR1 = "LMLMLMLMM".split('');
var commandsR2 = "MMRMMRMRRM".split('');

//Init, empty rover variable to be filled depending on the rover chosen
var rover ={};

//Add click event listener to Rover one's button
document.getElementById("roverOneButton").addEventListener("click", function(){
    //Fill up the rover object with test data starting co-ords
    var rover = {
        x:1,
        y:2,
        d:"N"
    }
    //Init the output container variable
    var opOne = document.getElementById('output1');
    $(opOne).append('Initializing...</br>');

    //Loop over our split array of commands giving the moveRover function our current command,direction and rover object 
    for(i = 0; i < commandsR1.length; i++){
        moveRover(commandsR1[i],rover.d,opOne,rover);
        }
    //Once done go ahead and output the rovers final position so people dont shout about using the console. 
        $(opOne).append('Final position:</br>');
        $(opOne).append('X = ' + rover.x + '</br>');
        $(opOne).append('Y = ' + rover.y + '</br>');
        $(opOne).append('D = ' + rover.d);
    
});

//Same as above just using differnet starting data for the second rover inside the rover object (And the second array of commands)
document.getElementById("roverTwoButton").addEventListener("click", function(){
    var rover = {
        x:3,
        y:3,
        d:"E"
    }
    var opTwo = document.getElementById('output2');
    $(opTwo).append('Initializing...</br>');

    for(i = 0; i < commandsR2.length; i++){
        moveRover(commandsR2[i],rover.d,opTwo,rover);
        }
        $(opTwo).append('Final position:</br>');
        $(opTwo).append('X = ' + rover.x + '</br>');
        $(opTwo).append('Y = ' + rover.y + '</br>');
        $(opTwo).append('D = ' + rover.d);
    
});

    //Master Rover controller, Used switch here but could certainly be done polymorphic. It eluded me at the time. 
    function moveRover(command,direction,output,curRover){
        switch (command) {
            case "L":
            turnLeft(direction,curRover);
            $(output).append('Turning left</br>');
                break;
            case "R":
            turnRight(direction,curRover);
            $(output).append('Turning Right</br>');
                break;
            case "M":
            turnMove(direction,curRover);
            $(output).append('Moving ' + direction + '</br>');
                break;
            default:
                break;
        }
    }

    /*
    Assign new direction based on our current facing direction, 
    I was going to do this using degrees but that hurt my head and led to more conditional logic I didnt like.
    */

    function turnLeft(CurrentDir,curRover){
        
        var directions = {
            "N":"W",
            "E":"N",
            "S":"E",
            "W":"S"   
        }
        curRover.d = directions[CurrentDir];
        console.log("Turn Left");
    }

    function turnRight(CurrentDir,curRover){
        
        var directions = {
            "N":"E",
            "E":"S",
            "S":"W",
            "W":"N"   
        }
        curRover.d = directions[CurrentDir];
        console.log("Turn right");
    }


        /*
        Edit x,y co-ords based on direction of movement, 
        I feel the last condition is messy and would appreciate input on how to improve it.
        */
        function turnMove(CurrentDir,curRover){
            x = curRover.x;
            y = curRover.y;
            var movements = {
                "N":y + 1,
                "E":x + 1,
                "S":y - 1,
                "W":x - 1   
            }
            if(CurrentDir == "N" || CurrentDir == "S" ){
                curRover.y = movements[CurrentDir];
            }else{
                curRover.x = movements[CurrentDir];
            }
        }