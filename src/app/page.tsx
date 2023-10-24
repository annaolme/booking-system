'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Service {
    id: string
    name: string
    description: string | null
    duration: number
    price: number
}

export default function Home() {
    const [services, setServices] = useState<Service[]>([])

    useEffect(() => {
        fetch('/api/services')
            .then(res => res.json())
            .then(setServices)
            .catch(console.error)
    }, [])

    return (
        <>
            <nav>
                <div className="container">
                    <h1>Booking System</h1>
                    <div>
                        <Link href="/book">Book Now</Link>
                        {' | '}
                        <Link href="/admin">Admin</Link>
                    </div>
                </div>
            </nav>
            <div className="container">
                <h2 className="page-title">Our Services</h2>
                {services.length === 0 ? (
                    <div className="empty-state">
                        <p>No services available yet.</p>
                        <p>Go to <Link href="/admin">Admin</Link> to add services.</p>
                    </div>
                ) : (
                    <div className="grid-3">
                        {services.map(service => (
                            <div key={service.id} className="service-card">
                                <h3>{service.name}</h3>
                                {service.description && <p>{service.description}</p>}
                                <div className="price">{new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR' }).format(service.price)}</div>
                                <div className="duration">{service.duration} min</div>
                            </div>
                        ))}
                    </div>
                )}
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <Link href="/book" className="btn btn-primary">Book an Appointment</Link>
                </div>
            </div>
        </>
    )
}
