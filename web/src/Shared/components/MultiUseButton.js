import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, deleteBookmark } from "../../redux/Bookmark.slice";

const MultiUseButton = ({ buttonType, values }) => {
  const dispatch = useDispatch();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);

  const checkIfIsBookmarked = useCallback((id, bookmarks) => {
    const isAvailable = bookmarks.find((node) => node.id === id);
    return isAvailable ? setIsBookmarked(true) : setIsBookmarked(false);
  }, []);

  useEffect(() => {
    if (bookmarks.length <= 0) return;
    checkIfIsBookmarked(values.id, bookmarks);
  }, [values.id, bookmarks, checkIfIsBookmarked]);

  switch (buttonType) {
    case "add":
      return (
        <button
          className="repo_bookmark"
          onClick={() => dispatch(addBookmark(values))}
          disabled={isBookmarked}
        >
          {isBookmarked ? "Bookmarked" : "Bookmark"}
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
