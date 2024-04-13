#version 300 es
precision mediump float;

uniform float u_time_ms;
uniform sampler2D u_graphic;
uniform sampler2D u_noise;
uniform float scale;

in vec2 v_uv;
in vec2 v_screenuv;
out vec4 fragColor;

void main() {
    vec4 noise = texture(u_noise, v_uv);

    fragColor = texture(u_graphic, v_uv) * noise.r;
}
