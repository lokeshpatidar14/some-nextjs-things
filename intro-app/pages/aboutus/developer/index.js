import Link from "next/link";

// pages/aboutus/developer.js
function DeveloperPage() {
  return (
    <div>
      <Link href="/aboutus/developer/1">
        Developer 1
      </Link>
      <Link href="/aboutus/developer/2">
      Developer 2
      </Link>
      <Link href="/aboutus/developer/3">
      Developer 3
      </Link>
      <p>This is the developer page under the About Us section.</p>
    </div>
  );
}

export default DeveloperPage;
