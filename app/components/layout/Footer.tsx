interface FooterProps {
  email?: string | null;
}

export function Footer({ email }: FooterProps) {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-900">
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
