import { iAmAlive } from "~/server/infrastructure/trpc";
import { getRecomendations } from "~/server/music/get-recomendations";
import {Spotify} from "react-spotify-embed"
import { useState } from "react";
import { createPortal } from "react-dom";
import { AddRecomendation } from "./addRecomendation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const iAmAliveMessageResponse = await iAmAlive();
  const recomendationsPagination = await getRecomendations({
    page: 1,
    pageSize: 10
  });

  return (
    <main className="h-screen bg-gradient-to-r from-slate-950 via-slate-700 to-slate-950 text-white flex flex-col p-10 gap-5">
      <div className="flex flex-col items-center">
        <h1>music share</h1>
      </div>
      <div>
        <AddRecomendation />
      </div>
      {recomendationsPagination.items.map(i => (<>
        <div key={i.id} className="rounded-xl shadow-lg shadow-slate-600">
          <Spotify wide={true} link={i.url}/>
        </div>
      </>))}
    </main>
  );
}