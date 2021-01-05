import { useEffect, useState } from "react";
import {getPeopleMovieCredit} from "../api/movie-api";

const usePersonMovie = id => {
    const [credit, setCredit] = useState(null);
    useEffect(() => {
      getPeopleMovieCredit(id).then(credit => {
        setCredit(credit.cast);
      });
    }, [id]);
  return [credit, setCredit];
};

export default usePersonMovie