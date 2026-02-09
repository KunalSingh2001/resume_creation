function Footer() {
    return (
        <footer style={{ textAlign: 'center', padding: '2rem', color: '#718096', fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
        </footer>
    )
}

export default Footer