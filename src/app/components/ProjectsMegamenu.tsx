"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  Leaf,
  Truck,
  BarChart3,
  Globe,
  ArrowRight,
  Star,
  Calendar,
  MapPin,
} from "lucide-react";
import Link from "next/link";

interface ProjectCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  count: number;
  color: string;
}

interface FeaturedProject {
  title: string;
  description: string;
  location: string;
  status: "active" | "completed" | "upcoming";
  participants: number;
  rating: number;
  image: string;
}

const projectCategories: ProjectCategory[] = [
  {
    title: "Agricultural Projects",
    description:
      "Crop cultivation, farming initiatives, and agricultural development",
    icon: <Leaf className="h-5 w-5" />,
    href: "/projects/agricultural",
    count: 0,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Cooperative Initiatives",
    description:
      "Farmer cooperatives, community projects, and collective farming",
    icon: <Users className="h-5 w-5" />,
    href: "/projects/cooperatives",
    count: 0,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Infrastructure Development",
    description:
      "Storage facilities, processing centers, and logistics infrastructure",
    icon: <Building2 className="h-5 w-5" />,
    href: "/projects/infrastructure",
    count: 2,
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Supply Chain Projects",
    description: "Logistics, transportation, and supply chain optimization",
    icon: <Truck className="h-5 w-5" />,
    href: "/projects/supply-chain",
    count: 0,
    color: "bg-purple-100 text-purple-700",
  },
 
 
];

const featuredProjects: FeaturedProject[] = [
  {
    title: "Sustainable Coffee Initiative",
    description:
      "Promoting sustainable coffee farming practices in the highlands",
    location: "Western Highlands",
    status: "active",
    participants: 156,
    rating: 4.8,
    image: "/assets/img/coffee-project.jpg",
  },
  {
    title: "Organic Vegetable Cooperative",
    description: "Community-driven organic farming and direct market access",
    location: "Central Region",
    status: "completed",
    participants: 89,
    rating: 4.9,
    image: "/assets/img/vegetable-project.jpg",
  },
 
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700";
    case "completed":
      return "bg-blue-100 text-blue-700";
    case "upcoming":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function ProjectsMegamenu() {
  return (
    <div className="w-screen max-w-7xl bg-white border border-gray-200 rounded-lg shadow-xl animate-in fade-in-0 zoom-in-95 duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Project Categories Section */}
        <div className="lg:col-span-2 p-6 border-r border-gray-200">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Project Categories
            </h3>
            <p className="text-sm text-gray-600">
              Explore different types of agricultural and cooperative projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectCategories.map((category) => (
              <Link key={category.title} href={category.href}>
                <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        {category.icon}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count} projects
                      </Badge>
                    </div>
                    <CardTitle className="text-base group-hover:text-green-600 transition-colors">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Projects Section */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Featured Projects
            </h3>
            <p className="text-sm text-gray-600">
              Highlighted initiatives making a difference
            </p>
          </div>

          <div className="space-y-4">
            {featuredProjects.map((project) => (
              <Card
                key={project.title}
                className="hover:shadow-md transition-all duration-200 border-0 shadow-sm"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-sm font-semibold mb-1">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-xs mb-2">
                        {project.description}
                      </CardDescription>
                    </div>
                    <Badge
                      className={`text-xs ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {project.participants}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium">
                        {project.rating}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs hover:bg-gray-100"
                    >
                      View Details
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          
        </div>
      </div>
    </div>
  );
}
