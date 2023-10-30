import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json()
    const booking = await prisma.booking.update({
        where: { id: params.id },
        data: { status: body.status }
    })
    return NextResponse.json(booking)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    await prisma.booking.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
}
