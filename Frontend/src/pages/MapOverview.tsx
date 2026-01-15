import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layouts/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Filter,
  Layers,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Key,
  ExternalLink,
} from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mockProjects = [
  {
    id: 1,
    name: "NH-44 Road Widening Project",
    location: "Sector 12-14",
    status: "compliant",
    type: "roads",
    reports: 3,
    lastUpdated: "2 days ago",
    coordinates: [77.2090, 28.6139] as [number, number],
  },
  {
    id: 2,
    name: "Municipal Drainage System",
    location: "Old City Area",
    status: "suspect",
    type: "drainage",
    reports: 12,
    lastUpdated: "5 hours ago",
    coordinates: [77.2295, 28.6353] as [number, number],
  },
  {
    id: 3,
    name: "Government Hospital Renovation",
    location: "Civil Lines",
    status: "non-compliant",
    type: "buildings",
    reports: 28,
    lastUpdated: "1 hour ago",
    coordinates: [77.2167, 28.6800] as [number, number],
  },
  {
    id: 4,
    name: "Bridge Construction Project",
    location: "River Crossing",
    status: "compliant",
    type: "bridges",
    reports: 5,
    lastUpdated: "1 week ago",
    coordinates: [77.1855, 28.6129] as [number, number],
  },
  {
    id: 5,
    name: "Smart Street Lighting",
    location: "Connaught Place",
    status: "compliant",
    type: "lighting",
    reports: 2,
    lastUpdated: "3 days ago",
    coordinates: [77.2195, 28.6315] as [number, number],
  },
];

const statusConfig = {
  compliant: {
    label: "Verified Compliant",
    icon: CheckCircle,
    color: "#22c55e",
    bgColor: "#dcfce7",
  },
  suspect: {
    label: "Requires Review",
    icon: AlertCircle,
    color: "#f59e0b",
    bgColor: "#fef3c7",
  },
  "non-compliant": {
    label: "Non-Compliant",
    icon: AlertTriangle,
    color: "#ef4444",
    bgColor: "#fee2e2",
  },
};

export default function MapOverview() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [isMapReady, setIsMapReady] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all-status");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  const filteredProjects = mockProjects.filter((project) => {
    if (typeFilter !== "all" && project.type !== typeFilter) return false;
    if (statusFilter !== "all-status" && project.status !== statusFilter) return false;
    return true;
  });

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [77.2090, 28.6139],
        zoom: 11,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({ visualizePitch: true }),
        "top-right"
      );

      map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

      map.current.on("load", () => {
        setIsMapReady(true);
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      markers.current.forEach((marker) => marker.remove());
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (!map.current || !isMapReady) return;

    // Clear existing markers
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    // Add new markers
    filteredProjects.forEach((project) => {
      const config = statusConfig[project.status as keyof typeof statusConfig];

      const el = document.createElement("div");
      el.className = "marker-custom";
      el.innerHTML = `
        <div style="
          width: 36px;
          height: 36px;
          background: ${config.bgColor};
          border: 3px solid ${config.color};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: transform 0.2s;
        ">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${config.color}" stroke-width="2">
            ${project.status === "compliant" 
              ? '<path d="M20 6L9 17l-5-5"/>' 
              : project.status === "suspect"
              ? '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>'
              : '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/>'
            }
          </svg>
        </div>
      `;

      el.addEventListener("mouseenter", () => {
        el.querySelector("div")!.style.transform = "scale(1.2)";
      });
      el.addEventListener("mouseleave", () => {
        el.querySelector("div")!.style.transform = "scale(1)";
      });
      el.addEventListener("click", () => {
        setSelectedProject(project.id);
        map.current?.flyTo({
          center: project.coordinates,
          zoom: 14,
          duration: 1000,
        });
      });

      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`
        <div style="padding: 8px; min-width: 200px;">
          <h4 style="font-weight: 600; margin-bottom: 4px; font-size: 14px;">${project.name}</h4>
          <p style="color: #666; font-size: 12px; margin-bottom: 8px;">${project.location}</p>
          <span style="
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
            background: ${config.bgColor};
            color: ${config.color};
          ">${config.label}</span>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(project.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      markers.current.push(marker);
    });
  }, [filteredProjects, isMapReady]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setIsMapReady(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-civic-50 border-b border-border">
        <div className="container-civic py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="heading-section text-foreground mb-2">
                Infrastructure Map Overview
              </h1>
              <p className="body-regular text-muted-foreground">
                Visualize infrastructure integrity status across the region
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="roads">Roads</SelectItem>
                  <SelectItem value="drainage">Drainage</SelectItem>
                  <SelectItem value="buildings">Buildings</SelectItem>
                  <SelectItem value="bridges">Bridges</SelectItem>
                  <SelectItem value="lighting">Lighting</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Layers className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="compliant">Compliant</SelectItem>
                  <SelectItem value="suspect">Suspect</SelectItem>
                  <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative">
        <div className="flex flex-col lg:flex-row">
          {/* Map Area */}
          <div className="flex-1 relative">
            <div className="aspect-[16/10] lg:aspect-auto lg:h-[calc(100vh-200px)] bg-civic-100 relative">
              {!mapboxToken ? (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <Card className="max-w-md w-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-primary" />
                        Mapbox Access Token Required
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        To view the interactive map, please enter your Mapbox public access token.
                      </p>
                      <div className="space-y-2">
                        <Label htmlFor="token">Mapbox Public Token</Label>
                        <Input
                          id="token"
                          type="text"
                          placeholder="pk.eyJ1I..."
                          value={mapboxToken}
                          onChange={(e) => setMapboxToken(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button onClick={handleTokenSubmit} disabled={!mapboxToken.trim()}>
                          Load Map
                        </Button>
                        <a
                          href="https://account.mapbox.com/access-tokens/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1 justify-center"
                        >
                          Get your free token from Mapbox
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <>
                  <div ref={mapContainer} className="absolute inset-0" />

                  {/* Legend */}
                  <div className="absolute left-4 bottom-4 bg-card p-4 rounded-lg shadow-lg border border-border z-10">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Status Legend</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full" style={{ background: statusConfig.compliant.color }} />
                        <span className="text-sm text-muted-foreground">Verified Compliant</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full" style={{ background: statusConfig.suspect.color }} />
                        <span className="text-sm text-muted-foreground">Requires Review</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full" style={{ background: statusConfig["non-compliant"].color }} />
                        <span className="text-sm text-muted-foreground">Non-Compliant</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sidebar - Project List */}
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border bg-background overflow-y-auto lg:max-h-[calc(100vh-200px)]">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">
                Projects ({filteredProjects.length})
              </h3>
            </div>
            <div className="divide-y divide-border">
              {filteredProjects.map((project) => {
                const config = statusConfig[project.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;
                return (
                  <button
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project.id);
                      if (map.current) {
                        map.current.flyTo({
                          center: project.coordinates,
                          zoom: 14,
                          duration: 1000,
                        });
                      }
                    }}
                    className={`w-full p-4 text-left transition-colors hover:bg-muted/50 ${
                      selectedProject === project.id ? "bg-civic-50 border-l-4 border-l-primary" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-foreground text-sm">
                        {project.name}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className="text-xs shrink-0"
                        style={{ 
                          borderColor: config.color, 
                          color: config.color,
                          background: config.bgColor 
                        }}
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {project.reports} reports
                      </span>
                      <span className="text-muted-foreground">
                        Updated {project.lastUpdated}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}