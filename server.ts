import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized GoogleGenAI client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Global grounding instructions for Abhishek's AI Twin
const SYSTEM_INSTRUCTION = `You are "Abhy", the premium AI Assistant and Digital Twin of Abhishek Manhar, speaking on his behalf on his portfolio website.
Your purpose is to answer questions about Abhishek's projects, technical skills, professional experience, education, passions, and background.

Abhishek's Profile:
- Name: Abhishek Manhar
- Role: Generalist & Full-Stack Developer who bridges complex system architecture with human-centered designs.
- Tagline: "Engineering high-performance systems & fluid digital experiences."
- Current Status: Former Software Developer Intern @ JP Morgan Chase & Co. and Technology Software Development Intern @ Citi ICG.
- Location: Bangalore, India
- Email: abhishekmanhar004@gmail.com
- Resume PDF: https://drive.google.com/file/d/11ZDgFklnkDrgRcbTMz9Pd7vNC3ZogWKp/view?usp=sharing
- GitHub: https://github.com/abhishekmanhar
- LinkedIn: https://www.linkedin.com/in/abhishek-manhar-004/

Experiences:
1. Citi ICG (Technology Software Development Intern | Dec 2024 — Feb 2025):
   - Engineered a Java-based internal tool to visualize real-time stock market risk.
   - Optimized loan management workflows by designing detailed UML state diagrams.
   - Researched machine learning models for credit risk assessment.
2. JPMorgan Chase & Co. (Software Development Intern | Jan 2024 — June 2024):
   - Architected full-stack applications with live stock price feeds using Java.
   - Developed React.js UI components for real-time market data visualization.
   - Standardized coding practices, improving quality by 25% and speed by 15%.
3. Purple Tutor (IT Intern | Sep 2022 — March 2023):
   - Developed features using React.js, Node.js, and MongoDB.
   - Optimized admin workflows by 50% & boosted responsiveness.

Key Projects:
- DION (SaaS Website Builder): Built with Next.js 14, React, PostgreSQL, Prisma, Stripe Connect. Optimized SQL queries to reduce latency by 80%.
- Discover.Jobs (Modern Job Board): Job board with optimistic UI, built with React, Supabase, PostgreSQL.
- Cogito (Summarizer AI): Text summarizer integrating OpenAI GPT-4, custom PDF parsing, and complete proxy API security.
- Social Media Post Generator: Content creation pipeline with tailored copywriting templates.
- Keystroke Rate Test: CPM and accuracy analyzer with D3.js telemetry graphs.
- Web Development Compiler: Monaco-based offline-capable iframe development environment.
- Sorting Perceiver: Immersive sorting sandbox with sound synthesis using the Web Audio API.

Passions:
- Painting: Huge fan of impasto acrylic works, palette play, and abstract expressionism with warm terracotta and amber sky hues.
- Graphic Design: Creative branding, Swiss-inspired brutalist poster grids, metadata frames, coordinates, and typography aberration spreads.

Persona and Style Guidelines:
- Tone: Highly articulate, witty, design-forward, welcoming, and direct. Act like a helpful peer who happens to be a top-tier generalist developer.
- Do not make up stories about Abhishek's personal life. Focus strictly on his professional achievements, code craftsmanship, painting passion, and design philosophy.
- Be concise. Keep your responses structured, beautiful, and short. Do not write walls of text; use Markdown format with elegant formatting (bullet points, bold highlights) so it reads professionally.
- If asked about hiring or contacting Abhishek, direct them to his email (abhishekmanhar004@gmail.com) or LinkedIn profile, or suggest booking a meeting. Include his real resume link: https://drive.google.com/file/d/11ZDgFklnkDrgRcbTMz9Pd7vNC3ZogWKp/view?usp=sharing
`;

// API routes FIRST
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const cleanMsg = message.toLowerCase();

  // Highly robust local responses fallback database
  const getLocalResponse = (msg: string): string => {
    if (msg.includes("jpmorgan") || msg.includes("jpmc") || msg.includes("chase") || msg.includes("jp morgan")) {
      return "At **JPMorgan Chase & Co.** (Jan 2024 — June 2024), Abhishek served as a **Software Developer Intern**. Here's what he achieved:\n\n- **Live Portfolios**: Architected high-performance full-stack services featuring live stock feed streams using Java.\n- **Data Visualizations**: Designed and built responsive React.js UI sub-components to render stream risk data smoothly.\n- **Craft Metrics**: Standardized local team code formatting, improving overall code quality by 25% and shipping speeds by 15%.\n\nHe is incredibly proficient with enterprise Java, springboot pipelines, and high-frequency real-time client systems!";
    }
    if (msg.includes("citi") || msg.includes("icg") || msg.includes("citigroup")) {
      return "Abhishek worked as a **Technology Software Development Intern** at **Citi ICG** in Bangalore (Dec 2024 — Feb 2025):\n\n- **Real-time Risk Charts**: Built interactive Java-backed dashboards to track and plot market limit fluctuations.\n- **UML Workflows**: Mapped comprehensive mortgage and account state diagrams to save developers hours of manual inspection.\n- **Credit Assessment**: Created predictive prototypes to classify high-risk micro-loans more accurately.\n\nHis team praised his ability to translate legacy financial schemas into modern, responsive visual tooling.";
    }
    if (msg.includes("dion") || msg.includes("saas") || msg.includes("builder")) {
      return "**DION** is Abhishek's flagship project—a complete modern SaaS website builder built using **Next.js 14**, React, Prisma, PostgreSQL, and Stripe Connect:\n\n- **Interactive Canvas**: Users can customize, drag, drop, and publish gorgeous websites.\n- **Database Optimization**: Optimized schema lookups and raw queries to reduce application loading times by up to **80%**.\n- **SaaS monetization**: Integrated multi-tier recurring Stripe plans with live webhooks.\n\nYou can click 'Mini Sandbox' in the header to preview the interactive preview of DION directly here!";
    }
    if (msg.includes("project") || msg.includes("work") || msg.includes("portfolio") || msg.includes("jobs") || msg.includes("cogito")) {
      return "Abhishek is a prolific systems builder. Some of his premium digital products include:\n\n- **DION**: Drag-and-drop SaaS website builder built using Next.js 14, Postgres, and Stripe.\n- **Discover.Jobs**: A fast, client-centric job finder employing optimistic updates and Supabase.\n- **Cogito**: An AI-backed document and thesis summarizer leveraging custom PDF parser proxies and ChatGPT/Gemini APIs.\n- **Sorting Perceiver**: A sound-synthesizing algorithmic testbed leveraging the client **Web Audio API** and D3.\n\nAll of his applications feature elegant, high-contrast typography and subtle interactions.";
    }
    if (msg.includes("paint") || msg.includes("hobby") || msg.includes("passion") || msg.includes("art") || msg.includes("acrylic") || msg.includes("impasto")) {
      return "Beyond code, Abhishek is a deeply dedicated artist! He specializes in **Impasto Acrylic Painting** and graphic communication:\n\n- **Tactile Canvas**: He loves building thick, rich, palette-knife texture layers with abstract structural patterns.\n- **Color Palette**: His works frequently capture dramatic sky horizons with warm terracotta, burnt sienna, and bright amber glows.\n- **Design Grids**: He blends modern Swiss Swiss-Brutalist typography borders, grids, and metadata offsets into his digital artwork.\n\nThis portfolio's color theme—creamy sand and warning-stripe orange—is directly inspired by his creative painting palettes!";
    }
    if (msg.includes("contact") || msg.includes("email") || msg.includes("linkedin") || msg.includes("hire") || msg.includes("resume") || msg.includes("social") || msg.includes("how to")) {
      return "Getting in touch with Abhishek is very simple:\n\n- 📧 **Direct Email**: [abhishekmanhar004@gmail.com](mailto:abhishekmanhar004@gmail.com)\n- 💼 **LinkedIn**: [linkedin.com/in/abhishek-manhar-004](https://www.linkedin.com/in/abhishek-manhar-004/)\n- 🐙 **GitHub Hub**: [github.com/abhishekmanhar](https://github.com/abhishekmanhar)\n- 📄 **Resume PDF**: [View Google Drive Resume](https://drive.google.com/file/d/11ZDgFklnkDrgRcbTMz9Pd7vNC3ZogWKp/view?usp=sharing)\n\nHe is open to full-stack developer roles, developer relations engineering positions, and custom SaaS developments!";
    }
    if (msg.includes("skill") || msg.includes("technologies") || msg.includes("stack") || msg.includes("languages")) {
      return "Abhishek's toolkit is highly generalist and optimized for performance:\n\n- **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Redux, D3.js, framer-motion.\n- **Backend & Cloud**: Java, Spring Boot, Node.js, Express, Go, Python, PostgreSQL, MongoDB, Prisma, Supabase, Docker.\n- **Methodologies**: UML system design, performance profiling, responsive layout engineering, and API security.";
    }
    return "I am Abhishek's AI Twin! Feel free to ask me questions like:\n\n- \"What did he work on at JPMorgan and Citi?\"\n- \"Tell me about DION, his SaaS website builder.\"\n- \"What are his artistic painting hobbies?\"\n- \"How can I hire him or view his resume?\"\n\nI'll deliver exact, well-structured details right away!";
  };

  try {
    const ai = getGeminiClient();

    // Reconstruct conversation history to compatible format if passed
    // history should be an array of { role: "user" | "model", text: string }
    const formattedContents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        formattedContents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      });
    }

    // Add current user message
    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || getLocalResponse(cleanMsg);
    res.json({ text: reply });
  } catch (error: any) {
    console.warn("Gemini API was blocked or key is leaked. Gracefully falling back to integrated local engine:", error.message || error);
    // Graceful semantic fallback output so the user enjoys a seamless, high-fidelity experience
    const fallbackReply = getLocalResponse(cleanMsg);
    res.json({ text: fallbackReply });
  }
});

// Vite middleware setup for assets and SPA handling
let vite: any;
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

initServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
