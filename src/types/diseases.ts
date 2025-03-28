
export interface Disease {
  name: string;
  probability: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  advice?: string;
}
