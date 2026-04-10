// ══════════ Firebase ══════════
const FB={apiKey:"AIzaSyAObYDV9zB8DguOJC-krGFqwSHl4SAdW94",authDomain:"familytreevision.firebaseapp.com",projectId:"familytreevision",storageBucket:"familytreevision.firebasestorage.app",messagingSenderId:"159441682554",appId:"1:159441682554:web:706b36833acd785757fbc3"};
let db=null,unsub=null;try{firebase.initializeApp(FB);db=firebase.firestore()}catch(e){console.error(e)}

// ══════════ Icons ══════════
const I={tree:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V14"/><path d="M8 22h8"/><path d="M12 14l-5-5.5h3V5.5h4V8.5h3z"/><path d="M12 5.5L9.5 2.5h5z"/></svg>`,female:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a6 6 0 0112 0v2"/></svg>`,male:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10" cy="7" r="4"/><path d="M16.5 1.5L21 1l-.5 4.5M21 1l-5.5 5.5"/><path d="M4 21v-2a6 6 0 0112 0v2"/></svg>`,person:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21v-1.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5V21"/></svg>`,globe:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9.5"/><ellipse cx="12" cy="12" rx="4" ry="9.5"/><path d="M3 9h18M3 15h18"/></svg>`,pin:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 2.5C8.4 2.5 5.5 5.4 5.5 9c0 5.25 6.5 12.5 6.5 12.5s6.5-7.25 6.5-12.5c0-3.6-2.9-6.5-6.5-6.5z"/><circle cx="12" cy="9" r="2.5"/></svg>`,shield:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5l7.5 3.5V11c0 5-3.2 9.5-7.5 11.5C7.7 20.5 4.5 16 4.5 11V6z"/></svg>`,family:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="7" cy="5.5" r="2.5"/><circle cx="17" cy="5.5" r="2.5"/><path d="M2 16.5c0-2.8 2.2-5 5-5s5 2.2 5 5M12 16.5c0-2.8 2.2-5 5-5s5 2.2 5 5"/></svg>`,scroll:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/></svg>`,bolt:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6.5l-1.5 8L19 10h-6.5z"/></svg>`,search:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="7"/><path d="M21 21l-5-5"/></svg>`,cloud:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M18 10h-1.26A7 7 0 109 20h9a4 4 0 000-8z"/></svg>`,save:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>`,folder:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>`,trash:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>`,copy:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`,x:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,chevDown:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,9 12,15 18,9"/></svg>`,arrowLeft:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>`,plus:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,users:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="3.5"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,ring:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="8.5" cy="15" r="5"/><circle cx="15.5" cy="15" r="5"/><path d="M9.5 7.5L12 5l2.5 2.5"/></svg>`,camera:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>`,image:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>`,addParent:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="14" r="3.5"/><path d="M6 23v-1c0-3.3 2.7-6 6-6s6 2.7 6 6v1"/><line x1="12" y1="7" x2="12" y2="1"/><line x1="9" y1="4" x2="15" y2="4"/></svg>`,archive:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8V21H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></svg>`,link:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,passport:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 17h8"/></svg>`,clock:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`,disk:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="5"/><path d="M12 9v3l2 1.5"/></svg>`,map:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`};
function ic(n,c='ic-md'){return`<span class="ic ${c}">${I[n]||''}</span>`}
function gIc(g){return g==="f"?ic("female","ic-node"):ic("male","ic-node")}

// ══════════ Data ══════════
const FIELDS=[{s:"Основные данные",icon:"person",desc:"Самое важное — точное место рождения.",f:[{k:"surname",l:"Фамилия",p:"Иванов"},{k:"maidenName",l:"Фамилия при рождении",p:"Попеску, Шварц...",h:"Ключ к архивному поиску"},{k:"otherNames",l:"Другие фамилии",p:"Попеску→Попов"},{k:"firstName",l:"Имя",p:"Иван (Ион)"},{k:"patronymic",l:"Отчество",p:""},{k:"birthDate",l:"Дата рождения",p:"15.03.1923",h:"Хотя бы год"},{k:"birthPlace",l:"Место рождения",p:"МССР, Хотинский р-н, с. Бричаны",c:1,h:"ГЛАВНОЕ ПОЛЕ. Страна→область→район→село"},{k:"deathDate",l:"Дата смерти",p:""},{k:"deathPlace",l:"Место смерти",p:""}]},{s:"Национальность",icon:"globe",desc:"В СССР часто записывали «русский» вместо реальной национальности.",f:[{k:"passportNat",l:"По паспорту (графа 5)",p:"русский/молдаванин/немец",c:1},{k:"actualNat",l:"Фактическая",p:"Как считал(а) себя"},{k:"nativeLang",l:"Родной язык",p:"С родителями дома",c:1,h:"Нерусский язык — сильный маркер"},{k:"otherLangs",l:"Другие языки",p:"Идиш, румынский..."},{k:"religion",l:"Вера",p:"Православие/католичество/иудаизм",h:"Не-православие → маркер"},{k:"citizenship",l:"Гражданство до СССР",p:"Румыния, Польша..."}]},{s:"Место жительства",icon:"pin",desc:"Период 1918–1940 критически важен для гражданства.",f:[{k:"before1917",l:"До 1917",p:"Губерния, уезд"},{k:"period1918",l:"1918–1940 (КЛЮЧЕВОЙ!)",p:"Бессарабия? Буковина? Галиция?",c:1,h:"Бессарабия/Буковина=Румыния, Зап.Украина=Польша, Прибалтика=независимые"},{k:"period1941",l:"1941–1945",p:"Эвакуация? Фронт?"},{k:"after1945",l:"После 1945",p:"Города"}]},{s:"Репрессии и война",icon:"shield",desc:"Депортация = указание на национальность.",f:[{k:"warService",l:"ВОВ",p:"Звание, часть"},{k:"repression",l:"Репрессии",p:"Арест? Ссылка?",c:1},{k:"deportation",l:"Депортация",p:"Откуда, куда, когда?",c:1,h:"Немцы→1941, крымчане→1944, прибалты→1940-49"},{k:"evacuation",l:"Эвакуация",p:"Откуда→куда"}]},{s:"Семья и работа",icon:"family",desc:"Девичья фамилия жены — часто ключ к другой ветке.",f:[{k:"education",l:"Образование",p:""},{k:"profession",l:"Профессия",p:""},{k:"spouseName",l:"Супруг(а) ФИО",p:"Девичья фамилия!"},{k:"spouseNat",l:"Национальность супруга",p:""},{k:"spouseBirth",l:"Место рожд. супруга",p:""}]},{s:"Документы",icon:"scroll",desc:"Любой сохранившийся документ — бесценен.",f:[{k:"documents",l:"Какие есть?",p:"Паспорта, метрики...",c:1},{k:"photos",l:"Фото",p:"С подписями?"},{k:"letters",l:"Письма",p:"На каком языке?"},{k:"notes",l:"Заметки",p:"Семейные легенды...",m:1}]}];
const AK=FIELDS.flatMap(s=>s.f.map(f=>f.k));
const MK=["бессараб","кишинёв","кишинев","бельц","тирасполь","бендер","хотин","аккерман","белгород-днестров","измаил","болград","килия","бричан","молдав","молдов","черновц","буковин","сторожинец","вижниц","кицман","герца","закарпат","ужгород","мукачев","львов","тернопол","ивано-франк","галиц","вильн","каунас","литв","латв","рига","эстон","таллин","варшав","краков","польш","люблин","поволж","немц","deutsch","шваб","колони","еврей","иудаизм","идиш","синагог","грек","греч","мариупол","урум","болгар","румын","попеску","молдован","венгр","мадьяр","трансильван","католи","лютеран","греко-католи","униат","депортац","репресс","ссылк","лагер","расстрел"];
const MG={"🇷🇴 Румыния/Молдова":["бессараб","кишинёв","кишинев","бельц","тирасполь","бендер","хотин","аккерман","белгород-днестров","измаил","болград","килия","бричан","молдав","молдов","черновц","буковин","сторожинец","вижниц","кицман","герца","румын","попеску","молдован"],"🇭🇺 Венгрия":["закарпат","ужгород","мукачев","венгр","мадьяр","трансильван"],"🇵🇱 Польша":["львов","тернопол","ивано-франк","галиц","варшав","краков","польш","люблин"],"🇱🇹 Литва":["вильн","каунас","литв"],"🇱🇻 Латвия":["латв","рига"],"🇪🇪 Эстония":["эстон","таллин"],"🇩🇪 Германия":["поволж","немц","deutsch","шваб","колони","лютеран"],"🇮🇱 Израиль":["еврей","иудаизм","идиш","синагог"],"🇬🇷 Греция":["грек","греч","мариупол","урум"],"🇧🇬 Болгария":["болгар"]};
const GQ=["Были ли разговоры о «нерусских» корнях?","Необычные фамилии (-еску,-берг,-штейн)?","Кто-то говорил на другом языке?","Не-православная религия?","Репрессированные/депортированные?","Откуда семья переехала?","Сохранились старые документы?","Фотоальбомы до 1950-х?","Названия деревень предков?","«Хранитель семейной памяти»?","Смена фамилии?","«Запретные темы» в семье?"];
const CI=2*Math.PI*16;

// ══════════ Citizenship Rules Engine ══════════
const CIT_RULES=[
{country:"Румыния",flag:"🇷🇴",markers:["бессараб","кишинёв","кишинев","бельц","тирасполь","бендер","хотин","аккерман","белгород-днестров","измаил","болград","килия","бричан","молдав","молдов","черновц","буковин","сторожинец","вижниц","кицман","герца","румын","попеску","молдован"],maxGen:3,
 basis:"Статья 11, Закон №21/1991 о гражданстве",
 reqs:"Прямой потомок (до правнука) лица, родившегося на территории Великой Румынии 1918–1940. До апреля 2026 — без экзамена по румынскому. Не нужно жить в Румынии. Двойное гражданство разрешено.",
 steps:"1) Собрать цепочку свидетельств о рождении/браке от предка до вас\n2) Запросить метрику предка в архиве Молдовы/Украины\n3) Апостили + присяжный перевод на румынский\n4) Подать в ANC (Бухарест) или посольство\n5) Ожидание: 18–36 мес.\n6) Присяга → паспорт ЕС",
 cost:"$4–15K с юристом",time:"2–4 года"},
{country:"Израиль",flag:"🇮🇱",markers:["еврей","иудаизм","идиш","синагог"],maxGen:2,
 basis:"Закон о возвращении (1950)",
 reqs:"Достаточно одного еврейского дедушки/бабушки по любой линии. Подтверждение: документы, свидетельские показания. Не нужно жить в Израиле постоянно после получения.",
 steps:"1) Собрать документы о еврейском происхождении (паспорт с нац. «еврей», метрики, ктубу)\n2) Обратиться в Сохнут или посольство Израиля\n3) Собеседование с консулом\n4) Одобрение → репатриация\n5) Гражданство и паспорт сразу по прилёту",
 cost:"Бесплатно (гос. программа)",time:"3–12 мес."},
{country:"Германия",flag:"🇩🇪",markers:["поволж","немц","deutsch","шваб","колони","лютеран"],maxGen:99,
 basis:"§5 StAG — позднее переселение (Spätaussiedler) / §116 Основного закона",
 reqs:"Этнический немец (поволжские, прибалтийские, причерноморские немцы). Знание немецкого на B1. Подтверждение немецкого происхождения документами.",
 steps:"1) Собрать документы о немецком происхождении\n2) Подать заявление в BVA (Кёльн)\n3) Языковой тест B1\n4) Получить Aufnahmebescheid\n5) Переехать в Германию → гражданство",
 cost:"$2–5K",time:"1–3 года"},
{country:"Польша",flag:"🇵🇱",markers:["львов","тернопол","ивано-франк","галиц","варшав","краков","польш","люблин"],maxGen:3,
 basis:"Подтверждение польского гражданства (по непрерывности)",
 reqs:"Предок был гражданином Польши (1920–1939) и не утратил гражданство до рождения следующего звена. Зап. Украина, Зап. Беларусь были Польшей.",
 steps:"1) Доказать, что предок был польским гражданином\n2) Подать в воеводский уржонд (администрацию)\n3) Получить подтверждение гражданства\n4) Оформить паспорт",
 cost:"$3–10K",time:"1–3 года"},
{country:"Венгрия",flag:"🇭🇺",markers:["закарпат","ужгород","мукачев","венгр","мадьяр","трансильван"],maxGen:99,
 basis:"Упрощённая натурализация для потомков венгров",
 reqs:"Предок из территории Венгрии до Трианонского договора (1920). Требуется B1 венгерского языка. Без ограничения поколений.",
 steps:"1) Подтвердить венгерское происхождение\n2) Выучить венгерский до B1\n3) Подать через консульство\n4) Собеседование на венгерском\n5) Присяга → гражданство",
 cost:"$2–5K + курсы языка",time:"1–2 года"},
{country:"Литва",flag:"🇱🇹",markers:["вильн","каунас","литв"],maxGen:3,
 basis:"Восстановление гражданства (до 15 июня 1940)",
 reqs:"Предок был гражданином Литвы до советской оккупации (15.06.1940) и покинул территорию. Потомки до правнуков.",
 steps:"1) Найти документы о литовском гражданстве предка\n2) Подать через Департамент миграции\n3) Ожидание решения\n4) Паспорт ЕС",
 cost:"$3–8K",time:"1–3 года"},
{country:"Латвия",flag:"🇱🇻",markers:["латв","рига"],maxGen:3,
 basis:"Восстановление гражданства (до 17 июня 1940)",
 reqs:"Предок был гражданином Латвии до советской оккупации. Потомки до правнуков.",
 steps:"1) Документы о латвийском гражданстве предка\n2) Подать в УДГМ\n3) Возможен языковой экзамен",
 cost:"$3–8K",time:"1–3 года"},
{country:"Болгария",flag:"🇧🇬",markers:["болгар"],maxGen:3,
 basis:"Гражданство по происхождению (болгарское происхождение)",
 reqs:"Документальное подтверждение болгарского происхождения. Без языкового экзамена. Двойное гражданство разрешено.",
 steps:"1) Получить удостоверение о болгарском происхождении от ДАБЧ\n2) Подать на гражданство\n3) Указ Президента",
 cost:"$3–10K",time:"1–3 года"},
{country:"Греция",flag:"🇬🇷",markers:["грек","греч","мариупол","урум"],maxGen:99,
 basis:"Гражданство по происхождению (греческое происхождение)",
 reqs:"Документальное подтверждение греческого происхождения. Предки-греки из Приазовья, Крыма, Понта.",
 steps:"1) Документы о греческом происхождении\n2) Подать через консульство\n3) Рассмотрение в Афинах",
 cost:"$3–8K",time:"2–5 лет"}
];

function checkCitizenship(){
  const results=[];
  Object.entries(S.tree).forEach(([id,person])=>{
    if(id==="me")return;
    const d=S.data[id]||{};
    const tx=Object.values(d).join(" ").toLowerCase();
    if(!tx.trim())return;
    CIT_RULES.forEach(rule=>{
      const matched=rule.markers.filter(m=>tx.includes(m));
      if(!matched.length)return;
      const gen=person.gen;
      const eligible=gen<=rule.maxGen;
      const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():person.role;
      const genName=["—","Родитель","Бабушка/дедушка","Прабабушка/прадедушка"][gen]||`Поколение ${gen}`;
      const conf=eligible&&matched.length>=2?"high":eligible?"medium":"low";
      // Avoid duplicates (same country)
      if(results.find(r=>r.country===rule.country&&r.personId===id))return;
      results.push({...rule,personId:id,personName:nm,generation:gen,genName,confidence:conf,matched});
    });
  });
  results.sort((a,b)=>{const o={high:0,medium:1,low:2};return o[a.confidence]-o[b.confidence]});
  return results;
}

// ══════════ Timeline ══════════
function buildTimeline(){
  const events=[];
  Object.entries(S.tree).forEach(([id,p])=>{
    if(id==="me")return;
    const d=S.data[id]||{};
    const nm=(d.firstName||d.surname)?`${d.firstName||''} ${d.surname||''}`.trim():p.role;
    const extractYear=s=>{const m=(s||'').match(/(\d{4})/);return m?parseInt(m[1]):null};
    const by=extractYear(d.birthDate);if(by)events.push({year:by,type:"birth",name:nm,desc:`Родился(ась): ${d.birthPlace||'?'}`,pid:id});
    const dy=extractYear(d.deathDate);if(dy)events.push({year:dy,type:"death",name:nm,desc:`Умер(ла): ${d.deathPlace||'?'}`,pid:id});
    if(d.period1918)events.push({year:1918,type:"move",name:nm,desc:`1918–1940: ${d.period1918}`,pid:id});
    if(d.deportation){const y=extractYear(d.deportation)||1941;events.push({year:y,type:"event",name:nm,desc:`Депортация: ${d.deportation}`,pid:id})}
    if(d.repression){const y=extractYear(d.repression)||1937;events.push({year:y,type:"event",name:nm,desc:`Репрессия: ${d.repression}`,pid:id})}
    if(d.warService)events.push({year:1941,type:"event",name:nm,desc:`ВОВ: ${d.warService}`,pid:id});
  });
  events.sort((a,b)=>a.year-b.year);
  return events;
}

// ══════════ Archive Links ══════════
function getArchLinks(pid){
  const d=S.data[pid]||{},links=[];const sn=d.surname||d.maidenName||'',fn=d.firstName||'',pn=d.patronymic||'';
  const E=encodeURIComponent,tx=Object.values(d).join(' ').toLowerCase();
  if(!sn&&!fn)return links;
  if(sn){
    links.push({name:"Память народа",desc:"ВОВ: награды, боевой путь",url:`https://pamyat-naroda.ru/heroes/?last_name=${E(sn)}&first_name=${E(fn)}&patronymic=${E(pn)}`,icon:"shield"});
    links.push({name:"ОБД Мемориал",desc:"Погибшие и пропавшие ВОВ",url:`https://obd-memorial.ru/html/search.htm?surname=${E(sn)}&name=${E(fn)}&patronymic=${E(pn)}`,icon:"shield"});
    links.push({name:"Открытый список",desc:"Жертвы репрессий",url:`https://ru.openlist.wiki/?q=${E(sn+' '+fn)}`,icon:"search"});
    links.push({name:"FamilySearch",desc:"Метрики, переписи",url:`https://www.familysearch.org/search/record/results?q.surname=${E(sn)}&q.givenName=${E(fn)}`,icon:"scroll"});
  }
  const rm=MG["🇷🇴 Румыния/Молдова"]||[];
  if(rm.some(m=>tx.includes(m)))links.push({name:"🇷🇴 Архив Молдовы",desc:"Метрики Бессарабии 1918-1940",url:"http://www.anrm.md",icon:"archive",hl:1});
  if(tx.includes("еврей")||tx.includes("идиш")){links.push({name:"🇮🇱 Яд Вашем",desc:"Жертвы Холокоста",url:`https://yvng.yadvashem.org/nameDetails.html?language=en&s_lastName=${E(sn)}&s_firstName=${E(fn)}`,icon:"search",hl:1});links.push({name:"🇮🇱 JewishGen",desc:"Еврейская генеалогия",url:"https://www.jewishgen.org/databases/",icon:"search",hl:1})}
  if(tx.includes("немц")||tx.includes("лютеран"))links.push({name:"🇩🇪 Archion",desc:"Лютеранские метрики",url:"https://www.archion.de/en/",icon:"archive",hl:1});
  if(tx.includes("польш")||tx.includes("львов"))links.push({name:"🇵🇱 Szukaj w Archiwach",desc:"Польские архивы",url:`https://szukajwarchiwach.gov.pl/en/search?q=${E(sn)}`,icon:"archive",hl:1});
  return links;
}

// ══════════ QR ══════════
function makeQR(text){try{const qr=qrcode(0,'M');qr.addData(text);qr.make();return qr.createDataURL(3)}catch{return null}}

// ══════════ State ══════════
function mkInit(){return{me:{id:"me",role:"Я",gen:0,gender:null,core:1},father:{id:"father",role:"Отец",gen:1,gender:"m",core:1,parentOf:"me"},mother:{id:"mother",role:"Мать",gen:1,gender:"f",core:1,parentOf:"me"},gm_pat:{id:"gm_pat",role:"Бабушка (по отцу)",gen:2,gender:"f",core:1,parentOf:"father"},gf_pat:{id:"gf_pat",role:"Дедушка (по отцу)",gen:2,gender:"m",core:1,parentOf:"father"},gm_mat:{id:"gm_mat",role:"Бабушка (по матери)",gen:2,gender:"f",core:1,parentOf:"mother"},gf_mat:{id:"gf_mat",role:"Дедушка (по матери)",gen:2,gender:"m",core:1,parentOf:"mother"},ggm1:{id:"ggm1",role:"Прабабушка",gen:3,gender:"f",core:1,parentOf:"gm_pat"},ggf1:{id:"ggf1",role:"Прадедушка",gen:3,gender:"m",core:1,parentOf:"gm_pat"},ggm2:{id:"ggm2",role:"Прабабушка",gen:3,gender:"f",core:1,parentOf:"gf_pat"},ggf2:{id:"ggf2",role:"Прадедушка",gen:3,gender:"m",core:1,parentOf:"gf_pat"},ggm3:{id:"ggm3",role:"Прабабушка",gen:3,gender:"f",core:1,parentOf:"gm_mat"},ggf3:{id:"ggf3",role:"Прадедушка",gen:3,gender:"m",core:1,parentOf:"gm_mat"},ggm4:{id:"ggm4",role:"Прабабушка",gen:3,gender:"f",core:1,parentOf:"gf_mat"},ggf4:{id:"ggf4",role:"Прадедушка",gen:3,gender:"m",core:1,parentOf:"gf_mat"}}}
let S={tree:mkInit(),data:{},general:{},files:{},view:"lobby",sel:null,os:{},rid:null,sync:false,am:null,search:"",preview:null};
const LS="ftree-v8",LSF="ftree-files-v2";
function esc(s){const d=document.createElement("div");d.textContent=s||"";return d.innerHTML}
function toast(m){const e=document.createElement("div");e.className="toast";e.textContent=m;document.body.appendChild(e);setTimeout(()=>e.remove(),2500)}
function gid(){return"p"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function mks(pid){const d=S.data[pid];if(!d)return[];const t=Object.values(d).join(" ").toLowerCase();return[...new Set(MK.filter(m=>t.includes(m)))]}
function pct(pid){const d=S.data[pid];if(!d)return 0;return Math.round(AK.filter(k=>d[k]?.trim?.()).length/AK.length*100)}
function aAlerts(){const r=[];Object.keys(S.tree).forEach(id=>{if(id==="me")return;mks(id).forEach(m=>r.push({person:id,marker:m}))});return r}
function mgr(m){for(const[g,ms]of Object.entries(MG))if(ms.includes(m))return g;return"Другое"}
function maxGen(){return Math.max(0,...Object.values(S.tree).map(p=>p.gen))}
function genLabel(g){return["","Родители","Бабушки и дедушки","Прабабушки и прадедушки"][g]||`Поколение ${g}`}
function hasParents(id){return Object.values(S.tree).some(p=>p.parentOf===id&&!p.siblingOf&&!p.spouseOf)}

// Storage
function sL(){try{localStorage.setItem(LS,JSON.stringify({tree:S.tree,data:S.data,general:S.general,rid:S.rid}));localStorage.setItem(LSF,JSON.stringify(S.files))}catch{}}
function lL(){try{const d=localStorage.getItem(LS);if(d){const p=JSON.parse(d);if(p.tree)S.tree=p.tree;S.data=p.data||{};S.general=p.general||{};if(p.rid)S.rid=p.rid}const f=localStorage.getItem(LSF);if(f)S.files=JSON.parse(f)}catch{}}
async function sC(){if(!db||!S.rid)return;try{await db.collection("rooms").doc(S.rid).set({tree:S.tree,data:S.data,general:S.general,t:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});S.sync=true}catch(e){console.error(e)}}
function lC(){if(!db||!S.rid)return;if(unsub)unsub();unsub=db.collection("rooms").doc(S.rid).onSnapshot(snap=>{if(snap.exists){const d=snap.data();S.tree=d.tree||mkInit();S.data=d.data||{};S.general=d.general||{};S.sync=true;sL();R()}},()=>{S.sync=false})}
let svT=null;function sA(){sL();clearTimeout(svT);svT=setTimeout(()=>{if(db&&S.rid)sC()},1200)}
function genCode(){const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let r="";for(let i=0;i<6;i++)r+=c[Math.floor(Math.random()*c.length)];return r}
async function cRoom(){const code=genCode();if(db){try{await db.collection("rooms").doc(code).set({tree:S.tree,data:S.data,general:S.general,t:firebase.firestore.FieldValue.serverTimestamp()});S.sync=true}catch(e){}}S.rid=code;sL();if(db)lC();S.view="tree";R();uURL()}
async function jRoom(code){code=(code||"").toUpperCase().trim();if(code.length<4)return;if(db){try{const snap=await db.collection("rooms").doc(code).get();if(!snap.exists){toast("Комната не найдена");return}const d=snap.data();S.tree=d.tree||mkInit();S.data=d.data||{};S.general=d.general||{};S.sync=true}catch(e){toast("Ошибка");return}}S.rid=code;sL();if(db)lC();S.view="tree";R();uURL()}
function uURL(){if(S.rid)history.replaceState(null,"","?room="+S.rid)}

// Dynamic
function addSib(ofId){const o=S.tree[ofId];if(!o)return;const id=gid(),g=o.gender==="f"?"m":"f";S.tree[id]={id,role:g==="f"?"Сестра":"Брат",gen:o.gen,gender:g,core:0,siblingOf:ofId,parentOf:o.parentOf};S.data[id]={};sA();S.am=null;R()}
function addSp(ofId){const o=S.tree[ofId];if(!o)return;const id=gid(),g=o.gender==="f"?"m":"f";S.tree[id]={id,role:g==="f"?"Супруга":"Супруг",gen:o.gen,gender:g,core:0,spouseOf:ofId};S.data[id]={};sA();S.am=null;R()}
function addParents(ofId){const o=S.tree[ofId];if(!o)return;const ng=o.gen+1;const mId=gid(),fId=gid();S.tree[mId]={id:mId,role:"Мать",gen:ng,gender:"f",core:0,parentOf:ofId};S.tree[fId]={id:fId,role:"Отец",gen:ng,gender:"m",core:0,parentOf:ofId};S.data[mId]={};S.data[fId]={};sA();S.am=null;R()}
function _delP(id){if(S.tree[id]?.core)return;Object.keys(S.tree).forEach(k=>{const t=S.tree[k];if(t&&(t.siblingOf===id||t.spouseOf===id||t.parentOf===id)){delete S.tree[k];delete S.data[k];delete S.files[k]}});delete S.tree[id];delete S.data[id];delete S.files[id];if(S.sel===id)S.sel=null;sA();R()}
function compressImg(file,maxW=500,q=0.6){return new Promise((res,rej)=>{const r=new FileReader();r.onload=e=>{const img=new Image();img.onload=()=>{const c=document.createElement("canvas");let w=img.width,h=img.height;if(w>maxW){h=h*(maxW/w);w=maxW}c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);res(c.toDataURL("image/jpeg",q))};img.src=e.target.result};r.onerror=rej;r.readAsDataURL(file)})}

// ══════════ Render ══════════
function R(){
  const al=aAlerts(),am={};al.forEach(a=>am[a.person]=true);
  const ids=Object.keys(S.tree).filter(k=>k!=="me");
  const tot=ids.reduce((s,k)=>s+pct(k),0);const pr=ids.length?Math.round(tot/(ids.length*100)*100):0;
  const tf=Object.values(S.files).reduce((s,f)=>s+(f?.length||0),0);
  const citResults=checkCitizenship();
  if(S.view==="lobby"){document.getElementById("app").innerHTML=rLob();return}
  const sy=db?(S.sync?`<span class="sync on">${ic("cloud","ic-sm")} синхр.</span>`:`<span class="sync off">ожид.</span>`):`<span class="sync off">${ic("disk","ic-sm")} лок.</span>`;
  let h=`<div class="hdr"><div class="hdr-logo"><div class="hdr-mark">${ic("tree","ic-md")}</div><div><div class="hdr-title">Семейное Древо</div><div class="hdr-sub">${sy}</div></div></div>
  <div class="nav">
    <button class="nb ${S.view==="tree"&&!S.sel?"on":""}" onclick="go('tree')">${ic("tree","ic-sm")} Древо</button>
    <button class="nb ${S.view==="cit"?"on":""}" onclick="go('cit')">${ic("passport","ic-sm")} Гражданство${citResults.length?`<span class="bdg">${citResults.length}</span>`:""}</button>
    <button class="nb ${S.view==="timeline"?"on":""}" onclick="go('timeline')">${ic("clock","ic-sm")} Хронология</button>
    <button class="nb ${S.view==="alerts"?"on":""}" onclick="go('alerts')">${ic("bolt","ic-sm")} Находки${al.length?`<span class="bdg">${al.length}</span>`:""}</button>
    <button class="nb ${S.view==="general"?"on":""}" onclick="go('general')">${ic("scroll","ic-sm")} Вопросы</button>
    <span class="sep"></span>
    <button class="ib" onclick="doExp()">${ic("save","ic-sm")}</button><button class="ib" onclick="doImp()">${ic("folder","ic-sm")}</button><button class="ib" onclick="doRst()">${ic("trash","ic-sm")}</button>
  </div></div>
  <div class="pbar"><div class="ptrack"><div class="pfill" style="width:${pr}%"></div></div><span class="plbl">${pr}%</span></div>`;
  if(S.rid){const qr=makeQR(location.origin+location.pathname+"?room="+S.rid);
    h+=`<div class="share"><span style="font-size:11px;color:var(--dim)">Код:</span><span class="share-code">${S.rid}</span><button class="share-btn" onclick="cpL()">${ic("copy","ic-sm")} Ссылка</button>${qr?`<div class="share-qr"><img src="${qr}"></div>`:""}</div>`}
  h+=`<div class="stats-bar"><span class="stat-chip">${ic("person","ic-sm")} <strong>${ids.length}</strong> чел.</span><span class="stat-chip">${ic("passport","ic-sm")} <strong>${citResults.length}</strong> программ</span><span class="stat-chip">${ic("bolt","ic-sm")} <strong>${al.length}</strong> зацепок</span><span class="stat-chip">${ic("image","ic-sm")} <strong>${tf}</strong> файлов</span></div>`;
  if(S.view==="tree"&&!S.sel){h+=`<div class="search-bar">${ic("search","ic-sm")}<input class="search-input" placeholder="Поиск..." value="${esc(S.search)}" oninput="S.search=this.value;R()"></div>`;h+=rTree(am)}
  else if(S.view==="tree"&&S.sel)h+=rPers(S.sel);
  else if(S.view==="cit")h+=rCit(citResults);
  else if(S.view==="timeline")h+=rTimeline();
  else if(S.view==="general")h+=rGen();
  else if(S.view==="alerts")h+=rAl(al);
  if(S.preview)h+=`<div class="file-modal" onclick="S.preview=null;R()"><button class="file-modal-close">${ic("x","ic-md")}</button><img src="${S.preview}"></div>`;
  document.getElementById("app").innerHTML=h;
}

function rLob(){return`<div class="lobby"><div class="lobby-card"><div class="lobby-icon">${ic("tree","ic-xl")}</div><div class="lobby-title">Семейное Древо</div><div class="lobby-desc">Исследование происхождения и поиск оснований для второго гражданства. Создайте комнату и поделитесь ссылкой.</div><button class="lobby-btn primary" onclick="cRoom()">Создать новое древо</button><div class="lobby-divider">или присоединиться</div><input class="lobby-input" id="jI" placeholder="КОД" maxlength="6" oninput="this.value=this.value.toUpperCase()"><button class="lobby-btn secondary" onclick="jRoom(document.getElementById('jI').value)">Войти по коду</button></div></div>`}

function rTree(am){
  const mg=maxGen(),gens=[];for(let i=0;i<=mg;i++)gens.push([]);
  Object.values(S.tree).forEach(p=>{if(p.gen>=0&&p.gen<=mg)gens[p.gen].push(p)});
  const sq=S.search.toLowerCase().trim();let rows="";
  for(let g=0;g<=mg;g++){
    if(g===0){rows+=`<div class="gen-row"><div class="gen-nodes"><div class="fam-group">${rNd(S.tree.me,am)}</div></div></div>`;continue}
    const fams={};gens[g].forEach(p=>{const k=p.parentOf||p.siblingOf||p.spouseOf||"x";if(!fams[k])fams[k]=[];fams[k].push(p)});
    let fg="";Object.keys(fams).sort((a,b)=>Object.keys(S.tree).indexOf(a)-Object.keys(S.tree).indexOf(b)).forEach(k=>{
      const f=fams[k];f.sort((a,b)=>(b.core||0)-(a.core||0));
      let ns="";f.forEach(p=>{if(sq){const d=S.data[p.id]||{};if(!`${d.firstName||""} ${d.surname||""} ${d.birthPlace||""} ${p.role}`.toLowerCase().includes(sq))return}ns+=rNd(p,am)});
      const core=f.find(p=>p.core)||f[0];
      if(core){const mid="m_"+core.id,show=S.am===mid;const hp=hasParents(core.id);
        ns+=`<div style="position:relative;align-self:center"><button class="add-btn" onclick="event.stopPropagation();tgA('${mid}')">${ic("plus","ic-sm")}</button><div class="add-menu ${show?"show":""}" onclick="event.stopPropagation()"><button onclick="addSib('${core.id}')">${ic("users","ic-sm")} Брат/сестра</button><button onclick="addSp('${core.id}')">${ic("ring","ic-sm")} Супруг(а)</button>${!hp?`<button onclick="addParents('${core.id}')">${ic("addParent","ic-sm")} Родители (глубже)</button>`:""}</div></div>`}
      if(ns)fg+=`<div class="fam-group">${ns}</div>`});
    if(fg)rows+=`<div class="gen-row"><div class="gen-banner">${genLabel(g)}</div><div class="gen-nodes">${fg}</div></div>`}
  return`<div class="tree-area"><div class="tree-box">${rows}</div><div class="tree-hint">Нажмите карточку для заполнения · «+» добавляет родственника</div></div>`
}

function rNd(p,am){
  if(p.id==="me")return`<div class="node me-node"><div class="node-icon-wrap">${ic("person","ic-lg")}</div><div class="node-role">Заявитель</div><div class="node-name">Я</div></div>`;
  const d=S.data[p.id]||{},pv=pct(p.id),ha=am[p.id],nm=(d.firstName||d.surname)?`${d.firstName||""} ${d.surname||""}`.trim():"";
  const cls=[p.core?"":"sib",ha?"ao":"",!ha&&pv>0?(p.gender==="f"?"ff":"fm"):""].filter(Boolean).join(" ");
  const rc=ha?"var(--alert)":pv>60?"var(--green)":"var(--gold)";const off=CI-CI*(pv/100);const fc=(S.files[p.id]||[]).length;
  return`<div class="node ${cls}" onclick="sel('${p.id}')">
    ${!p.core?`<button class="del-btn" onclick="event.stopPropagation();doDelP('${p.id}')">${ic("x","ic-sm")}</button>`:""}
    <div class="node-ring"><svg class="ring-svg" viewBox="0 0 36 36"><circle class="ring-bg" cx="18" cy="18" r="16"/><circle class="ring-fill" cx="18" cy="18" r="16" stroke="${rc}" stroke-dasharray="${CI.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/></svg><span class="node-icon-wrap" style="color:${p.gender==="f"?"var(--fem)":"var(--mal)"}">${gIc(p.gender)}</span></div>
    <div class="node-role">${esc(p.role)}</div>${nm?`<div class="node-name">${esc(nm)}</div>`:`<div class="node-name empty">—</div>`}
    ${ha?`<div class="node-alert-tag">${ic("bolt","ic-sm")} зацепка</div>`:""}${fc?`<div class="node-files-count">${ic("image","ic-sm")} ${fc}</div>`:""}</div>`
}

// ══════════ Citizenship View ══════════
function rCit(results){
  let h=`<div class="panel"><div class="panel-inner"><div class="gq-title">${ic("passport","ic-lg")} Анализ права на гражданство</div><div class="gq-desc">Автоматическая проверка введённых данных по программам гражданства 9 стран. Заполняйте данные о предках — анализ обновляется в реальном времени.</div>`;
  if(!results.length){h+=`<div class="cit-empty"><div style="font-size:40px;margin-bottom:10px">${ic("search","ic-xl")}</div><div style="font-size:14px;color:var(--dim)">Пока совпадений не найдено. Продолжайте заполнять данные о предках — особенно место рождения, национальность и язык.</div></div>`}
  else{
    const high=results.filter(r=>r.confidence==="high"),med=results.filter(r=>r.confidence==="medium"),low=results.filter(r=>r.confidence==="low");
    h+=`<div class="cit-summary"><div class="cit-summary-num">${results.length}</div><div style="color:var(--dim);font-size:12px">потенциальных программ</div><div style="margin-top:6px;font-size:12px"><span style="color:var(--green)">● ${high.length} высокая вероятность</span> · <span style="color:var(--gold)">● ${med.length} средняя</span> · <span style="color:var(--dim)">● ${low.length} низкая</span></div></div>`;
    results.forEach(r=>{
      h+=`<div class="cit-card ${r.confidence}">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span class="cit-flag">${r.flag}</span>
          <div><span class="cit-country">${esc(r.country)}</span><span class="cit-conf ${r.confidence}">${r.confidence==="high"?"ВЫСОКАЯ":r.confidence==="medium"?"СРЕДНЯЯ":"НИЗКАЯ"}</span></div>
        </div>
        <div class="cit-match"><strong>Предок:</strong> ${esc(r.personName)} (${esc(r.genName)}, поколение ${r.generation})</div>
        <div class="cit-match"><strong>Совпадения:</strong> ${r.matched.map(m=>`<span class="alert-marker">${esc(m)}</span>`).join(" ")}</div>
        <div class="cit-basis">${esc(r.basis)}</div>
        <div class="cit-reqs">${esc(r.reqs)}</div>
        <div class="cit-steps"><strong>Стоимость:</strong> ${esc(r.cost)} · <strong>Срок:</strong> ${esc(r.time)}\n\n<strong>Шаги:</strong>\n${esc(r.steps)}</div>
        <div style="margin-top:8px"><button class="share-btn" onclick="sel('${r.personId}')" style="font-size:12px">Открыть карточку ${esc(r.personName)} →</button></div>
      </div>`;
    });
  }
  h+=`</div></div>`;return h;
}

// ══════════ Timeline View ══════════
function rTimeline(){
  const events=buildTimeline();
  let h=`<div class="panel"><div class="panel-inner"><div class="gq-title">${ic("clock","ic-lg")} Хронология семьи</div><div class="gq-desc">Все события в хронологическом порядке. Помогает увидеть паттерны миграций и репрессий.</div>`;
  if(!events.length){h+=`<div class="tl-empty"><div style="font-size:40px;margin-bottom:10px">${ic("clock","ic-xl")}</div><div style="font-size:14px;color:var(--dim)">Заполните даты рождения, переезды и события — хронология построится автоматически.</div></div>`}
  else{events.forEach(ev=>{
    h+=`<div class="tl-item" onclick="sel('${ev.pid}')" style="cursor:pointer">
      <div class="tl-year">${ev.year}</div>
      <div class="tl-dot ${ev.type}"></div>
      <div class="tl-content"><div class="tl-name">${esc(ev.name)}</div><div class="tl-desc">${esc(ev.desc)}</div></div>
    </div>`})}
  h+=`</div></div>`;return h;
}

// ══════════ Person Form ══════════
function rPers(id){
  const p=S.tree[id];if(!p){S.sel=null;R();return""}
  const d=S.data[id]||{},mk=mks(id),pv=pct(id),files=S.files[id]||[],archLinks=getArchLinks(id);
  const gc=p.gender==="f"?"var(--fem)":"var(--mal)",pcC=pv>60?"var(--green)":"var(--gold)";const dn=d.firstName||p.role;
  let ah="";if(mk.length)ah=`<div class="alert-box"><div class="alert-title">${ic("bolt","ic-md")} Зацепки!</div><div class="alert-markers">${mk.map(m=>`<span class="alert-marker">${esc(m)}</span>`).join("")}</div><div class="alert-desc">Возможная связь с бывшей Румынией, Польшей, Германией, Прибалтикой.</div></div>`;
  let ss="";FIELDS.forEach((sec,si)=>{const sk=`${id}_${si}`,io=S.os[sk]!==false;const fl=sec.f.filter(f=>d[f.k]?.trim?.()).length;let fh="";
    if(io){let inner=`<div class="sec-desc">${esc(sec.desc)}</div>`;
      sec.f.forEach(f=>{const v=d[f.k]||"",lc=f.c?"field-label critical":"field-label",bg=f.c?`<span class="field-badge">ВАЖНО</span>`:"";const hint=f.h?`<div class="field-hint">${esc(f.h)}</div>`:"";
        if(f.m)inner+=`<div class="field"><label class="${lc}">${esc(f.l)}${bg}</label><textarea class="field-input" placeholder="${esc(f.p)}" data-p="${id}" data-f="${f.k}" oninput="uf(this)">${esc(v)}</textarea>${hint}</div>`;
        else inner+=`<div class="field"><label class="${lc}">${esc(f.l)}${bg}</label><input type="text" class="field-input" placeholder="${esc(f.p)}" value="${esc(v)}" data-p="${id}" data-f="${f.k}" oninput="uf(this)">${hint}</div>`});
      fh=`<div class="sec-body">${inner}</div>`}
    ss+=`<div class="sec-wrap"><button class="sec-toggle ${io?"open":"closed"}" onclick="tgS('${sk}')"><span style="color:var(--dim)">${ic(sec.icon,"ic-md")}</span><span style="flex:1">${esc(sec.s)}</span><span class="sec-count ${fl>0?"has":""}">${fl}/${sec.f.length}</span><span class="sec-arrow ${io?"open":""}">${ic("chevDown","ic-sm")}</span></button>${fh}</div>`});
  // Files
  const fsk=`${id}_files`,fio=S.os[fsk]!==false;let fHtml="";
  if(fio){let th=files.map((f,i)=>`<div class="file-thumb" onclick="event.stopPropagation();S.preview='${f.data}';R()"><img src="${f.data}"><button class="file-del" onclick="event.stopPropagation();doDelFile('${id}',${i})">${ic("x","ic-sm")}</button></div>`).join("");
    th+=`<button class="file-upload-btn" onclick="event.stopPropagation();doUpload('${id}')">${ic("camera","ic-lg")}<span>Фото</span></button>`;
    fHtml=`<div class="sec-body"><div class="sec-desc">Сфотографируйте документы: паспорта, метрики, свидетельства.</div><div class="files-grid">${th}</div></div>`}
  ss+=`<div class="sec-wrap"><button class="sec-toggle ${fio?"open":"closed"}" onclick="tgS('${fsk}')"><span style="color:var(--dim)">${ic("camera","ic-md")}</span><span style="flex:1">Фото</span><span class="sec-count ${files.length>0?"has":""}">${files.length}</span><span class="sec-arrow ${fio?"open":""}">${ic("chevDown","ic-sm")}</span></button>${fHtml}</div>`;
  // Archives
  const ask=`${id}_arch`,aio=S.os[ask]!==false;let archH="";
  if(aio){if(archLinks.length){const hl=archLinks.filter(l=>l.hl),reg=archLinks.filter(l=>!l.hl);let inner="";
    if(hl.length)inner+=`<div style="margin-bottom:6px;font-size:11px;font-weight:600;color:var(--gold)">Рекомендуемые:</div><div class="archive-grid">${hl.map(l=>`<a class="archive-link hl" href="${l.url}" target="_blank">${ic(l.icon,"ic-md")}<div><div class="archive-link-name">${esc(l.name)}</div><div class="archive-link-desc">${esc(l.desc)}</div></div></a>`).join("")}</div>`;
    inner+=`<div style="margin:6px 0 4px;font-size:11px;color:var(--dim)">Общие базы:</div><div class="archive-grid">${reg.map(l=>`<a class="archive-link" href="${l.url}" target="_blank">${ic(l.icon,"ic-md")}<div><div class="archive-link-name">${esc(l.name)}</div><div class="archive-link-desc">${esc(l.desc)}</div></div></a>`).join("")}</div>`;
    archH=`<div class="sec-body">${inner}</div>`}else{archH=`<div class="sec-body"><div style="font-size:12px;color:var(--dim);font-style:italic">Заполните фамилию для поиска.</div></div>`}}
  ss+=`<div class="sec-wrap"><button class="sec-toggle ${aio?"open":"closed"}" onclick="tgS('${ask}')"><span style="color:var(--dim)">${ic("archive","ic-md")}</span><span style="flex:1">Поиск в архивах</span><span class="sec-count ${archLinks.length>0?"has":""}">${archLinks.length}</span><span class="sec-arrow ${aio?"open":""}">${ic("chevDown","ic-sm")}</span></button>${archH}</div>`;

  return`<div class="panel"><div class="panel-inner"><div class="panel-hdr"><button class="back-btn" onclick="go('tree')">${ic("arrowLeft","ic-sm")} Назад</button><div style="flex:1"><div class="panel-name" style="color:${gc}">${gIc(p.gender)} ${esc(dn)}${d.surname?` <span style="color:var(--dim)">${esc(d.surname)}</span>`:""}</div><div class="panel-role">${esc(p.role)}${!p.core?` · <a href="#" onclick="event.preventDefault();doDelP('${id}');go('tree')">удалить</a>`:""}</div></div><div style="text-align:right"><div class="panel-pct" style="color:${pcC}">${pv}%</div><div class="panel-pct-label">заполнено</div></div></div>${ah}${ss}</div></div>`
}

function rGen(){let c="";GQ.forEach((q,i)=>{const v=S.general[`q${i}`]||"";c+=`<div class="gq-card"><div class="gq-q"><span class="gq-num">${i+1}.</span>${esc(q)}</div><textarea class="field-input" rows="3" placeholder="Ваш ответ..." data-gq="${i}" oninput="ugq(this)">${esc(v)}</textarea></div>`});return`<div class="panel"><div class="panel-inner"><div class="gq-title">Общие вопросы</div><div class="gq-desc">Помогают обнаружить скрытые корни.</div>${c}</div></div>`}

function rAl(al){
  if(!al.length)return`<div class="panel"><div class="panel-inner"><div class="gq-title">Находки</div><div class="gq-desc">Автоматическая проверка данных.</div><div class="alerts-empty"><div style="color:var(--dim);margin-bottom:10px">${ic("search","ic-xl")}</div><div style="color:var(--dim)">Пока зацепок нет.</div></div></div></div>`;
  const gr={};al.forEach(a=>{const g=mgr(a.marker);if(!gr[g])gr[g]={};if(!gr[g][a.person])gr[g][a.person]=[];gr[g][a.person].push(a.marker)});
  let gh="";Object.entries(gr).forEach(([g,ps])=>{let ph="";Object.entries(ps).forEach(([pid,ms])=>{const d=S.data[pid]||{},t=S.tree[pid];const nm=(d.firstName||d.surname)?`${d.firstName||""} ${d.surname||""}`.trim():t?.role;ph+=`<div class="alert-person" onclick="sel('${pid}')"><span style="color:${t?.gender==="f"?"var(--fem)":"var(--mal)"}">${gIc(t?.gender)}</span><div style="flex:1"><div style="font-size:12px;font-weight:600">${esc(nm)}</div><div style="font-size:10px;color:var(--dim)">${esc(t?.role)}</div></div><div class="alert-markers">${ms.map(m=>`<span class="alert-marker">${esc(m)}</span>`).join("")}</div><span style="color:var(--dim)">→</span></div>`});gh+=`<div class="alert-group"><div class="alert-group-title">${esc(g)}</div>${ph}</div>`});
  return`<div class="panel"><div class="panel-inner"><div class="gq-title">Находки</div><div class="gq-desc">Автоматическая проверка данных.</div>${gh}</div></div>`
}

// ══════════ Handlers ══════════
window.go=v=>{S.view=v;S.sel=null;S.am=null;R()};
window.sel=id=>{S.view="tree";S.sel=id;S.am=null;R()};
window.tgS=k=>{S.os[k]=S.os[k]===false;R()};
window.tgA=id=>{S.am=S.am===id?null:id;R()};
window.addSib=addSib;window.addSp=addSp;window.addParents=addParents;
window.doDelP=id=>{if(S.tree[id]?.core){toast("Основных нельзя удалить");return}if(confirm("Удалить?"))_delP(id)};
let ft=null;
window.uf=el=>{const id=el.dataset.p,k=el.dataset.f;if(!S.data[id])S.data[id]={};S.data[id][k]=el.value;clearTimeout(ft);ft=setTimeout(()=>{sA();R()},1200)};
window.ugq=el=>{S.general[`q${el.dataset.gq}`]=el.value;clearTimeout(ft);ft=setTimeout(()=>sA(),1200)};
window.doUpload=pid=>{const inp=document.createElement("input");inp.type="file";inp.accept="image/*";inp.capture="environment";inp.onchange=async e=>{const file=e.target.files[0];if(!file)return;if(!S.files[pid])S.files[pid]=[];if(S.files[pid].length>=8){toast("Максимум 8");return}try{const data=await compressImg(file);S.files[pid].push({name:file.name,data,date:Date.now()});sL();R();toast("Добавлено")}catch{toast("Ошибка")}};inp.click()};
window.doDelFile=(pid,idx)=>{if(confirm("Удалить файл?")){S.files[pid].splice(idx,1);sL();R()}};
window.cpL=()=>{const l=location.origin+location.pathname+"?room="+S.rid;navigator.clipboard?.writeText(l).then(()=>toast("Скопировано!")).catch(()=>{const i=document.createElement("input");i.value=l;document.body.appendChild(i);i.select();document.execCommand("copy");i.remove();toast("Скопировано!")})};
window.doExp=()=>{const b=new Blob([JSON.stringify({tree:S.tree,data:S.data,general:S.general,files:S.files},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="family-tree.json";a.click();toast("Экспортировано")};
window.doImp=()=>{const i=document.createElement("input");i.type="file";i.accept=".json";i.onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const d=JSON.parse(await f.text());if(d.tree){S.tree=d.tree;S.data=d.data||{};S.general=d.general||{};S.files=d.files||{};sA();R();toast("Импортировано")}}catch{toast("Ошибка")}};i.click()};
window.doRst=()=>{if(confirm("Удалить ВСЕ?")){S.tree=mkInit();S.data={};S.general={};S.files={};S.sel=null;sA();R()}};
document.addEventListener("click",e=>{if(S.am&&!e.target.closest('.add-menu')&&!e.target.closest('.add-btn')){S.am=null;R()}});

// ══════════ Init ══════════
lL();const ur=new URLSearchParams(location.search).get("room");
if(ur)jRoom(ur);else if(S.rid){S.view="tree";if(db)lC();R();uURL()}else{S.view="lobby";R()}
