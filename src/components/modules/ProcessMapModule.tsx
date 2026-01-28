import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, MoveUp, MoveDown, AlertCircle, Edit, Save, ArrowRight, Clock, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProcessStep {
  id: string;
  step: string;
  description: string;
  duration: string;
  responsible: string;
}

export function ProcessMapModule() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([
    {
      id: "1",
      step: "Order Received",
      description: "Customer places order via portal or phone",
      duration: "5 min",
      responsible: "Sales Team",
    },
    {
      id: "2",
      step: "Order Validation",
      description: "Verify inventory availability and customer credit",
      duration: "15 min",
      responsible: "Operations",
    },
    {
      id: "3",
      step: "Production Planning",
      description: "Schedule production and allocate resources",
      duration: "30 min",
      responsible: "Planning Team",
    },
    {
      id: "4",
      step: "Manufacturing",
      description: "Execute production according to specifications",
      duration: "4 hours",
      responsible: "Production Team",
    },
    {
      id: "5",
      step: "Quality Control",
      description: "Inspect finished products against quality standards",
      duration: "45 min",
      responsible: "QA Team",
    },
    {
      id: "6",
      step: "Packaging & Shipping",
      description: "Package products and dispatch to customer",
      duration: "1 hour",
      responsible: "Logistics",
    },
  ]);

  const [errors, setErrors] = useState<{ [key: string]: any }>({});

  const validateStep = (step: ProcessStep): boolean => {
    const stepErrors: any = {};
    
    if (!step.step.trim()) stepErrors.step = "Step name is required";
    if (!step.description.trim()) stepErrors.description = "Description is required";
    if (!step.duration.trim()) stepErrors.duration = "Duration is required";
    if (!step.responsible.trim()) stepErrors.responsible = "Responsible party is required";

    if (Object.keys(stepErrors).length > 0) {
      setErrors(prev => ({ ...prev, [step.id]: stepErrors }));
      return false;
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[step.id];
        return newErrors;
      });
      return true;
    }
  };

  const handleFieldChange = (id: string, field: keyof ProcessStep, value: string) => {
    setProcessSteps(steps =>
      steps.map(step => {
        if (step.id === id) {
          const updatedStep = { ...step, [field]: value };
          validateStep(updatedStep);
          return updatedStep;
        }
        return step;
      })
    );
  };

  const addProcessStep = () => {
    const newStep: ProcessStep = {
      id: Date.now().toString(),
      step: "",
      description: "",
      duration: "",
      responsible: "",
    };
    setProcessSteps([...processSteps, newStep]);
  };

  const removeProcessStep = (id: string) => {
    setProcessSteps(steps => steps.filter(step => step.id !== id));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const moveStep = (index: number, direction: "up" | "down") => {
    const newSteps = [...processSteps];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newSteps.length) {
      [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
      setProcessSteps(newSteps);
    }
  };

  const handleSave = () => {
    const allValid = processSteps.every(step => validateStep(step));
    if (allValid) {
      setIsEditMode(false);
      alert("Process map saved successfully!");
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">High-Level Process Map</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base lg:text-lg">
            Visualize your end-to-end process flow and dependencies
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {!isEditMode ? (
            <Button onClick={() => setIsEditMode(true)} variant="default" className="gap-2 text-xs sm:text-sm">
              <Edit className="w-4 h-4" />
              Edit Process
            </Button>
          ) : (
            <>
              <Button onClick={addProcessStep} variant="outline" className="gap-2 text-xs sm:text-sm">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Step</span>
              </Button>
              <Button onClick={handleSave} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm">
                <Save className="w-4 h-4" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {hasErrors && isEditMode && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please fix all validation errors before saving.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {processSteps.map((step, index) => (
          <div key={step.id} className="relative">
            <Card className="border-2 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-blue-600" />
              <CardHeader className="pb-4 pl-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold">{index + 1}</span>
                    </div>
                    {isEditMode ? (
                      <div className="flex-1">
                        <Input
                          value={step.step}
                          onChange={(e) => handleFieldChange(step.id, "step", e.target.value)}
                          placeholder="Step Name *"
                          className={`font-bold text-xl ${errors[step.id]?.step ? "border-destructive" : ""}`}
                        />
                        {errors[step.id]?.step && (
                          <p className="text-xs text-destructive mt-1">{errors[step.id].step}</p>
                        )}
                      </div>
                    ) : (
                      <CardTitle className="text-2xl font-bold">{step.step}</CardTitle>
                    )}
                  </div>
                  {isEditMode && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveStep(index, "up")}
                        disabled={index === 0}
                        className="hover:bg-blue-50"
                      >
                        <MoveUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveStep(index, "down")}
                        disabled={index === processSteps.length - 1}
                        className="hover:bg-blue-50"
                      >
                        <MoveDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProcessStep(step.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pl-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Description {isEditMode && "*"}
                    </label>
                    {isEditMode ? (
                      <>
                        <Input
                          value={step.description}
                          onChange={(e) => handleFieldChange(step.id, "description", e.target.value)}
                          placeholder="Describe what happens in this step"
                          className={errors[step.id]?.description ? "border-destructive" : ""}
                        />
                        {errors[step.id]?.description && (
                          <p className="text-xs text-destructive">{errors[step.id].description}</p>
                        )}
                      </>
                    ) : (
                      <p className="text-base text-foreground leading-relaxed">{step.description}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Duration {isEditMode && "*"}
                      </label>
                      {isEditMode ? (
                        <>
                          <Input
                            value={step.duration}
                            onChange={(e) => handleFieldChange(step.id, "duration", e.target.value)}
                            placeholder="e.g., 30 min, 2 hours"
                            className={errors[step.id]?.duration ? "border-destructive" : ""}
                          />
                          {errors[step.id]?.duration && (
                            <p className="text-xs text-destructive">{errors[step.id].duration}</p>
                          )}
                        </>
                      ) : (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg px-4 py-2 text-center">
                          <span className="text-lg font-bold text-blue-700">{step.duration}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Responsible {isEditMode && "*"}
                      </label>
                      {isEditMode ? (
                        <>
                          <Input
                            value={step.responsible}
                            onChange={(e) => handleFieldChange(step.id, "responsible", e.target.value)}
                            placeholder="e.g., Operations Team"
                            className={errors[step.id]?.responsible ? "border-destructive" : ""}
                          />
                          {errors[step.id]?.responsible && (
                            <p className="text-xs text-destructive">{errors[step.id].responsible}</p>
                          )}
                        </>
                      ) : (
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg px-4 py-2 text-center">
                          <span className="text-base font-semibold text-purple-700">{step.responsible}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {index < processSteps.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowRight className="w-8 h-8 text-blue-400" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}