import './style.css';
import { BrainVisualizer } from './three-scene.js';
import { chapterData as ch1 } from './chapters/ch1_evolution.js';
import { chapterData as ch2 } from './chapters/ch2_mammalian_anatomy.js';
import { chapterData as ch3 } from './chapters/ch3_subcortical_regulators.js';
import { chapterData as ch4 } from './chapters/ch4_hippocampus_navigation.js';
import { chapterData as ch5 } from './chapters/ch5_visual_pathway.js';
import { chapterData as ch6 } from './chapters/ch6_numenta_sdr.js';
import { chapterData as ch7 } from './chapters/ch7_reservoir_active_inference.js';
import { chapterData as resources } from './chapters/resources_videos.js';
import { glossary } from './glossary.js';

// Chapter index list
const chapters = [ch1, ch2, ch3, ch4, ch5, ch6, ch7, resources];

// Application state
const BYPASS_CHAPTER_LOCK = true; // Set to false to enforce chapter locks

let state = {
  currentChapterIndex: 0,
  unlockedChapters: [0],
  completedChapters: [],
  quizActive: false,
  currentQuestionIndex: 0,
  selectedOptionIndex: null,
  quizAnswers: [], // stores true/false for each question
};

// UI Elements
const chaptersNav = document.getElementById('chapters-nav');
const chapterContainer = document.getElementById('chapter-container');
const quizTriggerSection = document.getElementById('quiz-trigger-section');
const startQuizBtn = document.getElementById('start-quiz-btn');

const quizOverlay = document.getElementById('quiz-overlay');
const quizTitle = document.getElementById('quiz-title');
const quizProgressFill = document.getElementById('quiz-progress-fill');
const quizQuestionNumber = document.getElementById('quiz-question-number');
const quizQuestionText = document.getElementById('quiz-question-text');
const quizOptionsContainer = document.getElementById('quiz-options-container');
const quizFeedback = document.getElementById('quiz-feedback');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackExplanation = document.getElementById('feedback-explanation');
const nextQuestionBtn = document.getElementById('next-question-btn');
const closeQuizBtn = document.getElementById('close-quiz-btn');

const progressPercent = document.getElementById('progress-percent');
const progressFill = document.getElementById('progress-fill');

const hudActiveRegion = document.getElementById('hud-active-region');
const hudRegionDetails = document.getElementById('hud-region-details');
const readerPane = document.getElementById('reader-pane');

// Region descriptions for the HUD overlay
const regionHUDDetails = {
  neocortex: '<strong>Neocortex (Cerebral Cortex)</strong>:<br/>A 6-layered sheet ($100k$ neurons, $1B$ synapses per $\\text{mm}^3$). Focuses on Sparse Distributed Representations (SDRs) and local predictive processing. Pyramidal neurons detect coincident synaptic patterns in distal dendrites to predict future sensory states.',
  thalamus: '<strong>Thalamus (The Sensory Gateway)</strong>:<br/>A bi-lobed hub gating peripheral input (LGN, MGN) and routing information between cortical columns (Pulvinar). Features dynamic Tonic-to-Burst firing modes that adjust sensory transmission gain based on attention.',
  hypothalamus: '<strong>Hypothalamus (The Core Controller)</strong>:<br/>Lies ventral to the thalamus, monitoring blood chemistry and visceral states. Regulates homeostatic drives (circadian rhythms via SCN, hunger via LH/VMH, body temp via POA) and provides biological utility signals (objective functions) for reinforcement learning.',
  hippocampus: '<strong>Hippocampus & MEC</strong>:<br/>Curved temporal structure mapping space and episodic sequences. Features MEC Grid Cells (hexagonal spatial tessellation scaling geometrically by $\\approx 1.42$) and Place Cells (local landmarks) forming a continuous attractor coordinate frame.',
  visual_pathway: '<strong>Sensorimotor Visual Pathway</strong>:<br/>A closed control loop. Photons $\\rightarrow$ Retina (DoG filtering) $\\rightarrow$ LGN $\\rightarrow$ V1 (simple/complex receptive fields) $\\rightarrow$ Superior Colliculus (saccadic motor map) $\\rightarrow$ Cranial Nerves driving eye movement. Features E-W reflex sub-loops gating pupil diameter.',
  brainstem: '<strong>Brainstem & Motor Centers</strong>:<br/>Houses motor pattern generators (PPRF, riMLF) and the ocular neural integrator that converts motor command velocity pulses into steady muscular contractions to hold eye positions.',
  none: '<strong>Brain Circuit Schematic</strong>:<br/>Interactive 3D model. Scroll the chapter text on the left to highlight specific anatomical regions, pathways, and biological loops.'
};

let visualizer = null;
let sectionObserver = null;

// Initialize App
function initApp() {
  // Load saved state from LocalStorage if available
  loadState();

  // Instantiate Three.js Scene if not on mobile
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) {
    try {
      visualizer = new BrainVisualizer('canvas-container');
    } catch (err) {
      console.error("Three.js visualizer failed to load. Falling back to text-only mode.", err);
      const visPane = document.querySelector('.visualizer-pane');
      const dashboardGrid = document.querySelector('.dashboard-grid');
      if (visPane) visPane.style.display = 'none';
      if (dashboardGrid) {
        dashboardGrid.style.gridTemplateColumns = '1fr';
      }
    }
  } else {
    // Mobile fallback: adjust layouts immediately
    const visPane = document.querySelector('.visualizer-pane');
    const dashboardGrid = document.querySelector('.dashboard-grid');
    if (visPane) visPane.style.display = 'none';
    if (dashboardGrid) {
      dashboardGrid.style.gridTemplateColumns = '1fr';
    }
  }

  // Render Navigation
  renderNavigation();

  // Load Initial Chapter
  loadChapter(state.currentChapterIndex);

  // Setup Event Listeners
  startQuizBtn.addEventListener('click', openQuiz);
  closeQuizBtn.addEventListener('click', closeQuiz);
  nextQuestionBtn.addEventListener('click', handleNextQuestion);

  const toggleBtn = document.getElementById('toggle-visualizer-btn');
  const themeBtn = document.getElementById('toggle-theme-btn');
  const dashboardGrid = document.querySelector('.dashboard-grid');
  let resizeInterval = null;

  // Initialize theme from localStorage
  if (themeBtn) {
    const savedTheme = localStorage.getItem('neuroagent_theme') || 'dark';
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-mode');
      const btnText = themeBtn.querySelector('.theme-text');
      const btnIcon = themeBtn.querySelector('.theme-icon');
      if (btnText) btnText.textContent = 'Dark Mode';
      if (btnIcon) btnIcon.textContent = '🌙';
    }

    themeBtn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light-mode');
      const btnText = themeBtn.querySelector('.theme-text');
      const btnIcon = themeBtn.querySelector('.theme-icon');

      if (isLight) {
        localStorage.setItem('neuroagent_theme', 'light');
        if (btnText) btnText.textContent = 'Dark Mode';
        if (btnIcon) btnIcon.textContent = '🌙';
      } else {
        localStorage.setItem('neuroagent_theme', 'dark');
        if (btnText) btnText.textContent = 'Light Mode';
        if (btnIcon) btnIcon.textContent = '☀️';
      }
    });
  }

  if (toggleBtn && dashboardGrid) {
    toggleBtn.addEventListener('click', () => {
      const isCollapsed = dashboardGrid.classList.toggle('visualizer-collapsed');
      
      const btnText = toggleBtn.querySelector('.toggle-vis-text');
      const btnIcon = toggleBtn.querySelector('.toggle-vis-icon');
      
      if (isCollapsed) {
        if (btnText) btnText.textContent = 'Show 3D Brain';
        if (btnIcon) btnIcon.textContent = '🧠';
      } else {
        if (btnText) btnText.textContent = 'Hide 3D Brain';
        if (btnIcon) btnIcon.textContent = '👁️';
      }
      
      // Smoothly resize WebGL visualizer canvas during the grid transition (450ms)
      if (resizeInterval) clearInterval(resizeInterval);
      const startTime = Date.now();
      resizeInterval = setInterval(() => {
        if (visualizer) {
          visualizer.onWindowResize();
        }
        if (Date.now() - startTime > 450) {
          clearInterval(resizeInterval);
        }
      }, 16);
    });
  }

  // Mobile Nav toggle functionality
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  if (mobileNavToggle && chaptersNav) {
    mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = chaptersNav.classList.toggle('open');
      const arrow = mobileNavToggle.querySelector('.mobile-nav-toggle-arrow');
      if (arrow) {
        arrow.textContent = isOpen ? '▲' : '▼';
      }
    });

    // Close menu when clicking anywhere else on the document
    document.addEventListener('click', () => {
      chaptersNav.classList.remove('open');
      const arrow = mobileNavToggle.querySelector('.mobile-nav-toggle-arrow');
      if (arrow) {
        arrow.textContent = '▼';
      }
    });
  }

  // Initial HUD update
  updateHUD('none');
  updateProgressBar();
}

// Load saved progress
function loadState() {
  const savedState = localStorage.getItem('neuroagent_study_state');
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      state.unlockedChapters = parsed.unlockedChapters || [0];
      state.completedChapters = parsed.completedChapters || [];
      state.currentChapterIndex = parsed.currentChapterIndex || 0;
    } catch (e) {
      console.error("Error reading saved state", e);
    }
  }
}

// Save progress to LocalStorage
function saveState() {
  localStorage.setItem('neuroagent_study_state', JSON.stringify({
    unlockedChapters: state.unlockedChapters,
    completedChapters: state.completedChapters,
    currentChapterIndex: state.currentChapterIndex
  }));
}

// Render the Sidebar menu
function renderNavigation() {
  chaptersNav.innerHTML = '';
  chapters.forEach((ch, index) => {
    const isUnlocked = BYPASS_CHAPTER_LOCK || state.unlockedChapters.includes(index);
    const isCompleted = state.completedChapters.includes(index);
    const isActive = state.currentChapterIndex === index;

    const navItem = document.createElement('div');
    navItem.className = `nav-item ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`;
    
    // Status marker icon
    let statusMarker = '🔒';
    if (isCompleted) {
      statusMarker = '✅';
    } else if (state.unlockedChapters.includes(index)) {
      statusMarker = '📖';
    } else if (BYPASS_CHAPTER_LOCK) {
      statusMarker = '🔓';
    }

    if (ch.id === 'resources') {
      navItem.innerHTML = `
        <span class="nav-item-status">🎥</span>
        <span>${ch.title}</span>
      `;
    } else {
      navItem.innerHTML = `
        <span class="nav-item-status">${statusMarker}</span>
        <span>Ch ${index + 1}: ${ch.title}</span>
      `;
    }

    if (isUnlocked) {
      navItem.addEventListener('click', () => {
        state.currentChapterIndex = index;
        saveState();
        renderNavigation();
        loadChapter(index);

        // Close mobile nav menu
        chaptersNav.classList.remove('open');
        const arrow = document.querySelector('.mobile-nav-toggle-arrow');
        if (arrow) arrow.textContent = '▼';
      });
    }

    chaptersNav.appendChild(navItem);
  });

  // Update mobile toggle text to active chapter
  const mobileToggleText = document.getElementById('mobile-nav-toggle-text');
  if (mobileToggleText) {
    const activeCh = chapters[state.currentChapterIndex];
    if (activeCh.id === 'resources') {
      mobileToggleText.textContent = `🎥 ${activeCh.title}`;
    } else {
      mobileToggleText.textContent = `📖 Ch ${state.currentChapterIndex + 1}: ${activeCh.title}`;
    }
  }
}

// Load and render chapter content
function loadChapter(index) {
  const chapter = chapters[index];
  
  // Build header HTML
  const badgeText = chapter.id === 'resources' ? 'Resources' : `Chapter 0${index + 1}`;
  let html = `
    <header class="chapter-header">
      <span class="chapter-badge">${badgeText}</span>
      <h1 class="chapter-title">${chapter.title}</h1>
      <p class="chapter-summary">${chapter.summary}</p>
    </header>
  `;

  // Append sections
  chapter.sections.forEach(sec => {
    html += `
      <section class="content-section" id="${sec.id}" data-region="${sec.highlightRegion || 'none'}">
        ${sec.content}
      </section>
    `;
  });

  chapterContainer.innerHTML = html;
  
  // Render math typesetting manually using simple replacements if math exists
  // Since we have LaTeX strings, let's parse inline \(...\) and block \[...\]
  typesetMathInContainer(chapterContainer);

  // Initialize glossary term hover listeners
  initGlossaryTooltips();

  // Scroll reader pane back to top
  readerPane.scrollTop = 0;

  // Reveal quiz trigger card if quiz exists
  if (chapter.quiz && chapter.quiz.length > 0) {
    quizTriggerSection.classList.remove('hidden');
  } else {
    quizTriggerSection.classList.add('hidden');
  }

  // Setup intersection observer for scroll-triggered visualizer updates
  setupSectionObserver();

  // Reset visualizer rotation/highlights
  if (visualizer) {
    visualizer.highlightRegion(chapter.sections[0]?.highlightRegion || 'none');
  }
}

// Typeset simple LaTeX formulas to HTML
function typesetMathInContainer(container) {
  container.innerHTML = formatMathHTML(container.innerHTML);
}

function formatMathHTML(text) {
  if (!text) return '';
  let formatted = text;

  // Replace markdown bold ** ... ** with <strong> ... </strong>
  formatted = formatted.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');

  // Replace block math \[ ... \] with styled divs
  formatted = formatted.replace(/\\\[([\s\S]*?)\\\]/g, (match, equation) => {
    return `<div class="math-block" style="text-align: center; margin: 15px 0; font-family: var(--font-display); font-size: 1.1em; color: var(--accent-cyan);">${renderLaTeXSymbols(equation)}</div>`;
  });

  // Replace inline math \( ... \) with spans
  formatted = formatted.replace(/\\\(([\s\S]*?)\\\)/g, (match, equation) => {
    return `<span class="math-inline" style="font-family: var(--font-display); color: var(--accent-cyan);">${renderLaTeXSymbols(equation)}</span>`;
  });

  // Replace dollar math $ ... $ with spans
  formatted = formatted.replace(/\$([\s\S]*?)\$/g, (match, equation) => {
    return `<span class="math-inline" style="font-family: var(--font-display); color: var(--accent-cyan);">${renderLaTeXSymbols(equation)}</span>`;
  });

  return formatted;
}

function renderLaTeXSymbols(eq) {
  return eq
    .replace(/\\hat\{([A-Za-z0-9_]+)\}/g, '$1&#x0302;')
    .replace(/\\frac\{([^\}]+)\}\{([^\}]+)\}/g, '<span class="fraction" style="display: inline-flex; flex-direction: column; vertical-align: middle; text-align: center; line-height: 1.2; font-size: 0.9em; margin: 0 4px;"><span class="numerator" style="border-bottom: 1px solid currentColor; padding: 0 4px;">$1</span><span class="denominator" style="padding: 0 4px;">$2</span></span>')
    .replace(/\\text\{([A-Za-z0-9\s\-\+]+)\}/g, '$1')
    .replace(/\\approx/g, '≈')
    .replace(/\\rightarrow/g, '→')
    .replace(/\\sqrt\{([A-Za-z0-9]+)\}/g, '√$1')
    .replace(/\\mathbf\{([A-Za-z0-9_]+)\}/g, '<strong>$1</strong>')
    .replace(/\\boldsymbol\{([A-Za-z0-9_]+)\}/g, '<strong>$1</strong>')
    .replace(/\\mathbb\{E\}/g, '𝔼')
    .replace(/\\mathbb\{R\}/g, 'ℝ')
    .replace(/\\mathbb\{I\}/g, '𝕀')
    .replace(/\\parallel/g, '∥')
    .replace(/\\infty/g, '∞')
    .replace(/\\int/g, '∫')
    .replace(/\\cdot/g, '·')
    .replace(/\\ln/g, 'ln')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\theta/g, 'θ')
    .replace(/\\tau/g, 'τ')
    .replace(/\\sigma/g, 'σ')
    .replace(/\\mu/g, 'μ')
    .replace(/\\vartheta/g, 'ϑ')
    .replace(/\\rho/g, 'ρ')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\sum/g, '∑')
    .replace(/_([A-Za-z0-9\{\}\+\-\*\/]+)/g, (m, p) => {
      const clean = p.replace(/[\{\}]/g, '');
      return `<sub>${clean}</sub>`;
    })
    .replace(/\^([A-Za-z0-9\{\}\+\-\*\/]+)/g, (m, p) => {
      const clean = p.replace(/[\{\}]/g, '');
      return `<sup>${clean}</sup>`;
    });
}


// Observe which section is active as user scrolls
function setupSectionObserver() {
  if (sectionObserver) {
    sectionObserver.disconnect();
  }

  const sections = chapterContainer.querySelectorAll('.content-section');
  
  sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove class from others
        sections.forEach(s => s.classList.remove('active-scroll'));
        
        // Add to active
        entry.target.classList.add('active-scroll');

        // Extract region and tell Three.js to highlight
        const region = entry.target.getAttribute('data-region') || 'none';
        if (visualizer) {
          visualizer.highlightRegion(region);
        }
        updateHUD(region);
      }
    });
  }, {
    root: readerPane,
    threshold: 0.35, // Trigger when ~35% of the section is in the viewport
    rootMargin: "-10% 0px -40% 0px" // Focus on center-upper viewport
  });

  sections.forEach(sec => sectionObserver.observe(sec));
}

// Update the HUD elements
function updateHUD(region) {
  hudActiveRegion.textContent = `Active Region: ${region.toUpperCase().replace('_', ' ')}`;
  
  // Set region color
  const colors = {
    neocortex: 'var(--accent-yellow)',
    thalamus: 'var(--accent-magenta)',
    hippocampus: 'var(--accent-green)',
    hypothalamus: 'var(--accent-purple)',
    visual_pathway: 'var(--accent-blue)',
    brainstem: 'var(--text-secondary)',
    none: 'var(--accent-cyan)'
  };
  hudActiveRegion.style.color = colors[region] || 'var(--accent-cyan)';
  
  hudRegionDetails.innerHTML = formatMathHTML(regionHUDDetails[region] || regionHUDDetails['none']);
}

// Update top statistics progress bar
function updateProgressBar() {
  const total = chapters.length;
  const completed = state.completedChapters.length;
  const percent = Math.round((completed / total) * 100);
  
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
}

// Open Quiz Modal
function openQuiz() {
  const chapter = chapters[state.currentChapterIndex];
  if (!chapter.quiz || chapter.quiz.length === 0) return;

  state.quizActive = true;
  state.currentQuestionIndex = 0;
  state.selectedOptionIndex = null;
  state.quizAnswers = [];

  quizTitle.textContent = `Chapter ${state.currentChapterIndex + 1} Assessment`;
  quizOverlay.classList.remove('hidden');

  renderQuestion();
}

// Render the active quiz question
function renderQuestion() {
  const chapter = chapters[state.currentChapterIndex];
  const q = chapter.quiz[state.currentQuestionIndex];

  // Update progress indicator
  const progressPercent = ((state.currentQuestionIndex) / chapter.quiz.length) * 100;
  quizProgressFill.style.width = `${progressPercent}%`;
  quizQuestionNumber.textContent = `Question ${state.currentQuestionIndex + 1} of ${chapter.quiz.length}`;

  quizQuestionText.textContent = q.question;
  quizOptionsContainer.innerHTML = '';
  quizFeedback.classList.add('hidden');
  state.selectedOptionIndex = null;

  q.options.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectOption(index));
    quizOptionsContainer.appendChild(btn);
  });
}

// Handle option selection
function selectOption(index) {
  if (state.selectedOptionIndex !== null) return; // Prevent double answer submission

  state.selectedOptionIndex = index;
  const chapter = chapters[state.currentChapterIndex];
  const q = chapter.quiz[state.currentQuestionIndex];
  const options = quizOptionsContainer.querySelectorAll('.quiz-option');

  options[index].classList.add('selected');

  // Evaluate
  const isCorrect = index === q.answerIndex;
  state.quizAnswers.push(isCorrect);

  // Visual feedback
  setTimeout(() => {
    options[index].classList.remove('selected');
    if (isCorrect) {
      options[index].classList.add('correct');
      feedbackStatus.textContent = 'Correct Answer';
      feedbackStatus.className = 'feedback-status correct-status';
    } else {
      options[index].classList.add('incorrect');
      options[q.answerIndex].classList.add('correct');
      feedbackStatus.textContent = 'Incorrect Answer';
      feedbackStatus.className = 'feedback-status incorrect-status';
    }

    feedbackExplanation.textContent = q.explanation;
    
    // Set next button text
    if (state.currentQuestionIndex === chapter.quiz.length - 1) {
      nextQuestionBtn.textContent = 'Complete Quiz';
    } else {
      nextQuestionBtn.textContent = 'Next Question';
    }

    quizFeedback.classList.remove('hidden');
  }, 350);
}

// Next question or finish
function handleNextQuestion() {
  const chapter = chapters[state.currentChapterIndex];

  if (state.currentQuestionIndex < chapter.quiz.length - 1) {
    state.currentQuestionIndex++;
    renderQuestion();
  } else {
    // Evaluation of the final quiz score
    const correctCount = state.quizAnswers.filter(ans => ans === true).length;
    const passThreshold = Math.ceil(chapter.quiz.length * 0.7); // 70% threshold
    const passed = correctCount >= passThreshold;

    if (passed) {
      // Mark as completed
      if (!state.completedChapters.includes(state.currentChapterIndex)) {
        state.completedChapters.push(state.currentChapterIndex);
      }

      // Unlock next chapter
      const nextIndex = state.currentChapterIndex + 1;
      if (nextIndex < chapters.length && !state.unlockedChapters.includes(nextIndex)) {
        state.unlockedChapters.push(nextIndex);
      }

      saveState();
      renderNavigation();
      updateProgressBar();

      alert(`Congratulations! You passed the quiz with ${correctCount}/${chapter.quiz.length} correct answers. Next chapter is unlocked!`);
      closeQuiz();
    } else {
      alert(`Quiz failed: You got ${correctCount}/${chapter.quiz.length} correct. You need at least ${passThreshold} to pass. Please review the material and try again!`);
      renderQuestion(); // Restart this question loop
    }
  }
}

// Close Quiz Modal
function closeQuiz() {
  state.quizActive = false;
  quizOverlay.classList.add('hidden');
}

// Glossary Tooltip Implementation
const glossaryTooltip = document.getElementById('glossary-tooltip');
const tooltipTermTitle = document.getElementById('tooltip-term-title');
const tooltipDefinition = document.getElementById('tooltip-definition');
const tooltipWikiLink = document.getElementById('tooltip-wiki-link');
let hideTooltipTimeout = null;

function initGlossaryTooltips() {
  const terms = document.querySelectorAll('.glossary-term');
  
  terms.forEach(termEl => {
    termEl.addEventListener('mouseenter', () => {
      const termKey = termEl.getAttribute('data-term')?.toLowerCase();
      if (!termKey || !glossary[termKey]) return;
      
      const data = glossary[termKey];
      tooltipTermTitle.textContent = data.term;
      tooltipDefinition.textContent = data.definition;
      tooltipWikiLink.href = data.wiki;
      
      if (hideTooltipTimeout) {
        clearTimeout(hideTooltipTimeout);
        hideTooltipTimeout = null;
      }
      
      // Position the tooltip
      const rect = termEl.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      // Set to visible class first so it has layout size
      glossaryTooltip.classList.add('visible');
      
      const tooltipHeight = glossaryTooltip.offsetHeight;
      const tooltipWidth = glossaryTooltip.offsetWidth;
      
      let top = rect.top + scrollTop - 12 - tooltipHeight;
      let left = rect.left + scrollLeft + (rect.width / 2) - (tooltipWidth / 2);
      
      // If tooltip would go off the top of the viewport, place it below the term
      if (rect.top - 20 - tooltipHeight < 0) {
        top = rect.bottom + scrollTop + 12;
        glossaryTooltip.classList.remove('tooltip-above');
        glossaryTooltip.classList.add('tooltip-below');
      } else {
        glossaryTooltip.classList.remove('tooltip-below');
        glossaryTooltip.classList.add('tooltip-above');
      }
      
      // Boundary check for horizontal edges
      if (left < 10) {
        left = 10;
      } else if (left + tooltipWidth > window.innerWidth - 10) {
        left = window.innerWidth - tooltipWidth - 10;
      }
      
      glossaryTooltip.style.top = `${top}px`;
      glossaryTooltip.style.left = `${left}px`;
    });
    
    termEl.addEventListener('mouseleave', () => {
      hideTooltipTimeout = setTimeout(() => {
        glossaryTooltip.classList.remove('visible');
      }, 250);
    });
  });
}

if (glossaryTooltip) {
  glossaryTooltip.addEventListener('mouseenter', () => {
    if (hideTooltipTimeout) {
      clearTimeout(hideTooltipTimeout);
      hideTooltipTimeout = null;
    }
  });
  
  glossaryTooltip.addEventListener('mouseleave', () => {
    hideTooltipTimeout = setTimeout(() => {
      glossaryTooltip.classList.remove('visible');
    }, 250);
  });
}

// Run on window loaded
window.addEventListener('DOMContentLoaded', initApp);
