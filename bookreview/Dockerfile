# ----------- Build Stage -----------
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# ----------- Run Stage -----------
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/bookreview-0.0.1-SNAPSHOT.jar app.jar
COPY src/main/resources/serviceAccountKey.json src/main/resources/serviceAccountKey.json
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]