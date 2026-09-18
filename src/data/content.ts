export const company = {
  name: 'C-Real',
  legalName: 'C-Real ApS',
  cvr: '45487342',
  ftid: '23377',
  address: 'Bredgade 45B, 1260 København K',
  regulator:
    'C-Real er registreret hos Finanstilsynet som forvalter af alternative investeringsfonde.',
};

export const nav = [
  { label: 'Om C-Real', href: '#om' },
  { label: 'Investeringstyper', href: '#investeringstyper' },
  { label: 'Vores tilgang', href: '#tilgang' },
  { label: 'Track record', href: '#track-record' },
  { label: 'Aktuelle projekter', href: '#projekter' },
  { label: 'Kontakt', href: '#kontakt' },
];

export const hero = {
  eyebrow: 'Registreret hos Finanstilsynet · FTID 23377',
  headlineLines: ['Vi investerer i', 'udviklings- og', 'udlejningsejendomme'],
  subheadline: 'Databaseret by- og ejendomsudvikling',
  primaryCta: 'Bestil udbudsmateriale',
  secondaryCta: 'Se track record',
  marquee: [
    'Makroanalyse',
    'Mikroanalyse',
    'Lokalplan',
    'Byggetilladelse',
    'Opførsel',
    'Udlejning',
    'Flyttemønstre',
    'Boligefterspørgsel',
  ],
};

export const heroStats = [
  { value: 30.3, suffix: '%', label: 'Realiseret afkast', note: 'Troldebakkerne, efter omkostninger' },
  { value: 105, suffix: '', label: 'Boliger', note: 'Troldebakkerne II, under opførelse' },
  { value: 8160, suffix: ' kvm', label: 'Boligareal', note: 'Samlet i nuværende projekt' },
];

export const intro = {
  label: 'Om C-Real',
  statement:
    'C-Real er et investeringshus inden for fast ejendom med investeringer i udviklingsprojekter og udlejningsejendomme som speciale.',
  body: [
    'Vores projekter er sunde og stabile. Hvert projekt hviler på en grundig markedsanalyse af bolig- og ejendomsmarkedet på makro- og mikroniveau, flyttemønstre og boligefterspørgsel — før der allokeres kapital.',
    company.regulator,
  ],
};

export type InvestmentType = {
  id: string;
  index: string;
  name: string;
  icon: string;
  definition: string;
  workLabel: string;
  work: string;
  returnLabel: string;
  returnBody: string;
  horizon: string;
  yieldValue: number;
  yieldLabel: string;
};

export const investmentTypes: InvestmentType[] = [
  {
    id: 'lokalplan',
    index: '01',
    name: 'Lokalplan',
    icon: '/brand/icon-lokalplan.png',
    definition:
      'Gennem investeringstypen "Lokalplan" transformeres råjord og barmarksarealer til jord, der må bygges på.',
    workLabel: 'Forarbejde',
    work: 'Fokus på at identificere projektmuligheder med stort afkastpotentiale gennem C-Reals analysemetode.',
    returnLabel: 'Afkast',
    returnBody:
      'Realiseres når lokalplanen vedtages, og jorden kan sælges til investor.',
    horizon: '9–24 måneder',
    yieldValue: 25,
    yieldLabel: '+25%',
  },
  {
    id: 'byggetilladelse',
    index: '02',
    name: 'Byggetilladelse',
    icon: '/brand/icon-byggetilladelse.png',
    definition:
      'Investeringstypen "Byggetilladelse" omhandler byggemodning af jord frem til et fuldt realiserbart byggeprojekt.',
    workLabel: 'Forarbejde',
    work: 'Projektet konkretiseres arkitektonisk, teknisk og budgetmæssigt med projektering og myndighedsdialog.',
    returnLabel: 'Afkast',
    returnBody: 'Realiseres når projektet opnår byggetilladelse og sælges videre.',
    horizon: '9–18 måneder',
    yieldValue: 20,
    yieldLabel: '+20%',
  },
  {
    id: 'opforelse',
    index: '03',
    name: 'Opførelse',
    icon: '/brand/icon-byggeri.png',
    definition: 'I investeringstypen "Opførelse" gennemføres et byggeprojekt.',
    workLabel: 'Forarbejde',
    work: 'Budget- og tidsrammer fastlægges med bygherre- og projektledelse.',
    returnLabel: 'Afkast',
    returnBody: 'Realiseres ved salg af færdigopført byggeri.',
    horizon: '12–18 måneder',
    yieldValue: 15,
    yieldLabel: '+15%',
  },
  {
    id: 'udlejning',
    index: '04',
    name: 'Udlejning',
    icon: '/brand/icon-udlejning.png',
    definition: 'Investeringstypen "Udlejning" indebærer drift og udlejning af ejendomme.',
    workLabel: 'Løbende arbejde',
    work: 'Optimering af ejendomsdrift, huslejejustering og vedligehold.',
    returnLabel: 'Afkast',
    returnBody: 'Genereres løbende fra driftsudbyttet og gældsnedbringelse.',
    horizon: 'Løbende',
    yieldValue: 7,
    yieldLabel: '+7%',
  },
];

export const approach = {
  label: 'Vores tilgang',
  title: 'Analysen',
  lead: 'Analysen gennemføres i to hovedfaser: først en landsdækkende makroanalyse, dernæst en mikroanalyse, der identificerer de mest attraktive lokationer.',
  phases: [
    {
      id: 'makro',
      index: '01',
      name: 'Makroanalyse',
      scope: 'Regioner · Landsdele · Kommuner',
      body: 'Formålet er at identificere Danmarks mest attraktive vækstzoner med potentiale for stabile afkast og værdistigninger. Analysen foretages på tværs af regioner, landsdele og kommuner.',
      steps: [],
    },
    {
      id: 'mikro',
      index: '02',
      name: 'Mikroanalyse',
      scope: 'Byer · Lokationer',
      body: 'Mikroanalysen består af to trin, der indsnævrer analysen fra by til konkret lokation.',
      steps: [
        {
          index: 'Trin 1',
          body: 'Identificering af de mest attraktive byer inden for en udvalgt region, landsdel eller kommune.',
        },
        {
          index: 'Trin 2',
          body: 'Detaljeret vurdering af, hvor investeringspotentialet er størst inden for den valgte by.',
        },
      ],
    },
  ],
  quote: {
    text: 'Denne kombination af makro- og mikroanalyse sikrer, at investeringer foretages på et solidt grundlag',
    author: 'Christian Sørensen',
    role: 'Chief Development Officer',
  },
};

export const trackRecord = {
  label: 'Track record',
  title: 'Realiserede projekter',
  lead: 'Afkast opgjort efter omkostninger.',
  projects: [
    {
      id: 'troldebakkerne',
      name: 'C-Real Troldebakkerne',
      location: 'Helsinge',
      type: 'Byggemodning',
      status: 'Afsluttet',
      period: '9 måneder',
      expected: 26,
      realized: 30.3,
      realizedLabel: '30,3 %',
      expectedLabel: '26 %',
    },
    {
      id: 'troldebakkerne-ii',
      name: 'C-Real Troldebakkerne II',
      location: 'Helsinge',
      type: 'Opførelse',
      status: 'Fuldtegnet',
      period: '18 måneder',
      expected: 20.18,
      realized: null,
      realizedLabel: null,
      expectedLabel: '20,18 %',
    },
  ],
};

export const currentProject = {
  label: 'Aktuelle projekter',
  status: 'Fuldtegnet',
  name: 'C-Real Troldebakkerne II ApS',
  location: 'Troldebakkerne, Helsinge',
  description:
    'Investeringsmulighed i byggeprojekt med efterfølgende salg efter færdiggørelse.',
  facts: [
    { label: 'Type', value: 'Opførsel' },
    { label: 'Antal boliger', value: '105' },
    { label: 'Boligareal', value: '8.160 kvm' },
    { label: 'Grundstørrelse', value: '12.556 kvm' },
    { label: 'Forventet afkast', value: '20,18 %', highlight: true },
    { label: 'Investeringsperiode', value: '18 måneder' },
    { label: 'Egenkapitalindskud', value: 'Op til DKK 74 mio.' },
    { label: 'Minimumsindskud', value: 'DKK 750.000' },
    { label: 'Forventet exit', value: '4. kvartal 2027' },
  ],
  primaryCta: 'Bestil udbudsmateriale',
  secondaryCta: 'Download KID',
};

export const leadership = [
  { name: 'Benny Buchardt Andersen', role: 'Chief Executive Officer', email: 'bba@c-real.dk', phone: '+45 2338 3476' },
  { name: 'Christian Sørensen', role: 'Chief Development Officer', email: 'chs@c-real.dk', phone: '+45 2944 4592' },
  { name: 'Gustav Edgard', role: 'Chief Operating Officer', email: 'gue@c-real.dk', phone: '+45 4272 7681' },
  { name: 'Jesper Stolbjerg', role: 'Chief Financial Officer', email: 'jes@c-real.dk', phone: '+45 3140 0770' },
];

export const investorContact = {
  name: 'Nicklas Mikkelsen',
  role: 'Head of Investor Communication & Reporting',
  email: 'nmm@c-real.dk',
  phone: '+45 4422 0499',
};

export const leaderVideo = {
  label: 'Fra ledelsen',
  title: 'Derfor investerer vi, hvor data peger hen',
  body: 'Christian Sørensen om analysemetoden bag hvert projekt, hvordan vi udvælger lokationer, og hvad investorer kan forvente af et samarbejde med C-Real.',
  name: 'Christian Sørensen',
  role: 'Chief Development Officer',
  /* The film already running on c-real.dk. */
  src: 'https://c-real.dk/wp-content/uploads/2026-05-27-CHS-lang.mp4',
  poster: '/brand/afsluttet.jpg',
};

export const contact = {
  label: 'Kontakt',
  title: 'Bestil udbudsmateriale',
  body: 'Udfyld formularen, så sender vi udbudsmateriale og KID for det aktuelle projekt. Vi vender tilbage inden for én arbejdsdag.',
  fields: {
    name: 'Navn',
    email: 'E-mail',
    phone: 'Telefon',
    interest: 'Investeringsinteresse',
    message: 'Besked',
  },
  interestOptions: [
    'Lokalplan — 9–24 måneder',
    'Byggetilladelse — 9–18 måneder',
    'Opførelse — 12–18 måneder',
    'Udlejning — løbende',
    'Ikke afklaret endnu',
  ],
  submit: 'Modtag materiale',
  disclaimer:
    'Minimumsindskud for aktuelle projekter er DKK 750.000. Materialet udleveres alene til brug for din egen vurdering.',
  success: 'Tak. Vi sender materialet til din e-mail inden for én arbejdsdag.',
};

export const footer = {
  links: ['Cookie- og privatlivspolitik', 'Juridiske erklæringer'],
  copyright: '© 2026 C-Real ApS',
  riskNote:
    'Investering i fast ejendom er forbundet med risiko. Historiske afkast er ikke en pålidelig indikator for fremtidige afkast.',
};
