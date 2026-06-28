export const chapterData = {
  id: "ch6",
  title: "Brain-Inspired AI: Numenta's Thousand Brains, SDRs, and Predictive Dendrites",
  summary: "A deep dive into how biological intelligence differs from deep learning. We look at the one-way street of backprop vs. local three-factor learning, explain Numenta's voting columns, explore the stadium crowd math of SDRs, and see how dendritic branches put cells on 'high alert' to predict the future.",
  sections: [
    {
      id: "ch6_sec1",
      title: "1. Brain-Inspired AI vs. Deep Learning",
      highlightRegion: "neocortex",
      content: String.raw`
        <h3>1.1 Feedback Towns vs. One-Way Streets</h3>
        <p>In modern deep learning, architectures like Transformers or CNNs are mostly **one-way streets** (feedforward networks). Information enters at one end, passes through layers of filters, and exits as a prediction at the other end.</p>
        <p>Biological brains are completely different: they are dominated by **looping feedback**. In the primary visual cortex (V1), feedforward inputs coming from the eyes make up only **5% to 10%** of the connections. The other 90% to 95% are local loops and descending feedback from higher areas. In fact, feedback connections outnumber feedforward ones by more than **10 to 1**!</p>
        
        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 800 220" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Left: Feedforward Artificial Net -->
            <g transform="translate(10, 0)">
              <text x="180" y="30" fill="var(--svg-text-primary)" font-family="Outfit" font-size="15" font-weight="bold" text-anchor="middle">Feedforward AI Network (One-Way)</text>
              
              <!-- Nodes -->
              <circle cx="60" cy="120" r="15" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
              <circle cx="140" cy="80" r="15" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
              <circle cx="140" cy="160" r="15" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
              <circle cx="220" cy="80" r="15" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
              <circle cx="220" cy="160" r="15" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
              <circle cx="300" cy="120" r="15" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2" />
              
              <!-- Paths -->
              <line x1="75" y1="115" x2="125" y2="85" stroke="var(--svg-cyan)" stroke-width="1.5" />
              <line x1="75" y1="125" x2="125" y2="155" stroke="var(--svg-cyan)" stroke-width="1.5" />
              <line x1="155" y1="80" x2="205" y2="80" stroke="var(--svg-cyan)" stroke-width="1.5" />
              <line x1="155" y1="160" x2="205" y2="160" stroke="var(--svg-cyan)" stroke-width="1.5" />
              <line x1="235" y1="85" x2="285" y2="115" stroke="var(--svg-cyan)" stroke-width="1.5" />
              <line x1="235" y1="155" x2="285" y2="125" stroke="var(--svg-cyan)" stroke-width="1.5" />
              
              <text x="180" y="200" fill="var(--svg-text-secondary)" font-family="Inter" font-size="11" text-anchor="middle">Input flows forward to output</text>
            </g>
            
            <!-- Separator -->
            <line x1="390" y1="20" x2="390" y2="200" stroke="var(--border-color)" stroke-dasharray="4 4" />
            
            <!-- Right: Recurrent Neocortex -->
            <g transform="translate(390, 0)">
              <text x="200" y="30" fill="var(--svg-text-primary)" font-family="Outfit" font-size="15" font-weight="bold" text-anchor="middle">Biological Neocortex (Feedback-Dominated)</text>
              
              <!-- Columns -->
              <rect x="60" y="90" width="60" height="60" rx="4" fill="var(--svg-bg-card)" stroke="var(--svg-magenta)" stroke-width="2" />
              <text x="90" y="125" fill="var(--svg-text-primary)" font-family="Inter" font-size="12" text-anchor="middle">V1</text>
              
              <rect x="220" y="90" width="60" height="60" rx="4" fill="var(--svg-bg-card)" stroke="var(--svg-magenta)" stroke-width="2" />
              <text x="250" y="125" fill="var(--svg-text-primary)" font-family="Inter" font-size="12" text-anchor="middle">V2/V4</text>
              
              <!-- Feedforward (thin) -->
              <path d="M 120 110 L 220 110" fill="none" stroke="var(--svg-cyan)" stroke-width="1.5" marker-end="url(#arrow)" />
              <text x="170" y="100" fill="var(--svg-cyan)" font-family="Inter" font-size="9" text-anchor="middle">Feedforward (10%)</text>
              
              <!-- Feedback (thick loop) -->
              <path d="M 220 130 C 180 160, 160 160, 120 130" fill="none" stroke="var(--svg-magenta)" stroke-width="3" marker-end="url(#arrow-red)" />
              <text x="170" y="170" fill="var(--svg-magenta)" font-family="Inter" font-size="10" text-anchor="middle" font-weight="bold">Feedback Loops (90%)</text>
              
              <!-- Local loop -->
              <path d="M 90 90 A 15 15 0 1 1 110 90" fill="none" stroke="var(--svg-yellow)" stroke-width="1.5" stroke-dasharray="3 2" />
            </g>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 6.1: Contrast between feedforward networks and feedback-dominated biological neocortex loops.</p>
        </div>

        <p>In computational neuroscience, this recurrent wiring is the foundation of **predictive processing**. Instead of processing everything from scratch, higher brain regions maintain a simulation of the world and project expectations downward. Lower regions check if the sensory inputs match those expectations, sending only the unexpected differences—the **prediction errors**—back up. This saves massive amounts of energy by ignoring predicted, redundant data.</p>

        <h3>1.2 The Backprop Biophysics Problem: The Reverse-Driving Truck</h3>
        <p>To train artificial neural networks, engineers use **Backpropagation of Error**. This algorithm sends error signals backward through the network to update synaptic weights. But backpropagation requires the backward path to use the exact same weights as the forward path. This is called the **weight transport problem**.</p>
        <p>Imagine a delivery company that requires a truck driver to drive backwards along the exact same highway in reverse to tell the factory how to package a box. In biology, this is impossible. Synapses are strictly **one-way streets**: axons release chemicals, and dendrites receive them. A neuron has no physical way of sending weight values backward along its axon to modify the pre-synaptic strength of another cell. Additionally, backprop requires synchronous timing (pausing the network to run a backward pass), whereas biological networks spike continuously and asynchronously.</p>

        <h3>1.3 Local Learning: Self-Organizing Neurons</h3>
        <p>The brain solves this credit assignment problem using self-organizing **local learning rules**, which use only the information physically present at each synapse:</p>
        <ul>
          <li><strong>Hebbian Plasticity:</strong> "Cells that fire together, wire together." If neuron A repeatedly helps fire neuron B, the connection between them is strengthened: <code>&Delta;w_ij = &eta; * a_i * a_j</code>.</li>
          <li><strong>Spike-Timing-Dependent Plasticity (STDP):</strong> A high-resolution rule where the exact millisecond timing matters. If neuron A spikes just *before* neuron B, the connection is strengthened (causal association). If A spikes *after* B, the connection is weakened:</li>
        </ul>
        <pre><code>&Delta;t = t_post - t_pre
&Delta;w = A_LTP * exp(-&Delta;t / &tau;_LTP)   if &Delta;t > 0  (Strengthen / LTP)
&Delta;w = -A_LTD * exp(&Delta;t / &tau;_LTD)     if &Delta;t < 0  (Weaken / LTD)</code></pre>
        <p><strong>Three-Factor Plasticity:</strong> Local STDP is modulated by a third factor—global chemical signals (dopamine, acetylcholine) representing reward, attention, or surprise, deciding which synaptic updates to keep.</p>
      `
    },
    {
      id: "ch6_sec2",
      title: "Numenta's A Thousand Brains Theory",
      highlightRegion: "neocortex",
      content: String.raw`
        <h3>2.1 Egocentric vs. Allocentric Frames: The Coffee Cup</h3>
        <p>When you look at or touch an object, the sensations change completely as you move. If you turn your head, the light hitting your retina shifts. If you move your hand, the tactile inputs shift. Yet, you perceive a stable 3D world.</p>
        <p>The brain solves this by converting sensory inputs across two coordinate reference frames:</p>
        <ul>
          <li><strong>Egocentric Frames:</strong> Coordinates defined relative to your own sensors (e.g. "where is the handle relative to my finger/eye?"). This changes constantly with movement.</li>
          <li><strong>Allocentric Frames:</strong> Coordinates defined relative to the object itself (e.g. "where is the handle relative to the body of the cup?"). This is stable, regardless of how the cup is turned or where it is placed in the room.</li>
        </ul>

        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 600 240" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Cup outline -->
            <path d="M 220 70 L 380 70 L 360 180 L 240 180 Z" fill="none" stroke="var(--svg-cyan)" stroke-width="3" />
            <path d="M 370 100 C 410 100, 410 150, 355 150" fill="none" stroke="var(--svg-cyan)" stroke-width="3" />
            
            <!-- Egocentric annotation -->
            <g transform="translate(40, 60)">
              <circle cx="40" cy="110" r="10" fill="var(--svg-magenta)" />
              <text x="40" y="90" fill="var(--svg-magenta)" font-family="Inter" font-size="10" text-anchor="middle">Sensor (Finger)</text>
              <line x1="40" y1="110" x2="340" y2="65" stroke="var(--svg-magenta)" stroke-width="1.5" stroke-dasharray="3 3" />
              <text x="180" y="80" fill="var(--svg-magenta)" font-family="Inter" font-size="9" text-anchor="middle">Egocentric distance (vector shifts as hand moves)</text>
            </g>
            
            <!-- Allocentric coordinate markers on cup -->
            <line x1="230" y1="180" x2="370" y2="180" stroke="var(--svg-green)" stroke-width="1.5" />
            <line x1="300" y1="70" x2="300" y2="180" stroke="var(--svg-green)" stroke-width="1.5" />
            <circle cx="380" cy="120" r="6" fill="var(--svg-green)" />
            
            <text x="300" y="210" fill="var(--svg-green)" font-family="Inter" font-size="10" text-anchor="middle">Allocentric Coordinates: Fixed relative to the cup itself</text>
            <text x="300" y="25" fill="var(--svg-text-primary)" font-family="Outfit" font-size="14" text-anchor="middle" font-weight="bold">Reference Frames: Egocentric vs. Allocentric</text>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 6.2: Mapping sensory inputs to object-centric reference frames to represent stable 3D shapes.</p>
        </div>

        <p>By mapping local features (like a curved edge) to its allocentric location on the cup's surface (the handle position), the brain learns a 3D model of the cup that works from any angle.</p>

        <h3>2.2 The Thousand Brains Consensus</h3>
        <p>Traditional AI uses one large network that makes a single classification at the very top. Numenta's **A Thousand Brains Theory** suggests that every single cortical column is a complete model-learning agent. A single column touching a cylinder cannot tell if it is a pen, a cup handle, or a telephone. It has an ambiguous, sparse set of hypotheses.</p>
        <p>To resolve this, columns use horizontal connections in **Layer 2/3** to perform **lateral voting**. They broadcast their guesses to their neighbors, and within milliseconds, they suppress incompatible guesses, converging on a global consensus: "It's a coffee cup!"</p>
      `
    },
    {
      id: "ch6_sec3",
      title: "Sparse Distributed Representations (SDRs) and Active Dendrites",
      highlightRegion: "neocortex",
      content: String.raw`
        <h3>3.1 Sparse Distributed Representations: The Stadium Analogy</h3>
        <p>Traditional AI represents numbers as dense vectors, where every neuron outputs a number. The brain uses **Sparse Distributed Representations (SDRs)**. In an SDR, only a tiny fraction (usually 1% to 2%) of the neurons are active (1) and the rest are silent (0).</p>
        <p>To understand why this is incredibly powerful, let's use the **Stadium Analogy**:</p>
        <blockquote>
          Imagine a stadium containing 10,000 fans. To represent the word "Apple," you ask a specific set of 200 fans to stand up. To represent "Orange," you ask a different set of 200 fans to stand up.
        </blockquote>
        <ul>
          <li><strong>Astronomical Capacity:</strong> The number of unique groups of 200 fans you can choose out of 10,000 is binomial: <code>C(10000, 200)</code>. This number is larger than the number of atoms in the observable universe! You will never run out of codes.</li>
          <li><strong>Zero Collision Risk:</strong> If you pick two random words, the chance that their active fan groups overlap significantly by chance is near-zero (hypergeometric distribution). If two representations share even 10 active fans, you can be mathematically certain they represent related concepts.</li>
          <li><strong>Unbeatable Noise Tolerance:</strong> If you call the "Apple" crowd to stand up, but 100 of them are asleep, and 50 random other fans stand up by accident, the remaining 100 fans are still plenty to identify the "Apple" representation with absolute certainty, because the chance of the "Orange" crowd having those same 100 fans is practically zero.</li>
        </ul>

        <h3>3.2 Active Dendrites: The High-Alert Warning System</h3>
        <p>In traditional AI, a neuron is modeled as a simple point that sums its inputs: <code>y = f(&Sigma; w_i x_i)</code>. Real brain cells (pyramidal cells) have branches called dendrites split into zones:</p>
        <ul>
          <li><strong>Proximal Dendrites (The Drivers):</strong> Located near the cell body, carrying feedforward sensory inputs that directly fire the cell.</li>
          <li><strong>Distal Dendrites (The Modulators):</strong> Located far out, receiving lateral and top-down feedback inputs.</li>
        </ul>

        <div style="margin: 25px 0; text-align: center;">
          <svg viewBox="0 0 600 240" width="100%" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Distal dendrites (top) -->
            <path d="M 300 130 L 250 80 Q 200 40, 250 30" fill="none" stroke="var(--svg-magenta)" stroke-width="2" />
            <path d="M 300 130 L 350 80 Q 400 40, 350 30" fill="none" stroke="var(--svg-magenta)" stroke-width="2" />
            <text x="380" y="55" fill="var(--svg-magenta)" font-family="Inter" font-size="10">Distal Dendrites (Expectations/Feedback)</text>
            
            <!-- Soma (middle) -->
            <polygon points="300,120 280,160 320,160" fill="var(--svg-bg-card)" stroke="var(--svg-cyan)" stroke-width="2.5" />
            <text x="335" y="145" fill="var(--svg-cyan)" font-family="Outfit" font-size="12" font-weight="bold">Cell Body (Soma)</text>
            
            <!-- Proximal dendrites (near soma) -->
            <path d="M 290 155 L 260 180" fill="none" stroke="var(--svg-green)" stroke-width="2" />
            <path d="M 310 155 L 340 180" fill="none" stroke="var(--svg-green)" stroke-width="2" />
            <text x="355" y="190" fill="var(--svg-green)" font-family="Inter" font-size="10">Proximal Dendrites (Sensory Driver)</text>
            
            <!-- Axon (bottom) -->
            <line x1="300" y1="160" x2="300" y2="210" stroke="var(--svg-cyan)" stroke-width="2" />
            <text x="310" y="225" fill="var(--svg-text-secondary)" font-family="Inter" font-size="10">Axon Output</text>
            
            <!-- Highlight NMDA Spike -->
            <circle cx="230" cy="50" r="12" fill="none" stroke="var(--svg-yellow)" stroke-width="2" />
            <text x="210" y="53" fill="var(--svg-yellow-text)" font-family="Inter" font-size="9" text-anchor="end">NMDA Spike (Coincidence!)</text>
          </svg>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px; font-style: italic;">Figure 6.3: Biophysical layout of a pyramidal neuron showing driver and modulator inputs.</p>
        </div>

        <p>If a group of 8 to 10 synapses on a distal branch fire at the same time, they cause a local electrical spark called an **NMDA Spike**. This spike is too weak to fire the neuron on its own, but it travels to the cell body and raises its voltage by 1-2 mV, placing the cell in a **predictive state**.</p>
        <p>This is like a runner leaning forward in the blocks. When the feedforward input arrives, the predicted cell fires **10 milliseconds earlier** than its neighbors. It immediately triggers fast inhibitory cells, which silence all the other unpredicted cells in the column. Only the predicted cells fire, achieving sequence learning with massive energy efficiency.</p>
      `
    },
    {
      id: "ch6_sec4",
      title: "Practical SDR Coding in JavaScript",
      highlightRegion: "neocortex",
      content: String.raw`
        <h3>4.1 Implementation of an ES6 class representing an SDR</h3>
        <p>Below is an ES6 JavaScript class that represents a Sparse Distributed Representation. It includes methods to generate random SDRs, compute overlap (intersection), check matches above a specific threshold, and compute a union representation of multiple SDRs.</p>

        <pre><code class="language-javascript">
export class SDR {
  /**
   * @param {number} size - The total bit-width of the representation (N).
   * @param {number[]|Set<number>} activeIndices - The indices of the active bits (1s).
   */
  constructor(size, activeIndices) {
    this.size = size;
    // Store as a Set for O(1) membership checking
    this.activeIndices = new Set(activeIndices);
    
    // Validate indices
    for (const idx of this.activeIndices) {
      if (idx < 0 || idx >= size) {
        throw new RangeError('Index ' + idx + ' is out of bounds for SDR of size ' + size + '.');
      }
    }
  }

  /**
   * Generates a random SDR.
   * @param {number} size - Total size of the SDR.
   * @param {number} numActive - Number of active bits (W).
   * @returns {SDR} A new random SDR instance.
   */
  static random(size, numActive) {
    if (numActive > size) {
      throw new Error("Number of active bits cannot exceed the total size of the SDR.");
    }
    const indices = new Set();
    while (indices.size < numActive) {
      const randIdx = Math.floor(Math.random() * size);
      indices.add(randIdx);
    }
    return new SDR(size, indices);
  }

  /**
   * Computes the overlap (intersection size) between two SDRs.
   * @param {SDR} sdrA 
   * @param {SDR} sdrB 
   * @returns {number} The overlap count.
   */
  static overlap(sdrA, sdrB) {
    if (sdrA.size !== sdrB.size) {
      throw new Error("Cannot compute overlap of SDRs with different sizes.");
    }
    let count = 0;
    // Iterate over the smaller set of active indices to minimize loop iterations
    const [smaller, larger] = sdrA.activeIndices.size < sdrB.activeIndices.size
      ? [sdrA.activeIndices, sdrB.activeIndices]
      : [sdrB.activeIndices, sdrA.activeIndices];

    for (const idx of smaller) {
      if (larger.has(idx)) {
        count++;
      }
    }
    return count;
  }

  /**
   * Checks if this SDR matches another above a specified threshold.
   * @param {SDR} otherSdr 
   * @param {number} threshold - Minimum overlapping bits.
   * @returns {boolean} True if they match, false otherwise.
   */
  matches(otherSdr, threshold) {
    return SDR.overlap(this, otherSdr) >= threshold;
  }

  /**
   * Computes the union representation (logical OR) of multiple SDRs.
   * @param {SDR[]} sdrs - Array of SDR instances.
   * @returns {SDR} A new SDR representing the union.
   */
  static union(sdrs) {
    if (!sdrs || sdrs.length === 0) {
      throw new Error("Cannot compute union of an empty array of SDRs.");
    }
    const targetSize = sdrs[0].size;
    const unionIndices = new Set();

    for (const sdr of sdrs) {
      if (sdr.size !== targetSize) {
        throw new Error("All SDRs in the union must have the exact same size.");
      }
      for (const idx of sdr.activeIndices) {
        unionIndices.add(idx);
      }
    }

    return new SDR(targetSize, unionIndices);
  }

  /**
   * Helper to retrieve active indices as a sorted array.
   * @returns {number[]}
   */
  getIndices() {
    return Array.from(this.activeIndices).sort((a, b) => a - b);
  }

  /**
   * Helper to check the sparsity of the representation.
   * @returns {number} Sparsity ratio (W / N).
   */
  getSparsity() {
    return this.activeIndices.size / this.size;
  }

  /**
   * Converts the SDR into a dense binary array (for debugging).
   * @returns {number[]} Array of 0s and 1s.
   */
  toBinaryArray() {
    const arr = new Array(this.size).fill(0);
    for (const idx of this.activeIndices) {
      arr[idx] = 1;
    }
    return arr;
  }
}
        </code></pre>

        <h3>4.2 Example Execution & Verification</h3>
        <p>Using this class, we can verify how noise robustness works in practice. For instance, if we generate a random SDR of size 2048 with 40 active bits, and corrupt it by replacing 20 of its active indices with random new ones (introducing 50% noise), the overlap with the original remains exactly 20. The probability of another random SDR matching with an overlap of 20 is near-zero, proving that SDRs remain highly recognizable even in extremely noisy conditions.</p>
      `
    }
  ],
  quiz: [
    {
      question: "In Numenta's A Thousand Brains Theory, how do individual cortical columns resolve sensory ambiguities?",
      options: [
        "By transmitting all inputs directly to the cerebellum for error correction.",
        "Through lateral voting in Layer 2/3, where columns broadcast their hypotheses and pool their votes to achieve a global consensus in milliseconds.",
        "By shutting down the thalamic matrix cells to restrict feedback.",
        "By converting the representation into a dense float array."
      ],
      answerIndex: 1,
      explanation: "Individual columns have narrow sensory views, making their local representations ambiguous. They use horizontal Layer 2/3 connections to perform lateral voting, sharing their sparse hypotheses and quickly settling on a single consensus."
    },
    {
      question: "Why do Sparse Distributed Representations (SDRs) have such high noise robustness?",
      options: [
        "They are governed by a single point neuron that filters out negative numbers.",
        "They use backpropagation to continuously clean their inputs.",
        "The combinatorial capacity is astronomical and the probability of random overlaps is near-zero. Thus, a corrupted pattern (e.g., 50% noise) still shares a highly significant overlap with its original code, while having no chance of matching any other code.",
        "They are routed through the Olivary Pretectal Nucleus to filter out high-frequency noise."
      ],
      answerIndex: 2,
      explanation: "Due to the mathematics of combinatorics (hypergeometric distribution), the probability of random SDR overlaps is near-zero. A degraded SDR sharing 50% of its bits is still highly unique, preventing false positive matches while allowing correct identification."
    },
    {
      question: "What is the biological weight transport problem in backpropagation?",
      options: [
        "The brain's cells are too heavy to move during sleep consolidation.",
        "Backprop requires feedforward and feedback connections to share the exact same weights, which is impossible because biological synapses are one-way streets.",
        "Dendritic attenuation causes voltage spikes to bleed into neighboring columns.",
        "Hormones block the release of glutamate in the ciliary ganglion."
      ],
      answerIndex: 1,
      explanation: "Backpropagation requires transmitting weight gradients backwards along the same connections. Because biological connections are strictly unidirectional (axons project to dendrites), the brain cannot transmit weight changes backward, meaning it must use local self-organizing learning rules."
    }
  ]
};
