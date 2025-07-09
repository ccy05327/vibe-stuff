const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const port = 4001;

// Middleware
app.use(cors()); // Allow requests from your React frontend
app.use(express.json()); // Allow the server to parse JSON in request bodies

// API Endpoint for generating lessons
app.post("/api/generate-lesson", async (req, res) => {
  try {
    const { duration, skillLevel } = req.body;

    if (!duration || !skillLevel) {
      return res
        .status(400)
        .json({ error: "Missing duration or skillLevel in request body" });
    }

    const constructedPrompt = `
You are an expert Australian English tutor creating a lesson plan for a ${skillLevel} level student.
The student wants a session that lasts approximately ${duration} minutes.
Your response MUST be a valid JSON object. Do not include any text before or after the JSON object.

The JSON object must have the following keys: "vocabulary", "listening", "reading", "writing", "speaking".

- **vocabulary**: Create one challenging Australian vocabulary word with a definition, a sample sentence, and a multiple-choice question to test understanding.
- **listening**: Create a short script for a 30-second audio dialogue between two Australians. The topic should be casual. Also, create one multiple-choice question that tests inference or the speaker's tone.
- **reading**: Provide a headline and a 2-sentence summary of a fictional but realistic Australian news story. Create one task, like "unscramble this sentence from the article".
- **writing**: Create a practical, real-world writing prompt based on an informal situation.
- **speaking**: Create one open-ended question that encourages a spoken response about a personal opinion or experience related to Australian culture.

Generate the content now.
`;

    console.log("Sending prompt to Ollama...");

    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen:latest", // Using the specified qwen model
        prompt: constructedPrompt,
        format: "json", // Crucial for getting a clean JSON response
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      throw new Error(
        `Ollama API responded with status: ${ollamaResponse.status}`
      );
    }

    const ollamaData = await ollamaResponse.json();

    // The actual JSON content from Ollama is in the 'response' property
    const lessonJson = JSON.parse(ollamaData.response);

    console.log("Successfully received and parsed lesson from Ollama.");
    res.status(200).json(lessonJson);
  } catch (error) {
    console.error(
      "Error communicating with Ollama or processing the request:",
      error
    );
    res
      .status(500)
      .json({ error: "Failed to generate lesson. Is Ollama running?" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Local server listening on http://localhost:${port}`);
});
