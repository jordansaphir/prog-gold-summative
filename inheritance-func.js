class Place {
  /**
   *
   * @param {string} area The name of the instance of an area
   */
  constructor (area) {
    this.area = area
  }

  /**
   * returns the name of a given instance of an area
   */
  present () {
    return this.area
  }
}

class Info extends Place {
  /**
   * @param {string} area The name of an area
   * @param {string} tier The tier of the area
   * @param {string} postcode The postcode prefix of the area
   */
  constructor (area, tier, postcode) {
    super(area)
    this.tier = tier
    this.postcode = postcode
  }

  /**
   * returns the area and it's corresponding tier
   */
  show () {
    return this.present() + ', is in tier ' + this.tier
  }

  /**
   * returns the area, the area's postcode and the tier of the area
   */
  show2 () {
    return this.postcode + '-' + this.present() + ', tier' + this.tier
  }
}

/**
 * Array of all area names
 */
const areas = ['Middlesbrough', 'Sunderland', 'Cumbria', 'Liverpool City Region', 'North Yorkshire', 'York',
  'South Yorkshire', 'The Humber', 'Lincolnshire', 'Northamptonshire', 'Worcestershire', 'Herefordshire', 'Cambridgeshire, including Peterborough',
  'Bedfordshire and Milton Keynes', 'all 32 boroughs plus the City of London', 'Oxfordshire', 'Reading', 'Surrey', 'Bristol', 'Somerset', 'Cardiff', 'Swansea',
  'Edinburgh', 'Glasgow', 'Belfast', 'Londerry', 'Guernsey', 'Jersey', 'Isle of Man', 'Dublin', 'Cork', 'Galway', 'Stirling', 'Lisburn', 'County Durham',
  'Greater Manchester', 'West Yorkshire', 'Derbyshire', 'Nottinghamshire', 'Leicestershire', 'Birmingham and Black Country', 'Staffordshire and Stoke-on-Trent',
  'Suffolk', 'Hertfordshire', 'Kent and Medway', 'Bath', 'Dorset', 'Wrexham', 'Dundee']

/**
 * Array of all corresponding tier values for all area names
 */
const tiers = ['3', '3', '3', '2', '2', '2', '3', '3', '3', '2', '2', '2', '2', '2', '2', '2', '2', '2', '3', '2', '3', '3',
  '3', '3', '2', '2', '1', '1', '1', '3', '2', '2', '2', '2', '3', '3', '3', '3', '3', '3', '3', '3', '2', '2', '3', '2', '2', '2', '2']

/**
 * Array of all postcode prefixes for all area names
 */
const postcodes = ['MD', 'SU', 'CA', 'L', '-', 'YO', '-', '-', 'LN', 'NN', 'WR', 'HR', 'CB', 'MK', '-', 'OX', 'RG', 'GU', 'BR', 'TA',
  'CF', 'SA', 'EH', 'G', 'BT', 'BT', 'GY', 'JE', 'IM', 'D0', '-', '-', 'FK', 'BT', 'DH', 'M', '-', 'DE', 'NG', 'LE', 'B', 'ST', 'IP', 'SG', 'CT', 'BA', 'DT', 'LL', 'DD']

// Iterates through the area and tier arrays and creates their strings in show()
// Iterates through div elements populating each div element with the string outputted from show()
for (let i = 0; i < areas.length; i++) {
  const j = (new Info(areas[i], tiers[i]).show())
  const d = 'demo' + (i + 1)
  document.getElementById(d).innerHTML = j
}

/**
 * Used as a flag to determine whether to display an item in the search bar table.
 * When set to false, it will not display a value. When set to true, will display a value
 */
const displayy = 'False'
if (displayy === 'False') {
  document.getElementById('KK').style.display = 'none'
}


// [2]J. field, S. Mourya, R. Buljan and A. Tariq, "JavaScript validation for empty input field", Stack Overflow, 2021. [Online]. Available: https://stackoverflow.com/questions/3937513/javascript-validation-for-empty-input-field. [Accessed: 21- Jan- 2021].
/**
 * A function that checks whether the search bar contains any inputted characters
 * @param {string} str The input to the search bar
 * @returns {boolean} Returns boolean value depending on whether the search bar
 * contains any inputted characters. Is true when empty, false when there are inputted characters
 */
function isEmpty (str) {
  return !str.trim().length
}

const isEmpt = str => !str.trim().length

/**
 * To show matching search results to input and hide anything that does not match
 */
document.getElementById('myInput').addEventListener('input', function () {
  if (isEmpty(this.value)) {
    const displayy = 'False'
    document.getElementById('KK').style.display = 'none'
  } else {
    const displayy = 'True'
    document.getElementById('KK').style.display = ''
  }
})

// Iterates through the area, tier and postcode arrays and creates their corresponding strings in show2()
// Iterates through div elements populating each div element with the string outputted from show2()
let x = 0
while (x < postcodes.length) {
  const v = (new Info(areas[x], tiers[x], postcodes[x]).show2())
  const q = 'li' + (x + 1)
  document.getElementById(q).innerHTML = v
  x++
}

//  [1]"How To Create a Filter/Search Table", W3schools.com, 2021. [Online]. Available: https://www.w3schools.com/howto/howto_js_filter_table.asp. [Accessed: 21- Jan- 2021].
// From this source I have adapted the id of the list being filtered, and the number of characters used to base the filtering of items off. 
// Also I have adapted the code so that before there is any input, no characters are displayed (see above reference [2]).
/**
 * Filters the div elements contained within searchable areas (div elements within #myUL).
 * Filters by the first 2 characters of inputted string in order to match postcode with the input
 */
function filter () {
  const input = document.getElementById('myInput')
  const filter = input.value.toUpperCase().slice(0, 2)
  const ul = document.getElementById('myUL')
  const li = ul.getElementsByTagName('li')
  let a, i, txtValue

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName('a')[0]
    txtValue = a.textContent || a.innerText
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = ''
    } else {
      li[i].style.display = 'none'
    }
  }
}
