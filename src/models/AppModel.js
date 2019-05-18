export default class AppModel {
  constructor(state) {
    this.state = state;
    this.result = [];
  }

  static extractClipNames(data) {
    const arr = [];
    for (let i = 0; i < data.length; i += 1) {
      arr.push({
        videoLink: `https://www.youtube.com/watch?v=${data[i].id}`,
        title: data[i].snippet.title,
        author: data[i].snippet.channelTitle,
        date: data[i].snippet.publishedAt,
        description: data[i].snippet.description,
        img: data[i].snippet.thumbnails.high.url,
        view: data[i].statistics.viewCount,
      });
    }
    return arr;
  }

  async getClipNames() {
    const { url, href } = this.state;
    const responce = await fetch(`${url}${href}`);
    const data = await responce.json();

    this.result.push(data.nextPageToken);

    const id = [];
    for (let i = 0; i < data.items.length; i += 1) {
      if (data.items[i].id.videoId) {
        id.push(data.items[i].id.videoId);
      }
    }

    const ids = id.join(',');
    const urlStatic = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBOUnVFwJBygWONavqzgR5KGKtwd5kxzco&id=${ids}&part=snippet,statistics`;
    const responceStatic = await fetch(urlStatic);
    const dataStatic = await responceStatic.json();
    this.result.push(AppModel.extractClipNames(dataStatic.items));
    return this.result;
  }
}
