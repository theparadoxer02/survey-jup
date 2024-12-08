import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';

// GET /api/rewards
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(errorResponse('User ID is required'), { status: 400 });
    }

    const rewards = await prisma.reward.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calculate total rewards
    const totalRewards = rewards.reduce((sum, reward) => sum + reward.amount, 0);

    return NextResponse.json(successResponse({
      rewards,
      totalRewards
    }));
  } catch (error) {
    return NextResponse.json(errorResponse('Failed to fetch rewards'), { status: 500 });
  }
}

// POST /api/rewards
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, amount, type, description } = body;

    const reward = await prisma.reward.create({
      data: {
        userId,
        amount,
        type,
        description
      }
    });

    // Create a corresponding transaction
    await prisma.transaction.create({
      data: {
        userId,
        type: 'REWARD',
        amount,
        status: 'COMPLETED'
      }
    });

    return NextResponse.json(successResponse(reward));
  } catch (error) {
    return NextResponse.json(errorResponse('Failed to create reward'), { status: 500 });
  }
}
