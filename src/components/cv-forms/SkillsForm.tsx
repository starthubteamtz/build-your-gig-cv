import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { CVData } from '../CVBuilder';

interface SkillsFormProps {
  data: CVData;
  updateData: (section: keyof CVData, data: any) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, updateData }) => {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const addSkill = (category: 'technical' | 'languages' | 'soft', skill: string) => {
    if (skill.trim() && !data.skills[category].includes(skill.trim())) {
      const updatedSkills = {
        ...data.skills,
        [category]: [...data.skills[category], skill.trim()],
      };
      updateData('skills', updatedSkills);
      
      // Clear input
      if (category === 'technical') setNewTechnicalSkill('');
      if (category === 'languages') setNewLanguage('');
      if (category === 'soft') setNewSoftSkill('');
    }
  };

  const removeSkill = (category: 'technical' | 'languages' | 'soft', skillToRemove: string) => {
    const updatedSkills = {
      ...data.skills,
      [category]: data.skills[category].filter(skill => skill !== skillToRemove),
    };
    updateData('skills', updatedSkills);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent,
    category: 'technical' | 'languages' | 'soft',
    value: string
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category, value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Skills & Languages</h3>
        <p className="text-muted-foreground">
          Add your technical skills, languages, and soft skills to showcase your abilities.
        </p>
      </div>

      {/* Technical Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technical Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'technical', newTechnicalSkill)}
              placeholder="e.g., JavaScript, Python, Photoshop, Excel"
            />
            <Button
              onClick={() => addSkill('technical', newTechnicalSkill)}
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.technical.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeSkill('technical', skill)}
                />
              </Badge>
            ))}
          </div>
          {data.skills.technical.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No technical skills added yet. Add programming languages, software, tools, etc.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Languages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'languages', newLanguage)}
              placeholder="e.g., English (Fluent), Swahili (Native), French (Intermediate)"
            />
            <Button
              onClick={() => addSkill('languages', newLanguage)}
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.languages.map((language, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {language}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeSkill('languages', language)}
                />
              </Badge>
            ))}
          </div>
          {data.skills.languages.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No languages added yet. Include your proficiency level (e.g., Native, Fluent, Intermediate).
            </p>
          )}
        </CardContent>
      </Card>

      {/* Soft Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Soft Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'soft', newSoftSkill)}
              placeholder="e.g., Leadership, Communication, Problem Solving, Teamwork"
            />
            <Button
              onClick={() => addSkill('soft', newSoftSkill)}
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.soft.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeSkill('soft', skill)}
                />
              </Badge>
            ))}
          </div>
          {data.skills.soft.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No soft skills added yet. Add interpersonal and professional skills.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-semibold mb-2">💡 Tips for Skills</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Focus on skills relevant to the jobs you're applying for</li>
          <li>• Be honest about your skill level</li>
          <li>• Include both hard and soft skills</li>
          <li>• For languages, always mention your proficiency level</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsForm;