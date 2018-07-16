/* eslint-disable class-methods-use-this */
import React from 'react';
import BABYLON from 'babylonjs';
import BabylonScene from './BablyonScene';

export default class BablyonBoard extends React.Component {
  constructor(props) {
    super(props);
    this.onSceneMount = this.onSceneMount.bind(this);
    this.hashLines = this.hashLines.bind(this);
  }

  onSceneMount(e) {
    const { canvas, scene, engine } = e;
    scene.clearColor = BABYLON.Color3.White();
    const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0, 0, -5));
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    this.hashLines(scene);

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  }

  hashLines(scene) {
    const colors = [
      new BABYLON.Color4(0, 0, 0, 1),
      new BABYLON.Color4(0, 0, 0, 1),
    ];
    const linePoints1 = [
      new BABYLON.Vector3(-0.75, -1.75, 0),
      new BABYLON.Vector3(-0.75, 1.75, 0),
    ];

    const linePoints2 = [
      new BABYLON.Vector3(0.75, -1.75, 0),
      new BABYLON.Vector3(0.75, 1.75, 0),
    ];

    const linePoints3 = [
      new BABYLON.Vector3(-1.75, 0.75, 0),
      new BABYLON.Vector3(1.75, 0.75, 0),
    ];

    const linePoints4 = [
      new BABYLON.Vector3(-1.75, -0.75, 0),
      new BABYLON.Vector3(1.75, -0.75, 0),
    ];

    BABYLON.MeshBuilder.CreateLines('line1', { points: linePoints1, colors }, scene);
    BABYLON.MeshBuilder.CreateLines('line2', { points: linePoints2, colors }, scene);
    BABYLON.MeshBuilder.CreateLines('line3', { points: linePoints3, colors }, scene);
    BABYLON.MeshBuilder.CreateLines('line4', { points: linePoints4, colors }, scene);
  }

  render() {
    return (
      <React.Fragment>
        <BabylonScene height={500} width={500} onSceneMount={this.onSceneMount} />
        <p>
          Please Note: The Bablyon.js Tic-Tac-Toe Board is a work in progress! Thank you!
        </p>
      </React.Fragment>
    );
  }
}
