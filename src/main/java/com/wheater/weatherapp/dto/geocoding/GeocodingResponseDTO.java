package com.wheater.weatherapp.dto.geocoding;

import java.util.List;

/**
 * Dto di risposta ricevuta dalla geocodifica API, contine una lista di risultati.
 */
public class GeocodingResponseDTO {

    private List<GeocodingResultDTO> results;

    public GeocodingResponseDTO() {}

    public GeocodingResponseDTO(List<GeocodingResultDTO> results) {
        this.results = results;
    }

    public List<GeocodingResultDTO> getResults() {
        return results;
    }

    public void setResults(List<GeocodingResultDTO> results) {
        this.results = results;
    }
}