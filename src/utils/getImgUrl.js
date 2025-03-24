const getImgUrl = (img) => {
    return new URL(`../assets/books/${img}`, import.meta.url)
}
export { getImgUrl }