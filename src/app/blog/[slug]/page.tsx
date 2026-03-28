import { ArrowLeft, Calendar, Clock, Heart, User } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { getBlogPost, getBlogSlugs } from "@/lib/sanity/queries";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content.split("\n\n");

  return (
    <main className="min-h-screen">
      {/* Hero / Header */}
      <section className="px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
            style={{ color: "var(--bob-purple-600)" }}
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>

          <div className="mb-4">
            <span
              className="inline-flex h-5 items-center rounded-full px-2 text-xs font-medium"
              style={{
                backgroundColor: "var(--bob-purple-100)",
                color: "var(--bob-purple-700)",
              }}
            >
              {post.category}
            </span>
          </div>

          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            style={{
              backgroundImage: `linear-gradient(135deg, var(--bob-purple-700), var(--bob-purple-500))`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-4" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" />
              {post.readTime}
            </span>
          </div>

          <Separator className="mt-8" />
        </div>
      </section>

      {/* Post Content */}
      <section className="px-4 pb-12">
        <article className="mx-auto max-w-3xl">
          <div className="space-y-5 text-base leading-relaxed text-foreground/90">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10">
              <Separator className="mb-6" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex h-6 items-center rounded-full border border-border px-2.5 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div
            className="mt-12 rounded-xl p-8 text-center"
            style={{ backgroundColor: "var(--bob-purple-50)" }}
          >
            <div
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--bob-purple-100)" }}
            >
              <Heart
                className="size-6"
                style={{ color: "var(--bob-purple-600)" }}
              />
            </div>
            <h2 className="text-xl font-bold">Support Our Work</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Your generosity helps us continue transforming lives through
              education in Nigeria.
            </p>
            <Link
              href="/donate"
              className="mt-4 inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: "var(--bob-purple-600)" }}
            >
              Donate Now
            </Link>
          </div>

          {/* Back link */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
              style={{ color: "var(--bob-purple-600)" }}
            >
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
