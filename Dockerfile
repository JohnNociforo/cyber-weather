# Base image Java 17
FROM eclipse-temurin:17-jdk-alpine

# Installa bash (Alpine minimale)
RUN apk add --no-cache bash

# Cartella di lavoro
WORKDIR /app

# Copia tutto il progetto
COPY . .

# Rendi gradlew eseguibile
RUN chmod +x gradlew

# Costruisci il jar dentro il container
RUN ./gradlew clean bootJar --no-daemon

# Copia il jar generato come app.jar
RUN cp build/libs/*.jar app.jar

# Esponi la porta
EXPOSE 8080

# Avvia l'app
ENTRYPOINT ["java","-jar","app.jar"]