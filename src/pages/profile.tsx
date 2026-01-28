import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SEO } from "@/components/SEO";
import { Mail, Phone, Building, MapPin, User, Edit, Save, X } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@albertsons.com",
    phone: "(555) 123-4567",
    department: "Operations",
    location: "Distribution Center - Phoenix, AZ",
    bio: "Operational Excellence Lead with 8+ years of experience in process improvement and Lean Six Sigma methodologies.",
    title: "Operations Manager"
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <SEO title="User Profile - Philtech Operational Excellence" />
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">User Profile</h1>
            <p className="text-slate-600 mt-1">Manage your account information</p>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            {!isEditing ? (
              <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button onClick={handleCancel} variant="outline" className="flex-1 sm:flex-none">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <User className="w-16 h-16 text-white" />
              </div>
              <CardTitle className="text-2xl">
                {profile.firstName} {profile.lastName}
              </CardTitle>
              <CardDescription className="text-base">{profile.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-slate-700">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="text-slate-700">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building className="w-4 h-4 text-blue-600" />
                <span className="text-slate-700">{profile.department}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-slate-700">{profile.location}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                {isEditing ? "Update your personal information" : "Your account details"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={isEditing ? editedProfile.firstName : profile.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-slate-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={isEditing ? editedProfile.lastName : profile.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-slate-50" : ""}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={isEditing ? editedProfile.email : profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-slate-50" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={isEditing ? editedProfile.title : profile.title}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-slate-50" : ""}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={isEditing ? editedProfile.phone : profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-slate-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    value={isEditing ? editedProfile.department : profile.department}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-slate-50" : ""}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={isEditing ? editedProfile.location : profile.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-slate-50" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={isEditing ? editedProfile.bio : profile.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-slate-50" : ""}
                  placeholder="Tell us about yourself..."
                />
              </div>

              {isEditing && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Change Password (Optional)</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                        <Input
                          id="confirmNewPassword"
                          name="confirmNewPassword"
                          type="password"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-6">
              <p className="text-sm text-muted-foreground text-center w-full">
                Member since January 2026 • Last updated {new Date().toLocaleDateString()}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
}