import * as React from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, useFrame, useThree } from 'react-three-fiber';

extend({ OrbitControls });

export const OrbitControl = ({
  minDistance = 0,
  maxDistance = 200,
  enableRotate = true,
}: any) => {
  const { camera, gl } = useThree();
  const controls: any = React.useRef();

  useFrame(state => {
    controls.current.update();
  });

  React.useEffect(() => {
    controls.current.minDistance = minDistance;
    controls.current.maxDistance = maxDistance;
    controls.current.enableRotate = enableRotate;
  }, [minDistance, maxDistance, enableRotate]);

  return <orbitControls ref={controls} args={[camera, gl.domElement]} />;
};
