import Link from "next/link";
import { FiLogIn } from "react-icons/fi";

export default function Home() {
  return (
    <section className="w-full container max-w-[1600px] mx-auto">
      <header className="p-6 flex justify-between items-center w-full bg-[#624793]">
        <div>
          <h2 className="font-bold text-xl text-violet-200">Task-Manager</h2>
        </div>
        <div>
          <Link href={"/login"}>
            <button className="bg-purple-300 px-6 py-1 rounded-lg text-purple-900 font-semibold hover:bg-purple-400">
              Login
            </button>
          </Link>
        </div>
      </header>

    </section>
  );
}
