import React from "react";
import "../App.css";

function Home() {
  return (
    <div>
      <div className="home-layout">
        <div>
          <h2>A place for meaningful conversations</h2>
          <p>
            Connect with your friends and family, build your community, and
            deepen your interests.
          </p>
          <button type="submit">Log in | Register</button>
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
