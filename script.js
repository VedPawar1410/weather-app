
const input = document.querySelector('#search-bar');
const btn = document.querySelector('.search-button');
const city = document.createElement('h2');
const information = document.createElement('p');
const weatherType = document.createElement('p');
const display = document.querySelector('.display-weather')
const toggle = document.querySelectorAll('input[name="temperature"]');
const weatherImage = document.createElement('img');
//const unitToggleValue = document.querySelector('');


function getUnitGroup(){
    const selectedUnit = document.querySelector('input[name="temperature"]:checked').value;
    console.log(selectedUnit);
    return selectedUnit;
}

function getUnit(){
    const unit = getUnitGroup();
    if(unit == "us"){return "F";}
    return "C";
}

btn.addEventListener('click', async(e)=>{
    e.preventDefault();
    await getWeather();
});

async function getWeather() {
    try{
        const params = new URLSearchParams({
            key: "8U9E2EG3GY27RZH6PB9EM7QZ9",
            //unitGroup: "metric", // e.g. "us" or "metric"
            unitGroup: getUnitGroup(),
            //include: "days,current,events",
            contentType: "json"
        });
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?${params.toString()}`);

        if(!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();
        console.log(data);

        //DOM
        city.textContent = data.address;
        information.textContent = `${data.currentConditions.temp} ${getUnit()}`;
        weatherType.textContent = `${data.currentConditions.icon}`;
        getWeatherImage(data.currentConditions.icon).then(url=>{
            weatherImage.src = url;
        })
        .catch(err=>console.log("Failed to load weather image: ", err));
        display.appendChild(city);
        display.appendChild(information);
        display.appendChild(weatherType);
        display.appendChild(weatherImage);


    }
    catch(err){
        console.log(err);
    }

}

// toggle between units
toggle.forEach((degree)=>{
    degree.addEventListener('change', ()=>{
        console.log("HI1");
        getWeather();
    })
})

// Giphy image to display weather
async function getWeatherImage(image) {
    const parameters = new URLSearchParams({
        api_key: "AovRxwIi87F31a3vKpAGQnSqoJXsRprT",
        s: image
    });
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?${parameters.toString()}`);
    if(!response.ok){
        throw new Error(response.status);
    }
    const imageData = await response.json();
    return imageData.data.images.original.url;
}
