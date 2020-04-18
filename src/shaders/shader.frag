precision highp float;
precision highp int;

varying vec2 v_texcoord;

uniform sampler2D texture0;
uniform vec2 spriteDimensions;
uniform vec2 index;
        
void main(void)
{   
    highp vec4 tmpvar_1;
    tmpvar_1=texture2D(texture0,((v_texcoord/spriteDimensions)+
        ((1./(spriteDimensions))*index)));
    gl_FragColor=tmpvar_1;
}