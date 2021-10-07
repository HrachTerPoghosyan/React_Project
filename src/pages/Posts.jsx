import React, {useState, useEffect, useRef} from "react";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/myButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/UI/post/PostForm";
import PostFilter from "../components/UI/post/PostFilter";
import PostList from "../components/UI/post/PostList";
import Loader from "../components/UI/loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import MySelect from "../components/UI/select/MySelect";




function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '' , query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    const observer = useRef()



    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })


    useEffect(() => {
        if(isPostLoading) return;
        if(observer.current) observer.current.disconnect();
        var callback = function(entries, observer) {
            if(entries[0].isIntersecting && page <  totalPages) {
                setPage(page + 1)
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current)
    }, [isPostLoading])

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }


    const changePage = (page) => {
        setPage(page)


    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Create user
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: "15px 0"}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            <MySelect
                value={limit}
                onChange={value =>setLimit(value)}
                defaultValue="Number of items per page"
                options={[
                    {value: 5, name: "5"},
                    {value: 10, name: "10"},
                    {value: 25, name: "25"},
                    {value: -1, name: "All posts"},
                ]}

            />


                {postError &&
            <h1> Posts are not found ${postError}</h1>
        }
                <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Posts lists 1"/>
                <div ref={lastElement} style={{height: 20, background: "red"}}/>
            { isPostLoading &&
                <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>

            }

            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />



        </div>
    );
}
export default Posts;
