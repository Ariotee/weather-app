import { useEffect, useRef, useState } from 'react'

import searchIcon from '../assets/img/search.png'
import clearIcon from '../assets/img/clear.png'
import humidutyIcon from '../assets/img/humidity.png'
import windIcon from '../assets/img/wind.png'
import cloudIcon from '../assets/img/cloud.png'
import drizzleIcon from '../assets/img/drizzle.png'
import rainIcon from '../assets/img/rain.png'
import snowIcon from '../assets/img/snow.png'

const Weather = () => {
	const [weatherData, setWeatherData] = useState(false)
	const inputRef = useRef()

	const allIcons = {
		'01d': clearIcon,
		'01n': clearIcon,

		'02d': cloudIcon,
		'02n': cloudIcon,

		'03d': drizzleIcon,
		'03n': drizzleIcon,

		'04d': rainIcon,
		'04n': rainIcon,

		'05d': snowIcon,
		'05n': snowIcon,
	}

	const search = async city => {
		if (city === '') {
			alert('Enter city name!')
			return
		}

		try {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units-metric&appid=${
				import.meta.env.VITE_APP_ID
			}`

			const response = await fetch(url)
			const data = await response.json()

			const icon = allIcons[data.weather[0].icon] || clearIcon

			const fromFtoC = Math.floor((5 / 9) * (data.main.temp - 32)) / 5

			if (!response.ok) {
				alert(data.message)
				return
			}

			setWeatherData({
				humidity: data.main.humidity,
				windSpeed: data.wind.speed,
				temperature: fromFtoC,
				location: data.name,
				icon: icon,
			})
		} catch (error) {
			setWeatherData(false)
			console.error('Error in fetching weather data =(')
		}
	}

	useEffect(() => {
		search('Barnaul')
	}, [])

	return (
		<div className='flex flex-col items-center rounded-[10px] p-10 from-[#2f4680] to-[#500ae4] bg-gradient-to-bl place-self-center'>
			<div className='flex items-center gap-3'>
				<input
					type='text'
					className='h-[50px] border-none outline-none rounded-[40px] pl-[25px] text-[#626262] bg-[#ebfffc] text-[18px]'
					placeholder='Search'
					ref={inputRef}
				/>
				<img
					src={searchIcon}
					className='w-[50px] px-[15px] py-[14px] rounded-[50%] bg-[#ebfffc] cursor-pointer'
					onClick={() => search(inputRef.current.value)}
				/>
			</div>

			{weatherData ? (
				<>
					<div className='flex flex-col items-center'>
						<img src={weatherData.icon} className='w-[150px] my-[30px]' />
						<p className='text-white text-[80px] leading-none'>
							{weatherData.temperature}&deg;C
						</p>
						<p className='text-white text-4xl'>{weatherData.location}</p>
					</div>

					<div className='flex items-center justify-between w-full mt-10 text-white  '>
						<div className='flex items-center gap-3 text-[22px]'>
							<img src={weatherData.icon} className='w-[32px]' />
							<div className=''>
								<p className=''>{weatherData.humidity}%</p>
								<span className='block text-base'>Humidity</span>
							</div>
						</div>

						<div className='flex items-start gap-3 text-[22px]'>
							<img src={windIcon} className='w-[26px]' />
							<div className=''>
								<p className=''>{weatherData.windSpeed} km/h</p>
								<span className='block text-base'>Wind Speed</span>
							</div>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	)
}

export default Weather
