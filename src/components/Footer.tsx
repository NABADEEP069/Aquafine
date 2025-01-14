export default function Footer() {
  return (
    <footer className="bg-black-800 text-black py-8">
      <div className="mt-8 pt-8 border-t border-gray-800 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 text-right">
          <div className="mb-8 md:mb-0">
          <h4 className="text-2xl font-semibold mb-3 text-left">Aquafine AI</h4>
          <p className="text-black-300 text-left">
            Building in public at  <br></br>
            <a href="https://github.com/NABADEEP069/AquaAI" target="_blank" rel="noopener noreferrer">
            @Aquafine AI
            </a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-black">Home</a></li>
              <li><a href="/details" className="text-gray-300 hover:text-black">Area Details</a></li>
              <li><a href="/signup" className="text-gray-300 hover:text-black">Sign Up</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-black-300">&copy; 2024 Aqua AI. All rights reserved.</p>
        </div>
      </div>
      </div>
    </footer>
  );
}