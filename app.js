/* Admin lock: local-only convenience toggle (no password). */

const STORAGE_KEY = "scscp_state";
const ADMIN_KEY = "scscp_admin";
const THEME_KEY = "scscp_theme";
const ROLE_KEYS = ["shotCaller", "yourself", "enemyTarget"];

const DEFAULT_STATE = {
  header: {
    eyebrow: "Star Citizen",
    title: "Space Combat Communication Protocol",
    subtitle: "Concise, standardized call-outs for fast, precise coordination.",
    intro: "Doctrine-grade phrasing for tight, unambiguous team coordination.",
    logoSrc: "",
    logoAlt: "Header logo",
    backgroundSrc: "",
    socialIcons: [
      { src: "", url: "" },
      { src: "", url: "" },
      { src: "", url: "" },
    ],
  },
  ui: {
    theme: "stanton",
  },
  roleLabels: {
    shotCaller: "Shot caller",
    yourself: "Yourself",
    enemyTarget: "Enemy target",
  },
  footer: {
    lines: ["How to run: open index.html directly in a browser."],
    note: "Viewer/Admin lock is convenience-only because this is a static offline site.",
  },
  blocks: [
    {
      id: "rules-block",
      type: "rules",
      title: "Information Box",
      sections: [
        {
          id: "rules-core",
          title: "Core Rules",
          subtitle: "Keep calls short, consistent, and anchored to state changes.",
          body:
            "One call equals one state. No narration. Silence is correct.\nSame breath rule (3–5 seconds): same breath means name optional; time passes means name required.\nCategory change means name required.\nPersonal state uses the speaker name; shared truth never uses the speaker name.",
          note: "",
        },
        {
          id: "rules-critical",
          title: "Critical Definitions",
          subtitle: "Standardize intent and reset behaviors.",
          body:
            "Remove “Push” entirely (it does not exist).\nRegroup on: re-center on anchor, can remain engaged or re-engage quickly.\nReset: disengage and reset fight state (break contact).\nRed (PERSONAL): critical health, not necessarily about to die, can be safe but fragile.",
          note: "",
        },
      ],
    },
    {
      id: "flows-block",
      type: "flows",
      title: "Example Box",
      contextText: "",
      flows: [
        {
          id: "flow-target",
          title: "Target Cycle",
          exampleLabel: "Example",
          exampleTargetId: "",
          rows: [
            {
              id: "flow-target-row-1",
              rowTitle: "Target acquisition",
              rowContext: "Lead calls target, team moves through visual states.",
              elements: [
                { id: "el-1", type: "node", text: "Target", role: "shotCaller", emphasis: false },
                { id: "el-2", type: "node", text: "Looking / Seen", role: "yourself", emphasis: false },
                { id: "el-3", type: "node", text: "Merging", role: "yourself", emphasis: false },
              ],
            },
            {
              id: "flow-target-row-2",
              rowTitle: "Effectiveness states",
              rowContext: "Shared truth drives next step.",
              elements: [
                { id: "el-4", type: "node", text: "Effective / Not effective", role: "yourself", emphasis: false },
                { id: "el-5", type: "node", text: "Red (TARGET)", role: "enemyTarget", emphasis: false },
                { id: "el-6", type: "node", text: "Splash", role: "enemyTarget", emphasis: false },
                { id: "el-7", type: "divider", text: "or" },
                { id: "el-8", type: "node", text: "Target out", role: "shotCaller", emphasis: false },
              ],
            },
            {
              id: "flow-target-row-3",
              rowTitle: "Cycle restart",
              rowContext: "",
              elements: [{ id: "el-9", type: "node", text: "New Target", role: "shotCaller", emphasis: false }],
            },
          ],
        },
        {
          id: "flow-regroup",
          title: "Regroup Cycle",
          exampleLabel: "Example",
          exampleTargetId: "",
          rows: [
            {
              id: "flow-regroup-row-1",
              rowTitle: "Regroup flow",
              rowContext: "Anchor call with readiness confirmation.",
              elements: [
                { id: "el-10", type: "node", text: "Regroup on", role: "shotCaller", emphasis: false },
                { id: "el-11", type: "node", text: "Distance (optional)", role: "yourself", emphasis: false },
                { id: "el-12", type: "node", text: "Ready", role: "yourself", emphasis: false },
              ],
            },
          ],
        },
        {
          id: "flow-threat",
          title: "Threat Interrupt",
          exampleLabel: "Example",
          exampleTargetId: "",
          rows: [
            {
              id: "flow-threat-row-1",
              rowTitle: "Threat chain",
              rowContext: "Personal threat interrupts at any time.",
              elements: [
                { id: "el-13", type: "node", text: "Aggro", role: "yourself", emphasis: false },
                { id: "el-14", type: "node", text: "Evasive", role: "yourself", emphasis: false },
                { id: "el-15", type: "node", text: "Low boost", role: "yourself", emphasis: false },
                { id: "el-16", type: "node", text: "Clear", role: "yourself", emphasis: false },
              ],
            },
            {
              id: "flow-threat-row-2",
              rowTitle: "",
              rowContext: "",
              elements: [
                { id: "el-17", type: "node", text: "Red (PERSONAL)", role: "yourself", emphasis: true },
                { id: "el-18", type: "note", text: "Critical state interrupt at any time" },
              ],
            },
          ],
        },
      ],
    },
    { id: "group-team-lead", type: "calloutGroup", title: "TEAM LEAD (INTENT)" },
    { id: "group-regroup", type: "calloutGroup", title: "REGROUP RESPONSES" },
    { id: "group-threat", type: "calloutGroup", title: "PILOT PERSONAL THREAT" },
    { id: "group-geometry", type: "calloutGroup", title: "TEAM GEOMETRY" },
    { id: "group-attachment", type: "calloutGroup", title: "ATTACHMENT" },
    { id: "group-awareness", type: "calloutGroup", title: "TARGET AWARENESS" },
    { id: "group-effectiveness", type: "calloutGroup", title: "ENGAGEMENT EFFECTIVENESS" },
    { id: "group-target-status", type: "calloutGroup", title: "TARGET STATUS (SHARED TRUTH)" },
    { id: "group-kill", type: "calloutGroup", title: "KILL / DEATH" },
  ],
  callouts: [
    {
      id: "call-forward",
      callName: "Forward",
      groupId: "group-team-lead",
      context: "Team lead sets forward pressure or push direction.",
      meaning: "Advance toward target space with intent.",
      whenToUse: ["Lead wants team to press"],
      responseExpected: "No response required unless queried.",
      notes: "Used to initiate aggressive movement without narration.",
    },
    {
      id: "call-target",
      callName: "Target",
      groupId: "group-team-lead",
      context: "Team lead designates a new focus target.",
      meaning: "Primary engagement target for the team.",
      whenToUse: ["Switching focus", "Calling a fresh target"],
      responseExpected: "Acknowledge via action; optional verbal.",
      notes: "Name required if time has passed or category change occurs.",
    },
    {
      id: "call-target-out",
      callName: "Target out",
      groupId: "group-team-lead",
      context: "Lead confirms target is no longer valid or lost.",
      meaning: "Drop target, shift awareness.",
      whenToUse: ["Target destroyed", "Target lost or no longer relevant"],
      responseExpected: "Team reacquires or awaits new target.",
      notes: "Triggers new target cycle.",
    },
    {
      id: "call-regroup-on",
      callName: "Regroup on",
      groupId: "group-team-lead",
      context: "Regroup on an anchor while remaining engaged or ready to re-engage.",
      meaning: "Re-center on anchor without breaking contact.",
      whenToUse: ["Team needs cohesion", "Resetting formation quickly"],
      responseExpected: "Distance optional, Ready when set.",
      notes: "Regroup on is not Reset.",
    },
    {
      id: "call-reset",
      callName: "Reset",
      groupId: "group-team-lead",
      context: "Lead calls disengage and reset fight state.",
      meaning: "Break contact and reset.",
      whenToUse: ["Fight state compromised", "Need clean reset"],
      responseExpected: "Distance, Ready once reset.",
      notes: "Breaks engagement.",
    },
    {
      id: "call-hold",
      callName: "Hold",
      groupId: "group-team-lead",
      context: "Lead holds current position or state.",
      meaning: "Maintain state; no new push.",
      whenToUse: ["Stabilize", "Wait for additional info"],
      responseExpected: "No response required.",
      notes: "Silence is correct unless changed.",
    },
    {
      id: "call-distance",
      callName: "Distance",
      groupId: "group-regroup",
      context: "Report distance from anchor.",
      meaning: "Time/distance until regroup complete.",
      whenToUse: ["During regroup calls"],
      responseExpected: "Optional follow-up.",
      notes: "Optional in regroup cycle.",
    },
    {
      id: "call-ready",
      callName: "Ready",
      groupId: "group-regroup",
      context: "Confirm regroup completion.",
      meaning: "Regroup complete and ready.",
      whenToUse: ["Once regrouped"],
      responseExpected: "Lead continues flow.",
      notes: "Ends regroup cycle.",
    },
    {
      id: "call-aggro",
      callName: "Aggro",
      groupId: "group-threat",
      context: "Pilot is currently targeted or pressured.",
      meaning: "Threat on me.",
      whenToUse: ["Receiving focused fire"],
      responseExpected: "Team awareness; support if possible.",
      notes: "Personal state uses speaker name if time passes.",
    },
    {
      id: "call-evasive",
      callName: "Evasive",
      groupId: "group-threat",
      context: "Pilot is evading to survive.",
      meaning: "I'm defensive and maneuvering hard.",
      whenToUse: ["Under pressure"],
      responseExpected: "Team aware of reduced firepower.",
      notes: "Followed by Clear when safe.",
    },
    {
      id: "call-low-boost",
      callName: "Low boost",
      groupId: "group-threat",
      context: "Pilot is low on boost/escape energy.",
      meaning: "Limited evasive capability.",
      whenToUse: ["Boost nearly depleted"],
      responseExpected: "Team aware of constraint.",
      notes: "Critical in threat chain.",
    },
    {
      id: "call-clear",
      callName: "Clear",
      groupId: "group-threat",
      context: "Pilot is no longer threatened.",
      meaning: "Threat resolved; back to normal.",
      whenToUse: ["Aggro cleared"],
      responseExpected: "Resume normal comms.",
      notes: "Ends threat interrupt.",
    },
    {
      id: "call-red-personal",
      callName: "Red (PERSONAL)",
      groupId: "group-threat",
      context: "Pilot is critical health but not necessarily dying.",
      meaning: "Critical state, fragile even if safe.",
      whenToUse: ["Hull/health critical"],
      responseExpected: "Team aware of fragility.",
      notes: "Personal state.",
    },
    {
      id: "call-ball-in",
      callName: "Ball in",
      groupId: "group-geometry",
      context: "Team tightens formation.",
      meaning: "Compress formation around anchor.",
      whenToUse: ["Need tighter geometry"],
      responseExpected: "Adjust positioning.",
      notes: "No narration; respond with action.",
    },
    {
      id: "call-ball-out",
      callName: "Ball out",
      groupId: "group-geometry",
      context: "Team expands formation.",
      meaning: "Spread out for coverage.",
      whenToUse: ["Need wider spacing"],
      responseExpected: "Adjust spacing.",
      notes: "Used by lead.",
    },
    {
      id: "call-with",
      callName: "With",
      groupId: "group-attachment",
      context: "Pilot is attached to lead/anchor.",
      meaning: "I'm on the anchor.",
      whenToUse: ["Confirming attachment"],
      responseExpected: "Lead acknowledges implicitly.",
      notes: "Attachment state.",
    },
    {
      id: "call-with-pilot",
      callName: "With pilot",
      groupId: "group-attachment",
      context: "Pilot is attached to another pilot.",
      meaning: "I'm with a named pilot.",
      whenToUse: ["Buddy pairing"],
      responseExpected: "Named pilot aware.",
      notes: "Name required by rule.",
    },
    {
      id: "call-looking",
      callName: "Looking",
      groupId: "group-awareness",
      context: "Searching for target.",
      meaning: "Target not seen yet.",
      whenToUse: ["After target call"],
      responseExpected: "Seen or No contact.",
      notes: "Target cycle.",
    },
    {
      id: "call-no-contact",
      callName: "No contact",
      groupId: "group-awareness",
      context: "Cannot see target.",
      meaning: "Target not in sight.",
      whenToUse: ["Target lost"],
      responseExpected: "Lead adjusts.",
      notes: "Shared truth; no name.",
    },
    {
      id: "call-seen",
      callName: "Seen",
      groupId: "group-awareness",
      context: "Target visual acquired.",
      meaning: "Target in sight.",
      whenToUse: ["Target located"],
      responseExpected: "Proceed to merge.",
      notes: "Shared truth.",
    },
    {
      id: "call-merging",
      callName: "Merging",
      groupId: "group-effectiveness",
      context: "Closing into merge.",
      meaning: "Entering merge stage.",
      whenToUse: ["After seen"],
      responseExpected: "Team aligns.",
      notes: "Target cycle.",
    },
    {
      id: "call-effective",
      callName: "Effective",
      groupId: "group-effectiveness",
      context: "Attack is effective.",
      meaning: "Hits/pressure landing.",
      whenToUse: ["Shots on target"],
      responseExpected: "Continue pressure.",
      notes: "Shared truth.",
    },
    {
      id: "call-very-effective",
      callName: "Very effective",
      groupId: "group-effectiveness",
      context: "Attack is highly effective.",
      meaning: "Significant damage.",
      whenToUse: ["Target crumbling"],
      responseExpected: "Maintain focus.",
      notes: "Shared truth.",
    },
    {
      id: "call-not-effective",
      callName: "Not effective",
      groupId: "group-effectiveness",
      context: "Attack is not landing.",
      meaning: "Shots missing or not damaging.",
      whenToUse: ["No effect"],
      responseExpected: "Adjust tactics.",
      notes: "Shared truth.",
    },
    {
      id: "call-chasing",
      callName: "Chasing",
      groupId: "group-effectiveness",
      context: "Target is running and being chased.",
      meaning: "Pursuit state.",
      whenToUse: ["Target disengaging"],
      responseExpected: "Team keeps awareness.",
      notes: "Shared truth.",
    },
    {
      id: "call-red-target",
      callName: "Red (TARGET)",
      groupId: "group-target-status",
      context: "Target critical.",
      meaning: "Target is fragile.",
      whenToUse: ["Target at critical health"],
      responseExpected: "Press for splash.",
      notes: "Shared truth only.",
    },
    {
      id: "call-splash",
      callName: "Splash",
      groupId: "group-kill",
      context: "Target destroyed.",
      meaning: "Confirmed kill.",
      whenToUse: ["Target destroyed"],
      responseExpected: "Lead selects new target.",
      notes: "Shared truth.",
    },
    {
      id: "call-full-kill",
      callName: "Full kill",
      groupId: "group-kill",
      context: "Final confirmation of kill.",
      meaning: "Target confirmed dead.",
      whenToUse: ["Kill fully confirmed"],
      responseExpected: "Team shifts focus.",
      notes: "Shared truth.",
    },
    {
      id: "call-down-target",
      callName: "Down (TARGET)",
      groupId: "group-kill",
      context: "Target downed or disabled.",
      meaning: "Target neutralized.",
      whenToUse: ["Target disabled"],
      responseExpected: "Assess follow-up.",
      notes: "Shared truth.",
    },
    {
      id: "call-down-personal",
      callName: "Down (PERSONAL)",
      groupId: "group-kill",
      context: "Pilot is downed.",
      meaning: "I'm down.",
      whenToUse: ["Personal down state"],
      responseExpected: "Team aware of loss.",
      notes: "Personal state uses speaker name if time passes.",
    },
    {
      id: "call-dead",
      callName: "Dead",
      groupId: "group-kill",
      context: "Pilot is dead.",
      meaning: "I'm out.",
      whenToUse: ["Personal death state"],
      responseExpected: "Team adapts.",
      notes: "Personal state.",
    },
  ],
};

const THEMES = {
  stanton: {
    label: "Stanton",
    colors: {
      "--bg": "#0b1018",
      "--panel": "#121a26",
      "--panel-elev": "#182233",
      "--line": "#24324a",
      "--text": "#e3ecf5",
      "--muted": "#9bb0c9",
      "--accent": "#4cc3ff",
      "--accent-strong": "#7ad7ff",
      "--danger": "#ff6b6b",
      "--success": "#6bffb3",
      "--warning": "#ffce6b",
    },
  },
  grimhex: {
    label: "Grimhex",
    colors: {
      "--bg": "#0b0c0f",
      "--panel": "#14161b",
      "--panel-elev": "#1b1e25",
      "--line": "#2b2f39",
      "--text": "#e4e7ec",
      "--muted": "#9ba2ae",
      "--accent": "#b44f4f",
      "--accent-strong": "#c86262",
      "--danger": "#d66a6a",
      "--success": "#7fbfa1",
      "--warning": "#c2a878",
    },
  },
  pyro: {
    label: "Pyro",
    colors: {
      "--bg": "#17100b",
      "--panel": "#21160f",
      "--panel-elev": "#2b1d13",
      "--line": "#3b2a1d",
      "--text": "#f2e6d6",
      "--muted": "#c1b19b",
      "--accent": "#d48c5a",
      "--accent-strong": "#e5b070",
      "--danger": "#e0715e",
      "--success": "#9bcf8a",
      "--warning": "#f0c27a",
    },
  },
  nyx: {
    label: "Nyx",
    colors: {
      "--bg": "#0a101c",
      "--panel": "#121c2e",
      "--panel-elev": "#18253a",
      "--line": "#243452",
      "--text": "#e2edf8",
      "--muted": "#9fb4cc",
      "--accent": "#6fbef7",
      "--accent-strong": "#a4ddff",
      "--danger": "#ff7b7b",
      "--success": "#7bffcf",
      "--warning": "#ffd27d",
    },
  },
};

let state = loadState();
let adminMode = loadAdmin();
let activeTheme = loadTheme();
let expandedIds = new Set();
let editingBlocks = new Set();

const headerContent = document.getElementById("headerContent");
const footerContent = document.getElementById("footerContent");
const categoryNav = document.getElementById("categoryNav");
const blocksContainer = document.getElementById("blocksContainer");
const adminToggle = document.getElementById("adminToggle");
const adminStatus = document.getElementById("adminStatus");
const themeSelect = document.getElementById("themeSelect");
const headerAdminPanel = document.getElementById("headerAdminPanel");
const headerSocials = document.getElementById("headerSocials");
const siteHeader = document.querySelector(".site-header");

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    if (window.__EXPORTED_STATE__ && typeof window.__EXPORTED_STATE__ === "object") {
      return normalizeState(deepClone(window.__EXPORTED_STATE__));
    }
    return normalizeState(deepClone(DEFAULT_STATE));
  }
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return normalizeState(migrateLegacyCallouts(parsed));
    }
    if (parsed && typeof parsed === "object" && Array.isArray(parsed.blocks)) {
      return normalizeState(parsed);
    }
  } catch (error) {
    console.warn("Failed to parse stored data", error);
  }
  return normalizeState(deepClone(DEFAULT_STATE));
}

function migrateLegacyCallouts(callouts) {
  const nextState = deepClone(DEFAULT_STATE);
  const groupMap = new Map(
    nextState.blocks
      .filter((block) => block.type === "calloutGroup")
      .map((block) => [block.title, block.id])
  );
  nextState.callouts = callouts.map((item) => {
    const groupId = groupMap.get(item.category) || createId("group");
    if (!groupMap.has(item.category)) {
      groupMap.set(item.category, groupId);
      nextState.blocks.splice(nextState.blocks.length - 1, 0, {
        id: groupId,
        type: "calloutGroup",
        title: item.category,
      });
    }
    return {
      id: createId("callout"),
      callName: item.callName,
      groupId,
      context: item.context,
      meaning: item.meaning,
      whenToUse: item.whenToUse || [],
      responseExpected: item.responseExpected,
      notes: item.notes,
    };
  });
  return nextState;
}

function normalizeState(source) {
  const nextState = deepClone(source);
  nextState.header = nextState.header || {};
  if (typeof nextState.header.logoSrc !== "string") {
    nextState.header.logoSrc = "";
  }
  if (typeof nextState.header.logoAlt !== "string") {
    nextState.header.logoAlt = "Header logo";
  }
  if (typeof nextState.header.backgroundSrc !== "string") {
    nextState.header.backgroundSrc = "";
  }
  if (!Array.isArray(nextState.header.socialIcons)) {
    nextState.header.socialIcons = deepClone(DEFAULT_STATE.header.socialIcons);
  } else {
    nextState.header.socialIcons = nextState.header.socialIcons.map((icon, index) => ({
      src: typeof icon?.src === "string" ? icon.src : "",
      url: typeof icon?.url === "string" ? icon.url : "",
    }));
    while (nextState.header.socialIcons.length < 3) {
      nextState.header.socialIcons.push({ src: "", url: "" });
    }
    nextState.header.socialIcons = nextState.header.socialIcons.slice(0, 3);
  }
  nextState.ui = {
    ...deepClone(DEFAULT_STATE.ui),
    ...(nextState.ui || {}),
  };
  nextState.ui.theme = resolveThemeName(nextState.ui.theme || "stanton");
  nextState.roleLabels = {
    ...deepClone(DEFAULT_STATE.roleLabels),
    ...(nextState.roleLabels || {}),
  };

  nextState.callouts = (nextState.callouts || []).map((callout) => {
    const normalizedVideos = (callout.videos || []).map((video) => ({
      id: video.id || createId("video"),
      title: video.title || "",
      type: video.type,
      src: video.src,
    }));
    const whenText = Array.isArray(callout.whenToUse)
      ? callout.whenToUse.filter(Boolean).join("\n")
      : callout.whenToUse || "";
    return {
      ...callout,
      callName: callout.callName || "New Element",
      context: callout.context || "",
      meaning: callout.meaning || "",
      whenToUse: whenText,
      responseExpected: callout.responseExpected || "",
      notes: callout.notes || "",
      imageSrc: typeof callout.imageSrc === "string" ? callout.imageSrc : "",
      importantNote: callout.importantNote || "",
      videos: normalizedVideos,
    };
  });

  nextState.blocks = (nextState.blocks || []).map((block) => {
    if (block.type === "adminTools") {
      return null;
    }
    if (block.type === "youtube") {
      const migratedBlock = {
        id: block.id,
        type: "video",
        title: block.title || "Video",
        videos: block.url
          ? [{ id: createId("video"), type: "youtube", src: block.url, title: "" }]
          : [],
      };
      return migratedBlock;
    }
    block.videos = (block.videos || []).map((video) => ({
      id: video.id || createId("video"),
      title: video.title || "",
      type: video.type,
      src: video.src,
    }));
    if (block.type === "rules") {
      if (block.title === "Rules of Use") {
        block.title = "Information Box";
      }
      block.sections = (block.sections || []).map((section) => {
        if (Array.isArray(section.items) && !section.body) {
          section.body = section.items.join("\n");
        }
        return {
          title: section.title || "New Information Sub-Box",
          subtitle: "",
          note: "",
          ...section,
          subtitle: section.subtitle || "",
          body: section.body || "",
          note: section.note || "",
        };
      });
    }
    if (block.type === "flows") {
      if (block.title === "Flow Diagrams") {
        block.title = "Example Box";
      }
      if (typeof block.contextText !== "string") {
        block.contextText = "";
      }
      block.flows = (block.flows || []).map((flow) => {
        flow.exampleLabel = flow.exampleLabel || "Example";
        flow.exampleTargetId = flow.exampleTargetId || "";
        flow.imageSrc = typeof flow.imageSrc === "string" ? flow.imageSrc : "";
        flow.videos = (flow.videos || []).map((video) => ({
          id: video.id || createId("video"),
          title: video.title || "",
          type: video.type,
          src: video.src,
        }));
        flow.rows = (flow.rows || []).map((row) => {
          row.rowTitle = row.rowTitle || "";
          row.rowContext = row.rowContext || row.rowExample || "";
          const normalizedElements = [];
          (row.elements || []).forEach((element, index) => {
            if (element.type === "node") {
              if (!element.role) {
                element.role = "yourself";
              }
              element.color = element.color || "";
            }
            if (element.type === "arrow") {
              element.kind = element.kind || "breath";
            }
            normalizedElements.push(element);
            const next = row.elements[index + 1];
            if (element.type === "node" && next && next.type === "node") {
              normalizedElements.push({ id: createId("el"), type: "arrow", kind: "breath" });
            }
          });
          row.elements = normalizedElements;
          return row;
        });
        return flow;
      });
      if ((block.videos || []).length && block.flows.length) {
        const [firstFlow] = block.flows;
        firstFlow.videos = [...(block.videos || []), ...(firstFlow.videos || [])];
        block.videos = [];
      }
    }
    if (block.type === "calloutGroup") {
      if (typeof block.contextText !== "string") {
        block.contextText = "";
      }
    }
    return block;
  }).filter(Boolean);

  return nextState;
}

function loadAdmin() {
  return localStorage.getItem(ADMIN_KEY) === "true";
}

function loadTheme() {
  const stored = localStorage.getItem(THEME_KEY) || state?.ui?.theme || "stanton";
  return resolveThemeName(stored);
}

function resolveThemeName(themeName) {
  const legacyMap = {
    default: "stanton",
    blue: "stanton",
    green: "grimhex",
    amber: "pyro",
    violet: "nyx",
  };
  const normalized = legacyMap[themeName] || themeName;
  return THEMES[normalized] ? normalized : "stanton";
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function applyTheme(themeName) {
  const theme = THEMES[themeName] || THEMES.stanton;
  Object.entries(theme.colors).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}

function setTheme(themeName) {
  activeTheme = THEMES[themeName] ? themeName : "stanton";
  localStorage.setItem(THEME_KEY, activeTheme);
  if (state.ui) {
    state.ui.theme = activeTheme;
  }
  applyTheme(activeTheme);
}

function renderThemeSelector() {
  if (!themeSelect) {
    return;
  }
  themeSelect.innerHTML = "";
  Object.entries(THEMES).forEach(([key, theme]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = theme.label;
    option.selected = key === activeTheme;
    themeSelect.appendChild(option);
  });
  themeSelect.onchange = () => {
    setTheme(themeSelect.value);
  };
}

function deepClone(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function updateAdminUI() {
  adminStatus.textContent = adminMode ? "Edit mode" : "Viewer mode";
  adminStatus.style.color = adminMode ? "var(--success)" : "var(--muted)";
  adminToggle.textContent = adminMode ? "Exit edit" : "Edit";
  document.body.classList.toggle("admin-active", adminMode);
  if (!adminMode) {
    editingBlocks = new Set();
  }
  render();
}

function updateScrollOffset() {
  const header = document.querySelector(".site-header");
  const offset = header ? header.offsetHeight + 12 : 180;
  document.documentElement.style.setProperty("--scroll-offset", `${offset}px`);
}

function toggleAdmin() {
  adminMode = !adminMode;
  localStorage.setItem(ADMIN_KEY, adminMode ? "true" : "false");
  updateAdminUI();
}

function toggleBlockEditing(blockId) {
  if (editingBlocks.has(blockId)) {
    editingBlocks.delete(blockId);
  } else {
    editingBlocks.add(blockId);
  }
  render();
}

function isBlockEditing(blockId) {
  return adminMode && editingBlocks.has(blockId);
}

function setExpanded(id, expanded) {
  if (expanded) {
    expandedIds.add(id);
  } else {
    expandedIds.delete(id);
  }
}

function getCalloutGroups() {
  return state.blocks.filter((block) => block.type === "calloutGroup");
}

function renderHeader() {
  headerContent.innerHTML = "";
  if (siteHeader) {
    if (state.header.backgroundSrc) {
      siteHeader.classList.add("has-bg");
      siteHeader.style.setProperty("--header-bg", `url('${state.header.backgroundSrc}')`);
    } else {
      siteHeader.classList.remove("has-bg");
      siteHeader.style.removeProperty("--header-bg");
    }
  }
  const brand = document.createElement("div");
  brand.className = "header-brand";

  if (state.header.logoSrc) {
    const logo = document.createElement("img");
    logo.className = "header-logo";
    logo.src = state.header.logoSrc;
    logo.alt = state.header.logoAlt || "Header logo";
    brand.appendChild(logo);
  }

  const wrapper = document.createElement("div");
  wrapper.className = "header-text";

  if (adminMode) {
    wrapper.appendChild(
      createInlineInput("eyebrow", state.header.eyebrow, (value) => {
        state.header.eyebrow = value;
      })
    );
    wrapper.appendChild(
      createInlineInput("title", state.header.title, (value) => {
        state.header.title = value;
      })
    );
    wrapper.appendChild(
      createInlineInput("subhead", state.header.subtitle, (value) => {
        state.header.subtitle = value;
      })
    );
    wrapper.appendChild(
      createInlineTextarea("intro", state.header.intro, (value) => {
        state.header.intro = value;
      })
    );

    const logoEditor = document.createElement("div");
    logoEditor.className = "header-logo-editor";
    const logoLabel = document.createElement("label");
    logoLabel.className = "eyebrow";
    logoLabel.textContent = "Header logo (URL or base64)";
    const logoInput = document.createElement("input");
    logoInput.type = "text";
    logoInput.className = "inline-input";
    logoInput.value = state.header.logoSrc || "";
    logoInput.placeholder = "data:image/... or https://";
    logoInput.addEventListener("input", () => {
      state.header.logoSrc = logoInput.value.trim();
      render();
    });
    const logoUploadLabel = document.createElement("label");
    logoUploadLabel.className = "btn btn-outline";
    logoUploadLabel.textContent = "Upload logo";
    logoUploadLabel.setAttribute("for", "headerLogoUpload");
    const logoUploadInput = document.createElement("input");
    logoUploadInput.type = "file";
    logoUploadInput.id = "headerLogoUpload";
    logoUploadInput.accept = "image/*";
    logoUploadInput.addEventListener("change", () => {
      const file = logoUploadInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          state.header.logoSrc = reader.result;
          render();
        };
        reader.readAsDataURL(file);
      }
      logoUploadInput.value = "";
    });
    const altInput = document.createElement("input");
    altInput.type = "text";
    altInput.className = "inline-input";
    altInput.value = state.header.logoAlt || "";
    altInput.placeholder = "Logo alt text";
    altInput.addEventListener("input", () => {
      state.header.logoAlt = altInput.value;
    });
    logoEditor.appendChild(logoLabel);
    logoEditor.appendChild(logoInput);
    logoEditor.appendChild(logoUploadLabel);
    logoEditor.appendChild(logoUploadInput);
    logoEditor.appendChild(altInput);
    wrapper.appendChild(logoEditor);
  } else {
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = state.header.eyebrow;

    const title = document.createElement("h1");
    title.textContent = state.header.title;

    const subhead = document.createElement("p");
    subhead.className = "subhead";
    subhead.textContent = state.header.subtitle;

    const intro = document.createElement("p");
    intro.className = "header-intro";
    intro.textContent = state.header.intro;

    wrapper.appendChild(eyebrow);
    wrapper.appendChild(title);
    wrapper.appendChild(subhead);
    wrapper.appendChild(intro);
  }

  brand.appendChild(wrapper);
  headerContent.appendChild(brand);

  renderHeaderAdminPanel();
  renderHeaderSocials();
}

function renderHeaderAdminPanel() {
  if (!headerAdminPanel) {
    return;
  }
  headerAdminPanel.innerHTML = "";
  if (!adminMode) {
    return;
  }

  const headerSection = document.createElement("div");
  headerSection.className = "admin-section";
  const headerTitle = document.createElement("div");
  headerTitle.className = "admin-section-title";
  headerTitle.textContent = "Header media";
  headerSection.appendChild(headerTitle);

  const bgRow = document.createElement("div");
  bgRow.className = "admin-row";
  const bgLabel = document.createElement("label");
  bgLabel.className = "eyebrow";
  bgLabel.textContent = "Header background";
  const bgUploadLabel = document.createElement("label");
  bgUploadLabel.className = "btn btn-outline";
  bgUploadLabel.textContent = "Upload background";
  bgUploadLabel.setAttribute("for", "headerBgUpload");
  const bgUploadInput = document.createElement("input");
  bgUploadInput.type = "file";
  bgUploadInput.id = "headerBgUpload";
  bgUploadInput.accept = "image/*";
  bgUploadInput.addEventListener("change", () => {
    const file = bgUploadInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state.header.backgroundSrc = reader.result;
        render();
      };
      reader.readAsDataURL(file);
    }
    bgUploadInput.value = "";
  });
  const bgClearBtn = document.createElement("button");
  bgClearBtn.className = "btn btn-ghost";
  bgClearBtn.type = "button";
  bgClearBtn.textContent = "Remove";
  bgClearBtn.addEventListener("click", () => {
    state.header.backgroundSrc = "";
    render();
  });
  const bgSize = document.createElement("span");
  bgSize.className = "admin-note";
  bgSize.textContent = `Recommended size: ${getHeaderSizeText()}`;
  bgRow.appendChild(bgLabel);
  bgRow.appendChild(bgUploadLabel);
  bgRow.appendChild(bgUploadInput);
  bgRow.appendChild(bgClearBtn);
  bgRow.appendChild(bgSize);
  headerSection.appendChild(bgRow);

  const socialsRow = document.createElement("div");
  socialsRow.className = "admin-row";
  const socialsTitle = document.createElement("span");
  socialsTitle.className = "admin-note";
  socialsTitle.textContent = "Header mini-icons";
  socialsRow.appendChild(socialsTitle);
  state.header.socialIcons.forEach((icon, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "admin-row";
    const uploadLabel = document.createElement("label");
    uploadLabel.className = "btn btn-outline";
    uploadLabel.textContent = `Upload icon ${index + 1}`;
    const uploadInput = document.createElement("input");
    uploadInput.type = "file";
    uploadInput.accept = "image/*";
    uploadInput.id = `headerIconUpload-${index}`;
    uploadLabel.setAttribute("for", uploadInput.id);
    uploadInput.addEventListener("change", () => {
      const file = uploadInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          state.header.socialIcons[index].src = reader.result;
          render();
        };
        reader.readAsDataURL(file);
      }
      uploadInput.value = "";
    });
    const urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.className = "panel-title-input";
    urlInput.placeholder = "https://";
    urlInput.value = icon.url || "";
    urlInput.addEventListener("input", () => {
      state.header.socialIcons[index].url = urlInput.value;
    });
    const clearBtn = document.createElement("button");
    clearBtn.className = "btn btn-ghost";
    clearBtn.type = "button";
    clearBtn.textContent = "Clear";
    clearBtn.addEventListener("click", () => {
      state.header.socialIcons[index] = { src: "", url: "" };
      render();
    });
    wrapper.appendChild(uploadLabel);
    wrapper.appendChild(uploadInput);
    wrapper.appendChild(urlInput);
    wrapper.appendChild(clearBtn);
    socialsRow.appendChild(wrapper);
  });
  headerSection.appendChild(socialsRow);

  const lockSection = document.createElement("div");
  lockSection.className = "admin-section";
  const lockTitle = document.createElement("div");
  lockTitle.className = "admin-section-title";
  lockTitle.textContent = "Role labels";
  lockSection.appendChild(lockTitle);

  const roleRow = document.createElement("div");
  roleRow.className = "admin-row";
  const roleTitle = document.createElement("span");
  roleTitle.className = "admin-note";
  roleTitle.textContent = "Role labels";
  roleRow.appendChild(roleTitle);
  ROLE_KEYS.forEach((role) => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = state.roleLabels[role] || "";
    input.placeholder = role;
    input.className = "panel-title-input";
    input.addEventListener("input", () => {
      state.roleLabels[role] = input.value;
      render();
    });
    roleRow.appendChild(input);
  });
  lockSection.appendChild(roleRow);

  const actionSection = document.createElement("div");
  actionSection.className = "admin-section";
  const actionTitle = document.createElement("div");
  actionTitle.className = "admin-section-title";
  actionTitle.textContent = "Project actions";
  actionSection.appendChild(actionTitle);

  const actionRow = document.createElement("div");
  actionRow.className = "admin-row";

  const saveBtn = document.createElement("button");
  saveBtn.className = "btn";
  saveBtn.type = "button";
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", () => {
    saveState();
  });

  const resetBtn = document.createElement("button");
  resetBtn.className = "btn btn-warning";
  resetBtn.type = "button";
  resetBtn.textContent = "Reset to default";
  resetBtn.addEventListener("click", () => {
    if (confirm("Reset all blocks, elements, and layout to default?")) {
      state = deepClone(DEFAULT_STATE);
      saveState();
      render();
    }
  });

  const exportBtn = document.createElement("button");
  exportBtn.className = "btn btn-outline";
  exportBtn.type = "button";
  exportBtn.textContent = "Export JSON";
  exportBtn.addEventListener("click", () => {
    handleExportJson();
  });

  const exportHtmlBtn = document.createElement("button");
  exportHtmlBtn.className = "btn btn-outline";
  exportHtmlBtn.type = "button";
  exportHtmlBtn.textContent = "Export final (viewer-only HTML)";
  exportHtmlBtn.addEventListener("click", () => {
    handleExportHtml();
  });

  const exportZipBtn = document.createElement("button");
  exportZipBtn.className = "btn btn-outline";
  exportZipBtn.type = "button";
  exportZipBtn.textContent = "Export project ZIP";
  exportZipBtn.addEventListener("click", () => {
    handleExportZip();
  });

  const importLabel = document.createElement("label");
  importLabel.className = "btn btn-outline";
  importLabel.textContent = "Import JSON";
  importLabel.setAttribute("for", "importData");

  const importInput = document.createElement("input");
  importInput.id = "importData";
  importInput.type = "file";
  importInput.accept = "application/json";
  importInput.addEventListener("change", () => {
    const file = importInput.files[0];
    if (file) {
      handleImport(file);
    }
    importInput.value = "";
  });

  actionRow.appendChild(saveBtn);
  actionRow.appendChild(resetBtn);
  actionRow.appendChild(exportBtn);
  actionRow.appendChild(importLabel);
  actionRow.appendChild(importInput);
  actionRow.appendChild(exportHtmlBtn);
  actionRow.appendChild(exportZipBtn);
  actionSection.appendChild(actionRow);

  const blockRow = document.createElement("div");
  blockRow.className = "admin-row";
  const addInfo = document.createElement("button");
  addInfo.className = "btn btn-outline";
  addInfo.type = "button";
  addInfo.textContent = "Add Information Box";
  addInfo.addEventListener("click", () => {
    state.blocks.push({
      id: createId("rules"),
      type: "rules",
      title: "Information Box",
      videos: [],
      sections: [{ id: createId("rules-section"), title: "New Information Sub-Box", subtitle: "", body: "", note: "" }],
    });
    render();
  });
  const addExample = document.createElement("button");
  addExample.className = "btn btn-outline";
  addExample.type = "button";
  addExample.textContent = "Add Example Box";
  addExample.addEventListener("click", () => {
    state.blocks.push({
      id: createId("flows"),
      type: "flows",
      title: "Example Box",
      videos: [],
      contextText: "",
      flows: [
        {
          id: createId("flow"),
          title: "New Example Sub-Box",
          exampleLabel: "Example",
          exampleTargetId: "",
          imageSrc: "",
          videos: [],
          rows: [],
        },
      ],
    });
    render();
  });
  const addStudy = document.createElement("button");
  addStudy.className = "btn btn-outline";
  addStudy.type = "button";
  addStudy.textContent = "Add Study Box";
  addStudy.addEventListener("click", () => {
    const newId = createId("group");
    const insertIndex = state.blocks.length;
    state.blocks.splice(insertIndex, 0, {
      id: newId,
      type: "calloutGroup",
      title: "New Study Box",
      videos: [],
    });
    render();
  });

  const addVideo = document.createElement("button");
  addVideo.className = "btn btn-outline";
  addVideo.type = "button";
  addVideo.textContent = "Add video block";
  addVideo.addEventListener("click", () => {
    state.blocks.push({
      id: createId("video"),
      type: "video",
      title: "Video",
      videos: [],
    });
    render();
  });

  blockRow.appendChild(addInfo);
  blockRow.appendChild(addExample);
  blockRow.appendChild(addStudy);
  blockRow.appendChild(addVideo);
  actionSection.appendChild(blockRow);

  const note = document.createElement("p");
  note.className = "admin-note";
  note.textContent = "Save writes to localStorage on this device. Export/Import lets you share edits as JSON.";
  actionSection.appendChild(note);

  headerAdminPanel.appendChild(headerSection);
  headerAdminPanel.appendChild(lockSection);
  headerAdminPanel.appendChild(actionSection);
}

function renderHeaderSocials() {
  if (!headerSocials) {
    return;
  }
  headerSocials.innerHTML = "";
  state.header.socialIcons.forEach((icon) => {
    if (!icon.src) {
      return;
    }
    const img = document.createElement("img");
    img.src = icon.src;
    img.alt = "Social icon";
    if (icon.url) {
      const link = document.createElement("a");
      link.href = icon.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.appendChild(img);
      headerSocials.appendChild(link);
    } else {
      const wrap = document.createElement("span");
      wrap.appendChild(img);
      headerSocials.appendChild(wrap);
    }
  });
}

function getHeaderSizeText() {
  if (!siteHeader) {
    return "1920 px x 480 px";
  }
  const width = Math.round(siteHeader.offsetWidth);
  const height = Math.round(siteHeader.offsetHeight);
  if (!width || !height) {
    return "1920 px x 480 px";
  }
  return `${width} px x ${height} px`;
}

function createInlineInput(kind, value, onChange) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = value || "";
  input.className = `inline-input ${kind}`;
  input.addEventListener("input", () => onChange(input.value));
  return input;
}

function createInlineTextarea(kind, value, onChange) {
  const textarea = document.createElement("textarea");
  textarea.value = value || "";
  textarea.className = `inline-input ${kind}`;
  textarea.rows = 2;
  textarea.addEventListener("input", () => onChange(textarea.value));
  return textarea;
}

function createImageUploadControl(labelText, onLoad, onClear, className = "") {
  const wrapper = document.createElement("div");
  wrapper.className = `image-upload${className ? ` ${className}` : ""}`;

  const uploadLabel = document.createElement("label");
  uploadLabel.className = "btn btn-outline btn-compact";
  uploadLabel.textContent = labelText;

  const uploadInput = document.createElement("input");
  uploadInput.type = "file";
  uploadInput.accept = "image/*";
  uploadInput.id = createId("image-upload");
  uploadLabel.setAttribute("for", uploadInput.id);
  uploadInput.addEventListener("change", () => {
    const file = uploadInput.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onLoad(reader.result);
    };
    reader.readAsDataURL(file);
    uploadInput.value = "";
  });

  wrapper.appendChild(uploadLabel);
  wrapper.appendChild(uploadInput);

  if (onClear) {
    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-ghost btn-compact";
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      onClear();
    });
    wrapper.appendChild(removeBtn);
  }

  return wrapper;
}

function renderFooter() {
  footerContent.innerHTML = "";
  if (!adminMode) {
    state.footer.lines.forEach((line) => {
      const p = document.createElement("p");
      p.className = "footer-line";
      p.textContent = line;
      footerContent.appendChild(p);
    });
    if (state.footer.note) {
      const note = document.createElement("p");
      note.className = "footer-note";
      note.textContent = state.footer.note;
      footerContent.appendChild(note);
    }
    return;
  }

  const editor = document.createElement("div");
  editor.className = "footer-editor";
  state.footer.lines.forEach((line, index) => {
    const row = document.createElement("div");
    row.className = "admin-row";
    const input = document.createElement("input");
    input.type = "text";
    input.value = line;
    input.addEventListener("input", () => {
      state.footer.lines[index] = input.value;
    });
    const remove = document.createElement("button");
    remove.className = "btn btn-ghost";
    remove.type = "button";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      state.footer.lines.splice(index, 1);
      render();
    });
    row.appendChild(input);
    row.appendChild(remove);
    editor.appendChild(row);
  });

  const add = document.createElement("button");
  add.className = "btn btn-outline";
  add.type = "button";
  add.textContent = "Add footer line";
  add.addEventListener("click", () => {
    state.footer.lines.push("");
    render();
  });
  editor.appendChild(add);

  const noteLabel = document.createElement("label");
  noteLabel.textContent = "Footer note";
  const note = document.createElement("textarea");
  note.value = state.footer.note;
  note.addEventListener("input", () => {
    state.footer.note = note.value;
  });
  editor.appendChild(noteLabel);
  editor.appendChild(note);

  footerContent.appendChild(editor);
}

function renderNav() {
  categoryNav.innerHTML = "";
  state.blocks.forEach((block) => {
    const link = document.createElement("a");
    link.href = `#${block.id}`;
    link.textContent = block.title || "Untitled block";
    categoryNav.appendChild(link);
  });
}

function render() {
  renderThemeSelector();
  renderHeader();
  renderFooter();
  renderNav();
  blocksContainer.innerHTML = "";

  state.blocks.forEach((block, index) => {
    if (block.type === "rules") {
      blocksContainer.appendChild(renderRulesBlock(block, index));
      return;
    }
    if (block.type === "flows") {
      blocksContainer.appendChild(renderFlowsBlock(block, index));
      return;
    }
    if (block.type === "calloutGroup") {
      blocksContainer.appendChild(renderCalloutGroupBlock(block, index));
      return;
    }
    if (block.type === "video") {
      blocksContainer.appendChild(renderVideoBlock(block, index));
      return;
    }
  });

  updateScrollOffset();
}

function renderRulesBlock(block, index) {
  const section = document.createElement("section");
  section.className = "panel";
  section.id = block.id;
  section.dataset.title = block.title || "Information Box";
  const editing = isBlockEditing(block.id);

  const header = document.createElement("div");
  header.className = "panel-header";
  header.appendChild(renderBlockTitle(block, "h2", editing));
  header.appendChild(renderBlockActions(block, index, editing));
  section.appendChild(header);

  const body = document.createElement("div");
  body.className = "panel-body rules-grid";

  block.sections.forEach((rulesSection, sectionIndex) => {
    const card = document.createElement("div");
    card.className = "rule-card";

    if (editing) {
      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = rulesSection.title;
      titleInput.className = "panel-title-input";
      titleInput.addEventListener("input", () => {
        rulesSection.title = titleInput.value;
      });
      card.appendChild(titleInput);

      const subtitleLabel = document.createElement("label");
      subtitleLabel.className = "eyebrow";
      subtitleLabel.textContent = "Subtitle";
      const subtitleInput = document.createElement("textarea");
      subtitleInput.value = rulesSection.subtitle || "";
      subtitleInput.placeholder = "Subtitle";
      subtitleInput.addEventListener("input", () => {
        rulesSection.subtitle = subtitleInput.value;
      });
      card.appendChild(subtitleLabel);
      card.appendChild(subtitleInput);

      const bodyLabel = document.createElement("label");
      bodyLabel.className = "eyebrow";
      bodyLabel.textContent = "Body text";
      const bodyInput = document.createElement("textarea");
      bodyInput.value = rulesSection.body || "";
      bodyInput.placeholder = "Body text";
      bodyInput.addEventListener("input", () => {
        rulesSection.body = bodyInput.value;
      });
      card.appendChild(bodyLabel);
      card.appendChild(bodyInput);

      const noteLabel = document.createElement("label");
      noteLabel.className = "eyebrow";
      noteLabel.textContent = "Note box";
      const noteInput = document.createElement("textarea");
      noteInput.value = rulesSection.note || "";
      noteInput.placeholder = "Optional note box";
      noteInput.addEventListener("input", () => {
        rulesSection.note = noteInput.value;
      });
      card.appendChild(noteLabel);
      card.appendChild(noteInput);
    } else {
      const title = document.createElement("h3");
      title.textContent = rulesSection.title;
      card.appendChild(title);
      if (rulesSection.subtitle) {
        const subtitle = document.createElement("p");
        subtitle.className = "rule-subtitle";
        subtitle.textContent = rulesSection.subtitle;
        card.appendChild(subtitle);
      }

      const bodyText = document.createElement("div");
      bodyText.className = "rule-body";
      const paragraphs = String(rulesSection.body || "")
        .split("\n")
        .map((entry) => entry.trim())
        .filter(Boolean);
      if (!paragraphs.length) {
        const placeholder = document.createElement("p");
        placeholder.textContent = "—";
        bodyText.appendChild(placeholder);
      } else {
        paragraphs.forEach((entry) => {
          const p = document.createElement("p");
          p.textContent = entry;
          bodyText.appendChild(p);
        });
      }
      card.appendChild(bodyText);

      if (rulesSection.note) {
        const noteBox = document.createElement("div");
        noteBox.className = "note-box";
        noteBox.textContent = rulesSection.note;
        card.appendChild(noteBox);
      }
    }

    if (editing) {
      const actions = document.createElement("div");
      actions.className = "admin-row";
      const removeSection = document.createElement("button");
      removeSection.className = "btn btn-danger";
      removeSection.type = "button";
      removeSection.textContent = "Delete Information Sub-Box";
      removeSection.addEventListener("click", () => {
        block.sections.splice(sectionIndex, 1);
        render();
      });
      actions.appendChild(removeSection);
      card.appendChild(actions);
    }

    body.appendChild(card);
  });

  if (editing) {
    const addSection = document.createElement("button");
    addSection.className = "btn btn-outline";
    addSection.type = "button";
    addSection.textContent = "Add Sub-Box";
    addSection.addEventListener("click", () => {
      block.sections.push({
        id: createId("rules-section"),
        title: "New Information Sub-Box",
        subtitle: "",
        body: "",
        note: "",
      });
      render();
    });
    body.appendChild(addSection);
  }

  section.appendChild(body);
  const videos = renderVideoSection(block, { panelPadding: true, editable: editing });
  if (videos) {
    section.appendChild(videos);
  }
  return section;
}

function renderFlowsBlock(block, index) {
  const section = document.createElement("section");
  section.className = "panel";
  section.id = block.id;
  section.dataset.title = block.title || "Example Box";
  const editing = isBlockEditing(block.id);

  const header = document.createElement("div");
  header.className = "panel-header";
  header.appendChild(renderBlockTitle(block, "h2", editing));
  if (editing) {
    const contextInput = document.createElement("input");
    contextInput.type = "text";
    contextInput.value = block.contextText || "";
    contextInput.placeholder = "Add a short note for this block";
    contextInput.className = "panel-context-input";
    contextInput.addEventListener("input", () => {
      block.contextText = contextInput.value;
    });
    header.appendChild(contextInput);
  } else if (block.contextText) {
    const context = document.createElement("div");
    context.className = "block-context";
    context.textContent = block.contextText;
    header.appendChild(context);
  }
  header.appendChild(renderBlockActions(block, index, editing));
  section.appendChild(header);

  const body = document.createElement("div");
  body.className = "panel-body flow-grid";

  block.flows.forEach((flow, flowIndex) => {
    const hasRows = (flow.rows || []).some((row) => !isFlowRowEmpty(row));
    const hasMedia = Boolean(flow.imageSrc || (flow.videos || []).length);
    const hasExample = Boolean(flow.exampleTargetId);
    const hasTitle = Boolean(flow.title);
    if (!editing && !hasRows && !hasMedia && !hasExample && !hasTitle) {
      return;
    }
    const card = document.createElement("div");
    card.className = "flow-card";
    const content = document.createElement("div");
    content.className = "flow-content";

    if (editing) {
      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = flow.title;
      titleInput.className = "panel-title-input";
      titleInput.addEventListener("input", () => {
        flow.title = titleInput.value;
      });
      content.appendChild(titleInput);
    } else {
      const title = document.createElement("h3");
      title.textContent = flow.title;
      content.appendChild(title);
    }

    flow.rows.forEach((row, rowIndex) => {
      const rowNode = renderFlowRow(flow, row, rowIndex, editing);
      if (rowNode) {
        content.appendChild(rowNode);
      }
    });

    if (editing) {
      const flowActions = document.createElement("div");
      flowActions.className = "admin-row";

      const addRow = document.createElement("button");
      addRow.className = "btn btn-outline";
      addRow.type = "button";
      addRow.textContent = "Add Example Row";
      addRow.addEventListener("click", () => {
        flow.rows.push({
          id: createId("flow-row"),
          rowTitle: "",
          rowContext: "",
          elements: [],
        });
        render();
      });

      const removeFlow = document.createElement("button");
      removeFlow.className = "btn btn-danger";
      removeFlow.type = "button";
      removeFlow.textContent = "Delete Example Sub-Box";
      removeFlow.addEventListener("click", () => {
        block.flows.splice(flowIndex, 1);
        render();
      });

      const moveLeft = document.createElement("button");
      moveLeft.className = "btn btn-ghost";
      moveLeft.type = "button";
      moveLeft.textContent = "←";
      moveLeft.title = "Move sub-box left";
      moveLeft.addEventListener("click", () => {
        moveItem(block.flows, flowIndex, -1);
      });
      const moveRight = document.createElement("button");
      moveRight.className = "btn btn-ghost";
      moveRight.type = "button";
      moveRight.textContent = "→";
      moveRight.title = "Move sub-box right";
      moveRight.addEventListener("click", () => {
        moveItem(block.flows, flowIndex, 1);
      });
      flowActions.classList.add("flow-subbox-actions");
      flowActions.appendChild(addRow);
      flowActions.appendChild(moveLeft);
      flowActions.appendChild(moveRight);
      flowActions.appendChild(removeFlow);
      content.appendChild(flowActions);
    }

    const exampleRow = document.createElement("div");
    exampleRow.className = "flow-example-row";
    if (editing) {
      const labelInput = document.createElement("input");
      labelInput.type = "text";
      labelInput.value = flow.exampleLabel || "Example";
      labelInput.placeholder = "Example button label";
      labelInput.className = "panel-title-input";
      labelInput.addEventListener("input", () => {
        flow.exampleLabel = labelInput.value;
      });
      const targetSelect = document.createElement("select");
      const videoTargets = getVideoTargets();
      const emptyOption = document.createElement("option");
      emptyOption.value = "";
      emptyOption.textContent = "Select target video";
      targetSelect.appendChild(emptyOption);
      videoTargets.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.label;
        option.selected = item.id === flow.exampleTargetId;
        targetSelect.appendChild(option);
      });
      if (flow.exampleTargetId && !videoTargets.some((item) => item.id === flow.exampleTargetId)) {
        const legacyOption = document.createElement("option");
        legacyOption.value = flow.exampleTargetId;
        legacyOption.textContent = getLegacyTargetLabel(flow.exampleTargetId);
        legacyOption.selected = true;
        targetSelect.appendChild(legacyOption);
      }
      targetSelect.addEventListener("change", () => {
        flow.exampleTargetId = targetSelect.value;
      });
      exampleRow.appendChild(labelInput);
      exampleRow.appendChild(targetSelect);
    } else if (flow.exampleTargetId) {
      const link = document.createElement("a");
      link.className = "btn btn-ghost";
      link.href = `#${flow.exampleTargetId}`;
      link.textContent = flow.exampleLabel || "Example";
      exampleRow.appendChild(link);
    }
    if (exampleRow.childNodes.length) {
      content.appendChild(exampleRow);
    }

    const flowVideos = renderVideoSection(flow, {
      panelPadding: false,
      editable: editing,
      maxVideos: 1,
      singleColumn: true,
      fullWidth: true,
    });
    const flowImage = renderFlowImage(flow, editing);
    const mediaWrap = document.createElement("div");
    mediaWrap.className = "flow-media";
    if (flowImage) {
      mediaWrap.appendChild(flowImage);
    }
    if (flowVideos) {
      mediaWrap.appendChild(flowVideos);
    }

    card.appendChild(content);
    if (mediaWrap.childNodes.length) {
      card.appendChild(mediaWrap);
    }

    body.appendChild(card);
  });

  if (editing) {
    const addFlow = document.createElement("button");
    addFlow.className = "btn btn-outline";
    addFlow.type = "button";
    addFlow.textContent = "Add Sub-Box";
    addFlow.addEventListener("click", () => {
      block.flows.push({
        id: createId("flow"),
        title: "New Example Sub-Box",
        exampleLabel: "Example",
        exampleTargetId: "",
        imageSrc: "",
        videos: [],
        rows: [],
      });
      render();
    });
    body.appendChild(addFlow);
  }

  section.appendChild(body);
  return section;
}

function renderVideoBlock(block, index) {
  const section = document.createElement("section");
  section.className = "panel";
  section.id = block.id;
  section.dataset.title = block.title || "Video";
  const editing = isBlockEditing(block.id);

  const header = document.createElement("div");
  header.className = "panel-header";
  header.appendChild(renderBlockTitle(block, "h2", editing));
  header.appendChild(renderBlockActions(block, index, editing));
  section.appendChild(header);

  const videos = renderVideoSection(block, { showEmpty: !adminMode, panelPadding: true, editable: editing });
  if (videos) {
    section.appendChild(videos);
  }
  return section;
}

function isFlowRowEmpty(row) {
  const hasMeta = Boolean(row.rowTitle || row.rowContext);
  const hasElements = Array.isArray(row.elements) && row.elements.length > 0;
  return !hasMeta && !hasElements;
}

function renderFlowImage(flow, editable) {
  if (!editable && !flow.imageSrc) {
    return null;
  }
  const wrap = document.createElement("div");
  wrap.className = "flow-media-item";
  if (flow.imageSrc) {
    const image = document.createElement("img");
    image.className = "flow-image";
    image.src = flow.imageSrc;
    image.alt = flow.title ? `${flow.title} image` : "Example image";
    wrap.appendChild(image);
  }
  if (editable) {
    const controls = createImageUploadControl(
      flow.imageSrc ? "Replace image" : "Upload image",
      (src) => {
        flow.imageSrc = src;
        render();
      },
      flow.imageSrc
        ? () => {
            flow.imageSrc = "";
            render();
          }
        : null,
      "flow-image-controls"
    );
    wrap.appendChild(controls);
  }
  return wrap;
}

function renderFlowRow(flow, row, rowIndex, editing) {
  if (!editing && isFlowRowEmpty(row)) {
    return null;
  }
  const wrapper = document.createElement("div");
  wrapper.className = "flow-row-block";

  if (row.rowTitle || row.rowContext || editing) {
    const meta = document.createElement("div");
    meta.className = "flow-row-meta";
    if (editing) {
      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = row.rowTitle || "";
      titleInput.placeholder = "Example Row title";
      titleInput.className = "panel-title-input";
      titleInput.addEventListener("input", () => {
        row.rowTitle = titleInput.value;
      });
      const exampleInput = document.createElement("input");
      exampleInput.type = "text";
      exampleInput.value = row.rowContext || "";
      exampleInput.placeholder = "Example Row context";
      exampleInput.className = "panel-title-input";
      exampleInput.addEventListener("input", () => {
        row.rowContext = exampleInput.value;
      });
      meta.appendChild(titleInput);
      meta.appendChild(exampleInput);
    } else {
      if (row.rowTitle) {
        const title = document.createElement("div");
        title.className = "flow-row-title";
        title.textContent = row.rowTitle;
        meta.appendChild(title);
      }
      if (row.rowContext) {
        const example = document.createElement("div");
        example.className = "flow-row-example";
        example.textContent = row.rowContext;
        meta.appendChild(example);
      }
    }
    wrapper.appendChild(meta);
  }

  const rowEl = document.createElement("div");
  rowEl.className = "flow-row";
  row.elements.forEach((element, elementIndex) => {
    if (element.type === "node") {
      const nodeWrap = document.createElement("div");
      nodeWrap.className = "flow-node-wrap";
      const label = document.createElement("div");
      label.className = "flow-role-label";
      label.textContent = state.roleLabels[element.role] || "Role";
      const node = document.createElement("span");
      const roleClass =
        element.role === "shotCaller" ? "role-shot" : element.role === "enemyTarget" ? "role-enemy" : "role-yourself";
      node.className = `flow-node ${roleClass}`;
      const nodeStyles = getNodeStyles(element);
      if (nodeStyles) {
        node.style.cssText = nodeStyles;
      }
      node.textContent = element.text;
      nodeWrap.appendChild(label);
      nodeWrap.appendChild(node);
      rowEl.appendChild(nodeWrap);
      const next = row.elements[elementIndex + 1];
      if (next && next.type === "node") {
        const arrow = document.createElement("span");
        arrow.className = "flow-arrow";
        arrow.textContent = "→";
        rowEl.appendChild(arrow);
      }
    } else if (element.type === "arrow") {
      const arrow = document.createElement("span");
      arrow.className = element.kind === "time" ? "flow-arrow arrow-time" : "flow-arrow";
      arrow.textContent = element.kind === "time" ? "⏱→" : "→";
      rowEl.appendChild(arrow);
    } else if (element.type === "divider") {
      const divider = document.createElement("span");
      divider.className = "flow-divider";
      divider.textContent = element.text;
      rowEl.appendChild(divider);
    } else if (element.type === "note") {
      const note = document.createElement("span");
      note.className = "flow-note";
      note.textContent = element.text;
      rowEl.appendChild(note);
    }
  });
  wrapper.appendChild(rowEl);

  if (!editing) {
    return wrapper;
  }

  const editor = document.createElement("div");
  editor.className = "flow-editor";
  const editorPanel = document.createElement("details");
  editorPanel.className = "flow-editor-panel";
  const summary = document.createElement("summary");
  summary.textContent = "Edit Example Row";
  editorPanel.appendChild(summary);
  const rowGroup = document.createElement("div");
  rowGroup.className = "flow-editor-row";

  row.elements.forEach((element, elementIndex) => {
    const item = document.createElement("div");
    item.className = "flow-editor-item";

    const typeSelect = document.createElement("select");
    ["node", "arrow", "divider", "note"].forEach((type) => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      option.selected = type === element.type;
      typeSelect.appendChild(option);
    });
    typeSelect.addEventListener("change", () => {
      element.type = typeSelect.value;
      if (element.type === "arrow") {
        element.kind = element.kind || "breath";
      }
      if (element.type !== "node") {
        delete element.role;
        delete element.color;
      }
      render();
    });

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = element.text || "";
    textInput.disabled = element.type === "arrow";
    textInput.placeholder = element.type === "arrow" ? "Arrow" : "Text";
    textInput.addEventListener("input", () => {
      element.text = textInput.value;
    });

    let extraControl = document.createElement("span");
    if (element.type === "node") {
      const roleSelect = document.createElement("select");
      ROLE_KEYS.forEach((role) => {
        const option = document.createElement("option");
        option.value = role;
        option.textContent = state.roleLabels[role] || role;
        option.selected = role === (element.role || "yourself");
        roleSelect.appendChild(option);
      });
      roleSelect.addEventListener("change", () => {
        element.role = roleSelect.value;
        render();
      });
      const colorInput = document.createElement("input");
      colorInput.type = "color";
      colorInput.value = element.color || getRoleDefaultColor(element.role);
      colorInput.addEventListener("input", () => {
        element.color = colorInput.value;
        render();
      });
      colorInput.addEventListener("change", () => {
        element.color = colorInput.value;
        render();
      });
      const nodeControls = document.createElement("div");
      nodeControls.className = "flow-node-controls";
      nodeControls.appendChild(roleSelect);
      nodeControls.appendChild(colorInput);
      extraControl = nodeControls;
    }
    if (element.type === "arrow") {
      const arrowSelect = document.createElement("select");
      [
        { value: "breath", label: "Arrow A (short breath)" },
        { value: "time", label: "Arrow B (time passed)" },
      ].forEach((choice) => {
        const option = document.createElement("option");
        option.value = choice.value;
        option.textContent = choice.label;
        option.selected = choice.value === (element.kind || "breath");
        arrowSelect.appendChild(option);
      });
      arrowSelect.addEventListener("change", () => {
        element.kind = arrowSelect.value;
        render();
      });
      extraControl = arrowSelect;
    }

    const controls = document.createElement("div");
    controls.className = "block-actions";
    const moveUp = document.createElement("button");
    moveUp.className = "btn btn-ghost";
    moveUp.type = "button";
    moveUp.textContent = "↑";
    moveUp.addEventListener("click", () => {
      moveItem(row.elements, elementIndex, -1);
    });
    const moveDown = document.createElement("button");
    moveDown.className = "btn btn-ghost";
    moveDown.type = "button";
    moveDown.textContent = "↓";
    moveDown.addEventListener("click", () => {
      moveItem(row.elements, elementIndex, 1);
    });
    const remove = document.createElement("button");
    remove.className = "btn btn-danger";
    remove.type = "button";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => {
      row.elements.splice(elementIndex, 1);
      render();
    });
    controls.appendChild(moveUp);
    controls.appendChild(moveDown);
    controls.appendChild(remove);

    item.appendChild(typeSelect);
    item.appendChild(textInput);
    item.appendChild(extraControl);
    item.appendChild(controls);
    rowGroup.appendChild(item);
  });

  editorPanel.appendChild(rowGroup);

  const rowActions = document.createElement("div");
  rowActions.className = "flow-editor-actions";
  const addNode = document.createElement("button");
  addNode.className = "btn btn-outline";
  addNode.type = "button";
  addNode.textContent = "Add node";
  addNode.addEventListener("click", () => {
    row.elements.push({ id: createId("el"), type: "node", text: "", role: "yourself", emphasis: false });
    render();
  });
  const addDivider = document.createElement("button");
  addDivider.className = "btn btn-outline";
  addDivider.type = "button";
  addDivider.textContent = "Add divider";
  addDivider.addEventListener("click", () => {
    row.elements.push({ id: createId("el"), type: "divider", text: "or" });
    render();
  });
  const addArrowA = document.createElement("button");
  addArrowA.className = "btn btn-outline";
  addArrowA.type = "button";
  addArrowA.textContent = "Add arrow A";
  addArrowA.addEventListener("click", () => {
    row.elements.push({ id: createId("el"), type: "arrow", kind: "breath" });
    render();
  });
  const addArrowB = document.createElement("button");
  addArrowB.className = "btn btn-outline";
  addArrowB.type = "button";
  addArrowB.textContent = "Add arrow B";
  addArrowB.addEventListener("click", () => {
    row.elements.push({ id: createId("el"), type: "arrow", kind: "time" });
    render();
  });
  const addNote = document.createElement("button");
  addNote.className = "btn btn-outline";
  addNote.type = "button";
  addNote.textContent = "Add note";
  addNote.addEventListener("click", () => {
    row.elements.push({ id: createId("el"), type: "note", text: "" });
    render();
  });
  const removeRow = document.createElement("button");
  removeRow.className = "btn btn-danger";
  removeRow.type = "button";
  removeRow.textContent = "Delete Example Row";
  removeRow.addEventListener("click", () => {
    flow.rows.splice(rowIndex, 1);
    render();
  });
  rowActions.appendChild(addNode);
  rowActions.appendChild(addArrowA);
  rowActions.appendChild(addArrowB);
  rowActions.appendChild(addDivider);
  rowActions.appendChild(addNote);
  rowActions.appendChild(removeRow);
  editorPanel.appendChild(rowActions);
  editor.appendChild(editorPanel);

  wrapper.appendChild(editor);
  return wrapper;
}

function renderCalloutGroupBlock(block, index) {
  const section = document.createElement("section");
  section.className = "category-section callout-group-card";
  section.id = block.id;
  section.dataset.title = block.title || "Study Box";
  const editing = isBlockEditing(block.id);

  const header = document.createElement("div");
  header.className = "category-header";

  const titleWrap = document.createElement("div");
  titleWrap.className = "block-title-wrap";
  if (editing) {
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = block.title;
    titleInput.className = "panel-title-input";
    titleInput.addEventListener("input", () => {
      block.title = titleInput.value;
      renderNav();
    });
    const contextInput = document.createElement("input");
    contextInput.type = "text";
    contextInput.value = block.contextText || "";
    contextInput.placeholder = "Add group context";
    contextInput.className = "panel-context-input";
    contextInput.addEventListener("input", () => {
      block.contextText = contextInput.value;
    });
    titleWrap.appendChild(titleInput);
    titleWrap.appendChild(contextInput);
  } else {
    const title = document.createElement("h2");
    title.textContent = block.title;
    titleWrap.appendChild(title);
    if (block.contextText) {
      const context = document.createElement("span");
      context.className = "block-context";
      context.textContent = block.contextText;
      titleWrap.appendChild(context);
    }
  }
  header.appendChild(titleWrap);

  const actionWrap = document.createElement("div");
  actionWrap.className = "callout-group-actions";

  if (editing) {
    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-outline";
    addBtn.type = "button";
    addBtn.textContent = "Add Element";
    addBtn.addEventListener("click", () => {
      state.callouts.push(createBlankCall(block.id));
      render();
    });
    actionWrap.appendChild(addBtn);
  }

  actionWrap.appendChild(renderBlockActions(block, index, editing));
  header.appendChild(actionWrap);
  section.appendChild(header);

  const groupCallouts = state.callouts.filter((callout) => callout.groupId === block.id);

  if (!groupCallouts.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No elements in this sub-box yet.";
    section.appendChild(empty);
    return section;
  }

  groupCallouts.forEach((item) => {
    section.appendChild(renderCalloutCard(item, { editable: editing }));
  });

  const videos = renderVideoSection(block, { panelPadding: false, editable: editing });
  if (videos) {
    section.appendChild(videos);
  }

  return section;
}

function renderBlockTitle(block, tag, editing = false) {
  if (!adminMode || !editing) {
    const heading = document.createElement(tag);
    heading.textContent = block.title;
    return heading;
  }
  const input = document.createElement("input");
  input.type = "text";
  input.value = block.title;
  input.className = "panel-title-input";
  input.addEventListener("input", () => {
    block.title = input.value;
    renderNav();
  });
  return input;
}

function renderBlockActions(block, index, editing = false) {
  const actions = document.createElement("div");
  actions.className = "block-actions";
  if (!adminMode) {
    return actions;
  }

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-ghost";
  editBtn.type = "button";
  editBtn.textContent = editing ? "Done" : "Edit";
  editBtn.title = "Toggle block editing";
  editBtn.addEventListener("click", () => {
    toggleBlockEditing(block.id);
  });

  const moveUp = document.createElement("button");
  moveUp.className = "btn btn-ghost";
  moveUp.type = "button";
  moveUp.textContent = "↑";
  moveUp.title = "Move block up";
  moveUp.addEventListener("click", () => {
    moveItem(state.blocks, index, -1);
  });

  const moveDown = document.createElement("button");
  moveDown.className = "btn btn-ghost";
  moveDown.type = "button";
  moveDown.textContent = "↓";
  moveDown.title = "Move block down";
  moveDown.addEventListener("click", () => {
    moveItem(state.blocks, index, 1);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger";
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete block";
  deleteBtn.addEventListener("click", () => {
    if (block.type === "calloutGroup") {
      if (!confirm("Delete this Study Box and all its elements?")) {
        return;
      }
      state.callouts = state.callouts.filter((callout) => callout.groupId !== block.id);
    }
    state.blocks.splice(index, 1);
    render();
  });

  actions.appendChild(editBtn);
  actions.appendChild(moveUp);
  actions.appendChild(moveDown);
  actions.appendChild(deleteBtn);
  return actions;
}

function renderCalloutCard(item, options = {}) {
  const editable = Boolean(options.editable);
  const card = document.createElement("div");
  card.className = "callout-card";
  const cardId = `${item.groupId}-${item.callName}`;
  card.dataset.cardId = cardId;

  if (expandedIds.has(cardId)) {
    card.classList.add("expanded");
  }

  const header = document.createElement("div");
  header.className = "callout-header";
  header.addEventListener("click", () => {
    const expanded = !card.classList.contains("expanded");
    card.classList.toggle("expanded", expanded);
    setExpanded(cardId, expanded);
  });

  const title = document.createElement("div");
  title.className = "callout-title";
  const chevron = document.createElement("span");
  chevron.className = "chevron";
  chevron.textContent = "▸";
  const name = document.createElement("span");
  name.textContent = item.callName;
  title.appendChild(chevron);
  title.appendChild(name);

  const actions = document.createElement("div");
  actions.className = "callout-actions";

  if (editable) {
    const upBtn = document.createElement("button");
    upBtn.className = "btn btn-ghost";
    upBtn.type = "button";
    upBtn.textContent = "↑";
    upBtn.title = "Move up";
    upBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      moveWithinGroup(item, -1);
    });
    const downBtn = document.createElement("button");
    downBtn.className = "btn btn-ghost";
    downBtn.type = "button";
    downBtn.textContent = "↓";
    downBtn.title = "Move down";
    downBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      moveWithinGroup(item, 1);
    });
    actions.appendChild(upBtn);
    actions.appendChild(downBtn);
  }

  header.appendChild(title);
  header.appendChild(actions);

  const body = document.createElement("div");
  body.className = "callout-body";

  if (editable) {
    body.appendChild(
    renderField("Element name", item.callName, (value) => {
        const previousId = card.dataset.cardId;
        item.callName = value;
        name.textContent = value || "New Element";
        const nextId = `${item.groupId}-${item.callName}`;
        card.dataset.cardId = nextId;
        if (previousId && expandedIds.has(previousId)) {
          expandedIds.delete(previousId);
          expandedIds.add(nextId);
        }
      }, {
        type: "text",
        editable: editable,
        className: "span-two",
      })
    );
  }

  body.appendChild(
    renderField("Context", item.context, (value) => {
      item.context = value;
    }, {
      type: "textarea",
      editable: editable,
      className: "half",
    })
  );

  body.appendChild(renderWhenField(item, editable));

  body.appendChild(
    renderField("Meaning", item.meaning, (value) => {
      item.meaning = value;
    }, {
      type: "textarea",
      editable: editable,
      className: "half",
    })
  );

  const groups = getCalloutGroups();
  body.appendChild(
    renderSelect(
      "Sub-Box",
      item.groupId,
      groups.map((group) => ({ label: group.title, value: group.id })),
      (value) => {
        item.groupId = value;
        render();
      },
      {
        editable: editable,
        className: "half",
      }
    )
  );

  body.appendChild(
    renderField("Expected Outcome", item.responseExpected, (value) => {
      item.responseExpected = value;
    }, {
      type: "text",
      editable: editable,
      className: "span-two",
    })
  );

  if (editable) {
    body.appendChild(
      renderField("Important note", item.importantNote, (value) => {
        item.importantNote = value;
      }, {
        type: "textarea",
        editable: editable,
        className: "span-two",
      })
    );
  } else if (item.importantNote) {
    const noteBox = document.createElement("div");
    noteBox.className = "callout-note-box span-two";
    noteBox.textContent = item.importantNote;
    body.appendChild(noteBox);
  }

  const calloutVideos = renderVideoSection(item, { panelPadding: false, editable: editable, inCallout: true });
  if (calloutVideos) {
    calloutVideos.classList.add("span-two");
    body.appendChild(calloutVideos);
  }

  const calloutMedia = renderCalloutImage(item, editable);
  if (calloutMedia) {
    body.classList.add("has-media");
    body.appendChild(calloutMedia);
  }

  body.appendChild(
    renderField("Notes", item.notes, (value) => {
      item.notes = value;
    }, {
      type: "textarea",
      editable: editable,
      className: "span-two",
    })
  );

  if (editable) {
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger span-two";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete Element";
    deleteBtn.addEventListener("click", () => {
      state.callouts = state.callouts.filter((call) => call !== item);
      render();
    });
    body.appendChild(deleteBtn);
  }

  card.appendChild(header);
  card.appendChild(body);
  return card;
}

function renderCalloutImage(item, editable) {
  if (!editable && !item.imageSrc) {
    return null;
  }
  const media = document.createElement("div");
  media.className = "callout-media";
  if (item.imageSrc) {
    const image = document.createElement("img");
    image.className = "callout-image";
    image.src = item.imageSrc;
    image.alt = item.callName ? `${item.callName} image` : "Element image";
    media.appendChild(image);
  }
  if (editable) {
    const controls = createImageUploadControl(
      item.imageSrc ? "Replace image" : "Upload image",
      (src) => {
        item.imageSrc = src;
        render();
      },
      item.imageSrc
        ? () => {
            item.imageSrc = "";
            render();
          }
        : null,
      "callout-image-controls"
    );
    media.appendChild(controls);
  }
  return media;
}

function renderField(labelText, value, onChange, options) {
  const field = document.createElement("div");
  field.className = `field${options.className ? ` ${options.className}` : ""}`;
  const label = document.createElement("label");
  label.textContent = labelText;
  field.appendChild(label);

  if (!options.editable) {
    const display = document.createElement("div");
    display.className = "readonly";
    if (options.multilineDisplay) {
      display.innerHTML = formatMultilineHtml(value);
    } else {
      display.textContent = value || "–";
    }
    field.appendChild(display);
    return field;
  }

  const control = options.type === "textarea" ? document.createElement("textarea") : document.createElement("input");
  control.type = options.type === "text" ? "text" : undefined;
  control.value = value || "";
  control.addEventListener("input", () => onChange(control.value));
  field.appendChild(control);
  return field;
}

function renderSelect(labelText, value, optionsList, onChange, options) {
  const field = document.createElement("div");
  field.className = `field${options.className ? ` ${options.className}` : ""}`;
  const label = document.createElement("label");
  label.textContent = labelText;
  field.appendChild(label);

  const resolvedValue = optionsList.some((option) => option.value === value) ? value : "";

  if (!options.editable) {
    const display = document.createElement("div");
    display.className = "readonly";
    display.textContent = optionsList.find((option) => option.value === value)?.label || "–";
    field.appendChild(display);
    return field;
  }

  const select = document.createElement("select");
  optionsList.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.value;
    opt.textContent = option.label;
    opt.selected = option.value === resolvedValue;
    select.appendChild(opt);
  });
  select.addEventListener("change", () => onChange(select.value));
  field.appendChild(select);
  return field;
}

function renderWhenField(item, editable) {
  return renderField(
    "When to use",
    item.whenToUse,
    (value) => {
      item.whenToUse = value;
    },
    {
      type: "textarea",
      editable: editable,
      className: "half",
      multilineDisplay: true,
    }
  );
}

function renderVideoSection(block, options = {}) {
  const videos = block.videos || [];
  const hasVideos = videos.length > 0;
  const editable = Boolean(options.editable);
  const maxVideos = Number.isFinite(options.maxVideos) ? options.maxVideos : Infinity;
  const canAdd = editable && videos.length < maxVideos;
  if (!editable && !hasVideos && !options.showEmpty) {
    return null;
  }

  const section = document.createElement("div");
  section.className = `block-videos${options.panelPadding ? " panel-body" : ""}${
    options.inCallout ? " callout-videos" : ""
  }${options.fullWidth ? " video-full" : ""}`;

  if (canAdd) {
    const controls = document.createElement("div");
    controls.className = "video-controls";

    const urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.placeholder = "Paste YouTube link";

    const addYoutube = document.createElement("button");
    addYoutube.className = "btn btn-outline";
    addYoutube.type = "button";
    addYoutube.textContent = "Add YouTube";
    addYoutube.addEventListener("click", () => {
      const value = urlInput.value.trim();
      if (!value) {
        return;
      }
      if (!Array.isArray(block.videos)) {
        block.videos = [];
      }
      block.videos.push({ id: createId("video"), type: "youtube", src: value, title: "" });
      urlInput.value = "";
      render();
    });

    const uploadLabel = document.createElement("label");
    uploadLabel.className = "btn btn-outline";
    uploadLabel.textContent = "Upload video";
    const uploadInput = document.createElement("input");
    uploadInput.type = "file";
    uploadInput.accept = "video/*";
    uploadInput.id = createId("video-upload");
    uploadLabel.setAttribute("for", uploadInput.id);
    uploadInput.addEventListener("change", () => {
      const file = uploadInput.files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (!Array.isArray(block.videos)) {
          block.videos = [];
        }
        block.videos.push({ id: createId("video"), type: "local", src: reader.result, title: "" });
        render();
      };
      reader.readAsDataURL(file);
      uploadInput.value = "";
    });

    controls.appendChild(urlInput);
    controls.appendChild(addYoutube);
    controls.appendChild(uploadLabel);
    controls.appendChild(uploadInput);
    section.appendChild(controls);
  }

  if (!hasVideos && !adminMode && options.showEmpty) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No video added yet.";
    section.appendChild(empty);
    return section;
  }

  if (hasVideos) {
    const grid = document.createElement("div");
    const singleColumn = options.singleColumn || videos.length === 1;
    grid.className = `video-grid${singleColumn ? " single" : ""}`;
    videos.forEach((video, index) => {
      const card = document.createElement("div");
      card.className = "video-card";
      card.id = getVideoAnchorId(video);
      if (editable) {
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = video.title || "";
        titleInput.placeholder = "Video title";
        titleInput.className = "video-title-input";
        titleInput.addEventListener("input", () => {
          video.title = titleInput.value;
        });
        card.appendChild(titleInput);
      } else if (video.title) {
        const title = document.createElement("div");
        title.className = "video-title";
        title.textContent = video.title;
        card.appendChild(title);
      }
      if (video.type === "youtube") {
        const embedUrl = getYouTubeEmbedUrl(video.src || "");
        if (embedUrl) {
          const frame = document.createElement("iframe");
          frame.className = "youtube-frame";
          frame.src = embedUrl;
          frame.allowFullscreen = true;
          card.appendChild(frame);
        } else {
          const fallback = document.createElement("div");
          fallback.className = "empty-state";
          fallback.textContent = "Invalid YouTube link.";
          card.appendChild(fallback);
        }
      } else if (video.type === "local") {
        const videoEl = document.createElement("video");
        videoEl.className = "local-video";
        videoEl.src = video.src;
        videoEl.controls = true;
        card.appendChild(videoEl);
      }

      if (editable) {
        const removeBtn = document.createElement("button");
        removeBtn.className = "btn btn-danger";
        removeBtn.type = "button";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
          block.videos.splice(index, 1);
          render();
        });
        card.appendChild(removeBtn);
      }

      grid.appendChild(card);
    });
    section.appendChild(grid);
  }

  return section;
}

function getVideoAnchorId(video) {
  return `video-${video.id}`;
}

function getVideoTargets() {
  const targets = [];
  state.blocks.forEach((block) => {
    const videos = block.videos || [];
    videos.forEach((video, index) => {
      const title = video.title || `Video ${index + 1}`;
      targets.push({
        id: getVideoAnchorId(video),
        label: `${block.title || "Video"} — ${title}`,
      });
    });
    if (block.type === "flows") {
      (block.flows || []).forEach((flow) => {
        const flowVideos = flow.videos || [];
        flowVideos.forEach((video, index) => {
          const title = video.title || `Video ${index + 1}`;
          targets.push({
            id: getVideoAnchorId(video),
            label: `${flow.title || "Sub-Box"} — ${title}`,
          });
        });
      });
    }
  });
  state.callouts.forEach((callout) => {
    const videos = callout.videos || [];
    videos.forEach((video, index) => {
      const title = video.title || `Video ${index + 1}`;
      targets.push({
        id: getVideoAnchorId(video),
        label: `${callout.callName || "Element"} — ${title}`,
      });
    });
  });
  return targets;
}

function getLegacyTargetLabel(targetId) {
  const block = state.blocks.find((item) => item.id === targetId);
  if (block) {
    return `Legacy block — ${block.title || "Untitled"}`;
  }
  return `Legacy target — ${targetId}`;
}

function createBlankCall(groupId) {
  return {
    id: createId("callout"),
    callName: "New Element",
    groupId,
    context: "",
    meaning: "",
    whenToUse: "",
    responseExpected: "",
    notes: "",
    importantNote: "",
    imageSrc: "",
    videos: [],
  };
}

function moveWithinGroup(item, direction) {
  const groupItems = state.callouts.filter((call) => call.groupId === item.groupId);
  const indexInGroup = groupItems.indexOf(item);
  const newIndex = indexInGroup + direction;
  if (newIndex < 0 || newIndex >= groupItems.length) {
    return;
  }
  const originalIndex = state.callouts.indexOf(item);
  const swapItem = groupItems[newIndex];
  const swapIndex = state.callouts.indexOf(swapItem);
  [state.callouts[originalIndex], state.callouts[swapIndex]] = [state.callouts[swapIndex], state.callouts[originalIndex]];
  render();
}

function moveItem(list, index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= list.length) {
    return;
  }
  [list[index], list[newIndex]] = [list[newIndex], list[index]];
  render();
}

function handleExportJson() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "scscp-state.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function handleExportHtml() {
  const styles = await getStylesheetText();
  const html = buildViewerHtml(state, styles);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "scscp-viewer.html";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function handleExportZip() {
  const [styles, script] = await Promise.all([getStylesheetText(), getScriptText()]);
  const indexHtml = buildExportIndexHtml(state);
  const readme = buildExportReadme(state);
  const files = [
    { name: "index.html", content: indexHtml },
    { name: "styles.css", content: styles },
    { name: "app.js", content: script },
    { name: "README.md", content: readme },
  ];
  const zipBlob = createZipBlob(files);
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "scscp-project.zip";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function buildViewerHtml(sourceState, styles) {
  const logoHtml = sourceState.header.logoSrc
    ? `<img class="header-logo" src="${escapeHtml(sourceState.header.logoSrc)}" alt="${escapeHtml(sourceState.header.logoAlt || "Header logo")}" />`
    : "";
  const headerClass = sourceState.header.backgroundSrc ? "site-header has-bg" : "site-header";
  const headerStyle = sourceState.header.backgroundSrc
    ? ` style="--header-bg: url('${escapeHtml(sourceState.header.backgroundSrc)}');"`
    : "";
  const themeOptions = buildThemeOptions(sourceState.ui?.theme || "stanton");
  const socialIcons = (sourceState.header.socialIcons || [])
    .filter((icon) => icon?.src)
    .map((icon) => {
      const iconImg = `<img src="${escapeHtml(icon.src)}" alt="Social icon" />`;
      return icon.url
        ? `<a href="${escapeHtml(icon.url)}" target="_blank" rel="noopener noreferrer">${iconImg}</a>`
        : `<span>${iconImg}</span>`;
    })
    .join("");
  const headerHtml = `
      <div class="header-main">
        <div class="header-brand">
          ${logoHtml}
          <div class="header-text">
            <p class="eyebrow">${escapeHtml(sourceState.header.eyebrow)}</p>
            <h1>${escapeHtml(sourceState.header.title)}</h1>
            <p class="subhead">${escapeHtml(sourceState.header.subtitle)}</p>
            <p class="header-intro">${escapeHtml(sourceState.header.intro)}</p>
          </div>
        </div>
        <div class="header-controls">
          <div class="header-actions">
            <div class="theme-control">
              <label for="themeSelect">Theme</label>
              <select id="themeSelect">
                ${themeOptions}
              </select>
            </div>
            <div class="status-pill">Viewer mode</div>
          </div>
        </div>
      </div>
      <div class="header-socials">${socialIcons}</div>
      <nav class="category-nav" id="categoryNav"></nav>
  `;

  const blocksHtml = sourceState.blocks
    .map((block) => buildViewerBlock(block, sourceState))
    .filter(Boolean)
    .join("\n");

  const footerHtml = `
      ${sourceState.footer.lines.map((line) => `<p class="footer-line">${escapeHtml(line)}</p>`).join("\n")}
      ${sourceState.footer.note ? `<p class="footer-note">${escapeHtml(sourceState.footer.note)}</p>` : ""}
  `;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(sourceState.header.title)}</title>
    <style>${styles}</style>
  </head>
  <body>
    <header class="${headerClass}"${headerStyle}>
      ${headerHtml}
    </header>
    <main>
      ${blocksHtml}
    </main>
    <footer class="site-footer">
      ${footerHtml}
    </footer>
    <script>
      const THEME_KEY = '${THEME_KEY}';
      const THEMES = ${JSON.stringify(Object.fromEntries(Object.entries(THEMES).map(([key, value]) => [key, value.colors])))};
      const themeSelect = document.getElementById('themeSelect');

      function applyTheme(themeName) {
        const theme = THEMES[themeName] || THEMES.stanton;
        Object.entries(theme).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value);
        });
      }

      function setTheme(themeName) {
        const next = THEMES[themeName] ? themeName : 'stanton';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
        if (themeSelect) {
          themeSelect.value = next;
        }
      }

      const savedTheme = localStorage.getItem(THEME_KEY) || '${escapeHtml(sourceState.ui?.theme || "stanton")}';
      applyTheme(savedTheme);
      if (themeSelect) {
        themeSelect.value = savedTheme;
        themeSelect.addEventListener('change', (event) => {
          setTheme(event.target.value);
        });
      }

      const categoryNav = document.getElementById('categoryNav');

      const cards = Array.from(document.querySelectorAll('.callout-card'));

      function buildNav() {
        categoryNav.innerHTML = '';
        document.querySelectorAll('section[data-title]').forEach((section) => {
          const title = section.dataset.title;
          const link = document.createElement('a');
          link.href = '#' + section.id;
          link.textContent = title;
          categoryNav.appendChild(link);
        });
      }

      cards.forEach((card) => {
        const header = card.querySelector('.callout-header');
        header.addEventListener('click', () => {
          card.classList.toggle('expanded');
        });
      });

      buildNav();
      function updateScrollOffset() {
        const header = document.querySelector('.site-header');
        if (header) {
          document.documentElement.style.setProperty('--scroll-offset', (header.offsetHeight + 12) + 'px');
        }
      }
      updateScrollOffset();
      window.addEventListener('resize', updateScrollOffset);
    </script>
  </body>
</html>`;
}

function buildThemeOptions(active) {
  return Object.entries(THEMES)
    .map(([key, theme]) => {
      const selected = key === active ? " selected" : "";
      return `<option value="${escapeHtml(key)}"${selected}>${escapeHtml(theme.label)}</option>`;
    })
    .join("");
}

function buildExportIndexHtml(sourceState) {
  const exportedState = {
    ...sourceState,
    ui: {
      ...(sourceState.ui || {}),
      theme: activeTheme,
    },
  };
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(exportedState.header.title)}</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="site-header">
      <div class="header-main">
        <div id="headerContent"></div>
        <div class="header-controls">
          <div class="header-actions">
            <div class="theme-control">
              <label for="themeSelect">Theme</label>
              <select id="themeSelect"></select>
            </div>
            <button id="adminToggle" class="btn btn-outline" type="button">Edit</button>
            <div class="status-pill" id="adminStatus">Viewer mode</div>
          </div>
          <div id="headerAdminPanel" class="header-admin-panel"></div>
        </div>
      </div>
      <div id="headerSocials" class="header-socials"></div>
      <nav class="category-nav" id="categoryNav"></nav>
    </header>

    <main id="blocksContainer"></main>

    <footer class="site-footer">
      <div id="footerContent"></div>
    </footer>

    <script>
      window.__EXPORTED_STATE__ = ${JSON.stringify(exportedState)};
    </script>
    <script src="app.js"></script>
  </body>
</html>`;
}

function buildExportReadme(sourceState) {
  return `# Space Combat Communication Protocol Template

## Overview
- \`index.html\`: Page layout and entry point. Includes a small script that injects the exported state before loading \`app.js\`.
- \`styles.css\`: Theme, layout, and component styling (dark, card-based UI).
- \`app.js\`: Application logic, rendering, admin tools, and localStorage persistence.

## Data model (stored in localStorage)
The state is serialized under \`${STORAGE_KEY}\` as JSON. Key areas:
- \`header\`: eyebrow/title/subtitle/intro, logo, background image, and three social icons.
- \`ui\`: current theme name.
- \`roleLabels\`: labels used in Example Box nodes.
- \`blocks\`: ordered list of Information Boxes, Example Boxes, Study Boxes, and video blocks.
- \`callouts\`: Elements that belong to Study Boxes via \`groupId\`.

## How to customize
1. Open \`index.html\` in a browser.
2. Click **Edit** to reveal the header admin panel.
3. Adjust content, add/remove boxes, and upload media (stored as base64 in localStorage).
4. Click **Save** to persist edits locally.

## Extending
- Add new blocks by using the header admin panel buttons.
- Edit theme colors in \`app.js\` under \`THEMES\`.
- Adjust layout tokens in \`styles.css\` (spacing, borders) if needed.

## Notes
- Uploads are base64-encoded for offline use.
- The exported state is embedded in \`index.html\` via \`window.__EXPORTED_STATE__\` to make this ZIP immediately runnable.`;
}

function createZipBlob(files) {
  const encoder = new TextEncoder();
  const fileRecords = [];
  let offset = 0;

  files.forEach((file) => {
    const data = typeof file.content === "string" ? encoder.encode(file.content) : file.content;
    const nameBytes = encoder.encode(file.name);
    const crc = crc32(data);
    const localHeader = new Uint8Array(30 + nameBytes.length);
    const view = new DataView(localHeader.buffer);
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, 0, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, data.length, true);
    view.setUint32(22, data.length, true);
    view.setUint16(26, nameBytes.length, true);
    view.setUint16(28, 0, true);
    localHeader.set(nameBytes, 30);

    const localChunk = new Uint8Array(localHeader.length + data.length);
    localChunk.set(localHeader, 0);
    localChunk.set(data, localHeader.length);

    fileRecords.push({
      nameBytes,
      crc,
      dataLength: data.length,
      localOffset: offset,
      localChunk,
    });
    offset += localChunk.length;
  });

  const centralChunks = [];
  let centralSize = 0;
  fileRecords.forEach((record) => {
    const centralHeader = new Uint8Array(46 + record.nameBytes.length);
    const view = new DataView(centralHeader.buffer);
    view.setUint32(0, 0x02014b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 20, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, 0, true);
    view.setUint16(14, 0, true);
    view.setUint32(16, record.crc, true);
    view.setUint32(20, record.dataLength, true);
    view.setUint32(24, record.dataLength, true);
    view.setUint16(28, record.nameBytes.length, true);
    view.setUint16(30, 0, true);
    view.setUint16(32, 0, true);
    view.setUint16(34, 0, true);
    view.setUint16(36, 0, true);
    view.setUint32(38, 0, true);
    view.setUint32(42, record.localOffset, true);
    centralHeader.set(record.nameBytes, 46);
    centralChunks.push(centralHeader);
    centralSize += centralHeader.length;
  });

  const endRecord = new Uint8Array(22);
  const endView = new DataView(endRecord.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(4, 0, true);
  endView.setUint16(6, 0, true);
  endView.setUint16(8, fileRecords.length, true);
  endView.setUint16(10, fileRecords.length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, offset, true);
  endView.setUint16(20, 0, true);

  const chunks = [...fileRecords.map((record) => record.localChunk), ...centralChunks, endRecord];
  return new Blob(chunks, { type: "application/zip" });
}

function crc32(data) {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i += 1) {
    crc ^= data[i];
    for (let j = 0; j < 8; j += 1) {
      const mask = -(crc & 1);
      crc = (crc >>> 1) ^ (0xedb88320 & mask);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

async function fetchTextFromUrl(url) {
  if (!url) {
    return "";
  }
  try {
    const response = await fetch(url, { cache: "no-cache" });
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    console.warn("Unable to fetch resource", error);
  }
  return await new Promise((resolve) => {
    try {
      const request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.onload = () => resolve(request.responseText || "");
      request.onerror = () => resolve("");
      request.send();
    } catch (error) {
      console.warn("Unable to read resource", error);
      resolve("");
    }
  });
}

async function getStylesheetText() {
  const stylesheet = document.querySelector('link[rel="stylesheet"]');
  const href = stylesheet?.getAttribute("href") || stylesheet?.href;
  if (href) {
    const resolved = new URL(href, window.location.href).toString();
    const fetched = await fetchTextFromUrl(resolved);
    if (fetched) {
      return fetched;
    }
  }
  let cssText = "";
  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      if (sheet.cssRules) {
        Array.from(sheet.cssRules).forEach((rule) => {
          cssText += `${rule.cssText}\n`;
        });
      }
    } catch (error) {
      console.warn("Unable to read stylesheet", error);
    }
  });
  return cssText;
}

async function getScriptText() {
  const scriptTag = document.querySelector('script[src$="app.js"]');
  const src = scriptTag?.getAttribute("src") || scriptTag?.src;
  if (!src) {
    return "";
  }
  const resolved = new URL(src, window.location.href).toString();
  return await fetchTextFromUrl(resolved);
}

function buildViewerBlock(block, sourceState) {
  if (block.type === "rules") {
    return `
      <section class="panel" id="${block.id}" data-title="${escapeHtml(block.title || "Information Box")}">
        <div class="panel-header">
          <h2>${escapeHtml(block.title)}</h2>
        </div>
        <div class="panel-body rules-grid">
          ${block.sections
            .map(
              (section) => `
            <div class="rule-card">
              <h3>${escapeHtml(section.title)}</h3>
              ${section.subtitle ? `<p class="rule-subtitle">${escapeHtml(section.subtitle)}</p>` : ""}
              <div class="rule-body">
                ${buildParagraphs(section.body)}
              </div>
              ${section.note ? `<div class="note-box">${escapeHtml(section.note)}</div>` : ""}
            </div>
          `
            )
            .join("")}
        </div>
        ${buildBlockVideosHtml(block)}
      </section>
    `;
  }

  if (block.type === "flows") {
    const flowCards = (block.flows || [])
      .map((flow) => {
        const hasRows = (flow.rows || []).some((row) => row.rowTitle || row.rowContext || (row.elements || []).length);
        const hasMedia = Boolean(flow.imageSrc || (flow.videos || []).length);
        const hasExample = Boolean(flow.exampleTargetId);
        const hasTitle = Boolean(flow.title);
        if (!hasRows && !hasMedia && !hasExample && !hasTitle) {
          return "";
        }
        const flowImage = flow.imageSrc
          ? `<div class="flow-media-item"><img class="flow-image" src="${escapeHtml(flow.imageSrc)}" alt="${escapeHtml(flow.title ? `${flow.title} image` : "Example image")}" /></div>`
          : "";
        const flowVideos = buildInlineVideosHtml(flow, { panelPadding: false, singleColumn: true, fullWidth: true });
        const flowMedia = flowImage || flowVideos ? `<div class="flow-media">${flowImage}${flowVideos}</div>` : "";
        return `
          <div class="flow-card">
            <div class="flow-content">
              <h3>${escapeHtml(flow.title)}</h3>
              ${flow.rows
                .map((row) => {
                  if (!row.rowTitle && !row.rowContext && !(row.elements || []).length) {
                    return "";
                  }
                  return `
                    <div class="flow-row-block">
                      ${row.rowTitle || row.rowContext ? `<div class="flow-row-meta">
                      ${row.rowTitle ? `<div class="flow-row-title">${escapeHtml(row.rowTitle)}</div>` : ""}
                      ${row.rowContext ? `<div class="flow-row-example">${escapeHtml(row.rowContext)}</div>` : ""}
                      </div>` : ""}
                      <div class="flow-row">
                      ${row.elements
                        .map((element, index) => {
                          if (element.type === "node") {
                            const roleClass =
                              element.role === "shotCaller" ? "role-shot" : element.role === "enemyTarget" ? "role-enemy" : "role-yourself";
                            const label = sourceState.roleLabels?.[element.role] || "Role";
                            const inlineStyles = getNodeStyles(element);
                            const next = row.elements[index + 1];
                            const autoArrow =
                              next && next.type === "node" ? '<span class="flow-arrow">→</span>' : "";
                            return `
                              <div class="flow-node-wrap">
                                <div class="flow-role-label">${escapeHtml(label)}</div>
                                <span class="flow-node ${roleClass}"${inlineStyles ? ` style="${inlineStyles}"` : ""}>${escapeHtml(element.text)}</span>
                              </div>
                            ${autoArrow}`;
                          }
                          if (element.type === "arrow") {
                            const arrowClass = element.kind === "time" ? "flow-arrow arrow-time" : "flow-arrow";
                            const arrowGlyph = element.kind === "time" ? "⏱→" : "→";
                            return `<span class="${arrowClass}">${arrowGlyph}</span>`;
                          }
                          if (element.type === "divider") {
                            return `<span class="flow-divider">${escapeHtml(element.text)}</span>`;
                          }
                          if (element.type === "note") {
                            return `<span class="flow-note">${escapeHtml(element.text)}</span>`;
                          }
                          return "";
                        })
                        .join("")}
                      </div>
                    </div>
                  `;
                })
                .join("")}
              ${flow.exampleTargetId ? `<a class="btn btn-ghost flow-example" href="#${escapeHtml(flow.exampleTargetId)}">${escapeHtml(flow.exampleLabel || "Example")}</a>` : ""}
            </div>
            ${flowMedia}
          </div>
        `;
      })
      .join("");
    return `
      <section class="panel" id="${block.id}" data-title="${escapeHtml(block.title || "Example Box")}">
        <div class="panel-header">
          <h2>${escapeHtml(block.title)}</h2>
          ${block.contextText ? `<div class="block-context">${escapeHtml(block.contextText)}</div>` : ""}
        </div>
        <div class="panel-body flow-grid">
          ${flowCards}
        </div>
      </section>
    `;
  }

  if (block.type === "calloutGroup") {
    const groupCallouts = sourceState.callouts.filter((callout) => callout.groupId === block.id);
    const cards = groupCallouts
      .map((callout) => {
        const calloutVideos = buildInlineVideosHtml(callout, { panelPadding: false, inCallout: true });
        const calloutImage = callout.imageSrc
          ? `<div class="callout-media"><img class="callout-image" src="${escapeHtml(callout.imageSrc)}" alt="${escapeHtml(callout.callName ? `${callout.callName} image` : "Element image")}" /></div>`
          : "";
        const bodyClass = calloutImage ? "callout-body has-media" : "callout-body";
        return `
          <div class="callout-card">
            <div class="callout-header">
              <div class="callout-title">
                <span class="chevron">▸</span>
                <span>${escapeHtml(callout.callName)}</span>
              </div>
            </div>
            <div class="${bodyClass}">
              ${viewerField("Context", callout.context, "half")}
              ${viewerFieldMultiline("When to use", callout.whenToUse, "half")}
              ${viewerField("Meaning", callout.meaning, "half")}
              ${viewerField("Sub-Box", block.title, "half")}
              ${viewerField("Expected Outcome", callout.responseExpected, "span-two")}
              ${callout.importantNote ? `<div class="callout-note-box span-two">${escapeHtml(callout.importantNote)}</div>` : ""}
              ${calloutVideos ? `<div class="span-two">${calloutVideos}</div>` : ""}
              ${viewerField("Notes", callout.notes, "span-two")}
              ${calloutImage}
            </div>
          </div>
        `;
      })
      .join("");

    return `
      <section class="category-section callout-group-card" id="${block.id}" data-title="${escapeHtml(block.title || "Study Box")}">
        <div class="category-header">
          <div class="block-title-wrap">
            <h2>${escapeHtml(block.title)}</h2>
            ${block.contextText ? `<span class="block-context">${escapeHtml(block.contextText)}</span>` : ""}
          </div>
        </div>
        ${cards || '<div class="empty-state">No elements in this sub-box yet.</div>'}
        ${buildBlockVideosHtml(block, { panelPadding: false })}
      </section>
    `;
  }

  if (block.type === "video") {
    return `
      <section class="panel" id="${block.id}" data-title="${escapeHtml(block.title || "Video")}">
        <div class="panel-header">
          <h2>${escapeHtml(block.title || "Video")}</h2>
        </div>
        ${buildBlockVideosHtml(block, { showEmpty: true })}
      </section>
    `;
  }

  return "";
}

function buildParagraphs(value) {
  return String(value || "")
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => `<p>${escapeHtml(entry)}</p>`)
    .join("");
}

function buildBlockVideosHtml(block, options = {}) {
  return buildInlineVideosHtml(block, options);
}

function buildInlineVideosHtml(target, options = {}) {
  const videos = target.videos || [];
  const panelClass = options.panelPadding === false ? "" : " panel-body";
  const contextClass = options.inCallout ? " callout-videos" : "";
  const fullWidthClass = options.fullWidth ? " video-full" : "";
  if (!videos.length && !options.showEmpty) {
    return "";
  }
  if (!videos.length && options.showEmpty) {
    return `<div class="block-videos${panelClass}${contextClass}${fullWidthClass}"><div class="empty-state">No video added yet.</div></div>`;
  }
  const gridClass = options.singleColumn || videos.length === 1 ? "video-grid single" : "video-grid";
  const items = videos
    .map((video) => {
      const title = video.title ? `<div class="video-title">${escapeHtml(video.title)}</div>` : "";
      const anchorId = getVideoAnchorId(video);
      if (video.type === "youtube") {
        const embedUrl = getYouTubeEmbedUrl(video.src || "");
        return embedUrl
          ? `<div class="video-card" id="${escapeHtml(anchorId)}">${title}<iframe class="youtube-frame" src="${escapeHtml(embedUrl)}" allowfullscreen></iframe></div>`
          : `<div class="video-card" id="${escapeHtml(anchorId)}">${title}<div class="empty-state">Invalid YouTube link.</div></div>`;
      }
      if (video.type === "local") {
        return `<div class="video-card" id="${escapeHtml(anchorId)}">${title}<video class="local-video" src="${escapeHtml(video.src)}" controls></video></div>`;
      }
      return "";
    })
    .join("");
  return `<div class="block-videos${panelClass}${contextClass}${fullWidthClass}"><div class="${gridClass}">${items}</div></div>`;
}

function getYouTubeEmbedUrl(url) {
  if (!url) {
    return "";
  }
  const trimmed = url.trim();
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  const longMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/);
  const id = (shortMatch && shortMatch[1]) || (longMatch && longMatch[1]) || (embedMatch && embedMatch[1]);
  return id ? `https://www.youtube.com/embed/${id}` : "";
}

function getRoleDefaultColor(role) {
  if (role === "shotCaller") {
    return "#9e62ff";
  }
  if (role === "enemyTarget") {
    return "#ff6b6b";
  }
  return "#4cc3ff";
}

function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  if (value.length !== 6) {
    return hex;
  }
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getNodeStyles(element) {
  if (!element || !element.color) {
    return "";
  }
  const color = element.color;
  return `border-color: ${color}; background-color: ${hexToRgba(color, 0.18)};`;
}

function viewerField(label, value, className = "") {
  return `
    <div class="field${className ? ` ${className}` : ""}">
      <label>${escapeHtml(label)}</label>
      <div class="readonly">${escapeHtml(value || "–")}</div>
    </div>
  `;
}

function viewerFieldMultiline(label, value, className = "") {
  return `
    <div class="field${className ? ` ${className}` : ""}">
      <label>${escapeHtml(label)}</label>
      <div class="readonly">${formatMultilineHtml(value)}</div>
    </div>
  `;
}

function formatMultilineHtml(value) {
  const lines = String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) {
    return "–";
  }
  return lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("");
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function handleImport(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (Array.isArray(parsed)) {
        state = normalizeState(migrateLegacyCallouts(parsed));
      } else if (parsed && typeof parsed === "object" && Array.isArray(parsed.blocks)) {
        state = normalizeState(parsed);
      } else {
        throw new Error("Invalid JSON format");
      }
      render();
    } catch (error) {
      alert("Import failed. Ensure the JSON is a valid editor export.");
      console.error(error);
    }
  };
  reader.readAsText(file);
}

adminToggle.addEventListener("click", () => {
  toggleAdmin();
});

window.addEventListener("resize", () => {
  updateScrollOffset();
});

setTheme(activeTheme);
updateAdminUI();
render();
