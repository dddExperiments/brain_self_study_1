import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class BrainVisualizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    // Node & Edge groups
    this.nodes = [];
    this.edges = [];
    this.particles = [];
    
    this.regionNodes = {
      neocortex: [],
      thalamus: [],
      hippocampus: [],
      hypothalamus: [],
      visual_pathway: [],
      brainstem: []
    };

    this.activeRegion = 'none';
    this.pulseTime = 0;

    this.init();
    this.createBrainNetwork();
    this.animate();

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = null; // Transparent to inherit css gradient

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 100);
    this.camera.position.set(0, 5, 12);

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Controls setup
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.3; // Limit looking from underneath too much
    this.controls.minDistance = 3;
    this.controls.maxDistance = 25;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x06b6d4, 0.8);
    dirLight1.position.set(5, 10, 7);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf43f5e, 0.5);
    dirLight2.position.set(-5, -5, -5);
    this.scene.add(dirLight2);
  }

  createBrainNetwork() {
    this.nodesGroup = new THREE.Group();
    this.edgesGroup = new THREE.Group();
    this.particlesGroup = new THREE.Group();
    this.scene.add(this.nodesGroup);
    this.scene.add(this.edgesGroup);
    this.scene.add(this.particlesGroup);

    // Color definitions matching CSS
    this.colors = {
      neocortex: 0xf59e0b,   // Yellow
      thalamus: 0xf43f5e,    // Magenta/Red
      hippocampus: 0x10b981, // Green
      hypothalamus: 0xa855f7, // Purple
      visual_pathway: 0x3b82f6, // Blue
      brainstem: 0x64748b,   // Slate
      signal: 0x06b6d4       // Cyan
    };

    // 1. NEOCORTEX NODES (Outer dome)
    const neocortexCount = 80;
    for (let i = 0; i < neocortexCount; i++) {
      // Golden spiral distribution on a hemisphere
      const theta = Math.acos(1 - (i / neocortexCount) * 0.85); // 0 to ~85 degrees
      const phi = i * 2.39996; // Golden angle

      const r = 4.2;
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.cos(theta) * 0.8 + 0.5; // Flatten slightly
      const z = r * Math.sin(theta) * Math.sin(phi);

      this.addNode(new THREE.Vector3(x, y, z), 'neocortex', 0.08);
    }

    // 2. THALAMUS NODES (Central double-lobed egg shape)
    const thalamusCount = 24;
    for (let i = 0; i < thalamusCount; i++) {
      const lobe = i % 2 === 0 ? 1 : -1;
      const x = lobe * 0.6 + (Math.random() - 0.5) * 0.3;
      const y = (Math.random() - 0.5) * 0.6;
      const z = (Math.random() - 0.5) * 0.6;
      this.addNode(new THREE.Vector3(x, y, z), 'thalamus', 0.12);
    }

    // 3. HYPOTHALAMUS NODES (Slightly forward and below thalamus)
    const hypoCount = 12;
    for (let i = 0; i < hypoCount; i++) {
      const x = (Math.random() - 0.5) * 0.4;
      const y = -0.8 + (Math.random() - 0.5) * 0.3;
      const z = 0.6 + (Math.random() - 0.5) * 0.4;
      this.addNode(new THREE.Vector3(x, y, z), 'hypothalamus', 0.1);
    }

    // 4. HIPPOCAMPUS NODES (Curved C-shape inside temporal areas)
    const hippoCount = 20;
    for (let i = 0; i < hippoCount; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      // Parametric C-curve
      const t = (i / hippoCount) * Math.PI * 1.2 - 0.3; // parameter along curve
      const x = side * (1.6 + 0.8 * Math.cos(t));
      const y = -0.6 + 0.7 * Math.sin(t);
      const z = -1.2 * Math.cos(t) + 0.5 * Math.sin(t) - 0.5;
      
      this.addNode(new THREE.Vector3(x, y, z), 'hippocampus', 0.09);
    }

    // 5. EYE & OPTIC TRACT NODES (Front)
    const leftEyePos = new THREE.Vector3(-1.4, -0.6, 4.5);
    const rightEyePos = new THREE.Vector3(1.4, -0.6, 4.5);
    this.addNode(leftEyePos, 'visual_pathway', 0.15, 'Left Retina');
    this.addNode(rightEyePos, 'visual_pathway', 0.15, 'Right Retina');

    // LGN Nodes (specifically placed in back-lateral thalamus area)
    const leftLGN = new THREE.Vector3(-0.9, -0.2, -0.6);
    const rightLGN = new THREE.Vector3(0.9, -0.2, -0.6);
    this.addNode(leftLGN, 'thalamus', 0.1, 'Left LGN');
    this.addNode(rightLGN, 'thalamus', 0.1, 'Right LGN');

    // V1 Nodes (very back occipital neocortex)
    const leftV1 = new THREE.Vector3(-0.6, 0.4, -4.1);
    const rightV1 = new THREE.Vector3(0.6, 0.4, -4.1);
    this.addNode(leftV1, 'neocortex', 0.1, 'Left V1');
    this.addNode(rightV1, 'neocortex', 0.1, 'Right V1');

    // Superior Colliculus (Midbrain, below Thalamus/LGN)
    const leftSC = new THREE.Vector3(-0.4, -1.0, -1.0);
    const rightSC = new THREE.Vector3(0.4, -1.0, -1.0);
    this.addNode(leftSC, 'brainstem', 0.1, 'Left Superior Colliculus');
    this.addNode(rightSC, 'brainstem', 0.1, 'Right Superior Colliculus');

    // Connectome Edges creation
    this.buildConnections();
  }

  addNode(position, region, size, label = '') {
    const geometry = new THREE.SphereGeometry(size, 16, 16);
    const material = new THREE.MeshPhongMaterial({
      color: this.colors[region],
      emissive: this.colors[region],
      emissiveIntensity: 0.2,
      shininess: 30,
      transparent: true,
      opacity: 0.8
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    
    // Store metadata
    mesh.userData = { region, originalOpacity: 0.8, originalScale: size, label };
    
    this.nodesGroup.add(mesh);
    this.nodes.push(mesh);
    this.regionNodes[region].push(mesh);
  }

  buildConnections() {
    // Helper to draw a line between nodes
    const drawLine = (n1, n2, region, type = 'static') => {
      const geometry = new THREE.BufferGeometry().setFromPoints([n1.position, n2.position]);
      const material = new THREE.LineBasicMaterial({
        color: this.colors[region],
        transparent: true,
        opacity: 0.15,
        linewidth: 1
      });
      const line = new THREE.Line(geometry, material);
      line.userData = { n1, n2, region, type, originalOpacity: 0.15 };
      this.edgesGroup.add(line);
      this.edges.push(line);
    };

    // 1. Thalamocortical loops (Bidirectional, dense)
    this.regionNodes.thalamus.forEach(tNode => {
      // Connect to 3-5 random neocortex nodes
      const connects = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < connects; i++) {
        const nNode = this.regionNodes.neocortex[Math.floor(Math.random() * this.regionNodes.neocortex.length)];
        drawLine(tNode, nNode, 'thalamus', 'thalamocortical');
      }
    });

    // 2. Hippocampus to Neocortex (sparse projection)
    this.regionNodes.hippocampus.forEach(hNode => {
      // Connect internally
      const nextIndex = (this.regionNodes.hippocampus.indexOf(hNode) + 1) % this.regionNodes.hippocampus.length;
      drawLine(hNode, this.regionNodes.hippocampus[nextIndex], 'hippocampus', 'internal');

      // Connect to Neocortex (temporal/prefrontal)
      if (Math.random() > 0.7) {
        const nNode = this.regionNodes.neocortex[Math.floor(Math.random() * this.regionNodes.neocortex.length)];
        drawLine(hNode, nNode, 'hippocampus', 'hippocampocortical');
      }
    });

    // 3. Hypothalamus Connections (Internal, and to Thalamus/Brainstem)
    this.regionNodes.hypothalamus.forEach(hypNode => {
      // Connect to thalamus
      if (Math.random() > 0.6) {
        const tNode = this.regionNodes.thalamus[Math.floor(Math.random() * this.regionNodes.thalamus.length)];
        drawLine(hypNode, tNode, 'hypothalamus', 'limbic');
      }
      // Connect to Brainstem
      if (Math.random() > 0.5) {
        const bNode = this.regionNodes.brainstem[Math.floor(Math.random() * this.regionNodes.brainstem.length)];
        drawLine(hypNode, bNode, 'hypothalamus', 'autonomic');
      }
    });

    // 4. Reservoir computing style (random recurrent links within Neocortex)
    this.regionNodes.neocortex.forEach(nNode => {
      // Small distance recurrent connections (Local columns)
      this.regionNodes.neocortex.forEach(otherNode => {
        if (nNode !== otherNode) {
          const dist = nNode.position.distanceTo(otherNode.position);
          if (dist < 1.0 && Math.random() > 0.6) {
            drawLine(nNode, otherNode, 'neocortex', 'recurrent');
          }
        }
      });
    });

    // 5. Explicit Visual Sensorimotor Pathway (RETINA -> LGN -> V1 -> SC -> RETINA)
    // We fetch labeled nodes
    const leftRetina = this.nodes.find(n => n.userData.label === 'Left Retina');
    const rightRetina = this.nodes.find(n => n.userData.label === 'Right Retina');
    const leftLGN = this.nodes.find(n => n.userData.label === 'Left LGN');
    const rightLGN = this.nodes.find(n => n.userData.label === 'Right LGN');
    const leftV1 = this.nodes.find(n => n.userData.label === 'Left V1');
    const rightV1 = this.nodes.find(n => n.userData.label === 'Right V1');
    const leftSC = this.nodes.find(n => n.userData.label === 'Left Superior Colliculus');
    const rightSC = this.nodes.find(n => n.userData.label === 'Right Superior Colliculus');

    if (leftRetina && leftLGN) drawLine(leftRetina, leftLGN, 'visual_pathway', 'visual_ff');
    if (rightRetina && rightLGN) drawLine(rightRetina, rightLGN, 'visual_pathway', 'visual_ff');
    if (leftLGN && leftV1) drawLine(leftLGN, leftV1, 'visual_pathway', 'visual_ff');
    if (rightLGN && rightV1) drawLine(rightLGN, rightV1, 'visual_pathway', 'visual_ff');
    
    // Bidirectional feedback V1 -> LGN
    if (leftV1 && leftLGN) drawLine(leftV1, leftLGN, 'thalamus', 'feedback');
    if (rightV1 && rightLGN) drawLine(rightV1, rightLGN, 'thalamus', 'feedback');

    // Visual to motor decision (V1 -> SC)
    if (leftV1 && leftSC) drawLine(leftV1, leftSC, 'visual_pathway', 'motor_dec');
    if (rightV1 && rightSC) drawLine(rightV1, rightSC, 'visual_pathway', 'motor_dec');

    // Superior Colliculus to Retinal Muscles (simulating eye movement feedback loop)
    if (leftSC && leftRetina) drawLine(leftSC, leftRetina, 'visual_pathway', 'motor_out');
    if (rightSC && rightRetina) drawLine(rightSC, rightRetina, 'visual_pathway', 'motor_out');
  }

  highlightRegion(region) {
    this.activeRegion = region;
    
    // Update active color in CSS
    const root = document.documentElement;
    if (region !== 'none' && this.colors[region]) {
      const hexColor = '#' + this.colors[region].toString(16).padStart(6, '0');
      root.style.setProperty('--active-accent', hexColor);
    } else {
      root.style.setProperty('--active-accent', '#06b6d4'); // Cyan default
    }

    // Nodes adjustment
    this.nodes.forEach(node => {
      const isMatched = (region === 'none') || 
                        (node.userData.region === region) ||
                        (region === 'visual_pathway' && (node.userData.region === 'brainstem' || node.userData.label.includes('Retina') || node.userData.label.includes('LGN') || node.userData.label.includes('V1')));

      node.material.opacity = isMatched ? 1.0 : 0.15;
      node.material.emissiveIntensity = isMatched ? 0.6 : 0.05;
      
      const targetScale = isMatched ? node.userData.originalScale * 1.3 : node.userData.originalScale * 0.8;
      node.scale.setScalar(targetScale / node.userData.originalScale);
    });

    // Edges adjustment
    this.edges.forEach(edge => {
      const isMatched = (region === 'none') || 
                        (edge.userData.region === region) ||
                        (region === 'visual_pathway' && edge.userData.region === 'visual_pathway');

      edge.material.opacity = isMatched ? 0.6 : 0.04;
    });

    // Spawn walking particles along active region paths
    this.clearParticles();
    if (region !== 'none') {
      this.spawnParticlesForRegion(region);
    }
  }

  spawnParticlesForRegion(region) {
    // Select edges belonging to this region
    let activeEdges = this.edges.filter(edge => edge.userData.region === region);
    
    // For visual pathway, prioritize visual flow edges
    if (region === 'visual_pathway') {
      activeEdges = this.edges.filter(edge => edge.userData.region === 'visual_pathway');
    }

    activeEdges.forEach(edge => {
      // Spawn 1 particle per line
      const geometry = new THREE.SphereGeometry(0.04, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: this.colors.signal,
        transparent: true,
        opacity: 0.8
      });
      const particleMesh = new THREE.Mesh(geometry, material);
      
      // Starting state
      particleMesh.position.copy(edge.userData.n1.position);
      
      this.particlesGroup.add(particleMesh);
      this.particles.push({
        mesh: particleMesh,
        start: edge.userData.n1.position,
        end: edge.userData.n2.position,
        progress: Math.random(), // Randomize starting progress for continuous flow
        speed: 0.015 + Math.random() * 0.01
      });
    });
  }

  clearParticles() {
    this.particles.forEach(p => {
      this.particlesGroup.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
    });
    this.particles = [];
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.pulseTime += 0.05;

    // Rotate brain slowly when resting
    if (this.controls) {
      this.controls.update();
    }
    
    if (this.activeRegion === 'none') {
      this.nodesGroup.rotation.y += 0.0015;
      this.edgesGroup.rotation.y += 0.0015;
      this.particlesGroup.rotation.y += 0.0015;
    } else {
      // Keep slow movement but slower
      this.nodesGroup.rotation.y += 0.0003;
      this.edgesGroup.rotation.y += 0.0003;
      this.particlesGroup.rotation.y += 0.0003;
    }

    // Animate active region nodes breathing glow
    this.nodes.forEach(node => {
      const isMatched = (this.activeRegion === 'none') || 
                        (node.userData.region === this.activeRegion) ||
                        (this.activeRegion === 'visual_pathway' && (node.userData.region === 'brainstem' || node.userData.label.includes('Retina') || node.userData.label.includes('LGN') || node.userData.label.includes('V1')));

      if (isMatched && this.activeRegion !== 'none') {
        const pulse = 1.0 + Math.sin(this.pulseTime * 2) * 0.15;
        node.scale.setScalar(pulse * (node.userData.originalScale * 1.2 / node.userData.originalScale));
      }
    });

    // Move signal particles along paths
    this.particles.forEach(p => {
      p.progress += p.speed;
      if (p.progress >= 1.0) {
        p.progress = 0.0;
        p.mesh.position.copy(p.start);
      } else {
        p.mesh.position.lerpVectors(p.start, p.end, p.progress);
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }
}
