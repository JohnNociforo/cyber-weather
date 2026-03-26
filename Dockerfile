# Usa immagine base Java 17
FROM eclipse-temurin:17-jdk-alpine

# Installa unzip e bash (alcune immagini Alpine sono minimali)
RUN apk add --no-cache bash

# Cartella di lavoro
WORKDIR /app

# Copia tutto il progetto nel container
COPY . .

# Costruisci il jar dentro il container
RUN ./gradlew clean bootJar --no-daemon

# Copia il jar generato come app.jar
RUN cp build/libs/*.jar app.jar

# Esponi porta
EXPOSE 8080

# Avvia l'app
ENTRYPOINT ["java","-jar","app.jar"]