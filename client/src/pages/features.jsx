
const features = [
  {
    title: 'Real-Time Document Tracking',
    description: 'Track document flow in real-time within your organization. Get live status updates, transitions, and detailed logs of document activities.',
    icon: '📡',
  },
  {
    title: 'Secure Upload & Storage',
    description: 'All uploaded documents are encrypted and securely stored. Access control ensures only authorized users can view or modify files.',
    icon: '🔐',
  },
  {
    title: 'Advanced Document Overview',
    description: 'Get comprehensive insights with metadata, version history, and smart search. Visual analytics help you stay on top of your document ecosystem.',
    icon: '📊',
  },
  {
    title: 'Multi-User Collaboration',
    description: 'Allow teams to work together on documents. Assign roles, set permissions, and comment in real time with full audit trails.',
    icon: '🤝',
  },
  {
    title: 'WebSocket-Powered Live Updates',
    description: 'Leverage WebSockets to get instant updates when a document changes status or is accessed by someone in the system.',
    icon: '⚡',
  },
  {
    title: 'User-Friendly Interface',
    description: 'Minimalist, intuitive, and responsive design that works beautifully across all devices with zero learning curve.',
    icon: '🖥️',
  },
];

const Features = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-orange-600 mb-12 text-center">
        Key Features of TrackVaults
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-orange-50 border border-orange-200 rounded-2xl p-6 shadow hover:shadow-md transition duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold text-orange-600 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
