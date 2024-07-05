import React, { useEffect, useRef, useState } from 'react'
import search_icon from '../assets/Assets/search.png'
import clear_icon from '../assets/Assets/clear.png'
import cloud_icon from '../assets/Assets/cloud.png'
import humidity_icon from '../assets/Assets/humidity.png'
import rain_icon from '../assets/Assets/rain.png'
import snow_icon from '../assets/Assets/snow.png'
import wind_icon from '../assets/Assets/wind.png'
import drizzle_icon from '../assets/Assets/drizzle.png'

const Content = () => {
   
     
    const inputRef = useRef()
    const [weatherData, setweatherData] = useState(false)

    const allicons = {
        "01d" : clear_icon,
        "01n" : clear_icon,
        "02d" : cloud_icon,
        "02n" : cloud_icon,
        "03d" : cloud_icon,
        "03n" : cloud_icon,
        "04d" : drizzle_icon,
        "04n" : drizzle_icon,
        "09d" : rain_icon,
        "09n" : rain_icon,
        "10d" :rain_icon,
        "10n" :rain_icon,
        "13d" :snow_icon,
        "13n" :snow_icon,
    }
    
    const search = async (city) =>{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"4368a4edeeca1925323521770dfa20f2"}`
            const responce = await fetch (url);
            const data = await responce.json();
            console.log(data)
            const icon = allicons[data.weather[0].icon] || clear_icon
            setweatherData({
                humidity : data.main.humidity,
                windspeed : data.wind.speed,
                temparature : Math.floor(data.main.temp),
                location : data.name,
                icon : icon
            })
        } catch (error) {
            
        }
    }

    useEffect (()=>{
        search ("kolkata")
    }, [])

  return (
    <div className='content'>
        <div className='search-bar'>
            <input type="text" ref={inputRef} placeholder='Search'/>
            <img src={require("../assets/Assets/search.png")} onClick={()=>search(inputRef.current.value)} alt="" />

        </div>
       
       <img className='weather-icon' src={require("../assets/Assets/clear.png")} alt="" />
       <p className='temp'>{weatherData.temparature}</p>
       <p className='city'>{weatherData.location}</p>
       <div className='weather-data'>
          <div className="col">
            <img src={humidity_icon} alt="" />
           <div>
            <p>91%</p>
            <span>{weatherData.humidity}</span>
           </div>

          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
           <div>
            <p>3.6 Km/h</p>
            <span>{weatherData.windspeed}</span>
           </div>

          </div>
       </div>

    </div>
  )
}

export default Content
