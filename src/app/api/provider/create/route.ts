import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // adjust path if needed
import { providerSchema } from '@/lib/schemas/provider';

export async function POST(req: Request) {
  const body = await req.json();
  const result = providerSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid input', details: result.error }, { status: 400 });
  }

  try {
    const provider = await prisma.provider.create({
      data: result.data,
    });

    return NextResponse.json(provider, { status: 200 });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Server error', details: error }, { status: 500 });
  }
}
