package com.wheater.weatherapp.dto.weather;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Dto di risposta ricevuta dall'API OpenMeteo, contiene un dto che contiene le informazioni del tempo corrente.
 */
public class OpenMeteoResponseDTO {

    @JsonProperty("current_weather")
    private OpenMeteoCurrentWeatherDTO currentWeather;

    public OpenMeteoResponseDTO() {}

    public OpenMeteoCurrentWeatherDTO getCurrentWeather() {
        return currentWeather;
    }

    public void setCurrentWeather(OpenMeteoCurrentWeatherDTO currentWeather) {
        this.currentWeather = currentWeather;
    }
}