
import { Disease } from '@/types/diseases';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const getSymptoms = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/symptoms`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch symptoms');
    }
    
    const data = await response.json();
    return data.symptoms;
  } catch (error) {
    console.error('Error fetching symptoms:', error);
    return [];
  }
};

export const getPrediction = async (symptomText: string): Promise<Disease[]> => {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: symptomText }),
    });

    if (!response.ok) {
      throw new Error('Failed to get prediction');
    }

    const data = await response.json();
    return data.predictions.map((pred: any) => ({
      name: pred.name,
      probability: pred.probability,
      severity: pred.severity,
      description: pred.description,
      advice: pred.advice
    }));
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
};
