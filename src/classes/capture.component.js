

export default AFRAME.registerComponent('capture', {
    schema: {},
    init: function () {
        this.state = "recording";
        this.timer = 0;
        this.target = document.getElementById('replay');
        this.targethead = document.getElementById('replay-head');
        this.targetlh = document.getElementById('replay-lh');
        this.targetrh = document.getElementById('replay-rh');
        this.lh = document.getElementById('leftHand');
        this.rh = document.getElementById('rightHand');
        this.head = document.getElementById('head');
        this.cameraData = [];

    },
    update: function (oldData) { },

    tick: function (time, timeDelta) {
        this.timer += timeDelta;

        if (this.state == "recording") {
            let newPoint = {
                position: AFRAME.utils.clone(this.el.getAttribute('position')),                
                leftHand:{
                    position: AFRAME.utils.clone(this.lh.getAttribute('position')),
                    rotation: AFRAME.utils.clone(this.lh.getAttribute('rotation')),
                },
                rightHand:{
                    position: AFRAME.utils.clone(this.rh.getAttribute('position')),
                    rotation: AFRAME.utils.clone(this.lh.getAttribute('rotation')),
                },
                head:{
                    position: AFRAME.utils.clone(this.head.getAttribute('position')),
                    rotation: AFRAME.utils.clone(this.head.getAttribute('rotation')),
                },
                timestamp: this.timer
            };
            this.cameraData.push(newPoint);
            if (this.timer >= 15000) {
                this.state = "replay";
                this.timer = 0;
                console.log('going to replay');
                this.currentReplayTime = 0;
                this.currentReplayIndex = 0;
            }
        } else {
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
                this.state = "recording";
                this.timer = 0;
                console.log('going to record');
                this.cameraData.length = 0;
            }
        }
    },


});