const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-8 md:px-20">
      <h2 className="text-4xl font-bold text-orange-600 mb-6 text-center">
        About Us
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
        We are a passionate team dedicated to building innovative solutions that help businesses manage and track their important documents seamlessly and securely.
      </p>

      <section className="mb-16">
        <h3 className="text-3xl font-semibold text-orange-600 mb-4 text-center">Our Mission</h3>
        <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
          At TrackVaults, our mission is to simplify the process of document management by providing cutting-edge technology that streamlines tracking, sharing, and secure storage. We strive to empower businesses and individuals to have full control over their document workflow with ease.
        </p>
      </section>

      <section className="mb-16">
        <h3 className="text-3xl font-semibold text-orange-600 mb-4 text-center">Our Vision</h3>
        <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
          Our vision is to create a world where document management is seamless, efficient, and secure. We aim to set a new standard for how organizations manage and track their documents, making the process simple and accessible for everyone.
        </p>
      </section>

      <section className="mb-16">
        <h3 className="text-3xl font-semibold text-orange-600 mb-4 text-center">Our Values</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h4 className="text-2xl font-semibold text-orange-500 mb-4">Innovation</h4>
            <p className="text-gray-700">
              We believe in continuously innovating and improving to stay ahead of the curve, offering the best possible solutions to our customers.
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-2xl font-semibold text-orange-500 mb-4">Integrity</h4>
            <p className="text-gray-700">
              We operate with the utmost integrity, ensuring that our products and services are built with trust and transparency.
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-2xl font-semibold text-orange-500 mb-4">Customer Focus</h4>
            <p className="text-gray-700">
              We are committed to putting our customers first, listening to their needs, and delivering exceptional solutions that make a difference.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-3xl font-semibold text-orange-600 mb-4 text-center">Our Team</h3>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member 1"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold text-orange-500">Hamza Ayaz Khan</h4>
            <p className="text-gray-700">CEO & Founder</p>
          </div>

          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member 2"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold text-orange-500">Mohammad Adnan Zakee</h4>
            <p className="text-gray-700">Co-Founder</p>
          </div>

          {/* <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member 3"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold text-orange-500">Robert Brown</h4>
            <p className="text-gray-700">Lead Developer</p>
          </div> */}
        </div>
      </section>

      <section>
        <h3 className="text-3xl font-semibold text-orange-600 mb-4 text-center">Join Our Team</h3>
        <p className="text-center text-gray-700 mb-6 max-w-2xl mx-auto">
          We’re always looking for talented and passionate individuals to join our team. If you’re interested in working with us, check out our{" "}
          <a href="/careers" className="text-orange-500 hover:text-orange-600">Careers</a> page to learn more.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
