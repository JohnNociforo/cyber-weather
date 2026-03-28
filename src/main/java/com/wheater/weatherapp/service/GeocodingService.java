package com.wheater.weatherapp.service;

import com.wheater.weatherapp.dto.geocoding.GeocodingResponseDTO;
import com.wheater.weatherapp.WeatherAppProperties;
import com.wheater.weatherapp.dto.geocoding.GeocodingResultDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * Classe che gestisce la logica di Business per la geocodifica di un luogo.
 */
@Service
public class GeocodingService {

    /**
     * RestTemplate per effettuare le chiamate HTTP.
     */
    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Logger
     */
    private final Logger log = LoggerFactory.getLogger(GeocodingService.class);

    /**
     * Metodo che recupera le coordinate geografiche di un luogo (città che inseriamo) e ci restituisce
     * latitudine e longitudine.
     */
    public GeocodingResultDTO getLocation(String city) {

        // Costruisce l'URL della geocodifica concatenando il base URL con la città di cui vogliamo recuperare le coordinate
        String geoUrl = WeatherAppProperties.GEOCODING_BASE_URL + city;

        // Effettua la chiamata HTTP per la geocodifica
        GeocodingResponseDTO geoResponse =  restTemplate.getForObject(geoUrl, GeocodingResponseDTO.class);

        log.info("Chiamata API Partita");

        if (geoResponse == null || geoResponse.getResults().isEmpty()) {
            throw new RuntimeException("City not found: " + city);
        }

        return geoResponse.getResults().get(0);
    }
}