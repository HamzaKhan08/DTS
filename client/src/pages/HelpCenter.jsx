import { useState } from 'react';

const HelpCenter = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-orange-500 mb-10">Help Center</h2>
        <p className="text-lg text-black text-center mb-10">
          Need assistance? We’re here to help! Find answers to your questions below.
        </p>

        <div className="space-y-6">
          {/* FAQ Section */}
          <div className="bg-orange-100 shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-black mb-4">Frequently Asked Questions</h3>

            <div className="space-y-4">
              <div>
                <button
                  onClick={() => toggleDropdown(1)}
                  className="w-full text-left font-semibold text-orange-500 py-3 px-4 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  What is TrackVaults?
                </button>
                {activeDropdown === 1 && (
                  <div className="mt-2 text-black">
                    TrackVaults is an all-in-one document management and tracking system, designed to help users
                    securely manage and monitor their documents, folders, and reports in real time.
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleDropdown(2)}
                  className="w-full text-left font-semibold text-orange-500 py-3 px-4 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  How do I upload a document?
                </button>
                {activeDropdown === 2 && (
                  <div className="mt-2 text-black">
                    To upload a document, simply go to the Documents section, click the Upload button, and select
                    the document from your device. The document will be uploaded and tracked automatically.
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleDropdown(3)}
                  className="w-full text-left font-semibold text-orange-500 py-3 px-4 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  How can I track my documents?
                </button>
                {activeDropdown === 3 && (
                  <div className="mt-2 text-black">
                    Tracking your documents is simple. Go to the Tracking section, where you can view all your
                    uploaded documents along with their real-time tracking status.
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleDropdown(4)}
                  className="w-full text-left font-semibold text-orange-500 py-3 px-4 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  How do I set up my profile?
                </button>
                {activeDropdown === 4 && (
                  <div className="mt-2 text-black">
                    You can set up your profile by going to the Settings section. Here, you can add personal details,
                    update your contact information, and set preferences for document notifications.
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleDropdown(5)}
                  className="w-full text-left font-semibold text-orange-500 py-3 px-4 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Is my data secure on TrackVaults?
                </button>
                {activeDropdown === 5 && (
                  <div className="mt-2 text-black">
                    Yes, we take data security seriously. All your documents are encrypted and stored securely.
                    Additionally, we comply with the highest standards of data privacy regulations.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-orange-100 shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-black mb-4">Need More Help?</h3>
            <p className="text-orange-500 mb-4">
              If you didn’t find the answer you were looking for, feel free to contact our support team.
            </p>
            <button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 px-6 rounded">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
