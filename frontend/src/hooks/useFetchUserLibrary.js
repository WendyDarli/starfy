import { useState, useEffect } from "react";

export default function useFetchUserLibrary() {
const [library, setLibrary] = useState({
  episodes: {},
  tracks: {},
  playlists: [],
  
});

  useEffect(() => {
    fetch('http://127.0.0.1:3000/library', {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => {
      if(!res.ok) throw new Error('Error fetching user playlists.');
      return res.json();
    })
    .then(data => {
      setLibrary(data);
    })
    .catch(err => {
      console.log(err);
    })

  }, []);

  return library;
}
