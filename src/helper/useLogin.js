import { useState } from 'react';

export const useLogin = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackType, setFeedbackType] = useState(''); // Voeg feedbackType toe

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setFeedbackMessage(''); // Reset feedback wanneer input verandert
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/authenticate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const { jwt } = await response.json();
                localStorage.setItem('jwtToken', jwt);
                setFeedbackMessage('Login succesvol!');
                setFeedbackType('success');
                window.location.href = '/profile';
            } else {
                const errorData = await response.json();
                setFeedbackMessage(`Login mislukt: ${errorData.message}`);
                setFeedbackType('error-wrong'); // Zet het feedbackType naar error
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setFeedbackMessage('Login mislukt. Probeer het opnieuw.');
            setFeedbackType('error-wrong'); // Zet het feedbackType naar error
        }
    };

    return { formData, handleInputChange, handleSubmit, feedbackMessage, feedbackType }; // Voeg feedbackMessage en feedbackType toe aan de return
};