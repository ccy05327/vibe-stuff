# **Product Requirements Document: Project AusLingo**

## **1.0 Product Vision and Core Principles**

### **1.1 Vision Statement**

To create a hyper-personalized, AI-driven English learning platform that acts as a diagnostic tool for an advanced (C1-C2) user. The platform will focus exclusively on Australian English and will deliver dynamic, interactive daily exercises designed to identify and remediate latent skill gaps in a user whose proficiency mirrors that of a native speaker.

### **1.2 Core User-Centric Principles**

All design and development decisions for Project AusLingo will be guided by a set of foundational principles derived directly from the target user's profile and learning objectives. These principles ensure the final product is not only functional but also highly effective and engaging for its specific audience.

* **Interactive-First, Audio-Centric:** The user's learning style is practical and interactive, with a stated aversion to purely passive reading activities. Therefore, every learning module and exercise must incorporate interactivity and be accompanied by high-quality audio. This principle mandates the integration of a robust Text-to-Speech (TTS) engine capable of producing natural, clear Australian English voices, transforming text-based materials into rich auditory experiences.1 This approach caters directly to the user's learning preference and leverages their strongest skill, listening, as a gateway to improving other areas.  
* **Diagnostic, Not Just Prescriptive:** The platform's primary value proposition is its ability to uncover "unknown unknowns" in the user's advanced skillset. The AI-driven feedback mechanisms must therefore transcend simple binary corrections (right/wrong). For productive skills like writing and speaking, the system will provide deep, analytical feedback on nuanced aspects such as syntactic structure, stylistic choices, rhetorical flow, phoneme-level pronunciation accuracy, and intonation patterns. This diagnostic depth is essential for a C1/C2 learner for whom standard grammar checks are insufficient.4  
* **Challenge-Skill Balance (Flow State):** For a self-directed learner without external pressures, maintaining motivation is paramount. The platform's adaptive engine will be engineered to cultivate a state of "flow," as described in educational psychology research.7 This state is achieved by continuously balancing the difficulty of the exercises with the user's evolving skill level. The system must present challenges that are stimulating enough to maintain engagement but not so difficult as to cause frustration or abandonment. This dynamic adjustment is critical for fostering sustained, long-term engagement and making the learning process intrinsically rewarding.8

## **2.0 User Experience and System Flow**

### **2.1 User Authentication and Profile Setup**

#### **2.1.1 Sign-up / Login Flow**

User identity and progress persistence will be managed through Supabase, an open-source Firebase alternative selected for its comprehensive suite of backend tools, including robust authentication and a full Postgres database.9 The primary authentication method will be a standard email and password combination, leveraging Supabase Auth's built-in functionalities for secure user creation, session management, and password recovery protocols.9

Given that this is a personal-use application, the onboarding process can be streamlined for maximum convenience. For instance, the email confirmation requirement, while a standard security feature, can be disabled within the Supabase project dashboard during the initial setup phase. This practice, often used for local development and testing environments, removes an unnecessary step for the sole user, allowing immediate access to the platform after registration.10

#### **2.1.2 User Profile Configuration**

Upon the first successful login, the user will be guided through a minimal, one-time profile configuration. The focus is on immediate engagement rather than extensive data entry. The only necessary steps will be to confirm the target language variant (pre-selected as Australian English) and to view a brief, non-intrusive tutorial introducing the dashboard layout and the "Start Daily Session" function. No other personal information or complex preference settings are required, aligning with the project's single-user scope.

### **2.2 Initial Proficiency Calibration**

#### **2.2.1 Multi-vector Assessment**

To enable the adaptive engine to function effectively from the outset, the system will administer a one-time, comprehensive calibration test upon the user's first interaction. This is not a generic placement test but a targeted diagnostic tool designed to establish a detailed, multi-dimensional baseline of the user's C1/C2 proficiency.12 The test's design is predicated on the understanding that an advanced learner's weaknesses are subtle and often reside in complex grammatical structures, nuanced vocabulary, and idiomatic expression rather than foundational knowledge.

The calibration tasks will be modeled after assessment items found in high-level English proficiency examinations like the Cambridge C1 Advanced, specifically chosen to probe for these subtle error patterns.14 The assessment will include:

* **Advanced Grammar and Vocabulary:** A series of multiple-choice questions targeting complex conditional forms (e.g., "Had they arrived earlier, they \_\_\_\_\_ the best seats."), subjunctive moods, and low-frequency lexical items (e.g., "ubiquitous," "quintessential," "cognizant").16  
* **Listening Acuity:** A short audio monologue in an Australian accent, followed by sentence completion and multiple-choice questions that test not only for explicit information but also for implied meaning, tone, and speaker attitude, mirroring tasks from the C1 Listening paper.14  
* **Baseline Writing Sample:** A short, timed writing prompt (e.g., 150 words in 10 minutes) to generate an initial sample for analyzing syntactic complexity, lexical diversity, and structural coherence.  
* **Baseline Speaking Sample:** A short, on-screen passage for the user to read aloud, capturing an initial sample for assessing pronunciation, pace, and fluency against a baseline Australian English model.

#### **2.2.2 Establishing the Baseline Learner Model**

The results from this multi-vector assessment are fundamental to the platform's personalized approach. A generic test might simply confirm the user's level as "advanced" and stop, providing little actionable data. This system, however, uses the calibration to actively search for the boundaries of the user's knowledge.

The performance on each task will be analyzed to populate the initial learner\_model in the Supabase database. Instead of a single score, this model will be a rich data object—a proficiency vector—with granular metrics such as $subjunctive\\\_mood\\\_accuracy: 0.85$, $phrasal\\\_verb\\\_recall: 0.92$, and $phoneme\\\_/æ/\\\_accuracy: 0.95$. This detailed, multi-dimensional profile provides a sophisticated starting point for the adaptive algorithm, ensuring that the very first dynamically generated session is already tailored to the user's specific, diagnosed needs. The quality of this initial calibration directly dictates the immediate effectiveness of the adaptive engine and is a critical factor in preventing early user frustration from content that is mismatched in difficulty.

### **2.3 The Main Dashboard Interface**

#### **2.3.1 Layout and Key Components**

The user dashboard will feature a clean, minimalist, and data-centric design. The aesthetic will draw inspiration from the uncluttered and functional layouts seen in popular productivity tools like Notion and in design showcases on platforms like Dribbble, which prioritize clarity and user focus.18

The interface will be organized around three key modules:

1. **Primary Call-to-Action:** A prominent "Start Daily Session" button will be the focal point of the screen. It will be accompanied by a simple dropdown menu allowing the user to select the desired session duration (e.g., 15, 30, or 45 minutes), making the process of starting a lesson immediate and frictionless.  
2. **Progress Overview Module:** This area will provide at-a-glance motivational feedback, featuring the daily study time tracker and the engagement streak calendar. These elements directly address the user's request for progress tracking and are proven methods for encouraging consistent user habits.  
3. **Skill Snapshot Module:** A high-level, visual representation of the user's current proficiency across the five core skills (Vocabulary, Listening, Reading, Writing, Speaking). This will likely be rendered as a radar chart or a series of bar graphs, with the data drawn directly from the learner\_model table in the database, providing an instant summary of strengths and areas for focus.

#### **2.3.2 Navigation and User Controls**

Navigation will be streamlined to support the core user journey: logging in and starting a session. A simple, persistent navigation bar at the top of the page will provide access to essential sections: "Dashboard" (the main view), "Detailed Progress" (for longitudinal data analysis), and "Profile/Logout." The design philosophy is to minimize cognitive load and the number of clicks required to engage with the primary learning functionality of the platform.

## **3.0 Feature Set: The Dynamic Learning Session**

### **3.1 Session Generation Engine**

#### **3.1.1 User Input**

The primary user input for initiating a learning experience is the selection of a session duration from the main dashboard. This single choice triggers the entire dynamic session generation process.

#### **3.1.2 Content Selection Algorithm**

Upon the user's request to start a session, a Supabase Edge Function will be invoked to orchestrate the creation of a unique, personalized lesson plan.9 This server-side function ensures that all logic is executed securely and efficiently without exposing internal processes or API keys to the client.

The algorithm's operation is not random but is a deliberate, weighted process. It consults the user's current learner\_model from the database to identify the skills most in need of reinforcement. For example, if the user's Writing proficiency score is the lowest among the five skills, the session will be intelligently weighted to include a slightly higher proportion of writing exercises. This creates a session that feels like a cohesive lesson plan constructed by a teacher who understands the student's needs. Simultaneously, the algorithm will enforce variety, ensuring that different types of exercises are interleaved to prevent monotony and maintain high levels of engagement throughout the chosen duration. This transforms the feature from a simple content dispenser into a thoughtful, automated session planner.

### **3.2 Adaptive Learning Engine**

#### **3.2.1 Real-time Performance Analysis**

The adaptive nature of the platform is powered by a continuous feedback loop. Every interaction and response from the user—a correct or incorrect answer, the time taken to respond, specific grammatical errors in a written piece, or phonetic inaccuracies in a spoken response—is captured as a data point. This data is sent to the backend at the conclusion of each exercise and is used to update the user's learner\_model in the database. This real-time or near-real-time model updating is a core tenet of effective adaptive learning systems.12

#### **3.2.2 Dynamic Difficulty Adjustment Logic**

The system will employ a sophisticated, multi-dimensional approach to difficulty adjustment, moving beyond simple linear scaling. The logic will be conceptually grounded in educational measurement frameworks like Item Response Theory (IRT), which models the probability of a correct response as a function of both the user's ability (often denoted as ′θ′) and the intrinsic difficulty of the item (denoted as ′δ′).21

This approach allows for a more nuanced form of adaptation. For an advanced C1/C2 learner, an error is rarely a simple mistake; it is a diagnostic clue. A conventional adaptive system, upon detecting a failed Listening Comprehension task, might simply serve an easier listening task next. Project AusLingo's diagnostic engine will operate on a deeper level. For instance:

1. The user fails a listening task featuring the Australian colloquialism "couldn't be bothered."  
2. The system analyzes the audio transcript, using Natural Language Processing (NLP) libraries like spaCy to identify potential difficulty drivers, such as idioms, slang, or complex sentence structures.23  
3. The engine hypothesizes that the idiomatic phrase, not the overall listening difficulty, was the root cause of the failure.  
4. Instead of merely reducing the difficulty of the next listening task, the system schedules a targeted remediation exercise. This might be a *vocabulary* exercise that explicitly defines "couldn't be bothered" or a *reading* exercise that uses the phrase in a different context.  
5. This creates a cross-modal, diagnostic remediation loop. It addresses the specific, underlying knowledge gap, providing a far more efficient and effective learning path for an advanced user than a simple, one-dimensional difficulty adjustment would.24

### **3.3 Content Sourcing and Processing Pipeline**

#### **3.3.1 Automated Content Ingestion**

A continuous stream of fresh, authentic, and relevant content is the lifeblood of the platform. To ensure this, the system will rely on a robust, automated content pipeline.

* **Primary Source:** A commercial news API with extensive Australian media coverage, such as NewsAPI.ai or mediastack, will be used.25 This choice is critical for ensuring a legal, reliable, and diverse flow of content. An investigation into the APIs of public broadcasters like the ABC and SBS revealed a lack of official, supported developer APIs, making them an unviable and high-risk option for a production system.27  
* **Secondary Source:** To introduce variety in tone and formality, the AusReddit API can be periodically queried for content from Australian-centric subreddits, providing more informal and conversational texts.31  
* **Process:** A scheduled Supabase Cron Job will run daily, fetching new articles from a range of predefined categories (e.g., business, science, technology, entertainment, sports) to ensure broad topic diversity.9

#### **3.3.2 Text Pre-processing and Summarization**

Once ingested, the raw text from articles will be programmatically cleaned to remove HTML tags, advertisements, and other non-essential elements. Subsequently, an AI-powered summarization tool, such as the QuillBot API, will be used to condense these articles into shorter, more digestible texts.33 This step is crucial for creating appropriately-lengthed content for exercises like the "Listen and Summarize" task, which requires audio clips of a specific duration.34

#### **3.3.3 Audio Generation (TTS)**

The final processed text will be converted into high-fidelity audio using a Text-to-Speech service that offers a premium, natural-sounding Australian English accent. A key technical decision lies in choosing between a commercial TTS API, like Murf AI, or a self-hosted open-source model, like MeloTTS.1 The initial recommendation is to leverage a commercial API to prioritize quality and accelerate development. The feasibility of transitioning to a more cost-effective open-source solution can be evaluated as a future optimization. All generated assets—the original text, the summary, the corresponding audio file URL, and associated metadata—will be stored in a dedicated

content\_items table in the Supabase database, ready to be served by the Session Generation Engine.

To formalize the selection of a content provider, a critical and high-risk dependency, a formal evaluation is required.

**Table 1: Content API Evaluation Matrix**

| API Provider | Cost (per 1k calls) | Australian Sources (Count/Quality) | Content Categories Available | Rate Limits | Ease of Integration |
| :---- | :---- | :---- | :---- | :---- | :---- |
| NewsAPI.ai 25 | Tiered Pricing | High; comprehensive list of major and minor outlets | General, Business, Tech, Sports, etc. | Varies by plan | High (REST API) |
| mediastack 26 | Tiered Pricing | Good; specified au country parameter | General, Business, Entertainment, Health, etc. | Varies by plan | High (REST API) |
| Newsdata.io 32 | Tiered Pricing | Good; specified AU country parameter | General, Science, Sports, etc. | Varies by plan | High (REST API) |

## **4.0 Feature Set: Learning Modules & Exercise Specifications**

### **4.1 Vocabulary Module**

* **4.1.1 Exercise: Contextual Definition Matching:** The user will be presented with a sentence, either in text or audio form, containing a highlighted C1/C2-level vocabulary word. They must then select the most accurate definition from a list of four options. To challenge an advanced learner, the distractor options will be nuanced and closely related in meaning, testing for a precise understanding of the word's connotation and usage.  
* **4.1.2 Exercise: Auditory Cloze (Fill-in-the-Blank):** This exercise leverages the user's strong listening skills. The user will hear a complete sentence, but with one key vocabulary word "bleeped" out. They must then type the missing word, reinforcing both auditory processing and vocabulary recall.

### **4.2 Listening Module**

* **4.2.1 Exercise: Listen and Summarize:** This task is modeled directly on the format used in the Pearson Test of English (PTE).34 The user listens to a 60-90 second audio clip, generated from a summarized news article. After the clip finishes, they have a set time limit (e.g., 10 minutes) to write a concise summary of 50-70 words. The submitted summary is then evaluated by an AI model to score the inclusion of key points and overall fidelity to the source material.  
* **4.2.2 Exercise: High-Speed Comprehension & Detail Recall:** To push the user's listening skills, a short audio clip (30-45 seconds) will be played at an accelerated speed (e.g., 1.25x or 1.5x). Immediately after, the user must answer specific, factual multiple-choice questions about the content. This exercise specifically targets the ability to process spoken information rapidly and accurately recall details under pressure.

### **4.3 Reading Module**

* **4.3.1 Exercise: Interactive Text with Integrated Audio:** Acknowledging the user's preference for audio-centric learning, this exercise presents a text where every sentence is clickable. Clicking a sentence will trigger the TTS engine to read that specific sentence aloud in an Australian accent. This hybrid approach allows the user to engage with written text without it being a purely passive reading experience.  
* **4.3.2 Exercise: Nuance and Implication Analysis:** Following a short reading passage, the user will be presented with multiple-choice questions designed to test higher-order comprehension skills. These questions will focus on interpreting the author's tone, purpose, underlying assumptions, or implied meaning, rather than just factual recall. This methodology is similar to the cross-text multiple matching and multiple-choice tasks in the Cambridge C1 Reading paper.14

### **4.4 Writing Module**

* **4.4.1 Exercise: Timed Response to a Prompt:** The user will be given a specific, thought-provoking prompt (e.g., "In 150 words, argue for or against the implementation of a universal basic income") and a strict time limit to compose a response. This simulates real-world writing tasks and assesses the ability to formulate and articulate a coherent argument under pressure.  
* **4.4.2 AI-Powered Feedback Engine:** The submitted text will be analyzed using a sophisticated third-party AI writing feedback API, such as ProWritingAid or HyperWrite.5 For a C1/C2 level user, standard grammar correction is of limited value. The chosen service must provide feedback on more advanced literary and structural elements, including:  
  * **Structure and Flow:** Analysis of paragraph cohesion, logical transitions, and overall argument structure.  
  * **Stylistic Variety:** Identification of repetitive sentence structures, overuse of passive voice, and awkward phrasings.  
  * **Clarity and Conciseness:** Suggestions for eliminating wordiness and improving the impact of the writing.  
  * **Advanced Elements:** Analysis of narrative pacing, thematic consistency, and dialogue authenticity, features offered by high-end tools like ProWritingAid's Manuscript Analysis.6 This feedback will be presented visually, with specific suggestions highlighted directly on the user's submitted text.

### **4.5 Speaking Module**

* **4.5.1 Exercise: Read-Aloud and AI Pronunciation Analysis:** The user is presented with a short text on screen and prompted to read it aloud. Their speech is recorded and submitted for detailed analysis.  
* **4.5.2 Exercise: Impromptu Speech on a Generated Topic:** Drawing inspiration from interactive language games and debate exercises 38, the system will generate a random topic (e.g., "Discuss the impact of remote work on city life"). The user will then have a short preparation time (e.g., 15 seconds) followed by 60 seconds to speak on the topic.  
* **4.5.3 AI-Powered Feedback Engine:** This module's feedback mechanism is a crucial diagnostic tool. The recorded audio will be processed through a dual pipeline. First, a high-accuracy Speech-to-Text (STT) service (e.g., Google Cloud STT 40) will create a transcript. Second, the audio file will be sent to a specialized speech analysis API (e.g., Speechace or ELSA Speak 4). The user's speaking skill is strong, so the feedback must be exceptionally granular to be of value. The combined analysis will provide a multi-faceted report covering:  
  * **Phoneme-Level Accuracy:** Pinpointing specific vowel and consonant sounds that deviate from a standard Australian English model, a feature offered by Speechace.4  
  * **Fluency Metrics:** Quantitative data on pace (words per minute), pause frequency and duration, and the length of uninterrupted speech runs.4  
  * **Intonation and Prosody:** A visual representation of the user's pitch contour to analyze whether their intonation is natural and varied or flat and monotonous.41  
  * **Spoken Grammar and Vocabulary:** The STT transcript will be passed to the Writing Feedback engine (Section 4.4.2) to analyze grammatical accuracy and lexical choice within the context of spoken language. This creates a comprehensive, 360-degree diagnostic of the user's speaking ability.

## **5.0 Feature Set: Performance Analytics and Progress Tracking**

### **5.1 Dashboard Visualization**

* **5.1.1 Daily Study Time Tracker:** The dashboard will feature a prominent visual widget, such as a circular progress bar, displaying the "Minutes Studied Today." This will be measured against a user-configurable daily goal, providing immediate, satisfying feedback on daily effort.  
* **5.1.2 Engagement Streak Calendar:** To foster consistency, a calendar visualization similar to GitHub's contribution graph will be implemented. Each day the user completes a session will be colored in, creating a visual chain. Maintaining this "streak" is a powerful psychological motivator and directly fulfills a core user requirement.

### **5.2 Detailed Skill Breakdown**

* **5.2.1 Performance Metrics per Skill:** The platform will track a suite of advanced performance metrics that go far beyond simple accuracy percentages, drawing from established research in adaptive learning evaluation.7 This granular data is essential for providing meaningful insights to an advanced learner. Tracked metrics will include:  
  * **Vocabulary:** Accuracy, Time-to-Answer (ms).  
  * **Listening:** Comprehension Accuracy (%), Key Point Inclusion Score (for summaries).  
  * **Reading:** Reading Speed (WPM), Comprehension Accuracy (%).  
  * **Writing:** Syntactic Complexity (e.g., Flesch-Kincaid score), Lexical Density, AI-generated scores for Style and Clarity.  
  * **Speaking:** Phoneme Accuracy (%), Words Per Minute, Pause Frequency, Pitch Variation (Standard Deviation of pitch).  
* **5.2.2 Longitudinal Progress Charts:** A dedicated "Detailed Progress" page will provide visualizations of these metrics over time. Users will be able to view their progress on line charts with selectable timeframes (weekly, monthly, quarterly). This feature is critical for demonstrating tangible, data-driven evidence of improvement, allowing the user to see how their focused practice is impacting specific micro-skills.45

## **6.0 Technical Architecture and Specifications**

### **6.1 Backend Infrastructure (Supabase)**

The entire backend will be built on the Supabase platform, chosen for its integrated, open-source toolset that simplifies development.

* **Database:** Supabase's integrated Postgres instance will serve as the single source of truth for all application data.9 As a security best practice, Row Level Security (RLS) will be enabled on all tables containing user-specific data. Even in a single-user context, this enforces data privacy at the database level.11  
* **Authentication:** User sign-up, login, and session management will be handled by Supabase Auth.9  
* **Serverless Functions:** Supabase Edge Functions will be the primary mechanism for executing backend logic.9 Their use is critical for several reasons: they orchestrate the dynamic session generation, they serve as a secure proxy for all calls to third-party AI APIs (ensuring that sensitive API keys are never exposed on the client-side 47), and they process the results from exercises to update the user's  
  learner\_model.  
* **Storage:** All binary files, such as the system-generated TTS audio clips and the user's recorded speech samples, will be stored and served via Supabase Storage.9

### **6.2 Core AI Service Integrations**

The platform functions as an intelligent aggregator of specialized AI services. The following table outlines the recommended technology stack for core functionalities, balancing performance, features, and development velocity.

**Table 2: Technology Stack Summary**

| Functionality | Recommended Tool/Library | Type | Key Rationale |
| :---- | :---- | :---- | :---- |
| **Australian TTS** | Murf AI 1 | Commercial API | Delivers exceptionally high-quality, natural-sounding Australian voices, crucial for a premium user experience. Fast integration via REST API. |
| **Speech-to-Text** | Google Cloud STT 40 | Commercial API | Industry-leading accuracy, especially with diverse accents. Real-time streaming capability is a potential future asset. |
| **Pronunciation Analysis** | Speechace API 4 | Commercial API | Provides essential diagnostic feedback at the phoneme, word, and sentence level, including fluency and intonation metrics. |
| **Writing Style/Structure** | ProWritingAid API 6 | Commercial API | Offers deep structural and stylistic analysis beyond simple grammar, which is necessary for a C1/C2 user. |
| **Content Summarization** | QuillBot API 33 | Commercial API | A simple and effective tool for the pre-processing of news articles into exercise-length content. |
| **Backend NLP Tasks** | spaCy 23 | Open-Source | For internal text analysis (e.g., keyword extraction, entity recognition). Using an open-source library for non-real-time backend tasks is a cost-effective strategy. |

### **6.3 Data Models and Schema**

The foundation of the application's data persistence and adaptive logic is its database schema. The following tables will be created within the Supabase Postgres database.

**Table 3: Supabase Postgres Data Schema**

| Table Name | Key Fields and Data Types | Purpose |
| :---- | :---- | :---- |
| **users** | id (UUID), email (text), etc. | Handled by Supabase Auth. Stores core user identity. |
| **daily\_sessions** | id (bigint), user\_id (fk to users), session\_date (date), duration\_minutes (integer), completed\_at (timestamp) | Logs each completed study session, providing the data for the streak tracker and activity history. |
| **exercise\_responses** | id (bigint), session\_id (fk), content\_item\_id (fk), user\_id (fk), skill\_type (enum), response\_data (jsonb), is\_correct (boolean), score (float), time\_taken\_ms (integer), feedback\_payload (jsonb) | The most granular log. Captures every user interaction, providing the raw data for updating the learner\_model. |
| **learner\_model** | user\_id (pk, fk to users), proficiency\_vector (jsonb), current\_streak (integer), longest\_streak (integer), last\_session\_date (date) | The heart of the adaptive system. A single record per user that stores their evolving, multi-dimensional skill profile and streak data. |
| **content\_items** | id (bigint), source\_api (text), original\_url (text), headline (text), full\_text (text), summary\_text (text), audio\_file\_url (text), difficulty\_score (float), topic\_tags (array of text) | A repository of all processed content, ready to be assembled into dynamic learning sessions. |

The use of the jsonb data type for fields like proficiency\_vector and feedback\_payload is a deliberate architectural choice. It provides the necessary schema flexibility to store complex, nested, and evolving data structures returned by various AI APIs without requiring rigid database migrations for every minor change.

## **7.0 Future Considerations**

### **7.1 Potential Feature Enhancements**

While the initial scope is focused and well-defined, the underlying architecture supports several future enhancements:

* **Topic Customization:** An interface could be added to allow the user to express preferences for certain content topics (e.g., "more science, less sports"), which would then influence the content selection algorithm.  
* **Immersive Scenarios:** Leveraging AI chat capabilities, the platform could generate conversational partners for interactive role-playing exercises, such as practicing for a job interview or navigating a customer service call.49  
* **Video Content Integration:** The system could be expanded to include authentic video content, such as Australian news clips or short documentaries. The STT engine would be used to generate interactive, time-synced transcripts, adding another layer of engaging, multi-modal content.

### **7.2 Scalability and Maintenance**

The chosen technology stack, centered on Supabase and serverless functions, is inherently scalable. While designed for a single user, the architecture could support a multi-user environment with minimal structural changes, primarily involving subscription and payment management.

A long-term maintenance plan must include monitoring the status and potential breaking changes of the integrated third-party APIs. Furthermore, a cost-benefit analysis should be conducted after a period of stable use (e.g., 6 months) to evaluate the feasibility of replacing certain commercial APIs (notably TTS) with self-hosted open-source models. This could significantly reduce operational expenditures, though it would require an initial investment in development and infrastructure management.

#### **Works cited**

1. Best Free Australian English Text to Speech & AI Voice Generator, accessed July 9, 2025, [https://murf.ai/text-to-speech/australian-accent-generator](https://murf.ai/text-to-speech/australian-accent-generator)  
2. Australian accent generator \- Narakeet, accessed July 9, 2025, [https://www.narakeet.com/languages/australian-text-to-speech/](https://www.narakeet.com/languages/australian-text-to-speech/)  
3. myshell-ai/MeloTTS: High-quality multi-lingual text-to ... \- GitHub, accessed July 9, 2025, [https://github.com/myshell-ai/MeloTTS](https://github.com/myshell-ai/MeloTTS)  
4. Home – Speechace | Pronunciation and fluency assessment via speech recognition, accessed July 9, 2025, [https://www.speechace.com/](https://www.speechace.com/)  
5. AI Story Feedback | AI-powered literary critique tool | HyperWrite AI Writing Assistant, accessed July 9, 2025, [https://www.hyperwriteai.com/aitools/ai-story-feedback](https://www.hyperwriteai.com/aitools/ai-story-feedback)  
6. AI Writing Feedback Tool \- ProWritingAid, accessed July 9, 2025, [https://prowritingaid.com/writing-feedback-tool](https://prowritingaid.com/writing-feedback-tool)  
7. How to Evaluate Adaptive Learning Systems: The Metrics That Matter \- Adaptemy, accessed July 9, 2025, [https://www.adaptemy.com/how-to-evaluate-adaptive-learning-systems-the-metrics-that-matter/](https://www.adaptemy.com/how-to-evaluate-adaptive-learning-systems-the-metrics-that-matter/)  
8. (PDF) Adaptive System of English-Speaking Learning Based on Artificial Intelligence, accessed July 9, 2025, [https://www.researchgate.net/publication/380454662\_Adaptive\_System\_of\_English-Speaking\_Learning\_Based\_on\_Artificial\_Intelligence](https://www.researchgate.net/publication/380454662_Adaptive_System_of_English-Speaking_Learning_Based_on_Artificial_Intelligence)  
9. Supabase Docs, accessed July 9, 2025, [https://supabase.com/docs](https://supabase.com/docs)  
10. Supabase Integration \- Lovable Documentation, accessed July 9, 2025, [https://docs.lovable.dev/integrations/supabase](https://docs.lovable.dev/integrations/supabase)  
11. Features | Supabase Docs, accessed July 9, 2025, [https://supabase.com/docs/guides/getting-started/features](https://supabase.com/docs/guides/getting-started/features)  
12. (PDF) Adaptive learning systems and artificial intelligence in ..., accessed July 9, 2025, [https://www.researchgate.net/publication/390536130\_Adaptive\_learning\_systems\_and\_artificial\_intelligence\_in\_language\_learning](https://www.researchgate.net/publication/390536130_Adaptive_learning_systems_and_artificial_intelligence_in_language_learning)  
13. Systematic Review of Adaptive Learning Research Designs, Context, Strategies, and Technologies From 2009 to 2018 \- ODU Digital Commons, accessed July 9, 2025, [https://digitalcommons.odu.edu/context/stemps\_fac\_pubs/article/1123/viewcontent/Systematic\_Review\_of\_Adaptive\_Learning\_Research\_Designs\_Context.pdf](https://digitalcommons.odu.edu/context/stemps_fac_pubs/article/1123/viewcontent/Systematic_Review_of_Adaptive_Learning_Research_Designs_Context.pdf)  
14. C1 Advanced preparation | Cambridge English, accessed July 9, 2025, [https://www.cambridgeenglish.org/exams-and-tests/advanced/preparation/](https://www.cambridgeenglish.org/exams-and-tests/advanced/preparation/)  
15. English C1 (Advanced) Language Test | Skills Assessment \- TestGorilla, accessed July 9, 2025, [https://www.testgorilla.com/test-library/language-tests/english-proficiency-test-c1/](https://www.testgorilla.com/test-library/language-tests/english-proficiency-test-c1/)  
16. English Test for Advanced Learners (level C1/C2) \- manylex.com, accessed July 9, 2025, [https://manylex.com/efl/english-test-advanced.php](https://manylex.com/efl/english-test-advanced.php)  
17. Level Test Upper Advanced C2 | Free Placement English Level Test with answers, accessed July 9, 2025, [https://www.englishtag.com/tests\_with\_answers/level\_test\_upper\_advanced\_C2.asp](https://www.englishtag.com/tests_with_answers/level_test_upper_advanced_C2.asp)  
18. Language Learning Dashboard Template by Eula | Notion Marketplace, accessed July 9, 2025, [https://www.notion.com/templates/language-learning-dashboard-1](https://www.notion.com/templates/language-learning-dashboard-1)  
19. Language Learning Template \- Kanban Zone, accessed July 9, 2025, [https://kanbanzone.com/templates/visual-boards/language-learning/](https://kanbanzone.com/templates/visual-boards/language-learning/)  
20. Learning Progress designs, themes, templates and downloadable graphic elements on Dribbble, accessed July 9, 2025, [https://dribbble.com/tags/learning-progress](https://dribbble.com/tags/learning-progress)  
21. Measurement of Ability in Adaptive Learning and Assessment Systems when Learners Use On-Demand Hints, accessed July 9, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC9073638/](https://pmc.ncbi.nlm.nih.gov/articles/PMC9073638/)  
22. Evaluation of a Computer-Assisted Language Learning System Based on Adaptive Learning Designed for Self-training in Scientific F, accessed July 9, 2025, [https://www.ijiet.org/vol13/IJIET-V13N8-1930.pdf](https://www.ijiet.org/vol13/IJIET-V13N8-1930.pdf)  
23. SpaCy Package \- Text Analysis \- Guides at Penn Libraries, accessed July 9, 2025, [https://guides.library.upenn.edu/penntdm/python/spacy](https://guides.library.upenn.edu/penntdm/python/spacy)  
24. Learning Performance in Adaptive Learning Systems: A Case Study of Web Programming Learning Recommendations \- PMC \- PubMed Central, accessed July 9, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC8831801/](https://pmc.ncbi.nlm.nih.gov/articles/PMC8831801/)  
25. NewsAPI.ai | Best Real-Time News API for Developers, accessed July 9, 2025, [https://newsapi.ai/](https://newsapi.ai/)  
26. Australia News API \- Mediastack, accessed July 9, 2025, [https://mediastack.com/sources/australia-news-api](https://mediastack.com/sources/australia-news-api)  
27. What digital technologies does the ABC use?, accessed July 9, 2025, [https://help.abc.net.au/hc/en-us/articles/5777901261199-What-digital-technologies-does-the-ABC-use](https://help.abc.net.au/hc/en-us/articles/5777901261199-What-digital-technologies-does-the-ABC-use)  
28. SBS | Latest News, Audio, TV, Video Streaming, Sports, Food & More, accessed July 9, 2025, [https://www.sbs.com.au/](https://www.sbs.com.au/)  
29. iViewed Your API Keys \- Duale 'Wale' Siad, accessed July 9, 2025, [https://wale.au/blog/iviewed-your-api-keys/](https://wale.au/blog/iviewed-your-api-keys/)  
30. SBS On Demand \- Transparency Portal, accessed July 9, 2025, [https://www.transparency.gov.au/publications/communications-and-the-arts/special-broadcasting-service-corporation/special-broadcasting-service-corporation-annual-report-2020-21/engaged-audiences/sbs-on-demand](https://www.transparency.gov.au/publications/communications-and-the-arts/special-broadcasting-service-corporation/special-broadcasting-service-corporation-annual-report-2020-21/engaged-audiences/sbs-on-demand)  
31. Tools \- Australian Internet Observatory, accessed July 9, 2025, [https://internetobservatory.org.au/tools](https://internetobservatory.org.au/tools)  
32. Australia News API \- Latest News Headlines & Live Updates \- NewsData.io, accessed July 9, 2025, [https://newsdata.io/news-sources/australia-science-news-api](https://newsdata.io/news-sources/australia-science-news-api)  
33. AI Text Summarizer \- One-Click Summarization (Ad-Free) \- QuillBot, accessed July 9, 2025, [https://quillbot.com/summarize](https://quillbot.com/summarize)  
34. PTE Summarise Spoken Text Practice \- Free Examples \- E2Language Blog, accessed July 9, 2025, [https://blog.e2language.com/pte-summarise-spoken-text-practice/](https://blog.e2language.com/pte-summarise-spoken-text-practice/)  
35. FREE PTE Summarize Spoken Text Practice, accessed July 9, 2025, [https://ptemagic.com.au/free-pte-summarize-spoken-text-practice/](https://ptemagic.com.au/free-pte-summarize-spoken-text-practice/)  
36. PTE Summarize Spoken Text Tips & Practice Examples \- Kanan International, accessed July 9, 2025, [https://www.kanan.co/pte/listening-summarize-spoken-text/](https://www.kanan.co/pte/listening-summarize-spoken-text/)  
37. Free PTE Summarize Spoken Text Practice Test Online \- Gurully, accessed July 9, 2025, [https://www.gurully.com/pte-listening-practice/summarize-spoken-text](https://www.gurully.com/pte-listening-practice/summarize-spoken-text)  
38. 17 Fun Games to Get World Language Learners Talking | Edutopia, accessed July 9, 2025, [https://www.edutopia.org/article/17-fun-games-to-get-world-language-learners-talking/](https://www.edutopia.org/article/17-fun-games-to-get-world-language-learners-talking/)  
39. 5 Advanced Language Games for Higher-Level ESL Students \- Destination TEFL, accessed July 9, 2025, [https://destinationtefl.com/blog/advanced-language-games/](https://destinationtefl.com/blog/advanced-language-games/)  
40. Speech-to-Text AI: speech recognition and transcription | Google ..., accessed July 9, 2025, [https://cloud.google.com/speech-to-text](https://cloud.google.com/speech-to-text)  
41. ELSA | Speech Analyzer. Instant, personalized feedback on your speech, accessed July 9, 2025, [https://speechanalyzer.elsaspeak.com/](https://speechanalyzer.elsaspeak.com/)  
42. Fluency Flow \- English Oral Proficiency Assessment, accessed July 9, 2025, [https://www.fluencyflow.ai/](https://www.fluencyflow.ai/)  
43. Top 5 Metrics for Evaluating Adaptive Learning \- Quizcat AI, accessed July 9, 2025, [https://www.quizcat.ai/blog/top-5-metrics-for-evaluating-adaptive-learning](https://www.quizcat.ai/blog/top-5-metrics-for-evaluating-adaptive-learning)  
44. Enhancing Adaptive Learning Systems with Advanced Performance MetricsMelhorar os Sistemas de Aprendizagem Adaptativa com Métricas de Desempenho Avançadas \- ResearchGate, accessed July 9, 2025, [https://www.researchgate.net/publication/390277345\_Enhancing\_Adaptive\_Learning\_Systems\_with\_Advanced\_Performance\_MetricsMelhorar\_os\_Sistemas\_de\_Aprendizagem\_Adaptativa\_com\_Metricas\_de\_Desempenho\_Avancadas](https://www.researchgate.net/publication/390277345_Enhancing_Adaptive_Learning_Systems_with_Advanced_Performance_MetricsMelhorar_os_Sistemas_de_Aprendizagem_Adaptativa_com_Metricas_de_Desempenho_Avancadas)  
45. How to Track Your Language Progress and Stay Consistent (with This Free Digital Platform), accessed July 9, 2025, [https://thepolyglotfox.com/how-to-track-your-language-progress-and-stay-consistent-with-this-free-digital-platform/](https://thepolyglotfox.com/how-to-track-your-language-progress-and-stay-consistent-with-this-free-digital-platform/)  
46. Database | Supabase Docs, accessed July 9, 2025, [https://supabase.com/docs/guides/database/overview](https://supabase.com/docs/guides/database/overview)  
47. iViewed your API keys \- Hacker News, accessed July 9, 2025, [https://news.ycombinator.com/item?id=31025809](https://news.ycombinator.com/item?id=31025809)  
48. NLP Libraries in Python \- GeeksforGeeks, accessed July 9, 2025, [https://www.geeksforgeeks.org/nlp/nlp-libraries-in-python/](https://www.geeksforgeeks.org/nlp/nlp-libraries-in-python/)  
49. Pronounce: Professional English Speech Checker, accessed July 9, 2025, [https://www.getpronounce.com/](https://www.getpronounce.com/)
