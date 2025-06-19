import { useState } from 'react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Tech', 'AI/ML', 'Startup', 'Career', 'Design'];

  const blogs = [
    {
      title: 'Why MERN Stack is the Future',
      category: 'Tech',
      excerpt: 'Explore how MongoDB, Express, React, and Node.js are reshaping full-stack development...',
      author: 'John Doe',
      date: 'April 12, 2025',
    },
    {
      title: 'Building Scalable AI Systems',
      category: 'AI/ML',
      excerpt: 'From choosing the right models to deploying in production, scalability is key in modern AI...',
      author: 'Aisha Khan',
      date: 'April 3, 2025',
    },
    {
      title: 'UX Trends to Watch in 2025',
      category: 'Design',
      excerpt: 'Learn the top design principles and trends that will dominate user experience in the coming year...',
      author: 'Emily Park',
      date: 'March 22, 2025',
    },
    {
      title: 'How to Kickstart Your Career in Tech',
      category: 'Career',
      excerpt: 'Breaking into tech can be tough. Here’s a roadmap for freshers to land their first developer job...',
      author: 'Ravi Patel',
      date: 'March 10, 2025',
    },
    {
      title: 'Startup Life: Lessons from Year One',
      category: 'Startup',
      excerpt: 'We launched with big dreams and faced real-world challenges. Here’s what we learned...',
      author: 'Sana Malik',
      date: 'February 27, 2025',
    },
  ];

  const filteredBlogs = blogs.filter(
    (blog) =>
      (selectedCategory === 'All' || blog.category === selectedCategory) &&
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white px-4 py-12 sm:px-8 md:px-20">
      <h2 className="text-4xl font-bold text-orange-600 text-center mb-4">Our Blog</h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Stay updated with the latest articles, stories, and tech trends from the TrackVaults team.
      </p>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-start md:justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 text-sm rounded-full transition ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-orange-600 hover:text-white'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition duration-300">
              <h3 className="text-2xl font-semibold text-orange-600 mb-2">{blog.title}</h3>
              <p className="text-gray-700 text-sm mb-4">{blog.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>By {blog.author}</span>
                <span>{blog.date}</span>
              </div>
              <div className="mt-4">
                <button className="text-orange-600 hover:underline font-medium">Read More</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg col-span-3 text-center">
            No blogs found for this search or category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Blog;
