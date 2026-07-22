"use client";

import { useState, useTransition, FormEvent, ChangeEvent } from "react";

import { createCommentAction, deleteCommentAction } from "@/lib/actions/comment";
import type { CommentWithAuthor } from "@/types/comment";
import { formatDate } from "@/lib/utils/date";
import TrashIcon from "@/components/icons/trash-icon";
import CornerDownRightIcon from "@/components/icons/corner-down-right-icon";

interface PostCommentsProps {
  postId: number;
  commentsCount: number;
  comments: CommentWithAuthor[];
  currentUserId?: string;
  isLoggedIn?: boolean;
}

interface CommentFormProps {
  postId: number;
  parentId?: number | null;
  isLoggedIn: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface CommentItemProps {
  comment: CommentWithAuthor;
  postId: number;
  currentUserId?: string;
  isLoggedIn: boolean;
  isReply?: boolean;
}

// 1. 로컬 헬퍼 컴포넌트: 댓글 미존재 안내 - 파일 상단 배치
const CommentEmptyState = () => {
  return (
    <div className="py-10 text-center text-sm text-zinc-400 dark:text-zinc-500">
      아직 작성된 댓글이 없습니다. 첫 댓글을 남겨보세요.
    </div>
  );
};

// 2. 로컬 헬퍼 컴포넌트: 댓글/답글 입력 폼 - 파일 상단 배치
const CommentForm = ({
  postId,
  parentId = null,
  isLoggedIn,
  placeholder = "댓글을 입력하세요...",
  autoFocus = false,
  onSuccess,
  onCancel,
}: CommentFormProps) => {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 500) {
      setContent(e.target.value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    if (!content.trim()) {
      alert("댓글 내용을 입력해 주세요.");
      return;
    }

    startTransition(async () => {
      const result = await createCommentAction({
        postId,
        parentId,
        content,
      });

      if (result.success) {
        setContent("");
        if (onSuccess) onSuccess();
      } else if (result.error) {
        alert(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
        <textarea
          disabled={!isLoggedIn || isPending}
          autoFocus={autoFocus}
          placeholder={
            isLoggedIn ? placeholder : "로그인 후 댓글을 작성할 수 있습니다."
          }
          value={content}
          onChange={handleChange}
          className="h-16 w-full resize-none bg-transparent text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none disabled:opacity-60 dark:text-zinc-200 dark:placeholder-zinc-500"
        />
        <div className="mt-2 flex items-center justify-between border-t border-zinc-150 pt-3 text-xs text-zinc-400 dark:border-zinc-800/80">
          <span>{content.length} / 500자</span>
          <div className="flex items-center gap-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isPending}
                className="rounded-lg px-3 py-1.5 font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              >
                취소
              </button>
            )}
            <button
              type="submit"
              disabled={!isLoggedIn || !content.trim() || isPending}
              className="rounded-lg bg-zinc-900 px-4 py-1.5 font-semibold text-white transition-all hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-400 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600"
            >
              {isPending ? "등록 중..." : "등록"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

// 3. 로컬 헬퍼 컴포넌트: 개별 댓글 및 답글 아이템 - 파일 상단 배치
const CommentItem = ({
  comment,
  postId,
  currentUserId,
  isLoggedIn,
  isReply = false,
}: CommentItemProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isAuthor = currentUserId === comment.author_id;

  const handleDelete = () => {
    if (isPending) return;

    if (!confirm("정말 이 댓글을 삭제하시겠습니까?")) {
      return;
    }

    startTransition(async () => {
      const result = await deleteCommentAction(comment.id, postId);
      if (!result.success && result.error) {
        alert(result.error);
      }
    });
  };

  return (
    <div className="group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            {isReply && (
              <span className="flex items-center text-zinc-400 dark:text-zinc-500">
                <CornerDownRightIcon className="mr-0.5 h-3.5 w-3.5" />
              </span>
            )}
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              {comment.author?.nickname || "알 수 없음"}
            </span>
            <span className="text-zinc-400 dark:text-zinc-500">
              {formatDate(comment.created_at)}
            </span>
          </div>

          <p className="whitespace-pre-wrap text-sm text-zinc-800 leading-relaxed dark:text-zinc-200">
            {comment.content}
          </p>

          {!isReply && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowReplyForm((prev) => !prev)}
                className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                {showReplyForm ? "답글 취소" : "답글 달기"}
              </button>
            </div>
          )}
        </div>

        {isAuthor && (
          <button
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            title="댓글 삭제"
            className="rounded p-1 text-zinc-400 opacity-100 transition-opacity hover:bg-zinc-100 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100 dark:hover:bg-zinc-800 dark:hover:text-red-400"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 답글 작성 폼 */}
      {showReplyForm && !isReply && (
        <div className="mt-3 pl-4 sm:pl-6 border-l-2 border-zinc-200 dark:border-zinc-800">
          <CommentForm
            postId={postId}
            parentId={comment.id}
            isLoggedIn={isLoggedIn}
            placeholder={`${comment.author?.nickname || "사용자"}님에게 답글 작성...`}
            autoFocus
            onSuccess={() => setShowReplyForm(false)}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {/* 대댓글(답글) 목록 렌더링 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3.5 pl-4 sm:pl-6 border-l-2 border-zinc-200 dark:border-zinc-800">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              currentUserId={currentUserId}
              isLoggedIn={isLoggedIn}
              isReply
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 4. 메인 컴포넌트: PostComments - 파일 최하단 배치
export const PostComments = ({
  postId,
  commentsCount,
  comments,
  currentUserId,
  isLoggedIn = false,
}: PostCommentsProps) => {
  return (
    <div className="py-6 border-b border-zinc-200 dark:border-zinc-800">
      {/* 댓글 헤더 */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">
          댓글
        </span>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-sm font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {commentsCount}
        </span>
      </div>

      {/* 원댓글 작성 폼 */}
      <div className="mb-6">
        <CommentForm postId={postId} isLoggedIn={isLoggedIn} />
      </div>

      {/* 댓글 목록 */}
      {comments.length === 0 ? (
        <CommentEmptyState />
      ) : (
        <div className="space-y-5 pt-2">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              currentUserId={currentUserId}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostComments;
