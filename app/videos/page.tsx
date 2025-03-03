import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Play } from 'lucide-react';

export default function VideosPage() {
  // In a real app, you would fetch videos from the API
  const videos = [
    {
      id: '1',
      title: 'Introduction to Next.js',
      duration: 320,
      thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Building with Tailwind CSS',
      duration: 450,
      thumbnailUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'React Hooks Explained',
      duration: 280,
      thumbnailUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      createdAt: new Date(),
    },
  ];

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
          <div className="flex items-center gap-2">
            <Link href="/videos/upload">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="container px-4 md:px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Videos</h1>
          <Link href="/videos/upload">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {formatDuration(video.duration)}
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{video.title}</CardTitle>
              </CardHeader>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {video.createdAt.toLocaleDateString()}
                </span>
                <Link href={`/videos/${video.id}`}>
                  <Button variant="ghost" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}