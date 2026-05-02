import { useState, useEffect, useRef, useCallback } from "react"

// ══════════════════════════════════════════════════
//  GLOBAL CSS
// ══════════════════════════════════════════════════
const G = `
@import url('https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&family=Cairo:wght@400;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
:root{
  --bg:#F7F3EC;--sf:#FFFFFF;--sf2:#EDE8DF;--bd:#D4CABC;
  --tp:#1C1712;--ts:#5C5448;--td:#A89E90;
  --gl:#9A7B0A;--gll:#F0E6C0;--gld:#6B5407;
  --bl:#1A5C8A;--bll:#D6EAF8;
  --bokbg:#EDEAE5;--bokt:#9A9080;
  --ok:#1E6B3C;--okl:#D5EFE0;--wn:#7A5C00;--wnl:#FFF3CC;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#4A3C2E;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Cairo',sans-serif}
.wrap{width:1024px;height:768px;background:var(--bg);overflow:hidden;position:relative;border-radius:16px;box-shadow:0 28px 90px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.2);display:flex;flex-direction:column}
.mso{font-family:'Material Symbols Outlined';font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 48;font-style:normal;display:inline-flex;align-items:center;justify-content:center;line-height:1;direction:ltr;user-select:none;white-space:nowrap}
.msof{font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 48}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-4px)}80%{transform:translateX(3px)}}
@keyframes rot{to{transform:rotate(360deg)}}
@keyframes bi{0%{transform:scale(0);opacity:0}60%{transform:scale(1.18)}100%{transform:scale(1);opacity:1}}
@keyframes cA{0%,30%{opacity:1}36%,100%{opacity:0}}
@keyframes cB{0%,30%{opacity:0}36%,65%{opacity:1}71%,100%{opacity:0}}
@keyframes cC{0%,65%{opacity:0}71%,100%{opacity:1}}
@keyframes rBar{from{width:100%}to{width:0}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
@keyframes tapCard{0%,100%{transform:translateX(0)}40%,60%{transform:translateX(26px)}}
@keyframes nfcPulse{0%,100%{opacity:0.15}45%,55%{opacity:1}}

.fi{animation:fadeIn .22s ease}
.su{animation:slideUp .22s ease}
.shk{animation:shake .45s ease}
.spn{animation:rot 1s linear infinite}
.bi{animation:bi .45s cubic-bezier(.175,.885,.32,1.275) both}
.fA{animation:cA 6s infinite}
.fB{animation:cB 6s infinite}
.fC{animation:cC 6s infinite}
.rBar{animation:rBar 10s linear forwards}
.bounce{animation:bounce 1.4s ease-in-out infinite}

/* buttons */
.btn{cursor:pointer;outline:none;font-family:inherit;font-weight:700;transition:all 150ms ease;display:inline-flex;align-items:center;justify-content:center;gap:10px;border-radius:14px;user-select:none;-webkit-tap-highlight-color:transparent;background:var(--sf);color:var(--tp);border:2.5px solid var(--gl);padding:14px 22px;min-height:76px;line-height:1.25}
.btn:active{background:var(--gl);color:#fff;transform:scale(.97)}
.bg{background:var(--gl)!important;color:#fff!important;border-color:var(--gld)!important}
.bg:active{background:var(--gld)!important}
.bdis{background:var(--sf2)!important;color:var(--td)!important;border-color:var(--bd)!important;cursor:not-allowed!important;pointer-events:none}

/* counter */
.cb{width:80px;height:80px;border-radius:50%;border:2.5px solid var(--gl);background:var(--sf);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all 150ms ease;flex-shrink:0}
.cb:active{background:var(--gl);color:#fff;transform:scale(.9)}
.cdb{border-color:var(--bd)!important;color:var(--td)!important;cursor:not-allowed!important}

/* slots */
.sa{background:var(--sf);border-inline-start:5px solid var(--gl);cursor:pointer;display:flex;align-items:center;min-height:78px;padding:0 18px;gap:12px;border-bottom:1px solid var(--bd);transition:background .12s}
.sa:active,.ssel{background:var(--gll)!important}
.sb{background:var(--bokbg);border-inline-start:5px solid var(--bd);display:flex;align-items:center;min-height:78px;padding:0 18px;gap:12px;border-bottom:1px solid var(--bd);opacity:.7;pointer-events:none}

/* service cards */
.sc{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:18px 10px;border-radius:16px;cursor:pointer;transition:all 150ms ease;border:2.5px solid var(--bd);background:var(--sf);position:relative;min-height:140px}
.sc:active{background:var(--gll);border-color:var(--gl);transform:scale(.98)}
.scs{background:var(--gll)!important;border:3.5px solid var(--gl)!important}

/* lang buttons */
.lb{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:16px;border-radius:18px;cursor:pointer;transition:all 150ms ease;border:3px solid var(--gl);background:var(--sf)}
.lb:active{background:var(--gll);transform:scale(.97)}

/* scrollable slot list */
.sll{flex:1;overflow-y:auto}
.sll::-webkit-scrollbar{width:6px}
.sll::-webkit-scrollbar-thumb{background:var(--gl);border-radius:3px;opacity:.5}
.sll::-webkit-scrollbar-track{background:var(--bd);border-radius:3px}

/* progress */
.pb{background:var(--sf);border-bottom:2px solid var(--bd);padding:0 18px;height:88px;display:flex;align-items:center;flex-shrink:0}

/* bottom nav — ALWAYS direction:ltr so flex renders left→right */
/* Back is first in DOM = LEFT in ltr, RIGHT in rtl (inherited from wrapper) */
/* We override with direction:ltr here and swap manually */
.bn{background:var(--sf);border-top:2px solid var(--bd);padding:10px 20px;height:84px;display:flex;align-items:center;gap:14px;flex-shrink:0;direction:ltr}

/* toast */
.tn{position:absolute;bottom:100px;left:50%;transform:translateX(-50%);background:var(--tp);color:#fff;padding:16px 32px;border-radius:12px;font-size:1.45em;font-weight:700;z-index:400;animation:slideUp .3s ease;pointer-events:none;text-align:center;width:86%;max-width:820px}
`

// ══════════════════════════════════════════════════
//  TRANSLATIONS
// ══════════════════════════════════════════════════
const T = {
  ar: {
    back: "رجوع", langNA: "هذه اللغة ستكون متاحة قريباً · This language will be available soon",
    prog: ["الخدمة والتذاكر", "الموعد", "الملخص", "الدفع", "التأكيد"],
    still: { q: "هل لا تزال هنا؟", sub: "لا يوجد نشاط منذ دقيقة", cont: "استمر", restart: "ابدأ من جديد", left: "الوقت المتبقي:" },
    svc: { title: "اختر الخدمة", tawaf: "طواف فقط", saee: "سعي فقط", both: "طواف + سعي", normalTix: "تذاكر عادية", specialTix: "تذاكر ذوي الاحتياجات الخاصة", freeBlue: "مجاني — سوارة زرقاء", maxT: "الحد الأقصى ١٠ تذاكر في المجموع", cont: "متابعة" },
    slot: { title: "المواعيد المتاحة", now: "الوقت الحالي", today: "اليوم", tom: "الغد", bkd: "محجوز", conf: "تأكيد الموعد", scroll: "اسحب للمزيد" },
    sum: { title: "ملخص الحجز", svc: "الخدمة", time: "الموعد", blueW: "سوارة زرقاء (معاقون)", goldW: "سوارة ذهبية (مرافقون)", tot: "الإجمالي", free: "مجاني", edit: "تعديل", proc: "الدفع", tawaf: "طواف فقط", saee: "سعي فقط", both: "طواف + سعي", curr: "﷼" },
    pay: { title: "اختر طريقة الدفع", card: "بطاقة / NFC", cardSub: "بطاقة بنكية · Apple Pay · Google Pay", c1: "أدخل أو قرّب البطاقة", c2: "جارٍ القراءة...", c3: "تمت الموافقة", cash: "كاش", cashSub: "ريال سعودي فقط", f1: "أدخل الأوراق النقدية", f2: "جارٍ الحساب...", f3: "استلم الباقي", proc: "جارٍ معالجة الدفع...", procSub: "لا تُبعد بطاقتك" },
    conf: { ref: "رقم الحجز", blueW: "سوارة زرقاء — أولوية الدخول", blueI: "مجانية. يتحقق الموظفون من وثيقة الإعاقة عند المدخل.", goldW: "سوارة ذهبية", goldI: "يرجى ارتداؤها فور استلامها.", howTo: "فيديو: كيف تلبس السوارة؟", pick: "نقاط استلام العربات", aj: "أجياد", sh: "الشبيكة", here: "أنت هنا", ret: "العودة خلال", secs: "ث", done: "إنهاء" },
    rate: { title: "كيف كانت تجربتك؟", sub: "تقييمك يساعدنا على التحسين", great: "ممتاز", ok: "مقبول", poor: "سيئ", thanks: "شكراً لك!", auto: "سيتم الإغلاق خلال" },
  },
  en: {
    back: "Back", langNA: "هذه اللغة ستكون متاحة قريباً · This language will be available soon",
    prog: ["Service & Tickets", "Time Slot", "Summary", "Payment", "Confirmation"],
    still: { q: "Are you still there?", sub: "No activity detected", cont: "Continue", restart: "Start Over", left: "Time left:" },
    svc: { title: "Choose Service", tawaf: "Tawaf Only", saee: "Sa'ee Only", both: "Tawaf + Sa'ee", normalTix: "Regular Tickets", specialTix: "Special Needs Tickets", freeBlue: "Free — Blue Wristband", maxT: "Maximum 10 tickets total", cont: "Continue" },
    slot: { title: "Available Times", now: "Current time", today: "Today", tom: "Tomorrow", bkd: "Booked", conf: "Confirm Time", scroll: "Scroll for more" },
    sum: { title: "Booking Summary", svc: "Service", time: "Time", blueW: "Blue Wristband (disabled)", goldW: "Gold Wristband (companions)", tot: "Total", free: "Free", edit: "Edit", proc: "Proceed to Payment", tawaf: "Tawaf Only", saee: "Sa'ee Only", both: "Tawaf + Sa'ee", curr: "SAR " },
    pay: { title: "Choose payment method", card: "Card / NFC", cardSub: "Bank card · Apple Pay · Google Pay", c1: "Insert or tap your card", c2: "Reading card...", c3: "Approved", cash: "Cash", cashSub: "Saudi Riyals only", f1: "Insert banknotes", f2: "Calculating...", f3: "Collect change", proc: "Processing payment...", procSub: "Do not remove your card" },
    conf: { ref: "Booking Reference", blueW: "Blue Wristband — Priority Access", blueI: "Free. Staff verify disability documentation at entrance.", goldW: "Gold Wristband", goldI: "Please wear wristbands immediately.", howTo: "Video: How to wear your wristband", pick: "Cart Pickup Locations", aj: "Ajyad", sh: "Shubaika", here: "You Are Here", ret: "Returning in", secs: "s", done: "Done" },
    rate: { title: "How was your experience?", sub: "Your feedback helps us improve", great: "Great", ok: "Okay", poor: "Poor", thanks: "Thank you!", auto: "Closing in" },
  }
}

// ══════════════════════════════════════════════════
//  MOCK DATA
// ══════════════════════════════════════════════════
const PRC = { tawaf: 100, saee: 100, both: 200 }
const SLOTS = (() => {
  const s = []
  for (let i = 0; i < 54; i++) {
    const m = 9 * 60 + 30 + i * 15, rH = Math.floor(m / 60), h = rH % 24, mn = m % 60
    const next = rH >= 24, per = h < 12 ? "AM" : "PM"
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h
    s.push({ id: i + 1, t12: `${h12}:${mn.toString().padStart(2, "0")} ${per}`, t24: `${h.toString().padStart(2, "0")}:${mn.toString().padStart(2, "0")}`, per, today: !next, avail: i % 7 !== 2 && i % 7 !== 6 })
  }
  return s
})()
const SICONS = ["confirmation_number", "schedule", "receipt_long", "credit_card", "check_circle"]
const STEPS = ["service", "timeslot", "summary", "payment", "confirmation"]

// ══════════════════════════════════════════════════
//  FLAGS (proper SVGs)
// ══════════════════════════════════════════════════
const SA = ({ w = 68, h = 46 }) => <svg width={w} height={h} viewBox="0 0 68 46" style={{ borderRadius: 5, display: "block", direction: "ltr" }}><rect width="68" height="46" fill="#006C35" rx="4" /><text x="34" y="16" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="serif" fontWeight="bold">لا إله إلا الله</text><text x="34" y="27" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="serif">محمد رسول الله</text><path d="M15 33 L53 33 M15 33 L17 29 M53 33 L51 29 M34 33 L34 40" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
const GB = ({ w = 68, h = 46 }) => <svg width={w} height={h} viewBox="0 0 68 46" style={{ borderRadius: 5, display: "block" }}><rect width="68" height="46" fill="#012169" rx="4" /><line x1="0" y1="0" x2="68" y2="46" stroke="white" strokeWidth="9" /><line x1="68" y1="0" x2="0" y2="46" stroke="white" strokeWidth="9" /><line x1="0" y1="0" x2="68" y2="46" stroke="#C8102E" strokeWidth="6" /><line x1="68" y1="0" x2="0" y2="46" stroke="#C8102E" strokeWidth="6" /><rect x="0" y="17" width="68" height="12" fill="white" /><rect x="28" y="0" width="12" height="46" fill="white" /><rect x="0" y="19" width="68" height="8" fill="#C8102E" /><rect x="30" y="0" width="8" height="46" fill="#C8102E" /></svg>
const PK = ({ w = 68, h = 46 }) => <svg width={w} height={h} viewBox="0 0 68 46" style={{ borderRadius: 5, display: "block" }}><rect width="68" height="46" fill="#01411C" rx="4" /><rect width="18" height="46" fill="white" rx="4" /><rect x="18" width="50" height="46" fill="#01411C" /><circle cx="41" cy="23" r="11" fill="white" /><circle cx="45" cy="21" r="8.5" fill="#01411C" /><polygon points="51,16 52.8,21.5 58,21.5 54,24.2 55.8,29.8 51,27 46.2,29.8 48,24.2 44,21.5 49.2,21.5" fill="white" transform="scale(0.68) translate(30,10)" /></svg>
const FR = ({ w = 68, h = 46 }) => <svg width={w} height={h} viewBox="0 0 68 46" style={{ borderRadius: 5, display: "block" }}><rect width="68" height="46" fill="white" rx="4" /><rect width="23" height="46" fill="#002395" rx="4" /><rect x="45" width="23" height="46" fill="#ED2939" rx="4" /></svg>
const ID = ({ w = 68, h = 46 }) => <svg width={w} height={h} viewBox="0 0 68 46" style={{ borderRadius: 5, display: "block" }}><rect width="68" height="46" fill="white" rx="4" /><rect width="68" height="23" fill="#CE1126" rx="4" /></svg>
const MY = ({ w = 68, h = 46 }) => <svg width={w} height={h} viewBox="0 0 68 46" style={{ borderRadius: 5, display: "block" }}>{Array.from({ length: 14 }, (_, i) => <rect key={i} y={i * 3.28} width="68" height="3.28" fill={i % 2 === 0 ? "#CC0001" : "white"} />)}<rect width="33" height="22" fill="#003580" rx="2" /><circle cx="13" cy="11" r="7.5" fill="#FFD100" /><circle cx="15.5" cy="10" r="5.8" fill="#003580" /><polygon points="24,7 25.2,10.5 29,10.5 26,12.5 27.2,16 24,14 20.8,16 22,12.5 19,10.5 22.8,10.5" fill="#FFD100" transform="scale(.86) translate(2,1)" /></svg>
const TR = ({ w = 68, h = 46 }) => <svg width={w} height={h} viewBox="0 0 68 46" style={{ borderRadius: 5, display: "block" }}><rect width="68" height="46" fill="#E30A17" rx="4" /><circle cx="28" cy="23" r="12" fill="white" /><circle cx="33" cy="23" r="9.5" fill="#E30A17" /><polygon points="43,19 44.5,23 48.5,23 45.2,25.5 46.5,30 43,27.5 39.5,30 40.8,25.5 37.5,23 41.5,23" fill="white" transform="scale(.88) translate(3,2)" /></svg>
const BD = ({ w = 68, h = 46 }) => <svg width={w} height={h} viewBox="0 0 68 46" style={{ borderRadius: 5, display: "block" }}><rect width="68" height="46" fill="#006A4E" rx="4" /><circle cx="30" cy="23" r="13" fill="#F42A41" /></svg>
const FLAGS = { SA, GB, PK, FR, ID, MY, TR, BD }

// ══════════════════════════════════════════════════
//  CUSTOM SVG ICONS
// ══════════════════════════════════════════════════
// Tawaf: Kaaba + circular arrow
function TawafSvg({ sz = 72, color = "var(--gl)" }) {
  return <svg width={sz} height={sz} viewBox="0 0 72 72">
    <rect x="25" y="25" width="22" height="22" fill="#1C1712" rx="3" />
    <rect x="25" y="25" width="22" height="6.5" fill={color} opacity=".9" />
    <circle cx="36" cy="36" r="28" fill="none" stroke={color} strokeWidth="3" strokeDasharray="9,5" opacity=".45" />
    <path d="M36 8 A28 28 0 1 1 8.5 36" fill="none" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
    <polygon points="36,2 29,15 43,15" fill={color} />
  </svg>
}

// Sa'ee: two hills + bi-directional arrows (clean)
function SaeeSvg({ sz = 72, color = "var(--gl)" }) {
  return <svg width={sz} height={sz} viewBox="0 0 72 72">
    {/* Safa hill */}
    <path d="M6 52 Q10 26 18 36 Q20 30 24 38" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6" />
    {/* Marwa hill */}
    <path d="M48 38 Q52 30 54 36 Q62 26 66 52" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6" />
    {/* Arrow right (Safa → Marwa) */}
    <path d="M22 28 L48 28" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <polygon points="44,21 56,28 44,35" fill={color} />
    {/* Arrow left (Marwa → Safa) */}
    <path d="M50 43 L24 43" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <polygon points="28,36 16,43 28,50" fill={color} />
  </svg>
}

// Bracelet: clean thick oval ring
function BraceletSvg({ color = "var(--gl)", sz = 28 }) {
  return <svg width={sz} height={sz} viewBox="0 0 28 28">
    <ellipse cx="14" cy="14" rx="12" ry="7" fill="none" stroke={color} strokeWidth="4.5" />
    <ellipse cx="14" cy="14" rx="12" ry="7" fill="none" stroke={color} strokeWidth="4.5" opacity=".3" transform="rotate(20 14 14)" />
  </svg>
}

// Wheelchair: uses Wheelchair_symbol.svg paths with dynamic color
function WheelSvg({ sz = 56, color = "var(--bl)" }) {
  const h = sz * (551.4306641 / 483.2226563)
  return <svg width={sz} height={h} viewBox="0 0 483.2226563 551.4306641">
    <path fillRule="evenodd" clipRule="evenodd" fill={color} d="M161.9882813,98.1240234c24.9628906-2.3046875,44.3574219-23.8110352,44.3574219-48.9658203C206.3457031,22.0830078,184.2626953,0,157.1875,0s-49.1572266,22.0830078-49.1572266,49.1582031c0,8.2568359,2.3037109,16.7055664,6.1445313,23.8105469l17.515625,246.4667969l180.3964844,0.0488281l73.9912109,173.3652344l97.1445313-38.0976563l-15.0429688-35.8203125l-54.3662109,19.625l-71.5908203-165.2802734l-167.7294922,1.1269531l-2.3027344-31.2128906l121.4228516,0.0483398v-46.1831055l-126.0546875-0.0493164L161.9882813,98.1240234z"/>
    <path fillRule="evenodd" clipRule="evenodd" fill={color} d="M343.4199219,451.5908203c-30.4472656,60.1875-94.1748047,99.8398438-162.1503906,99.8398438C81.4296875,551.4306641,0,470.0009766,0,370.1611328c0-70.1005859,42.4853516-135.2436523,105.8818359-164.1210938l4.1025391,53.5375977c-37.4970703,23.628418-60.6123047,66.262207-60.6123047,110.9506836c0,72.4267578,59.0712891,131.4970703,131.4970703,131.4970703c66.2617188,0,122.7646484-50.8515625,130.4697266-116.0869141L343.4199219,451.5908203z"/>
  </svg>
}

// Card / NFC tap animation
function CardAnimSvg({ color = "var(--gl)" }) {
  return <svg width="200" height="120" viewBox="0 0 200 120">
    {/* POS terminal body */}
    <rect x="130" y="8" width="56" height="96" rx="9" fill="none" stroke={color} strokeWidth="3.5" />
    {/* Screen */}
    <rect x="140" y="18" width="36" height="26" rx="4" fill="none" stroke={color} strokeWidth="2.5" />
    {/* Keypad dots — 3×4 grid */}
    {[0,1,2,3].map(r => [0,1,2].map(c =>
      <circle key={`${r}${c}`} cx={146 + c * 12} cy={56 + r * 11} r="3.5" fill={color} />
    ))}
    {/* Card — animates toward terminal */}
    <g style={{ animation: "tapCard 3.5s ease-in-out infinite" }}>
      <rect x="8" y="34" width="90" height="56" rx="8" fill="none" stroke={color} strokeWidth="3.5" />
      {/* Chip */}
      <rect x="20" y="47" width="18" height="14" rx="3" fill="none" stroke={color} strokeWidth="2" />
      {/* Stripe */}
      <rect x="8" y="50" width="90" height="10" fill={color} opacity="0.12" />
      {/* NFC waves — right edge of card */}
      <path d="M84 46 Q93 62 84 78" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round"
        style={{ animation: "nfcPulse 3.5s ease-in-out infinite", animationDelay: "0s" }} />
      <path d="M91 40 Q103 62 91 84" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"
        style={{ animation: "nfcPulse 3.5s ease-in-out infinite", animationDelay: "0.25s" }} />
      <path d="M98 34 Q114 62 98 90" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"
        style={{ animation: "nfcPulse 3.5s ease-in-out infinite", animationDelay: "0.5s" }} />
    </g>
  </svg>
}

// Cash / banknote insert animation — hand holding a bill feeding into a slot
function CashAnimSvg() {
  return <img src="/cash-anim.gif" alt="" style={{ width: 130, height: 130, display: "block" }} />
}

// Standing person: simple upright figure
function PersonSvg({ sz = 56, color = "var(--ok)" }) {
  return <svg width={sz} height={sz} viewBox="0 0 56 56">
    <circle cx="28" cy="9" r="6" fill={color} />
    <line x1="28" y1="15" x2="28" y2="36" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M16 22 L28 18 L40 22" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="28" y1="36" x2="20" y2="52" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="28" y1="36" x2="36" y2="52" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
  </svg>
}

// ══════════════════════════════════════════════════
//  BASE COMPONENTS
// ══════════════════════════════════════════════════
function Ico({ n, sz = 26, color, fill = false, cls = "", st = {} }) {
  return <span className={`mso${fill ? " msof" : ""} ${cls}`} style={{ fontSize: sz, color, ...st }}>{n}</span>
}

function Counter({ val, onChange, min = 0, max = 10 }) {
  const [shk, setShk] = useState(null)
  const shkTimer = useRef(null)
  const go = (d) => {
    const nv = val + d
    if (nv < min || nv > max) {
      clearTimeout(shkTimer.current)
      setShk(d)
      shkTimer.current = setTimeout(() => setShk(null), 450)
    } else onChange(nv)
  }
  useEffect(() => () => clearTimeout(shkTimer.current), [])
  return <div style={{ display: "flex", alignItems: "center", gap: 16, direction: "ltr" }}>
    <button className={`cb${val >= max ? " cdb" : ""}${shk === 1 ? " shk" : ""}`} onClick={() => go(1)}><Ico n="add" sz={34} color="var(--gl)" /></button>
    <span style={{ fontSize: "3.4em", fontWeight: 800, color: "var(--tp)", minWidth: 64, textAlign: "center", fontFamily: "'Cairo',sans-serif" }}>{val}</span>
    <button className={`cb${val <= min ? " cdb" : ""}${shk === -1 ? " shk" : ""}`} onClick={() => go(-1)}><Ico n="remove" sz={34} color="var(--gl)" /></button>
  </div>
}

// ══════════════════════════════════════════════════
//  PROGRESS BAR
// ══════════════════════════════════════════════════
function ProgBar({ screen, t, timeLeft, isRTL }) {
  const cur = STEPS.indexOf(screen) + 1
  const warn = timeLeft <= 60
  const fmt = `${Math.floor(timeLeft / 60).toString().padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`
  return <div className="pb" style={{ direction: "ltr" }}>
    <div style={{ display: "flex", alignItems: "center", flex: 1, direction: isRTL ? "rtl" : "ltr" }}>
      {SICONS.map((ico, i) => {
        const sn = i + 1
        const done = cur > sn, active = cur === sn
        return <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flex: 1 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: active ? "var(--gl)" : done ? "#1C1712" : "var(--sf2)", border: `2.5px solid ${active || done ? "transparent" : "var(--bd)"}` }}>
              <Ico n={done ? "check" : ico} sz={24} color={active || done ? "#fff" : "var(--td)"} fill={done} />
            </div>
            <span style={{ fontSize: ".8em", color: active ? "var(--gl)" : "var(--td)", fontWeight: active ? 700 : 400, whiteSpace: "nowrap", maxWidth: 100, textAlign: "center" }}>{t.prog[i]}</span>
          </div>
          {i < 4 && <div style={{ height: 3, width: 14, background: done ? "var(--gl)" : "var(--bd)", flexShrink: 0, marginBottom: 20 }} />}
        </div>
      })}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginInlineStart: 12, flexShrink: 0 }}>
      <Ico n="timer" sz={28} color={warn ? "var(--wn)" : "var(--ts)"} />
      <span style={{ fontSize: "1.65em", fontWeight: 800, color: warn ? "var(--wn)" : "var(--ts)", fontFamily: "'Cairo',sans-serif" }}>{fmt}</span>
    </div>
  </div>
}

// ══════════════════════════════════════════════════
//  BOTTOM NAV — key fix: direction:ltr, swap elements by isRTL
//  In Arabic (isRTL): LEFT=CTA, RIGHT=Back
//  In English (!isRTL): LEFT=Back, RIGHT=CTA
// ══════════════════════════════════════════════════
function BNav({ isRTL, t, onBack, cta }) {
  // Arrow icons — forward direction relative to reading order
  const backIcon = isRTL ? "arrow_forward" : "arrow_back"
  const ctaIcon = isRTL ? "arrow_back" : "arrow_forward"

  const backEl = onBack
    ? <button className="btn" onClick={onBack}
      style={{ flex: 1, fontSize: "1.4em", minHeight: 60, direction: isRTL ? "rtl" : "ltr" }}>
      <Ico n={backIcon} sz={26} />{t.back}
    </button>
    : <div style={{ flex: 1 }} />

  const ctaEl = cta
    ? <button className={`btn ${cta.dis ? "bdis" : "bg"}`}
      onClick={cta.dis ? undefined : cta.fn}
      style={{ flex: 2, fontSize: "1.52em", minHeight: 60, direction: isRTL ? "rtl" : "ltr" }}>
      {cta.ico && <Ico n={cta.ico} sz={24} color={cta.dis ? "var(--td)" : "#fff"} />}
      {cta.label}
      {!cta.ico && <Ico n={ctaIcon} sz={26} color={cta.dis ? "var(--td)" : "#fff"} />}
    </button>
    : <div style={{ flex: 2 }} />

  // Use direction:ltr so flex renders left→right regardless of parent RTL
  // Then manually place: Arabic → CTA left, Back right; English → Back left, CTA right
  return <div className="bn">
    {isRTL ? ctaEl : backEl}
    <div style={{ width: 14 }} />
    {isRTL ? backEl : ctaEl}
  </div>
}

// ══════════════════════════════════════════════════
//  SCREEN 1 — LANGUAGE (always dir=ltr, no flip)
// ══════════════════════════════════════════════════
const LANGS = [
  { code: "ar", name: "العربية", nameEn: "Arabic", flag: "SA", active: true },
  { code: "en", name: "English", nameEn: "English", flag: "GB", active: true },
  { code: "ur", name: "اُردو", nameEn: "Urdu", flag: "PK", active: false },
  { code: "fr", name: "Français", nameEn: "French", flag: "FR", active: false },
  { code: "id", name: "Indonesia", nameEn: "Indonesian", flag: "ID", active: false },
  { code: "ms", name: "Melayu", nameEn: "Malay", flag: "MY", active: false },
  { code: "tr", name: "Türkçe", nameEn: "Turkish", flag: "TR", active: false },
  { code: "bn", name: "বাংলা", nameEn: "Bengali", flag: "BD", active: false },
]
function LangScreen({ onSelect, showToast }) {
  return (
    // Force LTR so the grid never flips regardless of current language setting
    <div className="fi" style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--bg)", direction: "ltr" }}>
      {/* Geometric band */}
      <svg width="1024" height="60" viewBox="0 0 1024 60" style={{ display: "block", flexShrink: 0 }}>
        <rect width="1024" height="60" fill="var(--sf)" />
        {Array.from({ length: 17 }, (_, i) => {
          const cx = i * 62 + 31, cy = 30, r = 22
          return <g key={i} opacity=".09">
            {Array.from({ length: 8 }, (__, k) => {
              const a = k * 45 * Math.PI / 180, b = (k * 45 - 22.5) * Math.PI / 180
              return <line key={k} x1={cx + r * .45 * Math.cos(a)} y1={cy + r * .45 * Math.sin(a)} x2={cx + r * Math.cos(b)} y2={cy + r * Math.sin(b)} stroke="#9A7B0A" strokeWidth="1.2" />
            })}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#9A7B0A" strokeWidth=".7" />
          </g>
        })}
        <rect width="1024" height="60" fill="url(#gf)" />
        <defs><linearGradient id="gf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--sf)" stopOpacity=".15" /><stop offset="100%" stopColor="var(--sf)" stopOpacity=".6" /></linearGradient></defs>
      </svg>
      {/* Grid — always 4 columns, left-to-right */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridTemplateRows: "repeat(2,1fr)", gap: 14, padding: "14px 22px 18px" }}>
        {LANGS.map(l => {
          const FC = FLAGS[l.flag] || (() => <div style={{ width: 68, height: 46, background: "var(--bd)", borderRadius: 5 }} />)
          const imgSrc = `${process.env.PUBLIC_URL}/flags/${l.flag}.svg`
          return <button key={l.code} className="lb"
            onClick={() => l.active ? onSelect(l.code) : showToast(T.en.langNA)}>
            <img src={imgSrc} width={74} height={50}
              style={{ borderRadius: 5, objectFit: "cover", display: "block" }}
              onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block" }}
              alt={l.nameEn} />
            <div style={{ display: "none" }}><FC w={74} h={50} /></div>
            <span style={{ fontFamily: l.code === "ar" || l.code === "ur" ? "'Cairo',sans-serif" : "'Cairo',sans-serif", fontSize: "2em", fontWeight: 800, color: "var(--tp)", textAlign: "center" }}>{l.name}</span>
          </button>
        })}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
//  SCREEN 2 — SERVICE
// ══════════════════════════════════════════════════
function SvcScreen({ t, isRTL, data, setData, onBack, onNext }) {
  const [shk, setShk] = useState(false)
  const total = data.ticketCount + data.disabledCount
  const svcs = [
    { id: "tawaf", label: t.svc.tawaf, Icon: () => <TawafSvg sz={74} />, price: PRC.tawaf },
    { id: "saee", label: t.svc.saee, Icon: () => <SaeeSvg sz={74} />, price: PRC.saee },
    {
      id: "both", label: t.svc.both,
      Icon: () => <div style={{ display: "flex", alignItems: "center", gap: 4, direction: "ltr" }}>
        <TawafSvg sz={54} /><span style={{ color: "var(--gl)", fontSize: "2.2em", fontWeight: 900, lineHeight: 1, fontFamily: "'Cairo',sans-serif" }}>+</span><SaeeSvg sz={54} />
      </div>,
      price: PRC.both
    },
  ]
  const go = () => { if (!data.service) { setShk(true); setTimeout(() => setShk(false), 450) } else onNext() }
  return <div className="fi" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "12px 22px 10px", gap: 14, overflow: "hidden" }}>
      <div style={{ fontSize: "2em", fontWeight: 700, color: "var(--tp)", fontFamily: "'Cairo',sans-serif", display: "flex", alignItems: "center", gap: 10, paddingBottom: 4, borderBottom: "2px solid var(--bd)" }}>
        <Ico n="local_activity" sz={30} color="var(--gl)" />{t.svc.title}
      </div>
      <div className={shk ? "shk" : ""} style={{ display: "flex", gap: 14 }}>
        {svcs.map(s => {
          const sel = data.service === s.id
          return <button key={s.id} className={`sc${sel ? " scs" : ""}`} onClick={() => setData(d => ({ ...d, service: s.id }))} aria-pressed={sel}>
            {sel && <Ico n="check_circle" sz={26} color="var(--gl)" fill st={{ position: "absolute", top: 10, insetInlineEnd: 10 }} />}
            <s.Icon />
            <span style={{ fontSize: "1.55em", fontWeight: 700, color: "var(--tp)", textAlign: "center", fontFamily: "'Cairo',sans-serif" }}>{s.label}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Ico n="sell" sz={20} color="var(--gl)" />
              <span style={{ fontSize: "1.35em", fontWeight: 700, color: "var(--gld)" }}>{s.price} {t.sum.curr}</span>
            </div>
          </button>
        })}
      </div>
      <div style={{ borderTop: "2px solid var(--bd)" }} />
      {/* Two ticket counters */}
      <div style={{ display: "flex", gap: 14 }}>
        {/* Normal tickets */}
        <div style={{ flex: 1, background: "var(--sf)", border: "2px solid var(--bd)", borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "1.45em", fontWeight: 700, color: "var(--tp)", marginBottom: 4, fontFamily: "'Cairo',sans-serif" }}>
              <BraceletSvg color="var(--gl)" sz={24} />{t.svc.normalTix}
            </div>
            <div style={{ fontSize: "1em", color: "var(--ts)" }}>{t.svc.maxT}</div>
          </div>
          <Counter val={data.ticketCount} onChange={v => setData(d => ({ ...d, ticketCount: v }))} min={0} max={10 - data.disabledCount} />
        </div>
        {/* Special needs tickets */}
        <div style={{ flex: 1, background: "var(--bll)", border: "2px solid var(--bl)", borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "1.45em", fontWeight: 700, color: "var(--bl)", marginBottom: 4, fontFamily: "'Cairo',sans-serif" }}>
              <WheelSvg sz={24} color="var(--bl)" />{t.svc.specialTix}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "1em", color: "var(--bl)", fontWeight: 600 }}>
              <BraceletSvg color="var(--bl)" sz={18} />{t.svc.freeBlue}
            </div>
          </div>
          <Counter val={data.disabledCount} onChange={v => setData(d => ({ ...d, disabledCount: v }))} min={0} max={10 - data.ticketCount} />
        </div>
      </div>
    </div>
    <BNav isRTL={isRTL} t={t} onBack={onBack} cta={{ label: t.svc.cont, dis: !data.service || total === 0, fn: go }} />
  </div>
}

// ══════════════════════════════════════════════════
//  SCREEN 4 — TIME SLOT (with scroll indicator)
// ══════════════════════════════════════════════════
function SlotScreen({ t, isRTL, slots, data, setData, onBack, onNext }) {
  const listRef = useRef(null)
  const [canScrollDown, setCanScrollDown] = useState(true)
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const check = () => setCanScrollDown(el.scrollHeight - el.scrollTop > el.clientHeight + 10)
    check()
    el.addEventListener("scroll", check)
    return () => el.removeEventListener("scroll", check)
  }, [])
  return <div className="fi" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
    <div style={{ padding: "12px 22px 10px", borderBottom: "2px solid var(--gll)", flexShrink: 0, background: "var(--sf)" }}>
      <div style={{ fontSize: "2em", fontWeight: 700, color: "var(--tp)", marginBottom: 8, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Cairo',sans-serif" }}>{t.slot.title}</div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "var(--gll)", padding: "10px 18px", borderRadius: 12 }}>
        <Ico n="schedule" sz={30} color="var(--gld)" />
        <div>
          <div style={{ fontSize: "1em", color: "var(--ts)", fontWeight: 600, marginBottom: 2 }}>{t.slot.now}</div>
          <div style={{ fontSize: "1.6em", fontWeight: 800, color: "var(--gld)", fontFamily: "'Cairo',sans-serif", direction: "ltr" }}>9:30 AM — 09:30</div>
        </div>
      </div>
    </div>
    <div style={{ flex: 1, position: "relative", minHeight: 0, overflow: "hidden" }}>
      <div className="sll" ref={listRef} style={{ height: "100%" }}>
        {slots.map(sl => {
          const sel = data.selectedSlot?.id === sl.id
          return <div key={sl.id} className={sl.avail ? `sa${sel ? " ssel" : ""}` : "sb"}
            onClick={() => sl.avail && setData(d => ({ ...d, selectedSlot: sl }))}>
            <Ico n={sl.per === "AM" ? "wb_sunny" : "nightlight"} sz={30} color={sl.avail ? "var(--gl)" : "var(--td)"} />
            <div style={{ display: "flex", gap: 10, flex: 1, alignItems: "center" }}>
              <div style={{ background: sl.avail ? "var(--gll)" : "var(--bokbg)", border: "1.5px solid var(--bd)", borderRadius: 10, padding: "8px 18px", position: "relative" }}>
                <span style={{ fontSize: "1.65em", fontWeight: 700, color: sl.avail ? "var(--tp)" : "var(--bokt)", fontFamily: "'Cairo',sans-serif" }}>{sl.t12}</span>
                {!sl.avail && <span style={{ position: "absolute", left: 8, right: 8, top: "50%", height: 2, background: "var(--bokt)", display: "block", transform: "translateY(-50%)" }} />}
              </div>
              <div style={{ width: 2, height: 36, background: "var(--bd)", flexShrink: 0 }} />
              <div style={{ background: sl.avail ? "var(--sf2)" : "var(--bokbg)", border: "1.5px solid var(--bd)", borderRadius: 10, padding: "8px 18px", position: "relative" }}>
                <span style={{ fontSize: "1.65em", fontWeight: 700, color: sl.avail ? "var(--ts)" : "var(--bokt)", fontFamily: "'Cairo',sans-serif" }}>{sl.t24}</span>
                {!sl.avail && <span style={{ position: "absolute", left: 8, right: 8, top: "50%", height: 2, background: "var(--bokt)", display: "block", transform: "translateY(-50%)" }} />}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {sl.avail && !sl.today && <span style={{ background: "var(--gll)", color: "var(--gld)", fontSize: "1.1em", fontWeight: 700, padding: "4px 14px", borderRadius: 20, border: "1px solid var(--gl)" }}>{t.slot.tom}</span>}
              {sl.avail && sl.today && <span style={{ fontSize: "1.2em", color: "var(--ts)", fontWeight: 600 }}>{t.slot.today}</span>}
              {!sl.avail && <div style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: "1.2em", color: "var(--td)", fontWeight: 600 }}>{t.slot.bkd}</span><Ico n="block" sz={22} color="var(--td)" /></div>}
              {sl.avail && <Ico n={sel ? "radio_button_checked" : "radio_button_unchecked"} sz={30} color={sel ? "var(--gl)" : "var(--bd)"} />}
            </div>
          </div>
        })}
      </div>
      {/* Scroll gradient overlay */}
      {canScrollDown && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 90, background: "linear-gradient(transparent, rgba(247,243,236,.97))", pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 8 }}>
        <Ico n="keyboard_double_arrow_down" sz={28} color="var(--gl)" cls="bounce" />
        <span style={{ fontSize: "1em", color: "var(--gl)", fontWeight: 600, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Cairo',sans-serif" }}>{t.slot.scroll}</span>
      </div>}
    </div>
    <BNav isRTL={isRTL} t={t} onBack={onBack} cta={{ label: t.slot.conf, ico: "check", dis: !data.selectedSlot, fn: onNext }} />
  </div>
}

// ══════════════════════════════════════════════════
//  SCREEN 5 — SUMMARY (full page, bigger rows)
// ══════════════════════════════════════════════════
function SumScreen({ t, isRTL, data, onBack, onEdit, onNext }) {
  const svcN = { tawaf: t.sum.tawaf, saee: t.sum.saee, both: t.sum.both }
  const price = PRC[data.service] || 0
  const disC = data.disabledCount
  const compC = data.ticketCount
  const tot = price * compC

  const SIcon = data.service === "tawaf" ? TawafSvg : data.service === "saee" ? SaeeSvg :
    () => <div style={{ display: "flex", alignItems: "center", gap: 2, direction: "ltr" }}><TawafSvg sz={20} /><span style={{ color: "var(--gl)", fontWeight: 900, fontSize: "1em", fontFamily: "'Cairo',sans-serif" }}>+</span><SaeeSvg sz={20} /></div>

  const Row = ({ iconEl, label, val, val2, hi }) =>
    <div style={{ display: "flex", alignItems: "center", padding: "14px 24px", borderBottom: "1px solid var(--bd)", background: hi ? "var(--gll)" : "var(--sf)", gap: 14, flex: 1 }}>
      <div style={{ minWidth: 44, display: "flex", justifyContent: "center", flexShrink: 0 }}>{iconEl}</div>
      <span style={{ flex: "0 0 200px", fontSize: "1.45em", color: "var(--ts)", fontWeight: 600, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Cairo',sans-serif" }}>{label}</span>
      <span style={{ flex: 1, fontSize: hi ? "2em" : "1.6em", color: hi ? "var(--gld)" : "var(--tp)", fontWeight: hi ? 800 : 500, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Cairo',sans-serif" }}>{val}</span>
      {val2 && <span style={{ fontSize: "1.2em", color: "var(--ts)", fontFamily: isRTL ? "'Cairo',sans-serif" : "'Cairo',sans-serif" }}>{val2}</span>}
    </div>

  return <div className="fi" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 26px 10px", gap: 12, minHeight: 0 }}>
      <div style={{ fontSize: "2.1em", fontWeight: 700, color: "var(--tp)", fontFamily: isRTL ? "'Cairo',sans-serif" : "'Cairo',sans-serif" }}>{t.sum.title}</div>
      <div style={{ background: "var(--sf)", border: "2.5px solid var(--bd)", borderRadius: 20, overflow: "hidden", flex: 1, display: "flex", flexDirection: "column" }}>
        <Row iconEl={<SIcon sz={32} />} label={t.sum.svc} val={svcN[data.service] || "—"} />
        <Row iconEl={<Ico n="schedule" sz={28} color="var(--ts)" />} label={t.sum.time}
          val={data.selectedSlot ? <span style={{ fontFamily: "'Cairo',sans-serif", direction: "ltr", display: "inline-block" }}>{data.selectedSlot.t12} — {data.selectedSlot.t24}</span> : "—"} />
        {disC > 0 && <Row
          iconEl={<BraceletSvg color="var(--bl)" sz={28} />}
          label={t.sum.blueW} val={<span style={{ direction: "ltr" }}>{disC} × <span style={{ color: "var(--ok)", fontWeight: 700 }}>{t.sum.free}</span></span>} />}
        {compC > 0 && <Row
          iconEl={<BraceletSvg color="var(--gl)" sz={28} />}
          label={t.sum.goldW} val={<span style={{ direction: "ltr" }}>{compC} × {price} = {price * compC} {t.sum.curr}</span>} />}
        <Row iconEl={<Ico n="payments" sz={28} color="var(--gl)" />} label={t.sum.tot} val={`${tot} ${t.sum.curr}`} hi />
        <div style={{ flex: 1, background: "var(--sf)" }} />
      </div>
    </div>
    <BNav isRTL={isRTL} t={t} onBack={onEdit} cta={{ label: t.sum.proc, ico: "credit_card", fn: onNext }} />
  </div>
}

// ══════════════════════════════════════════════════
//  SCREEN 6 — PAYMENT
// ══════════════════════════════════════════════════
function PayScreen({ t, isRTL, onPay, onBack }) {
  const [sel, setSel] = useState(null)
  const PCard = ({ id, ico, title, sub }) => {
    const active = sel === id
    return <button onClick={() => setSel(id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "22px 14px", borderRadius: 20, cursor: "pointer", background: active ? "var(--gll)" : "var(--sf)", border: `${active ? 3 : 2}px solid ${active ? "var(--gl)" : "var(--bd)"}`, transition: "all 150ms ease", minHeight: 155, fontFamily: "'Cairo',sans-serif" }}>
      <Ico n={ico} sz={64} color="var(--gl)" />
      <span style={{ fontSize: "1.7em", fontWeight: 700, color: "var(--tp)", fontFamily: "'Cairo',sans-serif" }}>{title}</span>
      <span style={{ fontSize: "1.1em", color: "var(--ts)", textAlign: "center", fontFamily: "'Cairo',sans-serif" }}>{sub}</span>
    </button>
  }
  return <div className="fi" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <div style={{ flex: 1, padding: "16px 26px 10px", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontSize: "2em", fontWeight: 700, color: "var(--tp)", fontFamily: "'Cairo',sans-serif" }}>{t.pay.title}</div>
      <div style={{ display: "flex", gap: 16, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          <PCard id="card" ico="credit_card" title={t.pay.card} sub={t.pay.cardSub} />
          {sel === "card" && <div className="su" style={{ flex: 1, background: "var(--sf2)", borderRadius: 16, border: "1.5px solid var(--bd)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 10px", overflow: "hidden" }}>
            <CardAnimSvg color="var(--gl)" />
            <span style={{ fontSize: "1.2em", fontWeight: 600, color: "var(--tp)", fontFamily: "'Cairo',sans-serif", textAlign: "center" }}>{t.pay.c1}</span>
          </div>}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          <PCard id="cash" ico="payments" title={t.pay.cash} sub={t.pay.cashSub} />
          {sel === "cash" && <div className="su" style={{ flex: 1, background: "var(--sf2)", borderRadius: 16, border: "1.5px solid var(--bd)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 10px", overflow: "hidden" }}>
            <CashAnimSvg />
            <span style={{ fontSize: "1.2em", fontWeight: 600, color: "var(--tp)", fontFamily: "'Cairo',sans-serif", textAlign: "center" }}>{t.pay.f1}</span>
          </div>}
        </div>
      </div>
    </div>
    <BNav isRTL={isRTL} t={t} onBack={onBack}
      cta={sel ? { label: sel === "card" ? t.pay.card : t.pay.cash, ico: sel === "card" ? "credit_card" : "payments", fn: () => onPay(sel) } : null} />
  </div>
}

// ══════════════════════════════════════════════════
//  SCREEN 7 — CONFIRMATION
// ══════════════════════════════════════════════════
function ConfScreen({ t, isRTL, data, cd, onDone }) {
  const disC = data.disabledCount
  const compC = data.ticketCount
  const pct = (cd / 35) * 100
  const SIcon = data.service === "tawaf" ? TawafSvg : data.service === "saee" ? SaeeSvg :
    () => <div style={{ display: "flex", alignItems: "center", gap: 3, direction: "ltr" }}><TawafSvg sz={22} /><span style={{ color: "var(--gl)", fontWeight: 900, fontSize: "1.2em", fontFamily: "'Cairo',sans-serif" }}>+</span><SaeeSvg sz={22} /></div>
  return <div className="fi" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
    <div style={{ flex: 1, display: "flex", gap: 16, padding: "12px 20px 8px", minHeight: 0 }}>
      {/* Left column — wristbands + video */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minHeight: 0 }}>
        {/* Blue wristband */}
        {disC > 0 && <div style={{ background: "var(--bll)", border: "2px solid var(--bl)", borderRadius: 14, padding: "14px 15px", display: "flex", gap: 12, flexShrink: 0 }}>
          <div style={{ flexShrink: 0 }}><BraceletSvg color="var(--bl)" sz={28} /></div>
          <div>
            <div style={{ fontSize: "1.35em", fontWeight: 700, color: "var(--bl)", marginBottom: 4, fontFamily: "'Cairo',sans-serif" }}>{t.conf.blueW} — {disC}</div>
            <div style={{ fontSize: "1.05em", color: "var(--ts)" }}>{t.conf.blueI}</div>
          </div>
        </div>}
        {/* Gold wristband */}
        {compC > 0 && <div style={{ background: "var(--gll)", border: "2px solid var(--gl)", borderRadius: 14, padding: "14px 15px", display: "flex", gap: 12, flexShrink: 0 }}>
          <div style={{ flexShrink: 0 }}><BraceletSvg color="var(--gl)" sz={28} /></div>
          <div>
            <div style={{ fontSize: "1.35em", fontWeight: 700, color: "var(--gld)", marginBottom: 4, fontFamily: "'Cairo',sans-serif" }}>{t.conf.goldW} — {compC}</div>
            <div style={{ fontSize: "1.05em", color: "var(--ts)" }}>{t.conf.goldI}</div>
          </div>
        </div>}
        {/* Wristband video — takes all remaining space */}
        <div style={{ flex: 1, borderRadius: 14, overflow: "hidden", border: "2px solid var(--bd)", minHeight: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ background: "var(--sf2)", padding: "8px 12px", fontSize: "1.05em", fontWeight: 700, color: "var(--tp)", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid var(--bd)", flexShrink: 0 }}>
            <Ico n="play_circle" sz={20} color="var(--gl)" fill />{t.conf.howTo}
          </div>
          <video src="/wristband.mp4" autoPlay loop muted playsInline
            style={{ width: "100%", flex: 1, objectFit: "cover", display: "block", minHeight: 0 }} />
        </div>
      </div>
      {/* Right column — booking ref + map */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Ref */}
        <div style={{ background: "var(--sf)", border: "2px solid var(--bd)", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
          <div className="bi" style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--okl)", border: "3px solid var(--ok)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Ico n="check_circle" sz={42} color="var(--ok)" fill />
          </div>
          <div>
            <div style={{ fontSize: "1.05em", color: "var(--ts)", fontWeight: 600, marginBottom: 4 }}>{t.conf.ref}</div>
            <div style={{ fontSize: "1.85em", fontWeight: 800, color: "var(--tp)", fontFamily: "'Cairo',sans-serif", letterSpacing: 2, direction: "ltr" }}>{data.bookingRef || "HM-2026-00000"}</div>
          </div>
        </div>
        {/* Map title */}
        <div style={{ fontSize: "1.5em", fontWeight: 700, color: "var(--tp)", fontFamily: "'Cairo',sans-serif", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <Ico n="place" sz={24} color="var(--gl)" />{t.conf.pick}
        </div>
        <div style={{ flex: 1, background: "var(--sf)", border: "2px solid var(--bd)", borderRadius: 16, overflow: "hidden", minHeight: 0 }}>
          <svg viewBox="0 0 310 230" style={{ width: "100%", height: "100%" }}>
            <rect width="310" height="230" fill="#F7F3EC" />
            {[0, 32, 64, 96, 128, 160, 192, 224].map(y => <line key={y} x1="0" y1={y} x2="310" y2={y} stroke="#D4CABC" strokeWidth=".5" />)}
            {[0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 310].map(x => <line key={x} x1={x} y1="0" x2={x} y2="230" stroke="#D4CABC" strokeWidth=".5" />)}
            <rect x="95" y="55" width="120" height="110" fill="#EDE8DF" stroke="#D4CABC" strokeWidth="2" rx="4" />
            <rect x="136" y="90" width="38" height="38" fill="#1C1712" rx="3" />
            <rect x="136" y="90" width="38" height="10" fill="#9A7B0A" opacity=".85" />
            <text x="155" y="48" textAnchor="middle" fill="#5C5448" fontSize="8.5" fontFamily="'Cairo',sans-serif" fontWeight="700">Al-Masjid Al-Haram</text>
            <circle cx="155" cy="109" r="26" fill="none" stroke="#D4CABC" strokeWidth="1.5" strokeDasharray="4,3" />
            <circle cx="52" cy="182" r="13" fill="#9A7B0A" opacity=".15" />
            <circle cx="52" cy="182" r="8" fill="#9A7B0A" />
            <circle cx="52" cy="182" r="3" fill="white" />
            <line x1="60" y1="177" x2="95" y2="165" stroke="#9A7B0A" strokeWidth="2" strokeDasharray="5,3" />
            <text x="52" y="202" textAnchor="middle" fill="#6B5407" fontSize="9" fontFamily="'Cairo',sans-serif" fontWeight="700">{t.conf.aj}</text>
            <circle cx="276" cy="98" r="13" fill="#9A7B0A" opacity=".15" />
            <circle cx="276" cy="98" r="8" fill="#9A7B0A" />
            <circle cx="276" cy="98" r="3" fill="white" />
            <line x1="268" y1="105" x2="215" y2="120" stroke="#9A7B0A" strokeWidth="2" strokeDasharray="5,3" />
            <text x="276" y="118" textAnchor="middle" fill="#6B5407" fontSize="9" fontFamily="'Cairo',sans-serif" fontWeight="700">{t.conf.sh}</text>
            <circle cx="155" cy="218" r="11" fill="#1A5C8A" opacity=".2" />
            <circle cx="155" cy="218" r="7" fill="#1A5C8A" />
            <circle cx="155" cy="218" r="2.5" fill="white" />
            <text x="155" y="214.5" textAnchor="middle" fill="white" fontSize="7" fontFamily="'Cairo',sans-serif" fontWeight="700">{t.conf.here}</text>
          </svg>
        </div>
      </div>
    </div>
    {/* Footer */}
    <div style={{ padding: "8px 20px 10px", flexShrink: 0, background: "var(--sf)", borderTop: "1px solid var(--bd)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
        <span style={{ fontSize: "1.3em", color: "var(--ts)", fontFamily: isRTL ? "'Cairo',sans-serif" : "'Cairo',sans-serif" }}>{t.conf.ret} <strong style={{ color: "var(--wn)" }}>{cd}</strong> {t.conf.secs}</span>
        <button className="btn bg" onClick={onDone} style={{ minHeight: 50, padding: "10px 26px", fontSize: "1.3em" }}><Ico n="check" sz={22} color="#fff" />{t.conf.done}</button>
      </div>
      <div style={{ background: "var(--bd)", height: 7, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", background: "var(--gl)", borderRadius: 4, width: `${pct}%`, transition: "width 1s linear" }} />
      </div>
    </div>
  </div>
}

// ══════════════════════════════════════════════════
//  SCREEN 8 — RATING
// ══════════════════════════════════════════════════
function RateScreen({ t, isRTL, onRate, thanks, autoL }) {
  return <div className="fi" style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--bg)", gap: 34, padding: 48 }}>
    {thanks
      ? <div className="bi" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <Ico n="check_circle" sz={108} color="var(--ok)" fill />
        <div style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Scheherazade New',serif", fontSize: "3.6em", fontWeight: 700, color: "var(--tp)" }}>{t.rate.thanks}</div>
      </div>
      : <>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Scheherazade New',serif", fontSize: "3.1em", fontWeight: 700, color: "var(--tp)", marginBottom: 10 }}>{t.rate.title}</div>
          <div style={{ fontSize: "1.55em", color: "var(--ts)" }}>{t.rate.sub}</div>
        </div>
        <div style={{ display: "flex", gap: 52, direction: "ltr" }}>
          {[
            { n: "sentiment_very_satisfied", l: t.rate.great, c: "var(--ok)" },
            { n: "sentiment_neutral", l: t.rate.ok, c: "var(--ts)" },
            { n: "sentiment_very_dissatisfied", l: t.rate.poor, c: "var(--wn)" },
          ].map(r => <button key={r.n} onClick={onRate}
            style={{ width: 180, height: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: "var(--sf)", border: "2.5px solid var(--bd)", borderRadius: 22, cursor: "pointer", transition: "all 150ms ease", fontFamily: isRTL ? "'Cairo',sans-serif" : "'Cairo',sans-serif" }}>
            <Ico n={r.n} sz={92} color={r.c} fill />
            <span style={{ fontSize: "1.5em", fontWeight: 700, color: "var(--tp)" }}>{r.l}</span>
          </button>)}
        </div>
        <div style={{ width: 420, textAlign: "center" }}>
          <div style={{ fontSize: "1.25em", color: "var(--ts)", marginBottom: 8 }}>{t.rate.auto} <strong>{autoL}s</strong></div>
          <div style={{ background: "var(--bd)", height: 6, borderRadius: 3, overflow: "hidden" }}><div className="rBar" style={{ height: "100%", background: "var(--gl)", borderRadius: 3 }} /></div>
        </div>
      </>
    }
  </div>
}

// ══════════════════════════════════════════════════
//  TIMEOUT MODAL
// ══════════════════════════════════════════════════
function TimeoutMod({ t, isRTL, timeLeft, onCont, onReset }) {
  const fmt = `${Math.floor(timeLeft / 60).toString().padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`
  return <div style={{ position: "absolute", inset: 0, background: "rgba(28,23,18,.67)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(5px)", zIndex: 200 }}>
    <div className="bi" style={{ background: "var(--sf)", borderRadius: 22, padding: "44px 50px", width: 530, textAlign: "center", boxShadow: "0 24px 72px rgba(0,0,0,.38)" }}>
      <Ico n="hourglass_bottom" sz={66} color="var(--wn)" />
      <div style={{ fontSize: "2.1em", fontWeight: 700, color: "var(--tp)", marginTop: 14, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Cairo',sans-serif" }}>{t.still.q}</div>
      <div style={{ fontSize: "1.4em", color: "var(--ts)", marginTop: 6 }}>{t.still.sub}</div>
      <div style={{ fontSize: "1.2em", color: "var(--wn)", marginTop: 6, fontWeight: 600 }}>{t.still.left}</div>
      <div style={{ fontSize: "3.4em", fontWeight: 800, color: "var(--wn)", margin: "6px 0 28px", fontFamily: "'Cairo',sans-serif" }}>{fmt}</div>
      {/* Buttons — use BNav-style: direction:ltr, swap by isRTL */}
      <div style={{ display: "flex", gap: 14, direction: "ltr" }}>
        {isRTL
          ? <><button onClick={onCont} style={{ flex: 1, background: "var(--gl)", color: "#fff", border: "none", borderRadius: 12, padding: "18px", fontSize: "1.4em", fontWeight: 700, cursor: "pointer", fontFamily: "'Cairo',sans-serif", display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}><Ico n="arrow_back" sz={26} color="#fff" />{t.still.cont}</button>
            <button onClick={onReset} style={{ flex: 1, background: "var(--sf)", color: "var(--tp)", border: "2.5px solid var(--gl)", borderRadius: 12, padding: "18px", fontSize: "1.4em", fontWeight: 700, cursor: "pointer", fontFamily: "'Cairo',sans-serif", display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}><Ico n="refresh" sz={26} />{t.still.restart}</button></>
          : <><button onClick={onReset} style={{ flex: 1, background: "var(--sf)", color: "var(--tp)", border: "2.5px solid var(--gl)", borderRadius: 12, padding: "18px", fontSize: "1.4em", fontWeight: 700, cursor: "pointer", fontFamily: "'Cairo',sans-serif", display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}><Ico n="refresh" sz={26} />{t.still.restart}</button>
            <button onClick={onCont} style={{ flex: 1, background: "var(--gl)", color: "#fff", border: "none", borderRadius: 12, padding: "18px", fontSize: "1.4em", fontWeight: 700, cursor: "pointer", fontFamily: "'Cairo',sans-serif", display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>{t.still.cont}<Ico n="arrow_forward" sz={26} color="#fff" /></button></>}
      </div>
    </div>
  </div>
}

// ══════════════════════════════════════════════════
//  MAIN APP
// ══════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("language")
  const [lang, setLang] = useState(null)
  const [data, setData] = useState({ disabledCount: 0, service: null, ticketCount: 1, selectedSlot: null, paymentMethod: null, bookingRef: null })
  const [timeLeft, setTimeLeft] = useState(300)
  const [showTO, setShowTO] = useState(false)
  const [toast, setToast] = useState(null)
  const [proc, setProc] = useState(false)
  const [thanks, setThanks] = useState(false)
  const [confCd, setConfCd] = useState(35)
  const [rateCd, setRateCd] = useState(10)
  const [idleMod, setIdleMod] = useState(false)
  const timerRef = useRef(null)
  const idleRef = useRef(null)
  const lastAct = useRef(Date.now())

  const t = T[lang || "en"]
  const isRTL = lang === "ar"

  const reset = useCallback(() => {
    clearInterval(timerRef.current); clearInterval(idleRef.current)
    setScreen("language"); setLang(null)
    setData({ disabledCount: 0, service: null, ticketCount: 1, selectedSlot: null, paymentMethod: null, bookingRef: null })
    setTimeLeft(300); setShowTO(false); setIdleMod(false); setThanks(false)
  }, [])

  const resetIdle = useCallback(() => {
    lastAct.current = Date.now()
    if (idleMod) setIdleMod(false)
  }, [idleMod])

  // Global session timer
  useEffect(() => {
    if (!lang || screen === "language" || screen === "rating") { clearInterval(timerRef.current); return }
    timerRef.current = setInterval(() => setTimeLeft(p => {
      if (p <= 1) { reset(); return 300 }
      if (p === 61) setShowTO(true)
      return p - 1
    }), 1000)
    return () => clearInterval(timerRef.current)
  }, [lang, screen, reset])

  // 60s idle timer
  useEffect(() => {
    if (!lang || screen === "language" || screen === "rating") { clearInterval(idleRef.current); return }
    lastAct.current = Date.now()
    idleRef.current = setInterval(() => {
      if ((Date.now() - lastAct.current) >= 60000 && !idleMod) setIdleMod(true)
    }, 2000)
    return () => clearInterval(idleRef.current)
  }, [lang, screen])

  // Confirmation countdown
  useEffect(() => {
    if (screen !== "confirmation") return
    setConfCd(35)
    const iv = setInterval(() => setConfCd(p => { if (p <= 1) { clearInterval(iv); setScreen("rating"); return 35 } return p - 1 }), 1000)
    return () => clearInterval(iv)
  }, [screen])

  // Rating countdown
  useEffect(() => {
    if (screen !== "rating") return
    setRateCd(10)
    const iv = setInterval(() => setRateCd(p => { if (p <= 1) { clearInterval(iv); reset(); return 10 } return p - 1 }), 1000)
    return () => clearInterval(iv)
  }, [screen])

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 3200) }

  const SORD = ["language", "service", "timeslot", "summary", "payment", "confirmation", "rating"]
  const goBack = useCallback(() => {
    resetIdle()
    const i = SORD.indexOf(screen)
    if (i > 0) setScreen(SORD[i - 1])
  }, [screen, resetIdle])
  const adv = (to) => { resetIdle(); setScreen(to) }

  const pay = (m) => {
    setProc(true); setData(d => ({ ...d, paymentMethod: m }))
    setTimeout(() => {
      setProc(false)
      setData(d => ({ ...d, bookingRef: "HM-2026-" + Math.floor(10000 + Math.random() * 90000) }))
      setScreen("confirmation")
    }, 5000)
  }
  const rate = () => { setThanks(true); setTimeout(() => { setThanks(false); reset() }, 1900) }

  const showShell = !["language", "rating"].includes(screen)

  const renderS = () => {
    const p = { t, isRTL, data, setData }
    switch (screen) {
      case "language":
        return <LangScreen onSelect={c => { setLang(c); setTimeLeft(300); setData(d => ({ ...d, disabledCount: 0, ticketCount: 1, service: null })); setScreen("service") }} showToast={showToast} />
      case "service": return <SvcScreen {...p} onBack={goBack} onNext={() => adv("timeslot")} />
      case "timeslot": return <SlotScreen {...p} slots={SLOTS} onBack={goBack} onNext={() => adv("summary")} />
      case "summary": return <SumScreen {...p} onBack={goBack} onEdit={() => adv("service")} onNext={() => adv("payment")} />
      case "payment": return <PayScreen {...p} onBack={goBack} onPay={pay} />
      case "confirmation": return <ConfScreen {...p} cd={confCd} onDone={() => setScreen("rating")} />
      case "rating": return <RateScreen t={t} isRTL={isRTL} onRate={rate} thanks={thanks} autoL={rateCd} />
      default: return null
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#6B5A45 0%,#3A2E22 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={resetIdle} onTouchStart={resetIdle}>
      <style>{G}</style>
      <div className="wrap" dir={isRTL ? "rtl" : "ltr"}
        style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Cairo',sans-serif", fontSize: "15px" }}>
        {showShell && <ProgBar screen={screen} t={t} timeLeft={timeLeft} isRTL={isRTL} />}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }} key={screen}>
          {renderS()}
        </div>
        {/* Processing overlay */}
        {proc && <div style={{ position: "absolute", inset: 0, background: "rgba(247,243,236,.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26, zIndex: 150 }}>
          <Ico n="autorenew" sz={96} color="var(--gl)" cls="spn" />
          <div style={{ fontSize: "2.3em", fontWeight: 700, color: "var(--tp)", fontFamily: isRTL ? "'Cairo',sans-serif" : "'Cairo',sans-serif" }}>{t.pay.proc}</div>
          {data.paymentMethod === "card" && <div style={{ fontSize: "1.4em", color: "var(--ts)" }}>{t.pay.procSub}</div>}
        </div>}
        {/* Global timeout */}
        {showTO && <TimeoutMod t={t} isRTL={isRTL} timeLeft={timeLeft} onCont={() => { setShowTO(false); setTimeLeft(120) }} onReset={reset} />}
        {/* Idle timeout */}
        {idleMod && !showTO && <TimeoutMod t={t} isRTL={isRTL} timeLeft={timeLeft} onCont={() => { setIdleMod(false); resetIdle() }} onReset={reset} />}
        {/* Toast */}
        {toast && <div className="tn" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Cairo',sans-serif" }}>{toast}</div>}
      </div>
    </div>
  )
}