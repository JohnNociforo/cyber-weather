package com.wheater.weatherapp.dto.weather;

/**
 * Classe che rappresente un oggetto WeatherDTO, questo oggetto rappresenta i dati di meteo di un determinato luogo.
 */
public class WeatherDTO {

    private String city;
    private double temperature;
    private double wind;
    private String description;

    // Costruttore vuoto
    public WeatherDTO() {}

    // Costruttore con parametri
    public WeatherDTO(String city, double temperature, double wind, String description) {
        this.city = city;
        this.temperature = temperature;
        this.wind = wind;
        this.description = description;
    }

    public String getCity() {
        return city;
    }

    public WeatherDTO setCity(String city) {
        this.city = city;
        return this;
    }

    public double getTemperature() {
        return temperature;
    }

    public WeatherDTO setTemperature(double temperature) {
        this.temperature = temperature;
        return this;
    }

    public double getWind() {
        return wind;
    }

    public WeatherDTO setWind(double wind) {
        this.wind = wind;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public WeatherDTO setDescription(String description) {
        this.description = description;
        return this;
    }

}