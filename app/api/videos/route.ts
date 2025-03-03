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

export async function GET(request: NextRequest) {
  return NextResponse.json(videos);
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
    
    // In a real app, you would:
    // 1. Upload the video file to a storage service (S3, Cloudflare R2, etc.)
    // 2. Process the video (generate thumbnails, get duration, etc.)
    // 3. Save the metadata to your database
    
    const newVideo = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description || '',
      duration: body.duration || 0,
      category: body.category || '',
      url: body.url || '',
      thumbnailUrl: body.thumbnailUrl || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    videos.push(newVideo);
    
    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
}