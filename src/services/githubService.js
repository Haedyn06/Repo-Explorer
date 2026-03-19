const preReq = "https://api.github.com"

// Get A Whole List Of Matching Repositories
export async function searchRepos(query, page, amnt, sort = 'byRelevance', language = '') {
    // Language Filter
    let searchQuery = query.trim();
    if (language) searchQuery += ` language:${language}`;

    // Sorted Repository URLS
    let defaultURL = `${preReq}/search/repositories?q=${encodeURIComponent(searchQuery)}&page=${page}&per_page=${amnt}`;
    let starsURL = `${defaultURL}&sort=stars&order=desc`;
    let updatedURL = `${defaultURL}&sort=updated&order=desc`;
 
    let data; 

    // Fetch Sorted Repository By Type
    if (sort == 'byStar') data = await fetch(starsURL);
    else if (sort == 'byUpdate') data = await fetch(updatedURL);
    else data = await fetch(defaultURL);

    // Error Exception
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
    const data = await fetch(`${preReq}/repos/${owner}/${repoName}/contributors?per_page=5`);
    if (!data.ok) throw new Error(`Failed to fetch contributors (${data.status})`);

    return await data.json();
}



