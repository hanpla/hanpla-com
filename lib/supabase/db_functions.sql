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

-- 3. 댓글 및 답글 (comments) 테이블 생성 SQL
CREATE TABLE IF NOT EXISTS comments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_id BIGINT REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 댓글 추가/삭제 시 posts.comments_count 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE posts SET comments_count = COALESCE(comments_count, 0) + 1 WHERE id = NEW.post_id;
  ELSIF (TG_OP = 'DELETE') THEN
    UPDATE posts SET comments_count = GREATEST(0, COALESCE(comments_count, 0) - 1) WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_update_post_comments_count ON comments;
CREATE TRIGGER trigger_update_post_comments_count
AFTER INSERT OR DELETE ON comments
FOR EACH ROW EXECUTE FUNCTION update_post_comments_count();

-- 5. RLS (Row Level Security) 활성화 및 읽기 정책 추가
-- post_votes RLS
ALTER TABLE post_votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on post_votes" ON post_votes;
CREATE POLICY "Allow public read access on post_votes" ON post_votes
  FOR SELECT USING (true);

-- comments RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on comments" ON comments;
CREATE POLICY "Allow public read access on comments" ON comments
  FOR SELECT USING (true);


