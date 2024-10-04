
from flask import Flask, request, jsonify, render_template
import googlemaps
import requests

app = Flask(__name__)

# Google Maps API Key
API_KEY = 'AIzaSyAmhEiuwQ1N3yFtSVQgb6MF7gGpY4drzuM'
gmaps = googlemaps.Client(key=API_KEY)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_route', methods=['POST'])
def get_route():
    data = request.json
    origin = data['origin']
    destination = data['destination']

    # Directions API로 경로 요청
    directions_result = gmaps.directions(origin, destination, mode="driving")
    steps = directions_result[0]['legs'][0]['steps']
    path = []
    for step in steps:
        path.append((step['start_location']['lat'], step['start_location']['lng']))
        path.append((step['end_location']['lat'], step['end_location']['lng']))

    # Elevation API로 고도 정보 요청
    elevation_url = "https://maps.googleapis.com/maps/api/elevation/json"
    locations = "|".join([f"{lat},{lng}" for lat, lng in path])
    elevation_params = {'locations': locations, 'key': API_KEY}
    elevation_response = requests.get(elevation_url, params=elevation_params)
    elevation_data = elevation_response.json()['results']

    # 고도 정보 계산
    elevations = [result['elevation'] for result in elevation_data]
    max_elevation = max(elevations)
    avg_elevation = sum(elevations) / len(elevations)

    return jsonify({
        'route': path,
        'max_elevation': max_elevation,
        'avg_elevation': avg_elevation
    })

if __name__ == '__main__':
    app.run(debug=True)
