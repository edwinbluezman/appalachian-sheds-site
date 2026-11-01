// One home for every business fact. Every page reads from here,
// so the phone, email and warranty can never disagree between pages.
export const business = {
  id: 'https://appalachiansheds.com/#business',
  name: 'Appalachian Sheds Inc.',
  url: 'https://appalachiansheds.com/',
  phoneDisplay: '(513) 379-2421',
  phoneLink: '5133792421',
  phoneSchema: '+1-513-379-2421',
  email: 'edwin@appalachiansheds.com',
  serviceArea: 'Cincinnati and the Tri-State area',
  warranty: '30-Year Structural Warranty',
  experience: 'Three decades of senior property and construction leadership',
  founder: {
    id: 'https://appalachiansheds.com/#edwin',
    name: 'Edwin R. Shackelford',
    role: 'Founder',
  },
};

// Builds a link that works both on the test address and on the final domain.
export const link = (path = '') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
};
