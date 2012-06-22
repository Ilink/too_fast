$(document).ready(function(){
    var mouse = new Mouse();
    mouse.start_measuring();

    $("#button").hover(function(){
        if(mouse.get_velocity()[1] < 0.05){
            console.log('fired');
        }
    }, function(){

    })
});