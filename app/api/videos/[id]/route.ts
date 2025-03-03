import { NextRequest, NextResponse } from 'next/server';

// In a real app, you would use a database
let videos = [
  {
    id: '1',
    title: 'Introduction to Next.js',
    description: 'Learn the basics of Next.js and how to build modern web applications with React.',
    duration: 320,
    category: 'education',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Building with Tailwind CSS',
    description: 'Master Tailwind CSS and learn how to build beautiful, responsive UIs.',
    duration: 450,
    category: 'education',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'React Hooks Explained',
    description: 'Deep dive into React Hooks and how to use them effectively in your applications.',
    duration: 280,
    category: 'education',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const video = videos.find((v) => v.id === params.id);
  
  if (!video) {
    return NextResponse.json(
      { error: 'Video not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(video);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const videoIndex = videos.findIndex((v) => v.id === params.id);
    
    if (videoIndex === -1) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }
    
    // Update the video
    videos[videoIndex] = {
      ...videos[videoIndex],
      ...body,
      updatedAt: new Date(),
    };
    
    return NextResponse.json(videos[videoIndex]);
  } catch (error) {
    console.error('Error updating video:', error);
    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const videoIndex = videos.findIndex((v) => v.id === params.id);
  
  if (videoIndex === -1) {
    return NextResponse.json(
      { error: 'Video not found' },
      { status: 404 }
    );
  }
  
  // In a real app, you would also delete the video file from storage
  videos = videos.filter((v) => v.id !== params.id);
  
  return NextResponse.json({ success: true });
}