const containerContent = document.querySelector("#container__content")
const selectElement = document.getElementById("citySelected");
const BASE_URL_API = 'http://www.7timer.info/bin/api.pl'

selectElement.addEventListener("change", (e) => {
  const selectedValue = selectElement.value
  const locationCity = JSON.parse(selectedValue)

  const loading = document.createElement('div')
  loading.setAttribute('id', 'loader')

  containerContent.appendChild(loading)
  fetch(`${BASE_URL_API}?lon=${locationCity?.lon}&lat=${locationCity?.lat}&product=civillight&output=json`)
  .then(response => response.json())
  .then(data => {
    
    containerContent.removeChild(loading)
    renderForecast(data.dataseries) 

  })
  .catch(error => console.error(error))
});

const renderForecast = (data) => {
  const weather = {
    clear: 'CLEAR',
    cloudy: 'CLOUDY',
    fog: 'FOG',
    humid: 'HUMID',
    ishower: 'SHOWER',
    lightrain: 'LIGHT RAIN',
    lightsnow: 'LIGHT SNOW',
    mcloudy: 'MCLOUDY',
    oshower: 'OSHOWER',
    pcloudy: 'PCLOUDY',
    rain: 'RAIN',
    rainsnow: 'RAIN SNOW',
    snow: 'SNOW',
    tsrain: 'SNOW',
    tstorm: 'THUNDERSTORM',
    windy: 'WINDY',
  }

  const forecastListEl = document.createElement('ul')
  forecastListEl.setAttribute('id', 'forecast-list')
  forecastListEl.setAttribute('class', 'forecast-list')
  
  containerContent.appendChild(forecastListEl)

  const forecastList = document.querySelector('#forecast-list')
  let forecastItem = ''

  data.forEach(item => {
    const date = getDate(item.date)
  
    forecastItem += `<li class="forecast-item">
      <p class="weather-date">${date}</p>
      <img class="weather-icon" src="./images/${item.weather}.png" alt="">
      <p class="weather-description">${weather[item.weather]}</p>
      <p class="weather-temperatures">High: 50 ºF</p>
      <p class="weather-temperatures">Low: 45 ºF</p>
    </li>`
  })
 
  forecastList.innerHTML = forecastItem

  containerContent.removeChild(forecastListEl)
  containerContent.appendChild(forecastList)
}



const getDate = (data) => {
  const months = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };

  const days = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  };

  const year = data.toString().slice(0,4)
  const month = data.toString().slice(4,6)
  const daytime = data.toString().slice(-2)

  const date = new Date(`${year}-${month}-${daytime}`)
  const day = date.getDay()
  return `${days[day]} ${months[month]} ${daytime}`
}