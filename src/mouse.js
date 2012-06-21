/*
I might just look for someone else's library to handle this stuff

    - mouse velocity
    - position

And then I need to figure out how to integrate it with the timeline
 */
var Mouse = function(options){
    var self = this;

    var old_x, x, old_y, y, selector, replace_old_positions;
    replace_old_positions = true;

    selector = $(options.selector);

    var measure_velocity = function(dt){
        replace_old_positions = true;
        var velocity_x = Math.abs(old_x - x) / dt;
        var velocity_y = Math.abs(old_y - y) / dt;
//        console.log([velocity_x, velocity_y]);
        $('#vel').empty().append(velocity_x + ", " + velocity_y);
        $('#pos_old').empty().append(old_x + ", " + old_y);
        $('#pos').empty().append(x + ", " + y);
        return [velocity_x, velocity_y];
    }

    $("#display_canvas").mousemove(function(e){
        if(replace_old_positions){
            x = e.offsetX;
            y = e.offsetY;
            old_x = x;
            old_y = y;
            replace_old_positions = false;
        } else {
            x = e.offsetX;
            y = e.offsetY;
        }

    });

    var timeline = new Timeline({
        tickrate: 100,
        callback: function(dt){ // render loop goes here
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