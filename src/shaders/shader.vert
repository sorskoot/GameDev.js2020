precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

attribute vec2 uv;
attribute vec3 position;

varying vec2 v_texcoord;

//varying float fogDepth;

//uniform vec2 repeat;

void main(){

    v_texcoord=uv;    
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
    
   // float fogDistance=length(gl_Position.xyz);
   // fogDepth=-(modelViewMatrix*vec4(position,1.)).z;
}