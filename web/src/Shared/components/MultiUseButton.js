import { useDispatch } from "react-redux";
import { addBookmark, deleteBookmark } from "../../redux/Bookmark.slice";

const MultiUseButton = ({ buttonType, values }) => {
  const dispatch = useDispatch();

  switch (buttonType) {
    case "add":
      return (
        <button
          className="repo_bookmark"
          onClick={() => dispatch(addBookmark(values))}
        >
          Bookmark
        </button>
      );

    case "remove":
      return (
        <button
          className="repo_bookmark"
          onClick={() => dispatch(deleteBookmark(values.id))}
        >
          Remove
        </button>
      );

    default:
      break;
  }
};

export default MultiUseButton;
