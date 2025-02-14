"use client";

import React, { useState } from "react";

import { api } from "~/trpc/react";
export default function RecipeComponent() {
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, refetch, isFetching } = api.recipe.search.useQuery(
    { query: inputValue },
    {
      enabled: false, // Disable automatic fetching
    },
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    refetch();
  };

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : data.length - 1,
    );
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex < data.length - 1 ? prevIndex + 1 : 0,
    );
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleButtonClick} disabled={isFetching}>
        {isFetching ? "Loading..." : "Submit"}
      </button>
      {data && data.length > 0 && (
        <div>
          <h2>Recipes:</h2>
          <div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold">{data[activeIndex].title}</h3>
              <img
                src={data[activeIndex].image}
                alt={data[activeIndex].title}
              />
              <div className="flex gap-2">
                <button
                  className="rounded-xl bg-white p-2 text-black"
                  onClick={handlePrevClick}
                >
                  Previous
                </button>
                <button
                  className="rounded-xl bg-orange-800 px-4 text-white"
                  onClick={handleNextClick}
                >
                  Next
                </button>
              </div>
              <div className="flex w-full justify-between">
                <div className="flex gap-1">
                  <p>Diets:</p>
                  <ul className="flex gap-1">
                    {data[activeIndex].diets.map((diet, index) => (
                      <li key={index}>{diet}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-1">
                  <p>Dish Types:</p>
                  <ul className="flex gap-1">
                    {data[activeIndex].dishTypes.map((dishType, index) => (
                      <li key={index}>{dishType}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p>{data[activeIndex].summary}</p>
              <ul className="flex flex-col gap-1">
                {data[activeIndex].analyzedInstructions[0].steps.map(
                  (step, index) => (
                    <li key={index}>
                      <p>
                        {step.number}. {step.step}
                      </p>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
