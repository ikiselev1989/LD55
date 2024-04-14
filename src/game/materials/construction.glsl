#version 300 es
precision mediump float;

uniform float u_time_ms;
uniform float scale;
uniform sampler2D u_graphic;
uniform sampler2D u_noise;
uniform vec2 u_size;

in vec2 v_uv;
in vec2 v_screenuv;
out vec4 fragColor;

void main() {
    const float TAU = 6.28318530;
    const float steps = 128.0;
    float radius = 10.0;
    vec2 aspect = 1.0 / vec2(textureSize(u_graphic, 0));

    fragColor = texture(u_graphic, v_uv);

    for (float i = 0.0; i < TAU; i += TAU / steps) {
        vec2 offset = vec2(sin(i), cos(i)) * aspect * (radius / scale);
        vec2 offsetUv = v_uv + offset;
        vec4 col = texture(u_graphic, offsetUv);

        if (step(0.5, col.a) < 1. || offsetUv.x < 0. || offsetUv.x > 1. || offsetUv.y < 0. || offsetUv.y > 1.) {
            fragColor.rgb = vec3(146. / 255., 151. / 255., 143. / 255.) * fragColor.a;
        }
    }

    if (fragColor.r == 1.0) {
        fragColor.rgb *= 0.;
        fragColor.a = 0.;
    }
}
