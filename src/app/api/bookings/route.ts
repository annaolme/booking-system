import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    const bookings = await prisma.booking.findMany({
        include: { service: true },
        orderBy: { date: 'desc' }
    })
    return NextResponse.json(bookings)
}

export async function POST(request: Request) {
    const body = await request.json()
    const booking = await prisma.booking.create({
        data: {
            customerName: body.customerName,
            customerEmail: body.customerEmail,
            customerPhone: body.customerPhone || null,
            date: new Date(body.date),
            time: body.time,
            notes: body.notes || null,
            serviceId: body.serviceId
        }
    })
    return NextResponse.json(booking, { status: 201 })
}
