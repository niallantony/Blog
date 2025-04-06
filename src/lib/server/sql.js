export const databaseInit = `
CREATE DATABASE blog;

CREATE TABLE posts (
  blog_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  posted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL UNIQUE,
  imagePatch VARCHAR(255),
  views INTEGER DEFAULT 0,
  body TEXT
);

CREATE TABLE tags (
  tag_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tag VARCHAR(255)
);

CREATE TABLE post_tags (
  tag_id INTEGER NOT NULL,
  blog_id INTEGER NOT NULL,
  CONSTRAINT fk_blog
    FOREIGN KEY (blog_id) 
    REFERENCES posts(blog_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_tag
    FOREIGN KEY (tag_id) 
    REFERENCES tags(tag_id)
    ON DELETE CASCADE
);
`;

const getTaggedPosts = `
WITH tag_ids AS (
  SELECT tag_id FROM tags WHERE tag = ANY($1)
), filtered_posts AS (
  SELECT blog_id
  FROM post_tags 
  INNER JOIN tag_ids ON post_tags.tag_id = tag_ids.tag_id 
  GROUP BY post_tags.blog_id
  HAVING COUNT(post_tags.blog_id) = (SELECT COUNT(*) FROM tag_ids)
)
  SELECT title, url, posted_at, views, imagePath
  FROM posts
  INNER JOIN filtered_posts
  ON posts.blog_id = filtered_posts.blog_id
`;

const getTags = `
SELECT tag, post_count FROM tags INNER JOIN (
SELECT tag_id, COUNT(blog_id) AS post_count 
  FROM post_tags
  GROUP BY tag_id
  ORDER BY post_count DESC
  LIMIT $1
) counts ON tags.tag_id = counts.tag_id
`;

const getPosts = `
SELECT title, url, posted_at, views, imagePath FROM posts
`;

const getPost = `
SELECT title, posted_at, body, imagePath FROM posts WHERE url = $1
`;

const insertBody = `
INSERT INTO posts(title, url, body, imagePath) VALUES ($1, $2, $3, $4) RETURNING blog_id;
`;

const getTag = `
SELECT tag_id FROM tags WHERE tag = $1;
`;

const insertTag = `
INSERT INTO tags(tag) VALUES ($1) RETURNING tag_id;
`;

const insertPostTag = `
INSERT INTO post_tags(tag_id, blog_id) VALUES ($1, $2);
`;

const updateViews = `
UPDATE posts SET views = views + 1 WHERE url = $1 RETURNING views;
`;

const orderByOldest = ` ORDER BY posted_at ASC `;
const orderByNewest = ` ORDER BY posted_at DESC`;
const orderByViews = ` ORDER BY views DESC`;

export const sql = {
  getPost,
  getPosts,
  getTaggedPosts,
  getTag,
  getTags,
  insertTag,
  insertBody,
  insertPostTag,
  updateViews,
  orderByViews,
  orderByNewest,
  orderByOldest,
};
