


const Cookies = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-6 sm:px-10 lg:px-16 font-['Inter']">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 text-center mb-10">
          Cookies Policy
        </h1>

        <p className="text-orange-500 text-lg mb-8 text-center">
          This Cookies Policy explains how TrackVaults uses cookies and similar technologies to enhance your experience on our platform.
        </p>

        <div className="space-y-12">

          {/* What Are Cookies */}
          <div className="bg-orange-100 p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-black mb-3">1. What Are Cookies?</h2>
            <p className="text-black">
              Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, personalize content, and improve our services.
            </p>
          </div>

          {/* Types of Cookies We Use */}
          <div className="bg-orange-100 p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-black mb-3">2. Types of Cookies We Use</h2>
            <ul className="list-disc list-inside text-black space-y-2">
              <li><strong>Essential Cookies:</strong> Necessary for the core functionality of our platform.</li>
              <li><strong>Performance Cookies:</strong> Help us analyze site usage to improve functionality and performance.</li>
              <li><strong>Functional Cookies:</strong> Store your preferences like theme and language selection.</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver personalized ads and track campaign effectiveness.</li>
            </ul>
          </div>

          {/* Why We Use Cookies */}
          <div className="bg-orange-100 p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-black mb-3">3. Why We Use Cookies</h2>
            <p className="text-black">
              Cookies help us enhance user experience, analyze performance, remember preferences, and provide secure access to your account.
            </p>
          </div>

          {/* Managing Cookies */}
          <div className="bg-orange-100 p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-black mb-3">4. Managing Cookies</h2>
            <p className="text-black">
              You can control or disable cookies in your browser settings. However, disabling essential cookies may impact the usability of the website.
            </p>
          </div>

          {/* Third-Party Cookies */}
          <div className="bg-orange-100 p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-black mb-3">5. Third-Party Cookies</h2>
            <p className="text-black">
              Some cookies may be placed by third-party services we use, such as Google Analytics or social media integrations. These services have their own privacy and cookie policies.
            </p>
          </div>

          {/* Updates to This Policy */}
          <div className="bg-orange-100 p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-black mb-3">6. Updates to This Policy</h2>
            <p className="text-black">
              We may update this policy from time to time. Any significant changes will be communicated to you via our platform or email.
            </p>
          </div>

          {/* Contact Us */}
          <div className="bg-orange-100 p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-black mb-3">7. Contact Us</h2>
            <p className="text-black">
              If you have questions about our cookie practices, feel free to contact us at: <br />
              📧 <a href="mailto:privacy@trackvaults.com" className="text-orange-600 underline">privacy@trackvaults.com</a>
            </p>
          </div>
        </div>

        <div className="text-center mt-12 text-orange-500 text-sm">
          © {new Date().getFullYear()} <b>TrackVaults.com</b>. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Cookies;
