export const chapterData = {
  id: "ch1",
  title: "The Evolutionary Origins: From Reptiles to Mammals",
  summary: "A journey through time to see how the brain evolved. We trace its growth from a fast, direct reptilian controller to a layered mammalian simulator, look at the biophysics of the six-layered neocortex, and see how warm-blooded survival created the need for smart navigation and attention networks.",
  sections: [
    {
      id: "ch1_sec1",
      title: "1. The Triune Brain Model: A Structural and Functional Hierarchy",
      highlightRegion: "brainstem",
      content: String.raw`
        <h3>1.1 Building a Brain: The Historic City Analogy</h3>
        <p>If you were to design a brain from scratch, you might design a single, neat computer chip. But nature does not work like a microchip designer. Nature works like a builder renovating an ancient city. If you visit Rome or London, you see a modern subway line built right next to medieval brick walls, which themselves sit on stone foundations laid by the Romans. The old systems are never torn down completely; instead, new layers are stacked on top, connecting to and guiding the older layers below.</p>
        
        <p>A classic way to think about this evolutionary stack is **Paul MacLean's Triune Brain Model**. MacLean suggested that our brains contain three historic layers, each representing a big step in vertebrate history:</p>
        
        <ul>
          <li><strong>The Reptilian Foundation (Striatal-Brainstem System):</strong> This is the ancient cellar of the city. It coordinates basic survival—breathing, heartbeat, and rigid, automatic actions like freezing when a shadow passes over, or running away.</li>
          <li><strong>The Paleomammalian Addition (Limbic System):</strong> Deep inside, containing the <span class="glossary-term" data-term="hypothalamus">hypothalamus</span>, amygdala, and <span class="glossary-term" data-term="hippocampus">hippocampus</span>. This layer handles social bonds, emotions, feelings of pleasure or pain, and the ability to save memories of personal experiences.</li>
          <li><strong>The Neomammalian Roof (Neocortex-Thalamic System):</strong> The outer sheet, the <span class="glossary-term" data-term="neocortex">neocortex</span>, and its routing hub, the <span class="glossary-term" data-term="thalamus">thalamus</span>. This is the modern skyscraper on top, giving us high-level sensing, language, abstract reasoning, and the ability to simulate the future before we act.</li>
        </ul>

        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 800 320" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Definitions for arrows -->
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--svg-cyan)" />
              </marker>
              <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--svg-magenta)" />
              </marker>
            </defs>
            
            <!-- Left Panel: Reptilian Pathway -->
            <g transform="translate(10, 0)">
              <text x="180" y="35" text-anchor="middle" fill="var(--svg-text-primary)" font-family="Outfit" font-size="16" font-weight="bold">Reptilian Reflex Path (Midbrain-Centric)</text>
              <text x="180" y="55" text-anchor="middle" fill="var(--svg-text-secondary)" font-family="Inter" font-size="12">Direct, fast, and rigid mapping</text>
              
              <!-- Sensor -->
              <rect x="50" y="100" width="100" height="40" rx="6" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
              <text x="100" y="125" text-anchor="middle" fill="var(--svg-text-primary)" font-family="Inter" font-size="12">Sensory Input</text>
              
              <!-- Midbrain / Tectum -->
              <rect x="50" y="200" width="100" height="60" rx="6" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
              <text x="100" y="225" text-anchor="middle" fill="var(--svg-text-primary)" font-family="Inter" font-size="13" font-weight="600">Optic Tectum</text>
              <text x="100" y="245" text-anchor="middle" fill="var(--svg-text-secondary)" font-family="Inter" font-size="11">(Direct 3D Map)</text>
              
              <!-- Muscle -->
              <rect x="230" y="150" width="100" height="40" rx="6" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
              <text x="280" y="175" text-anchor="middle" fill="var(--svg-text-primary)" font-family="Inter" font-size="12">Motor Action</text>
              
              <!-- Connections -->
              <path d="M 100 140 L 100 192" fill="none" stroke="var(--svg-cyan)" stroke-width="2" marker-end="url(#arrow)" />
              <path d="M 150 230 L 280 230 L 280 198" fill="none" stroke="var(--svg-cyan)" stroke-width="2" marker-end="url(#arrow)" />
            </g>
            
            <!-- Separator Line -->
            <line x1="390" y1="20" x2="390" y2="300" stroke="var(--border-color)" stroke-dasharray="5 5" />
            
            <!-- Right Panel: Mammalian Pathway -->
            <g transform="translate(390, 0)">
              <text x="200" y="35" text-anchor="middle" fill="var(--svg-text-primary)" font-family="Outfit" font-size="16" font-weight="bold">Mammalian Loop Path (Forebrain-Centric)</text>
              <text x="200" y="55" text-anchor="middle" fill="var(--svg-text-secondary)" font-family="Inter" font-size="12">Recurrent simulation and evaluation</text>
              
              <!-- Sensor -->
              <rect x="30" y="180" width="90" height="35" rx="6" fill="var(--svg-bg-card)" stroke="var(--svg-magenta)" stroke-width="2" />
              <text x="75" y="202" text-anchor="middle" fill="var(--svg-text-primary)" font-family="Inter" font-size="11">Sensory Input</text>
              
              <!-- Thalamus -->
              <rect x="150" y="180" width="90" height="35" rx="6" fill="var(--svg-bg-card)" stroke="var(--svg-magenta)" stroke-width="2" />
              <text x="195" y="202" text-anchor="middle" fill="var(--svg-text-primary)" font-family="Inter" font-size="12" font-weight="600">Thalamus</text>
              
              <!-- Neocortex -->
              <rect x="150" y="90" width="90" height="45" rx="6" fill="var(--svg-bg-card)" stroke="var(--svg-magenta)" stroke-width="2" />
              <text x="195" y="110" text-anchor="middle" fill="var(--svg-text-primary)" font-family="Inter" font-size="12" font-weight="600">Neocortex</text>
              <text x="195" y="125" text-anchor="middle" fill="var(--svg-text-secondary)" font-family="Inter" font-size="9">(World Simulator)</text>
              
              <!-- Motor / Subcortical -->
              <rect x="270" y="180" width="90" height="35" rx="6" fill="var(--svg-bg-card)" stroke="var(--svg-magenta)" stroke-width="2" />
              <text x="315" y="202" text-anchor="middle" fill="var(--svg-text-primary)" font-family="Inter" font-size="11">Motor Action</text>
              
              <!-- Connections -->
              <path d="M 120 197 L 142 197" fill="none" stroke="var(--svg-magenta)" stroke-width="2" marker-end="url(#arrow-red)" />
              <path d="M 180 180 L 180 133" fill="none" stroke="var(--svg-magenta)" stroke-width="2" marker-end="url(#arrow-red)" />
              <path d="M 210 135 L 210 172" fill="none" stroke="var(--svg-magenta)" stroke-width="2" marker-end="url(#arrow-red)" />
              <path d="M 240 197 L 262 197" fill="none" stroke="var(--svg-magenta)" stroke-width="2" marker-end="url(#arrow-red)" />
              
              <!-- Recurrent simulation hint -->
              <path d="M 240 100 A 15 15 0 1 1 240 120" fill="none" stroke="var(--svg-magenta)" stroke-dasharray="3 2" stroke-width="1.5" />
            </g>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 1.1: Contrast between the reptilian direct response mapping and the mammalian thalamocortical loop, which runs an internal simulation to decide actions.</p>
        </div>

        <h3>1.2 The Triune Model through an Engineer's Eye</h3>
        <p>If you are an AI engineer designing autonomous agents, MacLean's model provides a very clean architectural blueprint. It maps directly to how we build control loops in software:</p>
        
        <blockquote>
          <strong>1. The Reactive Layer (Reptilian): Hardwired Rules</strong><br/>
          In robotics, simple controllers link sensors directly to motors. If the robot detects an obstacle, it immediately reverses. This is the reptilian way: low latency, zero thinking, and maximum survival probability.
        </blockquote>

        <blockquote>
          <strong>2. The Evaluative Layer (Paleomammalian): Reinforcement Learning</strong><br/>
          In an Actor-Critic system, the limbic system behaves like the "critic" and the generator of reward. The <span class="glossary-term" data-term="hypothalamus">hypothalamus</span> calculates basic metabolic errors (like running low on battery or fuel) and generates drive signals (hunger, thirst) to force the agent to find resources. The amygdala flags things in the environment as either good or scary, and the <span class="glossary-term" data-term="hippocampus">hippocampus</span> logs these memories so the agent knows what to repeat.
        </blockquote>

        <blockquote>
          <strong>3. The Cognitive Layer (Neomammalian): World Simulation & active inference</strong><br/>
          The <span class="glossary-term" data-term="neocortex">neocortex</span> is like a giant, uniform simulation engine. Rather than storing millions of individual hardwired rules, it continuously models the physics of the environment. It predicts what sensory inputs it will receive next, calculates prediction errors, and uses <span class="glossary-term" data-term="active_inference">active inference</span> to choose actions that match its goals.
        </blockquote>

        <h3>1.3 What Modern Biology Says</h3>
        <p>To be scientifically precise, we must add a quick detail: evolution did not literally build the brain by gluing a mammal cortex on top of an unchanged reptile brain. Reptiles themselves have evolved for millions of years, and they have parts in their brains that perform complex learning. However, as an engineering abstraction, MacLean's triune hierarchy remains incredibly useful. It shows us how layers of control can be nested together, where newer, slower simulation networks guide and override older, faster survival systems.</p>
      `
    },
    {
      id: "ch1_sec2",
      title: "2. Vertebrate Brain Evolution: The Shift from Midbrain to Forebrain",
      highlightRegion: "thalamus",
      content: String.raw`
        <h3>2.1 Sauropsids vs. Synapsids: Two Solutions to the Same Problem</h3>
        <p>About 300 million years ago, the land vertebrates split into two major branches: **sauropsids** (which became reptiles, dinosaurs, and birds) and **synapsids** (which became mammals). Each branch came up with a completely different way to process the world and move through it.</p>

        <h3>2.2 The Reptilian Optic Tectum: The Direct Coordinate Board</h3>
        <p>In reptiles, the main command center is the midbrain, specifically the **optic tectum** (in mammals, this was demoted to the <span class="glossary-term" data-term="superior_colliculus">superior colliculus</span>). The optic tectum is a beautifully structured 3D coordinate board:</p>
        <ul>
          <li><strong>Sensory Map:</strong> The top layers contain a map of visual space corresponding directly to the retina, layered on top of hearing and body maps.</li>
          <li><strong>Motor Map:</strong> Directly beneath these sensory maps is a motor projection map. If cells at coordinate $(x, y)$ are excited by a fly, they project signals straight down to the muscles in the neck and jaw to strike at coordinates $(x, y)$.</li>
        </ul>
        <p>This is incredibly fast and cheap in terms of energy. But it is locked to the immediate moment. If a fly appears, the reptile strikes. It is very hard for this feedforward coordinate board to plan ahead, resolve confusing sensations, or remember historical context to choose a different strategy.</p>

        <h3>2.3 The Mammalian Forebrain Transition: Adding a Gateway</h3>
        <p>When mammals evolved, the main sensory center moved from the midbrain up to the forebrain—specifically, to the <span class="glossary-term" data-term="thalamus">thalamus</span> and the <span class="glossary-term" data-term="neocortex">neocortex</span>.</p>
        <p>The old reptilian optic tectum was kept only for quick orientation reflexes and directing eye movements. The main sensory highway was redirected: signals from the eyes, ears, and skin now go first to the <span class="glossary-term" data-term="thalamus">thalamus</span>, which acts as the gatekeeper to the <span class="glossary-term" data-term="neocortex">neocortex</span>:</p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; border: 1px solid var(--border-color);">
          <thead>
            <tr style="background-color: rgba(255,255,255,0.05); border-bottom: 2px solid var(--border-color);">
              <th style="padding: 10px; text-align: left;">Sense</th>
              <th style="padding: 10px; text-align: left;">Reptilian Center</th>
              <th style="padding: 10px; text-align: left;">Mammalian Gateway (<span class="glossary-term" data-term="thalamus">Thalamus</span>)</th>
              <th style="padding: 10px; text-align: left;">Primary Target (Cortex)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 10px;"><strong>Vision</strong></td>
              <td style="padding: 10px;">Optic Tectum</td>
              <td style="padding: 10px;"><span class="glossary-term" data-term="lgn">Lateral Geniculate (LGN)</span></td>
              <td style="padding: 10px;">Primary Visual Cortex (V1)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 10px;"><strong>Hearing</strong></td>
              <td style="padding: 10px;">Torus Semicircularis</td>
              <td style="padding: 10px;">Medial Geniculate (MGN)</td>
              <td style="padding: 10px;">Primary Auditory Cortex (A1)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 10px;"><strong>Touch</strong></td>
              <td style="padding: 10px;">Midbrain Formations</td>
              <td style="padding: 10px;">Ventral Posterior Nuclei</td>
              <td style="padding: 10px;">Primary Somatosensory (S1)</td>
            </tr>
          </tbody>
        </table>

        <p>This was a revolution in brain philosophy. By separating sensory input from motor output, mammals introduced a simulator between the sense and the action. The neocortex doesn't just release automatic motor reactions. It models the environment, calculates consequences, and uses value cues from the limbic system to choose the best path forward.</p>
      `
    },
    {
      id: "ch1_sec3",
      title: "3. The Origin of the Neocortex: Laminar Microcircuits & Cortical Folding",
      highlightRegion: "neocortex",
      content: String.raw`
        <h3>3.1 From Three Layers to Six: Scaling the Simulator</h3>
        <p>The mammalian neocortex evolved from a simple, three-layered structure similar to the reptile's medial pallium (which became the mammalian <span class="glossary-term" data-term="hippocampus">hippocampus</span>). This ancient, three-layered cortex had a simple layout: an input layer on top, a central layer of signal-sending cell bodies in the middle, and an output layer on the bottom.</p>
        
        <p>In mammals, this template expanded vertically, dividing into the highly structured **six-layered neocortex** found in every mammal today. Why did it split into six layers?</p>

        <h3>3.2 The Cortical Factory Floor: Separating Predictions from Reality</h3>
        <p>The primary advantage of the six-layered <span class="glossary-term" data-term="laminar_architecture">laminar architecture</span> is that it physically separates the different directions of information flow. You can think of it like a factory floor with a clear division of labor:</p>
        <ul>
          <li><strong>Layer 4 (The Receiving Dock):</strong> This layer is packed with input cells. It receives raw feedforward signals from the thalamic gateway and sends them immediately to the upper layers.</li>
          <li><strong>Layers 2/3 (The Processing Desks):</strong> These layers contain pyramidal neurons with dense horizontal connections. They process sensory signals, communicate with neighboring columns, and project results up the hierarchy.</li>
          <li><strong>Layer 5 (The Shipping Department):</strong> This layer contains massive pyramidal cells that project down to the brainstem, spinal cord, and motor targets. These cells drive the physical actions of the body.</li>
          <li><strong>Layer 6 (The Feedback Gate):</strong> This layer projects directly back to the <span class="glossary-term" data-term="thalamus">thalamus</span>, adjusting the incoming sensory volume.</li>
          <li><strong>Layer 1 (The Feedback Integration Hub):</strong> This top molecular layer contains almost no cell bodies, but is packed with the top branches (apical dendrites) of cells from Layers 2/3 and 5. It receives descending predictions from higher cortical areas.</li>
        </ul>

        <p>This layout permits **apico-basal segregation**. The apical branches of a pyramidal cell reach all the way up to Layer 1 to receive top-down expectations (what the brain predicts will happen). Its basal branches sit in deeper layers, receiving bottom-up sensory data (what is actually happening). The cell body acts like a comparison detector. When predictions and actual sensory inputs line up, the cell fires bursts of electrical spikes, updating its internal model and passing the message along.</p>

        <h3>3.3 The Physics of Folding: Fitting the Tablecloth</h3>
        <p>The neocortex is a thin sheet about 2 to 4 millimeters thick. As mammals evolved bigger brains, they needed to fit more cortical sheet inside the skull. Imagine trying to fit a large, flat tablecloth into a small cup. The only way to do it is by folding and wrinkling it.</p>
        
        <p>This folding is called <span class="glossary-term" data-term="gyrification">gyrification</span>, creating <span class="glossary-term" data-term="gyri">gyri</span> (crests) and <span class="glossary-term" data-term="sulci">sulci</span> (valleys). This is driven by a simple physical process called <span class="glossary-term" data-term="differential_growth_buckling">differential growth buckling</span>: the outer gray matter sheet grows faster during embryonic development than the white matter core underneath, creating mechanical stress that buckles the sheet. We measure how folded a brain is using the <span class="glossary-term" data-term="gyrification_index">Gyrification Index ($GI$)</span>:</p>
        
        \[ GI = \frac{\text{Total Cortical Surface Area}}{\text{Exposed Cortical Surface Area}} \]
        
        <p>A smooth-brained mouse has a $GI$ of $1.0$. A human has a $GI$ of about $2.5$ to $3.0$, and dolphins can exceed $4.0$. This folding allowed the massive expansion of <span class="glossary-term" data-term="association_areas">association areas</span> (like the prefrontal cortex) that are completely uncoupled from raw inputs, allowing us to perform working memory, symbolic reasoning, and deep planning.</p>
      `
    },
    {
      id: "ch1_sec4",
      title: "4. Evolutionary Additions: Hypothalamic Endothermy & Hippocampal Navigation",
      highlightRegion: "hypothalamus",
      content: String.raw`
        <h3>4.1 The Nocturnal Mammalian Startup</h3>
        <p>Early mammals lived in the shadows of dinosaurs, surviving by hunting for insects at night. This active, nocturnal lifestyle required two massive innovations: **endothermy** (warm-bloodedness) and **complex spatial navigation**.</p>

        <h3>4.2 The Hypothalamus and the Homeostatic Thermostat</h3>
        <p>Warm-bloodedness allows mammals to run, hunt, and stay active in freezing night temperatures. But it has a massive cost: it requires about ten times more metabolic energy than being cold-blooded! To keep this expensive furnace running, early mammals needed a very precise regulatory system.</p>
        
        <p>This regulator is the <span class="glossary-term" data-term="hypothalamus">hypothalamus</span>. It is organized into specialized nuclei that monitor body variables against setpoints:</p>
        <ul>
          <li><strong>Preoptic Area (POA):</strong> The master thermostat, triggering shivering or blood vessel widening to regulate temperature.</li>
          <li><strong>Arcuate Nucleus (ARC):</strong> The fuel sensor, monitoring hunger hormones like leptin and ghrelin.</li>
          <li><strong>Suprachiasmatic Nucleus (SCN):</strong> The master clock, syncing internal processes to the 24-hour cycle.</li>
        </ul>
        
        <p>In computational terms, the hypothalamus represents the brain's **intrinsic loss function**. It calculates homeostatic error by comparing current body states $x$ against biological setpoints $x_{\text{set}}$:</p>

        \[ E_{\text{homeostatic}} = \sum_{i} w_i |x_i - x_{\text{set}, i}| \]

        <p>If this error rises, the hypothalamus triggers drive states (hunger, thirst, cold) that project to the cortex and basal ganglia, forcing the agent to select actions to minimize the error and survive.</p>

        <h3>4.3 The Hippocampus and the Cognitive Map</h3>
        <p>Because warm-blooded mammals need constant food, they had to forage over wide, complex areas. They could not rely on simple reflex paths anymore. This pressure drove the expansion of the three-layered <span class="glossary-term" data-term="hippocampus">hippocampus</span>, which developed a spatial navigation system:</p>
        <ul>
          <li><strong>Grid Cells:</strong> Located in the Medial Entorhinal Cortex, they fire in repeating hexagonal coordinates across space, acting like virtual graph paper to measure distance.</li>
          <li><strong>Place Cells:</strong> Located in the hippocampus, they fire only when the animal is in a specific location, anchoring the coordinate grid to visual landmarks.</li>
        </ul>
        <p>This system allows **model-based learning**: instead of learning simple rules like "turn left at the green rock," mammals build a map of the room, enabling them to calculate shortcuts and remember where food was found.</p>
      `
    },
    {
      id: "ch1_sec5",
      title: "5. Placental Mammals: Thalamocortical Routing & Interhemispheric Integration",
      highlightRegion: "neocortex",
      content: `
        <h3>5.1 The Placental Upgrade</h3>
        <p>With the rise of placental mammals, the brain underwent further structural changes to support rapid communication, fine motor skills, and focused attention.</p>

        <h3>5.2 The Corpus Callosum: The Interhemispheric Fiber Bridge</h3>
        <p>Primitive egg-laying mammals (monotremes) and marsupials communicate between their left and right hemispheres using small, ancient nerve bundles. Placental mammals evolved the **corpus callosum**—a massive bridge containing hundreds of millions of myelinated fibers.</p>
        <p>This high-bandwidth cable connects corresponding points in the left and right neocortex, allowing the brain to merge the left and right halves of the visual field into a single, unified picture, and coordinate both hands to use tools.</p>

        <h3>5.3 Attention Routing: Gating the Sensory Floodgate</h3>
        <p>Because the neocortex is a massive simulation engine, it is easily overwhelmed by data. If you tried to process every photon, sound, and touch at once, your brain would run out of energy. The solution is **attention**, managed by the <span class="glossary-term" data-term="thalamus">thalamus</span> via two classes of routing projections:</p>
        <ul>
          <li><strong>Core Projections (The Cables):</strong> Target Layer 4 of specific cortical areas, carrying high-fidelity sensory data.</li>
          <li><strong>Matrix Projections (The Dials):</strong> Target Layer 1 of multiple areas, adjusting overall neural sensitivity and synchronizing firing.</li>
        </ul>

        <p>The gatekeeper of this pathway is the **Thalamic Reticular Nucleus (TRN)**, a thin sheet of inhibitory cells that wraps around the thalamus like a sleeve. The TRN receives branches from all signals moving between the thalamus and cortex, and projects inhibitory signals back into the thalamic relay cells.</p>
        <p>This works like a **biological attention router**. By selectively silencing specific thalamic loops, the TRN can block distracting noise and let the prefrontal cortex focus on the information relevant to the current task.</p>
      `
    }
  ],
  quiz: [
    {
      question: "Which of the following describes the key shift in sensory-motor philosophy from reptiles to mammals?",
      options: [
        "Sensory processing moved from a direct, reflex-like midbrain mapping (optic tectum) to a forebrain loop (thalamocortical system) that simulates the world and decouples senses from immediate actions.",
        "Sensory processing moved from the cortex to the cerebellum to allow for faster feedforward actions.",
        "The basal ganglia was lost, which removed the ability of mammals to calculate emotional values.",
        "The six-layered neocortex was simplified into a three-layered structure to make processing faster."
      ],
      answerIndex: 0,
      explanation: "Reptiles rely on the midbrain's optic tectum to map senses directly to reflex strikes. Mammals rerouted these inputs through the thalamus to the neocortex, running a world simulator that allows evaluating options before executing actions."
    },
    {
      question: "How do the layers of the neocortex support predictive coding in mammals?",
      options: [
        "By merging all inputs into Layer 4 to speed up transmission.",
        "By separating inputs: bottom-up sensory data targets Layer 4, while top-down predictions target Layer 1, allowing pyramidal cells to act as local comparators.",
        "By using Layer 6 to directly control muscle actions, bypassing the brainstem.",
        "By completely removing inhibitory interneurons to prevent feedback loops."
      ],
      answerIndex: 1,
      explanation: "The six-layered neocortex separates information flows: bottom-up sensory inputs go to Layer 4, while top-down expectations enter Layer 1. Pyramidal neurons compare these two streams to calculate prediction errors when expectations do not match reality."
    },
    {
      question: "Why was the transition to warm-bloodedness (endothermy) a major driver for the evolution of the mammalian hippocampus?",
      options: [
        "Warm-bloodedness required a larger visual cortex to see in the dark.",
        "Endothermy is metabolically expensive, requiring mammals to forage over much larger, complex territories, which drove the development of a cognitive map (grid and place cells).",
        "It allowed the corpus callosum to operate at a higher temperature, increasing conduction speeds.",
        "It replaced model-based planning with simple feedforward reflexes to save energy."
      ],
      answerIndex: 1,
      explanation: "Maintaining a warm body temperature requires ten times more food. This high demand forced early mammals to actively forage over large areas, driving the expansion of the hippocampus to build cognitive spatial maps (using grid cells and place cells) to locate food and return home."
    }
  ]
};
