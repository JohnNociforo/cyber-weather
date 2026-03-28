package com.wheater.weatherapp;

import com.wheater.weatherapp.dto.geocoding.GeocodingResultDTO;
import com.wheater.weatherapp.dto.weather.*;
import com.wheater.weatherapp.service.GeocodingService;
import com.wheater.weatherapp.service.WeatherService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WeatherServiceBasicTest {

    private GeocodingService geocodingService;
    private RestTemplate restTemplate;
    private WeatherService weatherService;

    @BeforeEach
    void setup() {
        geocodingService = mock(GeocodingService.class);
        restTemplate = mock(RestTemplate.class);

        weatherService = new WeatherService(geocodingService);

        ReflectionTestUtils.setField(weatherService, "restTemplate", restTemplate);
    }

    @Test
    void testHappyPath() {
        String city = "Rome";

        // mock geocoding
        GeocodingResultDTO location = new GeocodingResultDTO();
        location.setLatitude(41.9);
        location.setLongitude(12.4);
        location.setName("Rome");

        when(geocodingService.getLocation(city)).thenReturn(location);

        // mock meteo
        OpenMeteoCurrentWeatherDTO current = new OpenMeteoCurrentWeatherDTO();
        current.setTemperature(20.0);
        current.setWindspeed(5.0);
        current.setWeathercode(0);

        OpenMeteoResponseDTO response = new OpenMeteoResponseDTO();
        response.setCurrentWeather(current);

        when(restTemplate.getForObject(anyString(), eq(OpenMeteoResponseDTO.class)))
                .thenReturn(response);

        // call
        WeatherDTO result = weatherService.getWeatherByCity(city);

        // assert base
        assertNotNull(result);
        assertEquals("Rome", result.getCity());
        assertEquals(20.0, result.getTemperature());
    }

    @Test
    void testEasterEgg_whenCityNotFound() {
        String city = "Unknown";

        when(geocodingService.getLocation(city))
                .thenThrow(new RuntimeException());

        WeatherDTO result = weatherService.getWeatherByCity(city);

        assertEquals("Hogwarts", result.getCity());
        assertEquals(777, result.getTemperature());
    }

    @Test
    void testException_whenWeatherApiFails() {
        String city = "Rome";

        GeocodingResultDTO location = new GeocodingResultDTO();
        location.setLatitude(41.9);
        location.setLongitude(12.4);
        location.setName("Rome");

        when(geocodingService.getLocation(city)).thenReturn(location);

        when(restTemplate.getForObject(anyString(), eq(OpenMeteoResponseDTO.class)))
                .thenReturn(null);

        assertThrows(RuntimeException.class, () ->
                weatherService.getWeatherByCity(city)
        );
    }
}