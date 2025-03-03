"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Play, ListVideo, ChevronLeft, ChevronRight } from "lucide-react";
import { VideoPlayer } from "@/components/video-player";
import { Video } from "@/lib/types";

export default function VideoPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the video from the API
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Simulate API fetch
    const fetchVideo = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch from your API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        setVideo({
          id: params.id,
          title: "Introduction to Next.js",
          description:
            "Learn the basics of Next.js and how to build modern web applications with React.",
          duration: 320,
          category: "education",
          url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        setRelatedVideos([
          {
            id: "2",
            title: "Building with Tailwind CSS",
            duration: 450,
            url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            thumbnailUrl:
              "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "3",
            title: "React Hooks Explained",
            duration: 280,
            url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            thumbnailUrl:
              "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [params.id]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-lg">Loading video...</p>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Video not found</p>
          <Link href="/videos">
            <Button>Back to Videos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Play className="h-6 w-6" />
            </Link>
            <Link href="/">
              <span className="text-xl font-bold">VideoStream</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Home
            </Link>
            <Link
              href="/videos"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              My Videos
            </Link>
            <Link
              href="/playlists"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              My Playlists
            </Link>
          </nav>
        </div>
      </header>
      <main className="container px-4 md:px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video overflow-hidden rounded-lg">
              <VideoPlayer src={video.url} poster={video.thumbnailUrl} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{video.title}</h1>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground">
                  {formatDuration(video.duration)} •{" "}
                  {video.createdAt.toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ListVideo className="h-4 w-4 mr-2" />
                    Add to Playlist
                  </Button>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{video.description || "No description available."}</p>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Related Videos</h2>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <Link href={`/videos/${relatedVideo.id}`} key={relatedVideo.id}>
                  <div className="flex gap-3 group">
                    <div className="relative aspect-video w-40 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={relatedVideo.thumbnailUrl}
                        alt={relatedVideo.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                        {formatDuration(relatedVideo.duration)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedVideo.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {relatedVideo.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
