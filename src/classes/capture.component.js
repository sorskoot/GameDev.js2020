const STATES = {
    RECORDING: 'recording',
    REPLAYING: 'replaying',
    WAITING: 'waiting',
    IDLE: 'idle'
};

export default AFRAME.registerComponent('capture', {
    schema: {
        state: { default: STATES.IDLE }
    },
    init: function () {
        this.timer = 0;
        this.target = document.getElementById('replay');
        this.targethead = document.getElementById('replay-head');
        this.targetlh = document.getElementById('replay-lh');
        this.targetrh = document.getElementById('replay-rh');
        this.lh = document.getElementById('leftHand');
        this.rh = document.getElementById('rightHand');
        this.head = document.getElementById('head');
        this.cameraData = [];
        this.target.setAttribute('visible', false);

    },
    update: function (oldData) { 

    },

    tick: function (time, timeDelta) {
        this.timer += timeDelta;
        switch (this.data.state) {
            case STATES.RECORDING:
                let newPoint = {
                    position: AFRAME.utils.clone(this.el.getAttribute('position')),
                    leftHand: {
                        position: AFRAME.utils.clone(this.lh.getAttribute('position')),
                        rotation: AFRAME.utils.clone(this.lh.getAttribute('rotation')),
                    },
                    rightHand: {
                        position: AFRAME.utils.clone(this.rh.getAttribute('position')),
                        rotation: AFRAME.utils.clone(this.lh.getAttribute('rotation')),
                    },
                    head: {
                        position: AFRAME.utils.clone(this.head.getAttribute('position')),
                        rotation: AFRAME.utils.clone(this.head.getAttribute('rotation')),
                    },
                    timestamp: this.timer
                };
                this.cameraData.push(newPoint);
                if (this.timer >= 15000) {
                    this.data.state = STATES.WAITING;
                    this.timer = 0;
                    console.log('going to waiting');
                    this.currentReplayTime = 0;
                    this.currentReplayIndex = 0;
                    this.el.getAttribute('position',this.cameraData[0].position);
                }

                break;
            case STATES.REPLAYING:
                // this.currentReplayTime += timeDelta;
                let replayPoint = this.cameraData[this.currentReplayIndex];

                while (replayPoint && replayPoint.timestamp <= this.timer) {
                    this.currentReplayIndex++;
                    replayPoint = this.cameraData[this.currentReplayIndex];
                }
                if (replayPoint) {
                    this.target.setAttribute('position', replayPoint.position);
                    this.targetlh.setAttribute('position', replayPoint.leftHand.position);
                    this.targetlh.setAttribute('rotation', replayPoint.leftHand.rotation);
                    this.targetrh.setAttribute('position', replayPoint.rightHand.position);
                    this.targetrh.setAttribute('rotation', replayPoint.rightHand.rotation);
                    this.targethead.setAttribute('position', replayPoint.head.position);
                    this.targethead.setAttribute('rotation', replayPoint.head.rotation);
                }

                if (this.timer >= 15000) {
                    this.target.setAttribute('visible', false);
                    this.data.state = STATES.IDLE;
                    this.timer = 0;
                    console.log('going to idle');
                    this.cameraData.length = 0;
                }
                break;
            case STATES.WAITING:
                if (this.timer >= 15000) {
                    this.target.setAttribute('visible', true);
                    this.data.state = STATES.REPLAYING;
                    this.timer = 0;
                    console.log('going to replay');
                    this.currentReplayTime = 0;
                    this.currentReplayIndex = 0;
                }
                break;
            case STATES.IDLE:

                break;
        }
    },
    startRecording:function(){
        if(this.data.state === STATES.IDLE){
            this.timer = 0;
            this.cameraData.length = 0;
            this.data.state = STATES.RECORDING;
        }
    }


});