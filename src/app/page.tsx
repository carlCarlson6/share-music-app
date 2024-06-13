import { iAmAliveAction } from "~/server/infrastructure/trpc";

export default async function Home() {
  const iAmAliveMessageResponse = await iAmAliveAction();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <p>hello world</p>
    </main>
  );
}