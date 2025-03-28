
// This is mock data for the prototype - in a real app, this would be replaced with API calls to your Python backend

export const SYMPTOMS = [
  "Fever",
  "Cough",
  "Headache",
  "Fatigue",
  "Sore Throat",
  "Shortness of Breath",
  "Muscle Aches",
  "Loss of Taste or Smell",
  "Nausea",
  "Diarrhea",
  "Vomiting",
  "Chills",
  "Congestion",
  "Runny Nose",
  "Rash",
  "Stomach Pain",
  "Dizziness",
  "Joint Pain",
  "Chest Pain",
  "Loss of Appetite"
];

export const DISEASE_DATA = {
  "Common Cold": {
    symptoms: ["Cough", "Congestion", "Runny Nose", "Sore Throat", "Headache"],
    severity: "low",
    description: "A viral infection of the upper respiratory tract affecting the nose and throat. Generally mild and resolves within 7-10 days."
  },
  "Influenza": {
    symptoms: ["Fever", "Cough", "Muscle Aches", "Fatigue", "Headache", "Chills"],
    severity: "medium",
    description: "A contagious respiratory illness caused by influenza viruses. Can cause mild to severe illness and complications in high-risk individuals."
  },
  "COVID-19": {
    symptoms: ["Fever", "Cough", "Shortness of Breath", "Fatigue", "Loss of Taste or Smell", "Headache"],
    severity: "high",
    description: "A respiratory illness caused by the SARS-CoV-2 virus. Severity varies widely from asymptomatic to severe respiratory distress."
  },
  "Gastroenteritis": {
    symptoms: ["Nausea", "Vomiting", "Diarrhea", "Stomach Pain", "Fever", "Headache"],
    severity: "medium",
    description: "Inflammation of the stomach and intestines, typically resulting from bacterial or viral infections. Usually resolves within a few days."
  },
  "Migraine": {
    symptoms: ["Headache", "Nausea", "Dizziness", "Fatigue", "Loss of Appetite"],
    severity: "medium",
    description: "A neurological condition characterized by intense, debilitating headaches. Often accompanied by nausea, sensitivity to light, and other symptoms."
  }
};

// Mock prediction service function
export const mockPrediction = (symptoms: string[]) => {
  if (symptoms.length === 0) return [];

  const predictions = Object.entries(DISEASE_DATA).map(([disease, data]) => {
    // Calculate how many symptoms match
    const matchingSymptoms = symptoms.filter(s => data.symptoms.includes(s));
    const matchRate = matchingSymptoms.length / data.symptoms.length;
    
    // Calculate probability based on matching symptoms
    let probability = Math.min(0.95, matchRate * (0.7 + Math.random() * 0.3));
    
    // If no symptoms match, set a very low probability
    if (matchingSymptoms.length === 0) {
      probability = 0.05 + Math.random() * 0.1;
    }

    return {
      name: disease,
      probability: probability,
      severity: data.severity as 'low' | 'medium' | 'high',
      description: data.description
    };
  });

  // Sort by probability (highest first) and return top 3
  return predictions
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 3);
};
