import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Link from "next/link"
import { MdAccountCircle } from 'react-icons/md'
import Alert from '../../components/Alert';


const Blog = function (props) {
    function createMarkup(content) {
        return { __html: content };
    }
    const [blog, setBlog] = useState(props.blogpost)
    const [comments, setComments] = useState(props.comments)
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [comment, setComment] = useState();
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        getUserToken();
    })

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }

    const getUserToken = () => {
        let token = localStorage.getItem('codingthunder');
        if (token != null) {
            let parsedToken = JSON.parse(token);
            setToken(parsedToken.authtoken);
            setUsername(parsedToken.username);
        }
    }

    const handleComment = (e) => {
        setComment(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let form = e.target.parentNode;
        const formData = {
            parent: form.querySelector('input[name=parent]').value,
            post: blog.sno,
            user: username,
            comment: comment
        }

        let res = await fetch('http://localhost:3000/api/postcomment', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        let data = await res.json();
        showAlert(`${data.message}`, `${data.status}`);
        if (data.status == "success") {
            form.reset();
            setComments(data.comments);
            console.log(comments);
        }
    }

    return (
        <>
            <Head>
                <title>{blog.title} - CodingThunder</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Alert alert={alert} />
            <div className="container my-3">
                <h1><Link className="text-dark" href={""}>{blog.title}</Link></h1>
                <p className="text-muted mb-1">Published on <strong>{new Date(`${blog.timestamp}`).toDateString()}</strong></p>
                <hr />
                <div dangerouslySetInnerHTML={createMarkup(blog.description)}></div>
                <hr />
                <div className="mb-3">
                    <h2>Comments: ({comments.filter(e => { return e.parent == comment.sno }).length})</h2>
                    {token ? <form id="commentForm">
                        <input type="hidden" id="parent" name="parent" value="" />
                        <div className="form-group">
                            <textarea className="form-control" id="comment" rows={3} placeholder="Enter your comment here..." onChange={handleComment} />
                        </div>
                        <button type="button" className="btn btn-sm btn-danger" onClick={handleSubmit}>Post</button>
                    </form> : <h5>Please login to post a comment</h5>}
                </div>

                <hr />

                {comments.length === 0 ? <div className="alert alert-secondary">No comments! Be the first one to comment.</div> : comments.filter(e => {
                    return e.parent == null
                }).map((comment) => {
                    return (
                        <div className="media border shadow-sm rounded mb-2 p-3" key={comment.sno}>
                            <MdAccountCircle style={{ fontSize: "32px" }} className="mr-2" />
                            <div className="media-body">
                                <p className="mb-1">{comment.username} <span className="badge badge-secondary">{new Date(`${comment.timestamp}`).toDateString()}</span></p>
                                <p className="mb-1">{comment.comment_desc}</p>
                                {token ? <><button className="btn btn-sm btn-danger" data-target={`#replyBox${comment.sno}`} data-toggle="collapse">Reply</button>
                                    <div className="collapse card card-body my-3" id={`replyBox${comment.sno}`}>
                                        <form id="commentForm">
                                            <input type="hidden" id="parent" name="parent" value={comment.sno} />
                                            <div className="form-group">
                                                <textarea className="form-control" id="comment" rows={3} placeholder="Enter your reply here..." onChange={handleComment} />
                                            </div>
                                            <button type="button" className="btn btn-sm btn-danger" onClick={handleSubmit}>Post</button>
                                        </form>
                                    </div>
                                </> : <div>
                                    <Link className="btn btn-danger mr-2" href="/accounts/login">Login Here</Link>
                                    <Link className="btn btn-danger" href="/accounts/signup">Register Here</Link>
                                </div>}


                                {comments.filter(e => {
                                    return e.parent == comment.sno
                                }).length === 0 ? "" :
                                    <div className="rounded p-2 mt-3" style={{ backgroundColor: "rgb(231, 231, 233)" }}>
                                        {comments.filter(e => {
                                            return e.parent == comment.sno
                                        }).map((reply) => {
                                            return <div className="media p-2" key={reply.sno}>
                                                <MdAccountCircle style={{ fontSize: "32px" }} className="mr-2" />
                                                <div className="media-body">
                                                    <p className="mb-1">{reply.username} <span className="badge badge-secondary">{new Date(`${reply.timestamp}`).toDateString()}</span></p>
                                                    <p className="mb-1">{reply.comment_desc}</p>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}


export async function getServerSideProps(context) {
    const { slug } = context.query;
    let res = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
    let data = await res.json();
    let blogpost = data.blog[0];

    let res2 = await fetch(`http://localhost:3000/api/getcomments?postSno=${blogpost.sno}`);
    let data2 = await res2.json();
    let comments = data2.comments;

    return {
        props: {
            blogpost: blogpost, comments: comments
        }
    }
}

export default Blog