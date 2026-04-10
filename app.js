/* ═══════════════════════════════════════════════════════════
   Семейное Древо — app.js
   Чистая архитектура: event delegation, no inline onclick
   ═══════════════════════════════════════════════════════════ */

// ── Firebase ──
firebase.initializeApp({apiKey:"AIzaSyAObYDV9zB8DguOJC-krGFqwSHl4SAdW94",authDomain:"familytreevision.firebaseapp.com",projectId:"familytreevision",storageBucket:"familytreevision.firebasestorage.app",messagingSenderId:"159441682554",appId:"1:159441682554:web:706b36833acd785757fbc3"});
const db=firebase.firestore();let unsub=null;

// ── Icons ──
const IC={tree:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V14"/><path d="M8 22h8"/><path d="M12 14l-5-5.5h3V5.5h4V8.5h3z"/></svg>`,female:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3"/><path d="M7 21c0-2.8 2.2-5 5-5s5 2.2 5 5"/></svg>`,male:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3"/><path d="M7 21c0-2.8 2.2-5 5-5s5 2.2 5 5"/><line x1="17" y1="3" x2="21" y2="3"/><line x1="21" y1="3" x2="21" y2="7"/></svg>`,person:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3"/><path d="M7 21c0-2.8 2.2-5 5-5s5 2.2 5 5"/></svg>`,globe:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9.5"/><ellipse cx="12" cy="12" rx="4" ry="9.5"/><path d="M3 9h18M3 15h18"/></svg>`,pin:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 2.5C8.4 2.5 5.5 5.4 5.5 9c0 5.25 6.5 12.5 6.5 12.5s6.5-7.25 6.5-12.5c0-3.6-2.9-6.5-6.5-6.5z"/><circle cx="12" cy="9" r="2.5"/></svg>`,shield:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5l7.5 3.5V11c0 5-3.2 9.5-7.5 11.5C7.7 20.5 4.5 16 4.5 11V6z"/></svg>`,family:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="7" cy="5.5" r="2.5"/><circle cx="17" cy="5.5" r="2.5"/><path d="M2 16.5c0-2.8 2.2-5 5-5s5 2.2 5 5M12 16.5c0-2.8 2.2-5 5-5s5 2.2 5 5"/></svg>`,scroll:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/></svg>`,bolt:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6.5l-1.5 8L19 10h-6.5z"/></svg>`,search:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="7"/><path d="M21 21l-5-5"/></svg>`,cloud:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M18 10h-1.26A7 7 0 109 20h9a4 4 0 000-8z"/></svg>`,save:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>`,folder:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>`,trash:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>`,copy:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`,x:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,chev:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,9 12,15 18,9"/></svg>`,arrowL:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>`,plus:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,users:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="3.5"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,ring:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="8.5" cy="15" r="5"/><circle cx="15.5" cy="15" r="5"/><path d="M9.5 7.5L12 5l2.5 2.5"/></svg>`,camera:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>`,image:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>`,addP:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="14" r="3.5"/><path d="M6 23v-1c0-3.3 2.7-6 6-6s6 2.7 6 6v1"/><line x1="12" y1="7" x2="12" y2="1"/><line x1="9" y1="4" x2="15" y2="4"/></svg>`,archive:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8V21H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></svg>`,link:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,passport:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 17h8"/></svg>`,clock:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`,map:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,disk:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="5"/></svg>`};
function i(n,c="ic-m"){return`<span class="ic ${c}">${IC[n]||""}</span>`}
function gic(g){return g==="f"?i("female","ic-n"):i("male","ic-n")}

// ── Fields ──
const FLD=[{s:"Основные данные",ic:"person",d:"Самое важное — точное место рождения.",f:[{k:"surname",l:"Фамилия",p:"Иванов"},{k:"maidenName",l:"При рождении",p:"Попеску→Попов",h:"Ключ к архивам"},{k:"otherNames",l:"Другие фамилии",p:""},{k:"firstName",l:"Имя",p:"Иван (Ион)"},{k:"patronymic",l:"Отчество",p:""},{k:"birthDate",l:"Дата рождения",p:"1923 или ~1920",h:"Хотя бы год"},{k:"birthPlace",l:"Место рождения",p:"МССР, Хотинский р-н, с. Бричаны",c:1,h:"ГЛАВНОЕ ПОЛЕ",ar:1},{k:"deathDate",l:"Дата смерти",p:""},{k:"deathPlace",l:"Место смерти",p:""}]},{s:"Национальность",ic:"globe",d:"В СССР часто записывали «русский» вместо реальной.",f:[{k:"passportNat",l:"По паспорту (гр.5)",p:"русский/молдаванин/немец",c:1},{k:"actualNat",l:"Фактическая",p:"Как считал(а) себя"},{k:"nativeLang",l:"Родной язык",p:"Дома, с родителями",c:1,h:"Нерусский = маркер"},{k:"otherLangs",l:"Другие языки",p:"Идиш, румынский..."},{k:"religion",l:"Вера",p:"Православие/католичество/иудаизм",h:"Не-православие → маркер"},{k:"citizenship",l:"Гражданство до СССР",p:"Румыния, Польша..."}]},{s:"Место жительства",ic:"pin",d:"Период 1918–1940 критически важен.",f:[{k:"before1917",l:"До 1917",p:"Губерния, уезд",ar:1},{k:"period1918",l:"1918–1940 (КЛЮЧЕВОЙ!)",p:"Бессарабия? Галиция?",c:1,h:"Бессарабия=Румыния, Зап.Украина=Польша",ar:1},{k:"period1941",l:"1941–1945",p:"Эвакуация? Фронт?"},{k:"after1945",l:"После 1945",p:"Города",ar:1}]},{s:"Репрессии и война",ic:"shield",d:"Депортация = указание на национальность.",f:[{k:"warService",l:"ВОВ",p:"Звание, часть",ar:1},{k:"repression",l:"Репрессии",p:"Арест? Ссылка?",c:1,ar:1},{k:"deportation",l:"Депортация",p:"Откуда, куда?",c:1,ar:1},{k:"evacuation",l:"Эвакуация",p:"Откуда→куда"}]},{s:"Семья и работа",ic:"family",d:"Девичья фамилия жены — ключ к другой ветке.",f:[{k:"education",l:"Образование",p:""},{k:"profession",l:"Профессия",p:""},{k:"spouseName",l:"Супруг(а) ФИО",p:"Девичья фамилия!"},{k:"spouseNat",l:"Нац. супруга",p:""},{k:"spouseBirth",l:"Место рожд. супруга",p:""}]},{s:"Документы",ic:"scroll",d:"Любой документ бесценен.",f:[{k:"documents",l:"Какие есть?",p:"Паспорта, метрики...",c:1},{k:"photos",l:"Фото",p:"С подписями?"},{k:"letters",l:"Письма",p:"На каком языке?"},{k:"notes",l:"Заметки",p:"Легенды, слухи...",m:1}]}];
const AK=FLD.flatMap(s=>s.f.map(f=>f.k));
const MK=["бессараб","кишинёв","кишинев","бельц","тирасполь","бендер","хотин","аккерман","белгород-днестров","измаил","болград","килия","бричан","молдав","молдов","черновц","буковин","герца","закарпат","ужгород","мукачев","львов","тернопол","ивано-франк","галиц","вильн","каунас","литв","латв","рига","эстон","таллин","варшав","краков","польш","люблин","поволж","немц","deutsch","шваб","колони","еврей","иудаизм","идиш","синагог","грек","греч","мариупол","урум","болгар","румын","попеску","молдован","венгр","мадьяр","трансильван","католи","лютеран","греко-католи","униат","депортац","репресс","ссылк","лагер","расстрел"];
const MG={"🇷🇴 Румыния/Молдова":["бессараб","кишинёв","кишинев","бельц","тирасполь","бендер","хотин","аккерман","белгород-днестров","измаил","болград","килия","бричан","молдав","молдов","черновц","буковин","герца","румын","попеску","молдован"],"🇭🇺 Венгрия":["закарпат","ужгород","мукачев","венгр","мадьяр","трансильван"],"🇵🇱 Польша":["львов","тернопол","ивано-франк","галиц","варшав","краков","польш","люблин"],"🇱🇹 Литва":["вильн","каунас","литв"],"🇱🇻 Латвия":["латв","рига"],"🇪🇪 Эстония":["эстон","таллин"],"🇩🇪 Германия":["поволж","немц","deutsch","шваб","колони","лютеран"],"🇮🇱 Израиль":["еврей","иудаизм","идиш","синагог"],"🇬🇷 Греция":["грек","греч","мариупол","урум"],"🇧🇬 Болгария":["болгар"]};
const GQ=["Были ли разговоры о «нерусских» корнях?","Необычные фамилии (-еску,-берг,-штейн)?","Кто-то говорил на другом языке?","Не-православная религия?","Репрессированные/депортированные?","Откуда семья переехала?","Старые документы?","Фотоальбомы до 1950-х?","Названия деревень предков?","Хранитель памяти?","Смена фамилии?","Запретные темы?"];
const CI=2*Math.PI*16;
// Canonical node order (left-to-right)
const ORD={me:0,father:1,mother:2,gm_pat:3,gf_pat:4,gm_mat:5,gf_mat:6,ggm1:7,ggf1:8,ggm2:9,ggf2:10,ggm3:11,ggf3:12,ggm4:13,ggf4:14};
function nodeOrd(id){if(ORD[id]!==undefined)return ORD[id];const n=S.tree[id];if(!n)return 999;const ref=n.siblingOf||n.spouseOf||n.parentOf;return ref&&ORD[ref]!==undefined?ORD[ref]+.5:500}

// ── Citizenship Rules ──
const CIT=[
{c:"Румыния",f:"🇷🇴",mk:["бессараб","кишинёв","кишинев","бельц","тирасполь","бендер","хотин","аккерман","белгород-днестров","измаил","болград","килия","бричан","молдав","молдов","черновц","буковин","герца","румын","попеску","молдован"],mg:3,basis:"Ст.11 Закона №21/1991",reqs:"Потомок до правнука, родившегося на тер. Румынии 1918–1940. До апр.2026 без экзамена.",steps:"Метрика предка→апостиль→перевод→подача в ANC→18-36 мес.→присяга→паспорт ЕС",cost:"$4–15K",time:"2–4 года"},
{c:"Израиль",f:"🇮🇱",mk:["еврей","иудаизм","идиш","синагог"],mg:2,basis:"Закон о возвращении",reqs:"Еврейский дед/бабка по любой линии.",steps:"Документы→Сохнут/посольство→собеседование→репатриация→паспорт",cost:"Бесплатно",time:"3–12 мес."},
{c:"Германия",f:"🇩🇪",mk:["поволж","немц","deutsch","шваб","колони","лютеран"],mg:99,basis:"§5 StAG",reqs:"Этнический немец. B1 немецкого.",steps:"Документы→BVA Кёльн→тест B1→Aufnahmebescheid→переезд",cost:"$2–5K",time:"1–3 года"},
{c:"Польша",f:"🇵🇱",mk:["львов","тернопол","ивано-франк","галиц","варшав","краков","польш","люблин"],mg:3,basis:"Подтверждение гражданства",reqs:"Предок—гражданин Польши 1920–1939.",steps:"Доказать гражданство предка→воеводский уржонд→подтверждение→паспорт",cost:"$3–10K",time:"1–3 года"},
{c:"Венгрия",f:"🇭🇺",mk:["закарпат","ужгород","мукачев","венгр","мадьяр","трансильван"],mg:99,basis:"Упрощённая натурализация",reqs:"Предок из Венгрии до 1920. B1 венгерского.",steps:"Подтвердить происхождение→B1→консульство→собеседование→присяга",cost:"$2–5K",time:"1–2 года"},
{c:"Литва",f:"🇱🇹",mk:["вильн","каунас","литв"],mg:3,basis:"Восстановление (до 15.06.1940)",reqs:"Предок—гражданин Литвы до оккупации.",steps:"Документы→Департамент миграции→решение→паспорт ЕС",cost:"$3–8K",time:"1–3 года"},
{c:"Латвия",f:"🇱🇻",mk:["латв","рига"],mg:3,basis:"Восстановление (до 17.06.1940)",reqs:"Предок—гражданин Латвии до оккупации.",steps:"Документы→УДГМ→экзамен→паспорт ЕС",cost:"$3–8K",time:"1–3 года"},
{c:"Болгария",f:"🇧🇬",mk:["болгар"],mg:3,basis:"Гражданство по происхождению",reqs:"Болгарское происхождение. Без языкового экзамена.",steps:"Удостоверение ДАБЧ→заявление→указ Президента",cost:"$3–10K",time:"1–3 года"},
{c:"Греция",f:"🇬🇷",mk:["грек","греч","мариупол","урум"],mg:99,basis:"Гражданство по происхождению",reqs:"Греческое происхождение (Приазовье, Крым, Понт).",steps:"Документы→консульство→Афины→решение",cost:"$3–8K",time:"2–5 лет"}
];

// ── State ──
function mkTree(){return{me:{id:"me",role:"Я",gen:0,gender:null,core:1},father:{id:"father",role:"Отец",gen:1,gender:"m",core:1,parentOf:"me"},mother:{id:"mother",role:"Мать",gen:1,gender:"f",core:1,parentOf:"me"},gm_pat:{id:"gm_pat",role:"Бабушка (по отцу)",gen:2,gender:"f",core:1,parentOf:"father"},gf_pat:{id:"gf_pat",role:"Дедушка (по отцу)",gen:2,gender:"m",core:1,parentOf:"father"},gm_mat:{id:"gm_mat",role:"Бабушка (по матери)",gen:2,gender:"f",core:1,parentOf:"mother"},gf_mat:{id:"gf_mat",role:"Дедушка (по матери)",gen:2,gender:"m",core:1,parentOf:"mother"},ggm1:{id:"ggm1",role:"Прабабушка",gen:3,gender:"f",core:1,parentOf:"gm_pat"},ggf1:{id:"ggf1",role:"Прадедушка",gen:3,gender:"m",core:1,parentOf:"gm_pat"},ggm2:{id:"ggm2",role:"Прабабушка",gen:3,gender:"f",core:1,parentOf:"gf_pat"},ggf2:{id:"ggf2",role:"Прадедушка",gen:3,gender:"m",core:1,parentOf:"gf_pat"},ggm3:{id:"ggm3",role:"Прабабушка",gen:3,gender:"f",core:1,parentOf:"gm_mat"},ggf3:{id:"ggf3",role:"Прадедушка",gen:3,gender:"m",core:1,parentOf:"gm_mat"},ggm4:{id:"ggm4",role:"Прабабушка",gen:3,gender:"f",core:1,parentOf:"gf_mat"},ggf4:{id:"ggf4",role:"Прадедушка",gen:3,gender:"m",core:1,parentOf:"gf_mat"}}}
let S={tree:mkTree(),data:{},general:{},files:{},view:"lobby",sel:null,os:{},rid:null,sync:false,am:null,search:"",preview:null,viewer:null,modal:null};
const LS="ftree-v9",LSF="ftree-f-v2";

// ── Helpers ──
function esc(s){const d=document.createElement("div");d.textContent=s||"";return d.innerHTML}
function toast(m){const e=document.createElement("div");e.className="toast";e.textContent=m;document.body.appendChild(e);setTimeout(()=>e.remove(),2500)}
function uid(){return"p"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function markers(pid){const d=S.data[pid];if(!d)return[];const t=Object.values(d).join(" ").toLowerCase();return[...new Set(MK.filter(m=>t.includes(m)))]}
function pct(pid){const d=S.data[pid];if(!d)return 0;return Math.round(AK.filter(k=>d[k]?.trim?.()).length/AK.length*100)}
function alerts(){const r=[];Object.keys(S.tree).forEach(id=>{if(id==="me")return;markers(id).forEach(m=>r.push({pid:id,m}))});return r}
function mgroup(m){for(const[g,ms]of Object.entries(MG))if(ms.includes(m))return g;return"Другое"}
function maxGen(){return Math.max(0,...Object.values(S.tree).map(p=>p.gen))}
function genLabel(g){return["","Родители","Бабушки и дедушки","Прабабушки и прадедушки"][g]||`Поколение ${g}`}
function hasParents(id){return Object.values(S.tree).some(p=>p.parentOf===id&&!p.siblingOf&&!p.spouseOf)}
function pName(pid){const d=S.data[pid]||{};return(d.firstName||d.surname)?`${d.firstName||""} ${d.surname||""}`.trim():S.tree[pid]?.role||"?"}

// ── Storage ──
function saveL(){try{localStorage.setItem(LS,JSON.stringify({tree:S.tree,data:S.data,general:S.general,rid:S.rid}));localStorage.setItem(LSF,JSON.stringify(S.files))}catch{}}
function loadL(){try{const d=localStorage.getItem(LS);if(d){const p=JSON.parse(d);if(p.tree)S.tree=p.tree;S.data=p.data||{};S.general=p.general||{};if(p.rid)S.rid=p.rid}const f=localStorage.getItem(LSF);if(f)S.files=JSON.parse(f)}catch{}}
async function saveC(){if(!db||!S.rid)return;try{S._saving=Date.now();await db.collection("rooms").doc(S.rid).set({tree:S.tree,data:S.data,general:S.general,t:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});S.sync=true}catch(e){console.error(e)}}
function listenC(){if(!db||!S.rid)return;if(unsub)unsub();unsub=db.collection("rooms").doc(S.rid).onSnapshot(snap=>{if(Date.now()-(S._saving||0)<3000){console.log("[FB] Ignoring echo");return}if(snap.exists){const d=snap.data();S.tree=d.tree||mkTree();S.data=d.data||{};S.general=d.general||{};S.sync=true;saveL();render()}},()=>{S.sync=false})}
let svT=null;function save(){saveL();clearTimeout(svT);svT=setTimeout(()=>saveC(),1200)}

// ── Room ──
function genCode(){const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let r="";for(let j=0;j<6;j++)r+=c[Math.floor(Math.random()*c.length)];return r}
async function createRoom(){const code=genCode();try{await db.collection("rooms").doc(code).set({tree:S.tree,data:S.data,general:S.general,t:firebase.firestore.FieldValue.serverTimestamp()});S.sync=true}catch{}S.rid=code;saveL();listenC();S.view="tree";render();if(S.rid)history.replaceState(null,"","?room="+S.rid)}
async function joinRoom(code){code=(code||"").toUpperCase().trim();if(code.length<4)return;try{const snap=await db.collection("rooms").doc(code).get();if(!snap.exists){toast("Не найдена");return}const d=snap.data();S.tree=d.tree||mkTree();S.data=d.data||{};S.general=d.general||{};S.sync=true}catch(e){toast("Ошибка");return}S.rid=code;saveL();listenC();S.view="tree";render();history.replaceState(null,"","?room="+S.rid)}

// ── Tree ops ──
function addSib(ofId){const o=S.tree[ofId];if(!o)return;const id=uid(),g=o.gender==="f"?"m":"f";S.tree[id]={id,role:g==="f"?"Сестра":"Брат",gen:o.gen,gender:g,core:0,siblingOf:ofId,parentOf:o.parentOf};S.data[id]={};save();S.am=null;render()}
function addSp(ofId){const o=S.tree[ofId];if(!o)return;const id=uid(),g=o.gender==="f"?"m":"f";S.tree[id]={id,role:g==="f"?"Супруга":"Супруг",gen:o.gen,gender:g,core:0,spouseOf:ofId};S.data[id]={};save();S.am=null;render()}
function addPar(ofId){const o=S.tree[ofId];if(!o)return;const ng=o.gen+1;const a=uid(),b=uid();S.tree[a]={id:a,role:"Мать",gen:ng,gender:"f",core:0,parentOf:ofId};S.tree[b]={id:b,role:"Отец",gen:ng,gender:"m",core:0,parentOf:ofId};S.data[a]={};S.data[b]={};save();S.am=null;render()}
function delPerson(id){
  console.log("[DEL] Attempting to delete:",id,"node:",S.tree[id]);
  if(!S.tree[id]){console.error("[DEL] Node not found in tree!");toast("Узел не найден");return}
  if(S.tree[id].core){console.log("[DEL] Blocked: core node");toast("Основных нельзя удалить");return}
  if(!confirm("Удалить "+pName(id)+"?"))return;
  console.log("[DEL] Confirmed. Deleting",id,"and cascading...");
  const cascade=[];
  Object.keys(S.tree).forEach(k=>{const t=S.tree[k];if(t&&(t.siblingOf===id||t.spouseOf===id)){cascade.push(k);delete S.tree[k];delete S.data[k];delete S.files[k]}});
  if(cascade.length)console.log("[DEL] Cascade deleted:",cascade);
  delete S.tree[id];delete S.data[id];delete S.files[id];
  if(S.sel===id)S.sel=null;
  console.log("[DEL] Done. Tree now has",Object.keys(S.tree).length,"nodes");
  save();if(db&&S.rid)saveC();render()}

// ── Citizenship check ──
function checkCit(){const res=[];Object.entries(S.tree).forEach(([id,p])=>{if(id==="me")return;const d=S.data[id]||{};const tx=Object.values(d).join(" ").toLowerCase();if(!tx.trim())return;CIT.forEach(rule=>{const matched=rule.mk.filter(m=>tx.includes(m));if(!matched.length)return;if(res.find(r=>r.c===rule.c&&r.pid===id))return;const conf=p.gen<=rule.mg&&matched.length>=2?"high":p.gen<=rule.mg?"medium":"low";res.push({...rule,pid:id,pn:pName(id),gen:p.gen,gn:genLabel(p.gen),conf,matched})})});res.sort((a,b)=>{const o={high:0,medium:1,low:2};return o[a.conf]-o[b.conf]});return res}

// ── Archive links for field ──
function archLinks(pid){const d=S.data[pid]||{},sn=d.surname||d.maidenName||"",fn=d.firstName||"",E=encodeURIComponent;if(!sn)return[];return[{n:"Память народа",u:`https://pamyat-naroda.ru/heroes/?last_name=${E(sn)}&first_name=${E(fn)}`},{n:"ОБД Мемориал",u:`https://obd-memorial.ru/html/search.htm?surname=${E(sn)}&name=${E(fn)}`},{n:"FamilySearch",u:`https://www.familysearch.org/search/record/results?q.surname=${E(sn)}&q.givenName=${E(fn)}`},{n:"Открытый список",u:`https://ru.openlist.wiki/?q=${E(sn+" "+fn)}`}]}

// ── Image compress ──
function compress(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=e=>{const img=new Image();img.onload=()=>{const c=document.createElement("canvas");let w=img.width,h=img.height;if(w>500){h=h*(500/w);w=500}c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);res(c.toDataURL("image/jpeg",.6))};img.src=e.target.result};r.onerror=rej;r.readAsDataURL(file)})}

// ── Render ──
function render(){
  const al=alerts(),alMap={};al.forEach(a=>alMap[a.pid]=true);
  const ids=Object.keys(S.tree).filter(k=>k!=="me");
  const tot=ids.reduce((s,k)=>s+pct(k),0),pr=ids.length?Math.round(tot/(ids.length*100)*100):0;
  const citR=checkCit(),tf=Object.values(S.files).reduce((s,f)=>s+(f?.length||0),0);

  if(S.view==="lobby"){$("app").innerHTML=rLobby();return}
  const sy=S.sync?`<span class="sync on">${i("cloud","ic-s")} синхр.</span>`:`<span class="sync off">${i("disk","ic-s")} лок.</span>`;
  let qr="";try{const q=qrcode(0,"M");q.addData(location.origin+location.pathname+"?room="+S.rid);q.make();qr=q.createDataURL(3)}catch{}

  let h=`<div class="hdr"><div class="hdr-logo"><div class="hdr-mark">${i("tree","ic-m")}</div><div><div class="hdr-t">Семейное Древо</div><div class="hdr-s">${sy}</div></div></div>
  <div class="nav">${navBtn("tree","tree","Древо")}${navBtn("cit","passport","Гражд.",citR.length)}${navBtn("alerts","bolt","",al.length)}${navBtn("general","scroll","")}<span class="sp"></span>
  <button class="ib" data-act="export">${i("save","ic-s")}</button><button class="ib" data-act="import">${i("folder","ic-s")}</button><button class="ib" data-act="reset">${i("trash","ic-s")}</button></div></div>
  <div class="pbar"><div class="ptk"><div class="pfl" style="width:${pr}%"></div></div><span class="plb">${pr}%</span></div>`;
  if(S.rid)h+=`<div class="share"><span style="font-size:11px;color:var(--dm)">Код:</span><span class="share-code">${S.rid}</span><button class="btn" data-act="copy-link">${i("copy","ic-s")} Ссылка</button><button class="btn btn-s" data-act="show-invite">${i("users","ic-s")} Пригласить</button>${qr?`<div class="share-qr"><img src="${qr}"></div>`:""}</div>`;
  h+=`<div class="stats"><span class="chip">${i("person","ic-s")} <b>${ids.length}</b></span><span class="chip">${i("passport","ic-s")} <b>${citR.length}</b></span><span class="chip">${i("bolt","ic-s")} <b>${al.length}</b></span><span class="chip">${i("image","ic-s")} <b>${tf}</b></span></div>`;

  if(S.view==="tree"&&!S.sel){h+=`<div class="search-bar">${i("search","ic-s")}<input placeholder="Поиск..." value="${esc(S.search)}" data-search></div>`;h+=rTree(alMap)}
  else if(S.view==="tree"&&S.sel)h+=rPerson(S.sel,alMap);
  else if(S.view==="cit")h+=rCit(citR);
  else if(S.view==="alerts")h+=rAlerts(al);
  else if(S.view==="general")h+=rGeneral();

  if(S.preview)h+=`<div class="fmod" data-act="close-preview"><button class="fmod-x" data-act="close-preview">${i("x","ic-m")}</button><img src="${S.preview}"></div>`;
  if(S.modal)h+=S.modal;

  $("app").innerHTML=h;

  // Viewer card
  const vc=document.getElementById("viewer-card");if(vc)vc.remove();
  if(S.viewer&&S.view==="tree"&&!S.sel){
    const card=document.createElement("div");card.id="viewer-card";card.className="vcard";
    card.innerHTML=`<div style="flex:1"><div style="font-size:12px;font-weight:600">${esc(pName(S.viewer))}</div><div style="font-size:10px;color:var(--dm)">Вы в этом древе</div></div><button class="btn" data-act="sel" data-id="${S.viewer}">Моя карточка →</button>`;
    document.body.appendChild(card)}
}
function $(id){return document.getElementById(id)}
function navBtn(v,ic_name,label,badge){return`<button class="nb ${S.view===v&&!S.sel?"on":""}" data-act="view" data-v="${v}">${i(ic_name,"ic-s")}${label?` ${label}`:""}${badge?`<span class="bg">${badge}</span>`:""}</button>`}

// ── Tree View ──
function rTree(alMap){
  const mg=maxGen(),gens=[];for(let j=0;j<=mg;j++)gens.push([]);
  Object.values(S.tree).forEach(p=>{if(p.gen>=0&&p.gen<=mg)gens[p.gen].push(p)});
  const sq=S.search.toLowerCase().trim();
  let rows="";
  for(let g=0;g<=mg;g++){
    if(g>0)rows+=`<div class="gen-conn"></div>`; // vertical connector line between generations
    if(g===0){rows+=`<div class="gen-row"><div class="gen-nodes"><div class="fam">${rNode(S.tree.me,alMap)}</div></div></div>`;continue}
    const fams={};gens[g].forEach(p=>{const k=p.parentOf||p.siblingOf||p.spouseOf||"x";if(!fams[k])fams[k]=[];fams[k].push(p)});
    const keys=Object.keys(fams).sort((a,b)=>nodeOrd(a)-nodeOrd(b));
    let fg="";keys.forEach(k=>{const f=fams[k];f.sort((a,b)=>(b.core||0)-(a.core||0)||(a.gender==="f"?-1:1));
      let ns="";f.forEach(p=>{if(sq){const d=S.data[p.id]||{};if(!`${d.firstName||""} ${d.surname||""} ${d.birthPlace||""} ${p.role}`.toLowerCase().includes(sq))return}ns+=rNode(p,alMap)});
      const core=f.find(p=>p.core)||f[0];
      if(core){const mid=core.id,show=S.am===mid,hp=hasParents(core.id);
        ns+=`<div style="position:relative;align-self:center"><button class="add-b" data-act="menu" data-id="${mid}">${i("plus","ic-s")}</button><div class="add-menu ${show?"show":""}">`
        ns+=`<button class="am-btn" data-act="add-sib" data-id="${core.id}">${i("users","ic-s")} Брат/сестра</button>`
        ns+=`<button class="am-btn" data-act="add-sp" data-id="${core.id}">${i("ring","ic-s")} Супруг(а)</button>`
        if(!hp)ns+=`<button class="am-btn" data-act="add-par" data-id="${core.id}">${i("addP","ic-s")} Родители</button>`
        ns+=`</div></div>`}
      if(ns){const childLabel=g>=3&&k!=="x"?`<div class="fam-label">↓ ${esc(pName(k))}</div>`:"";fg+=`<div class="fam${f.length>1?" multi":""}">${ns}${childLabel}</div>`}});
    if(fg)rows+=`<div class="gen-row"><div class="gen-banner">${genLabel(g)}</div><div class="gen-nodes">${fg}</div></div>`}
  return`<div class="tree-area"><div class="tree-box">${rows}</div><div class="tree-hint">Нажмите карточку · «+» добавляет родственника</div></div>`
}

function rNode(p,alMap){
  const isMe=p.id==="me";
  if(isMe)return`<div class="nd me"><div class="nd-ic">${i("person","ic-l")}</div><div class="nd-role">Заявитель</div><div class="nd-nm">Я</div></div>`;
  const d=S.data[p.id]||{},pc=pct(p.id),ha=alMap[p.id],nm=pName(p.id),isV=S.viewer===p.id;
  const fc=(S.files[p.id]||[]).length;
  const cls=[p.core?"":"sib",ha?"ao":"",isV?"viewer":"",!ha&&!isV&&pc>0?(p.gender==="f"?"ff":"fm"):""].filter(Boolean).join(" ");
  const rc=ha?"var(--al)":pc>60?"var(--gr)":"var(--gold)";const off=CI-CI*(pc/100);
  return`<div class="nd ${cls}" data-act="sel" data-id="${p.id}">
    ${!p.core?`<button class="del-btn" data-act="del" data-id="${p.id}">${i("x","ic-s")}</button>`:""}
    <div class="nd-ring"><svg viewBox="0 0 36 36"><circle class="ring-bg" cx="18" cy="18" r="16"/><circle class="ring-fl" cx="18" cy="18" r="16" stroke="${rc}" stroke-dasharray="${CI.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/></svg><span class="nd-ic" style="color:${p.gender==="f"?"var(--fem)":"var(--mal)"}">${gic(p.gender)}</span></div>
    <div class="nd-role">${esc(p.role)}</div>
    <div class="nd-nm${!d.firstName&&!d.surname?" empty":""}">${d.firstName||d.surname?esc(nm):"—"}</div>
    ${ha?`<div class="nd-tag alert">${i("bolt","ic-s")} зацепка</div>`:""}${fc?`<div class="nd-tag files">${i("image","ic-s")} ${fc}</div>`:""}${isV?`<div class="nd-tag you">ВЫ</div>`:""}</div>`
}

// ── Person Form ──
function rPerson(id,alMap){
  const p=S.tree[id];if(!p){S.sel=null;render();return""}
  const d=S.data[id]||{},mk=markers(id),pc=pct(id),files=S.files[id]||[],arLinks=archLinks(id);
  const gc=p.gender==="f"?"var(--fem)":"var(--mal)",pcC=pc>60?"var(--gr)":"var(--gold)";
  let ah="";if(mk.length)ah=`<div class="abox"><div class="abox-t">${i("bolt","ic-m")} Зацепки</div><div class="abox-m">${mk.map(m=>`<span>${esc(m)}</span>`).join("")}</div><div class="abox-d">Возможная связь с бывшей Румынией, Польшей, Германией, Прибалтикой.</div></div>`;
  let ss="";FLD.forEach((sec,si)=>{const sk=`${id}_${si}`,io=S.os[sk]!==false;const fl=sec.f.filter(f=>d[f.k]?.trim?.()).length;let fh="";
    if(io){let inner=`<div class="sdesc">${esc(sec.d)}</div>`;
      sec.f.forEach(f=>{const v=d[f.k]||"",lc=f.c?"flbl crit":"flbl",bg=f.c?`<span class="fbdg">ВАЖНО</span>`:"";const hint=f.h?`<div class="fhint">${esc(f.h)}</div>`:"";
        inner+=`<div class="fld"><label class="${lc}">${esc(f.l)}${bg}</label>`;
        if(f.m)inner+=`<textarea class="fi" placeholder="${esc(f.p)}" data-pid="${id}" data-fld="${f.k}">${esc(v)}</textarea>`;
        else inner+=`<input class="fi" placeholder="${esc(f.p)}" value="${esc(v)}" data-pid="${id}" data-fld="${f.k}">`;
        inner+=hint;
        // Archive search under field
        if(f.ar&&arLinks.length){inner+=`<div class="farch"><div class="farch-lbl">${v?"Подробности:":"Найти в архивах:"}</div>${arLinks.map(l=>`<a href="${l.u}" target="_blank">${i("search","ic-s")} ${l.n}</a>`).join("")}</div>`}
        inner+=`</div>`});
      fh=`<div class="sbody">${inner}</div>`}
    ss+=`<div class="swrap"><button class="stog ${io?"open":"closed"}" data-act="toggle" data-s="${sk}"><span style="color:var(--dm)">${i(sec.ic,"ic-m")}</span><span style="flex:1">${esc(sec.s)}</span><span class="scnt ${fl>0?"has":""}">${fl}/${sec.f.length}</span><span class="sarr ${io?"open":""}">${i("chev","ic-s")}</span></button>${fh}</div>`});
  // Files
  const fsk=`${id}_files`,fio=S.os[fsk]!==false;let fH="";
  if(fio){let th=files.map((f,idx)=>`<div class="fthumb" data-act="preview" data-src="${f.data}"><img src="${f.data}"><button class="fdel" data-act="del-file" data-id="${id}" data-idx="${idx}">${i("x","ic-s")}</button></div>`).join("");
    th+=`<button class="fup" data-act="upload" data-id="${id}">${i("camera","ic-l")}<span>Фото</span></button>`;
    fH=`<div class="sbody"><div class="sdesc">Фото документов, паспортов, метрик.</div><div class="fgrid">${th}</div></div>`}
  ss+=`<div class="swrap"><button class="stog ${fio?"open":"closed"}" data-act="toggle" data-s="${fsk}"><span style="color:var(--dm)">${i("camera","ic-m")}</span><span style="flex:1">Фото</span><span class="scnt ${files.length>0?"has":""}">${files.length}</span><span class="sarr ${fio?"open":""}">${i("chev","ic-s")}</span></button>${fH}</div>`;

  return`<div class="panel"><div class="panel-in"><div class="panel-hdr"><button class="bk-btn" data-act="back">${i("arrowL","ic-s")} Назад</button><div style="flex:1"><div class="p-nm" style="color:${gc}">${gic(p.gender)} ${esc(pName(id))}</div><div class="p-rl">${esc(p.role)}${!p.core?` · <a href="#" data-act="del" data-id="${id}">удалить</a>`:""}</div></div><div style="text-align:right"><div class="p-pct" style="color:${pcC}">${pc}%</div><div class="p-pctl">заполнено</div></div></div>${ah}${ss}</div></div>`
}

// ── Citizenship View ──
function rCit(results){
  let h=`<div class="panel"><div class="panel-in"><div class="gq-t">${i("passport","ic-l")} Анализ права на гражданство</div><div class="gq-d">Автоматическая проверка по программам 9 стран.</div>`;
  if(!results.length)h+=`<div class="al-empty"><div style="color:var(--dm);margin-bottom:10px">${i("search","ic-xl")}</div><div style="color:var(--dm)">Пока совпадений нет. Заполняйте данные.</div></div>`;
  else{results.forEach(r=>{h+=`<div class="cc ${r.conf}"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span class="cc-flag">${r.f}</span><div><span class="cc-name">${esc(r.c)}</span><span class="cc-conf ${r.conf}">${r.conf==="high"?"ВЫСОКАЯ":r.conf==="medium"?"СРЕДНЯЯ":"НИЗКАЯ"}</span></div></div>
    <div class="cc-row"><b>Предок:</b> ${esc(r.pn)} (${esc(r.gn)})</div>
    <div class="cc-row"><b>Совпадения:</b> ${r.matched.map(m=>`<span class="abox-m"><span>${esc(m)}</span></span>`).join(" ")}</div>
    <div class="cc-basis">${esc(r.basis)}</div>
    <div class="cc-row">${esc(r.reqs)}</div>
    <div class="cc-steps"><b>Стоимость:</b> ${esc(r.cost)} · <b>Срок:</b> ${esc(r.time)}\n\n${esc(r.steps)}</div>
    <div style="margin-top:8px"><button class="btn" data-act="sel" data-id="${r.pid}">Открыть ${esc(r.pn)} →</button></div></div>`})}
  h+=`</div></div>`;return h}

// ── Alerts View ──
function rAlerts(al){
  if(!al.length)return`<div class="panel"><div class="panel-in"><div class="gq-t">Находки</div><div class="al-empty"><div style="color:var(--dm)">${i("search","ic-xl")}</div><div style="color:var(--dm);margin-top:10px">Пока зацепок нет.</div></div></div></div>`;
  const gr={};al.forEach(a=>{const g=mgroup(a.m);if(!gr[g])gr[g]={};if(!gr[g][a.pid])gr[g][a.pid]=[];gr[g][a.pid].push(a.m)});
  let gh="";Object.entries(gr).forEach(([g,ps])=>{let ph="";Object.entries(ps).forEach(([pid,ms])=>{const t=S.tree[pid];ph+=`<div class="alp" data-act="sel" data-id="${pid}"><span style="color:${t?.gender==="f"?"var(--fem)":"var(--mal)"}">${gic(t?.gender)}</span><div style="flex:1"><div style="font-size:12px;font-weight:600">${esc(pName(pid))}</div><div style="font-size:10px;color:var(--dm)">${esc(t?.role)}</div></div><div class="abox-m">${ms.map(m=>`<span>${esc(m)}</span>`).join("")}</div><span style="color:var(--dm)">→</span></div>`});gh+=`<div class="alg"><div class="alg-t">${esc(g)}</div>${ph}</div>`});
  return`<div class="panel"><div class="panel-in"><div class="gq-t">Находки</div><div class="gq-d">Автоматическая проверка данных.</div>${gh}</div></div>`}

// ── General Questions ──
function rGeneral(){let c="";GQ.forEach((q,j)=>{const v=S.general[`q${j}`]||"";c+=`<div class="gq-c"><div class="gq-q"><span class="gq-n">${j+1}.</span>${esc(q)}</div><textarea class="fi" rows="3" placeholder="Ваш ответ..." data-gq="${j}">${esc(v)}</textarea></div>`});return`<div class="panel"><div class="panel-in"><div class="gq-t">Общие вопросы</div><div class="gq-d">Помогают обнаружить скрытые корни.</div>${c}</div></div>`}

// ── Lobby ──
function rLobby(){return`<div class="lobby"><div class="lcard"><div class="l-icon">${i("tree","ic-xl")}</div><div class="l-t">Семейное Древо</div><div class="l-d">Исследование происхождения и поиск оснований для второго гражданства.</div><button class="l-btn pri" data-act="create-room">Создать новое древо</button><div class="l-div">или присоединиться</div><input class="l-inp" id="joinCode" placeholder="КОД" maxlength="6"><button class="l-btn sec" data-act="join-room">Войти по коду</button></div></div>`}

// ── Invite Modal ──
function showInviteModal(){
  const people=Object.entries(S.tree).filter(([id])=>id!=="me");
  let list=people.map(([id,p])=>{const link=`${location.origin}${location.pathname}?room=${S.rid}&who=${id}`;
    return`<div class="modal-item"><span style="color:${p.gender==="f"?"var(--fem)":"var(--mal)"}">${gic(p.gender)}</span><div style="flex:1"><div style="font-size:13px;font-weight:600">${esc(pName(id))}</div><div style="font-size:10px;color:var(--dm)">${esc(p.role)}</div></div><button class="btn" data-act="copy-invite" data-link="${esc(link)}">${i("copy","ic-s")} Ссылка</button></div>`}).join("");
  S.modal=`<div class="modal" data-act="close-modal"><div class="modal-c" onclick="event.stopPropagation()"><div class="modal-t">Пригласить родственника</div><div class="modal-d">Выберите кого пригласить. Каждый получит персональную ссылку.</div>${list}</div></div>`;
  render()}

// ══════════════════════════════════════════════
// EVENT DELEGATION — single handler, no inline onclick
// ══════════════════════════════════════════════
document.addEventListener("click",e=>{
  const t=e.target, act=t.closest("[data-act]");
  if(!act)return;
  const a=act.dataset.act, id=act.dataset.id;
  console.log("[CLICK] act:",a,"id:",id,"element:",act.tagName,act.className);
  e.stopPropagation();

  // Navigation
  if(a==="view"){S.view=act.dataset.v;S.sel=null;S.am=null;render();return}
  if(a==="back"){S.sel=null;render();return}

  // Tree node
  if(a==="sel"){S.sel=id;S.view="tree";render();return}

  // Delete person
  if(a==="del"){console.log("[CLICK] Delete action, id:",id,"target:",t.tagName,t.className);e.preventDefault();delPerson(id);return}

  // Add menu
  if(a==="menu"){S.am=S.am===id?null:id;render();return}
  if(a==="add-sib"){addSib(id);return}
  if(a==="add-sp"){addSp(id);return}
  if(a==="add-par"){addPar(id);return}

  // Section toggle
  if(a==="toggle"){const s=act.dataset.s;S.os[s]=S.os[s]===false;render();return}

  // Files
  if(a==="upload"){const inp=document.createElement("input");inp.type="file";inp.accept="image/*";inp.capture="environment";inp.onchange=async ev=>{const file=ev.target.files[0];if(!file)return;if(!S.files[id])S.files[id]=[];if(S.files[id].length>=8){toast("Макс. 8");return}try{const data=await compress(file);S.files[id].push({name:file.name,data,date:Date.now()});saveL();render();toast("Добавлено")}catch{toast("Ошибка")}};inp.click();return}
  if(a==="del-file"){const idx=parseInt(act.dataset.idx);if(confirm("Удалить фото?")){S.files[id].splice(idx,1);saveL();render()}return}
  if(a==="preview"){S.preview=act.dataset.src;render();return}
  if(a==="close-preview"){S.preview=null;render();return}

  // Share
  if(a==="copy-link"){const l=location.origin+location.pathname+"?room="+S.rid;navigator.clipboard?.writeText(l).then(()=>toast("Скопировано!"));return}
  if(a==="copy-invite"){navigator.clipboard?.writeText(act.dataset.link).then(()=>toast("Ссылка скопирована!"));return}
  if(a==="show-invite"){showInviteModal();return}
  if(a==="close-modal"){S.modal=null;render();return}

  // Identity
  if(a==="set-viewer"){S.viewer=id;localStorage.setItem("viewer_"+S.rid,id);S.modal=null;render();return}
  if(a==="clear-viewer"){S.viewer=null;localStorage.removeItem("viewer_"+S.rid);render();return}

  // Room
  if(a==="create-room"){createRoom();return}
  if(a==="join-room"){const inp=document.getElementById("joinCode");joinRoom(inp?.value);return}

  // Tools
  if(a==="export"){const b=new Blob([JSON.stringify({tree:S.tree,data:S.data,general:S.general,files:S.files},null,2)],{type:"application/json"});const el=document.createElement("a");el.href=URL.createObjectURL(b);el.download="family-tree.json";el.click();toast("Экспортировано");return}
  if(a==="import"){const inp=document.createElement("input");inp.type="file";inp.accept=".json";inp.onchange=async ev=>{const f=ev.target.files[0];if(!f)return;try{const d=JSON.parse(await f.text());if(d.tree){S.tree=d.tree;S.data=d.data||{};S.general=d.general||{};S.files=d.files||{};save();render();toast("Импортировано")}}catch{toast("Ошибка")}};inp.click();return}
  if(a==="reset"){if(confirm("Удалить ВСЕ данные?")){S.tree=mkTree();S.data={};S.general={};S.files={};S.sel=null;save();render()}return}
});

// Close add-menu on outside click
document.addEventListener("click",e=>{if(S.am&&!e.target.closest(".add-menu")&&!e.target.closest("[data-act=menu]")){S.am=null;render()}});

// Input delegation
document.addEventListener("input",e=>{
  const t=e.target;
  if(t.dataset.pid&&t.dataset.fld){if(!S.data[t.dataset.pid])S.data[t.dataset.pid]={};S.data[t.dataset.pid][t.dataset.fld]=t.value;clearTimeout(svT);svT=setTimeout(()=>{save();render()},1200);return}
  if(t.dataset.gq!==undefined){S.general[`q${t.dataset.gq}`]=t.value;clearTimeout(svT);svT=setTimeout(()=>save(),1200);return}
  if(t.hasAttribute("data-search")){S.search=t.value;render();return}
  if(t.id==="joinCode"){t.value=t.value.toUpperCase()}
});

// ── Init ──
loadL();
const params=new URLSearchParams(location.search);
const urlRoom=params.get("room"), urlWho=params.get("who");
if(urlRoom){joinRoom(urlRoom).then(()=>{if(urlWho&&S.tree[urlWho]){S.viewer=urlWho;localStorage.setItem("viewer_"+S.rid,urlWho);render()}})}
else if(S.rid){S.view="tree";const sv=localStorage.getItem("viewer_"+S.rid);if(sv&&S.tree[sv])S.viewer=sv;listenC();render();history.replaceState(null,"","?room="+S.rid)}
else{S.view="lobby";render()}
