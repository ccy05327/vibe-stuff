# UI/UX Concept Brief for "AusLingo"

This document outlines the design and layout ideas for your personalized Australian English learning website.

## Core Design Philosophy: Calm, Focused, and Motivating

The entire interface should feel like a calm, inviting space for learning. We'll achieve this with:

* **Minimalism:** No clutter. Every element serves a purpose.  
* **Generous Whitespace:** Creates a sense of breathing room and focus.  
* **Clear Typography:** Using a highly legible, modern font like "Inter" or "Manrope".  
* **Simple Color Palette:** A neutral base (off-white or light grey) with one or two accent colors for interactive elements (e.g., a calming blue or a motivating coral).

## 1\. The Main Dashboard

This is your daily starting point. It should immediately answer "What's my progress?" and "What's next?".

**Layout (Desktop):** A simple, single-column layout that is centered on the screen. This ensures a consistent, mobile-first experience.

**Key Components:**

1. **Personalized Greeting:**  
   * At the very top. "Good morning," or "Ready to learn?"  
   * Keeps it friendly and personal.  
2. **Streak & Progress Stats:**  
   * The most prominent visual element.  
   * **Streak Counter:** A large number next to a flame icon (🔥). The number should be the hero of this section.  
   * **Longest Streak:** A smaller stat below the main streak: "Longest: 21 days".  
   * **Weekly Study Chart:** A simple, minimalist bar chart showing minutes studied for the last 7 days. No complex axes, just the bars and day labels (M, T, W, T, F, S, S). This provides a quick, visual sense of accomplishment.  
3. **The Call to Action (CTA):**  
   * A large, inviting button with a clear label: **"Start Today's Session"**.  
   * This should be in your primary accent color to draw the eye.  
   * When clicked, a simple modal appears:How long would you like to study today?  
     \[ 5 min \] \[ 10 min \] \[ 15 min \]  
4. **Skill Snapshot (Subtle):**  
   * A small, secondary section below the main CTA.  
   * "**Focus Areas:**" followed by tags like Writing Clarity, Vocabulary Recall. This data would be pulled from your learner\_model table and gives you a gentle reminder of what the system is helping you improve.

## 2\. The Interactive Learning Modules

After selecting a duration, the user is taken to the first module. All modules share a consistent "wrapper" for a seamless experience.

**Shared Module Wrapper:**

* **Top Bar:** A slim progress bar showing which step you're on (e.g., (1/5) Vocabulary).  
* **Bottom Bar:** A single button, e.g., Check Answer or Next →.

### Module Layouts

**A. Vocabulary Module**

* **Concept:** A digital flashcard.  
* **Layout:** A card is centered on the screen. It shows the word (e.g., "Dag"). On tap/click, the card flips to reveal the definition, a sample sentence, and a "Play Audio" icon. Below the card, an interactive quiz (e.g., fill-in-the-blank) appears to test comprehension.

**B. Listening Module**

* **Concept:** Focused listening.  
* **Layout:** The interface is dominated by a clean audio player with a large play button. The transcript is hidden by default. After the audio plays, multiple-choice questions about inference and tone appear below the player. A "Show Transcript" button is available for review.

**C. Reading Module**

* **Concept:** Active reading, not passive.  
* **Layout:** A clean, single column of text. Key sentences or paragraphs can be clicked to trigger an audio reading. The exercise (e.g., a sentence scramble) is presented as a drag-and-drop interface directly below the text, making the interaction feel connected to the content.

**D. Writing Module**

* **Concept:** A practical response.  
* **Layout:** The prompt is presented clearly at the top (e.g., "You missed a call from a friend. Listen to their voicemail, then write a short text back."). An embedded audio player for the prompt sits above a clean, simple text input field. No distracting formatting options, just a space to write.

**E. Speaking Module**

* **Concept:** Low-pressure practice.  
* **Layout:** A question is displayed in large text (e.g., "What's your take on the housing market in Sydney?"). Below it is a single, large button with a microphone icon labeled "Tap to Speak". When recording, this button can show a subtle audio waveform. After speaking, the transcribed text appears below for self-review. The goal is reflection, not immediate judgment.

## Next Steps

Use these ideas as a foundation for your wireframes. Focus on the flow:

1. **Dashboard → Click CTA**  
2. **Select Duration Modal → Generate Lesson**  
3. **Module 1 → Module 2 → ... → Module 5**  
4. **"Session Complete\!" screen with updated stats.**

This structure provides a clear, motivating, and highly interactive path that respects your learning style and avoids passive information consumption.
