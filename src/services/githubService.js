const BASE = "https://api.github.com"
const errorMsg = "Repo Fetch Error"


// Get A Whole List Of Matching Repositories
export async function searchRepos(query, page = 1, perPage = 10) {
    const res = await fetch(`${BASE}/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`);
    if (!res.ok) throw new Error(errorMsg);
    
    return await res.json();
}


// Get Repository Details
export async function getRepo(owner, repo) {
    const res = await fetch(`${BASE}/repos/${owner}/${repo}`);
    if (!res.ok) throw new Error(errorMsg);
    
    return await res.json();
}

// Get Languages