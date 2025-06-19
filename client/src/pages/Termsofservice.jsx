

const TermsOfService = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-orange-600 mb-10">Terms of Service</h2>
        
        {/* Introductory Paragraph */}
        <p className="text-lg text-orange-500 text-center mb-10">
          Welcome to TrackVaults! By using our services, you agree to the following terms and conditions. Please read them carefully.
        </p>

        {/* Terms Sections */}
        <div className="space-y-12">
          
          {/* Section 1: Acceptance of Terms */}
          <div className="bg-white shadow-md rounded-lg p-8 border-l-4 border-orange-400">
            <h3 className="text-2xl font-semibold text-orange-600 mb-4">1. Acceptance of Terms</h3>
            <p className="text-orange-500">
              By accessing and using TrackVaults.com website and services, you agree to be bound by these Terms of Service and any other policies or guidelines posted on the site. If you do not agree with these terms, please refrain from using our services.
            </p>
          </div>

          {/* Section 2: User Responsibilities */}
          <div className="bg-white shadow-md rounded-lg p-8 border-l-4 border-orange-400">
            <h3 className="text-2xl font-semibold text-orange-600 mb-4">2. User Responsibilities</h3>
            <p className="text-orange-500">
              You are responsible for all activities that occur under your account. You agree to maintain the confidentiality of your login information and to notify us immediately if your account has been compromised. You also agree not to use the services for illegal purposes or to infringe upon the rights of others.
            </p>
          </div>

          {/* Section 3: Account Security */}
          <div className="bg-white shadow-md rounded-lg p-8 border-l-4 border-orange-400">
            <h3 className="text-2xl font-semibold text-orange-600 mb-4">3. Account Security</h3>
            <p className="text-orange-500">
              TrackVaults takes security seriously and employs robust measures to safeguard user data. However, you are responsible for maintaining the security of your account and agreeing not to share your password with anyone. We recommend enabling multi-factor authentication for added protection.
            </p>
          </div>

          {/* Section 4: Intellectual Property */}
          <div className="bg-white shadow-md rounded-lg p-8 border-l-4 border-orange-400">
            <h3 className="text-2xl font-semibold text-orange-600 mb-4">4. Intellectual Property</h3>
            <p className="text-orange-500">
              All content, including text, images, logos, and other materials provided on TrackVaults, are the property of TrackVaults or its licensors. You may not use, copy, or distribute any of the content without express permission from the rightful owner.
            </p>
          </div>

          {/* Section 5: Limitation of Liability */}
          <div className="bg-white shadow-md rounded-lg p-8 border-l-4 border-orange-400">
            <h3 className="text-2xl font-semibold text-orange-600 mb-4">5. Limitation of Liability</h3>
            <p className="text-orange-500">
              In no event shall TrackVaults be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use the services, even if we have been advised of the possibility of such damages. Our liability will be limited to the maximum extent permitted by law.
            </p>
          </div>

          {/* Section 6: Termination of Account */}
          <div className="bg-white shadow-md rounded-lg p-8 border-l-4 border-orange-400">
            <h3 className="text-2xl font-semibold text-orange-600 mb-4">6. Termination of Account</h3>
            <p className="text-orange-500">
              We reserve the right to suspend or terminate your account if we believe you have violated these Terms of Service. Upon termination, your access to the services will be immediately revoked, and we may remove or delete your content.
            </p>
          </div>

          {/* Section 7: Data Privacy */}
          <div className="bg-white shadow-md rounded-lg p-8 border-l-4 border-orange-400">
            <h3 className="text-2xl font-semibold text-orange-600 mb-4">7. Data Privacy</h3>
            <p className="text-orange-500">
              Your privacy is important to us. We collect, store, and use your personal information in accordance with our Privacy Policy. By using our services, you consent to the collection and use of your data as outlined in our Privacy Policy.
            </p>
          </div>

          {/* Section 8: Modifications to the Terms */}
          <div className="bg-white shadow-md rounded-lg p-8 border-l-4 border-orange-400">
            <h3 className="text-2xl font-semibold text-orange-600 mb-4">8. Modifications to the Terms</h3>
            <p className="text-orange-500">
              TrackVaults reserves the right to modify or update these Terms of Service at any time. Any changes will be posted on this page, and your continued use of the services after the changes are posted signifies your acceptance of the updated terms.
            </p>
          </div>

          {/* Section 9: Governing Law */}
          <div className="bg-white shadow-md rounded-lg p-8 border-l-4 border-orange-400">
            <h3 className="text-2xl font-semibold text-orange-600 mb-4">9. Governing Law</h3>
            <p className="text-orange-500">
              These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which TrackVaults operates. Any disputes shall be resolved through arbitration or in the courts of the applicable jurisdiction.
            </p>
          </div>

          {/* Section 10: Contact Information */}
          <div className="bg-white shadow-md rounded-lg p-8 border-l-4 border-orange-400">
            <h3 className="text-2xl font-semibold text-orange-600 mb-4">10. Contact Information</h3>
            <p className="text-orange-500">
              If you have any questions regarding these Terms of Service, please contact us at <a href="mailto:support@trackvaults.com" className="text-orange-600 hover:text-orange-800">support@trackvaults.com</a>.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-orange-100 text-black text-center py-6 mt-12 rounded-lg">
          <h3 className="text-3xl font-semibold mb-4">Thank you for using TrackVaults</h3>
          <p className="mb-6">
            We are committed to providing a secure, reliable, and user-friendly service. Please review our Terms of Service regularly to stay informed of any updates.
          </p>
          <a href="/contact" className="bg-orange-400 text-white font-semibold py-3 px-8 rounded-lg hover:bg-orange-500">
            Contact Us for More Information
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
