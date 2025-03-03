import { NextRequest, NextResponse } from 'next/server';

// In a real app, you would use a database
let playlists = [
  {
    id: '1',
    title: 'Web Development Basics',
    description: 'A comprehensive playlist covering the fundamentals of modern web development.',
    videos: [
      {
        id: 'pv-1',
        videoId: '1',
        playlistId: '1',
        order: 0,
      },
      {
        id: 'pv-2',
        videoId: '2',
        playlistId: '1',
        order: 1,
      },
      {
        id: 'pv-3',
        videoId: '3',
        playlistId: '1',
        order: 2,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'React Advanced Concepts',
    description: 'Deep dive into advanced React patterns and techniques.',
    videos: [
      {
        id: 'pv-4',
        videoId: '3',
        playlistId: '2',
        order: 0,
      },
      {
        id: 'pv-5',
        videoId: '1',
        playlistId: '2',
        order: 1,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(playlists);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    
    if (!body.videos || !Array.isArray(body.videos) || body.videos.length === 0) {
      return NextResponse.json(
        { error: 'At least one video is required' },
        { status: 400 }
      );
    }
    
    const newPlaylist = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description || '',
      videos: body.videos.map((video: any, index: number) => ({
        id: `pv-${Date.now()}-${index}`,
        videoId: video.videoId,
        playlistId: Date.now().toString(),
        order: video.order || index,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    playlists.push(newPlaylist);
    
    return NextResponse.json(newPlaylist, { status: 201 });
  } catch (error) {
    console.error('Error creating playlist:', error);
    return NextResponse.json(
      { error: 'Failed to create playlist' },
      { status: 500 }
    );
  }
}