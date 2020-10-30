export default class Workout {
    constructor(name) {
        this.exercises = [];
        this.name = name;
        this.id = Date.now();
        this.totalDuration;
        this.totalDurationMins;
              
    };

    addExercise(name, duration) {
        const exercise = {
            name,
            duration,
            idEx: Date.now() + 100
        }
        this.exercises.push(exercise);
        return exercise;
    };

    calcDuration(){
        let duration = 0;
        let i = 0;
        for (i=0; i <= this.exercises.length - 1; i++) {
            duration += this.exercises[i].duration;
        };

        //Transform into minutes
        function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s};
        const formatDuration = fmtMSS(duration);

        // Final results
        this.totalDuration = duration; //seconds
        this.totalDurationMins = formatDuration; // minutes and seconds
    };
};


