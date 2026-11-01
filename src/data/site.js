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
  // Counties served, with a few principal communities in each (used on the Service Area page and in structured data).
  serviceCounties: [
    { state: 'Ohio', county: 'Hamilton County', towns: ['Cincinnati', 'Anderson Township', 'Blue Ash', 'Montgomery', 'Indian Hill'] },
    { state: 'Ohio', county: 'Clermont County', towns: ['Loveland', 'Union Township', 'Batavia', 'Amelia', 'Goshen'] },
    { state: 'Ohio', county: 'Warren County', towns: ['Mason', 'Lebanon', 'Springboro', 'Deerfield Township'] },
    { state: 'Ohio', county: 'Butler County', towns: ['West Chester', 'Liberty Township', 'Fairfield', 'Hamilton'] },
    { state: 'Kentucky', county: 'Boone County', towns: ['Florence', 'Union', 'Burlington'] },
    { state: 'Kentucky', county: 'Kenton County', towns: ['Covington', 'Fort Mitchell', 'Independence'] },
    { state: 'Kentucky', county: 'Campbell County', towns: ['Fort Thomas', 'Alexandria', 'Cold Spring'] },
    { state: 'Indiana', county: 'Dearborn County', towns: ['Lawrenceburg', 'Aurora', 'Greendale'] },
  ],
  // Google Analytics 4 measurement ID (looks like G-XXXXXXXXXX). Leave empty to keep analytics off.
  gaId: '',
  // The project form is delivered by FormSubmit (formsubmit.co) to this address.
  formEndpoint: 'https://formsubmit.co/edwin@appalachiansheds.com',
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
