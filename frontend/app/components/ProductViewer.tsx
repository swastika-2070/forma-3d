'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Center,
  Environment,
  Html,
  OrbitControls,
  Stage,
  useGLTF,
} from '@react-three/drei';

function Loader() {
  return (
    <Html center>
      <div className="rounded-lg bg-white px-4 py-2 text-sm shadow">
        Loading 3D model...
      </div>
    </Html>
  );
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  return (
    <Center>
      <primitive object={scene} scale={2} />
    </Center>
  );
}

export default function ProductViewer({
  modelUrl,
}: {
  modelUrl: string;
}) {
  return (
    <div className="h-[500px] w-full overflow-hidden rounded-2xl bg-neutral-100">
      <Canvas
        camera={{
          position: [4, 3, 6],
          fov: 45,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<Loader />}>
          <Stage
            environment="city"
            intensity={0.7}
            adjustCamera
          >
            <Model url={modelUrl} />
          </Stage>

          <Environment preset="city" />

          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            enableDamping
          />
        </Suspense>
      </Canvas>
    </div>
  );
}