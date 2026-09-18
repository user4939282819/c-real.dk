export const company = {
  name: 'C-Real',
  legalName: 'C-Real ApS',
  cvr: '45487342',
  ftid: '23377',
  address: 'Bredgade 45B, 1260 København K',
  regulator:
    'C-Real er registreret hos Finanstilsynet som forvalter af alternative investeringsfonde.',
};

export const photos = {
  nordhavn: '/photos/cph-1729457997.jpg',
  spire: '/photos/cph-1742160813.jpg',
  skyline: '/photos/cph-1635861674.jpg',
  dome: '/photos/cph-1775627602.jpg',
  christianshavn: '/photos/cph-1584048140.jpg',
  lakes: '/photos/cph-1584048139.jpg',
  circles: '/photos/cph-1698317475.jpg',
  aboutLeft: '/photos/about-left.jpg',
  aboutRight: '/photos/about-right.jpg',
  footer: '/photos/footer.jpg',
};

export const nav = {
  left: [
    { label: 'Om C-Real', href: '#om' },
    { label: 'Investeringstyper', href: '#investeringstyper' },
    { label: 'Projekter', href: '#projekter' },
    { label: 'Team', href: '#team' },
  ],
  cta: { label: 'Kontakt os', href: '#kontakt' },
};

export const hero = {
  headline: ['Vi investerer i', 'udvikling og udlejning', 'af ejendomme'],
  text: 'Databaseret byudvikling og ejendomsudvikling. C-Real er registreret hos Finanstilsynet som forvalter af alternative investeringsfonde.',
  primary: { label: 'Se projekter', href: '#projekter' },
  secondary: { label: 'Bestil udbudsmateriale', href: '#udbud' },
  /* Their own hero background film from c-real.dk, moved here from Track Record. */
  video: '/video/track-record-bg.mov',
};

export const about = {
  title: ['Databaseret byudvikling', 'og ejendomsudvikling'],
  text: 'C-Real er et investeringshus inden for fast ejendom med investeringer i udviklingsprojekter og udlejningsejendomme som speciale.',
  body: [
    'Projekter udbudt af C-Real er kendetegnet ved at være sunde og stabile samt baseret på dybdegående analyser af markedet. Eksempelvis analyserer C-Real det danske boligmarked og ejendomsmarked på både makroniveau og mikroniveau for at undersøge flyttemønstre og afdække, hvilke boligtyper der efterspørges.',
    'C-Real er registreret hos Finanstilsynet som forvalter af alternative investeringsfonde.',
  ],
};

export const stats = [
  { value: 21, decimals: 0, suffix: '', label: 'Antal projekter', icon: 'layers' },
  { value: 1700000, decimals: 0, suffix: '', label: 'Antal kvadratmeter', icon: 'area' },
  { value: 30.3, decimals: 1, suffix: ' %', label: 'Realiseret afkast, Troldebakkerne', icon: 'percent', positive: true },
  { value: 105, decimals: 0, suffix: '', label: 'Boliger under opførelse', icon: 'building' },
];

export const ticker = [
  'Databaseret ejendomsudvikling',
  'Registreret hos Finanstilsynet',
  'Udviklingsprojekter',
  'Udlejningsejendomme',
  'Bredgade, København K',
];

export const projects = {
  title: 'Projekter',
  sub: 'Projekter udbudt af C-Real, realiseret og under opførelse.',
  note: '*Efter omkostninger',
  items: [
    {
      name: 'C-Real Troldebakkerne',
      status: 'Afsluttet',
      photo: '/projects/troldebakkerne.jpg',
      headline: { value: 30.3, decimals: 1, label: 'Realiseret afkast*' },
      facts: [
        { label: 'Lokation', value: 'Helsinge' },
        { label: 'Investeringstype', value: 'Byggemodning' },
        { label: 'Forventet afkast', value: '26 %' },
        { label: 'Investeringsperiode', value: '9 måneder' },
        { label: 'Realiseret afkast', value: '30,3 %*', positive: true },
      ],
    },
    {
      name: 'C-Real Troldebakkerne II',
      status: 'Fuldtegnet',
      photo: '/projects/troldebakkerne-ii.jpg',
      headline: { value: 20.18, decimals: 2, label: 'Forventet afkast*' },
      facts: [
        { label: 'Lokation', value: 'Helsinge' },
        { label: 'Investeringstype', value: 'Opførelse' },
        { label: 'Antal enheder', value: '105 lejligheder' },
        { label: 'Investeringsperiode', value: '18 måneder' },
        { label: 'Forventet afkast', value: '20,18 %*', positive: true },
      ],
    },
  ],
  more: 'Bestil udbudsmateriale',
};

export const investmentTypes = {
  title: 'Investeringstyper',
  sub: 'Fire faser i ejendomsudviklingen, hver med sin egen horisont og afkastprofil.',
  items: [
    {
      name: 'Lokalplan',
      lead: 'Barmark, råjord og transformationsprojekter',
      text: 'Råjord og barmarksarealer transformeres til jord, der må bygges på. Afkastet realiseres, når lokalplanen vedtages, og jorden sælges til investor.',
      horizon: '9 til 24 måneder',
      yieldValue: 25,
      photo: '/photos/cph-1698317475.jpg',
    },
    {
      name: 'Byggetilladelse',
      lead: 'Grund til et fuldt realiseret byggeprojekt',
      text: 'Byggemodning af jord frem til et fuldt realiserbart byggeprojekt. Projektet konkretiseres arkitektonisk, teknisk og budgetmæssigt.',
      horizon: '9 til 18 måneder',
      yieldValue: 20,
      photo: '/photos/cph-1742160813.jpg',
    },
    {
      name: 'Opførelse',
      lead: 'Gennemførsel af byggeri',
      text: 'Gennemførelse af byggeprojektet med fastlagte budgetter og tidsrammer. Afkastet realiseres ved salg af det færdigopførte byggeri.',
      horizon: '12 til 18 måneder',
      yieldValue: 15,
      photo: '/photos/cph-1729457997.jpg',
    },
    {
      name: 'Udlejning',
      lead: 'Udbytte og opsparing',
      text: 'Drift og udlejning af ejendomme. Afkastet genereres løbende fra driftsudbyttet og gældsnedbringelse.',
      horizon: 'Løbende',
      yieldValue: 7,
      photo: '/photos/cph-1584048140.jpg',
    },
  ],
};

export const expertise = {
  title: 'Vores fokus',
  sub: 'Vi investerer på tværs af udviklingsprojekter og udlejningsejendomme.',
  cards: [
    {
      title: 'Udviklingsprojekter',
      text: 'Fra lokalplan og byggetilladelse til opførelse af færdige boliger.',
      video: '/video/cph-city.mp4',
    },
    {
      title: 'Udlejningsejendomme',
      text: 'Stabile, driftsoptimerede ejendomme med løbende udbytte og opsparing.',
      photo: '/photos/udlejning-ejendomme.jpg',
    },
  ],
};

export const process = {
  title: 'Vores tilgang',
  sub: 'Analysen gennemføres i to hovedfaser: først en landsdækkende makroanalyse, dernæst en mikroanalyse, der identificerer de mest attraktive lokationer.',
  quote: 'Kombinationen af makroanalyse og mikroanalyse sikrer, at investeringer foretages på et solidt grundlag.',
  quoteBy: 'Christian Sørensen, Chief Development Officer',
  steps: [
    {
      title: 'Makroanalyse',
      scope: 'Regioner, landsdele og kommuner',
      text: 'Formålet er at identificere Danmarks mest attraktive vækstzoner med potentiale for stabile afkast og værdistigninger. Analysen foretages på tværs af regioner, landsdele og kommuner.',
      photo: '/phases/lokalplan.jpg',
      icon: 'search',
    },
    {
      title: 'Mikroanalyse',
      scope: 'Byer og konkrete lokationer',
      text: 'Første trin identificerer de mest attraktive byer inden for en udvalgt region, landsdel eller kommune. Andet trin vurderer detaljeret, hvor investeringspotentialet er størst inden for den valgte by.',
      photo: '/photos/cph-1742160813.jpg',
      icon: 'pin',
    },
    {
      title: 'Projektering',
      scope: 'Arkitektur, teknik og budget',
      text: 'Projektet konkretiseres arkitektonisk, teknisk og budgetmæssigt med projektering og myndighedsdialog frem mod byggetilladelse.',
      video: '/video/projektering.mp4',
      icon: 'layers',
    },
    {
      title: 'Realisering',
      scope: 'Byggeri, salg eller udlejning',
      text: 'Byggeriet gennemføres med fastlagte budgetter og tidsrammer, hvorefter afkastet realiseres for investorerne ved salg eller løbende udlejning.',
      photo: '/photos/realisering.jpg',
      icon: 'check',
    },
  ],
};

export const team = {
  title: 'Menneskene bag',
  sub: 'Ledelsen, der står bag analysen, projekterne og dialogen med investorerne.',
  people: [
    { name: 'Benny Buchardt Andersen', role: 'Chief Executive Officer', email: 'bba@c-real.dk', phone: '+45 2338 3476', photo: '/team/benny.jpg' },
    { name: 'Christian Sørensen', role: 'Chief Development Officer', email: 'chs@c-real.dk', phone: '+45 2944 4592', photo: '/team/christian.jpg' },
    { name: 'Gustav Edgard', role: 'Chief Operating Officer', email: 'gue@c-real.dk', phone: '+45 4272 7681', photo: '/team/gustav.jpg' },
    { name: 'Jesper Stolbjerg', role: 'Chief Financial Officer', email: 'jes@c-real.dk', phone: '+45 3140 0770', photo: '/team/jesper.jpg' },
  ],
  call: 'Ring',
};

export const video = {
  src: 'https://c-real.dk/wp-content/uploads/2026-05-27-CHS-lang.mp4',
  heading: 'Investeringer på et solidt grundlag',
  quote:
    'Kombinationen af makroanalyse og mikroanalyse sikrer, at investeringer foretages på et solidt grundlag.',
  name: 'Christian Sørensen',
  role: 'Chief Development Officer',
  sound: 'Slå lyd til',
  mute: 'Slå lyd fra',
  watch: 'Se filmen med lyd',
};

export const salesTeam = {
  title: 'Tal med os',
  sub: 'Har du spørgsmål til et projekt eller vil du have tilsendt udbudsmateriale, så ring direkte.',
  people: [
    {
      name: 'Nicklas Mikkelsen',
      role: 'Head of Investor Communication & Reporting',
      phone: '+45 4422 0499',
      email: 'nmm@c-real.dk',
      photo: '/team/nicklas.jpg',
    },
    {
      name: 'Kevin Pedersen',
      role: 'Investment Consultant',
      phone: '+45 3820 0658',
      email: 'kwp@c-real.dk',
      photo: '/team/kevin.jpg',
    },
    {
      name: 'Kenneth Lindblad',
      role: 'Investment Consultant',
      phone: '+45 3820 0656',
      email: 'kel@c-real.dk',
      photo: '/team/kenneth.jpg',
    },
  ],
  call: 'Ring',
  write: 'Skriv',
};

export const banner = {
  quote: 'Projekter udbudt af C-Real er kendetegnet ved at være sunde og stabile samt baseret på dybdegående analyser af markedet.',
  author: 'C-Real',
  photo: '/photos/cph-1635861674.jpg',
  primary: { label: 'Se projekter', href: '#projekter' },
  secondary: { label: 'Bestil udbudsmateriale', href: '#udbud' },
};

export const contact = {
  title: ['Lad os tale om', 'din investering'],
  text: 'Udfyld formularen, så sender vi udbudsmateriale og KID for det aktuelle projekt.',
  phone: '+45 4422 0499',
  email: 'nmm@c-real.dk',
  contactName: 'Nicklas Mikkelsen, Head of Investor Communication & Reporting',
  formTitle: 'Dine oplysninger',
  fields: { name: 'Fulde navn', email: 'E-mail', phone: 'Telefonnummer' },
  typeLabel: 'Investeringstype',
  types: ['Lokalplan', 'Byggetilladelse', 'Opførelse', 'Udlejning'],
  investorLabel: 'Investerer som',
  investorOptions: ['Privat', 'Selskab'],
  sizeLabel: 'Investeringsramme',
  sizeOptions: ['DKK 750.000 til 2 mio.', 'DKK 2 til 5 mio.', 'DKK 5 til 10 mio.', 'Over DKK 10 mio.'],
  submit: 'Send',
  success: 'Tak. Vi sender materialet til din e-mail.',
};

export const investorContact = {
  name: 'Nicklas Mikkelsen',
  role: 'Head of Investor Communication & Reporting',
  phone: '+45 4422 0499',
  email: 'nmm@c-real.dk',
  photo: '/team/nicklas.jpg',
  intro: 'Har du spørgsmål til et projekt eller vil du have tilsendt udbudsmateriale, så ring direkte til Nicklas.',
  cta: 'Ring til Nicklas',
  bubbleLabel: 'Tal med en investeringsrådgiver',
  bubbleCollapsed: 'Kontakt os',
};

export const skipLink = { label: 'Videre til indhold', target: '#main' };

/** The full investor-material dossier for the current fund, matching the order page on c-real.dk. */
export const dossier = {
  label: 'Om Fonden',
  status: 'Fuldtegnet',
  name: 'C-Real Troldebakkerne II ApS',
  photo: '/projects/troldebakkerne-ii-brochure.jpg',
  intro: [
    'C-Real Troldebakkerne II ApS er en attraktiv investeringsmulighed i gennemførelsen af et byggeprojekt på Troldebakkerne i Helsinge og derefter salg af projektet, når byggeriet er afsluttet, og de færdigopførte ejendomme er i drift.',
    'Projektgrunden er på 12.556 kvm, og det endelige boligareal er på 8.160 kvm. På nabogrundene er der allerede opført boligejendomme, og dette byggeprojekt er det sidste i området.',
  ],
  facts: [
    { label: 'Status', value: 'Fuldtegnet' },
    { label: 'Type', value: 'Opførsel' },
    { label: 'Boligareal', value: '8.160 kvm' },
    { label: 'Antal boliger', value: '105' },
    { label: 'Forventet afkast', value: '20,18 %*', positive: true },
    { label: 'Egenkapitalindskud', value: 'Op til DKK 74 mio.' },
    { label: 'Investeringsperiode', value: '18 måneder' },
    { label: 'Forventet exit', value: '4. kvartal 2027' },
    { label: 'Minimumsindskud', value: 'DKK 750.000' },
  ],
  note: '*Afkast er efter omkostninger.',
  formTitle: 'Bestil udbudsmateriale for C-Real Troldebakkerne II ApS',
  fields: { name: 'Navn', email: 'E-mail', phone: 'Telefon', postal: 'Postnummer' },
  consent:
    'Ja tak. Jeg giver samtykke til at modtage markedsføringsmateriale om investeringer på e-mail, SMS og telefon og gennem annoncering på de sociale medier fra C-Real ApS, da det er en betingelse for at modtage det ønskede materiale. Du kan altid trække dit samtykke tilbage ved at skrive til info@c-real.dk.',
  submit: 'Bestil materiale',
  success: 'Tak. Vi sender udbudsmaterialet til din e-mail.',
  kidLabel: 'PRIIPs Key Information Documents (KID)',
  kidLink: 'KID for C-Real Troldebakkerne II ApS, download',
};

export const location = {
  title: 'Find os',
  sub: 'Vi holder til på Bredgade i det indre København, få minutter fra Kongens Nytorv.',
  addressLines: ['C-Real ApS', 'Bredgade 45B', '1260 København K'],
  query: 'Bredgade 45B, 1260 København K, Danmark',
  google: 'Åbn i Google Maps',
  apple: 'Åbn i Apple Maps',
};

export const footer = {
  statement: ['Åben for nye investorer', 'og partnerskaber, der', 'skaber varige værdier.'],
  cta: 'Kontakt os',
  columns: [
    { items: ['Om C-Real', 'Investeringstyper', 'Projekter', 'Kontakt', 'Find os'] },
    { items: ['Cookiepolitik og privatlivspolitik', 'Juridiske erklæringer'] },
  ],
  /* Placeholders until C-Real supplies their real page URLs. */
  social: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'Trustpilot', href: '#' },
  ],
  copyright: '© 2026 C-Real ApS. Alle rettigheder forbeholdes.',
  photo: '/photos/footer.jpg',
};
