'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Booking {
    id: string; customerName: string; customerEmail: string;
    date: string; time: string; status: string;
    service: { name: string }
}

export default function AdminPage() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [tab, setTab] = useState<'bookings' | 'services'>('bookings')
    const [newService, setNewService] = useState({ name: '', description: '', duration: '60', price: '' })

    useEffect(() => {
        fetch('/api/bookings').then(r => r.json()).then(setBookings)
    }, [])

    const updateStatus = async (id: string, status: string) => {
        await fetch('/api/bookings/' + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        })
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
    }

    const deleteBooking = async (id: string) => {
        if (!confirm('Delete this booking?')) return
        await fetch('/api/bookings/' + id, { method: 'DELETE' })
        setBookings(prev => prev.filter(b => b.id !== id))
    }

    const addService = async (e: React.FormEvent) => {
        e.preventDefault()
        await fetch('/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newService)
        })
        setNewService({ name: '', description: '', duration: '60', price: '' })
        alert('Service added!')
    }

    return (
        <>
            <nav><div className="container"><h1>Admin Panel</h1><Link href="/">← Site</Link></div></nav>
            <div className="container">
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button className={'btn ' + (tab === 'bookings' ? 'btn-primary' : 'btn-outline')}
                        onClick={() => setTab('bookings')}>Bookings</button>
                    <button className={'btn ' + (tab === 'services' ? 'btn-primary' : 'btn-outline')}
                        onClick={() => setTab('services')}>Add Service</button>
                </div>

                {tab === 'bookings' && (
                    <div className="booking-list">
                        {bookings.length === 0 ? (
                            <div className="empty-state">No bookings yet</div>
                        ) : bookings.map(b => (
                            <div key={b.id} className="booking-item">
                                <div className="booking-info">
                                    <h3>{b.customerName} — {b.service.name}</h3>
                                    <p>{new Date(b.date).toLocaleDateString()} at {b.time} | {b.customerEmail}</p>
                                </div>
                                <div className="booking-actions">
                                    <span className={'badge badge-' + b.status}>{b.status}</span>
                                    {b.status === 'pending' && (
                                        <button className="btn btn-success btn-sm" onClick={() => updateStatus(b.id, 'confirmed')}>Confirm</button>
                                    )}
                                    {b.status !== 'cancelled' && (
                                        <button className="btn btn-outline btn-sm" onClick={() => updateStatus(b.id, 'cancelled')}>Cancel</button>
                                    )}
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteBooking(b.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {tab === 'services' && (
                    <form className="card" onSubmit={addService}>
                        <div className="form-group">
                            <label>Service Name</label>
                            <input value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea rows={2} value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} />
                        </div>
                        <div className="grid">
                            <div className="form-group">
                                <label>Duration (min)</label>
                                <input type="number" value={newService.duration} onChange={e => setNewService({...newService, duration: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Price (€)</label>
                                <input type="number" step="0.01" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} required />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Add Service</button>
                    </form>
                )}
            </div>
        </>
    )
}
