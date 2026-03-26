# 🌦️ CyberMeteo (Weather App)

## 📌 Overview

**CyberMeteo (Weather App)** è un'applicazione web sviluppata con **Java** e **Spring Boot** che consente di ottenere informazioni meteorologiche in tempo reale a partire dal nome di una città inserito dall’utente.

Il progetto integra un backend REST con un frontend dinamico, offrendo un’esperienza interattiva in cui anche l’interfaccia grafica si adatta alle condizioni meteo correnti.

---

## 🚀 Key Features

* 🔍 **City Search**

    * Input utente per la ricerca di una città

* 🌍 **Geocoding**

    * Conversione del nome della città in **latitudine e longitudine**

* 🌦️ **Weather Data Retrieval**

    * Recupero dati meteo in tempo reale tramite coordinate geografiche

* 🎨 **Dynamic Frontend**

    * UI che cambia in base alle condizioni atmosferiche:

        * ☀️ Sole → sfondo luminoso
        * 🌧️ Pioggia → effetti animati
        * ☁️ Nuvoloso → tema grigio
        * 🌙 Notte → modalità scura

---

## 🔌 External APIs

L’applicazione utilizza API esterne per ottenere i dati necessari:

* 🌍 **Geocoding API**

    * Utilizzata per convertire il nome della città in coordinate geografiche (latitudine e longitudine)

* 🌦️ **Weather API**

    * Utilizzata per ottenere informazioni meteorologiche aggiornate (temperatura, condizioni climatiche, ecc.)

👉 Le chiamate alle API vengono gestite dal backend **Spring Boot**, che elabora i dati e li espone al frontend in modo strutturato.

---

## 🛠️ Tech Stack

* **Backend**

    * Java
    * Spring Boot
    * REST API

* **Frontend**

    * HTML
    * CSS
    * JavaScript

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone <REPOSITORY_URL>
```

### 2. Open the project

Importa il progetto nel tuo IDE (consigliato: IntelliJ IDEA)

### 3. Run the application

Esegui la classe principale annotata con:

```java
@SpringBootApplication
```

### 4. Access the app

Apri il browser e vai su:

```
http://localhost:8080
```

---

## ⚙️ Notes

* Nessuna configurazione complessa richiesta
* Assicurati che la porta **8080** sia libera
* Il backend gestisce completamente l’integrazione con le API esterne

---

## 📈 Future Improvements

* Migliore gestione degli errori (es. città non trovata)
* Caching delle richieste API
* Supporto multi-lingua
* UI/UX enhancements
* Deploy cloud (es. Render)

---

## 👨‍💻 Author

Progetto sviluppato a scopo didattico per approfondire:

* Integrazione con API esterne
* Architettura REST con Spring Boot
* Separazione backend/frontend
* UI dinamica basata su dati real-time

---

## 📷 Preview

> Puoi aggiungere qui screenshot o GIF dell’app per migliorare la presentazione del progetto nel portfolio GitHub.

---
