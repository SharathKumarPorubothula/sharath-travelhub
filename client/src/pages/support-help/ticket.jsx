import React from 'react';
import { QRCode } from 'react-qr-code'; 
import { useLocation } from 'react-router-dom';

const Ticket = () => {
    const location = useLocation();
    const bookingData = location.state?.response || null;
    
    if (!bookingData) {
        return <div style={styles.noData}>No booking data available.</div>;
    }
    
    return (
        <div style={styles.ticketContainer}>
            <div style={styles.ticketHeader}>
                <h2 style={styles.title}>E-Ticket</h2>
                <p style={styles.subtitle}>Booking Reference: {bookingData._id}</p>
            </div>

            <div style={styles.detailsSection}>
                <h3 style={styles.sectionTitle}>Passenger Details</h3>
                <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Name:</span> 
                    <span>{bookingData.passengerDetails.name}</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Email:</span> 
                    <span>{bookingData.passengerDetails.email}</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Phone:</span> 
                    <span>{bookingData.passengerDetails.phone}</span>
                </div>
            </div>

            <div style={styles.detailsSection}>
                <h3 style={styles.sectionTitle}>Booking Details</h3>
                <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Seat(s):</span> 
                    <span>{bookingData.seats.join(', ')}</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Total Price:</span> 
                    <span>₹{bookingData.totalPrice}</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Status:</span> 
                    <span style={styles[bookingData.bookingStatus.toLowerCase()]}>
                        {bookingData.bookingStatus}
                    </span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Booked on:</span> 
                    <span>{new Date(bookingData.bookingTime).toLocaleDateString()}</span>
                </div>
            </div>

            <div style={styles.qrContainer}>
                <QRCode 
                    value={`TicketID:${bookingData._id},Seat:${bookingData.seats[0]}`} 
                    size={128} 
                    bgColor="#fff" 
                    fgColor="#2c3e50"
                />
                <p style={styles.qrCaption}>Scan for verification</p>
            </div>

            <div style={styles.footer}>
                <p>Present this ticket at boarding. Contact support for issues.</p>
            </div>
        </div>
    );
};

const styles = {
    ticketContainer: {
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#ffffff',
        color: '#333',
        lineHeight: '1.6'
    },
    noData: {
        textAlign: 'center',
        padding: '2rem',
        fontSize: '1.2rem',
        color: '#e74c3c'
    },
    ticketHeader: {
        textAlign: 'center',
        borderBottom: '2px dashed #e0e0e0',
        paddingBottom: '1rem',
        marginBottom: '1.5rem'
    },
    title: {
        color: '#2c3e50',
        margin: '0',
        fontSize: '2rem',
        fontWeight: '600',
        letterSpacing: '0.5px'
    },
    subtitle: {
        color: '#7f8c8d',
        fontSize: '0.9rem',
        marginTop: '0.5rem'
    },
    detailsSection: {
        marginBottom: '1.5rem',
        padding: '1.25rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)'
    },
    sectionTitle: {
        color: '#3498db',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '0.5rem',
        marginTop: '0',
        marginBottom: '1rem',
        fontSize: '1.2rem',
        fontWeight: '500'
    },
    detailItem: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.75rem',
        padding: '0.25rem 0'
    },
    detailLabel: {
        fontWeight: '600',
        color: '#2c3e50',
        minWidth: '120px'
    },
    qrContainer: {
        textAlign: 'center',
        margin: '1.5rem 0',
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)'
    },
    qrCaption: {
        fontSize: '0.85rem',
        color: '#7f8c8d',
        marginTop: '0.75rem'
    },
    footer: {
        textAlign: 'center',
        fontSize: '0.85rem',
        color: '#95a5a6',
        borderTop: '2px dashed #e0e0e0',
        paddingTop: '1rem',
        marginTop: '1rem'
    },
    // Status styles
    confirmed: {
        color: '#27ae60',
        fontWeight: '600'
    },
    pending: {
        color: '#f39c12',
        fontWeight: '600'
    },
    cancelled: {
        color: '#e74c3c',
        fontWeight: '600'
    }
};

export default Ticket;