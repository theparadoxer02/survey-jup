import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';

// GET /api/surveys
export async function GET() {
  try {
    const surveys = await prisma.survey.findMany({
      include: {
        questions: true,
        responses: {
          include: {
            answers: true
          }
        }
      }
    });
    return NextResponse.json(successResponse(surveys));
  } catch (error) {
    return NextResponse.json(errorResponse('Failed to fetch surveys'), { status: 500 });
  }
}

// POST /api/surveys
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, reward, userId, questions } = body;

    const survey = await prisma.survey.create({
      data: {
        title,
        description,
        reward,
        userId,
        questions: {
          create: questions.map((q: any, index: number) => ({
            text: q.text,
            type: q.type,
            options: JSON.stringify(q.options),
            order: index + 1,
            required: q.required ?? true
          }))
        }
      },
      include: {
        questions: true
      }
    });

    return NextResponse.json(successResponse(survey));
  } catch (error) {
    return NextResponse.json(errorResponse('Failed to create survey'), { status: 500 });
  }
}
