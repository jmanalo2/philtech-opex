import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Upload, Users } from "lucide-react";

export function AttendanceModule() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Tracking</h1>
          <p className="text-muted-foreground mt-1">
            Employee attendance management and reporting
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import Data
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Present Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">42</div>
            <p className="text-xs text-muted-foreground mt-1">of 50 employees</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              On Leave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">5</div>
            <p className="text-xs text-muted-foreground mt-1">scheduled absences</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Absent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground mt-1">unplanned absences</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Integration Placeholder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-12 text-center space-y-4">
            <Users className="w-16 h-16 mx-auto text-muted-foreground/50" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Attendance System Integration</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                This module is ready for integration with external attendance tracking systems.
                Connect your HR platform, biometric system, or time clock application.
              </p>
            </div>
            <div className="pt-4">
              <Button className="gap-2">
                <Upload className="w-4 h-4" />
                Configure Integration
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sample Attendance Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Employee</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Department</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Check-In</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Check-Out</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3">John Smith</td>
                  <td className="p-3">Production</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Present</span>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">08:00 AM</td>
                  <td className="p-3 text-sm text-muted-foreground">05:00 PM</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3">Sarah Johnson</td>
                  <td className="p-3">Quality</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Present</span>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">08:15 AM</td>
                  <td className="p-3 text-sm text-muted-foreground">05:15 PM</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3">Michael Chen</td>
                  <td className="p-3">Operations</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">On Leave</span>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">—</td>
                  <td className="p-3 text-sm text-muted-foreground">—</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3">Emily Davis</td>
                  <td className="p-3">Planning</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Present</span>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">07:45 AM</td>
                  <td className="p-3 text-sm text-muted-foreground">04:45 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}