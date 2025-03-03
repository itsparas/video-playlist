"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Play,
  ListVideo,
  ChevronLeft,
  ChevronRight,
  SkipForward,
} from "lucide-react";
import { VideoPlayer } from "@/components/video-player";
import { Playlist, Video } from "@/lib/types";

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchPlaylist = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch from your API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const videos: Video[] = [
          {
            id: "1",
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
          },
          {
            id: "2",
            title: "Building with Tailwind CSS",
            description:
              "Master Tailwind CSS and learn how to build beautiful, responsive UIs.",
            duration: 450,
            category: "education",
            url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            thumbnailUrl:
              "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "3",
            title: "React Hooks Explained",
            description:
              "Deep dive into React Hooks and how to use them effectively in your applications.",
            duration: 280,
            category: "education",
            url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            thumbnailUrl:
              "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        setPlaylist({
          id: params.id,
          title: "Web Development Basics",
          description:
            "A comprehensive playlist covering the fundamentals of modern web development.",
          videos: videos.map((video, index) => ({
            id: `pv-${index}`,
            videoId: video.id,
            playlistId: params.id,
            order: index,
            video,
          })),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylist();
  }, [params.id]);

  const handleNextVideo = () => {
    if (playlist && currentVideoIndex < playlist.videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-lg">Loading playlist...</p>
        </div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Playlist not found</p>
          <Link href="/playlists">
            <Button>Back to Playlists</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentVideo = playlist.videos[currentVideoIndex]?.video;

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">No videos in this playlist</p>
          <Link href="/playlists">
            <Button>Back to Playlists</Button>
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
            <div
              key={JSON.stringify(currentVideo)}
              className="aspect-video overflow-hidden rounded-lg"
            >
              <VideoPlayer
                src={currentVideo.url}
                poster={currentVideo.thumbnailUrl}
              />
            </div>
            <div>
              <div className="flex sm:items-center justify-between flex-col sm:flex-row">
                <h1 className="text-2xl font-bold">{currentVideo.title}</h1>
                <div className="flex gap-2 w-full sm:w-max">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousVideo}
                    disabled={currentVideoIndex === 0}
                    className="w-full sm:w-max"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextVideo}
                    disabled={currentVideoIndex === playlist.videos.length - 1}
                    className="w-full sm:w-max"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground">
                  {formatDuration(currentVideo.duration)} • Video{" "}
                  {currentVideoIndex + 1} of {playlist.videos.length}
                </span>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{currentVideo.description || "No description available."}</p>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{playlist.title}</CardTitle>
                <CardDescription>
                  {playlist.description || "No description available."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {playlist.videos.map((playlistVideo, index) => {
                    const video = playlistVideo.video;
                    const isActive = index === currentVideoIndex;

                    return (
                      <div
                        key={playlistVideo.id}
                        className={`flex gap-3 p-2 rounded-md cursor-pointer hover:bg-muted/50 ${
                          isActive
                            ? "bg-primary/10 border-l-4 border-primary"
                            : ""
                        }`}
                        onClick={() => setCurrentVideoIndex(index)}
                      >
                        <div className="relative aspect-video w-24 flex-shrink-0 overflow-hidden rounded-md">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="object-cover w-full h-full"
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <Play className="h-6 w-6 text-white" />
                            </div>
                          )}
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                            {formatDuration(video.duration)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-medium line-clamp-2 ${
                              isActive ? "text-primary" : ""
                            }`}
                          >
                            {video.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {index + 1} of {playlist.videos.length}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
