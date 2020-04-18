import vertShader from '../shaders/shader.vert';
import fragShader from '../shaders/shader.frag';

/* global THREE, AFRAME */
export default AFRAME.registerComponent('pixel-shader', {
    schema: {
        color:
        {
            type: 'color'
        },
        diffuseTexture: {
            type: 'map'
        },
        index: { type: 'vec2' },
        dimension: { type: 'vec2' }
    },

    init: function () {

        const texture = new THREE.ImageUtils.loadTexture('./maps/textures.png');
        texture.minFilter = texture.magFilter = THREE.NearestFilter;
        const data = this.data;
        // default attributes/uniforms => https://threejs.org/docs/index.html#api/en/renderers/webgl/WebGLProgram
         this.material = new THREE.RawShaderMaterial({
            name: "PixelShader",
            uniforms: {
                texture0: { value: texture },
                spriteDimensions: { value: this.data.dimension },
                index: { value: this.data.index }
            },
            vertexShader: vertShader,
            fragmentShader: fragShader,
            flatShading:true
        });
        // this.applyToMesh();
        // this.el.addEventListener('model-loaded', () => this.applyToMesh());
        this.material.needsUpdate = true;
        this.el.getObject3D('mesh').material = this.material;
    },

    //   update: function () {
    //     this.material.uniforms.index.value = this.data.index;
    //    // this.material.uniforms.lookupIndex.value = this.data.lookup;
    //   },

    //   applyToMesh: function () {
    //     const mesh = this.el.getObject3D('mesh');
    //     if (mesh) {
    //       this.material.uniforms.repeat.value.x = +this.el.getAttribute("width") || 1;
    //       this.material.uniforms.repeat.value.y = +this.el.getAttribute("height") || 1;
    //       mesh.material = this.material;
    //     }
    //   }
})