"use client";

import { Calendar, Camera, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Album, albumCategories } from "@/data/albums";
import type { SanityImage } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const categoryGradients: Record<string, string> = {
	Education: "linear-gradient(135deg, #2F7D5A 0%, #256B4B 100%)",
	Community: "linear-gradient(135deg, #2F7D5A 0%, #E8A825 100%)",
	Team: "linear-gradient(135deg, #4FA778 0%, #2F7D5A 100%)",
	Impact: "linear-gradient(135deg, #2D3A6E 0%, #E8A825 100%)",
};

interface GalleryGridProps {
	albums: Array<Album & { coverImage?: SanityImage }>;
}

function getImageUrl(image?: SanityImage): string | undefined {
	return image?.asset?.url;
}

export function GalleryGrid({ albums }: GalleryGridProps) {
	const [selected, setSelected] = useState<string>("all");

	const filtered =
		selected === "all"
			? albums
			: albums.filter((album) => album.category === selected);

	return (
		<div>
			{/* Category filter */}
			<div
				className="flex flex-wrap justify-center gap-2"
				role="group"
				aria-label="Filter albums by category"
			>
				{albumCategories.map((cat) => {
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

			{/* Grid */}
			<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map((album) => {
					const coverImageUrl = getImageUrl(album.coverImage);
					return (
						<Link
							key={album.slug}
							href={`/gallery/${album.slug}`}
							className="group"
						>
							<Card className="flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
								{coverImageUrl ? (
									<div className="aspect-[4/3] overflow-hidden rounded-t-xl bg-gray-100">
										<Image
											src={coverImageUrl}
											alt={album.coverImage?.alt || album.title}
											width={640}
											height={480}
											sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
											className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
										/>
									</div>
								) : (
									<div
										className="flex aspect-[4/3] items-center justify-center rounded-t-xl"
										style={{
											background:
												categoryGradients[album.category] ||
												categoryGradients.Education,
										}}
										aria-hidden="true"
									>
										<Camera className="h-10 w-10 text-white/40 transition-transform duration-300 group-hover:scale-110" />
									</div>
								)}

								<CardHeader>
								<div className="flex items-center justify-between gap-2">
									<span className="inline-flex items-center rounded-full bg-[#2F7D5A]/10 px-2.5 py-0.5 text-xs font-medium text-[#2F7D5A]">
										{album.category}
									</span>
									<span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
										<ImageIcon className="h-3 w-3" />
										{album.photoCount} photos
									</span>
								</div>
								<CardTitle className="text-base">{album.title}</CardTitle>
							</CardHeader>

							<CardContent className="flex-1">
								<p className="text-sm text-muted-foreground line-clamp-2">
									{album.description}
								</p>
								<div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
									<Calendar className="h-3 w-3" />
									{album.date}
								</div>
							</CardContent>
							</Card>
						</Link>
					);
				})}
			</div>

			{/* Empty state */}
			{filtered.length === 0 && (
				<div className="mt-12 text-center">
					<p className="text-muted-foreground">
						No albums in this category yet.
					</p>
				</div>
			)}
		</div>
	);
}
