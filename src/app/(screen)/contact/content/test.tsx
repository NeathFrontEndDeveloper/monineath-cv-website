"use client";

const Test = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-white mb-4">Commit Update</h1>
        <p className="text-gray-200 leading-relaxed">
          In this commit, I&lsquo;ve completed the Contact Form and Contact Info
          components, though they&lsquo;re not fully functional yet.
        </p>
        <p className="text-gray-200 leading-relaxed mt-4">
          I also updated the Header component and the Home page. However, the
          changes didn&rsquo;t appear on GitHub after pushing &mdash; possibly
          because I committed directly to the main branch without creating a new
          one.
        </p>
        <p className="text-gray-200 leading-relaxed mt-4">
          I&lsquo;ll push this update again to see if it appears correctly.
          <span className="block mt-2 text-green-400 font-semibold">
            Thank you!
          </span>
        </p>
      </div>
    </div>
  );
};

export default Test;
