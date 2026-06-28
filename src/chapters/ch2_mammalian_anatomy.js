export const chapterData = {
  id: "ch2",
  title: "Macroscopic Neuroanatomy & Laminar Cytoarchitecture",
  summary: "An exploration of the brain's physical layout and the dense wiring inside. We see how the brain divides its duties, look at the staggering density of connections mapped by modern connectomics, and unpack the six-layered 'factory floor' of the neocortex.",
  sections: [
    {
      id: "ch2_sec1",
      title: "1. Macroscopic Architecture of the Mammalian Brain",
      highlightRegion: "neocortex",
      content: String.raw`
        <h3>1.1 The Brain's Major Divisions: Who Does What?</h3>
        <p>Before diving into the microscopic wiring of the brain, let's look at its physical layout. You can divide the mammalian brain into four major functional zones, each running its own set of control loops:</p>
        
        <ul>
          <li><strong>Cerebrum (Telencephalon):</strong> The massive, outer part. It contains the folded <span class="glossary-term" data-term="neocortex">neocortex</span> (our world simulator), the basal ganglia (which decide which action wins the competition), and the limbic structures (handling memory and emotion).</li>
          <li><strong>Diencephalon:</strong> The central dashboard located right underneath the cerebrum. Its main parts are the <strong>thalamus</strong> (the routing switchboard) and the <strong>hypothalamus</strong> (the thermostat of body survival).</li>
          <li><strong>Cerebellum (Metencephalon):</strong> The 'little brain' hanging off the back. Even though it is small, it contains **more than 80% of all the neurons** in your brain! It acts like a high-speed gyroscopic stabilizer. It receives copies of your motor plans, compares them to what is actually happening, and calculates error signals to make your movements smooth and precise.</li>
          <li><strong>Brainstem:</strong> The automatic engine room at the base. It keeps the heart beating and lungs pumping without you ever having to think about it, and pumps out chemical messengers (neuromodulators) to change the overall state of the brain.</li>
        </ul>

        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 800 300" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Cerebrum (Neocortex) -->
            <path d="M 150 150 C 120 50, 480 30, 480 120 C 480 180, 400 220, 350 220 C 300 220, 200 220, 150 150 Z" fill="rgba(0, 188, 255, 0.1)" stroke="var(--svg-cyan)" stroke-width="2.5" />
            <text x="300" y="110" fill="var(--svg-cyan)" font-family="Outfit" font-size="18" font-weight="bold" text-anchor="middle">Cerebrum (Neocortex)</text>
            <text x="300" y="130" fill="var(--svg-text-secondary)" font-family="Inter" font-size="12" text-anchor="middle">Planning & World Simulation</text>
            
            <!-- Diencephalon (Thalamus/Hypothalamus) -->
            <ellipse cx="320" cy="170" rx="60" ry="35" fill="rgba(255, 0, 127, 0.1)" stroke="var(--svg-magenta)" stroke-width="2" />
            <text x="320" y="168" fill="var(--svg-magenta)" font-family="Outfit" font-size="14" font-weight="bold" text-anchor="middle">Diencephalon</text>
            <text x="320" y="184" fill="var(--svg-text-secondary)" font-family="Inter" font-size="11" text-anchor="middle">Routing & Homeostasis</text>
            
            <!-- Cerebellum -->
            <path d="M 470 150 C 530 150, 560 230, 470 230 C 440 230, 430 190, 470 150 Z" fill="rgba(0, 230, 118, 0.1)" stroke="var(--svg-green)" stroke-width="2" />
            <text x="480" y="190" fill="var(--svg-green)" font-family="Outfit" font-size="14" font-weight="bold" text-anchor="middle">Cerebellum</text>
            <text x="480" y="205" fill="var(--svg-text-secondary)" font-family="Inter" font-size="10" text-anchor="middle">Gyroscopic Stabilizer</text>
            
            <!-- Brainstem -->
            <path d="M 320 205 L 320 280 L 370 280 L 370 205 Z" fill="rgba(255, 235, 59, 0.1)" stroke="var(--svg-yellow)" stroke-width="2" />
            <text x="390" y="245" fill="var(--svg-yellow-text)" font-family="Outfit" font-size="14" font-weight="bold" text-anchor="left">Brainstem</text>
            <text x="390" y="260" fill="var(--svg-text-secondary)" font-family="Inter" font-size="10" text-anchor="left">Engine Room (Auto-pilot)</text>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 2.1: The four main functional divisions of the mammalian brain, mapping basic autopilot systems to advanced simulation engines.</p>
        </div>

        <h3>1.2 The Neocortex: A General-Purpose Canvas</h3>
        <p>The <span class="glossary-term" data-term="neocortex">neocortex</span> is the folded sheet covering the top of the brain. In humans, it is heavily wrinkled to fit more surface area into the skull; in mice, it is smooth. But if you look under a microscope, you find something shocking: **the internal wiring is almost exactly the same** whether you look at the vision area, the hearing area, or the touch area.</p>
        <p>This structural uniformity suggests that the neocortex runs a single, general-purpose algorithm—often called the <strong>canonical cortical microcircuit</strong>. The cortex doesn't care if its inputs are photons from the eye or electrical pulses from a prosthetic limb; it shapes its connections to model the patterns in whatever data it receives.</p>
      `
    },
    {
      id: "ch2_sec2",
      title: "2. State-of-the-Art Connectomics",
      highlightRegion: "neocortex",
      content: String.raw`
        <h3>2.1 Five Kilometers of Wire in a Grain of Sand</h3>
        <p>How dense is the brain's wiring? Modern science can now map every single connection (synapse) in tiny blocks of brain tissue, a field called **connectomics**.</p>
        <p>Using advanced electron microscopes, projects like the MICrONS project have successfully mapped a single cubic millimeter ($1\,\text{mm}^3$) of a mouse's visual cortex. That is a piece of tissue about the size of a single grain of sand. Yet, inside that grain of sand, researchers found:</p>
        <ul>
          <li>Approximately <strong>100,000 neurons</strong>.</li>
          <li>Over <strong>1 billion synapses</strong> (connections).</li>
          <li><strong>4 kilometers of axons</strong> (sending wires) and <strong>1 kilometer of dendrites</strong> (receiving wires).</li>
        </ul>
        <p>If you unraveled the neural wiring inside a single grain of sand from the cortex, it would stretch for five kilometers! This gives you a sense of the sheer density and complexity of biological networks compared to flat, silicon computer chips.</p>

        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 800 240" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Sand grain representation -->
            <rect x="100" y="70" width="100" height="100" rx="15" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
            <text x="150" y="115" fill="var(--svg-cyan)" font-family="Outfit" font-size="28" text-anchor="middle">1 mm³</text>
            <text x="150" y="140" fill="var(--svg-text-secondary)" font-family="Inter" font-size="10" text-anchor="middle">(Grain of Sand)</text>
            
            <path d="M 200 120 L 320 120" fill="none" stroke="var(--border-color)" stroke-width="2" stroke-dasharray="5 5" />
            
            <!-- Stretched wire representation -->
            <g transform="translate(350, 0)">
              <!-- Spooky winding line to represent 5km -->
              <path d="M 30 120 Q 80 40, 130 120 T 230 120 T 330 120" fill="none" stroke="var(--svg-magenta)" stroke-width="3" />
              <text x="210" y="70" fill="var(--svg-magenta)" font-family="Outfit" font-size="22" font-weight="bold" text-anchor="middle">5 Kilometers of Wiring</text>
              <text x="210" y="165" fill="var(--svg-text-primary)" font-family="Inter" font-size="13" text-anchor="middle">100,000 Cells & 1 Billion Connections</text>
            </g>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 2.2: Staggering physical density of brain networks revealed by connectomics mapping.</p>
        </div>
      `
    },
    {
      id: "ch2_sec3",
      title: "3. Neocortical Laminar Cytoarchitecture & The Canonical Cortical Column",
      highlightRegion: "neocortex",
      content: String.raw`
        <h3>3.1 The Neocortical Factory Floor: Layers 1 to 6</h3>
        <p>The <span class="glossary-term" data-term="neocortex">neocortex</span> is divided horizontally into six distinct layers. To understand how they compute, think of them as a **vertical factory floor** with a clear division of labor:</p>

        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 800 400" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Layer blocks -->
            <!-- L1 -->
            <rect x="50" y="30" width="500" height="40" rx="4" fill="rgba(255,255,255,0.02)" stroke="var(--border-color)" />
            <text x="70" y="55" fill="var(--svg-text-primary)" font-family="Outfit" font-size="12" font-weight="bold">Layer 1: The Integration Roof (Apical Tufts)</text>
            
            <!-- L2/3 -->
            <rect x="50" y="80" width="500" height="70" rx="4" fill="rgba(0,188,255,0.05)" stroke="var(--svg-cyan)" stroke-width="1.5" />
            <text x="70" y="110" fill="var(--svg-cyan)" font-family="Outfit" font-size="12" font-weight="bold">Layer 2/3: The Processing Desks (Corticocortical)</text>
            <text x="70" y="130" fill="var(--svg-text-secondary)" font-family="Inter" font-size="10">Talks horizontally and routes outputs upward in the hierarchy.</text>
            
            <!-- L4 -->
            <rect x="50" y="160" width="500" height="50" rx="4" fill="rgba(0,230,118,0.05)" stroke="var(--svg-green)" stroke-dasharray="3 2" />
            <text x="70" y="190" fill="var(--svg-green)" font-family="Outfit" font-size="12" font-weight="bold">Layer 4: The Receiving Dock (Thalamic Input)</text>
            
            <!-- L5 -->
            <rect x="50" y="220" width="500" height="80" rx="4" fill="rgba(255,0,127,0.05)" stroke="var(--svg-magenta)" stroke-width="1.5" />
            <text x="70" y="250" fill="var(--svg-magenta)" font-family="Outfit" font-size="12" font-weight="bold">Layer 5: The Shipping Department (Subcortical Output)</text>
            <text x="70" y="270" fill="var(--svg-text-secondary)" font-family="Inter" font-size="10">Houses giant pyramidal cells that project actions down to muscles.</text>
            
            <!-- L6 -->
            <rect x="50" y="310" width="500" height="60" rx="4" fill="rgba(255,235,59,0.05)" stroke="var(--svg-yellow)" />
            <text x="70" y="340" fill="var(--svg-yellow-text)" font-family="Outfit" font-size="12" font-weight="bold">Layer 6: The Feedback Gate (Corticothalamic)</text>
            
            <!-- Flow arrows on the right -->
            <g transform="translate(600, 0)">
              <text x="70" y="55" fill="var(--svg-text-secondary)" font-family="Inter" font-size="12" text-anchor="middle">Expectations</text>
              <path d="M 70 65 L 70 120" fill="none" stroke="var(--svg-magenta)" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arrow-red)" />
              
              <text x="70" y="185" fill="var(--svg-text-secondary)" font-family="Inter" font-size="12" text-anchor="middle">Sensory Input</text>
              <path d="M 70 195 L 70 230" fill="none" stroke="var(--svg-green)" stroke-width="2" marker-end="url(#arrow)" />
              
              <text x="70" y="305" fill="var(--svg-text-secondary)" font-family="Inter" font-size="12" text-anchor="middle">Action Output</text>
              <path d="M 70 315 L 70 360" fill="none" stroke="var(--svg-cyan)" stroke-width="2" marker-end="url(#arrow)" />
            </g>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 2.3: Information routing within a cortical column. Raw input enters L4, processes in L2/3, fires actions in L5, and sends feedback through L6/1.</p>
        </div>

        <h3>3.2 Excitatory Workers and Inhibitory Brakes</h3>
        <p>About 80% of neocortical cells are **excitatory** (mostly pyramidal cells that pass active signals along). The remaining 20% are **inhibitory interneurons** that act as the brakes, control dials, and gates of the network. We can understand how they control the factory using three main types:</p>
        <ul>
          <li><strong>Parvalbumin-expressing (PV+) Cells (The Fast Brakes):</strong> These interneurons target the main bodies of pyramidal cells. They act like emergency brakes, firing extremely fast to shut down runaway signals. This rapid on-off firing creates **gamma oscillations (30-80 Hz)**, which act like a clock cycle synchronizing local neurons.</li>
          <li><strong>Somatostatin-expressing (SST+) Cells (The Roof Guards):</strong> These cells target the top branches (apical dendrites) in Layer 1. They act like guards checking incoming predictions. If they are active, they block top-down prediction inputs from integrating with sensory data.</li>
          <li><strong>Vasoactive Intestinal Peptide-expressing (VIP+) Cells (The Gate Openers):</strong> These cells specialize in targeting and silencing the SST+ guards. When the brain wants to pay attention to something, VIP+ cells fire, silencing the SST+ cells. This **disinhibition** (inhibiting the inhibitors) opens the gate, letting top-down predictions pass through to the pyramidal cells.</li>
        </ul>

        <h3>3.3 The Canonical Column: The Brain's Repeating Loop</h3>
        <p>By stacking these layers and cells, we get a **cortical column**. This repeating microcircuit processes information in a distinct loop: incoming sensory signals strike Layer 4, propagate up to Layer 2/3 to build a local consensus, drop down to Layer 5 to release actions, and send feedback via Layer 6 to dial down the incoming sensory gateway. Modern connectomics shows us that this column is not a rigid one-way pipe, but a highly recurrent engine capable of local learning and predicting.</p>
      `
    }
  ],
  quiz: [
    {
      question: "Which of the following analogies best maps the functional roles of the neocortical layers?",
      options: [
        "Layer 4 is the shipping department; Layer 5 is the receiving dock.",
        "Layer 4 is the receiving dock (sensory input); Layer 5 is the shipping department (action output); and Layer 1/6 handle feedback and predictions.",
        "Layer 1 is the power source; Layer 6 is the emergency brake.",
        "Layer 2/3 is the engine room (heartbeat); Layer 4 is the gyroscopic stabilizer."
      ],
      answerIndex: 1,
      explanation: "Layer 4 receives incoming feedforward sensory signals from the thalamus (the receiving dock), Layer 5 projects down to the brainstem and spinal cord to execute actions (the shipping department), while Layers 1 and 6 manage top-down expectations and feedback loop routing."
    },
    {
      question: "What is the role of VIP+ interneurons in regulating neocortical processing?",
      options: [
        "They target the muscles directly to drive rapid reflex actions.",
        "They act as the primary feedforward input to Layer 4.",
        "They inhibit Somatostatin-expressing (SST+) interneurons, removing the brake on apical dendrites and disinhibiting top-down prediction signals.",
        "They generate 30-80 Hz gamma oscillations by targeting the soma of pyramidal cells."
      ],
      answerIndex: 2,
      explanation: "VIP+ interneurons target SST+ interneurons. When VIP+ cells fire, they inhibit the SST+ cells, which normally act as brakes on the top-down dendritic inputs. This disinhibition allows predictions in Layer 1 to successfully integrate with the cell."
    },
    {
      question: "Which brain structure acts as a high-speed gyroscopic stabilizer, containing over 80% of the brain's neurons to correct errors in movement?",
      options: [
        "Cerebrum (neocortex)",
        "Diencephalon (thalamus)",
        "Cerebellum",
        "Brainstem"
      ],
      answerIndex: 2,
      explanation: "The Cerebellum acts as the brain's motion calibrator, housing the vast majority of its neurons in a highly regular grid. It compares copies of motor commands with real-time sensory feedback, calculating and correcting motor errors to keep actions smooth."
    }
  ]
};
