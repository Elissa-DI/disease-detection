
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, HelpCircle, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface Disease {
  name: string;
  probability: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  advice?: string;
}

interface PredictionResultProps {
  prediction: Disease[] | null;
  loading: boolean;
}

const SeverityBadge = ({ severity }: { severity: 'low' | 'medium' | 'high' }) => {
  const colors = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-secondary text-secondary-foreground",
    high: "bg-destructive text-destructive-foreground"
  };

  const icons = {
    low: <CheckCircle className="h-4 w-4 mr-1" />,
    medium: <HelpCircle className="h-4 w-4 mr-1" />,
    high: <AlertTriangle className="h-4 w-4 mr-1" />
  };

  return (
    <div className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center", colors[severity])}>
      {icons[severity]}
      {severity.charAt(0).toUpperCase() + severity.slice(1)} Severity
    </div>
  );
};

const PredictionResultCard = ({ disease }: { disease: Disease }) => {
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgress(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-full overflow-hidden animate-slide-up bg-card hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{disease.name}</CardTitle>
          <SeverityBadge severity={disease.severity} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Probability</span>
            <span className="font-medium">{Math.round(disease.probability * 100)}%</span>
          </div>
          <Progress 
            value={showProgress ? disease.probability * 100 : 0} 
            className="h-2 transition-all duration-1000 ease-out"
          />
        </div>
        <Separator />
        <p className="text-sm text-muted-foreground">
          {disease.description}
        </p>
        
        {disease.advice && (
          <>
            <Separator />
            <div className="bg-secondary/50 rounded-md p-3">
              <div className="flex items-start gap-2">
                <Stethoscope className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium mb-1">Medical Advice</h4>
                  <p className="text-sm text-muted-foreground">{disease.advice}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, loading }) => {
  if (loading) {
    return (
      <div className="w-full space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full bg-card animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-6 w-1/3 bg-muted rounded"></div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-1/4 bg-muted rounded"></div>
                  <div className="h-4 w-1/12 bg-muted rounded"></div>
                </div>
                <div className="h-2 w-full bg-muted rounded"></div>
              </div>
              <Separator />
              <div className="space-y-1">
                <div className="h-4 w-full bg-muted rounded"></div>
                <div className="h-4 w-5/6 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!prediction || prediction.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-4">
      {prediction.map((disease, index) => (
        <PredictionResultCard key={index} disease={disease} />
      ))}
    </div>
  );
};

export default PredictionResult;
