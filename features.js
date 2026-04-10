// features.js v3 — Identity system, delete fix, map, AI, interview, PDF, dashboard, validation, tree lines

// ══════ FIX: Delete via capture-phase delegation ══════
document.addEventListener("click",function(e){
  const btn=e.target.closest(".del-btn");
  if(!btn)return;
  e.stopPropagation();e.stopImmediatePropagation();e.preventDefault();
  // Extract ID from nearest node's onclick or data attribute
  const node=btn.closest(".node");if(!node)return;
  const oc=node.getAttribute("onclick")||"";
  const m=oc.match(/sel\('([^']+)'\)/);
  const pid=node.getAttribute("data-nid")||( m?m[1]:null);
  if(!pid)return;
  if(S.tree[pid]?.core){toast("Основных родственников нельзя удалить");return}
  if(confirm("Удалить "+( S.tree[pid]?.role||"этого родственника")+"?")){
    _delP(pid)
  }
},true); // capture phase = fires before inline onclick

// ══════ Identity System ══════
let viewerId=null; // who is viewing the tree
function getViewerId(){
  if(viewerId)return viewerId;
  const u=new URLSearchParams(location.search).get("who");
  if(u&&S.tree[u]){viewerId=u;localStorage.setItem("viewer_"+S.rid,u);return u}
  const saved=localStorage.getItem("viewer_"+(S.rid||"local"));
  if(saved&&S.tree[saved]){viewerId=saved;return saved}
  return null;
}
function setViewer(id){viewerId=id;localStorage.setItem("viewer_"+(S.rid||"local"),id);R()}
function clearViewer(){viewerId=null;localStorage.removeItem("viewer_"+(S.rid||"local"));R()}
function getInviteLink(personId){
  const base=location.origin+location.pathname;
  return S.rid?`${base}?room=${S.rid}&who=${personId}`:`${base}?who=${personId}`}

// Relationship hint from viewer to another person
function relHint(viewId,targetId){
  if(viewId===targetId)return"ВЫ";
  const v=S.tree[viewId],t=S.tree[targetId];if(!v||!t)return"";
  const vg=v.gen,tg=t.gen;
  if(tg<vg){
    const diff=vg-tg;
    if(diff===1){if(t.parentOf===viewId||t.siblingOf&&S.tree[t.siblingOf]?.parentOf===viewId)return"Ваш ребёнок";return"Младшее поколение"}
    if(diff===2)return"Ваш внук(чка)";
    return"Потомок"
  }
  if(tg>vg){
    const diff=tg-vg;
    // Check if target is direct ancestor
    if(diff===1&&t.parentOf===viewId)return"Ваш родитель";
    if(diff===1)return"Старшее поколение";
    if(diff===2)return"Ваш(а) бабушка/дедушка";
    return"Предок"
  }
  // Same generation
  if(t.siblingOf===viewId||v.siblingOf===targetId)return"Ваш(а) брат/сестра";
  if(t.spouseOf===viewId||v.spouseOf===targetId)return"Ваш(а) супруг(а)";
  return"Одно поколение"
}

// ══════ Who Are You Modal ══════
let showWhoModal=false;
function rWhoModal(){
  if(!showWhoModal)return"";
  const people=Object.entries(S.tree).filter(([id])=>id!=="me").map(([id,p])=>{
    const d=S.data[id]||{};
    const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():null;
    return{id,role:p.role,name:nm,gender:p.gender,gen:p.gen}
  }).sort((a,b)=>a.gen-b.gen);

  let list=people.map(p=>`
    <div onclick="setViewer('${p.id}');showWhoModal=false;R()" style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg2);border:1px solid var(--border);border-radius:8px;margin-bottom:6px;cursor:pointer;transition:border-color .2s" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
      <span style="color:${p.gender==="f"?"var(--fem)":"var(--mal)"}">${gIc(p.gender)}</span>
      <div style="flex:1"><div style="font-size:13px;font-weight:600">${esc(p.name||"Не заполнено")}</div><div style="font-size:11px;color:var(--dim)">${esc(p.role)}</div></div>
    </div>`).join("");

  return`<div style="position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:300;display:flex;align-items:center;justify-content:center;padding:16px" onclick="if(event.target===this){showWhoModal=false;R()}">
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:28px 24px;max-width:420px;width:100%;max-height:80vh;overflow-y:auto" onclick="event.stopPropagation()">
      <div style="font-family:var(--font-d);font-size:22px;font-weight:700;color:var(--gold);margin-bottom:4px">Кто вы в этом древе?</div>
      <div style="font-size:13px;color:var(--dim);margin-bottom:16px;line-height:1.5">Выберите себя, чтобы мы подсказали, какие данные нужно заполнить именно вам. Древо покажет связи от вашего лица.</div>
      ${list}
      <button onclick="showWhoModal=false;R()" style="width:100%;padding:10px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--dim);font-size:12px;margin-top:8px">Пропустить — я просто смотрю</button>
    </div>
  </div>`
}

// ══════ Invite Modal ══════
let showInvite=false;
function rInviteModal(){
  if(!showInvite)return"";
  const people=Object.entries(S.tree).filter(([id])=>id!=="me").map(([id,p])=>{
    const d=S.data[id]||{};const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():null;
    return{id,role:p.role,name:nm,gender:p.gender}
  });
  let list=people.map(p=>{
    const link=getInviteLink(p.id);
    return`<div style="display:flex;align-items:center;gap:8px;padding:8px;background:var(--bg2);border-radius:8px;margin-bottom:4px">
      <span style="color:${p.gender==="f"?"var(--fem)":"var(--mal)"}">${gIc(p.gender)}</span>
      <div style="flex:1;font-size:12px"><div style="font-weight:600">${esc(p.name||"Не заполнено")}</div><div style="color:var(--dim);font-size:10px">${esc(p.role)}</div></div>
      <button onclick="navigator.clipboard?.writeText('${link}');toast('Ссылка для ${esc(p.name||p.role)} скопирована!')" style="background:var(--gold);color:var(--bg);border:none;border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600;white-space:nowrap">${ic("copy","ic-sm")} Ссылка</button>
    </div>`
  }).join("");
  return`<div style="position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:300;display:flex;align-items:center;justify-content:center;padding:16px" onclick="if(event.target===this){showInvite=false;R()}">
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:28px 24px;max-width:420px;width:100%;max-height:80vh;overflow-y:auto" onclick="event.stopPropagation()">
      <div style="font-family:var(--font-d);font-size:22px;font-weight:700;color:var(--gold);margin-bottom:4px">Пригласить родственника</div>
      <div style="font-size:13px;color:var(--dim);margin-bottom:16px;line-height:1.5">Выберите, кого пригласить. Каждый получит персональную ссылку — откроет древо и сразу увидит свою карточку.</div>
      ${list}
      <button onclick="showInvite=false;R()" style="width:100%;padding:10px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--dim);font-size:12px;margin-top:8px">Закрыть</button>
    </div>
  </div>`
}

// ══════ Geocoding & Map ══════
const GEO={"кишинёв":[47.01,28.86],"кишинев":[47.01,28.86],"бельцы":[47.76,27.93],"хотин":[48.51,26.49],"тирасполь":[46.84,29.63],"бендер":[46.83,29.48],"измаил":[45.35,28.84],"болград":[45.68,28.62],"килия":[45.45,29.26],"аккерман":[46.19,30.35],"бричан":[48.36,27.08],"черновцы":[48.29,25.94],"черновиц":[48.29,25.94],"львов":[49.84,24.03],"тернополь":[49.55,25.59],"ужгород":[48.62,22.29],"мукачево":[48.44,22.72],"одесса":[46.48,30.72],"москва":[55.76,37.62],"ленинград":[59.93,30.32],"санкт-петербург":[59.93,30.32],"вильнюс":[54.69,25.28],"вильн":[54.69,25.28],"каунас":[54.90,23.90],"рига":[56.95,24.11],"таллин":[59.44,24.75],"варшава":[52.23,21.01],"краков":[50.06,19.94],"энгельс":[51.48,46.11],"саратов":[51.53,46.03],"ташкент":[41.30,69.24],"минск":[53.90,27.57],"киев":[50.45,30.52],"харьков":[49.99,36.23],"мариуполь":[47.10,37.55],"екатеринбург":[56.84,60.60],"свердловск":[56.84,60.60],"новосибирск":[55.04,82.93],"красноярск":[56.01,92.85],"ереван":[40.18,44.51],"тбилиси":[41.69,44.80],"баку":[40.41,49.87],"воронеж":[51.67,39.18],"ростов":[47.24,39.71],"симферополь":[44.95,34.10],"днепропетровск":[48.46,35.05],"гомель":[52.44,31.00],"витебск":[55.19,30.20],"брест":[52.10,23.70],"гродно":[53.68,23.83],"пермь":[58.01,56.25],"омск":[54.99,73.37],"иркутск":[52.30,104.30]};
function geocode(t){if(!t)return null;t=t.toLowerCase();for(const[p,c]of Object.entries(GEO))if(t.includes(p))return{place:p,coords:c};return null}
function collectPts(){const pts=[];Object.entries(S.tree).forEach(([id,p])=>{if(id==="me")return;const d=S.data[id]||{};const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():p.role;[{v:d.birthPlace,l:"Род."},{v:d.period1918,l:"1918-40"},{v:d.after1945,l:"После 1945"}].forEach(f=>{const g=geocode(f.v);if(g)pts.push({lat:g.coords[0],lng:g.coords[1],name:nm,role:p.role,label:f.l,detail:f.v,gender:p.gender,pid:id})})});return pts}
function collectPaths(){const paths=[];Object.entries(S.tree).forEach(([id,p])=>{if(id==="me")return;const d=S.data[id]||{};const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():p.role;const locs=[];[{v:d.birthPlace},{v:d.period1918},{v:d.after1945}].forEach(f=>{const g=geocode(f.v);if(g)locs.push([g.coords[0],g.coords[1]])});if(locs.length>=2)paths.push({name:nm,gender:p.gender,locs})});return paths}
let mapI=null;
function renderMap(){const pts=collectPts(),paths=collectPaths();setTimeout(()=>{const el=document.getElementById("fmap");if(!el||typeof L==="undefined")return;if(mapI){mapI.remove();mapI=null}mapI=L.map(el).setView([48,30],5);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"©OSM",maxZoom:18}).addTo(mapI);const bounds=[];paths.forEach(p=>{L.polyline(p.locs,{color:p.gender==="f"?"#e07899":"#6b9fd4",weight:2,opacity:.4,dashArray:"6,4"}).addTo(mapI)});pts.forEach(pt=>{const c=pt.gender==="f"?"#e07899":"#6b9fd4";const m=L.circleMarker([pt.lat,pt.lng],{radius:7,fillColor:c,color:"#fff",weight:2,fillOpacity:.8}).addTo(mapI);m.bindPopup(`<b>${pt.name}</b><br><small>${pt.role} · ${pt.label}</small><br>${pt.detail}`);m.on("click",()=>sel(pt.pid));bounds.push([pt.lat,pt.lng])});if(bounds.length>1)mapI.fitBounds(bounds,{padding:[30,30]});else if(bounds.length===1)mapI.setView(bounds[0],8)},100)}

// ══════ AI ══════
let aiRes=null,aiLoad=false;
async function runAI(){const key=localStorage.getItem("ai_key");if(!key){toast("Введите API ключ");return}aiLoad=true;R();
  const sum=Object.entries(S.tree).map(([id,p])=>{if(id==="me")return null;const d=S.data[id]||{};const f=Object.entries(d).filter(([k,v])=>v?.trim()).map(([k,v])=>`${k}:${v}`).join(", ");return f?`${p.role}(пок.${p.gen}):${f}`:null}).filter(Boolean).join("\n");
  if(!sum){aiRes="Нет данных.";aiLoad=false;R();return}
  try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:3000,messages:[{role:"user",content:`Ты эксперт по генеалогии и иммиграционному праву. Проанализируй древо гражданина РФ из Дубая.\n1)Программы гражданства\n2)Зацепки для архивов\n3)Вопросы родственникам\n4)План действий\n\n${sum}\n\nОтветь подробно на русском.`}]})});
    const d=await r.json();aiRes=d.error?"Ошибка: "+d.error.message:d.content?.map(c=>c.text).join("\n")||""}catch(e){aiRes="Ошибка: "+e.message}aiLoad=false;R()}

// ══════ Interview ══════
const IWS=[{q:"Как звали?",f:["firstName","patronymic","surname"],h:"Полное имя, отчество, фамилия"},{q:"Другая фамилия при рождении?",f:["maidenName"],h:"Девичья или до русификации"},{q:"Когда и где родился(ась)?",f:["birthDate","birthPlace"],h:"Хотя бы примерно"},{q:"Национальность по паспорту?",f:["passportNat"],h:"Графа 5"},{q:"Язык дома?",f:["nativeLang"],h:"Нерусский = маркер"},{q:"Вера?",f:["religion"],h:"Не-православие = маркер"},{q:"Где жил(а) в 1918–1940?",f:["period1918"],h:"КЛЮЧЕВОЕ"},{q:"Репрессии/депортация?",f:["repression","deportation"],h:"Указывает на национальность"},{q:"Документы?",f:["documents"],h:"Любые сохранившиеся"},{q:"Что ещё помните?",f:["notes"],h:"Легенды, слухи"}];
let iwP=null,iwS=0;
function startIW(pid){iwP=pid;iwS=0;S.view="interview";R()}
function rIW(){if(!iwP||!S.tree[iwP])return"";const p=S.tree[iwP],d=S.data[iwP]||{},step=IWS[iwS];
  const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():p.role;const prog=Math.round((iwS+1)/IWS.length*100);
  const flds=step.f.map(k=>{const f=FIELDS.flatMap(s=>s.f).find(ff=>ff.k===k);const v=d[k]||"";
    return`<div style="margin-bottom:10px"><label class="field-label">${esc(f?.l||k)}</label>${f?.m?`<textarea class="field-input" rows="3" placeholder="${esc(f?.p||'')}" data-p="${iwP}" data-f="${k}" oninput="uf(this)">${esc(v)}</textarea>`:`<input type="text" class="field-input" placeholder="${esc(f?.p||'')}" value="${esc(v)}" data-p="${iwP}" data-f="${k}" oninput="uf(this)">`}</div>`}).join("");
  return`<div class="panel"><div class="panel-inner"><div class="panel-hdr"><button class="back-btn" onclick="endIW()">${ic("arrowLeft","ic-sm")} Выйти</button><div style="flex:1"><div class="panel-name">${gIc(p.gender)} ${esc(nm)}</div><div class="panel-role">Вопрос ${iwS+1}/${IWS.length}</div></div></div>
  <div class="pbar" style="padding:0;margin-bottom:16px"><div class="ptrack"><div class="pfill" style="width:${prog}%"></div></div></div>
  <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px"><div style="font-family:var(--font-d);font-size:20px;font-weight:700;color:var(--gold);margin-bottom:8px">${esc(step.q)}</div><div style="font-size:12px;color:var(--dim);margin-bottom:16px;font-style:italic">${esc(step.h)}</div>${flds}</div>
  <div style="display:flex;gap:8px;justify-content:space-between"><button class="back-btn" onclick="iwS>0?iwS--:0;R()" ${iwS===0?"disabled style='opacity:.3'":""}>${ic("arrowLeft","ic-sm")} Назад</button>${iwS<IWS.length-1?`<button class="share-btn" style="padding:8px 20px" onclick="iwS++;R()">Далее →</button>`:`<button class="share-btn" style="padding:8px 20px;background:var(--green)" onclick="endIW()">Готово ✓</button>`}</div></div></div>`}
function endIW(){iwP=null;S.view="tree";R()}

// ══════ Validation ══════
function validate(pid){const d=S.data[pid]||{},w=[];const yr=s=>{const m=(s||'').match(/(\d{4})/);return m?parseInt(m[1]):null};
  const by=yr(d.birthDate),dy=yr(d.deathDate);
  if(by&&dy&&dy<by)w.push("Дата смерти раньше рождения");
  if(by&&by<1750)w.push("Год рождения подозрительно ранний");
  if(by&&by>new Date().getFullYear())w.push("Год рождения в будущем");
  const p=S.tree[pid];if(p?.parentOf){const cd=S.data[p.parentOf]||{};const cby=yr(cd.birthDate);if(by&&cby&&(by-cby)<14)w.push("Разница с ребёнком менее 14 лет")}
  if(!d.period1918&&by&&by<1940&&d.birthPlace)w.push("Не заполнен ключевой период 1918–1940");
  return w}

// ══════ Dashboard ══════
function rDash(){
  const ids=Object.keys(S.tree).filter(k=>k!=="me");const byGen={};
  ids.forEach(id=>{const g=S.tree[id].gen;if(!byGen[g])byGen[g]={t:0,f:0};byGen[g].t++;byGen[g].f+=pct(id)});
  Object.values(byGen).forEach(g=>{g.p=g.t?Math.round(g.f/(g.t*100)*100):0});
  const prio=ids.map(id=>({id,p:pct(id),role:S.tree[id].role,name:(S.data[id]?.firstName||S.data[id]?.surname)?`${S.data[id].firstName||''} ${S.data[id].surname||''}`.trim():null,gen:S.tree[id].gen,gender:S.tree[id].gender})).filter(p=>p.p<50).sort((a,b)=>a.gen-b.gen||a.p-b.p).slice(0,8);
  const geoC={};collectPts().forEach(pt=>{geoC[pt.place]=(geoC[pt.place]||0)+1});const topP=Object.entries(geoC).sort((a,b)=>b[1]-a[1]).slice(0,6);
  let h=`<div style="margin:12px 16px"><div class="gq-title" style="margin-bottom:12px">${ic("tree","ic-lg")} Обзор древа</div>`;
  h+=`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-bottom:16px">`;
  Object.entries(byGen).sort((a,b)=>a[0]-b[0]).forEach(([g,d])=>{h+=`<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 12px"><div style="font-size:11px;color:var(--dim);margin-bottom:4px">${genLabel(parseInt(g))}</div><div style="font-size:20px;font-weight:700;font-family:var(--font-d);color:${d.p>60?"var(--green)":"var(--gold)"}">${d.p}%</div><div class="ptrack" style="margin-top:4px"><div class="pfill" style="width:${d.p}%"></div></div><div style="font-size:10px;color:var(--dim);margin-top:2px">${d.t} чел.</div></div>`});
  h+=`</div>`;
  if(prio.length){h+=`<div style="margin-bottom:16px"><div style="font-size:13px;font-weight:600;margin-bottom:6px;color:var(--gold)">Заполните в первую очередь:</div>`;
    prio.forEach(p=>{h+=`<div class="alert-person" onclick="sel('${p.id}')"><span style="color:${p.gender==="f"?"var(--fem)":"var(--mal)"}">${gIc(p.gender)}</span><div style="flex:1"><div style="font-size:12px;font-weight:600">${esc(p.name||p.role)}</div><div style="font-size:10px;color:var(--dim)">${esc(p.role)} · ${p.p}%</div></div><span style="color:var(--dim)">→</span></div>`});h+=`</div>`}
  if(topP.length){h+=`<div><div style="font-size:13px;font-weight:600;margin-bottom:6px;color:var(--gold)">География:</div><div style="display:flex;flex-wrap:wrap;gap:6px">`;topP.forEach(([p,c])=>{h+=`<span class="stat-chip">${ic("pin","ic-sm")} ${p} <strong>${c}</strong></span>`});h+=`</div></div>`}
  h+=`</div>`;return h}

// ══════ PDF ══════
function printTree(){const w=window.open("","","width=800,height=600");let h=`<html><head><title>Семейное Древо</title><style>body{font-family:Georgia,serif;padding:20px;color:#222}h1{color:#8a7535;border-bottom:2px solid #d4a94c;padding-bottom:8px}h2{color:#555;margin-top:20px}.p{margin-bottom:16px;padding:12px;border:1px solid #ddd;border-radius:8px;page-break-inside:avoid}.p h3{color:#8a7535;margin-bottom:6px}.f{margin:3px 0;font-size:13px}.f b{color:#555}.a{background:#fff3e0;padding:3px 8px;border-radius:4px;font-size:12px;color:#e65100;display:inline-block;margin:2px}</style></head><body><h1>Семейное Древо</h1><p>Дата: ${new Date().toLocaleDateString("ru-RU")}</p>`;
  const citR=checkCitizenship();if(citR.length){h+=`<h2>Гражданство (${citR.length})</h2>`;citR.forEach(r=>{h+=`<div class="p"><h3>${r.flag} ${r.country} — ${r.confidence==="high"?"ВЫСОКАЯ":"СРЕДНЯЯ"}</h3><div class="f"><b>Предок:</b> ${r.personName}</div><div class="f"><b>Основание:</b> ${r.basis}</div><div class="f"><b>Стоимость:</b> ${r.cost} · <b>Срок:</b> ${r.time}</div></div>`})}
  h+=`<h2>Данные</h2>`;Object.entries(S.tree).forEach(([id,p])=>{if(id==="me")return;const d=S.data[id]||{};const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():p.role;const fl=Object.entries(d).filter(([k,v])=>v?.trim());if(!fl.length)return;
    h+=`<div class="p"><h3>${p.gender==="f"?"♀":"♂"} ${nm} — ${p.role}</h3>`;fl.forEach(([k,v])=>{const f=FIELDS.flatMap(s=>s.f).find(ff=>ff.k===k);h+=`<div class="f"><b>${f?.l||k}:</b> ${v}</div>`});const mk=mks(id);if(mk.length)h+=`<div>${mk.map(m=>`<span class="a">${m}</span>`).join(" ")}</div>`;h+=`</div>`});
  h+=`</body></html>`;w.document.write(h);w.document.close();setTimeout(()=>w.print(),300)}

// ══════ Tree Lines ══════
function drawLines(){const c=document.querySelector(".tree-box");if(!c)return;let svg=document.getElementById("tsvg");if(svg)svg.remove();
  svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.id="tsvg";svg.style.cssText="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1";c.style.position="relative";c.insertBefore(svg,c.firstChild);
  const cr=c.getBoundingClientRect();
  Object.entries(S.tree).forEach(([id,p])=>{if(!p.parentOf||p.siblingOf||p.spouseOf)return;
    const pe=c.querySelector(`[data-nid="${id}"]`),ce=c.querySelector(`[data-nid="${p.parentOf}"]`);if(!pe||!ce)return;
    const pR=pe.getBoundingClientRect(),cR=ce.getBoundingClientRect();
    const x1=pR.left+pR.width/2-cr.left,y1=pR.bottom-cr.top,x2=cR.left+cR.width/2-cr.left,y2=cR.top-cr.top,my=(y1+y2)/2;
    const path=document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute("d",`M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`);
    path.setAttribute("fill","none");path.setAttribute("stroke","rgba(212,169,76,0.2)");path.setAttribute("stroke-width","1.5");
    svg.appendChild(path)})}

// ══════ CSS ══════
const css=document.createElement("style");
css.textContent=`
.ai-result{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px;margin-top:12px;font-size:13px;line-height:1.7;white-space:pre-wrap}
.ai-loading{text-align:center;padding:20px;color:var(--gold);font-style:italic}
.ai-key-input{display:flex;gap:8px;margin-bottom:12px}.ai-key-input input{flex:1;background:var(--bg2);border:1px solid var(--border);border-radius:7px;padding:8px;color:var(--text);font-size:12px;outline:none;font-family:monospace}.ai-key-input input:focus{border-color:var(--gold)}.ai-key-input button{background:var(--gold);color:var(--bg);border:none;border-radius:7px;padding:8px 14px;font-size:12px;font-weight:600;white-space:nowrap}
.iw-btn{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:6px 12px;color:var(--text);font-size:11px;display:inline-flex;align-items:center;gap:5px;transition:all .2s;margin-left:auto}.iw-btn:hover{border-color:var(--gold);background:var(--gold-bg)}
.val-warn{font-size:10px;color:var(--alert);padding:4px 8px;background:var(--alert-bg);border-radius:4px;margin-top:4px;display:flex;align-items:center;gap:4px}
.viewer-badge{display:inline-block;background:var(--green);color:var(--bg);font-size:8px;font-weight:700;padding:1px 6px;border-radius:10px;margin-top:2px}
.viewer-hint{font-size:9px;color:var(--green);margin-top:1px;text-align:center}
.invite-btn{background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:11px;color:var(--text);display:inline-flex;align-items:center;gap:4px;transition:all .2s}.invite-btn:hover{border-color:var(--gold)}
.viewer-card{position:fixed;bottom:16px;right:16px;background:var(--surface);border:1px solid var(--green);border-radius:12px;padding:10px 14px;z-index:90;box-shadow:0 8px 24px rgba(0,0,0,.4);display:flex;align-items:center;gap:10px;max-width:300px}
.viewer-card button{background:var(--green);color:var(--bg);border:none;border-radius:6px;padding:6px 12px;font-size:11px;font-weight:600;white-space:nowrap}
`;document.head.appendChild(css);

// ══════ Override Render ══════
const _origR=R;
R=function(){
  if(S.view==="map"){rMapView();return}
  if(S.view==="interview"){document.getElementById("app").innerHTML=rIW();return}
  if(S.view==="dashboard"){rDashView();return}
  _origR();
  // Post-render enhancements
  setTimeout(()=>{
    // Add data-nid to all nodes
    document.querySelectorAll(".node").forEach(el=>{
      const oc=el.getAttribute("onclick")||"";const m=oc.match(/sel\('([^']+)'\)/);
      if(m)el.setAttribute("data-nid",m[1])});
    const meN=document.querySelector(".me-node");if(meN)meN.setAttribute("data-nid","me");

    // Draw tree lines
    if(S.view==="tree"&&!S.sel)drawLines();

    // Viewer badge on nodes
    const vid=getViewerId();
    if(vid&&S.view==="tree"&&!S.sel){
      const vNode=document.querySelector(`[data-nid="${vid}"]`);
      if(vNode&&!vNode.querySelector(".viewer-badge")){
        const badge=document.createElement("div");badge.className="viewer-badge";badge.textContent="ВЫ";vNode.appendChild(badge);
        vNode.style.borderColor="var(--green)";vNode.style.boxShadow="0 0 12px rgba(77,189,122,.2)";
        // Add relationship hints to other nodes
        document.querySelectorAll("[data-nid]").forEach(n=>{
          const nid=n.getAttribute("data-nid");if(nid===vid||nid==="me")return;
          const hint=relHint(vid,nid);if(hint){const h=document.createElement("div");h.className="viewer-hint";h.textContent=hint;n.appendChild(h)}
        })
      }
    }

    // Interview & validation in person panel
    if(S.sel){
      const hdr=document.querySelector(".panel-hdr");
      if(hdr&&!document.getElementById("iw-t")){
        const btn=document.createElement("button");btn.id="iw-t";btn.className="iw-btn";btn.innerHTML=`${ic("scroll","ic-sm")} Интервью`;btn.onclick=()=>startIW(S.sel);hdr.appendChild(btn)}
      const warns=validate(S.sel);
      if(warns.length){const hdrEl=document.querySelector(".panel-hdr");if(hdrEl&&!document.getElementById("val-w")){
        const wDiv=document.createElement("div");wDiv.id="val-w";wDiv.style.cssText="margin:-8px 0 10px";
        warns.forEach(w=>{const d=document.createElement("div");d.className="val-warn";d.innerHTML=`${ic("bolt","ic-sm")} ${esc(w)}`;wDiv.appendChild(d)});hdrEl.after(wDiv)}}}

    // Dashboard button under tree
    if(S.view==="tree"&&!S.sel){const hint=document.querySelector(".tree-hint");
      if(hint&&!document.getElementById("dl")){const d=document.createElement("div");d.id="dl";d.style.cssText="text-align:center;margin-top:8px;display:flex;gap:8px;justify-content:center";
        d.innerHTML=`<button class="iw-btn" onclick="go('dashboard')">${ic("tree","ic-sm")} Обзор</button><button class="invite-btn" onclick="showInvite=true;R()">${ic("users","ic-sm")} Пригласить</button>${vid?`<button class="invite-btn" onclick="clearViewer()">${ic("x","ic-sm")} Сбросить "Кто я"</button>`:`<button class="invite-btn" onclick="showWhoModal=true;R()">${ic("person","ic-sm")} Кто вы?</button>`}`;hint.after(d)}}

    // Floating viewer card
    if(vid&&S.view==="tree"&&!S.sel){
      if(!document.getElementById("vc")){const vd=S.data[vid]||{},vp=S.tree[vid];
        const vnm=(vd.firstName||vd.surname)?`${vd.firstName||''} ${vd.surname||''}`.trim():vp?.role;
        const card=document.createElement("div");card.id="vc";card.className="viewer-card";
        card.innerHTML=`<div style="flex:1"><div style="font-size:12px;font-weight:600">${esc(vnm)}</div><div style="font-size:10px;color:var(--dim)">Вы в этом древе</div></div><button onclick="sel('${vid}')">Моя карточка →</button>`;
        document.body.appendChild(card)}}
    else{const vc=document.getElementById("vc");if(vc)vc.remove()}
  },80);

  // Append modals
  const app=document.getElementById("app");
  if(app){app.insertAdjacentHTML("beforeend",rWhoModal()+rInviteModal())}

  // Auto-show "who are you" for new visitors with room
  if(S.rid&&!getViewerId()&&S.view==="tree"&&!S.sel&&!showWhoModal&&!sessionStorage.getItem("who_asked")){
    sessionStorage.setItem("who_asked","1");showWhoModal=true;
    setTimeout(()=>R(),500)}
};

function rNavH(){
  const al=aAlerts(),citR=checkCitizenship(),ids=Object.keys(S.tree).filter(k=>k!=="me");
  const tot=ids.reduce((s,k)=>s+pct(k),0),pr=ids.length?Math.round(tot/(ids.length*100)*100):0;
  const tf=Object.values(S.files).reduce((s,f)=>s+(f?.length||0),0);
  const sy=db?(S.sync?`<span class="sync on">${ic("cloud","ic-sm")} синхр.</span>`:`<span class="sync off">ожид.</span>`):`<span class="sync off">${ic("disk","ic-sm")} лок.</span>`;
  let h=`<div class="hdr"><div class="hdr-logo"><div class="hdr-mark">${ic("tree","ic-md")}</div><div><div class="hdr-title">Семейное Древо</div><div class="hdr-sub">${sy}</div></div></div>
  <div class="nav"><button class="nb ${S.view==="tree"&&!S.sel?"on":""}" onclick="go('tree')">${ic("tree","ic-sm")} Древо</button><button class="nb ${S.view==="cit"?"on":""}" onclick="go('cit')">${ic("passport","ic-sm")} Гражд.${citR.length?`<span class="bdg">${citR.length}</span>`:""}</button><button class="nb ${S.view==="map"?"on":""}" onclick="go('map')">${ic("map","ic-sm")} Карта</button><button class="nb ${S.view==="timeline"?"on":""}" onclick="go('timeline')">${ic("clock","ic-sm")} Хрон.</button><button class="nb ${S.view==="dashboard"?"on":""}" onclick="go('dashboard')">${ic("tree","ic-sm")} Обзор</button><button class="nb ${S.view==="alerts"?"on":""}" onclick="go('alerts')">${ic("bolt","ic-sm")}${al.length?`<span class="bdg">${al.length}</span>`:""}</button><button class="nb ${S.view==="general"?"on":""}" onclick="go('general')">${ic("scroll","ic-sm")}</button><span class="sep"></span><button class="ib" onclick="printTree()">${ic("scroll","ic-sm")}</button><button class="ib" onclick="doExp()">${ic("save","ic-sm")}</button><button class="ib" onclick="doImp()">${ic("folder","ic-sm")}</button><button class="ib" onclick="doRst()">${ic("trash","ic-sm")}</button></div></div>
  <div class="pbar"><div class="ptrack"><div class="pfill" style="width:${pr}%"></div></div><span class="plbl">${pr}%</span></div>`;
  if(S.rid){let qr="";try{const q=qrcode(0,"M");q.addData(location.origin+location.pathname+"?room="+S.rid);q.make();qr=q.createDataURL(3)}catch{}
    h+=`<div class="share"><span style="font-size:11px;color:var(--dim)">Код:</span><span class="share-code">${S.rid}</span><button class="share-btn" onclick="cpL()">${ic("copy","ic-sm")} Ссылка</button><button class="invite-btn" onclick="showInvite=true;R()">${ic("users","ic-sm")} Пригласить</button>${qr?`<div class="share-qr"><img src="${qr}"></div>`:""}</div>`}
  h+=`<div class="stats-bar"><span class="stat-chip">${ic("person","ic-sm")} <strong>${ids.length}</strong></span><span class="stat-chip">${ic("passport","ic-sm")} <strong>${citR.length}</strong> программ</span><span class="stat-chip">${ic("bolt","ic-sm")} <strong>${al.length}</strong></span><span class="stat-chip">${ic("image","ic-sm")} <strong>${tf}</strong></span></div>`;
  return h}

function rMapView(){const pts=collectPts(),aiKey=localStorage.getItem("ai_key")||"";let h=rNavH();
  h+=`<div class="panel"><div class="panel-inner"><div class="gq-title">${ic("map","ic-lg")} Карта миграций</div><div class="gq-desc">${pts.length} точек. Пунктирные линии — пути миграций.</div>
  ${pts.length?`<div id="fmap" class="map-container"></div>`:`<div class="alerts-empty" style="margin-bottom:16px"><div style="color:var(--dim)">Заполните места рождения.</div></div>`}
  <div style="margin-top:24px"><div class="gq-title" style="font-size:18px">${ic("bolt","ic-lg")} AI-анализ</div><div class="gq-desc"><a href="https://console.anthropic.com/" target="_blank" style="color:var(--gold)">API-ключ Anthropic</a> для экспертного анализа Claude.</div>
  <div class="ai-key-input"><input type="password" placeholder="sk-ant-..." value="${esc(aiKey)}" onchange="localStorage.setItem('ai_key',this.value)"><button onclick="runAI()">${aiLoad?"...":"Анализ"}</button></div>
  ${aiLoad?`<div class="ai-loading">Claude анализирует...</div>`:""}${aiRes?`<div class="ai-result">${esc(aiRes)}</div>`:""}</div>
  <div style="margin-top:24px"><button class="share-btn" style="padding:8px 16px;font-size:13px" onclick="printTree()">${ic("scroll","ic-sm")} PDF-отчёт</button></div>
  </div></div>`;
  document.getElementById("app").innerHTML=h;if(pts.length)renderMap()}

function rDashView(){let h=rNavH();h+=`<div class="panel"><div class="panel-inner">${rDash()}</div></div>`;document.getElementById("app").innerHTML=h}

// Wire up
window.startIW=startIW;window.endIW=endIW;window.runAI=runAI;window.printTree=printTree;
window.showWhoModal=false;window.showInvite=false;
window.setViewer=setViewer;window.clearViewer=clearViewer;

// Init: check ?who= parameter
const whoParam=new URLSearchParams(location.search).get("who");
if(whoParam)viewerId=whoParam;

if(S.view!=="lobby")R();
