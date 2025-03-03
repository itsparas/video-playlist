
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, ListVideo, ChevronLeft, ChevronRight, SkipForward } from 'lucide-react';
import { VideoPlayer } from '@/components/video-player';
import { Playlist, Video } from '@/lib/types';
import PlaylistPage from '@/components/playlist-page';

export function generateStaticParams() {
  // In a real app, you would fetch all video IDs from your API
  return [
    { id: "1" },
    { id: "2" },
    // { id: '3' },
  ];
}

export default function PlaylistPageUI({ params }: { params: { id: string } }) {
  return <PlaylistPage params={params} />;
}