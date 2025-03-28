
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface SymptomInputProps {
  onSubmit: (text: string) => void;
  loading: boolean;
}

const SymptomInput: React.FC<SymptomInputProps> = ({ onSubmit, loading }) => {
  const [symptoms, setSymptoms] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSymptoms(e.target.value);
  };

  const handleSubmit = () => {
    if (symptoms.trim()) {
      onSubmit(symptoms);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Describe your symptoms in detail... (e.g., I've been experiencing a persistent cough for 3 days, along with a mild fever and fatigue.)"
        value={symptoms}
        onChange={handleChange}
        className="min-h-[150px] resize-none border-input bg-background text-foreground"
      />
      
      <div className="text-xs text-muted-foreground">
        <p>Tip: Include details such as:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Duration of symptoms</li>
          <li>Severity (mild, moderate, severe)</li>
          <li>Any relevant medical history</li>
          <li>Any alleviating or aggravating factors</li>
        </ul>
      </div>
      
      <Button 
        onClick={handleSubmit} 
        className="w-full"
        disabled={loading || !symptoms.trim()}
      >
        {loading ? 'Analyzing...' : 'Analyze Symptoms'}
        {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
};

export default SymptomInput;
