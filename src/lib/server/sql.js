export const databaseInit = `
CREATE DATABASE blog;

CREATE TABLE posts (
  blog_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  posted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL UNIQUE,
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

const getTags = `
SELECT tag, post_count FROM tags INNER JOIN (
SELECT tag_id, COUNT(blog_id) AS post_count 
  FROM post_tags
  GROUP BY tag_id
  ORDER BY post_count DESC
  LIMIT 10
) counts ON tags.tag_id = counts.tag_id
`;

const postBody = `
INSERT INTO posts(title, url, body) VALUES ($1, $2, $3) RETURNING blog_id;
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

export const sql = {
  getTag,
  getTags,
  insertTag,
  postBody,
  insertPostTag,
};
