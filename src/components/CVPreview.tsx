import React from 'react';
import { CVData } from './CVBuilder';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface CVPreviewProps {
  cvData: CVData;
}

const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01'); // Add day for proper parsing
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4 border-b pb-6">
            <h1 className="text-3xl font-bold text-primary">
              {cvData.personalInfo.fullName || 'Your Name'}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {cvData.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {cvData.personalInfo.email}
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {cvData.personalInfo.phone}
                </div>
              )}
              {cvData.personalInfo.address && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {cvData.personalInfo.address}
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {cvData.personalInfo.linkedIn && (
                <div className="flex items-center gap-1 text-blue-600">
                  <Linkedin className="w-4 h-4" />
                  <span className="break-all">{cvData.personalInfo.linkedIn}</span>
                </div>
              )}
              {cvData.personalInfo.portfolio && (
                <div className="flex items-center gap-1 text-blue-600">
                  <Globe className="w-4 h-4" />
                  <span className="break-all">{cvData.personalInfo.portfolio}</span>
                </div>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {cvData.personalInfo.summary && (
            <div>
              <h2 className="text-xl font-bold mb-3 text-primary">Professional Summary</h2>
              <p className="text-muted-foreground leading-relaxed">
                {cvData.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Education */}
          {cvData.education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-primary">Education</h2>
              <div className="space-y-4">
                {cvData.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold">{edu.degree} in {edu.fieldOfStudy}</h3>
                        <p className="text-muted-foreground">{edu.institution}</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        {edu.graduationYear && <p>{edu.graduationYear}</p>}
                        {edu.gpa && <p>GPA: {edu.gpa}</p>}
                      </div>
                    </div>
                    {edu.achievements && (
                      <p className="text-sm text-muted-foreground mt-2">{edu.achievements}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {cvData.experience.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-primary">Work Experience</h2>
              <div className="space-y-4">
                {cvData.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{exp.position}</h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                    {exp.description && (
                      <div className="text-sm text-muted-foreground whitespace-pre-line">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {(cvData.skills.technical.length > 0 || cvData.skills.languages.length > 0 || cvData.skills.soft.length > 0) && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-primary">Skills & Languages</h2>
              <div className="space-y-3">
                {cvData.skills.technical.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {cvData.skills.technical.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {cvData.skills.languages.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {cvData.skills.languages.map((language, index) => (
                        <Badge key={index} variant="outline">{language}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {cvData.skills.soft.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {cvData.skills.soft.map((skill, index) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Projects */}
          {cvData.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-primary">Projects</h2>
              <div className="space-y-4">
                {cvData.projects.map((project, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{project.title}</h3>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                    {project.technologies && (
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Technologies:</strong> {project.technologies}
                      </p>
                    )}
                    {project.description && (
                      <div className="text-sm text-muted-foreground whitespace-pre-line">
                        {project.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {cvData.references.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-primary">References</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cvData.references.map((ref, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold">{ref.name}</h3>
                    <p className="text-sm text-muted-foreground">{ref.position}</p>
                    <p className="text-sm text-muted-foreground">{ref.company}</p>
                    <Separator className="my-2" />
                    <div className="text-sm space-y-1">
                      {ref.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {ref.email}
                        </div>
                      )}
                      {ref.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {ref.phone}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CVPreview;