import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, User, Award, Edit, Save, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SkillLevel {
  level: number;
  label: string;
  color: string;
  bgColor: string;
  badgeColor: string;
}

const skillLevels: SkillLevel[] = [
  { level: 4, label: "Expert / Trainer", color: "text-purple-700", bgColor: "bg-purple-50", badgeColor: "bg-purple-100 text-purple-800 border-purple-200" },
  { level: 3, label: "Independent", color: "text-blue-700", bgColor: "bg-blue-50", badgeColor: "bg-blue-100 text-blue-800 border-blue-200" },
  { level: 2, label: "With Supervision", color: "text-green-700", bgColor: "bg-green-50", badgeColor: "bg-green-100 text-green-800 border-green-200" },
  { level: 1, label: "In Training", color: "text-yellow-700", bgColor: "bg-yellow-50", badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { level: 0, label: "No Skill", color: "text-slate-400", bgColor: "bg-slate-50", badgeColor: "bg-slate-100 text-slate-500 border-slate-200" },
];

interface Employee {
  id: string;
  name: string;
  role: string;
  skills: { [skillName: string]: number };
}

export function SkillsMatrixModule() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [skills, setSkills] = useState<string[]>([
    "CNC Operation",
    "Quality Inspection",
    "Assembly",
    "Welding",
    "CAD Design",
    "Inventory Mgmt",
  ]);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "John Smith",
      role: "Team Lead",
      skills: {
        "CNC Operation": 4,
        "Quality Inspection": 3,
        "Assembly": 2,
        "Welding": 1,
        "CAD Design": 0,
        "Inventory Mgmt": 2,
      },
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "Senior Operator",
      skills: {
        "CNC Operation": 2,
        "Quality Inspection": 4,
        "Assembly": 3,
        "Welding": 0,
        "CAD Design": 1,
        "Inventory Mgmt": 3,
      },
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Technician",
      skills: {
        "CNC Operation": 3,
        "Quality Inspection": 2,
        "Assembly": 4,
        "Welding": 3,
        "CAD Design": 2,
        "Inventory Mgmt": 1,
      },
    },
    {
      id: "4",
      name: "Emily Davis",
      role: "Operator",
      skills: {
        "CNC Operation": 1,
        "Quality Inspection": 3,
        "Assembly": 2,
        "Welding": 0,
        "CAD Design": 4,
        "Inventory Mgmt": 3,
      },
    },
  ]);

  const [newSkill, setNewSkill] = useState("");
  const [newEmployee, setNewEmployee] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const skillName = newSkill.trim();
      setSkills([...skills, skillName]);
      setEmployees(employees.map(emp => ({
        ...emp,
        skills: { ...emp.skills, [skillName]: 0 },
      })));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
    setEmployees(employees.map(emp => {
      const newSkills = { ...emp.skills };
      delete newSkills[skillToRemove];
      return { ...emp, skills: newSkills };
    }));
  };

  const addEmployee = () => {
    if (newEmployee.trim()) {
      const newEmp: Employee = {
        id: Date.now().toString(),
        name: newEmployee.trim(),
        role: "Operator",
        skills: Object.fromEntries(skills.map(skill => [skill, 0])),
      };
      setEmployees([...employees, newEmp]);
      setNewEmployee("");
    }
  };

  const removeEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const updateSkillLevel = (employeeId: string, skillName: string, level: number) => {
    setEmployees(employees.map(emp =>
      emp.id === employeeId
        ? { ...emp, skills: { ...emp.skills, [skillName]: level } }
        : emp
    ));
  };

  const getSkillLevelInfo = (level: number) => {
    return skillLevels.find(sl => sl.level === level) || skillLevels[4];
  };

  const handleSave = () => {
    setIsEditMode(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">Cross-Skills Matrix</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base lg:text-lg">
            Track workforce capabilities and training needs
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          {!isEditMode ? (
            <Button onClick={() => setIsEditMode(true)} variant="default" className="gap-2 text-xs sm:text-sm">
              <Edit className="w-4 h-4" />
              Edit Matrix
            </Button>
          ) : (
            <Button onClick={handleSave} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm">
              <Save className="w-4 h-4" />
              Save
            </Button>
          )}
        </div>
      </div>

      {/* Legend */}
      <Card className="border-2 bg-slate-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldCheck className="w-5 h-5 text-slate-500" />
            Competency Levels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {skillLevels.map(level => (
              <div key={level.level} className="flex items-center gap-3 bg-white p-2 rounded-lg border shadow-sm">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${level.badgeColor.split(' ')[0]} ${level.color}`}>
                  {level.level}
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs font-bold uppercase tracking-wider ${level.color}`}>{level.label}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      {isEditMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in-50 slide-in-from-top-2">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm uppercase text-muted-foreground">Add New Skill Column</CardTitle>
            </CardHeader>
            <CardContent className="py-3">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g. Forklift Driving"
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <Button onClick={addSkill} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm uppercase text-muted-foreground">Add New Employee Row</CardTitle>
            </CardHeader>
            <CardContent className="py-3">
              <div className="flex gap-2">
                <Input
                  value={newEmployee}
                  onChange={(e) => setNewEmployee(e.target.value)}
                  placeholder="Employee Name"
                  onKeyPress={(e) => e.key === "Enter" && addEmployee()}
                />
                <Button onClick={addEmployee} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Matrix */}
      <Card className="border-2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 bg-slate-100 border-b border-r min-w-[200px] sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <User className="w-4 h-4" />
                    EMPLOYEE
                  </div>
                </th>
                {skills.map(skill => (
                  <th key={skill} className="p-4 bg-slate-50 border-b border-r min-w-[120px] text-center relative group hover:bg-slate-100 transition-colors">
                    <div className="flex flex-col items-center justify-center gap-1 h-full">
                      <span className="font-bold text-sm text-slate-700 leading-tight">{skill}</span>
                      {isEditMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(skill)}
                          className="absolute -top-1 -right-1 h-6 w-6 p-0 text-slate-400 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, idx) => (
                <tr key={employee.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4 border-b border-r bg-white sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-slate-50/80">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-slate-800">{employee.name}</div>
                        <div className="text-xs text-muted-foreground">{employee.role}</div>
                      </div>
                      {isEditMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEmployee(employee.id)}
                          className="h-7 w-7 p-0 text-slate-300 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </td>
                  {skills.map(skill => {
                    const level = employee.skills[skill] || 0;
                    const levelInfo = getSkillLevelInfo(level);
                    return (
                      <td key={skill} className="p-2 border-b border-r text-center relative">
                        {isEditMode ? (
                          <div className="flex justify-center">
                             <select
                              value={level}
                              onChange={(e) => updateSkillLevel(employee.id, skill, parseInt(e.target.value))}
                              className={`p-1.5 rounded-md text-xs font-bold border cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 ${levelInfo.badgeColor}`}
                            >
                              {skillLevels.map(sl => (
                                <option key={sl.level} value={sl.level}>
                                  {sl.level}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <Badge variant="outline" className={`h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold border-2 ${levelInfo.badgeColor} ${levelInfo.bgColor}`}>
                              {level}
                            </Badge>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}