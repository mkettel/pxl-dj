import React, { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const DiscoShaderMaterial = () => {
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms._time.value = clock.getElapsedTime();
      materialRef.current.uniforms._sinTime.value = new THREE.Vector4(
        Math.sin(clock.getElapsedTime() * 0.1),
        Math.sin(clock.getElapsedTime() * 0.2),
        Math.sin(clock.getElapsedTime() * 0.3),
        Math.sin(clock.getElapsedTime() * 0.4)
      );
    }
  });

  const vertexShader = `
    varying vec2 nodeVary0;

    void main() {
      nodeVary0 = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 nodeVary0;

    uniform float _time;
    uniform vec4 _sinTime;

    void main() {
      float nodeVar0 = (1.0 - nodeVary0.x);
      float nodeVar1 = min(nodeVar0, 1.0);
      float nodeVar2 = (0.26 * nodeVar1);
      float nodeVar3 = smoothstep(0.0, 0.25, nodeVary0.x);
      float nodeVar4 = (nodeVar2 * nodeVar3);
      float nodeVar5 = (nodeVary0.x * 8.0);
      float nodeVar6 = (_time * 1.0);
      float nodeVar7 = nodeVar6;
      float nodeVar8 = (0.10 * nodeVar7);
      float nodeVar9 = (nodeVar5 - nodeVar8);
      float nodeVar10 = sin(nodeVar9);
      float nodeVar11 = (nodeVar4 * nodeVar10);
      float nodeVar12 = (nodeVary0.y - 0.5);
      float nodeVar13 = (nodeVar11 + nodeVar12);
      float nodeVar14 = abs(nodeVar13);
      float nodeVar15 = (0.005 / nodeVar14);
      float nodeVar16 = pow(nodeVar15, 0.65);
      vec4 nodeVar17 = mix(
        vec4(0.36470588235294116, 0.39215686274509803, 0.7725490196078432, 1.0),
        vec4(0.803921568627451, 0.8196078431372549, 0.27058823529411763, 1.0),
        vec4(vec3(_sinTime.w), 1.0)
      );
      vec4 nodeVar18 = (vec4(vec3(nodeVar16), 1.0) * nodeVar17);
      float nodeVar19 = (1.0 - nodeVary0.x);
      float nodeVar20 = min(nodeVar19, 1.0);
      float nodeVar21 = (0.17 * nodeVar20);
      float nodeVar22 = smoothstep(0.0, 0.25, nodeVary0.x);
      float nodeVar23 = (nodeVar21 * nodeVar22);
      float nodeVar24 = (nodeVary0.x * 8.0);
      float nodeVar25 = (_time * 1.0);
      float nodeVar26 = nodeVar25;
      float nodeVar27 = (0.37 * nodeVar26);
      float nodeVar28 = (nodeVar27 + 0.93);
      float nodeVar29 = (nodeVar24 - nodeVar28);
      float nodeVar30 = sin(nodeVar29);
      float nodeVar31 = (nodeVar23 * nodeVar30);
      float nodeVar32 = (nodeVary0.y - 0.5);
      float nodeVar33 = (nodeVar31 + nodeVar32);
      float nodeVar34 = abs(nodeVar33);
      float nodeVar35 = (0.009 / nodeVar34);
      float nodeVar36 = pow(nodeVar35, 0.65);
      vec4 nodeVar37 = mix(
        vec4(0.36470588235294116, 0.39215686274509803, 0.7725490196078432, 1.0),
        vec4(0.803921568627451, 0.8196078431372549, 0.27058823529411763, 1.0),
        vec4(vec3(_sinTime.z), 1.0)
      );
      vec4 nodeVar38 = (vec4(vec3(nodeVar36), 1.0) * nodeVar37);
      vec4 nodeVar39 = (nodeVar18 + nodeVar38);
      vec3 nodeVar40 = (nodeVar39.xyz * vec3(1.0, 1.0, 1.0));

      gl_FragColor = vec4(nodeVar40, 1.0);
    }
  `;

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      side={THREE.DoubleSide}
      uniforms={{
        _time: { value: 0 },
        _sinTime: { value: new THREE.Vector4() },
      }}
    />
  );
};

export default DiscoShaderMaterial;