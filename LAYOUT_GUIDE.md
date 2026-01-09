# Siryus Hub Splash Screen - Visual Layout Guide

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌──────────────┐                                              │
│  │  SIRYUS A.M  │  ← Logo Placeholder (Top Left)               │
│  └──────────────┘    (Replace with your actual logo)           │
│                                                                 │
│                                                                 │
│                                                                 │
│              ╔═══════════════════════════╗                     │
│              ║                           ║                     │
│              ║                           ║                     │
│              ║         ╔═══╗             ║                     │
│              ║         ║ A ║  SIRYUS  ╔═══╗                   │
│              ║         ╚═══╝          ║ M ║                   │
│              ║                         ╚═══╝                   │
│              ║         Large Letters    ║                     │
│              ║       (White, Glowing)   ║                     │
│              ║                           ║                     │
│              ║    Text rotates between:  ║                     │
│              ║    • SIRYUS (A & M show)  ║                     │
│              ║    • SIRYUS HUB           ║                     │
│              ║    • Siryus Creative...   ║                     │
│              ║    • Siryus Community     ║                     │
│              ║                           ║                     │
│              ╚═══════════════════════════╝                     │
│                                                                 │
│                                                                 │
│                                                                 │
│                                                                 │
│                                                                 │
│                    ╔═══════════════════╗                       │
│                    ║ Click To Enter    ║  ← Skip Text          │
│                    ╚═══════════════════╝    (Pulsing Ring)     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Background: Black (#000000)
Text Color: White (#FFFFFF)
Accent Colors: Indigo (#4F46E5) & Purple (#7C3AED)
```

## Component Breakdown

### 1. Logo Placeholder (Top Left)
```
Location: Fixed position, 2rem from top and left
Current: Purple gradient box with "SIRYUS A.M"
Action needed: Replace with actual logo image
Size: ~180-200px width
```

### 2. Large Letters (A & M)
```
Size: 8-15rem (responsive with clamp)
Color: White with purple/indigo glow
Animation: Floating/pulsing (3s loop)
Visibility: Only show when "SIRYUS" text is displayed
Transition: 600ms fade in/out
```

### 3. Text Rotation Area (Center)
```
Font size: 2.5-4.5rem (responsive)
Color: White with subtle glow
Animation: Fade in/out between texts
Duration: 2.5s per text
Loop: Continuous until page exit
```

### 4. Click to Enter (Bottom Center)
```
Position: Fixed, 4rem from bottom
Font: Bold, uppercase, 1.2rem
Animation: Blinking text (2s loop)
Ring: Pulsing border effect around text
```

### 5. Background Elements
```
Particles: 5 circular gradient orbs
Animation: Slow floating (20-30s loops)
Overlay: Radial gradient (dark edges → lighter center)
Effect: Creates depth and focus
```

## Animation Timeline

```
TIME    EVENT
────────────────────────────────────────────
0.0s    Page loads
0.0s    → Logo fades in from top
0.0s    → Center content scales in
0.5s    → "Click to Enter" fades in from bottom
0.0s    → Background particles start floating
0.0s    → Letters A & M start pulsing
0.0s    → Text shows "SIRYUS" (A & M visible)
        
2.5s    → Text fades out
2.5s    → A & M fade out
3.1s    → Text fades in: "SIRYUS HUB"
        
5.6s    → Text fades out
6.2s    → Text fades in: "Siryus Creative Media Ltd"
        
8.7s    → Text fades out
9.3s    → Text fades in: "Siryus Community"
        
10.0s   → Auto-transition to home (fade to black)

OR

ANY TIME: User clicks/presses key → Immediate transition
```

## State Diagram

```
┌─────────────┐
│   INITIAL   │
│   (Load)    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│   STATE 1: SIRYUS                   │
│   - A visible                       │
│   - M visible                       │
│   - Duration: 2.5s                  │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│   STATE 2: SIRYUS HUB               │
│   - A hidden                        │
│   - M hidden                        │
│   - Duration: 2.5s                  │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│   STATE 3: Siryus Creative Media    │
│   - A hidden                        │
│   - M hidden                        │
│   - Duration: 2.5s                  │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│   STATE 4: Siryus Community         │
│   - A hidden                        │
│   - M hidden                        │
│   - Duration: 2.5s                  │
└──────┬──────────────────────────────┘
       │
       │ (Loops back to STATE 1)
       └────────┐
                │
       ┌────────┘
       │
       ▼
┌─────────────┐
│  LOOP UNTIL │
│  TRANSITION │
└─────────────┘
```

## User Interaction Flow

```
                    ┌──────────────┐
                    │  User Lands  │
                    │   on Page    │
                    └──────┬───────┘
                           │
                ┌──────────┴──────────┐
                │                     │
         ┌──────▼──────┐      ┌─────▼──────┐
         │ Waits 10s   │      │  Takes      │
         │             │      │  Action     │
         └──────┬──────┘      └─────┬──────┘
                │                   │
                │             ┌─────┴─────┐
                │             │           │
                │      ┌──────▼─────┐ ┌──▼────────┐
                │      │ Clicks     │ │ Presses   │
                │      │ Mouse      │ │ Key       │
                │      └──────┬─────┘ └──┬────────┘
                │             │           │
                └─────────────┴───────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Fade Out (0.5s)   │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Navigate to Home  │
                    └────────────────────┘
```

## Responsive Behavior

### Desktop (1024px+)
```
┌─────────────────────────────────────┐
│ [LOGO]                              │
│                                     │
│        A    SIRYUS    M             │
│       15rem  4.5rem  15rem          │
│                                     │
│        [Click To Enter]             │
└─────────────────────────────────────┘
```

### Tablet (768-1023px)
```
┌───────────────────────────┐
│ [LOGO]                    │
│                           │
│     A   SIRYUS   M        │
│    12rem  3.5rem  12rem   │
│                           │
│    [Click To Enter]       │
└───────────────────────────┘
```

### Mobile (< 768px)
```
┌──────────────────┐
│ [LOGO]           │
│                  │
│        A         │
│      8rem        │
│                  │
│     SIRYUS       │
│      2.5rem      │
│                  │
│        M         │
│      8rem        │
│                  │
│ [Click To Enter] │
└──────────────────┘
```

## Color Palette

```
╔════════════════════════════════════════╗
║  PRIMARY COLORS                        ║
╠════════════════════════════════════════╣
║                                        ║
║  ███████  Background: #000000 (Black)  ║
║                                        ║
║  ███████  Text: #FFFFFF (White)        ║
║                                        ║
║  ███████  Accent 1: #4F46E5 (Indigo)   ║
║                                        ║
║  ███████  Accent 2: #7C3AED (Purple)   ║
║                                        ║
╚════════════════════════════════════════╝

GRADIENTS:
• Logo: Linear 135° (#4F46E5 → #7C3AED)
• Particles: Linear 135° (rgba(79,70,229,0.3) → rgba(124,58,237,0.3))
• Overlay: Radial (center lighter → edges darker)

SHADOWS/GLOWS:
• Letter glow: Multiple layers of purple/indigo
• Text shadow: Subtle white + purple glow
```

## Typography

```
╔═══════════════════════════════════════════╗
║  FONT FAMILY                              ║
╠═══════════════════════════════════════════╣
║  Primary: 'Inter' (Google Fonts)          ║
║  Weights: 700 (Bold), 900 (Black)         ║
║  Fallback: System fonts                   ║
╚═══════════════════════════════════════════╝

SIZES:
┌────────────────────────────────────┐
│ Large Letters (A/M)                │
│ → clamp(8rem, 20vw, 15rem)         │
│ → Weight: 900                      │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Rotating Text (SIRYUS, etc.)       │
│ → clamp(2.5rem, 6vw, 4.5rem)       │
│ → Weight: 700                      │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Click to Enter                     │
│ → 1.2rem                           │
│ → Weight: 700                      │
│ → Letter-spacing: 3px              │
│ → Transform: uppercase             │
└────────────────────────────────────┘
```

## Animation Details

### Letter Float & Pulse
```
Duration: 3s
Easing: ease-in-out
Loop: infinite

Keyframes:
0%   → translateY(0) scale(1)
50%  → translateY(-20px) scale(1.05)
100% → translateY(0) scale(1)
```

### Text Glow
```
Duration: 2s
Easing: ease-in-out
Loop: infinite

Keyframes:
0%   → Shadow: 20px / 40px blur
50%  → Shadow: 30px / 60px blur
100% → Shadow: 20px / 40px blur
```

### Particle Float
```
Duration: 20-30s (varies per particle)
Easing: ease-in-out
Loop: infinite

Keyframes:
0%   → translate(0, 0) scale(1) opacity(0.3)
25%  → translate(50px, -50px) scale(1.1) opacity(0.5)
50%  → translate(100px, 50px) scale(0.9) opacity(0.3)
75%  → translate(-50px, 100px) scale(1.05) opacity(0.4)
100% → translate(0, 0) scale(1) opacity(0.3)
```

### Click Blink
```
Duration: 2s
Easing: ease-in-out
Loop: infinite

Keyframes:
0%   → opacity: 0.9
50%  → opacity: 0.4
100% → opacity: 0.9
```

### Ring Pulse
```
Duration: 2s
Easing: ease-out
Loop: infinite

Keyframes:
0%   → scale(1) opacity(0.6)
50%  → scale(1.2) opacity(0.3)
100% → scale(1) opacity(0.6)
```

---

## Implementation Checklist

- [x] Logo placeholder created
- [x] Large A letter with animations
- [x] Large M letter with animations
- [x] Text rotation system (4 variations)
- [x] A/M visibility synced with "SIRYUS"
- [x] Background particles (5 total)
- [x] Gradient overlay
- [x] Click to Enter text
- [x] Pulsing ring effect
- [x] 10-second auto-transition
- [x] Click to skip functionality
- [x] Keyboard skip functionality
- [x] Responsive design (mobile/tablet/desktop)
- [x] Reduced motion support
- [x] Focus states for accessibility
- [x] Smooth fade transitions
- [x] No console errors
- [x] Production-ready code

---

## Testing Scenarios

1. **Load Test**: Page loads without errors
2. **Auto-Transition**: After 10s, redirects to home
3. **Click Skip**: Click anywhere → immediate redirect
4. **Keyboard Skip**: Press any key → immediate redirect
5. **Text Rotation**: All 4 texts display in sequence
6. **Letter Sync**: A/M only show with "SIRYUS"
7. **Mobile View**: Layout stacks vertically
8. **Tablet View**: Adjusted spacing works
9. **Desktop View**: Full horizontal layout
10. **Reduced Motion**: Animations disabled when set
11. **Keyboard Focus**: Body can be focused
12. **Animation Smoothness**: 60fps on modern devices

---

This visual guide should help you understand exactly how everything is laid out and functions together!
