import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    const services = await prisma.service.findMany({
        orderBy: { createdAt: 'asc' }
    })
    return NextResponse.json(services)
}

export async function POST(request: Request) {
    const body = await request.json()
    const service = await prisma.service.create({
        data: {
            name: body.name,
            description: body.description || null,
            duration: parseInt(body.duration),
            price: parseFloat(body.price)
        }
    })
    return NextResponse.json(service, { status: 201 })
}
