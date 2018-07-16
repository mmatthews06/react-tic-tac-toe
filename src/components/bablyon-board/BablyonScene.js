/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import BABYLON from 'babylonjs';

console.log('EngineOptions', BABYLON.EngineOptions);

// export const SceneEventArgs = {
//   engine: BABYLON.Engine,
//   scene: BABYLON.Scene,
//   canvas: HTMLCanvasElement
// };

export default class BablyonScene extends React.Component {
  constructor(props) {
    super(props);
    this.onCanvasLoaded = this.onCanvasLoaded.bind(this);
    this.onResizeWindow = this.onResizeWindow.bind(this);

    this.engine = BABYLON.Engine;
    this.scene = BABYLON.Scene;
    // this.canvas = new HTMLCanvasElement();
  }

  componentDidMount() {
    const { adaptToDeviceRatio, engineOptions, onSceneMount } = this.props;
    this.engine = new BABYLON.Engine(
      this.canvas,
      true,
      engineOptions,
      adaptToDeviceRatio,
    );

    const scene = new BABYLON.Scene(this.engine);
    this.scene = scene;

    if (typeof onSceneMount === 'function') {
      onSceneMount({
        scene,
        engine: this.engine,
        canvas: this.canvas,
      });
    } else {
      console.error('onSceneMount function not available');
    }

    // Resize the babylon engine when the window is resized
    window.addEventListener('resize', this.onResizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow);
  }

  onResizeWindow() {
    if (this.engine) {
      this.engine.resize();
    }
  }

  onCanvasLoaded(c) {
    if (c !== null) {
      this.canvas = c;
    }
  }

  render() {
    // 'rest' can contain additional properties that you can flow through to canvas:
    // (id, className, etc.)
    const { width, height } = this.props;
    const opts = {};

    if (width !== undefined && height !== undefined) {
      opts.width = width;
      opts.height = height;
    }

    return (
      <canvas
        {...opts}
        ref={this.onCanvasLoaded}
      />
    );
  }
}

BablyonScene.propTypes = {
  engineOptions: BABYLON.EngineOptions,
  adaptToDeviceRatio: PropTypes.bool,
  onSceneMount: PropTypes.func,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

BablyonScene.defaultProps = {
  onSceneMount: () => {},
  adaptToDeviceRatio: false,
  engineOptions: () => {},
};
