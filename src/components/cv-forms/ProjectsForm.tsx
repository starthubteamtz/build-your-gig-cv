import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { CVData } from '../CVBuilder';

interface ProjectsFormProps {
  data: CVData;
  updateData: (section: keyof CVData, data: any) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, updateData }) => {
  const addProject = () => {
    const newProject = {
      title: '',
      description: '',
      technologies: '',
      link: '',
    };
    updateData('projects', [...data.projects, newProject]);
  };

  const removeProject = (index: number) => {
    const updatedProjects = data.projects.filter((_, i) => i !== index);
    updateData('projects', updatedProjects);
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updatedProjects = data.projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    updateData('projects', updatedProjects);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Projects & Portfolio</h3>
          <p className="text-muted-foreground text-sm">
            Showcase your personal projects, coursework, or portfolio pieces
          </p>
        </div>
        <Button onClick={addProject} size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      {data.projects.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No projects added yet. Click "Add Project" to showcase your work.</p>
          <p className="text-sm mt-2">Include personal projects, school assignments, or portfolio pieces!</p>
        </div>
      )}

      {data.projects.map((project, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Project #{index + 1}</CardTitle>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeProject(index)}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`title-${index}`}>Project Title *</Label>
                <Input
                  id={`title-${index}`}
                  value={project.title}
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                  placeholder="E-commerce Website"
                />
              </div>
              <div>
                <Label htmlFor={`link-${index}`}>Project Link (Optional)</Label>
                <Input
                  id={`link-${index}`}
                  value={project.link}
                  onChange={(e) => updateProject(index, 'link', e.target.value)}
                  placeholder="https://github.com/yourname/project or live demo URL"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`technologies-${index}`}>Technologies Used</Label>
              <Input
                id={`technologies-${index}`}
                value={project.technologies}
                onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                placeholder="React, Node.js, MongoDB, Tailwind CSS"
              />
              <p className="text-sm text-muted-foreground mt-1">
                List the main technologies, languages, or tools used in this project.
              </p>
            </div>

            <div>
              <Label htmlFor={`description-${index}`}>Project Description *</Label>
              <Textarea
                id={`description-${index}`}
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                placeholder="• Built a responsive e-commerce platform for local businesses&#10;• Implemented user authentication and payment processing&#10;• Achieved 95% user satisfaction rate in testing phase&#10;• Reduced page load time by 40% through optimization"
                rows={4}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Describe what you built, the problem it solved, and key achievements.
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-semibold mb-2">💡 Project Tips</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Include both technical and non-technical projects</li>
          <li>• Highlight the impact or results of your projects</li>
          <li>• Mention any challenges you overcame</li>
          <li>• Include links to live demos or repositories when possible</li>
          <li>• Focus on projects relevant to your target roles</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectsForm;