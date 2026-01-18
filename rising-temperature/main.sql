select mainWeather.id as Id from Weather mainWeather where mainWeather.temperature > (select subWeather.temperature from Weather subWeather where mainWeather.id - 1 = subWeather.id)
