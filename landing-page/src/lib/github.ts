
interface GitHubRelease {
  tag_name: string;
  html_url: string;
}

export async function getLatestRelease(): Promise<{ version: string; url: string }> {
  try {
    const res = await fetch('https://api.github.com/repos/sethwebster/AI/releases/latest', {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}` // Optional if rate limited
      }
    });

    if (!res.ok) {
      // Fallback for demo purposes or if repo is private/rate-limited
      console.warn(`Failed to fetch GitHub release: ${res.status} ${res.statusText}`);
      return { version: "v1.2.0", url: "https://github.com/sethwebster/AI/releases" };
    }

    const data: GitHubRelease = await res.json();
    return {
      version: data.tag_name,
      url: data.html_url
    };
  } catch (error) {
    console.warn("Error fetching GitHub release:", error);
    return { version: "v1.2.0", url: "https://github.com/sethwebster/AI/releases" };
  }
}
