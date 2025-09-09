from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dummy disease prediction model
# In real use, replace with ML model

def predict_disease(age, gender, symptoms):
    symptoms = [s.strip().lower() for s in symptoms.split(',')]
    if 'fever' in symptoms:
        return 'Fever', 0.95
    elif 'cough' in symptoms:
        return 'Common Cold', 0.90
    else:
        return 'Healthy', 0.80

# Dummy diet recommendation based on disease
DIET_MAP = {
    'Fever': [
        'Drink plenty of fluids',
        'Eat light, easy-to-digest foods',
        'Avoid spicy and oily foods',
        'Rest as much as possible'
    ],
    'Common Cold': [
        'Drink warm liquids',
        'Eat fruits rich in vitamin C',
        'Avoid cold drinks',
        'Get enough sleep'
    ],
    'Healthy': [
        'Maintain a balanced diet',
        'Exercise regularly',
        'Stay hydrated'
    ]
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    age = data.get('age')
    gender = data.get('gender')
    symptoms = data.get('symptoms', '')
    disease, confidence = predict_disease(age, gender, symptoms)
    return jsonify({'prediction': disease, 'confidence': confidence})

@app.route('/diet', methods=['POST'])
def diet():
    data = request.json
    disease = data.get('disease', 'Healthy')
    recommendations = DIET_MAP.get(disease, DIET_MAP['Healthy'])
    return jsonify({'recommendations': recommendations})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
