#version 300 es
precision mediump float;

uniform float hitAmount;
uniform float u_time_ms;
uniform sampler2D u_graphic;

in vec2 v_uv;
in vec2 v_screenuv;
out vec4 fragColor;

void main() {
    vec3 color = vec3(1.);
    vec4 col = texture(u_graphic, v_uv);

    //    fragColor.rgb = col.rgb * col.a;
    fragColor.rgb = mix(col.rgb, color.rgb, hitAmount) * col.a;
    fragColor.a = col.a;

}
