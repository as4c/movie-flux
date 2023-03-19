import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewRef, db } from "../firebase/firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { AppState } from "../App";
import { useNavigate } from "react-router-dom";

const Reviews = ({ id, preRate, userRated }) => {

  const useAppState = useContext(AppState);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [data, setData] = useState([]);
  const [newReview,setNewReview]=useState(0);
  const navigate=useNavigate();
  const sendReview = async () => {
    setLoading(true);
    try {
      if(useAppState.login){

        await addDoc(reviewRef, {
          movieId: id,
          name: useAppState.userName,
          rating: rating,
          thought: form,
          timestamp: new Date().getTime()
        });
        const refDoc = doc(db, "movies", id);
        await updateDoc(refDoc, {
          rating: preRate + rating,
          rated: userRated + 1,
        });
  
        setRating(0);
        setForm("");
        setNewReview(newReview + 1);
        swal({
          title: "Review sent",
          icon: "success",
          buttons: false,
          timer: 2000,
        });
      }else{
        swal({
          title: "you're not Logged in Please log in first!",
          icon: "error",
          buttons: false,
          timer: 2000,
        });
        navigate('/login')
      }
    } catch (err) {
      swal({
        title: err.message,
        icon: "error",
        buttons: false,
        timer: 2000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setReviewLoading(true);
      setData([])
      let qr = query(reviewRef, where("movieId", "==", id));
      const qrSnapshot = await getDocs(qr);
      qrSnapshot.forEach((doc) => {
        setData((pre) => [...pre, doc.data()]);
      });

      setReviewLoading(false);
    }
    getData();
  }, [newReview]);

  return (
    <div className="mt-4 border-t-2 border-gray-700 w-full">
      <ReactStars
        size={30}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        type="text"
        className="w-full p-2 outline-none header"
        placeholder="Share your Reviews..."
      />
      <button
        onClick={sendReview}
        className="bg-green-500 w-full p-2 flex justify-center hover:bg-green-700"
      >
        {loading ? (
          <TailSpin height={20} color="white" />
        ) : (
          "Share"
        )}
      </button>

      { reviewLoading ? (
        <div className="flex justify-center mt-8">
          <ThreeDots height={15} color="white" />
        </div>
      ) : (
        <div>
          {data.map((e,i) => {
            return (
              <div
                className="p-2 w-full border-b header bg-opacity-50 border-gray-600 mt-2"
                key={i}
              >
                <div className="flex items-center">
                  <p className="text-blue-500">{e.name}</p>
                  <p className="ml-3 text-xs">
                    ({new Date(e.timestamp).toLocaleString()})
                  </p>
                </div>
                <ReactStars
                  size={30}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
                <p>{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
