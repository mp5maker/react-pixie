import * as React from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { useThree } from 'react-three-fiber';

export const Skills = ({ colors }: any) => {
  const loader = React.useRef(new SVGLoader()).current;
  const { scene } = useThree();

  const onSuccessLoad = ({ data, position, scale, rotation }: any) => {
    let group: any;
    let paths = data.paths;
    group = new THREE.Group();

    for (let i = 0; i < paths.length; i++) {
      let path = paths[i];
      let material = new THREE.MeshStandardMaterial({
        color: colors.secondaryColor,
        side: THREE.DoubleSide,
        depthWrite: false,
        metalness: 0,
        roughness: 0,
      });

      let shapes = path.toShapes(true);
      for (let j = 0; j < shapes.length; j++) {
        let shape = shapes[j];
        let geometry = new THREE.ShapeBufferGeometry(shape);
        let mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
      }
      group.scale.set(scale.x, scale.y, scale.z);
      group.rotation.set(rotation.x, rotation.y, rotation.z);
      group.position.set(position.x, position.y, position.z);
      scene.add(group);
    }

    return group;
  };

  React.useEffect(() => {
    let reactGroup: any;
    let slackGroup: any;
    let githubGroup: any;
    let webpackGroup: any;
    let npmGroup: any;
    let sassGroup: any;
    let angularGroup: any;
    let djangoGroup: any;
    let bootstrapGroup: any;
    let jqueryGroup: any;
    let pythonGroup: any;
    let phpGroup: any;

    loader.load(
      '/Skills/react.svg',
      data =>
        (reactGroup = onSuccessLoad({
          data,
          position: { x: -80, y: 100, z: -400 },
          scale: { x: 3, y: 3, z: 3 },
          rotation: { x: 0, y: 0, z: 0 },
        })),
    );

    loader.load(
      '/Skills/slack.svg',
      data =>
        (slackGroup = onSuccessLoad({
          data,
          position: { x: 200, y: 50, z: -200 },
          scale: { x: 1, y: 1, z: 1 },
          rotation: { x: 0, y: 0, z: 0 },
        })),
    );

    loader.load(
      '/Skills/github.svg',
      data =>
        (githubGroup = onSuccessLoad({
          data,
          position: { x: 0, y: -50, z: -150 },
          scale: { x: 0.5, y: 0.5, z: 0.5 },
          rotation: { x: 0, y: 0, z: -Math.PI },
        })),
    );

    loader.load(
      '/Skills/webpack.svg',
      data =>
        (webpackGroup = onSuccessLoad({
          data,
          position: { x: -200, y: -50, z: -175 },
          scale: { x: 0.5, y: 0.5, z: 0.5 },
          rotation: { x: 0, y: 0, z: 0 },
        })),
    );

    loader.load(
      '/Skills/npm.svg',
      data =>
        (npmGroup = onSuccessLoad({
          data,
          position: { x: -150, y: -50, z: -175 },
          scale: { x: 0.5, y: 0.5, z: 0.5 },
          rotation: { x: 0, y: -Math.PI, z: -Math.PI },
        })),
    );

    loader.load(
      '/Skills/sass.svg',
      data =>
        (sassGroup = onSuccessLoad({
          data,
          position: { x: -125, y: 100, z: -225 },
          scale: { x: 1.5, y: 1.5, z: 1.5 },
          rotation: { x: 0, y: -Math.PI, z: -Math.PI },
        })),
    );

    loader.load(
      '/Skills/angular.svg',
      data =>
        (angularGroup = onSuccessLoad({
          data,
          position: { x: 125, y: 100, z: -250 },
          scale: { x: 1, y: 1, z: 1 },
          rotation: { x: -Math.PI, y: 0, z: 0 },
        })),
    );

    loader.load(
      '/Skills/trello.svg',
      data =>
        (angularGroup = onSuccessLoad({
          data,
          position: { x: 200, y: 0, z: -300 },
          scale: { x: 1, y: 1, z: 1 },
          rotation: { x: 0, y: 0, z: 0 },
        })),
    );

    loader.load(
      '/Skills/django.svg',
      data =>
        (djangoGroup = onSuccessLoad({
          data,
          position: { x: 200, y: -100, z: -400 },
          scale: { x: 1, y: 1, z: 1 },
          rotation: { x: -Math.PI, y: 0, z: 0 },
        })),
    );

    loader.load(
      '/Skills/bootstrap.svg',
      data =>
        (bootstrapGroup = onSuccessLoad({
          data,
          position: { x: 400, y: -100, z: -400 },
          scale: { x: 3, y: 3, z: 3 },
          rotation: { x: 0, y: 0, z: 0 },
        })),
    );

    loader.load(
      '/Skills/jquery.svg',
      data =>
        (jqueryGroup = onSuccessLoad({
          data,
          position: { x: -400, y: 75, z: -350 },
          scale: { x: 1, y: 1, z: 1 },
          rotation: { x: 0, y: 0, z: 0 },
        })),
    );

    loader.load(
      '/Skills/python.svg',
      data =>
        (pythonGroup = onSuccessLoad({
          data,
          position: { x: -150, y: -20, z: -300 },
          scale: { x: 0.5, y: 0.5, z: 0.5 },
          rotation: { x: 0, y: 0, z: 0 },
        })),
    );

    loader.load(
      '/Skills/php.svg',
      data =>
        (phpGroup = onSuccessLoad({
          data,
          position: { x: 150, y: -20, z: -300 },
          scale: { x: 0.5, y: 0.5, z: 0.5 },
          rotation: { x: -Math.PI, y: 0, z: 0 },
        })),
    );

    return () => {
      reactGroup && scene.remove(reactGroup);
      slackGroup && scene.remove(slackGroup);
      githubGroup && scene.remove(githubGroup);
      webpackGroup && scene.remove(webpackGroup);
      npmGroup && scene.remove(npmGroup);
      sassGroup && scene.remove(sassGroup);
      angularGroup && scene.remove(angularGroup);
      djangoGroup && scene.remove(djangoGroup);
      bootstrapGroup && scene.remove(bootstrapGroup);
      jqueryGroup && scene.remove(jqueryGroup);
      pythonGroup && scene.remove(pythonGroup);
      phpGroup && scene.remove(phpGroup);
    };
  }, []);

  return <></>;
};
