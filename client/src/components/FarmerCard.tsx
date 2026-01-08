import { MapPin, Star } from "lucide-react";
import { Farmer } from "../types";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface FarmerCardProps {
  farmer: Farmer;
  onClick: () => void;
}

export function FarmerCard({ farmer, onClick }: FarmerCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={farmer.image}
          alt={farmer.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{farmer.name}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="w-3 h-3" />
          <span>{farmer.location}</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{farmer.rating}</span>
          <span className="text-sm text-muted-foreground">({farmer.totalReviews} reviews)</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {farmer.specialties.map((specialty) => (
            <Badge key={specialty} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
