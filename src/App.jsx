import { useState, useRef, useEffect } from "react";
import userProfile from "./assets/user_profile.png";
import logoBrand from "./assets/logo_brand.png";
import logoTopado from "./assets/logo_topado.png";
import "./responsive.css";

/* ══════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════ */
const RED = "#C0392B";
const BG = "#0B0B0F";
const CARD_BG = "#131316";
const BORDER = "rgba(255,255,255,0.06)";

/* ══════════════════════════════════════════════════
   CATALOG DATA
══════════════════════════════════════════════════ */
const INITIAL_CATALOG = {
  areas: [
    {
      slug: "interpretacao", emoji: "📖",
      title: "Interpretação e Análise de Textos",
      descricao: "Leitura, compreensão e análise de textos de diferentes gêneros.",
      modulos: [
        { slug: "interp-x-decod", title: "Interpretação × Decodificar", subtopicos: ["O que é interpretar?", "O que é analisar?", "Inferência vs. Decodificação", "Ideia principal e secundárias"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "erros-interp", title: "Erros de Interpretação", subtopicos: ["Extrapolação", "Redução", "Contradição", "Como evitar erros em provas"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "generos", title: "Gêneros Textuais", subtopicos: ["Gênero textual", "Forma e estrutura", "Conteúdo e tema", "Intencionalidade do autor", "Artigo de opinião", "Notícia", "Crônica"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "tipologia", title: "Tipologia Textual", subtopicos: ["Narrativo", "Descritivo", "Expositivo", "Argumentativo", "Injuntivo", "Dialogal"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "citacao", title: "Citação", subtopicos: ["Citação direta", "Citação indireta", "Ilha textual"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "variacao", title: "Variação Linguística", subtopicos: ["Variação regional", "Variação social", "Variação histórica", "Formal e informal"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "coesao", title: "Coesão e Coerência", subtopicos: ["Coesão referencial", "Anáfora", "Catáfora", "Elipse", "Encapsulamento", "Sinônimos"], progresso: 0, bloqueado: false, temAula: true },
      ],
    },
    {
      slug: "fonologia", emoji: "🔤",
      title: "Fonologia e Acentuação",
      descricao: "Sons, sílabas e acentuação gráfica.",
      modulos: [
        { slug: "fonemas", title: "Tipos de Fonemas", subtopicos: ["Vogais", "Consoantes", "Semivogais"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "encontros", title: "Encontros Vocálicos", subtopicos: ["Ditongo", "Tritongo", "Hiato"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "silabas", title: "Separação e Tonicidade", subtopicos: ["Monossílabas", "Oxítonas", "Paroxítonas", "Proparoxítonas"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "acentuacao", title: "Acentuação Gráfica", subtopicos: ["Regra básica", "Regra do Hiato", "Acentos Diferenciais"], progresso: 0, bloqueado: false, temAula: true },
      ],
    },
    {
      slug: "formacao", emoji: "🧩",
      title: "Formação de Palavras",
      descricao: "Como as palavras são formadas e estruturadas.",
      modulos: [
        { slug: "derivacao", title: "Derivação", subtopicos: ["Derivação prefixal", "Derivação sufixal", "Derivação parassintética", "Derivação regressiva", "Derivação imprópria"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "tipos-deriv", title: "Tipos de Derivação", subtopicos: ["Prefixos mais usados", "Sufixos nominais", "Sufixos verbais"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "composicao", title: "Composição", subtopicos: ["Justaposição", "Aglutinação", "Diferenças e exemplos"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "abreviacao", title: "Abreviação Vocabular", subtopicos: ["Siglas", "Abreviatura", "Símbolos"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "hibridismo", title: "Hibridismo", subtopicos: ["O que é hibridismo?", "Hibridismo greco-latino", "Exemplos"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "onomatopeia", title: "Onomatopeia", subtopicos: ["Definição e exemplos", "Uso na literatura"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "estrangeirismo", title: "Estrangeirismo", subtopicos: ["Anglicismo", "Galicismo", "Outros estrangeirismos"], progresso: 0, bloqueado: false, temAula: true },
      ],
    },
    {
      slug: "classes", emoji: "📚",
      title: "Classes de Palavras",
      descricao: "As 10 classes gramaticais e suas funções.",
      modulos: [
        { slug: "substantivo", title: "Substantivo", subtopicos: ["Classificação", "Próprio e comum", "Concreto e abstrato", "Coletivos", "Flexão"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "artigo", title: "Artigo", subtopicos: ["Artigo definido", "Artigo indefinido", "Uso do artigo"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "adjetivo", title: "Adjetivo", subtopicos: ["Classificação", "Locução adjetiva", "Graus do adjetivo"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "pronome", title: "Pronomes", subtopicos: ["Pessoais do caso reto", "Pessoais oblíquos", "Possessivos", "Demonstrativos", "Indefinidos", "Relativos", "Interrogativos", "Colocação pronominal"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "verbo", title: "Verbos", subtopicos: ["Infinitivo, gerúndio e particípio", "Modos verbais", "Tempos verbais", "Verbos irregulares", "Voz ativa, passiva e reflexiva", "Verbos impessoais"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "adverbio", title: "Advérbios", subtopicos: ["Classificação", "Locuções adverbiais", "Grau dos advérbios"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "preposicao", title: "Preposições", subtopicos: ["Preposições essenciais", "Preposições acidentais", "Locuções prepositivas"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "conjuncao", title: "Conjunções", subtopicos: ["Coordenativas", "Subordinativas", "Locuções conjuntivas"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "interjeicao", title: "Interjeição", subtopicos: ["Definição", "Tipos", "Locuções interjetivas"], progresso: 0, bloqueado: false, temAula: true },
      ],
    },
    {
      slug: "sintaxe", emoji: "🔗",
      title: "Sintaxe — Termos da Oração",
      descricao: "Estrutura das orações e relações entre termos.",
      modulos: [
        { slug: "termos", title: "Termos da Oração", subtopicos: ["Sujeito e predicado", "Objeto direto", "Objeto indireto", "Complemento nominal", "Adjunto adnominal", "Adjunto adverbial", "Aposto", "Vocativo"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "sujeito", title: "Estudo do Sujeito", subtopicos: ["Sujeito simples", "Sujeito composto", "Sujeito oculto", "Sujeito indeterminado", "Oração sem sujeito"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "conc-verbal", title: "Concordância Verbal", subtopicos: ["Regra geral", "Sujeito composto antes do verbo", "Sujeito composto depois do verbo", "Pronome relativo que/quem", "Casos especiais"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "conc-nominal", title: "Concordância Nominal", subtopicos: ["Regra geral", "Adjetivo com vários substantivos", "Casos especiais"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "sub-sub", title: "Orações Subordinadas Substantivas", subtopicos: ["Subjetiva", "Objetiva direta", "Objetiva indireta", "Completiva nominal", "Predicativa", "Apositiva"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "sub-adj", title: "Orações Subordinadas Adjetivas", subtopicos: ["Restritiva", "Explicativa", "Pronomes relativos", "Reduzidas"], progresso: 0, bloqueado: false, temAula: true },
      ],
    },
    {
      slug: "ortografia", emoji: "✍️",
      title: "Crase e Pontuação",
      descricao: "Uso correto da crase e dos sinais de pontuação.",
      modulos: [
        { slug: "crase", title: "Crase", subtopicos: ["O que é crase?", "Casos obrigatórios", "Casos proibidos", "Casos facultativos", "Crase antes de pronomes", "Crase antes de nomes próprios", "Dicas para a prova"], progresso: 0, bloqueado: false, temAula: true },
        { slug: "pontuacao", title: "Pontuação", subtopicos: ["Vírgula — uso correto", "Vírgula — uso incorreto", "Ponto final", "Ponto e vírgula", "Dois-pontos", "Travessão", "Reticências", "Aspas", "Parênteses"], progresso: 0, bloqueado: false, temAula: true },
      ],
    },
  ],
};

function getAllModulos(cat) {
  if (!cat || !cat.areas) return [];
  return cat.areas.flatMap(a => (a.modulos || []).map(m => ({ area: a, modulo: m })));
}

/* ══════════════════════════════════════════════════
   SHARED COMPONENTS
══════════════════════════════════════════════════ */

function NavPill({ label, active, onClick, emoji, variant }) {
  const isRed = variant === "red";
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 16px",
        borderRadius: 24,
        background: active ? (isRed ? RED : "rgba(255,255,255,0.15)") : "transparent",
        border: "none",
        color: active ? "#fff" : "#999",
        fontSize: 13,
        fontWeight: active ? 700 : 600,
        cursor: "pointer",
        fontFamily: "inherit",
        display: "flex",
        alignItems: "center",
        gap: 6,
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          e.currentTarget.style.color = "#fff";
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#999";
        }
      }}
    >
      {emoji && <span style={{ fontSize: 14 }}>{emoji}</span>}
      {label}
    </button>
  );
}

function GlobalNav({ page, onHome, onPomodoro, onFlashcards, onCorretorTopado, onProfile, areaTitle, moduloTitle, searchQuery, onSearch }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <nav style={{
      height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", position: "sticky", top: 0, zIndex: 100,
      background: "linear-gradient(to bottom, rgba(17,17,17,0.95) 0%, rgba(17,17,17,0.8) 100%)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid rgba(255,255,255,0.05)`,
      flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24, flex: 1 }}>
        {/* Logo */}
        <button onClick={onHome} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}>
          <img src={logoBrand} alt="Português Topado" style={{ height: 48, objectFit: "contain" }} />
        </button>

        {/* Navigation Pills */}
        <div className="nav-pills-container" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <NavPill label="Início" active={page === "home"} onClick={onHome} />
          <NavPill label="Aulas" active={page === "aula"} onClick={() => { if (page !== "home") onHome(); setTimeout(() => document.getElementById("trilhas")?.scrollIntoView({ behavior: "smooth" }), 100); }} />
          <NavPill label="Foco" active={page === "pomodoro"} onClick={onPomodoro} />
          <NavPill label="Revisão" active={page === "flashcards"} onClick={onFlashcards} />
          <NavPill label="Corretor Topado" active={page === "corretor"} onClick={onCorretorTopado} variant="red" />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* Search Bar - Netflix Style */}
        <div className="search-container" style={{
          display: "flex", alignItems: "center", gap: 8,
          background: isSearchFocused ? "rgba(255,255,255,0.07)" : "transparent",
          border: `1px solid ${isSearchFocused ? "rgba(255,255,255,0.12)" : "transparent"}`,
          borderRadius: 4, padding: "4px 8px",
          transition: "all 0.3s ease",
          width: isSearchFocused ? 240 : 120,
        }}>
          <span style={{ opacity: 0.4, fontSize: 12, color: "#aaa", fontWeight: 500 }}>Buscar</span>
          <input
            value={searchQuery}
            onChange={e => onSearch(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            placeholder="Títulos, aulas..."
            style={{
              background: "none", border: "none", outline: "none",
              color: "#fff", fontSize: 13, width: "100%",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Dynamic Context */}
        {page === "aula" && (
          <div className="context-badge" style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 12px", background: "rgba(255,255,255,0.05)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#666", textTransform: "uppercase" }}>ESTUDANDO:</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#ccc", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{moduloTitle}</span>
          </div>
        )}

        {/* User Profile */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{ padding: 0, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 4, background: RED, overflow: "hidden", border: "2px solid transparent", transition: "border 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"} onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
              <img src={userProfile} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="User" />
            </div>
            <span style={{ fontSize: 12, color: "#999", borderTop: "5px solid #999", borderLeft: "4px solid transparent", borderRight: "4px solid transparent", transition: "transform 0.2s", transform: showUserMenu ? "rotate(180deg)" : "none" }} />
          </button>

          {showUserMenu && (
            <>
              <div onClick={() => setShowUserMenu(false)} style={{ position: "fixed", inset: 0, zIndex: 110 }} />
              <div style={{
                position: "absolute", top: 40, right: 0, width: 160,
                background: "rgba(0,0,0,0.9)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4, overflow: "hidden", zIndex: 120,
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
              }}>
                <button
                  onClick={() => { setShowUserMenu(false); onProfile(); }}
                  style={{ width: "100%", padding: "12px 16px", background: "none", border: "none", color: "#fff", fontSize: 13, textAlign: "left", cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >
                  👤 Editar Perfil
                </button>
                <div style={{ height: 1, background: "rgba(255,255,255,0.1)" }} />
                <button
                  style={{ width: "100%", padding: "12px 16px", background: "none", border: "none", color: "#fff", fontSize: 13, textAlign: "left", cursor: "pointer", opacity: 0.6 }}
                >
                  Sair da Conta
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════ */

/* Paleta de cores por área — usada como fundo do poster */
const AREA_GRADIENTS = {
  interpretacao: ["#1e1010", "#0e0808"],
  fonologia: ["#111118", "#09090e"],
  formacao: ["#101814", "#08100d"],
  classes: ["#141014", "#0c090c"],
  sintaxe: ["#18140a", "#0e0c06"],
  ortografia: ["#131316", "#0B0B0F"],
};

const AREA_ACCENT = {
  interpretacao: RED,
  fonologia: RED,
  formacao: RED,
  classes: RED,
  sintaxe: RED,
  ortografia: RED,
};

function ModuleCard({ modulo, area, onClick }) {
  const [hov, setHov] = useState(false);
  const label = modulo.progresso === 0 ? "Explorar" : modulo.progresso === 100 ? "Revisar" : "Continuar";
  const [g1, g2] = AREA_GRADIENTS[area.slug] || ["#131316", "#0B0B0F"];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        width: 175,
        height: 260,
        flexShrink: 0,
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transform: hov ? "scale(1.03)" : "scale(1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: hov
          ? "0 24px 52px rgba(0,0,0,0.75)"
          : "0 4px 18px rgba(0,0,0,0.45)",
        background: `linear-gradient(160deg, ${g1} 0%, ${g2} 100%)`,
      }}
    >
      {/* Gradiente inferior para legibilidade do texto */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "75%",
        background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.6) 55%, transparent 100%)",
        zIndex: 3,
      }} />

      {/* Conteúdo inferior */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "14px 14px 14px",
        zIndex: 6,
      }}>
        {/* Título */}
        <p style={{
          fontSize: 13, fontWeight: 700, color: "#f0f0f0",
          lineHeight: 1.3, margin: "0 0 10px",
          letterSpacing: "0.01em",
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical", overflow: "hidden",
          textShadow: "0 1px 6px rgba(0,0,0,0.9)",
        }}>
          {modulo.title}
        </p>

        {/* Barra de progresso */}
        {modulo.progresso > 0 && (
          <div style={{ marginBottom: 10 }}>
            <div style={{ height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${modulo.progresso}%`, background: RED, borderRadius: 99 }} />
            </div>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", margin: "4px 0 0", textAlign: "right" }}>{modulo.progresso}%</p>
          </div>
        )}

        {/* Botão */}
        <button
          onClick={e => { e.stopPropagation(); onClick(); }}
          style={{
            width: "100%", padding: "7px 0",
            background: hov ? RED : "rgba(255,255,255,0.08)",
            border: "none",
            borderRadius: 6,
            color: hov ? "#fff" : "#aaa", fontSize: 11, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
            transition: "background 0.2s ease, color 0.2s ease",
            letterSpacing: "0.03em",
          }}
        >
          {label}
        </button>
      </div>
    </div>
  );
}

function TrackRail({ title, descricao, children, id }) {
  const ref = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = () => {
    const el = ref.current; if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };
  useEffect(() => {
    const el = ref.current; if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update); ro.observe(el);
    return () => { el.removeEventListener("scroll", update); ro.disconnect(); };
  }, []);

  const scroll = dir => ref.current?.scrollBy({ left: dir === "r" ? 560 : -560, behavior: "smooth" });

  return (
    <section id={id} style={{ marginBottom: 48 }}>
      {/* Header da seção */}
      <div className="track-rail-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: "0 0 2px", letterSpacing: "-0.01em" }}>{title}</h2>
          {descricao && <p style={{ fontSize: 12, color: "#555", margin: 0 }}>{descricao}</p>}
        </div>
        {/* Setas integradas no header */}
        <div className="track-rail-arrows" style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          {[{ dir: "l", active: canLeft }, { dir: "r", active: canRight }].map(({ dir, active }) => (
            <button key={dir} onClick={() => scroll(dir)} style={{
              width: 32, height: 32, borderRadius: 8,
              background: active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${active ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.05)"}`,
              color: active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
              fontSize: 16, cursor: active ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "inherit", transition: "all 0.15s",
            }}
              onMouseEnter={e => { if (active) e.currentTarget.style.background = "rgba(255,255,255,0.13)"; }}
              onMouseLeave={e => { if (active) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            >
              {dir === "l" ? "‹" : "›"}
            </button>
          ))}
        </div>
      </div>

      {/* Trilho com fade nas bordas */}
      <div style={{ position: "relative" }}>
        {/* Fade esquerda */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 8, width: 40, zIndex: 5,
          background: `linear-gradient(to right, ${BG}, transparent)`,
          pointerEvents: "none",
          opacity: canLeft ? 1 : 0, transition: "opacity 0.2s",
        }} />
        {/* Fade direita */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 8, width: 60, zIndex: 5,
          background: `linear-gradient(to left, ${BG}, transparent)`,
          pointerEvents: "none",
          opacity: canRight ? 1 : 0, transition: "opacity 0.2s",
        }} />

        <div ref={ref} style={{
          display: "flex", gap: 10, overflowX: "auto",
          paddingBottom: 10, paddingTop: 4,
          scrollbarWidth: "none", msOverflowStyle: "none",
        }}>
          {children}
        </div>
      </div>
    </section>
  );
}

function ModulePanel({ modulo, area, onClose, onOpenLesson }) {
  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1000, backdropFilter: "blur(8px)" }} />
      <div className="module-modal-container" style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "90%", maxWidth: 800, background: "#0B0B0F", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24, padding: "48px 60px", zIndex: 1001, display: "flex", gap: 60,
        animation: "fadeInUp 0.3s ease-out"
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 24, right: 24, background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "50%", width: 40, height: 40, color: "#fff", cursor: "pointer", fontSize: 24 }}>&times;</button>

        <div style={{ flex: 1 }}>
          <div style={{ display: "inline-flex", background: RED + "15", color: RED, padding: "4px 12px", borderRadius: 4, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>{area.title}</div>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-0.02em", textTransform: "uppercase" }}>{modulo.title}</h2>
          <p style={{ fontSize: 15, color: "#555", marginBottom: 40, lineHeight: 1.6 }}>{area.descricao}</p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => { onClose(); onOpenLesson({ area, modulo }); }}
              style={{ padding: "14px 28px", background: RED, border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >EXPLORAR CONTEÚDO</button>
          </div>
        </div>

        <div className="module-modal-side" style={{ width: 240, borderLeft: "1px solid rgba(255,255,255,0.05)", paddingLeft: 40 }}>
          <h4 style={{ fontSize: 10, color: "#444", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>Tópicos</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {modulo.subtopicos.map((st, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: RED, opacity: 0.3 }} />
                <span style={{ fontSize: 13, color: "#888" }}>{st}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════
   REDACAO PAGE (AI CHATBOT)
══════════════════════════════════════════════════ */


function ProfilePage({ user, onUpdateUser, onHome }) {
  const [tempName, setTempName] = useState(user.name);
  const [saved, setSaved] = useState(false);

  const save = () => {
    onUpdateUser({ ...user, name: tempName });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", padding: "0 24px", animation: "slideIn 0.3s ease" }}>
      <button onClick={onHome} style={{ background: "none", border: "none", color: "#666", fontSize: 13, cursor: "pointer", marginBottom: 20 }}>← Voltar para Início</button>

      <h1 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 40 }}>Editar Perfil</h1>

      <div className="profile-grid" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 32, alignItems: "start", background: CARD_BG, padding: 32, borderRadius: 12, border: `1px solid ${BORDER}` }}>
        <div className="profile-avatar-wrapper" style={{ position: "relative" }}>
          <div style={{ width: 120, height: 120, borderRadius: 8, background: RED, overflow: "hidden", border: "4px solid rgba(255,255,255,0.1)" }}>
            <img src={userProfile} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Avatar" />
          </div>
          <button style={{ position: "absolute", bottom: -10, right: -10, width: 36, height: 36, borderRadius: "50%", background: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>✏️</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#555", textTransform: "uppercase", marginBottom: 8 }}>Nome de Exibição</label>
            <input
              value={tempName}
              onChange={e => setTempName(e.target.value)}
              placeholder="Seu nome"
              style={{ width: "100%", background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "12px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit", outline: "none" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#555", textTransform: "uppercase", marginBottom: 8 }}>Configurações de Idioma</label>
            <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 6, border: "1px solid rgba(255,255,255,0.05)", fontSize: 14, color: "#aaa" }}>Português (Brasil)</div>
          </div>

          <button
            onClick={save}
            style={{
              alignSelf: "flex-start", padding: "12px 32px",
              background: saved ? "#22C97A" : "#fff",
              color: saved ? "#fff" : "#111",
              border: "none", borderRadius: 4, fontWeight: 800, fontSize: 13,
              cursor: "pointer", transition: "all 0.3s ease"
            }}
          >
            {saved ? "✓ Salvo" : "Salvar Alterações"}
          </button>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: "#555", textTransform: "uppercase", marginBottom: 20 }}>Suas Estatísticas</h3>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { label: "Aulas Concluídas", val: "12" },
            { label: "Módulos Iniciados", val: "3" },
            { label: "Dias Ativos", val: "0" }
          ].map(stat => (
            <div key={stat.label} style={{ background: "rgba(255,255,255,0.02)", padding: 20, borderRadius: 6, border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>{stat.val}</div>
              <div style={{ fontSize: 11, color: "#555", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomePage({ onOpenLesson, onClarityLab, searchQuery, catalog }) {
  const [panel, setPanel] = useState(null);

  // Filtragem inteligente baseada na busca
  const allModulos = getAllModulos(catalog);
  const searchLower = searchQuery.toLowerCase();

  const filteredModulos = allModulos.filter(x =>
    x.modulo.title.toLowerCase().includes(searchLower) ||
    x.area.title.toLowerCase().includes(searchLower) ||
    x.modulo.subtopicos.some(s => s.toLowerCase().includes(searchLower))
  );

  const inProgress = filteredModulos.filter(x => x.modulo.progresso > 0 && x.modulo.progresso < 100);
  const recommended = filteredModulos.filter(x => !x.modulo.bloqueado).slice(0, 10);

  // Se estiver buscando, mostrar layout simplificado de resultados
  if (searchQuery) {
    return (
      <main className="search-results-page" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 48px 100px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 8 }}>Resultados para "{searchQuery}"</h2>
        <p style={{ fontSize: 14, color: "#555", marginBottom: 40 }}>{filteredModulos.length} módulos encontrados</p>

        {filteredModulos.length > 0 ? (
          <div className="search-results-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: 24 }}>
            {filteredModulos.map(({ area, modulo }) => (
              <ModuleCard key={`search:${modulo.slug}`} modulo={modulo} area={area} onClick={() => setPanel({ area, modulo })} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#444", display: "block", marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.08em" }}>Nenhum resultado</span>
            <p style={{ color: "#888" }}>Nenhum módulo encontrado com esse nome.</p>
          </div>
        )}
        {panel && <ModulePanel modulo={panel.modulo} area={panel.area} onClose={() => setPanel(null)} onOpenLesson={onOpenLesson} onClarityLab={onClarityLab} />}
      </main>
    );
  }

  return (
    <>
      {/* HERO */}
      <header className="hero-section" style={{ position: "relative", overflow: "hidden", padding: "72px 32px 80px", background: `radial-gradient(ellipse 55% 70% at -5% -10%, rgba(120,12,8,0.45) 0%, transparent 55%), ${BG}` }}>
        <div className="hero-content-wrapper" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 560 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, padding: "4px 12px", fontSize: 11, color: "#555", marginBottom: 28, background: "rgba(255,255,255,0.02)", letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 600 }}>
              Preparatório IFRN &middot; 9º ano &middot; Professor Christian Siqueira
            </div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#fff", marginBottom: 18, textTransform: "uppercase" }}>
              Português topado<br />para o IFRN
            </h1>
            <p style={{ fontSize: 15, color: "#525258", lineHeight: 1.7, maxWidth: 420, marginBottom: 36, fontWeight: 400 }}>
              Sua trilha até a aprovação.
            </p>
            <div className="hero-buttons" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => { const t = (inProgress.length ? inProgress : recommended)[0]; if (t) setPanel(t); }}
                style={{ padding: "12px 26px", borderRadius: 6, background: RED, border: "none", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.15s", letterSpacing: "0.01em" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >Começar agora</button>
              <button onClick={() => document.getElementById("continuar")?.scrollIntoView({ behavior: "smooth" })}
                style={{ padding: "12px 26px", borderRadius: 6, background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "#888", fontWeight: 500, fontSize: 14, cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s, color 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#ccc"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#888"; }}
              >Ver catálogo</button>
            </div>
          </div>
        </div>
      </header>

      {/* RAILS */}
      <main id="trilhas" style={{ maxWidth: 1100, margin: "0 auto", padding: "44px 48px 100px" }}>
        <div id="continuar">
          <TrackRail title="Continue estudando" descricao={inProgress.length ? "Retome de onde você parou." : "Nada em andamento ainda — escolha um módulo para começar."}>
            {(inProgress.length ? inProgress : recommended).map(({ area, modulo }) => (
              <ModuleCard key={`cont:${modulo.slug}`} modulo={modulo} area={area} onClick={() => setPanel({ area, modulo })} />
            ))}
          </TrackRail>
        </div>
        <TrackRail title="Selecionado para você" descricao="Módulos disponíveis para iniciar agora.">
          {recommended.map(({ area, modulo }) => (
            <ModuleCard key={`rec:${modulo.slug}`} modulo={modulo} area={area} onClick={() => setPanel({ area, modulo })} />
          ))}
        </TrackRail>
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0 44px" }} />
        {catalog.areas.map(area => (
          <TrackRail key={area.slug} id={area.slug} title={area.title} descricao={area.descricao}>
            {area.modulos.map(modulo => (
              <ModuleCard key={modulo.slug} modulo={modulo} area={area} onClick={() => setPanel({ area, modulo })} />
            ))}
          </TrackRail>
        ))}
      </main>

      {panel && <ModulePanel modulo={panel.modulo} area={panel.area} onClose={() => setPanel(null)} onOpenLesson={onOpenLesson} />}
    </>
  );
}

/* ══════════════════════════════════════════════════
   LESSON PAGE — Interpretação e Análise de Textos
══════════════════════════════════════════════════ */

const quiz = [
  { id: 1, pergunta: "\"A linguagem de sinais é uma língua real que requer habilidades expressivas e comunicativas, assim como ocorre nas línguas faladas.\" O que o autor faz nessa frase?", opcoes: ["Narra um acontecimento passado", "Defende que a linguagem de sinais é inferior à falada", "Informa e compara as linguagens, apresentando um dado", "Descreve a aparência das linguagens"], correta: 2, explicacao: "O trecho é expositivo — informa sobre a linguagem de sinais e a compara com a falada. Apenas um dado é apresentado, sem opinião do autor." },
  { id: 2, pergunta: "Um aluno leu: \"Respirar conscientemente é a chave principal.\" e concluiu: \"O texto diz que respirar cura todas as doenças.\" Que erro cometeu?", opcoes: ["Redução — focou num só aspecto", "Extrapolação — foi além do que o texto afirma", "Contradição — entendeu o oposto", "Nenhum erro — a conclusão está correta"], correta: 1, explicacao: "O texto fala em 'cura e renovação' de modo geral. Concluir que cura TODAS as doenças é extrapolação: o aluno acrescentou algo que o texto não afirma." },
  { id: 3, pergunta: "\"O maior programa brasileiro de notícias completa 40 anos. A história de quatro décadas registra os fatos mais relevantes da história mundial.\" Qual é a IDEIA PRINCIPAL?", opcoes: ["O programa tem 40 anos documentando fatos e evoluções", "O programa faz propaganda de si mesmo", "A tecnologia transformou as comunicações no mundo", "O programa é o maior em número de espectadores"], correta: 0, explicacao: "A ideia principal norteia todas as outras. O trecho celebra os 40 anos do programa destacando sua documentação histórica." },
];

const tipologias = [
  { tipo: "Narrativo", icone: "📖", cor: "#4F7CFF", desc: "Conta uma história com personagens, tempo e espaço.", marcas: ["verbos de ação no passado", "personagens e narrador", "sequência de eventos"], ex: "\"Maria saiu de casa cedo, atravessou o bairro e chegou à escola antes de todos.\"" },
  { tipo: "Descritivo", icone: "🖼️", cor: "#22C97A", desc: "Descreve características de pessoas, lugares ou objetos.", marcas: ["adjetivos abundantes", "verbos de estado (ser, estar, parecer)", "sem progressão de ação"], ex: "\"A sala era ampla, iluminada por janelas altas. As paredes brancas contrastavam com o piso escuro.\"" },
  { tipo: "Expositivo", icone: "📊", cor: "#F59E0B", desc: "Informa, explica ou apresenta dados sobre um tema.", marcas: ["linguagem objetiva", "dados e fatos", "sem opinião do autor"], ex: "\"A linguagem de sinais é uma língua real que requer habilidades expressivas e comunicativas.\"" },
  { tipo: "Argumentativo", icone: "⚖️", cor: "#EC4899", desc: "Defende um ponto de vista com argumentos.", marcas: ["conectivos: portanto, logo, pois", "opinião explícita do autor", "contra-argumentos"], ex: "\"A educação pública precisa de mais investimentos, pois é o único caminho para reduzir as desigualdades.\"" },
  { tipo: "Injuntivo", icone: "📋", cor: "#8B5CF6", desc: "Instrui, orienta ou manda fazer algo.", marcas: ["verbos no imperativo", "linguagem direta e clara", "sequência de ações"], ex: "\"Abra o documento. Clique em Arquivo. Selecione Salvar Como.\"" },
  { tipo: "Dialogal", icone: "💬", cor: RED, desc: "Apresenta diálogos diretos entre personagens.", marcas: ["travessão (—) ou aspas", "verbos de fala: disse, respondeu", "turnos de fala alternados"], ex: "\"— Você estudou para a prova?\n— Estudei sim — respondeu Pedro.\"" },
];

const erros = [
  { tipo: "EXTRAPOLAÇÃO", icone: "🚀", cor: "#FF6B4A", def: "Você vai ALÉM do texto, acrescentando ideias que não estão escritas — seja por conhecimento prévio ou imaginação.", texto: "\"Respirar conscientemente é a chave principal.\"", errado: "❌ \"O texto diz que respirar cura todas as doenças físicas e mentais.\"", certo: "✅ \"O texto sugere que a respiração consciente ajuda a tranquilizar a mente.\"", dica: "Pergunte-se: isso está ESCRITO no texto ou estou inventando?" },
  { tipo: "REDUÇÃO", icone: "🔬", cor: "#4F7CFF", def: "Você foca em apenas UM aspecto e ignora o restante, como se o texto falasse só daquilo.", texto: "\"Linguagens de sinais têm gramática, evoluem com o uso e variam entre países.\"", errado: "❌ \"O texto fala apenas sobre a gramática das linguagens de sinais.\"", certo: "✅ \"O texto aborda vários aspectos: gramática, evolução e variação.\"", dica: "Leia o texto completo antes de responder. Um texto é um conjunto de ideias!" },
  { tipo: "CONTRADIÇÃO", icone: "🔄", cor: "#22C97A", def: "Você entende o OPOSTO do que está escrito, geralmente porque a ideia do texto contraria sua opinião.", texto: "\"O pensamento correto nos leva à fala e à ação corretas.\"", errado: "❌ \"O texto afirma que a fala e a ação são mais importantes que o pensamento.\"", certo: "✅ \"O texto afirma que o pensamento correto é o ponto de partida para fala e ação.\"", dica: "Na prova, esqueça sua opinião. O que importa é o que o AUTOR disse." },
];

function Callout({ icon, title, children, color }) {
  const c = color || "#4F7CFF";
  return (
    <div style={{ background: c + "0d", border: `1px solid ${c}25`, borderLeft: `3px solid ${c}`, borderRadius: "0 8px 8px 0", padding: "14px 16px", marginBottom: 16 }}>
      <p style={{ fontSize: 12, fontWeight: 800, color: c, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 6 }}><span>{icon}</span>{title}</p>
      <div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

function SectionTitle({ number, title, subtitle }) {
  return (
    <div style={{ margin: "0 0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: RED + "20", border: `1px solid ${RED}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: RED, flexShrink: 0 }}>{number}</div>
        <h2 style={{ fontSize: 18, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>{title}</h2>
      </div>
      {subtitle && <p style={{ fontSize: 13, color: "#666", marginLeft: 38, lineHeight: 1.5 }}>{subtitle}</p>}
    </div>
  );
}

function SecInferencia() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="1" title="Interpretar × Decodificar" subtitle="Não é a mesma coisa! Entender essa diferença já te coloca à frente na prova." />
      <div className="resp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
        {[
          { label: "INFERÊNCIA", color: "#4F7CFF", icon: "🧠", def: "Identificar informações IMPLÍCITAS — o que está nas entrelinhas.", acoes: ["Sair do explícito para o implícito", "Concluir ideias a partir do que está escrito", "Ir além das palavras sem inventar"] },
          { label: "DECODIFICAÇÃO", color: "#22C97A", icon: "🔍", def: "Localizar informações EXPLÍCITAS — o que está literalmente escrito.", acoes: ["Buscar dados concretos no texto", "Verificar palavras-chave", "Confirmar informações diretas"] },
        ].map(item => (
          <div key={item.label} style={{ background: CARD_BG, border: `1px solid ${item.color}30`, borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: "18px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 900, color: item.color, letterSpacing: "0.08em" }}>{item.label}</span>
            </div>
            <p style={{ fontSize: 13, color: "#bbb", marginBottom: 12, lineHeight: 1.6 }}>{item.def}</p>
            {item.acoes.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 5 }}>
                <span style={{ color: item.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                <span style={{ fontSize: 12, color: "#888" }}>{a}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "18px 18px" }}>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: "#444", textTransform: "uppercase", marginBottom: 12 }}>💡 Mesmo texto, duas perguntas diferentes</p>
        <div style={{ background: "#1e1e1e", borderLeft: "3px solid #F59E0B", borderRadius: "0 8px 8px 0", padding: "12px 14px", marginBottom: 14, fontSize: 13, fontStyle: "italic", color: "#ccc", lineHeight: 1.7 }}>
          "A linguagem de sinais é uma língua real que requer habilidades expressivas, <strong style={{ color: "#fff", fontStyle: "normal" }}>assim como ocorre nas línguas faladas.</strong>"
        </div>
        <div className="resp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "🔍 DECODIFICAÇÃO", color: "#4F7CFF", q: "O texto afirma que a linguagem de sinais é uma língua real?", r: "→ Sim. Está explícito na primeira linha." },
            { label: "🧠 INFERÊNCIA", color: "#22C97A", q: "O autor considera as linguagens de sinais e faladas equivalentes?", r: "→ Sim. A comparação implica equiparação." },
          ].map(item => (
            <div key={item.label} style={{ background: item.color + "10", border: `1px solid ${item.color}25`, borderRadius: 8, padding: "12px 14px" }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: item.color, margin: "0 0 6px" }}>{item.label}</p>
              <p style={{ fontSize: 12, color: "#999", margin: "0 0 6px", lineHeight: 1.5 }}>{item.q}</p>
              <p style={{ fontSize: 12, color: "#22C97A", margin: 0, fontWeight: 700 }}>{item.r}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecErros() {
  const [aberto, setAberto] = useState(null);
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="2" title="Os 3 Erros Fatais de Interpretação" subtitle="Esses erros eliminam mais candidatos do que qualquer conteúdo gramatical." />
      <Callout icon="⚠️" title="REGRA DE OURO" color="#F59E0B">
        Na hora da prova: <strong style={{ color: "#fff" }}>esqueça sua opinião.</strong> O que vale é o que o AUTOR escreveu. Nada mais, nada menos.
      </Callout>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {erros.map((e, i) => (
          <div key={i} style={{ background: CARD_BG, border: `1px solid ${aberto === i ? e.cor + "40" : BORDER}`, borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
            <button onClick={() => setAberto(aberto === i ? null : i)} style={{ width: "100%", padding: "14px 16px", background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0, background: e.cor + "18", border: `1px solid ${e.cor}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{e.icone}</div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: 0 }}>{e.tipo}</p>
                  <p style={{ fontSize: 11, color: "#555", margin: 0 }}>{e.def.slice(0, 55)}...</p>
                </div>
              </div>
              <span style={{ color: "#555", fontSize: 18, transition: "transform 0.2s", transform: aberto === i ? "rotate(180deg)" : "none" }}>⌄</span>
            </button>
            {aberto === i && (
              <div style={{ padding: "0 16px 18px", borderTop: `1px solid ${BORDER}` }}>
                <p style={{ fontSize: 13, color: "#bbb", lineHeight: 1.65, margin: "14px 0 14px" }}>{e.def}</p>
                <div style={{ background: "#1e1e1e", borderLeft: `3px solid ${e.cor}`, borderRadius: "0 8px 8px 0", padding: "12px 14px", fontSize: 13, fontStyle: "italic", color: "#ccc", marginBottom: 14, lineHeight: 1.6 }}>{e.texto}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                  <div style={{ background: "#FF6B4A10", border: "1px solid #FF6B4A25", borderRadius: 8, padding: "12px 14px" }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "#FF6B4A", margin: "0 0 5px" }}>INCORRETA</p>
                    <p style={{ fontSize: 12, color: "#999", margin: 0, lineHeight: 1.5 }}>{e.errado}</p>
                  </div>
                  <div style={{ background: "#22C97A10", border: "1px solid #22C97A25", borderRadius: 8, padding: "12px 14px" }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "#22C97A", margin: "0 0 5px" }}>CORRETA</p>
                    <p style={{ fontSize: 12, color: "#999", margin: 0, lineHeight: 1.5 }}>{e.certo}</p>
                  </div>
                </div>
                <div style={{ background: e.cor + "10", border: `1px solid ${e.cor}25`, borderRadius: 8, padding: "9px 12px", display: "flex", gap: 7 }}>
                  <span style={{ fontSize: 13 }}>💡</span>
                  <p style={{ fontSize: 12, color: e.cor, margin: 0, fontWeight: 700 }}>{e.dica}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── DADOS DOS GÊNEROS ─────────────────────────── */
const generosData = [
  {
    g: "Artigo de Opinião", ico: "✍️", cor: "#4F7CFF",
    def: "Texto que defende um ponto de vista sobre um tema atual e relevante. O autor assina o texto e usa argumentos para convencer o leitor.",
    onde: "Jornal, revista, internet",
    marcas: ["Verbos de opinião: acredito, considero, defendo", "Conectivos argumentativos: portanto, logo, pois", "Primeira pessoa ou terceira com posição clara"],
    ex: "\"A educação pública precisa de mais investimentos. Sem isso, a desigualdade social nunca será reduzida de forma efetiva no Brasil.\"",
    perguntaProva: "Como identificar na prova?",
    respostaProva: "O autor DEFENDE algo e usa argumentos. Você sente que ele quer te convencer de alguma coisa.",
  },
  {
    g: "Notícia", ico: "📰", cor: "#22C97A",
    def: "Relata um fato recente de forma objetiva, sem opinião. Responde às perguntas básicas: quem? o quê? quando? onde? como? por quê?",
    onde: "Jornal, telejornal, portal de notícias",
    marcas: ["Linguagem objetiva e impessoal", "Verbos no passado recente ou presente", "Ausência de opinião do autor"],
    ex: "\"O governo anunciou ontem um novo pacote de medidas econômicas. A proposta será votada na Câmara dos Deputados na próxima semana.\"",
    perguntaProva: "Como identificar na prova?",
    respostaProva: "Fato concreto, recente, sem julgamento do autor. Linguagem seca e direta.",
  },
  {
    g: "Crônica", ico: "📝", cor: "#F59E0B",
    def: "Texto literário curto sobre um fato do cotidiano. Pode ser reflexiva, humorística ou lírica. Mistura narração com argumentação.",
    onde: "Jornal, revistas, livros",
    marcas: ["Linguagem mais próxima da fala", "Tom pessoal e subjetivo", "Mistura narrativo + argumentativo ou narrativo + descritivo"],
    ex: "\"Toda segunda-feira é igual: a fila do pão, o ônibus lotado, o chefe com cara de poucos amigos. Mas hoje tinha sol, e isso já muda tudo.\"",
    perguntaProva: "Como identificar na prova?",
    respostaProva: "Texto curto, assunto do dia a dia, tom pessoal. O autor narra E reflete ao mesmo tempo.",
  },
  {
    g: "Propaganda / Publicidade", ico: "📣", cor: "#EC4899",
    def: "Texto criado para persuadir o leitor a consumir um produto, serviço ou ideia. Usa recursos visuais e linguísticos para seduzir.",
    onde: "TV, internet, outdoor, embalagens",
    marcas: ["Linguagem sedutora e apelativa", "Slogan (frase curta e marcante)", "Figuras de linguagem: metáfora, hipérbole"],
    ex: "\"O maior programa brasileiro de notícias completa 40 anos. Quatro décadas de história, verdade e credibilidade.\"",
    perguntaProva: "Como identificar na prova?",
    respostaProva: "Quer te vender algo ou te convencer de uma ideia. Sempre tem uma chamada, um slogan ou uma promessa.",
  },
];

function SecGeneros() {
  const [sel, setSel] = useState(null);
  const [quizResp, setQuizResp] = useState(null);
  const [quizRev, setQuizRev] = useState(false);

  const quizGeneros = [
    { texto: "\"A linguagem de sinais é uma língua real que requer habilidades expressivas e comunicativas, assim como ocorre nas línguas faladas. Os cientistas demonstraram que os circuitos cerebrais são essencialmente os mesmos.\"", resposta: 2, opcoes: ["Artigo de opinião — defende a língua de sinais", "Crônica — conta uma história do cotidiano", "Notícia — relata um fato usando dados científicos", "Propaganda — quer vender algo relacionado à linguagem"], feedback: "Texto expositivo/notícia: apresenta dados objetivos (circuitos cerebrais, cientistas) sem opinião do autor. Nenhuma defesa, nenhum produto — só informação." },
    { texto: "\"O maior programa brasileiro de notícias completa 40 anos. A história de quatro décadas registra os fatos mais relevantes da história mundial, bem como as evoluções tecnológicas que vêm transformando as comunicações.\"", resposta: 3, opcoes: ["Notícia — relata um fato jornalístico recente", "Crônica — reflexão sobre a passagem do tempo", "Artigo de opinião — defende a importância do programa", "Propaganda — celebra e valoriza o programa para atrair audiência"], feedback: "É propaganda comemorativa: o texto NÃO informa com neutralidade — ele exalta o programa (\"maior\", \"mais relevantes\") para atrair e convencer o público." },
  ];

  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="3" title="Gêneros Textuais" subtitle="Todo texto se apresenta por meio de um gênero. Saber identificar qual é ele define como você vai interpretá-lo." />

      {/* ── O QUE É GÊNERO TEXTUAL ── */}
      <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 20px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: RED + "18", border: `1px solid ${RED}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📌</div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>O que é gênero textual?</p>
            <p style={{ fontSize: 13, color: "#bbb", lineHeight: 1.7, margin: "0 0 14px" }}>
              Gêneros textuais são <strong style={{ color: "#fff" }}>formas de expressão</strong> que a comunicação humana desenvolveu ao longo do tempo. Todo texto se apresenta por meio de um gênero — e a comunicação humana se baseia neles.
            </p>
            {/* Os 4 fatores do gênero — visual igual ao quadro da apostila */}
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#555", margin: "0 0 10px" }}>4 fatores que definem o gênero</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "FORMA", desc: "Estrutura do texto", icon: "📐", cor: "#4F7CFF" },
                { label: "CONTEÚDO / TEMA", desc: "Sobre o que fala", icon: "💬", cor: "#22C97A" },
                { label: "CONTEXTO DE CIRCULAÇÃO", desc: "Onde o texto aparece", icon: "📍", cor: "#F59E0B" },
                { label: "INTENCIONALIDADE DO AUTOR", desc: "O que ele quer com o texto", icon: "🎯", cor: "#EC4899" },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: f.cor + "0d", border: `1px solid ${f.cor}20` }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{f.icon}</span>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 900, color: f.cor, margin: 0, letterSpacing: "0.06em" }}>{f.label}</p>
                    <p style={{ fontSize: 11, color: "#777", margin: 0 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CARDS DE GÊNEROS — clicáveis ── */}
      <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#444", marginBottom: 12 }}>
        Clique em um gênero para ver detalhes
      </p>
      <div className="resp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {generosData.map((item, i) => (
          <div key={i}
            onClick={() => setSel(sel === i ? null : i)}
            style={{
              background: sel === i ? item.cor + "12" : CARD_BG,
              border: `1px solid ${sel === i ? item.cor + "50" : BORDER}`,
              borderTop: `3px solid ${sel === i ? item.cor : "transparent"}`,
              borderRadius: 10, padding: "14px 14px",
              cursor: "pointer", transition: "all 0.18s",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>{item.ico}</span>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: 0 }}>{item.g}</p>
              </div>
              <span style={{ fontSize: 14, color: sel === i ? item.cor : "#444", transition: "transform 0.2s", transform: sel === i ? "rotate(180deg)" : "none" }}>⌄</span>
            </div>
            <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 10px", lineHeight: 1.55 }}>{item.def}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <p style={{ fontSize: 11, margin: 0 }}>📍 <span style={{ color: "#666" }}>{item.onde}</span></p>
            </div>

            {/* Expandido */}
            {sel === i && (
              <div style={{ marginTop: 14, borderTop: `1px solid ${item.cor}20`, paddingTop: 14 }}>
                {/* Marcas linguísticas */}
                <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: item.cor, margin: "0 0 8px" }}>🔑 Como reconhecer</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 14 }}>
                  {item.marcas.map((m, mi) => (
                    <div key={mi} style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: item.cor + "20", border: `1px solid ${item.cor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: item.cor, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>{mi + 1}</div>
                      <span style={{ fontSize: 12, color: "#aaa" }}>{m}</span>
                    </div>
                  ))}
                </div>
                {/* Exemplo */}
                <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: item.cor, margin: "0 0 6px" }}>📝 Exemplo real</p>
                <div style={{ background: "#1a1a1a", borderLeft: `3px solid ${item.cor}`, borderRadius: "0 8px 8px 0", padding: "10px 12px", fontSize: 12, fontStyle: "italic", color: "#ccc", lineHeight: 1.6, marginBottom: 12 }}>
                  {item.ex}
                </div>
                {/* Dica prova */}
                <div style={{ background: item.cor + "0d", border: `1px solid ${item.cor}25`, borderRadius: 8, padding: "10px 12px", display: "flex", gap: 8 }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>🎯</span>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 800, color: item.cor, margin: "0 0 2px" }}>{item.perguntaProva}</p>
                    <p style={{ fontSize: 12, color: "#aaa", margin: 0, lineHeight: 1.5 }}>{item.respostaProva}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── TEXTO JORNALÍSTICO — REGRA DE OURO ── */}
      <Callout icon="🎯" title="REGRA DE OURO PARA A PROVA DO IFRN" color={RED}>
        Texto jornalístico <strong style={{ color: "#fff" }}>sem imagens</strong>? É quase certo que é um destes três:{" "}
        <strong style={{ color: "#fff" }}>artigo de opinião, notícia ou crônica.</strong>
        <br />
        A diferença está na <strong style={{ color: "#fff" }}>intencionalidade</strong>: o artigo defende, a notícia informa, a crônica reflete.
      </Callout>

      {/* ── COMO IDENTIFICAR: FLUXOGRAMA MENTAL ── */}
      <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 20px", marginBottom: 20 }}>
        <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#444", marginBottom: 16 }}>🧭 Fluxograma mental — como identificar o gênero</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { perg: "O texto informa um fato recente com neutralidade?", sim: "→ NOTÍCIA", nao: "Continue..." },
            { perg: "O texto defende uma opinião com argumentos?", sim: "→ ARTIGO DE OPINIÃO", nao: "Continue..." },
            { perg: "O texto conta um fato do cotidiano com tom pessoal?", sim: "→ CRÔNICA", nao: "Continue..." },
            { perg: "O texto quer te vender algo ou te convencer com apelo?", sim: "→ PROPAGANDA", nao: "→ Pode ser outro gênero!" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 0 }}>
              {/* Linha vertical */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: i === 0 ? RED : "#2a2a2a", border: `2px solid ${i === 0 ? RED : "#333"}`, flexShrink: 0, marginTop: 14 }} />
                {i < 3 && <div style={{ width: 2, flex: 1, background: "#2a2a2a", minHeight: 20 }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: i < 3 ? 12 : 0, paddingTop: 8 }}>
                <p style={{ fontSize: 13, color: "#ccc", fontWeight: 600, margin: "0 0 4px" }}>{item.perg}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 20, background: "#22C97A15", border: "1px solid #22C97A30", color: "#22C97A", fontWeight: 700 }}>SIM {item.sim}</span>
                  <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, color: "#666" }}>NÃO {item.nao}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MINI QUIZ DE GÊNEROS ── */}
      <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 20px" }}>
        <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#444", marginBottom: 4 }}>⚡ Treino rápido — identifique o gênero</p>
        <p style={{ fontSize: 12, color: "#555", marginBottom: 18 }}>Questões retiradas da apostila. Use o fluxograma!</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {quizGeneros.map((q, qi) => {
            const respAtual = quizResp?.[qi];
            const revelado = quizRev && respAtual !== undefined;
            const acertou = respAtual === q.resposta;
            return (
              <div key={qi} style={{ borderTop: qi > 0 ? `1px solid ${BORDER}` : "none", paddingTop: qi > 0 ? 18 : 0 }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: RED + "20", border: `1px solid ${RED}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: RED, marginTop: 1 }}>{qi + 1}</span>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#555", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Leia o trecho e identifique o gênero:</p>
                    <div style={{ background: "#161616", borderLeft: "3px solid #F59E0B", borderRadius: "0 8px 8px 0", padding: "10px 12px", fontSize: 13, fontStyle: "italic", color: "#ccc", lineHeight: 1.65 }}>
                      {q.texto}
                    </div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginLeft: 32, marginBottom: 10 }}>
                  {q.opcoes.map((op, oi) => {
                    let bg = "transparent", border = BORDER, cor = "#777";
                    if (revelado) {
                      if (oi === q.resposta) { bg = "#22C97A15"; border = "#22C97A50"; cor = "#22C97A"; }
                      else if (oi === respAtual && oi !== q.resposta) { bg = "#FF6B4A15"; border = "#FF6B4A50"; cor = "#FF6B4A"; }
                    } else if (oi === respAtual) { bg = RED + "15"; border = RED + "50"; cor = "#ddd"; }
                    return (
                      <button key={oi} onClick={() => !quizRev && setQuizResp(r => ({ ...(r || {}), [qi]: oi }))}
                        style={{ padding: "9px 12px", background: bg, border: `1px solid ${border}`, borderRadius: 7, color: cor, fontSize: 12, textAlign: "left", cursor: quizRev ? "default" : "pointer", fontFamily: "inherit", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 7 }}>
                        <span style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, background: "rgba(255,255,255,0.04)", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: cor }}>
                          {revelado && oi === q.resposta ? "✓" : revelado && oi === respAtual && oi !== q.resposta ? "✗" : String.fromCharCode(65 + oi)}
                        </span>
                        {op}
                      </button>
                    );
                  })}
                </div>
                {revelado && (
                  <div style={{ marginLeft: 32, background: "#161616", borderLeft: `3px solid ${acertou ? "#22C97A" : "#F59E0B"}`, borderRadius: "0 8px 8px 0", padding: "10px 12px" }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: acertou ? "#22C97A" : "#F59E0B", margin: "0 0 3px" }}>{acertou ? "✓ Correto!" : "✗ Incorreto"} — Explicação</p>
                    <p style={{ fontSize: 12, color: "#bbb", margin: 0, lineHeight: 1.6 }}>{q.feedback}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Botão confirmar */}
        {quizResp && Object.keys(quizResp).length === quizGeneros.length && !quizRev && (
          <button onClick={() => setQuizRev(true)}
            style={{ marginTop: 16, padding: "9px 22px", borderRadius: 7, background: RED, border: "none", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >Ver resultado</button>
        )}
        {quizRev && (
          <div style={{ marginTop: 14, padding: "12px 16px", background: "#22C97A15", border: "1px solid #22C97A30", borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>
              {Object.keys(quizResp).filter(k => quizResp[Number(k)] === quizGeneros[Number(k)].resposta).length === quizGeneros.length ? "🏆" : "💪"}
            </span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: 0 }}>
                {Object.keys(quizResp).filter(k => quizResp[Number(k)] === quizGeneros[Number(k)].resposta).length}/{quizGeneros.length} corretas
              </p>
              <p style={{ fontSize: 11, color: "#888", margin: 0 }}>Continue para a próxima seção!</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function SecTipologia() {
  const [sel, setSel] = useState(0);
  const t = tipologias[sel];
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="4" title="Tipologia Textual" subtitle="Gênero ≠ Tipologia. O gênero é o formato; a tipologia é o modo como o texto progride." />
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {tipologias.map((tip, i) => (
          <button key={i} onClick={() => setSel(i)} style={{ padding: "6px 12px", borderRadius: 20, border: `1px solid ${sel === i ? tip.cor + "60" : BORDER}`, background: sel === i ? tip.cor + "18" : "transparent", color: sel === i ? tip.cor : "#666", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
            {tip.icone} {tip.tipo}
          </button>
        ))}
      </div>
      <div style={{ background: CARD_BG, border: `1px solid ${t.cor}30`, borderTop: `3px solid ${t.cor}`, borderRadius: 10, padding: "20px 18px" }}>
        <div className="resp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: t.cor, margin: "0 0 6px" }}>O que é</p>
            <p style={{ fontSize: 13, color: "#ddd", lineHeight: 1.65, margin: "0 0 16px" }}>{t.desc}</p>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: t.cor, margin: "0 0 8px" }}>Como identificar</p>
            {t.marcas.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: t.cor + "20", border: `1px solid ${t.cor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: t.cor, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                <span style={{ fontSize: 12, color: "#aaa" }}>{m}</span>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: t.cor, margin: "0 0 8px" }}>Exemplo</p>
            <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderLeft: `3px solid ${t.cor}`, borderRadius: "0 8px 8px 0", padding: "14px 14px", fontSize: 13, fontStyle: "italic", color: "#ccc", lineHeight: 1.7, whiteSpace: "pre-line" }}>{t.ex}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecIdeias() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="5" title="Ideia Principal × Ideias Secundárias" subtitle="Saber distinguir o central do acessório é fundamental para questões de interpretação." />
      <div className="resp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
        {[
          { label: "IDEIA PRINCIPAL", color: RED, icon: "⭐", desc: "Aquela que norteia todas as outras. É o esqueleto do texto — sem ela, o texto não faz sentido.", como: ["Geralmente aparece no início do parágrafo", "Resume o assunto central", "Sem ela o texto perde o sentido"] },
          { label: "IDEIAS SECUNDÁRIAS", color: "#4F7CFF", icon: "🔗", desc: "Dão progressão à ideia central: exemplos, explicações, comparações e dados que desenvolvem a principal.", como: ["Exemplos e ilustrações", "Dados estatísticos ou científicos", "Comparações e contra-argumentos"] },
        ].map(item => (
          <div key={item.label} style={{ background: CARD_BG, border: `1px solid ${item.color}30`, borderRadius: 10, padding: "16px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 900, color: item.color, letterSpacing: "0.08em", background: item.color + "18", border: `1px solid ${item.color}30`, padding: "2px 8px", borderRadius: 20 }}>{item.label}</span>
            </div>
            <p style={{ fontSize: 13, color: "#bbb", lineHeight: 1.65, margin: "0 0 12px" }}>{item.desc}</p>
            {item.como.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 7, marginBottom: 5 }}>
                <span style={{ color: item.color, fontSize: 10, marginTop: 3 }}>▸</span>
                <span style={{ fontSize: 12, color: "#777" }}>{c}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "18px 18px" }}>
        <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#444", marginBottom: 12 }}>🔬 Passe o mouse sobre cada parte para ver o rótulo</p>
        <p style={{ fontSize: 13, color: "#bbb", lineHeight: 2.2, margin: 0 }}>
          <span title="IDEIA PRINCIPAL" style={{ background: RED + "25", borderBottom: `2px solid ${RED}`, padding: "1px 2px", cursor: "help", borderRadius: 2 }}>A linguagem de sinais é uma língua real que requer habilidades expressivas e comunicativas.</span>{" "}
          <span title="IDEIA SECUNDÁRIA — comparação" style={{ background: "#4F7CFF25", borderBottom: "2px solid #4F7CFF", padding: "1px 2px", cursor: "help", borderRadius: 2 }}>Os cientistas demonstraram que os circuitos cerebrais que dirigem a construção de orações na linguagem falada e na de sinais são essencialmente os mesmos.</span>{" "}
          <span title="IDEIA SECUNDÁRIA — dado adicional" style={{ background: "#22C97A25", borderBottom: "2px solid #22C97A", padding: "1px 2px", cursor: "help", borderRadius: 2 }}>Apesar da diferença das vias neurais que atuam para sua articulação.</span>
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 12, flexWrap: "wrap" }}>
          {[{ label: "Ideia principal", color: RED }, { label: "Ideia sec. — comparação", color: "#4F7CFF" }, { label: "Ideia sec. — dado", color: "#22C97A" }].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 3, background: l.color, borderRadius: 2 }} />
              <span style={{ fontSize: 10, color: "#555" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const citacoesData = [
  { tipo: "Citação Direta", icone: "💬", cor: "#4F7CFF", def: "Aquela em que o discurso alheio é citado de forma original, geralmente marcado pelo uso das aspas. Ocorre quando um determinado autor pausa sua fala para dar voz a outro autor.", ex: 'Ex.: Os especialistas em concursos afirmam: "o aluno que estuda a teoria e responde a questões dos assuntos trabalhados passa com facilidade no concurso".' },
  { tipo: "Citação Indireta", icone: "🔄", cor: "#22C97A", def: "Ocorre quando um determinado autor parafraseia a frase alheia, ou seja, muda sua forma mantendo o seu conteúdo. Dessa forma, a citação indireta é marcada pela incorporação da frase alheia pelo autor que a cita.", ex: 'Ex.: Os especialistas afirmam que o aluno que se dedica a estudar a teoria e responder a questões passa no concurso.' },
  { tipo: "Ilha Textual", icone: "🏝️", cor: "#F59E0B", def: "Trata-se da citação de apenas um pequeno trecho, de forma direta. Ocorre para dar ênfase a uma determinada parte da fala/escrito de um determinado autor. Sua diferença em relação à citação direta é que na ilha textual há a mistura de paráfrase e citação direta.", ex: 'Ex.: Especialistas afirmam que, com estudo e prática, pode-se passar "com facilidade" em concursos.' },
  { tipo: "Modalização em Discurso Segundo", icone: "🔖", cor: "#EC4899", def: "Trata-se da citação marcada pelo uso das conjunções de conformidade: segundo, como, para, de acordo com...", ex: 'Ex.: Segundo os especialistas, a dedicação do aluno ao estudo da teoria e à prática de questões o leva à aprovação.' },
];

function SecCitacao() {
  const [aberto, setAberto] = useState(null);
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="6" title="Citação" subtitle="Diferentes formas de utilizar a voz de outro autor dentro do seu próprio texto." />
      <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 20px", marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: "#bbb", lineHeight: 1.7, margin: 0 }}>
          A citação se trata da utilização em seu texto de uma fala/escrita que já tinha sido utilizado em outro texto. Na verdade, sempre que se fala em citação, devemos nos lembrar das classificações desse fenômeno.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {citacoesData.map((c, i) => (
          <div key={i} style={{ background: CARD_BG, border: `1px solid ${aberto === i ? c.cor + "40" : BORDER}`, borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
            <button onClick={() => setAberto(aberto === i ? null : i)} style={{ width: "100%", padding: "14px 16px", background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0, background: c.cor + "18", border: `1px solid ${c.cor}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{c.icone}</div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: 0 }}>{c.tipo}</p>
                </div>
              </div>
              <span style={{ color: "#555", fontSize: 18, transition: "transform 0.2s", transform: aberto === i ? "rotate(180deg)" : "none" }}>⌄</span>
            </button>
            {aberto === i && (
              <div style={{ padding: "0 16px 18px", borderTop: `1px solid ${BORDER}` }}>
                <p style={{ fontSize: 13, color: "#bbb", lineHeight: 1.65, margin: "14px 0 14px" }}>{c.def}</p>
                <div style={{ background: "#1e1e1e", borderLeft: `3px solid ${c.cor}`, borderRadius: "0 8px 8px 0", padding: "12px 14px", fontSize: 13, fontStyle: "italic", color: "#ccc", margin: 0, lineHeight: 1.6 }}>{c.ex}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

const variacoesData = [
  { tipo: "Diatópica", subtipo: "Variação de lugar", icone: "🗺️", cor: "#4F7CFF", def: "Mudanças na língua a depender da região geográfica do falante (ex: giria de estado, sotaque)." },
  { tipo: "Diafásica", subtipo: "Variação de situação comunicativa", icone: "🎭", cor: "#22C97A", def: "Adequação da linguagem de acordo com o contexto (formalidade x informalidade)." },
  { tipo: "Diacrônica", subtipo: "Variação de tempo", icone: "⏳", cor: "#F59E0B", def: "Mudanças que a língua sofre com a passagem do tempo (ex: vossa mercê -> vosmecê -> você)." },
  { tipo: "Diamésica", subtipo: "Variação de modo (oral x escrito)", icone: "🗣️", cor: "#EC4899", def: "Diferenças entre a língua falada (geralmente mais espontânea) e a língua escrita (mais regrada)." },
  { tipo: "Diastrática", subtipo: "Variação de classes sociais", icone: "👥", cor: "#8B5CF6", def: "Variações ligadas ao grupo social, profissão, idade ou nível de escolaridade do falante (jargões, gírias de grupo)." },
];

function SecVariacao() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="7" title="Variação Linguística" subtitle="A língua não apresenta uma forma padrão única. Ela se manifesta de diversas formas em variados contextos." />
      <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 20px", marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: "#bbb", lineHeight: 1.7, margin: 0 }}>
          A língua não é estática. Ela apresenta formas diversas em suas múltiplas manifestações nos mais variados contextos. Compreender essas variações é essencial para a interpretação de textos de diferentes origens e épocas.
        </p>
      </div>
      <div className="resp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {variacoesData.map((v, i) => (
          <div key={i} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${v.cor}`, borderRadius: 10, padding: "16px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ fontSize: 24, flexShrink: 0 }}>{v.icone}</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: "0 0 2px" }}>{v.tipo}</p>
              <p style={{ fontSize: 11, fontWeight: 700, color: v.cor, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{v.subtipo}</p>
              <p style={{ fontSize: 12, color: "#bbb", margin: 0, lineHeight: 1.5 }}>{v.def}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SecCoesaoCoerencia() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="8" title="Coesão e Coerência" subtitle="Os pilares da construção de sentido e ligação de ideias no texto." />
      <div className="resp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* COESÃO */}
        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderTop: `4px solid #4F7CFF`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ background: "#4F7CFF15", padding: "16px 20px", borderBottom: `1px solid ${BORDER}`, textAlign: "center" }}>
            <span style={{ fontSize: 24, display: "block", marginBottom: 6 }}>🔗</span>
            <h3 style={{ fontSize: 16, fontWeight: 900, color: "#4F7CFF", margin: 0, letterSpacing: "0.05em" }}>COESÃO</h3>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#aaa", margin: "4px 0 0", textTransform: "uppercase" }}>Ligação de Ideias no Texto</p>
          </div>
          <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ background: "#4F7CFF20", color: "#4F7CFF", fontSize: 10, fontWeight: 900, padding: "3px 8px", borderRadius: 4, letterSpacing: "0.05em" }}>REFERENCIAL</span>
              </div>
              <p style={{ fontSize: 13, color: "#bbb", margin: 0, lineHeight: 1.6 }}>Insere e retoma referentes no texto (evitando repetições através de pronomes, sinônimos, etc).</p>
            </div>
            <div style={{ height: 1, background: BORDER, margin: "16px 0" }} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ background: "#4F7CFF20", color: "#4F7CFF", fontSize: 10, fontWeight: 900, padding: "3px 8px", borderRadius: 4, letterSpacing: "0.05em" }}>SEQUENCIAL</span>
              </div>
              <p style={{ fontSize: 13, color: "#bbb", margin: 0, lineHeight: 1.6 }}>Utiliza conectivos (conjunções, preposições) para estabelecer ligação entre as ideias contidas na progressão textual.</p>
            </div>
          </div>
        </div>

        {/* COERÊNCIA */}
        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderTop: `4px solid #22C97A`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ background: "#22C97A15", padding: "16px 20px", borderBottom: `1px solid ${BORDER}`, textAlign: "center" }}>
            <span style={{ fontSize: 24, display: "block", marginBottom: 6 }}>🧠</span>
            <h3 style={{ fontSize: 16, fontWeight: 900, color: "#22C97A", margin: 0, letterSpacing: "0.05em" }}>COERÊNCIA</h3>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#aaa", margin: "4px 0 0", textTransform: "uppercase" }}>Estabelecimento de Sentido</p>
          </div>
          <div style={{ padding: "20px" }}>
            <p style={{ fontSize: 13, color: "#bbb", margin: 0, lineHeight: 1.65 }}>
              A coerência é estabelecida quando o leitor detém o conhecimento de mundo necessário para se ler aquele texto, além do conhecimento gramatical e interacional.
              <br /><br />
              A coerência não se encontra apenas no texto explícito, mas na sua <strong style={{ color: "#ddd" }}>relação com o leitor</strong> e no sentido lógico global.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecQuiz() {
  const [respostas, setRespostas] = useState({});
  const [revelados, setRevelados] = useState({});
  const corretas = Object.keys(revelados).filter(k => respostas[Number(k)] === quiz.find(q => q.id === Number(k))?.correta).length;
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="9" title="Pratique agora!" subtitle="3 questões no estilo IFRN. Escolha sua resposta e veja a explicação." />
      {Object.keys(revelados).length === quiz.length && (
        <div style={{ background: corretas === quiz.length ? "#22C97A18" : "#F59E0B18", border: `1px solid ${corretas === quiz.length ? "#22C97A40" : "#F59E0B40"}`, borderRadius: 10, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>{corretas === quiz.length ? "🏆" : corretas >= 2 ? "💪" : "📚"}</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: "#fff", margin: 0 }}>{corretas}/{quiz.length} corretas</p>
            <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{corretas === quiz.length ? "Perfeito! Você dominou o conteúdo." : corretas >= 2 ? "Muito bom! Revise a questão errada." : "Releia o conteúdo e tente novamente."}</p>
          </div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {quiz.map((q, qi) => {
          const resp = respostas[q.id];
          const rev = revelados[q.id];
          const acertou = resp === q.correta;
          return (
            <div key={q.id} style={{ background: CARD_BG, border: `1px solid ${rev ? (acertou ? "#22C97A40" : "#FF6B4A40") : BORDER}`, borderRadius: 10, padding: "18px 18px", overflow: "hidden" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: rev ? (acertou ? "#22C97A20" : "#FF6B4A20") : RED + "20", border: `1px solid ${rev ? (acertou ? "#22C97A" : "#FF6B4A") : RED}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: rev ? (acertou ? "#22C97A" : "#FF6B4A") : RED }}>{qi + 1}</span>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#ddd", lineHeight: 1.55, margin: 0 }}>{q.pergunta}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
                {q.opcoes.map((op, oi) => {
                  let bg = "transparent", border = BORDER, cor = "#888";
                  if (rev) {
                    if (oi === q.correta) { bg = "#22C97A15"; border = "#22C97A50"; cor = "#22C97A"; }
                    else if (oi === resp && oi !== q.correta) { bg = "#FF6B4A15"; border = "#FF6B4A50"; cor = "#FF6B4A"; }
                  } else if (oi === resp) { bg = RED + "15"; border = RED + "50"; cor = "#ddd"; }
                  return (
                    <button key={oi} onClick={() => !rev && setRespostas(r => ({ ...r, [q.id]: oi }))}
                      style={{ width: "100%", padding: "10px 12px", background: bg, border: `1px solid ${border}`, borderRadius: 7, color: cor, fontSize: 12, textAlign: "left", cursor: rev ? "default" : "pointer", fontFamily: "inherit", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, background: "rgba(255,255,255,0.05)", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: cor }}>
                        {rev && oi === q.correta ? "✓" : rev && oi === resp && oi !== q.correta ? "✗" : String.fromCharCode(65 + oi)}
                      </span>
                      {op}
                    </button>
                  );
                })}
              </div>
              {resp !== undefined && !rev && (
                <button onClick={() => setRevelados(r => ({ ...r, [q.id]: true }))}
                  style={{ padding: "8px 18px", borderRadius: 7, background: RED, border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >Confirmar resposta</button>
              )}
              {rev && (
                <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderLeft: `3px solid ${acertou ? "#22C97A" : "#F59E0B"}`, borderRadius: "0 8px 8px 0", padding: "10px 12px", marginTop: 4 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: acertou ? "#22C97A" : "#F59E0B", margin: "0 0 4px" }}>{acertou ? "✓ Correto!" : "✗ Incorreto"} — Explicação</p>
                  <p style={{ fontSize: 12, color: "#bbb", margin: 0, lineHeight: 1.6 }}>{q.explicacao}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SecResumo({ onHome }) {
  return (
    <section style={{ marginBottom: 20 }}>
      <SectionTitle number="10" title="Mapa mental — o que não esquecer" subtitle="Os 5 pontos que você precisa ter na ponta da língua na hora da prova." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        {[
          { icon: "🧠", title: "Inferência ≠ Decodificação", desc: "Inferência é o implícito; decodificação é o explícito." },
          { icon: "🚀", title: "Cuidado com a Extrapolação", desc: "Não adicione informações que não estão no texto." },
          { icon: "🔬", title: "Leia o texto TODO", desc: "A Redução acontece quando você para de ler cedo demais." },
          { icon: "⭐", title: "Encontre a ideia principal", desc: "Ela é o mapa do texto. Identifique-a antes de responder." },
          { icon: "📋", title: "Identifique a tipologia", desc: "Cada tipologia pede um olhar diferente na interpretação." },
        ].map((item, i) => (
          <div key={i} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "14px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: RED + "15", border: `1px solid ${RED}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{item.icon}</div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", margin: "0 0 3px" }}>{item.title}</p>
              <p style={{ fontSize: 11, color: "#666", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          </div>
        ))}
        <div style={{ background: RED + "12", border: `1px solid ${RED}30`, borderRadius: 10, padding: "14px 14px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 6, textAlign: "center" }}>
          <span style={{ fontSize: 26 }}>🏆</span>
          <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: 0 }}>Módulo concluído!</p>
          <button onClick={onHome} style={{ marginTop: 6, padding: "7px 16px", borderRadius: 6, background: RED, border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>← Voltar à home</button>
        </div>
      </div>
    </section>
  );
}


function LessonFonologia({ modulo, area, onHome }) {
  const sections = ["Tipos de Fonemas", "Encontros Vocálicos", "Número de Sílabas", "Sílaba Tônica", "Acentuação Gráfica"];
  const [activeSec, setActiveSec] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="lesson-container" style={{ display: "flex", flex: 1, minHeight: 0 }}>
      {/* SIDEBAR TÖGGLE MOBILE */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        style={{
          position: "fixed", bottom: 20, right: 20, zIndex: 300,
          width: 50, height: 50, borderRadius: "50%", background: RED,
          color: "#fff", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          display: "none", alignItems: "center", justifyContent: "center", fontSize: 20,
          cursor: "pointer"
        }}
        className="mobile-sidebar-toggle"
      >
        {showSidebar ? "×" : "☰"}
      </button>

      {/* SIDEBAR */}
      <aside className={`lesson-sidebar ${showSidebar ? "open" : ""}`} style={{ width: 210, flexShrink: 0, borderRight: `1px solid ${BORDER}`, padding: "20px 14px", position: "sticky", top: 52, height: "calc(100vh - 52px)", overflowY: "auto" }}>
        <p style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#444", marginBottom: 10 }}>Neste módulo</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sections.map((s, i) => (
            <button key={i} onClick={() => { setActiveSec(i); setShowSidebar(false); document.getElementById(`sec-fon-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              style={{ width: "100%", padding: "7px 9px", borderRadius: 6, background: activeSec === i ? RED + "15" : "transparent", border: `1px solid ${activeSec === i ? RED + "30" : "transparent"}`, color: activeSec === i ? "#ddd" : "#555", fontSize: 11, fontWeight: activeSec === i ? 700 : 400, textAlign: "left", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 7, transition: "all 0.15s" }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0, background: activeSec === i ? RED + "30" : "#222", border: `1px solid ${activeSec === i ? RED + "50" : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: activeSec === i ? RED : "#444" }}>{i + 1}</span>
              {s}
            </button>
          ))}
        </div>
        <div style={{ height: 1, background: BORDER, margin: "16px 0" }} />
        <button onClick={onHome} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, background: "#1e1e1e", border: `1px solid ${BORDER}`, color: "#666", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
          ← Voltar à home
        </button>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "36px 44px 80px", overflowX: "hidden", maxWidth: 840 }}>
        {/* Module header */}
        <div style={{ marginBottom: 40, paddingBottom: 28, borderBottom: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: RED + "18", border: `1px solid ${RED}30`, color: RED, fontSize: 11, fontWeight: 700, marginBottom: 12 }}>{area.emoji} {area.title}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 900, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.04em", lineHeight: 1.1 }}>{modulo.title}</h1>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, maxWidth: 480, margin: "0 0 16px" }}>Domine as regras de fonologia e acentuação gráfica de acordo com a norma-padrão.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[`${sections.length} seções`, "Conteúdo oficial IFRN"].map(b => (
                <div key={b} style={{ padding: "3px 10px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, fontSize: 10, color: "#555" }}>{b}</div>
              ))}
            </div>
          </div>
        </div>

        <div id="sec-fon-0" style={{ scrollMarginTop: 68 }}>
          <section style={{ marginBottom: 52 }}>
            <SectionTitle number="1" title="Tipos de Fonemas" subtitle="Diferença entre vogais, consoantes e semivogais." />
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
              <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px", borderLeft: "4px solid #4F7CFF" }}>
                <p style={{ fontSize: 14, fontWeight: 900, color: "#fff", margin: "0 0 6px" }}>Vogais</p>
                <p style={{ fontSize: 13, color: "#bbb", margin: 0, lineHeight: 1.5 }}>Sons emitidos sem obstrução. Em toda sílaba, há uma vogal, mas apenas uma!</p>
              </div>
              <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px", borderLeft: "4px solid #22C97A" }}>
                <p style={{ fontSize: 14, fontWeight: 900, color: "#fff", margin: "0 0 6px" }}>Consoantes</p>
                <p style={{ fontSize: 13, color: "#bbb", margin: 0, lineHeight: 1.5 }}>Sons emitidos com obstrução. São apoios para vogais.</p>
              </div>
              <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px", borderLeft: "4px solid #F59E0B" }}>
                <p style={{ fontSize: 14, fontWeight: 900, color: "#fff", margin: "0 0 6px" }}>Semivogais</p>
                <p style={{ fontSize: 13, color: "#bbb", margin: 0, lineHeight: 1.5 }}>Na pronúncia de determinada palavra, as semivogais possuem um som mais fraco que as vogais.</p>
              </div>
            </div>
          </section>
        </div>

        <div id="sec-fon-1" style={{ scrollMarginTop: 68 }}>
          <section style={{ marginBottom: 52 }}>
            <SectionTitle number="2" title="Encontros Vocálicos" subtitle="Agrupamentos de vogais e semivogais." />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px" }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#4F7CFF", margin: "0 0 4px" }}>DITONGO</p>
                <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 10px" }}>Encontro de uma vogal e semivogal numa mesma sílaba.</p>
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ flex: 1, background: "#1a1a1a", padding: "10px", borderRadius: 8 }}>
                    <p style={{ fontSize: 11, color: "#666", margin: "0 0 4px" }}>Crescente (SV + V)</p>
                    <p style={{ fontSize: 13, color: "#ddd", margin: 0 }}>sé-ri-e <span style={{ color: "#555" }}>(i=sv, e=v)</span></p>
                  </div>
                  <div style={{ flex: 1, background: "#1a1a1a", padding: "10px", borderRadius: 8 }}>
                    <p style={{ fontSize: 11, color: "#666", margin: "0 0 4px" }}>Decrescente (V + SV)</p>
                    <p style={{ fontSize: 13, color: "#ddd", margin: 0 }}>pai <span style={{ color: "#555" }}>(a=v, i=sv)</span></p>
                  </div>
                </div>
              </div>
              <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px" }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#22C97A", margin: "0 0 4px" }}>TRITONGO</p>
                <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 8px" }}>Sequência de SV + V + SV numa só sílaba.</p>
                <p style={{ fontSize: 13, color: "#ddd", margin: 0, fontStyle: "italic" }}>Ex: Pa-ra-guai / quão</p>
              </div>
              <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px" }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#F59E0B", margin: "0 0 4px" }}>HIATO</p>
                <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 8px" }}>Vogais que pertencem a sílabas diferentes.</p>
                <p style={{ fontSize: 13, color: "#ddd", margin: 0, fontStyle: "italic" }}>Ex: sa-í-da / po-e-si-a</p>
              </div>
            </div>
          </section>
        </div>

        <div id="sec-fon-2" style={{ scrollMarginTop: 68 }}>
          <section style={{ marginBottom: 52 }}>
            <SectionTitle number="3" title="Número de Sílabas" subtitle="Classificação quanto à quantidade." />
            <div className="resp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[{ l: "Monossílabas", d: "1 sílaba", e: "mãe, flor, lá, meu" },
              { l: "Dissílabas", d: "2 sílabas", e: "ca-fé, i-ra, a-í" },
              { l: "Trissílabas", d: "3 sílabas", e: "ci-ne-ma, pró-xi-mo" },
              { l: "Polissílabas", d: "4+ sílabas", e: "a-ve-ni-da, li-te-ra-tu-ra" }
              ].map(x => (
                <div key={x.l} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "12px" }}>
                  <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", margin: "0 0 2px" }}>{x.l}</p>
                  <p style={{ fontSize: 11, color: "#666", margin: "0 0 6px" }}>{x.d}</p>
                  <p style={{ fontSize: 12, color: "#999", margin: 0, fontStyle: "italic" }}>{x.e}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div id="sec-fon-3" style={{ scrollMarginTop: 68 }}>
          <section style={{ marginBottom: 52 }}>
            <SectionTitle number="4" title="Sílaba Tônica" subtitle="Classificação pela sílaba mais forte." />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[{ t: "Oxítonas", d: "Última sílaba", e: "avó, urubu, parabéns" },
              { t: "Paroxítonas", d: "Penúltima sílaba", e: "dócil, suavemente, banana" },
              { t: "Proparoxítonas", d: "Antepenúltima sílaba", e: "máximo, parábola, íntimo" }
              ].map(x => (
                <div key={x.t} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#1e1e1e", padding: "14px", borderRadius: 8 }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 800, color: "#ddd", margin: "0 0 2px" }}>{x.t}</p>
                    <p style={{ fontSize: 11, color: "#777", margin: 0 }}>{x.d}</p>
                  </div>
                  <span style={{ fontSize: 12, color: "#aaa", fontStyle: "italic" }}>{x.e}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div id="sec-fon-4" style={{ scrollMarginTop: 68 }}>
          <section style={{ marginBottom: 52 }}>
            <SectionTitle number="5" title="Acentuação Gráfica" subtitle="Regras fundamentais de acentuação." />
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px", marginBottom: 12 }}>
              <p style={{ fontSize: 12, fontWeight: 900, color: RED, margin: "0 0 8px", textTransform: "uppercase" }}>Monossílabos e Oxítonas</p>
              <p style={{ fontSize: 13, color: "#bbb", margin: "0 0 6px" }}>Acentuam-se os terminados em <strong>a(s), e(s), o(s)</strong>.</p>
              <p style={{ fontSize: 13, color: "#aaa", margin: 0 }}>Oxítonas também acentuam-se terminadas em <strong>em(ens)</strong>.</p>
            </div>
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px", marginBottom: 12 }}>
              <p style={{ fontSize: 12, fontWeight: 900, color: "#4F7CFF", margin: "0 0 8px", textTransform: "uppercase" }}>Paroxítonas</p>
              <p style={{ fontSize: 13, color: "#bbb", margin: "0 0 6px" }}>SÃO ACENTUADOS OS QUE TERMINAM EM:</p>
              <p style={{ fontSize: 12, color: "#aaa", margin: 0, lineHeight: 1.6 }}>-L, -R, -N, -X, -PS, -OM(ONS), -Ã(S), -ÃO(S), -UM(UNS), -I(S), -U(S), DITONGO ORAL</p>
            </div>
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px", marginBottom: 12 }}>
              <p style={{ fontSize: 12, fontWeight: 900, color: "#22C97A", margin: "0 0 8px", textTransform: "uppercase" }}>Proparoxítonas</p>
              <p style={{ fontSize: 14, fontWeight: 900, color: "#fff", margin: 0 }}>TODAS SÃO ACENTUADAS!</p>
            </div>
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px" }}>
              <p style={{ fontSize: 12, fontWeight: 900, color: "#F59E0B", margin: "0 0 8px", textTransform: "uppercase" }}>Regra do Hiato</p>
              <p style={{ fontSize: 13, color: "#bbb", margin: 0 }}>Acentuam-se o "I" e "U" tônicos quando formam hiato com a vogal anterior, sozinhos na sílaba ou com "S".</p>
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}

const quizFormacao = [
  { id: 1, pergunta: "Assinale a alternativa cuja palavra deriva diretamente de substantivo.", opcoes: ["a) Ridiculamente.", "b) Incapacidade.", "c) Bandidagem.", "d) Tolerância.", "e) Segurança."], correta: 2, explicacao: "Bandidagem deriva do substantivo 'bandido'. 'Ridiculamente' deriva de adjetivo, 'Incapacidade' de adjetivo, etc." },
  { id: 2, pergunta: "Considerando o processo de formação de palavras, assinale a alternativa em que todas apresentam derivação prefixal.", opcoes: ["a) Revisionista, preconceito.", "b) Reinterpretados, realmente.", "c) Preconceito, realmente.", "d) Realmente, revisionista.", "e) Reinterpretados, preconceito."], correta: 4, explicacao: "'Reinterpretados' tem o prefixo 're-', e 'preconceito' tem o prefixo 'pre-'. Ambas sofrem derivação prefixal." },
  { id: 3, pergunta: "O vocábulo 'palavrão', perdeu o valor de aumentativo, passando a significar 'palavra chula'. A opção em que esse caso NÃO está representado por nenhum dos termos é:", opcoes: ["a) cartão – homenzarrão – garrafão.", "b) caixão – portão – colherão.", "c) papelão – facão – jarrão.", "d) casarão – panelão – pratão.", "e) pezão – cabeção – fardão."], correta: 0, explicacao: "Em 'cartão' o sufixo -ão não tem mais valor aumentativo primariamente na linguagem comum, perdeu esse valor assim como palavrão." }
];

function SecQuizFormacao() {
  const [respostas, setRespostas] = useState({});
  const [revelados, setRevelados] = useState({});
  const corretas = Object.keys(revelados).filter(k => respostas[Number(k)] === quizFormacao.find(q => q.id === Number(k))?.correta).length;
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="4" title="Pratique agora!" subtitle="Questões de formação de palavras no estilo IFRN." />
      {Object.keys(revelados).length === quizFormacao.length && (
        <div style={{ background: corretas === quizFormacao.length ? "#22C97A18" : "#F59E0B18", border: `1px solid ${corretas === quizFormacao.length ? "#22C97A40" : "#F59E0B40"}`, borderRadius: 10, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>{corretas === quizFormacao.length ? "🏆" : corretas >= 2 ? "💪" : "📚"}</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: "#fff", margin: 0 }}>{corretas}/{quizFormacao.length} corretas</p>
            <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{corretas === quizFormacao.length ? "Perfeito! Você dominou o conteúdo." : "Revise os conceitos de processos de formação e tente novamente."}</p>
          </div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {quizFormacao.map((q, qi) => {
          const resp = respostas[q.id];
          const rev = revelados[q.id];
          const acertou = resp === q.correta;
          return (
            <div key={q.id} style={{ background: CARD_BG, border: `1px solid ${rev ? (acertou ? "#22C97A40" : "#FF6B4A40") : BORDER}`, borderRadius: 10, padding: "18px 18px", overflow: "hidden" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: rev ? (acertou ? "#22C97A20" : "#FF6B4A20") : RED + "20", border: `1px solid ${rev ? (acertou ? "#22C97A" : "#FF6B4A") : RED}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: rev ? (acertou ? "#22C97A" : "#FF6B4A") : RED }}>{qi + 1}</span>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#ddd", lineHeight: 1.55, margin: 0 }}>{q.pergunta}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
                {q.opcoes.map((op, oi) => {
                  let bg = "transparent", border = BORDER, cor = "#888";
                  if (rev) {
                    if (oi === q.correta) { bg = "#22C97A15"; border = "#22C97A50"; cor = "#22C97A"; }
                    else if (oi === resp && oi !== q.correta) { bg = "#FF6B4A15"; border = "#FF6B4A50"; cor = "#FF6B4A"; }
                  } else if (oi === resp) { bg = RED + "15"; border = RED + "50"; cor = "#ddd"; }
                  return (
                    <button key={oi} onClick={() => !rev && setRespostas(r => ({ ...r, [q.id]: oi }))}
                      style={{ width: "100%", padding: "10px 12px", background: bg, border: `1px solid ${border}`, borderRadius: 7, color: cor, fontSize: 12, textAlign: "left", cursor: rev ? "default" : "pointer", fontFamily: "inherit", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, background: "rgba(255,255,255,0.05)", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: cor }}>
                        {rev && oi === q.correta ? "✓" : rev && oi === resp && oi !== q.correta ? "✗" : String.fromCharCode(65 + oi)}
                      </span>
                      {op}
                    </button>
                  );
                })}
              </div>
              {resp !== undefined && !rev && (
                <button onClick={() => setRevelados(r => ({ ...r, [q.id]: true }))}
                  style={{ padding: "8px 18px", borderRadius: 7, background: RED, border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >Confirmar resposta</button>
              )}
              {rev && (
                <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderLeft: `3px solid ${acertou ? "#22C97A" : "#F59E0B"}`, borderRadius: "0 8px 8px 0", padding: "10px 12px", marginTop: 4 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: acertou ? "#22C97A" : "#F59E0B", margin: "0 0 4px" }}>{acertou ? "✓ Correto!" : "✗ Incorreto"} — Explicação</p>
                  <p style={{ fontSize: 12, color: "#bbb", margin: 0, lineHeight: 1.6 }}>{q.explicacao}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LessonFormacao({ modulo, area, onHome }) {
  const sections = ["Processos de Derivação", "Composição", "Outros Processos", "Pratique Agora"];
  const [activeSec, setActiveSec] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
      {/* SIDEBAR */}
      <aside style={{ width: 210, flexShrink: 0, borderRight: `1px solid ${BORDER}`, padding: "20px 14px", position: "sticky", top: 52, height: "calc(100vh - 52px)", overflowY: "auto" }}>
        <p style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#444", marginBottom: 10 }}>Neste módulo</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sections.map((s, i) => (
            <button key={i} onClick={() => { setActiveSec(i); document.getElementById(`sec-form-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              style={{ width: "100%", padding: "7px 9px", borderRadius: 6, background: activeSec === i ? RED + "15" : "transparent", border: `1px solid ${activeSec === i ? RED + "30" : "transparent"}`, color: activeSec === i ? "#ddd" : "#555", fontSize: 11, fontWeight: activeSec === i ? 700 : 400, textAlign: "left", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 7, transition: "all 0.15s" }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0, background: activeSec === i ? RED + "30" : "#222", border: `1px solid ${activeSec === i ? RED + "50" : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: activeSec === i ? RED : "#444" }}>{i + 1}</span>
              {s}
            </button>
          ))}
        </div>
        <div style={{ height: 1, background: BORDER, margin: "16px 0" }} />
        <button onClick={onHome} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, background: "#1e1e1e", border: `1px solid ${BORDER}`, color: "#666", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
          ← Voltar à home
        </button>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "36px 44px 80px", overflowX: "hidden", maxWidth: 840 }}>
        <div style={{ marginBottom: 40, paddingBottom: 28, borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: RED + "18", border: `1px solid ${RED}30`, color: RED, fontSize: 11, fontWeight: 700, marginBottom: 12 }}>{area.emoji} {area.title}</div>
          <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 900, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.04em", lineHeight: 1.1 }}>{modulo.title}</h1>
          <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, maxWidth: 480, margin: "0 0 16px" }}>Compreenda como as palavras são criadas e estruturadas em português, através da derivação, composição e outros processos.</p>
        </div>

        <div id="sec-form-0" style={{ scrollMarginTop: 68 }}>
          <section style={{ marginBottom: 52 }}>
            <SectionTitle number="1" title="Derivação" subtitle="Formação a partir de um único radical." />

            <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px", marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: "#bbb", margin: "0 0 16px" }}>A derivação parte sempre de um <strong>único radical</strong> (diferente da composição).</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ borderLeft: "3px solid #4F7CFF", paddingLeft: 14 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Prefixal</p>
                  <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 4px" }}>Acréscimo de prefixo à palavra primitiva.</p>
                  <p style={{ fontSize: 12, color: "#4F7CFF", margin: 0 }}>Ex: crer → <span style={{ color: "#fff" }}>des</span>crer | ler → <span style={{ color: "#fff" }}>re</span>ler</p>
                </div>
                <div style={{ borderLeft: "3px solid #22C97A", paddingLeft: 14 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Sufixal</p>
                  <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 4px" }}>Acréscimo de sufixo, podendo mudar a classe gramatical.</p>
                  <p style={{ fontSize: 12, color: "#22C97A", margin: 0 }}>Ex: atual → atual<span style={{ color: "#fff" }}>izar</span> | feliz → feliz<span style={{ color: "#fff" }}>mente</span></p>
                </div>
                <div style={{ borderLeft: "3px solid #F59E0B", paddingLeft: 14 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Prefixal e Sufixal</p>
                  <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 4px" }}>Acréscimo não simultâneo (se tirar um, a palavra ainda existe).</p>
                  <p style={{ fontSize: 12, color: "#F59E0B", margin: 0 }}>Ex: <span style={{ color: "#fff" }}>des</span>leal<span style={{ color: "#fff" }}>dade</span> | <span style={{ color: "#fff" }}>in</span>feliz<span style={{ color: "#fff" }}>mente</span></p>
                </div>
                <div style={{ borderLeft: "3px solid #EC4899", paddingLeft: 14 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Parassintética</p>
                  <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 4px" }}>Acréscimo SIMULTÂNEO de afixos (não existe só com um).</p>
                  <p style={{ fontSize: 12, color: "#EC4899", margin: 0 }}>Ex: <span style={{ color: "#fff" }}>e</span>mud<span style={{ color: "#fff" }}>ecer</span> (não existe "emudo" nem "mudecer")</p>
                </div>
                <div style={{ borderLeft: "3px solid #8B5CF6", paddingLeft: 14 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Regressiva / Imprópria</p>
                  <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 4px" }}>Regressiva: redução (comprar → a compra). Imprópria: muda de classe ("o andar", "falei baixo").</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div id="sec-form-1" style={{ scrollMarginTop: 68 }}>
          <section style={{ marginBottom: 52 }}>
            <SectionTitle number="2" title="Composição" subtitle="União de dois ou mais radicais." />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px" }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: "0 0 6px" }}>Justaposição</p>
                <p style={{ fontSize: 12, color: "#bbb", margin: "0 0 10px", lineHeight: 1.5 }}>Não ocorre alteração fonética (perda de som) ao juntar os radicais.</p>
                <div style={{ background: "#22C97A15", borderLeft: "2px solid #22C97A", padding: "8px 10px", borderRadius: "0 6px 6px 0" }}>
                  <p style={{ fontSize: 12, color: "#ddd", margin: 0, fontStyle: "italic" }}>couve-flor, passatempo, girassol</p>
                </div>
              </div>
              <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px" }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: "0 0 6px" }}>Aglutinação</p>
                <p style={{ fontSize: 12, color: "#bbb", margin: "0 0 10px", lineHeight: 1.5 }}>Ocorre supressão de um ou mais elementos fonéticos.</p>
                <div style={{ background: "#F59E0B15", borderLeft: "2px solid #F59E0B", padding: "8px 10px", borderRadius: "0 6px 6px 0" }}>
                  <p style={{ fontSize: 12, color: "#ddd", margin: 0, fontStyle: "italic" }}>embora (em boa hora), planalto (plano alto)</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div id="sec-form-2" style={{ scrollMarginTop: 68 }}>
          <section style={{ marginBottom: 52 }}>
            <SectionTitle number="3" title="Outros Processos" subtitle="Hibridismo, abreviação e onomatopeia." />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[{ t: "Abreviação Vocabular", d: "Redução da forma plena.", e: "auto (automóvel), cine (cinema)" },
              { t: "Hibridismo", d: "Elementos de línguas diferentes.", e: "auto (grego) + móvel (latim)" },
              { t: "Onomatopeia", d: "Imitação de sons e vozes da natureza.", e: "miau, zum-zum, chocalhar" },
              { t: "Estrangeirismo", d: "Incorporação de palavras de outra língua.", e: "shopping, sutiã, abaju" }
              ].map(x => (
                <div key={x.t} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#1e1e1e", padding: "14px", borderRadius: 8 }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 800, color: "#ddd", margin: "0 0 2px" }}>{x.t}</p>
                    <p style={{ fontSize: 11, color: "#777", margin: 0 }}>{x.d}</p>
                  </div>
                  <span style={{ fontSize: 12, color: "#aaa", fontStyle: "italic" }}>{x.e}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div id="sec-form-3" style={{ scrollMarginTop: 68 }}><SecQuizFormacao /></div>

      </main>
    </div>
  );
}


const quizClasses = [
  { id: 1, pergunta: "Em uma das opções, a classe gramatical da palavra destacada foi corretamente identificada entre parênteses. Assinale-a.", opcoes: ["a) funcionários da LIMPEZA todos os dias [adjetivo]", "b) o banheiro virou um CAOS. [substantivo]", "c) procurar nas escolas QUE fazem parte [conjunção]", "d) no horário do almoço E duravam 1 hora [preposição]", "e) é uma PRÁTICA bastante recorrente [verbo]"], correta: 1, explicacao: "A palavra 'CAOS' é um substantivo, pois é precedida do artigo 'um'. 'Limpeza' seria substantivo, 'que' é pronome relativo, 'e' é conjunção, e 'prática' é substantivo neste contexto." },
  { id: 2, pergunta: "Foi /um/ dos primeiros a perceber /o/ gênio do escritor e /o/ estimulou sem trégua /a/ acreditar em si mesmo. Os termos 'o', 'o', 'a' constituem, respectivamente:", opcoes: ["a) artigo – preposição – pronome", "b) preposição – pronome – artigo", "c) artigo – pronome – preposição", "d) preposição – artigo – pronome", "e) pronome – artigo – preposição"], correta: 2, explicacao: "'O gênio' (artigo acompanhando substantivo), 'o estimulou' (pronome oblíquo substituindo o escritor), 'a acreditar' (preposição regendo o verbo)." },
  { id: 3, pergunta: "Há um 'a' empregado com função de preposição em:", opcoes: ["a) '...ele não viu a moto se aproximar'", "b) '...olha de um lado a outro a vigiar a pista'", "c) '...é possível que nem notemos a falta...'", "d) '...para a travessia'"], correta: 1, explicacao: "Em 'olha de um lado a outro', o 'a' é uma preposição ligando os elementos. Nos demais casos, exerce função de artigo (a moto, a falta, a travessia)." }
];

function SecQuizClasses() {
  const [respostas, setRespostas] = useState({});
  const [revelados, setRevelados] = useState({});
  const corretas = Object.keys(revelados).filter(k => respostas[Number(k)] === quizClasses.find(q => q.id === Number(k))?.correta).length;
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="4" title="Pratique agora!" subtitle="Questões de morfologia no estilo IFRN." />
      {Object.keys(revelados).length === quizClasses.length && (
        <div style={{ background: corretas === quizClasses.length ? "#22C97A18" : "#F59E0B18", border: `1px solid ${corretas === quizClasses.length ? "#22C97A40" : "#F59E0B40"}`, borderRadius: 10, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>{corretas === quizClasses.length ? "🏆" : corretas >= 2 ? "💪" : "📚"}</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: "#fff", margin: 0 }}>{corretas}/{quizClasses.length} corretas</p>
            <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{corretas === quizClasses.length ? "Perfeito! Você dominou o conteúdo." : "Revise a função de cada classe de palavras."}</p>
          </div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {quizClasses.map((q, qi) => {
          const resp = respostas[q.id];
          const rev = revelados[q.id];
          const acertou = resp === q.correta;
          return (
            <div key={q.id} style={{ background: CARD_BG, border: `1px solid ${rev ? (acertou ? "#22C97A40" : "#FF6B4A40") : BORDER}`, borderRadius: 10, padding: "18px 18px", overflow: "hidden" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: rev ? (acertou ? "#22C97A20" : "#FF6B4A20") : RED + "20", border: `1px solid ${rev ? (acertou ? "#22C97A" : "#FF6B4A") : RED}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: rev ? (acertou ? "#22C97A" : "#FF6B4A") : RED }}>{qi + 1}</span>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#ddd", lineHeight: 1.55, margin: 0 }}>{q.pergunta}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
                {q.opcoes.map((op, oi) => {
                  let bg = "transparent", border = BORDER, cor = "#888";
                  if (rev) {
                    if (oi === q.correta) { bg = "#22C97A15"; border = "#22C97A50"; cor = "#22C97A"; }
                    else if (oi === resp && oi !== q.correta) { bg = "#FF6B4A15"; border = "#FF6B4A50"; cor = "#FF6B4A"; }
                  } else if (oi === resp) { bg = RED + "15"; border = RED + "50"; cor = "#ddd"; }
                  return (
                    <button key={oi} onClick={() => !rev && setRespostas(r => ({ ...r, [q.id]: oi }))}
                      style={{ width: "100%", padding: "10px 12px", background: bg, border: `1px solid ${border}`, borderRadius: 7, color: cor, fontSize: 12, textAlign: "left", cursor: rev ? "default" : "pointer", fontFamily: "inherit", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, background: "rgba(255,255,255,0.05)", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: cor }}>
                        {rev && oi === q.correta ? "✓" : rev && oi === resp && oi !== q.correta ? "✗" : String.fromCharCode(65 + oi)}
                      </span>
                      {op}
                    </button>
                  );
                })}
              </div>
              {resp !== undefined && !rev && (
                <button onClick={() => setRevelados(r => ({ ...r, [q.id]: true }))}
                  style={{ padding: "8px 18px", borderRadius: 7, background: RED, border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >Confirmar resposta</button>
              )}
              {rev && (
                <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderLeft: `3px solid ${acertou ? "#22C97A" : "#F59E0B"}`, borderRadius: "0 8px 8px 0", padding: "10px 12px", marginTop: 4 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: acertou ? "#22C97A" : "#F59E0B", margin: "0 0 4px" }}>{acertou ? "✓ Correto!" : "✗ Incorreto"} — Explicação</p>
                  <p style={{ fontSize: 12, color: "#bbb", margin: 0, lineHeight: 1.6 }}>{q.explicacao}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LessonClasses({ modulo, area, onHome, onClarityLab }) {
  const sections = ["Nomes e Determinantes", "Pronomes", "Verbos e Conectivos", "Pratique Agora"];
  const [activeSec, setActiveSec] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
      {/* SIDEBAR */}
      <aside style={{ width: 210, flexShrink: 0, borderRight: `1px solid ${BORDER}`, padding: "20px 14px", position: "sticky", top: 52, height: "calc(100vh - 52px)", overflowY: "auto" }}>
        <p style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#444", marginBottom: 10 }}>Neste módulo</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sections.map((s, i) => (
            <button key={i} onClick={() => { setActiveSec(i); document.getElementById(`sec-clas-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              style={{ width: "100%", padding: "7px 9px", borderRadius: 6, background: activeSec === i ? RED + "15" : "transparent", border: `1px solid ${activeSec === i ? RED + "30" : "transparent"}`, color: activeSec === i ? "#ddd" : "#555", fontSize: 11, fontWeight: activeSec === i ? 700 : 400, textAlign: "left", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 7, transition: "all 0.15s" }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0, background: activeSec === i ? RED + "30" : "#222", border: `1px solid ${activeSec === i ? RED + "50" : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: activeSec === i ? RED : "#444" }}>{i + 1}</span>
              {s}
            </button>
          ))}
        </div>
        <div style={{ height: 1, background: BORDER, margin: "16px 0" }} />
        <button onClick={onHome} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, background: "#1e1e1e", border: `1px solid ${BORDER}`, color: "#666", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
          ← Voltar à home
        </button>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "36px 44px 80px", overflowX: "hidden", maxWidth: 840 }}>
        <div style={{ marginBottom: 40, paddingBottom: 28, borderBottom: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: RED + "18", border: `1px solid ${RED}30`, color: RED, fontSize: 11, fontWeight: 700, marginBottom: 12 }}>{area.emoji} {area.title}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 900, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.04em", lineHeight: 1.1 }}>{modulo.title}</h1>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, maxWidth: 480, margin: "0 0 16px" }}>Compreenda as funções de cada classe de palavras na construção do sentido do texto.</p>
          </div>
          <button onClick={onClarityLab} style={{ padding: "10px 20px", background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 8, color: RED, fontSize: 12, fontWeight: 800, cursor: "pointer", letterSpacing: "0.04em" }}>MODO FEYNMAN</button>
        </div>

        <div id="sec-clas-0" style={{ scrollMarginTop: 68 }}>
          <section style={{ marginBottom: 52 }}>
            <SectionTitle number="1" title="Nomes e Determinantes" subtitle="O núcleo nominal e seus qualificadores." />

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Main table replacement */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 900, color: "#4F7CFF", margin: "0 0 10px", textAlign: "center" }}>SUBSTANTIVO</p>
                  <p style={{ fontSize: 11, color: "#aaa", textAlign: "center", marginBottom: 16 }}>PALAVRA DETERMINADA – NÚCLEO</p>
                  <p style={{ fontSize: 13, color: "#fff", margin: "0 0 8px", textAlign: "center" }}>O <b style={{ color: "#4F7CFF" }}>GAROTO</b> INTELIGENTE</p>
                  <p style={{ fontSize: 13, color: "#fff", margin: "0 0 8px", textAlign: "center" }}>AQUELE <b style={{ color: "#4F7CFF" }}>CANTO</b> MATINAL</p>
                  <p style={{ fontSize: 13, color: "#fff", margin: "0 0 4px", textAlign: "center" }}>O <b style={{ color: "#4F7CFF" }}>CANTAR</b> MATINAL</p>
                  <p style={{ fontSize: 11, color: "#888", textAlign: "center", marginBottom: 8 }}>("cantar" passa de verbo a substantivo)</p>
                  <p style={{ fontSize: 13, color: "#fff", margin: 0, textAlign: "center" }}>OS BONS <b style={{ color: "#4F7CFF" }}>ESTUDANTES</b></p>
                </div>

                <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 900, color: "#22C97A", margin: "0 0 10px", textAlign: "center" }}>ADJETIVO</p>
                  <p style={{ fontSize: 11, color: "#aaa", textAlign: "center", marginBottom: 16 }}>DETERMINANTE – QUALIFICADOR</p>
                  <p style={{ fontSize: 13, color: "#fff", margin: "0 0 8px", textAlign: "center" }}>O GAROTO <b style={{ color: "#22C97A" }}>INTELIGENTE</b></p>
                  <p style={{ fontSize: 13, color: "#fff", margin: "0 0 8px", textAlign: "center" }}>AQUELE CANTO <b style={{ color: "#22C97A" }}>MATINAL</b></p>
                  <p style={{ fontSize: 13, color: "#fff", margin: 0, textAlign: "center" }}>OS <b style={{ color: "#22C97A" }}>BONS</b> ESTUDANTES</p>
                </div>
              </div>

              {/* Box Locuções */}
              <div style={{ background: "#22C97A15", border: "1px solid #22C97A40", borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#22C97A", margin: "0 0 10px" }}>LOCUÇÕES</p>
                <p style={{ fontSize: 12, color: "#ddd", margin: "0 0 16px" }}>Expressões que expressam o sentido de uma palavra.</p>
                <p style={{ fontSize: 13, color: "#fff", margin: "0 0 8px", textAlign: "center" }}>AQUELE CANTO <b style={{ color: "#22C97A" }}>MATINAL</b> (Adjetivo)</p>
                <p style={{ fontSize: 13, color: "#fff", margin: "0 0 16px", textAlign: "center" }}>AQUELE CANTO <b style={{ color: "#22C97A" }}>DA MANHÃ</b> (Locução adjetiva)</p>
                <p style={{ fontSize: 13, fontWeight: 800, color: "#22C97A", margin: 0, textAlign: "center" }}>LOCUÇÃO ADJETIVA = PREPOSIÇÃO + SUBSTANTIVO</p>
              </div>

              {/* Artigo e Numeral */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 900, color: "#F59E0B", margin: "0 0 10px", textAlign: "center" }}>ARTIGO</p>
                  <p style={{ fontSize: 11, color: "#aaa", textAlign: "center", marginBottom: 16 }}>DETERMINANTE ESPECIFICADOR</p>
                  <p style={{ fontSize: 13, color: "#fff", margin: "0 0 8px", textAlign: "center" }}><b style={{ color: "#F59E0B" }}>O</b> ESTUDANTE</p>
                  <p style={{ fontSize: 13, color: "#fff", margin: 0, textAlign: "center" }}><b style={{ color: "#F59E0B" }}>A</b> ESTUDANTE</p>
                </div>

                <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 900, color: "#EC4899", margin: "0 0 10px", textAlign: "center" }}>NUMERAL</p>
                  <p style={{ fontSize: 11, color: "#aaa", textAlign: "center", marginBottom: 16 }}>DETERMINANTE QUANTIFICADOR</p>
                  <p style={{ fontSize: 13, color: "#fff", margin: "0 0 8px", textAlign: "center" }}><b style={{ color: "#EC4899" }}>DOIS</b> GAROTOS</p>
                  <p style={{ fontSize: 13, color: "#fff", margin: 0, textAlign: "center" }}><b style={{ color: "#EC4899" }}>MEIA</b> PIZZA</p>
                </div>
              </div>

              {/* Substantivo Concreto e Abstrato */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: "0 0 10px", textAlign: "center" }}>SUBSTANTIVO CONCRETO</p>
                  <p style={{ fontSize: 11, color: "#4F7CFF", textAlign: "center", marginBottom: 16 }}>EXISTÊNCIA INDEPENDENTE</p>
                  <p style={{ fontSize: 13, color: "#ddd", margin: "0 0 4px", textAlign: "center" }}>Caderno</p>
                  <p style={{ fontSize: 13, color: "#ddd", margin: "0 0 4px", textAlign: "center" }}>Flor</p>
                  <p style={{ fontSize: 13, color: "#ddd", margin: 0, textAlign: "center" }}>Ar</p>
                </div>

                <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: "0 0 10px", textAlign: "center" }}>SUBSTANTIVO ABSTRATO</p>
                  <p style={{ fontSize: 11, color: "#EC4899", textAlign: "center", marginBottom: 16 }}>EXISTÊNCIA DEPENDENTE</p>
                  <p style={{ fontSize: 13, color: "#ddd", margin: "0 0 4px", textAlign: "center" }}>Saudade</p>
                  <p style={{ fontSize: 13, color: "#ddd", margin: "0 0 4px", textAlign: "center" }}>Coragem</p>
                  <p style={{ fontSize: 13, color: "#ddd", margin: 0, textAlign: "center" }}>Acesso</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div id="sec-clas-1" style={{ scrollMarginTop: 68 }}>
          <section style={{ marginBottom: 52 }}>
            <SectionTitle number="2" title="Pronomes" subtitle="Substituem ou acompanham o nome." />

            <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 20, marginBottom: 20 }}>
              <p style={{ fontSize: 14, color: "#fff", margin: "0 0 10px" }}>Pronome é a palavra que se usa em lugar do nome, ou a ele se refere, ou ainda, que acompanha o nome qualificando-o de alguma forma.</p>
              <div style={{ background: "#F59E0B15", borderLeft: "3px solid #F59E0B", padding: "10px 14px", borderRadius: "0 8px 8px 0" }}>
                <p style={{ fontSize: 13, color: "#ddd", margin: 0 }}><strong>Dica do gramatiqueiro:</strong> os pronomes exercem um enorme valor coesivo no texto. Portanto, muita atenção aos seus valores anafóricos, catafóricos e dêiticos.</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 52 }}>
              {/* Pronomes Pessoais Table */}
              <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: "hidden" }}>
                <div style={{ background: "#222", padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                  <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: 0, textAlign: "center" }}>TABELA DOS PRONOMES PESSOAIS</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 1, background: BORDER }}>
                  {/* Header */}
                  <div style={{ background: "#1a1a1a", padding: 12 }}></div>
                  <div style={{ background: "#1a1a1a", padding: 12, display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ fontSize: 12, fontWeight: 800, color: "#aaa", margin: 0 }}>CASO RETO</p></div>
                  <div style={{ background: "#1a1a1a", padding: 12 }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: "#aaa", margin: "0 0 8px", textAlign: "center" }}>CASO OBLÍQUO</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <p style={{ fontSize: 11, color: "#888", margin: 0, textAlign: "center" }}>Átonos</p>
                      <p style={{ fontSize: 11, color: "#888", margin: 0, textAlign: "center" }}>Tônicos</p>
                    </div>
                  </div>
                  {/* Rows */}
                  {[
                    ["1ª P. singular", "Eu", "Me", "Mim, Comigo"],
                    ["2ª P. singular", "Tu", "Te", "Ti, Contigo"],
                    ["3ª P. singular", "Ele/Ela", "Se, O, A, Lhe", "Si, Consigo, Ele/Ela"],
                    ["1ª P. plural", "Nós", "Nos", "Conosco, Nós"],
                    ["2ª P. plural", "Vós", "Vos", "Convosco, Vós"],
                    ["3ª P. plural", "Eles/Elas", "Se, Os, As, Lhes", "Consigo, Eles/Elas"],
                  ].map((row, i) => (
                    <div key={i} style={{ display: "contents" }}>
                      <div style={{ background: CARD_BG, padding: "10px 12px", display: "flex", alignItems: "center" }}><p style={{ fontSize: 12, color: "#ddd", margin: 0 }}>{row[0]}</p></div>
                      <div style={{ background: CARD_BG, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ fontSize: 12, color: "#fff", margin: 0 }}>{row[1]}</p></div>
                      <div style={{ background: CARD_BG, padding: "10px 12px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, height: "100%", alignItems: "center" }}>
                          <p style={{ fontSize: 12, color: "#aaa", margin: 0, textAlign: "center" }}>{row[2]}</p>
                          <p style={{ fontSize: 12, color: "#aaa", margin: 0, textAlign: "center" }}>{row[3]}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atenção BOX */}
              <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: RED, margin: "0 0 8px" }}>ATENÇÃO, FORMAS ESPECIAIS!</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <p style={{ fontSize: 12, color: "#bbb", margin: "0 0 10px", lineHeight: 1.5 }}>Verbos terminados em <strong>-z, -s ou -r</strong>: o pronome assume a forma <strong>lo, los, la, las</strong>.</p>
                    <p style={{ fontSize: 12, color: "#4F7CFF", margin: "0 0 4px" }}>fiz + o = fi-lo</p>
                    <p style={{ fontSize: 12, color: "#4F7CFF", margin: "0 0 4px" }}>fazeis + o = fazê-lo</p>
                    <p style={{ fontSize: 12, color: "#4F7CFF", margin: 0 }}>dizer + a = dizê-la</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 12, color: "#bbb", margin: "0 0 10px", lineHeight: 1.5 }}>Verbos terminados em <strong>som nasal</strong>: o pronome assume as formas <strong>no, nos, na, nas</strong>.</p>
                    <p style={{ fontSize: 12, color: "#4F7CFF", margin: "0 0 4px" }}>viram + o = viram-no</p>
                    <p style={{ fontSize: 12, color: "#4F7CFF", margin: "0 0 4px" }}>repõe + os = repõe-nos</p>
                    <p style={{ fontSize: 12, color: "#4F7CFF", margin: 0 }}>retém + a = retém-na</p>
                  </div>
                </div>
              </div>

              {/* Uniformidade de Tratamento */}
              <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>Uniformidade de Tratamento</p>
                <p style={{ fontSize: 12, color: "#bbb", margin: "0 0 12px", lineHeight: 1.5 }}>Ao longo do texto, não mude a pessoa do tratamento. Se chamamos alguém de "você", não usamos "te" ou "teu".</p>
                <p style={{ fontSize: 12, color: "#FF6B4A", margin: "0 0 4px" }}>✗ Quando você vier, eu te abraçarei e enrolar-me-ei nos teus cabelos.</p>
                <p style={{ fontSize: 12, color: "#22C97A", margin: "0 0 4px" }}>✓ Quando você vier, eu a abraçarei e enrolar-me-ei nos seus cabelos.</p>
                <p style={{ fontSize: 12, color: "#22C97A", margin: 0 }}>✓ Quando tu vieres, eu te abraçarei e enrolar-me-ei nos teus cabelos.</p>
              </div>

              {/* Grid 2 cols for Possessivos and Demonstrativos */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: "0 0 10px" }}>Pronomes Demonstrativos</p>
                  <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 12px" }}>Explicita posição em relação ao espaço, tempo ou discurso.</p>

                  <p style={{ fontSize: 12, fontWeight: 700, color: "#ddd", margin: "0 0 4px" }}>No espaço:</p>
                  <ul style={{ margin: "0 0 12px", paddingLeft: 16, color: "#bbb", fontSize: 12, lineHeight: 1.6 }}>
                    <li><strong>Este</strong> carro (aqui): perto de quem fala.</li>
                    <li><strong>Esse</strong> carro (aí): perto de quem ouve.</li>
                    <li><strong>Aquele</strong> carro (lá): afastado de ambos.</li>
                  </ul>

                  <p style={{ fontSize: 12, fontWeight: 700, color: "#ddd", margin: "0 0 4px" }}>No tempo:</p>
                  <ul style={{ margin: "0 0 12px", paddingLeft: 16, color: "#bbb", fontSize: 12, lineHeight: 1.6 }}>
                    <li><strong>Este</strong> ano: presente.</li>
                    <li><strong>Esse</strong> ano: passado próximo.</li>
                    <li><strong>Aquele</strong> ano: passado distante.</li>
                  </ul>

                  <p style={{ fontSize: 12, fontWeight: 700, color: "#ddd", margin: "0 0 4px" }}>"O", "A" como demonstrativos:</p>
                  <p style={{ fontSize: 12, color: "#bbb", margin: 0, lineHeight: 1.5 }}>Quando antecedem "que" e equivalem a "aquele/aquela".<br />Ex: Não ouvi <strong>o</strong> que disseste. (aquilo que)</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                    <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: "0 0 10px" }}>Pronomes Possessivos</p>
                    <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 8px" }}>Indicam a pessoa gramatical e posse.</p>
                    <p style={{ fontSize: 12, color: "#ddd", margin: "0 0 4px" }}><strong>1ª pessoa:</strong> meu, minha, nosso, nossa.</p>
                    <p style={{ fontSize: 12, color: "#ddd", margin: "0 0 4px" }}><strong>2ª pessoa:</strong> teu, tua, vosso, vossa.</p>
                    <p style={{ fontSize: 12, color: "#ddd", margin: 0 }}><strong>3ª pessoa:</strong> seu, sua.</p>
                  </div>

                  <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                    <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: "0 0 10px" }}>Pronomes Indefinidos & Interrogativos</p>
                    <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 8px", lineHeight: 1.5 }}><strong>Indefinidos:</strong> algum, nenhum, todo, muito, pouco, tanto, quanto, qualquer, tudo, nada, algo.</p>
                    <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}><strong>Interrogativos:</strong> Que, Quem, Qual, Quanto.</p>
                  </div>
                </div>
              </div>

              {/* Pronomes Relativos */}
              <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: "0 0 10px" }}>Pronomes Relativos</p>
                <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 16px", lineHeight: 1.5 }}>Representam nomes já mencionados anteriormente e com os quais se relacionam. Introduzem as orações subordinadas adjetivas.</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden" }}>
                    <div style={{ background: "#222", padding: "8px 12px", borderBottom: `1px solid ${BORDER}` }}><p style={{ fontSize: 12, fontWeight: 800, color: "#ddd", margin: 0 }}>VARIÁVEIS</p></div>
                    <div style={{ padding: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <p style={{ fontSize: 12, color: "#bbb", margin: 0 }}>o qual, os quais<br />cujo, cujos<br />quanto, quantos</p>
                      <p style={{ fontSize: 12, color: "#bbb", margin: 0 }}>a qual, as quais<br />cuja, cujas<br />quanta, quantas</p>
                    </div>
                  </div>
                  <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden" }}>
                    <div style={{ background: "#222", padding: "8px 12px", borderBottom: `1px solid ${BORDER}` }}><p style={{ fontSize: 12, fontWeight: 800, color: "#ddd", margin: 0 }}>INVARIÁVEIS</p></div>
                    <div style={{ padding: 12 }}>
                      <p style={{ fontSize: 12, color: "#bbb", margin: 0 }}>quem, que, onde</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ background: "#1a1a1a", borderLeft: "3px solid #4F7CFF", padding: "10px 14px" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#ddd", margin: "0 0 4px" }}>O Pronome "QUE"</p>
                      <p style={{ fontSize: 11, color: "#999", margin: 0, lineHeight: 1.5 }}>Relativo universal. Pode ser substituído por "o qual" e variações. Ás vezes equivale a "o que/coisa que".</p>
                    </div>
                    <div style={{ background: "#1a1a1a", borderLeft: "3px solid #22C97A", padding: "10px 14px" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#ddd", margin: "0 0 4px" }}>O qual, a qual...</p>
                      <p style={{ fontSize: 11, color: "#999", margin: 0, lineHeight: 1.5 }}>Usados por clareza ou após preposições mais fortes. Ex: ...sitio da minha tia, <strong>o qual</strong> visitei.</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ background: "#1a1a1a", borderLeft: "3px solid #F59E0B", padding: "10px 14px" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#ddd", margin: "0 0 4px" }}>O Pronome "CUJO"</p>
                      <p style={{ fontSize: 11, color: "#999", margin: 0, lineHeight: 1.5 }}>Concorda com o consequente. Indica posse. Ex: O caderno <strong>cujas folhas</strong> estão rasgadas.</p>
                    </div>
                    <div style={{ background: "#1a1a1a", borderLeft: "3px solid #EC4899", padding: "10px 14px" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#ddd", margin: "0 0 4px" }}>Os relativos ONDE e QUEM</p>
                      <p style={{ fontSize: 11, color: "#999", margin: 0, lineHeight: 1.5 }}><strong>Onde:</strong> só indica lugar (substituível por "em que").<br /><strong>Quem:</strong> refere-se a pessoa, precedido de preposição.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div id="sec-clas-2" style={{ scrollMarginTop: 68 }}>
          <section style={{ marginBottom: 52 }}>
            <SectionTitle number="3" title="Verbos e Conectivos" subtitle="Ações e ligações no texto." />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
              {[
                { t: "AÇÃO", e: "Andou por todo o bairro", c: "#22C97A" },
                { t: "ESTADO", e: "Andou doente", c: "#8B5CF6" },
                { t: "FEN NATUREZA", e: "Choveu na cidade", c: "#3B82F6" },
                { t: "EXISTÊNCIA", e: "Há muitos alunos", c: "#F59E0B" }
              ].map(x => (
                <div key={x.t} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderTop: `3px solid ${x.c}`, borderRadius: 8, padding: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>{x.t}</p>
                  <p style={{ fontSize: 11, color: "#999", margin: 0, lineHeight: 1.5 }}>Ex: {x.e}</p>
                </div>
              ))}
            </div>

            {/* MARIO */}
            <div style={{ background: "#222", border: `1px solid ${RED}40`, borderRadius: 10, padding: 20, marginBottom: 20, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.1, fontSize: 150, fontWeight: 900, color: RED, userSelect: "none" }}>M</div>
              <p style={{ fontSize: 13, fontWeight: 900, color: RED, margin: "0 0 8px" }}>VERBOS IRREGULARES (MARIO)</p>
              <p style={{ fontSize: 12, color: "#ccc", margin: "0 0 16px", maxWidth: "80%" }}>Verbos terminados em -IAR que conjugam diferentemente dos outros.</p>

              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "center" }}>
                <div>
                  {[
                    ["M", "EDIAR"],
                    ["A", "NSIAR"],
                    ["R", "EMEDIAR"],
                    ["I", "NCENDIAR/INTERMEDIAR"],
                    ["O", "DIAR"]
                  ].map(x => (
                    <p key={x[0]} style={{ fontSize: 14, fontWeight: 800, color: "#eee", margin: "0 0 4px" }}><span style={{ color: RED }}>{x[0]}</span>{x[1]}</p>
                  ))}
                </div>
                <div style={{ borderLeft: `1px solid ${BORDER}`, paddingLeft: 20 }}>
                  <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 6px" }}>Exemplo (Eu): <span style={{ color: RED }}>medeio</span> / <span style={{ color: RED }}>anseio</span> / <span style={{ color: RED }}>remedeio</span></p>
                  <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>Exemplo (Ele): <span style={{ color: RED }}>odeia</span> / <span style={{ color: RED }}>medeia</span> / <span style={{ color: RED }}>intermedeia</span></p>
                </div>
              </div>
            </div>

            {/* Vozes Verbais */}
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
              <div style={{ background: RED, padding: "12px 16px" }}>
                <p style={{ fontSize: 14, fontWeight: 900, color: "#fff", margin: 0, textAlign: "center" }}>VOZES VERBAIS</p>
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ background: "#2C1E16", border: "1px solid #F59E0B40", borderRadius: 6, padding: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: "#F59E0B", margin: "0 0 6px", textAlign: "center" }}>VOZ ATIVA: QUANDO O SUJEITO PRATICA A AÇÃO</p>
                  <p style={{ fontSize: 12, color: "#fff", margin: 0, textAlign: "center" }}>LUCAS BANHOU A CRIANÇA.</p>
                </div>
                <div style={{ background: "#2C1E16", border: "1px solid #F59E0B40", borderRadius: 6, padding: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: "#F59E0B", margin: "0 0 6px", textAlign: "center" }}>VOZ PASSIVA: QUANDO O SUJEITO SOFRE A AÇÃO</p>
                  <p style={{ fontSize: 12, color: "#fff", margin: 0, textAlign: "center" }}>A CRIANÇA FOI BANHADA POR LUCAS.</p>
                </div>
                <div style={{ background: "#2C1E16", border: "1px solid #F59E0B40", borderRadius: 6, padding: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: "#F59E0B", margin: "0 0 6px", textAlign: "center" }}>VOZ REFLEXIVA: QUANDO O SUJEITO PRATICA E SOFRE A AÇÃO</p>
                  <p style={{ fontSize: 12, color: "#fff", margin: 0, textAlign: "center" }}>LUCAS BANHOU-SE NO RIO.</p>
                </div>

                <div style={{ marginTop: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 900, color: "#fff", margin: "0 0 12px", textAlign: "center", background: "#333", padding: "8px", borderRadius: 4 }}>TROCA DAS VOZES VERBAIS</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                    <div style={{ background: "#8B5CF6", padding: 12, borderRadius: 6, textAlign: "center", color: "#fff", fontSize: 11, fontWeight: 800 }}>LUCAS</div>
                    <div style={{ background: "#3B82F6", padding: 12, borderRadius: 6, textAlign: "center", color: "#fff", fontSize: 11, fontWeight: 800 }}>COMPROU</div>
                    <div style={{ background: "#84CC16", padding: 12, borderRadius: 6, textAlign: "center", color: "#fff", fontSize: 11, fontWeight: 800 }}>UMA CASA.</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", margin: "-10px 0 10px" }}>
                    <span style={{ fontSize: 24, color: "#555" }}>↓</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    <div style={{ background: "#8B5CF6", padding: 12, borderRadius: 6, textAlign: "center", color: "#fff", fontSize: 11, fontWeight: 800 }}>UMA CASA</div>
                    <div style={{ background: "#3B82F6", padding: 12, borderRadius: 6, textAlign: "center", color: "#fff", fontSize: 11, fontWeight: 800 }}>FOI COMPRADA</div>
                    <div style={{ background: "#84CC16", padding: 12, borderRadius: 6, textAlign: "center", color: "#fff", fontSize: 11, fontWeight: 800 }}>POR LUCAS.</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: "0 0 16px", textAlign: "center" }}>FORMAS NOMINAIS</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  <div style={{ textAlign: "center" }}><p style={{ fontSize: 12, fontWeight: 800, color: "#ddd", margin: "0 0 4px" }}>Infinitivo</p><p style={{ fontSize: 11, color: "#888", margin: 0 }}>Termina em -r</p></div>
                  <div style={{ textAlign: "center", borderLeft: `1px solid ${BORDER}`, borderRight: `1px solid ${BORDER}` }}><p style={{ fontSize: 12, fontWeight: 800, color: "#ddd", margin: "0 0 4px" }}>Gerúndio</p><p style={{ fontSize: 11, color: "#888", margin: 0 }}>Termin. em -ndo</p></div>
                  <div style={{ textAlign: "center" }}><p style={{ fontSize: 12, fontWeight: 800, color: "#ddd", margin: "0 0 4px" }}>Particípio</p><p style={{ fontSize: 11, color: "#888", margin: 0 }}>-ado, -ido ou irreg.</p></div>
                </div>
              </div>
              <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: "0 0 8px", textAlign: "center" }}>LOCUÇÃO VERBAL</p>
                <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 12px", textAlign: "center" }}>Junção de verbos para expressar um evento.</p>
                <div style={{ background: "#1a1a1a", border: `1px solid ${BORDER}`, borderRadius: 6, padding: 10, textAlign: "center" }}>
                  <p style={{ fontSize: 12, color: "#ddd", margin: 0 }}><strong>Estou fazendo</strong> várias coisas.<br /><span style={{ fontSize: 10, color: "#666" }}>(Estou = auxiliar | fazendo = principal)</span></p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Particípio Abundante Box */}
              <div style={{ background: "#222", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: RED, margin: "0 0 12px", textAlign: "center" }}>PARTICÍPIO ABUNDANTE</p>
                <p style={{ fontSize: 12, color: "#bbb", margin: "0 0 16px", textAlign: "center", lineHeight: 1.5 }}>Verbos que possuem duas formas no particípio. Use o verbo auxiliar correto:</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div style={{ border: `1px solid ${BORDER}`, background: CARD_BG, borderRadius: 8, padding: 16 }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: "#ddd", margin: "0 0 8px", textAlign: "center" }}>FORMA REGULAR (ado/ido)</p>
                    <p style={{ fontSize: 11, color: "#4F7CFF", margin: "0 0 14px", textAlign: "center", fontWeight: 700 }}>VERBOS AUXILIARES: TER ou HAVER</p>
                    <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 4px" }}>Ex: Ele já <strong style={{ color: "#fff" }}>tinha aceitado</strong>.</p>
                    <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>Ex: Eu <strong style={{ color: "#fff" }}>havia pagado</strong> a conta.</p>
                  </div>
                  <div style={{ border: `1px solid ${BORDER}`, background: CARD_BG, borderRadius: 8, padding: 16 }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: "#ddd", margin: "0 0 8px", textAlign: "center" }}>FORMA IRREGULAR (curta)</p>
                    <p style={{ fontSize: 11, color: "#F59E0B", margin: "0 0 14px", textAlign: "center", fontWeight: 700 }}>VERBOS AUXILIARES: SER ou ESTAR</p>
                    <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 4px" }}>Ex: O acordo <strong style={{ color: "#fff" }}>foi aceito</strong>.</p>
                    <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>Ex: A conta já <strong style={{ color: "#fff" }}>está paga</strong>.</p>
                  </div>
                </div>
              </div>

              {/* Modos Verbais */}
              <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: "0 0 12px", textAlign: "center" }}>MODOS VERBAIS & CORRELAÇÃO</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                  <div style={{ background: "#22C97A15", padding: "12px", borderRadius: 8, textAlign: "center" }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: "#22C97A", margin: "0 0 4px" }}>INDICATIVO</p>
                    <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>Certeza ("cheguei")</p>
                  </div>
                  <div style={{ background: "#F59E0B15", padding: "12px", borderRadius: 8, textAlign: "center" }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: "#F59E0B", margin: "0 0 4px" }}>SUBJUNTIVO</p>
                    <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>Dúvida / Hipótese ("chegasse")</p>
                  </div>
                  <div style={{ background: "#EC489915", padding: "12px", borderRadius: 8, textAlign: "center" }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: "#EC4899", margin: "0 0 4px" }}>IMPERATIVO</p>
                    <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>Ordem</p>
                  </div>
                </div>

                <p style={{ fontSize: 12, color: "#ddd", margin: "0 0 12px", fontWeight: 700 }}>Correlação Verbal (Simultaneidade na oração):</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
                  <div style={{ background: "#1a1a1a", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#aaa" }}>Pretérito Imperfeito (Sub) ⇆ Futuro do Pretérito (Ind)</span>
                    <span style={{ fontSize: 12, color: "#ddd" }}>Se eu <span style={{ color: RED }}>tivesse</span> estudado, <span style={{ color: RED }}>teria</span> passado.</span>
                  </div>
                  <div style={{ background: "#1a1a1a", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#aaa" }}>Presente (Sub) ⇆ Presente (Ind)</span>
                    <span style={{ fontSize: 12, color: "#ddd" }}><span style={{ color: RED }}>Quero</span> que todos <span style={{ color: RED }}>aprendam</span>.</span>
                  </div>
                  <div style={{ background: "#1a1a1a", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#aaa" }}>Futuro (Sub) ⇆ Futuro do Presente (Ind)</span>
                    <span style={{ fontSize: 12, color: "#ddd" }}>Quando vocês <span style={{ color: RED }}>errarem</span>, <span style={{ color: RED }}>aprenderão</span> também.</span>
                  </div>
                </div>
              </div>

              {/* ADVÉRBIOS */}
              <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#4F7CFF", margin: "0 0 10px" }}>ADVÉRBIOS E LOCUÇÕES ADVERBIAIS</p>
                <div style={{ borderLeft: "3px solid #4F7CFF", paddingLeft: 12, marginBottom: 16 }}>
                  <p style={{ fontSize: 12, color: "#bbb", margin: "0 0 6px", lineHeight: 1.5 }}>Modificam verbo, adjetivo ou outro advérbio. São palavras <strong style={{ color: "#fff" }}>INVARIÁVEIS</strong>.</p>
                  <p style={{ fontSize: 12, color: "#fff", margin: 0 }}>Neymar joga <strong style={{ color: "#4F7CFF" }}>bem</strong>. / Neymar joga <strong style={{ color: "#4F7CFF" }}>muito</strong> bem. / Neymar é feio <strong style={{ color: "#4F7CFF" }}>demais</strong>.</p>
                </div>

                <p style={{ fontSize: 12, fontWeight: 800, color: "#ddd", margin: "0 0 8px" }}>Sempre exprimem circunstâncias:</p>
                <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 16px" }}>Lugar, intensidade, tempo, modo, meio, instrumento, afirmação, negação...</p>

                <div style={{ background: "#1a1a1a", border: `1px solid ${BORDER}`, borderRadius: 6, padding: 12 }}>
                  <p style={{ fontSize: 12, fontWeight: 800, color: "#ddd", margin: "0 0 6px" }}>Locução Adverbial (duas ou mais palavras):</p>
                  <ul style={{ margin: 0, paddingLeft: 16, color: "#bbb", fontSize: 12, lineHeight: 1.6 }}>
                    <li><strong>Lugar:</strong> à esquerda, à direita, de longe, por aqui.</li>
                    <li><strong>Afirmação:</strong> por certo, sem dúvida.</li>
                    <li><strong>Modo:</strong> às pressas, frente a frente, de cor.</li>
                    <li><strong>Tempo:</strong> de noite, hoje em dia, de vez em quando.</li>
                  </ul>
                </div>
              </div>

              {/* PREPOSIÇÕES */}
              <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#22C97A", margin: "0 0 10px" }}>PREPOSIÇÕES</p>
                <p style={{ fontSize: 12, color: "#bbb", margin: "0 0 12px", lineHeight: 1.5 }}>São conectivos solicitados por um nome (substantivo, adjetivo, advérbio) ou verbo.</p>

                <div style={{ background: "#1a1a1a", border: `1px solid ${BORDER}`, borderRadius: 6, padding: 12, marginBottom: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: "#22C97A", margin: "0 0 6px", textAlign: "center" }}>AS PREPOSIÇÕES (Ritmo Escravos de Jó)</p>
                  <p style={{ fontSize: 11, color: "#ccc", margin: 0, textAlign: "center", lineHeight: 1.5 }}>A, ANTE, APÓS<br />ATÉ, COM, CONTRA, DE,<br />DESDE, ENTRE, PARA, EM, PERANTE, POR<br />SEM, SOBRE, TRÁS,<br />SEM, SOB, TRÁS,<br />SEM, SOB, TRÁS, TRÁS, TRÁS.</p>
                </div>

                <p style={{ fontSize: 12, fontWeight: 800, color: "#ddd", margin: "0 0 8px" }}>Valor Semântico das Preposições:</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <p style={{ fontSize: 11, color: "#bbb", margin: 0 }}><strong>Posse:</strong> Livros <u>do</u> professor.</p>
                  <p style={{ fontSize: 11, color: "#bbb", margin: 0 }}><strong>Causa:</strong> Morreram <u>de</u> desnutrição.</p>
                  <p style={{ fontSize: 11, color: "#bbb", margin: 0 }}><strong>Matéria:</strong> Artefatos <u>de</u> couro.</p>
                  <p style={{ fontSize: 11, color: "#bbb", margin: 0 }}><strong>Assunto:</strong> Discutimos <u>sobre</u> as obras.</p>
                  <p style={{ fontSize: 11, color: "#bbb", margin: 0 }}><strong>Companhia:</strong> Iremos <u>com</u> você.</p>
                  <p style={{ fontSize: 11, color: "#bbb", margin: 0 }}><strong>Finalidade:</strong> Preparamo-nos <u>para</u> os festejos.</p>
                  <p style={{ fontSize: 11, color: "#bbb", margin: 0 }}><strong>Instrumento:</strong> Feriu-se <u>com</u> a faca.</p>
                  <p style={{ fontSize: 11, color: "#bbb", margin: 0 }}><strong>Tempo:</strong> Prazo <u>de</u> 20 dias.</p>
                </div>
              </div>

              {/* CONJUNÇÕES */}
              <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#F59E0B", margin: "0 0 10px" }}>CONJUNÇÕES</p>
                <p style={{ fontSize: 12, color: "#bbb", margin: "0 0 16px", lineHeight: 1.5 }}>Conectivos que ligam orações ou termos de mesmo valor sintático.</p>

                <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr 3fr", background: "#222", borderBottom: `1px solid ${BORDER}` }}>
                    <div style={{ padding: "8px 10px" }}><p style={{ fontSize: 11, fontWeight: 800, color: "#ddd", margin: 0 }}>TIPO</p></div>
                    <div style={{ padding: "8px 10px" }}><p style={{ fontSize: 11, fontWeight: 800, color: "#ddd", margin: 0 }}>CONECTIVOS</p></div>
                    <div style={{ padding: "8px 10px" }}><p style={{ fontSize: 11, fontWeight: 800, color: "#ddd", margin: 0 }}>EXEMPLOS</p></div>
                  </div>
                  {[
                    ["ADITIVAS", "E, Nem, Não só... mas também", "Não só comi como também bebi."],
                    ["ADVERSATIVAS", "Mas, Porém, Contudo, Todavia, No entanto", "O café estava bom, todavia o bolo estava melhor."],
                    ["ALTERNATIVAS", "Ou, Ou...ou, Ora...ora, Quer...quer", "Ou você estuda, ou você reprova."],
                    ["CONCLUSIVAS", "Logo, Pois (deslocado), Portanto, Por conseguinte", "Estudei muito, por conseguinte passei."],
                    ["EXPLICATIVAS", "Pois, Que, Porque, Porquanto", "Feche a porta, que está perigoso."],
                    ["CAUSAIS", "Pois, Porque, Visto que, Como, Já que", "Eu consegui passar, porquanto estudei muito."],
                    ["CONCESSIVAS", "Embora, Conquanto, Não obstante, Ainda que", "Conquanto estivesse chovendo, eu fui."],
                    ["CONDICIONAIS", "Se, Caso, Sem que, Desde que", "Caso eu te ligue, nós iremos."],
                    ["CONFORMATIVAS", "Conforme, Consoante, Como, Segundo", "Conforme foi combinado, quero minha parte."],
                    ["FINAIS", "Para que, A fim de que, De modo que", "Estudou a fim de passar."],
                    ["PROPORCIONAIS", "À medida que, À proporção que", "À medida que estudo, aprendo."],
                    ["TEMPORAIS", "Quando, Enquanto, Assim que, Logo que", "Quando chegar, ficarei feliz."]
                  ].map((row, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 3fr 3fr", borderBottom: i < 11 ? `1px solid ${BORDER}` : "none", background: i % 2 === 0 ? "transparent" : "#1a1a1a" }}>
                      <div style={{ padding: "10px", display: "flex", alignItems: "center" }}><p style={{ fontSize: 11, fontWeight: 700, color: "#F59E0B", margin: 0 }}>{row[0]}</p></div>
                      <div style={{ padding: "10px", display: "flex", alignItems: "center", borderLeft: `1px solid ${BORDER}` }}><p style={{ fontSize: 11, color: "#ddd", margin: 0, lineHeight: 1.4 }}>{row[1]}</p></div>
                      <div style={{ padding: "10px", display: "flex", alignItems: "center", borderLeft: `1px solid ${BORDER}` }}><p style={{ fontSize: 11, color: "#aaa", margin: 0, lineHeight: 1.4, fontStyle: "italic" }}>{row[2]}</p></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* INTERJEIÇÃO */}
              <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderLeft: "4px solid #EC4899", borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#EC4899", margin: "0 0 6px" }}>INTERJEIÇÃO</p>
                <p style={{ fontSize: 12, color: "#bbb", margin: "0 0 8px", lineHeight: 1.5 }}>Expressa sentimentos e emoções agudas. Raramente abordada, mas importante.</p>
                <p style={{ fontSize: 12, color: "#ddd", margin: 0, fontStyle: "italic", fontWeight: 700 }}>Meu Deus! Droga! Parabéns!</p>
              </div>

            </div>
          </section>
        </div>

        <div id="sec-clas-3" style={{ scrollMarginTop: 68 }}><SecQuizClasses /></div>

      </main >
    </div >
  );
}

/* ══════════════════════════════════════════════════
   LESSON PAGE — Sintaxe — Termos da Oração
══════════════════════════════════════════════════ */

const syntaxSectionsNames = [
  "Frase, Oração e Período",
  "A Estrutura da Oração",
  "Classificação do Verbo",
  "Termos Sintáticos I",
  "Termos Sintáticos II",
  "Adjunto vs Complemento",
  "Estudo do Sujeito",
  "Sujeito Inexistente",
  "Concordância Verbal",
  "Concordância Nominal",
  "O Período Composto",
  "Orações Substantivas",
  "Orações Adjetivas",
  "Orações Adverbiais",
  "Orações Coordenadas",
  "Partículas QUE e SE",
  "Estudo da Crase",
  "Estudo da Pontuação",
  "Quiz de Fixação"
];

function SecFraseOracao() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="1" title="Frase, Oração e Período" subtitle="A base da organização das sentenças." />
      <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px", marginBottom: 18 }}>
        <p style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6, margin: "0 0 16px" }}>
          Na sintaxe, não estudamos a classificação gramatical (morfologia), mas sim as <strong style={{ color: RED }}>funções</strong> que as palavras exercem na frase.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { t: "FRASE", d: "Enunciado com sentido completo.", e: "Bom dia!" },
            { t: "ORAÇÃO", d: "Frase que contém verbo (ou locução).", e: "Tenha um bom dia!" },
            { t: "PERÍODO", d: "Organização de uma ou mais orações.", e: "Período Simples ou Composto." }
          ].map(x => (
            <div key={x.t} style={{ background: "rgba(255,255,255,0.03)", padding: 14, borderRadius: 8, border: `1px solid ${BORDER}` }}>
              <p style={{ fontSize: 11, fontWeight: 900, color: RED, marginBottom: 4 }}>{x.t}</p>
              <p style={{ fontSize: 12, color: "#fff", marginBottom: 6 }}>{x.d}</p>
              <p style={{ fontSize: 11, color: "#666", fontStyle: "italic" }}>Ex: {x.e}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", marginBottom: 12 }}>PERÍODO SIMPLES</p>
          <p style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>Possui apenas uma oração (chamada de oração absoluta).</p>
          <div style={{ background: "#1a1a1a", padding: 10, borderRadius: 6, fontSize: 13, color: RED }}>
            "Tenha um bom dia!"
          </div>
        </div>
        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", marginBottom: 12 }}>PERÍODO COMPOSTO</p>
          <p style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>Possui duas ou mais orações.</p>
          <div style={{ background: "#1a1a1a", padding: 10, borderRadius: 6, fontSize: 13, color: RED }}>
            "Tenha um bom dia e acredite no futuro!"
          </div>
        </div>
      </div>
    </section>
  );
}

function SecEstruturaOracao() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="2" title="A Estrutura da Oração" subtitle="A ordem direta dos elementos sintáticos." />
      <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "24px", textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 800, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>ORDEM DIRETA</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          {[
            { label: "SUJEITO", content: "O ALUNO", color: "#4F7CFF" },
            { label: "VERBO", content: "APRENDEU", color: RED },
            { label: "COMPLEMENTO", content: "LÍNGUA PORTUGUESA", color: "#22C97A" },
            { label: "ADJUNTO ADV.", content: "COM FACILIDADE", color: "#F59E0B" }
          ].map(x => (
            <div key={x.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ background: x.color + "20", border: `1px solid ${x.color}40`, color: x.color, padding: "6px 12px", borderRadius: 4, fontSize: 11, fontWeight: 800 }}>{x.label}</div>
              <div style={{ background: "#fff", color: "#111", padding: "12px 16px", borderRadius: 4, fontSize: 14, fontWeight: 700 }}>{x.content}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecClassificacaoVerbo() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="3" title="Classificação do Verbo" subtitle="Como o verbo se relaciona com seus complementos." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[
          { t: "VERBO INTRANSITIVO", d: "Não possui complemento.", e: "O bebê dormiu." },
          { t: "VERBO TRANSITIVO", d: "Possui complemento (objeto).", e: "Eu comprei um livro." },
          { t: "VERBO DE LIGAÇÃO", d: "Liga o sujeito ao seu atributo.", e: "O professor é poeta." },
          { t: "BITRANSITIVO", d: "Possui dois complementos (Direto e Indireto).", e: "Dei o presente ao João." }
        ].map(x => (
          <div key={x.t} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
            <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", marginBottom: 6 }}>{x.t}</p>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>{x.d}</p>
            <p style={{ fontSize: 12, color: RED, fontWeight: 600, fontStyle: "italic" }}>Ex: {x.e}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SecTermosSintaticos() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="4" title="Termos Sintáticos I" subtitle="Os complementos verbais e acessórios." />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { t: "OBJETO DIRETO", d: "Complemento sem preposição obrigatória.", e: "O professor ensinou gramática." },
          { t: "OBJETO INDIRETO", d: "Complemento com preposição obrigatória.", e: "O professor gosta de gramática." },
          { t: "PREDICATIVO DO SUJEITO", d: "Atributo dado ao sujeito.", e: "O professor é poeta." },
          { t: "ADJUNTO ADVERBIAL", d: "Circunstância (lugar, tempo, modo...).", e: "O professor ensina com amor." }
        ].map(x => (
          <div key={x.t} style={{ background: "#161616", border: `1px solid ${BORDER}`, borderLeft: `4px solid ${RED}`, borderRadius: "0 10px 10px 0", padding: 18 }}>
            <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", marginBottom: 4 }}>{x.t}</p>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>{x.d}</p>
            <div style={{ padding: "8px 12px", background: "#000", borderRadius: 6, fontSize: 13, color: "#ccc" }}>
              {x.e.split(' ').map((word, i) => (
                <span key={i} style={{ color: (i === x.e.split(' ').length - 1 || (x.t === "OBJETO INDIRETO" && i >= 3)) ? "#fff" : "inherit", fontWeight: (i === x.e.split(' ').length - 1 || (x.t === "OBJETO INDIRETO" && i >= 3)) ? 800 : 400 }}>{word} </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SecTermosSintaticos2() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="5" title="Termos Sintáticos II" subtitle="Relações entre nomes e funções acessórias." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[
          { t: "ADJUNTO ADNOMINAL", d: "Acompanha/determina o núcleo substantivo.", e: "O bom professor é admirado." },
          { t: "COMPLEMENTO NOMINAL", d: "Complementa o sentido de nomes.", e: "O professor está orgulhoso do aluno." },
          { t: "APOSTO", d: "Explica outro termo na mesma oração.", e: "O professor, mestre de todos nós, gosta de gramática." },
          { t: "VOCATIVO", d: "Termo que indica chamamento.", e: "Professor, venha aqui." },
          { t: "AGENTE DA PASSIVA", d: "Quem age na voz passiva.", e: "O professor foi homenageado pelos alunos." },
          { t: "PREDICATIVO DO OBJETO", d: "Atributo dado ao objeto.", e: "O professor considera aquele aluno inteligente." }
        ].map(x => (
          <div key={x.t} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
            <p style={{ fontSize: 12, fontWeight: 900, color: RED, marginBottom: 6 }}>{x.t}</p>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 10, lineHeight: 1.5 }}>{x.d}</p>
            <p style={{ fontSize: 12, color: "#fff", fontStyle: "italic" }}>Ex: {x.e}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SecAdjuntoVsComplemento() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="6" title="Adjunto Adnominal vs Complemento Nominal" subtitle="O terror dos concursos decodificado." />
      <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.2)", borderRadius: 10, padding: 16 }}>
            <h4 style={{ color: "#4F7CFF", fontSize: 13, marginBottom: 12, fontWeight: 900 }}>ADJUNTO ADNOMINAL</h4>
            <ul style={{ fontSize: 12, color: "#aaa", paddingLeft: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Acompanha substantivo <strong>concreto ou abstrato</strong>.</li>
              <li>Tem valor <strong>ATIVO</strong> (pratica a ação).</li>
              <li>Podem ser: Artigo, Adjetivo, Locução Adjetiva, Numeral, Pronome.</li>
            </ul>
          </div>
          <div style={{ background: "rgba(34,201,122,0.05)", border: "1px solid rgba(34,201,122,0.2)", borderRadius: 10, padding: 16 }}>
            <h4 style={{ color: "#22C97A", fontSize: 13, marginBottom: 12, fontWeight: 900 }}>COMPLEMENTO NOMINAL</h4>
            <ul style={{ fontSize: 12, color: "#aaa", paddingLeft: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Acompanha <strong>adjetivo, advérbio ou substantivo abstrato</strong>.</li>
              <li>Tem valor <strong>PASSIVO</strong> (sofre a ação).</li>
              <li>Sempre vem preposicionado (Termo preposicionado).</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecEstudoSujeito() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="7" title="Estudo do Sujeito" subtitle="Tipos de sujeito e suas particularidades." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[
          { t: "SUJEITO SIMPLES", d: "Apenas 1 núcleo.", e: "Os alunos estudam muito." },
          { t: "SUJEITO COMPOSTO", d: "2 ou mais núcleos.", e: "Os alunos e os professores estudam muito." },
          { t: "SUJEITO OCULTO", d: "Não pronunciado, mas identificado pelo contexto.", e: "(Eu) Estudo muito." },
          { t: "SUJEITO INDETERMINADO", d: "Não se quer ou não se pode identificar.", e: "Quebraram a janela / Precisa-se de trabalhadores." }
        ].map(x => (
          <div key={x.t} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
            <p style={{ fontSize: 12, fontWeight: 900, color: "#fff", marginBottom: 6 }}>{x.t}</p>
            <p style={{ fontSize: 12, color: "#666", marginBottom: 10 }}>{x.d}</p>
            <p style={{ fontSize: 12, color: RED, fontStyle: "italic" }}>Ex: {x.e}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SecSujeitoInexistente() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="8" title="Sujeito Inexistente (Verbos Impessoais)" subtitle="Regras fundamentais para redação e gramática." />
      <div style={{ background: RED + "0a", border: `1px solid ${RED}20`, borderRadius: 12, padding: "24px" }}>
        <p style={{ fontSize: 12, color: "#fff", marginBottom: 16, fontWeight: 700 }}>VERBOS QUE NÃO TÊM SUJEITO (Sempre no Singular!*) :</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: "#111", padding: 14, borderRadius: 8 }}>
            <p style={{ fontSize: 11, color: RED, fontWeight: 900, marginBottom: 6 }}>HAVER</p>
            <p style={{ fontSize: 12, color: "#999" }}>Sentido de EXISTÊNCIA ou TEMPO DECORRIDO.</p>
            <p style={{ fontSize: 11, color: "#555", marginTop: 4 }}>Ex: Houve muitos problemas / Há anos não te vejo.</p>
          </div>
          <div style={{ background: "#111", padding: 14, borderRadius: 8 }}>
            <p style={{ fontSize: 11, color: RED, fontWeight: 900, marginBottom: 6 }}>FAZER</p>
            <p style={{ fontSize: 12, color: "#999" }}>Sentido de TEMPO DECORRIDO.</p>
            <p style={{ fontSize: 11, color: "#555", marginTop: 4 }}>Ex: Faz dez anos / Fazia meses.</p>
          </div>
          <div style={{ background: "#111", padding: 14, borderRadius: 8 }}>
            <p style={{ fontSize: 11, color: RED, fontWeight: 900, marginBottom: 6 }}>FENÔMENOS DA NATUREZA</p>
            <p style={{ fontSize: 12, color: "#999" }}>Sentido denotativo (real).</p>
            <p style={{ fontSize: 11, color: "#555", marginTop: 4 }}>Ex: Choveu muito em São Paulo.</p>
          </div>
          <div style={{ background: "#111", padding: 14, borderRadius: 8 }}>
            <p style={{ fontSize: 11, color: RED, fontWeight: 900, marginBottom: 6 }}>INDICAÇÃO DE TEMPO</p>
            <p style={{ fontSize: 12, color: "#999" }}>Horas, datas e distâncias.</p>
            <p style={{ fontSize: 11, color: "#555", marginTop: 4 }}>Ex: São duas horas / É meio-dia.</p>
          </div>
        </div>
        <div style={{ marginTop: 16, padding: 12, background: "#000", border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 11, color: "#666" }}>
          *Nota: Verbos impessoais concordam com o número da hora/data (ex: É uma hora / São dez horas).
        </div>
      </div>
    </section>
  );
}

function SecConcordanciaVerbal() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="9" title="Concordância Verbal" subtitle="A relação de concordância entre o sujeito e o verbo." />
      <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px", marginBottom: 18 }}>
        <p style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6, margin: "0 0 16px" }}>
          Regra Geral: O verbo deve concordar com o <strong style={{ color: RED }}>núcleo do sujeito</strong> em número e pessoa.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ background: "rgba(255,255,255,0.03)", padding: 14, borderRadius: 8, border: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 13, color: "#fff", marginBottom: 6 }}>O menino comeu o bolo.</p>
            <p style={{ fontSize: 11, color: "#666" }}>Singular (menino) → Verbo no Singular</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", padding: 14, borderRadius: 8, border: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 13, color: "#fff", marginBottom: 6 }}>Os meninos comeram o bolo.</p>
            <p style={{ fontSize: 11, color: "#666" }}>Plural (meninos) → Verbo no Plural</p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Callout icon="⚠️" title="Perigo! Verbo Antes do Sujeito" color="#F59E0B">
          <p style={{ fontSize: 13, color: "#fff" }}>Existe muitos problemas. (❌ Errado)</p>
          <p style={{ fontSize: 13, color: "#fff" }}><strong>Existem</strong> muitos problemas. (✅ Correto)</p>
        </Callout>

        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 13, fontWeight: 900, color: RED, marginBottom: 12 }}>EXPRESSÕES PARTITIVAS</p>
          <p style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>(A maioria de, Grande parte de, etc. + Plural)</p>
          <p style={{ fontSize: 13, color: "#fff" }}>A maioria das pessoas <strong>gosta/gostam</strong> de gramática.</p>
          <p style={{ fontSize: 11, color: "#555", marginTop: 4 }}>*Ambas as formas são aceitas.</p>
        </div>

        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 13, fontWeight: 900, color: RED, marginBottom: 12 }}>ESTADOS UNIDOS / NOMES NO PLURAL</p>
          <div style={{ fontSize: 13, color: "#fff", display: "flex", flexDirection: "column", gap: 6 }}>
            <p>Estados Unidos <strong>é</strong> uma nação poderosa. (Sem artigo → Singular)</p>
            <p><strong>Os</strong> Estados Unidos <strong>são</strong> uma potência. (Com artigo → Plural)</p>
          </div>
        </div>

        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 13, fontWeight: 900, color: RED, marginBottom: 12 }}>UM DOS QUE</p>
          <p style={{ fontSize: 13, color: "#fff" }}>Um dos que <strong>participou/participaram</strong>...</p>
          <p style={{ fontSize: 11, color: "#555", marginTop: 4 }}>*Preferencialmente no plural, mas o singular é aceito.</p>
        </div>
      </div>
    </section>
  );
}

function SecConcordanciaNominal() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="10" title="Concordância Nominal" subtitle="A relação entre o substantivo e seus determinantes." />
      <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "24px" }}>
        <p style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6, marginBottom: 20 }}>
          Diz respeito à relação do <strong>substantivo</strong> com seus determinantes (artigo, adjetivo, pronome, numeral).
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: "#111", padding: 14, borderRadius: 8 }}>
            <p style={{ fontSize: 13, color: "#fff" }}>O menino lindo <strong>comeu</strong> o bolo.</p>
          </div>
          <div style={{ background: "#111", padding: 14, borderRadius: 8 }}>
            <p style={{ fontSize: 13, color: "#fff" }}>Os meninos lindos <strong>comeram</strong> os bolos.</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 16 }}>PLURAL DOS SUBSTANTIVOS COMPOSTOS</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
            <p style={{ fontSize: 12, fontWeight: 900, color: RED, marginBottom: 10 }}>CLASSES QUE VARIAM (Vão ao plural)</p>
            <p style={{ fontSize: 12, color: "#888" }}>Substantivos, Adjetivos, Pronomes, Numerais.</p>
            <p style={{ fontSize: 12, color: "#fff", marginTop: 10, fontStyle: "italic" }}>Ex: Beija-flores, Guardas-civis.</p>
          </div>
          <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
            <p style={{ fontSize: 12, fontWeight: 900, color: "#444", marginBottom: 10 }}>CLASSES QUE NÃO VARIAM (Ficam no singular)</p>
            <p style={{ fontSize: 12, color: "#888" }}>Advérbios, Verbos, Prefixos.</p>
            <p style={{ fontSize: 12, color: "#fff", marginTop: 10, fontStyle: "italic" }}>Ex: Guarda-roupas (Guarda é verbo).</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 16 }}>CASOS ESPECIAIS: É BOM / É PRECISO / É PROIBIDO</p>
        <div style={{ background: "#111", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <p style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>Sem determinante (Invariável):</p>
              <p style={{ fontSize: 13, color: "#fff" }}>Maçã é <strong>bom</strong> para a saúde.</p>
              <p style={{ fontSize: 13, color: "#fff" }}>É <strong>proibido</strong> entrada.</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>Com determinante (Varia):</p>
              <p style={{ fontSize: 13, color: "#fff" }}><strong>A</strong> maçã é <strong>boa</strong> para a saúde.</p>
              <p style={{ fontSize: 13, color: "#fff" }}>É <strong>proibida a</strong> entrada.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecPeriodoComposto() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="11" title="O Período Composto" subtitle="Coordenação vs Subordinação." />
      <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "24px" }}>
        <p style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6, marginBottom: 20 }}>
          O período composto é aquele formado por duas ou mais orações.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "rgba(192,57,43,0.05)", border: "1px solid rgba(192,57,43,0.15)", borderRadius: 8, padding: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: RED, marginBottom: 8 }}>COORDENAÇÃO</p>
            <p style={{ fontSize: 12, color: "#888" }}>Orações independentes sintaticamente. Fazem sentido sozinhas.</p>
            <p style={{ fontSize: 12, color: "#fff", marginTop: 8 }}>Ex: Fui à praia <strong>e</strong> tomei sorvete.</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 8 }}>SUBORDINAÇÃO</p>
            <p style={{ fontSize: 12, color: "#888" }}>Orações dependentes. Uma exerce função sintática em relação à outra.</p>
            <p style={{ fontSize: 12, color: "#fff", marginTop: 8 }}>Ex: Quero <strong>que você seja feliz</strong>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecSubstantivas() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="12" title="Orações Subordinadas Substantivas" subtitle="Exercem função de substantivo." />
      <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px" }}>
        <Callout icon="💡" title="Truque de Mestre: O Método ISSO" color="#3B82F6">
          <p style={{ fontSize: 13, color: "#fff" }}>
            As orações substantivas podem ser substituídas pela palavra <strong>"ISSO"</strong>.
          </p>
          <p style={{ fontSize: 13, color: "#fff", marginTop: 8 }}>
            É preciso <strong>que você estude</strong>. → É preciso <strong>ISSO</strong>.
          </p>
        </Callout>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 24 }}>
          {[
            { nome: "Subjetiva", func: "Sujeito", ex: "É necessário que todos venham." },
            { nome: "Objetiva Direta", func: "Objeto Direto", ex: "Desejo que tenhas sorte." },
            { nome: "Objetiva Indireta", func: "Objeto Indireto", ex: "Não me oponho a que você vá." },
            { nome: "Completiva Nominal", func: "Compl. Nominal", ex: "Tenho medo de que ele falhe." },
            { nome: "Apositiva", func: "Aposto", ex: "Só peço uma coisa: que seja honesto." },
            { nome: "Predicativa", func: "Predicativo", ex: "A verdade é que eu te amo." },
          ].map((item, idx) => (
            <div key={idx} style={{ background: "#111", padding: 14, borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)" }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: RED, textTransform: "uppercase", marginBottom: 4 }}>{item.nome}</p>
              <p style={{ fontSize: 10, color: "#555", marginBottom: 8 }}>Função: {item.func}</p>
              <p style={{ fontSize: 12, color: "#fff" }}>{item.ex}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecAdjetivas() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="13" title="Orações Subordinadas Adjetivas" subtitle="Exercem função de adjetivo." />
      <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px" }}>
        <p style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6, marginBottom: 20 }}>
          Sempre iniciadas por <strong>Pronome Relativo</strong> (Que, o qual, no qual).
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#111", borderLeft: `4px solid ${RED}`, padding: 18, borderRadius: "0 8px 8px 0" }}>
            <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", marginBottom: 6 }}>RESTRITIVA (Sem vírgula)</p>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>Restringe o sentido a uma parte específica do grupo.</p>
            <p style={{ fontSize: 13, color: "#fff" }}>Os alunos <strong>que estudam muito</strong> passarão.</p>
          </div>

          <div style={{ background: "#111", borderLeft: "4px solid #444", padding: 18, borderRadius: "0 8px 8px 0" }}>
            <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", marginBottom: 6 }}>EXPLICATIVA (Com vírgula)</p>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>Refere-se a todo o grupo, adicionando uma informação extra.</p>
            <p style={{ fontSize: 13, color: "#fff" }}>O homem, <strong>que é mortal</strong>, deve aproveitar a vida.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecAdverbiais() {
  const adverbiais = [
    { tipo: "Causal", ex: "Já que não veio, comemos tudo.", conj: "porque, já que, visto que" },
    { tipo: "Concessiva", ex: "Embora chovesse, fomos à praia.", conj: "embora, conquanto, mesmo que" },
    { tipo: "Condicional", ex: "Se você for, eu também vou.", conj: "se, caso, desde que" },
    { tipo: "Conformativa", ex: "Fiz como você pediu.", conj: "como, conforme, segundo" },
    { tipo: "Comparativa", ex: "Ele é mais forte do que parece.", conj: "como, tal qual, do que" },
    { tipo: "Consecutiva", ex: "Bebeu tanto que passou mal.", conj: "que (precedido de tal, tão, tanto)" },
    { tipo: "Final", ex: "Estude para que passe.", conj: "para que, a fim de que" },
    { tipo: "Temporal", ex: "Quando saí, começou a chover.", conj: "quando, logo que, assim que" },
    { tipo: "Proporcional", ex: "À medida que estudo, aprendo.", conj: "à medida que, ao passo que" },
  ];

  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="14" title="Orações Subordinadas Adverbiais" subtitle="Exercem função de advérbio (circunstância)." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {adverbiais.map((a, idx) => (
          <div key={idx} style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 900, color: RED }}>{a.tipo.toUpperCase()}</p>
              <span style={{ fontSize: 9, color: "#444" }}>#{idx + 1}</span>
            </div>
            <p style={{ fontSize: 12, color: "#fff", marginBottom: 8, lineHeight: 1.4 }}>{a.ex}</p>
            <p style={{ fontSize: 10, color: "#555" }}>Conectivos: {a.conj}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SecCoordenadas() {
  const coordenadas = [
    { t: "Aditivas", ex: "e, nem, não só... mas também", frases: ["Mãe foi ao shopping e comprou roupas.", "Pai não só foi ao bar como bebeu todas."] },
    { t: "Adversativas", ex: "mas, porém, contudo, todavia", frases: ["Foi ao shopping, mas não comprou nada.", "Estudou muito, contudo não passou."] },
    { t: "Alternativas", ex: "ou... ou, ora... ora, quer... quer", frases: ["Ou vou à praia, ou ao shopping.", "Ora quer estudar, ora quer dormir."] },
    { t: "Conclusivas", ex: "logo, portanto, por isso, pois (deslocado)", frases: ["Estudei muito, portanto passei.", "Fui ao shopping, logo comprei roupa."] },
    { t: "Explicativas", ex: "porque, que, pois (no início)", frases: ["Vá ao shopping, que quero te ver lá.", "Chorava muito, pois estava doente."] },
  ];

  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="15" title="Orações Coordenadas" subtitle="Independência sintática e conectivos." />
      <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {coordenadas.map((c, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 8, border: `1px solid ${BORDER}` }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: RED, marginBottom: 8 }}>{c.t.toUpperCase()}</p>
              <p style={{ fontSize: 11, color: "#888", marginBottom: 12 }}>Conectivos: {c.ex}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {c.frases.map((f, j) => <p key={j} style={{ fontSize: 13, color: "#fff" }}>• {f}</p>)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          <Callout icon="⚠️" title="Uso do POIS" color="#F59E0B">
            <p style={{ fontSize: 12, color: "#fff" }}><strong>Conclusivo:</strong> Depois do verbo e deslocado. (Ex: Estudei; passei, <strong>pois</strong>.)</p>
            <p style={{ fontSize: 12, color: "#fff" }}><strong>Explicativo:</strong> No começo da oração. (Ex: Estude, <strong>pois</strong> a prova é amanhã.)</p>
          </Callout>
          <Callout icon="⚠️" title="Uso do E" color="#F59E0B">
            <p style={{ fontSize: 12, color: "#fff" }}><strong>Aditivo:</strong> Sentido de soma. (Ex: Estudava <strong>e</strong> trabalhava.)</p>
            <p style={{ fontSize: 12, color: "#fff" }}><strong>Adversativo:</strong> Sentido de MAS. (Ex: Estudou muito <strong>e</strong> não passou.)</p>
          </Callout>
        </div>
      </div>
    </section>
  );
}

function SecParticulasQueSe() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="16" title="As Partículas QUE e SE" subtitle="Funções morfos sintáticas essenciais." />

      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: RED, marginBottom: 16 }}>FUNÇÕES DO "QUE"</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Pronome Relativo</p>
            <p style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>Substituível por "o qual". Inicia Oração Adjetiva.</p>
            <p style={{ fontSize: 12, color: "#ccc" }}>O aluno <strong>que</strong> estuda passa.</p>
          </div>
          <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Conjunção Integrante</p>
            <p style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>Substituível por "ISSO". Inicia Oração Substantiva.</p>
            <p style={{ fontSize: 12, color: "#ccc" }}>Disse <strong>que</strong> viria.</p>
          </div>
          <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Partícula Expletiva</p>
            <p style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>Pode ser retirada sem prejuízo gramatical.</p>
            <p style={{ fontSize: 12, color: "#ccc" }}>Quase <strong>que</strong> caí.</p>
          </div>
          <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Consecutiva</p>
            <p style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>Ideia de consequência (tão... que).</p>
            <p style={{ fontSize: 12, color: "#ccc" }}>Gritou tanto <strong>que</strong> ficou rouco.</p>
          </div>
        </div>
      </div>

      <div>
        <p style={{ fontSize: 14, fontWeight: 800, color: RED, marginBottom: 16 }}>FUNÇÕES DO "SE"</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: "#111", borderLeft: `4px solid ${RED}`, padding: 16, borderRadius: "0 8px 8px 0" }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Partícula Apassivadora (PA)</p>
            <p style={{ fontSize: 11, color: "#555", marginBottom: 6 }}>Acompanha VTD/VTDI. O objeto vira sujeito.</p>
            <p style={{ fontSize: 12, color: "#ccc" }}>Alugam-<strong>se</strong> casas. (Casas são alugadas)</p>
          </div>
          <div style={{ background: "#111", borderLeft: "4px solid #444", padding: 16, borderRadius: "0 8px 8px 0" }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Índice de Indeterminação do Sujeito (IIS)</p>
            <p style={{ fontSize: 11, color: "#555", marginBottom: 6 }}>Acompanha VTI/VI/VL. Verbo sempre no singular.</p>
            <p style={{ fontSize: 12, color: "#ccc" }}>Precisa-<strong>se</strong> de funcionários.</p>
          </div>
          <div style={{ background: "#111", borderLeft: "4px solid #222", padding: 16, borderRadius: "0 8px 8px 0" }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Conjunção Condicional</p>
            <p style={{ fontSize: 12, color: "#ccc" }}><strong>Se</strong> você for, eu também vou.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecCrase() {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="17" title="Estudo da Crase" subtitle="A fusão da preposição A com o artigo A." />

      <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "24px", textAlign: "center", marginBottom: 24 }}>
        <p style={{ fontSize: 32, fontWeight: 900, color: RED, marginBottom: 8 }}>a + a = à</p>
        <p style={{ fontSize: 12, color: "#666" }}>Preposição (Pedida pelo verbo) + Artigo (Aceito pelo substantivo)</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 12, fontWeight: 900, color: RED, marginBottom: 10 }}>CRASES OBRIGATÓRIAS</p>
          <ul style={{ fontSize: 12, color: "#ccc", paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            <li>Locuções femininas (À noite, À medida que).</li>
            <li>Horas determinadas (Às 15h).</li>
            <li>Expressão "À moda de" (mesmo implícita).</li>
          </ul>
        </div>
        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 12, fontWeight: 900, color: "#444", marginBottom: 10 }}>CRASES FACULTATIVAS</p>
          <ul style={{ fontSize: 12, color: "#ccc", paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            <li>Antes de nomes próprios femininos.</li>
            <li>Depois da preposição ATÉ.</li>
            <li>Antes de pronome possessivo feminino singular.</li>
          </ul>
        </div>
      </div>

      <div style={{ background: "#111", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 14 }}>MACETE PARA LUGARES</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: "rgba(192,57,43,0.05)", padding: 14, borderRadius: 8 }}>
            <p style={{ fontSize: 12, color: RED, fontWeight: 700 }}>Se vou A e volto DA...</p>
            <p style={{ fontSize: 14, color: "#fff", marginTop: 4 }}>CRASE HÁ!</p>
            <p style={{ fontSize: 11, color: "#555", marginTop: 4 }}>Vou à Bahia (Volto da Bahia)</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", padding: 14, borderRadius: 8 }}>
            <p style={{ fontSize: 12, color: "#444", fontWeight: 700 }}>Se vou A e volto DE...</p>
            <p style={{ fontSize: 14, color: "#fff", marginTop: 4 }}>CRASE PRA QUÊ?</p>
            <p style={{ fontSize: 11, color: "#555", marginTop: 4 }}>Vou a Natal (Volto de Natal)</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <Callout icon="⚖️" title="Paralelismo Sintático" color="#3B82F6">
          <p style={{ fontSize: 12, color: "#fff" }}>A aula vai <strong>das</strong> 19h <strong>às</strong> 22h. (✅ ADEQUADO)</p>
          <p style={{ fontSize: 12, color: "#fff" }}>A aula vai <strong>de</strong> 19h <strong>a</strong> 22h. (✅ ADEQUADO)</p>
          <p style={{ fontSize: 12, color: "#fff" }}>A aula vai <strong>de</strong> 19h <strong>às</strong> 22h. (❌ INADEQUADO)</p>
        </Callout>
      </div>
    </section>
  );
}

function SecPontuacao() {
  const commaRules = [
    { t: "Separar Aposto", ex: "Recife, a Veneza brasileira, desenvolveu-se muito." },
    { t: "Isolar Vocativo", ex: "Marcos, estamos à sua espera!" },
    { t: "Antes de Conetivos", ex: "Estudou muito, logo passou no concurso." },
    { t: "Termos Explicativos", ex: "isto é, por exemplo, ou seja, digo." },
    { t: "Adjuntos Adverbiais", ex: "Ontem, o garoto estudou Português." },
  ];

  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="18" title="Estudo da Pontuação" subtitle="Pausas, entonação e clareza sintática." />

      <div style={{ marginBottom: 24 }}>
        <Callout icon="🚫" title="REGRA DE OURO: Ordem S-V-C" color="#C0392B">
          <p style={{ fontSize: 14, color: "#fff", fontWeight: 700 }}>NÃO se usa vírgula para separar a ordem DIRETA!</p>
          <p style={{ fontSize: 13, color: "#ccc", marginTop: 8 }}>[Sujeito] + [Verbo] + [Complementos]</p>
          <p style={{ fontSize: 12, color: "#fff", marginTop: 8 }}>Os professores do cursinho, estão preparados. (❌ PROIBIDO)</p>
        </Callout>
      </div>

      <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px", marginBottom: 24 }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: RED, marginBottom: 16 }}>CASOS DE USO DA VÍRGULA</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {commaRules.map((r, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", padding: 12, borderRadius: 8, border: `1px solid ${BORDER}` }}>
              <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{i + 1}. {r.t}</p>
              <p style={{ fontSize: 12, color: "#ccc" }}>{r.ex}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 13, fontWeight: 900, color: RED, marginBottom: 12 }}>OUTROS SINAIS</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>PONTO E VÍRGULA (;)</p>
              <p style={{ fontSize: 11, color: "#666" }}>Separa itens de uma lista ou orações coordenadas extensas.</p>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>DOIS PONTOS (:)</p>
              <p style={{ fontSize: 11, color: "#666" }}>Introduz uma fala, explicação ou enumeração.</p>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>TRAVESSÃO (—)</p>
              <p style={{ fontSize: 11, color: "#666" }}>Isola termos explicativos ou enfatiza informações.</p>
            </div>
          </div>
        </div>
        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 13, fontWeight: 900, color: RED, marginBottom: 12 }}>CASOS ESPECIAIS</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>ASPAS ("")</p>
              <p style={{ fontSize: 11, color: "#666" }}>Citações, estrangeirismos, ironia ou gírias.</p>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>ELIPSE / ZEUGMA</p>
              <p style={{ fontSize: 11, color: "#666" }}>Vírgula indica omissão de um termo. Ex: "Eu gosto de café; ele, de chá."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const syntaxQuiz = [
  { id: 1, pergunta: "Na frase 'Bom dia!', temos qual estrutura sintática?", opcoes: ["Oração absoluta", "Período simples", "Frase sem verbo", "Período composto"], correta: 2, explicacao: "Uma frase sem verbo é apenas um enunciado com sentido. Para ser oração, precisa de um verbo." },
  { id: 2, pergunta: "Qual é a função sintática de 'gramática' em 'O professor gosta de gramática'?", opcoes: ["Objeto Direto", "Objeto Indireto", "Complemento Nominal", "Adjunto Adnominal"], correta: 1, explicacao: "O verbo 'gostar' exige a preposição 'de'. Portanto, seu complemento é um Objeto Indireto." },
  { id: 3, pergunta: "Na frase 'Os Estados Unidos ___ a maior potência mundial', qual a forma correta?", opcoes: ["é", "são", "foi", "será"], correta: 1, explicacao: "Nomes no plural acompanhados de artigo (Os) exigem o verbo no plural." },
  { id: 4, pergunta: "Qual oração pode ser substituída pela palavra 'ISSO'?", opcoes: ["Subordinada Adjetiva", "Subordinada Adverbial", "Subordinada Substantiva", "Coordenada Sindética"], correta: 2, explicacao: "O 'macete' do ISSO funciona para identificar Orações Subordinadas Substantivas." },
  { id: 5, pergunta: "Qual a diferença sintática entre 'Alunos que estudam passam' e 'Alunos, que estudam, passam'?", opcoes: ["Nenhuma", "A primeira restringe o grupo; a segunda explica uma característica de todos", "A primeira é explicativa; a segunda é restritiva", "A primeira tem vírgula escondida"], correta: 1, explicacao: "A ausência de vírgulas indica que apenas 'os alunos que estudam' passam (restrição). Com vírgulas, diz-se que 'todos estudam e por isso passam' (explicação)." },
  { id: 6, pergunta: "Em 'Fui eu quem ___', qual a concordância correta?", opcoes: ["fez", "fiz", "Ambas estão corretas", "fizeram"], correta: 2, explicacao: "Com o pronome 'quem', o verbo pode concordar com o antecedente (eu fiz) ou ficar na 3ª pessoa do singular (fez)." },
  { id: 7, pergunta: "Em 'Vou ___ cidade de Natal', o uso da crase é:", opcoes: ["Obrigatório", "Proibido", "Facultativo", "Depende do contexto"], correta: 1, explicacao: "Se vou A e volto DE (Natal), crase pra quê? Não se usa crase antes de nomes de cidades que não admitem artigo." },
  { id: 8, pergunta: "Na frase 'Alugam-se casas', a partícula SE exerce função de:", opcoes: ["Índice de Indeterminação do Sujeito", "Partícula Apassivadora", "Conjunção Condicional", "Pronome Reflexivo"], correta: 1, explicacao: "Quem aluga, aluga algo (VTD). Com o SE, o objeto (casas) vira sujeito paciente (casas são alugadas). É uma PA." },
  { id: 9, pergunta: "FUNCERN 2019: No trecho 'poderemos assistir à queda de um deles', a crase ocorre por:", opcoes: ["Exigência de artigo do termo regente e preposição do termo regido", "Exigência de preposição do termo regente (assistir) e artigo do termo regido (queda)", "Uso facultativo antes de substantivo feminino", "Trata-se de uma locução adverbial de tempo"], correta: 1, explicacao: "O verbo 'assistir' (no sentido de ver/presenciar) exige a preposição 'A', e o substantivo 'queda' admite o artigo feminino 'A'. A + A = À." },
  { id: 10, pergunta: "Na frase 'Os alunos do IF, estão focados', a vírgula está incorreta porque:", opcoes: ["Separa o sujeito do verbo", "Separa o verbo do complemento", "Separa o adjunto adnominal do núcleo", "Não há erro na frase"], correta: 0, explicacao: "A regra de ouro da pontuação proíbe separar o Sujeito do Verbo (Ordem S-V-C) por vírgula." },
];

function SecSyntaxQuiz() {
  const [respostas, setRespostas] = useState({});
  const [revelados, setRevelados] = useState({});

  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="9" title="Quiz de Fixação" subtitle="Teste seus conhecimentos sobre sintaxe." />
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {syntaxQuiz.map(q => {
          const resp = respostas[q.id];
          const rev = revelados[q.id];
          const acertou = resp === q.correta;

          return (
            <div key={q.id} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>{q.id}. {q.pergunta}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {q.opcoes.map((op, oi) => {
                  const border = rev ? (oi === q.correta ? "#22C97A40" : oi === resp ? "#C0392B40" : BORDER) : (resp === oi ? RED + "40" : BORDER);
                  const bg = rev ? (oi === q.correta ? "#22C97A10" : oi === resp ? "#C0392B10" : "transparent") : (resp === oi ? RED + "08" : "transparent");
                  const cor = rev ? (oi === q.correta ? "#22C97A" : oi === resp ? RED : "#aaa") : (resp === oi ? RED : "#aaa");

                  return (
                    <button key={oi} onClick={() => !rev && setRespostas(r => ({ ...r, [q.id]: oi }))}
                      style={{ width: "100%", padding: "10px 12px", background: bg, border: `1px solid ${border}`, borderRadius: 7, color: cor, fontSize: 12, textAlign: "left", cursor: rev ? "default" : "pointer", fontFamily: "inherit", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, background: "rgba(255,255,255,0.05)", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: cor }}>
                        {rev && oi === q.correta ? "✓" : rev && oi === resp && oi !== q.correta ? "✗" : String.fromCharCode(65 + oi)}
                      </span>
                      {op}
                    </button>
                  );
                })}
              </div>
              {resp !== undefined && !rev && (
                <button onClick={() => setRevelados(r => ({ ...r, [q.id]: true }))}
                  style={{ padding: "8px 18px", borderRadius: 7, background: RED, border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >Confirmar resposta</button>
              )}
              {rev && (
                <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderLeft: `3px solid ${acertou ? "#22C97A" : "#F59E0B"}`, borderRadius: "0 8px 8px 0", padding: "10px 12px", marginTop: 4 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: acertou ? "#22C97A" : "#F59E0B", margin: "0 0 4px" }}>{acertou ? "✓ Correto!" : "✗ Incorreto"} — Explicação</p>
                  <p style={{ fontSize: 12, color: "#bbb", margin: 0, lineHeight: 1.6 }}>{q.explicacao}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LessonSintaxe({ modulo, area, onHome, onUpdateProgress }) {
  const [activeSec, setActiveSec] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [completedSections, setCompletedSections] = useState(new Set([0]));

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSectionClick = (i) => {
    setActiveSec(i);
    setShowSidebar(false);
    document.getElementById(`sec-syn-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

    // Update progress tracking
    if (onUpdateProgress && !completedSections.has(i)) {
      const nextSet = new Set(completedSections).add(i);
      setCompletedSections(nextSet);
      const total = syntaxSectionsNames.length; // Including Quiz
      const progress = Math.round((nextSet.size / total) * 100);
      onUpdateProgress(modulo.slug, progress);
    }
  };

  return (
    <div className="lesson-container" style={{ display: "flex", flex: 1, minHeight: 0 }}>
      <button onClick={() => setShowSidebar(!showSidebar)} style={{ position: "fixed", bottom: 20, right: 20, zIndex: 300, width: 50, height: 50, borderRadius: "50%", background: "#C0392B", color: "#fff", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.5)", display: "none", alignItems: "center", justifyContent: "center", fontSize: 20, cursor: "pointer" }} className="mobile-sidebar-toggle">
        {showSidebar ? "×" : "☰"}
      </button>

      <aside className={`lesson-sidebar ${showSidebar ? "open" : ""}`} style={{ width: 210, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.06)", padding: "20px 14px", position: "sticky", top: 52, height: "calc(100vh - 52px)", overflowY: "auto" }}>
        <p style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#444", marginBottom: 10 }}>Neste módulo</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {syntaxSectionsNames.map((s, i) => (
            <button key={i} onClick={() => handleSectionClick(i)}
              style={{ width: "100%", padding: "7px 9px", borderRadius: 6, background: activeSec === i ? "#C0392B15" : "transparent", border: `1px solid ${activeSec === i ? "#C0392B30" : "transparent"}`, color: activeSec === i ? "#ddd" : "#555", fontSize: 11, fontWeight: activeSec === i ? 700 : 400, textAlign: "left", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 7, transition: "all 0.15s" }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0, background: activeSec === i ? "#C0392B30" : "#222", border: `1px solid ${activeSec === i ? "#C0392B50" : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: activeSec === i ? "#C0392B" : "#444" }}>{i + 1}</span>
              {s}
            </button>
          ))}
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "16px 0" }} />
        <button onClick={onHome} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.06)", color: "#666", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
          ← Voltar à home
        </button>
      </aside>

      <main style={{ flex: 1, padding: "36px 44px 80px", overflowX: "hidden", maxWidth: 840 }}>
        <div style={{ marginBottom: 40, paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: "#C0392B18", border: "1px solid #C0392B30", color: "#C0392B", fontSize: 11, fontWeight: 700, marginBottom: 12 }}>{area.emoji} {area.title}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 900, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.04em", lineHeight: 1.1 }}>{modulo.title}</h1>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, maxWidth: 480, margin: "0 0 16px" }}>Domine a organização das frases e as funções sintáticas fundamentais.</p>
          </div>
        </div>

        <div id="sec-syn-0" style={{ scrollMarginTop: 68 }}><SecFraseOracao /></div>
        <div id="sec-syn-1" style={{ scrollMarginTop: 68 }}><SecEstruturaOracao /></div>
        <div id="sec-syn-2" style={{ scrollMarginTop: 68 }}><SecClassificacaoVerbo /></div>
        <div id="sec-syn-3" style={{ scrollMarginTop: 68 }}><SecTermosSintaticos /></div>
        <div id="sec-syn-4" style={{ scrollMarginTop: 68 }}><SecTermosSintaticos2 /></div>
        <div id="sec-syn-5" style={{ scrollMarginTop: 68 }}><SecAdjuntoVsComplemento /></div>
        <div id="sec-syn-6" style={{ scrollMarginTop: 68 }}><SecEstudoSujeito /></div>
        <div id="sec-syn-7" style={{ scrollMarginTop: 68 }}><SecSujeitoInexistente /></div>
        <div id="sec-syn-8" style={{ scrollMarginTop: 68 }}><SecConcordanciaVerbal /></div>
        <div id="sec-syn-9" style={{ scrollMarginTop: 68 }}><SecConcordanciaNominal /></div>
        <div id="sec-syn-10" style={{ scrollMarginTop: 68 }}><SecPeriodoComposto /></div>
        <div id="sec-syn-11" style={{ scrollMarginTop: 68 }}><SecSubstantivas /></div>
        <div id="sec-syn-12" style={{ scrollMarginTop: 68 }}><SecAdjetivas /></div>
        <div id="sec-syn-13" style={{ scrollMarginTop: 68 }}><SecAdverbiais /></div>
        <div id="sec-syn-14" style={{ scrollMarginTop: 68 }}><SecCoordenadas /></div>
        <div id="sec-syn-15" style={{ scrollMarginTop: 68 }}><SecParticulasQueSe /></div>
        <div id="sec-syn-16" style={{ scrollMarginTop: 68 }}><SecCrase /></div>
        <div id="sec-syn-17" style={{ scrollMarginTop: 68 }}><SecPontuacao /></div>
        <div id="sec-syn-18" style={{ scrollMarginTop: 68 }}><SecSyntaxQuiz /></div>
        <div id="sec-summary" style={{ scrollMarginTop: 68 }}><SecResumo onHome={onHome} /></div>
      </main>
    </div>
  );
}


const ortografiaQuiz = [
  { id: 1, pergunta: "Em 'Vou ___ cidade de Natal', o uso da crase é:", opcoes: ["Obrigatório", "Proibido", "Facultativo", "Depende do contexto"], correta: 1, explicacao: "Se vou A e volto DE (Natal), crase pra quê? Não se usa crase antes de nomes de cidades que não admitem artigo." },
  { id: 2, pergunta: "FUNCERN 2019: No trecho 'poderemos assistir à queda de um deles', a crase ocorre por:", opcoes: ["Exigência de artigo do termo regente e preposição do termo regido", "Exigência de preposição do termo regente (assistir) e artigo do termo regido (queda)", "Uso facultativo antes de substantivo feminino", "Trata-se de uma locução adverbial de tempo"], correta: 1, explicacao: "O verbo 'assistir' (no sentido de ver/presenciar) exige a preposição 'A', e o substantivo 'queda' admite o artigo feminino 'A'. A + A = À." },
  { id: 3, pergunta: "Na frase 'Os alunos do IF, estão focados', a vírgula está incorreta porque:", opcoes: ["Separa o sujeito do verbo", "Separa o verbo do complemento", "Separa o adjunto adnominal do núcleo", "Não há erro na frase"], correta: 0, explicacao: "A regra de ouro da pontuação proíbe separar o Sujeito do Verbo (Ordem S-V-C) por vírgula." },
  { id: 4, pergunta: "Qual frase apresenta uso FACULTATIVO da crase?", opcoes: ["Fui à escola.", "Entreguei o presente à Maria.", "Chegamos às 10 horas.", "O filme vai das 19h às 21h."], correta: 1, explicacao: "Antes de nomes próprios femininos, o uso do artigo é facultativo, logo a crase também é." },
  { id: 5, pergunta: "Assinale a alternativa que apresenta a pontuação CORRETA:", opcoes: ["O menino, comprou um livro.", "O menino comprou, um livro.", "O menino comprou um livro, ontem.", "O menino comprou um livro ontem."], correta: 3, explicacao: "Na ordem direta (S-V-C), não se deve usar vírgula separando os termos." }
];

function SecOrtografiaQuiz() {
  const [respostas, setRespostas] = useState({});
  const [revelados, setRevelados] = useState({});

  return (
    <section style={{ marginBottom: 52 }}>
      <SectionTitle number="3" title="Quiz de Fixação" subtitle="Teste seus conhecimentos sobre crase e pontuação." />
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {ortografiaQuiz.map(q => {
          const resp = respostas[q.id];
          const rev = revelados[q.id];
          const acertou = resp === q.correta;

          return (
            <div key={q.id} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>{q.id}. {q.pergunta}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {q.opcoes.map((op, oi) => {
                  const border = rev ? (oi === q.correta ? "#22C97A40" : oi === resp ? "#C0392B40" : BORDER) : (resp === oi ? RED + "40" : BORDER);
                  const bg = rev ? (oi === q.correta ? "#22C97A10" : oi === resp ? "#C0392B10" : "transparent") : (resp === oi ? RED + "08" : "transparent");
                  const cor = rev ? (oi === q.correta ? "#22C97A" : oi === resp ? RED : "#aaa") : (resp === oi ? RED : "#aaa");

                  return (
                    <button key={oi} onClick={() => !rev && setRespostas(r => ({ ...r, [q.id]: oi }))}
                      style={{ width: "100%", padding: "10px 12px", background: bg, border: `1px solid ${border}`, borderRadius: 7, color: cor, fontSize: 12, textAlign: "left", cursor: rev ? "default" : "pointer", fontFamily: "inherit", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, background: "rgba(255,255,255,0.05)", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: cor }}>
                        {rev && oi === q.correta ? "✓" : rev && oi === resp && oi !== q.correta ? "✗" : String.fromCharCode(65 + oi)}
                      </span>
                      {op}
                    </button>
                  );
                })}
              </div>
              {resp !== undefined && !rev && (
                <button onClick={() => setRevelados(r => ({ ...r, [q.id]: true }))}
                  style={{ padding: "8px 18px", borderRadius: 7, background: RED, border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >Confirmar resposta</button>
              )}
              {rev && (
                <div style={{ background: "#161616", border: `1px solid ${BORDER}`, borderLeft: `3px solid ${acertou ? "#22C97A" : "#F59E0B"}`, borderRadius: "0 8px 8px 0", padding: "10px 12px", marginTop: 4 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: acertou ? "#22C97A" : "#F59E0B", margin: "0 0 4px" }}>{acertou ? "✓ Correto!" : "✗ Incorreto"} — Explicação</p>
                  <p style={{ fontSize: 12, color: "#bbb", margin: 0, lineHeight: 1.6 }}>{q.explicacao}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LessonOrtografia({ modulo, area, onHome, onUpdateProgress }) {
  const sections = [
    "Estudo da Crase",
    "Estudo da Pontuação",
    "Quiz de Fixação"
  ];
  const [activeSec, setActiveSec] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSectionClick = (i) => {
    setActiveSec(i);
    setShowSidebar(false);
    document.getElementById(`sec-orto-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

    if (onUpdateProgress) {
      const progress = Math.round(((i + 1) / sections.length) * 100);
      onUpdateProgress(modulo.slug, progress);
    }
  };

  return (
    <div className="lesson-container" style={{ display: "flex", flex: 1, minHeight: 0 }}>
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        style={{
          position: "fixed", bottom: 20, right: 20, zIndex: 300,
          width: 50, height: 50, borderRadius: "50%", background: "#C0392B",
          color: "#fff", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          display: "none", alignItems: "center", justifyContent: "center", fontSize: 20,
          cursor: "pointer"
        }}
        className="mobile-sidebar-toggle"
      >
        {showSidebar ? "×" : "☰"}
      </button>

      <aside className={`lesson-sidebar ${showSidebar ? "open" : ""}`} style={{ width: 210, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.06)", padding: "20px 14px", position: "sticky", top: 52, height: "calc(100vh - 52px)", overflowY: "auto" }}>
        <p style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#444", marginBottom: 10 }}>Neste módulo</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sections.map((s, i) => (
            <button key={i} onClick={() => handleSectionClick(i)}
              style={{ width: "100%", padding: "7px 9px", borderRadius: 6, background: activeSec === i ? "#C0392B15" : "transparent", border: `1px solid ${activeSec === i ? "#C0392B30" : "transparent"}`, color: activeSec === i ? "#ddd" : "#555", fontSize: 11, fontWeight: activeSec === i ? 700 : 400, textAlign: "left", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 7, transition: "all 0.15s" }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0, background: activeSec === i ? "#C0392B30" : "#222", border: `1px solid ${activeSec === i ? "#C0392B50" : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: activeSec === i ? "#C0392B" : "#444" }}>{i + 1}</span>
              {s}
            </button>
          ))}
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "16px 0" }} />
        <button onClick={onHome} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.06)", color: "#666", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
          ← Voltar à home
        </button>
      </aside>

      <main style={{ flex: 1, padding: "36px 44px 80px", overflowX: "hidden", maxWidth: 840 }}>
        <div style={{ marginBottom: 40, paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: "#C0392B18", border: "1px solid #C0392B30", color: "#C0392B", fontSize: 11, fontWeight: 700, marginBottom: 12 }}>{area.emoji} {area.title}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 900, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.04em", lineHeight: 1.1 }}>{modulo.title}</h1>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, maxWidth: 480, margin: "0 0 16px" }}>Domine o uso da crase e as regras de pontuação para o IFRN.</p>
          </div>
        </div>

        <div id="sec-orto-0" style={{ scrollMarginTop: 68 }}><SecCrase /></div>
        <div id="sec-orto-1" style={{ scrollMarginTop: 68 }}><SecPontuacao /></div>
        <div id="sec-orto-2" style={{ scrollMarginTop: 68 }}><SecOrtografiaQuiz /></div>
      </main>
    </div>
  );
}

function LessonInterpretacao({ modulo, area, onHome, onUpdateProgress }) {
  const sections = [
    "Interpretação × Decodificar",
    "Erros de Interpretação",
    "Gêneros Textuais",
    "Tipologia Textual",
    "Ideias Principal e Secundárias",
    "Citação",
    "Variação Linguística",
    "Coesão e Coerência",
    "Quiz de Fixação",
    "Resumo e Mapa Mental"
  ];
  const [activeSec, setActiveSec] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="lesson-container" style={{ display: "flex", flex: 1, minHeight: 0 }}>
      {/* SIDEBAR TÖGGLE MOBILE */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        style={{
          position: "fixed", bottom: 20, right: 20, zIndex: 300,
          width: 50, height: 50, borderRadius: "50%", background: "#C0392B",
          color: "#fff", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          display: "none", alignItems: "center", justifyContent: "center", fontSize: 20,
          cursor: "pointer"
        }}
        className="mobile-sidebar-toggle"
      >
        {showSidebar ? "×" : "☰"}
      </button>

      {/* SIDEBAR */}
      <aside className={`lesson-sidebar ${showSidebar ? "open" : ""}`} style={{ width: 210, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.06)", padding: "20px 14px", position: "sticky", top: 52, height: "calc(100vh - 52px)", overflowY: "auto" }}>
        <p style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#444", marginBottom: 10 }}>Neste módulo</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sections.map((s, i) => (
            <button key={i} onClick={() => { setActiveSec(i); setShowSidebar(false); document.getElementById(`sec-int-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              style={{ width: "100%", padding: "7px 9px", borderRadius: 6, background: activeSec === i ? "#C0392B15" : "transparent", border: `1px solid ${activeSec === i ? "#C0392B30" : "transparent"}`, color: activeSec === i ? "#ddd" : "#555", fontSize: 11, fontWeight: activeSec === i ? 700 : 400, textAlign: "left", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 7, transition: "all 0.15s" }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0, background: activeSec === i ? "#C0392B30" : "#222", border: `1px solid ${activeSec === i ? "#C0392B50" : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: activeSec === i ? "#C0392B" : "#444" }}>{i + 1}</span>
              {s}
            </button>
          ))}
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "16px 0" }} />
        <button onClick={onHome} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.06)", color: "#666", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
          ← Voltar à home
        </button>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "36px 44px 80px", overflowX: "hidden", maxWidth: 840 }}>
        {/* Module header */}
        <div style={{ marginBottom: 40, paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: "#C0392B18", border: "1px solid #C0392B30", color: "#C0392B", fontSize: 11, fontWeight: 700, marginBottom: 12 }}>{area.emoji} {area.title}</div>
            <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 900, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.04em", lineHeight: 1.1 }}>{modulo.title}</h1>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, maxWidth: 480, margin: "0 0 16px" }}>Domine a leitura e análise crítica para as provas do IFRN.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[`${sections.length} seções`, "Conteúdo oficial IFRN"].map(b => (
                <div key={b} style={{ padding: "3px 10px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", fontSize: 10, color: "#555" }}>{b}</div>
              ))}
            </div>
          </div>
        </div>

        <div id="sec-int-0" style={{ scrollMarginTop: 68 }}><SecInferencia /></div>
        <div id="sec-int-1" style={{ scrollMarginTop: 68 }}><SecErros /></div>
        <div id="sec-int-2" style={{ scrollMarginTop: 68 }}><SecGeneros /></div>
        <div id="sec-int-3" style={{ scrollMarginTop: 68 }}><SecTipologia /></div>
        <div id="sec-int-4" style={{ scrollMarginTop: 68 }}><SecIdeias /></div>
        <div id="sec-int-5" style={{ scrollMarginTop: 68 }}><SecCitacao /></div>
        <div id="sec-int-6" style={{ scrollMarginTop: 68 }}><SecVariacao /></div>
        <div id="sec-int-7" style={{ scrollMarginTop: 68 }}><SecCoesaoCoerencia /></div>
        <div id="sec-int-8" style={{ scrollMarginTop: 68 }}><SecQuiz /></div>
        <div id="sec-int-9" style={{ scrollMarginTop: 68 }}><SecResumo onHome={onHome} /></div>
      </main>
    </div>
  );
}

function LessonPage({ modulo, area, onHome, onClarityLab, onUpdateProgress }) {
  if (area.slug === "fonologia") return <LessonFonologia modulo={modulo} area={area} onHome={onHome} onClarityLab={onClarityLab} onUpdateProgress={onUpdateProgress} />;
  if (area.slug === "formacao") return <LessonFormacao modulo={modulo} area={area} onHome={onHome} onClarityLab={onClarityLab} onUpdateProgress={onUpdateProgress} />;
  if (area.slug === "classes") return <LessonClasses modulo={modulo} area={area} onHome={onHome} onClarityLab={onClarityLab} onUpdateProgress={onUpdateProgress} />;
  if (area.slug === "interpretacao") return <LessonInterpretacao modulo={modulo} area={area} onHome={onHome} onClarityLab={onClarityLab} onUpdateProgress={onUpdateProgress} />;
  if (area.slug === "sintaxe") return <LessonSintaxe modulo={modulo} area={area} onHome={onHome} onClarityLab={onClarityLab} onUpdateProgress={onUpdateProgress} />;
  if (area.slug === "ortografia") return <LessonOrtografia modulo={modulo} area={area} onHome={onHome} onUpdateProgress={onUpdateProgress} />;

  return (
    <div style={{ padding: 100, textAlign: "center", color: "#666" }}>
      <h2 style={{ color: "#fff", marginBottom: 12 }}>Aula em desenvolvimento...</h2>
      <p>O conteúdo interativo para <strong>{area.title}</strong> está sendo preparado.</p>
      <button onClick={onHome} style={{ marginTop: 24, padding: "10px 24px", background: "#C0392B", border: "none", color: "#fff", cursor: "pointer", borderRadius: 6, fontWeight: 700 }}>Voltar à Home</button>
    </div>
  );
}


/* ══════════════════════════════════════════════════
   STUDY TOOLS
══════════════════════════════════════════════════ */
function PomodoroTool() {
  /* ── State ──────────────────────────────────── */
  const FOCUS_DURATION = 25 * 60;
  const BREAK_DURATION = 5 * 60;
  const LONG_BREAK = 15 * 60;

  const SUBJECTS = ["Interpretação de Texto", "Coesão e Coerência", "Fonologia", "Classes de Palavras", "Sintaxe", "Crase e Pontuação", "Banco de Questões", "Revisão Geral"];

  const [phase, setPhase] = useState("setup");    // "setup" | "active" | "break" | "done"
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [todaySessions, setTodaySessions] = useState(() => Number(localStorage.getItem("foco_sessions_today") || 0));
  const [totalMinutes, setTotalMinutes] = useState(() => Number(localStorage.getItem("foco_total_mins") || 0));

  /* duration of current phase */
  const phaseDuration = phase === "break" ? (cycles % 4 === 0 ? LONG_BREAK : BREAK_DURATION) : FOCUS_DURATION;
  const progress = 1 - timeLeft / phaseDuration;

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(id);
          setIsRunning(false);
          if (phase === "active") {
            const next = cycles + 1;
            setCycles(next);
            const mins = Math.round((FOCUS_DURATION - 1) / 60);
            const newTotal = totalMinutes + mins;
            const newSessions = todaySessions + 1;
            setTotalMinutes(newTotal);
            setTodaySessions(newSessions);
            localStorage.setItem("foco_total_mins", newTotal);
            localStorage.setItem("foco_sessions_today", newSessions);
            setPhase("done");
          } else {
            setPhase("active");
            return FOCUS_DURATION;
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, phase, cycles]);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const startSession = () => { setPhase("active"); setTimeLeft(FOCUS_DURATION); setIsRunning(true); };
  const startBreak = () => { setPhase("break"); setTimeLeft(cycles % 4 === 0 ? LONG_BREAK : BREAK_DURATION); setIsRunning(true); };
  const reset = () => { setIsRunning(false); setPhase("setup"); setTimeLeft(FOCUS_DURATION); };
  const togglePause = () => setIsRunning(v => !v);

  /* SVG ring */
  const R = 110, C = 2 * Math.PI * R;
  const ring = (
    <svg width="280" height="280" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
      <circle cx="140" cy="140" r={R} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
      <circle cx="140" cy="140" r={R} fill="none" stroke={RED} strokeWidth="1.5"
        strokeDasharray={C} strokeDashoffset={C * (1 - progress)}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s linear", filter: `drop-shadow(0 0 6px ${RED}80)` }}
      />
    </svg>
  );

  /* ── SETUP SCREEN ──────────────────────────── */
  if (phase === "setup") return (
    <div className="focus-setup-container" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px", fontFamily: "inherit" }}>
      <div style={{ maxWidth: 520, width: "100%" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Protocolo de Foco</p>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: 10, textTransform: "uppercase" }}>Sessão de Estudo</h1>
        <p style={{ fontSize: 14, color: "#444", marginBottom: 44, lineHeight: 1.6 }}>
          Defina o foco antes de iniciar. Sessões com intenção definida produzem maior retenção.
        </p>

        {/* Subject selector */}
        <p style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Foco da sessão</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 44 }}>
          {SUBJECTS.map(s => (
            <button key={s} onClick={() => setSubject(s)} style={{
              padding: "10px 14px", background: subject === s ? `${RED}18` : "transparent",
              border: `1px solid ${subject === s ? RED : BORDER}`, borderRadius: 6,
              color: subject === s ? "#fff" : "#555", fontSize: 12, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit", textAlign: "left",
              letterSpacing: "0.01em", transition: "all 0.15s",
            }}>{s}</button>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 40 }}>
          {[
            { label: "Sessões Hoje", val: todaySessions },
            { label: "Minutos de Foco", val: totalMinutes },
            { label: "Ciclos Totais", val: cycles },
          ].map(m => (
            <div key={m.label} style={{ padding: "14px 16px", background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 7 }}>
              <p style={{ fontSize: 10, color: "#444", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 6px" }}>{m.label}</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1 }}>{m.val}</p>
            </div>
          ))}
        </div>

        <button onClick={startSession} style={{
          width: "100%", padding: "16px 0", background: RED, border: "none", borderRadius: 6,
          color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          letterSpacing: "0.04em", transition: "opacity 0.15s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >COMEÇAR SESSÃO</button>
      </div>
    </div>
  );

  /* ── SESSION COMPLETE ──────────────────────── */
  if (phase === "done") return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", padding: 40 }}>
      <div style={{ maxWidth: 440, width: "100%", textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Sessão concluída</p>
        <p style={{ fontSize: 13, color: "#555", marginBottom: 6 }}>{subject}</p>
        <div style={{ fontSize: "clamp(52px, 8vw, 72px)", fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 8 }}>25<span style={{ fontSize: "45%", color: "#444" }}>min</span></div>
        <p style={{ fontSize: 13, color: "#555", marginBottom: 44 }}>de foco ininterrupto</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={startBreak} style={{ padding: "13px 28px", background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, borderRadius: 6, color: "#aaa", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em" }}>
            PAUSA ({cycles % 4 === 0 ? "15" : "5"} MIN)
          </button>
          <button onClick={startSession} style={{ padding: "13px 28px", background: RED, border: "none", borderRadius: 6, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >NOVA SESSÃO</button>
        </div>
        <button onClick={reset} style={{ background: "none", border: "none", color: "#333", fontSize: 12, cursor: "pointer", marginTop: 24, fontFamily: "inherit", letterSpacing: "0.04em" }}>
          ENCERRAR
        </button>
      </div>
    </div>
  );

  /* ── ACTIVE / BREAK TIMER (IMMERSIVE) ──────── */
  const isFocus = phase === "active";
  const breatheAnim = isRunning && isFocus
    ? "breathe 4s ease-in-out infinite"
    : "none";

  return (
    <div className="focus-active-container" style={{ position: "fixed", inset: 0, background: BG, zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>
      <style>{`
        @keyframes breathe { 0%,100%{opacity:0.15} 50%{opacity:0.28} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Ambient glow */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 40% 40% at 50% 50%, ${RED}08 0%, transparent 70%)`, animation: breatheAnim, pointerEvents: "none" }} />

      {/* Subject + phase label */}
      <div style={{ position: "absolute", top: 28, left: 0, right: 0, textAlign: "center" }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: "#333", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>
          {isFocus ? "Protocolo de Foco" : "Intervalo"}
        </p>
        <p style={{ fontSize: 12, color: "#3a3a3a", margin: 0 }}>{subject}</p>
      </div>

      {/* Timer ring */}
      <div className="focus-timer-container" style={{ position: "relative", width: 280, height: 280, marginBottom: 48 }}>
        {ring}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 56, fontWeight: 900, color: "#fff", letterSpacing: "-2px", fontVariantNumeric: "tabular-nums" }}>
            {fmt(timeLeft)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={togglePause}
          style={{ padding: "14px 44px", background: isFocus ? RED : "rgba(255,255,255,0.06)", border: `1px solid ${isFocus ? RED : BORDER}`, borderRadius: 6, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.06em", transition: "opacity 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.8"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          {isRunning ? "PAUSAR" : "CONTINUAR"}
        </button>
        <button
          onClick={reset}
          title="Encerrar"
          style={{ width: 44, height: 44, background: "none", border: `1px solid ${BORDER}`, borderRadius: 6, color: "#444", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.85" /></svg>
        </button>
      </div>

      {/* Cycle counter */}
      <p style={{ position: "absolute", bottom: 32, fontSize: 11, color: "#2a2a2a", letterSpacing: "0.06em" }}>
        CICLO {cycles + 1}
      </p>
    </div>
  );
}



function FlashcardsTool({ catalog }) {
  /* ── Sync Logic ───────────────────────────────── */
  // Get all topics from catalog that have some progress
  const activeTopics = (catalog?.areas || []).flatMap(a =>
    (a.modulos || []).filter(m => m.progresso > 0).map(m => m.title)
  );

  /* ── State ─────────────────────────────────────── */
  const SEED_CARDS = [
    { id: 1, topic: "Interpretação", front: "O que é inferência?", back: "Identificar informações IMPLÍCITAS — o que o texto sugere sem afirmar diretamente.", difficulty: null },
    { id: 2, topic: "Interpretação", front: "O que é extrapolação?", back: "Ir além do que o texto afirma, acrescentando ideias que não estão escritas.", difficulty: null },
    { id: 3, topic: "Interpretação", front: "O que é redução?", back: "Focar em apenas um aspecto do texto, ignorando ideias secundárias importantes.", difficulty: null },
    { id: 4, topic: "Coesão", front: "O que é anáfora?", back: "Referência a um termo mencionado anteriormente no texto (retomada).", difficulty: null },
    { id: 5, topic: "Coesão", front: "O que é catáfora?", back: "Referência antecipada a um termo que será mencionado adiante no texto.", difficulty: null },
    { id: 6, topic: "Fonologia", front: "O que é ditongo?", back: "Encontro de uma vogal e uma semivogal na mesma sílaba. Ex: cai-xa, pei-xe.", difficulty: null },
    { id: 7, topic: "Fonologia", front: "O que é hiato?", back: "Encontro de duas vogais em sílabas separadas. Ex: sa-ú-de, po-e-ta.", difficulty: null },
    { id: 8, topic: "Classes", front: "O que é um advérbio?", back: "Palavra invariável que modifica verbos, adjetivos ou outros advérbios, indicando circunstância.", difficulty: null },
    { id: 9, topic: "Classes", front: "O que são conjunções coordenativas conclusivas?", back: "Conectivos que expressam conclusão: logo, portanto, por conseguinte, pois (posposto).", difficulty: null },
    { id: 10, topic: "Acentuação", front: "Quando ocorre o acento no hiato?", back: "Quando o hiato é formado por I ou U tônico, sozinho na sílaba ou seguido de S. Ex: saúde, País.", difficulty: null },
    { id: 11, topic: "Sintaxe — Termos da Oração", front: "Qual a regra S-V-C na pontuação?", back: "NUNCA separar Sujeito, Verbo e Complementos por vírgula na ordem direta.", difficulty: null },
    { id: 12, topic: "Sintaxe — Termos da Oração", front: "A vírgula no vocativo é...", back: "Sempre OBRIGATÓRIA. Ex: 'Maria, venha cá!'.", difficulty: null },
  ];

  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("ifrn_memory_cards");
    return saved ? JSON.parse(saved) : SEED_CARDS;
  });

  /* Training session state */
  const [mode, setMode] = useState("dashboard"); // "dashboard" | "training" | "complete"
  const [sessionCards, setSessionCards] = useState([]);
  const [sessionIdx, setSessionIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [sessionResults, setSessionResults] = useState({ acertei: 0, dificil: 0, errei: 0 });

  /* Add card state */
  const [showAdd, setShowAdd] = useState(false);
  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");
  const [newTopic, setNewTopic] = useState("Interpretação");

  useEffect(() => {
    localStorage.setItem("ifrn_memory_cards", JSON.stringify(cards));
  }, [cards]);

  /* ── Derived ───────────────────────────────────── */
  const dueToday = cards.filter(c => c.difficulty === null || c.difficulty === "errei" || c.difficulty === "dificil");
  const estMinutes = Math.max(1, Math.ceil(dueToday.length * 0.6));
  const topics = [...new Set(cards.map(c => c.topic))];
  const topicStats = topics.map(t => {
    const topicCards = cards.filter(c => c.topic === t);
    const correct = topicCards.filter(c => c.difficulty === "acertei").length;
    return { topic: t, rate: topicCards.length ? Math.round((correct / topicCards.length) * 100) : 0, total: topicCards.length };
  }).sort((a, b) => b.rate - a.rate);
  const retentionRate = cards.length ? Math.round((cards.filter(c => c.difficulty === "acertei").length / cards.length) * 100) : 0;
  const strongest = topicStats[0];
  const weakest = topicStats[topicStats.length - 1];

  /* ── Handlers ──────────────────────────────────── */
  const startTraining = () => {
    const shuffled = [...dueToday].sort(() => Math.random() - 0.5);
    setSessionCards(shuffled);
    setSessionIdx(0);
    setRevealed(false);
    setSessionResults({ acertei: 0, dificil: 0, errei: 0 });
    setMode("training");
  };

  const evaluate = (result) => {
    const card = sessionCards[sessionIdx];
    setCards(prev => prev.map(c => c.id === card.id ? { ...c, difficulty: result } : c));
    setSessionResults(prev => ({ ...prev, [result]: prev[result] + 1 }));
    const next = sessionIdx + 1;
    if (next >= sessionCards.length) {
      setMode("complete");
    } else {
      setRevealed(false);
      setTimeout(() => setSessionIdx(next), 180);
    }
  };

  const addCard = () => {
    if (!newFront.trim() || !newBack.trim()) return;
    setCards(prev => [...prev, { id: Date.now(), topic: newTopic, front: newFront.trim(), back: newBack.trim(), difficulty: null }]);
    setNewFront(""); setNewBack(""); setShowAdd(false);
  };

  /* ── IMMERSIVE TRAINING MODE ───────────────────── */
  if (mode === "training") {
    const card = sessionCards[sessionIdx];
    const progress = sessionIdx / sessionCards.length;
    return (
      <div className="flashcard-immersive" style={{ position: "fixed", inset: 0, background: BG, zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>
        {/* Top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
          <div style={{ height: 2, background: `rgba(255,255,255,0.05)` }}>
            <div style={{ height: "100%", width: `${progress * 100}%`, background: RED, transition: "width 0.4s ease" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 28px" }}>
            <button onClick={() => setMode("dashboard")} style={{ background: "none", border: "none", color: "#444", fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em" }}>
              ENCERRAR
            </button>
            <span style={{ fontSize: 12, color: "#333", fontWeight: 600, letterSpacing: "0.06em" }}>
              {sessionIdx + 1} / {sessionCards.length}
            </span>
            <span style={{ fontSize: 11, color: "#333", letterSpacing: "0.05em", textTransform: "uppercase" }}>{card.topic}</span>
          </div>
        </div>

        {/* Card */}
        <div className="flashcard-view-container" style={{ width: "100%", maxWidth: 600, padding: "0 24px" }}>
          <div style={{
            minHeight: 280, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "48px 40px", textAlign: "center",
          }}>
            {!revealed ? (
              <p style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#fff", lineHeight: 1.45, letterSpacing: "-0.01em", margin: 0 }}>
                {card.front}
              </p>
            ) : (
              <div style={{ animation: "fadeInUp 0.2s ease" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Resposta</p>
                <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: 500, color: "#e0e0e0", lineHeight: 1.6, margin: 0 }}>
                  {card.back}
                </p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 0 32px" }} />

          {/* Actions */}
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              style={{ width: "100%", padding: "16px 0", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#aaa", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#aaa"; }}
            >
              MOSTRAR RESPOSTA
            </button>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { key: "errei", label: "ERREI", bg: "rgba(192,57,43,0.12)", border: "rgba(192,57,43,0.3)", color: "#C0392B" },
                { key: "dificil", label: "DIFÍCIL", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.1)", color: "#888" },
                { key: "acertei", label: "ACERTEI", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.15)", color: "#ccc" },
              ].map(btn => (
                <button
                  key={btn.key}
                  onClick={() => evaluate(btn.key)}
                  style={{ padding: "14px 0", background: btn.bg, border: `1px solid ${btn.border}`, borderRadius: 7, color: btn.color, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.06em", transition: "all 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
      </div>
    );
  }

  /* ── SESSION COMPLETE ──────────────────────────── */
  if (mode === "complete") {
    const total = sessionCards.length;
    const pct = total ? Math.round((sessionResults.acertei / total) * 100) : 0;
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, fontFamily: "inherit" }}>
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Sessão concluída</p>
          <div style={{ fontSize: "clamp(56px, 8vw, 80px)", fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 8 }}>{pct}<span style={{ fontSize: "40%", color: "#555" }}>%</span></div>
          <p style={{ fontSize: 13, color: "#555", marginBottom: 40 }}>taxa de acerto nesta sessão</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 40 }}>
            {[
              { label: "ACERTEI", val: sessionResults.acertei, color: "#fff" },
              { label: "DIFÍCIL", val: sessionResults.dificil, color: "#555" },
              { label: "ERREI", val: sessionResults.errei, color: RED },
            ].map(s => (
              <div key={s.label} style={{ padding: "16px 12px", background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 8 }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.val}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: "0.08em" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={startTraining}
              style={{ padding: "13px 32px", background: RED, border: "none", borderRadius: 6, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >REPETIR ERROS</button>
            <button
              onClick={() => setMode("dashboard")}
              style={{ padding: "13px 32px", background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 6, color: "#666", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em" }}
            >VER PAINEL</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── DASHBOARD ─────────────────────────────────── */
  return (
    <div style={{ flex: 1, maxWidth: 900, margin: "0 auto", padding: "52px 40px 100px", width: "100%" }}>

      {/* Header */}
      <div style={{ marginBottom: 52 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Laboratório de Revisão</p>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: 8, textTransform: "uppercase" }}>Treino de Hoje</h1>
        <p style={{ fontSize: 14, color: "#444", marginBottom: 36 }}>
          {dueToday.length} itens para revisar &middot; estimativa {estMinutes} min
        </p>
        <button
          onClick={dueToday.length > 0 ? startTraining : undefined}
          disabled={dueToday.length === 0}
          style={{ padding: "14px 36px", background: dueToday.length > 0 ? RED : "rgba(255,255,255,0.05)", border: "none", borderRadius: 6, color: dueToday.length > 0 ? "#fff" : "#333", fontSize: 14, fontWeight: 700, cursor: dueToday.length > 0 ? "pointer" : "default", fontFamily: "inherit", letterSpacing: "0.04em", transition: "opacity 0.15s" }}
          onMouseEnter={e => dueToday.length > 0 && (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          {dueToday.length > 0 ? "INICIAR TREINO" : "TUDO REVISADO"}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 52 }} className="memory-stats-grid">
        {[
          { label: "Retenção", val: `${retentionRate}%`, sub: "taxa geral" },
          { label: "Para revisar", val: dueToday.length, sub: "itens hoje" },
          { label: "Mais forte", val: strongest?.topic ?? "—", sub: `${strongest?.rate ?? 0}% acerto`, small: true },
          { label: "Mais fraco", val: weakest?.topic ?? "—", sub: `${weakest?.rate ?? 0}% acerto`, small: true },
        ].map(s => (
          <div key={s.label} style={{ padding: "20px 20px 18px", background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 8 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>{s.label}</p>
            <p style={{ fontSize: s.small ? 16 : 28, fontWeight: 900, color: "#fff", margin: "0 0 4px", lineHeight: 1.2 }}>{s.val}</p>
            <p style={{ fontSize: 11, color: "#444", margin: 0 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: `rgba(255,255,255,0.04)`, marginBottom: 40 }} />

      {/* Topic breakdown */}
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Desempenho por Tema</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {topicStats.map(ts => (
            <div key={ts.topic} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 12, color: "#555", width: 120, flexShrink: 0 }}>{ts.topic}</span>
              <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 99 }}>
                <div style={{ height: "100%", width: `${ts.rate}%`, background: ts.rate > 60 ? "#fff" : RED, borderRadius: 99, opacity: ts.rate > 60 ? 0.6 : 0.9, transition: "width 0.4s ease" }} />
              </div>
              <span style={{ fontSize: 11, color: "#444", width: 36, textAlign: "right", flexShrink: 0 }}>{ts.rate}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add card */}
      <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 32 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: showAdd ? 24 : 0 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Adicionar item</p>
          <button
            onClick={() => setShowAdd(v => !v)}
            style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 4, color: "#555", fontSize: 11, fontWeight: 600, padding: "5px 14px", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em" }}
          >{showAdd ? "CANCELAR" : "NOVO ITEM"}</button>
        </div>

        {showAdd && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fadeInUp 0.2s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <input value={newFront} onChange={e => setNewFront(e.target.value)} placeholder="Pergunta"
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "12px 14px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit" }} />
              <select value={newTopic} onChange={e => setNewTopic(e.target.value)}
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "12px 14px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit" }}>
                {["Interpretação", "Coesão", "Fonologia", "Classes", "Acentuação", "Ortografia"].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <textarea value={newBack} onChange={e => setNewBack(e.target.value)} placeholder="Resposta" rows={3}
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "12px 14px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit", resize: "none" }} />
            <button onClick={addCard}
              style={{ alignSelf: "flex-end", padding: "11px 28px", background: RED, border: "none", borderRadius: 6, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >SALVAR</button>
          </div>
        )}
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════
   CORRETOR TOPADO PAGE — iframe externo
══════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════
   CLARITY LAB (FEYNMAN METHOD)
══════════════════════════════════════════════════ */

function CorretorTopadoPage() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <iframe
        src="https://v0-iadoprofchris.vercel.app/"
        title="Corretor Topado"
        style={{
          flex: 1,
          width: "100%",
          height: "calc(100vh - 60px)",
          border: "none",
          display: "block",
        }}
        allow="clipboard-write; microphone"
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ROOT APP — roteamento por estado
══════════════════════════════════════════════════ */
export default function App() {
  const [catalog, setCatalog] = useState(() => {
    const saved = localStorage.getItem("ifrn_catalog_state");
    const savedData = saved ? JSON.parse(saved) : null;
    const cat = JSON.parse(JSON.stringify(INITIAL_CATALOG)); // Clone estrutural

    if (savedData && savedData.areas) {
      cat.areas.forEach(area => {
        const savedArea = savedData.areas.find(a => a.slug === area.slug);
        if (savedArea && savedArea.modulos) {
          area.modulos.forEach(mod => {
            const savedMod = savedArea.modulos.find(m => m.slug === mod.slug);
            if (savedMod) mod.progresso = savedMod.progresso || 0;
          });
        }
      });
    }

    // Force enable all lessons
    cat.areas.forEach(a => a.modulos.forEach(m => {
      m.temAula = true;
      m.bloqueado = false;
    }));
    return cat;
  });

  // page: "home" | "aula" | "pomodoro" | "flashcards" | "redacao" | "corretor" | "profile"
  const [page, setPage] = useState("home");
  const [lessonCtx, setLessonCtx] = useState(null); // { modulo, area }
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({
    name: "Estudante IFRN",
    avatar: userProfile
  });

  useEffect(() => {
    localStorage.setItem("ifrn_catalog_state", JSON.stringify(catalog));
  }, [catalog]);

  const updateProgress = (moduloSlug, value) => {
    setCatalog(prev => {
      const newAreas = prev.areas.map(area => ({
        ...area,
        modulos: area.modulos.map(mod =>
          mod.slug === moduloSlug ? { ...mod, progresso: value } : mod
        )
      }));
      return { ...prev, areas: newAreas };
    });
  };

  const onHome = () => { setPage("home"); window.scrollTo(0, 0); };
  const openLesson = (ctx) => { setLessonCtx(ctx); setPage("aula"); window.scrollTo(0, 0); };
  const onProfile = () => { setPage("profile"); window.scrollTo(0, 0); };
  const onCorretorTopado = () => { setPage("corretor"); window.scrollTo(0, 0); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: ${BG}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #2e2e2e; border-radius: 99px; }
        @keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>

      <div style={{ fontFamily: "'Inter', sans-serif", background: BG, minHeight: "100vh", color: "#fff", display: "flex", flexDirection: "column" }}>
        <GlobalNav
          page={page}
          onHome={onHome}
          onPomodoro={() => setPage("pomodoro")}
          onFlashcards={() => setPage("flashcards")}
          onCorretorTopado={onCorretorTopado}
          onProfile={onProfile}
          areaTitle={page === "aula" ? lessonCtx?.area?.title : null}
          moduloTitle={page === "aula" ? lessonCtx?.modulo?.title : null}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />

        {page === "home" && <HomePage onOpenLesson={openLesson} searchQuery={searchQuery} catalog={catalog} />}
        {page === "aula" && lessonCtx && (
          <LessonPage
            modulo={catalog.areas.flatMap(a => a.modulos).find(m => m.slug === lessonCtx.modulo.slug)}
            area={lessonCtx.area}
            onHome={onHome}
            onUpdateProgress={updateProgress}
          />
        )}
        {page === "pomodoro" && <PomodoroTool />}
        {page === "flashcards" && <FlashcardsTool catalog={catalog} />}
        {page === "corretor" && <CorretorTopadoPage />}
        {page === "profile" && <ProfilePage user={user} onUpdateUser={setUser} onHome={onHome} />}
      </div>
    </>
  );
}
