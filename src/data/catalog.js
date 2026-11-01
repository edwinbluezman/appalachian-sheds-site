// The model lineup in one place, used by the Buildings overview page.
import { readPrices } from './models.js';
import classic from './classic-prices.csv?raw';
import antique from './antique-saltbox-prices.csv?raw';
import laurel from './laurel-lean-to-prices.csv?raw';
import cottage from './country-cottage-prices.csv?raw';
import overhang from './saltbox-overhang-prices.csv?raw';
import classicPhoto from '../assets/appalachian-classic-shed.webp';
import laurelPhoto from '../assets/appalachian-laurel-lean-to-shed.png';
import cottagePhoto from '../assets/appalachian-country-cottage.jpg';
import overhangPhoto from '../assets/appalachian-saltbox-overhang-shed.png';

export const series = [
  {
    name: 'Classic Series',
    lead: 'Dependable storage buildings with straightforward rooflines, 2×4 kiln-dried Spruce framing at 16″ on center and full wall sheathing.',
    models: [
      { name: 'Appalachian Classic Shed', path: '/buildings/appalachian-classic/', blurb: 'A clean low-profile gable shed for everyday storage.', photo: classicPhoto, prices: readPrices(classic) },
      { name: 'Appalachian Antique Saltbox Shed', path: '/buildings/appalachian-antique-saltbox/', blurb: 'A traditional asymmetrical saltbox roofline with historic character.', prices: readPrices(antique) },
      { name: 'Appalachian Laurel Lean-To Shed', path: '/buildings/appalachian-laurel-lean-to/', blurb: 'A compact single-slope shed for smaller spaces.', photo: laurelPhoto, prices: readPrices(laurel) },
    ],
  },
  {
    name: 'Signature Series',
    lead: 'More finished buildings with extended eaves, transom glass over a 5-foot double door, larger windows and architectural shingles.',
    models: [
      { name: 'Appalachian Country Cottage', path: '/buildings/appalachian-country-cottage/', blurb: 'Cottage-style storage built to look at home near the house.', photo: cottagePhoto, prices: readPrices(cottage) },
      { name: 'Appalachian Saltbox Overhang Shed', path: '/buildings/appalachian-saltbox-overhang/', blurb: 'Covered rear storage under an extended roofline, standard.', photo: overhangPhoto, prices: readPrices(overhang) },
    ],
  },
];
