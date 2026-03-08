import ballad from "~/assets/ballad.jpg";
import mobile from "~/assets/mobile.jpg";

interface FooterProps {
  email?: string | null;
}

export function Footer({ email }: FooterProps) {
  return (
    <footer className="bg-black text-white p-md">

      <div className="flex items-center flex-wrap md:flex-nowrap gap-3 justify-center w-11/12 max-w-[1400px] mx-auto">

        <img src={ballad} className="block w-full md:w-1/2" />
        <img src={mobile} className="block w-full md:w-1/2" />

      </div>

      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <span>© {new Date().getFullYear()}</span>
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-white/70 hover:text-white transition-colors"
          >
            {email}
          </a>
        )}
      </div>
    </footer>
  );
}
