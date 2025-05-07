document.addEventListener('DOMContentLoaded', function() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const proceedButton = document.getElementById('proceedButton');
    const qrContainer = document.getElementById('qrContainer');
    const upiApps = document.getElementById('upiApps');
    const upiAppButtons = document.querySelectorAll('.upi-app');
    let selectedMethod = null;
    let selectedUpiApp = null;

    // Add click event to each payment option
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            paymentOptions.forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store selected method
            selectedMethod = this.getAttribute('data-method');
            
            // Reset UPI app selection
            selectedUpiApp = null;
            
            // Show/hide containers based on selection
            qrContainer.classList.remove('visible');
            upiApps.classList.remove('visible');
            
            if (selectedMethod === 'qr') {
                qrContainer.classList.add('visible');
                proceedButton.textContent = 'I have completed the payment';
            } 
            else if (selectedMethod === 'upi') {
                upiApps.classList.add('visible');
                proceedButton.textContent = 'Proceed with Payment';
                proceedButton.classList.remove('visible');
            }
            else if (selectedMethod === 'cod') {
                proceedButton.textContent = 'Book Now';
            }
            else {
                proceedButton.textContent = 'Proceed with Payment';
            }
            
            // Show proceed button if not UPI (UPI shows it after app selection)
            if (selectedMethod !== 'upi') {
                proceedButton.classList.add('visible');
            }
        });
    });

    // UPI app selection handler
    upiAppButtons.forEach(app => {
        app.addEventListener('click', function() {
            // Remove selection from all apps
            document.querySelectorAll('.upi-app-icon').forEach(icon => {
                icon.style.borderColor = 'transparent';
            });
            
            // Highlight selected app
            this.querySelector('.upi-app-icon').style.borderColor = '#4CAF50';
            
            // Store selected app
            selectedUpiApp = this.getAttribute('data-app');
            
            // Show proceed button
            proceedButton.classList.add('visible');
        });
    });

    // Proceed button click handler
    proceedButton.addEventListener('click', function() {
        if (!selectedMethod) return;

        if (selectedMethod === 'qr') {
            // For QR payments
            alert('Thank you for your payment! We will verify it shortly.');
            window.location.href = 'booked_success_page.html';
            return;
        }

        if (selectedMethod === 'cod') {
            // For COD
            alert('Our Technician will collect payment after finishing work.');
            window.location.href = 'booked_success_page.html';
            return;
        }

        if (selectedMethod === 'upi' && selectedUpiApp) {
            // For UPI payments
            const upiId = 'vdurga24864-1@okicici'; // Replace with your UPI ID
            const amount = '120'; // Replace with actual amount
            const name = 'fix-it-fast'; // Replace with your name
            let deepLink = '';

            switch(selectedUpiApp) {
                case 'gpay':
                    deepLink = `tez://upi/pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
                    break;
                case 'phonepe':
                    deepLink = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
                    break;
                case 'paytm':
                    deepLink = `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
                    break;
            }

            // Try to open the app
            const appOpened = window.open(deepLink, '_blank');
            
            // Redirect after 2 seconds whether or not app opened
            setTimeout(() => {
                window.location.href = 'booked_success_page.html';
            }, 2000);
            
            return;
        }

        // For other payment methods
        alert(`Proceeding with ${getMethodName(selectedMethod)} payment...`);
        window.location.href = 'booked_success_page.html';
    });

    // Helper function to get payment method name
    function getMethodName(method) {
        switch(method) {
            case 'cod': return 'Cash on Delivery';
            case 'upi': return 'UPI';
            case 'qr': return 'QR Code';
            case 'netbanking': return 'Net Banking';
            default: return '';
        }
    }
    
    // Helper function to get app store links
    function getAppStoreLink(app) {
        switch(app) {
            case 'gpay': return 'https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user';
            case 'phonepe': return 'https://play.google.com/store/apps/details?id=com.phonepe.app';
            case 'paytm': return 'https://play.google.com/store/apps/details?id=net.one97.paytm';
            default: return '#';
        }
    }
});