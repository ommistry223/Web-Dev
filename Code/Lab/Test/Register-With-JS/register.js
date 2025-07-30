document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input');
    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-container';
    resultContainer.style.marginTop = '20px';
    resultContainer.style.padding = '20px';
    resultContainer.style.borderRadius = '10px';
    resultContainer.style.backgroundColor = '#f8f9fa';
    resultContainer.style.display = 'none';
    form.parentNode.insertBefore(resultContainer, form.nextSibling);

    // Regular expressions
    const nameRegex = /^[a-zA-Z\s]{2,}$/; // At least 2 characters
    const studentIdRegex = /^[a-zA-Z0-9]{6,}$/; // At least 6 alphanumeric chars
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9]{5,15}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    // Add error message elements and setup validation
    inputs.forEach(input => {
        const errorMsg = document.createElement('span');
        errorMsg.className = 'error-message';
        errorMsg.style.color = '#dc3545';
        errorMsg.style.fontSize = '0.8rem';
        errorMsg.style.marginTop = '4px';
        errorMsg.style.display = 'block';
        errorMsg.style.minHeight = '16px';
        input.parentNode.appendChild(errorMsg);

        // Validate on blur
        input.addEventListener('blur', function() {
            validateField(this);
        });

        // Real-time validation for specific fields
        if (input.id === 'confirm' || input.id === 'password') {
            input.addEventListener('input', function() {
                if (this.value.length > 0) {
                    validateField(this);
                }
            });
        }
    });

    // Form submit handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            displayResults();
            // Don't reset form to allow users to see their submission
        }
    });

    function validateField(input) {
        const value = input.value.trim();
        const errorMsg = input.parentNode.querySelector('.error-message');
        let isValid = true;

        // Clear previous errors
        clearError(input);

        // Required field validation
        if (input.required && !value) {
            showError(input, errorMsg, 'This field is required');
            return false;
        }

        // Field-specific validation
        switch(input.id) {
            case 'Full-Name':
                if (!nameRegex.test(value)) {
                    showError(input, errorMsg, 'Only letters and spaces (min 2 characters)');
                    isValid = false;
                }
                break;
            case 'Student-ID':
                if (!studentIdRegex.test(value)) {
                    showError(input, errorMsg, 'Only alphanumeric characters (min 6 characters)');
                    isValid = false;
                }
                break;
            case 'email':
                if (!emailRegex.test(value)) {
                    showError(input, errorMsg, 'Please enter a valid email address');
                    isValid = false;
                }
                break;
            case 'Username':
                if (!usernameRegex.test(value)) {
                    showError(input, errorMsg, '5-15 alphanumeric characters only');
                    isValid = false;
                }
                break;
            case 'password':
                if (!passwordRegex.test(value)) {
                    showError(input, errorMsg, '8+ chars with 1 letter, 1 digit, and 1 special character (@$!%*?&)');
                    isValid = false;
                }
                break;
            case 'confirm':
                const password = document.getElementById('password').value;
                if (value !== password) {
                    showError(input, errorMsg, 'Passwords do not match');
                    isValid = false;
                }
                break;
            case 'Phone-No':
                if (!phoneRegex.test(value)) {
                    showError(input, errorMsg, 'Must be exactly 10 digits');
                    isValid = false;
                }
                break;
        }

        return isValid;
    }

    function showError(input, errorMsg, message) {
        errorMsg.textContent = message;
        input.style.border = '2px solid #dc3545';
        input.style.backgroundColor = '#fff5f5';
        input.style.boxShadow = '0 0 0 2px rgba(220, 53, 69, 0.2)';
    }

    function clearError(input) {
        const errorMsg = input.parentNode.querySelector('.error-message');
        errorMsg.textContent = '';
        input.style.border = 'none';
        input.style.backgroundColor = '#e0e7ff';
        input.style.boxShadow = '0 2px 10px rgba(76, 161, 175, 0.10)';
    }

    function displayResults() {
        const formData = {};
        inputs.forEach(input => {
            formData[input.id] = input.value.trim();
        });

        resultContainer.innerHTML = `
            <h2 style="color: #203a43; margin-bottom: 15px; text-align: center;">Registration Successful!</h2>
            <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <p><strong>Full Name:</strong> ${formData['Full-Name']}</p>
                <p><strong>Student ID:</strong> ${formData['Student-ID']}</p>
                <p><strong>Email:</strong> ${formData['email']}</p>
                <p><strong>Username:</strong> ${formData['Username']}</p>
                <p><strong>Phone Number:</strong> ${formData['Phone-No']}</p>
            </div>
            <button id="closeResults" style="margin-top: 15px; width: 100%; padding: 10px; background: #4ca1af; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Close
            </button>
        `;

        resultContainer.style.display = 'block';

        // Scroll to results
        resultContainer.scrollIntoView({ behavior: 'smooth' });

        // Close button functionality
        document.getElementById('closeResults').addEventListener('click', function() {
            resultContainer.style.display = 'none';
            form.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
