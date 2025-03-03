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
import VideoPage from "@/components/video-page";

export function generateStaticParams() {
  // In a real app, you would fetch all video IDs from your API
  return [
    { id: "1" },
    { id: "2" },
    // { id: '3' },
  ];
}

export default function VideoPageUI({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the video from the API
  return <VideoPage params={params} />;
}
