CREATE TABLE users( 
  user_id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
  user_firstName TEXT, 
  user_lastName TEXT, 
  user_nickName VARCHAR(200) DEFAULT "Guest", 
  user_email VARCHAR(200) NOT NULL, 
  user_password VARCHAR(500) NOT NULL, 
  user_status BOOLEAN DEFAULT 0, 
  PRIMARY KEY(user_id),
  CONSTRAINT UNIQUE(user_email)
);

CREATE TABLE posts(
  post_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  user_nickName VARCHAR(200) DEFAULT "Guest",
  post_description VARCHAR(100),
  post_content VARCHAR(500) NOT NULL,
  post_likes INT UNSIGNED DEFAULT 0,
  CONSTRAINT PRIMARY KEY(post_id),
  CONSTRAINT FOREIGN KEY(user_id) REFERENCES users(user_id)
);