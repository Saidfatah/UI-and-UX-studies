
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, PresentationControls } from '@react-three/drei';
import { Caneca } from './CoffeMug';

function CoffeeMugCanvas() {
    return (  <Canvas
     camera={{ position: [0, 0, 25], fov: 45 }} 
     style={{ touchAction: 'none' }}
     >
        <ambientLight intensity={0.1} />
        <spotLight position={[10, 10, 10]} intensity={1.5} angle={0.45} penumbra={1} />
        <Environment files="/potsdamer_platz_1k.hdr" />
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.2, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
          <Caneca position={[0, 1.2, 0]} />
        </PresentationControls>
        <ContactShadows position={[0, -7, 0]} opacity={0.25} width={10} height={5} blur={2.5} far={10} />
      </Canvas> );
}

export default CoffeeMugCanvas;