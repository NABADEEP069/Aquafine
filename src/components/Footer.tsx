
export default function Footer() {
  return (
    <footer className="bg-white text-black py-1">
      <div className="mt-0 pt-9 border-t border-gray-900 text-center">
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Left Column */}
          <div>
            <h4 className="text-2xl font-semibold mb-3">Aquafine AI</h4>
            <p className="text-gray-800">
              Building in public at <br />
              <a
                href="https://github.com/NABADEEP069/AquaAI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black-200 hover:text-pink-600"
              >
                @Aquafine AI
              </a>
            </p>
          </div>

          {/* Middle Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        



        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-400 text-center">
          <p className="text-gray-400">&copy; 2024 Aqua AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
