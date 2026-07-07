/* ============ YOLDA v2 — i18n.js — en / fa / tr ============ */
/* Loads after data.js, before common.js/slider.js/project.js.
   Persian type stack: IRANSans (local, if installed) → Vazirmatn (web) for text,
   Markazi Text for the gold accent words (the Persian counterpart of Cormorant). */
(function () {
  "use strict";

  const Y = window.YOLDA;
  const LANGS = ["en", "fa", "tr"];
  const stored = localStorage.getItem("yolda-lang");
  const lang = LANGS.includes(stored) ? stored : "en";
  Y.lang = lang;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";

  /* ---------- digit formatting ---------- */
  const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
  Y.fmt =
    lang === "fa"
      ? (v) => String(v).replace(/[0-9]/g, (d) => FA_DIGITS[+d])
      : (v) => String(v);

  /* ---------- UI strings ---------- */
  const UI = {
    en: {
      "nav.deliveries": "Deliveries",
      "nav.about": "About",
      hint: "Scroll to discover",
      tag: "On the way, always — Yolda® 2026",
      explore: "Explore",
      "next.label": "Next delivery",
      arrow: "→",
      "ab.t1": "«Yolda» means",
      "ab.t2": "<em>on the way</em>.",
      "ab.p1":
        "We started with one bike, one phone and one promise: nothing golden should ever arrive late. Today Yolda is a fleet of couriers who treat your dinner, your groceries and your grandmother's parcel like treasure.",
      "ab.p2":
        "The wing on our Y is not decoration — it's a promise of motion. Rain, midnight, holidays: somewhere in your city, a golden courier is already on the way.",
      "val1.h": "Speed is respect",
      "val1.p": "Your time is the most expensive thing we carry. Twelve minutes, on average, door to door.",
      "val2.h": "Golden hands",
      "val2.p": "Every courier is trained to handle each order like it's wrapped in gold leaf — because to someone, it is.",
      "val3.h": "Always on the way",
      "val3.p": "Rain, midnight, holidays. Motion is the brand; the rest is delivery.",
      "ab.next.label": "Seen enough?",
      "ab.next.link": "Back to <em>deliveries</em> →",
      "title.home": "Yolda — On the way, always",
      "title.about": "About — Yolda",
      "nav.waitlist": "Waitlist",
      "wl.label": "Before everyone else",
      "wl.t1": "Join the",
      "wl.t2": "<em>golden</em> list.",
      "wl.p":
        "Yolda opens city by city. Leave your details and be first in line when the golden couriers reach yours — early members get their first three deliveries free.",
      "wl.name": "Full name",
      "wl.email": "Email",
      "wl.city": "City",
      "wl.service": "What should we carry first?",
      "wl.submit": "Join the waitlist",
      "wl.note": "No spam — one golden email when we arrive.",
      "wl.error": "Please enter your name and a valid email.",
      "wl.success.t": "You're on the list.",
      "wl.success.p": "Keep an eye on the sky — a golden wing is headed your way.",
      "title.waitlist": "Waitlist — Yolda",
    },
    fa: {
      "nav.deliveries": "تحویل‌ها",
      "nav.about": "درباره ما",
      hint: "برای کشف، اسکرول کنید",
      tag: "همیشه در راه — یولدا® ۲۰۲۶",
      explore: "ببینید",
      "next.label": "تحویل بعدی",
      arrow: "←",
      "ab.t1": "«یولدا» یعنی",
      "ab.t2": "<em>در راه</em>.",
      "ab.p1":
        "با یک موتور، یک تلفن و یک قول شروع کردیم: هیچ چیزِ طلایی نباید دیر برسد. امروز یولدا ناوگانی از پیک‌هاست که با شام شما، خرید شما و امانتیِ مادربزرگ‌تان مثل گنج رفتار می‌کنند.",
      "ab.p2":
        "بالِ روی حرف Y ما تزئین نیست — قولِ حرکت است. باران، نیمه‌شب، تعطیلات: جایی در شهر شما، یک پیک طلایی همین حالا در راه است.",
      "val1.h": "سرعت، احترام است",
      "val1.p": "وقت شما گران‌بهاترین چیزی است که حمل می‌کنیم. میانگین دوازده دقیقه، در تا در.",
      "val2.h": "دست‌های طلایی",
      "val2.p": "هر پیک آموزش دیده تا هر سفارش را چنان حمل کند که گویی در ورق طلا پیچیده شده — چون برای کسی، واقعاً همین‌طور است.",
      "val3.h": "همیشه در راه",
      "val3.p": "باران، نیمه‌شب، تعطیلات. حرکت، خودِ برند است؛ باقی فقط تحویل است.",
      "ab.next.label": "کافی بود؟",
      "ab.next.link": "بازگشت به <em>تحویل‌ها</em> ←",
      "title.home": "یولدا — همیشه در راه",
      "title.about": "درباره ما — یولدا",
      "nav.waitlist": "فهرست انتظار",
      "wl.label": "زودتر از همه",
      "wl.t1": "به فهرست",
      "wl.t2": "<em>طلایی</em> بپیوندید.",
      "wl.p":
        "یولدا شهر به شهر باز می‌شود. مشخصات‌تان را بگذارید تا وقتی پیک‌های طلایی به شهر شما رسیدند، اولِ صف باشید — سه تحویل اولِ اعضای اولیه مهمان ماست.",
      "wl.name": "نام و نام خانوادگی",
      "wl.email": "ایمیل",
      "wl.city": "شهر",
      "wl.service": "اول چه چیزی برایتان بیاوریم؟",
      "wl.submit": "پیوستن به فهرست انتظار",
      "wl.note": "بدون هرزنامه — فقط یک ایمیل طلایی، وقتی رسیدیم.",
      "wl.error": "لطفاً نام و یک ایمیل معتبر وارد کنید.",
      "wl.success.t": "شما در فهرست هستید.",
      "wl.success.p": "چشم‌تان به آسمان باشد — یک بال طلایی به سمت شما در راه است.",
      "title.waitlist": "فهرست انتظار — یولدا",
    },
    tr: {
      "nav.deliveries": "Teslimatlar",
      "nav.about": "Hakkında",
      hint: "Keşfetmek için kaydır",
      tag: "Her zaman yolda — Yolda® 2026",
      explore: "Keşfet",
      "next.label": "Sıradaki teslimat",
      arrow: "→",
      "ab.t1": "«Yolda» adı gibi:",
      "ab.t2": "<em>yolda</em>.",
      "ab.p1":
        "Bir bisiklet, bir telefon ve bir sözle başladık: altın değerinde hiçbir şey geç kalmamalı. Bugün Yolda; akşam yemeğinize, market alışverişinize ve büyükannenizin emanetine hazine gibi davranan bir kurye filosu.",
      "ab.p2":
        "Y harfimizdeki kanat süs değil — hareket sözü. Yağmur, gece yarısı, bayram: şehrinizin bir yerinde altın bir kurye çoktan yolda.",
      "val1.h": "Hız saygıdır",
      "val1.p": "Zamanınız taşıdığımız en değerli şey. Kapıdan kapıya ortalama on iki dakika.",
      "val2.h": "Altın eller",
      "val2.p": "Her kurye, her siparişi altın varakla sarılmış gibi taşımak üzere eğitilir — çünkü biri için gerçekten öyle.",
      "val3.h": "Her zaman yolda",
      "val3.p": "Yağmur, gece yarısı, bayram. Hareket markanın ta kendisi; gerisi teslimat.",
      "ab.next.label": "Yeterince gördün mü?",
      "ab.next.link": "Teslimatlara <em>dön</em> →",
      "title.home": "Yolda — Her zaman yolda",
      "title.about": "Hakkında — Yolda",
      "nav.waitlist": "Bekleme listesi",
      "wl.label": "Herkesten önce",
      "wl.t1": "Altın listeye",
      "wl.t2": "<em>katıl</em>.",
      "wl.p":
        "Yolda şehir şehir açılıyor. Bilgilerini bırak, altın kuryeler şehrine ulaştığında sıranın en önünde ol — ilk üyelerin ilk üç teslimatı bizden.",
      "wl.name": "Ad soyad",
      "wl.email": "E-posta",
      "wl.city": "Şehir",
      "wl.service": "Önce ne getirelim?",
      "wl.submit": "Listeye katıl",
      "wl.note": "Spam yok — vardığımızda tek bir altın e-posta.",
      "wl.error": "Lütfen adını ve geçerli bir e-posta gir.",
      "wl.success.t": "Listedesin.",
      "wl.success.p": "Gözün gökyüzünde olsun — altın bir kanat sana doğru yola çıktı.",
      "title.waitlist": "Bekleme listesi — Yolda",
    },
  };
  Y.t = (key) => (UI[lang] && UI[lang][key]) || UI.en[key] || key;

  /* ---------- Localized service content ---------- */
  const SERVICE_L10N = {
    fa: {
      food: {
        lines: ["تحویل", "غذا"],
        category: "رستوران‌ها — داغ و سریع",
        year: "۲۰۲۶",
        meta: { "پوشش": "۴۸ شهر", "میانگین زمان": "۱۲ دقیقه", "از سال": "۲۰۲۶" },
        intro:
          "هوس نیمه‌شب، مسابقه‌ای با زمان است. یولدا فود هر رستوران را به نزدیک‌ترین پیک طلایی وصل می‌کند تا پلو بخارکنان برسد و بستنی همچنان یخ‌زده.",
        quote: "دوازده دقیقه، در تا در — هنوز داغ، هنوز بی‌نقص.",
        body: [
          "موتور مسیریابی ما به ثانیه فکر می‌کند، نه به خیابان. هم‌زمان آشپزخانه‌ها، ترافیک و هوا را می‌بیند و پیش از آن‌که سرآشپز غذا را بکشد، پیک را راهی می‌کند.",
          "کیف‌های عایق طلایی، رهگیری زنده‌ای که واقعاً قابل اعتماد است و پیکی که با لبخند زنگ می‌زند. کل هنر ما همین است — هزاران بار در هر شب.",
        ],
        stats: [
          ["۱۲", "دقیقه میانگین تحویل"],
          ["۲.۴هزار", "رستوران همکار"],
          ["۴.۹", "میانگین امتیاز"],
        ],
      },
      groceries: {
        lines: ["خرید", "بازار"],
        category: "بازارها — سبد کامل",
        year: "۲۰۲۶",
        meta: { "پوشش": "۳۶ شهر", "میانگین زمان": "۲۷ دقیقه", "از سال": "۲۰۲۶" },
        intro:
          "تمام بازار، در جیب شما. انتخاب‌گرهای آموزش‌دیده‌ی یولدا میان قفسه‌ها می‌گردند — رسیده‌ترین گوجه‌ها، سردترین شیر و نانی که یک ساعت پیش از تنور درآمده.",
        quote: "لیست شما، طوری انتخاب می‌شود که انگار لیست ماست.",
        body: [
          "هر انتخاب‌گر یک قانون طلایی دارد: چیزی را برندار که خودت به خانه نمی‌بری. میوه‌ی لک‌دار روی قفسه می‌ماند و تاریخ‌مصرف کوتاه هرگز وارد کیسه نمی‌شود.",
          "زنجیره‌ی سرد از قفسه تا در خانه — محفظه‌ی خنک در کیف هر پیک، تا یخ‌زده حتی در ترافیک تابستان هم یخ‌زده بماند.",
        ],
        stats: [
          ["۲۷", "دقیقه میانگین هر خرید"],
          ["۱۸هزار", "کالای در دسترس"],
          ["۹۸", "٪ دقت انتخاب"],
        ],
      },
      parcels: {
        lines: ["پیک", "مرسوله"],
        category: "اسناد و هدیه‌ها — همان روز",
        year: "۲۰۲۶",
        meta: { "پوشش": "شهر به شهر", "میانگین زمان": "همان روز", "از سال": "۲۰۲۶" },
        intro:
          "قراردادی که باید امروز امضا شود. هدیه‌ی تولدی که نمی‌تواند تا دوشنبه صبر کند. یولدا مرسوله آنچه را مهم است در سطح شهر — و میان شهرها — پیش از غروب می‌رساند.",
        quote: "چنان مراقبیم که انگار در ورق طلا پیچیده شده.",
        body: [
          "عکس تأیید هنگام دریافت و هنگام تحویل، زنجیره‌ی حفاظت مهروموم‌شده و یک پیک مسئول، از اولین دست تا آخرین.",
          "حالت شکستنی یعنی بسته‌بندی نرم‌تر، سواری آرام‌تر و پیکی که به‌جای آسانسور شلوغ، پله‌ها را انتخاب می‌کند. بعضی چیزها آیین می‌خواهند.",
        ],
        stats: [
          ["۳", "ساعت میانگین بین‌شهری"],
          ["۱۰۰", "٪ مرسوله‌ی بیمه‌شده"],
          ["۰", "گم‌شده در ۲۰۲۶"],
        ],
      },
      anything: {
        lines: ["هرچیز", "هرجا"],
        category: "کانسیرژ — شما بگویید",
        year: "۲۰۲۶",
        meta: { "پوشش": "هرجا که باشید", "میانگین زمان": "شما تعیین می‌کنید", "از سال": "۲۰۲۶" },
        intro:
          "کلیدتان خانه‌ی دوستتان جا مانده؟ شارژر باید پیش از حرکت قطار به صندلی ۱۴C برسد؟ به زبان ساده بنویسید — پیک طلایی بقیه‌اش را می‌فهمد.",
        quote: "اگر روی موتور جا شود، همین حالا در راه است.",
        body: [
          "یولدا هرچیز، موتور جست‌وجوی انسانیِ شهر شماست. پیک‌ها کتاب نایاب، گل لحظه‌ی آخر و همان کابلی را که بد توصیف کرده‌اید پیدا می‌کنند.",
          "شما بودجه را تعیین می‌کنید، ما قیمت می‌دهیم، شما یک بار لمس می‌کنید. عجیب‌ترین سفارشی که انجام داده‌ایم؟ یک ماهی قرمز، با تُنگش — بی‌آنکه قطره‌ای بریزد.",
        ],
        stats: [
          ["۹", "دقیقه تا اولین قیمت"],
          ["۹۶", "٪ سفارش انجام‌شده"],
          ["۱", "ماهی قرمز، سالم"],
        ],
      },
    },
    tr: {
      food: {
        lines: ["Yemek", "Teslimatı"],
        category: "Restoranlar — sıcak ve hızlı",
        year: "2026",
        meta: { Kapsama: "48 şehir", "Ort. süre": "12 dk", "Başlangıç": "2026" },
        intro:
          "Gece yarısı gelen istek, saate karşı bir yarıştır. Yolda Yemek her restoranı en yakın altın kuryeyle eşleştirir; pilav buharı tüterken, dondurma donmuş hâlde kapına gelir.",
        quote: "Kapıdan kapıya on iki dakika — hâlâ sıcak, hâlâ kusursuz.",
        body: [
          "Sokak değil saniye hesabı yapan kendi rota motorumuzu geliştirdik. Mutfakları, trafiği ve havayı aynı anda izler; şef tabağı hazırlamadan kuryeyi yola çıkarır.",
          "Yalıtımlı altın çantalar, gerçekten güvenebileceğin canlı takip ve zili gülümseyerek çalan bir kurye. Bütün sır bu — her gece binlerce kez.",
        ],
        stats: [
          ["12", "dk ortalama teslimat"],
          ["2,4b", "partner restoran"],
          ["4,9", "ortalama puan"],
        ],
      },
      groceries: {
        lines: ["Market", "Alışverişi"],
        category: "Pazarlar — dolu sepet",
        year: "2026",
        meta: { Kapsama: "36 şehir", "Ort. süre": "27 dk", "Başlangıç": "2026" },
        intro:
          "Bütün pazar, cebinde. Yolda Market'in eğitimli seçicileri reyonları senin için gezer — en olgun domates, en soğuk süt, bir saat önce fırından çıkmış ekmek.",
        quote: "Listen, bizimmiş gibi seçilir.",
        body: [
          "Her seçicinin altın kuralı: eve götürmeyeceğin ürünü alma. Ezik meyve rafta kalır; yakın tarihli ürün asla çantaya girmez.",
          "Raftan kapıya soğuk zincir — her kurye çantasında soğutmalı bölme; yaz trafiğinde bile donuk, donuk kalır.",
        ],
        stats: [
          ["27", "dk ortalama tur"],
          ["18b", "ürün çeşidi"],
          ["98", "% seçim isabeti"],
        ],
      },
      parcels: {
        lines: ["Koli", "Ekspres"],
        category: "Evrak ve hediye — aynı gün",
        year: "2026",
        meta: { Kapsama: "Şehirden şehire", "Ort. süre": "Aynı gün", "Başlangıç": "2026" },
        intro:
          "Bugün imzalanması gereken bir sözleşme. Pazartesiyi bekleyemeyecek bir doğum günü hediyesi. Yolda Koli, önemli olanı şehir içinde — ve şehirler arasında — gün batmadan ulaştırır.",
        quote: "Altın varakla sarılmış gibi taşınır.",
        body: [
          "Alışta ve kapıda fotoğraflı onay, mühürlü emanet zinciri ve ilk elden son ele kadar sorumlu tek kurye.",
          "Kırılabilir modu: ekstra dolgu, daha sakin sürüş ve kalabalık asansör yerine merdiveni seçen bir kurye. Bazı şeyler tören ister.",
        ],
        stats: [
          ["3", "saat şehirler arası ort."],
          ["100", "% sigortalı koli"],
          ["0", "kayıp — 2026"],
        ],
      },
      anything: {
        lines: ["Her Şey", "Her Yerde"],
        category: "Konsiyerj — sen söyle",
        year: "2026",
        meta: { Kapsama: "Neredeysen orada", "Ort. süre": "Sen belirle", "Başlangıç": "2026" },
        intro:
          "Anahtarını arkadaşında mı unuttun? Şarj aleti tren kalkmadan 14C koltuğuna mı yetişmeli? Düz cümlelerle yaz — altın kurye gerisini çözer.",
        quote: "Bisiklete sığıyorsa, çoktan yolda.",
        body: [
          "Yolda Her Şey, şehrinin insan gücüyle çalışan arama motoru. Kuryeler baskısı tükenmiş kitabı, son dakika çiçeğini ve kötü tarif ettiğin o kabloyu bulur.",
          "Bütçeyi sen koy, teklifi biz gönderelim, tek dokunuşla onayla. Yerine getirdiğimiz en tuhaf istek mi? Kavanozuyla birlikte, hiç dökülmeden teslim edilen bir Japon balığı.",
        ],
        stats: [
          ["9", "dk ilk teklife kadar"],
          ["96", "% karşılanan istek"],
          ["1", "Japon balığı, sapasağlam"],
        ],
      },
    },
  };

  if (SERVICE_L10N[lang]) {
    Y.SERVICES.forEach((s) => {
      const o = SERVICE_L10N[lang][s.id];
      if (o) Object.assign(s, o);
    });
  }

  /* ---------- Apply static translations ---------- */
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = Y.t(el.dataset.i18n);
  });
  if (lang === "fa") {
    document.querySelectorAll("[data-digits]").forEach((el) => {
      el.textContent = Y.fmt(el.textContent);
    });
  }
  const pageKey = "title." + document.body.dataset.page;
  if (UI[lang][pageKey]) document.title = UI[lang][pageKey];

  /* ---------- Language switcher ---------- */
  const nav = document.querySelector(".nav");
  if (nav) {
    const box = document.createElement("div");
    box.className = "nav__langs";
    [["en", "En"], ["fa", "فا"], ["tr", "Tr"]].forEach(([code, label]) => {
      const b = document.createElement("a");
      b.href = "#";
      b.className = "nav__lang" + (code === lang ? " is-active" : "");
      b.textContent = label;
      b.setAttribute("data-hover", "");
      b.addEventListener("click", (e) => {
        e.preventDefault();
        if (code === lang) return;
        localStorage.setItem("yolda-lang", code);
        const overlay = document.getElementById("transition");
        if (overlay) overlay.classList.add("is-active");
        setTimeout(() => location.reload(), 700);
      });
      box.appendChild(b);
    });
    nav.appendChild(box);
  }
})();
