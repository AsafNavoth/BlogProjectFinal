import React from 'react';
import {useForm} from 'react-hook-form';

export function ContactPage() {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const handleContactFormSubmit = (data) => {
        // TODO(Asaf): Remove log when implemented
        console.log(data);
        reset();
    };

    return (
        <div className="contactFormWrapper">
            <form className="addContactForm" onSubmit={handleSubmit(handleContactFormSubmit)}>
                <label htmlFor="contactName">Enter Your Name</label>
                <input
                    {...register("contactName", {required: "This is a required field."})}
                    type="text"
                    name="contactName"
                    placeholder="Your Name"
                />
                {errors.contactName && <p>{errors.contactName.message}</p>}
                <label htmlFor="contactEmail">Enter Your Email</label>
                <input
                    {...register("contactEmail", {required: "This is a required field."})}
                    type="text"
                    name="contactEmail"
                    placeholder="Your Email"
                />
                {errors.contactEmail && <p>{errors.contactEmail.message}</p>}

                <label htmlFor="contactMessage">Enter Your Message</label>
                <textarea
                    {...register("contactMessage", {required: "This is a required field."})}
                    name="contactMessage"
                    placeholder="Your Message"
                />
                {errors.contactMessage && <p>{errors.contactMessage.message}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}