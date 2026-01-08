import { MapPin, Star, Mail, Phone } from "lucide-react";
import { Farmer } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface FarmerDialogProps {
  farmer: Farmer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FarmerDialog({ farmer, isOpen, onClose }: FarmerDialogProps) {
  if (!farmer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{farmer.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="aspect-[21/9] overflow-hidden rounded-lg">
            <img
              src={farmer.image}
              alt={farmer.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{farmer.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{farmer.rating}</span>
              <span className="text-sm text-muted-foreground">({farmer.totalReviews} reviews)</span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">About</h4>
            <p className="text-sm text-muted-foreground">{farmer.description}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {farmer.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>contact@{farmer.name.toLowerCase().replace(/\s+/g, '')}.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>(555) 123-4567</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
