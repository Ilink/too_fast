/*
Mouse.js
Measures velocity, acceleration.
 */
var Mouse = function(options){
    var self = this;
    var old_x, x, old_y, y, $selector, replace_old_positions, velocity_y, velocity_x, acc_x, acc_y, old_velocity_y, old_velocity_x,
        fastest_acc_x, fastest_acc_y, fastest_x, fastest_y, intervals, avg_velocity_x, avg_velocity_y;

    fastest_x = 0, fastest_y = 0, fastest_acc_x = 0, fastest_acc_y = 0, avg_velocity_x = 0, avg_velocity_y = 0;
    replace_old_positions = true;

//    $selector = $(options.selector);

    // todo break this into the only thing - it shouldnt be printing data from here!
    var measure_velocity = function(dt){
        replace_old_positions = true;

        old_velocity_x = velocity_x;
        old_velocity_y = velocity_y;

        velocity_x = Math.abs(old_x - x) / dt;
        velocity_y = Math.abs(old_y - y) / dt;

        if(velocity_x > fastest_x){
            fastest_x = velocity_x;
        }
        if(velocity_y > fastest_y){
            fastest_y = velocity_y;
        }

        avg_velocity_x = avg(intervals, avg_velocity_x, )

        $('#vel').empty().append(velocity_x + ", " + velocity_y);
        $("#fastest_vel").empty().append(fastest_x + ", " + fastest_y);
        $('#pos').empty().append(x + ", " + y);
        return [velocity_x, velocity_y];
    }

    var measure_acceleration = function(){
        acc_y = old_velocity_y - velocity_y;
        acc_x = old_velocity_x - velocity_x;

        if(fastest_acc_x < acc_x){
            fastest_acc_x = acc_x;
        }

        if(fastest_acc_y < acc_y){
            fastest_acc_y = acc_y;
        }

        $('#acc').empty().append(acc_x + ", " + acc_y);
        $('#fastest_acc').empty().append(fastest_acc_x + ", " + fastest_acc_y);
        return [acc_x, acc_y];
    }

    $(window).mousemove(function(e){
        old_x = x;
        old_y = y;
        x = e.offsetX;
        y = e.offsetY;
    });

    // uses the previous average to calculate a new one
    function avg(n, prev, val){
        return (((n-1) * prev) + val) / n;
    }

    var timeline = new Timeline({
        tickrate: 100,
        fastest: function(dt){ // render loop goes here
            measure_velocity(dt);
            measure_acceleration();
            replace_old_positions = true;
            intervals++;
            // time += dt;
        }
    });

    // Public

    this.velocity = 0;

    this.start_measuring = function(){
        timeline.start();
    }

    this.end_measuring = function(){
        timeline.stop();
    }

    this.get_velocity = function(){
        return [velocity_x, velocity_y];
    }


}