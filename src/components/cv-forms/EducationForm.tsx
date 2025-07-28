import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { CVData } from '../CVBuilder';

interface EducationFormProps {
  data: CVData;
  updateData: (section: keyof CVData, data: any) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, updateData }) => {
  const addEducation = () => {
    const newEducation = {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      graduationYear: '',
      gpa: '',
      achievements: '',
    };
    updateData('education', [...data.education, newEducation]);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = data.education.filter((_, i) => i !== index);
    updateData('education', updatedEducation);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = data.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    updateData('education', updatedEducation);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Education History</h3>
        <Button onClick={addEducation} size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      {data.education.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No education entries yet. Click "Add Education" to get started.</p>
        </div>
      )}

      {data.education.map((edu, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Education #{index + 1}</CardTitle>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeEducation(index)}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`institution-${index}`}>Institution/University *</Label>
                <Input
                  id={`institution-${index}`}
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  placeholder="University of Dar es Salaam"
                />
              </div>
              <div>
                <Label htmlFor={`degree-${index}`}>Degree *</Label>
                <Input
                  id={`degree-${index}`}
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  placeholder="Bachelor's Degree"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`fieldOfStudy-${index}`}>Field of Study *</Label>
                <Input
                  id={`fieldOfStudy-${index}`}
                  value={edu.fieldOfStudy}
                  onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
              <div>
                <Label htmlFor={`graduationYear-${index}`}>Graduation Year</Label>
                <Input
                  id={`graduationYear-${index}`}
                  value={edu.graduationYear}
                  onChange={(e) => updateEducation(index, 'graduationYear', e.target.value)}
                  placeholder="2024"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`gpa-${index}`}>GPA (Optional)</Label>
                <Input
                  id={`gpa-${index}`}
                  value={edu.gpa}
                  onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`achievements-${index}`}>Achievements & Activities</Label>
              <Textarea
                id={`achievements-${index}`}
                value={edu.achievements}
                onChange={(e) => updateEducation(index, 'achievements', e.target.value)}
                placeholder="Dean's List, Student Council President, Research Assistant..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EducationForm;