package com.wheater.weatherapp.service;

import com.wheater.weatherapp.WeatherAppProperties;
import com.wheater.weatherapp.dto.geocoding.GeocodingResultDTO;
import com.wheater.weatherapp.dto.weather.OpenMeteoCurrentWeatherDTO;
import com.wheater.weatherapp.dto.weather.OpenMeteoResponseDTO;
import com.wheater.weatherapp.dto.weather.WeatherDTO;
import com.wheater.weatherapp.model.WeatherCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    /**
     * Logger
     */
    private final Logger log = LoggerFactory.getLogger(WeatherService.class);

    public WeatherService(GeocodingService geocodingService) {
        this.geocodingService = geocodingService;
    }

    /**
     * Recupera le informazioni meteo per una città specificata.
     * @param city La città per cui si desidera ottenere le informazioni meteo.
     * @return Un oggetto WeatherDTO contenente le informazioni meteo.
     */
    public WeatherDTO getWeatherByCity(String city) {

        // Dto che conterrà le coordinate geografiche della città
        GeocodingResultDTO location;

        // Recupero lat/lon tramite GeocodingService
        try {
            location = geocodingService.getLocation(city);
        } catch (Exception e) {
            log.warn("Città non trovata: {}", city);

            //In caso di qualsiasi eccezzione creiamo una città fittizia come easterEgg che salirà al Client.
            return buildEasterEgg();
        }

        //Se la location è vuota (l'utente ha inserito una città che non esiste) restituiamo una città segreta al Client.
        if (location == null) {
            log.warn("Location nulla per città: {}", city);
            return buildEasterEgg();
        }

        double lat = location.getLatitude();
        double lon = location.getLongitude();

        // Costruzione URL per effettuare la chiamata HTTP all'API meteo'
        String weatherUrl = WeatherAppProperties.OPEN_METEO_BASE_URL + lat + "&longitude=" + lon + "&current_weather=true";

        // Effettuo la chiamata HTTP all'API meteo
        OpenMeteoResponseDTO weatherResponse = restTemplate.getForObject(weatherUrl, OpenMeteoResponseDTO.class);

        log.info("Chiamata API verso partita con url:" + weatherUrl);

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


    /**
     * Crea e restituisce un DTO fittizzio che funge da EasterEgg, gestisce la casistica in cui la città inserita non è stata trovata
     * @return
     */
    private WeatherDTO buildEasterEgg() {

        return new WeatherDTO(
                "Hogwarts",
                777,
                0.0,
                "Silente non ha acceso il meteo oggi."
        );
    }
}