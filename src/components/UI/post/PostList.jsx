import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, title, remove}) => {

    if(!posts.length){
        return (
            <h1 style={{textAlign: "center"}}>No Posts</h1>
        )
    }



    return (
        <div>
            <TransitionGroup>
                <h1 style={{textAlign: "center"}}>
                    {title}
                </h1>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                    <PostItem remove={remove} number={index + 1} post={post} key={post.id}/>
                    </CSSTransition>
                )}

            </TransitionGroup>


        </div>
    );
};

export default PostList;