const docsSections = [
  {
    title: 'Getting Started',
    content: 'Learn how to set up and start using TrackVaults in minutes. From creating your account to uploading your first document, this section has it all.',
  },
  {
    title: 'Document Tracking',
    content: 'Understand how real-time document tracking works, how status changes are recorded, and how you can monitor transitions and history.',
  },
  {
    title: 'User Roles & Permissions',
    content: 'Know how to manage team access, set custom permissions, and assign roles for streamlined collaboration.',
  },
  {
    title: 'Live Updates with WebSockets',
    content: 'Dive into how we use WebSocket technology to send instant updates to users whenever document events occur.',
  },
  {
    title: 'Security & Compliance',
    content: 'We take data security seriously. Learn about our encryption, access control mechanisms, and compliance policies.',
  },
];

const Documentation = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-orange-600 mb-12 text-center">
        TrackVaults Documentation
      </h2>
      <div className="space-y-10">
        {docsSections.map((section, index) => (
          <div
            key={index}
            className="bg-orange-50 border border-orange-200 rounded-2xl p-6 shadow hover:shadow-md transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">
              {section.title}
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documentation;
