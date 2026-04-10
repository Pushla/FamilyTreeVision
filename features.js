// features.js — Карта, AI-анализ, Интервью, PDF
// Загружается ПОСЛЕ app.js, расширяет функционал

// ══════════ Geocoding Dictionary ══════════
const GEO={"кишинёв":[47.01,28.86],"кишинев":[47.01,28.86],"бельцы":[47.76,27.93],"хотин":[48.51,26.49],"тирасполь":[46.84,29.63],"бендеры":[46.83,29.48],"бендер":[46.83,29.48],"измаил":[45.35,28.84],"болград":[45.68,28.62],"килия":[45.45,29.26],"аккерман":[46.19,30.35],"белгород-днестровский":[46.19,30.35],"бричаны":[48.36,27.08],"бричан":[48.36,27.08],"сороки":[48.17,28.30],"оргеев":[47.38,28.83],"унгены":[47.21,27.80],"кагул":[46.30,28.20],"комрат":[46.30,28.66],"тараклия":[46.27,28.67],"черновцы":[48.29,25.94],"черновиц":[48.29,25.94],"сторожинец":[48.16,25.72],"вижница":[48.25,25.19],"кицмань":[48.41,25.61],"заставна":[48.53,25.85],"герца":[48.15,26.26],"львов":[49.84,24.03],"тернополь":[49.55,25.59],"ивано-франковск":[48.92,24.71],"станислав":[48.92,24.71],"ужгород":[48.62,22.29],"мукачево":[48.44,22.72],"берегово":[48.21,22.64],"одесса":[46.48,30.72],"москва":[55.76,37.62],"санкт-петербург":[59.93,30.32],"ленинград":[59.93,30.32],"вильнюс":[54.69,25.28],"вильн":[54.69,25.28],"каунас":[54.90,23.90],"рига":[56.95,24.11],"таллин":[59.44,24.75],"варшава":[52.23,21.01],"краков":[50.06,19.94],"люблин":[51.25,22.57],"энгельс":[51.48,46.11],"саратов":[51.53,46.03],"ташкент":[41.30,69.24],"алматы":[43.24,76.95],"казань":[55.80,49.11],"минск":[53.90,27.57],"киев":[50.45,30.52],"харьков":[49.99,36.23],"мариуполь":[47.10,37.55],"новосибирск":[55.04,82.93],"свердловск":[56.84,60.60],"екатеринбург":[56.84,60.60],"челябинск":[55.16,61.40],"пермь":[58.01,56.25],"воронеж":[51.67,39.18],"ростов":[47.24,39.71],"краснодар":[45.04,38.98],"тбилиси":[41.69,44.80],"баку":[40.41,49.87],"ереван":[40.18,44.51],"самарканд":[39.65,66.96],"бухара":[39.77,64.42],"душанбе":[38.56,68.77],"фрунзе":[42.87,74.59],"бишкек":[42.87,74.59],"красноярск":[56.01,92.85],"омск":[54.99,73.37],"томск":[56.50,84.97],"иркутск":[52.30,104.30],"хабаровск":[48.48,135.08],"владивосток":[43.12,131.87],"симферополь":[44.95,34.10],"севастополь":[44.62,33.52],"днепропетровск":[48.46,35.05],"запорожье":[47.84,35.14],"полтава":[49.59,34.55],"николаев":[46.97,31.99],"херсон":[46.64,32.62],"винница":[49.23,28.47],"житомир":[50.25,28.66],"гомель":[52.44,31.00],"витебск":[55.19,30.20],"могилёв":[53.91,30.34],"брест":[52.10,23.70],"гродно":[53.68,23.83]};

function geocodeText(text){
  if(!text)return null;
  const t=text.toLowerCase();
  for(const[place,coords]of Object.entries(GEO)){if(t.includes(place))return{place,coords}}
  return null;
}

function collectMapPoints(){
  const pts=[];
  Object.entries(S.tree).forEach(([id,p])=>{
    if(id==="me")return;
    const d=S.data[id]||{};
    const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():p.role;
    const fields=[{v:d.birthPlace,label:"Родился(ась)"},{v:d.period1918,label:"1918–1940"},{v:d.after1945,label:"После 1945"},{v:d.deathPlace,label:"Место смерти"}];
    fields.forEach(f=>{
      const geo=geocodeText(f.v);
      if(geo)pts.push({lat:geo.coords[0],lng:geo.coords[1],name:nm,role:p.role,label:f.label,detail:f.v,gender:p.gender,pid:id,place:geo.place});
    });
  });
  return pts;
}

let mapInstance=null;
function renderMap(){
  const pts=collectMapPoints();
  setTimeout(()=>{
    const el=document.getElementById("family-map");
    if(!el||typeof L==="undefined")return;
    if(mapInstance){mapInstance.remove();mapInstance=null}
    mapInstance=L.map(el).setView([48,30],5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap",maxZoom:18}).addTo(mapInstance);
    const bounds=[];
    pts.forEach(pt=>{
      const color=pt.gender==="f"?"#e07899":"#6b9fd4";
      const marker=L.circleMarker([pt.lat,pt.lng],{radius:8,fillColor:color,color:"#fff",weight:2,fillOpacity:.8}).addTo(mapInstance);
      marker.bindPopup(`<strong>${pt.name}</strong><br><small>${pt.role}</small><br>${pt.label}: ${pt.detail}`);
      marker.on("click",()=>{sel(pt.pid)});
      bounds.push([pt.lat,pt.lng]);
    });
    if(bounds.length>1)mapInstance.fitBounds(bounds,{padding:[30,30]});
    else if(bounds.length===1)mapInstance.setView(bounds[0],8);
  },100);
}

// ══════════ AI Analysis ══════════
let aiResult=null,aiLoading=false;

async function runAI(){
  const key=localStorage.getItem("ai_key");
  if(!key){toast("Введите API ключ Anthropic в настройках (вкладка Карта)");return}
  aiLoading=true;R();
  const summary=Object.entries(S.tree).map(([id,p])=>{
    if(id==="me")return null;const d=S.data[id]||{};
    const filled=Object.entries(d).filter(([k,v])=>v?.trim()).map(([k,v])=>`${k}: ${v}`).join(", ");
    return filled?`${p.role} (пок.${p.gen}): ${filled}`:null;
  }).filter(Boolean).join("\n");
  if(!summary){aiResult="Нет данных для анализа. Заполните информацию о предках.";aiLoading=false;R();return}
  const prompt=`Ты — эксперт по генеалогии и иммиграционному праву стран ЕС, Израиля. Проанализируй данные семейного древа гражданина РФ, проживающего в Дубае.

Определи:
1. Под какие программы гражданства по происхождению потенциально попадает заявитель (Румыния ст.11, Израиль Закон о возвращении, Германия §5, Польша, Венгрия, Литва, Латвия, Болгария, Греция)
2. Какие конкретные зацепки стоит проверить в архивах
3. Какие вопросы задать родственникам
4. Конкретный план действий с приоритетами

Данные:
${summary}

Ответь подробно, структурированно, на русском.`;
  try{
    const resp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:3000,messages:[{role:"user",content:prompt}]})});
    const data=await resp.json();
    if(data.error){aiResult="Ошибка API: "+(data.error.message||JSON.stringify(data.error))}
    else{aiResult=data.content.map(c=>c.text||"").join("\n")}
  }catch(e){aiResult="Ошибка подключения: "+e.message}
  aiLoading=false;R();
}

// ══════════ Interview Mode ══════════
const INTERVIEW_STEPS=[
  {q:"Как звали этого человека?",fields:["firstName","patronymic","surname"],hint:"Полное имя, отчество, фамилия"},
  {q:"Была ли другая фамилия при рождении?",fields:["maidenName"],hint:"Девичья фамилия или фамилия до русификации (Попеску→Попов)"},
  {q:"Когда и где родился(ась)?",fields:["birthDate","birthPlace"],hint:"Хотя бы примерно: «около 1920, где-то под Кишинёвом»"},
  {q:"Какая национальность была записана в паспорте?",fields:["passportNat"],hint:"Графа 5 советского паспорта: русский, молдаванин, еврей, немец..."},
  {q:"На каком языке говорил(а) дома?",fields:["nativeLang"],hint:"С родителями, в детстве. Нерусский = сильный маркер"},
  {q:"Какая была вера?",fields:["religion"],hint:"Католик→поляк/литовец, лютеранин→немец, иудей→еврейские корни"},
  {q:"Где жил(а) в 1918–1940 годах?",fields:["period1918"],hint:"КЛЮЧЕВОЙ ПЕРИОД. Бессарабия=Румыния, Зап.Украина=Польша, Прибалтика=независимые"},
  {q:"Были ли репрессии или депортация?",fields:["repression","deportation"],hint:"Депортация = прямое указание на национальность"},
  {q:"Сохранились ли какие-нибудь документы?",fields:["documents"],hint:"Паспорта, свидетельства, фото с подписями, письма"},
  {q:"Может, вспомните ещё что-то?",fields:["notes"],hint:"Семейные легенды, слухи, «о чём не принято говорить»"}
];
let iwPerson=null,iwStep=0;

function startInterview(pid){iwPerson=pid;iwStep=0;S.view="interview";R()}
function nextIWStep(){if(iwStep<INTERVIEW_STEPS.length-1){iwStep++;R()}}
function prevIWStep(){if(iwStep>0){iwStep--;R()}}
function finishInterview(){iwPerson=null;S.view="tree";R()}

function rInterview(){
  if(!iwPerson||!S.tree[iwPerson])return"";
  const p=S.tree[iwPerson],d=S.data[iwPerson]||{};
  const step=INTERVIEW_STEPS[iwStep];
  const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():p.role;
  const progress=Math.round((iwStep+1)/INTERVIEW_STEPS.length*100);
  let fieldsH=step.fields.map(k=>{
    const f=FIELDS.flatMap(s=>s.f).find(ff=>ff.k===k);
    const v=d[k]||"";
    const isMulti=f?.m;
    return`<div style="margin-bottom:10px"><label class="field-label">${esc(f?.l||k)}</label>${isMulti?`<textarea class="field-input" rows="3" placeholder="${esc(f?.p||'')}" data-p="${iwPerson}" data-f="${k}" oninput="uf(this)">${esc(v)}</textarea>`:`<input type="text" class="field-input" placeholder="${esc(f?.p||'')}" value="${esc(v)}" data-p="${iwPerson}" data-f="${k}" oninput="uf(this)">`}</div>`;
  }).join("");
  return`<div class="panel"><div class="panel-inner">
    <div class="panel-hdr"><button class="back-btn" onclick="finishInterview()">${ic("arrowLeft","ic-sm")} Выйти</button><div style="flex:1"><div class="panel-name">${gIc(p.gender)} Интервью: ${esc(nm)}</div><div class="panel-role">Вопрос ${iwStep+1} из ${INTERVIEW_STEPS.length}</div></div></div>
    <div class="pbar" style="padding:0;margin-bottom:16px"><div class="ptrack"><div class="pfill" style="width:${progress}%"></div></div></div>
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px">
      <div style="font-family:var(--font-d);font-size:20px;font-weight:700;color:var(--gold);margin-bottom:8px">${esc(step.q)}</div>
      <div style="font-size:12px;color:var(--dim);margin-bottom:16px;font-style:italic">${esc(step.hint)}</div>
      ${fieldsH}
    </div>
    <div style="display:flex;gap:8px;justify-content:space-between">
      <button class="back-btn" onclick="prevIWStep()" ${iwStep===0?"disabled style='opacity:.3'":""}>${ic("arrowLeft","ic-sm")} Назад</button>
      ${iwStep<INTERVIEW_STEPS.length-1?`<button class="share-btn" style="padding:8px 20px;font-size:13px" onclick="nextIWStep()">Далее →</button>`:`<button class="share-btn" style="padding:8px 20px;font-size:13px;background:var(--green)" onclick="finishInterview()">Готово ✓</button>`}
    </div>
  </div></div>`;
}

// ══════════ PDF / Print ══════════
function printTree(){
  const w=window.open("","","width=800,height=600");
  let html=`<html><head><title>Семейное Древо</title><style>body{font-family:Georgia,serif;padding:20px;color:#222}h1{color:#8a7535;border-bottom:2px solid #d4a94c;padding-bottom:8px}h2{color:#555;margin-top:20px}.person{margin-bottom:20px;padding:12px;border:1px solid #ddd;border-radius:8px;page-break-inside:avoid}.person h3{color:#8a7535;margin-bottom:6px}.field{margin:4px 0;font-size:13px}.field strong{color:#555}.alert{background:#fff3e0;padding:4px 8px;border-radius:4px;font-size:12px;color:#e65100;display:inline-block;margin-top:4px}</style></head><body>`;
  html+=`<h1>Семейное Древо — Отчёт</h1><p>Дата: ${new Date().toLocaleDateString("ru-RU")}</p>`;
  const citR=checkCitizenship();
  if(citR.length){html+=`<h2>Потенциальное гражданство (${citR.length})</h2>`;citR.forEach(r=>{html+=`<div class="person"><h3>${r.flag} ${r.country} — ${r.confidence==="high"?"ВЫСОКАЯ":r.confidence==="medium"?"СРЕДНЯЯ":"НИЗКАЯ"} вероятность</h3><div class="field"><strong>Предок:</strong> ${r.personName} (${r.genName})</div><div class="field"><strong>Основание:</strong> ${r.basis}</div><div class="field"><strong>Стоимость:</strong> ${r.cost} · <strong>Срок:</strong> ${r.time}</div></div>`})}
  Object.entries(S.tree).forEach(([id,p])=>{
    if(id==="me")return;const d=S.data[id]||{};
    const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():p.role;
    const filled=Object.entries(d).filter(([k,v])=>v?.trim());
    if(!filled.length)return;
    html+=`<div class="person"><h3>${p.gender==="f"?"♀":"♂"} ${nm} — ${p.role}</h3>`;
    filled.forEach(([k,v])=>{const f=FIELDS.flatMap(s=>s.f).find(ff=>ff.k===k);html+=`<div class="field"><strong>${f?.l||k}:</strong> ${v}</div>`});
    const mk=mks(id);if(mk.length)html+=`<div class="alert">Зацепки: ${mk.join(", ")}</div>`;
    html+=`</div>`;
  });
  html+=`</body></html>`;
  w.document.write(html);w.document.close();w.print();
}

// ══════════ Inject CSS ══════════
const extraCSS=document.createElement("style");
extraCSS.textContent=`
.map-tab-content{padding:16px}
.ai-result{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px;margin-top:12px;font-size:13px;line-height:1.7;white-space:pre-wrap}
.ai-loading{text-align:center;padding:30px;color:var(--gold);font-style:italic}
.ai-key-input{display:flex;gap:8px;margin-bottom:12px;align-items:center}
.ai-key-input input{flex:1;background:var(--bg2);border:1px solid var(--border);border-radius:7px;padding:8px;color:var(--text);font-size:12px;outline:none;font-family:monospace}
.ai-key-input input:focus{border-color:var(--gold)}
.ai-key-input button{background:var(--gold);color:var(--bg);border:none;border-radius:7px;padding:8px 14px;font-size:12px;font-weight:600;white-space:nowrap}
.iw-start-btn{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:8px 14px;color:var(--text);font-size:12px;display:inline-flex;align-items:center;gap:6px;transition:all .2s;margin-top:8px}
.iw-start-btn:hover{border-color:var(--gold);background:var(--gold-bg)}
`;
document.head.appendChild(extraCSS);

// ══════════ Override Render ══════════
const _origR=R;
R=function(){
  // If in special views, handle them
  if(S.view==="map"){renderMapView();return}
  if(S.view==="interview"){document.getElementById("app").innerHTML=renderHdr()+rInterview();return}
  // Otherwise, call original
  _origR();
  // Post-render: add interview buttons to person forms
  setTimeout(()=>{
    const backBtn=document.querySelector(".panel-hdr .back-btn");
    if(S.sel&&backBtn&&!document.getElementById("iw-btn-inserted")){
      const btn=document.createElement("button");
      btn.className="iw-start-btn";btn.id="iw-btn-inserted";
      btn.innerHTML=`${ic("scroll","ic-sm")} Режим интервью`;
      btn.onclick=()=>startInterview(S.sel);
      const hdr=document.querySelector(".panel-hdr");
      if(hdr)hdr.after(btn);
    }
  },50);
};

function renderHdr(){
  const al=aAlerts(),citR=checkCitizenship();
  const ids=Object.keys(S.tree).filter(k=>k!=="me");
  const tot=ids.reduce((s,k)=>s+pct(k),0);const pr=ids.length?Math.round(tot/(ids.length*100)*100):0;
  const sy=db?(S.sync?`<span class="sync on">${ic("cloud","ic-sm")} синхр.</span>`:`<span class="sync off">ожид.</span>`):`<span class="sync off">${ic("disk","ic-sm")} лок.</span>`;
  return`<div class="hdr"><div class="hdr-logo"><div class="hdr-mark">${ic("tree","ic-md")}</div><div><div class="hdr-title">Семейное Древо</div><div class="hdr-sub">${sy}</div></div></div>
  <div class="nav">
    <button class="nb ${S.view==="tree"&&!S.sel?"on":""}" onclick="go('tree')">${ic("tree","ic-sm")} Древо</button>
    <button class="nb ${S.view==="cit"?"on":""}" onclick="go('cit')">${ic("passport","ic-sm")} Гражд.${citR.length?`<span class="bdg">${citR.length}</span>`:""}</button>
    <button class="nb ${S.view==="map"?"on":""}" onclick="go('map')">${ic("map","ic-sm")} Карта</button>
    <button class="nb ${S.view==="timeline"?"on":""}" onclick="go('timeline')">${ic("clock","ic-sm")} Хрон.</button>
    <button class="nb ${S.view==="alerts"?"on":""}" onclick="go('alerts')">${ic("bolt","ic-sm")}${al.length?`<span class="bdg">${al.length}</span>`:""}</button>
    <button class="nb ${S.view==="general"?"on":""}" onclick="go('general')">${ic("scroll","ic-sm")}</button>
    <span class="sep"></span>
    <button class="ib" onclick="printTree()" title="PDF">${ic("scroll","ic-sm")}</button>
    <button class="ib" onclick="doExp()">${ic("save","ic-sm")}</button><button class="ib" onclick="doImp()">${ic("folder","ic-sm")}</button><button class="ib" onclick="doRst()">${ic("trash","ic-sm")}</button>
  </div></div>
  <div class="pbar"><div class="ptrack"><div class="pfill" style="width:${pr}%"></div></div><span class="plbl">${pr}%</span></div>`;
}

function renderMapView(){
  const pts=collectMapPoints();
  const aiKey=localStorage.getItem("ai_key")||"";
  let h=renderHdr();
  h+=`<div class="panel"><div class="panel-inner">
    <div class="gq-title">${ic("map","ic-lg")} Карта миграций</div>
    <div class="gq-desc">Места рождения и проживания всех предков. ${pts.length} точек найдено. Заполняйте места рождения — карта обновляется автоматически.</div>
    ${pts.length?`<div id="family-map" class="map-container"></div>`:`<div class="alerts-empty"><div style="color:var(--dim)">Нет географических данных. Заполните места рождения предков.</div></div>`}

    <div style="margin-top:24px">
      <div class="gq-title" style="font-size:18px">${ic("bolt","ic-lg")} AI-анализ данных</div>
      <div class="gq-desc">Claude проанализирует ваше древо и даст рекомендации по поиску гражданства. Требуется API-ключ Anthropic (<a href="https://console.anthropic.com/" target="_blank" style="color:var(--gold)">получить</a>).</div>
      <div class="ai-key-input">
        <input type="password" placeholder="sk-ant-..." value="${esc(aiKey)}" onchange="localStorage.setItem('ai_key',this.value)">
        <button onclick="runAI()">${aiLoading?"Анализ...":"Запустить AI-анализ"}</button>
      </div>
      ${aiLoading?`<div class="ai-loading">Анализирую данные с помощью Claude...</div>`:""}
      ${aiResult?`<div class="ai-result">${esc(aiResult)}</div>`:""}
    </div>

    <div style="margin-top:24px">
      <div class="gq-title" style="font-size:18px">${ic("scroll","ic-lg")} Экспорт в PDF</div>
      <div class="gq-desc">Сформирует отчёт со всеми данными, зацепками и рекомендациями по гражданству для печати или отправки юристу.</div>
      <button class="share-btn" style="padding:8px 16px;font-size:13px" onclick="printTree()">Сформировать PDF-отчёт</button>
    </div>
  </div></div>`;
  document.getElementById("app").innerHTML=h;
  if(pts.length)renderMap();
}

// ══════════ Wire up ══════════
window.startInterview=startInterview;
window.nextIWStep=nextIWStep;
window.prevIWStep=prevIWStep;
window.finishInterview=finishInterview;
window.runAI=runAI;
window.printTree=printTree;

// Re-render to apply new nav
if(S.view!=="lobby")R();
