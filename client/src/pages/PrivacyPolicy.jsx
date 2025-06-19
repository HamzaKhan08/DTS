


const PrivacyPolicy = () => {
  return (
    <div className="bg-orange-100 min-h-screen py-12 px-6 sm:px-10 lg:px-16 font-['Inter']">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 text-center mb-10">
          Privacy Policy
        </h1>

        <p className="text-black text-lg mb-8 text-center">
          At TrackVaults, we are committed to safeguarding your privacy. This Privacy Policy outlines how we collect, use, and protect your information.
        </p>

        <div className="space-y-12">

          {/* 1. Information We Collect */}
          <div className="bg-white p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-orange-600 mb-3">1. Information We Collect</h2>
            <p className="text-orange-500">
              We collect personal information that you voluntarily provide when creating an account, uploading documents, or contacting support. This includes your name, email address, documents, device information, and usage data.
            </p>
          </div>

          {/* 2. How We Use Your Information */}
          <div className="bg-white p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-orange-600 mb-3">2. How We Use Your Information</h2>
            <p className="text-orange-500">
              Your information is used to provide and improve our services, communicate with you, ensure account security, send relevant updates, and analyze user behavior for product enhancement.
            </p>
          </div>

          {/* 3. Data Security */}
          <div className="bg-white p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-orange-600 mb-3">3. Data Security</h2>
            <p className="text-orange-500">
              We implement robust security measures to protect your data, including encryption, firewall protection, access controls, and regular audits. All data stored is encrypted both at rest and in transit.
            </p>
          </div>

          {/* 4. Sharing of Data */}
          <div className="bg-white p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-orange-600 mb-3">4. Sharing of Data</h2>
            <p className="text-orange-500">
              We do not sell or rent your data. We may share information with trusted third-party providers strictly for service delivery, legal compliance, and analytics, all bound by confidentiality agreements.
            </p>
          </div>

          {/* 5. Your Rights and Choices */}
          <div className="bg-white p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-orange-600 mb-3">5. Your Rights and Choices</h2>
            <p className="text-orange-500">
              You have the right to access, update, or delete your personal data at any time. You may also opt out of marketing communications. For such requests, contact us at <a href="mailto:privacy@trackvaults.com" className="text-orange-600 underline">privacy@trackvaults.com</a>.
            </p>
          </div>

          {/* 6. Cookies and Tracking */}
          <div className="bg-white p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-orange-600 mb-3">6. Cookies and Tracking</h2>
            <p className="text-orange-500">
              We use cookies to personalize user experience and analyze site traffic. You can control cookie settings through your browser. For more details, please see our Cookies Policy.
            </p>
          </div>

          {/* 7. Data Retention */}
          <div className="bg-white p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-orange-600 mb-3">7. Data Retention</h2>
            <p className="text-orange-500">
              We retain your data as long as your account is active or as needed to provide you services. Upon deletion request or inactivity, your data will be securely deleted after a certain retention period.
            </p>
          </div>

          {/* 8. Changes to Privacy Policy */}
          <div className="bg-white p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-orange-600 mb-3">8. Changes to Privacy Policy</h2>
            <p className="text-orange-500">
              We may update this policy from time to time. Changes will be reflected on this page, and if significant, we’ll notify you by email or platform alerts.
            </p>
          </div>

          {/* 9. Children’s Privacy */}
          <div className="bg-white p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-orange-600 mb-3">9. Children’s Privacy</h2>
            <p className="text-orange-500">
              Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us.
            </p>
          </div>

          {/* 10. Contact Us */}
          <div className="bg-white p-6 border-l-4 border-orange-400 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-orange-600 mb-3">10. Contact Us</h2>
            <p className="text-orange-500">
              For any questions, concerns, or complaints regarding this privacy policy or our practices, reach us at: <br />
              📧 <a href="mailto:privacy@trackvaults.com" className="text-orange-600 underline">privacy@trackvaults.com</a> <br />
              📍 TrackVaults, 5th Floor, Tower C, New Delhi, India
            </p>
          </div>
        </div>

        <div className="text-center mt-12 text-black text-sm">
          © {new Date().getFullYear()} <b>TrackVaults.com</b>. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
