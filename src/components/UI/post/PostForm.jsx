import React, {useState} from 'react';
import MyInput from "../input/MyInput";
import MyButton from "../button/myButton";

const PostForm = ({create}) => {

    const [post, setPost] = useState({title: "", body: ""})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: "", body: ""})

    }

    return (
        <form>
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text"
                placeholder="Posts name"/>
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Posts descriptions"/>
            <MyButton  onClick={addNewPost}>Create</MyButton>
        </form>
    );
};

export default PostForm;