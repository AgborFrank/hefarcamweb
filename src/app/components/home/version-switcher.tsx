import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VersionSwitcherProps {
  versions: string[];
  defaultVersion: string;
}

export function VersionSwitcher({
  versions,
  defaultVersion,
}: VersionSwitcherProps) {
  const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span className="text-sm font-medium">Version {selectedVersion}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-full">
        {versions.map((version) => (
          <DropdownMenuItem
            key={version}
            onClick={() => setSelectedVersion(version)}
            className={selectedVersion === version ? "bg-accent" : ""}
          >
            Version {version}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
