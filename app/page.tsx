import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileVideo, ListVideo, Upload, Play } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Play className="h-6 w-6" />
            <span className="text-xl font-bold">VideoStream</span>
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
      <main className="container px-4 md:px-6 py-8 md:py-12 lg:py-16">
        <section className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Create and Stream Video Playlists
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Upload your videos, create custom playlists, and enjoy seamless streaming.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/videos/upload">
              <Button size="lg">
                <Upload className="h-4 w-4 mr-2" />
                Upload Videos
              </Button>
            </Link>
            <Link href="/playlists/create">
              <Button size="lg" variant="outline">
                <ListVideo className="h-4 w-4 mr-2" />
                Create Playlist
              </Button>
            </Link>
          </div>
        </section>
        <section className="py-12 md:py-16 lg:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
              <div className="p-3 rounded-full bg-primary/10">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Upload Videos</h3>
              <p className="text-center text-muted-foreground">
                Upload your videos with metadata like title, description, and category.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
              <div className="p-3 rounded-full bg-primary/10">
                <ListVideo className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Create Playlists</h3>
              <p className="text-center text-muted-foreground">
                Create custom playlists by selecting and reordering your uploaded videos.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
              <div className="p-3 rounded-full bg-primary/10">
                <FileVideo className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Seamless Streaming</h3>
              <p className="text-center text-muted-foreground">
                Enjoy smooth playback with preloading and seamless transitions between videos.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2025 VideoStream. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}