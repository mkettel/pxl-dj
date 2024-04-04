import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const GlowingShapesShaderMaterial = () => {
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
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle(vec2 pos, float radius) {
    return length(pos) - radius;
}

float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    
    vec3 color = vec3(0.0);
    
    float t = u_time * 0.5;
    
    vec2 pos1 = vec2(sin(t * 0.8), cos(t * 0.6)) * 0.4;
    vec2 pos2 = vec2(sin(t * 0.7), cos(t * 0.9)) * 0.3;
    vec2 pos3 = vec2(sin(t * 0.6), cos(t * 0.8)) * 0.35;
    
    float shape1 = circle(uv - pos1, 0.2);
    float shape2 = circle(uv - pos2, 0.25);
    float shape3 = circle(uv - pos3, 0.15);
    
    float combined = smin(shape1, smin(shape2, shape3, 0.1), 0.1);
    
    vec3 blueGlow = vec3(0.1, 0.3, 0.8);
    
    color += blueGlow * smoothstep(0.02, 0.0, combined);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

export default GlowingShapesShaderMaterial;