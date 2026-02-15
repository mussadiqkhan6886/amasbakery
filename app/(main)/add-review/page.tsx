import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 mt-10 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Review</h1>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Review</label>
            <textarea
              placeholder="Write your review..."
              className="border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-main"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-main text-white font-medium py-2 rounded hover:bg-normal transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </main>
  )
}

export default page
