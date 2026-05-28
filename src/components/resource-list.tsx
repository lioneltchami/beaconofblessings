"use client";

import {
  Download,
  File,
  FileSpreadsheet,
  FileText,
  Presentation,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type Resource,
  type ResourceCategory,
  resourceCategories,
} from "@/data/resources";
import type { SanityResource } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const fileTypeIcons: Record<Resource["fileType"], typeof FileText> = {
  pdf: FileText,
  pptx: Presentation,
  xlsx: FileSpreadsheet,
  docx: File,
};

const fileTypeLabels: Record<Resource["fileType"], string> = {
  pdf: "PDF",
  pptx: "PPTX",
  xlsx: "XLSX",
  docx: "DOCX",
};

const categoryBorderColors: Record<ResourceCategory, string> = {
  registration: "border-l-[#2F7D5A]",
  "annual-reports": "border-l-[#2D3A6E]",
  "project-reports": "border-l-[#2D3A6E]",
  policies: "border-l-[#E8A825]",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface ResourceListProps {
  resources: Array<Resource | SanityResource>;
}

function getResourceUrl(resource: Resource | SanityResource): string | undefined {
  const fileUrl =
    "file" in resource ? resource.file?.asset?.url : undefined;
  return normalizeResourceUrl(fileUrl ?? resource.fileUrl);
}

function normalizeResourceUrl(url?: string): string | undefined {
  if (!url) return undefined;

  try {
    const parsed = new URL(url, "https://beaconofblessings.org");
    const isSanityFile =
      parsed.protocol === "https:" &&
      parsed.hostname === "cdn.sanity.io" &&
      parsed.pathname.startsWith("/files/");
    const isSameOrigin =
      parsed.origin === "https://beaconofblessings.org" &&
      parsed.pathname.startsWith("/documents/");

    return isSanityFile || isSameOrigin ? parsed.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function ResourceList({ resources }: ResourceListProps) {
  const [selected, setSelected] = useState<ResourceCategory | "all">("all");

  const filtered =
    selected === "all"
      ? resources
      : resources.filter((r) => r.category === selected);

  return (
    <div>
      {/* Category filter pills */}
      <div
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter documents by category"
      >
        {resourceCategories.map((cat) => {
          const isActive = selected === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelected(cat.value)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-[#2F7D5A] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
              aria-pressed={isActive}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Active category description */}
      {selected !== "all" && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {resourceCategories.find((c) => c.value === selected)?.description}
        </p>
      )}

      {/* Resource cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((resource) => {
          const Icon = fileTypeIcons[resource.fileType];
          const fileUrl = getResourceUrl(resource);
          return (
            <Card
              key={resource.id}
              className={cn(
                "card-interactive flex flex-col border-l-4",
                categoryBorderColors[resource.category],
              )}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF6EF]">
                    <Icon className="h-5 w-5 text-[#2F7D5A]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="font-heading text-base leading-snug">
                      {resource.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {resource.description}
                </p>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="uppercase">
                    {fileTypeLabels[resource.fileType]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {resource.fileSize}
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {formatDate(resource.date)}
                  </span>
                </div>

                {fileUrl ? (
                  <a
                    href={fileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ size: "sm" }), "w-full")}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                ) : (
                  <Button size="sm" className="w-full" disabled>
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            No documents in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
