# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# Base image for running the app
ARG APP_UID=0

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
# Kestrel listens on 5001 for nginx upstream (see nginx.conf)
ENV ASPNETCORE_URLS=http://+:5001
EXPOSE 80

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy solution and project files first for better restore cache
COPY ["Cardano API.sln", "./"]
COPY ["Cardano API/Cardano API.csproj", "Cardano API/"]
COPY ["Cardano.Application/Cardano.Application.csproj", "Cardano.Application/"]
COPY ["Cardano.Computation/Cardano.Computation.vbproj", "Cardano.Computation/"]
COPY ["Cardano.Domain/Cardano.Domain.csproj", "Cardano.Domain/"]
COPY ["Cardano.Infrastructure/Cardano.Infrastructure.csproj", "Cardano.Infrastructure/"]

RUN dotnet restore "Cardano API/Cardano API.csproj"

# Copy all other files and build
COPY . ./
WORKDIR "/src/Cardano API"
RUN dotnet build "Cardano API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Cardano API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final runtime stage
FROM base AS final
WORKDIR /app

# Ensure root user for nginx install and to run both processes
USER root

# Install nginx
RUN apt-get update && apt-get install -y --no-install-recommends nginx \
    && rm -rf /var/lib/apt/lists/*

# Apply custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=publish /app/publish ./

EXPOSE 80

# Inline entrypoint: no script file (avoids CRLF/copy issues on Windows)
ENTRYPOINT ["/bin/sh", "-c", "dotnet 'Cardano API.dll' & exec nginx -g 'daemon off;'"]
