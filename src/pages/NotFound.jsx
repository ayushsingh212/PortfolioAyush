import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >

        {/* 404 */}
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold text-white">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-400">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="
            inline-block mt-8 px-6 py-3 rounded-xl
            bg-gradient-to-r from-cyan-500 to-indigo-600
            text-white font-medium
            hover:opacity-90 transition
          "
        >
          Go Back Home
        </Link>

      </motion.div>

    </div>
  );
};
