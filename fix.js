// fix.js — Патч: правильный порядок прабабушек/прадедушек + поиск по архивам в полях
// Загружается ПОСЛЕ features.js

// ══════ 1. Fix tree node ordering ══════
// Canonical left-to-right order for all initial nodes
const SORT_MAP = {
  me:0, father:1, mother:2,
  gm_pat:3, gf_pat:4,        // бабушка/дедушка по отцу
  gm_mat:5, gf_mat:6,        // бабушка/дедушка по матери
  ggm1:7, ggf1:8,            // родители бабушки по отцу
  ggm2:9, ggf2:10,           // родители дедушки по отцу
  ggm3:11, ggf3:12,          // родители бабушки по матери
  ggm4:13, ggf4:14           // родители дедушки по матери
};

// For dynamic nodes: derive order from the node they're attached to
function getNodeOrder(id) {
  if (SORT_MAP[id] !== undefined) return SORT_MAP[id];
  const node = S.tree[id];
  if (!node) return 999;
  // Sibling/spouse → same group as the node they're attached to, +0.5
  const refId = node.siblingOf || node.spouseOf || node.parentOf;
  if (refId && SORT_MAP[refId] !== undefined) return SORT_MAP[refId] + 0.5;
  return 500;
}

// Override rTree from app.js to fix family group ordering
const _origRTree = typeof rTree === "function" ? rTree : null;

rTree = function(am) {
  const mg = maxGen();
  const gens = [];
  for (let i = 0; i <= mg; i++) gens.push([]);
  Object.values(S.tree).forEach(p => {
    if (p.gen >= 0 && p.gen <= mg) gens[p.gen].push(p);
  });
  const sq = (S.search || "").toLowerCase().trim();
  let rows = "";

  for (let g = 0; g <= mg; g++) {
    if (g === 0) {
      rows += `<div class="gen-row"><div class="gen-nodes"><div class="fam-group">${rNd(S.tree.me, am)}</div></div></div>`;
      continue;
    }

    // Group by parent/sibling/spouse
    const fams = {};
    gens[g].forEach(p => {
      const k = p.parentOf || p.siblingOf || p.spouseOf || "x";
      if (!fams[k]) fams[k] = [];
      fams[k].push(p);
    });

    // ★ FIX: Sort family groups by canonical order of their key node
    const sortedKeys = Object.keys(fams).sort((a, b) => getNodeOrder(a) - getNodeOrder(b));

    let fg = "";
    sortedKeys.forEach(k => {
      const f = fams[k];
      // Core first, then by gender (female first = traditional)
      f.sort((a, b) => (b.core || 0) - (a.core || 0) || (a.gender === "f" ? -1 : 1));

      let ns = "";
      f.forEach(p => {
        if (sq) {
          const d = S.data[p.id] || {};
          const txt = `${d.firstName || ""} ${d.surname || ""} ${d.birthPlace || ""} ${p.role}`.toLowerCase();
          if (!txt.includes(sq)) return;
        }
        ns += rNd(p, am);
      });

      // Add button for core node
      const core = f.find(p => p.core) || f[0];
      if (core) {
        const mid = "m_" + core.id;
        const show = S.am === mid;
        const hp = hasParents(core.id);
        ns += `<div style="position:relative;align-self:center">
          <button class="add-btn" onclick="event.stopPropagation();tgA('${mid}')">${ic("plus", "ic-sm")}</button>
          <div class="add-menu ${show ? "show" : ""}" onclick="event.stopPropagation()">
            <button onclick="addSib('${core.id}')">${ic("users", "ic-sm")} Брат/сестра</button>
            <button onclick="addSp('${core.id}')">${ic("ring", "ic-sm")} Супруг(а)</button>
            ${!hp ? `<button onclick="addParents('${core.id}')">${ic("addParent", "ic-sm")} Родители (глубже)</button>` : ""}
          </div>
        </div>`;
      }
      if (ns) fg += `<div class="fam-group">${ns}</div>`;
    });

    if (fg) {
      rows += `<div class="gen-row">
        <div class="gen-banner">${genLabel(g)}</div>
        <div class="gen-nodes">${fg}</div>
      </div>`;
    }
  }

  return `<div class="tree-area">
    <div class="tree-box">${rows}</div>
    <div class="tree-hint">Нажмите карточку для заполнения · «+» добавляет родственника</div>
  </div>`;
};

// ══════ 2. Archive search in person form ══════
// Generate search URL for a specific field value
function fieldArchiveURL(fieldKey, value, person) {
  if (!value || !value.trim()) return null;
  const d = S.data[person] || {};
  const sn = d.surname || d.maidenName || "";
  const fn = d.firstName || "";
  const E = encodeURIComponent;

  switch (fieldKey) {
    case "birthPlace":
    case "period1918":
    case "after1945":
    case "before1917":
      // Search in FamilySearch by place
      return { name: "FamilySearch", url: `https://www.familysearch.org/search/record/results?q.surname=${E(sn)}&q.givenName=${E(fn)}&q.birthLikePlace=${E(value)}` };
    case "warService":
      return sn ? { name: "Память народа", url: `https://pamyat-naroda.ru/heroes/?last_name=${E(sn)}&first_name=${E(fn)}` } : null;
    case "repression":
      return sn ? { name: "Открытый список", url: `https://ru.openlist.wiki/?q=${E(sn + " " + fn)}` } : null;
    case "deportation":
      return sn ? { name: "Память народа", url: `https://pamyat-naroda.ru/heroes/?last_name=${E(sn)}&first_name=${E(fn)}` } : null;
    default:
      return null;
  }
}

// Inject archive search buttons into empty critical fields after render
function injectArchiveButtons() {
  if (!S.sel) return;
  const pid = S.sel;
  const d = S.data[pid] || {};
  const sn = d.surname || d.maidenName || "";
  const fn = d.firstName || "";
  if (!sn && !fn) return;

  // Find all field inputs
  document.querySelectorAll(".field-input[data-p][data-f]").forEach(input => {
    const fieldKey = input.dataset.f;
    const value = input.value?.trim();

    // Add "search in archives" button next to empty important fields
    const searchableFields = ["birthPlace", "period1918", "before1917", "after1945", "warService", "repression", "deportation", "birthDate"];
    if (!searchableFields.includes(fieldKey)) return;
    if (input.parentElement.querySelector(".field-arch-btn")) return; // already added

    const E = encodeURIComponent;
    const links = [];

    if (sn) {
      links.push({ name: "Память народа", url: `https://pamyat-naroda.ru/heroes/?last_name=${E(sn)}&first_name=${E(fn)}`, icon: "shield" });
      links.push({ name: "FamilySearch", url: `https://www.familysearch.org/search/record/results?q.surname=${E(sn)}&q.givenName=${E(fn)}${value ? "&q.birthLikePlace=" + E(value) : ""}`, icon: "search" });
      links.push({ name: "ОБД Мемориал", url: `https://obd-memorial.ru/html/search.htm?surname=${E(sn)}&name=${E(fn)}`, icon: "shield" });
      links.push({ name: "Открытый список", url: `https://ru.openlist.wiki/?q=${E(sn + " " + fn)}`, icon: "search" });
    }

    if (!links.length) return;

    const container = document.createElement("div");
    container.className = "field-arch-btn";
    container.style.cssText = "display:flex;gap:4px;margin-top:4px;flex-wrap:wrap";

    links.forEach(l => {
      const a = document.createElement("a");
      a.href = l.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.style.cssText = "display:inline-flex;align-items:center;gap:3px;padding:3px 8px;background:var(--gold-bg);border:1px solid rgba(212,169,76,.2);border-radius:5px;color:var(--gold);font-size:10px;text-decoration:none;transition:all .15s;font-weight:500";
      a.innerHTML = `${ic(l.icon, "ic-sm")} ${l.name}`;
      a.onmouseover = () => { a.style.borderColor = "var(--gold)"; a.style.background = "rgba(212,169,76,.15)"; };
      a.onmouseout = () => { a.style.borderColor = "rgba(212,169,76,.2)"; a.style.background = "var(--gold-bg)"; };
      container.appendChild(a);
    });

    // Add label
    const label = document.createElement("div");
    label.style.cssText = "font-size:9px;color:var(--dim);margin-top:3px;width:100%";
    label.textContent = value ? "Найти подробности в архивах:" : "Поле пустое — попробуйте найти в архивах:";
    container.insertBefore(label, container.firstChild);

    input.parentElement.appendChild(container);
  });
}

// ══════ 3. Hook into post-render ══════
const _prevR = R;
R = function() {
  _prevR();
  // Inject archive buttons after person form renders
  setTimeout(() => {
    if (S.sel) injectArchiveButtons();
  }, 120);
};

// ══════ 4. Extra CSS ══════
const fixCSS = document.createElement("style");
fixCSS.textContent = `
.field-arch-btn a:hover { border-color: var(--gold) !important; }
`;
document.head.appendChild(fixCSS);

// Re-render to apply fixes
if (S.view !== "lobby") R();

console.log("fix.js loaded: tree ordering fixed, archive search per field active");
