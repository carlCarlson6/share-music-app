"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { env } from "~/env";

export function AddRecomendation() {
  const [spotifySongUrl, setSpotifySongUrl] = useState("");
  const isValidSpotifySongUrl = spotifySongUrl.startsWith(env.NEXT_PUBLIC_SPOTIFY_LIKE_URL);

  return (
    <>
      <button 
        type="button" 
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold shadow-lg shadow-slate-800 rounded-lg border border-transparent bg-slate-700 text-white hover:bg-slate-800 disabled:opacity-50" 
        data-hs-overlay="#hs-slide-up-animation-modal"
      >
        add recomendation
      </button>

      <div 
        id="hs-slide-up-animation-modal" 
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div 
          className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto"
        >
          <div className="flex flex-row border shadow-sm rounded-xl pointer-events-auto bg-slate-950 border-neutral-700 shadow-neutral-700/70 p-8 gap-4">
            <input 
              type="text" 
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
              placeholder="This is placeholder"
              value={spotifySongUrl}
              onChange={e => setSpotifySongUrl(e.target.value)}
            />
            <button 
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              disabled={!isValidSpotifySongUrl}
            >
              add
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}

/*
          <div 
            className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70"
          >
            <div className="p-4 max-w-sm space-y-3 flex items-center gap-4">
              <input 
                type="text" 
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
                placeholder="This is placeholder"
                value={spotifySongUrl}
                onChange={e => setSpotifySongUrl(e.target.value)}
              />
              <button 
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                disabled={!isValidSpotifySongUrl}
              >
                add
              </button>
            </div>

            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
              <button 
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                disabled={!isValidSpotifySongUrl}
              >
                add
              </button>
              <button 
                type="button" 
                className="hs-dropup-toggle py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" data-hs-overlay="#hs-slide-up-animation-modal"
              >
                close
              </button>
            </div>
          </div>


*/