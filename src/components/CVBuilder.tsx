import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Download, Eye } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PersonalInfoForm from './cv-forms/PersonalInfoForm';
import EducationForm from './cv-forms/EducationForm';
import ExperienceForm from './cv-forms/ExperienceForm';
import SkillsForm from './cv-forms/SkillsForm';
import ProjectsForm from './cv-forms/ProjectsForm';
import ReferencesForm from './cv-forms/ReferencesForm';
import CVPreview from './CVPreview';
import CVTemplateSelector, { CVTemplate } from './CVTemplateSelector';
export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedIn: string;
    portfolio: string;
    summary: string;
  };
  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    graduationYear: string;
    gpa: string;
    achievements: string;
  }[];
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  skills: {
    technical: string[];
    languages: string[];
    soft: string[];
  };
  projects: {
    title: string;
    description: string;
    technologies: string;
    link: string;
  }[];
  references: {
    name: string;
    position: string;
    company: string;
    email: string;
    phone: string;
  }[];
}
const initialCVData: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedIn: '',
    portfolio: '',
    summary: ''
  },
  education: [],
  experience: [],
  skills: {
    technical: [],
    languages: [],
    soft: []
  },
  projects: [],
  references: []
};
const CVBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0); // Start with personal info
  const [cvData, setCVData] = useState<CVData>(initialCVData);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate>('classic');
  const steps = [{
    title: 'Personal Info',
    component: PersonalInfoForm
  }, {
    title: 'Education',
    component: EducationForm
  }, {
    title: 'Experience',
    component: ExperienceForm
  }, {
    title: 'Skills',
    component: SkillsForm
  }, {
    title: 'Projects',
    component: ProjectsForm
  }, {
    title: 'References',
    component: ReferencesForm
  }, {
    title: 'Template',
    component: null
  }];
  const progress = (currentStep + 1) / steps.length * 100;
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };
  const updateCVData = (section: keyof CVData, data: any) => {
    setCVData(prev => ({
      ...prev,
      [section]: data
    }));
  };
  const downloadPDF = async () => {
    const element = document.getElementById('cv-preview');
    if (!element) return;
    try {
      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 0
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = canvas.height * pdfWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      const fileName = cvData.personalInfo.fullName ? `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf` : 'My_CV.pdf';
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    }
  };
  const CurrentFormComponent = steps[currentStep]?.component;
  if (showPreview) {
    return <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => setShowPreview(false)} className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Builder
            </Button>
            <Button onClick={downloadPDF} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
          <div id="cv-preview">
            <CVPreview cvData={cvData} template={selectedTemplate} />
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Professional CV Bulder</h1>
          <p className="text-muted-foreground text-lg">
            Create a stunning CV step by step for T-Hustle Africa opportunities
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Step Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {steps.map((step, index) => <Button key={index} variant={index === currentStep ? "default" : index < currentStep ? "secondary" : "outline"} size="sm" onClick={() => handleStepClick(index)} className="text-xs font-medium bg-zinc-100 text-zinc-600">
              {index + 1}. {step.title}
            </Button>)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {steps[currentStep]?.title}
                  {currentStep < steps.length - 1 && <Button variant="outline" size="sm" onClick={() => setShowPreview(true)} className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentStep === steps.length - 1 ? <CVTemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} /> : CurrentFormComponent ? <CurrentFormComponent data={cvData} updateData={updateCVData} /> : null}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0} className="flex items-center gap-2 bg-gray-300 hover:bg-gray-200">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button onClick={handleNext} disabled={currentStep === steps.length - 1} className="flex items-center gap-2">
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Mini Preview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
                  <div className="font-semibold text-primary">
                    {cvData.personalInfo.fullName || 'Your Name'}
                  </div>
                  <div className="text-muted-foreground">
                    {cvData.personalInfo.email || 'your.email@example.com'}
                  </div>
                  <div className="text-muted-foreground">
                    {cvData.personalInfo.phone || '+255 XXX XXX XXX'}
                  </div>
                  <div className="text-xs pt-2 border-t">
                    <div>Education: {cvData.education.length} entries</div>
                    <div>Experience: {cvData.experience.length} entries</div>
                    <div>Projects: {cvData.projects.length} entries</div>
                  </div>
                </div>
                <Button className="w-full mt-4" onClick={() => setShowPreview(true)}>
                  Full Preview
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default CVBuilder;