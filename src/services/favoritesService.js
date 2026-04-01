const storage = "favorites";

// Get All List Of Favorited Repositories
export function getFavorites() { 
    try { 
        const storedFav = localStorage.getItem(storage); 
        return storedFav ? JSON.parse(storedFav) : []; 
    } catch { 
        return []; 
    } 
}

// Check If Repository Is Favorited
export function isFavorite(repoId) {
    const favorites = getFavorites();
    return favorites.some(repo => repo.id === repoId);
}

// Store Github Repository In Favorites
export function addToFavorites(repo) {
    if (!repo || !repo.id) return;
    
    const favorites = getFavorites();

    const isExist = favorites.some(item => item.id === repo.id);
    if (isExist) return;

    favorites.push(repo);
    localStorage.setItem(storage, JSON.stringify(favorites));
}

// Remove Github Repository In Favorites
export function removeFromFavorites(repoId) {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(repo => repo.id !== repoId);

    localStorage.setItem(storage, JSON.stringify(updatedFavorites));
}

