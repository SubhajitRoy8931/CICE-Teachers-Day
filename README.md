# CICE Teachers' Day 2026

## Overview

CICE Teachers' Day 2026 is a cinematic, single-page interactive experience created for CICE Computer Institute. Instead of presenting a traditional Teachers' Day greeting, the website unfolds like a short visual story. It begins with a computer-style system boot, moves through CICE's journey, introduces the people and teacher behind that journey, reflects on the impact of teaching, and gradually arrives at a final message of gratitude.

The experience is designed to be watched from beginning to end rather than navigated like a conventional website. Scenes progress automatically, with carefully timed text, animations, photographs, pauses, and background music creating a calm cinematic flow.

## Story Sequence

1. **System Boot** — The experience opens with a computer-style boot sequence.
2. **The Greeting** — A keyboard-based animation builds the Teachers' Day greeting.
3. **Founding Archive** — The story moves into CICE's beginnings.
4. **Classroom History** — The experience reflects on the classroom journey.
5. **The People** — The students and people who shaped the journey come into focus.
6. **The Teacher** — The story turns toward the teacher at the heart of it all.
7. **The Impact** — The experience reflects on the lasting impact of teaching.
8. **Final Memory** — Real photographs gradually form a final memory mosaic.
9. **Poetic Closing** — A short poetic reflection brings the story toward its conclusion.
10. **Final Thank You** — The experience ends with a simple message of gratitude.

## Key Features

- **Click-to-start experience** so the website and music begin together.
- **Cinematic automatic progression** without requiring the viewer to scroll through the story.
- **Keyboard animation** in which greeting characters are launched from their matching physical keys.
- **Background music** with a fixed mute/unmute control.
- **Tab visibility handling** that pauses the background music when the browser tab is hidden and resumes it when the viewer returns.
- **Real CICE photographs** used as part of the visual storytelling.
- **Progressive memory mosaic** that reveals the final photographs gradually.
- **Responsive layout** designed for both desktop and mobile screens.

## Photo System

The final memory section uses 50 approved photographs. On larger screens, the photographs are arranged as a 10-column by 5-row mosaic. On mobile screens, the same collection adapts to a 5-column by 10-row layout.

The photographs appear progressively rather than all being shown at once, allowing the final memory section to build gradually and maintain the cinematic pacing of the experience.

## Audio

The experience uses continuous background music that starts with the main experience after the viewer clicks **Click to start**. A fixed circular control allows the viewer to mute or unmute the music at any time.

The website also handles browser tab visibility so that music is paused when the tab is hidden and can resume when the viewer returns.

## Responsive Design

The visual experience is designed to adapt between desktop and mobile displays. Typography, spacing, controls, scene layouts, and the final photograph mosaic are adjusted through responsive CSS rules while keeping the overall cinematic visual direction consistent.

## Project Structure

```text
CICE-Teachers-Day/
├── index.html
├── style.css
├── script.js
└── assets/
```

- `index.html` — Contains the page structure and scene markup.
- `style.css` — Contains the main visual styling, animations, and responsive rules.
- `script.js` — Controls the cinematic sequence, interactions, audio, and progressive photo presentation.
- `assets/` — Contains the photographs and other media used by the experience.

## Technical Notes

The website is built with standard HTML, CSS, and JavaScript without a front-end framework. The scenes are coordinated through JavaScript timing and transitions so the experience behaves like a continuous presentation rather than a conventional multi-page site.

Section 2 uses a labelled QWERTY keyboard. Each greeting character is launched from the matching physical key and travels to its final position at the top of the screen. The keyboard remains visible until the greeting has completely formed.

The final memory section creates the photograph mosaic progressively, while the responsive CSS changes the grid arrangement for smaller screens.

## Design Principles

- Royal blue is the primary visual direction.
- Deep navy and black backgrounds support the cinematic atmosphere.
- Real photographs are used naturally as the visual backbone.
- The design avoids generic Teachers' Day template styling.
- No unnecessary hearts, balloons, confetti, or excessive neon effects.
- No invented memories, buildings, dates, or events.
- The experience prioritizes pacing, pauses, typography, photography, and atmosphere over conventional website UI.
- The final screen ends on gratitude rather than navigation or promotional content.

## Credits

**Created by Subhajit Roy**
