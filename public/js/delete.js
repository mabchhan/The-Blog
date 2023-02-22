//const postId = document.querySelector('input[name="post-id"]').value;
const deleteClickHandler = async function (event) {
  event.preventDefault();
  await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
    body: JSON.stringify({
      post_id: postId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  document.location.replace("/dashboard");
};

document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteClickHandler);
