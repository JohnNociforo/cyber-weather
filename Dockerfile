# Usa immagine base Java 17
FROM eclipse-temurin:17-jdk-alpine

# Cartella di lavoro dentro il container
WORKDIR /app

# Copia il jar generato nella cartella di lavoro
COPY build/libs/app.jar app.jar

# Esponi la porta su cui gira Spring Boot
EXPOSE 8080

# Comando per avviare l'app
ENTRYPOINT ["java","-jar","app.jar"]