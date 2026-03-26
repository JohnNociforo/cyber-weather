package com.wheater.weatherapp.controller;

import com.wheater.weatherapp.dto.weather.WeatherDTO;
import com.wheater.weatherapp.service.WeatherService;
import org.springframework.web.bind.annotation.*;

/**
 * Controller per la gestione delle richieste relative al servizio di meteo.
 */
@RestController
@RequestMapping("/meteo")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/{city}")
    public WeatherDTO getWeather(@PathVariable String city) {
        return weatherService.getWeatherByCity(city);
    }
}