# Frontend build stage
FROM node:16 AS frontend-build
COPY frontend /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN npm run build

# Backend build stage
FROM gradle:8.2.1-jdk17 AS backend-build
COPY backend /home/gradle/src
COPY --from=frontend-build /usr/src/app/build /home/gradle/src/src/main/resources/static
WORKDIR /home/gradle/src
RUN gradle build --no-daemon -x test

# Final stage
FROM openjdk:17-jdk-slim
COPY --from=backend-build /home/gradle/src/build/libs/poll-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]