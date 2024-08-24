let availableKeyWords = [
    "mumbai", "new delhi", "bangalore", "hyderabad", "ahmedabad",
    "chennai", "kolkata", "pune", "jaipur", "lucknow",
    "kanpur", "nagpur", "indore", "thane", "bhopal",
    "visakhapatnam", "patna", "vadodara", "ghaziabad", "ludhiana",
    "new york", "los angeles", "chicago", "houston", "phoenix",
    "philadelphia", "san antonio", "san diego", "dallas", "san jose",
    "austin", "jacksonville", "fort worth", "columbus", "san francisco",
    "charlotte", "indianapolis", "seattle", "denver", "washington, d.c."
  ]
const apiKey = "9a424bc9eb161a58d40e02cb2d880d9d"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const cityInput = document.getElementById("cityInput")
const searchBtn = document.getElementById("searchBtn")
const weatherImg = document.getElementById("main-img")
const errorMsg = document.querySelector(".error")
const resultBox = document.querySelector(".resultBox")

async function checkWeather(city) {
    const response = await fetch(apiUrl +city+`&appid=${apiKey}`)
    let data = await response.json()
    if (response.status == 404) {
        errorMsg.style.display = "block"
    }

    else{
        errorMsg.style.display = "none"
        document.getElementById("city").innerHTML = data.name
        document.getElementById("temp").innerHTML = Math.round(data.main.temp)+"°C"
        document.getElementById("humidity").innerHTML = Math.round(data.main.humidity) + "%"
        document.getElementById("windSpeed").innerHTML = Math.round(data.wind.speed)+"km/h"

        if(data.weather[0].main=="Clouds"){
            weatherImg.src = "assets/clouds.png"
        }
        else if(data.weather[0].main=="Clear"){
            weatherImg.src = "assets/sun.png"
        }
        else if(data.weather[0].main=="Rain"){
            weatherImg.src = "assets/rain.png"
        }
        else if(data.weather[0].main=="Mist"){
            weatherImg.src = "assets/mist.png"
        }
        else if(data.weather[0].main=="Snow"){
            weatherImg.src = "assets/snow.png"
        }
        else if(data.weather[0].main=="Drizzle"){
            weatherImg.src = "assets/drizzle.png"
        }

    }

}
searchBtn.addEventListener("click",()=>{
    checkWeather(cityInput.value)
})

cityInput.onkeyup = function(){
    resultBox.style.display = "block"
    let result = []
    let input = cityInput.value
    if(input.length){
        result = availableKeyWords.filter((keyword)=>{
            return keyword.toLowerCase().includes(input.toLowerCase())
        })
        console.log(result);

    }
    display(result)
}
function display(result){
    const content = result.map((list)=>{
        return "<li onclick=selectInput(this)>"+list+"</li>";
    })
    resultBox.innerHTML = "<ul>" +content.join('')+ "</ul>";
}

function selectInput(list){
    cityInput.value = list.innerHTML
    // resultBox.innerHTML=''
    resultBox.style.display = "none"
}