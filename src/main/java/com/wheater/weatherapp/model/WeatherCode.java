package com.wheater.weatherapp.model;

import java.util.Arrays;

public enum WeatherCode {

    CLEAR("Sereno", 0),
    PARTLY_CLOUDY("Parzialmente nuvoloso", 1, 2),
    CLOUDY("Nuvoloso", 3),
    FOG("Nebbia", 45, 48),
    LIGHT_RAIN("Pioggia leggera", 51, 53, 55),
    RAIN("Pioggia", 61, 63, 65),
    SNOW("Neve", 71, 73, 75),
    STORM("Temporale", 95);

    private final String description;
    private final int[] codes;

    WeatherCode(String description, int... codes) {
        this.description = description;
        this.codes = codes;
    }

    public String getDescription() {
        return description;
    }

    /**
     * Restituisce la descrizione del codice meteo
     * @param code
     * @return
     */
    public static String fromCode(int code) {
        return Arrays.stream(values())
                .filter(w -> Arrays.stream(w.codes).anyMatch(c -> c == code))
                .map(WeatherCode::getDescription)
                .findFirst()
                .orElse("Sconosciuto");
    }
}