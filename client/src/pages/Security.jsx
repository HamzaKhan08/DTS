

const Security = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-orange-500 mb-10">Our Security Features</h2>
        <p className="text-lg text-black text-center mb-10">
          We take your data security seriously. TrackVaults offers top-notch security features to protect your documents and sensitive information.
        </p>

        {/* Security Features */}
        <div className="space-y-12">
          {/* Section 1: Data Encryption */}
          <div className="bg-orange-100 shadow-md rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-black mb-4">End-to-End Encryption</h3>
            <p className="text-black">
              We ensure that your documents and personal data are fully encrypted at all stages — from upload to storage. Our advanced encryption algorithms ensure that your information is kept private and secure from unauthorized access.
            </p>
          </div>

          {/* Section 2: Secure Authentication */}
          <div className="bg-orange-100 shadow-md rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-black mb-4">Secure Authentication</h3>
            <p className="text-black">
              We use industry-standard authentication protocols to secure your account. Multi-factor authentication (MFA) is available for an added layer of protection. This ensures that only authorized users can access their accounts.
            </p>
          </div>

          {/* Section 3: Privacy Policy & Compliance */}
          <div className="bg-orange-100 shadow-md rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-black mb-4">Data Privacy and Compliance</h3>
            <p className="text-black">
              At TrackVaults, your privacy is our top priority. We comply with global data protection regulations like GDPR, ensuring that your personal information is handled with the utmost care. Your data is never shared without your explicit consent.
            </p>
          </div>

          {/* Section 4: Continuous Monitoring */}
          <div className="bg-orange-100 shadow-md rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-black mb-4">Continuous Monitoring and Threat Detection</h3>
            <p className="text-black">
              We continuously monitor our system for any unusual activity or security breaches. Our automated threat detection mechanisms ensure that your data remains safe from malicious attacks, including ransomware, phishing, and unauthorized access.
            </p>
          </div>

          {/* Section 5: Regular Security Audits */}
          <div className="bg-orange-100 shadow-md rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-black mb-4">Regular Security Audits</h3>
            <p className="text-black">
              Our system undergoes regular security audits by third-party experts. These audits help identify vulnerabilities and ensure that TrackVaults is up to date with the latest security standards. We are committed to maintaining the highest level of security at all times.
            </p>
          </div>

          {/* Section 6: Backup & Disaster Recovery */}
          <div className="bg-orange-100 shadow-md rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-black mb-4">Backup and Disaster Recovery</h3>
            <p className="text-black">
              We back up all your data on secure servers, ensuring that you never lose access to your important documents. Our disaster recovery plans are designed to restore service quickly and safely in case of an unexpected event.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-black text-center py-6 mt-12">
          <h3 className="text-2xl font-semibold mb-4">Your Security is Our Priority</h3>
          <p className="mb-6">
            With TrackVaults.com, your documents and data are protected by the best security technologies available. You can trust us to keep your information safe and secure at all times.
          </p>
          <a href="/contact" className="bg-orange-400 text-white font-semibold py-3 px-8 rounded-lg hover:bg-orange-500">
            Contact Us for More Information
          </a>
        </div>
      </div>
    </div>
  );
};

export default Security;
