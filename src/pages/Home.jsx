import React from "react";
import "../App.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function Home() {
  return (
    <div>
      <div className="layout">
        <div>
          <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight w-96 text-left text-zinc-700 lg:text-7xl">
            A place for meaningful conversations
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6 w-9/12 text-left">
            Connect with your friends and family, build your community, and
            deepen your interests.
          </p>
          <Link to="/login">
            <Button className="mt-6 p-6" type="submit">
              Log in | Register
            </Button>
          </Link>
        </div>
        <div>
          <img
            src="/—Pngtree—3d like icon bubble chat_6215871.png"
            width={500}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
