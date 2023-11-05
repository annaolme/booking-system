'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { generateTimeSlots } from '@/lib/utils'

interface Service { id: string; name: string; duration: number; price: number }

export default function BookPage() {
    const [step, setStep] = useState(1)
    const [services, setServices] = useState<Service[]>([])
    const [selectedService, setSelectedService] = useState<string>('')
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        fetch('/api/services').then(r => r.json()).then(setServices)
    }, [])

    const timeSlots = generateTimeSlots()

    const handleSubmit = async () => {
        const res = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                serviceId: selectedService,
                date: selectedDate,
                time: selectedTime,
                customerName: form.name,
                customerEmail: form.email,
                customerPhone: form.phone,
                notes: form.notes
            })
        })
        if (res.ok) setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="container" style={{ paddingTop: '60px', textAlign: 'center' }}>
                <h2>Booking Confirmed!</h2>
                <p style={{ margin: '15px 0', color: '#64748b' }}>
                    We'll send a confirmation to {form.email}
                </p>
                <Link href="/" className="btn btn-primary">Back to Home</Link>
            </div>
        )
    }

    return (
        <>
            <nav><div className="container"><h1>Book Appointment</h1><Link href="/">← Back</Link></div></nav>
            <div className="container">
                <div className="steps">
                    <div className={'step' + (step >= 1 ? ' active' : '')}><span className="step-num">1</span> Service</div>
                    <div className={'step' + (step >= 2 ? ' active' : '')}><span className="step-num">2</span> Date & Time</div>
                    <div className={'step' + (step >= 3 ? ' active' : '')}><span className="step-num">3</span> Details</div>
                </div>

                {step === 1 && (
                    <div>
                        <div className="grid-3">
                            {services.map(s => (
                                <div key={s.id}
                                    className={'service-card' + (selectedService === s.id ? ' selected' : '')}
                                    onClick={() => setSelectedService(s.id)}>
                                    <h3>{s.name}</h3>
                                    <div className="price">€{s.price}</div>
                                    <div className="duration">{s.duration} min</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <button className="btn btn-primary" disabled={!selectedService} onClick={() => setStep(2)}>
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="card">
                        <div className="form-group">
                            <label>Select Date</label>
                            <input type="date" value={selectedDate}
                                onChange={e => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]} />
                        </div>
                        {selectedDate && (
                            <>
                                <label>Select Time</label>
                                <div className="time-grid">
                                    {timeSlots.map(slot => (
                                        <div key={slot}
                                            className={'time-slot' + (selectedTime === slot ? ' selected' : '')}
                                            onClick={() => setSelectedTime(slot)}>
                                            {slot}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                            <button className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                            <button className="btn btn-primary"
                                disabled={!selectedDate || !selectedTime}
                                onClick={() => setStep(3)}>Continue</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="card">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>Phone (optional)</label>
                            <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Notes (optional)</label>
                            <textarea rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                            <button className="btn btn-primary"
                                disabled={!form.name || !form.email}
                                onClick={handleSubmit}>Confirm Booking</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
