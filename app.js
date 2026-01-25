/* Admin lock: local-only convenience toggle (no password). */

const STORAGE_KEY = "scscp_data";
const ADMIN_KEY = "scscp_admin";
const NAME_EDIT_KEY = "scscp_name_edit";

const CATEGORY_ORDER = [
  "TEAM LEAD (INTENT)",
  "REGROUP RESPONSES",
  "PILOT PERSONAL THREAT",
  "TEAM GEOMETRY",
  "ATTACHMENT",
  "TARGET AWARENESS",
  "DISTANCE SCALE",
  "ENGAGEMENT EFFECTIVENESS",
  "TARGET STATUS (SHARED TRUTH)",
  "KILL / DEATH",
];

const DEFAULT_DATA = [
  {
    callName: "Forward",
    category: "TEAM LEAD (INTENT)",
    context: "Team lead sets forward pressure or push direction.",
    meaning: "Advance toward target space with intent.",
    whenToUse: ["Lead wants team to press"],
    responseExpected: "No response required unless queried.",
    notes: "Used to initiate aggressive movement without narration.",
  },
  {
    callName: "Target",
    category: "TEAM LEAD (INTENT)",
    context: "Team lead designates a new focus target.",
    meaning: "Primary engagement target for the team.",
    whenToUse: ["Switching focus", "Calling a fresh target"],
    responseExpected: "Acknowledge via action; optional verbal.",
    notes: "Name required if time has passed or category change occurs.",
  },
  {
    callName: "Target out",
    category: "TEAM LEAD (INTENT)",
    context: "Lead confirms target is no longer valid or lost.",
    meaning: "Drop target, shift awareness.",
    whenToUse: ["Target destroyed", "Target lost or no longer relevant"],
    responseExpected: "Team reacquires or awaits new target.",
    notes: "Triggers new target cycle.",
  },
  {
    callName: "Regroup on",
    category: "TEAM LEAD (INTENT)",
    context: "Regroup on an anchor while remaining engaged or ready to re-engage.",
    meaning: "Re-center on anchor without breaking contact.",
    whenToUse: ["Team needs cohesion", "Resetting formation quickly"],
    responseExpected: "Distance optional, Ready when set.",
    notes: "Regroup on is not Reset.",
  },
  {
    callName: "Reset",
    category: "TEAM LEAD (INTENT)",
    context: "Lead calls disengage and reset fight state.",
    meaning: "Break contact and reset.",
    whenToUse: ["Fight state compromised", "Need clean reset"],
    responseExpected: "Distance, Ready once reset.",
    notes: "Breaks engagement.",
  },
  {
    callName: "Hold",
    category: "TEAM LEAD (INTENT)",
    context: "Lead holds current position or state.",
    meaning: "Maintain state; no new push.",
    whenToUse: ["Stabilize", "Wait for additional info"],
    responseExpected: "No response required.",
    notes: "Silence is correct unless changed.",
  },
  {
    callName: "Distance",
    category: "REGROUP RESPONSES",
    context: "Report distance from anchor.",
    meaning: "Time/distance until regroup complete.",
    whenToUse: ["During regroup calls"],
    responseExpected: "Optional follow-up.",
    notes: "Optional in regroup cycle.",
  },
  {
    callName: "Ready",
    category: "REGROUP RESPONSES",
    context: "Confirm regroup completion.",
    meaning: "Regroup complete and ready.",
    whenToUse: ["Once regrouped"],
    responseExpected: "Lead continues flow.",
    notes: "Ends regroup cycle.",
  },
  {
    callName: "Aggro",
    category: "PILOT PERSONAL THREAT",
    context: "Pilot is currently targeted or pressured.",
    meaning: "Threat on me.",
    whenToUse: ["Receiving focused fire"],
    responseExpected: "Team awareness; support if possible.",
    notes: "Personal state uses speaker name if time passes.",
  },
  {
    callName: "Evasive",
    category: "PILOT PERSONAL THREAT",
    context: "Pilot is evading to survive.",
    meaning: "I'm defensive and maneuvering hard.",
    whenToUse: ["Under pressure"],
    responseExpected: "Team aware of reduced firepower.",
    notes: "Followed by Clear when safe.",
  },
  {
    callName: "Low boost",
    category: "PILOT PERSONAL THREAT",
    context: "Pilot is low on boost/escape energy.",
    meaning: "Limited evasive capability.",
    whenToUse: ["Boost nearly depleted"],
    responseExpected: "Team aware of constraint.",
    notes: "Critical in threat chain.",
  },
  {
    callName: "Clear",
    category: "PILOT PERSONAL THREAT",
    context: "Pilot is no longer threatened.",
    meaning: "Threat resolved; back to normal.",
    whenToUse: ["Aggro cleared"],
    responseExpected: "Resume normal comms.",
    notes: "Ends threat interrupt.",
  },
  {
    callName: "Red (PERSONAL)",
    category: "PILOT PERSONAL THREAT",
    context: "Pilot is critical health but not necessarily dying.",
    meaning: "Critical state, fragile even if safe.",
    whenToUse: ["Hull/health critical"],
    responseExpected: "Team aware of fragility.",
    notes: "Personal state.",
  },
  {
    callName: "Ball in",
    category: "TEAM GEOMETRY",
    context: "Team tightens formation.",
    meaning: "Compress formation around anchor.",
    whenToUse: ["Need tighter geometry"],
    responseExpected: "Adjust positioning.",
    notes: "No narration; respond with action.",
  },
  {
    callName: "Ball out",
    category: "TEAM GEOMETRY",
    context: "Team expands formation.",
    meaning: "Spread out for coverage.",
    whenToUse: ["Need wider spacing"],
    responseExpected: "Adjust spacing.",
    notes: "Used by lead.",
  },
  {
    callName: "With",
    category: "ATTACHMENT",
    context: "Pilot is attached to lead/anchor.",
    meaning: "I'm on the anchor.",
    whenToUse: ["Confirming attachment"],
    responseExpected: "Lead acknowledges implicitly.",
    notes: "Attachment state.",
  },
  {
    callName: "With pilot",
    category: "ATTACHMENT",
    context: "Pilot is attached to another pilot.",
    meaning: "I'm with a named pilot.",
    whenToUse: ["Buddy pairing"],
    responseExpected: "Named pilot aware.",
    notes: "Name required by rule.",
  },
  {
    callName: "Looking",
    category: "TARGET AWARENESS",
    context: "Searching for target.",
    meaning: "Target not seen yet.",
    whenToUse: ["After target call"],
    responseExpected: "Seen or No contact.",
    notes: "Target cycle.",
  },
  {
    callName: "No contact",
    category: "TARGET AWARENESS",
    context: "Cannot see target.",
    meaning: "Target not in sight.",
    whenToUse: ["Target lost"],
    responseExpected: "Lead adjusts.",
    notes: "Shared truth; no name.",
  },
  {
    callName: "Seen",
    category: "TARGET AWARENESS",
    context: "Target visual acquired.",
    meaning: "Target in sight.",
    whenToUse: ["Target located"],
    responseExpected: "Proceed to merge.",
    notes: "Shared truth.",
  },
  {
    callName: "Five clicks",
    category: "DISTANCE SCALE",
    context: "Distance scale reference.",
    meaning: "Approx. five clicks.",
    whenToUse: ["Distance call"],
    responseExpected: "Adjust geometry if needed.",
    notes: "Consistent scale reference.",
  },
  {
    callName: "Three clicks",
    category: "DISTANCE SCALE",
    context: "Distance scale reference.",
    meaning: "Approx. three clicks.",
    whenToUse: ["Distance call"],
    responseExpected: "Adjust geometry if needed.",
    notes: "Consistent scale reference.",
  },
  {
    callName: "Two clicks",
    category: "DISTANCE SCALE",
    context: "Distance scale reference.",
    meaning: "Approx. two clicks.",
    whenToUse: ["Distance call"],
    responseExpected: "Adjust geometry if needed.",
    notes: "Consistent scale reference.",
  },
  {
    callName: "One click",
    category: "DISTANCE SCALE",
    context: "Distance scale reference.",
    meaning: "Approx. one click.",
    whenToUse: ["Distance call"],
    responseExpected: "Adjust geometry if needed.",
    notes: "Consistent scale reference.",
  },
  {
    callName: "Merging",
    category: "ENGAGEMENT EFFECTIVENESS",
    context: "Closing into merge.",
    meaning: "Entering merge stage.",
    whenToUse: ["After seen"],
    responseExpected: "Team aligns.",
    notes: "Target cycle.",
  },
  {
    callName: "Effective",
    category: "ENGAGEMENT EFFECTIVENESS",
    context: "Attack is effective.",
    meaning: "Hits/pressure landing.",
    whenToUse: ["Shots on target"],
    responseExpected: "Continue pressure.",
    notes: "Shared truth.",
  },
  {
    callName: "Very effective",
    category: "ENGAGEMENT EFFECTIVENESS",
    context: "Attack is highly effective.",
    meaning: "Significant damage.",
    whenToUse: ["Target crumbling"],
    responseExpected: "Maintain focus.",
    notes: "Shared truth.",
  },
  {
    callName: "Not effective",
    category: "ENGAGEMENT EFFECTIVENESS",
    context: "Attack is not landing.",
    meaning: "Shots missing or not damaging.",
    whenToUse: ["No effect"],
    responseExpected: "Adjust tactics.",
    notes: "Shared truth.",
  },
  {
    callName: "Chasing",
    category: "ENGAGEMENT EFFECTIVENESS",
    context: "Target is running and being chased.",
    meaning: "Pursuit state.",
    whenToUse: ["Target disengaging"],
    responseExpected: "Team keeps awareness.",
    notes: "Shared truth.",
  },
  {
    callName: "Red (TARGET)",
    category: "TARGET STATUS (SHARED TRUTH)",
    context: "Target critical.",
    meaning: "Target is fragile.",
    whenToUse: ["Target at critical health"],
    responseExpected: "Press for splash.",
    notes: "Shared truth only.",
  },
  {
    callName: "Splash",
    category: "KILL / DEATH",
    context: "Target destroyed.",
    meaning: "Confirmed kill.",
    whenToUse: ["Target destroyed"],
    responseExpected: "Lead selects new target.",
    notes: "Shared truth.",
  },
  {
    callName: "Full kill",
    category: "KILL / DEATH",
    context: "Final confirmation of kill.",
    meaning: "Target confirmed dead.",
    whenToUse: ["Kill fully confirmed"],
    responseExpected: "Team shifts focus.",
    notes: "Shared truth.",
  },
  {
    callName: "Down (TARGET)",
    category: "KILL / DEATH",
    context: "Target downed or disabled.",
    meaning: "Target neutralized.",
    whenToUse: ["Target disabled"],
    responseExpected: "Assess follow-up.",
    notes: "Shared truth.",
  },
  {
    callName: "Down (PERSONAL)",
    category: "KILL / DEATH",
    context: "Pilot is downed.",
    meaning: "I'm down.",
    whenToUse: ["Personal down state"],
    responseExpected: "Team aware of loss.",
    notes: "Personal state uses speaker name if time passes.",
  },
  {
    callName: "Dead",
    category: "KILL / DEATH",
    context: "Pilot is dead.",
    meaning: "I'm out.",
    whenToUse: ["Personal death state"],
    responseExpected: "Team adapts.",
    notes: "Personal state.",
  },
];

let data = loadData();
let adminMode = loadAdmin();
let allowNameEdit = loadNameEdit();
let expandedIds = new Set();

const categoryNav = document.getElementById("categoryNav");
const calloutsContainer = document.getElementById("callouts");
const adminToggle = document.getElementById("adminToggle");
const adminStatus = document.getElementById("adminStatus");
const adminPanel = document.getElementById("adminPanel");
const enableNameEdit = document.getElementById("enableNameEdit");
const searchInput = document.getElementById("searchInput");
const expandAllBtn = document.getElementById("expandAll");
const collapseAllBtn = document.getElementById("collapseAll");
const saveBtn = document.getElementById("saveData");
const resetBtn = document.getElementById("resetData");
const exportBtn = document.getElementById("exportData");
const importInput = document.getElementById("importData");

function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return structuredClone(DEFAULT_DATA);
  }
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.warn("Failed to parse stored data", error);
  }
  return structuredClone(DEFAULT_DATA);
}

function loadAdmin() {
  return localStorage.getItem(ADMIN_KEY) === "true";
}

function loadNameEdit() {
  return localStorage.getItem(NAME_EDIT_KEY) === "true";
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function updateAdminUI() {
  adminStatus.textContent = adminMode ? "Admin unlocked" : "Viewer mode";
  adminStatus.style.color = adminMode ? "var(--success)" : "var(--muted)";
  adminToggle.textContent = adminMode ? "Lock" : "Admin";
  adminPanel.classList.toggle("active", adminMode);
  enableNameEdit.checked = allowNameEdit;
  [saveBtn, resetBtn, exportBtn].forEach((btn) => {
    btn.disabled = !adminMode;
  });
  render();
}


function toggleAdmin() {
  adminMode = !adminMode;
  localStorage.setItem(ADMIN_KEY, adminMode ? "true" : "false");
  updateAdminUI();
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function setExpanded(id, expanded) {
  if (expanded) {
    expandedIds.add(id);
  } else {
    expandedIds.delete(id);
  }
}

function renderNav() {
  categoryNav.innerHTML = "";
  CATEGORY_ORDER.forEach((category) => {
    const link = document.createElement("a");
    link.href = `#${slugify(category)}`;
    link.textContent = category;
    categoryNav.appendChild(link);
  });
}

function render() {
  renderNav();
  calloutsContainer.innerHTML = "";
  const query = searchInput.value.trim().toLowerCase();
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: data.filter((item) => item.category === category),
  }));

  grouped.forEach(({ category, items }) => {
    const section = document.createElement("section");
    section.className = "category-section";
    section.id = slugify(category);

    const header = document.createElement("div");
    header.className = "category-header";
    const title = document.createElement("h2");
    title.textContent = category;
    header.appendChild(title);

    if (adminMode) {
      const addBtn = document.createElement("button");
      addBtn.className = "btn btn-outline";
      addBtn.type = "button";
      addBtn.textContent = "Add call-out";
      addBtn.addEventListener("click", () => {
        data.push(createBlankCall(category));
        render();
      });
      header.appendChild(addBtn);
    }

    section.appendChild(header);

    const filtered = items.filter((item) => matchesQuery(item, query));
    if (!filtered.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No call-outs match the current filter.";
      section.appendChild(empty);
      calloutsContainer.appendChild(section);
      return;
    }

    filtered.forEach((item) => {
      section.appendChild(renderCalloutCard(item));
    });

    calloutsContainer.appendChild(section);
  });
}

function matchesQuery(item, query) {
  if (!query) {
    return true;
  }
  const fields = [
    item.callName,
    item.category,
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
  const cardId = `${item.category}-${item.callName}`;
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
      moveWithinCategory(item, -1);
    });
    const downBtn = document.createElement("button");
    downBtn.className = "btn btn-ghost";
    downBtn.type = "button";
    downBtn.textContent = "↓";
    downBtn.title = "Move down";
    downBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      moveWithinCategory(item, 1);
    });
    actions.appendChild(upBtn);
    actions.appendChild(downBtn);
  }

  header.appendChild(title);
  header.appendChild(actions);

  const body = document.createElement("div");
  body.className = "callout-body";

  body.appendChild(renderField("Call name", item.callName, (value) => {
    item.callName = value;
    render();
  }, {
    type: "text",
    editable: adminMode && allowNameEdit,
  }));

  body.appendChild(renderSelect("Category", item.category, CATEGORY_ORDER, (value) => {
    item.category = value;
    render();
  }, {
    editable: adminMode,
  }));

  body.appendChild(renderField("Context", item.context, (value) => {
    item.context = value;
  }, {
    type: "textarea",
    editable: adminMode,
  }));

  body.appendChild(renderField("Meaning", item.meaning, (value) => {
    item.meaning = value;
  }, {
    type: "textarea",
    editable: adminMode,
  }));

  body.appendChild(renderWhenList(item));

  body.appendChild(renderField("Response expected", item.responseExpected, (value) => {
    item.responseExpected = value;
  }, {
    type: "text",
    editable: adminMode,
  }));

  body.appendChild(renderField("Notes", item.notes, (value) => {
    item.notes = value;
  }, {
    type: "textarea",
    editable: adminMode,
  }));

  if (adminMode) {
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete call-out";
    deleteBtn.addEventListener("click", () => {
      data = data.filter((call) => call !== item);
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

  if (!options.editable) {
    const display = document.createElement("div");
    display.className = "readonly";
    display.textContent = value;
    field.appendChild(display);
    return field;
  }

  const select = document.createElement("select");
  optionsList.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    opt.selected = option === value;
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

function createBlankCall(category) {
  return {
    callName: "New call",
    category,
    context: "",
    meaning: "",
    whenToUse: [""],
    responseExpected: "",
    notes: "",
  };
}

function moveWithinCategory(item, direction) {
  const categoryItems = data.filter((call) => call.category === item.category);
  const indexInCategory = categoryItems.indexOf(item);
  const newIndex = indexInCategory + direction;
  if (newIndex < 0 || newIndex >= categoryItems.length) {
    return;
  }
  const originalIndex = data.indexOf(item);
  const swapItem = categoryItems[newIndex];
  const swapIndex = data.indexOf(swapItem);
  [data[originalIndex], data[swapIndex]] = [data[swapIndex], data[originalIndex]];
  render();
}

function handleExport() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "scscp-data.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function handleImport(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!Array.isArray(parsed)) {
        throw new Error("Invalid JSON format");
      }
      data = parsed;
      render();
    } catch (error) {
      alert("Import failed. Ensure the JSON is a valid array of call-outs.");
      console.error(error);
    }
  };
  reader.readAsText(file);
}

adminToggle.addEventListener("click", () => {
  toggleAdmin();
});

enableNameEdit.addEventListener("change", () => {
  allowNameEdit = enableNameEdit.checked;
  localStorage.setItem(NAME_EDIT_KEY, allowNameEdit ? "true" : "false");
  render();
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

saveBtn.addEventListener("click", () => {
  saveData();
});

resetBtn.addEventListener("click", () => {
  if (confirm("Reset all call-outs to default?")) {
    data = structuredClone(DEFAULT_DATA);
    saveData();
    render();
  }
});

exportBtn.addEventListener("click", () => {
  handleExport();
});

importInput.addEventListener("change", () => {
  const file = importInput.files[0];
  if (file) {
    handleImport(file);
  }
  importInput.value = "";
});

updateAdminUI();
render();
