import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const DiscoShaderMaterial = () => {
  const shader = useRef();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2() },
    }),
    []
  );

  const { size } = useThree();

  useFrame(({ clock }) => {
    shader.current.uniforms.u_time.value = clock.getElapsedTime();
    shader.current.uniforms.u_resolution.value.set(size.width, size.height);
  });

  return (
    <shaderMaterial
      ref={shader}
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      side={THREE.DoubleSide}
    />
  );
};

const vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.4;
    float frequency = 0.0;
    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.4;
    }
    return value;
  }

  float shape(vec2 st, float radius, float edgeSmooth) {
    float d = length(st);
    return smoothstep(radius, radius + edgeSmooth, d);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv = uv * 2.0 - 1.7;

    float grain = fbm(uv * 10.0 + u_time * 0.3);
    grain = smoothstep(0.4, 0.6, grain);

    vec2 center = vec2(0.0);
    float radius = 0.3 + sin(u_time * 0.5) * 0.1;
    float edgeSmooth = 0.1;
    float shapeAlpha = shape(uv - center, radius, edgeSmooth);

    vec3 bgColor = vec3(0.9, 1.1, 1.1);
    vec3 shapeColor = vec3(1.5, 0.6, 1.2);

    vec3 color = mix(bgColor, shapeColor, shapeAlpha);
    color *= grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default DiscoShaderMaterial;