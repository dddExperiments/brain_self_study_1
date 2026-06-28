export const chapterData = {
  id: "ch5",
  title: "The Sensorimotor Visual Pathway: From Photons to Motor Commands",
  summary: "A complete tour of the visual loop. We trace how photons silence photoreceptors in a backward nightlight cascade, how V1 processes edges and filters out expectations, how the midbrain makes motor decisions, and how eye movements require a two-part push-and-hold controller.",
  sections: [
    {
      id: "ch5_sec1",
      title: "1. Signal Generation: Phototransduction and Retinal Circuitry",
      highlightRegion: "visual_pathway",
      content: String.raw`
        <h3>1.1 Phototransduction: The Backward Nightlight</h3>
        <p>If you were building a camera, you would probably design sensors that turn ON when light hits them. But the eye does something counter-intuitive: **light turns the sensor cells OFF**.</p>
        
        <p>In the dark, a photoreceptor (a rod or cone) is active and shouting. It is held depolarized by a chemical called cGMP, which keeps ion channels open. This constant influx of charge, called the **"dark current,"** causes the cell to continuously release the chemical messenger glutamate onto downstream cells.</p>
        
        <p>When a photon of light hits the light-sensitive pigment **rhodopsin**, it triggers a biochemical domino effect. Rhodopsin activates a G-protein called **transducin**, which turns on an enzyme that breaks down cGMP. As cGMP levels drop, the channels slam shut, stopping the dark current. The cell goes quiet (hyperpolarizes), and glutamate release drops. The brain detects light not by noticing when a cell starts firing, but by noticing when it *stops* talking!</p>

        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 600 220" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Dark State -->
            <g transform="translate(10, 0)">
              <text x="140" y="30" fill="var(--svg-text-secondary)" font-family="Outfit" font-size="14" font-weight="bold" text-anchor="middle">In the Dark (Active Shouting)</text>
              <rect x="50" y="60" width="180" height="80" rx="8" fill="var(--svg-bg-card)" stroke="var(--svg-magenta)" stroke-width="2" />
              <text x="140" y="90" fill="var(--svg-magenta)" font-family="Inter" font-size="12" font-weight="bold" text-anchor="middle">Channels OPEN (cGMP High)</text>
              <text x="140" y="110" fill="var(--svg-text-primary)" font-family="Inter" font-size="10" text-anchor="middle">Continuous Glutamate Release</text>
              
              <path d="M 140 140 L 140 180" fill="none" stroke="var(--svg-magenta)" stroke-width="2" marker-end="url(#arrow-red)" />
              <text x="140" y="195" fill="var(--svg-text-secondary)" font-family="Inter" font-size="10" text-anchor="middle">Downstream cells kept inhibited</text>
            </g>
            
            <!-- Separator -->
            <line x1="300" y1="20" x2="300" y2="200" stroke="var(--border-color)" stroke-dasharray="4 4" />
            
            <!-- Light State -->
            <g transform="translate(290, 0)">
              <text x="150" y="30" fill="var(--svg-yellow-text)" font-family="Outfit" font-size="14" font-weight="bold" text-anchor="middle">In the Light (Silenced)</text>
              <rect x="60" y="60" width="180" height="80" rx="8" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
              <text x="150" y="90" fill="var(--svg-cyan)" font-family="Inter" font-size="12" font-weight="bold" text-anchor="middle">Channels CLOSED (cGMP Low)</text>
              <text x="150" y="110" fill="var(--svg-text-primary)" font-family="Inter" font-size="10" text-anchor="middle">Glutamate stops releasing</text>
              
              <path d="M 150 140 L 150 180" fill="none" stroke="var(--svg-cyan)" stroke-width="2" marker-end="url(#arrow)" />
              <text x="150" y="195" fill="var(--svg-text-primary)" font-family="Inter" font-size="10" text-anchor="middle">ON-bipolar cells released to fire!</text>
            </g>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 5.1: The phototransduction cascade. Light closes channels, turning off the cell's baseline signal.</p>
        </div>

        <h3>1.2 ON and OFF Channels: Splitting the Contrast</h3>
        <p>Bipolar cells connect directly to the photoreceptors and split visual processing into two parallel paths to handle contrast:</p>
        <ul>
          <li><strong>ON Cells:</strong> These cells are kept shut down by glutamate in the dark. When light turns off the photoreceptor's glutamate release, the brake is lifted and the ON cell depolarizes (fires).</li>
          <li><strong>OFF Cells:</strong> These cells use glutamate as an accelerator. When glutamate drops due to light, they go quiet. They fire when light drops (darkness increases).</li>
        </ul>

        <h3>1.3 Center-Surround Fields: The Edge Outliner</h3>
        <p>Before signals leave the retina, they pass through horizontal cells that provide **lateral inhibition**—subtracting the average light levels of the surrounding area from the center. This creates **center-surround antagonism** in Retinal Ganglion Cells (RGCs).</p>
        <p>This is mathematically equivalent to a **Difference of Gaussians (DoG)** filter, which acts as a spatial edge detector. By ignoring uniform brightness (like a blank wall) and only transmitting contrast borders, the retina saves massive bandwidth, passing only outline information to the brain.</p>

        <h3>1.4 Coding Parallel: Receptive Field Kernel</h3>
        <pre><code>function createDoGFilter(size, sigmaCenter, sigmaSurround) {
  const kernel = [];
  const half = Math.floor(size / 2);
  let sum = 0;
  for (let y = -half; y <= half; y++) {
    const row = [];
    for (let x = -half; x <= half; x++) {
      const r2 = x*x + y*y;
      const center = (1 / (2 * Math.PI * sigmaCenter**2)) * Math.exp(-r2 / (2 * sigmaCenter**2));
      const surround = (1 / (2 * Math.PI * sigmaSurround**2)) * Math.exp(-r2 / (2 * sigmaSurround**2));
      const val = center - surround;
      row.push(val);
      sum += val;
    }
    kernel.push(row);
  }
  return kernel.map(row => row.map(v => v - sum / (size * size)));
}</code></pre>
      `
    },
    {
      id: "ch5_sec2",
      title: "2. Thalamic Gating: LGN Laminar Architecture and Modulatory Gating",
      highlightRegion: "thalamus",
      content: String.raw`
        <h3>2.1 The Thalamic Switchboard</h3>
        <p>Retinal ganglion cell axons bundle together to form the optic nerve and project to the <span class="glossary-term" data-term="lgn">Lateral Geniculate Nucleus (LGN)</span> of the thalamus. The LGN has a clean, six-layered structure split into two main highways:</p>
        <ul>
          <li><strong>Magnocellular Pathway (Layers 1-2):</strong> Large cells, fast-acting but color-blind, specialized for motion and shapes.</li>
          <li><strong>Parvocellular Pathway (Layers 3-6):</strong> Smaller cells, slower but color-sensitive, specialized for fine details and textures.</li>
        </ul>

        <h3>2.2 Gating: The Active Gatekeeper</h3>
        <p>Only **10% to 20%** of the connections inside the LGN come from the eyes. The remaining 80%+ come from the primary visual cortex (Layer 6 feedback) and the TRN attention guard. The LGN is not a passive routing cable. It is an active gateway that dial signals down if they match predictions, and lets them through if they are surprising or important.</p>
      `
    },
    {
      id: "ch5_sec3",
      title: "3. Neocortical Processing: Primary Visual Cortex (V1) and Hierarchical Predictive Coding",
      highlightRegion: "neocortex",
      content: String.raw`
        <h3>3.1 Simple and Complex Windows</h3>
        <p>Visual signals enter V1 at Layer 4C. From there, they split into two main types of orientation detectors:</p>
        <ul>
          <li><strong>Simple Cells:</strong> Fire only when a bar of light is at a specific angle and in a precise spot. They are modeled as Gabor filters.</li>
          <li><strong>Complex Cells:</strong> Selective for an angle, but exhibit **translation invariance**—they fire if the bar of light is at that angle anywhere inside their field of view. They do this by pooling inputs from many simple cells.</li>
        </ul>

        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 600 240" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Eye -->
            <circle cx="60" cy="120" r="30" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
            <text x="60" y="125" fill="var(--svg-text-primary)" font-family="Inter" font-size="11" text-anchor="middle">Eye</text>
            
            <!-- LGN -->
            <rect x="140" y="95" width="70" height="50" rx="4" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
            <text x="175" y="125" fill="var(--svg-text-primary)" font-family="Inter" font-size="11" text-anchor="middle">LGN</text>
            
            <!-- V1 -->
            <rect x="260" y="70" width="90" height="100" rx="4" fill="var(--svg-bg-card)" stroke="var(--svg-magenta)" stroke-width="2" />
            <text x="305" y="110" fill="var(--svg-magenta)" font-family="Outfit" font-size="14" font-weight="bold" text-anchor="middle">V1 Cortex</text>
            <text x="305" y="130" fill="var(--svg-text-secondary)" font-family="Inter" font-size="9" text-anchor="middle">(L4 -> L2/3 -> L5)</text>
            
            <!-- Colliculus -->
            <rect x="400" y="95" width="80" height="50" rx="4" fill="var(--svg-bg-card)" stroke="var(--svg-green)" stroke-width="2" />
            <text x="440" y="120" fill="var(--svg-text-primary)" font-family="Inter" font-size="10" text-anchor="middle">Superior</text>
            <text x="440" y="132" fill="var(--svg-text-primary)" font-family="Inter" font-size="10" text-anchor="middle">Colliculus</text>
            
            <!-- Muscles -->
            <circle cx="530" cy="120" r="25" fill="var(--svg-bg-card)" stroke="var(--svg-yellow)" stroke-width="2" />
            <text x="530" y="123" fill="var(--svg-text-primary)" font-family="Inter" font-size="9" text-anchor="middle">Eye Motor</text>
            
            <!-- Pathways -->
            <path d="M 90 120 L 138 120" fill="none" stroke="var(--svg-cyan)" stroke-width="2" marker-end="url(#arrow)" />
            <path d="M 210 120 L 258 120" fill="none" stroke="var(--svg-cyan)" stroke-width="2" marker-end="url(#arrow)" />
            <path d="M 350 120 L 398 120" fill="none" stroke="var(--svg-magenta)" stroke-width="2" marker-end="url(#arrow-red)" />
            <path d="M 480 120 L 503 120" fill="none" stroke="var(--svg-green)" stroke-width="2" marker-end="url(#arrow)" />
            
            <!-- Corticothalamic Feedback loop -->
            <path d="M 305 170 L 305 200 L 175 200 L 175 148" fill="none" stroke="var(--svg-yellow)" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#arrow)" />
            <text x="240" y="195" fill="var(--svg-yellow-text)" font-family="Inter" font-size="9" text-anchor="middle">Feedback Gating</text>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 5.2: The sensorimotor loop of visual gating, predictive analysis, and motor saccade control.</p>
        </div>

        <h3>3.2 Explaining Away: Predictive Coding</h3>
        <p>In V1, processing operates in a continuous loop. Instead of just filtering inputs, the cortex compares sensory inputs with expectations:</p>
        <p>Let $y_l$ be the sensory activity at area $l$. The higher area $l+1$ generates a prediction $\hat{y}_l = f(U_l \cdot y_{l+1})$. The prediction error $e_l$ is calculated locally:</p>
        <pre><code>e_l = y_l - f(U_l * y_{l+1})</code></pre>
        <ul>
          <li><strong>Deep Layers (L5/6):</strong> Send predictions *downward* to target lower areas.</li>
          <li><strong>Superficial Layers (L2/3):</strong> Compute the prediction error $e_l$ and send it *upward* to higher areas.</li>
        </ul>
        <p>If the prediction is correct, the error is zero, and the lower cells are silenced. The input is "explained away." The brain only spends energy passing along *surprises* that violate expectations.</p>
      `
    },
    {
      id: "ch5_sec4",
      title: "4. Motor Decision: Frontal Eye Fields and Superior Colliculus",
      highlightRegion: "visual_pathway",
      content: String.raw`
        <h3>4.1 Saliency Maps and Gaze Targets</h3>
        <p>Visual information splits into the ventral stream ("what" pathway for object identification) and the dorsal stream ("where" pathway for action guidance). They converge in two main structures to guide eye movements: the **Frontal Eye Fields (FEF)** in the prefrontal cortex and the <span class="glossary-term" data-term="superior_colliculus">Superior Colliculus (SC)</span> in the midbrain.</p>
        <p>The FEF integrates goals with visual features, containing visual, motor, and visuomotor cells. It sends planned gaze targets down to the Superior Colliculus.</p>

        <h3>4.2 Gating: Basal Ganglia Disinhibition</h3>
        <p>To prevent the eyes from twitching chaotically at every shadow, the motor layers of the Superior Colliculus are kept under heavy, constant inhibition by the Substantia Nigra pars reticulata (SNr) (a basal ganglia control hub).</p>
        <p>When the FEF chooses a target, it fires signals to the striatum, which inhibits the SNr. This transiently lifts the inhibitory "brake." Released from inhibition (disinhibited), the motor neurons in the Colliculus fire a burst to trigger the eye movement.</p>
      `
    },
    {
      id: "ch5_sec5",
      title: "5. Motor Execution: Cranial Motor Nuclei and Extraocular Dynamics",
      highlightRegion: "visual_pathway",
      content: String.raw`
        <h3>5.1 The Boat in Syrup: Pulse-Step Control</h3>
        <p>Moving the eyeball inside its socket is mechanically like moving a heavy boat in thick syrup. The socket tissue is thick and viscous, and the muscles are springy. If you want to move the eye quickly and keep it there, you cannot just send a steady signal. You need a two-part command called a **Pulse-Step**:</p>
        <ul>
          <li><strong>The Pulse:</strong> A high-frequency, rapid burst of action potentials (velocity command) that overcomes the thick drag of the socket, shoving the eye quickly to its new spot.</li>
          <li><strong>The Step:</strong> A steady, sustained firing rate (position command). Once the eye is in place, this steady tension holds it there, preventing the springy muscles from dragging it back to the center.</li>
        </ul>

        <h3>5.2 The Neural Integrator</h3>
        <p>Mathematically, the step is the time-integral of the pulse. This integration is calculated by a loop of neurons in the brainstem called the **Neural Integrator**. If this integrator loop leaks, the eye cannot hold its position. It slowly drifts back to the center, followed by a quick, corrective jump—a condition called **nystagmus**.</p>
      `
    },
    {
      id: "ch5_sec6",
      title: "6. Closed-Loop Homeostasis: The Pupillary Light Reflex",
      highlightRegion: "visual_pathway",
      content: String.raw`
        <h3>6.1 The Consensual Reflex Loop</h3>
        <p>The <span class="glossary-term" data-term="pupillary_reflex">pupillary light reflex (PLR)</span> is a subcortical feedback loop that regulates pupil diameter to protect the retina from bright light. It is a classic closed-loop negative feedback system:</p>

        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 600 240" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Light -->
            <text x="60" y="125" fill="var(--svg-yellow-text)" font-family="Outfit" font-size="16" font-weight="bold" text-anchor="middle">Light Input</text>
            
            <!-- Eye -->
            <rect x="130" y="100" width="80" height="40" rx="4" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
            <text x="170" y="125" fill="var(--svg-text-primary)" font-family="Inter" font-size="11" text-anchor="middle">Retina (ipRGCs)</text>
            
            <!-- Pretectum -->
            <rect x="250" y="100" width="80" height="40" rx="4" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
            <text x="290" y="125" fill="var(--svg-text-primary)" font-family="Inter" font-size="11" text-anchor="middle">OPN (Midbrain)</text>
            
            <!-- EW Nuclei -->
            <rect x="370" y="100" width="80" height="40" rx="4" fill="var(--svg-bg-card)" stroke="var(--svg-magenta)" stroke-width="2" />
            <text x="410" y="125" fill="var(--svg-text-primary)" font-family="Inter" font-size="11" text-anchor="middle">EW Nucleus</text>
            
            <!-- Iris -->
            <circle cx="520" cy="120" r="25" fill="var(--svg-bg-card)" stroke="var(--svg-green)" stroke-width="2" />
            <text x="520" y="123" fill="var(--svg-text-primary)" font-family="Inter" font-size="9" text-anchor="middle">Pupil Iris</text>
            
            <!-- Flow -->
            <path d="M 95 120 L 128 120" fill="none" stroke="var(--svg-yellow)" stroke-width="2" marker-end="url(#arrow)" />
            <path d="M 210 120 L 248 120" fill="none" stroke="var(--svg-cyan)" stroke-width="2" marker-end="url(#arrow)" />
            <path d="M 330 120 L 368 120" fill="none" stroke="var(--svg-cyan)" stroke-width="2" marker-end="url(#arrow)" />
            <path d="M 450 120 L 493 120" fill="none" stroke="var(--svg-magenta)" stroke-width="2" marker-end="url(#arrow-red)" />
            
            <!-- Negative feedback path -->
            <path d="M 520 95 C 520 50, 170 50, 170 98" fill="none" stroke="var(--svg-green)" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#arrow)" />
            <text x="345" y="45" fill="var(--svg-green)" font-family="Inter" font-size="10" text-anchor="middle">Negative Feedback: Constricts pupil to reduce light</text>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 5.3: Closed-loop control block diagram of the Pupillary Light Reflex.</p>
        </div>

        <p>1. Special light-sensitive ganglion cells (ipRGCs) measure average brightness and project to the **Olivary Pretectal Nucleus (OPN)**.<br/>
        2. The OPN projects bilaterally to both the left and right **Edinger-Westphal (EW)** nuclei. This bilateral crossing ensures a consensual response: shining a light in one eye constricts both pupils.<br/>
        3. The EW nuclei send signals through the oculomotor nerve to the ciliary ganglion, which triggers the iris muscle to constrict.</p>

        <h3>6.2 Feedback Delays and Oscillations</h3>
        <p>Because smooth muscles are slow to contract, the PLR has a feedback delay $\tau$ of about 300 ms. In control theory, if you increase the feedback gain in a delayed system, it becomes unstable and begins to oscillate. You can test this by shining a narrow beam of light right at the edge of the pupil. The pupil constricts, blocking the light; which causes it to dilate, exposing the light, causing it to constrict again. This stable rhythm of dilation and constriction is called **pupillary hippus**—a biological limit cycle oscillation.</p>
      `
    }
  ],
  quiz: [
    {
      question: "Why is phototransduction in the retina considered a 'backward' cascade?",
      options: [
        "Light shuts down the baseline current and silences the cell, rather than exciting it.",
        "It projects signals backward from the brainstem into the eye.",
        "It uses only post-synaptic receptors to transmit information.",
        "It relies exclusively on the cerebellum to compute color vectors."
      ],
      answerIndex: 0,
      explanation: "In the dark, a photoreceptor is kept depolarized (active) by cGMP channels. Light breaks down cGMP, closing these channels, hyperpolarizing (silencing) the cell, and reducing glutamate release. Therefore, light turns off the active signal."
    },
    {
      question: "In predictive coding, what is the role of Layer 2/3 (superficial layers) in the visual cortex?",
      options: [
        "To project muscle-moving commands to the spinal cord.",
        "To switch the LGN into tonic firing mode.",
        "To compute the difference between actual input and top-down predictions (prediction error) and send it up the hierarchy.",
        "To perform the dark current cascade."
      ],
      answerIndex: 2,
      explanation: "Superficial layers (L2/3) house error units that calculate prediction errors ($e_l$) by subtracting top-down predictions from sensory signals. These error signals are sent upward to higher cortical areas."
    },
    {
      question: "What is the purpose of the 'pulse' and 'step' commands in eye movement control?",
      options: [
        "The pulse manages vertical coordinates; the step manages horizontal coordinates.",
        "The pulse is a high-frequency burst to overcome viscous orbital resistance; the step is a steady rate to hold the eye position against muscle elasticity.",
        "The pulse constricts the pupil; the step dilates it.",
        "The pulse is generated by the OPN; the step is generated by the LGN."
      ],
      answerIndex: 1,
      explanation: "To move the eye quickly, a high-frequency velocity 'pulse' is required to overcome viscous drag. To hold the eye in the new position, a constant, tonic 'step' is needed to resist elastic forces. Failure of the step generator causes the eye to drift back to center (nystagmus)."
    },
    {
      question: "What causes pupillary hippus (rhythmic pupil oscillations) under high gain conditions?",
      options: [
        "A lack of myelin on the abducens nerve.",
        "A structural failure of the corpus callosum.",
        "The presence of a loop delay (approx. 300 ms) in the negative feedback reflex path, which causes overcorrection when gain is high.",
        "Direct synchronization of SCN clock genes."
      ],
      answerIndex: 2,
      explanation: "Pupillary hippus is a limit cycle oscillation caused by feedback delay (around 300 ms in smooth muscle kinetics). When feedback gain is artificially increased, the delayed negative feedback behaves like positive feedback, causing the system to overcorrect and oscillate."
    }
  ]
};
