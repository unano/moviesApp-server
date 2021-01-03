import React, {useContext } from "react";
import "./reviewForm.css";
import useForm from "react-hook-form";
import {MoviesContext} from '../../contexts/moviesContext'
import { withRouter } from "react-router-dom";

const ReviewForm = ({ movie, history }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const context = useContext(MoviesContext);

  const onSubmit = data => {
    context.addReview(movie, data)
    history.push("/movies/favorites");
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div id="name">Add your review</div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Author"
          defaultValue={movie.review ? movie.review.author : ""}
          name="author"
          ref={register({ required: "Author name required" })}
        />
      </div>
      {errors.author && <p className=" text-black">{errors.author.message} </p>}
      <div className="form-group">
        <textarea
          rows="10"
          type="text"
          className="form-control"
          placeholder="Write your review"
          defaultValue={movie.review ? movie.review.content : ""}
          name="content"
          ref={register({
            required: "No review text",
            minLength: { value: 10, message: "Review is too short" }
          })}
        />
      </div>
      {errors.content && (
        <p className="text-black">{errors.content.message} </p>
      )}

      <button type="submit" className="btn btn-info alert-info">
        Submit
      </button>
      <button
        type="reset"
        className="btn btn-info alert-info reset"
        onClick={() => {
          reset({
            author: "",
            content: ""
          });
        }}
      >
        Reset
      </button>
    </form>
  );
};

export default withRouter(ReviewForm);