export const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Explore Ideas", href: "#ideas" },
  { label: "Analytics", href: "#analytics" },
  { label: "Community", href: "#community" },
];

export const STATS = [
  { value: "4,200+", label: "Ideas Validated" },
  { value: "18K+",   label: "Community Members" },
  { value: "340+",   label: "Ideas Funded" },
  { value: "92%",    label: "Founder Satisfaction" },
];

export const TRENDING_IDEAS = [
  {
    id: 1,
    title: "AI-Powered Code Review Assistant",
    summary:
      "Automated pull request reviews using LLMs trained on best practices and your team's codebase patterns.",
    category: "AI",
    votes: 342,
    comments: 58,
    author: "Rohan M.",
    avatar: "RM",
    trending: true,
  },
  {
    id: 2,
    title: "Micro-SaaS Marketplace for Freelancers",
    summary:
      "A platform where solo devs can sell small SaaS tools directly to businesses without managing infra.",
    category: "Marketplace",
    votes: 289,
    comments: 41,
    author: "Priya S.",
    avatar: "PS",
    trending: true,
  },
  {
    id: 3,
    title: "B2B Invoice Financing for SMEs",
    summary:
      "Let small businesses unlock cash from unpaid invoices instantly through peer-to-peer lending pools.",
    category: "Fintech",
    votes: 214,
    comments: 33,
    author: "Arjun K.",
    avatar: "AK",
    trending: false,
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Post Your Idea",
    desc: "Share your startup concept with a structured template — problem, solution, market, and model.",
  },
  {
    number: "02",
    title: "Get Community Feedback",
    desc: "Founders, developers, and PMs vote and comment with real-world insights on your idea.",
  },
  {
    number: "03",
    title: "Analyze Signals",
    desc: "Track votes, engagement trends, and community interest to decide if the idea is worth building.",
  },
  {
    number: "04",
    title: "Build with Confidence",
    desc: "Validated ideas get early adopters. Ship knowing there's real demand before writing a line of code.",
  },
];

export const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { label: "Explore Ideas", href: "#" },
      { label: "Submit Idea",   href: "#" },
      { label: "Analytics",     href: "#" },
      { label: "Pricing",       href: "#" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Leaderboard",  href: "#" },
      { label: "Discussions",  href: "#" },
      { label: "Newsletter",   href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",   href: "#" },
      { label: "Blog",    href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export const SOCIAL_PROOF_AVATARS = [
  { initials: "RM", bg: "bg-orange-100" },
  { initials: "PS", bg: "bg-green-100"  },
  { initials: "AK", bg: "bg-indigo-100" },
  { initials: "NK", bg: "bg-yellow-100" },
];

export const CATEGORY_STYLES = {
  AI:          "bg-indigo-50 text-indigo-700 border border-indigo-200",
  Marketplace: "bg-green-50 text-green-700 border border-green-200",
  Fintech:     "bg-orange-50 text-orange-700 border border-orange-200",
  SaaS:        "bg-sky-50 text-sky-700 border border-sky-200",
};