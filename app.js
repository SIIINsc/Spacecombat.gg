/* Admin lock: local-only convenience toggle (no password). */

const STORAGE_KEY = "scscp_state";
const ADMIN_KEY = "scscp_admin";
const NAME_EDIT_KEY = "scscp_name_edit";

const DEFAULT_STATE = {
  header: {
    eyebrow: "Star Citizen",
    title: "Space Combat Communication Protocol",
    subtitle: "Concise, standardized call-outs for fast, precise coordination.",
    intro: "Doctrine-grade phrasing for tight, unambiguous team coordination.",
  },
  footer: {
    lines: ["How to run: open index.html directly in a browser."],
    note: "Viewer/Admin lock is convenience-only because this is a static offline site.",
  },
  blocks: [
    {
      id: "rules-block",
      type: "rules",
      title: "Rules of Use",
      sections: [
        {
          id: "rules-core",
          title: "Core Rules",
          items: [
            "One call = one state.",
            "No narration.",
            "Silence is correct.",
            "Same breath rule (3–5 seconds).",
            "Same breath → name optional.",
            "Time passes → name required.",
            "Category change → name required.",
            "Personal state uses speaker name; shared truth never uses speaker name.",
          ],
        },
        {
          id: "rules-critical",
          title: "Critical Definitions",
          items: [
            "Remove “Push” entirely (it does not exist).",
            "Regroup on: re-center on anchor, can remain engaged or re-engage quickly.",
            "Reset: disengage and reset fight state (break contact).",
            "Red (PERSONAL): critical health, not necessarily about to die, can be safe but fragile.",
          ],
        },
      ],
    },
    {
      id: "flows-block",
      type: "flows",
      title: "Flow Diagrams",
      flows: [
        {
          id: "flow-target",
          title: "Target Cycle",
          rows: [
            {
              id: "flow-target-row-1",
              elements: [
                { id: "el-1", type: "node", text: "Target", emphasis: false },
                { id: "el-2", type: "node", text: "Looking / Seen", emphasis: false },
                { id: "el-3", type: "node", text: "Merging", emphasis: false },
              ],
            },
            {
              id: "flow-target-row-2",
              elements: [
                { id: "el-4", type: "node", text: "Effective / Not effective", emphasis: false },
                { id: "el-5", type: "node", text: "Red (TARGET)", emphasis: false },
                { id: "el-6", type: "node", text: "Splash", emphasis: false },
                { id: "el-7", type: "divider", text: "or" },
                { id: "el-8", type: "node", text: "Target out", emphasis: false },
              ],
            },
            {
              id: "flow-target-row-3",
              elements: [{ id: "el-9", type: "node", text: "New Target", emphasis: false }],
            },
          ],
        },
        {
          id: "flow-regroup",
          title: "Regroup Cycle",
          rows: [
            {
              id: "flow-regroup-row-1",
              elements: [
                { id: "el-10", type: "node", text: "Regroup on", emphasis: false },
                { id: "el-11", type: "node", text: "Distance (optional)", emphasis: false },
                { id: "el-12", type: "node", text: "Ready", emphasis: false },
              ],
            },
          ],
        },
        {
          id: "flow-threat",
          title: "Threat Interrupt",
          rows: [
            {
              id: "flow-threat-row-1",
              elements: [
                { id: "el-13", type: "node", text: "Aggro", emphasis: false },
                { id: "el-14", type: "node", text: "Evasive", emphasis: false },
                { id: "el-15", type: "node", text: "Low boost", emphasis: false },
                { id: "el-16", type: "node", text: "Clear", emphasis: false },
              ],
            },
            {
              id: "flow-threat-row-2",
              elements: [
                { id: "el-17", type: "node", text: "Red (PERSONAL)", emphasis: true },
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
    { id: "group-distance", type: "calloutGroup", title: "DISTANCE SCALE" },
    { id: "group-effectiveness", type: "calloutGroup", title: "ENGAGEMENT EFFECTIVENESS" },
    { id: "group-target-status", type: "calloutGroup", title: "TARGET STATUS (SHARED TRUTH)" },
    { id: "group-kill", type: "calloutGroup", title: "KILL / DEATH" },
    { id: "admin-tools", type: "adminTools", title: "Admin Tools" },
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
      id: "call-five-clicks",
      callName: "Five clicks",
      groupId: "group-distance",
      context: "Distance scale reference.",
      meaning: "Approx. five clicks.",
      whenToUse: ["Distance call"],
      responseExpected: "Adjust geometry if needed.",
      notes: "Consistent scale reference.",
    },
    {
      id: "call-three-clicks",
      callName: "Three clicks",
      groupId: "group-distance",
      context: "Distance scale reference.",
      meaning: "Approx. three clicks.",
      whenToUse: ["Distance call"],
      responseExpected: "Adjust geometry if needed.",
      notes: "Consistent scale reference.",
    },
    {
      id: "call-two-clicks",
      callName: "Two clicks",
      groupId: "group-distance",
      context: "Distance scale reference.",
      meaning: "Approx. two clicks.",
      whenToUse: ["Distance call"],
      responseExpected: "Adjust geometry if needed.",
      notes: "Consistent scale reference.",
    },
    {
      id: "call-one-click",
      callName: "One click",
      groupId: "group-distance",
      context: "Distance scale reference.",
      meaning: "Approx. one click.",
      whenToUse: ["Distance call"],
      responseExpected: "Adjust geometry if needed.",
      notes: "Consistent scale reference.",
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

let state = loadState();
let adminMode = loadAdmin();
let allowNameEdit = loadNameEdit();
let expandedIds = new Set();

const headerContent = document.getElementById("headerContent");
const footerContent = document.getElementById("footerContent");
const categoryNav = document.getElementById("categoryNav");
const blocksContainer = document.getElementById("blocksContainer");
const adminToggle = document.getElementById("adminToggle");
const adminStatus = document.getElementById("adminStatus");
const addBlockBtn = document.getElementById("addBlock");
const searchInput = document.getElementById("searchInput");
const expandAllBtn = document.getElementById("expandAll");
const collapseAllBtn = document.getElementById("collapseAll");

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return structuredClone(DEFAULT_STATE);
  }
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return migrateLegacyCallouts(parsed);
    }
    if (parsed && typeof parsed === "object" && Array.isArray(parsed.blocks)) {
      return parsed;
    }
  } catch (error) {
    console.warn("Failed to parse stored data", error);
  }
  return structuredClone(DEFAULT_STATE);
}

function migrateLegacyCallouts(callouts) {
  const nextState = structuredClone(DEFAULT_STATE);
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

function loadAdmin() {
  return localStorage.getItem(ADMIN_KEY) === "true";
}

function loadNameEdit() {
  return localStorage.getItem(NAME_EDIT_KEY) === "true";
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function updateAdminUI() {
  adminStatus.textContent = adminMode ? "Admin unlocked" : "Viewer mode";
  adminStatus.style.color = adminMode ? "var(--success)" : "var(--muted)";
  adminToggle.textContent = adminMode ? "Lock" : "Admin";
  document.body.classList.toggle("admin-active", adminMode);
  render();
}

function toggleAdmin() {
  adminMode = !adminMode;
  localStorage.setItem(ADMIN_KEY, adminMode ? "true" : "false");
  updateAdminUI();
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

  headerContent.appendChild(wrapper);
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
  getCalloutGroups().forEach((group) => {
    const link = document.createElement("a");
    link.href = `#${group.id}`;
    link.textContent = group.title;
    categoryNav.appendChild(link);
  });
}

function render() {
  renderHeader();
  renderFooter();
  renderNav();
  blocksContainer.innerHTML = "";
  const query = searchInput.value.trim().toLowerCase();

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
      blocksContainer.appendChild(renderCalloutGroupBlock(block, query, index));
      return;
    }
    if (block.type === "adminTools") {
      if (adminMode) {
        blocksContainer.appendChild(renderAdminToolsBlock(block, index));
      }
    }
  });
}

function renderRulesBlock(block, index) {
  const section = document.createElement("section");
  section.className = "panel";
  section.id = block.id;

  const header = document.createElement("div");
  header.className = "panel-header";
  header.appendChild(renderBlockTitle(block, "h2"));
  header.appendChild(renderBlockActions(block, index));
  section.appendChild(header);

  const body = document.createElement("div");
  body.className = "panel-body rules-grid";

  block.sections.forEach((rulesSection, sectionIndex) => {
    const card = document.createElement("div");
    card.className = "rule-card";

    if (adminMode) {
      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = rulesSection.title;
      titleInput.className = "panel-title-input";
      titleInput.addEventListener("input", () => {
        rulesSection.title = titleInput.value;
      });
      card.appendChild(titleInput);
    } else {
      const title = document.createElement("h3");
      title.textContent = rulesSection.title;
      card.appendChild(title);
    }

    const list = document.createElement("ul");
    rulesSection.items.forEach((item, itemIndex) => {
      const li = document.createElement("li");
      if (adminMode) {
        const input = document.createElement("input");
        input.type = "text";
        input.value = item;
        input.addEventListener("input", () => {
          rulesSection.items[itemIndex] = input.value;
        });
        li.appendChild(input);
        const removeBtn = document.createElement("button");
        removeBtn.className = "btn btn-ghost";
        removeBtn.type = "button";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
          rulesSection.items.splice(itemIndex, 1);
          render();
        });
        li.appendChild(removeBtn);
      } else {
        li.textContent = item;
      }
      list.appendChild(li);
    });
    card.appendChild(list);

    if (adminMode) {
      const actions = document.createElement("div");
      actions.className = "admin-row";
      const addItem = document.createElement("button");
      addItem.className = "btn btn-outline";
      addItem.type = "button";
      addItem.textContent = "Add rule";
      addItem.addEventListener("click", () => {
        rulesSection.items.push("");
        render();
      });
      const removeSection = document.createElement("button");
      removeSection.className = "btn btn-danger";
      removeSection.type = "button";
      removeSection.textContent = "Delete section";
      removeSection.addEventListener("click", () => {
        block.sections.splice(sectionIndex, 1);
        render();
      });
      actions.appendChild(addItem);
      actions.appendChild(removeSection);
      card.appendChild(actions);
    }

    body.appendChild(card);
  });

  if (adminMode) {
    const addSection = document.createElement("button");
    addSection.className = "btn btn-outline";
    addSection.type = "button";
    addSection.textContent = "Add rule section";
    addSection.addEventListener("click", () => {
      block.sections.push({
        id: createId("rules-section"),
        title: "New section",
        items: [""],
      });
      render();
    });
    body.appendChild(addSection);
  }

  section.appendChild(body);
  return section;
}

function renderFlowsBlock(block, index) {
  const section = document.createElement("section");
  section.className = "panel";
  section.id = block.id;

  const header = document.createElement("div");
  header.className = "panel-header";
  header.appendChild(renderBlockTitle(block, "h2"));
  header.appendChild(renderBlockActions(block, index));
  section.appendChild(header);

  const body = document.createElement("div");
  body.className = "panel-body flow-grid";

  block.flows.forEach((flow, flowIndex) => {
    const card = document.createElement("div");
    card.className = "flow-card";

    if (adminMode) {
      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = flow.title;
      titleInput.className = "panel-title-input";
      titleInput.addEventListener("input", () => {
        flow.title = titleInput.value;
      });
      card.appendChild(titleInput);
    } else {
      const title = document.createElement("h3");
      title.textContent = flow.title;
      card.appendChild(title);
    }

    flow.rows.forEach((row, rowIndex) => {
      card.appendChild(renderFlowRow(flow, row, rowIndex));
    });

    if (adminMode) {
      const flowActions = document.createElement("div");
      flowActions.className = "admin-row";

      const addRow = document.createElement("button");
      addRow.className = "btn btn-outline";
      addRow.type = "button";
      addRow.textContent = "Add row";
      addRow.addEventListener("click", () => {
        flow.rows.push({
          id: createId("flow-row"),
          elements: [{ id: createId("el"), type: "node", text: "", emphasis: false }],
        });
        render();
      });

      const removeFlow = document.createElement("button");
      removeFlow.className = "btn btn-danger";
      removeFlow.type = "button";
      removeFlow.textContent = "Delete flow";
      removeFlow.addEventListener("click", () => {
        block.flows.splice(flowIndex, 1);
        render();
      });

      flowActions.appendChild(addRow);
      flowActions.appendChild(removeFlow);
      card.appendChild(flowActions);
    }

    body.appendChild(card);
  });

  if (adminMode) {
    const addFlow = document.createElement("button");
    addFlow.className = "btn btn-outline";
    addFlow.type = "button";
    addFlow.textContent = "Add flow";
    addFlow.addEventListener("click", () => {
      block.flows.push({
        id: createId("flow"),
        title: "New flow",
        rows: [
          {
            id: createId("flow-row"),
            elements: [{ id: createId("el"), type: "node", text: "", emphasis: false }],
          },
        ],
      });
      render();
    });
    body.appendChild(addFlow);
  }

  section.appendChild(body);
  return section;
}

function renderFlowRow(flow, row, rowIndex) {
  const wrapper = document.createElement("div");

  const rowEl = document.createElement("div");
  rowEl.className = "flow-row";
  row.elements.forEach((element, elementIndex) => {
    if (element.type === "node") {
      const node = document.createElement("span");
      node.className = element.emphasis ? "flow-node emphasis" : "flow-node";
      node.textContent = element.text;
      rowEl.appendChild(node);
      const next = row.elements[elementIndex + 1];
      if (next && next.type === "node") {
        const arrow = document.createElement("span");
        arrow.className = "flow-arrow";
        arrow.textContent = "→";
        rowEl.appendChild(arrow);
      }
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

  if (!adminMode) {
    return wrapper;
  }

  const editor = document.createElement("div");
  editor.className = "flow-editor";
  const rowGroup = document.createElement("div");
  rowGroup.className = "flow-editor-row";

  row.elements.forEach((element, elementIndex) => {
    const item = document.createElement("div");
    item.className = "flow-editor-item";

    const typeSelect = document.createElement("select");
    ["node", "divider", "note"].forEach((type) => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      option.selected = type === element.type;
      typeSelect.appendChild(option);
    });
    typeSelect.addEventListener("change", () => {
      element.type = typeSelect.value;
      if (element.type !== "node") {
        element.emphasis = false;
      }
      render();
    });

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = element.text;
    textInput.addEventListener("input", () => {
      element.text = textInput.value;
    });

    const emphasisWrapper = document.createElement("label");
    emphasisWrapper.textContent = "Emphasis";
    const emphasisInput = document.createElement("input");
    emphasisInput.type = "checkbox";
    emphasisInput.checked = Boolean(element.emphasis);
    emphasisInput.addEventListener("change", () => {
      element.emphasis = emphasisInput.checked;
      render();
    });
    emphasisWrapper.appendChild(emphasisInput);

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
    item.appendChild(element.type === "node" ? emphasisWrapper : document.createElement("span"));
    item.appendChild(controls);
    rowGroup.appendChild(item);
  });

  editor.appendChild(rowGroup);

  const rowActions = document.createElement("div");
  rowActions.className = "flow-editor-actions";
  const addNode = document.createElement("button");
  addNode.className = "btn btn-outline";
  addNode.type = "button";
  addNode.textContent = "Add node";
  addNode.addEventListener("click", () => {
    row.elements.push({ id: createId("el"), type: "node", text: "", emphasis: false });
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
  removeRow.textContent = "Delete row";
  removeRow.addEventListener("click", () => {
    flow.rows.splice(rowIndex, 1);
    render();
  });
  rowActions.appendChild(addNode);
  rowActions.appendChild(addDivider);
  rowActions.appendChild(addNote);
  rowActions.appendChild(removeRow);
  editor.appendChild(rowActions);

  wrapper.appendChild(editor);
  return wrapper;
}

function renderCalloutGroupBlock(block, query, index) {
  const section = document.createElement("section");
  section.className = "category-section";
  section.id = block.id;

  const header = document.createElement("div");
  header.className = "category-header";

  if (adminMode) {
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = block.title;
    titleInput.className = "panel-title-input";
    titleInput.addEventListener("input", () => {
      block.title = titleInput.value;
      renderNav();
    });
    header.appendChild(titleInput);
  } else {
    const title = document.createElement("h2");
    title.textContent = block.title;
    header.appendChild(title);
  }

  const actionWrap = document.createElement("div");
  actionWrap.className = "callout-group-actions";

  if (adminMode) {
    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-outline";
    addBtn.type = "button";
    addBtn.textContent = "Add call-out";
    addBtn.addEventListener("click", () => {
      state.callouts.push(createBlankCall(block.id));
      render();
    });
    actionWrap.appendChild(addBtn);
  }

  actionWrap.appendChild(renderBlockActions(block, index));
  header.appendChild(actionWrap);
  section.appendChild(header);

  const groupCallouts = state.callouts.filter((callout) => callout.groupId === block.id);
  const filtered = groupCallouts.filter((item) => matchesQuery(item, block.title, query));

  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = query ? "No call-outs match the current filter." : "No call-outs in this category yet.";
    section.appendChild(empty);
    return section;
  }

  filtered.forEach((item) => {
    section.appendChild(renderCalloutCard(item));
  });

  return section;
}

function renderAdminToolsBlock(block, index) {
  const section = document.createElement("section");
  section.className = "panel";
  section.id = block.id;

  const header = document.createElement("div");
  header.className = "panel-header";
  header.appendChild(renderBlockTitle(block, "h2"));
  header.appendChild(renderBlockActions(block, index));
  section.appendChild(header);

  const body = document.createElement("div");
  body.className = "panel-body admin-tools";

  const toggleRow = document.createElement("div");
  toggleRow.className = "admin-row";
  const label = document.createElement("label");
  label.className = "toggle";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = allowNameEdit;
  checkbox.addEventListener("change", () => {
    allowNameEdit = checkbox.checked;
    localStorage.setItem(NAME_EDIT_KEY, allowNameEdit ? "true" : "false");
    render();
  });
  const span = document.createElement("span");
  span.textContent = "Enable call name editing (safety lock)";
  label.appendChild(checkbox);
  label.appendChild(span);
  toggleRow.appendChild(label);
  body.appendChild(toggleRow);

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
  resetBtn.className = "btn btn-outline";
  resetBtn.type = "button";
  resetBtn.textContent = "Reset to default";
  resetBtn.addEventListener("click", () => {
    if (confirm("Reset all blocks, call-outs, and layout to default?")) {
      state = structuredClone(DEFAULT_STATE);
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
  actionRow.appendChild(exportHtmlBtn);
  actionRow.appendChild(importLabel);
  actionRow.appendChild(importInput);

  body.appendChild(actionRow);

  const blockRow = document.createElement("div");
  blockRow.className = "admin-row";
  const addRules = document.createElement("button");
  addRules.className = "btn btn-outline";
  addRules.type = "button";
  addRules.textContent = "Add rules block";
  addRules.addEventListener("click", () => {
    state.blocks.push({
      id: createId("rules"),
      type: "rules",
      title: "Rules of Use",
      sections: [{ id: createId("rules-section"), title: "New section", items: [""] }],
    });
    render();
  });
  const addFlows = document.createElement("button");
  addFlows.className = "btn btn-outline";
  addFlows.type = "button";
  addFlows.textContent = "Add flow block";
  addFlows.addEventListener("click", () => {
    state.blocks.push({
      id: createId("flows"),
      type: "flows",
      title: "Flow Diagrams",
      flows: [
        {
          id: createId("flow"),
          title: "New flow",
          rows: [
            {
              id: createId("flow-row"),
              elements: [{ id: createId("el"), type: "node", text: "", emphasis: false }],
            },
          ],
        },
      ],
    });
    render();
  });
  const addGroup = document.createElement("button");
  addGroup.className = "btn btn-outline";
  addGroup.type = "button";
  addGroup.textContent = "Add callout group";
  addGroup.addEventListener("click", () => {
    const newId = createId("group");
    const adminIndex = state.blocks.findIndex((blockItem) => blockItem.type === "adminTools");
    const insertIndex = adminIndex === -1 ? state.blocks.length : adminIndex;
    state.blocks.splice(insertIndex, 0, {
      id: newId,
      type: "calloutGroup",
      title: "New callout group",
    });
    render();
  });

  blockRow.appendChild(addRules);
  blockRow.appendChild(addFlows);
  blockRow.appendChild(addGroup);
  body.appendChild(blockRow);

  const note = document.createElement("p");
  note.className = "admin-note";
  note.textContent = "Save writes to localStorage on this device. Export/Import lets you share edits as JSON.";
  body.appendChild(note);

  section.appendChild(body);
  return section;
}

function renderBlockTitle(block, tag) {
  if (!adminMode) {
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

function renderBlockActions(block, index) {
  const actions = document.createElement("div");
  actions.className = "block-actions";
  if (!adminMode) {
    return actions;
  }

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
      if (!confirm("Delete this callout group and all its call-outs?")) {
        return;
      }
      state.callouts = state.callouts.filter((callout) => callout.groupId !== block.id);
    }
    state.blocks.splice(index, 1);
    render();
  });

  actions.appendChild(moveUp);
  actions.appendChild(moveDown);
  actions.appendChild(deleteBtn);
  return actions;
}

function matchesQuery(item, groupTitle, query) {
  if (!query) {
    return true;
  }
  const fields = [
    item.callName,
    groupTitle,
    item.context,
    item.meaning,
    item.responseExpected,
    item.notes,
    ...(item.whenToUse || []),
  ];
  return fields.some((field) => String(field || "").toLowerCase().includes(query));
}

function renderCalloutCard(item) {
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

  if (adminMode) {
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

  body.appendChild(
    renderField("Call name", item.callName, (value) => {
      item.callName = value;
      render();
    }, {
      type: "text",
      editable: adminMode && allowNameEdit,
    })
  );

  const groups = getCalloutGroups();
  body.appendChild(
    renderSelect(
      "Category",
      item.groupId,
      groups.map((group) => ({ label: group.title, value: group.id })),
      (value) => {
        item.groupId = value;
        render();
      },
      {
        editable: adminMode,
      }
    )
  );

  body.appendChild(
    renderField("Context", item.context, (value) => {
      item.context = value;
    }, {
      type: "textarea",
      editable: adminMode,
    })
  );

  body.appendChild(
    renderField("Meaning", item.meaning, (value) => {
      item.meaning = value;
    }, {
      type: "textarea",
      editable: adminMode,
    })
  );

  body.appendChild(renderWhenList(item));

  body.appendChild(
    renderField("Response expected", item.responseExpected, (value) => {
      item.responseExpected = value;
    }, {
      type: "text",
      editable: adminMode,
    })
  );

  body.appendChild(
    renderField("Notes", item.notes, (value) => {
      item.notes = value;
    }, {
      type: "textarea",
      editable: adminMode,
    })
  );

  if (adminMode) {
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete call-out";
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

function renderField(labelText, value, onChange, options) {
  const field = document.createElement("div");
  field.className = "field";
  const label = document.createElement("label");
  label.textContent = labelText;
  field.appendChild(label);

  if (!options.editable) {
    const display = document.createElement(options.type === "textarea" ? "p" : "div");
    display.className = "readonly";
    display.textContent = value || "–";
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
  field.className = "field";
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

function renderWhenList(item) {
  const field = document.createElement("div");
  field.className = "field";
  const label = document.createElement("label");
  label.textContent = "When to use";
  field.appendChild(label);

  if (!adminMode) {
    const list = document.createElement("ul");
    list.className = "readonly";
    (item.whenToUse || []).forEach((entry) => {
      const li = document.createElement("li");
      li.textContent = entry;
      list.appendChild(li);
    });
    field.appendChild(list);
    return field;
  }

  const listWrapper = document.createElement("div");
  listWrapper.className = "when-list";
  (item.whenToUse || []).forEach((entry, index) => {
    const row = document.createElement("div");
    row.className = "when-item";
    const input = document.createElement("input");
    input.type = "text";
    input.value = entry;
    input.addEventListener("input", () => {
      item.whenToUse[index] = input.value;
    });
    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-ghost";
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      item.whenToUse.splice(index, 1);
      render();
    });
    row.appendChild(input);
    row.appendChild(removeBtn);
    listWrapper.appendChild(row);
  });

  const addBtn = document.createElement("button");
  addBtn.className = "btn btn-outline";
  addBtn.type = "button";
  addBtn.textContent = "Add item";
  addBtn.addEventListener("click", () => {
    if (!Array.isArray(item.whenToUse)) {
      item.whenToUse = [];
    }
    item.whenToUse.push("");
    render();
  });

  field.appendChild(listWrapper);
  field.appendChild(addBtn);
  return field;
}

function createBlankCall(groupId) {
  return {
    id: createId("callout"),
    callName: "New call",
    groupId,
    context: "",
    meaning: "",
    whenToUse: [""],
    responseExpected: "",
    notes: "",
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

function handleExportHtml() {
  const html = buildViewerHtml(state);
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

function buildViewerHtml(sourceState) {
  const styles = getStylesheetText();
  const headerHtml = `
      <div class="header-main">
        <div class="header-text">
          <p class="eyebrow">${escapeHtml(sourceState.header.eyebrow)}</p>
          <h1>${escapeHtml(sourceState.header.title)}</h1>
          <p class="subhead">${escapeHtml(sourceState.header.subtitle)}</p>
          <p class="header-intro">${escapeHtml(sourceState.header.intro)}</p>
        </div>
        <div class="header-actions">
          <div class="status-pill">Viewer mode</div>
        </div>
      </div>
      <nav class="top-nav">
        <div class="nav-left">
          <input id="searchInput" type="search" placeholder="Search callouts, meanings, notes..." aria-label="Search callouts" />
        </div>
        <div class="nav-right">
          <button id="expandAll" class="btn btn-ghost" type="button">Expand all</button>
          <button id="collapseAll" class="btn btn-ghost" type="button">Collapse all</button>
        </div>
      </nav>
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
    <header class="site-header">
      ${headerHtml}
    </header>
    <main>
      ${blocksHtml}
    </main>
    <footer class="site-footer">
      ${footerHtml}
    </footer>
    <script>
      const searchInput = document.getElementById('searchInput');
      const expandAll = document.getElementById('expandAll');
      const collapseAll = document.getElementById('collapseAll');
      const categoryNav = document.getElementById('categoryNav');

      const cards = Array.from(document.querySelectorAll('.callout-card'));

      function buildNav() {
        categoryNav.innerHTML = '';
        document.querySelectorAll('.category-section').forEach((section) => {
          const title = section.dataset.title;
          const link = document.createElement('a');
          link.href = '#' + section.id;
          link.textContent = title;
          categoryNav.appendChild(link);
        });
      }

      function filterCallouts() {
        const query = searchInput.value.trim().toLowerCase();
        document.querySelectorAll('.category-section').forEach((section) => {
          let visibleCount = 0;
          section.querySelectorAll('.callout-card').forEach((card) => {
            const search = card.dataset.search || '';
            const isVisible = !query || search.includes(query);
            card.style.display = isVisible ? '' : 'none';
            if (isVisible) {
              visibleCount += 1;
            }
          });
          const empty = section.querySelector('.empty-state');
          if (empty) {
            empty.style.display = visibleCount ? 'none' : '';
          }
        });
      }

      cards.forEach((card) => {
        const header = card.querySelector('.callout-header');
        header.addEventListener('click', () => {
          card.classList.toggle('expanded');
        });
      });

      expandAll.addEventListener('click', () => {
        cards.forEach((card) => card.classList.add('expanded'));
      });

      collapseAll.addEventListener('click', () => {
        cards.forEach((card) => card.classList.remove('expanded'));
      });

      searchInput.addEventListener('input', filterCallouts);

      buildNav();
    </script>
  </body>
</html>`;
}

function getStylesheetText() {
  let cssText = "";
  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      if (sheet.cssRules) {
        Array.from(sheet.cssRules).forEach((rule) => {
          cssText += `${rule.cssText}\n`;
        });
      }
    } catch (error) {
      console.warn(\"Unable to read stylesheet\", error);
    }
  });
  return cssText;
}

function buildViewerBlock(block, sourceState) {
  if (block.type === "rules") {
    return `
      <section class="panel" id="${block.id}">
        <div class="panel-header">
          <h2>${escapeHtml(block.title)}</h2>
        </div>
        <div class="panel-body rules-grid">
          ${block.sections
            .map(
              (section) => `
            <div class="rule-card">
              <h3>${escapeHtml(section.title)}</h3>
              <ul>
                ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
            </div>
          `
            )
            .join("")}
        </div>
      </section>
    `;
  }

  if (block.type === "flows") {
    return `
      <section class="panel" id="${block.id}">
        <div class="panel-header">
          <h2>${escapeHtml(block.title)}</h2>
        </div>
        <div class="panel-body flow-grid">
          ${block.flows
            .map(
              (flow) => `
            <div class="flow-card">
              <h3>${escapeHtml(flow.title)}</h3>
              ${flow.rows
                .map(
                  (row) => `
                <div class="flow-row">
                  ${row.elements
                    .map((element, index) => {
                      if (element.type === "node") {
                        const node = `<span class="flow-node${element.emphasis ? " emphasis" : ""}">${escapeHtml(element.text)}</span>`;
                        const next = row.elements[index + 1];
                        const arrow = next && next.type === "node" ? '<span class="flow-arrow">→</span>' : "";
                        return node + arrow;
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
              `
                )
                .join("")}
            </div>
          `
            )
            .join("")}
        </div>
      </section>
    `;
  }

  if (block.type === "calloutGroup") {
    const groupCallouts = sourceState.callouts.filter((callout) => callout.groupId === block.id);
    const cards = groupCallouts
      .map((callout) => {
        const searchText = buildSearchText(callout, block.title);
        return `
          <div class="callout-card" data-search="${escapeHtml(searchText)}">
            <div class="callout-header">
              <div class="callout-title">
                <span class="chevron">▸</span>
                <span>${escapeHtml(callout.callName)}</span>
              </div>
            </div>
            <div class="callout-body">
              ${viewerField("Context", callout.context)}
              ${viewerField("Meaning", callout.meaning)}
              ${viewerList("When to use", callout.whenToUse)}
              ${viewerField("Response expected", callout.responseExpected)}
              ${viewerField("Notes", callout.notes)}
            </div>
          </div>
        `;
      })
      .join("");

    return `
      <section class="category-section" id="${block.id}" data-title="${escapeHtml(block.title)}">
        <div class="category-header">
          <h2>${escapeHtml(block.title)}</h2>
        </div>
        ${cards || '<div class="empty-state">No call-outs in this category yet.</div>'}
      </section>
    `;
  }

  return "";
}

function buildSearchText(callout, groupTitle) {
  return [
    callout.callName,
    groupTitle,
    callout.context,
    callout.meaning,
    callout.responseExpected,
    callout.notes,
    ...(callout.whenToUse || []),
  ]
    .map((entry) => String(entry || "").toLowerCase())
    .join(" ");
}

function viewerField(label, value) {
  return `
    <div class="field">
      <label>${escapeHtml(label)}</label>
      <div class="readonly">${escapeHtml(value || "–")}</div>
    </div>
  `;
}

function viewerList(label, items) {
  const list = (items || []).map((entry) => `<li>${escapeHtml(entry)}</li>`).join("");
  return `
    <div class="field">
      <label>${escapeHtml(label)}</label>
      <ul class="readonly">${list}</ul>
    </div>
  `;
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
        state = migrateLegacyCallouts(parsed);
      } else if (parsed && typeof parsed === "object" && Array.isArray(parsed.blocks)) {
        state = parsed;
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

function showAddBlockMenu() {
  if (!adminMode) {
    return;
  }
  const choices = [
    { label: "Rules block", type: "rules" },
    { label: "Flow block", type: "flows" },
    { label: "Callout group", type: "calloutGroup" },
    { label: "Admin tools", type: "adminTools" },
  ];
  const selection = prompt(
    `Add block:\n${choices.map((choice, index) => `${index + 1}. ${choice.label}`).join("\n")}`
  );
  const index = Number(selection) - 1;
  if (Number.isNaN(index) || index < 0 || index >= choices.length) {
    return;
  }
  const choice = choices[index];
  if (choice.type === "rules") {
    state.blocks.push({
      id: createId("rules"),
      type: "rules",
      title: "Rules of Use",
      sections: [{ id: createId("rules-section"), title: "New section", items: [""] }],
    });
  }
  if (choice.type === "flows") {
    state.blocks.push({
      id: createId("flows"),
      type: "flows",
      title: "Flow Diagrams",
      flows: [
        {
          id: createId("flow"),
          title: "New flow",
          rows: [
            {
              id: createId("flow-row"),
              elements: [{ id: createId("el"), type: "node", text: "", emphasis: false }],
            },
          ],
        },
      ],
    });
  }
  if (choice.type === "calloutGroup") {
    const newId = createId("group");
    const adminIndex = state.blocks.findIndex((blockItem) => blockItem.type === "adminTools");
    const insertIndex = adminIndex === -1 ? state.blocks.length : adminIndex;
    state.blocks.splice(insertIndex, 0, {
      id: newId,
      type: "calloutGroup",
      title: "New callout group",
    });
  }
  if (choice.type === "adminTools") {
    if (state.blocks.some((block) => block.type === "adminTools")) {
      alert("Admin tools block already exists.");
      return;
    }
    state.blocks.push({ id: createId("admin"), type: "adminTools", title: "Admin Tools" });
  }
  render();
}

adminToggle.addEventListener("click", () => {
  toggleAdmin();
});

addBlockBtn.addEventListener("click", () => {
  showAddBlockMenu();
});

searchInput.addEventListener("input", () => {
  render();
});

expandAllBtn.addEventListener("click", () => {
  document.querySelectorAll(".callout-card").forEach((card) => {
    card.classList.add("expanded");
    if (card.dataset.cardId) {
      expandedIds.add(card.dataset.cardId);
    }
  });
});

collapseAllBtn.addEventListener("click", () => {
  document.querySelectorAll(".callout-card").forEach((card) => {
    card.classList.remove("expanded");
  });
  expandedIds.clear();
});

updateAdminUI();
render();
