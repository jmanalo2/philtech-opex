import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, AlertTriangle, Network, BarChart3, ChevronRight, Edit, Save, AlertCircle, FileSpreadsheet } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from "recharts";

interface Issue {
  id: string;
  title: string;
  description: string;
  date: string;
  tool: "5-whys" | "fishbone" | "pareto" | "fmea" | "custom";
  status: "open" | "analyzing" | "resolved";
}

interface WhyStep {
  id: string;
  why: string;
  answer: string;
}

interface FishboneCategory {
  id: string;
  category: string;
  causes: string[];
}

interface ParetoItem {
  id: string;
  cause: string;
  frequency: string;
}

interface FMEARow {
  id: string;
  processStep: string;
  failureMode: string;
  severity: string; // 1-10
  occurrence: string; // 1-10
  detection: string; // 1-10
  action: string;
}

export function RootCauseModule() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: "1",
      title: "Production Line Downtime",
      description: "Machine A stopped unexpectedly, causing 2-hour production delay",
      date: "2026-01-25",
      tool: "5-whys",
      status: "analyzing",
    },
    {
      id: "2",
      title: "High Defect Rate in Assembly",
      description: "15% defect rate observed in final assembly, exceeding 2% target",
      date: "2026-01-24",
      tool: "fishbone",
      status: "open",
    },
    {
      id: "3",
      title: "Customer Complaints Spike",
      description: "20 complaints received this week vs. average of 5",
      date: "2026-01-23",
      tool: "pareto",
      status: "resolved",
    },
    {
      id: "4",
      title: "Packaging Process Risk",
      description: "Potential for incorrect labeling during high volume shifts",
      date: "2026-01-26",
      tool: "fmea",
      status: "open",
    },
  ]);

  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [newIssueTitle, setNewIssueTitle] = useState("");
  
  // Tool Data States
  const [whySteps, setWhySteps] = useState<WhyStep[]>([
    { id: "1", why: "Why did the machine stop?", answer: "Hydraulic pressure dropped" },
    { id: "2", why: "Why did hydraulic pressure drop?", answer: "Oil leak detected" },
    { id: "3", why: "Why was there an oil leak?", answer: "Worn seal" },
    { id: "4", why: "Why was the seal worn?", answer: "Exceeded maintenance interval" },
    { id: "5", why: "Why was maintenance interval exceeded?", answer: "Missed scheduled maintenance due to lack of tracking system" },
  ]);

  const [fishboneCategories, setFishboneCategories] = useState<FishboneCategory[]>([
    { id: "1", category: "People", causes: ["Insufficient training", "High turnover", "Fatigue"] },
    { id: "2", category: "Methods", causes: ["Unclear procedures", "No standard work"] },
    { id: "3", category: "Materials", causes: ["Supplier quality issues", "Wrong specifications"] },
    { id: "4", category: "Machines", causes: ["Old equipment", "Lack of calibration"] },
    { id: "5", category: "Measurement", causes: ["Inaccurate tools", "No inspection checklist"] },
    { id: "6", category: "Environment", causes: ["Temperature fluctuations", "Poor lighting"] },
  ]);

  const [paretoItems, setParetoItems] = useState<ParetoItem[]>([
    { id: "1", cause: "Product defect", frequency: "45" },
    { id: "2", cause: "Late delivery", frequency: "25" },
    { id: "3", cause: "Wrong item shipped", frequency: "15" },
    { id: "4", cause: "Damaged packaging", frequency: "8" },
    { id: "5", cause: "Missing documentation", frequency: "5" },
    { id: "6", cause: "Other issues", frequency: "2" },
  ]);

  const [fmeaRows, setFmeaRows] = useState<FMEARow[]>([
    { 
      id: "1", 
      processStep: "Labeling", 
      failureMode: "Wrong label applied", 
      severity: "8", 
      occurrence: "4", 
      detection: "3", 
      action: "Implement barcode scanning verification" 
    },
    { 
      id: "2", 
      processStep: "Sealing", 
      failureMode: "Incomplete seal", 
      severity: "6", 
      occurrence: "2", 
      detection: "8", 
      action: "Daily heater calibration check" 
    },
  ]);

  const getParetoChartData = () => {
    const sortedItems = [...paretoItems]
      .filter(item => item.frequency.trim() && !isNaN(Number(item.frequency)))
      .sort((a, b) => Number(b.frequency) - Number(a.frequency));
    
    const total = sortedItems.reduce((sum, item) => sum + Number(item.frequency), 0);
    
    let cumulative = 0;
    return sortedItems.map(item => {
      const freq = Number(item.frequency);
      cumulative += freq;
      return {
        cause: item.cause.length > 20 ? item.cause.substring(0, 20) + "..." : item.cause,
        frequency: freq,
        cumulative: Number(((cumulative / total) * 100).toFixed(1)),
      };
    });
  };

  const addIssue = () => {
    if (newIssueTitle.trim()) {
      const newIssue: Issue = {
        id: Date.now().toString(),
        title: newIssueTitle,
        description: "",
        date: new Date().toISOString().split("T")[0],
        tool: "5-whys",
        status: "open",
      };
      setIssues([newIssue, ...issues]);
      setNewIssueTitle("");
      setSelectedIssue(newIssue.id);
      setIsEditMode(true);
    }
  };

  const removeIssue = (id: string) => {
    setIssues(issues.filter(issue => issue.id !== id));
    if (selectedIssue === id) setSelectedIssue(null);
  };

  const updateIssueField = (id: string, field: keyof Issue, value: any) => {
    setIssues(issues.map(issue =>
      issue.id === id ? { ...issue, [field]: value } : issue
    ));
  };

  // 5 Whys Handlers
  const addWhyStep = () => {
    const newStep: WhyStep = { id: Date.now().toString(), why: "", answer: "" };
    setWhySteps([...whySteps, newStep]);
  };
  const updateWhyStep = (id: string, field: "why" | "answer", value: string) => {
    setWhySteps(whySteps.map(step => step.id === id ? { ...step, [field]: value } : step));
  };
  const removeWhyStep = (id: string) => setWhySteps(whySteps.filter(step => step.id !== id));

  // Fishbone Handlers
  const addFishboneCategory = () => {
    const newCategory: FishboneCategory = { id: Date.now().toString(), category: "New Category", causes: [] };
    setFishboneCategories([...fishboneCategories, newCategory]);
  };
  const updateCategoryName = (id: string, name: string) => {
    setFishboneCategories(fishboneCategories.map(cat => cat.id === id ? { ...cat, category: name } : cat));
  };
  const addCauseToCategory = (categoryId: string, cause: string) => {
    if (cause.trim()) {
      setFishboneCategories(fishboneCategories.map(cat =>
        cat.id === categoryId ? { ...cat, causes: [...cat.causes, cause] } : cat
      ));
    }
  };
  const removeCauseFromCategory = (categoryId: string, causeIndex: number) => {
    setFishboneCategories(fishboneCategories.map(cat =>
      cat.id === categoryId ? { ...cat, causes: cat.causes.filter((_, i) => i !== causeIndex) } : cat
    ));
  };

  // Pareto Handlers
  const addParetoItem = () => {
    const newItem: ParetoItem = { id: Date.now().toString(), cause: "", frequency: "" };
    setParetoItems([...paretoItems, newItem]);
  };
  const updateParetoItem = (id: string, field: "cause" | "frequency", value: string) => {
    setParetoItems(paretoItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  const removeParetoItem = (id: string) => setParetoItems(paretoItems.filter(item => item.id !== id));

  // FMEA Handlers
  const addFmeaRow = () => {
    const newRow: FMEARow = {
      id: Date.now().toString(),
      processStep: "",
      failureMode: "",
      severity: "",
      occurrence: "",
      detection: "",
      action: ""
    };
    setFmeaRows([...fmeaRows, newRow]);
  };
  const updateFmeaRow = (id: string, field: keyof FMEARow, value: string) => {
    setFmeaRows(fmeaRows.map(row => row.id === id ? { ...row, [field]: value } : row));
  };
  const removeFmeaRow = (id: string) => setFmeaRows(fmeaRows.filter(row => row.id !== id));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "analyzing": return "bg-blue-100 text-blue-700 border-blue-200";
      case "resolved": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getToolIcon = (tool: string) => {
    switch (tool) {
      case "5-whys": return <ChevronRight className="w-4 h-4" />;
      case "fishbone": return <Network className="w-4 h-4" />;
      case "pareto": return <BarChart3 className="w-4 h-4" />;
      case "fmea": return <FileSpreadsheet className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">Root Cause Analysis</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base lg:text-lg">
            Investigate, analyze, and resolve process issues
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
           {!isEditMode ? (
             <Button onClick={() => setIsEditMode(true)} variant="default" className="gap-2 text-xs sm:text-sm">
               <Edit className="w-4 h-4" />
               Edit Analysis
             </Button>
           ) : (
             <Button onClick={() => setIsEditMode(false)} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm">
               <Save className="w-4 h-4" />
               Save
             </Button>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Issues List */}
        <Card className="lg:col-span-1 border-2 h-fit">
          <CardHeader>
            <CardTitle className="text-xl">Issues Tracker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditMode && (
              <div className="flex gap-2">
                <Input
                  value={newIssueTitle}
                  onChange={(e) => setNewIssueTitle(e.target.value)}
                  placeholder="New issue title"
                  onKeyPress={(e) => e.key === "Enter" && addIssue()}
                />
                <Button onClick={addIssue} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {issues.map(issue => (
                <div
                  key={issue.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedIssue === issue.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-100 hover:border-blue-200 hover:bg-slate-50"
                  }`}
                  onClick={() => setSelectedIssue(issue.id)}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-sm line-clamp-2 leading-tight">{issue.title}</h3>
                    {isEditMode && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeIssue(issue.id);
                        }}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mt-3">
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 bg-white px-2 py-1 rounded-md border">
                      {getToolIcon(issue.tool)}
                      {issue.tool.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Area */}
        <Card className="lg:col-span-2 border-2 min-h-[600px]">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-xl flex items-center gap-2">
              {selectedIssue ? issues.find(i => i.id === selectedIssue)?.title : "Select an issue to analyze"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {selectedIssue ? (
              <div className="space-y-8">
                {/* Issue Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl border">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Description</label>
                    {isEditMode ? (
                      <Textarea
                        value={issues.find(i => i.id === selectedIssue)?.description}
                        onChange={(e) => updateIssueField(selectedIssue, "description", e.target.value)}
                        placeholder="Describe the issue in detail..."
                        rows={3}
                        className="bg-white"
                      />
                    ) : (
                      <p className="text-sm">{issues.find(i => i.id === selectedIssue)?.description || "No description provided."}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Analysis Tool</label>
                    {isEditMode ? (
                      <select
                        value={issues.find(i => i.id === selectedIssue)?.tool}
                        onChange={(e) => updateIssueField(selectedIssue, "tool", e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-white"
                      >
                        <option value="5-whys">5 Whys</option>
                        <option value="fishbone">Fishbone (Ishikawa)</option>
                        <option value="pareto">Pareto (80/20)</option>
                        <option value="fmea">FMEA</option>
                        <option value="custom">Custom Tool</option>
                      </select>
                    ) : (
                      <div className="font-medium flex items-center gap-2">
                         {getToolIcon(issues.find(i => i.id === selectedIssue)?.tool || "")}
                         {(issues.find(i => i.id === selectedIssue)?.tool || "").toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</label>
                    {isEditMode ? (
                      <select
                        value={issues.find(i => i.id === selectedIssue)?.status}
                        onChange={(e) => updateIssueField(selectedIssue, "status", e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-white"
                      >
                        <option value="open">Open</option>
                        <option value="analyzing">Analyzing</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    ) : (
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(issues.find(i => i.id === selectedIssue)?.status || "open")}`}>
                        {(issues.find(i => i.id === selectedIssue)?.status || "open").toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                <Tabs value={issues.find(i => i.id === selectedIssue)?.tool} className="w-full">
                  <TabsList className="hidden">
                    <TabsTrigger value="5-whys">5 Whys</TabsTrigger>
                    <TabsTrigger value="fishbone">Fishbone</TabsTrigger>
                    <TabsTrigger value="pareto">Pareto</TabsTrigger>
                    <TabsTrigger value="fmea">FMEA</TabsTrigger>
                    <TabsTrigger value="custom">Custom</TabsTrigger>
                  </TabsList>

                  <TabsContent value="5-whys" className="space-y-4 animate-in fade-in-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">5 Whys Analysis</h3>
                      {isEditMode && (
                        <Button onClick={addWhyStep} size="sm" variant="outline" className="gap-2">
                          <Plus className="w-4 h-4" />
                          Add Why
                        </Button>
                      )}
                    </div>

                    <div className="space-y-0 relative">
                      {/* Connector Line */}
                      <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200 z-0"></div>
                      
                      {whySteps.map((step, index) => (
                        <div key={step.id} className="flex gap-4 items-start relative z-10 pb-6 last:pb-0">
                          <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md ring-4 ring-white">
                            {index + 1}
                          </div>
                          <div className="flex-1 space-y-3 bg-white p-4 rounded-xl border shadow-sm">
                            {isEditMode ? (
                              <>
                                <Input
                                  value={step.why}
                                  onChange={(e) => updateWhyStep(step.id, "why", e.target.value)}
                                  placeholder="Why did this happen?"
                                  className="font-bold border-transparent focus:border-input px-0 text-lg"
                                />
                                <Textarea
                                  value={step.answer}
                                  onChange={(e) => updateWhyStep(step.id, "answer", e.target.value)}
                                  placeholder="Root cause finding..."
                                  rows={2}
                                  className="bg-slate-50 border-0 resize-none"
                                />
                              </>
                            ) : (
                              <>
                                <div className="font-bold text-lg text-blue-900">{step.why}</div>
                                <div className="text-muted-foreground">{step.answer}</div>
                              </>
                            )}
                          </div>
                          {isEditMode && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeWhyStep(step.id)}
                              className="text-destructive hover:text-destructive mt-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="fishbone" className="space-y-6 animate-in fade-in-50">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold">Fishbone Diagram (6Ms)</h3>
                      {isEditMode && (
                        <Button onClick={addFishboneCategory} size="sm" variant="outline" className="gap-2">
                          <Plus className="w-4 h-4" />
                          Add Category
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {fishboneCategories.map(category => (
                        <Card key={category.id} className="border-2 hover:border-blue-300 transition-colors">
                          <CardHeader className="pb-3 bg-slate-50 border-b">
                            {isEditMode ? (
                              <Input
                                value={category.category}
                                onChange={(e) => updateCategoryName(category.id, e.target.value)}
                                className="font-bold bg-white"
                              />
                            ) : (
                              <div className="font-bold text-center">{category.category}</div>
                            )}
                          </CardHeader>
                          <CardContent className="space-y-2 pt-4">
                            {category.causes.map((cause, index) => (
                              <div key={index} className="flex items-center gap-2 group bg-white p-2 rounded border shadow-sm">
                                <span className="text-sm flex-1 font-medium">{cause}</span>
                                {isEditMode && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeCauseFromCategory(category.id, index)}
                                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                )}
                              </div>
                            ))}
                            {isEditMode && (
                              <Input
                                placeholder="+ Add cause"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    addCauseToCategory(category.id, e.currentTarget.value);
                                    e.currentTarget.value = "";
                                  }
                                }}
                                className="text-sm border-dashed"
                              />
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="pareto" className="space-y-6 animate-in fade-in-50">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold">Pareto Analysis (80/20)</h3>
                      {isEditMode && (
                        <Button onClick={addParetoItem} size="sm" variant="outline" className="gap-2">
                          <Plus className="w-4 h-4" />
                          Add Cause
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                       <div className="lg:col-span-1 space-y-2">
                          <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase pb-2 border-b">
                            <span>Cause</span>
                            <span>Frequency</span>
                          </div>
                          {paretoItems.map((item, index) => (
                            <div key={item.id} className="flex gap-2 items-center group">
                              <span className="w-6 text-sm font-bold text-slate-400">{index + 1}</span>
                              {isEditMode ? (
                                <>
                                  <Input
                                    value={item.cause}
                                    onChange={(e) => updateParetoItem(item.id, "cause", e.target.value)}
                                    className="flex-1 h-8 text-sm"
                                  />
                                  <Input
                                    value={item.frequency}
                                    onChange={(e) => updateParetoItem(item.id, "frequency", e.target.value)}
                                    className="w-16 h-8 text-sm"
                                    type="number"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeParetoItem(item.id)}
                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <div className="flex-1 text-sm font-medium">{item.cause}</div>
                                  <div className="w-16 text-right font-bold bg-slate-100 rounded px-2 py-1">{item.frequency}</div>
                                </>
                              )}
                            </div>
                          ))}
                       </div>
                       
                       <div className="lg:col-span-2">
                          <ResponsiveContainer width="100%" height={350}>
                            <ComposedChart data={getParetoChartData()}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="cause" angle={-45} textAnchor="end" height={80} tick={{fontSize: 12}} />
                              <YAxis yAxisId="left" label={{ value: "Frequency", angle: -90, position: "insideLeft" }} />
                              <YAxis yAxisId="right" orientation="right" unit="%" />
                              <Tooltip />
                              <Legend />
                              <Bar yAxisId="left" dataKey="frequency" fill="#3b82f6" name="Frequency" radius={[4, 4, 0, 0]} barSize={40} />
                              <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke="#ef4444" strokeWidth={3} name="Cumulative %" dot={{r: 4}} />
                            </ComposedChart>
                          </ResponsiveContainer>
                       </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="fmea" className="space-y-6 animate-in fade-in-50">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold">Failure Mode and Effects Analysis (FMEA)</h3>
                      {isEditMode && (
                        <Button onClick={addFmeaRow} size="sm" variant="outline" className="gap-2">
                          <Plus className="w-4 h-4" />
                          Add Row
                        </Button>
                      )}
                    </div>
                    
                    <div className="overflow-x-auto border rounded-xl shadow-sm">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b">
                          <tr>
                            <th className="p-3 text-left font-bold text-slate-600">Process Step</th>
                            <th className="p-3 text-left font-bold text-slate-600">Failure Mode</th>
                            <th className="p-3 text-center font-bold text-slate-600 w-16" title="Severity (1-10)">S</th>
                            <th className="p-3 text-center font-bold text-slate-600 w-16" title="Occurrence (1-10)">O</th>
                            <th className="p-3 text-center font-bold text-slate-600 w-16" title="Detection (1-10)">D</th>
                            <th className="p-3 text-center font-bold text-slate-600 w-20" title="Risk Priority Number">RPN</th>
                            <th className="p-3 text-left font-bold text-slate-600">Recommended Action</th>
                            {isEditMode && <th className="p-3 w-10"></th>}
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {fmeaRows.map((row) => {
                            const rpn = (parseInt(row.severity) || 0) * (parseInt(row.occurrence) || 0) * (parseInt(row.detection) || 0);
                            const rpnColor = rpn > 100 ? "text-red-600 font-bold" : rpn > 50 ? "text-amber-600 font-bold" : "text-green-600";
                            
                            return (
                              <tr key={row.id} className="hover:bg-slate-50/50">
                                <td className="p-3">
                                  {isEditMode ? (
                                    <Input value={row.processStep} onChange={(e) => updateFmeaRow(row.id, "processStep", e.target.value)} className="h-8" />
                                  ) : row.processStep}
                                </td>
                                <td className="p-3">
                                  {isEditMode ? (
                                    <Input value={row.failureMode} onChange={(e) => updateFmeaRow(row.id, "failureMode", e.target.value)} className="h-8" />
                                  ) : row.failureMode}
                                </td>
                                <td className="p-3 text-center">
                                  {isEditMode ? (
                                    <Input value={row.severity} onChange={(e) => updateFmeaRow(row.id, "severity", e.target.value)} className="h-8 w-12 text-center" type="number" min="1" max="10" />
                                  ) : <span className="font-medium">{row.severity}</span>}
                                </td>
                                <td className="p-3 text-center">
                                  {isEditMode ? (
                                    <Input value={row.occurrence} onChange={(e) => updateFmeaRow(row.id, "occurrence", e.target.value)} className="h-8 w-12 text-center" type="number" min="1" max="10" />
                                  ) : <span className="font-medium">{row.occurrence}</span>}
                                </td>
                                <td className="p-3 text-center">
                                  {isEditMode ? (
                                    <Input value={row.detection} onChange={(e) => updateFmeaRow(row.id, "detection", e.target.value)} className="h-8 w-12 text-center" type="number" min="1" max="10" />
                                  ) : <span className="font-medium">{row.detection}</span>}
                                </td>
                                <td className={`p-3 text-center ${rpnColor}`}>
                                  {rpn}
                                </td>
                                <td className="p-3">
                                  {isEditMode ? (
                                    <Input value={row.action} onChange={(e) => updateFmeaRow(row.id, "action", e.target.value)} className="h-8" />
                                  ) : row.action}
                                </td>
                                {isEditMode && (
                                  <td className="p-3 text-center">
                                    <Button variant="ghost" size="sm" onClick={() => removeFmeaRow(row.id)} className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive">
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="text-xs text-muted-foreground p-2 bg-slate-50 rounded border">
                      <strong>Tip:</strong> RPN (Risk Priority Number) = Severity × Occurrence × Detection. Scores &gt; 100 require immediate action.
                    </div>
                  </TabsContent>

                  <TabsContent value="custom" className="text-center py-12 text-muted-foreground">
                    <p>Select a different tool or define a custom analysis method.</p>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <AlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">No Issue Selected</p>
                <p>Select an issue from the tracker on the left to view details and analysis.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}