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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const playlist = playlists.find((p) => p.id === params.id);
  
  if (!playlist) {
    return NextResponse.json(
      { error: 'Playlist not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(playlist);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const playlistIndex = playlists.findIndex((p) => p.id === params.id);
    
    if (playlistIndex === -1) {
      return NextResponse.json(
        { error: 'Playlist not found' },
        { status: 404 }
      );
    }
    
    // Update the playlist
    playlists[playlistIndex] = {
      ...playlists[playlistIndex],
      title: body.title || playlists[playlistIndex].title,
      description: body.description !== undefined ? body.description : playlists[playlistIndex].description,
      videos: body.videos || playlists[playlistIndex].videos,
      updatedAt: new Date(),
    };
    
    return NextResponse.json(playlists[playlistIndex]);
  } catch (error) {
    console.error('Error updating playlist:', error);
    return NextResponse.json(
      { error: 'Failed to update playlist' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const playlistIndex = playlists.findIndex((p) => p.id === params.id);
  
  if (playlistIndex === -1) {
    return NextResponse.json(
      { error: 'Playlist not found' },
      { status: 404 }
    );
  }
  
  playlists = playlists.filter((p) => p.id !== params.id);
  
  return NextResponse.json({ success: true });
}