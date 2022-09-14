import React, { useState } from 'react'

export interface CreateProps {
  handleProps: any;
}

const CreatePost: React.FC<CreateProps> = (props) => {

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [alert, setAlert] = useState<string>('')
  const [error ,setError] = useState<string>('')


  const handleClick = (event:any) => {
    event.preventDefault();

    if (title.length < 1 || content.length < 1) {
      setAlert('you have to input some text...')
      return
    }

    const post = {
      title,
      content
    }

    fetch('http://localhost:3001/posts', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(post), // data can be `string` or {object}!
    headers: new Headers({
      'Content-Type': 'application/json'
    })
    })
    .then(res => res.json())
    .catch(error => setError(error))
    .then(() => props.handleProps(true))
    .finally(() => { setTitle(''); setContent('')})
  }


  return (
    <div className='CreatePost'>
      <h1>CreatePost</h1>
      <form>
        <div className='title'>
          <label htmlFor="title">title</label> 
          <input type="text" value={title} onChange={(event) => setTitle(event?.target.value)} placeholder="key some title...." />
        </div>

        <div className='content'>
          <label htmlFor="content">content</label>
          <p><strong>Tip:</strong> Use the resize property to prevent textareas from being resized (disable the "grabber" in the bottom right corner):</p>
          <textarea value={content} onChange={(event)=> setContent(event?.target.value)} placeholder="key some content...."/>
        </div>
        {alert.length ?
          <span className='alert'>
            { alert }
          </span> :
          <span className='alertOff'>you have to input some text...</span>
        }
        {error.length ?
          <span className='alert'>
            { error }
          </span> :
          <span className='alertOff'>you have to input some text...</span>
        }
        <button onClick={(event) => handleClick(event)}>Click</button>
      </form>
    </div>
  )
}

export default CreatePost;
