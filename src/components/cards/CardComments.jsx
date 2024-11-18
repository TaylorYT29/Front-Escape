import "../../index.css";
import { useFetchComments } from "../hooks/useFetchComments";
import { useEffect, useState } from 'react';
import { CommentsCrud } from "../dropdown/CommentsCrud";
import { useUser } from "../../context/UserContext";
import { useTranslation } from 'react-i18next';

export function CardComments({ postId, onClose }) {
    const { comments, fetchComments, submitComment, updateComment, deleteComment } = useFetchComments();
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState('');

    const { user } = useUser();
    const { i18n, t } = useTranslation();

    useEffect(() => {
        if (postId) {
            fetchComments(postId);
        }
    }, [postId, i18n.language]);

    const handleInputChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (newComment.trim()) {
            submitComment(postId, newComment); 
            setNewComment(''); 
        }
    };

    const handleEditClick = (comment) => {
        setEditingCommentId(comment.id);
        setEditingContent(comment.comment);
    };

    const handleSaveEdit = (commentId) => {
        updateComment(commentId, editingContent);
        setEditingCommentId(null);
    };

    const handleDeleteClick = (commentId) => {
        deleteComment(commentId);
    };
    

    return (
        <div>
            <div className="p-4">
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <div className="rounded-full p-[0.40em] dark:bg-[#727272] bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3.25" stroke="currentColor" className="size-6 dark:stroke-white" onClick={onClose}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </div>

                        <h2 className="font-bold dark:text-white text-lg text-center flex-grow">{t('Comments')}</h2>
                    </div>
                </section>
                <br />

                <div className="overflow-y-auto h-[calc(100vh-220px)]">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="mb-4 p-3 bg-gray-100 dark:bg-[#404040] rounded-lg dark:text-white">
                                <div className="flex justify-between">
                                    <h2 className="font-bold">
                                        {comment.user ? (
                                            comment.user.name
                                        ) : comment.company ? (
                                            comment.company.name
                                        ) : (
                                            <span className="animate-pulse">User...</span>
                                        )}
                                    </h2>

                                    {user && (
                                        (user.user_type_id === 2 && comment.user_id === user.id) || 
                                        (user.user_type_id === 1 && comment.company_id === user.id) 
                                    ) && (
                                            <CommentsCrud
                                                commentId={comment.id}
                                                onEdit={() => handleEditClick(comment)}
                                                onDelete={() => handleDeleteClick(comment.id)}
                                            />
                                        )}
                                </div>

                                {editingCommentId === comment.id ? (
                                    <div className="px-4 py-2 border rounded-lg">
                                        <div className="flex">
                                            <textarea
                                                value={editingContent}
                                                onChange={(e) => setEditingContent(e.target.value)}
                                                className="w-full p-0 bg-gray-100 dark:bg-[#404040] dark:text-white rounded-lg border-none focus:outline-none focus:ring-0 dark:placeholder:text-white"
                                                rows="1"
                                            />

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 dark:stroke-white cursor-pointer dark:hover:stroke-sky-500 hover:text-sky-500" onClick={() => handleSaveEdit(comment.id)}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                            </svg>
                                        </div>

                                        <button className="mt-2 dark:text-white font-medium text-sm dark:hover:text-sky-500 hover:text-sky-500" onClick={() => setEditingCommentId(null)}>
                                            {t('Cancel')}
                                        </button>
                                    </div>
                                ) : (
                                    <p>{comment.comment}</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center dark:text-white font-medium">{t('noComments')}</p>
                    )}
                </div>

            </div>

            <div className="absolute bottom-0 left-0 right-0 w-full py-4 border-t">
                <form onSubmit={handleSubmit} className="px-8">
                    <div className="flex items-center bg-gray-100 dark:bg-[#404040] rounded-lg pr-3">
                        <textarea
                            value={newComment}
                            onChange={handleInputChange}
                            placeholder={t('Comment')}
                            className="w-full p-3 bg-gray-100 dark:bg-[#404040] dark:text-white rounded-lg border-none focus:outline-none focus:ring-0 dark:placeholder:text-white"
                            rows="1"
                        />
                        <button type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 dark:stroke-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}
