// /api/provider/create/route.ts
'use server';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { providerSchema } from '@/lib/schemas/provider';

export async function POST(req: Request) {
  const body = await req.json();
  const result = providerSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: result.error },
      { status: 400 }
    );
  }

  try {
    const provider = await prisma.provider.create({
      data: result.data,
    });

    return NextResponse.json(provider, { status: 200 });
  } catch (err: any) {
    if (err.code === 'P2002') {
      return NextResponse.json(
        {
          error: 'Unique constraint failed',
          code: 'P2002',
          field: err.meta?.target?.[0] || 'unknown',
        },
        { status: 409 }
      );
    }

    console.error('Unhandled DB error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
