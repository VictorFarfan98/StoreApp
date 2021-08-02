# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ./StoreApi/* ./StoreApi/
RUN dotnet restore /app/StoreApi/StoreApi.csproj

# copy the project files and build our release
RUN dotnet publish /app/StoreApi/StoreApi.csproj -c Release -o out 

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "StoreApi.dll"]