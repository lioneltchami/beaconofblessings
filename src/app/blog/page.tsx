import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBlogPosts } from "@/lib/sanity/queries";

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

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-[#FAF6F1]">
      {/* Hero Section -- lighter hero with teal heading */}
      <section className="bg-[#EAF6EF] px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-[#256B4B] sm:text-5xl">
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
              <Card className="h-full border-t-4 border-primary transition-shadow group-hover:ring-2 group-hover:ring-primary/30">
                <CardHeader>
                  <div className="mb-2">
                    <span className="inline-flex h-5 items-center rounded-full bg-primary/10 px-2 text-xs font-medium text-primary">
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
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors">
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
