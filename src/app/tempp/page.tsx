"use client"
import { useState, useEffect, useRef } from 'react';

const ScrollableContent = () => {
  const [currentSection, setCurrentSection] = useState('technology'); // Initial state
  const [ulHeight, setUlHeight] = useState(0);
  const ulRef = useRef(null);
  const contentRef = useRef(null);

  // Function to handle title clicks
  const handleTitleClick = (section) => {
    setCurrentSection(section);
  };

  // Function to update scroll position based on scroll event
  const handleScroll = () => {
    if (!ulRef.current || !contentRef.current) return;

    const ulElement = ulRef.current;
    const contentElement = contentRef.current;

    const ulScrolledToEnd = ulElement.scrollTop + ulElement.clientHeight >= ulElement.scrollHeight;
    const ulScrolledToTop = ulElement.scrollTop === 0;

    if (ulScrolledToEnd) {
      contentElement.style.overflowY = 'scroll';
    } else if (ulScrolledToTop) {
      contentElement.style.overflowY = 'hidden';
    } else {
      contentElement.style.overflowY = 'hidden';
    }
  };

  useEffect(() => {
    const ulElement = ulRef.current;
    setUlHeight(ulElement.scrollHeight);
    ulElement.addEventListener('scroll', handleScroll);
    return () => ulElement.removeEventListener('scroll', handleScroll); // Cleanup
  }, []);

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <header className="bg-gray-800 text-white p-4">Header Area</header>
      <div className="flex flex-1">
        {/* Removed sidebar */}
        <div className="w-full p-8 flex justify-center items-center">
          {/* Your image or content here */}
        </div>
      </div>
      <div className="flex-1 overflow-hidden" ref={contentRef}>
        <main className="p-4 bg-gray-100 h-full overflow-y-auto">
          {/* Your main content here */}
          <ul className={`list-disc pl-4 ${currentSection === 'technology' ? '' : 'hidden'} animate fade-in`} ref={ulRef}>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            {/* More list items */}
          </ul>
        </main>
      </div>
      <footer className="bg-gray-800 text-white p-4">Footer Area</footer>
    </div>
  );
};

export default ScrollableContent;
