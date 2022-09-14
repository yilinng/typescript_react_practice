import { useState, useEffect } from 'react'
import Header from './component/Header'
import Main from './component/Main'
import Posts from './component/Posts'
import Post from './component/Post'
//import posts from './data/posts'
import CreatePost from './component/CreatePost'
import './App.css';

class StatusError extends Error {
  status: number | undefined;
}



function App() {

  const item = {
    heading: "hi typescript",
    children: "keep in touch."
  }

  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState(false) 
  const [clickPost, setClickPost] = useState<any[]>([])
  const [error, setError] = useState<string>('')
  
  const handleInputChange = (event:any, id:number) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    //if checked is true, push to clickPost
    let posts: number[] = [...clickPost];
    if (value === true) {
      setClickPost([...clickPost, id])
    } else {
      posts = posts.filter(post => post !== id)
      setClickPost(posts)
    }
  }

  const handleProps = (str:boolean) => {
      setNewPost(str)
  }

  const handleDelete = (e:any) => {
    e.preventDefault();
    if (clickPost.length < 1) {
      return
    }
    clickPost.forEach(id => {
      fetch('http://localhost:3001/posts/' + id, {
        method: 'DELETE', // or 'PUT'
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
        .catch(error => setError(error))
        .then(() => { setNewPost(false); getPosts() })
    })
  
  }

  const getPosts = async () => {
    const response = await fetch('http://localhost:3001/posts');

    const data = await response.json();

    if (!data) {
      const err = new StatusError('Not found');
      err.status = 404;
      throw err;
    }
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    //console.log(newPost, 'from child to parents.');
    if (newPost === true) {
      getPosts();
      setNewPost(false)
    }
  },[newPost])

  return (
    <main>
      <div className="App">
        <Header heading="First Post">
            <p>#1</p>
        </Header>
        <Header heading="Second Post">
            <p>#2</p>
        </Header>
        <Main heading={item.heading} children={item.children} />
        <Posts className='postList'>
          {error.length ?
          <span className='alert'>
            { error }
          </span> :
          <span className='alertOff'>error here...</span>
          }
          <form>
          <button className='deleteBtn' onClick={(e)=>handleDelete(e)}>delete post</button>
          {posts.map(({ id, title, content }) => (
            <div className='post' key={id}>
              <input className='clearPost' type="checkbox" onChange={(event) => handleInputChange(event, id)} key={id} />
                <Post className='title'>{title} </Post>
                <Post className='content'>{content} </Post>
              </div>
          ))}
           </form> 
        </Posts>
        <CreatePost handleProps={handleProps} />
      </div>
    </main>
  );
}

export default App;
