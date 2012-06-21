var Timeline = function(args){
    var dt, dt_floor, dt_ceil, time_start, time_end, interval, tickrate, paused,
        running, accumulator, frametime, dt_target, fastest, controlled, custom_callbacks;
    // all time delta values are in mS
    // javascript does not seem to get more granular than mS
    dt_ceil = args.dt_ceil || 40; // this is the ceiling on dt. Not used yet, since there is no proper pausing functionality
    dt_target = args.dt_target || 30;
    tickrate = args.tickrate; // how often the loop should run

    fastest = args.fastest; // this loop runs as fast as possible
    controlled = args.controlled; // this loop runs in fixed dt increments. Can sometimes fire more than once per loop.
    custom_callbacks = [];

    var loop = function(dt){
        time_start = new Date();
        accumulator = 0;
        var frames = 0;
        var _loop = function(dt){
            interval = setTimeout(function(){
                frames++;
                time_end = new Date();
                frametime = time_end - time_start;
                time_start = time_end;

                accumulator += frametime;

                fastest(frametime, frames);

                while (accumulator >= dt_target) {
                    accumulator -= dt_target;
                    controlled(dt_target, frames);
                }

                _loop(dt);
            }, tickrate);
        }
        _loop(dt);
    }

    // todo implement adding a custom callback with a target DT; would have to work like the accumulator
    this.add_callback = function(callback, target_dt){
        return false;
        custom_callbacks.push({
            "callback": callback,
            "target_dt": target_dt
        });
    }

    this.start = function(){
        if(!running){
            running = true;
            paused = false;
            if(typeof dt === 'undefined') dt = dt_floor;

            loop(dt);
        }
    }

    this.stop = function(){
        running = false;
        paused = true;
        if (interval !== null) {
            clearInterval(interval);
            interval = null;
        }
    }
}