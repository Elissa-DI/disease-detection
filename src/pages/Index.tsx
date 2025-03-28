
import React, { useState } from 'react';
import SymptomInput from '@/components/SymptomInput';
import PredictionResult from '@/components/PredictionResult';
import DataVisualization from '@/components/DataVisualization';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Activity, ArrowRight } from 'lucide-react';
import { getPrediction } from '@/services/predictionService';
import { toast } from 'sonner';
import { Disease } from '@/types/diseases';

const Index = () => {
  const [prediction, setPrediction] = useState<Disease[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handlePredict = async (symptomText: string) => {
    if (!symptomText.trim()) {
      toast.error('Please describe your symptoms.');
      return;
    }

    setLoading(true);
    setShowResults(true);

    try {
      const result = await getPrediction(symptomText);
      setPrediction(result);
      
      if (result.length === 0) {
        toast.info('No recognizable symptoms found. Please provide more details about how you\'re feeling.');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('Failed to generate prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full page-transition">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/5 border border-primary/10">
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Disease Prediction System
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Describe your symptoms in detail and our AI-powered system will analyze them to predict potential conditions.
            This is for informational purposes only and should not replace professional medical advice.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 px-4 md:px-8 lg:px-12 pb-16 max-w-7xl mx-auto w-full">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Symptom Input Card */}
          <Card className="lg:col-span-1 h-fit bg-card shadow-sm">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg font-medium">Describe Your Symptoms</h2>
                <p className="text-sm text-muted-foreground">
                  Please describe all symptoms you are currently experiencing in as much detail as possible.
                </p>
              </div>
              
              <SymptomInput onSubmit={handlePredict} loading={loading} />
            </CardContent>
          </Card>

          {/* Results Area */}
          <div className="lg:col-span-2 space-y-8">
            {(showResults || prediction) && (
              <>
                {/* Prediction Results */}
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Prediction Results</h2>
                  <PredictionResult prediction={prediction} loading={loading} />
                </div>

                <Separator />

                {/* Data Visualization */}
                <div className="space-y-4">
                  <DataVisualization data={prediction} loading={loading} />
                </div>
              </>
            )}

            {!showResults && !prediction && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4 py-12">
                  <div className="p-4 bg-secondary/50 rounded-full inline-flex">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">Analysis Results Will Appear Here</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Describe your symptoms in detail and click the Analyze button to see predictions and visualizations.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 px-4 bg-secondary/30 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> This prediction system is for informational purposes only and does not provide medical advice.
            Always consult with a qualified healthcare provider for diagnosis and treatment.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
