const commentFormHandler = async function (event) {
  event.preventDefault();

  const comment_text = document.querySelector(
    'textarea[name="comment-body"]'
  ).value;
  const post_id = document.querySelector('input[name="post-id"]').value;

  console.log("post id :", post_id);
  console.log("comment :", comment_text);

  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ post_id, comment_text }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      //console.log("respone ok....");
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
