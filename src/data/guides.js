// The 24 Buyer's Planning Guides, numbered as the guides number themselves.
// Name, H1, page title and web address all follow "[Topic] Guide-NN".
// A guide appears as a link on the hub only once its page is listed in `live`.
export const live = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];

const list = [
  ['01', 'Site Preparation', 'What the building area needs before construction, and which site conditions deserve attention early.'],
  ['02', 'Permits, Zoning & Setbacks', 'The local and private rules that can affect placement, size, property-line distances and approval.'],
  ['03', 'Foundation Options', 'Compare foundation approaches and why soil, grade, drainage and use matter.'],
  ['04', 'Moisture Protection & Ground Contact', 'How ground conditions, drainage and moisture management affect the life of a building.'],
  ['05', 'Access Planning', 'Gates, side yards, slopes, overhead obstacles, material routes and working space.'],
  ['06', 'Choosing the Right Size', 'Present needs, future needs, usable space and common sizing mistakes.'],
  ['07', 'Use Case Planning', 'Define what the building must do before settling size, openings, layout and features.'],
  ['08', 'Customization Planning', 'Which design choices affect appearance, function and long-term usefulness.'],
  ['09', 'Roof Pitch Selection', 'How roof slope affects appearance, interior volume and character.'],
  ['10', 'Standard Features vs Optional Upgrades', 'Separate what is included from what costs extra to compare proposals accurately.'],
  ['11', 'Materials & Construction Standards', 'The structural materials and details that deserve attention when comparing buildings.'],
  ['12', 'Payment, Deposits & Financing', 'Payment stages, deposits and financing considerations before you commit.'],
  ['13', 'Scheduling & Build Day', 'What happens before the crew arrives and what to expect during construction.'],
  ['14', 'Built-On-Site Construction', 'How building at your property changes access, customization and the process.'],
  ['15', 'Electrical, HVAC & Utility-Ready Planning', 'Plan power, heating, cooling and utilities before walls and site work make changes harder.'],
  ['16', 'Interior Finish Packages', 'Planning a weather-tight shell for an office, studio, hobby or flexible-use space.'],
  ['17', 'Warranty, Maintenance & Long-Term Care', 'What to expect after construction and the habits that protect the building.'],
  ['18', 'Neighborhood Fit, HOA & Property Aesthetics', 'Neighborhood appearance, HOA requirements and how the building relates to your home.'],
  ['19', 'How to Evaluate a Builder', 'Compare builders on construction details, scope, communication and warranties.'],
  ['20', 'Project Readiness Roadmap', 'Review the major decisions together and resolve open items before construction.'],
  ['21', 'Pre-Purchase Checklist', 'One final review of the important details before approving the building.'],
  ['22', 'Value Impact', 'The practical ways a well-planned building improves usefulness, organization and appeal.'],
  ['23', 'Expanded Buyer FAQ', 'Tough questions worth asking before choosing a backyard building company.'],
  ['24', 'The Building Process', 'How planning, buying, site and construction decisions fit together from start to finish.'],
];

const slugify = (s) => s.toLowerCase().replace(/&/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const guides = list.map(([n, topic, blurb]) => ({
  n,
  topic,
  blurb,
  name: `${topic} Guide-${n}`,
  path: `/buyers-planning-guide/${slugify(topic)}-guide-${n}/`,
  live: live.includes(n),
}));

export const guide = (n) => guides.find((g) => g.n === n);

export const stages = [
  { n: 1, name: 'Property & Site', lead: 'Make sure the property can support the project: where the building can go, what needs approval, what supports it and whether the crew can reach the site.', guides: ['01', '02', '03', '04', '05'], done: 'You understand the building area, the main property restrictions, the likely foundation conditions and how the crew and materials will reach the site.' },
  { n: 2, name: 'Size, Use & Design', lead: 'Decide what the building needs to do before deciding what it should look like.', guides: ['06', '07', '08', '09', '10'], done: 'You can explain what the building is for, about how large it should be, and which design choices are important rather than simply attractive.' },
  { n: 3, name: 'Structure & Construction', lead: 'Learn what you are actually buying: materials, build day, and what building on your property means.', guides: ['11', '13', '14'], done: 'You understand the important construction standards, the build-day process and what built-on-site construction means for your property.' },
  { n: 4, name: 'Budget & Buying', lead: 'Before signing or paying a deposit, understand payments, evaluate the builder, review the details and ask the hard questions.', guides: ['12', '19', '21', '23'], done: 'You understand the payment terms, know how to evaluate the builder and are comfortable asking difficult questions before signing.' },
  { n: 5, name: 'Utilities, Finish & Ownership', lead: 'If the building may become more than storage, plan for it early: utilities, interior finish, care and practical value.', guides: ['15', '16', '17', '22'], done: 'You have considered utilities and finished space, and understand the ownership and maintenance questions that shape today’s decisions.' },
  { n: 6, name: 'Final Readiness & Process', lead: 'Bring the earlier decisions together: neighborhood fit, readiness and the full process from planning to completion.', guides: ['18', '20', '24'], done: 'You understand the property, use, size, construction choices, budget and any open approval questions. Not every detail needs to be final to talk with Edwin.' },
];
