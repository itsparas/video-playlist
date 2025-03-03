"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Play, ListVideo, GripVertical, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Video } from '@/lib/types';

export default function CreatePlaylistPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [selectedVideos, setSelectedVideos] = useState<Video[]>([]);

  // In a real app, you would fetch videos from the API
  const availableVideos: Video[] = [
    {
      id: '1',
      title: 'Introduction to Next.js',
      duration: 320,
      url: 'https://example.com/video1.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Building with Tailwind CSS',
      duration: 450,
      url: 'https://example.com/video2.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'React Hooks Explained',
      duration: 280,
      url: 'https://example.com/video3.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoToggle = (video: Video) => {
    setSelectedVideos((prev) => {
      const isSelected = prev.some((v) => v.id === video.id);
      if (isSelected) {
        return prev.filter((v) => v.id !== video.id);
      } else {
        return [...prev, video];
      }
    });
  };

  const handleRemoveVideo = (videoId: string) => {
    setSelectedVideos((prev) => prev.filter((v) => v.id !== videoId));
  };

  const moveVideo = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= selectedVideos.length) return;
    
    const newOrder = [...selectedVideos];
    const [movedVideo] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedVideo);
    
    setSelectedVideos(newOrder);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      toast({
        title: "Title required",
        description: "Please provide a title for your playlist.",
        variant: "destructive",
      });
      return;
    }

    if (selectedVideos.length === 0) {
      toast({
        title: "No videos selected",
        description: "Please select at least one video for your playlist.",
        variant: "destructive",
      });
      return;
    }

    try {
      // In a real app, you would send the data to your API
      // const response = await fetch('/api/playlists', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     videos: selectedVideos.map((video, index) => ({
      //       videoId: video.id,
      //       order: index,
      //     })),
      //   }),
      // });

      toast({
        title: "Playlist created",
        description: "Your playlist has been created successfully.",
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/playlists');
      }, 1500);
    } catch (error) {
      console.error('Error creating playlist:', error);
      toast({
        title: "Creation failed",
        description: "There was an error creating your playlist. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/videos" className="text-sm font-medium hover:underline underline-offset-4">
              My Videos
            </Link>
            <Link href="/playlists" className="text-sm font-medium hover:underline underline-offset-4">
              My Playlists
            </Link>
          </nav>
        </div>
      </header>
      <main className="container px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create Playlist</h1>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Playlist Details</CardTitle>
                  <CardDescription>
                    Provide information about your playlist.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter playlist title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter playlist description"
                        rows={4}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Link href="/playlists">
                        <Button variant="outline">
                          Cancel
                        </Button>
                      </Link>
                      <Button type="submit">
                        Create Playlist
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              {selectedVideos.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Selected Videos ({selectedVideos.length})</CardTitle>
                    <CardDescription>
                      Drag to reorder videos in your playlist.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedVideos.map((video, index) => (
                        <div key={video.id} className="flex items-center gap-2 p-2 border rounded-md">
                          <div className="cursor-move">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 flex items-center gap-3">
                            <div className="relative aspect-video w-20 flex-shrink-0 overflow-hidden rounded-md">
                              <img
                                src={video.thumbnailUrl}
                                alt={video.title}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{video.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDuration(video.duration)}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveVideo(index, index - 1)}
                              disabled={index === 0}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up">
                                <path d="m18 15-6-6-6 6"/>
                              </svg>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveVideo(index, index + 1)}
                              disabled={index === selectedVideos.length - 1}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down">
                                <path d="m6 9 6 6 6-6"/>
                              </svg>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveVideo(video.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Available Videos</CardTitle>
                <CardDescription>
                  Select videos to add to your playlist.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableVideos.map((video) => {
                    const isSelected = selectedVideos.some((v) => v.id === video.id);
                    return (
                      <div
                        key={video.id}
                        className={`flex items-center gap-3 p-2 border rounded-md ${
                          isSelected ? 'border-primary bg-primary/5' : ''
                        }`}
                      >
                        <Checkbox
                          id={`video-${video.id}`}
                          checked={isSelected}
                          onCheckedChange={() => handleVideoToggle(video)}
                        />
                        <div className="relative aspect-video w-20 flex-shrink-0 overflow-hidden rounded-md">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                            {formatDuration(video.duration)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <label
                            htmlFor={`video-${video.id}`}
                            className="font-medium cursor-pointer"
                          >
                            {video.title}
                          </label>
                          <p className="text-xs text-muted-foreground">
                            {new Date(video.createdAt).toLocaleDateString()}
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