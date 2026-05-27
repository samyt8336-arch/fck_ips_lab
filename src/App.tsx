import { useState, useRef, useEffect } from "react";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Play,
  Terminal,
  TerminalSquare,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FIPS_TEST_SUITE } from "./data";
import { TestExecution } from "./types";

function LogLine({
  text,
  type,
}: {
  text: string;
  type: "cmd" | "output" | "error" | "success" | "info";
}) {
  let colorClass = "text-slate-300";
  if (type === "cmd") colorClass = "text-blue-400 font-bold";
  if (type === "error") colorClass = "text-red-400";
  if (type === "success") colorClass = "text-emerald-400";
  if (type === "info") colorClass = "text-orange-400";

  return (
    <div className={`font-mono text-xs mb-1 leading-relaxed ${colorClass}`}>
      {type === "cmd" && <span className="text-slate-500 mr-2">$</span>}
      {text}
    </div>
  );
}

export default function App() {
  const [results, setResults] = useState<Record<string, TestExecution>>({});
  const [logs, setLogs] = useState<
    { text: string; type: "cmd" | "output" | "error" | "success" | "info" }[]
  >([]);
  const logEndRef = useRef<HTMLDivElement>(null);
  const [isRunningAll, setIsRunningAll] = useState(false);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const addLog = (
    text: string,
    type: "cmd" | "output" | "error" | "success" | "info",
  ) => {
    setLogs((prev) => [...prev, { text, type }]);
  };

  const runTest = async (testId: string) => {
    const test = FIPS_TEST_SUITE.find((t) => t.id === testId);
    if (!test) return;

    setResults((prev) => ({
      ...prev,
      [test.id]: { testId, result: "running", timestamp: Date.now() },
    }));

    addLog(`Executing on Backend Container`, "info");
    addLog(test.command, "cmd");

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: test.command }),
      });

      const data = await response.json();

      if (data.error) {
        addLog(`Server Error: ${data.error}`, "error");
        setResults((prev) => ({
          ...prev,
          [test.id]: { testId, result: "failed", timestamp: Date.now() },
        }));
        return;
      }

      if (data.stdout) {
        addLog(data.stdout, "output");
      }
      if (data.stderr) {
        addLog(data.stderr, "error");
      }
      if (!data.stdout && !data.stderr && !data.rawError) {
        addLog("No output", "info");
      }
      if (data.rawError) {
         addLog(data.rawError, "error");
      }

      const isError = data.exitCode !== 0;

      // In a strict FIPS check, if it's not approved, it EXPECTS an error flag/code.
      // E.g., md5 should fail in FIPS mode (isError = true).
      // If it fails when it should fail -> PASS.
      // If it passes when it should pass -> PASS.
      let passedTest = false;

      if (!test.isFipsApproved && isError) {
        passedTest = true; // Properly rejected
        addLog(
          `[PASS] Machine rejected unapproved alg (Exit ${data.exitCode})`,
          "success",
        );
      } else if (test.isFipsApproved && !isError) {
        passedTest = true; // Properly approved
        addLog(
          `[PASS] Machine executed approved alg successfully (Exit 0)`,
          "success",
        );
      } else {
        addLog(
          `[FAIL] Machine behaved unexpectedly. Is FIPS mode active on this host?`,
          "error",
        );
      }

      addLog("----------------------------------------", "output");
      setResults((prev) => ({
        ...prev,
        [test.id]: {
          testId,
          result: passedTest ? "passed" : "failed",
          timestamp: Date.now(),
        },
      }));
    } catch (e) {
      addLog(`Failed to communicate with backend server: ${e}`, "error");
      setResults((prev) => ({
        ...prev,
        [test.id]: { testId, result: "failed", timestamp: Date.now() },
      }));
    }
  };

  const runAllTests = async () => {
    if (isRunningAll) return;
    setIsRunningAll(true);
    setLogs([]);
    addLog(
      `Starting Full OpenSSL Sim Validation Suite against Machine...`,
      "info",
    );
    addLog("========================================", "output");

    for (const test of FIPS_TEST_SUITE) {
      await runTest(test.id);
    }

    addLog(`Full Validation Suite Complete.`, "info");
    setIsRunningAll(false);
  };

  const clearLogs = () => setLogs([]);

  const categories = Array.from(
    new Set(FIPS_TEST_SUITE.map((t) => t.category)),
  );

  return (
    <div className="h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col overflow-hidden">
      {/* Header Section */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md z-10 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 p-2 rounded shadow-sm">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1
              className="text-xl font-bold tracking-tight uppercase"
            >
              FIPS Validation Lab
            </h1>
            <p className="text-xs text-slate-400">
              OpenSSL Simulator Validation Queue
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button
            disabled={isRunningAll}
            onClick={runAllTests}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded text-xs font-semibold transition-colors shadow-sm"
          >
            <Play className="w-4 h-4" />
            <span>Run All Tests</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Test List Section */}
        <section className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-300 bg-white border-r border-slate-200">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-800 mb-1">
              Laboratory Execution Queue
            </h2>
            <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
              This interface interacts with a real{" "}
              <span className="font-mono font-medium text-slate-700 mx-1">
                OpenSSL
              </span>
              instance on the backend. Negative tests like MD5 are designed to be{" "}
              <strong>rejected</strong> when the host is operating in a strict FIPS mode.
            </p>
          </div>

          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category} className="space-y-3">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                  {category}
                  <span className="ml-2 font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[10px]">
                    {
                      FIPS_TEST_SUITE.filter((t) => t.category === category)
                        .length
                    }
                  </span>
                </h3>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                  {FIPS_TEST_SUITE.filter((t) => t.category === category).map(
                    (test) => {
                      const result = results[test.id];
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={test.id}
                          className={`bg-white border rounded shadow-sm p-4 transition-all flex flex-col ${
                            result?.result === "passed"
                              ? "border-emerald-200 bg-emerald-50/50"
                              : result?.result === "failed"
                                ? "border-red-200 bg-red-50/50"
                                : result?.result === "running"
                                  ? "border-blue-300 bg-blue-50/50 shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                                  : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              {test.isFipsApproved ? (
                                <div className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100 text-[10px] font-bold tracking-wider">
                                  POSITIVE
                                </div>
                              ) : (
                                <div className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded border border-red-100 text-[10px] font-bold tracking-wider">
                                  NEGATIVE
                                </div>
                              )}
                              <h4 className="font-bold text-slate-800 text-sm ml-1">
                                {test.name}
                              </h4>
                            </div>

                            <button
                              onClick={() => runTest(test.id)}
                              disabled={
                                result?.result === "running" || isRunningAll
                              }
                              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-blue-600 p-1.5 rounded transition-colors disabled:opacity-50 shadow-sm"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                            </button>
                          </div>

                          <p className="text-xs text-slate-500 mb-4">
                            {test.description}
                          </p>

                          <div className="flex items-center gap-2 mt-auto">
                            <code className="text-[11px] font-mono bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-200 flex-1 truncate">
                              {test.command}
                            </code>

                            {result?.result === "passed" && (
                              <span className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold italic uppercase tracking-wider">
                                <CheckCircle2 className="w-3.5 h-3.5" /> PASSED
                              </span>
                            )}
                            {result?.result === "failed" && (
                              <span className="flex items-center gap-1 text-red-600 text-[10px] font-bold italic uppercase tracking-wider">
                                <AlertTriangle className="w-3.5 h-3.5" /> FAILED
                              </span>
                            )}
                            {result?.result === "running" && (
                              <span className="flex items-center gap-1 text-blue-600 text-[10px] font-bold italic uppercase tracking-wider">
                                <div className="w-3 h-3 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />{" "}
                                RUNNING
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    },
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Terminal Section */}
        <section className="h-64 lg:h-auto lg:w-[450px] xl:w-[500px] bg-[#0f172a] shadow-inner flex flex-col shrink-0">
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <TerminalSquare className="w-4 h-4" />
              Console Output
            </div>
            <button
              onClick={clearLogs}
              className="text-slate-500 hover:text-slate-300 transition-colors p-1"
              title="Clear Console"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-slate-700">
            <AnimatePresence>
              {logs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-xs text-slate-600 mt-4 text-center leading-relaxed"
                >
                  <p>OPENSSL_FIPS_AGENT: STANDBY</p>
                  <p>WAITING FOR EXECUTION COMMANDS...</p>
                </motion.div>
              ) : (
                logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <LogLine text={log.text} type={log.type} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
            <div ref={logEndRef} />
          </div>
        </section>
      </main>
    </div>
  );
}
