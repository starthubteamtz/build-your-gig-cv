import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { CVData } from '../CVBuilder';
interface ExperienceFormProps {
  data: CVData;
  updateData: (section: keyof CVData, data: any) => void;
}
const ExperienceForm: React.FC<ExperienceFormProps> = ({
  data,
  updateData
}) => {
  const addExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    updateData('experience', [...data.experience, newExperience]);
  };
  const removeExperience = (index: number) => {
    const updatedExperience = data.experience.filter((_, i) => i !== index);
    updateData('experience', updatedExperience);
  };
  const updateExperience = (index: number, field: string, value: string | boolean) => {
    const updatedExperience = data.experience.map((exp, i) => i === index ? {
      ...exp,
      [field]: value
    } : exp);
    updateData('experience', updatedExperience);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button onClick={addExperience} size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      {data.experience.length === 0 && <div className="text-center py-8 text-muted-foreground">
          <p>No work experience yet. Click "Add Experience" to get started.</p>
          <p className="text-sm mt-2">Include internships, part-time jobs, and volunteer work!</p>
        </div>}

      {data.experience.map((exp, index) => <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Experience #{index + 1}</CardTitle>
            <Button variant="destructive" size="sm" onClick={() => removeExperience(index)} className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`company-${index}`}>Company/Organization *</Label>
                <Input id={`company-${index}`} value={exp.company} onChange={e => updateExperience(index, 'company', e.target.value)} placeholder="T-Hustle Africa" className="bg-zinc-400" />
              </div>
              <div>
                <Label htmlFor={`position-${index}`}>Position/Title *</Label>
                <Input id={`position-${index}`} value={exp.position} onChange={e => updateExperience(index, 'position', e.target.value)} placeholder="Marketing Intern" className="bg-zinc-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`startDate-${index}`}>Start Date *</Label>
                <Input id={`startDate-${index}`} type="month" value={exp.startDate} onChange={e => updateExperience(index, 'startDate', e.target.value)} className="bg-zinc-400" />
              </div>
              <div>
                <Label htmlFor={`endDate-${index}`}>End Date</Label>
                <Input id={`endDate-${index}`} type="month" value={exp.endDate} onChange={e => updateExperience(index, 'endDate', e.target.value)} disabled={exp.current} className="bg-zinc-400" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id={`current-${index}`} checked={exp.current} onCheckedChange={checked => {
            updateExperience(index, 'current', checked as boolean);
            if (checked) {
              updateExperience(index, 'endDate', '');
            }
          }} />
              <Label htmlFor={`current-${index}`}>I currently work here</Label>
            </div>

            <div>
              <Label htmlFor={`description-${index}`}>Job Description & Achievements</Label>
              <Textarea id={`description-${index}`} value={exp.description} onChange={e => updateExperience(index, 'description', e.target.value)} placeholder="• Managed social media accounts with 10k+ followers&#10;• Increased engagement by 50% through creative campaigns&#10;• Collaborated with team of 5 to organize events" rows={4} className="bg-zinc-700" />
              <p className="text-sm text-muted-foreground mt-1">
                Use bullet points to highlight your key responsibilities and achievements.
              </p>
            </div>
          </CardContent>
        </Card>)}
    </div>;
};
export default ExperienceForm;