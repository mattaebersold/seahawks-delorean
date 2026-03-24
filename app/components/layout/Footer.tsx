import ballad from "~/assets/ballad.jpg";
import mobile from "~/assets/footer.jpg";
import long from "~/assets/long.jpg";

interface FooterProps {
  email?: string | null;
}

export function Footer({ email }: FooterProps) {
  return (
    <footer className="bg-black text-white p-md pt-0">

      <div className="flex items-stretch flex-wrap md:flex-nowrap py-5 gap-5 justify-center w-11/12 max-w-[1400px] mx-auto">

        <img src={ballad} className="block w-full md:w-1/2" />
        <img src={mobile} className="block w-full md:w-1/2 object-cover" />

      </div>

      <div className="">
        <img src={long} className="block w-full h-auto" />
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
