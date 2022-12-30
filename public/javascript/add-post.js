const createbtn = document.getElementById("createBtn");
const postTitle = document.getElementById("post-title");
const postContent = document.getElementById("post-content");
// New Post Form Handler
const createPostHandler = async (event) => {
  const title = postTitle.value;
  const content = postContent.value;
  event.preventDefault();
  if (title.length > 0 && content.length > 0) {

      const response = await fetch("/dashboard/post", {
          method: "POST",
          body: JSON.stringify({ title, content }),
          headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
          document.location.replace(`/dashboard`);
      } else {
          alert("Failed to create post.");
      }

  }
}
  
if (createbtn) {
  createbtn.addEventListener("click", createPostHandler);
}