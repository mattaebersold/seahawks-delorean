import { useState } from "react";
import ballad from "~/assets/ballad.jpg";
import mobile from "~/assets/footer.jpg";
import long from "~/assets/long.jpg";

interface FooterProps {
  email?: string | null;
}

export function Footer({ email }: FooterProps) {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  function handleDisclaimerToggle() {
    const opening = !disclaimerOpen;
    setDisclaimerOpen(opening);
    if (opening) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 50);
    }
  }

  return (
    <footer className="bg-black text-white p-md">
      <div className="">
        <img src={long} className="block w-full h-auto" />
      </div>

      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <span className="text-sm text-white/70">
          &copy; 2026 In2time.com.
        </span>

        <button
          onClick={handleDisclaimerToggle}
          className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1"
        >
          Disclaimer
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transformOrigin: "center center",
              transform: disclaimerOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 300ms ease",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <span className="text-sm text-white/70">All Rights Reserved</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateRows: disclaimerOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 300ms ease",
        }}
      >
        <div className="overflow-hidden">
          <div className="container mx-auto px-4 lg:px-12 pb-4 text-sm text-white/70 text-center leading-relaxed">
            IN2TIME.com is not sponsored or affiliated with Delorean Motor Company (DMC), NBC Universal, MCA/Universal Studios, Amblin Entertainment, or the Seattle Seahawks.<br />
            Any branded products or logos mentioned are the trademarks of their respective holders.<br />
            The Seattle Seahawks logos &amp; images are authorized for use on the Seahawks Delorean Fan-Car.
          </div>
        </div>
      </div>
    </footer>
  );
}
