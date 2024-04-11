/*// File path: /src/components/ARDisplay.js
import React, { Suspense, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from '@react-three/drei';
import './ARDisplay.css'; // Assuming you have a corresponding CSS file for styles

function Model({ file, scale }) {
  const obj = useLoader(OBJLoader, file);
  return <primitive object={obj} scale={scale} />;
}

const ARDisplay = ({ objFile }) => {
  const [scale, setScale] = useState(1);

  const handleScaleChange = (event) => {
    setScale(parseFloat(event.target.value));
  };

  return (
    <div className="ar-display-container">
      <Canvas className="canvas-fullscreen">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<div>Loading model...</div>}>
          <Model file={objFile} scale={[scale, scale, scale]} />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <div className="scale-control">
        <label htmlFor="scale-range">Scale:</label>
        <input
          id="scale-range"
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={scale}
          onChange={handleScaleChange}
        />
      </div>
    </div>
  );
};

export default ARDisplay;
*/

import React from 'react';
import 'aframe';
import { Entity, Scene } from 'aframe-react';

const ARDisplay = () => {
  return (
    <Scene>
      <Entity primitive="a-assets">
        <Entity primitive="a-asset-item" id="myModel" src="/MesaDeTrabajo2.obj" />
      </Entity>
      <Entity primitive="a-entity" obj-model="obj: #myModel" />
    </Scene>
  );
};

export default ARDisplay;
