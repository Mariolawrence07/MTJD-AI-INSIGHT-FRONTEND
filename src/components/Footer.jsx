import { Link } from "react-router-dom";


export default function Footer  () {
  return (
    <footer className="relative mx-auto max-w-7xl px-6 pb-10">
      <div className="flex flex-col gap-3 border-t pt-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} MTJD Insight Generator
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link className="hover:text-foreground" to="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-foreground" to="/terms">
            Terms
          </Link>
          <Link className="hover:text-foreground" to="/support">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};
