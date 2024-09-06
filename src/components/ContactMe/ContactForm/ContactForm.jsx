import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: `${formData.firstname} ${formData.lastname}`,
      email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_nbkuhv6", // From EmailJS account
        "template_13ri593", // From EmailJS template
        templateParams,
        "xJRuvREstKOmPITav" // From EmailJS user account
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message sent successfully!");

          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            message: "",
          });
        },
        (err) => {
          console.log("FAILED...", err);
          alert("Error sending message");
        }
      );
  };

  return (
    <div className="contact-form-content">
      <form onSubmit={handleSubmit}>
        <div className="name-container">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={3}
          onChange={handleChange}
          value={formData.message}
        />
        <button type="submit">SEND</button>
      </form>
    </div>
  );
};

export default ContactForm;
