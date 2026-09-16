export type Locale = "ro" | "en" | "de";

export const locales: Locale[] = ["ro", "en", "de"];
export const defaultLocale: Locale = "ro";

const dict = {
  // Nav
  "nav.usi_exterior": { ro: "Uși Exterior", en: "Exterior Doors", de: "Außen-Türen" },
  "nav.ferestre": { ro: "Ferestre", en: "Windows", de: "Fenster" },
  "nav.usi_interior": { ro: "Uși Interior", en: "Interior Doors", de: "Innen-Türen" },
  "nav.despre": { ro: "Despre", en: "About", de: "Über uns" },
  "nav.contact": { ro: "Contact", en: "Contact", de: "Kontakt" },
  "nav.cere_oferta": { ro: "Cere o ofertă →", en: "Request a quote →", de: "Angebot anfordern →" },
  "nav.cos": { ro: "Coș", en: "Cart", de: "Warenkorb" },

  // Hero
  "hero.label": {
    ro: "Uși și Ferestre PVC — Distribuitor Autorizat Chirmandi · România",
    en: "PVC Doors & Windows — Authorized Chirmandi Distributor · Romania",
    de: "PVC-Türen & Fenster — Autorisierter Chirmandi-Händler · Rumänien",
  },
  "hero.headline": {
    ro: "Uși.\nFerestre.\nCalitate.",
    en: "Doors.\nWindows.\nQuality.",
    de: "Türen.\nFenster.\nQualität.",
  },
  "hero.cta_products": { ro: "Vezi produsele →", en: "View products →", de: "Produkte ansehen →" },
  "hero.cta_quote": { ro: "Cere o ofertă", en: "Request a quote", de: "Angebot anfordern" },

  // Showcase
  "showcase.title": { ro: "Produsele Noastre", en: "Our Products", de: "Unsere Produkte" },
  "showcase.count": { ro: "( 165+ modele disponibile )", en: "( 165+ models available )", de: "( 165+ Modelle verfügbar )" },
  "showcase.usi_exterior": { ro: "Uși Exterior", en: "Exterior Doors", de: "Außen-Türen" },
  "showcase.ferestre": { ro: "Ferestre PVC", en: "PVC Windows", de: "PVC-Fenster" },
  "showcase.usi_interior": { ro: "Uși Interior", en: "Interior Doors", de: "Innen-Türen" },
  "showcase.geam": { ro: "Geam Termopan", en: "Insulated Glass", de: "Isolierglas" },
  "showcase.euro_classic": { ro: "Usa Euro Classic", en: "Euro Classic Door", de: "Euro Classic Tür" },
  "showcase.de_la": { ro: "de la", en: "from", de: "ab" },

  // Ce Vindem
  "vindem.title": { ro: "Ce Vindem", en: "What We Sell", de: "Was wir verkaufen" },
  "vindem.usi_exterior": { ro: "Uși Exterior", en: "Exterior Doors", de: "Außen-Türen" },
  "vindem.usi_exterior_desc": {
    ro: "Uși de exterior PVC și termopan, rezistente și eficiente energetic.",
    en: "PVC exterior doors and insulated glass, resistant and energy-efficient.",
    de: "PVC-Außentüren und Isolierglas, widerstandsfähig und energieeffizient.",
  },
  "vindem.ferestre": { ro: "Ferestre PVC", en: "PVC Windows", de: "PVC-Fenster" },
  "vindem.ferestre_desc": {
    ro: "Ferestre PVC cu termoizolație superioară, diverse dimensiuni.",
    en: "PVC windows with superior thermal insulation, various sizes.",
    de: "PVC-Fenster mit superiorer Wärmedämmung, verschiedene Größen.",
  },
  "vindem.usi_interior": { ro: "Uși Interior", en: "Interior Doors", de: "Innen-Türen" },
  "vindem.usi_interior_desc": {
    ro: "Uși de interior elegante, funcționale, la prețuri competitive.",
    en: "Elegant, functional interior doors at competitive prices.",
    de: "Elegante, funktionelle Innentüren zu wettbewerbsfähigen Preisen.",
  },
  "vindem.oferta": { ro: "Cere Ofertă Personalizată", en: "Request Custom Quote", de: "Individuelles Angebot anfordern" },
  "vindem.oferta_desc": {
    ro: "Dimensiuni sau culori speciale? Solicită o ofertă adaptată.",
    en: "Special dimensions or colors? Request a tailored quote.",
    de: "Sondermaße oder -farben? Fordern Sie ein individuelles Angebot an.",
  },

  // About
  "about.quote": {
    ro: "Credem că fiecare casă merită o ușă pe măsura ei.",
    en: "We believe every home deserves a door that fits it.",
    de: "Wir glauben, jedes Zuhause verdient eine passende Tür.",
  },
  "about.elena_role": { ro: "Elena Ungureanu — Relații Clienți", en: "Elena Ungureanu — Customer Relations", de: "Elena Ungureanu — Kundenbetreuung" },
  "about.elena_bio": {
    ro: "Elena te ajută să alegi produsul potrivit și organizează livrarea sau ridicarea comenzii tale.",
    en: "Elena helps you choose the right product and organizes delivery or pickup of your order.",
    de: "Elena hilft Ihnen, das richtige Produkt zu wählen, und organisiert die Lieferung oder Abholung Ihrer Bestellung.",
  },
  "about.badge1": { ro: "Distribuitor Autorizat Chirmandi", en: "Authorized Chirmandi Distributor", de: "Autorisierter Chirmandi-Händler" },
  "about.badge2": { ro: "Plată la Livrare", en: "Cash on Delivery", de: "Nachnahme" },
  "about.badge3": { ro: "Livrare în toată România", en: "Nationwide Delivery", de: "Lieferung in ganz Rumänien" },
  "about.telefon": { ro: "Telefon", en: "Phone", de: "Telefon" },

  // Stats
  "stats.modele": { ro: "Modele disponibile", en: "Models available", de: "Verfügbare Modelle" },
  "stats.national": { ro: "Livrare Națională", en: "Nationwide Delivery", de: "Lieferung in ganz Rumänien" },
  "stats.plata": { ro: "Plată la Livrare", en: "Cash on Delivery", de: "Nachnahme" },
  "stats.parteneri": { ro: "Parteneri Chirmandi", en: "Chirmandi Partners", de: "Chirmandi-Partner" },

  // Cum Functioneaza
  "cum.title": { ro: "Cum Funcționează", en: "How It Works", de: "Wie es funktioniert" },
  "cum.step1_title": { ro: "Alege Produsul", en: "Choose Product", de: "Produkt wählen" },
  "cum.step1_desc": {
    ro: "Răsfoiește catalogul nostru de peste 165 de modele.",
    en: "Browse our catalog of over 165 models.",
    de: "Stöbern Sie in unserem Katalog mit über 165 Modellen.",
  },
  "cum.step2_title": { ro: "Comandă sau Cere Ofertă", en: "Order or Request Quote", de: "Bestellen oder Angebot anfordern" },
  "cum.step2_desc": {
    ro: "Adaugă în coș sau solicită ofertă pentru dimensiuni personalizate.",
    en: "Add to cart or request a quote for custom sizes.",
    de: "In den Warenkorb legen oder ein Angebot für Sondergrößen anfordern.",
  },
  "cum.step3_title": { ro: "Confirmare Telefonică", en: "Phone Confirmation", de: "Telefonische Bestätigung" },
  "cum.step3_desc": {
    ro: "Elena sau un coleg te sună pentru a confirma comanda.",
    en: "Elena or a colleague calls to confirm your order.",
    de: "Elena oder ein Kollege ruft an, um Ihre Bestellung zu bestätigen.",
  },
  "cum.step4_title": { ro: "Livrare sau Ridicare", en: "Delivery or Pickup", de: "Lieferung oder Abholung" },
  "cum.step4_desc": {
    ro: "Livrare națională (150 RON) sau ridicare gratuită din Sibiu.",
    en: "Nationwide delivery (150 RON) or free pickup in Sibiu.",
    de: "Lieferung in ganz Rumänien (150 RON) oder kostenlose Abholung in Sibiu.",
  },

  // Contact CTA
  "cta.headline": {
    ro: "Hai să Găsim\nUșa Potrivită",
    en: "Let's Find\nThe Right Door",
    de: "Lass uns die\nRichtige Tür Finden",
  },
  "cta.sub": {
    ro: "Răspundem rapid la orice solicitare de ofertă.",
    en: "We respond quickly to any quote request.",
    de: "Wir antworten schnell auf jede Angebotsanfrage.",
  },
  "cta.button": { ro: "Cere o ofertă →", en: "Request a quote →", de: "Angebot anfordern →" },
  "cta.phone_note": { ro: "Te sunăm noi pentru confirmare", en: "We call you to confirm", de: "Wir rufen Sie zur Bestätigung an" },

  // Footer
  "footer.livrare": { ro: "Livrare & Plata", en: "Delivery & Payment", de: "Lieferung & Zahlung" },
  "footer.confidentialitate": { ro: "Confidențialitate", en: "Privacy", de: "Datenschutz" },
  "footer.termeni": { ro: "Termeni & Condiții", en: "Terms & Conditions", de: "AGB" },
  "footer.gdpr": { ro: "GDPR", en: "GDPR", de: "DSGVO" },
  "footer.cookies": { ro: "Cookies", en: "Cookies", de: "Cookies" },
  "footer.anpc": { ro: "ANPC", en: "ANPC", de: "ANPC" },
  "footer.sal": { ro: "SAL", en: "SAL", de: "SAL" },
  "footer.legal_line": {
    ro: "Baustoffe este operat de Best Baustoffe SRL, CUI 52365190, Reg. Com. J2025062807006.",
    en: "Baustoffe is operated by Best Baustoffe SRL, CUI 52365190, Reg. Com. J2025062807006.",
    de: "Baustoffe wird betrieben von Best Baustoffe SRL, CUI 52365190, Reg. Com. J2025062807006.",
  },

  // Category page
  "cat.breadcrumb": { ro: "Acasă", en: "Home", de: "Startseite" },
  "cat.toate": { ro: "Toate", en: "All", de: "Alle" },
  "cat.adauga": { ro: "Adaugă în coș", en: "Add to cart", de: "In den Warenkorb" },
  "cat.cere_oferta": { ro: "Cere ofertă dimensiune →", en: "Request size quote →", de: "Größenangebot anfordern →" },
  "cat.de_la": { ro: "de la", en: "from", de: "ab" },
  "cat.missing_product": { ro: "Produsul nu a fost găsit", en: "Product not found", de: "Produkt nicht gefunden" },
  "cat.back_to_catalog": { ro: "← Întoarce-te la catalog", en: "← Back to catalog", de: "← Zurück zum Katalog" },
  "cat.usi_exterior_desc": {
    ro: "Uși de exterior PVC și termopan, distribuite direct de la Chirmandi.",
    en: "PVC exterior doors and insulated glass, distributed directly from Chirmandi.",
    de: "PVC-Außentüren und Isolierglas, direkt von Chirmandi vertrieben.",
  },
  "cat.ferestre_desc": {
    ro: "Ferestre PVC cu termoizolație superioară, diverse dimensiuni.",
    en: "PVC windows with superior thermal insulation, various sizes.",
    de: "PVC-Fenster mit superiorer Wärmedämmung, verschiedene Größen.",
  },
  "cat.usi_interior_desc": {
    ro: "Uși de interior elegante, funcționale, la prețuri competitive.",
    en: "Elegant, functional interior doors at competitive prices.",
    de: "Elegante, funktionelle Innentüren zu wettbewerbsfähigen Preisen.",
  },

  // Product detail
  "prod.cod": { ro: "Cod", en: "Code", de: "Code" },
  "prod.culoare": { ro: "Culoare", en: "Color", de: "Farbe" },
  "prod.dimensiune": { ro: "Dimensiune", en: "Size", de: "Größe" },
  "prod.dimensiune_custom": { ro: "Dimensiune personalizată? Cere ofertă →", en: "Custom size? Request quote →", de: "Sondergröße? Angebot anfordern →" },
  "prod.material": { ro: "Material", en: "Material", de: "Material" },
  "prod.sticla": { ro: "Sticlă", en: "Glass", de: "Glas" },
  "prod.frunza": { ro: "Frunză", en: "Leaf", de: "Flügel" },
  "prod.simpla": { ro: "Simplă", en: "Single", de: "Einfach" },
  "prod.dubla": { ro: "Dublă", en: "Double", de: "Doppelt" },
  "prod.cantitate": { ro: "Cantitate", en: "Quantity", de: "Menge" },

  // Cart
  "cart.title": { ro: "Coșul tău", en: "Your Cart", de: "Ihr Warenkorb" },
  "cart.empty": { ro: "Coșul este gol.", en: "Cart is empty.", de: "Warenkorb ist leer." },
  "cart.vezi_produse": { ro: "Vezi produse →", en: "View products →", de: "Produkte ansehen →" },
  "cart.total": { ro: "Total", en: "Total", de: "Gesamt" },
  "cart.finalizeaza": { ro: "Finalizează comanda →", en: "Complete order →", de: "Bestellung abschließen →" },
  "cart.sterge": { ro: "Șterge", en: "Remove", de: "Entfernen" },

  // Checkout
  "checkout.title": { ro: "Finalizare comandă", en: "Complete Order", de: "Bestellung abschließen" },
  "checkout.produse": { ro: "produs(e)", en: "product(s)", de: "Produkt(e)" },
  "checkout.client": { ro: "Client", en: "Customer", de: "Kunde" },
  "checkout.livrare": { ro: "Livrare", en: "Delivery", de: "Lieferung" },
  "checkout.facturare": { ro: "Facturare", en: "Billing", de: "Rechnung" },
  "checkout.confirmare": { ro: "Confirmare", en: "Confirm", de: "Bestätigen" },
  "checkout.pers_fizica": { ro: "Persoană fizică", en: "Individual", de: "Natürliche Person" },
  "checkout.pers_juridica": { ro: "Persoană juridică", en: "Company", de: "Unternehmen" },
  "checkout.nume": { ro: "Nume complet", en: "Full name", de: "Vollständiger Name" },
  "checkout.telefon": { ro: "Telefon", en: "Phone", de: "Telefon" },
  "checkout.email_opțional": { ro: "Email (opțional)", en: "Email (optional)", de: "E-Mail (optional)" },
  "checkout.continua": { ro: "Continuă →", en: "Continue →", de: "Weiter →" },
  "checkout.inapoi": { ro: "← Înapoi", en: "← Back", de: "← Zurück" },
  "checkout.livrare_150": { ro: "Livrare (+150 RON)", en: "Delivery (+150 RON)", de: "Lieferung (+150 RON)" },
  "checkout.ridicare": { ro: "Ridicare personală (gratuit)", en: "Personal pickup (free)", de: "Persönliche Abholung (kostenlos)" },
  "checkout.strada": { ro: "Stradă + nr.", en: "Street + no.", de: "Straße + Nr." },
  "checkout.oras": { ro: "Oraș", en: "City", de: "Stadt" },
  "checkout.judet": { ro: "Județ", en: "County", de: "Kreis" },
  "checkout.cod_postal": { ro: "Cod poștal", en: "Postal code", de: "Postleitzahl" },
  "checkout.denumire": { ro: "Denumire companie", en: "Company name", de: "Firmenname" },
  "checkout.cui": { ro: "CUI", en: "CUI", de: "CUI" },
  "checkout.reg_com": { ro: "Reg. Com. (J...)", en: "Reg. Com. (J...)", de: "Reg. Com. (J...)" },
  "checkout.vezi_comanda": { ro: "Vezi comanda →", en: "View order →", de: "Bestellung ansehen →" },
  "checkout.confirm_comanda": { ro: "Confirmă comanda", en: "Confirm order", de: "Bestellung bestätigen" },
  "checkout.gdpr_label": {
    ro: "Am citit și accept politica GDPR și confidențialitatea. Consimțăm la prelucrarea datelor personale.",
    en: "I have read and accept the GDPR policy and privacy policy. I consent to the processing of personal data.",
    de: "Ich habe die DSGVO-Richtlinie und die Datenschutzrichtlinie gelesen und akzeptiere sie. Ich stimme der Verarbeitung personenbezogener Daten zu.",
  },
  "checkout.gdpr_link": { ro: "politica GDPR", en: "GDPR policy", de: "DSGVO-Richtlinie" },
  "checkout.confidentialitate_link": { ro: "confidențialitatea", en: "privacy policy", de: "Datenschutzrichtlinie" },
  "checkout.cos_gol": { ro: "Coșul tău este gol.", en: "Your cart is empty.", de: "Ihr Warenkorb ist leer." },

  // Order confirmation
  "order.title": { ro: "Comandă înregistrată", en: "Order Registered", de: "Bestellung registriert" },
  "order.message": {
    ro: "Comanda ta a fost înregistrată. Vei fi contactat telefonic în cel mai scurt timp pentru confirmare.",
    en: "Your order has been registered. You will be contacted by phone as soon as possible for confirmation.",
    de: "Ihre Bestellung wurde registriert. Sie werden so schnell wie möglich telefonisch zur Bestätigung kontaktiert.",
  },
  "order.numar": { ro: "Număr comandă", en: "Order number", de: "Bestellnummer" },
  "order.back_home": { ro: "← Înapoi la magazin", en: "← Back to shop", de: "← Zurück zum Shop" },

  // Contact page
  "contact.title": { ro: "Contact", en: "Contact", de: "Kontakt" },
  "contact.adresa_sediu": { ro: "Adresă sediu", en: "Office address", de: "Büroadresse" },
  "contact.telefon": { ro: "Telefon", en: "Phone", de: "Telefon" },
  "contact.punct_ridicare": { ro: "Punct ridicare", en: "Pickup point", de: "Abholstelle" },
  "contact.pers_juridica": { ro: "Contact pers. juridică", en: "Legal entity contact", de: "Kontakt der juristischen Person" },
  "contact.nume": { ro: "Nume", en: "Name", de: "Name" },
  "contact.email": { ro: "Email", en: "Email", de: "E-Mail" },
  "contact.subiect": { ro: "Subiect", en: "Subject", de: "Betreff" },
  "contact.mesaj": { ro: "Mesaj", en: "Message", de: "Nachricht" },
  "contact.trimite": { ro: "Trimite mesajul →", en: "Send message →", de: "Nachricht senden →" },
  "contact.multumim": { ro: "Mulțumim!", en: "Thank you!", de: "Vielen Dank!" },
  "contact.mesaj_inregistrat": {
    ro: "Mesajul tău a fost înregistrat. Te vom contacta în curând.",
    en: "Your message has been registered. We will contact you soon.",
    de: "Ihre Nachricht wurde registriert. Wir werden uns bald bei Ihnen melden.",
  },

  // Livrare page
  "livrare.title": { ro: "Livrare și Plată", en: "Delivery & Payment", de: "Lieferung & Zahlung" },
  "livrare.livrare_section": { ro: "Livrare", en: "Delivery", de: "Lieferung" },
  "livrare.nationala": {
    ro: "Livram în toată România, prin curieri parteneri.",
    en: "We deliver nationwide through partner couriers.",
    de: "Wir liefern in ganz Rumänien über Partner-Kurierdienste.",
  },
  "livrare.taxa": { ro: "Taxă de livrare: 150 RON", en: "Delivery fee: 150 RON", de: "Liefergebühr: 150 RON" },
  "livrare.flat": { ro: "(flat, indiferent de destinație)", en: "(flat, regardless of destination)", de: "(Pauschal, unabhängig vom Zielort)" },
  "livrare.termen": {
    ro: "Termenul estimativ de livrare: 5–10 zile lucrătoare de la confirmarea comenzii.",
    en: "Estimated delivery time: 5–10 business days from order confirmation.",
    de: "Geschätzte Lieferzeit: 5–10 Werktage ab Bestätigung der Bestellung.",
  },
  "livrare.uscar": {
    ro: "Livrarea se face la poartă / scară (verificat cu curierul la sosire).",
    en: "Delivery is made to the door / floor (check with the courier upon arrival).",
    de: "Die Lieferung erfolgt zur Tür / Treppe (bei Ankunft mit dem Kurier klären).",
  },
  "livrare.ridicare_section": { ro: "Ridicare personală", en: "Personal pickup", de: "Persönliche Abholung" },
  "livrare.gratuita": { ro: "Gratuită.", en: "Free.", de: "Kostenlos." },
  "livrare.adresa": { ro: "Adresă:", en: "Address:", de: "Adresse:" },
  "livrare.program": {
    ro: "Program: Luni – Vineri, 08:00 – 17:00. Programarea se face telefonic.",
    en: "Hours: Mon – Fri, 08:00 – 17:00. Scheduling is done by phone.",
    de: "Öffnungszeiten: Mo – Fr, 08:00 – 17:00. Die Terminvereinbarung erfolgt telefonisch.",
  },
  "livrare.plata_section": { ro: "Plată", en: "Payment", de: "Zahlung" },
  "livrare.ramburs": { ro: "Plata Ramburs / la livrare", en: "Cash on delivery", de: "Nachnahme" },
  "livrare.numerar": { ro: "numerar la livrare sau ridicare", en: "cash on delivery or pickup", de: "Bar bei Lieferung oder Abholung" },
  "livrare.fara_card": {
    ro: "Nu acceptăm plăți cu cardul sau online la momentul comenzii.",
    en: "We do not accept card or online payments at the time of order.",
    de: "Wir akzeptieren zum Zeitpunkt der Bestellung keine Karten- oder Online-Zahlungen.",
  },
  "livrare.factura": {
    ro: "Factura se emite la cerere, pentru comenzile de la persoană juridică.",
    en: "Invoice is issued upon request, for orders from legal entities.",
    de: "Rechnung wird auf Anfrage ausgestellt, für Bestellungen von juristischen Personen.",
  },
  "livrare.note_section": { ro: "Note", en: "Notes", de: "Hinweise" },
  "livrare.fare_anulare": {
    ro: "Produsele comandate nu pot fi anulate după confirmarea telefonică.",
    en: "Ordered products cannot be canceled after phone confirmation.",
    de: "Bestellte Produkte können nach telefonischer Bestätigung nicht storniert werden.",
  },
  "livrare.diferente_culoare": {
    ro: "Diferențe de culoare între monitor și produsul real pot apărea datorită calibrării ecranului.",
    en: "Color differences between monitor and actual product may occur due to screen calibration.",
    de: "Farbunterschiede zwischen Monitor und tatsächlichem Produkt können aufgrund der Kalibrierung des Bildschirms auftreten.",
  },
  "livrare.adaptata": {
    ro: "Această pagină este adaptată din",
    en: "This page is adapted from",
    de: "Diese Seite ist adaptiert von",
  },

  // Cere Oferta
  "cere.title": { ro: "Cere o Ofertă", en: "Request a Quote", de: "Angebot anfordern" },
  "cere.subtitle": {
    ro: "Completează formularul și te vom contacta telefonic cu o ofertă personalizată.",
    en: "Fill out the form and we will contact you by phone with a personalized quote.",
    de: "Füllen Sie das Formular aus, und wir werden Sie telefonisch mit einem individuellen Angebot kontaktieren.",
  },
  "cere.nume": { ro: "Nume complet", en: "Full name", de: "Vollständiger Name" },
  "cere.telefon": { ro: "Telefon", en: "Phone", de: "Telefon" },
  "cere.email": { ro: "Email (opțional)", en: "Email (optional)", de: "E-Mail (optional)" },
  "cere.produs": { ro: "Produs (opțional)", en: "Product (optional)", de: "Produkt (optional)" },
  "cere.latime": { ro: "Lățime (cm)", en: "Width (cm)", de: "Breite (cm)" },
  "cere.inaltime": { ro: "Înălțime (cm)", en: "Height (cm)", de: "Höhe (cm)" },
  "cere.culoare": { ro: "Preferință culoare", en: "Color preference", de: "Farbpräferenz" },
  "cere.mesaj": { ro: "Mesaj (opțional)", en: "Message (optional)", de: "Nachricht (optional)" },
  "cere.trimite": { ro: "Trimite solicitarea →", en: "Send request →", de: "Anfrage senden →" },
  "cere.multumim": { ro: "Mulțumim!", en: "Thank you!", de: "Vielen Dank!" },
  "cere.inregistrat": {
    ro: "Solicitarea ta a fost înregistrată. Te vom contacta în curând.",
    en: "Your request has been registered. We will contact you soon.",
    de: "Ihre Anfrage wurde registriert. Wir werden uns bald bei Ihnen melden.",
  },

  // Politica Cookies
  "cookies.title": { ro: "Politica de Cookies", en: "Cookie Policy", de: "Cookie-Richtlinie" },
  "cookies.intro": {
    ro: "Această pagină descrie cookies utilizate de Baustoffe (operat de Best Baustoffe SRL) pe acest site.",
    en: "This page describes cookies used by Baustoffe (operated by Best Baustoffe SRL) on this site.",
    de: "Diese Seite beschreibt die von Baustoffe (betrieben von Best Baustoffe SRL) auf dieser Website verwendeten Cookies.",
  },
  "cookies.ce_sunt": { ro: "Ce sunt cookies?", en: "What are cookies?", de: "Was sind Cookies?" },
  "cookies.ce_sunt_desc": {
    ro: "Cookies sunt fișiere text mici stocate pe dispozitivul când vizitezi un site. Sunt utilizate pentru a face site-ul funcțional și pentru a îmbunătăți experiența utilizatorului.",
    en: "Cookies are small text files stored on your device when you visit a site. They are used to make the site functional and to improve the user experience.",
    de: "Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie eine Website besuchen. Sie werden verwendet, um die Website funktionsfähig zu machen und das Benutzererlebnis zu verbessern.",
  },
  "cookies.utilizate": { ro: "Cookies utilizate de acest site", en: "Cookies used by this site", de: "Von dieser Website verwendete Cookies" },
  "cookies.necesar": { ro: "Cookie de sesiune coș", en: "Cart session cookie", de: "Warenkorb-Sitzungs-Cookie" },
  "cookies.necesar_desc": {
    ro: "Stochează ID-ul sesiunii coșului de cumpărături pentru a păstra produsele adăugate. Fără acest cookie, coșul nu funcționează.",
    en: "Stores the shopping cart session ID to keep added products. Without this cookie, the cart does not work.",
    de: "Speichert die Warenkorb-Sitzungs-ID, um hinzugefügte Produkte zu behalten. Ohne dieses Cookie funktioniert der Warenkorb nicht.",
  },
  "cookies.limba": { ro: "Cookie preferință limbă", en: "Language preference cookie", de: "Sprachpräferenz-Cookie" },
  "cookies.limba_desc": {
    ro: "Stochează limba selectată (RO/EN/DE) pentru a afișa site-ul în limba preferată la vizitele ulterioare.",
    en: "Stores the selected language (RO/EN/DE) to display the site in the preferred language on subsequent visits.",
    de: "Speichert die ausgewählte Sprache (RO/EN/DE), um die Website bei späteren Besuchen in der bevorzugten Sprache anzuzeigen.",
  },
  "cookies.gtm": { ro: "Google Tag Manager / GA4", en: "Google Tag Manager / GA4", de: "Google Tag Manager / GA4" },
  "cookies.gtm_desc": {
    ro: "Dacă este configurat, GTM poate seta cookies pentru Google Analytics 4 și alte instrumente de analiză. Acestea sunt opționale și pot fi dezactivate prin consimțământ.",
    en: "If configured, GTM may set cookies for Google Analytics 4 and other analytics tools. These are optional and can be disabled through consent.",
    de: "Wenn konfiguriert, kann GTM Cookies für Google Analytics 4 und andere Analyse-Tools setzen. Diese sind optional und können durch Zustimmung deaktiviert werden.",
  },
  "cookies.control": { ro: "Controlul cookies", en: "Cookie control", de: "Cookie-Steuerung" },
  "cookies.control_desc": {
    ro: "Poți șterge cookies din setările browserului. Cookies esențiali (sesiune coș, limbă) sunt necesare pentru funcționalitatea site-ului.",
    en: "You can delete cookies from your browser settings. Essential cookies (cart session, language) are necessary for site functionality.",
    de: "Sie können Cookies in Ihren Browsereinstellungen löschen. Wesentliche Cookies (Warenkorb-Sitzung, Sprache) sind für die Funktionalität der Website erforderlich.",
  },
  "cookies.contact": { ro: "Contact", en: "Contact", de: "Kontakt" },
  "cookies.contact_desc": {
    ro: "Pentru întrebări despre cookies, contactează-ne la 0759 378 281.",
    en: "For questions about cookies, contact us at 0759 378 281.",
    de: "Bei Fragen zu Cookies kontaktieren Sie uns unter 0759 378 281.",
  },

  // GDPR
  "gdpr.title": { ro: "Drepturile tale GDPR", en: "Your GDPR Rights", de: "Ihre DSGVO-Rechte" },
  "gdpr.controller": { ro: "Operator de date", en: "Data controller", de: "Datenverantwortlicher" },
  "gdpr.controller_name": { ro: "Best Baustoffe SRL", en: "Best Baustoffe SRL", de: "Best Baustoffe SRL" },
  "gdpr.intro": {
    ro: "Conform Regulamentului (UE) 2016/679 (GDPR), ai următoarele drepturi în legătură cu datele personale prelucrate de Baustoffe:",
    en: "Under Regulation (EU) 2016/679 (GDPR), you have the following rights regarding personal data processed by Baustoffe:",
    de: "Gemäß der Verordnung (EU) 2016/679 (DSGVO) haben Sie die folgenden Rechte in Bezug auf die von Baustoffe verarbeiteten personenbezogenen Daten:",
  },
  "gdpr.acces": { ro: "Dreptul de acces", en: "Right of access", de: "Recht auf Auskunft" },
  "gdpr.acces_desc": {
    ro: "Poți solicita o copie a datelor personale pe care le deținem despre tine.",
    en: "You can request a copy of the personal data we hold about you.",
    de: "Sie können eine Kopie der personenbezogenen Daten anfordern, die wir über Sie speichern.",
  },
  "gdpr.rectificare": { ro: "Dreptul la rectificare", en: "Right to rectification", de: "Recht auf Berichtigung" },
  "gdpr.rectificare_desc": {
    ro: "Poți solicita corectarea datelor inexacte sau incomplete.",
    en: "You can request correction of inaccurate or incomplete data.",
    de: "Sie können die Berichtigung unvollständiger oder unrichtiger Daten verlangen.",
  },
  "gdpr.stergere": { ro: "Dreptul la ștergere", en: "Right to erasure", de: "Recht auf Löschung" },
  "gdpr.stergere_desc": {
    ro: "Poți solicita ștergerea datelor personale, cu excepția cazurile în care legea impune păstrarea lor (ex. facturi).",
    en: "You can request erasure of personal data, except where law requires retention (e.g. invoices).",
    de: "Sie können die Löschung personenbezogener Daten verlangen, es sei denn, die Aufbewahrung ist gesetzlich vorgeschrieben (z.B. Rechnungen).",
  },
  "gdpr.portabilitate": { ro: "Dreptul la portabilitate", en: "Right to data portability", de: "Recht auf Datenübertragbarkeit" },
  "gdpr.portabilitate_desc": {
    ro: "Poți solicita transferul datelor către alt operator, într-un format structurat.",
    en: "You can request transfer of data to another controller, in a structured format.",
    de: "Sie können die Übertragung der Daten an einen anderen Verantwortlichen in einem strukturierten Format verlangen.",
  },
  "gdpr.opozitie": { ro: "Dreptul de opoziție", en: "Right to object", de: "Widerspruchsrecht" },
  "gdpr.opozitie_desc": {
    ro: "Poți să te opui prelucrării datelor în anumite circumstanțe.",
    en: "You can object to data processing in certain circumstances.",
    de: "Sie können der Datenverarbeitung unter bestimmten Umständen widersprechen.",
  },
  "gdpr.retragere": { ro: "Dreptul la retragerea consimțământului", en: "Right to withdraw consent", de: "Recht auf Widerruf der Einwilligung" },
  "gdpr.retragere_desc": {
    ro: "Poți retrage consimțământul oricând, fără a afecta legalitatea prelucrării anterioare.",
    en: "You can withdraw consent at any time, without affecting the lawfulness of prior processing.",
    de: "Sie können die Einwilligung jederzeit widerrufen, ohne die Rechtmäßigkeit der vorherigen Verarbeitung zu beeinträchtigen.",
  },
  "gdpr.autoritate": { ro: "Autoritatea de supraveghere", en: "Supervisory authority", de: "Aufsichtsbehörde" },
  "gdpr.autoritate_desc": {
    ro: "Ai dreptul să depui o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP) — www.dataprotection.ro.",
    en: "You have the right to lodge a complaint with the National Supervisory Authority for Personal Data Processing (ANSPDCP) — www.dataprotection.ro.",
    de: "Sie haben das Recht, sich bei der nationalen Aufsichtsbehörde für die Verarbeitung personenbezogener Daten (ANSPDCP) zu beschweren — www.dataprotection.ro.",
  },
  "gdpr.contact": { ro: "Contact", en: "Contact", de: "Kontakt" },
  "gdpr.contact_desc": {
    ro: "Pentru exercitarea drepturilor GDPR, contactează-ne la 0759 378 281 sau la adresa din Jud. Vâlcea, Sat Câinenii Mici, Comuna Câineni, Strada Cazacilor, Nr. 9.",
    en: "To exercise your GDPR rights, contact us at 0759 378 281 or at the address in Jud. Vâlcea, Sat Câinenii Mici, Comuna Câineni, Strada Cazacilor, Nr. 9.",
    de: "Um Ihre DSGVO-Rechte auszuüben, kontaktieren Sie uns unter 0759 378 281 oder unter der Adresse in Jud. Vâlcea, Sat Câinenii Mici, Comuna Câineni, Strada Cazacilor, Nr. 9.",
  },

  // Privacy
  "privacy.title": { ro: "Politica de Confidențialitate", en: "Privacy Policy", de: "Datenschutzrichtlinie" },
  "privacy.intro": {
    ro: "Baustoffe (operat de Best Baustoffe SRL) respectă confidențialitatea vizitatorilor săi. Această politică descrie ce date colectăm și cum le folosim.",
    en: "Baustoffe (operated by Best Baustoffe SRL) respects the privacy of its visitors. This policy describes what data we collect and how we use it.",
    de: "Baustoffe (betrieben von Best Baustoffe SRL) respektiert die Privatsphäre seiner Besucher. Diese Richtlinie beschreibt, welche Daten wir erheben und wie wir sie verwenden.",
  },
  "privacy.operator": { ro: "Operatorul de date", en: "Data controller", de: "Datenverantwortlicher" },
  "privacy.operator_name": { ro: "Best Baustoffe SRL", en: "Best Baustoffe SRL", de: "Best Baustoffe SRL" },
  "privacy.date_colectate": { ro: "Date colectate", en: "Data collected", de: "Erhobene Daten" },
  "privacy.date_colectate_desc": {
    ro: "Colectăm datele pe care le furnizezi voluntar: nume, telefon, email, adresă de livrare — prin formularele de comandă, contact și cerere ofertă. Nu colectăm date sensibile (etnie, religie, sănătate, etc.).",
    en: "We collect data you voluntarily provide: name, phone, email, delivery address — through order, contact, and quote request forms. We do not collect sensitive data (ethnicity, religion, health, etc.).",
    de: "Wir erheben Daten, die Sie freiwillig angeben: Name, Telefon, E-Mail, Lieferadresse — über Bestell-, Kontakt- und Angebotsanfrageformulare. Wir erheben keine sensiblen Daten (Ethnie, Religion, Gesundheit usw.).",
  },
  "privacy.scop": { ro: "Scopul prelucrării", en: "Purpose of processing", de: "Zweck der Verarbeitung" },
  "privacy.scop_desc": {
    ro: "Datele sunt prelucrate pentru: procesarea comenzilor, livrarea produselor, comunicarea cu tine, emiterea facturilor și îndeplinirea obligațiilor legale.",
    en: "Data is processed for: order processing, product delivery, communication with you, invoicing, and fulfilling legal obligations.",
    de: "Daten werden verarbeitet für: Bestellabwicklung, Produktlieferung, Kommunikation mit Ihnen, Rechnungsstellung und Erfüllung gesetzlicher Verpflichtungen.",
  },
  "privacy.baza_legala": { ro: "Baza legală", en: "Legal basis", de: "Rechtsgrundlage" },
  "privacy.baza_legala_desc": {
    ro: "Prelucrarea se bazează pe: executarea unui contract (comandă), consimțământul (GDPR), obligații legale și interesul legitim (comunicare post-comandă).",
    en: "Processing is based on: contract performance (order), consent (GDPR), legal obligations, and legitimate interest (post-order communication).",
    de: "Die Verarbeitung basiert auf: Vertragserfüllung (Bestellung), Einwilligung (DSGVO), gesetzliche Verpflichtungen und berechtigtes Interesse (Kommunikation nach der Bestellung).",
  },
  "privacy.pastrarea": { ro: "Păstrarea datelor", en: "Data retention", de: "Datenspeicherung" },
  "privacy.pastrarea_desc": {
    ro: "Datele comenzilor sunt păstrate conform obligațiilor legale (facturi: 5 ani). Datele de contact pentru oferte sunt păstrate 12 luni.",
    en: "Order data is retained per legal obligations (invoices: 5 years). Contact data for quotes is retained for 12 months.",
    de: "Bestelldaten werden gemäß gesetzlichen Verpflichtungen aufbewahrt (Rechnungen: 5 Jahre). Kontaktdaten für Angebote werden 12 Monate aufbewahrt.",
  },
  "privacy.subprocesori": { ro: "Subprocesori", en: "Sub-processors", de: "Sub-Verarbeiter" },
  "privacy.subprocesori_desc": {
    ro: "Folosim următorii subprocesori: Supabase (bază de date), Brevo (email tranzacțional), Google Tag Manager / GA4 (analiză web). Toți subprocesorii sunt contractuați pentru a proteja datele conform GDPR.",
    en: "We use the following sub-processors: Supabase (database), Brevo (transactional email), Google Tag Manager / GA4 (web analytics). All sub-processors are contracted to protect data per GDPR.",
    de: "Wir verwenden die folgenden Sub-Verarbeiter: Supabase (Datenbank), Brevo (Transaktions-E-Mail), Google Tag Manager / GA4 (Web-Analyse). Alle Sub-Verarbeiter sind vertraglich verpflichtet, Daten gemäß DSGVO zu schützen.",
  },
  "privacy.transfer": { ro: "Transferuri internaționale", en: "International transfers", de: "Internationale Übermittlungen" },
  "privacy.transfer_desc": {
    ro: "Subprocesorii noștri pot stoca date în UE/EEE. În caz de transfer în afara UE, se aplică garanții contractuale standard (SCC).",
    en: "Our sub-processors may store data in the EU/EEA. In case of transfer outside the EU, standard contractual clauses (SCC) apply.",
    de: "Unsere Sub-Verarbeiter können Daten in der EU/EWR speichern. Im Falle einer Übermittlung außerderhalb der EU gelten Standardvertragsklauseln (SVK).",
  },
  "privacy.drepturi": { ro: "Drepturile tale", en: "Your rights", de: "Ihre Rechte" },
  "privacy.drepturi_desc": {
    ro: "Ai dreptul de acces, rectificare, ștergere, portabilitate, opoziție și retragere a consimțământului. Detalii complete în pagina GDPR.",
    en: "You have the right of access, rectification, erasure, portability, objection, and withdrawal of consent. Full details on the GDPR page.",
    de: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Datenübertragbarkeit, Widerspruch und Widerruf der Einwilligung. Vollständige Details auf der DSGVO-Seite.",
  },
  "privacy.contact": { ro: "Contact", en: "Contact", de: "Kontakt" },
  "privacy.contact_desc": {
    ro: "Pentru întrebări despre confidențialitate, contactează-ne la 0759 378 281.",
    en: "For privacy questions, contact us at 0759 378 281.",
    de: "Bei Fragen zum Datenschutz kontaktieren Sie uns unter 0759 378 281.",
  },

  // Terms
  "terms.title": { ro: "Termeni și Condiții", en: "Terms & Conditions", de: "AGB" },
  "terms.intro": {
    ro: "Acești termeni și condiții regulează utilizarea site-ului Baustoffe și plasarea comenzilor.",
    en: "These terms and conditions govern the use of the Baustoffe site and the placement of orders.",
    de: "Diese AGB regeln die Nutzung der Baustoffe-Website und die Aufgabe von Bestellungen.",
  },
  "terms.operator": { ro: "Operator", en: "Operator", de: "Betreiber" },
  "terms.operator_name": { ro: "Best Baustoffe SRL", en: "Best Baustoffe SRL", de: "Best Baustoffe SRL" },
  "terms.comanda": { ro: "Comenzi", en: "Orders", de: "Bestellungen" },
  "terms.comanda_desc": {
    ro: "Comanda plasată prin site este o ofertă de cumprare. Contractul de vânzare-cumpărare se încheie după confirmarea telefonică a comenzii de către Baustoffe.",
    en: "An order placed through the site is a purchase offer. The sales contract is concluded after phone confirmation of the order by Baustoffe.",
    de: "Eine über die Website aufgegebene Bestellung ist ein Kaufangebot. Der Kaufvertrag kommt zustande, nachdem die Bestellung telefonisch von Baustoffe bestätigt wurde.",
  },
  "terms.preturi": { ro: "Prețuri", en: "Prices", de: "Preise" },
  "terms.preturi_desc": {
    ro: "Prețurile afișate sunt în RON și includ TVA. Prețul poate fi modificat de operator înainte de confirmarea comenzii.",
    en: "Displayed prices are in RON and include VAT. The price may be changed by the operator before order confirmation.",
    de: "Die angezeigten Preise sind in RON und enthalten die Mehrwertsteuer. Der Preis kann vom Betreiber vor der Bestätigung der Bestellung geändert werden.",
  },
  "terms.livrare": { ro: "Livrare", en: "Delivery", de: "Lieferung" },
  "terms.livrare_desc": {
    ro: "Livrarea se face în toată România la taxa de 150 RON sau gratuit la ridicarea din Sibiu. Termenul de livrare este estimativ.",
    en: "Delivery is made nationwide at a fee of 150 RON or free for pickup in Sibiu. Delivery time is estimated.",
    de: "Die Lieferung erfolgt in ganz Rumänien gegen eine Gebühr von 150 RON oder kostenlos bei Abholung in Sibiu. Die Lieferzeit ist geschätzt.",
  },
  "terms.plata": { ro: "Plată", en: "Payment", de: "Zahlung" },
  "terms.plata_desc": {
    ro: "Plata se face numerar la livrare (ramburs) sau la ridicare. Nu acceptăm plăți cu cardul sau online.",
    en: "Payment is made in cash upon delivery (cash on delivery) or upon pickup. We do not accept card or online payments.",
    de: "Die Zahlung erfolgt bar bei Lieferung (Nachnahme) oder bei Abholung. Wir akzeptieren keine Karten- oder Online-Zahlungen.",
  },
  "terms.retragere": { ro: "Dreptul de retragere", en: "Right of withdrawal", de: "Widerrufsrecht" },
  "terms.retragere_desc": {
    ro: "Conform OUG 34/2014, ai dreptul să te retragi din contract în 14 zile de la primirea produsului, fără a fi nevoit să precizezi motivul. Pentru produse comandate la dimensiune personalizată, acest drept poate fi exceptat conform art. 16 lit. c) din OUG 34/2014 (produse personalizate).",
    en: "Under OUG 34/2014, you have the right to withdraw from the contract within 14 days of receiving the product, without giving a reason. For custom-sized products, this right may be exempt under Art. 16 lit. c) of OUG 34/2014 (customized products).",
    de: "Gemäß OUG 34/2014 haben Sie das Recht, innerhalb von 14 Tagen nach Erhalt des Produkts ohne Angabe von Gründen vom Vertrag zurückzutreten. Bei Sondergrößenprodukten kann dieses Recht gemäß Art. 16 lit. c) der OUG 34/2014 (personalisierte Produkte) ausgenommen sein.",
  },
  "terms.raspundere": { ro: "Răspundere", en: "Liability", de: "Haftung" },
  "terms.raspundere_desc": {
    ro: "Baustoffe nu este responsabil pentru daune rezultate din utilizarea necorespunzătoare a produselor sau din nerespectarea instrucțiunilor de montaj.",
    en: "Baustoffe is not liable for damages resulting from improper use of products or failure to follow installation instructions.",
    de: "Baustoffe haftet nicht für Schäden, die aus unsachgemäßer Verwendung der Produkte oder Nichtbeachtung der Montageanweisungen resultieren.",
  },
  "terms.legea": { ro: "Legea aplicabilă", en: "Applicable law", de: "Anwendbares Recht" },
  "terms.legea_desc": {
    ro: "Acești termeni sunt guvernați de lega română. Litigiile se soluționează de instanțele competente din România.",
    en: "These terms are governed by Romanian law. Disputes are resolved by the competent courts in Romania.",
    de: "Diese AGB unterliegen rumänischem Recht. Streitigkeiten werden von den zuständigen Gerichten in Rumänien beigelegt.",
  },
  "terms.contact": { ro: "Contact", en: "Contact", de: "Kontakt" },
  "terms.contact_desc": {
    ro: "Pentru întrebări despre acești termeni, contactează-ne la 0759 378 281.",
    en: "For questions about these terms, contact us at 0759 378 281.",
    de: "Bei Fragen zu diesen AGB kontaktieren Sie uns unter 0759 378 281.",
  },
} as const;

export type TranslationKey = keyof typeof dict;

export function translate(key: TranslationKey, locale: Locale): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[locale] || entry[defaultLocale] || key;
}
