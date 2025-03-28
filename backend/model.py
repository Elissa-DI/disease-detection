
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os
from typing import List, Dict, Tuple, Any, Optional

# Define the path for saving the trained model
MODEL_PATH = "trained_model.joblib"
VECTORIZER_PATH = "symptom_vectorizer.joblib"
ENCODER_PATH = "label_encoder.joblib"

class DiseasePredictor:
    def __init__(self):
        self.model = None
        self.label_encoder = None
        self.symptoms = None
        self.disease_data = {
            "Common Cold": {
                "severity": "low",
                "description": "A viral infection of the upper respiratory tract affecting the nose and throat. Generally mild and resolves within a week.",
                "advice": "Rest, stay hydrated, and take over-the-counter medications for symptom relief. See a doctor if symptoms worsen or persist beyond 10 days."
            },
            "Influenza": {
                "severity": "medium",
                "description": "A contagious respiratory illness caused by influenza viruses. Can cause mild to severe illness and complications in high-risk individuals.",
                "advice": "Rest, stay hydrated, and consider antiviral medications if diagnosed early. Consult a doctor if you experience severe symptoms or belong to a high-risk group."
            },
            "COVID-19": {
                "severity": "high",
                "description": "A respiratory illness caused by the SARS-CoV-2 virus. Severity varies widely from asymptomatic to severe respiratory distress.",
                "advice": "Isolate immediately and get tested. Contact a healthcare provider if you experience severe symptoms such as difficulty breathing or persistent chest pain."
            },
            "Gastroenteritis": {
                "severity": "medium",
                "description": "Inflammation of the stomach and intestines, typically resulting from bacterial or viral infections. Usually resolves within a few days.",
                "advice": "Stay hydrated and rest. Seek medical attention if symptoms are severe, you can't keep fluids down, or you see blood in your stool."
            },
            "Migraine": {
                "severity": "medium",
                "description": "A neurological condition characterized by intense, debilitating headaches. Often accompanied by nausea, sensitivity to light, and other symptoms.",
                "advice": "Rest in a quiet, dark room and consider over-the-counter pain relievers. Consult a doctor if headaches are severe, frequent, or accompanied by unusual symptoms."
            }
        }

    def train(self, data_path: str) -> Tuple[float, Dict[str, Any]]:
        """Train the disease prediction model using the provided dataset"""
        # Load and preprocess data
        data = pd.read_csv(data_path)
        
        # Extract features and target
        X = data.drop('Disease', axis=1)
        y = data['Disease']
        
        # Store the symptoms list for later reference
        self.symptoms = list(X.columns)
        
        # Encode the disease labels
        self.label_encoder = LabelEncoder()
        y_encoded = self.label_encoder.fit_transform(y)
        
        # Split data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)
        
        # Initialize and train the model
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(X_train, y_train)
        
        # Evaluate the model
        y_pred = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        report = classification_report(y_test, y_pred, target_names=self.label_encoder.classes_, output_dict=True)
        
        # Save the model and necessary components
        joblib.dump(self.model, MODEL_PATH)
        joblib.dump(self.label_encoder, ENCODER_PATH)
        joblib.dump(self.symptoms, VECTORIZER_PATH)
        
        return accuracy, report

    def load_model(self) -> bool:
        """Load a pre-trained model if it exists"""
        try:
            if os.path.exists(MODEL_PATH) and os.path.exists(ENCODER_PATH) and os.path.exists(VECTORIZER_PATH):
                self.model = joblib.load(MODEL_PATH)
                self.label_encoder = joblib.load(ENCODER_PATH)
                self.symptoms = joblib.load(VECTORIZER_PATH)
                return True
            return False
        except Exception as e:
            print(f"Error loading model: {e}")
            return False

    def extract_symptoms_from_text(self, text: str) -> List[str]:
        """Extract symptoms from user-provided text"""
        text = text.lower()
        found_symptoms = []
        
        for symptom in self.symptoms:
            # Convert symptom name from snake_case to natural language
            natural_symptom = symptom.replace('_', ' ')
            if natural_symptom in text:
                found_symptoms.append(symptom)
                
        return found_symptoms

    def predict_from_text(self, text: str) -> Dict[str, Any]:
        """Predict diseases based on symptom text"""
        # Extract symptoms from text
        found_symptoms = self.extract_symptoms_from_text(text)
        
        if not found_symptoms:
            return {
                "predictions": [],
                "symptoms_found": [],
                "message": "No recognizable symptoms found. Please provide more details about how you're feeling."
            }
        
        # Create a feature vector from the found symptoms
        feature_vector = np.zeros(len(self.symptoms))
        for symptom in found_symptoms:
            if symptom in self.symptoms:
                symptom_index = self.symptoms.index(symptom)
                feature_vector[symptom_index] = 1
        
        # Get probability predictions for each class
        probabilities = self.model.predict_proba([feature_vector])[0]
        
        # Create predictions list with disease information
        predictions = []
        for i, prob in enumerate(probabilities):
            if prob > 0.05:  # Only include diseases with >5% probability
                disease_name = self.label_encoder.inverse_transform([i])[0]
                predictions.append({
                    "name": disease_name,
                    "probability": float(prob),
                    "severity": self.disease_data[disease_name]["severity"],
                    "description": self.disease_data[disease_name]["description"],
                    "advice": self.disease_data[disease_name]["advice"]
                })
        
        # Sort by probability (highest first)
        predictions = sorted(predictions, key=lambda x: x["probability"], reverse=True)
        
        # Map found symptoms from snake_case back to natural language for display
        display_symptoms = [symptom.replace('_', ' ') for symptom in found_symptoms]
        
        return {
            "predictions": predictions[:3],  # Return top 3 predictions
            "symptoms_found": display_symptoms
        }

# Function to check if model exists or train if needed
def get_or_train_model():
    predictor = DiseasePredictor()
    
    # Try to load existing model
    if predictor.load_model():
        print("Loaded existing disease prediction model")
        return predictor
    
    # Train new model if none exists
    print("Training new disease prediction model...")
    accuracy, report = predictor.train("data/disease_symptom_data.csv")
    print(f"Model trained with accuracy: {accuracy:.2f}")
    
    return predictor
