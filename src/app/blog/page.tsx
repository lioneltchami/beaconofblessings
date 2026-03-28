import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { getBlogPosts } from "@/data/blog-posts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stories, updates, and reflections from Beacon of Blessings — illuminating futures through education in Nigeria.",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl"
            style={{
              backgroundImage: `linear-gradient(135deg, var(--bob-purple-700), var(--bob-purple-500), var(--bob-gold-500))`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Stories of impact, ministry updates, and reflections on our mission
            to illuminate futures through education.
          </p>
          <Separator className="mx-auto mt-8 max-w-xs" />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block transition-transform hover:-translate-y-1"
            >
              <Card
                className="h-full transition-shadow group-hover:ring-2"
                style={
                  {
                    "--tw-ring-color": "var(--bob-purple-300)",
                  } as React.CSSProperties
                }
              >
                <CardHeader>
                  <div className="mb-2">
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
                  <CardTitle className="text-lg leading-snug group-hover:underline">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <User className="size-3" />
                      {post.author}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3" />
                      {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>

                <CardFooter>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
                    style={{ color: "var(--bob-purple-600)" }}
                  >
                    Read More
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
