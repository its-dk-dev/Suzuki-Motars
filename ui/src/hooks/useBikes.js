import axios from 'axios';
import { useEffect, useState } from 'react';

const useBikes = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    (() => {
      axios
        .get('/api/bikes')
        .then((res) => setBikes(res.data.data))
        .catch((e) => console.error(e));
    })();
  }, []);

  return { bikes, setBikes };
};

export default useBikes;
