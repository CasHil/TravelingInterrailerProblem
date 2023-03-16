import json
import requests
from dotenv import load_dotenv
from geopy.geocoders import GoogleV3
import time
import os
load_dotenv()

# Read the TrainRoutes.json file
with open('FerryRoutes.json', encoding='utf-8') as f:
    data = json.load(f)
    # Each json object is an object, which contains a key called "Name" which are two cities separated by a hyphen. If the city is unique, geocode it and add it to the list of cities.
    cities = []
    for obj in data:
        for city in obj["Name"].split(" - "):
            if city not in cities:
                cities.append(city)
    # Geocode each city using geopy and add the latitude and longitude to a new list.
    geocoded_cities = []
    geolocator = GoogleV3(api_key=os.getenv("GOOGLE_API_KEY")
    none_cities = []
    for city in cities:
        print(f"Geocoding {city}...")
        location = geolocator.geocode(city)
        print(location)
        if location is None:
            none_cities.append(city)
            continue
        geocoded_cities.append({"Name": city, "Latitude": location.latitude, "Longitude": location.longitude})
        # Wait 1 second to avoid overloading the geocoding service.
        time.sleep(1)
        
    print(none_cities)
    # Write the list of cities to a new file called Cities.json
    with open('FerryRoutes.json', 'w', encoding='utf8') as c:
        json.dump(geocoded_cities, c, ensure_ascii=False)
        
    
    
    