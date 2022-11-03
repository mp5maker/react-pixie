import * as React from 'react';
import { extend, Canvas, useFrame, useThree } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';

extend({ EffectComposer, RenderPass, GlitchPass });

export const Glitch = React.memo(({ factor }: any) => {
  const { gl, scene, camera, size } = useThree();
  const composer: any = React.useRef();

  React.useEffect(() => {
    composer.current.setSize(size.width, size.height);
  }, [size]);

  useFrame(() => {
    composer.current.render();
  }, 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      <glitchPass attachArray="passes" factor={factor} renderToScreeen />
    </effectComposer>
  );
});
