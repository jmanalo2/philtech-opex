import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, TrendingUp, TrendingDown, Minus, AlertCircle, Edit, Save, Database } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

interface Metric {
  id: string;
  processName: string;
  metricName: string;
  target: string;
  actual: string;
  unit: string;
  frequency: string;
}

export function MetricsModule() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: "1",
      processName: "Order Processing",
      metricName: "Cycle Time",
      target: "24",
      actual: "28",
      unit: "hours",
      frequency: "Daily",
    },
    {
      id: "2",
      processName: "Manufacturing",
      metricName: "First Pass Yield",
      target: "95",
      actual: "97",
      unit: "%",
      frequency: "Weekly",
    },
    {
      id: "3",
      processName: "Quality Control",
      metricName: "Defect Rate",
      target: "2",
      actual: "1.5",
      unit: "%",
      frequency: "Daily",
    },
    {
      id: "4",
      processName: "Shipping",
      metricName: "On-Time Delivery",
      target: "98",
      actual: "96",
      unit: "%",
      frequency: "Weekly",
    },
    {
      id: "5",
      processName: "Customer Service",
      metricName: "Response Time",
      target: "2",
      actual: "1.5",
      unit: "hours",
      frequency: "Daily",
    },
  ]);

  const [errors, setErrors] = useState<{ [key: string]: any }>({});

  const trendData = [
    { month: "Jan", orderCycle: 26, manufacturing: 94, defectRate: 2.2, onTime: 95, responseTime: 2.3 },
    { month: "Feb", orderCycle: 25, manufacturing: 95, defectRate: 2.0, onTime: 96, responseTime: 2.1 },
    { month: "Mar", orderCycle: 27, manufacturing: 96, defectRate: 1.8, onTime: 97, responseTime: 1.9 },
    { month: "Apr", orderCycle: 28, manufacturing: 97, defectRate: 1.5, onTime: 96, responseTime: 1.5 },
    { month: "May", orderCycle: 26, manufacturing: 96, defectRate: 1.6, onTime: 97, responseTime: 1.7 },
    { month: "Jun", orderCycle: 28, manufacturing: 97, defectRate: 1.5, onTime: 96, responseTime: 1.5 },
  ];

  const performanceComparisonData = metrics.map(metric => ({
    name: metric.processName.substring(0, 15),
    target: parseFloat(metric.target) || 0,
    actual: parseFloat(metric.actual) || 0,
  }));

  const validateMetric = (metric: Metric): boolean => {
    const metricErrors: any = {};
    
    if (!metric.processName.trim()) metricErrors.processName = "Process name is required";
    if (!metric.metricName.trim()) metricErrors.metricName = "Metric name is required";
    if (!metric.target.trim()) metricErrors.target = "Target is required";
    if (!metric.actual.trim()) metricErrors.actual = "Actual is required";
    if (!metric.unit.trim()) metricErrors.unit = "Unit is required";
    if (!metric.frequency.trim()) metricErrors.frequency = "Frequency is required";

    if (metric.target.trim() && isNaN(Number(metric.target))) {
      metricErrors.target = "Must be a number";
    }
    if (metric.actual.trim() && isNaN(Number(metric.actual))) {
      metricErrors.actual = "Must be a number";
    }

    if (Object.keys(metricErrors).length > 0) {
      setErrors(prev => ({ ...prev, [metric.id]: metricErrors }));
      return false;
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[metric.id];
        return newErrors;
      });
      return true;
    }
  };

  const handleFieldChange = (id: string, field: keyof Metric, value: string) => {
    setMetrics(metrics =>
      metrics.map(metric => {
        if (metric.id === id) {
          const updatedMetric = { ...metric, [field]: value };
          validateMetric(updatedMetric);
          return updatedMetric;
        }
        return metric;
      })
    );
  };

  const addMetric = () => {
    const newMetric: Metric = {
      id: Date.now().toString(),
      processName: "",
      metricName: "",
      target: "",
      actual: "",
      unit: "",
      frequency: "Daily",
    };
    setMetrics([...metrics, newMetric]);
  };

  const removeMetric = (id: string) => {
    setMetrics(metrics => metrics.filter(metric => metric.id !== id));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const getPerformanceStatus = (target: string, actual: string, metricName: string) => {
    const targetNum = parseFloat(target);
    const actualNum = parseFloat(actual);
    
    if (isNaN(targetNum) || isNaN(actualNum)) return { status: "neutral", icon: Minus, color: "text-gray-500", bgColor: "bg-gray-50" };

    const isLowerBetter = metricName.toLowerCase().includes("defect") || 
                          metricName.toLowerCase().includes("time") ||
                          metricName.toLowerCase().includes("cost");

    if (isLowerBetter) {
      if (actualNum <= targetNum) return { status: "good", icon: TrendingDown, color: "text-emerald-700", bgColor: "bg-emerald-50" };
      if (actualNum <= targetNum * 1.1) return { status: "warning", icon: Minus, color: "text-amber-700", bgColor: "bg-amber-50" };
      return { status: "bad", icon: TrendingUp, color: "text-rose-700", bgColor: "bg-rose-50" };
    } else {
      if (actualNum >= targetNum) return { status: "good", icon: TrendingUp, color: "text-emerald-700", bgColor: "bg-emerald-50" };
      if (actualNum >= targetNum * 0.9) return { status: "warning", icon: Minus, color: "text-amber-700", bgColor: "bg-amber-50" };
      return { status: "bad", icon: TrendingDown, color: "text-rose-700", bgColor: "bg-rose-50" };
    }
  };

  const handleSave = () => {
    const allValid = metrics.every(metric => validateMetric(metric));
    if (allValid) {
      setIsEditMode(false);
      alert("Metrics saved successfully!");
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">Performance Metrics</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base lg:text-lg">
            Track process performance and KPIs across operations
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button variant="outline" className="gap-2 text-xs sm:text-sm">
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Connect</span> Power BI
          </Button>
          {!isEditMode ? (
            <Button onClick={() => setIsEditMode(true)} variant="default" className="gap-2 text-xs sm:text-sm">
              <Edit className="w-4 h-4" />
              Edit Metrics
            </Button>
          ) : (
            <>
              <Button onClick={addMetric} variant="outline" className="gap-2 text-xs sm:text-sm">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
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

      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 h-12">
          <TabsTrigger value="cards" className="text-base">Cards View</TabsTrigger>
          <TabsTrigger value="trends" className="text-base">Trends</TabsTrigger>
          <TabsTrigger value="comparison" className="text-base">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="cards" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {metrics.map((metric) => {
              const performance = getPerformanceStatus(metric.target, metric.actual, metric.metricName);
              const PerformanceIcon = performance.icon;
              const targetNum = parseFloat(metric.target) || 0;
              const actualNum = parseFloat(metric.actual) || 0;
              const percentDiffVal = targetNum !== 0 ? ((actualNum - targetNum) / targetNum * 100) : 0;
              const percentDiff = percentDiffVal.toFixed(1);
              
              return (
                <Card key={metric.id} className="border-2 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-2 h-full ${
                    performance.status === "good" ? "bg-emerald-500" :
                    performance.status === "warning" ? "bg-amber-500" :
                    performance.status === "bad" ? "bg-rose-500" :
                    "bg-gray-300"
                  }`} />
                  <CardHeader className="pb-4 pl-6">
                    {isEditMode ? (
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Input
                            value={metric.processName}
                            onChange={(e) => handleFieldChange(metric.id, "processName", e.target.value)}
                            placeholder="Process Name *"
                            className={`font-bold text-xl mb-2 ${errors[metric.id]?.processName ? "border-destructive" : ""}`}
                          />
                          {errors[metric.id]?.processName && (
                            <p className="text-xs text-destructive mt-1">{errors[metric.id].processName}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMetric(metric.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <CardTitle className="text-xl font-bold">{metric.processName}</CardTitle>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-5 pl-6">
                    {isEditMode ? (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-muted-foreground">Metric Name *</label>
                          <Input
                            value={metric.metricName}
                            onChange={(e) => handleFieldChange(metric.id, "metricName", e.target.value)}
                            placeholder="e.g., Cycle Time, Defect Rate"
                            className={errors[metric.id]?.metricName ? "border-destructive" : ""}
                          />
                          {errors[metric.id]?.metricName && (
                            <p className="text-xs text-destructive">{errors[metric.id].metricName}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground">Target *</label>
                            <Input
                              value={metric.target}
                              onChange={(e) => handleFieldChange(metric.id, "target", e.target.value)}
                              placeholder="e.g., 95"
                              className={errors[metric.id]?.target ? "border-destructive" : ""}
                            />
                            {errors[metric.id]?.target && (
                              <p className="text-xs text-destructive">{errors[metric.id].target}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground">Actual *</label>
                            <Input
                              value={metric.actual}
                              onChange={(e) => handleFieldChange(metric.id, "actual", e.target.value)}
                              placeholder="e.g., 97"
                              className={errors[metric.id]?.actual ? "border-destructive" : ""}
                            />
                            {errors[metric.id]?.actual && (
                              <p className="text-xs text-destructive">{errors[metric.id].actual}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground">Unit *</label>
                            <Input
                              value={metric.unit}
                              onChange={(e) => handleFieldChange(metric.id, "unit", e.target.value)}
                              placeholder="e.g., %, hours, units"
                              className={errors[metric.id]?.unit ? "border-destructive" : ""}
                            />
                            {errors[metric.id]?.unit && (
                              <p className="text-xs text-destructive">{errors[metric.id].unit}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground">Frequency *</label>
                            <select
                              value={metric.frequency}
                              onChange={(e) => handleFieldChange(metric.id, "frequency", e.target.value)}
                              className="w-full h-10 px-3 rounded-md border border-input bg-background font-medium"
                            >
                              <option value="Hourly">Hourly</option>
                              <option value="Daily">Daily</option>
                              <option value="Weekly">Weekly</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Quarterly">Quarterly</option>
                            </select>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-1">{metric.metricName}</h3>
                          <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            {metric.frequency}
                          </span>
                        </div>

                        <div className="flex items-end justify-between pt-2">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Current Performance</div>
                            <div className="text-5xl font-bold text-foreground">
                              {metric.actual}
                              <span className="text-2xl ml-1 text-muted-foreground">{metric.unit}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-2">
                              Target: <span className="font-semibold">{metric.target} {metric.unit}</span>
                            </div>
                          </div>
                          <div className={`text-right p-4 rounded-xl ${performance.bgColor}`}>
                            <PerformanceIcon className={`w-8 h-8 ${performance.color} mb-2`} />
                            <div className={`text-3xl font-bold ${performance.color}`}>
                              {percentDiffVal > 0 ? "+" : ""}{percentDiff}%
                            </div>
                            <div className={`text-xs font-medium ${performance.color}`}>vs target</div>
                          </div>
                        </div>
                      </>
                    )}

                    {!isEditMode && (
                      <div className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                        performance.status === "good" ? "bg-emerald-50 border-emerald-200" :
                        performance.status === "warning" ? "bg-amber-50 border-amber-200" :
                        performance.status === "bad" ? "bg-rose-50 border-rose-200" :
                        "bg-gray-50 border-gray-200"
                      }`}>
                        <span className="text-sm font-bold text-foreground">Status</span>
                        <span className={`font-bold text-lg ${performance.color}`}>
                          {performance.status === "good" ? "✓ On Target" :
                           performance.status === "warning" ? "⚠ Needs Attention" :
                           performance.status === "bad" ? "✗ Below Target" : "— No Data"}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6 mt-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Performance Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-base font-bold mb-4 text-foreground">Manufacturing First Pass Yield (%)</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorManufacturing" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis domain={[90, 100]} stroke="#6b7280" />
                    <Tooltip />
                    <Area type="monotone" dataKey="manufacturing" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorManufacturing)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-base font-bold mb-4 text-foreground">Defect Rate & Response Time</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="defectRate" stroke="#ef4444" strokeWidth={3} name="Defect Rate (%)" dot={{ r: 5 }} />
                    <Line type="monotone" dataKey="responseTime" stroke="#8b5cf6" strokeWidth={3} name="Response Time (hrs)" dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-base font-bold mb-4 text-foreground">Order Cycle Time & On-Time Delivery</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="orderCycle" stroke="#f59e0b" strokeWidth={3} name="Cycle Time (hrs)" dot={{ r: 5 }} />
                    <Line type="monotone" dataKey="onTime" stroke="#10b981" strokeWidth={3} name="On-Time (%)" dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6 mt-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Target vs Actual Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={performanceComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="target" fill="#94a3b8" name="Target" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="actual" fill="#3b82f6" name="Actual" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map(metric => {
              const performance = getPerformanceStatus(metric.target, metric.actual, metric.metricName);
              const targetNum = parseFloat(metric.target) || 0;
              const actualNum = parseFloat(metric.actual) || 0;
              const percentDiffVal = targetNum !== 0 ? ((actualNum - targetNum) / targetNum * 100) : 0;
              const percentDiff = percentDiffVal.toFixed(1);
              
              return (
                <Card key={metric.id} className={`border-l-4 ${
                  performance.status === "good" ? "border-l-emerald-500" :
                  performance.status === "warning" ? "border-l-amber-500" :
                  "border-l-rose-500"
                } hover:shadow-md transition-shadow`}>
                  <CardContent className="pt-6">
                    <div className="text-sm text-muted-foreground mb-1">{metric.processName}</div>
                    <div className="text-lg font-bold mb-3">{metric.metricName}</div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-4xl font-bold text-foreground">{metric.actual}</div>
                        <div className="text-xs text-muted-foreground mt-1">Target: {metric.target} {metric.unit}</div>
                      </div>
                      <div className={`text-right ${performance.color}`}>
                        <div className="text-2xl font-bold">{percentDiffVal > 0 ? "+" : ""}{percentDiff}%</div>
                        <div className="text-xs font-medium">vs target</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}