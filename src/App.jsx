import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#FDF6F0",
  bgDark: "#1A1410",
  card: "#FFFFFF",
  cardDark: "#241E18",
  primary: "#C97D5B",
  primaryLight: "#E8B49A",
  primaryDark: "#A05D3E",
  soft: "#F2E8E0",
  softDark: "#2E2419",
  text: "#3D2B1F",
  textDark: "#F0E6DC",
  textMuted: "#9C7D6A",
  textMutedDark: "#8A7060",
  green: "#7BA68A",
  greenLight: "#B8D4C0",
  lavender: "#9B8EC4",
  cream: "#FAF0E6",
};

const breathingPhases = [
  { label: "Inspira", duration: 4, color: "#C97D5B" },
  { label: "Segura", duration: 4, color: "#9B8EC4" },
  { label: "Expira", duration: 6, color: "#7BA68A" },
  { label: "Pausa", duration: 2, color: "#E8B49A" },
];

const emotionOptions = [
  { emoji: "😰", label: "Ansiosa", color: "#E8A87C" },
  { emoji: "😤", label: "Irritada", color: "#E07B7B" },
  { emoji: "😔", label: "Exausta", color: "#9B8EC4" },
  { emoji: "😶‍🌫️", label: "Perdida", color: "#7BA6B8" },
  { emoji: "😢", label: "A chorar", color: "#7BA68A" },
  { emoji: "🥴", label: "Confusa", color: "#C4A97A" },
];

const calmingMessages = [
  "Estás a fazer o teu melhor. Isso é o suficiente.",
  "Este momento vai passar. Respira.",
  "Não tens de ser perfeita. Só tens de estar presente.",
  "Pede ajuda não é fraqueza, é sabedoria.",
  "O teu corpo sabe como se acalmar. Deixa-o.",
];

const groundingSteps = [
  { emoji: "👁️", text: "5 coisas que consegues VER agora" },
  { emoji: "🤲", text: "4 coisas que consegues TOCAR" },
  { emoji: "👂", text: "3 coisas que consegues OUVIR" },
  { emoji: "👃", text: "2 coisas que consegues CHEIRAR" },
  { emoji: "👅", text: "1 coisa que consegues SABOREAR" },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState(0);
  const [breathCount, setBreathCount] = useState(0);
  const [breathTimer, setBreathTimer] = useState(4);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, text: "Jantar das crianças", done: false, waiting: false },
    { id: 2, text: "Responder à escola", done: false, waiting: false },
    { id: 3, text: "Banho das crianças", done: false, waiting: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [groundingStep, setGroundingStep] = useState(0);
  const [calmMsg] = useState(
    calmingMessages[Math.floor(Math.random() * calmingMessages.length)]
  );
  const [pulse, setPulse] = useState(false);
  const breathRef = useRef(null);
  const phaseRef = useRef(breathPhase);
  phaseRef.current = breathPhase;

  const c = (light, dark) => (darkMode ? dark : light);

  useEffect(() => {
    if (!breathingActive) return;

    const phase = breathingPhases[phaseRef.current];
    setBreathTimer(phase.duration);
    let elapsed = 0;

    breathRef.current = setInterval(() => {
      elapsed++;
      setBreathTimer(phase.duration - elapsed);

      if (elapsed >= phase.duration) {
        clearInterval(breathRef.current);
        const next = (phaseRef.current + 1) % breathingPhases.length;
        if (next === 0) setBreathCount((current) => current + 1);
        setBreathPhase(next);
      }
    }, 1000);

    return () => clearInterval(breathRef.current);
  }, [breathingActive, breathPhase]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const stopBreathing = () => {
    setBreathingActive(false);
    clearInterval(breathRef.current);
    setBreathPhase(0);
    setBreathCount(0);
    setBreathTimer(4);
  };

  const bgStyle = {
    minHeight: "100vh",
    background: darkMode
      ? "linear-gradient(160deg, #1A1410 0%, #241A12 60%, #1E1A22 100%)"
      : "linear-gradient(160deg, #FDF6F0 0%, #FAF0E6 60%, #F5EDF5 100%)",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: c(COLORS.text, COLORS.textDark),
    transition: "all 0.4s ease",
    position: "relative",
    overflow: "hidden",
  };

  const cardStyle = {
    background: c("rgba(255,255,255,0.85)", "rgba(36,30,24,0.9)"),
    borderRadius: "20px",
    padding: "20px",
    marginBottom: "16px",
    backdropFilter: "blur(10px)",
    border: `1px solid ${c(
      "rgba(201,125,91,0.15)",
      "rgba(201,125,91,0.2)"
    )}`,
    boxShadow: c(
      "0 4px 20px rgba(201,125,91,0.08)",
      "0 4px 20px rgba(0,0,0,0.3)"
    ),
  };

  const btnPrimary = {
    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
    color: "white",
    border: "none",
    borderRadius: "50px",
    padding: "14px 28px",
    fontSize: "16px",
    fontFamily: "inherit",
    cursor: "pointer",
    fontWeight: "600",
    letterSpacing: "0.5px",
    boxShadow: "0 4px 15px rgba(201,125,91,0.4)",
    transition: "all 0.2s ease",
    width: "100%",
  };

  const renderHome = () => (
    <div style={{ padding: "24px 20px", maxWidth: "420px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: COLORS.textMuted,
              marginBottom: "4px",
            }}
          >
            bem-vinda de volta
          </div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "400",
              margin: 0,
              color: c(COLORS.text, COLORS.textDark),
              fontStyle: "italic",
            }}
          >
            Fogo Calmo
          </h1>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: "none",
            border: `1px solid ${c(
              "rgba(201,125,91,0.3)",
              "rgba(201,125,91,0.4)"
            )}`,
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div
        style={{
          ...cardStyle,
          background: `linear-gradient(135deg, ${c(
            "#FFF0E8",
            "#2A1E16"
          )}, ${c("#FAE8DC", "#221A14")})`,
          textAlign: "center",
          padding: "28px 20px",
          cursor: "pointer",
        }}
        onClick={() => setScreen("emergency")}
      >
        <div
          style={{
            fontSize: "48px",
            marginBottom: "12px",
            filter: `drop-shadow(0 0 ${
              pulse ? "12px" : "4px"
            } rgba(201,125,91,0.6))`,
            transition: "filter 1.5s ease",
          }}
        >
          🌊
        </div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: COLORS.primary,
            marginBottom: "6px",
          }}
        >
          Estou no limite
        </div>
        <div
          style={{
            fontSize: "13px",
            color: COLORS.textMuted,
            lineHeight: "1.5",
          }}
        >
          Toca aqui quando precisares de acalmar agora
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            ...cardStyle,
            margin: 0,
            cursor: "pointer",
            textAlign: "center",
            padding: "18px 12px",
          }}
          onClick={() => setScreen("emotions")}
        >
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>💭</div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: c(COLORS.text, COLORS.textDark),
            }}
          >
            Como me sinto
          </div>
          <div
            style={{
              fontSize: "11px",
              color: COLORS.textMuted,
              marginTop: "4px",
            }}
          >
            Check-in emocional
          </div>
        </div>

        <div
          style={{
            ...cardStyle,
            margin: 0,
            cursor: "pointer",
            textAlign: "center",
            padding: "18px 12px",
          }}
          onClick={() => setScreen("tasks")}
        >
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>✏️</div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: c(COLORS.text, COLORS.textDark),
            }}
          >
            As minhas 3
          </div>
          <div
            style={{
              fontSize: "11px",
              color: COLORS.textMuted,
              marginTop: "4px",
            }}
          >
            Prioridades agora
          </div>
        </div>
      </div>

      <div style={{ ...cardStyle, textAlign: "center", padding: "20px" }}>
        <div
          style={{
            fontSize: "13px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: COLORS.textMuted,
            marginBottom: "10px",
          }}
        >
          para hoje
        </div>
        <div
          style={{
            fontSize: "15px",
            lineHeight: "1.7",
            fontStyle: "italic",
            color: c(COLORS.text, COLORS.textDark),
          }}
        >
          "{calmMsg}"
        </div>
      </div>

      <div
        style={{ ...cardStyle, cursor: "pointer" }}
        onClick={() => setScreen("grounding")}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ fontSize: "32px" }}>⚓</div>
          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "3px",
              }}
            >
              Exercício de grounding
            </div>
            <div style={{ fontSize: "12px", color: COLORS.textMuted }}>
              5-4-3-2-1 para voltar ao presente
            </div>
          </div>
          <div style={{ marginLeft: "auto", color: COLORS.primary, fontSize: "18px" }}>
            ›
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmergency = () => (
    <div style={{ padding: "24px 20px", maxWidth: "420px", margin: "0 auto" }}>
      <button
        onClick={() => {
          stopBreathing();
          setScreen("home");
        }}
        style={{
          background: "none",
          border: "none",
          color: COLORS.textMuted,
          fontSize: "24px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ←
      </button>

      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "400",
            fontStyle: "italic",
            margin: "0 0 8px",
          }}
        >
          Estás aqui. Isso é suficiente.
        </h2>
        <p style={{ fontSize: "14px", color: COLORS.textMuted, margin: 0 }}>
          Vamos respirar juntas por um momento.
        </p>
      </div>

      <div style={{ ...cardStyle, textAlign: "center", padding: "32px 20px" }}>
        {!breathingActive ? (
          <>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🫁</div>
            <div
              style={{
                fontSize: "16px",
                marginBottom: "20px",
                color: c(COLORS.text, COLORS.textDark),
              }}
            >
              Respiração guiada
            </div>
            <p
              style={{
                fontSize: "13px",
                color: COLORS.textMuted,
                marginBottom: "24px",
                lineHeight: "1.6",
              }}
            >
              Inspira 4 · Segura 4 · Expira 6 · Pausa 2
            </p>
            <button style={btnPrimary} onClick={() => setBreathingActive(true)}>
              Começar agora
            </button>
          </>
        ) : (
          <>
            <div
              style={{
                position: "relative",
                width: "140px",
                height: "140px",
                margin: "0 auto 24px",
              }}
            >
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${breathingPhases[breathPhase].color}40, ${breathingPhases[breathPhase].color}10)`,
                  border: `3px solid ${breathingPhases[breathPhase].color}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transform:
                    breathingPhases[breathPhase].label === "Inspira"
                      ? "scale(1.1)"
                      : breathingPhases[breathPhase].label === "Expira"
                      ? "scale(0.9)"
                      : "scale(1)",
                  transition: `transform ${breathingPhases[breathPhase].duration}s ease-in-out, background 0.5s ease`,
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: breathingPhases[breathPhase].color,
                  }}
                >
                  {breathTimer}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: breathingPhases[breathPhase].color,
                    marginTop: "4px",
                  }}
                >
                  {breathingPhases[breathPhase].label}
                </div>
              </div>
            </div>

            <div style={{ fontSize: "13px", color: COLORS.textMuted, marginBottom: "20px" }}>
              Ciclo {breathCount + 1} · {breathingPhases[breathPhase].label.toLowerCase()}...
            </div>

            <button
              style={{
                ...btnPrimary,
                background: "transparent",
                border: `1px solid ${c(
                  "rgba(201,125,91,0.3)",
                  "rgba(201,125,91,0.4)"
                )}`,
                color: COLORS.primary,
              }}
              onClick={stopBreathing}
            >
              Parar
            </button>
          </>
        )}
      </div>

      <div style={{ ...cardStyle, textAlign: "center", background: c("#F5F0F8", "#1E1826") }}>
        <div style={{ fontSize: "20px", marginBottom: "10px" }}>💜</div>
        <p
          style={{
            fontSize: "14px",
            fontStyle: "italic",
            lineHeight: "1.7",
            margin: 0,
            color: c(COLORS.text, COLORS.textDark),
          }}
        >
          "{calmMsg}"
        </p>
      </div>

      <button
        style={{
          ...btnPrimary,
          background: "transparent",
          border: `1px solid ${c(
            "rgba(201,125,91,0.3)",
            "rgba(201,125,91,0.4)"
          )}`,
          color: COLORS.primary,
          marginTop: "8px",
        }}
        onClick={() => setScreen("grounding")}
      >
        ⚓ Exercício de grounding
      </button>
    </div>
  );

  const renderEmotions = () => (
    <div style={{ padding: "24px 20px", maxWidth: "420px", margin: "0 auto" }}>
      <button
        onClick={() => {
          setSelectedEmotion(null);
          setScreen("home");
        }}
        style={{
          background: "none",
          border: "none",
          color: COLORS.textMuted,
          fontSize: "24px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ←
      </button>

      {!selectedEmotion ? (
        <>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "400",
              fontStyle: "italic",
              margin: "0 0 8px",
            }}
          >
            Como te sentes agora?
          </h2>
          <p style={{ fontSize: "14px", color: COLORS.textMuted, marginBottom: "28px" }}>
            Sem julgamentos. Só honestidade.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {emotionOptions.map((e) => (
              <div
                key={e.label}
                style={{
                  ...cardStyle,
                  margin: 0,
                  cursor: "pointer",
                  textAlign: "center",
                  padding: "20px 12px",
                  border: `1px solid ${e.color}30`,
                  transition: "all 0.2s ease",
                }}
                onClick={() => setSelectedEmotion(e)}
              >
                <div style={{ fontSize: "36px", marginBottom: "8px" }}>{e.emoji}</div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: e.color }}>
                  {e.label}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div style={{ ...cardStyle, textAlign: "center", padding: "32px 20px" }}>
            <div style={{ fontSize: "56px", marginBottom: "12px" }}>{selectedEmotion.emoji}</div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: selectedEmotion.color,
                margin: "0 0 12px",
              }}
            >
              {selectedEmotion.label}
            </h3>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.7",
                color: c(COLORS.text, COLORS.textDark),
                fontStyle: "italic",
              }}
            >
              {selectedEmotion.label === "Ansiosa" &&
                "A ansiedade está a tentar proteger-te. Podes dizer-lhe que estás bem."}
              {selectedEmotion.label === "Irritada" &&
                "A raiva tem energia. Usa-a para definir um limite, não para te consumir."}
              {selectedEmotion.label === "Exausta" &&
                "O teu corpo pediu socorro. Podes parar 5 minutos. O mundo continua."}
              {selectedEmotion.label === "Perdida" &&
                "Quando tudo parece demais, foca numa coisa só. Uma. Só uma."}
              {selectedEmotion.label === "A chorar" &&
                "As lágrimas são inteligência emocional. Chora. Está bem."}
              {selectedEmotion.label === "Confusa" &&
                "Clareza vem depois do descanso. Não precisas de resolver tudo agora."}
            </p>
          </div>

          <div style={{ ...cardStyle }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "12px",
                color: COLORS.textMuted,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Agora podes
            </div>

            {[
              { icon: "🫁", text: "Respiração guiada", action: () => setScreen("emergency") },
              { icon: "⚓", text: "Grounding 5-4-3-2-1", action: () => setScreen("grounding") },
              { icon: "✏️", text: "Ver as minhas prioridades", action: () => setScreen("tasks") },
            ].map((item) => (
              <div
                key={item.text}
                onClick={item.action}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 0",
                  borderBottom: `1px solid ${c(
                    "rgba(201,125,91,0.1)",
                    "rgba(201,125,91,0.15)"
                  )}`,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "20px" }}>{item.icon}</span>
                <span style={{ fontSize: "14px", color: c(COLORS.text, COLORS.textDark) }}>
                  {item.text}
                </span>
                <span style={{ marginLeft: "auto", color: COLORS.primary }}>›</span>
              </div>
            ))}
          </div>

          <button
            style={{
              ...btnPrimary,
              background: "transparent",
              border: `1px solid ${c(
                "rgba(201,125,91,0.3)",
                "rgba(201,125,91,0.4)"
              )}`,
              color: COLORS.primary,
            }}
            onClick={() => setSelectedEmotion(null)}
          >
            ← Voltar
          </button>
        </>
      )}
    </div>
  );

  const renderTasks = () => (
    <div style={{ padding: "24px 20px", maxWidth: "420px", margin: "0 auto" }}>
      <button
        onClick={() => setScreen("home")}
        style={{
          background: "none",
          border: "none",
          color: COLORS.textMuted,
          fontSize: "24px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ←
      </button>

      <h2
        style={{
          fontSize: "22px",
          fontWeight: "400",
          fontStyle: "italic",
          margin: "0 0 6px",
        }}
      >
        As tuas 3 prioridades
      </h2>

      <p style={{ fontSize: "13px", color: COLORS.textMuted, marginBottom: "24px" }}>
        Só o que realmente importa agora.
      </p>

      {tasks
        .filter((t) => !t.waiting)
        .map((task) => (
          <div
            key={task.id}
            style={{
              ...cardStyle,
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 20px",
            }}
          >
            <div
              onClick={() =>
                setTasks(
                  tasks.map((t) =>
                    t.id === task.id ? { ...t, done: !t.done } : t
                  )
                )
              }
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                border: `2px solid ${
                  task.done ? COLORS.green : COLORS.primaryLight
                }`,
                background: task.done ? COLORS.green : "transparent",
                cursor: "pointer",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "white",
              }}
            >
              {task.done ? "✓" : ""}
            </div>

            <span
              style={{
                flex: 1,
                fontSize: "15px",
                textDecoration: task.done ? "line-through" : "none",
                color: task.done
                  ? COLORS.textMuted
                  : c(COLORS.text, COLORS.textDark),
              }}
            >
              {task.text}
            </span>

            <button
              onClick={() =>
                setTasks(
                  tasks.map((t) =>
                    t.id === task.id ? { ...t, waiting: true } : t
                  )
                )
              }
              style={{
                background: c("#F2E8E0", "#2E2419"),
                border: "none",
                borderRadius: "20px",
                padding: "6px 12px",
                fontSize: "11px",
                color: COLORS.textMuted,
                cursor: "pointer",
              }}
            >
              pode esperar
            </button>
          </div>
        ))}

      {tasks.some((t) => t.waiting) && (
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: COLORS.textMuted,
              marginBottom: "12px",
            }}
          >
            Pode esperar
          </div>

          {tasks
            .filter((t) => t.waiting)
            .map((task) => (
              <div
                key={task.id}
                style={{
                  ...cardStyle,
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 20px",
                  opacity: 0.6,
                }}
              >
                <span style={{ flex: 1, fontSize: "14px", color: COLORS.textMuted }}>
                  {task.text}
                </span>

                <button
                  onClick={() =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, waiting: false } : t
                      )
                    )
                  }
                  style={{
                    background: "none",
                    border: "none",
                    color: COLORS.primary,
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  restaurar
                </button>
              </div>
            ))}
        </div>
      )}

      {tasks.filter((t) => !t.waiting).length < 3 && (
        <div style={{ ...cardStyle, display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Adicionar tarefa..."
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontSize: "14px",
              color: c(COLORS.text, COLORS.textDark),
              fontFamily: "inherit",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newTask.trim()) {
                setTasks([
                  ...tasks,
                  {
                    id: Date.now(),
                    text: newTask.trim(),
                    done: false,
                    waiting: false,
                  },
                ]);
                setNewTask("");
              }
            }}
          />

          <button
            onClick={() => {
              if (newTask.trim()) {
                setTasks([
                  ...tasks,
                  {
                    id: Date.now(),
                    text: newTask.trim(),
                    done: false,
                    waiting: false,
                  },
                ]);
                setNewTask("");
              }
            }}
            style={{
              background: COLORS.primary,
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              color: "white",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            +
          </button>
        </div>
      )}

      <div
        style={{
          ...cardStyle,
          textAlign: "center",
          background: c("#F5F8F5", "#1A2018"),
          marginTop: "8px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: COLORS.green,
            fontStyle: "italic",
            lineHeight: "1.6",
          }}
        >
          Não tens de fazer tudo hoje. Precisas apenas de fazer o suficiente.
        </p>
      </div>
    </div>
  );

  const renderGrounding = () => (
    <div style={{ padding: "24px 20px", maxWidth: "420px", margin: "0 auto" }}>
      <button
        onClick={() => {
          setGroundingStep(0);
          setScreen("home");
        }}
        style={{
          background: "none",
          border: "none",
          color: COLORS.textMuted,
          fontSize: "24px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ←
      </button>

      <h2
        style={{
          fontSize: "22px",
          fontWeight: "400",
          fontStyle: "italic",
          margin: "0 0 8px",
        }}
      >
        Grounding 5-4-3-2-1
      </h2>

      <p style={{ fontSize: "14px", color: COLORS.textMuted, marginBottom: "28px" }}>
        Volta ao teu corpo. Volta ao presente.
      </p>

      <div style={{ ...cardStyle, textAlign: "center", padding: "36px 24px" }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            margin: "0 auto 20px",
            background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.lavender}20)`,
            border: `2px solid ${COLORS.primary}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
          }}
        >
          {groundingSteps[groundingStep].emoji}
        </div>

        <div
          style={{
            fontSize: "40px",
            fontWeight: "700",
            color: COLORS.primary,
            marginBottom: "8px",
          }}
        >
          {5 - groundingStep}
        </div>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.7",
            color: c(COLORS.text, COLORS.textDark),
            marginBottom: "28px",
          }}
        >
          {groundingSteps[groundingStep].text}
        </p>

        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "24px" }}>
          {groundingSteps.map((_, i) => (
            <div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: i <= groundingStep ? COLORS.primary : c("#E8D8CE", "#3D3028"),
              }}
            />
          ))}
        </div>

        {groundingStep < groundingSteps.length - 1 ? (
          <button style={btnPrimary} onClick={() => setGroundingStep(groundingStep + 1)}>
            Próximo →
          </button>
        ) : (
          <div>
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>🌿</div>
            <p
              style={{
                fontSize: "15px",
                fontStyle: "italic",
                color: COLORS.green,
                marginBottom: "20px",
              }}
            >
              Estás no presente. Estás segura.
            </p>

            <button
              style={btnPrimary}
              onClick={() => {
                setGroundingStep(0);
                setScreen("home");
              }}
            >
              Voltar ao início
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={bgStyle}>
      <div
        style={{
          position: "fixed",
          top: "-80px",
          right: "-80px",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: darkMode
            ? "rgba(201,125,91,0.05)"
            : "rgba(201,125,91,0.08)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "40px",
          left: "-60px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: darkMode
            ? "rgba(155,142,196,0.05)"
            : "rgba(155,142,196,0.07)",
          pointerEvents: "none",
        }}
      />

      {screen === "home" && renderHome()}
      {screen === "emergency" && renderEmergency()}
      {screen === "emotions" && renderEmotions()}
      {screen === "tasks" && renderTasks()}
      {screen === "grounding" && renderGrounding()}

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: c("rgba(253,246,240,0.95)", "rgba(26,20,16,0.95)"),
          backdropFilter: "blur(10px)",
          borderTop: `1px solid ${c(
            "rgba(201,125,91,0.12)",
            "rgba(201,125,91,0.15)"
          )}`,
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 0 16px",
        }}
      >
        {[
          { icon: "🏠", label: "Início", s: "home" },
          { icon: "🌊", label: "Limite", s: "emergency" },
          { icon: "💭", label: "Sinto-me", s: "emotions" },
          { icon: "✏️", label: "Tarefas", s: "tasks" },
        ].map((item) => (
          <button
            key={item.s}
            onClick={() => {
              stopBreathing();
              setSelectedEmotion(null);
              setGroundingStep(0);
              setScreen(item.s);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              padding: "4px 8px",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                filter: screen === item.s ? "none" : "grayscale(50%)",
                opacity: screen === item.s ? 1 : 0.5,
              }}
            >
              {item.icon}
            </span>
            <span
              style={{
                fontSize: "10px",
                color: screen === item.s ? COLORS.primary : COLORS.textMuted,
                fontFamily: "inherit",
                letterSpacing: "0.5px",
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div style={{ height: "80px" }} />
    </div>
  );
}
