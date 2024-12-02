const api_key = "bcd8dfbc03659448549b16a8253b7b82";

let input = document.querySelector('#inputQuery');
let btnSearch = document.querySelector('.btnSearch');
const section = document.querySelector('#section');

btnSearch.addEventListener("click",  async () => {
    section.innerHTML = "";
    const city = input.value;
    if (city.length === 0) {
        return;
    }

    const query = await searchWeather(city);
    
    for(let i = 0; i < 5; i++){
        day = query.list[i];

        let weather = day.weather;
        let main = weather[0].main;
        let description = weather[0].description;
    
        let temp_main = day.main;
        let temp = Math.round(temp_main.temp - 273.15, -1);
        let feels_like = Math.round(temp_main.feels_like - 273.15, -1);
        let pressure = temp_main.pressure;
        let humidity = temp_main.humidity;
    
        let wind = day.wind;
        let speed = wind.speed;
        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        let p = document.createElement('p');
        h2.innerText = `День ${i + 1}`;
        p.innerText = `Погода: ${main} \n
                        Описание: ${description} \n
                        Температура: ${temp} °C \n
                        Ощущается как: ${feels_like} °C \n
                        Давление: ${pressure} мм рт. ст. \n
                        Влажность: ${humidity}% \n
                        Скорость ветра: ${speed} м/c \n`
    
        div.append(h2);
        div.append(p);
        section.append(div);
    }
  

})

const searchWeather = async (city) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&lang=ru`;
    try {
      const response = await fetch(url).then((rs) => rs.json());
      return response;
    } catch (error) {
      console.error(error);
    }
  };