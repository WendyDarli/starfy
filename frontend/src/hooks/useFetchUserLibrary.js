import { useState, useEffect } from "react";

export default function useFetchUserLibrary() {
const [library, setLibrary] = useState({
  episodes: {},
  tracks: {},
  playlists: [],
  
});

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    Promise.all([
      fetch("https://api.spotify.com/v1/me/playlists", {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json()),

      fetch("https://api.spotify.com/v1/me/tracks", {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json()),

      fetch("https://api.spotify.com/v1/me/episodes", {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json()),
    ])
      .then(([playlists, tracks, episodes]) => {
        setLibrary({
           episodes: {
              href: episodes.href,
              total: episodes.total,
            },
          tracks: {
            href: tracks.href,
            total: tracks.total,
          },
          playlists: playlists.items,
        });
      })
      .catch(err => {
        console.error(err);
        setLibrary(l => ({ ...l, loading: false }));
      });
  }, []);

  return library;
}
