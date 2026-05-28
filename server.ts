import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { execFile } from "child_process";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Execute Node.js FIPS commands
  app.post("/api/execute", (req, res) => {
    const { code } = req.body;

    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Invalid code." });
    }

    const wrappedScript = `
const crypto = require('crypto');
try { crypto.setFips(true); } catch(e) {}
${code}
`;

    execFile("node", ["-e", wrappedScript], (error, stdout, stderr) => {
      const result = {
        exitCode: error ? error.code : 0,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        rawError: error ? error.message : null,
      };
      res.json(result);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
