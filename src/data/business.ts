// Contact and location details shown across the site. Hours and the mobile service area are not
// confirmed yet — they stay null, and anything that shows them hides itself until they are filled in.
export const business = {
  phone: '(770) 998-5850',
  phoneHref: 'tel:+17709985850',
  address: {
    street: '2755 Stone Mountain Lithonia Road, Unit B',
    cityLine: 'Lithonia, GA 30058',
  },
  hours: null as string | null,
  mobileServiceArea: null as string | null,
}

const mapsQuery = encodeURIComponent(`${business.address.street}, ${business.address.cityLine}`)

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`
export const mapEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&z=15&output=embed`
