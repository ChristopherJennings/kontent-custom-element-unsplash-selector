import axios from 'axios'

const _baseUrl = "https://kontentunsplash.azurewebsites.net"

export default {
  async searchPhotos(keyword, page) {
    const url = `${_baseUrl}/search/photos?query=${encodeURIComponent(keyword)}&page=${page}`
    return await axios.get(url);
  },
  trackDownload(id) {
    const url = `${_baseUrl}/photos/${id}/download`
    axios.get(url);
  }
}