import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { CVData } from '../CVBuilder';

interface ReferencesFormProps {
  data: CVData;
  updateData: (section: keyof CVData, data: any) => void;
}

const ReferencesForm: React.FC<ReferencesFormProps> = ({ data, updateData }) => {
  const addReference = () => {
    const newReference = {
      name: '',
      position: '',
      company: '',
      email: '',
      phone: '',
    };
    updateData('references', [...data.references, newReference]);
  };

  const removeReference = (index: number) => {
    const updatedReferences = data.references.filter((_, i) => i !== index);
    updateData('references', updatedReferences);
  };

  const updateReference = (index: number, field: string, value: string) => {
    const updatedReferences = data.references.map((ref, i) =>
      i === index ? { ...ref, [field]: value } : ref
    );
    updateData('references', updatedReferences);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Professional References</h3>
          <p className="text-muted-foreground text-sm">
            Add 2-3 professional references who can speak to your work and character
          </p>
        </div>
        <Button onClick={addReference} size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Reference
        </Button>
      </div>

      {data.references.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No references added yet. Click "Add Reference" to include professional contacts.</p>
          <p className="text-sm mt-2">
            Make sure to ask permission before adding someone as a reference!
          </p>
        </div>
      )}

      {data.references.map((reference, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Reference #{index + 1}</CardTitle>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeReference(index)}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`name-${index}`}>Full Name *</Label>
                <Input
                  id={`name-${index}`}
                  value={reference.name}
                  onChange={(e) => updateReference(index, 'name', e.target.value)}
                  placeholder="Dr. Jane Smith"
                />
              </div>
              <div>
                <Label htmlFor={`position-${index}`}>Position/Title *</Label>
                <Input
                  id={`position-${index}`}
                  value={reference.position}
                  onChange={(e) => updateReference(index, 'position', e.target.value)}
                  placeholder="Professor / Manager / Director"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`company-${index}`}>Company/Organization *</Label>
              <Input
                id={`company-${index}`}
                value={reference.company}
                onChange={(e) => updateReference(index, 'company', e.target.value)}
                placeholder="University of Dar es Salaam / ABC Company"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`email-${index}`}>Email Address *</Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  value={reference.email}
                  onChange={(e) => updateReference(index, 'email', e.target.value)}
                  placeholder="jane.smith@university.ac.tz"
                />
              </div>
              <div>
                <Label htmlFor={`phone-${index}`}>Phone Number</Label>
                <Input
                  id={`phone-${index}`}
                  value={reference.phone}
                  onChange={(e) => updateReference(index, 'phone', e.target.value)}
                  placeholder="+255 XXX XXX XXX"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-semibold mb-2">📋 Reference Guidelines</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Always ask permission before listing someone as a reference</li>
          <li>• Choose people who know your work well (professors, supervisors, mentors)</li>
          <li>• Provide them with a copy of your CV and the job description</li>
          <li>• 2-3 references are usually sufficient</li>
          <li>• Keep their contact information up to date</li>
        </ul>
      </div>

      {data.references.length > 0 && (
        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-green-800 dark:text-green-200 text-sm">
            ✅ Great! You have {data.references.length} reference{data.references.length > 1 ? 's' : ''} added. 
            Remember to inform them they may be contacted.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReferencesForm;