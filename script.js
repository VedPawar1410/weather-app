
const input = document.querySelector('#search-bar');
const btn = document.querySelector('.search-button');
const city = document.createElement('h2');
const information = document.createElement('p');
const display = document.querySelector('.display-weather')
//const unitToggleValue = document.querySelector('');
const params = new URLSearchParams({
    key: "8U9E2EG3GY27RZH6PB9EM7QZ9",
    //unitGroup: unitToggleValue, // e.g. "us" or "metric"
    unitGroup: "us",
    //include: "days,current,events",
    contentType: "json"
});

btn.addEventListener('click', async(e)=>{
    e.preventDefault();
    await getWeather();
});

async function getWeather() {
    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?${params.toString()}`);

        if(!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();
        console.log(data);

        //DOM
        city.textContent = data.address;
        information.textContent = data.currentConditions.temp;
        display.appendChild(city);
        display.appendChild(information);

    }
    catch(err){
        console.log(err);
    }

}