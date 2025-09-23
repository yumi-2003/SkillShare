import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-white py-14 px-6 sm:px-16 lg:px-20 mt-5">
      <div className="max-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-500 mb-4">
          Have questions or feedback? Send us a message and we’ll get back to
          you.
        </p>
        <form className="bg-white shadow-emerald-900 rounded-lg p-6 sm:p-8 space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            className="w-full p-3 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Your Email"
          />
          <textarea
            rows={2}
            placeholder="Your Message"
            className="w-full p-3 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
