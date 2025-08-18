import {
  Renderer,
  Triangle,
  Program,
  Mesh,
  Camera,
  Box,
  Transform,
} from 'ogl';

class TriangleShader extends Mesh {
  constructor(args: any) {
    super(args);
    this.geometry = new Triangle(args.gl);
    this.program = new Program(args.gl, {
      vertex: `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0, 1);
        }
      `,
      fragment: `
        precision highp float;
        varying vec2 vUv;
        void main() {
          gl_FragColor = vec4(vUv, 1.0, 1.0);
        }
      `,
    });
  }

  update(t: number) {
    // Optional animation for triangle
  }
}

class Cube extends Mesh {
  constructor(args: any) {
    super(args);

    this.geometry = new Box(args.gl);
    this.program = new Program(args.gl, {
      vertex: `
        attribute vec3 position;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.5, 1.0);
        }
      `,
    });
  }

  update(t: number) {
    this.rotation.y += 0.02;
    this.rotation.x += 0.01;
  }
}

export class WebGLInstance {
  private canvas: HTMLCanvasElement;
  private camera: Camera;
  private renderer: Renderer;
  private gl: WebGLRenderingContext;
  private scene: Transform;
  private meshes: Mesh[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new Renderer({ canvas });
    this.gl = this.renderer.gl;
    this.camera = new Camera(this.renderer.gl);
    this.camera.position.z = 10;

    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    this.scene = new Transform();

    // Create and add meshes
    const triangle = new TriangleShader({ gl: this.gl });
    triangle.position.z=-2
    const cube = new Cube({ gl: this.gl });
    cube.position.z=2

    triangle.setParent(this.scene);
    cube.setParent(this.scene);

    this.meshes.push( cube,triangle);

    this.animate();
  }

  animate = (time = 0) => {
  requestAnimationFrame(this.animate);
  
  const cube = this.meshes[0];
  const triangle = this.meshes[1];
  // Update
  (cube as any).update(time);

  // Render Triangle separately (no camera)
  this.renderer.render({ scene: triangle});

  // Render Cube with camera
  this.renderer.render({ scene: cube, camera: this.camera });
  };

  resize = () => {
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    });
  };

  destroy = () => {
    // Dispose logic if needed
  };
}
