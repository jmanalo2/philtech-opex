import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Store, Monitor, RefreshCw, Package, Users } from "lucide-react";

interface SIPOCData {
  suppliers: string[];
  inputs: string[];
  process: string[];
  outputs: string[];
  customers: string[];
}

export function SIPOCModule() {
  const [sipocData, setSipocData] = useState<SIPOCData>({
    suppliers: [
      "Raw materials",
      "Sources",
      "Manufacturers",
      "Suppliers"
    ],
    inputs: [
      "Manpower",
      "Resources",
      "Equipment"
    ],
    process: [
      "Look for new customer segment",
      "Find customer needs",
      "Identify critical needs",
      "Develop prototype",
      "Test prototype & go to production"
    ],
    outputs: [
      "Product",
      "Timely delivery",
      "Increased quality"
    ],
    customers: [
      "Young people",
      "Students",
      "Service holders"
    ]
  });

  const addItem = (column: keyof SIPOCData) => {
    setSipocData(prev => ({
      ...prev,
      [column]: [...prev[column], ""]
    }));
  };

  const removeItem = (column: keyof SIPOCData, index: number) => {
    setSipocData(prev => ({
      ...prev,
      [column]: prev[column].filter((_, i) => i !== index)
    }));
  };

  const updateItem = (column: keyof SIPOCData, index: number, value: string) => {
    setSipocData(prev => ({
      ...prev,
      [column]: prev[column].map((item, i) => i === index ? value : item)
    }));
  };

  const handleSave = () => {
    console.log("SIPOC Data saved:", sipocData);
    alert("SIPOC data saved successfully!");
  };

  const columns = [
    {
      key: "suppliers" as keyof SIPOCData,
      letter: "S",
      title: "Suppliers",
      color: "bg-[#4A5568]",
      headerColor: "bg-[#4A5568]",
      icon: Store,
      description: "Who provides inputs?"
    },
    {
      key: "inputs" as keyof SIPOCData,
      letter: "I",
      title: "Inputs",
      color: "bg-[#3B82F6]",
      headerColor: "bg-[#3B82F6]",
      icon: Monitor,
      description: "What goes in?"
    },
    {
      key: "process" as keyof SIPOCData,
      letter: "P",
      title: "Process",
      color: "bg-[#F97316]",
      headerColor: "bg-[#F97316]",
      icon: RefreshCw,
      description: "What happens?"
    },
    {
      key: "outputs" as keyof SIPOCData,
      letter: "O",
      title: "Outputs",
      color: "bg-[#22C55E]",
      headerColor: "bg-[#22C55E]",
      icon: Package,
      description: "What comes out?"
    },
    {
      key: "customers" as keyof SIPOCData,
      letter: "C",
      title: "Customers",
      color: "bg-[#9CA3AF]",
      headerColor: "bg-[#9CA3AF]",
      icon: Users,
      description: "Who receives it?"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">SIPOC Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Supplier → Input → Process → Output → Customer
          </p>
        </div>
        <Button onClick={handleSave} size="lg" className="gap-2">
          Save SIPOC
        </Button>
      </div>

      <Card className="overflow-hidden border-2">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-5">
            {columns.map((column) => {
              const Icon = column.icon;
              return (
                <div key={column.key} className="border-r last:border-r-0 border-border">
                  {/* Header */}
                  <div className={`${column.headerColor} text-white p-6 text-center`}>
                    <div className="text-6xl font-bold mb-2">{column.letter}</div>
                    <div className="text-xl font-semibold mb-3">{column.title}</div>
                    <div className="flex justify-center mb-3">
                      <div className="w-16 h-16 border-2 border-white/30 rounded-lg flex items-center justify-center">
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 bg-white dark:bg-slate-900 min-h-[500px]">
                    <div className="space-y-3">
                      {sipocData[column.key].map((item, index) => (
                        <div key={index} className="group relative">
                          <Textarea
                            value={item}
                            onChange={(e) => updateItem(column.key, index, e.target.value)}
                            placeholder={`Enter ${column.title.toLowerCase()}...`}
                            className="min-h-[60px] pr-10 text-sm resize-none"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(column.key, index)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={() => addItem(column.key)}
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add {column.title}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Process Flow Visualization */}
      <Card className="border-2">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Process Flow Visualization</h3>
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {columns.map((column, index) => (
              <div key={column.key} className="flex items-center gap-2">
                <div className={`${column.color} text-white px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap`}>
                  {column.letter}: {column.title}
                </div>
                {index < columns.length - 1 && (
                  <div className="text-2xl text-muted-foreground">→</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}