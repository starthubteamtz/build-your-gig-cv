import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export type CVTemplate = 'classic' | 'modern' | 'minimal' | 'professional' | 'creative' | 'executive';

interface CVTemplateSelectorProps {
  selectedTemplate: CVTemplate;
  onSelectTemplate: (template: CVTemplate) => void;
}

const templates: Array<{
  id: CVTemplate;
  name: string;
  description: string;
  preview: string;
}> = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional CV format with clean sections',
    preview: 'Clean, professional layout with clear sections',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with accent colors',
    preview: 'Modern typography with strategic color accents',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple, elegant design focusing on content',
    preview: 'Minimalist approach with maximum readability',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate-friendly format for business roles',
    preview: 'Business-ready template for corporate positions',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Artistic layout for creative professionals',
    preview: 'Unique design for creative industry roles',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Premium layout for senior positions',
    preview: 'Sophisticated design for leadership roles',
  },
];

const CVTemplateSelector: React.FC<CVTemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate,
}) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your CV Template</h2>
        <p className="text-muted-foreground">
          Select a professional template that matches your career style
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id
                ? 'ring-2 ring-primary border-primary'
                : 'hover:border-primary/50'
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.description}
                  </p>
                </div>
                {selectedTemplate === template.id && (
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              
              <div className="bg-muted p-3 rounded-lg text-xs text-muted-foreground mb-3">
                {template.preview}
              </div>
              
              <Button
                variant={selectedTemplate === template.id ? "default" : "outline"}
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTemplate(template.id);
                }}
              >
                {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CVTemplateSelector;