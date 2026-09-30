# WHAT LURKS IN THE DARK?

An art-directed, immersive gothic horror inquiry designed for the harvest moon. Seven evocative questions reveal the supernatural archetype walking in your shadow.

---

## Overview

**WHAT LURKS IN THE DARK?** is an editorial horror web experience that departs from generic quiz templates. Built with a 19th-century literary print aesthetic, stark typography, dominant dark artwork, a dynamic torchlight beam, and a fully synthesized procedural dark ambient soundtrack.

---

## Features

### Pitch-Black Shroud & Cursor Torchlight
The inquiry begins in absolute darkness. As the pointer moves across the screen, a dynamic torchlight cone illuminates the haunted forest, solitary lantern, and nocturnal mist beneath. The area outside the beam dissolves back into shadow.

### Procedural Dark Ambient Horror BGM
A complete, zero-asset horror soundtrack powered entirely by the Web Audio API:
- **D-Minor Dark Drone Synth**: Detuned oscillators with slow LFO resonant low-pass filter sweeps.
- **Spectral Nocturnal Wind**: Procedural noise buffer filtered through an evolving bandpass oscillator to emulate howling autumnal wind gusts.
- **Subterranean Tension Heartbeat**: Muffled double-thump pulses (48Hz / 42Hz) that intensify during question scenes.
- **Gothic Cathedral Bell Tolls**: Sparse inharmonic bell tolls echoing through a simulated cavern delay network.
- **Stage Adaptability**: Automatically modulates sound density and tension between Landing, Inquiry, and Result reveal stages.
- **Live Equalizer Visualizer**: Responsive 3-bar audio toggle button with volume ramp-down to prevent clicks.

### Dominant Scene Composition
Each question is paired with a full-bleed bespoke horror painting:
- The Midnight Crossroads
- The Ancestral Portrait Gallery
- The Flooded Cellar
- The Mausoleum Gate
- The Raven on the Gabled Roof
- The Grandfather Clock at 03:00
- The Fog-Draped Harvest Moon

### The Five Nocturnal Archetypes
Detailed psychological profiles and bespoke artwork for each result:
- **The Vampire**: The Aristocrat of the Midnight Court
- **The Witch**: The Keeper of the Unspoken Hearth
- **The Ghost**: The Anchor Between Two Shores
- **The Werewolf**: The Untamed Blood of the Forest
- **The Reaper**: The Patient Steward of the Threshold

### Precision Cursor & Atmospheric Feedback
- Native pointer arrow visibility paired with a luminous amber lantern aura.
- Tactile acoustic feedback: dry parchment selection clicks and gothic cathedral chime tolls on creature reveals.
- Keyboard navigation shortcuts (`1-4` or `A-D`).
- Native Web Share API integration with clipboard copy fallback.

---

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Audio Engine**: Web Audio API (100% procedural synthesis, zero external MP3s)
- **Styling**: Vanilla CSS Design System (Custom properties, CSS radial masks, mix-blend modes)
- **Typography**: Google Fonts (*Cinzel* & *EB Garamond*)
- **Linter**: Oxlint

---

## Getting Started

### Prerequisites
Node.js (v18 or higher) and npm.

### Installation
```bash
git clone https://github.com/Vedanshi-Prajapati/halloween-horror.git
cd halloween-horror
npm install
```

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## Project Structure

```text
halloween-horror/
├── public/
│   ├── assets/               # Bespoke horror illustrations
│   └── favicon.svg           # Custom gothic raven icon
├── src/
│   ├── components/
│   │   ├── Answer.jsx        # Question answer option
│   │   ├── AudioToggle.jsx   # Live BGM toggle with animated visualizer
│   │   ├── CustomCursor.jsx  # Atmospheric lantern halo follower
│   │   ├── GrainOverlay.jsx  # Authentic rag-paper SVG noise overlay
│   │   ├── Landing.jsx       # Torchlight landing screen
│   │   ├── Progress.jsx      # Minimalist question progress indicator
│   │   ├── Question.jsx      # Scene-dominant inquiry view
│   │   └── Result.jsx        # Archetype reveal, traits & share actions
│   ├── data/
│   │   └── quizData.js       # Questions, choices, scoring matrix & profiles
│   ├── utils/
│   │   └── audio.js          # Procedural Web Audio API sound engine
│   ├── App.jsx               # Master stage controller & asset preloader
│   ├── index.css             # Editorial dark theme design system
│   └── main.jsx              # Application entry point
├── .agents/
│   └── rules/                # Workspace rules and conventions
├── index.html                # HTML5 entry with preconnected typography
├── package.json
└── vite.config.js
```

---

## License

MIT
