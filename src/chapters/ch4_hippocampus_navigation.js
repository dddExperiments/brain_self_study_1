export const chapterData = {
  id: "ch4",
  title: "Spatial Navigation & Episodic Memory: The Hippocampal-Entorhinal System",
  summary: "An exploration of the brain's internal GPS. We see how grid cells draw virtual floor tiles and place cells identify landmarks, look at how the hippocampus stores memories in a web of associations, and examine how sleep ripples copy notes from a temporary pad to the permanent cortex.",
  sections: [
    {
      id: "ch4_sec1",
      title: "1. The Hippocampus: Anatomy, Circuitry, and Memory Consolidation",
      highlightRegion: "hippocampus",
      content: String.raw`
        <h3>1.1 The Seahorse in the Middle Temple</h3>
        <p>Deep inside the brain's temporal lobe sits a curved structure called the <span class="glossary-term" data-term="hippocampus">hippocampus</span> (named after the Greek word for seahorse due to its shape). It is the master manager of our autobiographical memories (our personal diary of events) and our spatial maps.</p>
        
        <h3>1.2 The Trisynaptic Circuit: The Three-Step Loop</h3>
        <p>Information enters the hippocampus through a famous one-way highway called the **trisynaptic circuit**. Sensory inputs from the neocortex converge in the **Entorhinal Cortex (EC)** (the gateway), which projects into the hippocampus through three sequential steps:</p>
        <ol>
          <li><strong>Step 1:</strong> Axons from the Entorhinal Cortex project to the <strong>Dentate Gyrus (DG)</strong>.</li>
          <li><strong>Step 2:</strong> Dentate Gyrus cells project to the pyramidal cells of the <strong>CA3</strong> subfield.</li>
          <li><strong>Step 3:</strong> CA3 cells project their axons to the dendrites of the <strong>CA1</strong> subfield.</li>
        </ol>
        <p>From CA1, signals project to the Subiculum and loop back to the deep layers of the Entorhinal Cortex, returning the processed results to the neocortex where they started.</p>

        <h3>1.3 The Subfields: Keeping Memories Clean and Whole</h3>
        <p>Each subfield in this loop has a very specific job to do, which we can understand using simple analogies:</p>
        <ul>
          <li>
            <strong>Dentate Gyrus (Pattern Separation - The Diary Pages):</strong> Imagine parking your car in slot 14 today, and slot 15 tomorrow. If you wrote both events on the same page of a notepad, they would blur together. The Dentate Gyrus acts like a diary with millions of pages. It has a massive population of neurons that are kept under tight inhibition. Only a tiny fraction fire at any time. It separates similar inputs (slot 14 vs. 15) into completely distinct neural codes, ensuring your memories do not get jumbled.
          </li>
          <li>
            <strong>CA3 Recurrent Network (Pattern Completion - The Web of Associations):</strong> CA3 pyramidal cells are highly interconnected—each cell loops back to connect to thousands of its neighbors, forming a dense web. During learning, Hebbian rules strengthen the links between cells that fire together. If someone later hums just a tiny fragment of a song (a partial cue), the electrical activity spreads through these pre-strengthened loops, pulling the entire memory out of the web. This is pattern completion.
          </li>
          <li>
            <strong>CA1 (The Comparator):</strong> CA1 receives two lines of communication: the completed memory from CA3, and the direct, raw sensory input from the Entorhinal Cortex. It acts like an editor, comparing what we *predicted* would happen (from CA3) with what we are *actually* seeing (from EC), and formatting the difference to send back to the neocortex.
          </li>
        </ul>

        <h3>1.4 Saving Memories: The Sleeping Notepad</h3>
        <p>The hippocampus is optimized for rapid, one-trial learning. It acts like a temporary scratchpad, writing down new events quickly. But the scratchpad is small, and if you keep writing on it, you will overwrite old notes. The permanent library is the neocortex, which learns slowly to extract general patterns.</p>
        <p>How do notes get moved from the temporary scratchpad to the permanent library? While you sleep or rest, the hippocampus runs **systems consolidation**. It plays back the day's experiences in high-frequency bursts called **sharp-wave ripples**. These replays occur up to 20 times faster than real-world speed. This rapid play acts as a trainer, driving synaptic changes in the neocortex to consolidate the memories into the stable, long-term cortical networks.</p>
      `
    },
    {
      id: "ch4_sec2",
      title: "2. Grid Cells (Medial Entorhinal Cortex): The Metric Coordinate System",
      highlightRegion: "neocortex",
      content: String.raw`
        <h3>2.1 The Hexagonal Floor Tiles</h3>
        <p>While place cells fire in response to landmarks, the brain needs a way to measure distance itself, even in the dark. In 2005, researchers discovered <span class="glossary-term" data-term="grid_cells">grid cells</span> in the Medial Entorhinal Cortex (MEC). Unlike place cells, which fire in only one spot, a single grid cell fires at multiple regularly spaced locations. These firing peaks form a perfect periodic, hexagonal grid covering the entire floor of the environment.</p>

        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 600 240" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Rodent path (dashed) -->
            <path d="M 50 180 Q 150 50, 250 150 T 450 100 T 550 180" fill="none" stroke="var(--svg-text-secondary)" stroke-width="2" stroke-dasharray="4 4" opacity="0.4" />
            
            <!-- Hexagonal lattice grid points -->
            <!-- Row 1 -->
            <circle cx="100" cy="60" r="10" fill="var(--svg-cyan)" opacity="0.8" />
            <circle cx="220" cy="60" r="10" fill="var(--svg-cyan)" opacity="0.8" />
            <circle cx="340" cy="60" r="10" fill="var(--svg-cyan)" opacity="0.8" />
            <circle cx="460" cy="60" r="10" fill="var(--svg-cyan)" opacity="0.8" />
            
            <!-- Row 2 (offset) -->
            <circle cx="160" cy="130" r="10" fill="var(--svg-cyan)" opacity="0.8" />
            <circle cx="280" cy="130" r="10" fill="var(--svg-cyan)" opacity="0.8" />
            <circle cx="400" cy="130" r="10" fill="var(--svg-cyan)" opacity="0.8" />
            <circle cx="520" cy="130" r="10" fill="var(--svg-cyan)" opacity="0.8" />
            
            <!-- Row 3 -->
            <circle cx="100" cy="200" r="10" fill="var(--svg-cyan)" opacity="0.8" />
            <circle cx="220" cy="200" r="10" fill="var(--svg-cyan)" opacity="0.8" />
            <circle cx="340" cy="200" r="10" fill="var(--svg-cyan)" opacity="0.8" />
            <circle cx="460" cy="200" r="10" fill="var(--svg-cyan)" opacity="0.8" />
            
            <!-- Show connection to form a hexagon -->
            <line x1="280" y1="130" x2="220" y2="60" stroke="var(--svg-magenta)" stroke-width="1.5" stroke-dasharray="2 2" />
            <line x1="280" y1="130" x2="340" y2="60" stroke="var(--svg-magenta)" stroke-width="1.5" stroke-dasharray="2 2" />
            <line x1="280" y1="130" x2="340" y2="200" stroke="var(--svg-magenta)" stroke-width="1.5" stroke-dasharray="2 2" />
            <line x1="280" y1="130" x2="220" y2="200" stroke="var(--svg-magenta)" stroke-width="1.5" stroke-dasharray="2 2" />
            <line x1="280" y1="130" x2="160" y2="130" stroke="var(--svg-magenta)" stroke-width="1.5" stroke-dasharray="2 2" />
            <line x1="280" y1="130" x2="400" y2="130" stroke="var(--svg-magenta)" stroke-width="1.5" stroke-dasharray="2 2" />
            
            <!-- Highlight firing events on path -->
            <!-- Path intersection with (160,130) -->
            <circle cx="160" cy="130" r="14" fill="none" stroke="var(--svg-yellow)" stroke-width="2" />
            <!-- Path intersection with (400, 130) -->
            <circle cx="400" cy="130" r="14" fill="none" stroke="var(--svg-yellow)" stroke-width="2" />
            
            <text x="280" y="25" fill="var(--svg-text-primary)" font-family="Outfit" font-size="14" text-anchor="middle" font-weight="bold">Hexagonal Firing Peaks of a Single Grid Cell</text>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 4.1: Periodic, hexagonal firing fields of a grid cell that act as the brain's spatial metric coordinate system.</p>
        </div>

        <p>Imagine walking on a tiled floor. If you count the tiles as you step, you know how far you have walked even with your eyes closed. Grid cells act like these virtual tiles. As you walk, a grid cell fires whenever you land on one of its hexagonal vertices, serving as the brain's internal ruler.</p>

        <h3>2.2 The Geometric Ruler Gradient</h3>
        <p>Grid cells are organized along a top-to-bottom gradient in the entorhinal cortex. At the top, the rulers have very fine spacing (~30 cm tiles) giving high-resolution local metrics. As you move down, the grid size expands, reaching several meters at the bottom.</p>
        <p>Interestingly, the grid sizes do not change smoothly. They scale in discrete steps or modules. The ratio of spacing between successive modules is constant, averaging **$1.42$** (which is very close to the square root of 2). Why $1.42$? Mathematically, this geometric progression is the most efficient design: it allows the brain to map massive, kilometers-wide spaces using a tiny population of neurons, similar to how a few dial gears on a combinations lock represent huge numbers.</p>
      `
    },
    {
      id: "ch4_sec3",
      title: "3. Place Cells (Hippocampus): Landmark-Bound Localizers",
      highlightRegion: "hippocampus",
      content: String.raw`
        <h3>3.1 Place Fields: Mapping Context</h3>
        <p>Discovered in 1971, <span class="glossary-term" data-term="place_cells">place cells</span> are neurons in the CA1 and CA3 subfields of the hippocampus. Unlike grid cells, a place cell fires only in one specific spot, known as its place field. Together, a population of place cells tiles the environment, forming a map of the room.</p>
        
        <p>Place cells are highly flexible. If you change the context of the room (e.g. wall color, smell, or placing food rewards), they undergo **remapping**:</p>
        <ul>
          <li><strong>Global Remapping:</strong> If you move to a completely new room, the place cells completely scramble, some turning off and others turning on, representing a new spatial context.</li>
          <li><strong>Rate Remapping:</strong> If you stay in the same room but change the emotional context (e.g. wall color changes), the place cells keep their spatial positions but change their peak firing rates. This allows the brain to overlay the "what" (experience details) on top of the "where" (coordinates).</li>
        </ul>

        <h3>3.2 Phase Precession: The Fast-Forward Planner</h3>
        <p>When an animal explores, the hippocampus coordinates activity with a rhythmic 4-12 Hz wave called the theta rhythm. Place cell firing is locked to this rhythm, exhibiting **phase precession**. As the animal walks through a place field, the cell fires spikes at progressively earlier stages of the theta wave.</p>
        <p>This phase shift performs three vital jobs:</p>
        <ol>
          <li><strong>Temporal Compression:</strong> Walking across a room takes seconds. Phase precession compresses this sequence into a single 125-millisecond theta cycle. Within this cycle, the neurons fire in the exact sequence of the walk, but compressed by a factor of 20.</li>
          <li><strong>Sequence Learning:</strong> This compressed time window brings the spikes of sequential cells within milliseconds of each other, aligning them perfectly with the timing window of <span class="glossary-term" data-term="stdp">Spike-Timing-Dependent Plasticity (STDP)</span>. This strengthens the connections in the direction of travel, writing the path into memory.</li>
          <li><strong>Predictive Look-Ahead:</strong> During each cycle, the active cell firing sweeps forward in the direction of travel, acting like a local look-ahead simulator of where the animal is going next.</li>
        </ol>
      `
    },
    {
      id: "ch4_sec4",
      title: "4. Path Integration: Sensory Anchoring and Grid Alignment",
      highlightRegion: "none",
      content: String.raw`
        <h3>4.1 Path Integration (Odometry) and Drift</h3>
        <p>**Path integration** is the process of calculating your current position by integrating your self-motion (velocity and heading direction) over time. In the brain, this uses signals from compass-like head direction cells and speed cells in the brainstem.</p>
        <p>But path integration is noisy. Small errors in estimation accumulate. In a dark room with no landmarks, an animal's internal GPS coordinates drift, causing place fields to expand and blur as uncertainty rises.</p>

        <h3>4.2 Drift Correction</h3>
        <p>To stabilize the coordinates, the brain uses **drift correction**. As soon as the animal touches a familiar wall or sees a known visual cue, sensory signals drive place and grid cells, overriding the path integration drift. This instantly resets the coordinate grid phase to match physical space, demonstrating how path integration and landmark localization work together to keep the map stable.</p>
      `
    }
  ],
  quiz: [
    {
      question: "What is the primary difference in how grid cells and place cells represent space?",
      options: [
        "Grid cells fire in a single spot; place cells fire in a periodic hexagonal pattern.",
        "Grid cells act as a rigid, universal metric grid (virtual floor tiles); place cells act as landmark-bound localizers that map specific contexts.",
        "Grid cells are located in the brainstem; place cells are in the cerebellum.",
        "Grid cells are only active during sleep ripples; place cells are active during waking reflexes."
      ],
      answerIndex: 1,
      explanation: "Grid cells provide a rigid metric coordinate frame that tiles space in a hexagonal pattern. Place cells fire in specific locations and remap based on visual landmarks, context, and goals."
    },
    {
      question: "How does the hippocampal subfield CA3 retrieve a complete memory from a partial cue?",
      options: [
        "Through dense, recurrent connections where excitation propagates through pre-strengthened loops to restore the stable state (pattern completion).",
        "By routing the signal back to the visual cortex to capture missing photons.",
        "By utilizing the cerebellum to correct motor timing errors.",
        "By utilizing the POA thermostat to lower the cell's firing threshold."
      ],
      answerIndex: 0,
      explanation: "CA3 is characterized by dense recurrent collateral connections. When a partial cue activates a subset of the cells, the activity spreads across these pre-strengthened loops, driving the network to complete the original, full activation pattern."
    },
    {
      question: "What is the computational benefit of phase precession during exploration?",
      options: [
        "It prevents T-type calcium channels from entering burst firing mode.",
        "It compresses behavioral-timescale paths (seconds) into a single theta cycle (milliseconds), bringing spike timings within the window of STDP for sequence learning.",
        "It triggers global remapping when entering a familiar room.",
        "It shuts down the corpus callosum to isolate the two hemispheres."
      ],
      answerIndex: 1,
      explanation: "Phase precession compresses behavioral sequences into a single theta cycle (~125 ms). This brings the spike timings of sequential place cells within a tens-of-milliseconds window, which is required for Spike-Timing-Dependent Plasticity (STDP) to wire the sequence into memory."
    }
  ]
};
