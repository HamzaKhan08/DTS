import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = {
    product: {
      title: 'Product',
      links: [
        { name: 'Features', path: '/features' },
        { name: 'Documentation', path: '/documentations' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'API', path: '/api' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about-us' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Security', path: '/security' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' }
      ]
    },
    social: {
      title: 'Connect Developer',
      links: [
        { name: 'Instagram', url: 'https://instagram.com/ihamza.khan8', icon: 'fa-instagram' },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/hamzaayazkhan', icon: 'fa-linkedin' },
        { name: 'GitHub', url: 'https://github.com/hamzakhan08', icon: 'fa-github' }
      ]
    }
  };

  return (
    <footer className="bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className='relative group w-fit'>
            <Link to="/" className="flex items-center bg-gradient-to-r from-emerald-900 via-white to-violet-600 bg-clip-text text-transparent text-gradient-animate">
              <span className="text-2xl font-bold">TrackVaults<i className='text-sm'>.com</i></span>
            </Link>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 via-orange-450 to-orange-400 animate-gradient transition-all duration-300 group-hover:w-full"></span>
            </div>
            <p className="mt-4 text-sm text-black max-w-md">
              Streamline your document management with <i className='text-gradient-animate text-sm'>TrackVaults.com</i>. 
              Secure, efficient, and user-friendly document tracking system for modern businesses.
            </p>
            {/* <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Subscribe to our newsletter</h3>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div> */}
          </div>

          {/* Links Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-semibold text-black mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.path ? (
                      <Link
                        to={link.path}
                        className="text-sm text-orange-400 hover:text-orange-500 hover:underline transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-400 hover:text-text-orange-500 transition-colors flex items-center gap-2"
                      >
                        <i className={`fab ${link.icon}`}></i>
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-orange-500">
              © {new Date().getFullYear()} <b className='text-gradient-animate hover:underline'>TrackVaults<i className='text-sm'>.com</i></b> All rights reserved. || Design & Developed by : <b><i className='text-orange-500'>Hamza Ayaz Khan</i></b>
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link to="/cookies" className="text-sm text-orange-500 hover:text-orange-400">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
