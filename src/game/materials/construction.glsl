#version 300 es
precision mediump float;

uniform float u_time_ms;
uniform sampler2D u_graphic;
uniform sampler2D u_noise;
uniform vec2 u_size;

in vec2 v_uv;
in vec2 v_screenuv;
out vec4 fragColor;

void main() {
    vec4 noise = texture(u_noise, v_screenuv);

    //    fragColor = texture(u_graphic, v_uv) * noise.r;
    fragColor = texture(u_graphic, v_uv);
}
