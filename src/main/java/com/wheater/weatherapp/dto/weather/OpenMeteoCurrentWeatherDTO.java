package com.wheater.weatherapp.dto.weather;

/**
 * Dto che contiene le informazioni del tempo corrente di un determinato luogo.
 */
public class OpenMeteoCurrentWeatherDTO {

    private double temperature;
    private double windspeed;
    private int weathercode;

    public OpenMeteoCurrentWeatherDTO() {}

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getWindspeed() {
        return windspeed;
    }

    public void setWindspeed(double windspeed) {
        this.windspeed = windspeed;
    }

    public int getWeathercode() {
        return weathercode;
    }

    public void setWeathercode(int weathercode) {
        this.weathercode = weathercode;
    }
}