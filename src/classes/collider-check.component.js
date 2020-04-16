AFRAME.registerComponent('collider-check', {
    schema: {
        target: { default: '' },
        objects: { default: '.collidable' }
    },
    init: function () {
        //   this.el.addEventListener('raycaster-intersection', function () {
        //     console.log('Player hit something!');
        //   });    
        this.raycaster = new THREE.Raycaster();
        this.raycaster.near = 0;
        this.raycaster.far = 3;
        this.update();
    },
    update: function () {
        if (!!this.data.target) {
            this.target = document.querySelector(this.data.target);
        }
        if (!!this.data.objects) {
            const els = this.el.sceneEl.querySelectorAll(this.data.objects);
            this.objects = this.flattenObject3DMaps(els);
        }
    },
    tick: function () {
        // UPDATE RAY to position on whatevery it is on
        // CAST A DOWN Without rotation of object
        // If it hits something fire event or something
        // look at code of A-Frame RayCaster https://github.com/aframevr/aframe/blob/ce8dc07b2547c5fe0f8b90a65540bdfcabf3b7c0/src/components/raycaster.js#L320
        const origin = new THREE.Vector3();
        origin.setFromMatrixPosition(this.target.object3D.matrixWorld);
        const direction = new THREE.Vector3(0, -1, 0);
        this.raycaster.set(origin, direction);
        let intersections = this.raycaster.intersectObjects(this.objects, true);

        if (intersections.length > 0) {
            if (!this.lastIntersection ||
                intersections[0].object.uuid !== this.lastIntersection.object.uuid) {
                
                this.lastIntersection = intersections[0];
                this.el.sceneEl.emit('collision', intersections[0])
            }
        } else {
            if (!!this.lastIntersection) {
                this.el.sceneEl.emit('uncollision', this.lastIntersection)
                this.lastIntersection = null;
            }
        }
    // this.drawLine(origin, direction);
    },

    flattenObject3DMaps: function (els) {
        const objects = [];
        for (let i = 0; i < els.length; i++) {
            if (els[i].isEntity && els[i].object3D) {
                objects.push(els[i].object3D);
            }
        }
        return objects;
    },
    drawLine: function (origin, direction) {
        // Update the length of the line if given. `unitLineEndVec3` is the direction
        // given by data.direction, then we apply a scalar to give it a length.
        let line = {
            start: origin,
            end: (new THREE.Vector3()).copy(origin).add(direction)
        }
        this.el.setAttribute('line', line);
        this.dirty = true;
    },
});