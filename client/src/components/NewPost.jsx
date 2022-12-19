export const NewPost = ()=>{
  return(
    <div className="newPost">
      <form>
        <textarea name="postContent" placeholder="Write something!" rows="10"></textarea>
      </form>
    </div>
  )
}