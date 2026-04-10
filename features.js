// features.js v2 — Map, AI, Interview, PDF, Tree Lines, Dashboard, Validation, Migration Paths

// ══════════ Geocoding ══════════
const GEO={"кишинёв":[47.01,28.86],"кишинев":[47.01,28.86],"бельцы":[47.76,27.93],"хотин":[48.51,26.49],"тирасполь":[46.84,29.63],"бендеры":[46.83,29.48],"бендер":[46.83,29.48],"измаил":[45.35,28.84],"болград":[45.68,28.62],"килия":[45.45,29.26],"аккерман":[46.19,30.35],"белгород-днестровский":[46.19,30.35],"бричаны":[48.36,27.08],"бричан":[48.36,27.08],"сороки":[48.17,28.30],"оргеев":[47.38,28.83],"унгены":[47.21,27.80],"кагул":[46.30,28.20],"комрат":[46.30,28.66],"тараклия":[46.27,28.67],"черновцы":[48.29,25.94],"черновиц":[48.29,25.94],"сторожинец":[48.16,25.72],"вижница":[48.25,25.19],"кицмань":[48.41,25.61],"герца":[48.15,26.26],"львов":[49.84,24.03],"тернополь":[49.55,25.59],"ивано-франковск":[48.92,24.71],"станислав":[48.92,24.71],"ужгород":[48.62,22.29],"мукачево":[48.44,22.72],"одесса":[46.48,30.72],"москва":[55.76,37.62],"санкт-петербург":[59.93,30.32],"ленинград":[59.93,30.32],"вильнюс":[54.69,25.28],"вильн":[54.69,25.28],"каунас":[54.90,23.90],"рига":[56.95,24.11],"таллин":[59.44,24.75],"варшава":[52.23,21.01],"краков":[50.06,19.94],"люблин":[51.25,22.57],"энгельс":[51.48,46.11],"саратов":[51.53,46.03],"ташкент":[41.30,69.24],"алматы":[43.24,76.95],"казань":[55.80,49.11],"минск":[53.90,27.57],"киев":[50.45,30.52],"харьков":[49.99,36.23],"мариуполь":[47.10,37.55],"новосибирск":[55.04,82.93],"екатеринбург":[56.84,60.60],"свердловск":[56.84,60.60],"челябинск":[55.16,61.40],"воронеж":[51.67,39.18],"ростов":[47.24,39.71],"краснодар":[45.04,38.98],"тбилиси":[41.69,44.80],"баку":[40.41,49.87],"ереван":[40.18,44.51],"ташкент":[41.30,69.24],"душанбе":[38.56,68.77],"бишкек":[42.87,74.59],"красноярск":[56.01,92.85],"омск":[54.99,73.37],"иркутск":[52.30,104.30],"симферополь":[44.95,34.10],"днепропетровск":[48.46,35.05],"запорожье":[47.84,35.14],"полтава":[49.59,34.55],"винница":[49.23,28.47],"гомель":[52.44,31.00],"витебск":[55.19,30.20],"могилёв":[53.91,30.34],"брест":[52.10,23.70],"гродно":[53.68,23.83],"пермь":[58.01,56.25]};

function geocode(text){if(!text)return null;const t=text.toLowerCase();for(const[p,c]of Object.entries(GEO))if(t.includes(p))return{place:p,coords:c};return null}

function collectPts(){
  const pts=[];
  Object.entries(S.tree).forEach(([id,p])=>{if(id==="me")return;const d=S.data[id]||{};
    const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():p.role;
    [{v:d.birthPlace,l:"Род."},{v:d.period1918,l:"1918-40"},{v:d.after1945,l:"После 1945"},{v:d.deathPlace,l:"Смерть"}].forEach(f=>{
      const g=geocode(f.v);if(g)pts.push({lat:g.coords[0],lng:g.coords[1],name:nm,role:p.role,label:f.l,detail:f.v,gender:p.gender,pid:id,place:g.place})
    })});return pts}

// Collect migration paths (per person, ordered locations)
function collectPaths(){
  const paths=[];
  Object.entries(S.tree).forEach(([id,p])=>{if(id==="me")return;const d=S.data[id]||{};
    const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():p.role;
    const locs=[];
    [{v:d.birthPlace,y:"род."},{v:d.before1917,y:"до 1917"},{v:d.period1918,y:"1918-40"},{v:d.period1941,y:"1941-45"},{v:d.after1945,y:"после 1945"}].forEach(f=>{
      const g=geocode(f.v);if(g)locs.push({lat:g.coords[0],lng:g.coords[1],year:f.y})
    });
    if(locs.length>=2)paths.push({name:nm,gender:p.gender,locs})
  });return paths}

let mapInst=null;
function renderMap(){
  const pts=collectPts(),paths=collectPaths();
  setTimeout(()=>{
    const el=document.getElementById("family-map");if(!el||typeof L==="undefined")return;
    if(mapInst){mapInst.remove();mapInst=null}
    mapInst=L.map(el).setView([48,30],5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OSM",maxZoom:18}).addTo(mapInst);
    const bounds=[];
    // Migration paths
    paths.forEach(path=>{
      const color=path.gender==="f"?"#e07899":"#6b9fd4";
      const coords=path.locs.map(l=>[l.lat,l.lng]);
      L.polyline(coords,{color,weight:2,opacity:.5,dashArray:"6,4"}).addTo(mapInst);
      // Arrow at end
      if(coords.length>=2){const last=coords[coords.length-1];
        L.circleMarker(last,{radius:4,fillColor:color,color:"#fff",weight:1,fillOpacity:.9}).addTo(mapInst)}
    });
    // Markers
    pts.forEach(pt=>{
      const color=pt.gender==="f"?"#e07899":"#6b9fd4";
      const m=L.circleMarker([pt.lat,pt.lng],{radius:7,fillColor:color,color:"#fff",weight:2,fillOpacity:.8}).addTo(mapInst);
      m.bindPopup(`<b>${pt.name}</b><br><small>${pt.role}</small><br>${pt.label}: ${pt.detail}`);
      m.on("click",()=>sel(pt.pid));bounds.push([pt.lat,pt.lng])
    });
    if(bounds.length>1)mapInst.fitBounds(bounds,{padding:[30,30]});
    else if(bounds.length===1)mapInst.setView(bounds[0],8)
  },100)}

// ══════════ AI Analysis ══════════
let aiResult=null,aiLoading=false;
async function runAI(){
  const key=localStorage.getItem("ai_key");if(!key){toast("Введите API ключ");return}
  aiLoading=true;R();
  const summary=Object.entries(S.tree).map(([id,p])=>{if(id==="me")return null;const d=S.data[id]||{};
    const f=Object.entries(d).filter(([k,v])=>v?.trim()).map(([k,v])=>`${k}:${v}`).join(", ");
    return f?`${p.role}(пок.${p.gen}): ${f}`:null}).filter(Boolean).join("\n");
  if(!summary){aiResult="Нет данных. Заполните предков.";aiLoading=false;R();return}
  try{const resp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:3000,messages:[{role:"user",content:`Ты эксперт по генеалогии и иммиграционному праву. Проанализируй семейное древо гражданина РФ из Дубая. Определи: 1)Программы гражданства по происхождению 2)Зацепки для архивов 3)Вопросы родственникам 4)План действий.\n\nДанные:\n${summary}\n\nОтветь подробно на русском.`}]})});
    const data=await resp.json();aiResult=data.error?"Ошибка: "+(data.error.message||""):data.content?.map(c=>c.text).join("\n")||"Нет ответа"
  }catch(e){aiResult="Ошибка: "+e.message}
  aiLoading=false;R()}

// ══════════ Interview ══════════
const IW_STEPS=[
  {q:"Как звали этого человека?",fields:["firstName","patronymic","surname"],hint:"Полное имя, отчество, фамилия"},
  {q:"Была ли другая фамилия?",fields:["maidenName"],hint:"Девичья или до русификации (Попеску→Попов)"},
  {q:"Когда и где родился(ась)?",fields:["birthDate","birthPlace"],hint:"Хотя бы примерно: «около 1920, под Кишинёвом»"},
  {q:"Национальность по паспорту?",fields:["passportNat"],hint:"Графа 5: русский, молдаванин, еврей, немец..."},
  {q:"На каком языке говорил(а) дома?",fields:["nativeLang"],hint:"С родителями, в детстве. Нерусский = маркер"},
  {q:"Какая была вера?",fields:["religion"],hint:"Католик→поляк, лютеранин→немец, иудей→евр. корни"},
  {q:"Где жил(а) в 1918–1940?",fields:["period1918"],hint:"КЛЮЧЕВОЕ. Бессарабия=Румыния, Зап.Украина=Польша"},
  {q:"Репрессии или депортация?",fields:["repression","deportation"],hint:"Депортация = указание на национальность"},
  {q:"Сохранились документы?",fields:["documents"],hint:"Паспорта, свидетельства, фото с подписями"},
  {q:"Что ещё помните?",fields:["notes"],hint:"Легенды, слухи, «о чём не говорят»"}
];
let iwPerson=null,iwStep=0;
function startIW(pid){iwPerson=pid;iwStep=0;S.view="interview";R()}
function nextIW(){if(iwStep<IW_STEPS.length-1){iwStep++;R()}}
function prevIW(){if(iwStep>0){iwStep--;R()}}
function endIW(){iwPerson=null;S.view="tree";R()}

function rIW(){
  if(!iwPerson||!S.tree[iwPerson])return"";
  const p=S.tree[iwPerson],d=S.data[iwPerson]||{},step=IW_STEPS[iwStep];
  const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():p.role;
  const prog=Math.round((iwStep+1)/IW_STEPS.length*100);
  const flds=step.fields.map(k=>{const f=FIELDS.flatMap(s=>s.f).find(ff=>ff.k===k);const v=d[k]||"";
    return`<div style="margin-bottom:10px"><label class="field-label">${esc(f?.l||k)}</label>${f?.m?`<textarea class="field-input" rows="3" placeholder="${esc(f?.p||'')}" data-p="${iwPerson}" data-f="${k}" oninput="uf(this)">${esc(v)}</textarea>`:`<input type="text" class="field-input" placeholder="${esc(f?.p||'')}" value="${esc(v)}" data-p="${iwPerson}" data-f="${k}" oninput="uf(this)">`}</div>`}).join("");
  return`<div class="panel"><div class="panel-inner">
    <div class="panel-hdr"><button class="back-btn" onclick="endIW()">${ic("arrowLeft","ic-sm")} Выйти</button><div style="flex:1"><div class="panel-name">${gIc(p.gender)} ${esc(nm)}</div><div class="panel-role">Вопрос ${iwStep+1}/${IW_STEPS.length}</div></div></div>
    <div class="pbar" style="padding:0;margin-bottom:16px"><div class="ptrack"><div class="pfill" style="width:${prog}%"></div></div></div>
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px">
      <div style="font-family:var(--font-d);font-size:20px;font-weight:700;color:var(--gold);margin-bottom:8px">${esc(step.q)}</div>
      <div style="font-size:12px;color:var(--dim);margin-bottom:16px;font-style:italic">${esc(step.hint)}</div>${flds}</div>
    <div style="display:flex;gap:8px;justify-content:space-between">
      <button class="back-btn" onclick="prevIW()" ${iwStep===0?"disabled style='opacity:.3'":""}>${ic("arrowLeft","ic-sm")} Назад</button>
      ${iwStep<IW_STEPS.length-1?`<button class="share-btn" style="padding:8px 20px;font-size:13px" onclick="nextIW()">Далее →</button>`:`<button class="share-btn" style="padding:8px 20px;font-size:13px;background:var(--green)" onclick="endIW()">Готово ✓</button>`}
    </div></div></div>`}

// ══════════ Validation ══════════
function validate(pid){
  const d=S.data[pid]||{},warns=[];
  const yr=s=>{const m=(s||'').match(/(\d{4})/);return m?parseInt(m[1]):null};
  const by=yr(d.birthDate),dy=yr(d.deathDate);
  if(by&&dy&&dy<by)warns.push("Дата смерти раньше даты рождения");
  if(by&&by<1750)warns.push("Дата рождения подозрительно ранняя (до 1750)");
  if(by&&by>2010)warns.push("Дата рождения в будущем?");
  if(dy&&dy>new Date().getFullYear())warns.push("Дата смерти в будущем?");
  // Check parent-child age consistency
  const p=S.tree[pid];if(p&&p.parentOf){
    const childD=S.data[p.parentOf]||{};const childBy=yr(childD.birthDate);
    if(by&&childBy&&(by-childBy)<14)warns.push(`Разница с ребёнком менее 14 лет (${by} vs ${childBy})`)
  }
  if(d.birthPlace&&!d.period1918&&by&&by<1940)warns.push("Не заполнен ключевой период 1918–1940");
  return warns}

// ══════════ Dashboard ══════════
function rDashboard(){
  const ids=Object.keys(S.tree).filter(k=>k!=="me");
  const byGen={};ids.forEach(id=>{const g=S.tree[id].gen;if(!byGen[g])byGen[g]={total:0,filled:0,pct:0};byGen[g].total++;byGen[g].filled+=pct(id)});
  Object.values(byGen).forEach(g=>{g.pct=g.total?Math.round(g.filled/(g.total*100)*100):0});
  // Priority list: least filled critical people
  const priority=ids.map(id=>({id,pct:pct(id),role:S.tree[id].role,name:(S.data[id]?.firstName||S.data[id]?.surname)?`${S.data[id].firstName||''} ${S.data[id].surname||''}`.trim():null,gen:S.tree[id].gen})).filter(p=>p.pct<50).sort((a,b)=>a.gen-b.gen||a.pct-b.pct).slice(0,8);
  // Geo summary
  const geoCount={};collectPts().forEach(pt=>{geoCount[pt.place]=(geoCount[pt.place]||0)+1});
  const topPlaces=Object.entries(geoCount).sort((a,b)=>b[1]-a[1]).slice(0,6);

  let h=`<div style="margin:12px 16px"><div class="gq-title" style="margin-bottom:12px">${ic("tree","ic-lg")} Обзор древа</div>`;
  // Gen completion bars
  h+=`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-bottom:16px">`;
  Object.entries(byGen).sort((a,b)=>a[0]-b[0]).forEach(([g,data])=>{
    h+=`<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 12px">
      <div style="font-size:11px;color:var(--dim);margin-bottom:4px">${genLabel(parseInt(g))}</div>
      <div style="font-size:20px;font-weight:700;font-family:var(--font-d);color:${data.pct>60?"var(--green)":"var(--gold)"}">${data.pct}%</div>
      <div class="ptrack" style="margin-top:4px"><div class="pfill" style="width:${data.pct}%"></div></div>
      <div style="font-size:10px;color:var(--dim);margin-top:2px">${data.total} чел.</div></div>`});
  h+=`</div>`;
  // Priority
  if(priority.length){
    h+=`<div style="margin-bottom:16px"><div style="font-size:13px;font-weight:600;margin-bottom:6px;color:var(--gold)">Заполните в первую очередь:</div>`;
    priority.forEach(p=>{h+=`<div class="alert-person" onclick="sel('${p.id}')"><span style="color:${S.tree[p.id].gender==="f"?"var(--fem)":"var(--mal)"}">${gIc(S.tree[p.id].gender)}</span><div style="flex:1"><div style="font-size:12px;font-weight:600">${esc(p.name||p.role)}</div><div style="font-size:10px;color:var(--dim)">${esc(p.role)} · ${p.pct}%</div></div><span style="color:var(--dim)">→</span></div>`});
    h+=`</div>`}
  // Top places
  if(topPlaces.length){
    h+=`<div style="margin-bottom:16px"><div style="font-size:13px;font-weight:600;margin-bottom:6px;color:var(--gold)">География семьи:</div><div style="display:flex;flex-wrap:wrap;gap:6px">`;
    topPlaces.forEach(([place,count])=>{h+=`<span class="stat-chip">${ic("pin","ic-sm")} ${place} <strong>${count}</strong></span>`});
    h+=`</div></div>`}
  h+=`</div>`;return h}

// ══════════ PDF ══════════
function printTree(){
  const w=window.open("","","width=800,height=600");
  let h=`<html><head><title>Семейное Древо</title><style>body{font-family:Georgia,serif;padding:20px;color:#222}h1{color:#8a7535;border-bottom:2px solid #d4a94c;padding-bottom:8px}h2{color:#555;margin-top:20px}.person{margin-bottom:16px;padding:12px;border:1px solid #ddd;border-radius:8px;page-break-inside:avoid}.person h3{color:#8a7535;margin-bottom:6px}.field{margin:3px 0;font-size:13px}.field b{color:#555}.alert{background:#fff3e0;padding:3px 8px;border-radius:4px;font-size:12px;color:#e65100;display:inline-block;margin:2px}</style></head><body>`;
  h+=`<h1>Семейное Древо — Отчёт</h1><p>Дата: ${new Date().toLocaleDateString("ru-RU")}</p>`;
  const citR=checkCitizenship();
  if(citR.length){h+=`<h2>Потенциальное гражданство (${citR.length})</h2>`;citR.forEach(r=>{h+=`<div class="person"><h3>${r.flag} ${r.country} — ${r.confidence==="high"?"ВЫСОКАЯ":r.confidence==="medium"?"СРЕДНЯЯ":"НИЗКАЯ"}</h3><div class="field"><b>Предок:</b> ${r.personName} (${r.genName})</div><div class="field"><b>Основание:</b> ${r.basis}</div><div class="field"><b>Стоимость:</b> ${r.cost} · <b>Срок:</b> ${r.time}</div></div>`})}
  h+=`<h2>Данные о предках</h2>`;
  Object.entries(S.tree).forEach(([id,p])=>{if(id==="me")return;const d=S.data[id]||{};
    const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():p.role;
    const filled=Object.entries(d).filter(([k,v])=>v?.trim());if(!filled.length)return;
    h+=`<div class="person"><h3>${p.gender==="f"?"♀":"♂"} ${nm} — ${p.role}</h3>`;
    filled.forEach(([k,v])=>{const f=FIELDS.flatMap(s=>s.f).find(ff=>ff.k===k);h+=`<div class="field"><b>${f?.l||k}:</b> ${v}</div>`});
    const mk=mks(id);if(mk.length)h+=`<div>${mk.map(m=>`<span class="alert">${m}</span>`).join(" ")}</div>`;
    h+=`</div>`});
  h+=`</body></html>`;w.document.write(h);w.document.close();setTimeout(()=>w.print(),300)}

// ══════════ Tree Connection Lines ══════════
function drawTreeLines(){
  const container=document.querySelector(".tree-box");if(!container)return;
  let svg=document.getElementById("tree-svg-lines");
  if(svg)svg.remove();
  svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.id="tree-svg-lines";
  svg.style.cssText="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1";
  container.style.position="relative";
  container.insertBefore(svg,container.firstChild);
  const cRect=container.getBoundingClientRect();
  // Find all parent-child connections
  Object.entries(S.tree).forEach(([id,p])=>{
    if(!p.parentOf||p.siblingOf||p.spouseOf)return;
    const parentEl=container.querySelector(`[data-nid="${id}"]`);
    const childEl=container.querySelector(`[data-nid="${p.parentOf}"]`);
    if(!parentEl||!childEl)return;
    const pR=parentEl.getBoundingClientRect();
    const cR=childEl.getBoundingClientRect();
    const x1=pR.left+pR.width/2-cRect.left;
    const y1=pR.bottom-cRect.top;
    const x2=cR.left+cR.width/2-cRect.left;
    const y2=cR.top-cRect.top;
    const midY=(y1+y2)/2;
    const path=document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute("d",`M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`);
    path.setAttribute("fill","none");
    path.setAttribute("stroke","rgba(212,169,76,0.25)");
    path.setAttribute("stroke-width","1.5");
    svg.appendChild(path);
  });
}

// ══════════ Inject CSS ══════════
const css=document.createElement("style");
css.textContent=`
.ai-result{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px;margin-top:12px;font-size:13px;line-height:1.7;white-space:pre-wrap}
.ai-loading{text-align:center;padding:20px;color:var(--gold);font-style:italic}
.ai-key-input{display:flex;gap:8px;margin-bottom:12px;align-items:center}
.ai-key-input input{flex:1;background:var(--bg2);border:1px solid var(--border);border-radius:7px;padding:8px;color:var(--text);font-size:12px;outline:none;font-family:monospace}
.ai-key-input input:focus{border-color:var(--gold)}
.ai-key-input button{background:var(--gold);color:var(--bg);border:none;border-radius:7px;padding:8px 14px;font-size:12px;font-weight:600;white-space:nowrap}
.iw-btn{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:6px 12px;color:var(--text);font-size:11px;display:inline-flex;align-items:center;gap:5px;transition:all .2s;margin-left:auto}
.iw-btn:hover{border-color:var(--gold);background:var(--gold-bg)}
.val-warn{font-size:10px;color:var(--alert);padding:4px 8px;background:var(--alert-bg);border-radius:4px;margin-top:4px;display:flex;align-items:center;gap:4px}
#tree-svg-lines path{transition:d .3s}
`;
document.head.appendChild(css);

// ══════════ Override Render ══════════
const _origR=R;
const _origRNd=window.rNd||(()=>"");

// Override R to add new views, dashboard, tree lines, validation
R=function(){
  if(S.view==="map"){renderMapView();return}
  if(S.view==="interview"){document.getElementById("app").innerHTML=rIW();return}
  if(S.view==="dashboard"){renderDashView();return}
  _origR();
  // Post-render enhancements
  setTimeout(()=>{
    // Draw tree connection lines
    if(S.view==="tree"&&!S.sel)drawTreeLines();
    // Add data-nid to nodes for line drawing
    document.querySelectorAll(".node").forEach(el=>{
      const onclick=el.getAttribute("onclick")||"";
      const m=onclick.match(/sel\('([^']+)'\)/);
      if(m)el.setAttribute("data-nid",m[1]);
    });
    // Me node
    const meNode=document.querySelector(".me-node");
    if(meNode)meNode.setAttribute("data-nid","me");
    // Redraw after attributes set
    if(S.view==="tree"&&!S.sel)drawTreeLines();
    // Add interview button to person panel
    if(S.sel){
      const hdr=document.querySelector(".panel-hdr");
      if(hdr&&!document.getElementById("iw-trigger")){
        const btn=document.createElement("button");btn.id="iw-trigger";btn.className="iw-btn";
        btn.innerHTML=`${ic("scroll","ic-sm")} Интервью`;btn.onclick=()=>startIW(S.sel);
        hdr.appendChild(btn)}
      // Add validation warnings
      const warns=validate(S.sel);
      if(warns.length){const hdrEl=document.querySelector(".panel-hdr");if(hdrEl){
        const wDiv=document.createElement("div");wDiv.style.cssText="margin:-8px 0 10px";
        warns.forEach(w=>{const d=document.createElement("div");d.className="val-warn";d.innerHTML=`${ic("bolt","ic-sm")} ${esc(w)}`;wDiv.appendChild(d)});
        hdrEl.after(wDiv)}}
    }
    // Add dashboard link to tree view
    if(S.view==="tree"&&!S.sel){
      const hint=document.querySelector(".tree-hint");
      if(hint&&!document.getElementById("dash-link")){
        const d=document.createElement("div");d.id="dash-link";d.style.cssText="text-align:center;margin-top:8px";
        d.innerHTML=`<button class="iw-btn" onclick="go('dashboard')">${ic("tree","ic-sm")} Дашборд и приоритеты</button>`;
        hint.after(d)}}
  },80);
};

function renderMapView(){
  const pts=collectPts(),paths=collectPaths(),aiKey=localStorage.getItem("ai_key")||"";
  const al=aAlerts(),citR=checkCitizenship(),ids=Object.keys(S.tree).filter(k=>k!=="me");
  const tot=ids.reduce((s,k)=>s+pct(k),0),pr=ids.length?Math.round(tot/(ids.length*100)*100):0;
  let h=renderHdr2();
  h+=`<div class="panel"><div class="panel-inner">
    <div class="gq-title">${ic("map","ic-lg")} Карта миграций</div>
    <div class="gq-desc">${pts.length} точек, ${paths.length} путей миграции. Пунктирные линии показывают переезды.</div>
    ${pts.length?`<div id="family-map" class="map-container"></div>`:`<div class="alerts-empty"><div style="color:var(--dim)">Заполните места рождения.</div></div>`}
    <div style="margin-top:24px"><div class="gq-title" style="font-size:18px">${ic("bolt","ic-lg")} AI-анализ (Claude)</div>
    <div class="gq-desc">Отправляет данные в Claude для экспертного анализа. Нужен <a href="https://console.anthropic.com/" target="_blank" style="color:var(--gold)">API-ключ Anthropic</a>.</div>
    <div class="ai-key-input"><input type="password" placeholder="sk-ant-..." value="${esc(aiKey)}" onchange="localStorage.setItem('ai_key',this.value)"><button onclick="runAI()">${aiLoading?"Анализ...":"Запустить"}</button></div>
    ${aiLoading?`<div class="ai-loading">Claude анализирует...</div>`:""}${aiResult?`<div class="ai-result">${esc(aiResult)}</div>`:""}</div>
    <div style="margin-top:24px"><div class="gq-title" style="font-size:18px">${ic("scroll","ic-lg")} PDF-отчёт</div>
    <div class="gq-desc">Для печати или юриста.</div>
    <button class="share-btn" style="padding:8px 16px;font-size:13px" onclick="printTree()">Сформировать</button></div>
  </div></div>`;
  document.getElementById("app").innerHTML=h;
  if(pts.length)renderMap()}

function renderDashView(){
  let h=renderHdr2();
  h+=`<div class="panel"><div class="panel-inner">${rDashboard()}</div></div>`;
  document.getElementById("app").innerHTML=h}

function renderHdr2(){
  const al=aAlerts(),citR=checkCitizenship(),ids=Object.keys(S.tree).filter(k=>k!=="me");
  const tot=ids.reduce((s,k)=>s+pct(k),0),pr=ids.length?Math.round(tot/(ids.length*100)*100):0;
  const sy=db?(S.sync?`<span class="sync on">${ic("cloud","ic-sm")} синхр.</span>`:`<span class="sync off">ожид.</span>`):`<span class="sync off">${ic("disk","ic-sm")} лок.</span>`;
  const tf=Object.values(S.files).reduce((s,f)=>s+(f?.length||0),0);
  let h=`<div class="hdr"><div class="hdr-logo"><div class="hdr-mark">${ic("tree","ic-md")}</div><div><div class="hdr-title">Семейное Древо</div><div class="hdr-sub">${sy}</div></div></div>
  <div class="nav">
    <button class="nb ${S.view==="tree"&&!S.sel?"on":""}" onclick="go('tree')">${ic("tree","ic-sm")} Древо</button>
    <button class="nb ${S.view==="cit"?"on":""}" onclick="go('cit')">${ic("passport","ic-sm")} Гражд.${citR.length?`<span class="bdg">${citR.length}</span>`:""}</button>
    <button class="nb ${S.view==="map"?"on":""}" onclick="go('map')">${ic("map","ic-sm")} Карта</button>
    <button class="nb ${S.view==="timeline"?"on":""}" onclick="go('timeline')">${ic("clock","ic-sm")} Хрон.</button>
    <button class="nb ${S.view==="dashboard"?"on":""}" onclick="go('dashboard')">${ic("tree","ic-sm")} Обзор</button>
    <button class="nb ${S.view==="alerts"?"on":""}" onclick="go('alerts')">${ic("bolt","ic-sm")}${al.length?`<span class="bdg">${al.length}</span>`:""}</button>
    <button class="nb ${S.view==="general"?"on":""}" onclick="go('general')">${ic("scroll","ic-sm")}</button>
    <span class="sep"></span>
    <button class="ib" onclick="printTree()" title="PDF">${ic("scroll","ic-sm")}</button>
    <button class="ib" onclick="doExp()">${ic("save","ic-sm")}</button><button class="ib" onclick="doImp()">${ic("folder","ic-sm")}</button><button class="ib" onclick="doRst()">${ic("trash","ic-sm")}</button>
  </div></div>
  <div class="pbar"><div class="ptrack"><div class="pfill" style="width:${pr}%"></div></div><span class="plbl">${pr}%</span></div>`;
  if(S.rid){let qrImg="";try{const qr=qrcode(0,"M");qr.addData(location.origin+location.pathname+"?room="+S.rid);qr.make();qrImg=qr.createDataURL(3)}catch{}
    h+=`<div class="share"><span style="font-size:11px;color:var(--dim)">Код:</span><span class="share-code">${S.rid}</span><button class="share-btn" onclick="cpL()">${ic("copy","ic-sm")} Ссылка</button>${qrImg?`<div class="share-qr"><img src="${qrImg}"></div>`:""}</div>`}
  h+=`<div class="stats-bar"><span class="stat-chip">${ic("person","ic-sm")} <strong>${ids.length}</strong></span><span class="stat-chip">${ic("passport","ic-sm")} <strong>${citR.length}</strong> программ</span><span class="stat-chip">${ic("bolt","ic-sm")} <strong>${al.length}</strong> зацепок</span><span class="stat-chip">${ic("image","ic-sm")} <strong>${tf}</strong> файлов</span></div>`;
  return h}

// Wire up globals
window.startIW=startIW;window.nextIW=nextIW;window.prevIW=prevIW;window.endIW=endIW;
window.runAI=runAI;window.printTree=printTree;

// Re-render
if(S.view!=="lobby")R();
