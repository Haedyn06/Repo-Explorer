const preReq = "https://api.github.com"

// Get A Whole List Of Matching Repositories
export async function searchRepos(query, page, amnt) {
    const data = await fetch(`${preReq}/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=${amnt}`);
    if (!data.ok) throw new Error(`Failed to fetch repositories (${data.status})`);
    
    return await data.json();
}


// Get Repository Details
export async function getRepo(owner, repo) {
    const data = await fetch(`${preReq}/repos/${owner}/${repo}`);
    if (!data.ok) throw new Error(`Failed to fetch repo (${data.status})`);
    
    return await data.json();
}


// Get Contributors Of Specific Repository
export async function getContributors(owner, repoName) {
    const data = await fetch(`${preReq}/repos/${owner}/${repoName}/contributors`);

    if (!data.ok)
        throw new Error(`Failed to fetch contributors (${data.status})`);

    return await data.json();
}