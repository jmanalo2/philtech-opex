import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Save, Plus, Trash2, ClipboardList, AlertCircle } from "lucide-react";

interface ControlPlanRow {
  id: string;
  processStep: string;
  characteristic: string; // Product or Process Characteristic
  specification: string; // Specs / Tolerance
  evalMethod: string; // Measurement Technique
  sampleSize: string;
  sampleFreq: string;
  controlMethod: string;
  reactionPlan: string;
}

export function ControlPlanModule() {
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [rows, setRows] = useState<ControlPlanRow[]>([
    {
      id: "1",
      processStep: "10. Receiving",
      characteristic: "Raw Material Purity",
      specification: "> 99.5%",
      evalMethod: "Spectrometer",
      sampleSize: "1 pc",
      sampleFreq: "Per Lot",
      controlMethod: "Cert of Analysis",
      reactionPlan: "Quarantine & Return",
    },
    {
      id: "2",
      processStep: "20. Machining",
      characteristic: "Outer Diameter",
      specification: "50.0 ± 0.1mm",
      evalMethod: "Digital Caliper",
      sampleSize: "5 pcs",
      sampleFreq: "Hourly",
      controlMethod: "X-bar R Chart",
      reactionPlan: "Stop Line & Adjust",
    },
    {
      id: "3",
      processStep: "30. Heat Treat",
      characteristic: "Hardness",
      specification: "45-50 HRC",
      evalMethod: "Rockwell Tester",
      sampleSize: "3 pcs",
      sampleFreq: "Per Batch",
      controlMethod: "Log Sheet",
      reactionPlan: "Re-temper",
    },
  ]);

  const addRow = () => {
    const newRow: ControlPlanRow = {
      id: Date.now().toString(),
      processStep: "",
      characteristic: "",
      specification: "",
      evalMethod: "",
      sampleSize: "",
      sampleFreq: "",
      controlMethod: "",
      reactionPlan: "",
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (id: string) => {
    setRows(rows.filter(r => r.id !== id));
  };

  const updateRow = (id: string, field: keyof ControlPlanRow, value: string) => {
    setRows(rows.map(r => (r.id === id ? { ...r, [field]: value } : r)));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Control Plan</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Standardize methods for controlling product and process characteristics
          </p>
        </div>
        <div className="flex gap-3">
          {!isEditMode ? (
            <Button onClick={() => setIsEditMode(true)} variant="default" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Plan
            </Button>
          ) : (
            <Button onClick={() => setIsEditMode(false)} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          )}
        </div>
      </div>

      <Card className="border-2">
        <CardHeader className="bg-slate-50 border-b py-4">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-blue-600" />
              Process Control Plan
            </CardTitle>
            {isEditMode && (
              <Button onClick={addRow} size="sm" variant="outline" className="gap-2">
                <Plus className="w-4 h-4" /> Add Process Step
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-3 text-left font-bold border-b border-r w-[15%]">Process Step</th>
                  <th className="p-3 text-left font-bold border-b border-r w-[15%]">Characteristic</th>
                  <th className="p-3 text-left font-bold border-b border-r w-[10%]">Spec / Tol</th>
                  <th className="p-3 text-left font-bold border-b border-r w-[10%]">Eval Method</th>
                  <th className="p-3 text-center font-bold border-b border-r w-[15%]">Sample (Size/Freq)</th>
                  <th className="p-3 text-left font-bold border-b border-r w-[15%]">Control Method</th>
                  <th className="p-3 text-left font-bold border-b w-[20%]">Reaction Plan</th>
                  {isEditMode && <th className="p-3 border-b w-[5%]"></th>}
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-muted-foreground">
                      No control plan steps defined. Click "Edit Plan" to add steps.
                    </td>
                  </tr>
                )}
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 border-r align-top">
                      {isEditMode ? (
                        <Input 
                          value={row.processStep} 
                          onChange={(e) => updateRow(row.id, "processStep", e.target.value)} 
                          className="h-8"
                          placeholder="Step #"
                        />
                      ) : (
                        <span className="font-semibold">{row.processStep}</span>
                      )}
                    </td>
                    <td className="p-3 border-r align-top">
                      {isEditMode ? (
                        <Input 
                          value={row.characteristic} 
                          onChange={(e) => updateRow(row.id, "characteristic", e.target.value)} 
                          className="h-8"
                          placeholder="Prod/Proc Char"
                        />
                      ) : (
                        <span>{row.characteristic}</span>
                      )}
                    </td>
                    <td className="p-3 border-r align-top font-mono text-xs">
                      {isEditMode ? (
                        <Input 
                          value={row.specification} 
                          onChange={(e) => updateRow(row.id, "specification", e.target.value)} 
                          className="h-8 font-mono text-xs"
                          placeholder="Limits"
                        />
                      ) : (
                        <span>{row.specification}</span>
                      )}
                    </td>
                    <td className="p-3 border-r align-top">
                      {isEditMode ? (
                        <Input 
                          value={row.evalMethod} 
                          onChange={(e) => updateRow(row.id, "evalMethod", e.target.value)} 
                          className="h-8"
                          placeholder="Tool/Gage"
                        />
                      ) : (
                        <span>{row.evalMethod}</span>
                      )}
                    </td>
                    <td className="p-3 border-r align-top">
                      {isEditMode ? (
                        <div className="flex gap-1">
                          <Input 
                            value={row.sampleSize} 
                            onChange={(e) => updateRow(row.id, "sampleSize", e.target.value)} 
                            className="h-8 w-1/2"
                            placeholder="Size"
                          />
                          <Input 
                            value={row.sampleFreq} 
                            onChange={(e) => updateRow(row.id, "sampleFreq", e.target.value)} 
                            className="h-8 w-1/2"
                            placeholder="Freq"
                          />
                        </div>
                      ) : (
                        <div className="text-center text-xs">
                          <div className="font-medium">{row.sampleSize}</div>
                          <div className="text-muted-foreground">{row.sampleFreq}</div>
                        </div>
                      )}
                    </td>
                    <td className="p-3 border-r align-top">
                      {isEditMode ? (
                        <Input 
                          value={row.controlMethod} 
                          onChange={(e) => updateRow(row.id, "controlMethod", e.target.value)} 
                          className="h-8"
                          placeholder="Chart/Log"
                        />
                      ) : (
                        <span className="text-blue-700 font-medium">{row.controlMethod}</span>
                      )}
                    </td>
                    <td className="p-3 align-top">
                      {isEditMode ? (
                        <Input 
                          value={row.reactionPlan} 
                          onChange={(e) => updateRow(row.id, "reactionPlan", e.target.value)} 
                          className="h-8"
                          placeholder="Action if fail"
                        />
                      ) : (
                        <span className="text-destructive font-medium text-xs">{row.reactionPlan}</span>
                      )}
                    </td>
                    {isEditMode && (
                      <td className="p-3 align-top text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRow(row.id)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 text-sm">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <div>
          <p className="font-bold mb-1">Standard Work Verification</p>
          <p>Control methods listed above must be integrated into standard work instructions. Supervisors must verify reaction plans are followed immediately upon out-of-control conditions.</p>
        </div>
      </div>
    </div>
  );
}