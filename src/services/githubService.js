const githubAPI = "https://api.github.com"
const githubCache = {};


// API Request Code Messages
export const errorMessages = {
    400: "Bad request",
    401: "Unauthorized Request",
    403: "API Rate Limit Reached",
    404: "Not Found",
    500: "Server Error"
};

// API Fetch Error Handling
export function handleError(response) {
    const message = errorMessages[response.status] || `Fetch Request Error (${response.status})`;
    throw new Error(message);
}

// Get A Whole List Of Matching Repositories
export async function searchRepos(query, page = 1, amnt = 10, sort = 'byRelevance', language = '') {
    
    // Cache Request 
    const cacheKey = `${query}|${page}|${amnt}|${sort}|${language}`;
    if (githubCache[cacheKey]) return githubCache[cacheKey];
    
    // Language Filter
    let searchQuery = query.trim();
    if (language) searchQuery += ` language:${language}`;

    // Sorted Repository URLS
    let defaultURL = `${githubAPI}/search/repositories?q=${encodeURIComponent(searchQuery)}&page=${page}&per_page=${amnt}`;
    let starsURL = `${defaultURL}&sort=stars&order=desc`;
    let updatedURL = `${defaultURL}&sort=updated&order=desc`;
 
    let data; 

    // Fetch Sorted Repository By Type
    if (sort === 'byStar') data = await fetch(starsURL);
    else if (sort === 'byUpdate') data = await fetch(updatedURL);
    else data = await fetch(defaultURL);

    // Error Exception
    if (!data.ok) handleError(data);
    
    const repos = await data.json();

    githubCache[cacheKey] = repos; 

    return repos;
}


// Get Repository Details
export async function getRepo(owner, repo) {
    const data = await fetch(`${githubAPI}/repos/${owner}/${repo}`);
    if (!data.ok) handleError(data);
    
    return await data.json();
}


// Get Contributors Of Specific Repository
export async function getContributors(owner, repoName) {
    const data = await fetch(`${githubAPI}/repos/${owner}/${repoName}/contributors`);
    if (!data.ok) handleError(data);

    return await data.json();
}



