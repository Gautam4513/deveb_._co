varying float vNoise;
uniform float uColor;
void main() {
    // Output a solid color (you can change this to any color you want)
    vec4 c1 =vec4(1.00, 0.36, 0.97, 1.0);
    vec4 c2 =vec4(1.0);
    vec4 c3 =vec4(1.00, 0.36, 0.97, .6);
    vec4 c4 = mix(c1,c3,uColor);
    float value=smoothstep(0.1,0.9,vNoise);
    vec4 color=mix(c4,c2,value);
    gl_FragColor = color;
}
