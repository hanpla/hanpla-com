-- 1. 조회수 증가를 위한 RPC (Stored Procedure) 생성 SQL
-- Supabase 대시보드 -> SQL Editor 메뉴에 복사하여 실행해 주세요.

CREATE OR REPLACE FUNCTION increment_post_views(post_id BIGINT)
RETURNS VOID AS $$
BEGIN
  UPDATE posts
  SET views = COALESCE(views, 0) + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- SECURITY DEFINER 설명:
-- 이 함수는 함수를 생성한 관리자 권한(Definer)으로 실행됩니다.
-- 따라서 Row-Level Security (RLS) 설정으로 인해 일반 비로그인 유저가 
-- posts 테이블에 직접 Update 권한이 없더라도 조회수는 차단 없이 안전하게 증가됩니다.

-- 2. 추천 / 비추천 (post_votes) 테이블 생성 SQL
CREATE TABLE IF NOT EXISTS post_votes (
  post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  vote_type TEXT CHECK (vote_type IN ('like', 'dislike')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (post_id, user_id)
);
