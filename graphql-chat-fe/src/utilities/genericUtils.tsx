export const getPhotoURL = () => {
    const randNo = Math.floor((Math.random() * 10))
    return `https://randomuser.me/api/portraits/lego/${randNo}.jpg`
}