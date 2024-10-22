export const common_geo_json = () => {
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      coordinates: [
        [
          [-139.9352678661858, 46.011969494661486],
          [-139.9352678661858, 18.632058811752998],
          [-90.2311764190087, 18.632058811752998],
          [-90.2311764190087, 46.011969494661486],
          [-139.9352678661858, 46.011969494661486]
        ]
      ],
      type: 'Polygon'
    }
  }
}

export const property_status = () => {
  return [
    'all',
    'sign up',
    'get custom analysis',
    'sign permits & waivers',
    // 'invite ltos',
    'clear biomass',
    'project follow up'
    // 'accept bids'
  ]
}

export const treatment_filter_options = () => {
  return [
    { key: 'estimate_of_biomass_detected_20', value: '20% Thin From Below' },
    { key: 'estimate_of_biomass_detected_40', value: '40% Thin From Below' }
  ]
}

export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}
