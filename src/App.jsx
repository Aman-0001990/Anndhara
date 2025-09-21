import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import feather from "feather-icons";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
    feather.replace();
  }, []);

  useEffect(() => {
    feather.replace();
  }, [mobileOpen]);

  const toggleMobile = () => setMobileOpen((o) => !o);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!name || !email || !message) {
      alert("Please fill out all fields before sending.");
      return;
    }
    try {
      setSending(true);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to send');
      }
      alert('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('Sorry, failed to send your message. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold gradient-text">Aman Rohilla</span>
            </div>
            <div className=" md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition">
                About
              </a>
              <a href="#projects" className="text-gray-700 hover:text-blue-600 transition">
                Projects
              </a>
              <a href="#skills" className="text-gray-700 hover:text-blue-600 transition">
                Skills
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">
                Contact
              </a>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobile}
                className="text-gray-500 hover:text-gray-900"
                aria-label="Toggle menu"
              >
                {/* Inline SVG hamburger to ensure visibility without external icon libs */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`${mobileOpen ? "" : "hidden"} md:hidden bg-white pb-3 px-4`}>
          <a
            href="#about"
            className="block py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setMobileOpen(false)}
          >
            About
          </a>
          <a
            href="#projects"
            className="block py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setMobileOpen(false)}
          >
            Projects
          </a>
          <a
            href="#skills"
            className="block py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setMobileOpen(false)}
          >
            Skills
          </a>
          <a
            href="#contact"
            className="block py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-bg py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hi, I'm <span className="gradient-text">Aman Rohilla</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
                MERN Stack Developer & Problem Solver
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Computer Science student at Chitkara University passionate about solving
                real-world problems with technology.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Get In Touch
                </a>
                <a
                  href="#projects"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition"
                >
                  View Projects
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center" data-aos="fade-left">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                  <img
                    src="http://static.photos/technology/640x360/42"
                    alt="Aman Rohilla"
                    className="w-60 h-60 md:w-72 md:h-72 rounded-full object-cover border-4 border-white"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-full shadow-lg">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <i data-feather="code" className="text-blue-600 w-6 h-6"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right">
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-gray-600 mb-6">
                I'm a Computer Science student at Chitkara University with a passion for
                solving real-world problems through technology. My journey in tech began
                with a curiosity about how things work, which evolved into building
                full-stack applications that make a difference.
              </p>
              <p className="text-gray-600 mb-6">
                Beyond coding, I'm an avid problem solver with 250+ LeetCode solutions
                under my belt, sharpening my algorithmic thinking in C++, Java, and
                JavaScript.
              </p>
              <p className="text-gray-600">
                When I'm not coding, you can find me playing Kabaddi or exploring new
                technologies to expand my skill set.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-12" data-aos="fade-left">
              <h3 className="text-2xl font-semibold mb-4">Education</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <i data-feather="book" className="text-blue-600"></i>
                    </div>
                    <h4 className="font-medium">B.Tech in Computer Science</h4>
                  </div>
                  <p className="text-gray-600 ml-12">Chitkara University</p>
                  <p className="text-gray-500 text-sm ml-12">Currently pursuing</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <i data-feather="award" className="text-purple-600"></i>
                    </div>
                    <h4 className="font-medium">12th Grade</h4>
                  </div>
                  <p className="text-gray-600 ml-12">
                    Savitri Shiksha Sadan Sr. Secondary School
                  </p>
                  <p className="text-gray-500 text-sm ml-12">81.4%</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <i data-feather="award" className="text-green-600"></i>
                    </div>
                    <h4 className="font-medium">10th Grade</h4>
                  </div>
                  <p className="text-gray-600 ml-12">
                    Savitri Shiksha Sadan Sr. Secondary School
                  </p>
                  <p className="text-gray-500 text-sm ml-12">84%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md project-card transition duration-300"
              data-aos="fade-up"
            >
              <img
                src="http://static.photos/agriculture/1024x576/1"
                alt="Anndhara"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Anndhara</h3>
                <p className="text-gray-600 mb-4">
                  A platform connecting farmers and buyers to simplify agricultural
                  commerce.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    React
                  </span>
                 
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                  MongoDB
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  Node.js
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                  Express.js
                  </span>
                 
                </div>
                <a
                  href="https://anndhara.netlify.app/"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                  rel="noreferrer"
                >
                  View Project <i data-feather="arrow-right" className="ml-2 w-4 h-4"></i>
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md project-card transition duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img
                src="http://static.photos/cityscape/1024x576/2"
                alt="Swachhata Setu"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Swachhata Setu</h3>
                <p className="text-gray-600 mb-4">
                  An integrated waste management system with citizen, worker, and municipal
                  interfaces.
                </p>
              
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    React
                  </span>
                 
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                  MongoDB
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  Node.js
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                  Express.js
                  </span>
                 
                </div>
                <a
                  href="https://swachhata-setu-1.netlify.app/"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                  rel="noreferrer"
                >
                  View Project <i data-feather="arrow-right" className="ml-2 w-2 h-4"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
            My Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl text-center skill-pill transition" data-aos="fade-up">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i data-feather="code" className="text-blue-600 w-8 h-8"></i>
              </div>
              <h3 className="font-semibold mb-2">MERN Stack</h3>
              <p className="text-gray-600 text-sm">MongoDB, Express, React, Node.js</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center skill-pill transition" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i data-feather="cpu" className="text-red-600 w-8 h-8"></i>
              </div>
              <h3 className="font-semibold mb-2">Java & Spring Boot</h3>
              <p className="text-gray-600 text-sm">Backend development</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center skill-pill transition" data-aos="fade-up" data-aos-delay="200">
              <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i data-feather="terminal" className="text-yellow-600 w-8 h-8"></i>
              </div>
              <h3 className="font-semibold mb-2">Java</h3>
              <h3 className="font-semibold mb-2">C++</h3>
              <p className="text-gray-600 text-sm">Algorithmic problem solving</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center skill-pill transition" data-aos="fade-up" data-aos-delay="300">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i data-feather="check-circle" className="text-green-600 w-8 h-8"></i>
              </div>
              <h3 className="font-semibold mb-2">Problem Solving</h3>
              <p className="text-gray-600 text-sm">250+ LeetCode solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
            Get In Touch
          </h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right">
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-gray-600 mb-8">
                I'm always open to discussing new projects, creative ideas or opportunities
                to be part of your vision.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <i data-feather="mail" className="text-blue-600"></i>
                  </div>
                  <a
                    href="mailto:amansatnarayan@gmail.com"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    amansatnarayan@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 p-3 rounded-full mr-4">
                    <img src="https://cdn.simpleicons.org/linkedin/ffffff" alt="LinkedIn" className="w-5 h-5" />
                  </div>
                  <a
                    href="https://www.linkedin.com/in/aman-rohilla-737520324/"
                    target="_blank"
                    className="text-gray-700 hover:text-blue-600"
                    rel="noreferrer"
                  >
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-800 p-3 rounded-full mr-4">
                    <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" className="w-5 h-5" />
                  </div>
                  <a
                    href="https://github.com/Aman-0001990"
                    target="_blank"
                    className="text-gray-700 hover:text-blue-600"
                    rel="noreferrer"
                  >
                    GitHub Profile
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="bg-yellow-500 p-3 rounded-full mr-4">
                    <img src="https://cdn.simpleicons.org/leetcode/ffffff" alt="LeetCode" className="w-5 h-5" />
                  </div>
                  <a
                    href="https://leetcode.com/u/vAjRvzncRN/"
                    target="_blank"
                    className="text-gray-700 hover:text-blue-600"
                    rel="noreferrer"
                  >
                    LeetCode Profile
                  </a>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12" data-aos="fade-left">
              <form className="bg-white p-8 rounded-xl shadow-md" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition"
                >
                  Send Message
                </button>
                <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  If the email composer doesn't open, try
                  {' '}<a href="https://mail.google.com/mail/?view=cm&fs=1&to=amansatnarayan@gmail.com" target="_blank" rel="noreferrer">Gmail</a>
                  {' '}or
                  {' '}<a href="mailto:amansatnarayan@gmail.com">your mail app</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold gradient-text">Aman Rohilla</span>
              <p className="text-gray-400 mt-2">MERN Stack Developer & Problem Solver</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://www.linkedin.com/in/aman-rohilla-737520324/" target="_blank" className="text-gray-400 hover:text-white transition" rel="noreferrer">
                <img src="https://cdn.simpleicons.org/linkedin/ffffff" alt="LinkedIn" className="w-5 h-5" />
              </a>
              <a href="https://github.com/Aman-0001990" target="_blank" className="text-gray-400 hover:text-white transition" rel="noreferrer">
                <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" className="w-5 h-5" />
              </a>
              <a href="mailto:amansatnarayan@gmail.com" className="text-gray-400 hover:text-white transition">
                <i data-feather="mail"></i>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2023 Aman Rohilla. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Inline styles for gradients/hover */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        /* Ensure anchored sections are not hidden behind the sticky navbar */
        #about, #projects, #skills, #contact {
          scroll-margin-top: 5rem; /* ~80px navbar height */
        }
        .gradient-text {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hero-bg {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
        }
        .skill-pill:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}

export default App;
