package com.wheater.weatherapp.service;

import com.wheater.weatherapp.WeatherAppProperties;
import com.wheater.weatherapp.dto.geocoding.GeocodingResultDTO;
import com.wheater.weatherapp.dto.weather.OpenMeteoCurrentWeatherDTO;
import com.wheater.weatherapp.dto.weather.OpenMeteoResponseDTO;
import com.wheater.weatherapp.dto.weather.WeatherDTO;
import com.wheater.weatherapp.model.WeatherCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    /**
     * RestTemplate per effettuare le chiamate HTTP.
     */
    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Servizio per la geocodicifica di un luogo, recuperando le coordinate geografiche.
     */
    private final GeocodingService geocodingService;

    public WeatherService(GeocodingService geocodingService) {
        this.geocodingService = geocodingService;
    }

    /**
     * Recupera le informazioni meteo per una città specificata.
     * @param city La città per cui si desidera ottenere le informazioni meteo.
     * @return Un oggetto WeatherDTO contenente le informazioni meteo.
     */
    public WeatherDTO getWeatherByCity(String city) {

        // Recupero lat/lon tramite GeocodingService
        GeocodingResultDTO location = geocodingService.getLocation(city);

        double lat = location.getLatitude();
        double lon = location.getLongitude();

        // Costruzione URL per effettuare la chiamata HTTP all'API meteo'
        String weatherUrl = WeatherAppProperties.OPEN_METEO_BASE_URL + lat + "&longitude=" + lon + "&current_weather=true";

        // Effettuo la chiamata HTTP all'API meteo
        OpenMeteoResponseDTO weatherResponse = restTemplate.getForObject(weatherUrl, OpenMeteoResponseDTO.class);

        // Controllo se la risposta è nulla
        if (weatherResponse == null) {
            throw new RuntimeException("Errore durante la chiamata all'API meteo");
        }

        // Recupero il DTO con le informazioni dal DTO principale ottenuto dalla chiamata HTTP
        OpenMeteoCurrentWeatherDTO current = weatherResponse.getCurrentWeather();

        return new WeatherDTO(
                location.getName(),
                current.getTemperature(),
                current.getWindspeed(),
                mapWeatherCode(current.getWeathercode())
        );
    }

    // =============================================
    // =============== METODI DI UTILS =============
    // =============================================

    /**
     * Prende in input un codice meteo e restituisce una stringa che rappresenta la descrizione del meteo.
     * @param code
     * @return
     */
    private String mapWeatherCode(int code) {
        return WeatherCode.fromCode(code);
    }
}