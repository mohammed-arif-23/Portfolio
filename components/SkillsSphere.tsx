'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, Text } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

const techSkills = [
  { name: 'Next.js', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'JavaScript', category: 'language' },
  { name: 'TypeScript', category: 'language' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Python', category: 'language' },
  { name: 'Three.js', category: '3d' },
  { name: 'GSAP', category: 'animation' },
  { name: 'MongoDB', category: 'database' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'Redis', category: 'database' },
  { name: 'Docker', category: 'devops' },
  { name: 'AWS', category: 'cloud' },
  { name: 'Firebase', category: 'backend' },
  { name: 'Tailwind', category: 'frontend' },
  { name: 'HTML5', category: 'frontend' },
  { name: 'CSS3', category: 'frontend' },
  { name: 'Git', category: 'devops' },
  { name: 'Express', category: 'backend' },
  { name: 'Prisma', category: 'database' },
];

function SkillPoints({ skills }: { skills: typeof techSkills }) {
  const ref = useRef<THREE.Points>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  // Generate random positions for skills
  const [sphere] = useState(() => {
    const positions = [];
    for (let i = 0; i < skills.length; i++) {
      // Create points in a sphere
      const pos = random.inSphere(new Float32Array(3), { radius: 5 });
      positions.push(pos);
    }
    return positions;
  });

  // Rotate the sphere
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  // Handle hover effects
  const handlePointerOver = (index: number) => {
    setHoveredSkill(skills[index].name);
    if (ref.current) {
      // Scale up the hovered point
      const positions = ref.current.geometry.attributes.position.array;
      positions[index * 3] *= 1.2;
      positions[index * 3 + 1] *= 1.2;
      positions[index * 3 + 2] *= 1.2;
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  };

  const handlePointerOut = (index: number) => {
    setHoveredSkill(null);
    if (ref.current) {
      // Reset the point scale
      const positions = ref.current.geometry.attributes.position.array;
      const originalPos = sphere[index];
      positions[index * 3] = originalPos[0];
      positions[index * 3 + 1] = originalPos[1];
      positions[index * 3 + 2] = originalPos[2];
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  };

  return (
    <>
      <Points ref={ref} positions={sphere} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#cfd2cd"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      {/* Add text labels for skills */}
      {sphere.map((pos, index) => (
        <Text
          key={index}
          position={[pos[0] * 1.1, pos[1] * 1.1, pos[2] * 1.1]}
          fontSize={0.3}
          color={hoveredSkill === skills[index].name ? "#fbfbf2" : "#cfd2cd"}
          anchorX="center"
          anchorY="middle"
          onClick={() => console.log(`Clicked on ${skills[index].name}`)}
          onPointerOver={() => handlePointerOver(index)}
          onPointerOut={() => handlePointerOut(index)}
        >
          {skills[index].name}
        </Text>
      ))}
    </>
  );
}

export default function SkillsSphere() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 lg:px-20 bg-brand-light">
      <div className="layout-grid">
        <div className="col-span-12">
          <div className="flex flex-col items-center justify-center gap-3 mb-16">
            <p className="heading-64 text-center text-brand-dark font-semibold">Interactive Skills Visualization</p>
            <p className="text-brand-dark">Hover over skills to highlight them in the 3D sphere</p>
          </div>
          
          <div className="h-96 md:h-[500px] w-full rounded-3xl overflow-hidden bg-[#201d1d]">
            {isClient ? (
              <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <SkillPoints skills={techSkills} />
                <OrbitControls 
                  enableZoom={true}
                  enablePan={false}
                  autoRotate={true}
                  autoRotateSpeed={0.5}
                />
              </Canvas>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-brand-light">Loading 3D visualization...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}