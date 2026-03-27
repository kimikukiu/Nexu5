import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

const KEYS_FILE = path.join(process.cwd(), "api_keys.json");

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get("/api/config/keys", (req, res) => {
    try {
      if (fs.existsSync(KEYS_FILE)) {
        const data = fs.readFileSync(KEYS_FILE, "utf-8");
        res.json(JSON.parse(data));
      } else {
        res.json({});
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to read keys" });
    }
  });

  app.post("/api/config/keys", (req, res) => {
    try {
      fs.writeFileSync(KEYS_FILE, JSON.stringify(req.body, null, 2), "utf-8");
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save keys" });
    }
  });

  // API routes go here
  app.get("/api/search", async (req, res) => {
    const query = req.query.q as string;
    try {
      // Simple mock search for now, in a real app we might use a search API
      res.json({
        results: [
          { title: `${query} - Wikipedia`, url: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`, snippet: `Information about ${query} from the free encyclopedia.` },
          { title: `Latest news on ${query}`, url: `https://news.google.com/search?q=${encodeURIComponent(query)}`, snippet: `Recent updates and breaking news regarding ${query}.` }
        ]
      });
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  app.get("/api/scrape", async (req, res) => {
    const url = req.query.url as string;
    try {
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
      });
      const $ = cheerio.load(response.data);
      $('script, style').remove();
      const text = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 5000);
      res.json({ content: text });
    } catch (error) {
      res.status(500).json({ error: "Scrape failed" });
    }
  });

  app.post("/api/anthropic", async (req, res) => {
    const { message, system, apiKey, model } = req.body;
    
    if (!apiKey) {
      return res.status(401).json({ error: "Anthropic API key is missing" });
    }

    try {
      const response = await axios.post("https://api.anthropic.com/v1/messages", {
        model: model || "claude-3-5-sonnet-20241022",
        max_tokens: 4000,
        system: system,
        messages: [{ role: "user", content: message }]
      }, {
        headers: { 
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      res.json({ text: response.data.content[0].text });
    } catch (error: any) {
      console.error("[ANTHROPIC PROXY ERROR]", error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
    }
  });

  app.post("/api/lisp", async (req, res) => {
    const { code } = req.body;
    try {
      // Basic LISP evaluation (very limited for security)
      // In a real app, we'd use a proper sandbox
      res.json({ result: `LISP_EVAL_MOCK: ${code} executed successfully.` });
    } catch (error) {
      res.status(500).json({ error: "LISP execution failed" });
    }
  });

  app.post("/api/proxy", async (req, res) => {
    const { url, data, headers = {} } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Add a standard User-Agent to prevent Cloudflare/WAF blocks
    const proxyHeaders = {
      ...headers,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/event-stream, */*'
    };

    try {
      if (data.stream) {
        const response = await axios.post(url, data, { 
          headers: proxyHeaders, 
          responseType: 'stream' 
        });
        
        res.setHeader('Content-Type', 'text/event-stream');
        response.data.pipe(res);
      } else {
        const response = await axios.post(url, data, { headers: proxyHeaders });
        res.json(response.data);
      }
    } catch (error: any) {
      console.error("[PROXY ERROR]", error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
    }
  });

  app.post("/api/admin/clone-repo", (req, res) => {
    const { repoUrl } = req.body;
    if (!repoUrl) return res.status(400).json({ error: "Repo URL is required" });

    // In a real environment, we would use simple-git or child_process to clone
    // For this environment, we simulate the process with detailed logs
    const logs = [
      `[SYSTEM] Initializing autonomous cloning for: ${repoUrl}`,
      `[GIT] Connecting to remote repository...`,
      `[GIT] Authentication successful.`,
      `[GIT] Cloning into '/tmp/wormgpt-projection-${Math.random().toString(36).substring(7)}'...`,
      `[GIT] Receiving objects: 100% (1024/1024), 2.5 MiB | 5.0 MiB/s, done.`,
      `[SYSTEM] Analyzing repository structure with WormGPT Omega...`,
      `[WORM_AI] Detected Node.js environment.`,
      `[NPM] Running 'npm install' autonomously...`,
      `[NPM] added 452 packages from 280 contributors and audited 453 packages in 12.4s`,
      `[SYSTEM] Projection complete. Repository is now active in the neural mesh.`,
    ];

    res.json({ success: true, logs });
  });

  app.get("/api/admin/recovery-words", (req, res) => {
    // Simulated recovery words
    const words = ["NEURAL", "QUANTUM", "OMEGA", "WORM", "KERNEL", "STRIKE", "VAULT", "CIPHER", "GHOST", "PULSE", "VOID", "CORE"];
    res.json({ words });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
