/*
I might just look for someone else's library to handle this stuff

    - mouse velocity
    - position

And then I need to figure out how to integrate it with the timeline
 */
var Mouse = function(options){
    var self = this;

    var old_x, x, old_y, y, $selector, replace_old_positions;


    var fastest_x = 0;
    var fastest_y = 0;
    replace_old_positions = true;

//    $selector = $(options.selector);

    var measure_velocity = function(dt){
        replace_old_positions = true;
        var velocity_x = Math.abs(old_x - x) / dt;
        var velocity_y = Math.abs(old_y - y) / dt;
        if(velocity_x > fastest_x){
            fastest_x = velocity_x;
        }
        if(velocity_y > fastest_y){
            fastest_y = velocity_y;
        }


        $('#vel').empty().append(velocity_x + ", " + velocity_y);
        $("#fastest_vel").empty().append(fastest_x + ", " + fastest_y);
        $('#pos').empty().append(x + ", " + y);
        return [velocity_x, velocity_y];
    }

    var measure_acceleration = function(){

    }

    $("#display_canvas").mousemove(function(e){
        old_x = x;
        old_y = y;
        x = e.offsetX;
        y = e.offsetY;

//        if(replace_old_positions){
////            x = e.offsetX;
////            y = e.offsetY;
//            old_x = x;
//            old_y = y;
//            replace_old_positions = false;
//        } else {
//            x = e.offsetX;
//            y = e.offsetY;
//        }

    });

    var timeline = new Timeline({
        tickrate: 100,
        fastest: function(dt){ // render loop goes here
            measure_velocity(dt);
            replace_old_positions = true;
        }
    });

    this.velocity = 0;

    this.start_measuring = function(){
        // start timeline
        timeline.start();
    }

    this.end_measuring = function(){
        // stop timeline
        timeline.stop();
    }

    this.get_velocity = function(){

    }


}