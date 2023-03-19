import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { db } from "../firebase/firebase";
import { useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import Reviews from "./Reviews";

const Detail = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState([
    {
      title: "",
      year: "",
      desc: "",
      imageUrl: "",
      rating: 0,
      rated: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    async function getData() {
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setMovieData(_data.data());
      setLoading(false);
    }
    getData();
  }, [movieData.rated]);

  return (
    <div className="p-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center">
      {loading ? (
        <div className="h-96 flex w-full justify-center items-center">
          <ThreeCircles height={25} color="white" />
        </div>
      ) : (
        <>
          <img
            className="h-96 block md:sticky top-24"
            src={movieData.imageUrl}
            alt=""
          />
          <div className="md:ml-4 ml-0 w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-400">
              {movieData.title}
              <span className="text-xl">({movieData.year})</span>
            </h1>
            <ReactStars
              size={20}
              half={true}
              value={movieData.rating / movieData.rated}
              edit={false}
            />
            <p className="mt-2">{movieData.desc}</p>
            <Reviews
              id={id}
              preRate={movieData.rating}
              userRated={movieData.rated}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
