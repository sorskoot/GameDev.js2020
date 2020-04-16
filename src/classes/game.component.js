export default AFRAME.registerComponent('game', {
    schema: {},
    init: function () { 
        this.el.sceneEl.addEventListener('collision', this.collision)
        this.el.sceneEl.addEventListener('uncollision', this.uncollision)
    },
    update: function (oldData) { },
    tick: function (time, timeDelta) { },
    tock: function (time, timeDelta, camera){ },
    remove: function () { },
    pause: function () { },
    play: function () { },
    updateSchema: function(data) { },
    collision:function(e){
        e.detail.object.material.color = new THREE.Color(0,255,0);
    },
    uncollision:function(e){
        e.detail.object.material.color = new THREE.Color(255,0,0);
    }
});