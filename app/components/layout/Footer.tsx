import { STUDIO_BASEPATH } from "~/sanity/constants";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-900">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <span>© {new Date().getFullYear()}</span>
        
        <div className="flex gap-3">
          <a
            className="hover:text-cyan-600 dark:hover:text-cyan-200"
            href={STUDIO_BASEPATH}
          >
            Admin
          </a>

          <a
            className="hover:text-cyan-600 dark:hover:text-cyan-200"
            href="/styleguide"
          >
            Style Guide
          </a>
        </div>

      </div>
    </footer>
  );
}
