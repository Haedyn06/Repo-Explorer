const BASE = "https://api.github.com"
const errorMsg = "Repo Fetch Error"

// Get A Whole List Of Matching Repositories
export async function searchRepos(query, page, amnt) {
    const data = await fetch(`${BASE}/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=${amnt}`);
    if (!data.ok) throw new Error(errorMsg);
    
    return await data.json();
}


// Get Repository Details
export async function getRepo(owner, repo) {
    const data = await fetch(`${BASE}/repos/${owner}/${repo}`);
    if (!data.ok) throw new Error(errorMsg);
    
    return await data.json();
}


// Get Contributors Of Specific Repository
export async function getContributors(owner, repo) {
    const data = await fetch(`${BASE}/repos/${owner}/${repo}/contributors`);
    if (!data.ok) throw new Error(errorMsg);
    
    return await data.json();
}