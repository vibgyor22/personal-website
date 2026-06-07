export const profile = {
  name: "Vibhor Vanvani",
  email: "vibhorvanvani@gmail.com",
  linkedin: "https://www.linkedin.com/in/vibhor-vanvani/",
  github: "https://github.com/vibgyor22",
};

export const intro = {
  greeting: "Hi, I'm Vibhor.",
  current:
    "I'm currently a Financial Research Analyst at D. E. Shaw in Hyderabad, building LLM tools and data pipelines for traders and portfolio managers.",
  background:
    "My background is economics (Delhi University) and data science (IIT Madras). I've interned at EY, Emirates NBD, and the Institute of Economic Growth.",
  cambridge:
    "In October 2026, I'm starting an MPhil in Economics and Data Science at Cambridge.",
  future:
    "After that, I want to keep working where economics meets machine learning — on questions about institutions and macro that I find genuinely interesting.",
};

export const work = {
  title: "Work Experience",
  company: "D. E. Shaw",
  role: "Financial Research Analyst — Data Analytics",
  location: "Hyderabad, India",
  period: "June 2024 — Present",
  promoted: "Promoted from Associate in 18 months",
  narrative:
    "I provide analytics support to traders, portfolio managers, and senior researchers across quantitative research, LLM tooling, and investment decision workflows.",
  areas: [
    {
      title: "LLM Engineering",
      body: "I built custom LLM-powered tools — chatbots, automated pipelines, OCR-based parsing, and API-integrated extraction — across 2,000+ broker reports and earnings calls. This reduced manual research effort by roughly 2 FTEs. I also won D. E. Shaw's internal international prompt engineering challenge.",
    },
    {
      title: "Automation & Dashboards",
      body: "I built Python-based HTML dashboards and security trackers monitoring 7,000+ APAC equities across futures, short exposure, and derivatives. I also automated alternative data pipelines and earnings processing workflows.",
    },
    {
      title: "EM Credit Research",
      body: "I developed short-term exit timing forecasts for 6,000+ emerging market bonds across 50 countries using Bayesian regression on Bloomberg and FactSet data, improving forecast accuracy by 70%. I also supported a $75M activist equity position that returned 103% in six months.",
    },
    {
      title: "Corporate Development",
      body: "I assessed market entry feasibility and portfolio adaptability for new investment theses across APAC — liquidity analysis, regulatory impact modelling, and positioning analysis for firm-level strategy shifts.",
    },
  ],
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  github: string | null;
  site?: string | null;
  paper?: string | null;
  tags: string[];
  theme: "espresso" | "attrition" | "democracy";
  stats?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "espresso-protocol",
    title: "Espresso Protocol",
    summary:
      "You type a question, load a CSV, and Espresso picks the right econometric model, runs it, checks the diagnostics, and explains what the output means.",
    bullets: [
      "Supports 15+ estimators — OLS, DiD, Panel FE/RE, IV, ARIMA, quantile regression. It reads the data structure and picks one automatically",
      "If a diagnostic test fails (say, Hausman rejects RE), it switches models mid-run and tells you why",
      "All the math runs through statsmodels and scipy. The LLM only writes the explanation — it never touches the numbers",
      "Output: a terminal REPL, a shareable HTML dashboard, and LaTeX-formatted coefficient tables",
    ],
    github: "https://github.com/vibgyor22/espresso-protocol",
    site: "https://espressoprotocol.in",
    tags: ["Python", "Econometrics", "LLM Agents"],
    theme: "espresso",
    stats: [
      { label: "Estimators", value: "15+" },
      { label: "Reports processed", value: "2,000+" },
      { label: "FTEs displaced", value: "~2" },
      { label: "Output", value: "CLI · HTML · LaTeX" },
    ],
  },
  {
    slug: "llm-war-of-attrition",
    title: "LLM War of Attrition",
    summary:
      "Two LLM agents negotiate a U.S. debt-ceiling standoff. Republican concedes first in 92% of runs — because it rates the cost of delay higher. Built to test Alesina & Drazen (1991).",
    bullets: [
      "Alesina & Drazen (1991): both sides prefer a deal but each waits for the other to absorb the pain. LLMs replicate it — the side that reports higher delay cost folds first",
      "Each turn, agents read real FRED data — VIX, T-bill yields, polling, debt/GDP, days to X-date — and choose HOLD, SIGNAL, or CONCEDE. Nothing is scripted",
      "80 runs · 4 episodes (2011, 2013, 2023, fictional 2025) · 5 stress conditions A→E · up to 30 periods · 3,230 logged decisions",
      "Republican concedes in 74/80 runs. Mean delay cost: Rep 6.6 vs Dem 6.2. H1 confirmed: β = −59.6, p = 0.002. H3: median concession drops from 27 periods (low stress) to 7 (crisis)",
    ],
    github: "https://github.com/vibgyor22/llm-war-of-attrition",
    tags: ["Python", "Game Theory", "LLM Agents", "Streamlit"],
    theme: "attrition",
    stats: [
      { label: "Runs", value: "80" },
      { label: "Rep concedes first", value: "92%" },
      { label: "H1 slope β", value: "−59.6" },
      { label: "H1 p-value", value: "0.002" },
    ],
  },
];

export type ResearchItem = {
  slug: string;
  title: string;
  journal: string;
  year: string;
  link: string | null;
  intro: string;
  story: string[];
  findings: { label: string; value: string }[];
  visual: "calorie" | "interstellar" | "democracy-regression";
};

export const research: ResearchItem[] = [
  {
    slug: "calorie-income",
    title: "Examining the relation between Calorie Deficiency and Income in Rural India",
    journal: "The Economics Journal, SRCC",
    year: "2022",
    link: "https://ecosocsrcc.com/wp-content/uploads/2024/07/Artha-2022.pdf",
    intro:
      "I wanted to test a simple assumption: if people earn more, they should eat better. Using NSSO household survey data, I checked whether higher income actually translates into adequate calorie intake across rural India.",
    story: [
      "I grouped households into 11 income classes and measured calorie adequacy for each group.",
      "I expected a strong positive relationship — more income, better nutrition.",
      "The correlation turned out to be just 0.21. Much weaker than I expected.",
      "This suggests that income alone doesn't explain food security. How households allocate spending — on food vs. other goods — matters a lot.",
      "The paper argues that behavioural and structural gaps in food expenditure are as important as income levels when thinking about rural nutrition policy.",
    ],
    findings: [
      { label: "Correlation", value: "0.21" },
      { label: "Income classes", value: "11" },
      { label: "Data", value: "NSSO" },
    ],
    visual: "calorie",
  },
  {
    slug: "democracy-carbon-research",
    title: "Democracy and Carbon Emissions in Nation-States",
    journal: "Undergraduate Research Paper",
    year: "2023",
    link: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/papers/democracy-carbon-emissions.pdf`,
    intro:
      "I was curious whether democratic countries — with more public accountability and environmental activism — actually emit less carbon. I ran a cross-sectional regression across nation-states to test this.",
    story: [
      "I used carbon emissions per capita (World Bank) as the dependent variable and the Economist Intelligence Unit Democracy Index as the independent variable.",
      "I ran OLS regression and checked for heteroscedasticity and autocorrelation — all diagnostics came back clean.",
      "The democracy coefficient was −0.454, significant at 5%. Higher democracy scores were associated with lower per-capita emissions.",
      "R² of 0.664 — about two-thirds of the variation in emissions is explained by the democracy index in this cross-section.",
      "The result supports the idea that democratic governance — electoral accountability, civil liberties, public participation — can contribute to better environmental outcomes.",
    ],
    findings: [
      { label: "β", value: "−0.454" },
      { label: "R²", value: "0.664" },
      { label: "Sig.", value: "5%" },
    ],
    visual: "democracy-regression",
  },
  {
    slug: "interstellar",
    title: "Asset Pricing in an Interstellar Economy",
    journal: "SSRN",
    year: "2024",
    link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6096989",
    intro:
      "Standard asset pricing models assume information travels instantly. I asked: what happens to prices when information has a speed limit — like in a space economy where news takes time to cross distances?",
    story: [
      "I built an asset pricing model for economies where information arrives with delay, creating persistent price dispersion across locations.",
      "Even when assets are fundamentally identical, prices can diverge because traders at different points in space see different information sets.",
      "I ran cointegration tests and found that price gaps don't just disappear — they persist in a structured way.",
      "The model generates a volatility-driven risk premium: uncertainty about when information arrives becomes a priced risk factor.",
      "It's a thought experiment, but it highlights how strong the instantaneous-information assumption really is in standard finance models.",
    ],
    findings: [
      { label: "Key result", value: "Persistent dispersion" },
      { label: "Risk premium", value: "Volatility-driven" },
      { label: "Method", value: "Cointegration" },
    ],
    visual: "interstellar",
  },
];

export const education = [
  {
    institution: "University of Cambridge",
    degree: "MPhil in Economics and Data Science",
    location: "Cambridge, United Kingdom",
    period: "Oct 2026 — Jun 2027",
    note: "Incoming · Class of '27",
    narrative:
      "Cambridge has been a genuine fit for how I want to grow as an economist. The program brings together machine learning and econometrics in a way that goes beyond black-box predictions — I'll dig into causal inference, understand when and why models work, and build the rigor needed to answer real economic questions. I'm drawn to the research culture and the chance to work alongside economists thinking seriously about methodology.",
    whatStudy:
      "Machine learning in economics, causal inference, econometric methods, microeconomics, research computing, and a dissertation on inference at scale.",
    plannedClubs: ["Cambridge Union", "Chess", "Squash", "Rowing (going to try)"],
    coursework: {
      preparatory:
        "Preparatory course in mathematics and statistics (September): linear algebra, statistics, static and dynamic optimisation, differential and difference equations.",
      core: [
        "Fundamentals of Data Science",
        "Machine Learning in Economics",
        "Causal Inference and Machine Learning",
        "Research Computing",
        "Seminar Series and Case Studies",
        "Microeconomics for Data Science",
        "Econometric Methods",
      ],
      optional: [
        "Economic Analysis of Non-Standard Data",
        "Introduction to Algorithmic Trading Robot Design",
        "Corporate Finance",
        "Behavioural Economics",
        "International Trade",
        "Industrial Organisation",
        "Empirical Finance",
      ],
      dissertation:
        "Guided dissertation of up to 10,000 words, supervised over the academic year.",
    },
  },
  {
    institution: "University of Delhi — Ramjas College",
    degree: "BA (Hons) Economics",
    location: "Delhi, India",
    period: "Nov 2021 — Jun 2024",
    note: "GPA 8.095/10.0 · Top 10 of 100 · NIRF Rank 5",
    narrative:
      "My focus was always on econometrics — learning to test economic theories with real data rather than just on paper. College was a mix of serious economics, competitive debating, and running societies. I led the Debating Society, reviewed papers for the Economic Review, and organised events through the Economics Society.",
    plannedClubs: null as string[] | null,
    coursework: {
      semesters: [
        {
          term: "Semester I",
          courses: [
            "Introductory Microeconomics",
            "Introductory Macroeconomics",
            "Mathematical Methods for Economics I",
            "Statistical Methods for Economics I",
            "English / Ability Enhancement Course",
          ],
        },
        {
          term: "Semester II",
          courses: [
            "Introductory Microeconomics II",
            "Introductory Macroeconomics II",
            "Mathematical Methods for Economics II",
            "Statistical Methods for Economics II",
            "Environmental Science / Value Addition Course",
          ],
        },
        {
          term: "Semester III",
          courses: [
            "Intermediate Microeconomics I",
            "Intermediate Macroeconomics I",
            "Advanced Mathematical Methods for Economics",
            "Optimization Methods for Economic Analysis",
          ],
        },
        {
          term: "Semester IV",
          courses: [
            "Intermediate Microeconomics II",
            "Intermediate Macroeconomics II",
            "Introductory Econometrics",
            "Indian Economy",
            "Money, Banking & Financial Markets",
          ],
        },
        {
          term: "Semester V",
          courses: [
            "Advanced Microeconomics",
            "Advanced Macroeconomics",
            "Econometrics",
            "Development Economics",
            "Economic History",
          ],
        },
        {
          term: "Semester VI",
          courses: [
            "International Economics",
            "Public Economics",
            "Financial Economics",
            "Research Methodology & Project Work",
            "Political Economy",
          ],
        },
      ],
    },
  },
  {
    institution: "Indian Institute of Technology Madras",
    degree: "Diploma in Data Science and Applications",
    location: "Chennai, India",
    period: "Sep 2021 — Dec 2023",
    note: "GPA 8.02/10.0 · NIRF Rank 1 · BS Programme",
    narrative:
      "I wanted to learn how to build ML models that actually work on messy, real-world data — not just clean textbook datasets. I did this alongside my economics degree, which gave me the programming and statistics foundation I use in my work today.",
    plannedClubs: null as string[] | null,
    coursework: {
      foundation: [
        "English I & II",
        "Computational Thinking",
        "Statistics for Data Science I & II",
        "Mathematics for Data Science I, II & III",
        "Programming in Python",
      ],
      diploma: [
        "Machine Learning Foundations",
        "Machine Learning Techniques",
        "Machine Learning Practice (+ Project)",
        "Business Data Management (+ Project)",
        "Business Analytics",
        "Tools in Data Science",
      ],
    },
  },
];

export const internships = [
  {
    org: "Ernst & Young",
    role: "Data Analytics Intern",
    location: "Delhi, India",
    period: "Jun — Aug 2023",
    narrative:
      "I applied ML models (Random Forest, Gradient Boosting, SARIMA, Prophet) to trade-flow data across 50+ countries. Forecast accuracy improved by 25% and I identified 50 high-potential export districts. The insights shaped national policy on market access and product diversification.",
  },
  {
    org: "Institute of Economic Growth",
    role: "Research Intern",
    location: "Delhi, India",
    period: "Feb — Mar 2023",
    narrative:
      "I surveyed 80+ households on anaemia vulnerability, mapped regional hotspots, and contributed to policy recommendations on hemoglobinometers in Anganwadis and iron/folic acid in Mid-Day Meals.",
  },
  {
    org: "Emirates NBD",
    role: "Market Analytics Intern",
    location: "Dubai, UAE",
    period: "May — Jun 2022",
    narrative:
      "I was selected from India for a Dubai internship. I analysed uptake of banking and Shariah-compliant products through segmentation and pricing analysis, and recommended changes that improved product positioning.",
  },
];

export const clubs = [
  {
    name: "Debating Society",
    role: "Joint Secretary",
    narrative:
      "I led the Debating Society as Joint Secretary — mentoring 70+ members, running tournaments, and founding an Equity Committee that lifted underrepresented participation by 30%. Won 1st place at 10+ national tournaments across 15 states. More detail in the Debating section.",
  },
  {
    name: "Ramjas Economic Review",
    role: "Reviewer",
    narrative:
      "I reviewed 30+ undergraduate research papers and helped reduce editorial turnaround from 6 weeks to 2 weeks.",
  },
  {
    name: "Economics Society",
    role: "Leadership",
    narrative:
      "I led events with 1,000+ participants and raised ₹5L+ in sponsorship for college economics events.",
  },
  {
    name: "Satcom / ISRO Outreach",
    role: "Coordinator",
    narrative:
      "I coordinated India's premier space congress with 150+ delegates and led ISRO outreach for 50+ school students.",
  },
];

export const debating = {
  title: "Debating",
  narrative:
    "I started debating in school and won at the state level — by the time I applied to university, it was woven through my entire profile. In college, I picked up both Asian Parliamentary and British Parliamentary formats, and eventually became Joint Secretary of the Debating Society, mentoring 70+ members, running tournaments, and founding an Equity Committee that lifted underrepresented participation by 30%. I've won 1st place at 10+ national tournaments across 15 states and chaired finals at 20+ tournaments as an invited independent adjudicator.\n\nDebating is a major part of my life because it taught me how to construct an argument, respond to counter-evidence, and change my mind when someone makes a better case. That mindset carries directly into how I approach economics and data work — you follow the evidence, you don't cling to a position when shown something better.",
  achievements: [
    "1st place at 10+ national debate tournaments across 15 states",
    "Chaired finals at 20+ tournaments as invited independent adjudicator",
    "Founded the Debating Society's first Equity Committee",
    "Mentored 70+ members to 10+ national wins",
  ],
};

export const achievements = [
  "Honourable Mention, IMC (International Mathematics Competition) Olympiad for University Students 2022",
  "1st place across three national research conferences in data analytics, economics, and public policy",
  "Discovered an asteroid through NASA's IASC programme using Pan-STARRS telescope data",
  "Won D. E. Shaw's internal international prompt engineering challenge",
];

export const skills = {
  technical: [
    "Python",
    "R",
    "MATLAB",
    "Mathematica",
    "Excel",
    "Tableau",
    "Power BI",
    "Bloomberg Terminal",
  ],
  certifications: [
    "Google Data Analytics Professional Certificate (Coursera) — spreadsheets, R, Tableau",
  ],
};

export const navItems = [
  { id: "about", label: "about" },
  { id: "work", label: "work" },
  { id: "education", label: "education" },
  { id: "projects", label: "projects" },
  { id: "research", label: "research" },
  { id: "internships", label: "internships" },
  { id: "leadership", label: "positions" },
  { id: "debating", label: "debating" },
];
