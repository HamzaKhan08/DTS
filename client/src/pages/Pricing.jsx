const Pricing = () => {
  const plans = [
    {
      title: 'Starter',
      price: 'Free',
      description: 'For individuals and small teams just getting started.',
      features: [
        'Up to 5 documents/month',
        'Basic tracking and history',
        'Email support',
      ],
    },
    {
      title: 'Pro',
      price: '$19/mo',
      description: 'For growing teams and regular document workflow.',
      features: [
        'Unlimited documents',
        'Real-time tracking & updates',
        'Advanced search & analytics',
        'Priority email support',
      ],
    },
    {
      title: 'Enterprise',
      price: 'Contact Us',
      description: 'For large organizations needing custom solutions.',
      features: [
        'Custom integrations',
        'Dedicated account manager',
        'On-premise deployment',
        '24/7 support',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-8 md:px-20">
      <h2 className="text-4xl font-bold text-orange-600 mb-6 text-center">
        Simple Pricing for Every Need
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
        Choose the plan that suits your team. No hidden fees, cancel anytime.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border border-orange-200 bg-orange-50 p-8 rounded-2xl shadow hover:shadow-md transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-orange-600 mb-2">{plan.title}</h3>
            <p className="text-3xl font-bold text-black mb-4">{plan.price}</p>
            <p className="text-gray-700 mb-6">{plan.description}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="text-orange-500">✓</span> {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
              {plan.title === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
