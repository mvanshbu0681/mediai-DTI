# flask_app.py
from flask import Flask, request, jsonify
import joblib
import traceback

app = Flask(__name__)

# Load the model and any additional data you need
model_data = joblib.load('medicine_prediction_model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        symptoms = data.get('symptoms')

        if not symptoms:
            return jsonify({"error": "Missing 'symptoms' in request"}), 400

        # Use the loaded model to predict
        result = model_data.predict_medicine(symptoms)
        return jsonify(result)

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
