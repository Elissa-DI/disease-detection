
# Disease Prediction API

This is a FastAPI-based backend for the disease prediction system that uses machine learning to predict diseases based on symptoms.

## Project Structure

- `main.py`: FastAPI application with prediction endpoints
- `model.py`: Machine learning model for disease prediction
- `data/disease_symptom_data.csv`: Dataset for training the model
- `requirements.txt`: Python dependencies
- `Dockerfile`: Container configuration

## Setup

1. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

The API will be available at http://localhost:8000

## API Endpoints

- GET `/`: Health check endpoint
- GET `/api/symptoms`: Get the list of recognized symptoms
- POST `/api/predict`: Submit symptoms text to get disease predictions

## Model Training

The model will be automatically trained on first run if no existing model is found. The trained model is saved to disk for faster subsequent startups.

## Docker Deployment

Build and run the Docker container:

```
docker build -t disease-prediction-api .
docker run -p 8000:8000 disease-prediction-api
```

## Request Format for Prediction

```json
{
  "text": "I've been experiencing fever, headache and fatigue for the past 3 days."
}
```

## Response Format

```json
{
  "predictions": [
    {
      "name": "Influenza",
      "probability": 0.85,
      "severity": "medium",
      "description": "A contagious respiratory illness...",
      "advice": "Rest, stay hydrated..."
    },
    ...
  ],
  "symptoms_found": ["fever", "headache", "fatigue"]
}
```

## Notes

This system is for educational purposes only and should not replace professional medical advice. Always consult a healthcare provider for proper diagnosis and treatment.
