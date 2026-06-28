export const chapterData = {
  id: "ch7",
  title: "Advanced Computational Models: Reservoirs, Attractors, and Active Inference",
  summary: "A masterclass in how the brain tracks time, space, and internal needs. We look at pond ripples in reservoir computing, the marble on a rubber sheet model of Continuous Attractors, the successor heat-map of planning, and how Karl Friston's Free Energy Principle unifies thinking and acting.",
  sections: [
    {
      id: "ch7_sec1",
      title: "1. Reservoir Computing: Echo State Networks",
      highlightRegion: "none",
      content: String.raw`
        <h3>1.1 Ripling Ponds: The Reservoir Concept</h3>
        <p>To train recurrent neural networks (networks with loops that can remember things over time), scientists traditionally used **Backpropagation Through Time (BPTT)**. But BPTT is extremely expensive: it requires saving the complete history of every neuron's state over time, which eats up memory. In biology, it is completely impossible: the brain cannot freeze time, save a history buffer of its activities, or send gradients backward through its loop networks.</p>
        
        <p>**Reservoir Computing** is a clever alternative that avoids these problems. It was introduced as **Echo State Networks (ESNs)** by Herbert Jaeger and **Liquid State Machines (LMs)** by Wolfgang Maass.</p>
        <p>Imagine throwing a stone into a pond. The stone creates complex ripples on the water's surface. These ripples encode the size, speed, and timing of the stone. Instead of trying to rebuild the pond or adjust the physics of the water molecules to fit our needs, we just let the water do its high-dimensional scrambling for free. We only train a very simple, linear readout layer (like a camera looking at the ripples) to decode what kind of stone was thrown. The looping network (the reservoir) is initialized randomly and **never changed**; only the final readout layer learns.</p>

        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 800 240" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Input -->
            <g transform="translate(20, 0)">
              <rect x="30" y="90" width="90" height="50" rx="6" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
              <text x="75" y="120" fill="var(--svg-text-primary)" font-family="Inter" font-size="12" text-anchor="middle">Input u(t)</text>
            </g>
            
            <!-- Connection to Reservoir -->
            <path d="M 140 115 L 218 115" fill="none" stroke="var(--svg-cyan)" stroke-width="2" marker-end="url(#arrow)" />
            <text x="180" y="100" fill="var(--svg-cyan)" font-family="Inter" font-size="9" text-anchor="middle">W_in (Fixed)</text>
            
            <!-- Reservoir (tangled loop) -->
            <g transform="translate(240, 30)">
              <rect x="0" y="0" width="280" height="170" rx="15" fill="rgba(255,0,127,0.03)" stroke="var(--svg-magenta)" stroke-width="2" />
              <text x="140" y="30" fill="var(--svg-magenta)" font-family="Outfit" font-size="14" font-weight="bold" text-anchor="middle">Fixed Recurrent Reservoir (Pond)</text>
              
              <!-- Random nodes and loops -->
              <circle cx="50" cy="90" r="10" fill="var(--svg-magenta)" />
              <circle cx="120" cy="70" r="10" fill="var(--svg-magenta)" />
              <circle cx="120" cy="120" r="10" fill="var(--svg-magenta)" />
              <circle cx="200" cy="90" r="10" fill="var(--svg-magenta)" />
              
              <path d="M 60 90 L 110 75" stroke="var(--svg-magenta)" stroke-width="1.5" />
              <path d="M 120 80 L 120 110" stroke="var(--svg-magenta)" stroke-width="1.5" />
              <path d="M 130 75 L 190 90" stroke="var(--svg-magenta)" stroke-width="1.5" />
              <path d="M 190 95 L 130 120" stroke="var(--svg-magenta)" stroke-width="1.5" />
              <path d="M 110 125 C 80 140, 60 120, 55 100" fill="none" stroke="var(--svg-magenta)" stroke-width="1.5" />
            </g>
            
            <!-- Connection to Readout -->
            <path d="M 530 115 L 608 115" fill="none" stroke="var(--svg-green)" stroke-width="2.5" marker-end="url(#arrow)" />
            <text x="570" y="100" fill="var(--svg-green)" font-family="Inter" font-size="10" text-anchor="middle" font-weight="bold">W_out (Trained)</text>
            
            <!-- Readout -->
            <g transform="translate(600, 0)">
              <rect x="20" y="90" width="110" height="50" rx="6" fill="var(--svg-bg-card)" stroke="var(--svg-green)" stroke-width="2" />
              <text x="75" y="120" fill="var(--svg-text-primary)" font-family="Inter" font-size="12" text-anchor="middle">Readout y(t)</text>
            </g>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 7.1: Reservoir Computing. A fixed, random recurrent network scrambles input history; only the final readout layer is trained.</p>
        </div>

        <h3>1.2 Bell Rings and the Edge of Chaos</h3>
        <ul>
          <li><strong>The Echo State Property (ESP):</strong> For the reservoir to be useful, its ripples must eventually fade away when the input stops. If you ring a bell, it should ring for a while (echoing the strike) and then go quiet. If the bell's connection strengths are too loud, it will ring louder and louder forever on its own. Mathematically, we guarantee the echoes fade if the **spectral radius** (the maximum eigenvalue or amplification factor of the connection matrix) is less than 1:
          \[ \rho(\mathbf{W}_{res}) = \max \left\{ |\lambda| : \lambda \text{ is an eigenvalue of } \mathbf{W}_{res} \right\} < 1 \]
          </li>
          <li><strong>Criticality (The Edge of Chaos):</strong> ESNs perform best right at the boundary between being too stiff (where ripples die out instantly, forgetting everything) and too wild (where ripples explode into chaotic noise). This boundary is called **criticality**. Here, memory capacity and pattern-scrambling are both maximized.</li>
        </ul>

        <h4>The Update Dynamics</h4>
        \[ \mathbf{x}(t) = (1 - \alpha)\mathbf{x}(t-1) + \alpha f\left(\mathbf{W}_{in}\mathbf{u}(t) + \mathbf{W}_{res}\mathbf{x}(t-1) + \mathbf{b}\right) \]
        \[ \mathbf{y}(t) = g\left(\mathbf{W}_{out}[\mathbf{x}(t); \mathbf{u}(t)]\right) \]
        <p>Where $\alpha$ is the leaking rate (how fast old states fade) and $f$ is a non-linear squashing function ($\tanh$). Training is solved simply using Ridge Regression (linear fitting with a penalty to keep weights small):</p>
        \[ \mathbf{W}_{out} = \mathbf{Y}_{target}\mathbf{X}^{T}\left(\mathbf{X}\mathbf{X}^{T} + \beta \mathbf{I}\right)^{-1} \]

        <h4>JavaScript Echo State Network Implementation</h4>
      `
    },
    {
      id: "ch7_sec2",
      title: "2. Liquid State Machines & Spiking Reservoirs",
      highlightRegion: "none",
      content: String.raw`
        <p>While Echo State Networks update in smooth steps, **Liquid State Machines (LSMs)** use biological electrical spikes. They feed inputs into a 3D grid of spiking neurons (usually modeled as **Leaky Integrate-and-Fire** cells, which accumulate voltage until they cross a threshold, spike, and reset).</p>

        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 600 220" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- 3D Spiking Grid Concept -->
            <g transform="translate(100, 20)">
              <rect x="0" y="0" width="200" height="150" rx="10" fill="rgba(0,188,255,0.03)" stroke="var(--svg-cyan)" stroke-width="1.5" />
              <text x="100" y="25" fill="var(--svg-cyan)" font-family="Outfit" font-size="12" font-weight="bold" text-anchor="middle">3D Liquid Spiking Grid</text>
              
              <!-- Grid points and spark lines -->
              <circle cx="50" cy="70" r="6" fill="var(--svg-cyan)" />
              <circle cx="100" cy="50" r="6" fill="var(--svg-cyan)" />
              <circle cx="100" cy="100" r="6" fill="var(--svg-cyan)" />
              <circle cx="150" cy="70" r="6" fill="var(--svg-cyan)" />
              
              <!-- Connection spikes -->
              <path d="M 56 70 L 94 52" stroke="var(--svg-cyan)" stroke-dasharray="2 3" />
              <path d="M 100 56 L 100 94" stroke="var(--svg-yellow)" stroke-width="1.5" />
              <path d="M 106 100 L 144 76" stroke="var(--svg-cyan)" stroke-dasharray="2 3" />
              
              <text x="100" y="135" fill="var(--svg-text-secondary)" font-family="Inter" font-size="9" text-anchor="middle">Fading Memory via Synaptic Fatigue</text>
            </g>
            
            <path d="M 320 95 L 398 95" fill="none" stroke="var(--svg-green)" stroke-width="2" marker-end="url(#arrow)" />
            
            <rect x="420" y="70" width="120" height="50" rx="6" fill="var(--svg-bg-card)" stroke="var(--svg-green)" stroke-width="2" />
            <text x="480" y="100" fill="var(--svg-text-primary)" font-family="Inter" font-size="12" text-anchor="middle">Linear Readout</text>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 7.2: Liquid State Machine layout. Spiking activity is filtered through short-term plasticity to generate output.</p>
        </div>

        <p>LSMs store fading memory not just through looping paths, but through **Short-Term Synaptic Plasticity**. Synapses between cells fatigue (weaken) or facilitate (strengthen) depending on how recently they were fired. This acts as a physical filter that translates temporal timing into spatial patterns, which the readout layer decodes.</p>

        <h3>2.1 Biological Reservoirs</h3>
        <ul>
          <li><strong>The Cerebellum:</strong> A perfect biological reservoir. Inputs project to 100 billion tiny granule cells, which separate and blow up the input patterns into high dimensions. Granule cells are kept highly sparse by Golgi cell brakes (only ~1% active). The huge Purkinje cells read out these patterns, adjusting their weights when errors are detected.</li>
          <li><strong>Basal Ganglia Striatum:</strong> The striatum acts as a reservoir of cortical states. Its medium spiny neurons loop together inhibitorily, and dopamine signals act as the training signals to adjust the readouts.</li>
        </ul>
      `
    },
    {
      id: "ch7_sec3",
      title: "3. Continuous Attractor Neural Networks (CANNs)",
      highlightRegion: "none",
      content: String.raw`
        <h3>3.1 The Marble on a Rubber Sheet</h3>
        <p>While reservoirs use random, messy connections, the brain needs highly structured networks to track smoothly changing variables, like the angle of your head, the position of your joints, or your location in a room.</p>
        <p>To understand how this works, imagine a heavy steel marble resting on a stretched sheet of rubber. The marble makes a depression, and the rubber sags around it, keeping the marble steady. This depression is a stable **"bump of activity"** in the network. If you blow on the marble (a velocity signal), the bump slides smoothly across the sheet. This system is a **Continuous Attractor Neural Network (CANN)**.</p>

        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 600 240" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Ring of Neurons -->
            <circle cx="300" cy="120" r="70" fill="none" stroke="var(--border-color)" stroke-dasharray="8 6" stroke-width="2" />
            
            <!-- Silent neurons -->
            <circle cx="230" cy="120" r="8" fill="var(--svg-bg-card)" stroke="var(--border-color)" />
            <circle cx="240" cy="70" r="8" fill="var(--svg-bg-card)" stroke="var(--border-color)" />
            <circle cx="360" cy="70" r="8" fill="var(--svg-bg-card)" stroke="var(--border-color)" />
            <circle cx="370" cy="120" r="8" fill="var(--svg-bg-card)" stroke="var(--border-color)" />
            <circle cx="350" cy="170" r="8" fill="var(--svg-bg-card)" stroke="var(--border-color)" />
            <circle cx="250" cy="170" r="8" fill="var(--svg-bg-card)" stroke="var(--border-color)" />
            
            <!-- Active Bump at the top -->
            <circle cx="300" cy="50" r="14" fill="var(--svg-yellow)" />
            <circle cx="280" cy="53" r="10" fill="var(--svg-yellow)" opacity="0.8" />
            <circle cx="320" cy="53" r="10" fill="var(--svg-yellow)" opacity="0.8" />
            <text x="300" y="25" fill="var(--svg-yellow-text)" font-family="Outfit" font-size="12" font-weight="bold" text-anchor="middle">Active Bump</text>
            
            <!-- Mexican hat interaction hint -->
            <path d="M 280 53 Q 300 80, 320 53" fill="none" stroke="var(--svg-green)" stroke-dasharray="2 2" />
            <text x="300" y="80" fill="var(--svg-green)" font-family="Inter" font-size="8" text-anchor="middle">Local Excitation</text>
            
            <!-- Asymmetric shift arrow -->
            <path d="M 330 55 A 80 80 0 0 1 360 80" fill="none" stroke="var(--svg-magenta)" stroke-width="2" marker-end="url(#arrow-red)" />
            <text x="385" y="60" fill="var(--svg-magenta)" font-family="Inter" font-size="9">Drift Shift (Velocity)</text>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 7.3: 1D Continuous Attractor Network. Local excitation and global inhibition hold a stable bump of activity, which shifts around the ring in response to speed inputs.</p>
        </div>

        <h3>3.2 Mexican Hats and Divisive Normalization</h3>
        <p>The bump is held in place by a connection pattern called a **Mexican Hat**: nearby cells excite each other (holding the marble in the depression), while far-away cells inhibit each other (preventing other bumps from forming):</p>
        \[ \tau_m \frac{\partial U(\mathbf{x}, t)}{\partial t} = -U(\mathbf{x}, t) + \int W(\mathbf{x} - \mathbf{x}') r(\mathbf{x}', t) d\mathbf{x}' + I_{ext}(\mathbf{x}, t) \]
        <p>To prevent this activity from blowing up, **divisive normalization** divides each cell's rate by the total activity of the network. This forces the network to restrict itself to exactly one stable bump:</p>
        \[ r(\mathbf{x}, t) = \frac{U(\mathbf{x}, t)^2}{1 + k \int U(\mathbf{x}', t)^2 d\mathbf{x}'} \]
        <p>To move the bump when you move, we add an **asymmetric (off-center) adjustment** to the connections: <code>W_{asym} = W * (1 + &gamma; * v * dist)</code>. This acts like a wind blowing the bump along the ring at a speed that matches your velocity.</p>

        <h4>JavaScript 1D Continuous Attractor Implementation</h4>
      `
    },
    {
      id: "ch7_sec4",
      title: "4. Successor Representations & Grid Cell Spectral Basis",
      highlightRegion: "none",
      content: String.raw`
        <h3>4.1 The Predictive Heat Map</h3>
        <p>To make smart decisions, you must know how good your current state is. You can do this in two ways:</p>
        <ul>
          <li><strong>Model-Free:</strong> Just memorize how good each spot is. If slot 10 has food, slot 10 is labeled "GOOD." This is fast, but if the food is moved to slot 12, you still run to slot 10 because you have no map.</li>
          <li><strong>Model-Based:</strong> Learn a detailed CAD map of the entire maze and run pathfinding simulations in your head. This is highly flexible, but takes huge amounts of computing power.</li>
        </ul>
        <p>The **Successor Representation (SR)**, proposed by Peter Dayan, is the perfect middle ground. It is like having a **heat map of future paths**.</p>
        
        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 600 200" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Map Grid -->
            <rect x="50" y="60" width="80" height="80" fill="none" stroke="var(--border-color)" stroke-width="2" />
            <text x="90" y="105" fill="var(--svg-text-primary)" font-family="Inter" font-size="12" text-anchor="middle">State A</text>
            
            <rect x="130" y="60" width="80" height="80" fill="none" stroke="var(--border-color)" stroke-width="2" />
            <text x="170" y="105" fill="var(--svg-text-primary)" font-family="Inter" font-size="12" text-anchor="middle">State B</text>
            
            <rect x="210" y="60" width="80" height="80" fill="none" stroke="var(--border-color)" stroke-width="2" />
            <text x="250" y="105" fill="var(--svg-text-primary)" font-family="Inter" font-size="12" text-anchor="middle">State C</text>
            
            <!-- Arrows showing transitions -->
            <path d="M 110 100 L 128 100" fill="none" stroke="var(--svg-cyan)" stroke-width="2" marker-end="url(#arrow)" />
            <path d="M 190 100 L 208 100" fill="none" stroke="var(--svg-cyan)" stroke-width="2" marker-end="url(#arrow)" />
            
            <!-- Equation representation -->
            <g transform="translate(320, 70)">
              <rect x="0" y="0" width="240" height="60" rx="6" fill="var(--svg-bg-card)" stroke="var(--svg-magenta)" stroke-width="2" />
              <text x="120" y="25" fill="var(--svg-magenta)" font-family="Outfit" font-size="16" font-weight="bold" text-anchor="middle">Value = Map × Reward</text>
              <text x="120" y="45" fill="var(--svg-text-primary)" font-family="Inter" font-size="12" text-anchor="middle">V(s) = ∑ M(s, s') × R(s')</text>
            </g>
            
            <text x="300" y="30" fill="var(--svg-text-primary)" font-family="Outfit" font-size="14" text-anchor="middle" font-weight="bold">Successor Representation: Decoupling Paths from Rewards</text>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 7.4: Successor Representation. The value of a location is computed by multiplying a predictive map of transitions by a reward vector.</p>
        </div>

        <p>The SR splits the value of a state into a predictive map matrix $\mathbf{M}$ and a reward list $\mathbf{R}$: <code>V(s) = &Sigma; M(s, s') * R(s')</code>. The map $\mathbf{M}$ records how often you expect to visit future states from your current position. If the cheese in the maze moves, you do not need to rewrite the map; you just update the reward list $\mathbf{R}$ at the new slot, and your brain instantly calculates the new values of all other locations. Hippocampal place cells behave exactly like rows of this predictive map.</p>

        <h3>4.2 Grid Cells as Compressed Harmonics</h3>
        <p>A beautiful mathematical discovery shows that **grid cells are the eigenvectors of the Successor Representation matrix**. If you decompose the predictive map $\mathbf{M}$ into its primary harmonic components, you get repeating hexagonal waves. This acts like a compressed Fourier transform of space, allowing the brain to compute shortcuts and use the same coordinate format for abstract tasks like mapping connections between ideas.</p>
      `
    },
    {
      id: "ch7_sec5",
      title: "5. Homeostatic Reinforcement Learning",
      highlightRegion: "none",
      content: String.raw`
        <h3>5.1 Thermostats with Priorities: The Power Curve</h3>
        <p>In AI, agents seek arbitrary human-made reward scores. In biology, reward is about survival. This is modeled by **Homeostatic Reinforcement Learning (HRL)**.</p>
        <p>Let the body's internal state be a list $\mathbf{H}_t$, and its setpoints (target levels) be $\mathbf{S}$. The body's overall discomfort is called **Homeostatic Deviance**:</p>
        \[ D(\mathbf{H}_t) = \sum_{i=1}^N w_i |s^i - h^i_t|^d \]
        <p>The exponent $d$ is crucial (typically $d \ge 2$). Because of the power curve, being extremely dehydrated creates a massive deviance score compared to being just slightly hungry and slightly cold. This forces the agent to prioritize fixing the most dangerous emergency first. The internal reward is simply the **drop in deviance**: <code>r_t = D(H_t) - D(H_{t+1})</code>.</p>
      `
    },
    {
      id: "ch7_sec6",
      title: "6. Active Inference & The Free Energy Principle",
      highlightRegion: "none",
      content: String.raw`
        <h3>6.1 The Surprised Brain</h3>
        <p>Karl Friston's **Free Energy Principle** unifies perception, learning, and action under a single rule: any self-organizing system must minimize its **Variational Free Energy** (a measure of internal surprise) to survive and resist decay.</p>

        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 600 240" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Brain / Beliefs -->
            <rect x="230" y="30" width="140" height="50" rx="6" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
            <text x="300" y="55" fill="var(--svg-text-primary)" font-family="Outfit" font-size="13" font-weight="bold" text-anchor="middle">Internal Beliefs (μ)</text>
            <text x="300" y="70" fill="var(--svg-text-secondary)" font-family="Inter" font-size="9" text-anchor="middle">World Model</text>
            
            <!-- Sensory Input -->
            <rect x="80" y="140" width="140" height="50" rx="6" fill="var(--svg-bg-card)" stroke="var(--svg-magenta)" stroke-width="2" />
            <text x="150" y="165" fill="var(--svg-text-primary)" font-family="Outfit" font-size="13" font-weight="bold" text-anchor="middle">Sensory Input (s)</text>
            <text x="150" y="180" fill="var(--svg-text-secondary)" font-family="Inter" font-size="9" text-anchor="middle">Observations</text>
            
            <!-- Action -->
            <rect x="380" y="140" width="140" height="50" rx="6" fill="var(--svg-bg-card)" stroke="var(--svg-green)" stroke-width="2" />
            <text x="450" y="165" fill="var(--svg-text-primary)" font-family="Outfit" font-size="13" font-weight="bold" text-anchor="middle">Action (a)</text>
            <text x="450" y="180" fill="var(--svg-text-secondary)" font-family="Inter" font-size="9" text-anchor="middle">Active Corrections</text>
            
            <!-- Loop connections -->
            <path d="M 230 55 C 150 55, 150 110, 150 132" fill="none" stroke="var(--svg-magenta)" stroke-width="2" marker-end="url(#arrow-red)" />
            <text x="135" y="90" fill="var(--svg-magenta)" font-family="Inter" font-size="9" text-anchor="end">Generates Predictions</text>
            
            <path d="M 220 165 L 372 165" fill="none" stroke="var(--border-color)" stroke-width="1.5" stroke-dasharray="3 3" />
            <text x="300" y="155" fill="var(--svg-text-secondary)" font-family="Inter" font-size="9" text-anchor="middle">Mismatches = Surprise</text>
            
            <!-- Perception Inference path -->
            <path d="M 180 140 C 220 100, 220 100, 250 80" fill="none" stroke="var(--svg-cyan)" stroke-width="2" marker-end="url(#arrow)" />
            <text x="240" y="115" fill="var(--svg-cyan)" font-family="Inter" font-size="9" text-anchor="middle">Perception: Update Beliefs</text>
            
            <!-- Active Inference path -->
            <path d="M 330 80 C 370 100, 370 100, 410 132" fill="none" stroke="var(--svg-green)" stroke-width="2" marker-end="url(#arrow)" />
            <text x="400" y="105" fill="var(--svg-green)" font-family="Inter" font-size="9" text-anchor="middle">Action: Change World</text>
            
            <path d="M 450 140 C 450 90, 390 55, 378 55" fill="none" stroke="var(--svg-green)" stroke-width="2" marker-end="url(#arrow)" />
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 7.5: Active Inference Loop. The agent minimizes surprise by adapting its mind (perception) or altering the environment (action).</p>
        </div>

        <h3>6.2 Minimizing Surprise: Thinking vs. Doing</h3>
        <p>Imagine you wake up in the middle of the night and hear a loud clattering noise in the kitchen. You are surprised (Free Energy rises). You have exactly two ways to reduce this surprise:</p>
        <ul>
          <li><strong>Perceptual Inference (Change your mind):</strong> You realize it is just the wind blowing the door open. You update your internal beliefs to match what is happening.</li>
          <li><strong>Active Inference (Change the world):</strong> You get out of bed, walk to the kitchen, and close the door. You take action to force the sensory input to match your expectations of a quiet house.</li>
        </ul>
        <p>Expected Free Energy ($G$) also unifies **exploration** (acting to gather information and resolve uncertainty) and **exploitation** (acting to get what the body needs) under a single mathematical goal, eliminating the need for heuristic parameters like $\epsilon$-greedy search.</p>
      `
    }
  ],
  quiz: [
    {
      question: "How does Reservoir Computing (Echo State Networks) bypass the weight transport problem in recurrent network training?",
      options: [
        "By using backpropagation through time to balance the weights dynamically.",
        "By keeping the recurrent weights of the reservoir fixed and random, training only the final linear readout layer.",
        "By replacing all recurrent loops with feedforward convolutional layers.",
        "By utilizing the TRN to lock the spectral radius to zero."
      ],
      answerIndex: 1,
      explanation: "Reservoir computing initializes a large, random recurrent network (the reservoir) with fixed connections that are never updated. Since only the weights of the final linear readout layer are trained, training is fast and does not require propagating errors backward through recurrent loops."
    },
    {
      question: "In Continuous Attractor Neural Networks (CANNs), what role does the Mexican Hat connectivity pattern play?",
      options: [
        "It generates T-type calcium currents to switch the network into burst mode.",
        "It acts as a high-fidelity input gateway in Layer 4.",
        "It maintains a stable, localized bump of activity by allowing nearby neurons to excite each other, while far-away neurons inhibit each other.",
        "It projects cortisol hormones to shut down the HPA axis."
      ],
      answerIndex: 2,
      explanation: "A Mexican Hat pattern features local excitation and surrounding lateral inhibition. This combination holds a stable, localized bump of activity at a specific location, representing the current coordinate state of the variable."
    },
    {
      question: "In Homeostatic Reinforcement Learning (HRL), why is the deviance exponent d set to a value greater than 1 (like d = 2)?",
      options: [
        "To ensure that all rewards are calculated in linear time.",
        "To curve the discomfort score upward, prioritizing the correction of severe, life-threatening deficits in a single variable over small, minor deficits across multiple variables.",
        "To allow the successor representation to be computed without an identity matrix.",
        "To bypass the need for setpoints inside the SCN."
      ],
      answerIndex: 1,
      explanation: "When $d > 1$, the discomfort function is non-linear and curves upward. A large deviation in one variable (like extreme thirst) produces a much larger deviance score than minor deviations in multiple variables, forcing the agent to prioritize resolving the most urgent survival emergency first."
    },
    {
      question: "Under the Free Energy Principle, what is the difference between Perceptual Inference and Active Inference?",
      options: [
        "Perceptual Inference updates internal beliefs to match the world; Active Inference changes the world through actions to match internal predictions.",
        "Perceptual Inference increases surprise; Active Inference reduces it.",
        "Perceptual Inference is computed by the cerebellum; Active Inference by the brainstem.",
        "Perceptual Inference is model-free; Active Inference is model-based."
      ],
      answerIndex: 0,
      explanation: "Both processes minimize Variational Free Energy (surprise). Perceptual inference adjusts internal beliefs (the model) to fit incoming sensory inputs. Active inference takes actions to change the environment, forcing sensory inputs to match internal predictions."
    }
  ]
};

// ============================================================================
// EchoStateNetwork class (kept intact for functional compatibility)
// ============================================================================
export class EchoStateNetwork {
  constructor(inputDim, resSize, outputDim, spectralRadius = 0.95, leakingRate = 0.3, sparsity = 0.1) {
    this.inputDim = inputDim;
    this.resSize = resSize;
    this.outputDim = outputDim;
    this.leakingRate = leakingRate;
    
    this.Win = Array.from({ length: resSize }, () =>
      Array.from({ length: inputDim }, () => (Math.random() * 2 - 1) * 0.1)
    );
    
    this.Wres = Array.from({ length: resSize }, () =>
      Array.from({ length: resSize }, () => {
        if (Math.random() > sparsity) return 0.0;
        return (Math.random() * 2 - 1) * 0.5;
      })
    );
    this.scaleSpectralRadius(spectralRadius);
    
    this.Wout = null;
    this.state = new Float64Array(resSize);
  }

  scaleSpectralRadius(targetRadius) {
    const N = this.resSize;
    let v = Array.from({ length: N }, () => Math.random() - 0.5);
    let norm = Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
    v = v.map(val => val / norm);

    let dominantEigenvalue = 0;
    const iterations = 50;
    for (let iter = 0; iter < iterations; iter++) {
      const w = new Array(N).fill(0);
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          w[i] += this.Wres[i][j] * v[j];
        }
      }
      let sumSq = 0;
      for (let i = 0; i < N; i++) sumSq += w[i] * w[i];
      norm = Math.sqrt(sumSq);
      if (norm === 0) break;
      v = w.map(val => val / norm);
      dominantEigenvalue = norm;
    }

    if (dominantEigenvalue > 0) {
      const scale = targetRadius / dominantEigenvalue;
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          this.Wres[i][j] *= scale;
        }
      }
    }
  }

  update(input) {
    const nextState = new Float64Array(this.resSize);
    for (let i = 0; i < this.resSize; i++) {
      let val = 0.0;
      for (let j = 0; j < this.inputDim; j++) {
        val += this.Win[i][j] * input[j];
      }
      for (let j = 0; j < this.resSize; j++) {
        val += this.Wres[i][j] * this.state[j];
      }
      nextState[i] = (1 - this.leakingRate) * this.state[i] + this.leakingRate * Math.tanh(val);
    }
    this.state = nextState;
    return this.state;
  }

  solveLinearSystem(A, B) {
    const n = A.length;
    const m = B[0].length;
    const a = A.map(row => Float64Array.from(row));
    const b = B.map(row => Float64Array.from(row));

    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let r = i + 1; r < n; r++) {
        if (Math.abs(a[r][i]) > Math.abs(a[maxRow][i])) maxRow = r;
      }
      if (maxRow !== i) {
        [a[i], a[maxRow]] = [a[maxRow], a[i]];
        [b[i], b[maxRow]] = [b[maxRow], b[i]];
      }

      const pivot = a[i][i];
      if (Math.abs(pivot) < 1e-15) {
        throw new Error("Matrix is singular or near-singular");
      }

      for (let j = i; j < n; j++) a[i][j] /= pivot;
      for (let j = 0; j < m; j++) b[i][j] /= pivot;

      for (let r = 0; r < n; r++) {
        if (r === i) continue;
        const factor = a[r][i];
        for (let j = i; j < n; j++) a[r][j] -= factor * a[i][j];
        for (let j = 0; j < m; j++) b[r][j] -= factor * b[i][j];
      }
    }
    return b;
  }

  train(inputs, targets, beta = 1e-4) {
    const T = inputs.length;
    const M = this.inputDim;
    const N = this.resSize;
    const L = this.outputDim;
    const states = [];
    
    this.state = new Float64Array(N);
    const warmup = Math.min(100, Math.floor(T * 0.1));

    for (let t = 0; t < T; t++) {
      this.update(inputs[t]);
      if (t >= warmup) {
        const concat = new Float64Array(N + M);
        concat.set(this.state, 0);
        concat.set(inputs[t], N);
        states.push(concat);
      }
    }

    const trainLen = states.length;
    const stateDim = N + M;

    const A = Array.from({ length: stateDim }, () => new Float64Array(stateDim));
    for (let i = 0; i < stateDim; i++) {
      for (let j = 0; j < stateDim; j++) {
        let val = 0;
        for (let t = 0; t < trainLen; t++) {
          val += states[t][i] * states[t][j];
        }
        A[i][j] = val + (i === j ? beta : 0);
      }
    }

    const B = Array.from({ length: stateDim }, () => new Float64Array(L));
    for (let i = 0; i < stateDim; i++) {
      for (let l = 0; l < L; l++) {
        let val = 0;
        for (let t = 0; t < trainLen; t++) {
          val += states[t][i] * targets[t + warmup][l];
        }
        B[i][l] = val;
      }
    }

    const WoutTranspose = this.solveLinearSystem(A, B);
    this.Wout = Array.from({ length: L }, () => new Float64Array(stateDim));
    for (let l = 0; l < L; l++) {
      for (let i = 0; i < stateDim; i++) {
        this.Wout[l][i] = WoutTranspose[i][l];
      }
    }
  }

  predict(inputs) {
    const T = inputs.length;
    const outputs = [];
    const N = this.resSize;
    const M = this.inputDim;

    for (let t = 0; t < T; t++) {
      this.update(inputs[t]);
      const concat = new Float64Array(N + M);
      concat.set(this.state, 0);
      concat.set(inputs[t], N);

      const output = new Float64Array(this.outputDim);
      for (let l = 0; l < this.outputDim; l++) {
        let val = 0;
        for (let i = 0; i < N + M; i++) {
          val += this.Wout[l][i] * concat[i];
        }
        output[l] = val;
      }
      outputs.push(output);
    }
    return outputs;
  }
}

// ============================================================================
// AttractorNetwork1D class (kept intact for functional compatibility)
// ============================================================================
export class AttractorNetwork1D {
  constructor(numNeurons = 100, sigma = 5.0, k = 0.1) {
    this.N = numNeurons;
    this.sigma = sigma;
    this.k = k;
    
    this.U = new Float64Array(this.N);
    this.r = new Float64Array(this.N);
    
    for (let i = 0; i < this.N; i++) {
      const dist = i - this.N / 2;
      this.U[i] = Math.exp(-(dist * dist) / (2 * 9.0));
    }
    this.normalizeRates();
  }

  normalizeRates() {
    let sumSq = 0;
    for (let i = 0; i < this.N; i++) {
      const uPos = Math.max(0, this.U[i]);
      this.r[i] = uPos * uPos;
      sumSq += this.r[i];
    }
    const denom = 1.0 + this.k * sumSq;
    for (let i = 0; i < this.N; i++) {
      this.r[i] /= denom;
    }
  }

  getWeight(i, j, velocity) {
    let diff = i - j;
    if (diff > this.N / 2) diff -= this.N;
    if (diff < -this.N / 2) diff += this.N;
    
    const distSq = diff * diff;
    const symmetric = Math.exp(-distSq / (2 * this.sigma * this.sigma));
    
    const gamma = 0.5;
    const asymmetry = 1.0 + gamma * velocity * diff;
    
    return symmetric * asymmetry - 0.2;
  }

  step(velocity, dt = 0.1) {
    const nextU = new Float64Array(this.N);
    const tau = 1.0;
    
    for (let i = 0; i < this.N; i++) {
      let recurrentInput = 0;
      for (let j = 0; j < this.N; j++) {
        recurrentInput += this.getWeight(i, j, velocity) * this.r[j];
      }
      const dU = (-this.U[i] + recurrentInput) / tau;
      nextU[i] = this.U[i] + dU * dt;
    }
    
    this.U = nextU;
    this.normalizeRates();
  }
}
