import { useState } from "react";

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobCategories = [
    "All",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "Data Scientist",
    "Project Manager",
    "AI/ML Engineer",
    "Full Stack Developer",
  ];

  const jobListings = [
    {
      title: "Frontend Developer",
      category: "Frontend Developer",
      location: "Remote",
      description: "Develop amazing user interfaces.",
      payScale: "50k - 70k USD/year",
      roleType: "Full-time",
      jobDetails:
        "Work with cutting-edge technologies to create scalable and responsive web applications.",
      workingDays: "Monday - Friday",
    },
    {
      title: "Backend Developer",
      category: "Backend Developer",
      location: "On-site",
      description: "Build scalable backend systems.",
      payScale: "60k - 90k USD/year",
      roleType: "Full-time",
      jobDetails:
        "Develop robust and secure backend systems with focus on performance and scalability.",
      workingDays: "Monday - Friday",
    },
    {
      title: "UI/UX Designer",
      category: "UI/UX Designer",
      location: "Remote",
      description: "Design user-friendly interfaces.",
      payScale: "45k - 65k USD/year",
      roleType: "Contract",
      jobDetails:
        "Create intuitive and aesthetically pleasing user interfaces for web and mobile applications.",
      workingDays: "Monday - Friday",
    },
    // Add more job listings as necessary
  ];

  const filteredJobs = jobListings.filter(
    (job) =>
      (selectedCategory === "All" || job.category === selectedCategory) &&
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApplyNowClick = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-8 md:px-20">
      <h2 className="text-4xl font-bold text-orange-600 mb-6 text-center">
        Careers
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
        Join our dynamic and innovative team. We’re always looking for talented
        individuals who are passionate about technology and innovation.
      </p>

      {/* Job Category Section */}
      <section className="mb-8">
        <div className="flex flex-wrap justify-center space-x-6">
          {jobCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`text-lg font-semibold px-6 py-2 mb-4 rounded-full transition duration-300 ${
                selectedCategory === category
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-orange-600 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Search and Job Listings */}
      <section className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-3xl font-semibold text-orange-600 mb-4">
              Job Opportunities
            </h3>
            <p className="text-gray-700">Find your dream job at TrackVaults</p>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search job..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </section>

      <section className="mb-16">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 mb-6 rounded-lg shadow-md"
            >
              <h4 className="text-2xl font-semibold text-orange-600">
                {job.title}
              </h4>
              <p className="text-gray-600 text-lg mb-2">{job.description}</p>
              <p className="text-gray-500">{job.location}</p>
              <div className="mt-4">
                <button
                  className="bg-orange-600 text-white py-2 px-6 rounded-md hover:bg-orange-700 transition duration-300"
                  onClick={() => handleApplyNowClick(job)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">
            No job listings found matching your search criteria.
          </p>
        )}
      </section>

      {/* Job Details Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
            <h3 className="text-3xl font-semibold text-orange-600 mb-4">
              {selectedJob.title}
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              {selectedJob.jobDetails}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Pay Scale:</strong> {selectedJob.payScale}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Role Type:</strong> {selectedJob.roleType}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Working Days:</strong> {selectedJob.workingDays}
            </p>

            <h4 className="text-xl font-semibold text-orange-600 mb-4">
              Apply Now
            </h4>
            <form>
              <div className="mb-4">
                <label className="block text-lg text-gray-700 mb-2">Name</label>
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Middle Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-lg text-gray-700 mb-1">
                  Contact Number
                </label>
                <div className="flex space-x-2">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
                    required
                  >
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+49">🇩🇪 +49</option>
                    {/* Add more country codes as needed */}
                  </select>
                  <input
                    type="tel"
                    placeholder="Enter your number"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-lg text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg text-gray-700">
                  Resume (Link or File)
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4 flex gap-4">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 text-orange-500 hover:text-white hover:bg-red-600 border border-orange-500 px-4 py-2 rounded-md"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-300"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
