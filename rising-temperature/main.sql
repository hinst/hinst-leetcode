select mainWeather.id as Id from Weather mainWeather where mainWeather.temperature >
	(select subWeather.temperature from Weather subWeather where subdate(mainWeather.recordDate, 1) = subWeather.recordDate limit 1)
