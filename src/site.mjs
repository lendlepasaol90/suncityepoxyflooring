// Site-wide configuration for Sun City Epoxy Flooring.
// PHONE: replace the placeholder below once the business line is live.
export const site = {
  name: 'Sun City Epoxy Flooring',
  domain: 'https://suncityepoxyflooring.com',
  city: 'Sun City',
  state: 'AZ',
  county: 'Maricopa County',
  phone: { display: '(623) 000-0000', tel: '+16230000000', placeholder: true },
  geo: { lat: 33.5975, lng: -112.2718 },
  mapQuery: 'Sun City, AZ 85351',
  hours: 'Monday–Saturday · 7:00am–5:00pm',
  ogImage: '/images/hero/sun-city-golf-course-homes-mountain-view-1200.webp',
};

export const services = [
  { slug: 'garage-floor-coatings', name: 'Garage Floor Coatings', short: 'Garage Coatings', blurb: 'Clean, bright garage floors that handle cars, golf carts and the workbench without dusting or staining.', img: 'flakeGarage' },
  { slug: 'residential-epoxy-flooring', name: 'Residential Epoxy Flooring', short: 'Residential Floors', blurb: 'Seamless, easy-care floors for laundry rooms, Arizona rooms, entries and hobby spaces.', img: 'laundry' },
  { slug: 'decorative-flake-flooring', name: 'Decorative Flake Flooring', short: 'Decorative Flake', blurb: 'Speckled color blends with a gentle texture that disguises dust and adds sure footing.', img: 'flakeGrey' },
  { slug: 'metallic-epoxy-flooring', name: 'Metallic Epoxy Flooring', short: 'Metallic Epoxy', blurb: 'Soft, pearly finishes with the look of stone for rooms you want to show off.', img: 'metalSilver' },
  { slug: 'polyaspartic-floor-coatings', name: 'Polyaspartic Floor Coatings', short: 'Polyaspartic', blurb: 'Quick-curing, color-stable coatings that put your garage back in use within a day or two.', img: 'golfCart' },
  { slug: 'polyurea-floor-coatings', name: 'Polyurea Floor Coatings', short: 'Polyurea', blurb: 'A resilient, tightly bonded base layer for older slabs and hard-working spaces.', img: 'garageStorage' },
  { slug: 'patio-concrete-coatings', name: 'Patio & Concrete Coatings', short: 'Patio & Concrete', blurb: 'Cooler, slip-resistant finishes for patios, pool decks, entries and walkways.', img: 'patioGray' },
  { slug: 'commercial-epoxy-flooring', name: 'Commercial Epoxy Flooring', short: 'Commercial', blurb: 'Hygienic, low-maintenance floors for clinics, clubhouses, shops and kitchens.', img: 'clinic' },
  { slug: 'warehouse-floor-coatings', name: 'Warehouse Floor Coatings', short: 'Warehouse', blurb: 'Hard-wearing coatings and line striping for storage, maintenance and distribution space.', img: 'warehouseModern' },
];

export const areas = [
  { name: 'Sun City', note: 'Our home base — garages, patios and Arizona rooms throughout the community, north and south of Grand Avenue.' },
  { name: 'Sun City West', note: 'Single-level homes with golf cart garages and covered patios just to the northwest.' },
  { name: 'Youngtown', note: 'Established homes and small businesses on Sun City’s eastern edge.' },
  { name: 'Peoria', note: 'Neighborhoods north and east of Sun City, from older streets to newer subdivisions.' },
  { name: 'Surprise', note: 'Including Sun City Grand and the communities along Bell Road.' },
  { name: 'El Mirage', note: 'Homes and light-industrial properties just west of Sun City.' },
  { name: 'Glendale (west)', note: 'Garages, patios and commercial floors in the western neighborhoods.' },
  { name: 'Arrowhead area', note: 'Residential and retail properties around Arrowhead Ranch and the 101 corridor.' },
];

export const projectTypes = [
  'Garage floor',
  'Golf cart garage or bay',
  'Patio, pool deck or walkway',
  'Laundry room or interior floor',
  'Decorative flake',
  'Metallic epoxy',
  'Polyaspartic / one-day coating',
  'Commercial space',
  'Warehouse or shop',
  'Something else',
];
