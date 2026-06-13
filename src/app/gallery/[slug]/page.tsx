import { ArrowLeft, Calendar, Camera, ImageIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlbumPhotoGrid } from "@/components/album-photo-grid";
import { siteConfig } from "@/data/site";
import { getAlbum, getAlbumSlugs } from "@/lib/sanity/queries";

interface AlbumPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAlbumSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AlbumPageProps): Promise<Metadata> {
  const { slug } = await params;
  const album = await getAlbum(slug);
  if (!album) return {};

  return {
    title: `${album.title} | Gallery | ${siteConfig.name}`,
    description: album.description,
  };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { slug } = await params;
  const album = await getAlbum(slug);

  if (!album) {
    notFound();
  }

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#256B4B] via-[#2F7D5A] to-[#4FA778] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <Link
            href="/gallery"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
              {album.category}
            </span>
          </div>

          <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {album.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#F5D060]">
            {album.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#EAF6EF]/70">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {album.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ImageIcon className="h-4 w-4" />
              {album.photoCount} photos
            </span>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="bg-[#FAF6F1] px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <AlbumPhotoGrid
            photos={album.photos}
            albumTitle={album.title}
            albumCategory={album.category}
          />
        </div>
      </section>

      {/* Note */}
      <section className="bg-[#FAF6F1] px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl border border-[#E8A825]/20 bg-[#E8A825]/5 px-6 py-4">
            <div className="flex items-start gap-3">
              <Camera className="mt-0.5 h-5 w-5 shrink-0 text-[#E8A825]" />
              <p className="text-sm text-[#21352B]/70">
                Real photos are being documented and will replace these
                placeholders soon. Thank you for your patience as we capture our
                ongoing work.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
