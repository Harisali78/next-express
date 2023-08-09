"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const submitHandler = () => {

    if (keyword) {
      router.push(`/Products?keyword=${keyword}`);
    } else {
    //   router.push("/Products");
    }
  };

  return (
    <form
      className="flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4"
      onSubmit={submitHandler}
    >
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md ml-5 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 mt-5"
        type="text"
        placeholder="Enter your keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
      />
      <button
        type="button"
        className="px-4 py-2 inline-block text-white border border-transparent bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-5"
        onClick={submitHandler}
      >
        Search
      </button>
    </form>
  );
};

export default Search;