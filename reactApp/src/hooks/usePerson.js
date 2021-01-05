import { useEffect, useState } from "react";
import {getPeople} from "../api/movie-api";

const usePerson = id => {
  const [person, setPerson] = useState(null);
  useEffect(() => {
    getPeople(id).then(people => {
      setPerson(people);
    });
  }, [id]);
  return [person, setPerson];
};

export default usePerson