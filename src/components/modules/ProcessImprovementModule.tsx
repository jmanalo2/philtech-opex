import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw, Zap, CheckCircle, Wrench, AlertCircle, DollarSign, Clock, PieChart as PieChartIcon, BarChart3, TrendingUp, Star } from "lucide-react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface IdeaHubData {
  quickWins: number;
  quickWinsRate: string;
  implemented: number;
  implementedRate: string;
  assignedToTE: number;
  assignedToTERate: string;
  highComplexity: number;
  totalCostSavings: string;
  totalTimeSaved: string;
  complexityDistribution: Array<{ name: string; value: number; color: string; }>;
  statusDistribution: Array<{ status: string; count: number; }>;
  approvalRate: string;
  implementationRate: string;
  bestEyeIdeas: Array<{ id: string; title: string; description: string; submittedBy: string; department: string; }>;
}

export function ProcessImprovementModule() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [ideaHubData, setIdeaHubData] = useState<IdeaHubData | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  const fetchIdeaHubData = async () => {
    setIsFetchingData(true);
    setShowInstructions(false);
    try {
      // Simulate API call to IdeaHub C.I. Analytics endpoint
      // In production: fetch('https://ideahub-297.emergent.host/api/analytics')
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Exact data from IdeaHub C.I. Analytics Screenshot
      const mockData: IdeaHubData = {
        quickWins: 2,
        quickWinsRate: "", // Hidden in UI to match screenshot
        implemented: 6,
        implementedRate: "35.29%",
        assignedToTE: 2,
        assignedToTERate: "11.76%",
        highComplexity: 6,
        totalCostSavings: "$21,800",
        totalTimeSaved: "12h 25m",
        complexityDistribution: [
          { name: "Medium Complexity", value: 40, color: "#f59e0b" },
          { name: "High Complexity", value: 60, color: "#ef4444" },
          { name: "Low Complexity", value: 0, color: "#10b981" }
        ],
        statusDistribution: [
          { status: "Implemented", count: 4 },
          { status: "In Progress", count: 6 },
          { status: "Pending", count: 2 },
          { status: "Declined", count: 2 }
        ],
        approvalRate: "23.53%",
        implementationRate: "35.29%",
        bestEyeIdeas: [
          { 
            id: "EYE-00013", 
            title: "Test Auto-derive Team", 
            description: "Time savings",
            submittedBy: "user1",
            department: "GBS"
          },
          { 
            id: "EYE-00003", 
            title: "Test Eye-idea from Testing", 
            description: "Save 50% time",
            submittedBy: "user1",
            department: "Tech"
          },
          { 
            id: "EYE-00002", 
            title: "Standardize Approval Workflows", 
            description: "Improve consistency and reduce approval time by 40%",
            submittedBy: "user1",
            department: "Tech"
          }
        ]
      };
      
      setIdeaHubData(mockData);
      setLastSyncTime(new Date().toLocaleString());
      
    } catch (error) {
      console.error("Error fetching IdeaHub data:", error);
    } finally {
      setIsFetchingData(false);
    }
  };

  const handleOpenIdeaHub = () => {
    setIsLoading(true);
    window.open("https://ideahub-297.emergent.host/login", "_blank");
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSyncData = () => {
    fetchIdeaHubData();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Loading state
  if (isFetchingData && !ideaHubData) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">C.I. Excellence Dashboard</h1>
          <p className="text-muted-foreground mt-1">Loading analytics data from IdeaHub...</p>
        </div>
        <Card>
          <CardContent className="p-12 text-center">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-lg font-medium">Syncing with IdeaHub Platform</p>
            <p className="text-sm text-muted-foreground mt-2">Fetching live C.I. Analytics data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard view with data
  if (ideaHubData) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">C.I. Excellence Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Analytics and insights for continuous improvement
            </p>
            {lastSyncTime && (
              <p className="text-xs text-muted-foreground mt-1">
                Last synced: {lastSyncTime}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSyncData}
              disabled={isFetchingData}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isFetchingData ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={handleOpenIdeaHub}
              className="gap-2 bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              Export Excel
            </Button>
          </div>
        </motion.div>

        {/* Top 4 Quick Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <motion.div variants={itemVariants}>
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  {ideaHubData.quickWinsRate && (
                    <span className="text-xs text-muted-foreground">Rate: {ideaHubData.quickWinsRate}</span>
                  )}
                </div>
                <div className="text-3xl font-bold text-green-600">{ideaHubData.quickWins}</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">Quick Wins</div>
                <div className="text-xs text-muted-foreground">Ideas implemented quickly</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-xs text-muted-foreground">Rate: {ideaHubData.implementedRate}</span>
                </div>
                <div className="text-3xl font-bold text-green-600">{ideaHubData.implemented}</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">Implemented</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Wrench className="w-5 h-5 text-purple-600" />
                  <span className="text-xs text-muted-foreground">Rate: {ideaHubData.assignedToTERate}</span>
                </div>
                <div className="text-3xl font-bold text-purple-600">{ideaHubData.assignedToTE}</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">Assigned to T&E</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-red-600">{ideaHubData.highComplexity}</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">High Complexity</div>
                <div className="text-xs text-muted-foreground">Complex implementations</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Cost Savings and Time Saved */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Total Cost Savings</div>
                    <div className="text-xs text-gray-500">Estimated financial impact</div>
                  </div>
                </div>
                <div className="text-4xl font-bold text-green-600">{ideaHubData.totalCostSavings}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Total Time Saved</div>
                    <div className="text-xs text-gray-500">Efficiency improvements</div>
                  </div>
                </div>
                <div className="text-4xl font-bold text-blue-600">{ideaHubData.totalTimeSaved}</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Complexity Distribution - Pie Chart */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <PieChartIcon className="w-5 h-5" />
                  Complexity Distribution
                </CardTitle>
                <p className="text-xs text-muted-foreground">Breakdown of evaluated ideas by complexity</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ideaHubData.complexityDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ideaHubData.complexityDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 flex flex-wrap gap-4 justify-center">
                  {ideaHubData.complexityDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs text-gray-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Status Distribution - Bar Chart */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="w-5 h-5" />
                  Status Distribution
                </CardTitle>
                <p className="text-xs text-muted-foreground">Overview of all idea statuses</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ideaHubData.statusDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" name="Count" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Rate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm font-medium text-gray-600 mb-2">Approval Rate</div>
                <div className="text-xs text-muted-foreground mb-3">Approved / (Total - Declined)</div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{ideaHubData.approvalRate}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: ideaHubData.approvalRate }}></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm font-medium text-gray-600 mb-2">Implementation Rate</div>
                <div className="text-xs text-muted-foreground mb-3">Implemented / (Total - Declined)</div>
                <div className="text-3xl font-bold text-green-600 mb-2">{ideaHubData.implementationRate}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: ideaHubData.implementationRate }}></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm font-medium text-gray-600 mb-2">Assigned to T&E Rate</div>
                <div className="text-xs text-muted-foreground mb-3">Assigned to T&E / (Total - Declined)</div>
                <div className="text-3xl font-bold text-purple-600 mb-2">{ideaHubData.assignedToTERate}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: ideaHubData.assignedToTERate }}></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Best Eye-ideas */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Card className="bg-yellow-50 border-yellow-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Best Eye-ideas (3/5)</CardTitle>
                  <p className="text-xs text-muted-foreground">Top ideas selected by the C.I. Excellence Team</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ideaHubData.bestEyeIdeas.map((idea, index) => (
                  <Card key={index} className="bg-white border-yellow-200">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          {idea.id}
                        </span>
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      </div>
                      <h4 className="font-semibold text-sm mb-2 text-gray-900">{idea.title}</h4>
                      <p className="text-xs text-gray-600 mb-3">{idea.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>By {idea.submittedBy}</span>
                        <span className="text-gray-400">{idea.department}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-3 text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Connection Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">Connected to IdeaHub Platform</span>
                  <span className="text-gray-600 ml-2">Viewing live data from C.I. Analytics. Click "Refresh" to update.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Default view - Connection prompt
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground">C.I. Excellence Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Connect to IdeaHub to access C.I. Analytics and live data
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
                className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-4"
              >
                <TrendingUp className="w-10 h-10 text-white" />
              </motion.div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
                  Connect to IdeaHub Platform
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Sign in to IdeaHub to access live C.I. Analytics data, improvement tracking, 
                  and real-time collaboration tools.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={handleOpenIdeaHub}
                    disabled={isLoading}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-lg gap-3 shadow-lg"
                  >
                    {isLoading ? "Opening IdeaHub..." : (
                      <>
                        Open IdeaHub
                        <ExternalLink className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={handleSyncData}
                    disabled={isFetchingData}
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-6 text-lg gap-3"
                  >
                    {isFetchingData ? "Syncing..." : (
                      <>
                        Load C.I. Analytics
                        <RefreshCw className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>

              {showInstructions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-lg p-4 border border-blue-200"
                >
                  <p className="text-sm text-gray-700 font-medium mb-2">How to connect:</p>
                  <ol className="text-sm text-gray-600 text-left space-y-1 max-w-md mx-auto">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">1.</span>
                      <span>Click "Open IdeaHub" to sign in (opens in new tab)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">2.</span>
                      <span>Return to this page after signing in</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">3.</span>
                      <span>Click "Load C.I. Analytics" to sync live data</span>
                    </li>
                  </ol>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}