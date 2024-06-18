import React from "react";
import { Link } from "react-router-dom";  
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, MapPin } from "lucide-react";

const JobCard = ({ _id, title, type, location, isAdmin }) => {
  return (
        <Link to={isAdmin ? `/admin/job/${_id}` : `/job/${_id}`} className="block">
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="gap-x-4">
              <div className="flex items-center gap-x-2">
                <Briefcase />
                <span>{type}</span>
              </div>
              <div className="flex items-center gap-x-2">
                <MapPin/>
                <span>{location}</span>
              </div>
            </CardFooter>
          </Card>
        </Link>
  );
};

export default JobCard;
