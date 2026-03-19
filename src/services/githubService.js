const preReq = "https://api.github.com"

// API Request Code Messages
export const errorMessages = {
    400: "Bad request",
    401: "Unauthorized Request",
    403: "API Rate Limit Reached",
    404: "Not found",
    500: "Server error"
};

// API Fetch Error Handling
export function handleError(response) {
    const message = errorMessages[response.status] || `Fetch Request Error (${response.status})`;
    throw new Error(message);
}

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
    if (sort === 'byStar') data = await fetch(starsURL);
    else if (sort === 'byUpdate') data = await fetch(updatedURL);
    else data = await fetch(defaultURL);

    // Error Exception
    if (!data.ok) handleError(data);
    
    return await data.json();
}


// Get Repository Details
export async function getRepo(owner, repo) {
    const data = await fetch(`${preReq}/repos/${owner}/${repo}`);
    if (!data.ok) handleError(data);
    
    return await data.json();
}


// Get Contributors Of Specific Repository
export async function getContributors(owner, repoName) {
    const data = await fetch(`${preReq}/repos/${owner}/${repoName}/contributors`);
    if (!data.ok) handleError(data);

    return await data.json();
}



