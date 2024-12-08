import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';

// GET /api/transactions
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(errorResponse('User ID is required'), { status: 400 });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(successResponse(transactions));
  } catch (error) {
    return NextResponse.json(errorResponse('Failed to fetch transactions'), { status: 500 });
  }
}

// POST /api/transactions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, amount } = body;

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        type,
        amount,
        status: 'PENDING'
      }
    });

    // If it's a reward transaction, create a reward record
    if (type === 'REWARD') {
      await prisma.reward.create({
        data: {
          userId,
          amount,
          type: 'SURVEY_COMPLETION',
          description: 'Reward for survey completion'
        }
      });
    }

    return NextResponse.json(successResponse(transaction));
  } catch (error) {
    return NextResponse.json(errorResponse('Failed to create transaction'), { status: 500 });
  }
}
