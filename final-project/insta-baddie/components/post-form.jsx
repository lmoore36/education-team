'use client';

import { useRef } from 'react';

export default function NewPostForm({ addPost }) {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(formRef.current);
    await addPost(formData);
    formRef.current.reset(); // Clear the form input after submission
  };

  return (
    <form
      ref={formRef}
      className="flex w-full p-8 border-b-4 border-gray-300"
      onSubmit={handleSubmit}
    >
      <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
      <div className="flex flex-col flex-grow ml-4">
        <input
          name="text"
          className="p-3 bg-transparent border border-gray-500 rounded-sm"
          placeholder="What's happening?"
        ></input>
        <div className="flex justify-between mt-2">
          <button
            type="button"
            className="flex items-center h-8 px-3 text-xs rounded-sm hover:bg-gray-200"
          >
            Attach
          </button>
          <button
            type="submit"
            className="flex items-center h-8 px-3 text-xs rounded-sm bg-gray-300 hover:bg-gray-400"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
