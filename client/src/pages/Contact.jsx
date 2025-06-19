
const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-orange-500 mb-10">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Details */}
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-orange-500">Get in Touch</h3>
            <p className="text-gray-600">
              We did love to hear from you! Whether you have a question about features, pricing, need a demo, or anything else — our team is ready to answer all your questions.
            </p>
            <div>
              <p className="text-black"><strong className="text-orange-500">Email:</strong> support@trackvaults.com</p>
              <p className="text-black"><strong className="text-orange-500">Phone:</strong> +91 1234567890</p>
              <p className="text-black"><strong className="text-orange-500">Address:</strong> TrackVaults HQ, 5th Floor, Tower C, New Delhi, India</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-orange-500 mt-4">Business Hours:</h4>
              <p className="text-black">Monday - Friday: 9 AM – 6 PM IST</p>
              <p className="text-black">Saturday - Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-orange-500 mb-4">Send a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black">Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Message</label>
                <textarea
                  required
                  rows="5"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 px-6 rounded shadow"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
