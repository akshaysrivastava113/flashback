import React, { useState } from 'react';

interface UserInputs {
    username: string;
    email: string
}

interface FormInputErrors {
    username: string;
    email: string
}

const Test = () => {
  // State to manage form inputs and errors
  const [formData, setFormData] = useState<UserInputs>({
    username: '',
    email: ''
  });

  const [errors, setErrors] = useState<FormInputErrors>({
    username: '',
    email: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Clear the specific field error when user starts typing
    if (isSubmitted) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors: FormInputErrors = {
        username: '',
        email: ''
    };

    // Check if username is empty
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Check if email is empty and valid
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Set errors or clear them
    setErrors(newErrors);

    // Return true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark form as submitted to show errors
    setIsSubmitted(true);

    // Validate the form
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', formData);
      // You can add your form submission logic here
    } else {
      // Form has errors
      console.log('Form has errors');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Test;