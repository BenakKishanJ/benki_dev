// ─────────────────────────────────────────────────────────────────────────────
// src/data/projects.ts
// Single source of truth for all projects.
// Both the listing page (/projects) and detail pages (/projects/[slug])
// pull from this file — so you only ever edit one place.
// ─────────────────────────────────────────────────────────────────────────────

export type Status = "live" | "wip" | "archived";

export type Section =
  | { type: "text"; content: string }
  | { type: "heading"; content: string }
  | { type: "code"; lang: string; filename?: string; code: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "gallery"; images: { src: string; alt: string }[] }
  | { type: "video"; url: string; caption?: string } // YouTube embed URL
  | { type: "callout"; icon: string; content: string }; // icon is an emoji

export interface Project {
  slug: string; // URL key — must be unique, URL-safe
  title: string;
  description: string; // one-liner for cards
  longDesc: string; // two-sentence card body
  status: Status;
  tags: string[];
  color: string; // CSS variable or hex
  github: string | null;
  demo: string | null;

  // ── detail-page fields ──────────────────────────────────────────────────
  heroTagline?: string; // bold sub-heading under title in detail hero
  sections: Section[]; // ordered content blocks
  timeline?: string; // e.g. "Jan 2024 – present"
  role?: string; // e.g. "Solo developer"
}

// ─────────────────────────────────────────────────────────────────────────────
// ▼▼▼  ADD / EDIT YOUR PROJECTS BELOW  ▼▼▼
// ─────────────────────────────────────────────────────────────────────────────
export const projects: Project[] = [
  // ── 1. BenKi.dev ──────────────────────────────────────────────────────────
  {
    slug: "benki-dev",
    title: "BenKi.dev",
    description:
      "This site — a dev blog built with Astro, MDX, and zero JS frameworks.",
    longDesc:
      "Static-first blog with a custom terminal component, tilt/magnetic animations, and a five-colour design system. Fast by default, fun on purpose.",
    status: "live",
    tags: ["Astro", "MDX", "TypeScript", "CSS"],
    color: "var(--purple)",
    github: "https://github.com",
    demo: "https://benki.dev",
    heroTagline:
      "A developer blog that actually looks like a developer made it.",
    timeline: "Jan 2024 – present",
    role: "Designer + developer",
    sections: [
      {
        type: "text",
        content: `Most dev blogs are generated from a starter and never touched. I wanted mine to feel intentional — a five-colour system (orange, purple, yellow, blue, lime) that's loud but coherent, and a terminal component that makes code feel like it lives in the stack rather than pasted from a docs site.`,
      },
      {
        type: "heading",
        content: "Design system",
      },
      {
        type: "code",
        lang: "css",
        filename: "global.css",
        code: `:root {
  --orange:  #FF6A1A;
  --purple:  #9B5CF6;
  --yellow:  #FFD60A;
  --blue:    #3DA9FC;
  --lime:    #B6FF3C;

  --grad-main: linear-gradient(120deg, var(--orange), var(--purple) 55%, var(--blue));
}`,
      },
      {
        type: "callout",
        icon: "🎨",
        content:
          "All colours pass WCAG AA contrast on the dark background. The gradient is used sparingly — logo, primary button, scrollbar thumb, gradient text — so it stays impactful.",
      },
      {
        type: "heading",
        content: "Terminal component",
      },
      {
        type: "code",
        lang: "astro",
        filename: "Terminal.astro",
        code: `---
const { title = "zsh — benki.dev" } = Astro.props;
---
<div class="terminal">
  <div class="terminal-bar">
    <span class="dot red"/>
    <span class="dot yellow"/>
    <span class="dot green"/>
    <span class="terminal-title">{title}</span>
  </div>
  <div class="terminal-body">
    <slot />
  </div>
</div>`,
      },
      {
        type: "image",
        src: "https://placehold.co/900x480/0D0D14/B6FF3C?text=Terminal+component+preview",
        alt: "Terminal component in use",
        caption:
          "The same Terminal component is reused on the homepage hero, About page, and project listings.",
      },
    ],
  },

  // ── 2. MindfulFlow ────────────────────────────────────────────────────────
  {
    slug: "mindfulflow",
    title: "MindfulFlow",
    description:
      "Context-aware digital wellbeing driven by on-device computer vision and AI.",
    longDesc:
      "A native Android companion designed to break toxic phone habits. By fusing real-time posture and blink-rate tracking with on-device AI coaching, it addresses both the physical and psychological toll of modern doomscrolling.",
    status: "live",
    tags: ["Kotlin", "Jetpack Compose", "ML Kit", "Gemini AI", "Android"],
    color: "var(--purple)", // Fits the V2 Dark Lavender theme perfectly
    github: "https://github.com",
    demo: "#", // Add Play Store or APK link here
    heroTagline:
      "Digital wellbeing that understands your physiology, not just your screen time.",
    timeline: "Feb 2026 – present",
    role: "Lead Developer & Designer",
    sections: [
      {
        type: "heading",
        content: "The Origin: Why build another screen time app?",
      },
      {
        type: "text",
        content: `This project is my brainchild, born from watching how many people—especially youth and children—waste their valuable time and energy doomscrolling. Modern social media algorithms are engineered to optimize for engagement, often making toxic behavior and negative emotions look "cool" just to keep users hooked.

The physical and psychological harms of this addiction triggered me to create a solution. I didn't want to build just another dumb app blocker; those just cause frustration and are easily bypassed. I wanted an active countermeasure with a personal feel—something that gives users a scientifically proven reason, and a better alternative, every single time they try to open a social app out of pure habit.`,
      },
      {
        type: "callout",
        icon: "📲",
        content:
          "Want to experience the real-time sensor fusion and interactive coaching firsthand? [Download the latest Android APK here](#).",
      },
      {
        type: "heading",
        content: "The Interface: What does it look like?",
      },
      {
        type: "text",
        content: `The interface is designed using a custom "Cyber-Arctic" dark theme built natively in Jetpack Compose. Instead of nesting insights deeply within endless settings pages, everything is exposed cleanly via an intuitive Bento-box layout and floating system-level overlays.`,
      },
      {
        type: "image",
        src: "/ScreentimeMockup.png",
        alt: "MindfulFlow Home Dashboard and Screen Time UI",
        caption:
          "The main Bento dashboard surfaces daily screen time analytics via interactive Vico charts.",
      },
      {
        type: "heading",
        content: "Why does digital wellness need AI?",
      },
      {
        type: "text",
        content: `Standard screen-time limits fail because they are entirely punitive. When a timer hits zero, an app blocks you, your brain craves the interrupted dopamine loop, and you immediately look for a way to override it. 

This is why I introduced **Neo**, a friendly AI bot powered by Gemini 2.5 Flash. Neo’s job is to keep you accountable with a personal touch. When you cross a distraction limit, Neo doesn't just lock your phone; he provides evidence-backed health tips and better alternatives tailored to exactly what your body is experiencing in that moment.`,
      },
      {
        type: "image",
        src: "/Neo.png",
        alt: "Chat interface with Neo the AI Coach",
        caption:
          "Neo delivers markdown-rendered insights based directly on your live tracking metrics.",
      },
      {
        type: "heading",
        content: "Does running continuous camera scans drain the battery?",
      },
      {
        type: "text",
        content: `This was one of the biggest engineering hurdles. Keeping an Android front-facing camera powered on indefinitely will rapidly drain the battery and cause the phone to overheat. 

To solve this, MindfulFlow relies on strict camera duty-cycling handled by a persistent \`ContextEngineService\`. Instead of running the camera permanently, it utilizes a lightweight 5-second polling loop to evaluate app usage. The actual camera analysis is restricted to short, strategic windows (15 seconds ON, followed by a variable OFF duration). Furthermore, this is completely **motion-gated**—if the IMU sensors detect that the phone is perfectly stationary or face-down, the camera framework is instantly put to sleep.`,
      },
      {
        type: "heading",
        content: "Are the posture and blink rate metrics actually accurate?",
      },
      {
        type: "text",
        content: `Tracking posture with a phone camera is notoriously unreliable because the phone itself is constantly moving. If you lie back on a couch, a standard face-detection algorithm will incorrectly assume you are looking straight up at the ceiling.

To fix this, I engineered a **Posture Fusion Engine**. It calculates an absolute head angle relative to the world frame by mathematically isolating the phone's movement from your skull's movement. It queries the ML Kit Face Detection API for your head pitch ($Camera\\ \\theta_x$) and subtracts the hardware IMU Rotation Vector sensor ($IMU\\ \\theta_{tilt}$) using this core formula:

$P_{abs} = Camera\\ \\theta_x - IMU\\ \\theta_{tilt} - 90^\\circ$

This establishes a "True Horizon," making the posture tracking immune to device tilt. This is combined with a 468-point face mesh that tracks your Eye Aspect Ratio (EAR) to compute a highly accurate Blinks-Per-Minute (BPM) value.`,
      },
      {
        type: "code",
        lang: "kotlin",
        filename: "PostureFusionEngine.kt",
        code: `// Calculates absolute head pitch independent of phone tilt
fun calculateTrueHorizon(cameraEulerX: Float, imuTiltAngle: Float): Float {
    // Fuses camera pitch and physical device rotation vector
    val absolutePitch = cameraEulerX - imuTiltAngle - 90f
    
    // Apply motion-gated debouncing to prevent flickering states
    return applyHysteresis(absolutePitch)
}`,
      },
      {
        type: "gallery",
        images: [
          { src: "/PostureMockup.png", alt: "Posture tracking interface" },
          {
            src: "/EyeMockup.png",
            alt: "Eye health and blink rate monitoring",
          },
        ],
      },
      {
        type: "heading",
        content:
          "Are the intervention methods effective? Do they really change habits?",
      },
      {
        type: "text",
        content: `Habits are broken by inserting intentional cognitive friction into subconscious routines. When you open a social media application out of pure muscle memory, MindfulFlow deploys a system-level overlay accompanied by distinct haptic vibration patterns. 

Rather than instantly killing the app, the interface introduces a 3-step friction pattern: an initial confirmation prompt, a manual timer commitment selection, and an intentional "Go Home" escape hatch. By forcing your brain out of autopilot and requiring physical touch confirmation, the app systematically fragments the neurological cue-routine-reward cycle of digital addiction.`,
      },
      {
        type: "heading",
        content: "How technically backed is the architecture?",
      },
      {
        type: "text",
        content: `Because MindfulFlow processes physiological data, privacy and performance are non-negotiable. All machine learning pipelines run 100% locally on-device. Camera frames are processed strictly in volatile memory and destroyed immediately. No imagery is ever saved or uploaded.`,
      },
      {
        type: "image",
        src: "/MINDFULFLOW_SysArch.png",
        alt: "MindfulFlow System Architecture Diagram",
        caption:
          "The panoramic architectural data flow across background services, state singletons, and repositories.",
      },
      {
        type: "text",
        content: `The architecture relies on a single-activity MVVM pattern. The \`ContextEngineService\` orchestrates the hardware sensors and pushes data into the \`InterventionManager\`—a centralized Kotlin Singleton serving as the single source of truth via \`StateFlow\`. When network availability drops, an asynchronous Outbox Repository queues daily aggregations and posture snapshots locally, draining seamlessly to Firebase Firestore once a connection is re-established.`,
      },
      {
        type: "heading",
        content: "What is the future roadmap?",
      },
      {
        type: "text",
        content: `The next major phase for MindfulFlow is shifting from reactive tracking to proactive behavioral planning. I am currently building a local journaling and goal-tracking engine directly into the app. 

Once integrated, Neo will have access to your actual daily tasks and life goals. Instead of just reacting to screen time numbers, the AI will understand your intent. It will know exactly when it is appropriate to strictly block a distraction, and when to gently remind you about the goals you set for yourself, offering a much more personalized and human approach to digital wellness.`,
      },
    ],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const statusConfig: Record<Status, { label: string; color: string }> = {
  live: { label: "Live", color: "var(--lime)" },
  wip: { label: "WIP", color: "var(--yellow)" },
  archived: { label: "Archived", color: "var(--muted)" },
};
