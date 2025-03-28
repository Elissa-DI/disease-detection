
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, AlertTriangle, Brain, Code, MessagesSquare, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-12 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full page-transition">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            About DiagnosisAI
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn more about our disease prediction system, how it works, and the technology behind it.
          </p>
        </div>
      </section>

      <Separator />

      {/* Main Content */}
      <section className="py-12 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              DiagnosisAI was developed to provide a preliminary assessment tool that helps users understand potential conditions based on their symptoms. We aim to make medical information more accessible while emphasizing the importance of professional medical advice.
            </p>
            <p className="text-muted-foreground">
              This system is not intended to replace consultations with healthcare professionals but rather to serve as an educational resource and preliminary guidance tool.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="p-8 bg-card rounded-full border border-border">
              <Activity className="h-24 w-24 text-primary" />
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* How It Works */}
      <section className="py-12 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full animate-fade-in">
        <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-card border-border">
            <CardHeader>
              <Brain className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Machine Learning Model</CardTitle>
              <CardDescription>
                Our system uses advanced machine learning algorithms trained on medical data to analyze symptom patterns.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader>
              <MessagesSquare className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Symptom Analysis</CardTitle>
              <CardDescription>
                The model examines the combination of symptoms you provide to identify potential matching conditions.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader>
              <Code className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Python Backend</CardTitle>
              <CardDescription>
                Powered by robust Python algorithms that process data and generate predictions with confidence scores.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Limitations and Disclaimer */}
      <section className="py-12 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="h-12 w-12 text-muted-foreground" />
          </div>
          
          <h2 className="text-2xl font-bold mb-4 text-center">Limitations & Disclaimer</h2>
          
          <Card className="bg-card/50 border-border">
            <CardContent className="pt-6 space-y-4">
              <p className="text-foreground">
                <strong>Not a Diagnostic Tool:</strong> DiagnosisAI is an educational resource, not a diagnostic tool. It provides information on possible conditions based on reported symptoms, but cannot account for your complete medical history or perform physical examinations.
              </p>
              
              <p className="text-foreground">
                <strong>Seek Medical Advice:</strong> Always consult with a qualified healthcare provider for proper diagnosis and treatment of medical conditions. Never disregard professional medical advice because of something you have read on this system.
              </p>
              
              <p className="text-foreground">
                <strong>Statistical Nature:</strong> Predictions are based on statistical correlations between symptoms and conditions, which may not apply to individual cases. The system cannot account for all possible variables affecting health.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <section className="py-8 px-4 bg-secondary/30 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span className="font-semibold">DiagnosisAI</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 mr-1" />
            <span>For educational purposes only</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
