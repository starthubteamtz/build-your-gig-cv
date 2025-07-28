import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CVData } from '../CVBuilder';

interface PersonalInfoFormProps {
  data: CVData;
  updateData: (section: keyof CVData, data: any) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, updateData }) => {
  const handleInputChange = (field: string, value: string) => {
    updateData('personalInfo', {
      ...data.personalInfo,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.personalInfo.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={data.personalInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+255 XXX XXX XXX"
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={data.personalInfo.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="City, Country"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linkedIn">LinkedIn Profile</Label>
          <Input
            id="linkedIn"
            value={data.personalInfo.linkedIn}
            onChange={(e) => handleInputChange('linkedIn', e.target.value)}
            placeholder="linkedin.com/in/yourprofile"
          />
        </div>
        <div>
          <Label htmlFor="portfolio">Portfolio/Website</Label>
          <Input
            id="portfolio"
            value={data.personalInfo.portfolio}
            onChange={(e) => handleInputChange('portfolio', e.target.value)}
            placeholder="www.yourportfolio.com"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={data.personalInfo.summary}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          placeholder="Write a brief summary about yourself, your skills, and career objectives..."
          rows={4}
        />
        <p className="text-sm text-muted-foreground mt-1">
          A 2-3 sentence summary highlighting your key skills and career goals.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoForm;