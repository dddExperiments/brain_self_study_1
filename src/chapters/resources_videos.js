export const chapterData = {
  id: "resources",
  title: "Video Learning Guides (Artem Kirsanov)",
  summary: "A curated list of educational video essays by researcher Artem Kirsanov, organized by topic. These videos provide highly intuitive, visual explanations of the biophysical, spatial, and advanced computational neuroscience concepts taught in this book.",
  sections: [
    {
      id: "res_sec1",
      title: "1. Single-Neuron Biophysics & Representation Geometry",
      highlightRegion: "none",
      content: `
        <h3>1.1 Single-Neuron Biophysics & Neural Coding</h3>
        <p>Before studying large-scale recurrent loops, we must understand how individual neurons generate signals and how ensembles represent information. These video essays build a solid foundation:</p>
        
        <div class="video-grid" style="display: flex; flex-direction: column; gap: 16px; margin: 20px 0;">
          
          <div class="video-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; transition: all 0.3s ease;">
            <div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
              <img src="https://img.youtube.com/vi/zOmhHE2xctw/hqdefault.jpg" alt="The Core Equation of Neuroscience Thumbnail" style="width: 140px; height: 90px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-color); flex-shrink: 0;" />
              <div style="flex: 1; min-width: 250px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 11px; background: rgba(0, 188, 255, 0.15); color: #00bcff; padding: 4px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Biophysics</span>
                  <a href="https://www.youtube.com/watch?v=zOmhHE2xctw" target="_blank" style="color: #00bcff; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">Watch Video ↗</a>
                </div>
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary); margin-top: 0;">The Core Equation of Neuroscience</h4>
                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0;">An exploration of the biophysical equations governing neural excitability. This video breaks down the **Nernst Equation** and the **Hodgkin-Huxley model**, showing how resting potentials and action potentials arise from voltage-gated ion channels (sodium, potassium) and membrane currents.</p>
              </div>
            </div>
          </div>

          <div class="video-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; transition: all 0.3s ease;">
            <div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
              <img src="https://img.youtube.com/vi/gLtGVEhMFN4/hqdefault.jpg" alt="Why Two Identical Neurons Behave Differently Thumbnail" style="width: 140px; height: 90px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-color); flex-shrink: 0;" />
              <div style="flex: 1; min-width: 250px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 11px; background: rgba(0, 188, 255, 0.15); color: #00bcff; padding: 4px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Modeling</span>
                  <a href="https://www.youtube.com/watch?v=gLtGVEhMFN4" target="_blank" style="color: #00bcff; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">Watch Video ↗</a>
                </div>
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary); margin-top: 0;">Why Two Identical Neurons Behave Differently</h4>
                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0;">Explores the dynamics of biological neurons, demonstrating how different firing behaviors (chattering, bursting, regular spiking) arise from specific channel kinetics, referencing Izhikevich's dynamical systems in neuroscience.</p>
              </div>
            </div>
          </div>

          <div class="video-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; transition: all 0.3s ease;">
            <div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
              <img src="https://img.youtube.com/vi/QHj9uVmwA_0/hqdefault.jpg" alt="Neural Manifolds - The Geometry of Behaviour Thumbnail" style="width: 140px; height: 90px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-color); flex-shrink: 0;" />
              <div style="flex: 1; min-width: 250px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 11px; background: rgba(0, 188, 255, 0.15); color: #00bcff; padding: 4px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Representations</span>
                  <a href="https://www.youtube.com/watch?v=QHj9uVmwA_0" target="_blank" style="color: #00bcff; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">Watch Video ↗</a>
                </div>
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary); margin-top: 0;">Neural manifolds - The Geometry of Behaviour</h4>
                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0;">Introduces neural population coding, neural manifolds, and representation geometry. Shows how coordinated firing in neural populations constructs low-dimensional geometric shapes that represent sensory variables and decisions.</p>
              </div>
            </div>
          </div>

        </div>
      `
    },
    {
      id: "res_sec2",
      title: "2. Cognitive Maps & Spatial Navigation",
      highlightRegion: "hippocampus",
      content: `
        <h3>2.1 Hippocampal Mapping & Coordinates</h3>
        <p>The hippocampal-entorhinal system does not just track spatial coordinates during physical foraging; it organizes abstract task structures and semantic relationships into coordinate grids.</p>
        
        <div class="video-grid" style="display: flex; flex-direction: column; gap: 16px; margin: 20px 0;">
          
          <div class="video-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; transition: all 0.3s ease;">
            <div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
              <img src="https://img.youtube.com/vi/9qOaII_PzGY/hqdefault.jpg" alt="How Your Brain Organizes Information Thumbnail" style="width: 140px; height: 90px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-color); flex-shrink: 0;" />
              <div style="flex: 1; min-width: 250px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 11px; background: rgba(0, 188, 255, 0.15); color: #00bcff; padding: 4px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Spatial GPS</span>
                  <a href="https://www.youtube.com/watch?v=9qOaII_PzGY" target="_blank" style="color: #00bcff; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">Watch Video ↗</a>
                </div>
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary); margin-top: 0;">How Your Brain Organizes Information</h4>
                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0;">A deep-dive into the discovery of place cells, grid cells, and head-direction cells. Explains how these cells form a neural GPS, and how the brain leverages these spatial mechanisms to build generalized cognitive maps of abstract spaces (concepts, relationships, tasks).</p>
              </div>
            </div>
          </div>

        </div>
      `
    },
    {
      id: "res_sec3",
      title: "3. Advanced Computational Loops & Learning Algorithms",
      highlightRegion: "none",
      content: `
        <h3>3.1 Brain-Inspired Machine Learning</h3>
        <p>How do we translate these biological findings into software? These video essays provide structural details of three leading paradigms: Reservoirs, Predictive Coding, and Active Inference.</p>
        
        <div class="video-grid" style="display: flex; flex-direction: column; gap: 16px; margin: 20px 0;">
          
          <div class="video-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; transition: all 0.3s ease;">
            <div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
              <img src="https://img.youtube.com/vi/-_OgW6KSGE4/hqdefault.jpg" alt="The Most Counterintuitive Way to Build a Brain Thumbnail" style="width: 140px; height: 90px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-color); flex-shrink: 0;" />
              <div style="flex: 1; min-width: 250px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 11px; background: rgba(0, 188, 255, 0.15); color: #00bcff; padding: 4px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Reservoir Computing</span>
                  <a href="https://www.youtube.com/watch?v=-_OgW6KSGE4" target="_blank" style="color: #00bcff; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">Watch Video ↗</a>
                </div>
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary); margin-top: 0;">The Most Counterintuitive Way to Build a Brain</h4>
                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0;">An explanation of Reservoir Computing (Echo State Networks and Liquid State Machines). Shows how fixed, random recurrent connections create rich temporal dynamics, and why training only a linear readout is highly efficient and models structures like the cerebellum.</p>
              </div>
            </div>
          </div>

          <div class="video-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; transition: all 0.3s ease;">
            <div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
              <img src="https://img.youtube.com/vi/SmZmBKc7Lrs/hqdefault.jpg" alt="The Brain's Learning Algorithm Isn't Backpropagation Thumbnail" style="width: 140px; height: 90px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-color); flex-shrink: 0;" />
              <div style="flex: 1; min-width: 250px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 11px; background: rgba(0, 188, 255, 0.15); color: #00bcff; padding: 4px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Predictive Coding</span>
                  <a href="https://www.youtube.com/watch?v=SmZmBKc7Lrs" target="_blank" style="color: #00bcff; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">Watch Video ↗</a>
                </div>
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary); margin-top: 0;">The Brain's Learning Algorithm Isn't Backpropagation</h4>
                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0;">Explains why backpropagation is biologically implausible (weight transport problem, synchronous temporal locks) and how the brain uses Predictive Coding as a local, distributed alternative, passing top-down predictions and bottom-up prediction errors.</p>
              </div>
            </div>
          </div>

          <div class="video-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; transition: all 0.3s ease;">
            <div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
              <img src="https://img.youtube.com/vi/iPj9D9LgK2A/hqdefault.jpg" alt="A Universal Theory of Brain Function Thumbnail" style="width: 140px; height: 90px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-color); flex-shrink: 0;" />
              <div style="flex: 1; min-width: 250px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 11px; background: rgba(0, 188, 255, 0.15); color: #00bcff; padding: 4px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Active Inference</span>
                  <a href="https://www.youtube.com/watch?v=iPj9D9LgK2A" target="_blank" style="color: #00bcff; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">Watch Video ↗</a>
                </div>
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary); margin-top: 0;">A Universal Theory of Brain Function</h4>
                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0;">Introduces Karl Friston's Free Energy Principle and Active Inference. Explains how biological agents maintain self-organization and resist entropy by performing actions and updating internal models to minimize variational free energy.</p>
              </div>
            </div>
          </div>

        </div>
      `
    }
  ],
  quiz: []
};
