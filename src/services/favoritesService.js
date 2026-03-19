const storage = "favorites";

// Get List Of Favorited Repositories
export function getFavorites() {
    const favorites = localStorage.getItem(storage);

    if (favorites) return JSON.parse(favorites);
    else return [];
}

// Check If Repository Is Favorited
export function isFavorite(repoId) {
    const favorites = getFavorites();
    return favorites.some(repo => repo.id === repoId);
}

// Store Github Repository In Favorites
export function addToFavorites(repo) {
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