from fastapi import FastAPI
from pydantic import BaseModel
import joblib  # To load the model
import numpy as np

# Load the trained ML model
model = joblib.load("medicine_model.pkl")  # Change this to your actual file name

# Initialize FastAPI
app = FastAPI()

# Define request schema
class PredictionRequest(BaseModel):
    features: list  # Input features for prediction

# Define response schema
class PredictionResponse(BaseModel):
    prediction: str  # Output label

# Create a prediction endpoint
@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    # Convert input list into a numpy array
    input_features = np.array(request.features).reshape(1, -1)  # Ensure it's a 2D array
    
    # Make prediction
    prediction = model.predict(input_features)
    
    return {"prediction": str(prediction[0])}  # Convert result to string

