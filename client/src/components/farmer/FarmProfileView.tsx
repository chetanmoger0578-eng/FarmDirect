import { useState } from "react";
import { Camera, MapPin, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

interface FarmProfileViewProps {
  userData: any;
}

export function FarmProfileView({ userData }: FarmProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    farmName: userData.name || "",
    email: userData.email || "",
    phone: "(555) 123-4567",
    location: "Hillsdale, CA",
    description: "Family-owned organic farm specializing in seasonal vegetables and herbs. Certified organic since 2015.",
    specialties: "Organic Vegetables, Herbs, Salad Greens",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Farm Profile</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Image */}
        <Card>
          <CardHeader>
            <CardTitle>Farm Image</CardTitle>
            <CardDescription>Upload a photo of your farm</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted flex items-center justify-center">
              <Camera className="w-12 h-12 text-muted-foreground" />
            </div>
            <Button variant="outline" className="w-full">
              <Camera className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Your farm's public information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name</Label>
                <Input
                  id="farmName"
                  value={profileData.farmName}
                  onChange={(e) => setProfileData({ ...profileData, farmName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    className="pl-9"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-9"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    className="pl-9"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Farm Description</Label>
              <Textarea
                id="description"
                rows={4}
                value={profileData.description}
                onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialties">Specialties (comma-separated)</Label>
              <Input
                id="specialties"
                value={profileData.specialties}
                onChange={(e) => setProfileData({ ...profileData, specialties: e.target.value })}
                disabled={!isEditing}
                placeholder="e.g., Organic Vegetables, Dairy, Fruits"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
          <CardDescription>Your farm's verification details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Farm License</span>
              <span className="text-sm font-medium">{userData.farmLicense || "Not provided"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Verification Status</span>
              <span className="text-sm font-medium text-green-600">✓ Verified</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Member Since</span>
              <span className="text-sm font-medium">January 2024</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
