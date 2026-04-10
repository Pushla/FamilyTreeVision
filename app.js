// ══════════════════ Firebase ══════════════════
const FB={apiKey:"AIzaSyAObYDV9zB8DguOJC-krGFqwSHl4SAdW94",authDomain:"familytreevision.firebaseapp.com",projectId:"familytreevision",storageBucket:"familytreevision.firebasestorage.app",messagingSenderId:"159441682554",appId:"1:159441682554:web:706b36833acd785757fbc3"};
let db=null,unsub=null;
try{firebase.initializeApp(FB);db=firebase.firestore()}catch(e){console.error(e)}

// ══════════════════ SVG Icons ══════════════════
const I={
tree:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V14"/><path d="M8 22h8"/><path d="M12 14l-5-5.5h3V5.5h4V8.5h3z"/><path d="M12 5.5L9.5 2.5h5z"/></svg>`,
female:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a6 6 0 0112 0v2"/><circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" opacity=".15"/></svg>`,
male:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10" cy="7" r="4"/><path d="M16.5 1.5L21 1l-.5 4.5"/><path d="M21 1l-5.5 5.5"/><path d="M4 21v-2a6 6 0 0112 0v2"/></svg>`,
person:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21v-1.5A6.5 6.5 0 0112 13a6.5 6.5 0 016.5 6.5V21"/></svg>`,
globe:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><ellipse cx="12" cy="12" rx="4" ry="9.5"/><path d="M3 9h18M3 15h18"/></svg>`,
pin:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 2.5C8.4 2.5 5.5 5.4 5.5 9c0 5.25 6.5 12.5 6.5 12.5S18.5 14.25 18.5 9c0-3.6-2.9-6.5-6.5-6.5z"/><circle cx="12" cy="9" r="2.5" fill="currentColor" opacity=".15"/><circle cx="12" cy="9" r="2.5"/></svg>`,
shield:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5l7.5 3.5V11c0 5-3.2 9.5-7.5 11.5C7.7 20.5 4.5 16 4.5 11V6z"/><path d="M8.5 12l2.5 2.5L16 10"/></svg>`,
family:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="7" cy="5.5" r="2.5"/><circle cx="17" cy="5.5" r="2.5"/><path d="M2 16.5c0-2.8 2.2-5 5-5s5 2.2 5 5"/><path d="M12 16.5c0-2.8 2.2-5 5-5s5 2.2 5 5"/><circle cx="12" cy="17" r="2" fill="currentColor" opacity=".15"/><circle cx="12" cy="17" r="2"/></svg>`,
scroll:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/><line x1="8" y1="9" x2="11" y2="9"/></svg>`,
bolt:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6.5l-1.5 8L19 10h-6.5z"/></svg>`,
search:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="7"/><path d="M21 21l-5-5"/></svg>`,
cloud:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M18 10h-1.26A7 7 0 109 20h9a4 4 0 000-8z"/></svg>`,
save:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>`,
folder:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>`,
trash:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
copy:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`,
x:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
chevDown:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,9 12,15 18,9"/></svg>`,
arrowLeft:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>`,
plus:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
users:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="3.5"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
ring:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 2l-2 4h4z" fill="currentColor" opacity=".3" stroke="none"/><path d="M9.5 7.5L12 5l2.5 2.5"/><circle cx="8.5" cy="15" r="5"/><circle cx="15.5" cy="15" r="5"/></svg>`,
camera:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
image:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>`,
addParent:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="6" r="3.5"/><path d="M6 19v-1.5a6 6 0 0112 0V19"/><line x1="12" y1="14" x2="12" y2="11" stroke-dasharray="2,2"/><path d="M9 2l3-1 3 1" opacity=".5"/></svg>`,
disk:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="5"/><path d="M12 9v3l2 1.5"/></svg>`,
};
function ic(n,c='ic-md'){return`<span class="ic ${c}">${I[n]||''}</span>`}
function gIc(g){return g==="f"?ic("female","ic-node"):ic("male","ic-node")}

// ══════════════════ Data ══════════════════
const FIELDS=[{s:"Основные данные",icon:"person",f:[{k:"surname",l:"Фамилия (текущая)",p:"Иванов"},{k:"maidenName",l:"Фамилия при рождении",p:"Если менялась — оригинальная"},{k:"otherNames",l:"Другие варианты фамилии",p:"По браку, русифицированные"},{k:"firstName",l:"Имя",p:"Полное имя"},{k:"patronymic",l:"Отчество",p:""},{k:"birthDate",l:"Дата рождения",p:"ДД.ММ.ГГГГ или год"},{k:"birthPlace",l:"Место рождения",p:"Страна → область → район → город/село",c:1},{k:"deathDate",l:"Дата смерти",p:"Если применимо"},{k:"deathPlace",l:"Место смерти",p:""}]},{s:"Национальность и корни",icon:"globe",f:[{k:"passportNat",l:"Национальность по паспорту",p:"Графа «5» сов. паспорта",c:1},{k:"actualNat",l:"Фактическая национальность",p:"Как себя считал(а)"},{k:"nativeLang",l:"Родной язык",p:"Дома, с родителями",c:1},{k:"otherLangs",l:"Другие языки",p:"Идиш, румынский, немецкий..."},{k:"religion",l:"Вероисповедание",p:"Православие, католичество, иудаизм..."},{k:"citizenship",l:"Гражданство",p:"СССР, Румыния, Польша..."}]},{s:"Место жительства",icon:"pin",f:[{k:"before1917",l:"До 1917",p:"Губерния, уезд, село"},{k:"period1918",l:"1918–1940 (КЛЮЧЕВОЙ!)",p:"Бессарабия? Буковина? Галиция?",c:1},{k:"period1941",l:"1941–1945",p:"Эвакуация? Фронт? Оккупация?"},{k:"after1945",l:"После 1945",p:"Города проживания"}]},{s:"Репрессии и война",icon:"shield",f:[{k:"warService",l:"Участие в ВОВ",p:"Где, звание?"},{k:"repression",l:"Репрессии",p:"Арест? Ссылка? Лагерь?",c:1},{k:"deportation",l:"Депортация",p:"Откуда, куда, когда?",c:1},{k:"evacuation",l:"Эвакуация",p:"Откуда и куда?"}]},{s:"Семья и работа",icon:"family",f:[{k:"education",l:"Образование",p:"Вуз/школа"},{k:"profession",l:"Профессия",p:"Кем работал(а)"},{k:"spouseName",l:"ФИО супруга/супруги",p:"Девичья фамилия"},{k:"spouseNat",l:"Национальность супруга",p:""},{k:"spouseBirth",l:"Место рожд. супруга",p:""}]},{s:"Документы и память",icon:"scroll",f:[{k:"documents",l:"Сохранившиеся документы",p:"Паспорта, свидетельства, метрики...",c:1},{k:"photos",l:"Старые фотографии",p:"С подписями? На каком языке?"},{k:"letters",l:"Письма, дневники",p:"На каком языке?"},{k:"notes",l:"Заметки и воспоминания",p:"Семейные истории, легенды...",m:1}]}];
const AK=FIELDS.flatMap(s=>s.f.map(f=>f.k));
const MK=["бессараб","кишинёв","кишинев","бельц","тирасполь","бендер","хотин","аккерман","белгород-днестров","измаил","болград","килия","бричан","сорок","оргеев","унген","кагул","комрат","тараклия","молдав","молдов","черновц","буковин","сторожинец","вижниц","кицман","заставн","кельменц","герца","закарпат","ужгород","мукачев","берегов","львов","тернопол","ивано-франк","станислав","галиц","вильн","каунас","литв","латв","рига","эстон","таллин","варшав","краков","польш","люблин","поволж","немц","deutsch","шваб","колони","еврей","иудаизм","идиш","синагог","местечк","грек","греч","мариупол","урум","болгар","румын","roman","попеску","молдован","венгр","мадьяр","трансильван","католи","лютеран","греко-католи","униат","депортац","репресс","ссылк","лагер","расстрел"];
const MG={"🇷🇴 Румыния/Молдова":["бессараб","кишинёв","кишинев","бельц","тирасполь","бендер","хотин","аккерман","белгород-днестров","измаил","болград","килия","бричан","сорок","оргеев","унген","кагул","комрат","тараклия","молдав","молдов","черновц","буковин","сторожинец","вижниц","кицман","заставн","кельменц","герца","румын","roman","попеску","молдован"],"🇭🇺 Венгрия":["закарпат","ужгород","мукачев","берегов","венгр","мадьяр","трансильван"],"🇵🇱 Польша":["львов","тернопол","ивано-франк","станислав","галиц","варшав","краков","польш","люблин"],"🇱🇹 Литва":["вильн","каунас","литв"],"🇱🇻 Латвия":["латв","рига"],"🇪🇪 Эстония":["эстон","таллин"],"🇩🇪 Германия":["поволж","немц","deutsch","шваб","колони","лютеран"],"🇮🇱 Израиль":["еврей","иудаизм","идиш","синагог","местечк"],"🇬🇷 Греция":["грек","греч","мариупол","урум"],"🇧🇬 Болгария":["болгар"]};
const GQ=["Были ли в семье разговоры о «нерусских» корнях?","Были ли люди с необычными фамилиями (-еску, -ану, -ски, -берг, -штейн)?","Говорил ли кто-то из старших на другом языке?","Была ли не-православная религия?","Были ли репрессированные, депортированные?","Откуда семья переехала в ваш город?","Сохранились ли старые документы?","Есть ли фотоальбомы до 1950-х? На каком языке подписи?","Помните ли названия деревень, откуда были старшие?","Есть ли «хранитель семейной памяти»?","Была ли смена фамилии?","Были ли «запретные темы» в семье?"];
const CI=2*Math.PI*16;

// ══════════════════ Initial Tree ══════════════════
function mkInit(){return{me:{id:"me",role:"Я",gen:0,gender:null,core:1},father:{id:"father",role:"Отец",gen:1,gender:"m",core:1,parentOf:"me"},mother:{id:"mother",role:"Мать",gen:1,gender:"f",core:1,parentOf:"me"},gm_pat:{id:"gm_pat",role:"Бабушка (по отцу)",gen:2,gender:"f",core:1,parentOf:"father"},gf_pat:{id:"gf_pat",role:"Дедушка (по отцу)",gen:2,gender:"m",core:1,parentOf:"father"},gm_mat:{id:"gm_mat",role:"Бабушка (по матери)",gen:2,gender:"f",core:1,parentOf:"mother"},gf_mat:{id:"gf_mat",role:"Дедушка (по матери)",gen:2,gender:"m",core:1,parentOf:"mother"},ggm1:{id:"ggm1",role:"Прабабушка",gen:3,gender:"f",core:1,parentOf:"gm_pat"},ggf1:{id:"ggf1",role:"Прадедушка",gen:3,gender:"m",core:1,parentOf:"gm_pat"},ggm2:{id:"ggm2",role:"Прабабушка",gen:3,gender:"f",core:1,parentOf:"gf_pat"},ggf2:{id:"ggf2",role:"Прадедушка",gen:3,gender:"m",core:1,parentOf:"gf_pat"},ggm3:{id:"ggm3",role:"Прабабушка",gen:3,gender:"f",core:1,parentOf:"gm_mat"},ggf3:{id:"ggf3",role:"Прадедушка",gen:3,gender:"m",core:1,parentOf:"gm_mat"},ggm4:{id:"ggm4",role:"Прабабушка",gen:3,gender:"f",core:1,parentOf:"gf_mat"},ggf4:{id:"ggf4",role:"Прадедушка",gen:3,gender:"m",core:1,parentOf:"gf_mat"}}}

// ══════════════════ State ══════════════════
let S={tree:mkInit(),data:{},general:{},files:{},view:"lobby",sel:null,os:{},rid:null,sync:false,am:null,search:"",preview:null};
const LS="ftree-v7",LS_F="ftree-files-v1";

// ══════════════════ Helpers ══════════════════
function esc(s){const d=document.createElement("div");d.textContent=s||"";return d.innerHTML}
function toast(m){const e=document.createElement("div");e.className="toast";e.textContent=m;document.body.appendChild(e);setTimeout(()=>e.remove(),2500)}
function gid(){return"p"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function mks(pid){const d=S.data[pid];if(!d)return[];const t=Object.values(d).join(" ").toLowerCase();return[...new Set(MK.filter(m=>t.includes(m)))]}
function pct(pid){const d=S.data[pid];if(!d)return 0;return Math.round(AK.filter(k=>d[k]?.trim?.()).length/AK.length*100)}
function aAlerts(){const r=[];Object.keys(S.tree).forEach(id=>{if(id==="me")return;mks(id).forEach(m=>r.push({person:id,marker:m}))});return r}
function mgr(m){for(const[g,ms]of Object.entries(MG))if(ms.includes(m))return g;return"⚠️ Другое"}
function maxGen(){return Math.max(...Object.values(S.tree).map(p=>p.gen))}
function genLabel(g){return g===0?"":g===1?"Родители":g===2?"Бабушки и дедушки":g===3?"Прабабушки и прадедушки":`Поколение ${g}`}

// ══════════════════ Storage ══════════════════
function sL(){try{localStorage.setItem(LS,JSON.stringify({tree:S.tree,data:S.data,general:S.general,rid:S.rid}));localStorage.setItem(LS_F,JSON.stringify(S.files))}catch{}}
function lL(){try{const d=localStorage.getItem(LS);if(d){const p=JSON.parse(d);if(p.tree)S.tree=p.tree;S.data=p.data||{};S.general=p.general||{};if(p.rid)S.rid=p.rid}const f=localStorage.getItem(LS_F);if(f)S.files=JSON.parse(f)}catch{}}
async function sC(){if(!db||!S.rid)return;try{await db.collection("rooms").doc(S.rid).set({tree:S.tree,data:S.data,general:S.general,t:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});S.sync=true}catch(e){console.error(e)}}
function lC(){if(!db||!S.rid)return;if(unsub)unsub();unsub=db.collection("rooms").doc(S.rid).onSnapshot(snap=>{if(snap.exists){const d=snap.data();S.tree=d.tree||mkInit();S.data=d.data||{};S.general=d.general||{};S.sync=true;sL();R()}},()=>{S.sync=false})}
let svT=null;function sA(){sL();clearTimeout(svT);svT=setTimeout(()=>{if(db&&S.rid)sC()},1200)}
function genCode(){const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let r="";for(let i=0;i<6;i++)r+=c[Math.floor(Math.random()*c.length)];return r}
async function cRoom(){const code=genCode();if(db){try{await db.collection("rooms").doc(code).set({tree:S.tree,data:S.data,general:S.general,t:firebase.firestore.FieldValue.serverTimestamp()});S.sync=true}catch(e){console.error(e)}}S.rid=code;sL();if(db)lC();S.view="tree";R();uURL()}
async function jRoom(code){code=(code||"").toUpperCase().trim();if(code.length<4)return;if(db){try{const snap=await db.collection("rooms").doc(code).get();if(!snap.exists){toast("Комната не найдена");return}const d=snap.data();S.tree=d.tree||mkInit();S.data=d.data||{};S.general=d.general||{};S.sync=true}catch(e){toast("Ошибка подключения");return}}S.rid=code;sL();if(db)lC();S.view="tree";R();uURL()}
function uURL(){if(S.rid)history.replaceState(null,"","?room="+S.rid)}

// ══════════════════ Dynamic Relatives ══════════════════
function addSib(ofId){const o=S.tree[ofId];if(!o)return;const id=gid(),g=o.gender==="f"?"m":"f";S.tree[id]={id,role:g==="f"?"Сестра":"Брат",gen:o.gen,gender:g,core:0,siblingOf:ofId,parentOf:o.parentOf};S.data[id]={};sA();S.am=null;R()}
function addSp(ofId){const o=S.tree[ofId];if(!o)return;const id=gid(),g=o.gender==="f"?"m":"f";S.tree[id]={id,role:g==="f"?"Супруга":"Супруг",gen:o.gen,gender:g,core:0,spouseOf:ofId};S.data[id]={};sA();S.am=null;R()}
function addParents(ofId){
  const o=S.tree[ofId];if(!o)return;const ng=o.gen+1;
  const mId=gid(),fId=gid();
  S.tree[mId]={id:mId,role:"Мать",gen:ng,gender:"f",core:0,parentOf:ofId};
  S.tree[fId]={id:fId,role:"Отец",gen:ng,gender:"m",core:0,parentOf:ofId};
  S.data[mId]={};S.data[fId]={};sA();S.am=null;R()
}
function hasParents(id){return Object.values(S.tree).some(p=>p.parentOf===id&&!p.siblingOf&&!p.spouseOf)}
function delP(id){if(S.tree[id]?.core)return;Object.keys(S.tree).forEach(k=>{if(S.tree[k].siblingOf===id||S.tree[k].spouseOf===id){delete S.tree[k];delete S.data[k]}});delete S.tree[id];delete S.data[id];delete S.files[id];if(S.sel===id)S.sel=null;sA();R()}

// ══════════════════ Image compression ══════════════════
function compressImg(file,maxW=500,quality=0.6){
  return new Promise((res,rej)=>{
    const reader=new FileReader();
    reader.onload=e=>{const img=new Image();img.onload=()=>{const canvas=document.createElement("canvas");let w=img.width,h=img.height;if(w>maxW){h=h*(maxW/w);w=maxW}canvas.width=w;canvas.height=h;canvas.getContext("2d").drawImage(img,0,0,w,h);res(canvas.toDataURL("image/jpeg",quality))};img.src=e.target.result};
    reader.onerror=rej;reader.readAsDataURL(file)
  })
}

// ══════════════════ Render ══════════════════
function R(){
  const al=aAlerts(),am={};al.forEach(a=>am[a.person]=true);
  const ids=Object.keys(S.tree).filter(k=>k!=="me");
  const tot=ids.reduce((s,k)=>s+pct(k),0);
  const pr=ids.length?Math.round(tot/(ids.length*100)*100):0;
  const totalFiles=Object.values(S.files).reduce((s,f)=>s+(f?.length||0),0);

  if(S.view==="lobby"){document.getElementById("app").innerHTML=rLob();return}
  const sy=db?(S.sync?`<span class="sync on">${ic("cloud","ic-sm")} синхр.</span>`:`<span class="sync off">ожид.</span>`):`<span class="sync off">${ic("disk","ic-sm")} локально</span>`;
  let h=`<div class="hdr"><div class="hdr-logo"><div class="hdr-mark">${ic("tree","ic-md")}</div><div><div class="hdr-title">Семейное Древо</div><div class="hdr-sub">${sy}</div></div></div>
  <div class="nav"><button class="nb ${S.view==="tree"&&!S.sel?"on":""}" onclick="go('tree')">${ic("tree","ic-sm")} Древо</button><button class="nb ${S.view==="general"?"on":""}" onclick="go('general')">${ic("scroll","ic-sm")} Вопросы</button><button class="nb ${S.view==="alerts"?"on":""}" onclick="go('alerts')">${ic("bolt","ic-sm")} Находки${al.length?`<span class="bdg">${al.length}</span>`:""}</button><span class="sep"></span><button class="ib" onclick="doExp()">${ic("save","ic-sm")}</button><button class="ib" onclick="doImp()">${ic("folder","ic-sm")}</button><button class="ib" onclick="doRst()">${ic("trash","ic-sm")}</button></div></div>
  <div class="pbar"><div class="ptrack"><div class="pfill" style="width:${pr}%"></div></div><span class="plbl">${pr}%</span></div>`;
  if(S.rid)h+=`<div class="share"><span style="font-size:11px;color:var(--dim)">Код:</span><span class="share-code">${S.rid}</span><button class="share-btn" onclick="cpL()">${ic("copy","ic-sm")} Скопировать</button></div>`;
  h+=`<div class="stats-bar"><span class="stat-chip">${ic("person","ic-sm")} <strong>${ids.length}</strong> человек</span><span class="stat-chip">${ic("bolt","ic-sm")} <strong>${al.length}</strong> зацепок</span><span class="stat-chip">${ic("image","ic-sm")} <strong>${totalFiles}</strong> файлов</span></div>`;
  if(S.view==="tree"&&!S.sel){h+=`<div class="search-bar">${ic("search","ic-sm")}<input class="search-input" placeholder="Поиск по имени, фамилии, месту..." value="${esc(S.search)}" oninput="S.search=this.value;R()"></div>`;h+=rTree(am)}
  else if(S.view==="tree"&&S.sel)h+=rPers(S.sel);
  else if(S.view==="general")h+=rGen();
  else if(S.view==="alerts")h+=rAl(al);
  if(S.preview)h+=`<div class="file-modal" onclick="S.preview=null;R()"><button class="file-modal-close">${ic("x","ic-md")}</button><img src="${S.preview}"></div>`;
  document.getElementById("app").innerHTML=h;
  document.body.onclick=e=>{if(!e.target.closest('.add-menu')&&!e.target.closest('.add-btn')){S.am=null;document.querySelectorAll('.add-menu').forEach(m=>m.classList.remove('show'))}};
}

function rLob(){return`<div class="lobby"><div class="lobby-card"><div class="lobby-icon">${ic("tree","ic-xl")}</div><div class="lobby-title">Семейное Древо</div><div class="lobby-desc">Интерактивная анкета для исследования происхождения. Создайте комнату и поделитесь ссылкой с родственниками.</div><button class="lobby-btn primary" onclick="cRoom()">Создать новое древо</button><div class="lobby-divider">или присоединиться</div><input class="lobby-input" id="jI" placeholder="КОД" maxlength="6" oninput="this.value=this.value.toUpperCase()"><button class="lobby-btn secondary" onclick="jRoom(document.getElementById('jI').value)">Войти по коду</button></div></div>`}

function rTree(am){
  const mg=maxGen();const gens=[];for(let i=0;i<=mg;i++)gens.push([]);
  Object.values(S.tree).forEach(p=>{if(p.gen>=0&&p.gen<=mg)gens[p.gen].push(p)});
  const sq=S.search.toLowerCase().trim();
  let rows="";
  for(let g=0;g<=mg;g++){
    if(g===0){rows+=`<div class="gen-row"><div class="gen-nodes"><div class="fam-group">${rNd(S.tree.me,am)}</div></div></div>`;continue}
    const fams={};
    gens[g].forEach(p=>{const k=p.parentOf||p.siblingOf||p.spouseOf||"x";if(!fams[k])fams[k]=[];fams[k].push(p)});
    let fg="";
    Object.keys(fams).sort((a,b)=>Object.keys(S.tree).indexOf(a)-Object.keys(S.tree).indexOf(b)).forEach(k=>{
      const f=fams[k];f.sort((a,b)=>(b.core||0)-(a.core||0));
      let ns="";f.forEach(p=>{
        if(sq){const d=S.data[p.id]||{};const txt=`${d.firstName||""} ${d.surname||""} ${d.birthPlace||""} ${p.role}`.toLowerCase();if(!txt.includes(sq)){return}}
        ns+=rNd(p,am)
      });
      const core=f.find(p=>p.core);
      if(core){const mid="m_"+core.id,show=S.am===mid;
        const hp=hasParents(core.id);
        ns+=`<div style="position:relative;align-self:center"><button class="add-btn" onclick="event.stopPropagation();tgA('${mid}')">${ic("plus","ic-sm")}</button><div class="add-menu ${show?"show":""}" onclick="event.stopPropagation()"><button onclick="addSib('${core.id}')">${ic("users","ic-sm")} Добавить брата/сестру</button><button onclick="addSp('${core.id}')">${ic("ring","ic-sm")} Добавить супруга(у)</button>${!hp?`<button onclick="addParents('${core.id}')">${ic("addParent","ic-sm")} Добавить родителей</button>`:""}</div></div>`}
      if(ns)fg+=`<div class="fam-group">${ns}</div>`});
    if(fg)rows+=`<div class="gen-row"><div class="gen-banner"><span>${genLabel(g)}</span></div><div class="gen-nodes">${fg}</div></div>`}
  return`<div class="tree-area"><div class="tree-box">${rows}</div><div class="tree-hint">Нажмите карточку для заполнения · «+» добавляет родственника или новое поколение</div></div>`
}

function rNd(p,am){
  if(p.id==="me")return`<div class="node me-node"><div class="node-icon-wrap">${ic("person","ic-lg")}</div><div class="node-role">Заявитель</div><div class="node-name">Я</div></div>`;
  const d=S.data[p.id]||{},pv=pct(p.id),ha=am[p.id];
  const nm=(d.firstName||d.surname)?`${d.firstName||""} ${d.surname||""}`.trim():"";
  const cls=[p.core?"":"sib",ha?"ao":"",!ha&&pv>0?(p.gender==="f"?"ff":"fm"):""].filter(Boolean).join(" ");
  const rc=ha?"var(--alert)":pv>60?"var(--green)":"var(--gold)";const off=CI-CI*(pv/100);
  const fc=(S.files[p.id]||[]).length;
  return`<div class="node ${cls}" onclick="sel('${p.id}')">
    ${!p.core?`<button class="del-btn can" onclick="event.stopPropagation();delP('${p.id}')">${ic("x","ic-sm")}</button>`:""}
    <div class="node-ring"><svg class="ring-svg" viewBox="0 0 36 36"><circle class="ring-bg" cx="18" cy="18" r="16"/><circle class="ring-fill" cx="18" cy="18" r="16" stroke="${rc}" stroke-dasharray="${CI.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/></svg><span class="node-icon-wrap" style="color:${p.gender==="f"?"var(--fem)":"var(--mal)"}">${gIc(p.gender)}</span></div>
    <div class="node-role">${esc(p.role)}</div>
    ${nm?`<div class="node-name">${esc(nm)}</div>`:`<div class="node-name empty">не заполнено</div>`}
    ${ha?`<div class="node-alert-tag">${ic("bolt","ic-sm")} зацепка</div>`:""}
    ${fc?`<div class="node-files-count">${ic("image","ic-sm")} ${fc}</div>`:""}
  </div>`
}

function rPers(id){
  const p=S.tree[id];if(!p){S.sel=null;R();return""}
  const d=S.data[id]||{},mk=mks(id),pv=pct(id);
  const gc=p.gender==="f"?"var(--fem)":"var(--mal)",pcC=pv>60?"var(--green)":"var(--gold)";
  const dn=d.firstName||p.role;const files=S.files[id]||[];
  let ah="";if(mk.length)ah=`<div class="alert-box"><div class="alert-title">${ic("bolt","ic-md")} Потенциальные зацепки!</div><div class="alert-markers">${mk.map(m=>`<span class="alert-marker">${esc(m)}</span>`).join("")}</div><div class="alert-desc">Возможная связь с территориями бывшей Румынии, Польши, Германии, Прибалтики.</div></div>`;
  // Sections
  let ss="";FIELDS.forEach((sec,si)=>{const sk=`${id}_${si}`,io=S.os[sk]!==false;const fl=sec.f.filter(f=>d[f.k]?.trim?.()).length;let fh="";
    if(io){sec.f.forEach(f=>{const v=d[f.k]||"",lc=f.c?"field-label critical":"field-label",bg=f.c?`<span class="field-badge">ВАЖНО</span>`:"";
      if(f.m)fh+=`<div class="field"><label class="${lc}">${esc(f.l)}${bg}</label><textarea class="field-input" placeholder="${esc(f.p)}" data-p="${id}" data-f="${f.k}" oninput="uf(this)">${esc(v)}</textarea></div>`;
      else fh+=`<div class="field"><label class="${lc}">${esc(f.l)}${bg}</label><input type="text" class="field-input" placeholder="${esc(f.p)}" value="${esc(v)}" data-p="${id}" data-f="${f.k}" oninput="uf(this)"></div>`});fh=`<div class="sec-body">${fh}</div>`}
    ss+=`<div class="sec-wrap"><button class="sec-toggle ${io?"open":"closed"}" onclick="tgS('${sk}')"><span style="color:var(--dim)">${ic(sec.icon,"ic-md")}</span><span style="flex:1">${esc(sec.s)}</span><span class="sec-count ${fl>0?"has":""}">${fl}/${sec.f.length}</span><span class="sec-arrow ${io?"open":""}">${ic("chevDown","ic-sm")}</span></button>${fh}</div>`});
  // Files section
  const fsk=`${id}_files`,fio=S.os[fsk]!==false;
  let filesHtml="";
  if(fio){
    let thumbs=files.map((f,i)=>`<div class="file-thumb" onclick="event.stopPropagation();S.preview='${f.data}';R()"><img src="${f.data}"><button class="file-del" onclick="event.stopPropagation();delFile('${id}',${i})">${ic("x","ic-sm")}</button><div class="file-name">${esc(f.name)}</div></div>`).join("");
    thumbs+=`<button class="file-upload-btn" onclick="event.stopPropagation();uploadFile('${id}')">${ic("camera","ic-lg")}<span>Добавить</span></button>`;
    filesHtml=`<div class="sec-body"><div class="files-section"><div class="files-grid">${thumbs}</div><div style="font-size:10px;color:var(--dim)">Фото документов, паспортов, метрик, старых фотографий. Макс. 8 файлов.</div></div></div>`;
  }
  ss+=`<div class="sec-wrap"><button class="sec-toggle ${fio?"open":"closed"}" onclick="tgS('${fsk}')"><span style="color:var(--dim)">${ic("camera","ic-md")}</span><span style="flex:1">Фото и документы</span><span class="sec-count ${files.length>0?"has":""}">${files.length}</span><span class="sec-arrow ${fio?"open":""}">${ic("chevDown","ic-sm")}</span></button>${filesHtml}</div>`;

  return`<div class="panel"><div class="panel-inner"><div class="panel-hdr"><button class="back-btn" onclick="go('tree')">${ic("arrowLeft","ic-sm")} Назад</button><div style="flex:1"><div class="panel-name" style="color:${gc}">${gIc(p.gender)} ${esc(dn)}${d.surname?` <span style="color:var(--dim)">${esc(d.surname)}</span>`:""}</div><div class="panel-role">${esc(p.role)}${!p.core?` · <a href="#" onclick="event.preventDefault();delP('${id}');go('tree')">удалить</a>`:""}</div></div><div style="text-align:right"><div class="panel-pct" style="color:${pcC}">${pv}%</div><div class="panel-pct-label">заполнено</div></div></div>${ah}${ss}</div></div>`
}

function rGen(){let c="";GQ.forEach((q,i)=>{const v=S.general[`q${i}`]||"";c+=`<div class="gq-card"><div class="gq-q"><span class="gq-num">${i+1}.</span>${esc(q)}</div><textarea class="field-input" rows="3" placeholder="Ваш ответ..." data-gq="${i}" oninput="ugq(this)">${esc(v)}</textarea></div>`});return`<div class="panel"><div class="panel-inner"><div class="gq-title">Общие вопросы о семье</div><div class="gq-desc">Помогают обнаружить корни, о которых семья «забыла».</div>${c}</div></div>`}

function rAl(al){
  if(!al.length)return`<div class="panel"><div class="panel-inner"><div class="gq-title">Обнаруженные зацепки</div><div class="gq-desc">Автоматическая проверка данных.</div><div class="alerts-empty"><div style="color:var(--dim);margin-bottom:10px">${ic("search","ic-xl")}</div><div style="font-size:14px;color:var(--dim)">Пока зацепок нет.</div></div></div></div>`;
  const gr={};al.forEach(a=>{const g=mgr(a.marker);if(!gr[g])gr[g]={};if(!gr[g][a.person])gr[g][a.person]=[];gr[g][a.person].push(a.marker)});
  let gh="";Object.entries(gr).forEach(([g,ps])=>{let ph="";Object.entries(ps).forEach(([pid,ms])=>{const d=S.data[pid]||{},t=S.tree[pid];const nm=(d.firstName||d.surname)?`${d.firstName||""} ${d.surname||""}`.trim():t?.role;ph+=`<div class="alert-person" onclick="sel('${pid}')"><span style="color:${t?.gender==="f"?"var(--fem)":"var(--mal)"}">${gIc(t?.gender)}</span><div style="flex:1"><div style="font-size:12px;font-weight:600">${esc(nm)}</div><div style="font-size:10px;color:var(--dim)">${esc(t?.role)}</div></div><div class="alert-markers">${ms.map(m=>`<span class="alert-marker">${esc(m)}</span>`).join("")}</div><span style="color:var(--dim)">→</span></div>`});gh+=`<div class="alert-group"><div class="alert-group-title">${esc(g)}</div>${ph}</div>`});
  return`<div class="panel"><div class="panel-inner"><div class="gq-title">Обнаруженные зацепки</div><div class="gq-desc">Автоматическая проверка данных.</div>${gh}</div></div>`
}

// ══════════════════ Handlers ══════════════════
window.go=v=>{S.view=v;S.sel=null;S.am=null;R()};
window.sel=id=>{S.view="tree";S.sel=id;S.am=null;R()};
window.tgS=k=>{S.os[k]=S.os[k]===false;R()};
window.tgA=id=>{S.am=S.am===id?null:id;R()};
window.addSib=addSib;window.addSp=addSp;window.addParents=addParents;
window.delP=id=>{if(!S.tree[id]?.core&&confirm("Удалить?"))delP(id)};
let ft=null;
window.uf=el=>{const id=el.dataset.p,k=el.dataset.f;if(!S.data[id])S.data[id]={};S.data[id][k]=el.value;clearTimeout(ft);ft=setTimeout(()=>{sA();R()},1000)};
window.ugq=el=>{S.general[`q${el.dataset.gq}`]=el.value;clearTimeout(ft);ft=setTimeout(()=>sA(),1000)};
window.uploadFile=pid=>{const inp=document.createElement("input");inp.type="file";inp.accept="image/*";inp.capture="environment";inp.onchange=async e=>{const file=e.target.files[0];if(!file)return;if(!S.files[pid])S.files[pid]=[];if(S.files[pid].length>=8){toast("Максимум 8 файлов");return}try{const data=await compressImg(file);S.files[pid].push({name:file.name,data,date:Date.now()});sL();R();toast("Файл добавлен")}catch{toast("Ошибка загрузки")}};inp.click()};
window.delFile=(pid,idx)=>{if(confirm("Удалить файл?")){S.files[pid].splice(idx,1);sL();R()}};
window.cpL=()=>{const l=location.origin+location.pathname+"?room="+S.rid;navigator.clipboard?.writeText(l).then(()=>toast("Ссылка скопирована!")).catch(()=>{const i=document.createElement("input");i.value=l;document.body.appendChild(i);i.select();document.execCommand("copy");i.remove();toast("Ссылка скопирована!")})};
window.doExp=()=>{const b=new Blob([JSON.stringify({tree:S.tree,data:S.data,general:S.general,files:S.files},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="family-tree.json";a.click();toast("Экспортировано")};
window.doImp=()=>{const i=document.createElement("input");i.type="file";i.accept=".json";i.onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const d=JSON.parse(await f.text());if(d.tree){S.tree=d.tree;S.data=d.data||{};S.general=d.general||{};S.files=d.files||{};sA();R();toast("Импортировано")}}catch{toast("Ошибка")}};i.click()};
window.doRst=()=>{if(confirm("Удалить ВСЕ данные?")){S.tree=mkInit();S.data={};S.general={};S.files={};S.sel=null;sA();R()}};

// ══════════════════ Init ══════════════════
lL();const ur=new URLSearchParams(location.search).get("room");
if(ur)jRoom(ur);else if(S.rid){S.view="tree";if(db)lC();R();uURL()}else{S.view="lobby";R()}
