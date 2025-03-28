
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
import uvicorn
from model import get_or_train_model

app = FastAPI(title="Disease Prediction API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the disease predictor
predictor = get_or_train_model()

class SymptomRequest(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"message": "Disease Prediction API is running"}

@app.get("/api/symptoms")
def get_symptoms():
    """Return the list of symptoms that the model recognizes"""
    # Convert from snake_case to readable format
    readable_symptoms = [symptom.replace('_', ' ') for symptom in predictor.symptoms]
    return {"symptoms": readable_symptoms}

@app.post("/api/predict")
def predict_disease(request: SymptomRequest):
    """Predict diseases based on symptom text"""
    if not request.text:
        raise HTTPException(status_code=400, detail="No symptom description provided")
    
    # Get predictions from the model
    result = predictor.predict_from_text(request.text)
    
    # Return prediction result
    return result

if __name__ == "__main__":
    # Ensure the model is loaded
    if not predictor:
        raise RuntimeError("Failed to initialize disease prediction model")
    
    # Run the FastAPI app
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
