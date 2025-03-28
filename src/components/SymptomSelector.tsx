
import React, { useState } from 'react';
import { Check, ChevronsUpDown, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { SYMPTOMS } from '@/utils/mockData';

interface SymptomSelectorProps {
  onSymptomChange: (selectedSymptoms: string[]) => void;
}

const SymptomSelector: React.FC<SymptomSelectorProps> = ({ onSymptomChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const handleSelect = (currentValue: string) => {
    let updatedSymptoms: string[];
    
    if (selectedSymptoms.includes(currentValue)) {
      updatedSymptoms = selectedSymptoms.filter(symptom => symptom !== currentValue);
    } else {
      updatedSymptoms = [...selectedSymptoms, currentValue];
    }
    
    setSelectedSymptoms(updatedSymptoms);
    onSymptomChange(updatedSymptoms);
    setOpen(false);
  };

  const removeSymptom = (symptom: string) => {
    const updatedSymptoms = selectedSymptoms.filter(s => s !== symptom);
    setSelectedSymptoms(updatedSymptoms);
    onSymptomChange(updatedSymptoms);
  };

  return (
    <div className="w-full space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-12 px-4 py-2 bg-card border-input"
          >
            <span className="text-sm text-muted-foreground">
              {selectedSymptoms.length > 0 
                ? `${selectedSymptoms.length} symptom${selectedSymptoms.length !== 1 ? 's' : ''} selected`
                : 'Select symptoms...'}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 max-h-[300px] overflow-auto">
          <Command>
            <CommandInput placeholder="Search symptoms..." />
            <CommandEmpty>No symptom found.</CommandEmpty>
            <CommandGroup>
              {SYMPTOMS.map((symptom) => (
                <CommandItem
                  key={symptom}
                  value={symptom}
                  onSelect={() => handleSelect(symptom)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedSymptoms.includes(symptom) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {symptom}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedSymptoms.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-fade-in">
          {selectedSymptoms.map(symptom => (
            <Badge key={symptom} variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
              {symptom}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors" 
                onClick={() => removeSymptom(symptom)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SymptomSelector;
