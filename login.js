
// Basic Login Form Script - Self Contained
class BasicLoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.successMessage = document.getElementById('successMessage');
        
        this.init();
    }
    
    init() {
        // Setup floating labels
        this.setupFloatingLabels();
        
        // Setup password toggle
        this.setupPasswordToggle();
        
        // Add event listeners
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.emailInput.addEventListener('input', () => this.validateField('email'));
        this.passwordInput.addEventListener('input', () => this.validateField('password'));
        
        // Add entrance animation
        this.addEntranceAnimation();
    }
    
    setupFloatingLabels() {
        const inputs = this.form.querySelectorAll('input[type="email"], input[type="password"]');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    setupPasswordToggle() {
        this.passwordToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const type = this.passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            this.passwordInput.setAttribute('type', type);
            this.passwordToggle.classList.toggle('visible');
        });
    }
    
    addEntranceAnimation() {
        const card = this.form.closest('.login-card');
        if (card) {
            card.style.animation = 'slideIn 0.5s ease-out';
        }
    }
    
    validateField(fieldName) {
        const input = document.getElementById(fieldName);
        const value = input.value.trim();
        const errorElement = document.getElementById(fieldName + 'Error');
        let isValid = false;
        let message = '';
        
        if (fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            message = 'Please enter a valid email address';
        } else if (fieldName === 'password') {
            isValid = value.length >= 6;
            message = 'Password must be at least 6 characters';
        }
        
        if (!isValid && value !== '') {
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
            input.style.borderColor = '#ef4444';
            return false;
        } else {
            if (errorElement) {
                errorElement.style.display = 'none';
            }
            input.style.borderColor = isValid ? '#10b981' : '#cbd5e1';
            return isValid || value === '';
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value.trim();
        
        // Validate all fields
        const emailValid = this.validateField('email');
        const passwordValid = this.validateField('password');
        
        if (!emailValid || !passwordValid) {
            alert('Please fix the errors below');
            return;
        }
        
        // Show loading state
        const submitBtn = this.form.querySelector('.login-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.classList.add('loading');
        submitBtn.querySelector('.btn-text').textContent = 'Signing in...';
        
        try {
            // Simulate login process (1 second delay)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success state
            this.showSuccess();
            
        } catch (error) {
            alert('Login failed: ' + error.message);
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.querySelector('.btn-text').textContent = originalText;
        }
    }
    
    showSuccess() {
        // Hide the form
        this.form.style.display = 'none';
        
        // Show success message
        if (this.successMessage) {
            this.successMessage.classList.add('show');
        }
        
        // Simulate redirect after 2 seconds
        setTimeout(() => {
            alert('Redirecting to dashboard...');
        }, 2000);
    }
}

// Add keyframe animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BasicLoginForm();
});