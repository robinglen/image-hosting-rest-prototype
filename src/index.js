const Flickr = require("flickrapi");
const API_CONFIG = {
  user_id: "...",
  api_key: "...",
  access_token: "...",
  secret: "...",
  access_token_secret: "..."
};

Flickr.authenticate(API_CONFIG, function(error, flickr) {

  // currently can get data if the image is not private
  flickr.collections.getTree({
    api_key: API_CONFIG.api_key,
    user_id: API_CONFIG.user_id
  }, function(err, data){
    console.log('collections', data.collections.collection);
    const locations = data.collections.collection[0];
    const country = locations.collection[0];
    const state = country.collection[0];
    const album = state.set[0];
    console.log(locations.title, ':', locations.description);
    console.log(country.title, ':', country.description);
    console.log(state.title, ':', state.description);
    console.log(album.title, '(', album.id, ')', ':', album.description);
    // demo get album
    getAlbum(album.id,album.title)
  });

  flickr.tags.getListUserPopular({
    api_key: API_CONFIG.api_key,
    user_id: API_CONFIG.user_id
  }, function(err, data){
    console.log('popular tags', data.who.tags);
  });

  function getAlbum(id, title) {
    flickr.photosets.getPhotos({
      api_key: API_CONFIG.api_key,
      user_id: API_CONFIG.user_id,
      photoset_id: id
    }, function(err, data){
      console.log(title, data.photoset.photo);
    });
  }

});
